"""Test closed public access, then opt into preview through a local test fixture."""
import json, os, subprocess, unicodedata
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
data=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {courses} from './assets/courses.js'; console.log(JSON.stringify(courses))"],cwd=root))
def word(s):return ''.join(c for c in unicodedata.normalize('NFD',s) if c.isascii() and c.isalnum()).upper()
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 public_page=browser.new_page()
 public_errors=[]
 public_page.on('pageerror', lambda e: public_errors.append(str(e)))
 public_page.goto(os.environ.get('SIGIN_TEST_URL','http://127.0.0.1:4173/'))
 public_page.locator('#login-form').wait_for()
 assert public_page.get_by_role('button',name='Explorar las tres materias').count()==0
 # Old browser data and controls inserted into the DOM must not grant access.
 public_page.evaluate("""() => localStorage.setItem('sigin-preview-v2', JSON.stringify({version:2,profile:{role:'teacher'},students:[],settings:[],attempts:[],practice:{}}))""")
 public_page.reload()
 public_page.locator('#login-form').wait_for()
 for action in ['home','myCourses','course','lesson','admin','switchRole','preview']:
  public_page.evaluate("""action => {const b=document.createElement('button');b.dataset.action=action;b.dataset.course='gig-502';b.dataset.week='1';b.textContent='Intentar acceso';document.querySelector('#app').append(b);} """,action)
  public_page.get_by_role('button',name='Intentar acceso').click()
  assert public_page.locator('#login-form').count()==1,action
  assert public_page.locator('.app-shell,.course-card,.context-card,#admin-course').count()==0,action
  public_page.locator('button').filter(has_text='Intentar acceso').evaluate_all('(buttons)=>buttons.forEach(b=>b.remove())')
 public_page.screenshot(path='/tmp/sigin-login-locked.png',full_page=True)
 # Restoring a token also requires server validation before the workspace opens.
 public_page.route('https://*.supabase.co/**',lambda route:route.fulfill(status=401,content_type='application/json',body='{"message":"JWT invalid"}'))
 public_page.evaluate("""() => sessionStorage.setItem('sigin-auth-session-v1', JSON.stringify({access_token:'forged',refresh_token:'forged',expires_at:9999999999,role:'teacher'}))""")
 public_page.reload()
 public_page.locator('#login-form').wait_for()
 assert public_page.locator('.app-shell,.course-card,#admin-course').count()==0
 assert public_page.locator('#login-error').inner_text()=='La sesión venció. Vuelve a ingresar.'
 assert public_page.evaluate("sessionStorage.getItem('sigin-auth-session-v1')")==None
 assert not public_errors,public_errors
 public_page.close()
 context=browser.new_context(viewport={'width':1440,'height':1000})
 config=(root/'assets/config.js').read_text()
 assert 'previewEnabled: false' in config
 context.route('**/assets/config.js',lambda route:route.fulfill(content_type='text/javascript',body=config.replace('previewEnabled: false','previewEnabled: true')))
 page=context.new_page()
 errors=[]
 page.on('pageerror',lambda e: errors.append(str(e)))
 page.on('dialog',lambda d:d.accept())
 page.goto(os.environ.get('SIGIN_TEST_URL','http://127.0.0.1:4173/'))
 page.get_by_role('button',name='Explorar las tres materias').click()
 assert page.locator('.course-card').count()==3
 assert page.locator('main').bounding_box()['width']>1100
 page.screenshot(path='/tmp/sigin-home-desktop.png',full_page=True)
 def width_ok():assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'),page.url
 def answer(q):
  page.set_viewport_size({'width':390,'height':900})
  if q['type']=='choice':page.get_by_label(q['options'][q['correct']],exact=True).check()
  elif q['type']=='numeric':page.locator('#numeric-answer').fill(str(q['correct']))
  elif q['type']=='matching':
   for i,pair in enumerate(q['pairs']):
    page.locator('.match-column').nth(0).locator('button').nth(i).click()
    page.locator('.match-column').nth(1).get_by_role('button').filter(has_text=pair['right']).click()
  elif q['type'] in ('ordering','order'):
   for target,text in enumerate(q['items']):
    texts=page.locator('.order-text').all_text_contents()
    current=texts.index(text)
    while current>target:
     page.locator('.order-item').nth(current).get_by_role('button').nth(0).click();current-=1
  elif q['type']=='crossword':
   for i in range(page.locator('.cw-input').count()):
    cell=page.locator('.cw-input').nth(i)
    ref=json.loads(cell.get_attribute('data-refs'))[0]
    cell.fill(word(q['entries'][ref['entry']]['word'])[ref['letter']])
  if not page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'):
   print('OVERFLOW',q['id'],q['type'])
   print(page.evaluate("Array.from(document.querySelectorAll('*')).filter(e=>e.getBoundingClientRect().right>window.innerWidth+1).map(e=>({tag:e.tagName,cl:e.className,right:e.getBoundingClientRect().right})).slice(-20)"))
   page.screenshot(path='/tmp/sigin-overflow.png',full_page=True)
  width_ok()
  page.set_viewport_size({'width':1440,'height':1000})
 for c in data:
  page.locator('.course-card').filter(has_text=c['name']).get_by_role('button').click()
  page.get_by_role('button',name='Explorar el caso',exact=False).first.click()
  page.get_by_role('button',name='Comenzar práctica',exact=False).click()
  for i,q in enumerate(c['activities'][0]['questions']):
   answer(q)
   page.get_by_role('button',name='Comprobar mi respuesta',exact=False).click()
   assert page.get_by_role('heading',name='Bien razonado.').is_visible(),q['id']
   page.get_by_role('button',name='Revisar antes de terminar' if i==4 else 'Siguiente reto',exact=False).click()
  page.get_by_role('button',name='Confirmar y terminar').click()
  assert page.locator('.result-big').inner_text().startswith('10.0')
  page.locator('.side-nav').first.get_by_role('button',name='Inicio',exact=True).click()
 # Evaluate ALFIN first week, then view course-specific result.
 c=data[0]
 page.locator('.course-card').filter(has_text=c['name']).get_by_role('button').click()
 page.get_by_role('button',name='Explorar el caso',exact=False).first.click()
 page.get_by_role('button',name='Entrar a la evaluación').click()
 for i,q in enumerate(c['activities'][0]['questions']):
  answer(q)
  page.get_by_role('button',name='Revisar antes de terminar' if i==4 else 'Siguiente reto',exact=False).click()
 page.get_by_role('button',name='Confirmar y terminar').click()
 assert page.locator('.result-big').inner_text().startswith('10.0')
 page.get_by_role('button',name='Ver como docente').click()
 page.get_by_role('button',name='Estudiantes',exact=True).click()
 assert page.get_by_role('heading',name='Estudiantes de la materia (0)').is_visible()
 with page.expect_download() as download:page.get_by_role('button',name='Descargar plantilla Excel').click()
 page.locator('#import-file').set_input_files(download.value.path())
 page.get_by_role('button',name='Confirmar filas válidas').wait_for()
 page.get_by_role('button',name='Confirmar filas válidas').click()
 assert page.get_by_role('heading',name='Estudiantes de la materia (1)').is_visible()
 page.get_by_role('button',name='Crear evaluación',exact=True).click()
 page.locator('select[data-author-type]').select_option('crossword')
 assert page.get_by_text('Una palabra y pista por línea:',exact=False).is_visible()
 # Layout covers laptop, tablet and phone, including course overview.
 page.get_by_role('button',name='Ver como estudiante').click()
 for width in [1920,1440,1024,768,390,360]:
  page.set_viewport_size({'width':width,'height':900});width_ok()
  if width==390:page.screenshot(path='/tmp/sigin-home-mobile.png',full_page=True)
 assert not errors,errors
 print('PASS: anonymous access closed; injected guest routes blocked; explicit preview fixture; 3 courses; 5 interaction types; practice & assessment; Excel roundtrip; 6 widths; no JS errors')
 browser.close()

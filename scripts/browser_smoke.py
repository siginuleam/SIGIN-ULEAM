"""Test closed public access, then opt into preview through a local test fixture."""
import json, os, re, subprocess, unicodedata
from pathlib import Path
from playwright.sync_api import expect, sync_playwright
root=Path(__file__).resolve().parents[1]
data=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {courses} from './assets/courses.js'; console.log(JSON.stringify(courses))"],cwd=root))
assert {q['type'] for c in data for a in c['activities'] for q in a['questions']}=={'choice','matching','ordering','crossword'}
def word(s):return ''.join(c for c in unicodedata.normalize('NFD',s) if c.isascii() and c.isalnum()).upper()
def choose_theme(page, preference, guest=False):
 page.set_viewport_size({'width':1440,'height':1000})
 page.locator('[data-action="settings"]').click()
 radio=page.locator('[name="theme-choice"][value="%s"]'%preference)
 radio.locator('..').click()
 assert radio.is_checked()
 if guest:page.locator('[data-action="closeSettings"]').click()
 stored=page.evaluate("localStorage.getItem('sigin-theme-v1')")
 assert stored==preference or (preference=='system' and stored is None),stored
 if preference!='system':expect(page.locator('html')).to_have_attribute('data-theme',preference)
def input_readable(locator):
 assert locator.is_visible()
 box=locator.bounding_box()
 assert box['width']>=200 and box['height']>=40,box
 contrast=locator.evaluate("""el=>{
  const rgb=s=>s.match(/[\\d.]+/g).map(Number);
  let node=el,bg;
  while(node){bg=rgb(getComputedStyle(node).backgroundColor);if(bg.length===3||bg[3]===1)break;node=node.parentElement;}
  const luminance=v=>v.slice(0,3).map(c=>c/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((sum,c,i)=>sum+c*[.2126,.7152,.0722][i],0);
  const ratio=(color,opacity=1)=>{const fg=rgb(color),alpha=(fg.length===4?fg[3]:1)*opacity;const blended=fg.slice(0,3).map((c,i)=>c*alpha+bg[i]*(1-alpha));const a=luminance(blended),b=luminance(bg);return(Math.max(a,b)+.05)/(Math.min(a,b)+.05);};
  const result={text:ratio(getComputedStyle(el).color)};
  if(el.getAttribute('placeholder')){const style=getComputedStyle(el,'::placeholder');result.placeholder=ratio(style.color,Number(style.opacity));}
  return result;
 } """)
 assert all(value>=4.5 for value in contrast.values()),contrast
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 public_page=browser.new_page()
 public_errors=[]
 public_page.on('pageerror', lambda e: public_errors.append(str(e)))
 public_page.goto(os.environ.get('SIGIN_TEST_URL','http://127.0.0.1:4173/'))
 public_page.locator('#login-form').wait_for()
 assert public_page.get_by_role('button',name='Explorar las tres materias').count()==0
 illustration=public_page.locator('.learning-landscape img')
 expect(illustration).to_be_visible()
 public_page.wait_for_function("document.querySelector('.learning-landscape img').naturalWidth>0")
 surfaces={}
 for appearance in ['light','dark']:
  choose_theme(public_page,appearance,guest=True)
  surfaces[appearance]=public_page.locator('.login-panel').evaluate('el=>getComputedStyle(el).backgroundColor')
  public_page.reload()
  public_page.locator('#login-form').wait_for()
  expect(public_page.locator('html')).to_have_attribute('data-theme',appearance)
  for width in [1920,1440,1024,768,390,360]:
   public_page.set_viewport_size({'width':width,'height':1000})
   assert public_page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(appearance,width)
   for selector in ['#username','#password']:input_readable(public_page.locator(selector))
   if width in [1440,360]:public_page.screenshot(path=f'/tmp/sigin-login-{appearance}-{width}.png',full_page=True)
 assert surfaces['light']!=surfaces['dark'],'The login panel did not follow the selected theme'
 choose_theme(public_page,'system',guest=True)
 public_page.emulate_media(color_scheme='dark')
 expect(public_page.locator('html')).to_have_attribute('data-theme','dark')
 public_page.emulate_media(color_scheme='light')
 expect(public_page.locator('html')).to_have_attribute('data-theme','light')
 # Old browser data and controls inserted into the DOM must not grant access.
 public_page.evaluate("""() => localStorage.setItem('sigin-preview-v2', JSON.stringify({version:2,profile:{role:'teacher'},students:[],settings:[],attempts:[],practice:{}}))""")
 public_page.reload()
 public_page.locator('#login-form').wait_for()
 for action in ['home','myCourses','activities','activityMode','beginQuiz','course','lesson','admin','reviewAssessment','switchRole','preview']:
  public_page.evaluate("""action => {const b=document.createElement('button');b.dataset.action=action;b.dataset.course='gig-502';b.dataset.week='1';b.dataset.mode='assessment';b.textContent='Intentar acceso';document.querySelector('#app').append(b);} """,action)
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
 # Use the same loaded module as the UI if authors refine text during validation.
 data=page.evaluate("async()=>{const {courses}=await import('./assets/courses.js');return courses;}")
 assert {q['type'] for c in data for a in c['activities'] for q in a['questions']}=={'choice','matching','ordering','crossword'}
 page.get_by_role('button',name='Explorar las tres materias').click()
 assert page.locator('.course-card').count()==3
 assert page.locator('main').bounding_box()['width']>1100
 page.screenshot(path='/tmp/sigin-home-desktop.png',full_page=True)
 def width_ok():assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'),page.url
 captured_quizzes=set()
 def answer(q):
  page.set_viewport_size({'width':390,'height':900})
  if q['type']=='choice':page.get_by_label(q['options'][q['correct']],exact=True).check()
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
  dossier_panel=page.locator('.quiz-dossier')
  if dossier_panel.get_attribute('open') is None:dossier_panel.locator('summary').click()
  for appearance in ['light','dark']:
   page.emulate_media(color_scheme=appearance)
   expect(page.locator('html')).to_have_attribute('data-theme',appearance)
   for width in [360,1440]:
    page.set_viewport_size({'width':width,'height':1000})
    if not page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'):
     print('OVERFLOW',q['id'],q['type'],appearance,width)
     print(page.evaluate("Array.from(document.querySelectorAll('*')).filter(e=>e.getBoundingClientRect().right>window.innerWidth+1).map(e=>({tag:e.tagName,cl:e.className,right:e.getBoundingClientRect().right})).slice(-20)"))
     page.screenshot(path='/tmp/sigin-overflow.png',full_page=True)
    width_ok()
    assert page.locator('#quiz-answer').is_visible()
    reading=page.locator('.quiz-dossier .dossier')
    assert reading.evaluate('el=>el.scrollHeight<=el.clientHeight+1'),'Concepts/case clipped inside a nested scroller'
    for heading in ['Conceptos clave','Caso breve','Qué debes hacer']:
     assert reading.get_by_role('heading',name=re.compile('^'+re.escape(heading)+r'(?:\s*[:·—–-].*)?$',re.I)).is_visible()
    if width==360:
     instructions=reading.get_by_role('heading',name=re.compile(r'^Qué debes hacer',re.I))
     instructions.scroll_into_view_if_needed()
     assert reading.evaluate('el=>el.scrollTop')==0
     assert page.locator('.quiz-grid > .context-card').evaluate('el=>el.scrollTop')==0
    screenshot_key=(q['type'],appearance,width)
    if screenshot_key not in captured_quizzes:
     page.evaluate("window.scrollTo({top:0,left:0,behavior:'instant'})")
     page.screenshot(path=f"/tmp/sigin-quiz-{q['type']}-{appearance}-{width}.png",full_page=True)
     captured_quizzes.add(screenshot_key)
  page.set_viewport_size({'width':1440,'height':1000})
 choose_theme(page,'system')
 for c in data:
  page.locator('.sidebar [data-action="activities"]').click()
  page.locator('#activity-course').select_option(c['id'])
  page.locator('[data-action="activityMode"][data-mode="practice"]').click()
  expect(page.locator('[data-action="activityMode"][data-mode="practice"]')).to_have_attribute('aria-pressed','true')
  page.locator('[data-action="beginQuiz"][data-week="1"][data-mode="practice"]').click()
  assert page.locator('.case-reading-note').is_visible()
  assert page.locator('.quiz-dossier').get_attribute('open') is not None
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
 page.locator('.sidebar [data-action="activities"]').click()
 page.locator('#activity-course').select_option(c['id'])
 page.locator('[data-action="activityMode"][data-mode="assessment"]').click()
 closed=page.locator('[data-action="beginQuiz"][data-week="2"][data-mode="assessment"]')
 assert closed.is_disabled()
 page.evaluate("""() => {const b=document.createElement('button');b.dataset.action='beginQuiz';b.dataset.course='gig-502';b.dataset.week='2';b.dataset.mode='assessment';b.textContent='Intentar examen cerrado';document.querySelector('#app').append(b);} """)
 page.get_by_role('button',name='Intentar examen cerrado').click()
 expect(page.locator('#toast')).to_have_text('Esta evaluación está cerrada.')
 assert page.locator('#quiz-answer').count()==0
 page.locator('[data-action="beginQuiz"][data-week="1"][data-mode="assessment"]').click()
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
 author_types=page.locator('select[data-author-type]')
 assert sorted(author_types.evaluate_all('(fields)=>fields.map(field=>field.value)'))==['choice','choice','crossword','matching','ordering']
 assert author_types.locator('option[value="numeric"]').count()==0
 author_types.first.select_option('crossword')
 assert page.get_by_text('Una palabra y pista por línea:',exact=False).first.is_visible()
 # Layout covers laptop, tablet and phone, including course overview.
 page.get_by_role('button',name='Ver como estudiante').click()
 app_surfaces={}
 for appearance in ['dark','light']:
  choose_theme(page,appearance)
  page.locator('.sidebar [data-action="home"]').click()
  app_surfaces[appearance]=page.locator('.course-card').first.evaluate('el=>getComputedStyle(el).backgroundColor')
  for width in [1920,1440,1024,768,390,360]:
   page.set_viewport_size({'width':width,'height':900});width_ok()
   if width in [1440,360]:page.screenshot(path=f'/tmp/sigin-home-{appearance}-{width}.png',full_page=True)
 assert app_surfaces['light']!=app_surfaces['dark'],'The workspace did not follow the selected theme'
 page.set_viewport_size({'width':1440,'height':1000})
 page.locator('.sidebar [data-action="logout"]').click()
 expect(page.locator('html')).to_have_attribute('data-theme','light')
 page.reload();page.locator('#login-form').wait_for()
 expect(page.locator('html')).to_have_attribute('data-theme','light')
 assert not errors,errors
 print('PASS: illustrated landing; persistent light/dark/system themes; readable login inputs; anonymous access closed; direct practice/exam and closed-exam guard; 3 courses; four interaction types without numeric questions; Excel roundtrip; 6 widths in both themes; no JS errors')
 browser.close()

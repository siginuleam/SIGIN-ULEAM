"""Run with Python Playwright installed; tests public practice and preview only."""
import json, os, subprocess, unicodedata
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
data=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {courses} from './assets/courses.js'; console.log(JSON.stringify(courses))"],cwd=root))
def word(s):return ''.join(c for c in unicodedata.normalize('NFD',s) if c.isascii() and c.isalnum()).upper()
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':1440,'height':1000})
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
 print('PASS: 3 courses; 5 interaction types; practice & assessment; Excel roundtrip; 6 widths; no JS errors')
 browser.close()

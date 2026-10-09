"""Exercise configured live UI against isolated Supabase route fixtures.

No real accounts, emails or grades are created. Install Python Playwright and run
SIGIN_TEST_URL=http://127.0.0.1:4173/SIGIN-ULEAM/ python scripts/browser_live_smoke.py.
"""
import copy
import json
import os
import re
import subprocess
import unicodedata
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from playwright.sync_api import expect, sync_playwright

ROOT = Path(__file__).resolve().parents[1]
URL = os.environ.get('SIGIN_TEST_URL', 'http://127.0.0.1:4173/')
STUDENT_ID = '00000000-0000-4000-8000-000000000001'
STUDENT_NUMBER = '0000000000'
EMAIL = f'e{STUDENT_NUMBER}@live.uleam.edu.ec'
PASSWORD = 'PruebaSegura!2026'

# Reuse a real content fixture, while transmitting only public assessment fields.
fixture = json.loads(subprocess.check_output([
    'node', '--input-type=module', '-e',
    "import {courses} from './assets/courses.js'; "
    "import {crosswordLayout} from './assets/crossword.js'; "
    "const c=courses.find(c=>c.id==='gig-406');const a=c.activities[0];"
    "console.log(JSON.stringify({course:c,activity:a,layouts:"
    "Object.fromEntries(a.questions.filter(q=>q.type==='crossword').map(q=>[q.id,crosswordLayout(q.entries)]))}));"
], cwd=ROOT))
course = fixture['course']
activity = fixture['activity']
public_payload = {k: copy.deepcopy(v) for k, v in activity.items() if k != 'questions'}
public_payload['name'] = 'Banco privado de prueba · cinco retos'
public_payload['questions'] = []
answers = []
answer_by_id = {}
for source in activity['questions']:
    q = {k: copy.deepcopy(v) for k, v in source.items()
         if k not in ('correct', 'explanation', 'tolerance')}
    if q['type'] == 'matching':
        q.pop('pairs')
        q['lefts'] = [p['left'] for p in source['pairs']]
        q['rights'] = [p['right'] for p in reversed(source['pairs'])]
        value = [len(source['pairs']) - i - 1 for i in range(len(source['pairs']))]
    elif q['type'] in ('ordering', 'order'):
        q['type'] = 'order'
        q['items'] = list(reversed(source['items']))
        value = list(reversed(range(len(q['items']))))
    elif q['type'] == 'crossword':
        value = [e['word'] for e in source['entries']]
        q['entries'] = [{'clue': e['clue'], 'length': len(e['word'])} for e in source['entries']]
        q['layout'] = copy.deepcopy(fixture['layouts'][source['id']])
        for cell in q['layout']['cells']:
            cell.pop('letter', None)
            cell.pop('directions', None)
        for placed in q['layout']['placed']:
            placed.pop('word', None)
    else:
        value = source['correct']
    public_payload['questions'].append(q)
    answers.append({'id': source['id'], 'value': value})
    answer_by_id[source['id']] = value
assert {q['type'] for q in public_payload['questions']} == {'choice', 'matching', 'order', 'crossword'}
assert len(public_payload['questions']) == 5
assert sum(q['type'] == 'choice' for q in public_payload['questions']) == 2
serialized = json.dumps(public_payload)
assert '"correct"' not in serialized and '"explanation"' not in serialized
assert '"pairs"' not in serialized and '"word"' not in serialized
for question in public_payload['questions']:
    if question['type'] == 'crossword':
        assert all('letter' not in cell for cell in question['layout']['cells'])

profile = {'id': STUDENT_ID, 'student_number': STUDENT_NUMBER,
           'display_name': 'Estudiante ficticio', 'role': 'student', 'must_change_password': False}
user = {'id': STUDENT_ID, 'email': EMAIL, 'user_metadata': {'role': 'teacher'}}
requests = []
attempts = []
errors = []
state = {'recovery_error': False, 'teacher_mode': False, 'bank_missing': False}

def mock_supabase(route):
    request = route.request
    url = urlparse(request.url)
    path = url.path
    body = request.post_data_json if request.post_data else None
    requests.append({'path': path, 'method': request.method, 'body': body, 'query': parse_qs(url.query)})
    response, status = None, 200
    if path == '/auth/v1/token':
        assert body['email'] == EMAIL
        assert parse_qs(url.query)['grant_type'] == ['password']
        response = {'access_token': 'fixture-access-token', 'refresh_token': 'fixture-refresh-token',
                    'expires_in': 3600, 'token_type': 'bearer', 'user': user}
    elif path == '/auth/v1/user':
        if request.method == 'PUT':
            assert body == {'password': PASSWORD}
        response = user
    elif path == '/auth/v1/logout':
        response = {}
    elif path == '/auth/v1/recover':
        assert body == {'email': EMAIL}
        redirect = parse_qs(url.query)['redirect_to'][0]
        assert urlparse(redirect).scheme == 'https' or urlparse(redirect).hostname in ('127.0.0.1', 'localhost')
        if state['recovery_error']:
            response, status = {'message': 'SMTP de prueba no disponible'}, 400
        else:
            response = {}
    elif path == '/rest/v1/profiles':
        if 'role=eq.student' in url.query:
            assert state['teacher_mode'], 'Student requested a teacher-only roster'
            response = [profile]
        else:
            response = [{**profile, 'role': 'teacher', 'display_name': 'Docente ficticia'}] if state['teacher_mode'] else [profile]
    elif path == '/rest/v1/courses':
        response = [{'id': course['id'], 'code': course['code'], 'name': course['name']}]
    elif path == '/rest/v1/enrollments':
        response = [{'student_id': STUDENT_ID, 'course_id': course['id'], 'active': True, 'parallel': 'A'}]
    elif path == '/rest/v1/week_settings':
        response = [{'course_id': course['id'], 'week': 1, 'enabled': not state['teacher_mode'], 'max_attempts': 2,
                     'opens_at': None, 'closes_at': None}]
    elif path == '/rest/v1/attempts':
        response = attempts
    elif path == '/rest/v1/practice_progress':
        response = []
    elif path == '/rest/v1/rpc/get_assessment':
        assert body == {'p_course_id': 'gig-406', 'p_week': 1}
        if state['bank_missing']:
            response, status = {'message': 'NO_ASSESSMENT_KEY'}, 400
        elif not state['teacher_mode'] and len(attempts) >= 2:
            response, status = {'message': 'ATTEMPTS_EXHAUSTED'}, 400
        else:
            response = public_payload
    elif path == '/rest/v1/rpc/submit_assessment':
        assert body['p_course_id'] == 'gig-406' and body['p_week'] == 1
        assert body['p_answers'] == answers, f"Unexpected submitted answers: {body['p_answers']}"
        response = {'score': 10, 'feedback': [
            {'id': q['id'], 'correct': True, 'explanation': q['explanation']}
            for q in activity['questions']]}
        attempts.append({'id': 'fixture-attempt-1', 'student_id': STUDENT_ID, 'course_id': 'gig-406',
                         'week': 1, 'score': 10, 'teacher_adjustment': False,
                         'created_at': '2026-10-08T12:00:00Z'})
    else:
        raise AssertionError(f'Unexpected request {request.method} {path}')
    route.fulfill(status=status, content_type='application/json', body=json.dumps(response),
                  headers={'Access-Control-Allow-Origin': '*'})

def normalize_word(value):
    return ''.join(c for c in unicodedata.normalize('NFD', value) if c.isascii() and c.isalnum()).upper()

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    context = browser.new_context(viewport={'width': 1440, 'height': 1000})
    context.route('https://*.supabase.co/**', mock_supabase)
    page = context.new_page()
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('dialog', lambda dialog: dialog.accept())
    page.goto(URL)
    page.locator('#login-form').wait_for()
    assert page.locator('[data-action="preview"]').count() == 0
    page.locator('#username').fill(STUDENT_NUMBER)
    page.locator('#password').fill('ClaveTemporalDePrueba')
    page.get_by_role('button', name='Entrar a mi aula', exact=False).click()
    page.locator('.course-card').wait_for()
    assert page.locator('.course-card').count() == 1
    assert course['name'] in page.locator('.course-card').inner_text()
    assert page.locator('[data-action="admin"]').count() == 0
    assert page.locator('[data-action="switchRole"]').count() == 0
    assert page.locator('[data-course="gig-502"], [data-course="gig-308"]').count() == 0
    assert 'Docente' not in page.locator('.profile').inner_text(), 'Untrusted user_metadata leaked into role'
    page.locator('.sidebar [data-action="settings"]').click()
    page.locator('[name="theme-choice"][value="dark"]').locator('..').click()
    expect(page.locator('html')).to_have_attribute('data-theme', 'dark')
    page.reload()
    page.locator('.course-card').wait_for()
    expect(page.locator('html')).to_have_attribute('data-theme', 'dark')
    assert page.evaluate("localStorage.getItem('sigin-theme-v1')") == 'dark'
    assert page.locator('.course-card').count() == 1

    page.evaluate("""() => { const b=document.createElement('button');b.dataset.action='switchRole';b.textContent='Intentar cambiar rol';document.querySelector('#app').append(b); }""")
    page.get_by_role('button', name='Intentar cambiar rol').click()
    assert page.locator('#toast').inner_text() == 'Cambiar de rol solo está disponible en la vista previa.'
    assert 'Docente' not in page.locator('.profile').inner_text()
    assert page.locator('[data-action="admin"]').count() == 0

    # Attempt navigation with injected controls; enrollment/profile guards must still apply.
    page.evaluate("""() => { const b=document.createElement('button');b.dataset.action='course';b.dataset.course='gig-502';b.textContent='Intentar otra materia';document.querySelector('#app').append(b); }""")
    page.get_by_role('button', name='Intentar otra materia').click()
    assert page.locator('#toast').inner_text() == 'Esta materia no está en tus matrículas.'
    assert page.locator('.course-card').count() == 1
    page.evaluate("""() => { const b=document.createElement('button');b.dataset.action='admin';b.textContent='Intentar panel docente';document.querySelector('#app').append(b); }""")
    page.get_by_role('button', name='Intentar panel docente').click()
    assert page.locator('#toast').inner_text() == 'Esta sección requiere una cuenta docente.'
    assert page.locator('#admin-course').count() == 0

    # Review is a teacher-only action, including controls inserted by a student.
    requests_before_review = len([r for r in requests if r['path'].endswith('/get_assessment')])
    page.evaluate("""() => { const b=document.createElement('button');b.dataset.action='reviewAssessment';b.dataset.week='1';b.textContent='Intentar revisión docente';document.querySelector('#app').append(b); }""")
    page.get_by_role('button', name='Intentar revisión docente').click()
    assert page.locator('#toast').inner_text() == 'Esta sección requiere una cuenta docente.'
    assert len([r for r in requests if r['path'].endswith('/get_assessment')]) == requests_before_review

    # The direct launcher preserves enrollments and closed weeks; practice still works.
    page.locator('.sidebar [data-action="activities"]').click()
    assert page.locator('#activity-course option').count() == 1
    assert page.locator('#activity-course').input_value() == course['id']
    page.locator('[data-action="activityMode"][data-mode="assessment"]').click()
    assert page.locator('[data-action="beginQuiz"][data-week="2"]').is_disabled()
    before_closed = len(requests)
    page.evaluate("""() => {const b=document.createElement('button');b.dataset.action='beginQuiz';b.dataset.course='gig-406';b.dataset.week='2';b.dataset.mode='assessment';b.textContent='Intentar examen cerrado';document.querySelector('#app').append(b);} """)
    page.get_by_role('button', name='Intentar examen cerrado').click()
    expect(page.locator('#toast')).to_have_text('Esta evaluación está cerrada.')
    assert page.locator('#quiz-answer').count() == 0
    assert len(requests) == before_closed
    page.evaluate("""() => {const b=document.createElement('button');b.dataset.action='beginQuiz';b.dataset.course='gig-502';b.dataset.week='1';b.dataset.mode='practice';b.textContent='Intentar práctica de otra materia';document.querySelector('#app').append(b);} """)
    page.get_by_role('button', name='Intentar práctica de otra materia').click()
    expect(page.locator('#toast')).to_have_text('Esta materia no está en tus matrículas.')
    assert page.locator('#quiz-answer').count() == 0
    page.locator('[data-action="activityMode"][data-mode="practice"]').click()
    second_week = page.locator('details.week').nth(1)
    second_week.locator('summary').click()
    second_week.locator('[data-action="beginQuiz"][data-mode="practice"]').click()
    assert page.locator('.case-reading-note').is_visible()
    assert page.locator('.quiz-dossier').get_attribute('open') is not None
    practice_question = page.evaluate("async()=>{const {courses}=await import('./assets/courses.js');return courses.find(c=>c.id==='gig-406').activities[1].questions[0];}")
    assert practice_question['type'] == 'choice'
    page.get_by_label(practice_question['options'][practice_question['correct']], exact=True).check()
    page.get_by_role('button', name='Comprobar mi respuesta', exact=False).click()
    assert page.get_by_role('heading', name='Bien razonado.').is_visible()
    assert page.get_by_text(practice_question['explanation'], exact=True).is_visible()
    page.get_by_role('button', name='Siguiente reto', exact=False).click()
    next_practice_question = page.evaluate("async()=>{const {courses}=await import('./assets/courses.js');return courses.find(c=>c.id==='gig-406').activities[1].questions[1];}")
    assert next_practice_question['type'] == 'choice'
    selected_option = page.get_by_label(next_practice_question['options'][next_practice_question['correct']], exact=True)
    selected_option.check()
    question_position = page.locator('.question-meta').inner_text()
    question_prompt = page.locator('.question-title').inner_text()
    assert 'Reto 2' in question_position
    for appearance in ['light', 'dark']:
        page.locator('.sidebar [data-action="settings"]').click()
        page.locator('#appearance-dialog').wait_for()
        page.locator('#appearance-dialog [name="theme-choice"][value="%s"]' % appearance).locator('..').click()
        expect(page.locator('html')).to_have_attribute('data-theme', appearance)
        page.locator('[data-action="closeSettings"]').click()
        assert page.locator('.question-meta').inner_text() == question_position
        assert page.locator('.question-title').inner_text() == question_prompt
        assert selected_option.is_checked()
        assert page.locator('#quiz-answer').count() == 1
    assert not [r for r in requests[before_closed:] if r['method'] != 'GET']
    page.get_by_role('button', name='Guardar y volver', exact=False).click()
    page.locator('[data-action="activityMode"][data-mode="assessment"]').click()
    page.locator('[data-action="beginQuiz"][data-week="1"][data-mode="assessment"]').click()
    page.get_by_role('heading', name=public_payload['name'], level=1).wait_for()
    assert page.locator('.case-reading-note').is_visible()
    assert page.locator('.quiz-dossier').get_attribute('open') is not None
    assert page.locator('.feedback').count() == 0
    assert page.get_by_role('button', name='Comprobar mi respuesta', exact=False).count() == 0

    for index, q in enumerate(public_payload['questions']):
        value = answer_by_id[q['id']]
        if q['type'] == 'choice':
            page.get_by_label(q['options'][value], exact=True).check()
        elif q['type'] == 'matching':
            for left, right in enumerate(value):
                page.locator('[data-action="matchLeft"][data-index="%s"]' % left).click()
                page.locator('[data-action="matchRight"][data-index="%s"]' % right).click()
        elif q['type'] == 'order':
            for target, item_index in enumerate(value):
                current = page.locator('.order-text').all_text_contents().index(q['items'][item_index])
                while current > target:
                    page.locator('.order-item').nth(current).get_by_role('button').nth(0).click()
                    current -= 1
        elif q['type'] == 'crossword':
            for cell_index in range(page.locator('.cw-input').count()):
                cell = page.locator('.cw-input').nth(cell_index)
                ref = json.loads(cell.get_attribute('data-refs'))[0]
                cell.fill(normalize_word(value[ref['entry']])[ref['letter']])
        page.get_by_role('button', name='Revisar antes de terminar' if index == 4 else 'Siguiente reto', exact=False).click()
    page.get_by_role('heading', name='Revisa tu razonamiento.').wait_for()
    page.get_by_role('button', name='Confirmar y terminar').click()
    page.locator('.result-big').wait_for()
    assert page.locator('.result-big').inner_text().startswith('10.0')
    assert len([r for r in requests if r['path'].endswith('/submit_assessment')]) == 1
    for q in activity['questions']:
        assert page.get_by_text(q['explanation'], exact=True).is_visible()
    assert page.locator('[data-action="admin"]').count() == 0

    # Previously used attempts block the launcher and manually inserted controls.
    attempts.append({**attempts[0], 'id': 'fixture-attempt-2'})
    page.reload()
    page.locator('.course-card').wait_for()
    page.locator('.sidebar [data-action="activities"]').click()
    page.locator('[data-action="activityMode"][data-mode="assessment"]').click()
    assert page.locator('[data-action="beginQuiz"][data-week="1"]').is_disabled()
    requests_before_quota = len(requests)
    page.evaluate("""() => {const b=document.createElement('button');b.dataset.action='beginQuiz';b.dataset.course='gig-406';b.dataset.week='1';b.dataset.mode='assessment';b.textContent='Intentar examen sin intentos';document.querySelector('#app').append(b);} """)
    page.get_by_role('button', name='Intentar examen sin intentos').click()
    expect(page.locator('#toast')).to_have_text('Ya utilizaste tus intentos.')
    assert page.locator('#quiz-answer').count() == 0
    assert len(requests) == requests_before_quota

    # Password changes must use Auth; mismatch must not produce a request.
    page.locator('.side-nav').get_by_role('button', name='Mi cuenta', exact=True).click()
    page.get_by_role('button', name='Cambiar mi contraseña').click()
    page.locator('[name="password"]').fill(PASSWORD)
    page.locator('[name="confirm"]').fill('NoCoincide!2026')
    page.get_by_role('button', name='Guardar mi contraseña').click()
    assert page.locator('#password-status').inner_text() == 'Las contraseñas no coinciden.'
    assert not [r for r in requests if r['path'] == '/auth/v1/user' and r['method'] == 'PUT']
    page.locator('[name="confirm"]').fill(PASSWORD)
    page.get_by_role('button', name='Guardar mi contraseña').click()
    page.locator('.course-card').wait_for()
    assert len([r for r in requests if r['path'] == '/auth/v1/user' and r['method'] == 'PUT']) == 1
    page.locator('.side-nav').get_by_role('button', name='Salir', exact=True).click()
    expect(page.locator('html')).to_have_attribute('data-theme', 'dark')

    # A recovery failure must remain a failure, with no simulated delivery.
    page.get_by_role('button', name='Olvidé mi contraseña').click()
    page.locator('[name="username"]').fill(STUDENT_NUMBER)
    state['recovery_error'] = True
    page.get_by_role('button', name='Solicitar enlace de recuperación').click()
    expect(page.locator('#recovery-status')).to_have_text('SMTP de prueba no disponible')
    state['recovery_error'] = False
    page.get_by_role('button', name='Solicitar enlace de recuperación').click()
    page.get_by_text('Solicitud recibida.', exact=False).wait_for()
    status = page.locator('#recovery-status').inner_text()
    assert 'Si la cuenta existe y el correo está habilitado' in status
    recoveries = [r for r in requests if r['path'] == '/auth/v1/recover']
    assert len(recoveries) == 2 and all(r['body']['email'] == EMAIL for r in recoveries)

    # A validated teacher can inspect a closed bank without attempts or writes.
    page.get_by_role('button', name='Volver al acceso').click()
    state['teacher_mode'] = True
    page.locator('#username').fill(STUDENT_NUMBER)
    page.locator('#password').fill('ClaveTemporalDePrueba')
    page.get_by_role('button', name='Entrar a mi aula', exact=False).click()
    page.get_by_role('button', name='Espacio docente', exact=False).wait_for()
    page.get_by_role('button', name='Espacio docente', exact=False).click()
    page.locator('#admin-course').select_option(course['id'])
    week = page.locator('details.week').first
    week.locator('summary').click()
    assert week.locator('[name="locked"]').is_checked()
    state['bank_missing'] = True
    week.get_by_role('button', name='Ver evaluación', exact=False).click()
    expect(page.locator('#toast')).to_have_text('La docente todavía no ha publicado esta evaluación.')
    assert page.locator('.assessment-review').count() == 0
    state['bank_missing'] = False
    readonly_start = len(requests)
    attempt_count = len(attempts)
    week.get_by_role('button', name='Ver evaluación', exact=False).click()
    page.get_by_role('heading', name='Vista de evaluación', exact=True).wait_for()
    review = page.locator('.assessment-review')
    assert review.locator('.assessment-review-question').count() == 5
    assert review.locator('input,textarea,select,form,button').count() == 0
    for q in public_payload['questions']:
        assert review.get_by_role('heading', name=q['prompt'], exact=True).is_visible()
    for title in ['Conceptos clave', 'Caso breve', 'Qué debes hacer']:
        assert review.get_by_role('heading', name=re.compile(r'^'+re.escape(title)+r'(?:\s*[:·—–-].*)?$', re.I)).is_visible()
    for block in public_payload['context'].split('\n\n'):
        paragraph = block.split('\n', 1)[-1].strip()
        assert review.get_by_text(paragraph, exact=True).is_visible()
    assert review.get_by_text(public_payload['questions'][0]['options'][0], exact=True).is_visible()
    matching = next(q for q in public_payload['questions'] if q['type'] == 'matching')
    assert review.get_by_text(matching['lefts'][0], exact=True).is_visible()
    assert review.get_by_text(matching['rights'][0], exact=True).is_visible()
    crossword = next(q for q in public_payload['questions'] if q['type'] == 'crossword')
    assert review.get_by_text(crossword['entries'][0]['clue'], exact=False).is_visible()
    assert len(attempts) == attempt_count
    assert [r['path'] for r in requests[readonly_start:]] == ['/rest/v1/rpc/get_assessment']
    page.get_by_role('button', name='Volver a semanas y horarios', exact=False).click()
    page.locator('#admin-course').wait_for()
    assert page.locator('#admin-course').input_value() == course['id']
    assert page.locator('.assessment-review').count() == 0
    assert not errors, errors
    assert not [r for r in requests if r['path'].endswith('/publish_assessment') or r['path'].endswith('/manage-students')]
    print('PASS: isolated live login; theme survives authenticated reload/logout; direct practice/exam enrollment, calendar and quota guards; five private retos without numeric questions; server grading; password change; recovery success/failure; teacher read-only review; no JS errors')
    browser.close()

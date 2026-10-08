"""Prueba real de cuota concurrente después de integration.sql, con PostgreSQL efímero."""
import json
import subprocess
from concurrent.futures import ThreadPoolExecutor

command = ["docker", "exec", "-i", "sigin-sql-test", "psql", "-q", "-v", "ON_ERROR_STOP=1", "-U", "postgres", "-d", "sigin_test"]
subprocess.run(command, input="update public.week_settings set closes_at=null,max_attempts=1 where course_id='gig-502' and week=2;", text=True, check=True)
answers = [{"id": "a", "value": 1}, {"id": "b", "value": 20.5}, {"id": "c", "value": [1, 0, 2]}, {"id": "d", "value": [2, 0, 1]}, {"id": "e", "value": ["INFORMACION", "DATOS"]}]
query = f"""begin;
set role authenticated;
set request.jwt.claim.sub='00000000-0000-4000-8000-000000000002';
select public.submit_assessment('gig-502',2,'{json.dumps(answers)}');
select pg_sleep(1);
commit;"""
def submit(_):
    return subprocess.run(command, input=query, text=True, capture_output=True)
with ThreadPoolExecutor(max_workers=2) as pool:
    results = list(pool.map(submit, range(2)))
assert sum(result.returncode == 0 for result in results) == 1, [(result.returncode, result.stderr) for result in results]
assert sum("ATTEMPTS_EXHAUSTED" in result.stderr for result in results) == 1, [result.stderr for result in results]
count = subprocess.run(command + ["-At", "-c", "select count(*) from public.attempts where course_id='gig-502' and week=2 and not teacher_adjustment"], text=True, capture_output=True, check=True)
assert count.stdout.strip() == "1", count.stdout
print("OK: dos entregas concurrentes, exactamente un intento aceptado")

# Un corte de red puede originar dos solicitudes de la misma entrega: ambas recuperan el mismo intento.
subprocess.run(command, input="update public.week_settings set enabled=true,closes_at=null,max_attempts=1 where course_id='gig-502' and week=3;", text=True, check=True)
query = """begin;
set role authenticated;
set request.jwt.claim.sub='00000000-0000-4000-8000-000000000002';
select public.submit_assessment('gig-502',3,'[{"id":"fresh","value":20}]','10000000-0000-4000-8000-000000000003');
select pg_sleep(1);
commit;"""
with ThreadPoolExecutor(max_workers=2) as pool:
    results = list(pool.map(submit, range(2)))
assert all(result.returncode == 0 for result in results), [(result.returncode, result.stderr) for result in results]
count = subprocess.run(command + ["-At", "-c", "select count(*) from public.attempts where course_id='gig-502' and week=3 and not teacher_adjustment"], text=True, capture_output=True, check=True)
assert count.stdout.strip() == "1", count.stdout
print("OK: dos reintentos concurrentes con igual nonce, un único intento guardado")

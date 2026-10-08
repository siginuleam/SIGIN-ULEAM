-- SIGIN · ejecutar en Supabase SQL Editor. No incluye personas ni contraseñas.
-- Idempotente para una instalación inicial; revisar migraciones antes de cambiar una instancia con datos.
begin;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  student_number text unique check (student_number is null or student_number ~ '^[0-9]{10}$'),
  display_name text not null check (length(btrim(display_name)) between 2 and 120),
  role text not null default 'student' check (role in ('student', 'teacher')),
  must_change_password boolean not null default true,
  created_at timestamptz not null default now(),
  check (role = 'teacher' or student_number is not null)
);
create table if not exists public.courses (
  id text primary key check (id ~ '^[a-z0-9-]+$'),
  name text not null,
  weeks_count integer not null default 16 check (weeks_count between 1 and 52)
);
create table if not exists public.enrollments (
  student_id uuid references public.profiles(id) on delete cascade,
  course_id text references public.courses(id) on delete cascade,
  group_name text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (student_id, course_id)
);
create table if not exists public.week_settings (
  course_id text references public.courses(id) on delete cascade,
  week integer not null check (week between 1 and 52),
  opens_at timestamptz,
  closes_at timestamptz,
  enabled boolean not null default false,
  max_attempts integer not null default 2 check (max_attempts between 1 and 20),
  primary key (course_id, week),
  check (opens_at is null or closes_at is null or closes_at > opens_at)
);
create table if not exists private.assessment_keys (
  course_id text references public.courses(id) on delete cascade,
  week integer not null,
  public_payload jsonb not null check (jsonb_typeof(public_payload) = 'object'),
  answer_key jsonb not null check (jsonb_typeof(answer_key) = 'array' and jsonb_array_length(answer_key) > 0),
  primary key (course_id, week),
  foreign key (course_id, week) references public.week_settings(course_id, week) on delete cascade
);
-- Una semana solo puede abrirse cuando existe su evaluación privada.
-- SECURITY DEFINER permite comprobar el banco sin conceder lectura de respuestas a la docente.
create or replace function private.require_assessment_before_open() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.enabled and not exists (
    select 1 from private.assessment_keys where course_id = new.course_id and week = new.week
  ) then
    raise exception 'NO_ASSESSMENT_KEY';
  end if;
  return new;
end $$;
revoke all on function private.require_assessment_before_open() from public, anon, authenticated;
drop trigger if exists sigin_week_requires_assessment on public.week_settings;
create trigger sigin_week_requires_assessment before insert or update of enabled, course_id, week on public.week_settings
for each row execute function private.require_assessment_before_open();

-- Rechazar bancos mal formados y respuestas que se hayan copiado por error al enunciado público.
create or replace function private.validate_assessment_bank() returns trigger
language plpgsql set search_path = '' as $$
declare q jsonb; payload_q jsonb;
begin
  if jsonb_typeof(new.public_payload->'questions') <> 'array' or new.public_payload->'questions' is null
    or jsonb_array_length(new.public_payload->'questions') <> jsonb_array_length(new.answer_key)
    or jsonb_array_length(new.answer_key) > 100 then raise exception 'INVALID_ASSESSMENT_BANK'; end if;
  if new.public_payload::text ~ '"(correct|answer_key|answerKey|solution|explanation|word)"\s*:'
     or new.public_payload::text ~ '"letter"\s*:\s*"' then
    raise exception 'ANSWER_IN_PUBLIC_PAYLOAD';
  end if;
  if (select count(distinct x->>'id') from jsonb_array_elements(new.answer_key) x) <> jsonb_array_length(new.answer_key)
    or (select count(distinct x->>'id') from jsonb_array_elements(new.public_payload->'questions') x) <> jsonb_array_length(new.answer_key) then raise exception 'INVALID_ASSESSMENT_BANK'; end if;
  for q in select * from jsonb_array_elements(new.answer_key) loop
    if not q ? 'correct' or coalesce(q->>'type','') not in ('choice','numeric','matching','order','crossword') then raise exception 'INVALID_ASSESSMENT_BANK'; end if;
    select x into payload_q from jsonb_array_elements(new.public_payload->'questions') x where x->>'id' = q->>'id' and x->>'type'=q->>'type';
    if payload_q is null then raise exception 'INVALID_ASSESSMENT_BANK'; end if;
  end loop;
  return new;
end $$;
revoke all on function private.validate_assessment_bank() from public, anon, authenticated;
drop trigger if exists sigin_assessment_bank on private.assessment_keys;
create trigger sigin_assessment_bank before insert or update on private.assessment_keys
for each row execute function private.validate_assessment_bank();

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  submission_id uuid not null default gen_random_uuid(),
  course_id text not null references public.courses(id) on delete cascade,
  week integer not null check (week between 1 and 52),
  score numeric(5,2) not null check (score between 0 and 10),
  answers jsonb not null default '[]'::jsonb,
  feedback jsonb not null default '[]'::jsonb,
  teacher_adjustment boolean not null default false,
  reason text,
  created_at timestamptz not null default now()
);
alter table public.attempts add column if not exists submission_id uuid not null default gen_random_uuid();
create unique index if not exists attempts_submission_id on public.attempts(student_id,submission_id);
create index if not exists attempts_student_course_week on public.attempts(student_id, course_id, week, created_at);
create table if not exists public.practice_progress (
  student_id uuid references public.profiles(id) on delete cascade,
  course_id text references public.courses(id) on delete cascade,
  week integer not null check (week between 1 and 52),
  completed_at timestamptz not null default now(),
  primary key (student_id, course_id, week)
);

-- Funciones de política con search_path explícito. Nadie puede declararse docente desde la interfaz.
create or replace function private.is_teacher() returns boolean
language sql stable security definer set search_path = ''
as $$ select exists(select 1 from public.profiles where id = auth.uid() and role = 'teacher' and not must_change_password) $$;
create or replace function private.active_user() returns boolean
language sql stable security definer set search_path = ''
as $$ select exists(select 1 from public.profiles where id = auth.uid() and not must_change_password) $$;
create or replace function private.enrolled(p_course_id text) returns boolean
language sql stable security definer set search_path = ''
as $$ select private.active_user() and exists(select 1 from public.enrollments where student_id = auth.uid() and course_id = p_course_id and active) $$;
revoke all on function private.is_teacher(), private.active_user(), private.enrolled(text) from public;
-- USAGE se concede únicamente para resolver las funciones de política, no para leer tablas privadas.
grant usage on schema private to authenticated;
grant execute on function private.is_teacher(), private.active_user(), private.enrolled(text) to authenticated;
revoke all on all tables in schema private from public, anon, authenticated;

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.week_settings enable row level security;
alter table public.attempts enable row level security;
alter table public.practice_progress enable row level security;

-- Grants mínimos; las cuentas autenticadas no escriben perfiles ni notas directamente.
revoke all on public.profiles, public.courses, public.enrollments, public.week_settings, public.attempts, public.practice_progress from anon, authenticated;
grant select, insert, update, delete on public.profiles, public.courses, public.enrollments, public.week_settings, public.attempts, public.practice_progress to service_role;
grant select on public.profiles, public.attempts to authenticated;
grant select, insert, update, delete on public.courses, public.enrollments, public.week_settings, public.practice_progress to authenticated;

drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles for select to authenticated using (id = auth.uid() or private.is_teacher());
drop policy if exists courses_read on public.courses;
create policy courses_read on public.courses for select to authenticated using (private.is_teacher() or private.enrolled(id));
drop policy if exists courses_teacher on public.courses;
create policy courses_teacher on public.courses for all to authenticated using (private.is_teacher()) with check (private.is_teacher());
drop policy if exists enrollments_read on public.enrollments;
create policy enrollments_read on public.enrollments for select to authenticated using (private.is_teacher() or (student_id = auth.uid() and private.active_user()));
drop policy if exists enrollments_teacher on public.enrollments;
create policy enrollments_teacher on public.enrollments for all to authenticated using (private.is_teacher()) with check (private.is_teacher());
drop policy if exists settings_read on public.week_settings;
create policy settings_read on public.week_settings for select to authenticated using (private.is_teacher() or private.enrolled(course_id));
drop policy if exists settings_teacher on public.week_settings;
create policy settings_teacher on public.week_settings for all to authenticated using (private.is_teacher()) with check (private.is_teacher());
drop policy if exists attempts_read on public.attempts;
create policy attempts_read on public.attempts for select to authenticated using (private.is_teacher() or (student_id = auth.uid() and private.enrolled(course_id)));
drop policy if exists practice_read on public.practice_progress;
create policy practice_read on public.practice_progress for select to authenticated using (private.is_teacher() or (student_id = auth.uid() and private.enrolled(course_id)));
drop policy if exists practice_write on public.practice_progress;
create policy practice_write on public.practice_progress for all to authenticated using (student_id = auth.uid() and private.enrolled(course_id)) with check (student_id = auth.uid() and private.enrolled(course_id));

-- Cambiar contraseña a través de Supabase Auth libera la contraseña temporal.
-- La columna no es editable por el alumno. El trigger no modifica auth.users.
create or replace function private.password_changed() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.encrypted_password is distinct from old.encrypted_password and coalesce(new.encrypted_password, '') <> '' then
    update public.profiles set must_change_password = false where id = new.id;
  end if;
  return new;
end $$;
revoke all on function private.password_changed() from public, anon, authenticated;
drop trigger if exists sigin_password_changed on auth.users;
create trigger sigin_password_changed after update of encrypted_password on auth.users
for each row execute function private.password_changed();

-- Validación común: además de RLS, los RPC comprueban identidad, matrícula, calendario y cuota.
create or replace function private.assessment_allowed(p_course_id text, p_week integer) returns public.week_settings
language plpgsql security definer set search_path = '' as $$
declare settings public.week_settings; uid uuid := auth.uid();
begin
  if uid is null then raise exception 'AUTH_REQUIRED'; end if;
  if not private.active_user() then raise exception 'PASSWORD_CHANGE_REQUIRED'; end if;
  if not private.enrolled(p_course_id) then raise exception 'NOT_ENROLLED'; end if;
  select * into settings from public.week_settings where course_id = p_course_id and week = p_week;
  if not found or not settings.enabled or (settings.opens_at is not null and clock_timestamp() < settings.opens_at)
    or (settings.closes_at is not null and clock_timestamp() >= settings.closes_at) then raise exception 'WINDOW_CLOSED'; end if;
  if (select count(*) from public.attempts where student_id = uid and course_id = p_course_id and week = p_week and not teacher_adjustment) >= settings.max_attempts then
    raise exception 'ATTEMPTS_EXHAUSTED';
  end if;
  return settings;
end $$;
revoke all on function private.assessment_allowed(text,integer) from public, anon, authenticated;

-- La docente carga otro banco desde su sesión: las claves nunca se publican en Pages.
create or replace function public.publish_assessment(p_course_id text,p_week integer,p_public_payload jsonb,p_answer_key jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare settings public.week_settings;
begin
  if not private.is_teacher() then raise exception 'TEACHER_REQUIRED'; end if;
  select * into settings from public.week_settings where course_id=p_course_id and week=p_week for update;
  if not found then raise exception 'INVALID_WEEK'; end if;
  if settings.enabled then raise exception 'CLOSE_BEFORE_PUBLISH'; end if;
  if p_public_payload is null or p_answer_key is null or octet_length(p_public_payload::text)>262144 or octet_length(p_answer_key::text)>65536 then raise exception 'INVALID_ASSESSMENT_BANK'; end if;
  insert into private.assessment_keys(course_id,week,public_payload,answer_key)
  values(p_course_id,p_week,p_public_payload,p_answer_key)
  on conflict(course_id,week) do update set public_payload=excluded.public_payload,answer_key=excluded.answer_key;
  return jsonb_build_object('courseId',p_course_id,'week',p_week,'questions',jsonb_array_length(p_answer_key),'published',true);
end $$;
revoke all on function public.publish_assessment(text,integer,jsonb,jsonb) from public, anon;
grant execute on function public.publish_assessment(text,integer,jsonb,jsonb) to authenticated;

create or replace function public.get_assessment(p_course_id text, p_week integer) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare payload jsonb;
begin
  if not private.is_teacher() then perform private.assessment_allowed(p_course_id,p_week); end if;
  select public_payload into payload from private.assessment_keys where course_id = p_course_id and week = p_week;
  if payload is null then raise exception 'NO_ASSESSMENT_KEY'; end if;
  return payload;
end $$;
revoke all on function public.get_assessment(text,integer) from public, anon;
grant execute on function public.get_assessment(text,integer) to authenticated;

drop function if exists public.submit_assessment(text,integer,jsonb);
create or replace function public.submit_assessment(p_course_id text, p_week integer, p_answers jsonb, p_submission_id uuid default gen_random_uuid()) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  uid uuid := auth.uid(); bank private.assessment_keys; previous_attempt public.attempts; q jsonb; a jsonb; value jsonb;
  matched boolean; earned numeric := 0; total numeric := 0; weight numeric; score_value numeric;
  feedback_value jsonb := '[]'::jsonb; attempt_uuid uuid; item jsonb; idx integer; normalized text;
begin
  if uid is null then raise exception 'AUTH_REQUIRED'; end if;
  if p_submission_id is null then raise exception 'INVALID_SUBMISSION_ID'; end if;
  -- El nonce y la semana se bloquean en este orden: un reintento de red nunca consume otra cuota.
  perform pg_advisory_xact_lock(hashtextextended(uid::text || ':submission:' || p_submission_id::text, 0));
  perform pg_advisory_xact_lock(hashtextextended(uid::text || ':' || p_course_id || ':' || p_week::text, 0));
  if not private.active_user() then raise exception 'PASSWORD_CHANGE_REQUIRED'; end if;
  if not private.enrolled(p_course_id) then raise exception 'NOT_ENROLLED'; end if;
  select * into previous_attempt from public.attempts where student_id=uid and submission_id=p_submission_id;
  if found then
    if previous_attempt.course_id<>p_course_id or previous_attempt.week<>p_week or previous_attempt.answers is distinct from p_answers then raise exception 'SUBMISSION_ID_REUSED'; end if;
    return jsonb_build_object('id',previous_attempt.id,'score',previous_attempt.score,'feedback',previous_attempt.feedback,'createdAt',previous_attempt.created_at);
  end if;
  perform private.assessment_allowed(p_course_id,p_week);
  select * into bank from private.assessment_keys where course_id = p_course_id and week = p_week;
  if not found then raise exception 'NO_ASSESSMENT_KEY'; end if;
  if p_answers is null or jsonb_typeof(p_answers) <> 'array' or jsonb_array_length(p_answers) <> jsonb_array_length(bank.answer_key)
     or octet_length(p_answers::text) > 65536 then raise exception 'INVALID_ANSWERS'; end if;
  if exists(select 1 from jsonb_array_elements(p_answers) x where jsonb_typeof(x) <> 'object' or not x ? 'id' or not x ? 'value')
     or (select count(distinct x->>'id') from jsonb_array_elements(p_answers) x) <> jsonb_array_length(p_answers) then raise exception 'INVALID_ANSWERS'; end if;
  for q in select * from jsonb_array_elements(bank.answer_key) loop
    select x into a from jsonb_array_elements(p_answers) x where x->>'id' = q->>'id';
    if a is null then raise exception 'INVALID_ANSWERS'; end if;
    value := a->'value'; weight := coalesce((q->>'weight')::numeric, 1);
    if weight <= 0 or weight > 100 then raise exception 'INVALID_ASSESSMENT_KEY'; end if;
    matched := false;
    case q->>'type'
    when 'choice' then
      if jsonb_typeof(value) <> 'number' or (value::text)::numeric <> trunc((value::text)::numeric) or (value::text)::numeric < 0 then raise exception 'INVALID_ANSWERS'; end if;
      matched := value = q->'correct';
    when 'numeric' then
      if jsonb_typeof(value) <> 'number' then raise exception 'INVALID_ANSWERS'; end if;
      matched := abs((value::text)::numeric - (q->>'correct')::numeric) <= coalesce((q->>'tolerance')::numeric, 0.01);
    when 'matching', 'order' then
      if jsonb_typeof(value) <> 'array' or jsonb_array_length(value) <> jsonb_array_length(q->'correct') then raise exception 'INVALID_ANSWERS'; end if;
      for item in select * from jsonb_array_elements(value) loop
        if jsonb_typeof(item) <> 'number' or (item::text)::numeric <> trunc((item::text)::numeric) or (item::text)::numeric < 0 or (item::text)::numeric >= jsonb_array_length(value) then raise exception 'INVALID_ANSWERS'; end if;
      end loop;
      if (select count(distinct x) from jsonb_array_elements(value) x) <> jsonb_array_length(value) then raise exception 'INVALID_ANSWERS'; end if;
      matched := value = q->'correct';
    when 'crossword' then
      if jsonb_typeof(value) <> 'array' or jsonb_array_length(value) <> jsonb_array_length(q->'correct') then raise exception 'INVALID_ANSWERS'; end if;
      matched := true; idx := 0;
      for item in select * from jsonb_array_elements(value) loop
        if jsonb_typeof(item) <> 'string' or length(item #>> '{}') > 100 then raise exception 'INVALID_ANSWERS'; end if;
        normalized := upper(translate(regexp_replace(item #>> '{}', '\s+', '', 'g'), 'áéíóúüñÁÉÍÓÚÜÑ', 'aeiouunAEIOUUN'));
        if normalized <> upper(translate(regexp_replace(q->'correct'->>idx, '\s+', '', 'g'), 'áéíóúüñÁÉÍÓÚÜÑ', 'aeiouunAEIOUUN')) then matched := false; end if;
        idx := idx + 1;
      end loop;
    else raise exception 'INVALID_ASSESSMENT_KEY';
    end case;
    total := total + weight;
    if matched then earned := earned + weight; end if;
    -- Se devuelve explicación después de entregar, sin claves de otros estudiantes ni acceso a la tabla privada.
    feedback_value := feedback_value || jsonb_build_array(jsonb_build_object('id',q->>'id','correct',matched,'explanation',coalesce(q->>'explanation','')));
  end loop;
  score_value := round(10 * earned / total, 2);
  insert into public.attempts(student_id,submission_id,course_id,week,score,answers,feedback)
  values(uid,p_submission_id,p_course_id,p_week,score_value,p_answers,feedback_value) returning id into attempt_uuid;
  return jsonb_build_object('id',attempt_uuid,'score',score_value,'feedback',feedback_value,'createdAt',now());
end $$;
revoke all on function public.submit_assessment(text,integer,jsonb,uuid) from public, anon;
grant execute on function public.submit_assessment(text,integer,jsonb,uuid) to authenticated;

create or replace function public.adjust_grade(p_student_id uuid,p_course_id text,p_week integer,p_score numeric,p_reason text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare attempt_uuid uuid;
begin
  if not private.is_teacher() then raise exception 'TEACHER_REQUIRED'; end if;
  if p_score is null or p_score < 0 or p_score > 10 or coalesce(length(btrim(p_reason)),0) < 5 or length(p_reason)>1000 then raise exception 'INVALID_GRADE_ADJUSTMENT'; end if;
  if not exists(select 1 from public.enrollments where student_id=p_student_id and course_id=p_course_id and active) then raise exception 'NOT_ENROLLED'; end if;
  if not exists(select 1 from public.week_settings where course_id=p_course_id and week=p_week) then raise exception 'INVALID_WEEK'; end if;
  insert into public.attempts(student_id,course_id,week,score,teacher_adjustment,reason)
    values(p_student_id,p_course_id,p_week,p_score,true,p_reason) returning id into attempt_uuid;
  return jsonb_build_object('id',attempt_uuid,'score',p_score,'createdAt',now());
end $$;
revoke all on function public.adjust_grade(uuid,text,integer,numeric,text) from public, anon;
grant execute on function public.adjust_grade(uuid,text,integer,numeric,text) to authenticated;

-- Solo el servicio de aprovisionamiento puede registrar perfiles/matrículas; una fila se guarda en una transacción.
drop function if exists public.provision_student(uuid,text,text,text[],text);
create or replace function public.provision_student(p_user_id uuid,p_student_number text,p_display_name text,p_courses text[],p_group text default '',p_course_groups jsonb default '{}'::jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare course text; existing_role text;
begin
  if jsonb_typeof(p_course_groups)<>'object' then raise exception 'INVALID_STUDENT'; end if;
  if p_student_number !~ '^[0-9]{10}$' or length(btrim(p_display_name)) not between 2 and 120 or coalesce(array_length(p_courses,1),0)=0 then raise exception 'INVALID_STUDENT'; end if;
  select role into existing_role from public.profiles where id=p_user_id;
  if existing_role is not null and existing_role <> 'student' then raise exception 'TEACHER_CANNOT_BE_STUDENT'; end if;
  if exists(select 1 from unnest(p_courses) c where not exists(select 1 from public.courses where id=c)) then raise exception 'INVALID_COURSE'; end if;
  insert into public.profiles(id,student_number,display_name,role,must_change_password)
    values(p_user_id,p_student_number,btrim(p_display_name),'student',true)
    on conflict(id) do update set display_name=excluded.display_name;
  foreach course in array p_courses loop
    insert into public.enrollments(student_id,course_id,group_name,active) values(p_user_id,course,left(coalesce(p_course_groups->>course,p_group,''),80),true)
      on conflict(student_id,course_id) do update set active=true,group_name=excluded.group_name;
  end loop;
  return jsonb_build_object('id',p_user_id,'student_number',p_student_number);
end $$;
revoke all on function public.provision_student(uuid,text,text,text[],text,jsonb) from public, anon, authenticated;
grant execute on function public.provision_student(uuid,text,text,text[],text,jsonb) to service_role;

insert into public.courses(id,name) values
 ('gig-502','Alfabetización y Competencias Informacionales'),
 ('cex-103','Comercio Exterior'),
 ('gig-406','Gobierno Electrónico y Administración Pública')
on conflict(id) do nothing;
insert into public.week_settings(course_id,week)
select c.id,w from public.courses c cross join generate_series(1,16) w on conflict do nothing;

commit;

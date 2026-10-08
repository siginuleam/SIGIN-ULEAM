\set ON_ERROR_STOP on
-- Fixtures ficticios y desechables; sin identidades de estudiantes reales.
insert into auth.users(id,encrypted_password) values
 ('00000000-0000-4000-8000-000000000001','fixture'),
 ('00000000-0000-4000-8000-000000000002','fixture'),
 ('00000000-0000-4000-8000-000000000003','fixture'),
 ('00000000-0000-4000-8000-000000000004','fixture');
insert into public.profiles(id,student_number,display_name,role,must_change_password) values
 ('00000000-0000-4000-8000-000000000001',null,'Docente ficticia','teacher',false),
 ('00000000-0000-4000-8000-000000000002','0000000002','Estudiante A','student',false),
 ('00000000-0000-4000-8000-000000000003','0000000003','Estudiante B','student',false),
 ('00000000-0000-4000-8000-000000000004','0000000004','Estudiante temporal','student',true);
insert into public.enrollments(student_id,course_id) values
 ('00000000-0000-4000-8000-000000000002','gig-502'),
 ('00000000-0000-4000-8000-000000000003','cex-103'),
 ('00000000-0000-4000-8000-000000000004','gig-502');
update public.week_settings set enabled=true,max_attempts=2 where course_id='gig-502' and week in (1,2);
insert into private.assessment_keys(course_id,week,public_payload,answer_key) values('gig-502',1,
 '{"context":"Caso ficticio","questions":[{"id":"a","type":"choice"},{"id":"b","type":"numeric"},{"id":"c","type":"matching"},{"id":"d","type":"order"},{"id":"e","type":"crossword"}]}',
 '[{"id":"a","type":"choice","correct":1,"explanation":"Criterio A"},{"id":"b","type":"numeric","correct":20.5,"tolerance":0.01},{"id":"c","type":"matching","correct":[1,0,2]},{"id":"d","type":"order","correct":[2,0,1]},{"id":"e","type":"crossword","correct":["INFORMACIÓN","DATOS"]}]');
insert into private.assessment_keys select course_id,2,public_payload,answer_key from private.assessment_keys where week=1;

do $$ begin
 begin
  update private.assessment_keys set public_payload=jsonb_set(public_payload,'{questions,0,correct}','1') where week=1;
  raise exception 'FAIL: answer leaked in public bank';
 exception when others then
  if sqlerrm<>'ANSWER_IN_PUBLIC_PAYLOAD' then raise; end if;
 end;
end $$;

set role authenticated;
set request.jwt.claim.sub = '00000000-0000-4000-8000-000000000002';
do $$
declare result jsonb; n integer;
begin
 select count(*) into n from public.profiles;
 if n<>1 then raise exception 'FAIL: profile isolation'; end if;
 select count(*) into n from public.courses;
 if n<>1 then raise exception 'FAIL: course isolation'; end if;
 select count(*) into n from public.enrollments;
 if n<>1 then raise exception 'FAIL: enrollment isolation'; end if;
 begin
  perform * from private.assessment_keys;
  raise exception 'FAIL: student reads answers';
 exception when insufficient_privilege then null;
 end;
 begin
  update public.profiles set role='teacher' where id=auth.uid();
  raise exception 'FAIL: student changes role';
 exception when insufficient_privilege then null;
 end;
 begin
  insert into public.attempts(student_id,course_id,week,score) values(auth.uid(),'gig-502',1,10);
  raise exception 'FAIL: student writes grade';
 exception when insufficient_privilege then null;
 end;
 begin
  perform public.get_assessment('cex-103',1);
  raise exception 'FAIL: non-enrolled evaluation';
 exception when others then
  if sqlerrm<>'NOT_ENROLLED' then raise; end if;
 end;
 result:=public.get_assessment('gig-502',1);
 if jsonb_array_length(result->'questions')<>5 or result::text like '%"correct"%' then raise exception 'FAIL: public assessment'; end if;
 begin
  perform public.submit_assessment('gig-502',1,'[{"id":"a","value":1}]');
  raise exception 'FAIL: short submission accepted';
 exception when others then
  if sqlerrm<>'INVALID_ANSWERS' then raise; end if;
 end;
 result:=public.submit_assessment('gig-502',1,'[{"id":"a","value":1},{"id":"b","value":20.505},{"id":"c","value":[1,0,2]},{"id":"d","value":[2,0,1]},{"id":"e","value":["informacion"," datos "]}]','10000000-0000-4000-8000-000000000001');
 if (result->>'score')::numeric<>10 then raise exception 'FAIL: five question grading, %',result; end if;
 if jsonb_array_length(result->'feedback')<>5 then raise exception 'FAIL: feedback'; end if;
 result:=public.submit_assessment('gig-502',1,'[{"id":"a","value":0},{"id":"b","value":20},{"id":"c","value":[0,1,2]},{"id":"d","value":[0,1,2]},{"id":"e","value":["x","x"]}]');
 if (result->>'score')::numeric<>0 then raise exception 'FAIL: wrong answers grade'; end if;
 begin
  perform public.submit_assessment('gig-502',1,'[{"id":"a","value":1},{"id":"b","value":20.5},{"id":"c","value":[1,0,2]},{"id":"d","value":[2,0,1]},{"id":"e","value":["INFORMACION","DATOS"]}]');
  raise exception 'FAIL: quota bypass';
 exception when others then
  if sqlerrm<>'ATTEMPTS_EXHAUSTED' then raise; end if;
 end;
 result:=public.submit_assessment('gig-502',1,'[{"id":"a","value":1},{"id":"b","value":20.505},{"id":"c","value":[1,0,2]},{"id":"d","value":[2,0,1]},{"id":"e","value":["informacion"," datos "]}]','10000000-0000-4000-8000-000000000001');
 if (result->>'score')::numeric<>10 or (select count(*) from public.attempts)<>2 then raise exception 'FAIL: retry consumed quota'; end if;
 begin
  perform public.submit_assessment('gig-502',1,'[{"id":"a","value":0}]','10000000-0000-4000-8000-000000000001');
  raise exception 'FAIL: nonce altered payload';
 exception when others then
  if sqlerrm<>'SUBMISSION_ID_REUSED' then raise; end if;
 end;
 begin
  perform public.adjust_grade(auth.uid(),'gig-502',1,10,'motivo');
  raise exception 'FAIL: student adjusts grade';
 exception when others then
  if sqlerrm<>'TEACHER_REQUIRED' then raise; end if;
 end;
end $$;

do $$ begin
 begin
  perform public.publish_assessment('gig-502',3,'{"questions":[{"id":"fresh","type":"numeric"}]}','[{"id":"fresh","type":"numeric","correct":20}]');
  raise exception 'FAIL: student publishes bank';
 exception when others then
  if sqlerrm<>'TEACHER_REQUIRED' then raise; end if;
 end;
end $$;

set request.jwt.claim.sub='00000000-0000-4000-8000-000000000003';
do $$
begin
 if exists(select 1 from public.attempts) then raise exception 'FAIL: foreign attempts visible'; end if;
end $$;
set request.jwt.claim.sub='00000000-0000-4000-8000-000000000004';
do $$
begin
 if exists(select 1 from public.courses) then raise exception 'FAIL: temporary password reads classroom'; end if;
 begin
  perform public.get_assessment('gig-502',2);
  raise exception 'FAIL: temporary password evaluates';
 exception when others then
  if sqlerrm<>'PASSWORD_CHANGE_REQUIRED' then raise; end if;
 end;
end $$;
reset role;
update auth.users set encrypted_password='changed-fixture' where id='00000000-0000-4000-8000-000000000004';
set role authenticated;
set request.jwt.claim.sub='00000000-0000-4000-8000-000000000004';
do $$
begin
 if not exists(select 1 from public.courses) then raise exception 'FAIL: password change does not activate'; end if;
end $$;
set request.jwt.claim.sub='00000000-0000-4000-8000-000000000001';
do $$
declare n integer;
begin
 select count(*) into n from public.profiles;
 if n<>4 then raise exception 'FAIL: teacher profile list'; end if;
 perform public.publish_assessment('gig-502',3,'{"context":"nuevo caso","questions":[{"id":"fresh","type":"numeric"}]}','[{"id":"fresh","type":"numeric","correct":20}]');
 if public.get_assessment('gig-502',3)->>'context'<>'nuevo caso' then raise exception 'FAIL: teacher bank publication'; end if;
 begin
  perform public.publish_assessment('gig-502',1,'{"questions":[{"id":"fresh","type":"numeric"}]}','[{"id":"fresh","type":"numeric","correct":20}]');
  raise exception 'FAIL: modifies active bank';
 exception when others then
  if sqlerrm<>'CLOSE_BEFORE_PUBLISH' then raise; end if;
 end;

 perform public.adjust_grade('00000000-0000-4000-8000-000000000002','gig-502',1,7.5,'Revisión de rúbrica');
 if not exists(select 1 from public.attempts where teacher_adjustment and score=7.5) then raise exception 'FAIL: teacher adjustment history'; end if;
 update public.week_settings set closes_at=now()-interval '1 minute' where course_id='gig-502' and week in (1,2);
end $$;
set request.jwt.claim.sub='00000000-0000-4000-8000-000000000002';
do $$
begin
 begin
  perform public.get_assessment('gig-502',2);
  raise exception 'FAIL: deadline bypass';
 exception when others then
  if sqlerrm<>'WINDOW_CLOSED' then raise; end if;
 end;
 perform public.submit_assessment('gig-502',1,'[{"id":"a","value":1},{"id":"b","value":20.505},{"id":"c","value":[1,0,2]},{"id":"d","value":[2,0,1]},{"id":"e","value":["informacion"," datos "]}]','10000000-0000-4000-8000-000000000001');
end $$;
reset role;
set role service_role;
select public.provision_student('00000000-0000-4000-8000-000000000004','0000000004','Temporal actualizado',array['gig-502','cex-103'],'A','{"gig-502":"A","cex-103":"C"}');
reset role;
set role authenticated;
set request.jwt.claim.sub='00000000-0000-4000-8000-000000000004';
do $$ begin
 if (select count(*) from public.enrollments)<>2 then raise exception 'FAIL: multi-course enrollment'; end if;
 if not exists(select 1 from public.enrollments where course_id='cex-103' and group_name='C') then raise exception 'FAIL: course-specific parallel'; end if;
 if (select must_change_password from public.profiles where id=auth.uid()) then raise exception 'FAIL: adding enrollment reset password state'; end if;
 begin
  perform public.provision_student(auth.uid(),'0000000004','Temporal',array['gig-502'],'');
  raise exception 'FAIL: student can provision';
 exception when insufficient_privilege then null;
 end;
end $$;
reset role;
select 'OK: RLS, perfiles, matrícula, claves privadas, cinco formatos, notas, cuota, contraseña y cierre' as result;

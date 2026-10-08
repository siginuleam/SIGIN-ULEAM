export const courseId='gig-502';
export const institutionalEmail=id=>`e${id}@live.uleam.edu.ec`;
export function initialState(){return {version:1,students:[{id:'DEMO001',name:'Estudiante de demostración',email:'',courses:[courseId]}],attempts:[],practice:{},settings:Array.from({length:16},(_,i)=>({week:i+1,locked:i>0,maxAttempts:i===15?5:2,open:'',close:''}))};}
export function availability(setting,now=Date.now()){
 if(setting.locked)return {open:false,label:'Cerrada por la docente',kind:'closed'};
 if(setting.open&&now<Date.parse(setting.open))return {open:false,label:'Apertura programada',kind:'scheduled'};
 if(setting.close&&now>=Date.parse(setting.close))return {open:false,label:'Plazo finalizado',kind:'closed'};
 return {open:true,label:'Disponible',kind:'available'};
}
export function grade(questions,answers){return Math.round(questions.filter((q,i)=>q.correct===answers[i]).length/questions.length*100)/10;}
export function bestGrade(attempts,id,week){
 const relevant=attempts.filter(a=>a.studentId===id&&a.week===week&&a.courseId===courseId);
 const lastAdjustment=relevant.findLastIndex(a=>a.teacherAdjustment);
 const scores=relevant.slice(lastAdjustment<0?0:lastAdjustment).map(a=>a.score);
 return scores.length?Math.max(...scores):null;
}
export function normalizeRows(rows,existing){
 const seen=new Set(existing.map(s=>s.id));
 return rows.filter(row=>Object.values(row).some(v=>String(v??'').trim())).map((row,i)=>{
 const clean=Object.fromEntries(Object.entries(row).map(([k,v])=>[k.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim(),String(v??'').trim()]));
 const id=clean.cedula||clean.id||'';const name=clean['nombres y apellidos']||clean.nombres||clean.nombre||'';
 const requested=clean.materia||clean.curso||courseId;
 const error=!/^\d{10}$/.test(id)?'La cédula debe contener diez dígitos':!name?'Falta el nombre':!['gig-502','GIG-502'].includes(requested)?'Materia no disponible en esta demostración':seen.has(id)?'Cédula duplicada o ya registrada':null;
 if(!error)seen.add(id);
 return {row:i+2,id,name,email:institutionalEmail(id),courses:[courseId],error};
 });
}
export function commitImport(state,preview){const valid=preview.filter(r=>!r.error);state.students.push(...valid.map(({id,name,email,courses})=>({id,name,email,courses})));return valid.length;}

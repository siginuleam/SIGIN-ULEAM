import { courses } from "./courses.js";
import { backend, backendConfigured } from "./backend.js";
import { APP_CONFIG } from "./config.js";
import {
  initialState,
  availability,
  grade,
  questionCorrect,
  answerComplete,
  bestGrade,
  normalizeRows,
  commitImport,
  shuffleIndexes,
  normalizedWord,
} from "./model.js";
import { crosswordLayout } from "./crossword.js";
const app = document.querySelector("#app"),
  stateKey = "sigin-preview-v2";
const escape = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const icons = {
  book: "M4 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-2H4z M20 4h-4a3 3 0 0 0-3 3v14a4 4 0 0 1 4-2h3z",
  home: "m3 10 9-7 9 7 M5 9v12h14V9 M9 21v-8h6v8",
  globe:
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3c5 5 5 13 0 18 M12 3c-5 5-5 13 0 18",
  building: "M3 21h18 M5 21V9h14v12 M3 9l9-6 9 6 M8 12v6 M12 12v6 M16 12v6",
  arrow: "M4 12h16 m-6-6 6 6-6 6",
  chevron: "m6 9 6 6 6-6",
  check: "m5 12 4 4L19 6",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M17 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.9",
  chart: "M4 3v18h17 M9 17v-5 M14 17V8 M19 17V5",
  calendar: "M4 5h16v16H4z M8 3v4 M16 3v4 M4 11h16",
  logout: "M9 3H4v18h5 M10 12h11 m-4-4 4 4-4 4",
  shield: "m12 3 8 4v5c0 5-8 9-8 9s-8-4-8-9V7z m-4 9 3 3 5-5",
  spark: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z",
  menu: "M4 6h16 M4 12h16 M4 18h16",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7 M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  clock: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M12 7v5l3 2",
  back: "M20 12H4 m6-6-6 6 6 6",
};
const icon = (name) =>
  `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="${icons[name] || icons.book}"/></svg>`;
const logo = () =>
  `<div class="logo"><span class="logo-mark">${icon("book")}</span><span>SIGIN<small>Tu aula, en acción</small></span></div>`;
const button = (action, text, attrs = "") =>
  `<button data-action="${action}" ${attrs}>${text}</button>`;
let state,
  mode = "preview",
  identity = null,
  currentCourse = null,
  route = "home",
  adminTab = "weeks",
  loginRole = "student",
  quiz = null,
  preview = [],
  matchSelected = null,
  toastTimer;
try {
  state = JSON.parse(localStorage.getItem(stateKey));
} catch {}
if (state?.version !== 2) state = initialState();
const userId = () => identity?.profile.id || "visitor";
const teacher = () => identity?.profile.role === "teacher";
const course = () => courses.find((c) => c.id === currentCourse);
const setting = (id, w) =>
  state.settings.find((s) => s.courseId === id && s.week === w) || {
    locked: true,
    maxAttempts: 2,
  };
const date = (s) =>
  s
    ? new Date(s).toLocaleString("es-EC", {
        timeZone: "America/Guayaquil",
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Sin fecha";
const taskLabel = {
  choice: "Decisión razonada",
  matching: "Unir relaciones",
  ordering: "Ordenar el proceso",
  order: "Ordenar el proceso",
  numeric: "Analizar cifras",
  crossword: "Crucigrama",
};
function toast(text) {
  const el = document.querySelector("#toast");
  el.textContent = text;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.hidden = true), 7000);
}
function save() {
  try {
    localStorage.setItem(stateKey, JSON.stringify(state));
  } catch {
    throw Error("No se pudo guardar en este navegador.");
  }
}
function focus() {
  document.querySelector("main")?.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}
function visibleCourses() {
  if (mode === "preview" || teacher()) return courses;
  const enrolled = identity?.enrollments || [];
  return courses.filter((c) =>
    enrolled.some((e) => e.course_id === c.id && e.active),
  );
}
function shell(content, title = "Inicio") {
  const name = identity?.profile.display_name || "Visitante";
  app.innerHTML = `<div class="app-shell"><aside class="sidebar" id="sidebar">${logo()}<div><p class="sidebar-label">Tu espacio de aprendizaje</p><nav class="side-nav" aria-label="Principal">${button("home", icon("home") + "Inicio", `class="${route === "home" ? "active" : ""}"`)}${button("myCourses", icon("book") + "Mis materias", `class="${route === "course" || route === "lesson" ? "active" : ""}"`)}${button("grades", icon("chart") + "Mis resultados", `class="${route === "grades" ? "active" : ""}"`)}${teacher() ? button("admin", icon("users") + "Espacio docente", `class="${route === "admin" ? "active" : ""}"`) : ""}</nav></div><div><p class="sidebar-label">Tus materias</p><nav class="side-nav" aria-label="Materias">${visibleCourses()
    .map((c) =>
      button(
        "course",
        icon(["book", "globe", "building"][c.index]) + escape(c.code),
        `data-course="${c.id}" class="${currentCourse === c.id ? "active" : ""}"`,
      ),
    )
    .join(
      "",
    )}</nav></div><div class="sidebar-bottom"><nav class="side-nav">${button("account", icon("shield") + "Mi cuenta")}${button("logout", icon("logout") + "Salir")}</nav><p>Aprende con evidencia.<br>Practica con propósito.</p></div></aside><div class="workspace">${mode === "preview" ? `<div class="preview-bar"><span>Vista previa · sin cuentas ni correos reales</span>${button("switchRole", teacher() ? "Ver como estudiante" : "Ver como docente")}</div>` : ""}<header class="topbar">${button("menu", icon("menu"), 'class="menu-button" aria-label="Abrir menú"')}<div class="mobile-logo">${logo()}</div><div class="breadcrumb">Aula virtual <span aria-hidden="true">/</span> <strong>${escape(title)}</strong></div><div class="profile"><span class="name">${escape(name)}<br><small>${teacher() ? "Docente" : "Estudiante"}</small></span><span class="avatar">${escape(
    name
      .split(" ")
      .slice(0, 2)
      .map((s) => s[0])
      .join("")
      .toUpperCase(),
  )}</span></div></header><main class="main" id="main" tabindex="-1">${content}<div class="footer-note"><span>SIGIN · Aula de aprendizaje práctico</span><span>48 semanas · 3 materias · Una comunidad que aprende</span></div></main></div></div>`;
  focus();
}
function login(error = "") {
  identity = null;
  quiz = null;
  route = "login";
  app.innerHTML = `<header class="login-top">${logo()}<span class="institution">Gestión de la Información Gerencial</span></header><div class="landing"><section class="landing-story"><span class="eyebrow">${icon("spark")} Más que estudiar. Aprender haciendo.</span><h1>Tu conocimiento,<br><em>en acción.</em></h1><p>Explora casos, conecta ideas y toma decisiones. Un aula pensada para aprender con la práctica, semana a semana.</p><div class="story-list"><div class="story-item">${icon("book")} Tres materias. Un recorrido propio.</div><div class="story-item">${icon("globe")} Expedientes, cifras y problemas del mundo real.</div><div class="story-item">${icon("spark")} Crucigramas, conexiones y retos interactivos.</div></div></section><section class="landing-login"><div class="login-panel"><span class="eyebrow">Bienvenido a SIGIN</span><h2>Entra a tu aula</h2><p class="muted">Tu siguiente aprendizaje empieza aquí.</p><div class="role-switch">${button("loginRole", "Estudiante", `data-role="student" class="${loginRole === "student" ? "active" : ""}"`)}${button("loginRole", "Docente", `data-role="teacher" class="${loginRole === "teacher" ? "active" : ""}"`)}</div><form id="login-form"><label for="username">${loginRole === "teacher" ? "Usuario docente" : "Número de cédula"}</label><input id="username" name="username" autocomplete="username" ${loginRole === "student" ? 'inputmode="numeric" maxlength="10" pattern="[0-9]{10}"' : 'value="DocenteULEAM"'} required placeholder="${loginRole === "student" ? "Tu cédula de diez dígitos" : "Usuario"}"><label for="password">Contraseña</label><div class="password-field"><input id="password" name="password" type="password" autocomplete="current-password" required>${button("showPassword", icon("eye"), 'aria-label="Mostrar contraseña"')}</div><p class="error" id="login-error" role="alert">${escape(error)}</p><button type="submit" class="primary full">Entrar a mi aula ${icon("arrow")}</button></form>${button("recover", "Olvidé mi contraseña", 'class="link full"')}<p class="note">${backendConfigured ? "El acceso requiere una cuenta registrada y una matrícula activa." : "El aula se está preparando. Puedes recorrer las tres materias mientras se conecta el acceso institucional."}</p>${APP_CONFIG.previewEnabled ? button("preview", "Explorar las tres materias", 'class="full"') : ""}</div></section></div>`;
}
function enterPreview(role = "student") {
  if (!APP_CONFIG.previewEnabled)
    return toast("Inicia sesión para entrar a tu aula.");
  mode = "preview";
  identity = {
    profile: {
      id: "visitor",
      display_name:
        role === "teacher"
          ? "Docente · vista previa"
          : "Estudiante · vista previa",
      role,
    },
    enrollments: [],
  };
  currentCourse = null;
  home();
}
async function loadLive() {
  const w = await backend.loadWorkspace();
  mode = "live";
  identity = { ...identity, ...w };
  state = {
    version: 2,
    students: (w.students || []).map((s) => ({
      id: s.student_number,
      uuid: s.id,
      name: s.display_name,
      email: `e${s.student_number}@live.uleam.edu.ec`,
      courses: w.enrollments
        .filter((e) => e.student_id === s.id && e.active)
        .map((e) => e.course_id),
    })),
    settings: w.settings.map((s) => ({
      courseId: s.course_id,
      week: s.week,
      locked: !s.enabled,
      maxAttempts: s.max_attempts,
      open: s.opens_at,
      close: s.closes_at,
    })),
    attempts: w.attempts.map((a) => ({
      ...a,
      studentId: a.student_id,
      courseId: a.course_id,
      week: a.week,
      score: Number(a.score),
      teacherAdjustment: a.teacher_adjustment,
      createdAt: a.created_at,
    })),
    practice: {},
  };
  for (const p of w.practice) {
    state.practice[p.student_id] ??= {};
    state.practice[p.student_id][`${p.course_id}:${p.week}`] = true;
  }
  if (identity.profile.must_change_password) return changePassword(true);
  home();
}
function heading(eyebrow, title, description = "", extra = "") {
  return `<div class="page-heading"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${description}</p></div>${extra}</div>`;
}
function courseCard(c) {
  const done = c.activities.filter(
    (a) => bestGrade(state.attempts, userId(), a.week, c.id) !== null,
  ).length;
  return `<article class="course-card"><div class="course-cover c${c.index}"><span>${escape(c.code)}<br>16 SEMANAS</span>${icon(["book", "globe", "building"][c.index])}</div><div class="course-content"><span class="eyebrow">${c.index === 0 ? "Aprende a investigar" : c.index === 1 ? "Conecta mercados" : "Transforma servicios"}</span><h3>${escape(c.name)}</h3><p>Casos con contexto. Retos para pensar.<br>Aprendizaje aplicado a cada semana.</p><div class="course-meta">${icon("calendar")} 16 semanas <span>·</span> ${done} completadas</div>${button("course", "Entrar a la materia " + icon("arrow"), `data-course="${c.id}" class="${c.index === 0 ? "primary" : ""}"`)}</div></article>`;
}
function home() {
  route = "home";
  currentCourse = null;
  const cs = visibleCourses(),
    grades = state.attempts.filter((a) => a.studentId === userId()),
    done = new Set(grades.map((a) => `${a.courseId}:${a.week}`)).size,
    practice = Object.keys(state.practice[userId()] || {}).length;
  shell(
    `${heading("Tu espacio de aprendizaje", "Cada semana, un paso más.", "Bienvenido. Aquí el conocimiento se convierte en decisiones.")}<section class="welcome-card"><div><span class="eyebrow" style="color:#94e1d8">${icon("spark")} Aprende con propósito</span><h2>La mejor forma de aprender<br>es ponerlo en práctica.</h2><p>Lee el expediente, explora las evidencias y resuelve retos. Equivocarte es parte del camino; entender por qué es lo que te hace avanzar.</p></div><div class="welcome-art">${icon("book")}</div></section><div class="stats"><div class="stat"><div class="stat-icon">${icon("book")}</div><div><strong>${cs.length}</strong><span>Materias en tu aula</span></div></div><div class="stat"><div class="stat-icon">${icon("check")}</div><div><strong>${done} <small>/ ${cs.length * 16}</small></strong><span>Semanas evaluadas</span></div></div><div class="stat"><div class="stat-icon">${icon("spark")}</div><div><strong>${practice}</strong><span>Prácticas completadas</span></div></div></div><div class="section-title"><h2>Tus materias</h2><span class="badge teal">Un recorrido por semana</span></div><div class="course-grid">${cs.map(courseCard).join("")}</div>${!cs.length ? '<div class="card empty">Tu cuenta todavía no tiene materias asignadas. Contacta a la docente.</div>' : ""}`,
  );
}
function openCourse(id) {
  if (!visibleCourses().some((c) => c.id === id))
    return toast("Esta materia no está en tus matrículas.");
  currentCourse = id;
  route = "course";
  const c = course(),
    next = c.activities.find((a) => availability(setting(id, a.week)).open);
  shell(
    `${heading(c.code, escape(c.name), "Unidades del sílabo · Casos aplicados · Práctica y evaluación semanal", button("home", icon("back") + "Mis materias"))}<div class="two-col"><section>${[
      ...new Set(c.weeks.map((w) => w.unit)),
    ]
      .map(
        (unit) =>
          `<h2 class="unit-heading">${escape(unit)}</h2>${c.weeks
            .filter((w) => w.unit === unit)
            .map((w) => {
              const a = c.activities.find((a) => a.week === w.weekNumber),
                s = availability(setting(id, w.weekNumber)),
                g = bestGrade(state.attempts, userId(), w.weekNumber, id);
              return `<details class="week" ${w.weekNumber === (next?.week || 1) ? "open" : ""}><summary><span class="week-number">${String(w.weekNumber).padStart(2, "0")}</span><div class="week-summary-text"><h3>${escape(w.title)}</h3><span class="badge ${s.kind}">${s.label}</span>${g !== null ? ` <span class="badge teal">${g.toFixed(1)}/10</span>` : ""}</div><span class="chevron">${icon("chevron")}</span></summary><div class="week-content"><p>${escape(a?.objective || "Explora el contenido de esta semana.")}</p><div class="week-actions">${button("lesson", "Explorar el caso " + icon("arrow"), `data-week="${w.weekNumber}" class="primary"`)}<span class="muted"><small>${a?.questions.length || 0} retos · práctica libre</small></span></div></div></details>`;
            })
            .join("")}`,
      )
      .join(
        "",
      )}</section><aside><article class="card"><span class="aside-label">Tu materia en un vistazo</span><h3>Practica. Comprende. Avanza.</h3><p class="muted" style="font-size:14px">Cada semana tiene un expediente que te da las evidencias necesarias para resolver sus retos.</p><div class="aside-row"><span>Organización</span><strong>16 semanas</strong></div><div class="aside-row"><span>Práctica</span><strong>Sin límite</strong></div><div class="aside-row"><span>Evaluación</span><strong>Por semana</strong></div><div class="aside-row"><span>Horario</span><strong>Ecuador</strong></div></article><article class="card"><span class="eyebrow">El reto no es memorizar</span><h3>Es justificar tu decisión.</h3><p class="muted" style="font-size:14px">Conecta conceptos, interpreta cifras, ordena procesos y usa la evidencia del caso.</p></article></aside></div>`,
    c.name,
  );
}
function dossier(a) {
  return `<article class="card context-card"><span class="eyebrow">${icon("book")} Expediente de aprendizaje</span><h2>${escape(a.name)}</h2><span class="badge teal">${escape(a.label || "Simulación educativa")}</span><div class="learning-goal"><strong>Tu objetivo</strong><br>${escape(a.objective)}</div><div class="dossier">${escape(a.context)}</div>${a.references?.length ? `<hr style="border:0;border-top:1px solid var(--line);margin:24px 0"><p class="muted" style="font-size:12px">Lecturas complementarias · el expediente contiene lo necesario para responder.</p><div class="source-links">${a.references.map((r) => `<a href="${escape(r.url)}" target="_blank" rel="noopener noreferrer">${escape(r.name)} ↗</a>`).join("")}</div>` : ""}</article>`;
}
function lesson(week) {
  route = "lesson";
  const c = course(),
    w = c.weeks.find((w) => w.weekNumber === week),
    a = c.activities.find((a) => a.week === week),
    s = availability(setting(c.id, week)),
    count = state.attempts.filter(
      (x) =>
        x.studentId === userId() &&
        x.courseId === c.id &&
        x.week === week &&
        !x.teacherAdjustment,
    ).length;
  shell(
    `${heading(`Semana ${week} · ${escape(c.code)}`, escape(w.title), "Lee las evidencias antes de empezar. Cada respuesta debe poder justificarse.", button("course", icon("back") + "Volver a las semanas", `data-course="${c.id}"`))}<div class="lesson-grid"><section>${dossier(a)}</section><section><article class="card"><span class="eyebrow">Tu laboratorio de aprendizaje</span><h2>Prueba. Conecta. Descubre.</h2><p class="muted">${a.questions.length} retos basados en este expediente. Recibirás explicación y podrás intentarlo de nuevo.</p><div class="task-tags">${[...new Set(a.questions.map((q) => q.type))].map((t) => `<span class="task-tag">${taskLabel[t] || t}</span>`).join("")}</div><ol class="method-list"><li>Lee el caso y localiza los documentos o datos.</li><li>Resuelve cada reto con esas evidencias.</li><li>Revisa la explicación; identifica qué cambiarías.</li></ol>${button("beginQuiz", "Comenzar práctica " + icon("arrow"), `data-week="${week}" data-mode="practice" class="primary full"`)}</article><article class="card"><span class="eyebrow">Actividad evaluada</span><h2>Demuestra lo que aprendiste.</h2><span class="badge ${s.kind}">${s.label}</span><div class="aside-row"><span>Intentos utilizados</span><strong>${count} / ${setting(c.id, week).maxAttempts}</strong></div><div class="aside-row"><span>Apertura</span><strong>${date(setting(c.id, week).open)}</strong></div><div class="aside-row"><span>Cierre</span><strong>${date(setting(c.id, week).close)}</strong></div><p class="muted" style="font-size:13px">La evaluación es semanal. Puedes revisar tus respuestas antes de entregar.</p>${button("beginQuiz", "Entrar a la evaluación", `data-week="${week}" data-mode="assessment" class="full" ${!s.open || count >= setting(c.id, week).maxAttempts ? "disabled" : ""}`)}</article></section></div>`,
    c.name,
  );
}
async function beginQuiz(week, activityMode) {
  const c = course();
  let a = c.activities.find((a) => a.week === week);
  if (activityMode === "assessment") {
    if (!availability(setting(c.id, week)).open)
      return toast("Esta evaluación está cerrada.");
    if (mode === "live") a = await backend.getAssessment(c.id, week);
    else if (
      state.attempts.filter(
        (x) =>
          x.studentId === userId() &&
          x.courseId === c.id &&
          x.week === week &&
          !x.teacherAdjustment,
      ).length >= setting(c.id, week).maxAttempts
    )
      return toast("Ya utilizaste tus intentos.");
  }
  const draftKey = `sigin-draft:${mode}:${userId()}:${c.id}:${week}:${activityMode}`;
  let draft;
  try {
    draft = JSON.parse(sessionStorage.getItem(draftKey));
  } catch {}
  quiz = {
    week,
    courseId: c.id,
    mode: activityMode,
    activity: a,
    index: 0,
    answers: draft?.answers || [],
    checked: false,
    draftKey,
    submissionId: draft?.submissionId || crypto.randomUUID(),
  };
  matchSelected = null;
  renderQuiz();
}
function storeDraft() {
  if (quiz)
    sessionStorage.setItem(
      quiz.draftKey,
      JSON.stringify({
        answers: quiz.answers,
        submissionId: quiz.submissionId,
      }),
    );
}
function questionMarkup(q, v) {
  if (q.type === "numeric")
    return `<label for="numeric-answer">Resultado ${q.unit ? `(${escape(q.unit)})` : ""}</label><input id="numeric-answer" name="numeric" type="text" inputmode="decimal" value="${escape(v ?? "")}" placeholder="Escribe tu resultado" required><p class="muted" style="font-size:13px">Puedes usar punto o coma decimal. Revisa la unidad y el denominador.</p>`;
  if (q.type === "matching") {
    const lefts = q.pairs?.map((p) => p.left) || q.lefts,
      rights = q.pairs?.map((p) => p.right) || q.rights,
      order = shuffleIndexes(rights.length, quiz.week * 17 + quiz.index * 7);
    return `<p class="muted">Selecciona un elemento de la izquierda y su relación a la derecha. Puedes corregir cualquier conexión.</p><div class="matching-board"><div class="match-column">${lefts.map((left, i) => button("matchLeft", `<span class="match-number">${i + 1}</span>${escape(left)}`, `data-index="${i}" class="match-item ${matchSelected === i ? "selected" : ""} ${Number.isInteger(v?.[i]) ? "paired" : ""}" aria-pressed="${matchSelected === i}"`)).join("")}</div><div class="match-lines" aria-hidden="true">${lefts.map(() => "<span>↔</span>").join("")}</div><div class="match-column">${order
      .map((i) => {
        const linked = (v || []).findIndex((n) => n === i);
        return button(
          "matchRight",
          `<span class="match-number">${linked >= 0 ? linked + 1 : "·"}</span>${escape(rights[i])}`,
          `data-index="${i}" class="match-item ${linked >= 0 ? "paired" : ""}"`,
        );
      })
      .join(
        "",
      )}</div></div>${button("resetTask", "Borrar conexiones", 'class="link"')}`;
  }
  if (q.type === "ordering" || q.type === "order") {
    if (!Array.isArray(v)) {
      v = shuffleIndexes(q.items.length, quiz.week * 19 + quiz.index * 11);
      if (v.every((x, i) => x === i)) v.reverse();
      quiz.answers[quiz.index] = v;
      storeDraft();
    }
    return `<p class="muted">Coloca el proceso en su secuencia lógica. Usa las flechas; también funcionan con teclado.</p><div class="order-list">${v.map((item, i) => `<div class="order-item"><span class="match-number">${i + 1}</span><span class="order-text">${escape(q.items[item])}</span>${button("moveOrder", "↑", `data-index="${i}" data-direction="-1" aria-label="Subir ${escape(q.items[item])}" ${i === 0 ? "disabled" : ""}`)}${button("moveOrder", "↓", `data-index="${i}" data-direction="1" aria-label="Bajar ${escape(q.items[item])}" ${i === v.length - 1 ? "disabled" : ""}`)}</div>`).join("")}</div>`;
  }
  if (q.type === "crossword") {
    const layout = q.layout || crosswordLayout(q.entries);
    return `<p class="muted">Usa las pistas del expediente. Escribe una letra por casilla, sin tildes. Las palabras comparten sus letras cuando se cruzan.</p><div class="crossword-scroll"><div class="crossword-grid" style="grid-template-columns:repeat(${layout.width},var(--cw-size,34px));grid-template-rows:repeat(${layout.height},var(--cw-size,34px))">${layout.cells
      .map((cell, i) => {
        const ref = cell.refs[0];
        return `<div class="cw-cell" style="grid-column:${cell.column};grid-row:${cell.row}">${cell.number ? `<small>${cell.number}</small>` : ""}<input class="cw-input" maxlength="1" data-refs="${escape(JSON.stringify(cell.refs))}" data-cell="${i}" value="${escape((v?.[ref.entry] || "")[ref.letter] || "")}" aria-label="${cell.refs.map((r) => `Palabra ${r.entry + 1}, letra ${r.letter + 1}`).join("; ")}" autocomplete="off"></div>`;
      })
      .join(
        "",
      )}</div></div><ol class="cw-clues">${q.entries.map((e, i) => `<li>${escape(e.clue)} <small>(${e.word ? normalizedWord(e.word).length : e.length} letras · ${layout.placed?.[i]?.dir === "down" ? "vertical" : "horizontal"})</small></li>`).join("")}</ol>`;
  }
  return `<fieldset style="border:0;padding:0;margin:0"><legend class="sr-only">${escape(q.prompt)}</legend>${q.options.map((o, i) => `<label class="option"><input type="radio" name="choice" value="${i}" ${v === i ? "checked" : ""} required><span>${escape(o)}</span></label>`).join("")}</fieldset>`;
}
function quizDossier(a) {
  return `<article class="card context-card"><details class="quiz-dossier" ${window.innerWidth > 900 ? "open" : ""}><summary>${icon("book")} Consultar el expediente</summary>${dossier(a)}</details></article>`;
}
function renderQuiz(preserveScroll = false) {
  const previousScroll = window.scrollY;
  route = "quiz";
  const a = quiz.activity,
    q = a.questions[quiz.index],
    v = quiz.answers[quiz.index],
    isCorrect = quiz.checked ? questionCorrect(q, v) : false;
  shell(
    `${heading(`Semana ${quiz.week} · ${quiz.mode === "practice" ? "Laboratorio de práctica" : "Actividad evaluada"}`, escape(a.name), "Resuelve con el expediente. La evidencia está a tu alcance.", button("leaveQuiz", icon("back") + "Guardar y volver"))}<div class="quiz-grid"><section><article class="card"><div class="question-meta"><span>Reto ${quiz.index + 1} de ${a.questions.length}</span><span class="badge pink">${taskLabel[q.type] || "Decisión razonada"}</span></div><div class="progress" aria-label="Reto ${quiz.index + 1} de ${a.questions.length}"><span style="width:${((quiz.index + 1) / a.questions.length) * 100}%"></span></div><h2 class="question-title">${escape(q.prompt)}</h2><form id="quiz-answer">${questionMarkup(q, v)}${quiz.checked ? `<div class="feedback ${isCorrect ? "good" : ""}"><h3>${isCorrect ? "Bien razonado." : "Revisa la evidencia y vuelve a intentarlo."}</h3><p>${escape(q.explanation)}</p></div>` : ""}${quiz.mode === "practice" && !quiz.checked ? '<details class="hint"><summary>Cómo abordar este reto</summary><p>Identifica el documento que respalda tu decisión. En cálculos, distingue cantidades, unidades y denominadores. En secuencias, comprueba qué requisito permite pasar al siguiente paso.</p></details>' : ""}<div class="actions">${quiz.index > 0 ? button("previous", icon("back") + "Anterior") : ""}<button class="primary" type="submit">${quiz.mode === "practice" && !quiz.checked ? "Comprobar mi respuesta" : quiz.index === a.questions.length - 1 ? "Revisar antes de terminar" : "Siguiente reto"} ${icon("arrow")}</button></div><p class="error" id="quiz-error" role="alert"></p></form></article></section>${quizDossier(a)}</div>`,
    course().code,
  );
  if (preserveScroll) window.scrollTo(0, previousScroll);
}
function answerText(q, v) {
  if (q.type === "matching") {
    const lefts = q.pairs?.map((p) => p.left) || q.lefts,
      rights = q.pairs?.map((p) => p.right) || q.rights;
    return lefts
      .map((s, i) => `${s} → ${rights[v?.[i]] || "Sin conectar"}`)
      .join("\n");
  }
  if (q.type === "ordering" || q.type === "order")
    return (v || []).map((x, i) => `${i + 1}. ${q.items[x]}`).join("\n");
  if (q.type === "crossword") return (v || []).join(" · ");
  if (q.type === "numeric") return `${v ?? "Sin responder"} ${q.unit || ""}`;
  return q.options[v] || "Sin responder";
}
function review() {
  shell(
    `${heading("Antes de entregar", "Revisa tu razonamiento.", "Comprueba las respuestas y vuelve a cualquier reto si necesitas corregirlo.")}<div class="two-col"><section>${quiz.activity.questions.map((q, i) => `<article class="card"><span class="eyebrow">Reto ${i + 1} · ${taskLabel[q.type]}</span><h3>${escape(q.prompt)}</h3><div class="review-answer" style="white-space:pre-line">${escape(answerText(q, quiz.answers[i]))}</div>${button("editAnswer", "Revisar este reto", `data-index="${i}"`)}</article>`).join("")}</section><aside class="card"><h2>Listo para terminar</h2><p class="muted">${quiz.activity.questions.length} retos respondidos. ${quiz.mode === "practice" ? "La práctica no afecta tus notas." : "La entrega consumirá un intento de esta evaluación."}</p>${button("finish", "Confirmar y terminar", 'class="primary full"')}<p class="error" id="finish-error" role="alert"></p></aside></div>`,
    "Revisar entrega",
  );
}
async function finish() {
  if (!quiz) return;
  const a = quiz.activity;
  if (a.questions.some((q, i) => !answerComplete(q, quiz.answers[i])))
    return toast("Completa todos los retos antes de entregar.");
  let result =
    mode === "live" && quiz.mode === "assessment"
      ? null
      : {
          score: grade(a.questions, quiz.answers),
          feedback: a.questions.map((q, i) => ({
            id: q.id,
            correct: questionCorrect(q, quiz.answers[i]),
            explanation: q.explanation,
          })),
        };
  if (quiz.mode === "assessment") {
    if (mode === "live") {
      result = await backend.submitAssessment(
        quiz.courseId,
        quiz.week,
        a.questions.map((q, i) => ({ id: q.id, value: quiz.answers[i] })),
        quiz.submissionId,
      );
      try {
        await refreshLiveData();
      } catch {
        toast(
          "Tu entrega se guardó. La lista de resultados se actualizará cuando vuelva la conexión.",
        );
      }
    } else {
      const s = setting(quiz.courseId, quiz.week);
      if (
        !availability(s).open ||
        state.attempts.filter(
          (x) =>
            x.studentId === userId() &&
            x.courseId === quiz.courseId &&
            x.week === quiz.week &&
            !x.teacherAdjustment,
        ).length >= s.maxAttempts
      )
        throw Error("La evaluación cerró o se agotaron tus intentos.");
      state.attempts.push({
        id: crypto.randomUUID(),
        courseId: quiz.courseId,
        studentId: userId(),
        week: quiz.week,
        score: result.score,
        answers: quiz.answers.slice(),
        createdAt: new Date().toISOString(),
      });
      save();
    }
  } else {
    if (mode === "live") await backend.savePractice(quiz.courseId, quiz.week);
    state.practice[userId()] ??= {};
    state.practice[userId()][`${quiz.courseId}:${quiz.week}`] = true;
    if (mode === "preview") save();
  }
  sessionStorage.removeItem(quiz.draftKey);
  const prev = quiz;
  quiz = null;
  shell(
    `${heading(prev.mode === "practice" ? "Práctica completada" : "Actividad entregada", "La clave es entender por qué.", "Revisa lo que hiciste bien y los conceptos que puedes reforzar.")}<div class="two-col"><section>${a.questions
      .map((q, i) => {
        const f = result.feedback.find((f) => f.id === q.id) || {};
        return `<article class="card"><span class="badge ${f.correct ? "available" : "scheduled"}">${f.correct ? "Reto resuelto" : "Para reforzar"}</span><h3 style="margin-top:14px">${escape(q.prompt)}</h3><div class="review-answer" style="white-space:pre-line">${escape(answerText(q, prev.answers[i]))}</div><p>${escape(f.explanation || "Revisa el expediente con la docente.")}</p></article>`;
      })
      .join(
        "",
      )}</section><aside class="card"><span class="eyebrow">Tu resultado</span><div class="result-big">${Number(result.score).toFixed(1)} <small>/ 10</small></div><p class="muted">${prev.mode === "practice" ? "Resultado de práctica; no modifica tu calificación." : "El mejor resultado queda registrado por materia y semana."}</p>${button("lesson", "Volver al expediente", `data-week="${prev.week}" class="primary full"`)}</aside></div>`,
    "Resultados",
  );
}
async function refreshLiveData() {
  const w = await backend.loadWorkspace();
  identity = { ...identity, ...w };
  state.settings = w.settings.map((s) => ({
    courseId: s.course_id,
    week: s.week,
    locked: !s.enabled,
    maxAttempts: s.max_attempts,
    open: s.opens_at,
    close: s.closes_at,
  }));
  state.attempts = w.attempts.map((a) => ({
    ...a,
    studentId: a.student_id,
    courseId: a.course_id,
    score: Number(a.score),
    teacherAdjustment: a.teacher_adjustment,
    createdAt: a.created_at,
  }));
  state.students = (w.students || []).map((s) => ({
    id: s.student_number,
    uuid: s.id,
    name: s.display_name,
    email: `e${s.student_number}@live.uleam.edu.ec`,
    courses: w.enrollments
      .filter((e) => e.student_id === s.id && e.active)
      .map((e) => e.course_id),
  }));
}
function grades() {
  route = "grades";
  const cs = visibleCourses();
  shell(
    `${heading("Tu progreso", "Resultados con contexto.", "Cada materia conserva sus propias notas. Las semanas pendientes no se cuentan como cero.")}<div class="tabs">${cs.map((c) => button("gradeCourse", escape(c.code), `data-course="${c.id}" class="${currentCourse === c.id ? "active" : ""}"`)).join("")}</div>${cs
      .filter((c) => !currentCourse || c.id === currentCourse)
      .map(
        (c) =>
          `<article class="card"><h2>${escape(c.name)}</h2><div class="table-wrap"><table><thead><tr><th>Semana</th><th>Tema</th><th>Mejor resultado</th><th>Intentos</th></tr></thead><tbody>${c.weeks.map((w) => `<tr><td>${w.weekNumber}</td><td>${escape(w.title)}</td><td>${bestGrade(state.attempts, userId(), w.weekNumber, c.id) ?? "Pendiente"}</td><td>${state.attempts.filter((a) => a.studentId === userId() && a.courseId === c.id && a.week === w.weekNumber && !a.teacherAdjustment).length}</td></tr>`).join("")}</tbody></table></div></article>`,
      )
      .join("")}`,
    "Mis resultados",
  );
}
function admin() {
  if (!teacher()) return toast("Esta sección requiere una cuenta docente.");
  route = "admin";
  currentCourse = currentCourse || courses[0].id;
  const c = course();
  shell(
    `${heading("Espacio docente", "Acompaña el aprendizaje.", "Administra cada materia, programa evaluaciones y revisa el progreso.")}<div class="filter-row"><div class="select-course"><label for="admin-course">Materia</label><select id="admin-course">${courses.map((c) => `<option value="${c.id}" ${c.id === currentCourse ? "selected" : ""}>${escape(c.name)}</option>`).join("")}</select></div><span class="badge teal">${escape(c.code)} · 16 semanas</span></div><div class="tabs">${[
      ["weeks", "Semanas y horarios"],
      ["assessments", "Crear evaluación"],
      ["students", "Estudiantes"],
      ["results", "Calificaciones"],
    ]
      .map(([id, label]) =>
        button(
          "adminTab",
          label,
          `data-tab="${id}" class="${adminTab === id ? "active" : ""}"`,
        ),
      )
      .join(
        "",
      )}</div>${adminTab === "weeks" ? adminWeeks() : adminTab === "students" ? adminStudents() : adminTab === "assessments" ? authorMarkup() : adminResults()}`,
    c.name,
  );
}
function adminWeeks() {
  return course()
    .weeks.map((w) => {
      const s = setting(currentCourse, w.weekNumber);
      return `<details class="week"><summary><span class="week-number">${w.weekNumber}</span><div class="week-summary-text"><h3>${escape(w.title)}</h3><span class="badge ${availability(s).kind}">${availability(s).label}</span></div><span class="chevron">${icon("chevron")}</span></summary><div class="week-content"><form data-schedule="${w.weekNumber}"><label><input type="checkbox" name="locked" ${s.locked ? "checked" : ""}> Cerrar esta evaluación</label><p class="muted" style="font-size:13px">La práctica continúa disponible. El cierre manual prevalece sobre las fechas.</p><div class="two-equal"><div><label>Apertura (hora de Ecuador)<input type="datetime-local" name="open" value="${s.open ? localDateTime(s.open) : ""}"></label></div><div><label>Cierre (hora de Ecuador)<input type="datetime-local" name="close" value="${s.close ? localDateTime(s.close) : ""}"></label></div></div><label>Intentos máximos<input type="number" name="maxAttempts" min="1" max="10" value="${s.maxAttempts}" required></label><button type="submit" class="primary">Guardar semana</button><p role="status" class="schedule-status"></p></form></div></details>`;
    })
    .join("");
}
function localDateTime(value) {
  const d = new Date(Date.parse(value) - 5 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 16);
}
function studentTable(students) {
  return `<div class="table-wrap"><table><thead><tr><th>Estudiante</th><th>Correo institucional</th><th>Materias</th><th>Acciones</th></tr></thead><tbody>${students.map((s) => `<tr><td><strong>${escape(s.name)}</strong><br><small>${escape(s.id)}</small></td><td>${escape(s.email)}</td><td>${s.courses.map((c) => escape(c)).join(", ")}</td><td>${button("deactivateEnrollment", "Desactivar matrícula", `data-id="${escape(s.id)}"`)}</td></tr>`).join("") || '<tr><td colspan="4">Todavía no hay estudiantes registrados.</td></tr>'}</tbody></table></div>`;
}
function adminStudents() {
  const students = state.students.filter((s) =>
    s.courses.includes(currentCourse),
  );
  return `<div class="two-equal"><article class="card"><span class="eyebrow">Alta individual</span><h2>Agregar un estudiante</h2><form id="add-student"><label>Cédula<input name="id" inputmode="numeric" pattern="[0-9]{10}" maxlength="10" required></label><label>Nombres y apellidos<input name="name" maxlength="120" required></label><label>Paralelo<input name="parallel" value="A" maxlength="30" required></label><p class="muted" style="font-size:13px">Correo: e{cédula}@live.uleam.edu.ec. La contraseña temporal será la cédula y deberá cambiarse al entrar.</p><button type="submit" class="primary">Registrar en ${escape(course().code)}</button><p id="manual-status" class="error" role="status"></p></form></article><article class="card"><span class="eyebrow">Carga revisable</span><h2>Importar desde Excel</h2><p class="muted">Descarga la plantilla, completa los datos y revisa la vista previa antes de confirmar. No cargaremos listados hasta que lo indiques.</p>${button("template", "Descargar plantilla Excel")}<label>Archivo .xlsx<input id="import-file" type="file" accept=".xlsx"></label><p class="muted" style="font-size:12px">Máximo 2000 filas y 5 MB. Cédulas como texto para conservar los ceros iniciales.</p><p id="import-status" role="status"></p><div id="import-preview"></div></article></div><article class="card"><div class="section-title"><h2>Estudiantes de la materia (${students.length})</h2><span class="badge teal">Matrículas separadas</span></div><label>Buscar por nombre o cédula<input id="student-search" type="search" placeholder="Buscar estudiante"></label><div id="student-list">${studentTable(students)}</div></article>`;
}
function adminResults() {
  const students = state.students.filter((s) =>
    s.courses.includes(currentCourse),
  );
  return `<article class="card"><div class="section-title"><h2>Resultados por semana</h2>${button("exportGrades", "Exportar Excel")}</div><p class="muted" style="font-size:14px">Los ajustes docentes conservan el historial e incluyen su motivo.</p><div class="table-wrap"><table><thead><tr><th>Estudiante</th>${course()
    .weeks.map((w) => `<th>S${w.weekNumber}</th>`)
    .join("")}</tr></thead><tbody>${
    students
      .map(
        (s) =>
          `<tr><td>${escape(s.name)}</td>${course()
            .weeks.map(
              (w) =>
                `<td>${button("editGrade", String(bestGrade(state.attempts, s.uuid || s.id, w.weekNumber, currentCourse) ?? "—"), `data-id="${escape(s.id)}" data-week="${w.weekNumber}" aria-label="Editar nota de ${escape(s.name)}, semana ${w.weekNumber}"`)}</td>`,
            )
            .join("")}</tr>`,
      )
      .join("") ||
    '<tr><td colspan="17">Los resultados aparecerán cuando el estudiante entregue sus actividades.</td></tr>'
  }</tbody></table></div></article>`;
}
let author = {
  week: 1,
  name: "",
  objective: "",
  context: "",
  questions: [
    { type: "choice", prompt: "", details: "", correct: "1", explanation: "" },
  ],
};
function authorMarkup() {
  return `<article class="card"><span class="eyebrow">Evaluación semanal privada</span><h2>Un caso nuevo para demostrar aprendizaje</h2><p class="muted">Crea variantes diferentes de la práctica pública: otro expediente, cifras o preguntas. Los enunciados se muestran al estudiante; las respuestas y explicaciones se guardan aparte.</p><form id="assessment-author"><label>Semana<select name="week">${course()
    .weeks.map(
      (w) =>
        `<option value="${w.weekNumber}" ${w.weekNumber === author.week ? "selected" : ""}>Semana ${w.weekNumber} · ${escape(w.title)}</option>`,
    )
    .join(
      "",
    )}</select></label><label>Nombre de la actividad<input name="name" value="${escape(author.name)}" required maxlength="160"></label><label>Objetivo<input name="objective" value="${escape(author.objective)}" required maxlength="400"></label><label>Expediente y materiales para responder<textarea name="context" rows="9" minlength="200" required>${escape(author.context)}</textarea></label><p class="muted" style="font-size:13px">Incluye documentos, datos, reglas y unidades. Si es una simulación, identifícala expresamente.</p><div id="author-questions">${author.questions.map((q, i) => authorQuestion(q, i)).join("")}</div><div class="actions">${button("addAuthorQuestion", "Añadir otro reto")}<button type="submit" class="primary">Guardar evaluación privada</button></div><p id="author-status" role="status"></p></form></article>`;
}
function authorQuestion(q, i) {
  const description = {
    choice:
      "Una opción por línea. Indica abajo la posición correcta (1, 2, 3…).",
    matching:
      "Una relación por línea: concepto | significado. El aula mezclará los significados.",
    ordering:
      "Un paso por línea, en el orden correcto. El estudiante los recibirá mezclados.",
    numeric: "Indica el valor correcto y la unidad en el enunciado.",
    crossword:
      "Una palabra y pista por línea: PALABRA | pista. Solo letras; el aula construirá los cruces.",
  };
  return `<fieldset class="card" style="background:#f9fbff"><legend>Reto ${i + 1}</legend><label>Tipo<select data-author-type="${i}" name="type-${i}">${["choice", "matching", "ordering", "numeric", "crossword"].map((t) => `<option value="${t}" ${q.type === t ? "selected" : ""}>${taskLabel[t]}</option>`).join("")}</select></label><label>Enunciado<textarea name="prompt-${i}" rows="2" required>${escape(q.prompt)}</textarea></label><p class="muted" style="font-size:13px">${description[q.type]}</p>${q.type !== "numeric" ? `<label>${q.type === "choice" ? "Opciones" : "Contenido del reto"}<textarea name="details-${i}" rows="4" required>${escape(q.details)}</textarea></label>` : ""}${q.type === "choice" || q.type === "numeric" ? `<label>${q.type === "choice" ? "Número de la opción correcta" : "Resultado correcto"}<input name="correct-${i}" type="number" ${q.type === "choice" ? 'min="1" step="1"' : 'step="any"'} value="${escape(q.correct)}" required></label>` : ""}<label>Explicación para después de entregar<textarea name="explanation-${i}" rows="2" minlength="10" required>${escape(q.explanation)}</textarea></label>${author.questions.length > 1 ? button("removeAuthorQuestion", "Quitar reto", `data-index="${i}" class="link"`) : ""}</fieldset>`;
}
function captureAuthor() {
  const f = document.querySelector("#assessment-author");
  if (!f) return;
  const data = new FormData(f);
  author = {
    week: Number(data.get("week")),
    name: data.get("name"),
    objective: data.get("objective"),
    context: data.get("context"),
    questions: author.questions.map((q, i) => ({
      ...q,
      type: data.get(`type-${i}`),
      prompt: data.get(`prompt-${i}`),
      details: data.get(`details-${i}`) || "",
      correct: data.get(`correct-${i}`) || "1",
      explanation: data.get(`explanation-${i}`),
    })),
  };
}
function composeAssessment() {
  const questions = [],
    keys = [];
  author.questions.forEach((q, i) => {
    const id = `${currentCourse}-w${author.week}-private-${i + 1}`,
      base = {
        id,
        type: q.type === "ordering" ? "order" : q.type,
        prompt: q.prompt,
      },
      key = { id, type: base.type, explanation: q.explanation, weight: 1 };
    const lines = q.details
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    if (q.type === "choice") {
      if (
        lines.length < 2 ||
        Number(q.correct) < 1 ||
        Number(q.correct) > lines.length
      )
        throw Error(`Reto ${i + 1}: revisa opciones y respuesta.`);
      base.options = lines;
      key.correct = Number(q.correct) - 1;
    } else if (q.type === "numeric") {
      base.unit = "";
      key.correct = Number(q.correct);
      key.tolerance = 0.01;
      if (!Number.isFinite(key.correct))
        throw Error("Revisa el resultado numérico.");
    } else if (q.type === "matching") {
      const pairs = lines.map((s) => s.split("|").map((s) => s.trim()));
      if (
        pairs.length < 2 ||
        pairs.some((p) => p.length !== 2 || !p[0] || !p[1])
      )
        throw Error(`Reto ${i + 1}: usa concepto | significado.`);
      const indexes = shuffleIndexes(pairs.length, Date.now() % 10000);
      base.lefts = pairs.map((p) => p[0]);
      base.rights = indexes.map((j) => pairs[j][1]);
      key.correct = pairs.map((_, j) => indexes.indexOf(j));
    } else if (q.type === "ordering") {
      if (lines.length < 2)
        throw Error("La secuencia requiere al menos dos pasos.");
      const indexes = shuffleIndexes(lines.length, Date.now() % 10000);
      base.items = indexes.map((j) => lines[j]);
      key.correct = lines.map((_, j) => indexes.indexOf(j));
    } else if (q.type === "crossword") {
      const entries = lines
        .map((s) => s.split("|").map((s) => s.trim()))
        .map(([word, clue]) => ({ word: normalizedWord(word), clue }));
      if (
        !entries.length ||
        entries.some((e) => !e.word || !e.clue || e.word.length > 20)
      )
        throw Error(
          "Revisa las palabras y pistas del crucigrama (máximo 20 letras).",
        );
      const layout = crosswordLayout(entries);
      base.entries = entries.map((e) => ({
        clue: e.clue,
        length: e.word.length,
      }));
      base.layout = {
        ...layout,
        cells: layout.cells.map(({ letter, directions, ...cell }) => cell),
        placed: layout.placed.map(({ word, ...p }) => p),
      };
      key.correct = entries.map((e) => e.word);
    }
    questions.push(base);
    keys.push(key);
  });
  return {
    payload: {
      week: author.week,
      name: author.name,
      objective: author.objective,
      context: author.context,
      label: "Evaluación preparada por la docente",
      questions,
    },
    keys,
  };
}
function account() {
  route = "account";
  shell(
    `${heading("Mi cuenta", "Tu acceso institucional.", "La matrícula define las materias que puedes consultar.")}<article class="card"><h2>${escape(identity.profile.display_name)}</h2><p>${mode === "live" ? escape(identity.user?.email || "") : "Estás recorriendo una vista previa, sin una cuenta registrada."}</p>${mode === "live" ? button("changePassword", "Cambiar mi contraseña", 'class="primary"') : button("logout", "Ir al acceso institucional")}</article>`,
    "Mi cuenta",
  );
}
function recover() {
  app.innerHTML = `<main id="main" tabindex="-1" style="max-width:650px;margin:60px auto;padding:24px">${logo()}<article class="card" style="margin-top:30px"><span class="eyebrow">Recupera tu acceso</span><h1>Vuelve a tu aula.</h1><p class="muted">Escribe tu cédula. Si la cuenta existe, recibirás un enlace en tu correo institucional e{cédula}@live.uleam.edu.ec.</p><form id="recovery-form"><label>Usuario o cédula<input name="username" required autocomplete="username"></label><button type="submit" class="primary full">Solicitar enlace de recuperación</button><p id="recovery-status" role="status"></p></form>${button("login", "Volver al acceso", 'class="link full"')}</article></main>`;
  focus();
}
function changePassword(required = false) {
  app.innerHTML = `<main id="main" tabindex="-1" style="max-width:650px;margin:60px auto;padding:24px">${logo()}<article class="card" style="margin-top:30px"><span class="eyebrow">Protege tu cuenta</span><h1>Elige tu nueva contraseña.</h1><p class="muted">${required ? "Antes de entrar, cambia la clave temporal. " : ""}Usa al menos doce caracteres y una contraseña distinta de tu cédula.</p><form id="password-form"><label>Nueva contraseña<input name="password" type="password" autocomplete="new-password" minlength="12" required></label><label>Confirmar contraseña<input name="confirm" type="password" autocomplete="new-password" minlength="12" required></label><button type="submit" class="primary full">Guardar mi contraseña</button><p id="password-status" role="status"></p></form></article></main>`;
  focus();
}
async function excel() {
  if (window.ExcelJS) return window.ExcelJS;
  await new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "assets/vendor/exceljs.min.js";
    s.onload = resolve;
    s.onerror = reject;
    document.head.append(s);
  });
  return window.ExcelJS;
}
async function workbook(rows, name) {
  const Excel = await excel(),
    wb = new Excel.Workbook(),
    sheet = wb.addWorksheet("SIGIN");
  sheet.addRows(rows);
  sheet.columns.forEach((c) => (c.width = 28));
  sheet.getRow(1).font = { bold: true };
  const blob = new Blob([await wb.xlsx.writeBuffer()], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function importFile(file) {
  const out = document.querySelector("#import-status");
  try {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) throw Error("El archivo supera 5 MB.");
    out.textContent = "Leyendo archivo…";
    const Excel = await excel(),
      wb = new Excel.Workbook();
    await wb.xlsx.load(await file.arrayBuffer());
    const sheet = wb.worksheets[0];
    if (!sheet) throw Error("No hay hojas en el archivo.");
    if (sheet.rowCount > 2001)
      throw Error("Usa un máximo de 2000 filas por carga.");
    const value = (cell) => {
      const v = cell.value;
      if (v == null) return "";
      if (typeof v === "object")
        throw Error("No se admiten fórmulas ni celdas complejas.");
      return String(v);
    };
    const headers = sheet
        .getRow(1)
        .values.slice(1)
        .map((_, i) => value(sheet.getRow(1).getCell(i + 1))),
      rows = [];
    for (let r = 2; r <= sheet.rowCount; r++)
      rows.push(
        Object.fromEntries(
          headers.map((h, i) => [h, value(sheet.getRow(r).getCell(i + 1))]),
        ),
      );
    preview = normalizeRows(rows, state.students, currentCourse);
    if (!preview.length) throw Error("No hay filas para importar.");
    out.textContent = `${preview.filter((r) => !r.error).length} filas válidas y ${preview.filter((r) => r.error).length} con errores. Aún no se ha guardado ninguna.`;
    document.querySelector("#import-preview").innerHTML =
      `<div class="table-wrap"><table><thead><tr><th>Fila</th><th>Nombre</th><th>Materia</th><th>Estado</th></tr></thead><tbody>${preview.map((r) => `<tr><td>${r.row}</td><td>${escape(r.name)}</td><td>${escape(r.courses[0])}</td><td>${escape(r.error || "Lista para registrar")}</td></tr>`).join("")}</tbody></table></div>${button("confirmImport", "Confirmar filas válidas", `class="primary" ${!preview.some((r) => !r.error) ? "disabled" : ""}`)}`;
  } catch (e) {
    out.textContent = "No se pudo importar: " + e.message;
  }
}
async function registerRows(rows) {
  if (mode === "live") {
    const result = await backend.provisionStudents(
      rows.filter((r) => !r.error),
    );
    await refreshLiveData();
    toast(
      `${result.imported} registros completados; ${result.failed} pendientes.${
        result.failed
          ? " " +
            result.results
              .filter((r) => !r.ok)
              .map((r) => r.error)
              .join("; ")
          : ""
      }`,
    );
  } else {
    const count = commitImport(state, rows);
    save();
    toast(`${count} matrículas de prueba guardadas en este navegador.`);
  }
}
function captureQuestion() {
  if (!quiz) return;
  const q = quiz.activity.questions[quiz.index];
  if (q.type === "numeric") {
    const v = document.querySelector("#numeric-answer")?.value;
    quiz.answers[quiz.index] = !v?.trim() ? "" : Number(v.replace(",", "."));
  } else if (!["matching", "ordering", "order", "crossword"].includes(q.type)) {
    const value = document.querySelector('input[name="choice"]:checked')?.value;
    if (value !== undefined) quiz.answers[quiz.index] = Number(value);
  }
  storeDraft();
}
app.addEventListener("click", async (event) => {
  const b = event.target.closest("[data-action]");
  if (!b || b.disabled) return;
  const action = b.dataset.action,
    w = Number(b.dataset.week);
  b.disabled = true;
  try {
    switch (action) {
      case "loginRole":
        loginRole = b.dataset.role;
        login();
        break;
      case "showPassword": {
        const field = document.querySelector("#password");
        field.type = field.type === "password" ? "text" : "password";
        b.setAttribute(
          "aria-label",
          field.type === "password"
            ? "Mostrar contraseña"
            : "Ocultar contraseña",
        );
        break;
      }
      case "preview":
        enterPreview();
        break;
      case "login":
        login();
        break;
      case "home":
      case "myCourses":
        home();
        break;
      case "course":
        openCourse(b.dataset.course);
        break;
      case "lesson":
        lesson(w);
        break;
      case "menu":
        document.querySelector("#sidebar").classList.toggle("open");
        break;
      case "switchRole":
        identity.profile.role = teacher() ? "student" : "teacher";
        teacher() ? admin() : home();
        break;
      case "admin":
        admin();
        break;
      case "adminTab":
        adminTab = b.dataset.tab;
        admin();
        break;
      case "grades":
        currentCourse = null;
        grades();
        break;
      case "gradeCourse":
        currentCourse = b.dataset.course;
        grades();
        break;
      case "account":
        account();
        break;
      case "changePassword":
        changePassword();
        break;
      case "recover":
        recover();
        break;
      case "logout":
        if (
          quiz &&
          !confirm("¿Salir? Tus respuestas quedan guardadas en esta sesión.")
        )
          break;
        if (mode === "live") await backend.logout();
        quiz = null;
        identity = null;
        mode = "preview";
        try {
          state = JSON.parse(localStorage.getItem(stateKey)) || initialState();
        } catch {
          state = initialState();
        }
        login();
        break;
      case "beginQuiz":
        await beginQuiz(w, b.dataset.mode);
        break;
      case "leaveQuiz":
        captureQuestion();
        lesson(quiz.week);
        break;
      case "previous":
        captureQuestion();
        quiz.index--;
        quiz.checked = false;
        matchSelected = null;
        renderQuiz();
        break;
      case "editAnswer":
        quiz.index = Number(b.dataset.index);
        quiz.checked = false;
        renderQuiz();
        break;
      case "finish":
        await finish();
        break;
      case "matchLeft":
        matchSelected = Number(b.dataset.index);
        renderQuiz(true);
        break;
      case "matchRight": {
        if (matchSelected === null)
          return toast("Primero elige un concepto de la izquierda.");
        const right = Number(b.dataset.index),
          q = quiz.activity.questions[quiz.index],
          v =
            quiz.answers[quiz.index] ||
            Array(q.pairs?.length || q.lefts.length).fill(null);
        for (let i = 0; i < v.length; i++) if (v[i] === right) v[i] = null;
        v[matchSelected] = right;
        quiz.answers[quiz.index] = v;
        quiz.checked = false;
        matchSelected = null;
        storeDraft();
        renderQuiz(true);
        break;
      }
      case "resetTask":
        quiz.answers[quiz.index] = [];
        quiz.checked = false;
        matchSelected = null;
        storeDraft();
        renderQuiz(true);
        break;
      case "moveOrder": {
        const i = Number(b.dataset.index),
          j = i + Number(b.dataset.direction),
          v = quiz.answers[quiz.index];
        [v[i], v[j]] = [v[j], v[i]];
        quiz.checked = false;
        storeDraft();
        renderQuiz(true);
        break;
      }
      case "template":
        await workbook(
          [
            ["Cédula", "Nombres y Apellidos", "Materia", "Paralelo"],
            ["0000000000", "Ejemplo ficticio", currentCourse, "A"],
          ],
          "Plantilla_SIGIN.xlsx",
        );
        break;
      case "confirmImport": {
        const rows = normalizeRows(
          preview.map((r) => ({
            cedula: r.id,
            nombre: r.name,
            materia: r.courses[0],
            paralelo: r.parallel,
          })),
          state.students,
          currentCourse,
        );
        await registerRows(rows);
        preview = [];
        admin();
        break;
      }
      case "deactivateEnrollment": {
        const s = state.students.find((s) => s.id === b.dataset.id);
        if (
          confirm(
            `¿Desactivar la matrícula de ${s.name} en ${course().name}? Se conservará el historial.`,
          )
        ) {
          if (mode === "live") {
            await backend.updateEnrollment(s.uuid, currentCourse, false);
            await refreshLiveData();
          } else {
            s.courses = s.courses.filter((c) => c !== currentCourse);
            save();
          }
          admin();
        }
        break;
      }
      case "editGrade": {
        const s = state.students.find((s) => s.id === b.dataset.id),
          raw = prompt("Nueva nota entre 0 y 10:");
        if (raw === null) break;
        const score = Number(raw.replace(",", "."));
        if (!raw.trim() || !Number.isFinite(score) || score < 0 || score > 10)
          throw Error("Ingresa una nota entre 0 y 10.");
        const reason = prompt("Motivo del ajuste (mínimo cinco caracteres):");
        if (!reason || reason.trim().length < 5)
          throw Error("El ajuste requiere un motivo.");
        if (mode === "live") {
          await backend.adjustGrade(s.uuid, currentCourse, w, score, reason);
          await refreshLiveData();
        } else {
          state.attempts.push({
            id: crypto.randomUUID(),
            studentId: s.id,
            courseId: currentCourse,
            week: w,
            score,
            reason,
            teacherAdjustment: true,
            createdAt: new Date().toISOString(),
          });
          save();
        }
        admin();
        break;
      }
      case "exportGrades":
        await workbook(
          [
            [
              "Estudiante",
              "Cédula",
              ...course().weeks.map((w) => "Semana " + w.weekNumber),
            ],
            ...state.students
              .filter((s) => s.courses.includes(currentCourse))
              .map((s) => [
                s.name,
                s.id,
                ...course().weeks.map(
                  (w) =>
                    bestGrade(
                      state.attempts,
                      s.uuid || s.id,
                      w.weekNumber,
                      currentCourse,
                    ) ?? "Pendiente",
                ),
              ]),
          ],
          "SIGIN_" + currentCourse + "_Resultados.xlsx",
        );
        break;
      case "addAuthorQuestion":
        captureAuthor();
        if (author.questions.length >= 20)
          throw Error("Usa un máximo de veinte retos por evaluación.");
        author.questions.push({
          type: "choice",
          prompt: "",
          details: "",
          correct: "1",
          explanation: "",
        });
        admin();
        break;
      case "removeAuthorQuestion":
        captureAuthor();
        author.questions.splice(Number(b.dataset.index), 1);
        admin();
        break;
    }
  } catch (e) {
    toast(e.message);
    document
      .querySelector("#finish-error")
      ?.replaceChildren(document.createTextNode(e.message));
  } finally {
    if (b.isConnected) b.disabled = false;
  }
});
app.addEventListener("submit", async (event) => {
  event.preventDefault();
  const f = event.target,
    b = f.querySelector('button[type="submit"]');
  if (b?.disabled) return;
  if (b) b.disabled = true;
  try {
    if (f.id === "login-form") {
      if (!backendConfigured)
        throw Error("La conexión institucional todavía no está configurada.");
      const d = new FormData(f);
      identity = await backend.login(d.get("username"), d.get("password"));
      await loadLive();
    }
    if (f.id === "recovery-form") {
      const d = new FormData(f);
      await backend.recover(d.get("username"));
      document.querySelector("#recovery-status").textContent =
        "Solicitud recibida. Si la cuenta existe y el correo está habilitado, recibirás el enlace. Revisa también correo no deseado.";
    }
    if (f.id === "password-form") {
      const d = new FormData(f);
      if (d.get("password") !== d.get("confirm"))
        throw Error("Las contraseñas no coinciden.");
      identity = await backend.updatePassword(d.get("password"));
      await loadLive();
    }
    if (f.id === "quiz-answer") {
      captureQuestion();
      const q = quiz.activity.questions[quiz.index];
      if (!answerComplete(q, quiz.answers[quiz.index]))
        throw Error(
          "Completa todas las partes de este reto antes de continuar.",
        );
      if (quiz.mode === "practice" && !quiz.checked) {
        quiz.checked = true;
        renderQuiz(true);
        document
          .querySelector(".feedback")
          ?.scrollIntoView({ block: "nearest" });
      } else if (quiz.index < quiz.activity.questions.length - 1) {
        quiz.index++;
        quiz.checked = false;
        matchSelected = null;
        renderQuiz();
      } else review();
    }
    if (f.dataset.schedule) {
      const d = new FormData(f),
        open = d.get("open"),
        close = d.get("close");
      if (open && close && open >= close)
        throw Error("El cierre debe ser posterior a la apertura.");
      const s = {
        courseId: currentCourse,
        week: Number(f.dataset.schedule),
        locked: d.has("locked"),
        open: open ? open + ":00-05:00" : "",
        close: close ? close + ":00-05:00" : "",
        maxAttempts: Number(d.get("maxAttempts")),
      };
      if (mode === "live") {
        await backend.saveWeek(currentCourse, s.week, s);
        await refreshLiveData();
      } else {
        Object.assign(setting(currentCourse, s.week), s);
        save();
      }
      f.querySelector(".schedule-status").textContent = "Semana guardada.";
    }
    if (f.id === "add-student") {
      const d = new FormData(f),
        rows = normalizeRows(
          [
            {
              cedula: d.get("id"),
              nombre: d.get("name"),
              paralelo: d.get("parallel"),
              materia: currentCourse,
            },
          ],
          state.students,
          currentCourse,
        );
      if (rows[0].error) throw Error(rows[0].error);
      await registerRows(rows);
      admin();
    }
    if (f.id === "assessment-author") {
      captureAuthor();
      if (mode !== "live")
        throw Error(
          "Las evaluaciones privadas se guardan con una cuenta docente conectada a Supabase. Esta vista previa no publica respuestas.",
        );
      const { payload, keys } = composeAssessment();
      await backend.publishAssessment(
        currentCourse,
        author.week,
        payload,
        keys,
      );
      document.querySelector("#author-status").textContent =
        "Evaluación guardada en privado. Puedes habilitar su semana desde Semanas y horarios.";
    }
  } catch (e) {
    const out = f.querySelector(
      "#login-error,#recovery-status,#password-status,#quiz-error,#manual-status,#author-status,.schedule-status",
    );
    if (out) out.textContent = e.message;
    else toast(e.message);
  } finally {
    if (b?.isConnected) b.disabled = false;
  }
});
app.addEventListener("change", (event) => {
  const el = event.target;
  if (el.id === "admin-course") {
    currentCourse = el.value;
    admin();
  }
  if (el.id === "import-file") importFile(el.files[0]);
  if (el.dataset.authorType !== undefined) {
    captureAuthor();
    admin();
  }
  if (quiz && el.name === "choice") {
    quiz.answers[quiz.index] = Number(el.value);
    quiz.checked = false;
    storeDraft();
  }
});
app.addEventListener("input", (event) => {
  const el = event.target;
  if (el.id === "student-search") {
    const q = el.value.toLocaleLowerCase("es");
    document.querySelector("#student-list").innerHTML = studentTable(
      state.students.filter(
        (s) =>
          s.courses.includes(currentCourse) &&
          (s.name + " " + s.id).toLocaleLowerCase("es").includes(q),
      ),
    );
  }
  if (quiz && el.id === "numeric-answer") {
    quiz.checked = false;
    captureQuestion();
  }
  if (quiz && el.classList.contains("cw-input")) {
    const q = quiz.activity.questions[quiz.index],
      entries = q.entries,
      v =
        quiz.answers[quiz.index] ||
        entries.map((e) =>
          " ".repeat(e.word ? normalizedWord(e.word).length : e.length),
        ),
      letter = normalizedWord(el.value).slice(-1);
    el.value = letter;
    const refs = JSON.parse(el.dataset.refs);
    for (const ref of refs) {
      const len = entries[ref.entry].word
        ? normalizedWord(entries[ref.entry].word).length
        : entries[ref.entry].length;
      const chars = (v[ref.entry] || "").padEnd(len, " ").split("");
      chars[ref.letter] = letter || " ";
      v[ref.entry] = chars.join("");
    }
    quiz.answers[quiz.index] = v;
    quiz.checked = false;
    storeDraft();
    const nextRef = { entry: refs[0].entry, letter: refs[0].letter + 1 },
      next = [...document.querySelectorAll(".cw-input")].find((input) =>
        JSON.parse(input.dataset.refs).some(
          (r) => r.entry === nextRef.entry && r.letter === nextRef.letter,
        ),
      );
    if (letter && next) next.focus();
  }
});
(async () => {
  try {
    if (backendConfigured && (await backend.handleRecovery()))
      return changePassword(true);
    identity = await backend.restore();
    if (identity) return loadLive();
  } catch (e) {
    login(e.message);
    return;
  }
  login();
})();

export const courseIds = ["gig-502", "cex-103", "gig-406"];
export const institutionalEmail = (id) => `e${id}@live.uleam.edu.ec`;
export function initialState() {
  return {
    version: 2,
    students: [],
    attempts: [],
    practice: {},
    settings: courseIds.flatMap((courseId) =>
      Array.from({ length: 16 }, (_, i) => ({
        courseId,
        week: i + 1,
        locked: i > 0,
        maxAttempts: i === 15 ? 5 : 2,
        open: "",
        close: "",
      })),
    ),
  };
}
export function availability(s, now = Date.now()) {
  if (!s || s.locked)
    return { open: false, label: "Evaluación cerrada", kind: "closed" };
  if (s.open && now < Date.parse(s.open))
    return { open: false, label: "Próxima apertura", kind: "scheduled" };
  if (s.close && now >= Date.parse(s.close))
    return { open: false, label: "Plazo finalizado", kind: "closed" };
  return { open: true, label: "Evaluación disponible", kind: "available" };
}
export const normalizedWord = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();
export function questionCorrect(q, value) {
  switch (q.type) {
    case "matching":
      return (
        Array.isArray(value) &&
        value.length === q.pairs.length &&
        value.every((v, i) => Number(v) === i)
      );
    case "ordering":
    case "order":
      return (
        Array.isArray(value) &&
        value.length === q.items.length &&
        value.every((v, i) => Number(v) === i)
      );
    case "numeric":
      return (
        value !== "" &&
        value !== null &&
        Number.isFinite(Number(value)) &&
        Math.abs(Number(value) - q.correct) <= (q.tolerance ?? 0.01)
      );
    case "crossword":
      return (
        Array.isArray(value) &&
        value.length === q.entries.length &&
        value.every(
          (v, i) => normalizedWord(v) === normalizedWord(q.entries[i].word),
        )
      );
    default:
      return (
        Number(value) === q.correct &&
        value !== null &&
        value !== undefined &&
        value !== ""
      );
  }
}
export function answerComplete(q, v) {
  if (q.type === "matching")
    return (
      Array.isArray(v) &&
      v.length === (q.pairs?.length || q.lefts?.length) &&
      v.every((x) => Number.isInteger(x))
    );
  if (q.type === "ordering" || q.type === "order")
    return (
      Array.isArray(v) &&
      v.length === q.items.length &&
      new Set(v).size === v.length
    );
  if (q.type === "crossword")
    return (
      Array.isArray(v) &&
      v.length === q.entries.length &&
      v.every(
        (x, i) =>
          !String(x || "").includes(" ") &&
          normalizedWord(x).length ===
            (q.entries[i].word
              ? normalizedWord(q.entries[i].word).length
              : q.entries[i].length),
      )
    );
  return (
    v !== "" && v !== null && v !== undefined && Number.isFinite(Number(v))
  );
}
export function grade(questions, answers) {
  return (
    Math.round(
      (questions.filter((q, i) => questionCorrect(q, answers[i])).length /
        questions.length) *
        100,
    ) / 10
  );
}
export function bestGrade(attempts, id, week, courseId = "gig-502") {
  const relevant = attempts.filter(
    (a) => a.studentId === id && a.week === week && a.courseId === courseId,
  );
  const override = relevant.findLastIndex((a) => a.teacherAdjustment);
  const scores = relevant
    .slice(override < 0 ? 0 : override)
    .map((a) => a.score);
  return scores.length ? Math.max(...scores) : null;
}
export function normalizeRows(rows, existing = [], defaultCourse = "gig-502") {
  const seen = new Set();
  return rows
    .filter((r) => Object.values(r).some((v) => String(v ?? "").trim()))
    .map((row, i) => {
      const clean = Object.fromEntries(
        Object.entries(row).map(([k, v]) => [
          k
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim(),
          String(v ?? "").trim(),
        ]),
      );
      const id = clean.cedula || clean.id || "",
        name =
          clean["nombres y apellidos"] || clean.nombres || clean.nombre || "";
      const raw = clean.materia || clean.curso || defaultCourse;
      const requested = raw.toLowerCase().replace("-ac", "");
      const identity = `${id}:${requested}`,
        student = existing.find((s) => s.id === id);
      const error = !/^\d{10}$/.test(id)
        ? "Cédula: se requieren diez dígitos"
        : !name
          ? "Falta el nombre"
          : !courseIds.includes(requested)
            ? "Materia no reconocida"
            : seen.has(identity) || student?.courses.includes(requested)
              ? "Matrícula duplicada"
              : student && student.name !== name
                ? "Nombre diferente para la misma cédula; revisa antes de importar"
                : null;
      if (!error) seen.add(identity);
      return {
        row: i + 2,
        id,
        name,
        email: institutionalEmail(id),
        courses: [requested],
        parallel: clean.paralelo || "A",
        error,
      };
    });
}
export function commitImport(state, preview) {
  let count = 0;
  for (const r of preview.filter((r) => !r.error)) {
    let s = state.students.find((s) => s.id === r.id);
    if (s) {
      for (const c of r.courses) if (!s.courses.includes(c)) s.courses.push(c);
    } else
      state.students.push({
        id: r.id,
        name: r.name,
        email: r.email,
        courses: r.courses,
        parallel: r.parallel,
      });
    count++;
  }
  return count;
}
export function shuffleIndexes(length, seed = 1) {
  const a = Array.from({ length }, (_, i) => i);
  let t = seed;
  for (let i = a.length - 1; i > 0; i--) {
    t = (t * 1664525 + 1013904223) >>> 0;
    const j = t % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

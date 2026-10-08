import test from "node:test";
import assert from "node:assert/strict";
import {
  initialState,
  normalizeRows,
  commitImport,
  availability,
  bestGrade,
  answerComplete,
} from "../assets/model.js";
test("inicio sin estudiantes: no publicar datos reales", () => {
  assert.equal(initialState().students.length, 0);
  assert.equal(initialState().settings.length, 48);
});
test("plantilla compatible, varias filas y ceros iniciales", () => {
  const s = initialState();
  const rows = normalizeRows(
    [
      {
        Cédula: "0123456789",
        "Nombres y Apellidos": "Ana",
        Materia: "gig-502",
      },
      { cedula: "1234567890", nombre: "Luis", materia: "cex-103" },
    ],
    s.students,
  );
  assert.equal(commitImport(s, rows), 2);
  assert.equal(s.students.length, 2);
  assert.equal(s.students[0].email, "e0123456789@live.uleam.edu.ec");
});
test("una persona puede matricularse en dos materias sin duplicar cuenta", () => {
  const s = initialState();
  commitImport(
    s,
    normalizeRows(
      [
        { cedula: "1234567890", nombre: "Ana", materia: "gig-502" },
        { cedula: "1234567890", nombre: "Ana", materia: "gig-406" },
      ],
      [],
    ),
  );
  assert.equal(s.students.length, 1);
  assert.deepEqual(s.students[0].courses, ["gig-502", "gig-406"]);
});
test("duplicados, cédulas inválidas, cursos desconocidos y nombre conflictivo", () => {
  const rows = normalizeRows(
    [
      { cedula: "1234567890", nombre: "A" },
      { cedula: "1234567890", nombre: "B" },
      { cedula: "123", nombre: "C" },
      { cedula: "0123456789", nombre: "D", materia: "otra" },
    ],
    [],
  );
  assert.equal(rows.filter((r) => r.error).length, 3);
  assert.ok(
    normalizeRows(
      [{ cedula: "1234567890", nombre: "Otra", materia: "gig-406" }],
      [{ id: "1234567890", name: "Ana", courses: ["gig-502"] }],
    )[0].error,
  );
});
test("cierre manual prevalece y límite temporal usa instante Ecuador", () => {
  const s = {
    locked: false,
    open: "2026-10-01T10:00:00-05:00",
    close: "2026-10-02T10:00:00-05:00",
  };
  assert.equal(availability(s, Date.parse("2026-10-01T16:00:00Z")).open, true);
  assert.equal(
    availability({ ...s, locked: true }, Date.parse("2026-10-01T16:00:00Z"))
      .open,
    false,
  );
  assert.equal(availability(s, Date.parse("2026-10-02T15:00:00Z")).open, false);
});
test("ajuste docente baja una nota y conserva historial", () => {
  const attempts = [
    { courseId: "gig-502", studentId: "a", week: 1, score: 10 },
    {
      courseId: "gig-502",
      studentId: "a",
      week: 1,
      score: 7,
      teacherAdjustment: true,
    },
  ];
  assert.equal(bestGrade(attempts, "a", 1), 7);
  assert.equal(attempts.length, 2);
});
test("respuestas incompletas: emparejamiento y número vacío no se entregan", () => {
  assert.equal(
    answerComplete({ type: "matching", pairs: [{ left: "a", right: "b" }] }, [
      null,
    ]),
    false,
  );
  assert.equal(answerComplete({ type: "numeric" }, ""), false);
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { courses } from "../assets/courses.js";
import {
  answerComplete,
  bestGrade,
  grade,
  initialState,
  normalizedWord,
  questionCorrect,
} from "../assets/model.js";
import { crosswordLayout } from "../assets/crossword.js";

const originalAlfinTitles = [
  "Sociedad del Conocimiento y Fundamentos ALFIN/AMI en Retail",
  "Necesidades y Comportamiento Informacional Organizacional",
  "Modelos y Estándares ALFIN: ACRL, SCONUL, Big6 y UNESCO-AMI",
  "Brecha Digital e Inclusión Informacional en Cadenas Productivas",
  "Formulación de Preguntas Estratégicas y Vocabularios de Búsqueda",
  "Fuentes Institucionales, Científicas y Datos Abiertos",
  "Búsqueda Avanzada, Operadores Booleanos y Minería Documental",
  "Organización de Información, Gestores Bibliográficos y Dossier Digital",
  "Criterios de Evaluación: Autoridad, Actualidad y Fiabilidad (Test CRAAP)",
  "Desinformación Corporativa, Sesgos y Verificación Cruzada",
  "Propiedad Intelectual, Derechos de Autor y Citación Normalizada",
  "IA Generativa, Integridad Académica, Sesgos y Validación Crítica",
  "Síntesis y Transformación de Información en Conocimiento Comunicable",
  "Comunicación Estratégica según Propósito, Audiencia y Canal",
  "Accesibilidad, Calidad y Portafolio de Competencias Informacionales",
  "EXAMEN SEMESTRAL INTEGRAL DE ACREDITACIÓN (C4)",
];
const allActivities = courses.flatMap((course) => course.activities);
const allQuestions = allActivities.flatMap((activity) => activity.questions);
const topicBaseline = JSON.parse(
  readFileSync(new URL("./fixtures/syllabus-topics.json", import.meta.url), "utf8"),
);
const plain = (text) =>
  String(text).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
const correctAnswer = (question) => {
  if (question.type === "matching")
    return question.pairs.map((_, index) => index);
  if (["ordering", "order"].includes(question.type))
    return question.items.map((_, index) => index);
  if (question.type === "crossword")
    return question.entries.map((entry) => entry.word);
  return question.correct;
};

test("tres materias completas: 48 semanas, 48 expedientes y 240 retos asociados a su semana", () => {
  assert.deepEqual(courses.map((course) => course.id).sort(), [
    "cex-103",
    "gig-406",
    "gig-502",
  ]);
  assert.equal(
    courses.reduce((count, course) => count + course.weeks.length, 0),
    48,
  );
  assert.equal(allActivities.length, 48);
  assert.equal(allQuestions.length, 240);
  assert.equal(new Set(allQuestions.map((question) => question.id)).size, 240);
  for (const course of courses) {
    assert.deepEqual(
      course.weeks.map((week) => week.weekNumber),
      Array.from({ length: 16 }, (_, index) => index + 1),
      course.id,
    );
    assert.deepEqual(
      course.activities.map((activity) => activity.week),
      course.weeks.map((week) => week.weekNumber),
      course.id,
    );
    assert.ok(
      course.weeks.every((week) => week.title && week.unit),
      `Temas y unidades de ${course.id}`,
    );
    for (const activity of course.activities) {
      assert.equal(
        activity.questions.length,
        5,
        `${course.id}, semana ${activity.week}`,
      );
      assert.deepEqual(
        activity.questions.map((question) => question.type).sort(),
        ["choice", "choice", "crossword", "matching", "ordering"],
        `Dos decisiones, relaciones, secuencia y crucigrama: ${course.id}, semana ${activity.week}`,
      );
    }
  }
});

test("las tres materias conservan los 48 temas, unidades y orden del sílabo", () => {
  assert.deepEqual(
    courses.map(({ id, code, name, weeks }) => ({
      id, code, name,
      weeks: weeks.map(({ weekNumber, title, unit }) => ({ weekNumber, title, unit })),
    })),
    topicBaseline,
  );
  assert.deepEqual(
    courses
      .find((course) => course.id === "gig-502")
      .weeks.map((week) => week.title),
    originalAlfinTitles,
  );
});

test("cada semana enseña conceptos y presenta un caso breve con instrucciones y explicaciones", () => {
  assert.equal(
    new Set(allActivities.map((activity) => activity.context)).size,
    48,
  );
  for (const activity of allActivities) {
    const wordCount = activity.context.trim().split(/\s+/u).length;
    assert.ok(wordCount >= 110 && wordCount <= 260,
      `${activity.name}: ${wordCount} palabras; necesita contexto suficiente y conciso`);
    const context = plain(activity.context);
    assert.match(context, /conceptos?\s+claves?/u,
      `${activity.name}: faltan los conceptos que se deben aprender`);
    assert.match(context, /caso\s+breve/u,
      `${activity.name}: falta delimitar el caso aplicado`);
    assert.match(context, /que\s+debes\s+hacer|instrucciones|tu\s+(?:tarea|reto)/u,
      `${activity.name}: no explica qué debe hacer el estudiante`);
    assert.ok(
      activity.context.includes("\n\n"),
      `${activity.name}: falta separar documentos o párrafos`,
    );
    assert.ok(
      activity.objective.trim().length > 30,
      `${activity.name}: objetivo vacío`,
    );
    assert.match(
      activity.label,
      /simulaci[oó]n|fictici/iu,
      `${activity.name}: naturaleza didáctica sin identificar`,
    );
    assert.match(
      activity.context,
      /fictici|simulaci[oó]n|inventad/iu,
      `${activity.name}: expediente sin advertencia contextual`,
    );
    for (const question of activity.questions) {
      assert.ok(
        question.prompt.trim().length > 20,
        `${question.id}: instrucción insuficiente`,
      );
      assert.ok(
        question.explanation.trim().length > 30,
        `${question.id}: explicación insuficiente`,
      );
    }
  }
});

test("cada semana enlaza lecturas específicas con autor, sección y propósito", () => {
  for (const activity of allActivities) {
    const references = (activity.references || []).filter((reference) =>
      /^https:\/\//u.test(reference.url));
    assert.ok(references.length, `${activity.name}: falta una lectura externa para profundizar`);
    for (const reference of references) {
      const url = new URL(reference.url);
      const path = url.pathname.replace(/\/+$/u, "");
      assert.ok(
        (path && !/^\/(?:[a-z]{2}(?:-[a-z]{2})?)?$/iu.test(path) &&
          !/^\/(?:index|home|inicio)\.(?:html?|php|aspx?)$/iu.test(path)) || url.searchParams.size,
        `${activity.name}: ${reference.url} lleva a una portada, no a una lectura específica`,
      );
      for (const [field, minimum] of [["author", 3], ["section", 5], ["purpose", 20]])
        assert.ok(typeof reference[field] === "string" && reference[field].trim().length >= minimum,
          `${activity.name}: la lectura no identifica ${field}`);
    }
  }
});

test("los sílabos PDF ofrecidos en enlaces locales existen y conservan cabecera PDF", () => {
  const linkedPaths = new Set();
  const repoRoot = new URL("../", import.meta.url);
  for (const course of courses) {
    if (course.syllabusSource) linkedPaths.add(course.syllabusSource);
    for (const activity of course.activities) {
      for (const reference of activity.references ?? []) {
        assert.ok(
          reference.name?.trim(),
          `${course.id}: referencia sin título visible`,
        );
        if (reference.url.startsWith("./")) linkedPaths.add(reference.url);
        else
          assert.match(
            reference.url,
            /^https:\/\//u,
            `${course.id}: referencia sin HTTPS`,
          );
      }
    }
  }
  assert.ok(linkedPaths.has("./documents/comercio-silabo.pdf"));
  assert.ok(linkedPaths.has("./documents/geap-silabo.pdf"));
  for (const path of linkedPaths) {
    const bytes = readFileSync(new URL(path, repoRoot));
    assert.equal(
      bytes.subarray(0, 5).toString(),
      "%PDF-",
      `Archivo local inválido: ${path}`,
    );
    assert.ok(bytes.length > 1000, `PDF incompleto: ${path}`);
  }
});

test("las prácticas usan cuatro tipos sin cálculo numérico y califican correctamente", () => {
  assert.deepEqual(
    [...new Set(allQuestions.map((question) => question.type))].sort(),
    ["choice", "crossword", "matching", "ordering"],
  );
  for (const question of allQuestions) {
    const solution = correctAnswer(question);
    assert.equal(
      answerComplete(question, solution),
      true,
      `${question.id}: solución incompleta`,
    );
    assert.equal(
      questionCorrect(question, solution),
      true,
      `${question.id}: solución rechazada`,
    );
    let incorrect;
    if (question.type === "choice") {
      assert.ok(
        question.options[question.correct],
        `${question.id}: opción correcta inexistente`,
      );
      incorrect = (question.correct + 1) % question.options.length;
    } else if (question.type === "crossword") {
      incorrect = solution.map((word, index) =>
        index === 0 ? `${word}ZZ` : word,
      );
      assert.equal(
        questionCorrect(
          question,
          solution.map((word) => word.toLowerCase()),
        ),
        true,
        `${question.id}: minúsculas`,
      );
    } else {
      assert.ok(
        solution.length > 1,
        `${question.id}: se requieren varias posiciones`,
      );
      incorrect = [...solution.slice(1), solution[0]];
      assert.equal(
        questionCorrect(question, solution.slice(1)),
        false,
        `${question.id}: respuesta parcial`,
      );
    }
    assert.equal(
      questionCorrect(question, incorrect),
      false,
      `${question.id}: acepta una solución alterada`,
    );
    assert.equal(
      questionCorrect(question, null),
      false,
      `${question.id}: acepta ausencia de respuesta`,
    );
  }
  for (const activity of allActivities) {
    assert.equal(
      grade(activity.questions, activity.questions.map(correctAnswer)),
      10,
      `${activity.name}: nota de solución completa`,
    );
    assert.equal(
      grade(
        activity.questions,
        activity.questions.map(() => null),
      ),
      0,
      `${activity.name}: nota sin respuestas`,
    );
  }
});

test("las cuadrículas de todos los crucigramas mantienen letras, cruces, referencias y límites", () => {
  for (const question of allQuestions.filter(
    (question) => question.type === "crossword",
  )) {
    const layout = crosswordLayout(question.entries);
    assert.equal(
      layout.placed.length,
      question.entries.length,
      `${question.id}: término perdido`,
    );
    assert.ok(Number.isInteger(layout.width) && layout.width > 0, question.id);
    assert.ok(
      Number.isInteger(layout.height) && layout.height > 0,
      question.id,
    );
    const positions = new Set();
    let referenceCount = 0;
    for (const cell of layout.cells) {
      const position = `${cell.x},${cell.y}`;
      assert.ok(!positions.has(position), `${question.id}: celda duplicada`);
      positions.add(position);
      assert.ok(
        cell.column >= 1 && cell.column <= layout.width,
        `${question.id}: columna fuera del tablero`,
      );
      assert.ok(
        cell.row >= 1 && cell.row <= layout.height,
        `${question.id}: fila fuera del tablero`,
      );
      assert.ok(
        cell.refs.length >= 1 && cell.refs.length <= 2,
        `${question.id}: número de términos por celda`,
      );
      assert.equal(
        new Set(cell.directions).size,
        cell.directions.length,
        `${question.id}: superposición en la misma dirección`,
      );
      if (cell.refs.length === 2)
        assert.deepEqual(
          [...cell.directions].sort(),
          ["across", "down"],
          `${question.id}: cruce no perpendicular`,
        );
      for (const ref of cell.refs) {
        const word = normalizedWord(question.entries[ref.entry].word);
        assert.equal(
          cell.letter,
          word[ref.letter],
          `${question.id}: colisión de letras`,
        );
        const placed = layout.placed.find((term) => term.index === ref.entry);
        assert.equal(
          cell.x,
          placed.x + (placed.dir === "across" ? ref.letter : 0),
          `${question.id}: referencia horizontal`,
        );
        assert.equal(
          cell.y,
          placed.y + (placed.dir === "down" ? ref.letter : 0),
          `${question.id}: referencia vertical`,
        );
        referenceCount++;
      }
    }
    assert.equal(
      referenceCount,
      question.entries.reduce(
        (total, entry) => total + normalizedWord(entry.word).length,
        0,
      ),
      `${question.id}: letras omitidas`,
    );
  }
  const example = crosswordLayout([
    { word: "DATOS", clue: "Registro" },
    { word: "STOCK", clue: "Existencias" },
    { word: "COSTO", clue: "Gasto" },
  ]);
  assert.ok(
    example.cells.some((cell) => cell.refs.length === 2),
    "Términos compatibles deben producir cruces reales",
  );
  const separate = crosswordLayout([
    { word: "ABC", clue: "Uno" },
    { word: "XYZ", clue: "Dos" },
  ]);
  assert.equal(
    separate.placed.length,
    2,
    "Términos sin letras compartidas también deben conservarse",
  );
  assert.ok(
    separate.placed[1].y > separate.placed[0].y + 1,
    "Fila separada para término sin cruce",
  );
});

test("notas y ajustes se aíslan por estudiante, materia y semana para las tres materias", () => {
  const state = initialState();
  assert.equal(state.settings.length, 48);
  for (const course of courses)
    assert.equal(
      state.settings.filter((setting) => setting.courseId === course.id).length,
      16,
    );
  const attempts = [
    { studentId: "persona-a", courseId: "gig-502", week: 1, score: 6 },
    { studentId: "persona-a", courseId: "cex-103", week: 1, score: 8 },
    { studentId: "persona-a", courseId: "gig-406", week: 1, score: 9 },
    { studentId: "persona-b", courseId: "gig-502", week: 1, score: 10 },
    { studentId: "persona-a", courseId: "gig-502", week: 2, score: 10 },
  ];
  assert.equal(bestGrade(attempts, "persona-a", 1, "gig-502"), 6);
  assert.equal(bestGrade(attempts, "persona-a", 1, "cex-103"), 8);
  assert.equal(bestGrade(attempts, "persona-a", 1, "gig-406"), 9);
  assert.equal(bestGrade(attempts, "persona-a", 3, "gig-406"), null);
  attempts.push({
    studentId: "persona-a",
    courseId: "cex-103",
    week: 1,
    score: 4,
    teacherAdjustment: true,
  });
  assert.equal(bestGrade(attempts, "persona-a", 1, "cex-103"), 4);
  assert.equal(bestGrade(attempts, "persona-a", 1, "gig-502"), 6);
  assert.equal(bestGrade(attempts, "persona-a", 1, "gig-406"), 9);
  attempts.push({
    studentId: "persona-a",
    courseId: "cex-103",
    week: 1,
    score: 7,
  });
  assert.equal(
    bestGrade(attempts, "persona-a", 1, "cex-103"),
    7,
    "Un nuevo intento puede mejorar la nota después del ajuste",
  );
});

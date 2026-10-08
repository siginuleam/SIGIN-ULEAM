import { alfinCourse } from "./alfin-course.js";
import { commerceCourse } from "./comercio-course.js";
import { geapCourse } from "./geap-course.js";
export const courses = [alfinCourse, commerceCourse, geapCourse].map(
  (c, index) => ({
    ...c,
    index,
    activities: c.activities.map((a) => ({
      ...a,
      questions: a.questions.map((q, i) => ({
        ...q,
        id: q.id || `${c.id}-w${a.week}-q${i + 1}`,
        type: q.type || "choice",
      })),
    })),
  }),
);

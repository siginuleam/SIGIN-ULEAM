// Supabase Edge Function. Los secretos existen solo en el entorno de ejecución del servidor.
// Sin bibliotecas externas: usa Auth Admin API y REST con verificación TLS normal.
type StudentRow = {
  id?: string;
  cedula?: string;
  name?: string;
  nombre?: string;
  courses?: string[];
  courseId?: string;
  group?: string;
  parallel?: string;
  courseGroups?: Record<string, string>;
};
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const allowedOrigins = (Deno.env.get("SIGIN_ALLOWED_ORIGINS") || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

Deno.serve(async (request: Request) => {
  const origin = request.headers.get("Origin") || "";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Vary: "Origin",
    "Access-Control-Allow-Headers":
      "authorization, apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  if (origin && allowedOrigins.includes(origin))
    headers["Access-Control-Allow-Origin"] = origin;
  const respond = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers });
  if (origin && !allowedOrigins.includes(origin))
    return respond({ error: "Origen no autorizado." }, 403);
  if (request.method === "OPTIONS")
    return new Response(null, { status: 204, headers });
  if (request.method !== "POST")
    return respond({ error: "Método no permitido." }, 405);
  if (!supabaseUrl || !serviceKey)
    return respond({ error: "Falta configuración de servidor." }, 503);

  async function service(
    path: string,
    options: { method?: string; body?: unknown; token?: string } = {},
  ) {
    const response = await fetch(supabaseUrl + path, {
      method: options.method || "GET",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${options.token || serviceKey}`,
        "Content-Type": "application/json",
      },
      ...(options.body !== undefined
        ? { body: JSON.stringify(options.body) }
        : {}),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok)
      throw new Error(
        data?.msg ||
          data?.message ||
          data?.error_description ||
          `Error de servicio (${response.status}).`,
      );
    return data;
  }
  try {
    const authorization = request.headers.get("Authorization");
    if (!authorization?.startsWith("Bearer "))
      return respond({ error: "Inicia sesión." }, 401);
    // Comprobar el usuario en Auth y después el rol almacenado; no basta con decodificar el JWT.
    const user = await service("/auth/v1/user", {
      token: authorization.slice(7),
    }).catch(() => null);
    if (!user?.id) return respond({ error: "Sesión no válida." }, 401);
    const profiles = await service(
      `/rest/v1/profiles?id=eq.${encodeURIComponent(user.id)}&select=role,must_change_password`,
    );
    if (profiles?.[0]?.role !== "teacher" || profiles[0].must_change_password)
      return respond({ error: "TEACHER_REQUIRED" }, 403);
    if (Number(request.headers.get("Content-Length")) > 65536)
      return respond({ error: "Lote demasiado grande." }, 413);
    const input = await request.text();
    if (input.length > 65536)
      return respond({ error: "Lote demasiado grande." }, 413);
    const body = JSON.parse(input);
    if (
      !Array.isArray(body.students) ||
      !body.students.length ||
      body.students.length > 25
    )
      return respond(
        { error: "Envía entre 1 y 25 estudiantes por lote." },
        400,
      );
    const courses = await service("/rest/v1/courses?select=id");
    const validCourses = new Set(
      courses.map((course: { id: string }) => course.id),
    );
    const seen = new Set<string>();
    const results = [];
    for (const row of body.students as StudentRow[]) {
      const id = String(row.id || row.cedula || "").trim();
      const name = String(row.name || row.nombre || "").trim();
      const selectedCourses = Array.isArray(row.courses)
        ? [...new Set(row.courses)]
        : row.courseId
          ? [row.courseId]
          : [];
      if (
        !/^\d{10}$/.test(id) ||
        name.length < 2 ||
        name.length > 120 ||
        !selectedCourses.length ||
        selectedCourses.some((course) => !validCourses.has(course))
      ) {
        results.push({
          id,
          ok: false,
          error: "Cédula, nombre o materia no válidos.",
        });
        continue;
      }
      if (seen.has(id)) {
        results.push({ id, ok: false, error: "Cédula repetida en el lote." });
        continue;
      }
      seen.add(id);
      let createdUser: string | null = null;
      try {
        const existing = await service(
          `/rest/v1/profiles?student_number=eq.${id}&select=id,role`,
        );
        let authId = existing?.[0]?.id;
        if (!authId) {
          const user = await service("/auth/v1/admin/users", {
            method: "POST",
            body: {
              email: `e${id}@live.uleam.edu.ec`,
              password: id,
              // Matrícula verificada por la docente; cambiar clave temporal es obligatorio antes de leer el aula.
              // Esto no afirma que el buzón fue verificado por el estudiante.
              email_confirm: true,
              user_metadata: { display_name: name },
            },
          });
          authId = user.id;
          createdUser = user.id;
        }
        if (!authId)
          throw new Error("No se recibió un identificador de cuenta.");
        await service("/rest/v1/rpc/provision_student", {
          method: "POST",
          body: {
            p_user_id: authId,
            p_student_number: id,
            p_display_name: name,
            p_courses: selectedCourses,
            p_group: String(row.group || row.parallel || "")
              .trim()
              .slice(0, 80),
            p_course_groups: Object.fromEntries(
              selectedCourses.map((course) => [
                course,
                String(
                  row.courseGroups?.[course] ?? row.group ?? row.parallel ?? "",
                )
                  .trim()
                  .slice(0, 80),
              ]),
            ),
          },
        });
        results.push({ id, ok: true, created: Boolean(createdUser) });
      } catch (error) {
        let cleanupFailed = false;
        if (createdUser)
          try {
            await service(
              `/auth/v1/admin/users/${encodeURIComponent(createdUser)}`,
              { method: "DELETE" },
            );
          } catch {
            cleanupFailed = true;
          }
        results.push({
          id,
          ok: false,
          error: cleanupFailed
            ? "La matrícula falló y quedó una cuenta pendiente. Revísala en Authentication antes de reintentar."
            : String((error as Error).message || "No se pudo crear la cuenta."),
        });
      }
    }
    return respond({ results });
  } catch {
    // No registrar bodies: contienen identificadores personales y el flujo inicial crea claves temporales.
    return respond(
      {
        error:
          "No se pudo completar el lote. Revisa la conexión y la configuración del servidor.",
      },
      400,
    );
  }
});

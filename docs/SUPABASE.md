# Activar cuentas y datos compartidos

La web exige inicio de sesión. Las cuentas aún no estarán activas hasta completar estos pasos. El plan Free de Supabase permite empezar sin pagar, con cuotas y posibles pausas por inactividad. Revisa los límites actuales en https://supabase.com/pricing. Un correo enviado realmente y una sesión en dos dispositivos deben comprobarse antes de usar notas reales.

## Estado de esta entrega

La URL y la clave publicable del proyecto elegido ya están configuradas en el repositorio. Aún falta aplicar el esquema en ese proyecto, crear el perfil docente, desplegar la función de altas y configurar/probar el envío de correo. Las pruebas locales no verifican esos servicios remotos. Si el proyecto ya existe, continúa directamente en el paso 2.

## 1. Crear el proyecto

1. Abre https://supabase.com/dashboard y crea una cuenta, por ejemplo con GitHub.
2. Crea una organización y elige el plan **Free**.
3. Pulsa **New project**, usa un nombre académico, una región cercana y una contraseña de base de datos única. Guarda esa contraseña en un gestor; no la envíes al chat ni la subas a GitHub.
4. Cuando termine la creación, en **Project Settings → API / API Keys** copia **Project URL** y la clave **Publishable** (`sb_publishable_…`), o la clave heredada `anon` si el proyecto solo ofrece esa. Son datos públicos de conexión, protegidos por los permisos de la base de datos.
5. Configura estos dos datos en `assets/config.js`. La clave **Secret / service_role**, la contraseña de base de datos y los secretos SMTP nunca van allí.

## 2. Base de datos y docente

1. En **SQL Editor**, ejecuta `supabase/schema.sql`. Crea perfiles, tres materias, matrículas separadas, horarios e intentos. Las evaluaciones empiezan cerradas; las respuestas se guardan en un esquema privado.
2. En **Authentication → Providers / Sign In**, habilita Email y desactiva el registro público de nuevos usuarios. Solo la docente dará de alta estudiantes.
3. En **Authentication → Users**, crea el usuario docente con un correo bajo su control y la contraseña inicial acordada. Marca la cuenta como confirmada solo después de comprobar su titularidad. No escribas la contraseña en archivos SQL.
4. Copia su UUID de Authentication. En SQL Editor ejecuta este ejemplo **reemplazando el UUID**:

   ```sql
   insert into public.profiles(id, display_name, role, must_change_password)
   values ('UUID-DE-LA-DOCENTE', 'Docente', 'teacher', false);
   ```

5. Pon ese correo en `teacherEmail` dentro de `assets/config.js`. El usuario visible para entrar será `DocenteULEAM`; Auth valida el correo y la contraseña, y la base de datos valida el rol. El nombre visible no otorga permisos.
6. Ajusta en Authentication la longitud mínima a **10** para admitir la clave temporal solicitada. La web exige **12** para la clave definitiva. La cédula inicial es predecible: úsala solo para el alta controlada y solicita cambiarla de inmediato.

## 3. Recuperación y envío de correo

1. En **Authentication → URL Configuration**, establece **Site URL** a la dirección HTTPS final y agrega esa misma dirección a **Redirect URLs**. Incluye la ruta del proyecto y barra final cuando uses Pages bajo un repositorio.
2. Escribe la misma dirección en `siteUrl` en `assets/config.js`.
3. Configura **Custom SMTP** en Authentication antes de probar correo institucional. El servicio de correo predeterminado de Supabase tiene restricciones de destinatarios y límites; no garantiza enviar a todos los estudiantes. Introduce credenciales SMTP únicamente en el panel de Supabase.
4. La recuperación usa `e{cedula}@live.uleam.edu.ec`. La respuesta de la web confirma la solicitud; no prueba que el correo haya llegado ni revela si la cuenta existe.
5. Comprueba que llega el correo a tu buzón institucional, abre el enlace, cambia la clave y verifica que puedes entrar con la nueva. Los enlaces expiran y son de un solo uso; ante error solicita otro.

## 4. Alta segura del único estudiante de prueba

La cédula, nombres y clave acordados no están en el repositorio público. Añade únicamente tu cuenta mediante el panel docente después de desplegar esta función:

```sh
supabase login
supabase link --project-ref REFERENCIA-DEL-PROYECTO
supabase secrets set SIGIN_ALLOWED_ORIGINS=https://TU-SITIO-ACADEMICO
supabase functions deploy manage-students
```

`SIGIN_ALLOWED_ORIGINS` contiene orígenes, sin ruta: por ejemplo `https://organizacion.github.io`, aunque el sitio esté bajo `/SIGIN-ULEAM/`. Para desarrollo puedes añadir `http://localhost:4173` separado por coma. Supabase proporciona `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` a la función: no copies la clave al frontend. Si utilizas el editor web de Edge Functions, despliega el mismo código de `supabase/functions/manage-students/index.ts` y desactiva la verificación JWT heredada de la plataforma: la función valida cada sesión con Auth y comprueba el rol docente antes de usar permisos de servicio.

El panel permite alta manual o Excel con revisión. Cada persona tiene un perfil y puede matricularse en varias materias. El servidor genera su correo institucional y usa temporalmente su cédula como contraseña. La matrícula la autoriza la docente; eso no verifica que el buzón exista. La cuenta no puede consultar cursos ni enviar evaluaciones hasta cambiar la clave. Para verificar la titularidad del correo, inicia el cambio desde el enlace de recuperación enviado al buzón.

Si ya creaste manualmente una cuenta con el mismo correo pero sin perfil, completa su perfil/matrícula desde SQL Editor o elimínala si era una prueba vacía; el servicio no reasigna cuentas ajenas por coincidencia de correo.

## 5. Evaluaciones privadas

- La práctica tiene respuestas y retroalimentación pública para estudiar; ese contenido nunca es una prueba secreta.
- `private.assessment_keys` guarda **otro banco**, con `public_payload` sin respuestas y `answer_key` separado. `get_assessment` solo entrega el enunciado a alumnos matriculados dentro del horario. `submit_assessment` valida respuestas, fechas, intentos y califica en el servidor.
- No expongas `private` en **API → Exposed schemas**. No habilites acceso directo ni copies claves de evaluación al HTML o a JavaScript público.
- Un ejemplo de banco público de demostración no sirve para evaluar sin que se conozcan las respuestas. La docente debe revisar y cargar variantes privadas antes de abrir una evaluación real.
- Campos de claves: `id`, `type` (`choice`, `matching`, `order`, `numeric`, `crossword`), `correct`, `explanation` y opcionalmente `weight` / `tolerance`. Opción múltiple usa índice entero; emparejamiento y orden usan una permutación de índices; crucigrama usa una lista de palabras, normalizada en el servidor.
- El horario es un instante UTC; la interfaz presenta la hora de Ecuador. Una entrega fuera de horario se rechaza aunque la actividad ya estuviera abierta en la pantalla.
- Un ajuste docente agrega un registro con motivo sin borrar el historial ni consumir un intento del estudiante. Una entrega conserva un identificador único: reintentar la misma solicitud tras un corte de red devuelve el resultado guardado sin gastar otro intento.

### Cargar un banco desde el panel docente

Cierra primero la evaluación de esa semana. En **Espacio docente → Crear evaluación**, elige semana e introduce título, objetivo y expediente con datos suficientes. Añade los retos: opciones y posición correcta; relaciones; pasos en orden; resultado numérico; o palabras y pistas del crucigrama. Incluye la explicación que se mostrará después de entregar. **Guardar evaluación privada** envía enunciados y claves separados al servidor, exige sesión docente y comprueba el formato. Después habilita la semana y configura sus fechas en **Semanas y horarios**.

La interfaz genera internamente `public_payload` (expediente y enunciados sin respuestas) y `answer_key` (claves y explicaciones). No subas esas claves al repositorio ni las distribuyas a estudiantes.

Ejemplo mínimo de **formato**, para adaptar con un caso y datos propios antes de evaluar:

```json
{
  "public_payload": {
    "context": "Expediente didáctico nuevo para la evaluación.",
    "questions": [
      {
        "id": "caso-nuevo-q1",
        "type": "numeric",
        "prompt": "En el documento se registran 40 trámites y 8 devoluciones. ¿Qué porcentaje fue devuelto?"
      }
    ]
  },
  "answer_key": [
    {
      "id": "caso-nuevo-q1",
      "type": "numeric",
      "correct": 20,
      "tolerance": 0.01,
      "explanation": "Divide devoluciones entre trámites y multiplica por 100."
    }
  ]
}
```

La plantilla ejemplifica el contrato; al estar documentada públicamente no es una evaluación secreta. El banco docente debe aportar preguntas diferentes. Cada pregunta pública necesita `id` y `type` iguales a su clave; las palabras del crucigrama pertenecen solo a `answer_key`, mientras sus pistas y posiciones van en el enunciado público.

`previewEnabled: false` ya está establecido: no hay botón de acceso público al aula. Las pruebas de navegador habilitan la vista previa solo mediante una configuración simulada. Las cuentas y permisos reales siempre se validan en el servidor.

## 6. Comprobación antes de producción

Prueba con dos cuentas temporales matriculadas en materias diferentes: cada una debe ver solo su matrícula y resultados. Un alumno no debe poder escribir su rol, editar notas, acceder a perfiles ajenos, abrir otra evaluación por URL ni leer `private.assessment_keys`. Comprueba cierre, límite de intentos, entrega concurrente, cambio de contraseña, recuperación de correo y sincronización en dos dispositivos. Guarda una copia de seguridad y revisa privacidad y retención antes de cargar listados completos.

La integración está preparada en el código, pero **no está activada ni verificada contra tu proyecto** hasta crear Supabase, cargar el esquema, desplegar la función y probar estos flujos. No es suficiente pegar una URL para afirmar que el sistema institucional funciona.

## Pruebas locales del adaptador y permisos

`npm test` incluye pruebas del adaptador y de la función con respuestas HTTP simuladas; no demuestra envío SMTP ni disponibilidad del proyecto remoto. El esquema se validó además en PostgreSQL 16 real con cuentas ficticias, RLS y entregas concurrentes. Para repetir esa comprobación en un contenedor **efímero**, sin conectar una base institucional:

```sh
docker run --rm -d --name sigin-sql-test -e POSTGRES_PASSWORD=sigin_test_fixture_only -e POSTGRES_DB=sigin_test postgres:16-alpine
docker exec sigin-sql-test pg_isready -U postgres -d sigin_test
# Cuando pg_isready confirme disponibilidad:
docker exec -i sigin-sql-test psql -v ON_ERROR_STOP=1 -U postgres -d sigin_test < supabase/tests/bootstrap.sql
docker exec -i sigin-sql-test psql -v ON_ERROR_STOP=1 -U postgres -d sigin_test < supabase/schema.sql
docker exec -i sigin-sql-test psql -v ON_ERROR_STOP=1 -U postgres -d sigin_test < supabase/tests/integration.sql
python3 supabase/tests/concurrency.py
docker stop sigin-sql-test
```

`bootstrap.sql` crea sustitutos mínimos de Auth para pruebas y **no debe ejecutarse en Supabase**. Los archivos de pruebas no contienen usuarios reales. El test concurrente necesita los fixtures de `integration.sql` y debe ejecutarse una vez por base efímera.

# SIGIN · Aula de aprendizaje práctico

Tres materias, 48 semanas y 240 retos: Alfabetización y Competencias Informacionales (GIG-502), Comercio Exterior (CEX-103-AC) y Gobierno Electrónico y Administración Pública (GIG-406). Los títulos semanales proceden del HTML y los dos sílabos proporcionados. Las actividades nuevas son simulaciones didácticas: expedientes con documentos, cifras, reglas y límites de interpretación; no describen procedimientos reales de las empresas citadas en el sílabo.

## Desarrollo

Node.js >=22.18 y Python 3. Sin instalación npm ni dependencias de CDN durante el uso.

```sh
npm test
npm run build
npm start
```

`npm start` sirve el checkout en el puerto 4173. Las tareas cloud ya están aisladas; usar este checkout, no crear worktrees. Playwright/Chromium permiten ejecutar `python scripts/browser_smoke.py` cuando estén instalados. `SIGIN_TEST_URL` ajusta la dirección local del runner.

## Experiencia

- Escritorio con navegación lateral y contenido que aprovecha el ancho; móvil con menú y tarjetas apiladas.
- Materias separadas; semanas agrupadas por unidad. Práctica libre y evaluación programada por semana.
- Elección razonada, emparejamiento, secuencias, cálculos y crucigramas con cruces reales cuando los términos permiten conectar. Cada tarea tiene explicación. Todos los ejercicios se resuelven con su expediente.
- Panel docente: horarios de Ecuador, límite de intentos, autor de evaluaciones privadas de cinco tipos, estudiantes manuales/Excel con vista previa, exportación y ajuste de notas con motivo.
- La vista previa usa un visitante ficticio y almacenamiento local. No hay estudiantes reales precargados, contraseñas en código, ni recuperación simulada.

## Supabase y estado real

La URL y clave publicable del proyecto están en `assets/config.js`. Una clave publicable no autoriza administrar la base, crear roles ni desplegar funciones. La web puede iniciar sesión, recuperar contraseña y usar el backend **después** de ejecutar el esquema, crear la docente, desplegar la función y configurar correo/URLs. Ver [docs/SUPABASE.md](docs/SUPABASE.md).

La entrada pública de vista previa está desactivada. Para usar el aula es obligatorio iniciar sesión con una cuenta válida; mientras se activa Supabase no se pueden usar las cuentas. La vista previa se habilita únicamente dentro de las pruebas de navegador con configuración simulada. Es contenido público; no debe usarse para almacenar datos sensibles ni notas institucionales. Los ejemplos de práctica tienen respuestas públicas para aprender. Las evaluaciones reales se crean aparte con el autor docente y se guardan en el esquema privado. Nunca cargar los mismos ejercicios públicos como evaluación secreta.

Cuenta estudiantil: correo `e{cedula}@live.uleam.edu.ec`, contraseña temporal igual a la cédula, cambio obligatorio antes del acceso. El alta ocurre en el servidor; no se guarda su clave en el repositorio. La matrícula no confirma la existencia del buzón. Como la clave inicial es predecible, activar mediante correo institucional es preferible antes de incorporar alumnado real.

Cuenta docente: usuario visible `DocenteULEAM`, asociado al correo controlado configurado en `teacherEmail`. Crear la contraseña inicial en Auth, sin incluirla en archivos. La aplicación obtiene el rol del servidor, no de un valor editable local.

RLS protege perfiles, matrículas y resultados. La evaluación valida inscripción, fechas y número de intentos, y calcula notas en una operación transaccional. No hay fallback a calificación local en una evaluación real. Los ajustes docentes conservan historial.

**No se ha verificado todavía el proyecto remoto, envío SMTP ni las cuentas reales.** Las pruebas de integración PostgreSQL y los mocks HTTP comprueban implementación; no prueban esos servicios externos.

## Publicar y cambiar dirección

El workflow `.github/workflows/pages.yml` ejecuta pruebas y despliega `dist/` a GitHub Pages al subir a `main`. Seleccionar GitHub Actions en Settings → Pages. Rutas relativas permiten trasladar el mismo sitio a otro repositorio sin editar todos los enlaces.

GitHub Pages ya utiliza HTTPS. Para una dirección gratuita sin el nombre personal, crear una organización GitHub con nombre académico y trasladar el repositorio allí; GitHub requiere esa creación desde la cuenta del usuario. No hace falta abrir otra cuenta personal ni comprar un dominio. Después actualizar `siteUrl`, las Redirect URLs de Auth y `SIGIN_ALLOWED_ORIGINS`. No crear `CNAME` sin controlar un dominio real.

## Validación

Pruebas Node: 48 semanas/240 tareas, contexto suficiente, conservación de títulos, PDF, corrección de los cinco formatos, cuadrículas, importación y matrículas múltiples. Pruebas de adaptador/Edge: autenticación servidor, recuperación, refresh concurrente, altas autorizadas y rollback. PostgreSQL16 real: RLS, servidor de notas, límites simultáneos, horarios, cambio obligatorio y publicación privada.

Navegador: tres materias, cinco formatos, prácticas y evaluación de vista previa, plantilla Excel y layout en 360/390/768/1024/1440/1920 px. No equivale a validación de correo o permisos en el proyecto publicado.

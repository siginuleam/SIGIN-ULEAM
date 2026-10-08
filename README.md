# SIGIN · Demostración de una materia

Rediseño de Alfabetización y Competencias Informacionales (GIG-502), preparado para revisión docente y GitHub Pages. Conserva exactamente los títulos, unidades, orden y casos empresariales de las 16 semanas del HTML recibido.

## Probar

Requisitos: Node.js 20 o posterior y Python 3. No se necesitan instalaciones npm.

```sh
npm test
npm run build
npm start
```

El servidor local escucha en el puerto 4173. La interfaz tiene dos entradas explícitas de demostración: estudiante y docente. No pide las credenciales del HTML original.

Cada semana incluye expediente ficticio, objetivo, tres decisiones diferentes, práctica con explicación inmediata y evaluación con revisión previa a la entrega. Los expedientes no atribuyen prácticas reales a las empresas del sílabo. Los enlaces externos son referencias complementarias, no evidencia de los datos ficticios.

La práctica está siempre disponible. El cierre manual de una evaluación prevalece sobre sus fechas. Los horarios se interpretan como hora de Ecuador (UTC−05:00). Se conserva el mejor intento; un ajuste docente establece una nueva nota base sin eliminar registros anteriores. La recuperación de respuestas funciona al volver a la actividad en el mismo navegador.

## GitHub Pages

1. Subir estos archivos a `main`.
2. En Settings → Pages → Build and deployment seleccionar **GitHub Actions**.
3. Ejecutar o revisar el workflow “Publicar demostración en GitHub Pages”.

El workflow ejecuta pruebas, construye `dist/` y publica ese directorio. Todos los recursos usan rutas relativas para funcionar bajo `/SIGIN-ULEAM/`. No hay fuentes o bibliotecas cargadas desde CDNs durante el uso del sitio. ExcelJS 4.4.0 está incluido con su licencia MIT.

## Alcance y privacidad

**Demostración local, no sistema institucional de producción.** Los botones de rol no autentican usuarios. Datos, notas y configuraciones viven en localStorage, accesibles y modificables por quien usa el navegador. No hay sincronización entre equipos, correos, cuentas privadas ni autorización real. No introducir listas reales de estudiantes en una demostración pública.

Importación `.xlsx`: hasta 2000 filas y 5 MB, con vista previa y confirmación. Columnas `Cédula`, `Nombres y Apellidos`, `Materia` (gig-502). Las cédulas deben estar como texto; se valida longitud de diez dígitos, no el dígito verificador ni la identidad. El correo sugerido es `e{cedula}@live.uleam.edu.ec`, todavía no verificado. Los duplicados e inscripciones ajenas se rechazan. No se admiten fórmulas.

## Conectar Supabase después de la aprobación docente

Supabase ofrece un plan gratuito con cuotas; consultar sus condiciones vigentes antes de elegirlo. GitHub Pages sigue alojando la interfaz. Para acceso privado real faltan:

- Crear un proyecto Supabase y configurar su URL y clave **publicable**. Nunca exponer una clave service_role ni secretos de correo en GitHub.
- Crear tablas de perfiles, materias, matrículas, actividades, ventanas e intentos. Usar matrículas separadas para soportar varias materias por estudiante.
- Activar RLS: un estudiante solo consulta su matrícula y resultados; la docente gestiona sus materias. Los roles no deben poder modificarse desde el navegador.
- Guardar claves de respuesta fuera del acceso estudiantil y calificar con una función de servidor que valide inscripción, fechas e intentos de forma atómica.
- Crear usuarios desde un servicio autorizado, no desde código público. Preferir invitación institucional y cambio de contraseña; no almacenar claves en texto plano.
- Configurar autenticación, verificación, recuperación, URLs de redirección de Pages y proveedor de correo. Generar una dirección no demuestra que la cuenta exista.
- Sustituir el adaptador local y probar aislamiento entre cuentas, recuperación y acceso desde dos dispositivos antes de usar datos reales.

La integración no está implementada ni verificada en esta entrega; no basta con pegar una clave para convertir la demostración en una aplicación privada.

## Validación

Pruebas de modelo: contenido semanal, importación de múltiples filas, duplicados, ventanas, calificación y ajuste docente. Pruebas manuales automatizadas con Playwright y Chromium del entorno: recorrido estudiantil, práctica, evaluación, persistencia de respuestas, plantilla Excel y panel móvil/escritorio.

Mantener esta implementación como demostración de una sola materia hasta la revisión de la docente.

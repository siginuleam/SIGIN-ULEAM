# Dirección académica gratuita

El repositorio fue transferido a la organización `siginuleam`. GitHub confirma acceso administrativo desde este entorno y GitHub Pages configurado con HTTPS en:

https://siginuleam.github.io/SIGIN-ULEAM/

No hace falta pagar por un dominio ni abrir otra cuenta personal. No se usa un archivo CNAME: la dirección corresponde al subdominio gratuito de GitHub Pages de la organización.

## Publicación

El repositorio es https://github.com/siginuleam/SIGIN-ULEAM. En **Settings → Pages**, Source debe ser **GitHub Actions**. El workflow **Publicar SIGIN en GitHub Pages** publica los cambios de `main` después de ejecutar las pruebas y preparar el sitio.

La configuración `siteUrl` de `assets/config.js` y el remoto Git `origin` ya utilizan el nuevo propietario. El propietario habilitó la integración GitHub de Codex/ChatGPT para la organización y se verificó la escritura publicando el cambio en `main`.

Después de cada publicación, comprobar que `build` y `deploy` terminen correctamente y que `assets/config.js` entregue el `siteUrl` de la organización.

## Supabase

- **Authentication → URL Configuration → Site URL**: `https://siginuleam.github.io/SIGIN-ULEAM/`.
- **Redirect URLs**: incluir esa misma dirección completa, con la ruta y la barra final.
- Secreto de la función `SIGIN_ALLOWED_ORIGINS`: `https://siginuleam.github.io`, sin ruta.

Estos ajustes administrativos ya están configurados en Supabase. Se comprobaron inicios de sesión remotos, permisos de altas y recuperación por correo; el usuario confirmó la llegada del mensaje a su buzón institucional. La cuenta de estudiante ya registró su cambio de contraseña, cuya nueva clave permanece privada.

Los 48 bancos privados están cargados. Las evaluaciones permanecen cerradas para que la docente revise sus enunciados en **Semanas y horarios → Ver evaluación** y programe fechas. El servicio de correo predeterminado permitió la prueba inicial; antes de incorporar más estudiantes se debe configurar SMTP y revisar sus cuotas.

La revisión docente se comprobó en el sitio publicado con datos reales. Los 48 bancos también pasaron comprobaciones del corrector, reintentos, cuotas y horarios en una transacción SQL revertida. La verificación final confirmó cero notas guardadas y cero evaluaciones abiertas; la prueba no utilizó ni cambió la nueva contraseña del estudiante.

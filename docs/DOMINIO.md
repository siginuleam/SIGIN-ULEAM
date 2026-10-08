# Dirección académica gratuita

La organización `siginuleam` ya existe. Cambiar el nombre del repositorio dentro de la cuenta personal no elimina ese nombre de la URL de Pages. Publicarlo desde la organización permite usar `https://siginuleam.github.io/SIGIN-ULEAM/` sin comprar un dominio.

El intento de traslado por API fue rechazado por GitHub con `403 Resource not accessible by integration`. No se ha transferido el repositorio ni activado la dirección nueva.

## Acción del propietario

1. Abrir https://github.com/SSJ-ARIEL/SIGIN-ULEAM/settings.
2. En **General**, bajar a **Danger Zone** y elegir **Transfer ownership / Transfer**.
3. Elegir `siginuleam` como propietario nuevo, conservar el nombre `SIGIN-ULEAM` y confirmar lo que solicita GitHub. Esto traslada el mismo proyecto e historial, sin duplicar archivos ni borrar el desarrollo.
4. En el repositorio trasladado, revisar **Settings → Pages**: Source **GitHub Actions**.
5. Revisar o ejecutar el workflow **Publicar demostración en GitHub Pages** desde `main`.

Antes de afirmar que terminó: verificar que el repositorio está en `siginuleam/SIGIN-ULEAM`, que el workflow `build` y `deploy` está en verde y que la dirección HTTPS responde con la nueva aplicación.

## Ajustes después del traslado

- Actualizar `siteUrl` en `assets/config.js` a la dirección nueva.
- Actualizar **Supabase → Authentication → URL Configuration**: Site URL y Redirect URLs.
- Actualizar `SIGIN_ALLOWED_ORIGINS` de la función de altas al origen `https://siginuleam.github.io` (sin ruta).
- Comprobar que la conexión GitHub del entorno conserva acceso al repositorio de la organización; si GitHub lo deniega, habilitar la integración para ese repositorio desde la organización.

No se crea un archivo CNAME: se usa el subdominio gratuito de GitHub con HTTPS. La dirección actual se mantiene en la configuración hasta comprobar el traslado, para no romper recuperación de contraseñas con una dirección inexistente.

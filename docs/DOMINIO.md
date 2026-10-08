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

Estos ajustes administrativos siguen pendientes hasta disponer de acceso a Supabase. Tras configurarlos, comprobar inicio de sesión, recuperación por correo y altas manuales/Excel desde la dirección académica. El traslado del repositorio no configura automáticamente esos servicios.

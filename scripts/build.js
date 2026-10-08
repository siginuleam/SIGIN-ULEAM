import { cp, mkdir, rm } from "node:fs/promises";
await rm("dist", { recursive: true, force: true });
await mkdir("dist");
for (const file of ["index.html", "assets", "documents", "docs"])
  await cp(file, `dist/${file}`, { recursive: true });
await cp("supabase/schema.sql", "dist/documents/ACTIVAR_SUPABASE.sql");
console.log("Sitio estático de tres materias preparado en dist/");

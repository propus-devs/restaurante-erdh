// Comprueba que los datos legales del titular están completos antes de compilar.
// Se engancha como "prebuild": corre con `npm run build` (y por tanto en el
// despliegue). `astro dev` no lo ejecuta.
//
// Falla (código 1) si algún campo de src/data/legal.json está vacío o vale
// "PENDIENTE". Así, un merge hecho antes de rellenar los datos rompe el
// despliegue en vez de publicar huecos.
//
// Desactivarlo en local:  SKIP_LEGAL_CHECK=1 npm run build
//   (PowerShell:  $env:SKIP_LEGAL_CHECK = "1"; npm run build)
// `npx astro build` tampoco pasa por aquí, porque salta el prebuild.
import { readFileSync } from "node:fs";

if (process.env.SKIP_LEGAL_CHECK === "1") {
  console.warn("[check-legal] Comprobación omitida (SKIP_LEGAL_CHECK=1). No despliegues así.");
  process.exit(0);
}

const datos = JSON.parse(readFileSync(new URL("../src/data/legal.json", import.meta.url), "utf8"));

const faltan = Object.entries(datos)
  .filter(([clave]) => !clave.startsWith("_"))
  .filter(([, valor]) => typeof valor !== "string" || valor.trim() === "" || valor.trim().toUpperCase() === "PENDIENTE")
  .map(([clave]) => clave);

if (faltan.length > 0) {
  console.error("\n[check-legal] Faltan datos del titular en src/data/legal.json:");
  for (const clave of faltan) console.error(`  - ${clave}`);
  console.error("\nRellénalos (si un dato no aplica, escribe \"No aplica\") antes de compilar.");
  console.error("Solo en local puedes saltarte esta comprobación con SKIP_LEGAL_CHECK=1.\n");
  process.exit(1);
}

console.log("[check-legal] Datos legales completos.");

// Datos del titular para las páginas legales: todo sale de src/data/legal.json.
// Un campo con el valor "PENDIENTE" (o vacío) se enseña como [PENDIENTE: campo]
// para que no pase inadvertido; scripts/check-legal.mjs impide compilar así.
import datos from "../data/legal.json";

const valores = datos as Record<string, unknown>;

export const legal = datos;

/** Valor del campo, o el marcador visible si falta. */
export function v(clave: string): string {
  const x = String(valores[clave] ?? "").trim();
  return !x || x.toUpperCase() === "PENDIENTE" ? `[PENDIENTE: ${clave}]` : x;
}

/** "No aplica" permite ocultar la fila (p. ej. registro mercantil en un autónomo). */
export function aplica(clave: string): boolean {
  return !/^no aplica$/i.test(String(valores[clave] ?? "").trim());
}

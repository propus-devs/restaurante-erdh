// ============================================================
//  ESPECIAL HALLOWEEN 2026 · "El Bocado del Diablo"
// ------------------------------------------------------------
//  Todo lo de Halloween (página /halloween, popup de la home y
//  tarjeta de la carta) cuelga de este archivo y desaparece solo
//  a las 00:00 del lunes 2 de noviembre (hora de España).
//
//  Como la web es estática, la fecha se comprueba dos veces: al
//  compilar (no se pinta nada si ya pasó) y en el navegador (por
//  si la página compilada sigue publicada pasada la fecha).
//
//  LIMPIEZA (a partir del 2 nov): borrar
//    src/data/halloween.ts
//    src/pages/halloween.astro
//    src/components/Halloween*.astro   (Popup, CartaCard, Embers)
//    src/styles/halloween.css
//    public/imgs/halloween/
//  y quitar su uso en src/pages/index.astro (popup), en
//  src/pages/carta.astro (tarjeta) y el filtro del sitemap en
//  astro.config.mjs.
// ============================================================

// +01:00 = hora de invierno en España (el cambio de hora fue el 25 oct).
export const HALLOWEEN_HASTA = '2026-11-02T00:00:00+01:00';

export const halloweenCaducada = (ahora: number = Date.now()): boolean =>
  ahora >= Date.parse(HALLOWEEN_HASTA);

export const halloweenPizza = {
  name: 'El Bocado del Diablo',
  price: '14,00 €',
  hastaLabel: 'domingo 1 de noviembre',
  description:
    'Llega Halloween y nuestra pizza se viste de negro. Base de pan negro al carbón con mozzarella fundida, bacon y mini burgers, y encima un remolino de salsa barbacoa y queso cheddar que parece una telaraña. Un bocado del que no vas a querer escapar.',
  ingredients: [
    'Base de pan negro al carbón',
    'Salsa de tomate',
    'Bacon',
    'Mini burgers',
    'Mozzarella',
    'Topping de salsa barbacoa',
    'Topping de queso cheddar',
  ],
  imgDir: '/imgs/halloween',
} as const;

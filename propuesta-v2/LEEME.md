# Propuesta v2 (conceptos 3 y 4)

Presentación y prototipos entregados por el usuario el 29 de septiembre de 2026 en `mundilacteos-propuesta.zip` (preparados por 3DIGIT-ALL FACTORY S.A.S.). Se integran como segunda propuesta, junto a la v1 (conceptos 1 y 2), sin reemplazar nada.

- `original/mundilacteos-propuesta.zip`: el archivo recibido, sin cambios.
- `index.html`: presentación v2.
- `concepto-3/`: «Planta Abierta» (en el ZIP, carpeta `c1`, «Concepto 1»).
- `concepto-4/`: «Rinde» (en el ZIP, carpeta `c2`, «Concepto 2»).
- `assets/` y `shots/`: datos, imágenes y capturas del ZIP, sin cambios.

## Cambios hechos al integrar

Solo numeración y navegación; el diseño y el contenido quedan como llegaron:

- «Concepto 1» pasa a «Concepto 3» y «Concepto 2» a «Concepto 4» en textos, títulos y comentarios (presentación: 19 y 21 menciones; prototipos: 1 por archivo). Las etiquetas C1 y C2 de la sección de tendencias pasan a C3 y C4, y «el catálogo del 1 con la calculadora del 2» a «del 3 … del 4».
- Enlaces `c1/…` y `c2/…` pasan a `concepto-3/…` y `concepto-4/…`.
- Título «Rediseño Mundilácteos v2», rótulo «Propuesta de rediseño web, v2» y un enlace a la propuesta v1 en la línea de autoría de la portada.

Las clases CSS (`.c1`, `.c2`), las variables de JavaScript y las claves de almacenamiento local no cambian.

Ajuste de carga (29/09/2026), porque las capturas aparecían tarde o en blanco:

- Script de precarga al final de `index.html`: pide las imágenes diferidas de cada sección cuando está a unos 1.200 px y el resto 2 s después de cargar la página.
- Fondo de los marcos de captura (portátil, celular, comparador y tarjetas) en Celeste leche `#E9F8FF` en lugar de blanco mientras la imagen llega.
- 5 capturas largas de `shots/` recomprimidas en WebP calidad 62: de 1.179 KB a 848 KB en total. Los originales siguen en el ZIP.

## Publicación

`node conceptos/herramientas/exportar-sitio.js` copia esta carpeta a `docs/v2/` (sin `original/`), junto a la v1 en `docs/`.

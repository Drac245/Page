# Experiencia visual: movimiento, profundidad y tipografía (obligatorio para ambos conceptos)

Pedido del cliente (25/09/2026): "las páginas son muy planas; estética, transiciones, jugar con el diseño y pensarlo bien; tipografías". Este documento amplía el criterio 7 del checklist de `TENDENCIAS.md` por decisión del cliente: se permite más movimiento y profundidad, con las salvaguardas de rendimiento y accesibilidad que siguen vigentes.

## 1. Principios

1. Cada página tiene **un momento orquestado** (la carga del hero o la entrada a la ficha) y el resto del movimiento responde a acciones del usuario. Nada se mueve porque sí.
2. El movimiento cuenta algo del producto: el empaque que se llena, la paca que se arma, el pedido que suma, la ruta que sale de Turbaco. No se usan efectos genéricos de plantilla.
3. **Profundidad por capas**, no por efectos: packshots recortados que se superponen a bandas de color, sombras de contacto realistas bajo cada empaque, elementos que rompen la retícula, secciones con bordes curvos o diagonales tomados de la geometría del logo (el globo con franjas).
4. **La tipografía es parte del diseño**: escala dramática en titulares (clamp de 48 a 120 px en escritorio), interlineado ajustado en display, ejes variables usados con intención, cifras como elementos gráficos, contraste marcado de peso y tamaño entre niveles.
5. Todo el contenido es visible en reposo y sin JavaScript. El movimiento se suma encima.

## 2. Repertorio permitido

| Técnica | Cómo | Duración | Salvaguarda |
|---|---|---|---|
| Transición entre vistas | View Transitions API (`document.startViewTransition`) en el cambio de ruta por hash; transición de elemento compartido del packshot entre el catálogo y la ficha (`view-transition-name`) | 350–500 ms | Solo si el navegador la soporta; si no, cambio directo |
| Carga orquestada del hero | Secuencia escalonada de titular, producto y CTA (máx. 6 pasos) | total ≤ 900 ms | Estado final visible si no hay JS o con movimiento reducido |
| Aparición al hacer scroll | `animation-timeline: view()` dentro de `@supports`, desplazamiento de 12 a 24 px y opacidad desde 0,4 (nunca desde 0) | ligada al scroll | Sin soporte, el contenido está en su sitio; nunca oculta contenido |
| Profundidad sutil al scroll | Packshots que se desplazan 10–30 px a otra velocidad que su banda (`animation-timeline: scroll()`) | ligada al scroll | Prohibido el scroll-jacking y el parallax de fondos completos |
| Micro-interacciones | Hover/foco en tarjetas: el empaque se eleva y rota 2–4°, la sombra crece; botones con presión (scale .97); contadores de cantidad con cifras que giran; chip de filtro que se desliza | 120–300 ms | También con teclado (`:focus-visible`), no solo hover |
| Retroalimentación con sentido | Al agregar a la cotización, una miniatura del empaque vuela a la insignia de "Mi cotización" (técnica FLIP) y el contador salta | 450–600 ms | `aria-live` anuncia el cambio; con movimiento reducido, solo cambia el número |
| Ejes tipográficos | Animación de `font-weight` o `font-stretch` en fuentes variables al pasar el cursor o al seleccionar | 200–300 ms | Sin cambio de ancho del contenedor (evitar saltos de maquetación) |
| Formas de marca | Bordes de sección curvos o franjas diagonales en SVG derivadas del globo del logo; brillos radiales suaves de la paleta detrás de productos | estático | Solo colores de `MARCA.md` |

## 3. Límites técnicos

- Solo se animan `transform`, `opacity`, `clip-path` y ejes de fuentes variables. Nada de animar `width`, `height`, `top`, `left` ni sombras en bucle.
- Curvas: `cubic-bezier(.2,.7,.2,1)` para entradas y `cubic-bezier(.4,0,1,1)` para salidas; lineal solo para progreso.
- `@media (prefers-reduced-motion: reduce)`: sin transiciones de página, sin apariciones ni desplazamientos; solo cambios de estado instantáneos.
- Sin librerías de animación salvo que sean imprescindibles. CSS nativo y JavaScript propio primero. Presupuesto de JS del checklist vigente.
- INP < 200 ms y CLS ≤ 0,1 se mantienen: ninguna animación bloquea la interacción ni mueve contenido ya pintado.
- Nada de glassmorphism, cursores personalizados, degradados morados ni grano decorativo.

## 4. Tipografía

- Máximo dos familias de Google Fonts por concepto (o una variable con ejes ricos), con fallback real.
- Escala con saltos grandes: display 48–120 px, H2 32–56 px, cuerpo 17–18 px en escritorio y 16–17 px en móvil, etiquetas 13–14 px.
- Interlineado 0,95–1,05 en display; 1,5–1,6 en cuerpo; medida de línea 60–72 caracteres.
- `text-wrap: balance` en titulares, `font-variant-numeric: tabular-nums` en tablas y contadores, `font-feature-settings` para cifras y fracciones si la fuente las ofrece.
- Composición tipográfica como gesto gráfico en uno o dos lugares por página (una cifra gigante, un titular que cruza una banda y una foto), no en todas partes.

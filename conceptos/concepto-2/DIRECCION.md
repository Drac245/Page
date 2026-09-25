# Concepto 2: Peso neto

Dirección final del Concepto 2 para el nuevo sitio de Inversiones Mundilácteos S.A.S. Sirve de guía para diseño, desarrollo y producción de contenido. Versión 1, 25 de septiembre de 2026.

Cómo se construyó: la base es la propuesta **Peso neto**, que obtuvo el mayor puntaje sumado de los dos jueces (98,5 de 120). A ella se le injertaron la herramienta de cotización de **Nota de pedido** y la calidez y el orgullo de lugar de **Kilómetro Cero**, sin sumar un segundo gesto audaz. Es un concepto independiente: no se consultaron sitios de otras marcas del sector. De ui-ux-pro-max se adoptaron solo pautas de UX verificadas (sugerencias al escribir, sin resultados con alternativa, chips que se ajustan en varias filas, 8 px entre objetivos táctiles); sus sugerencias de tipografía y color no encajaban y se descartaron. Las cifras marcadas como *dato a confirmar* son ejemplos coherentes entre sí y deben salir de las fichas del cliente antes de publicar.

---

## 1. Nombre del concepto

**Peso neto.** Es la leyenda legal que lleva cada empaque de Mundilácteos, de la bolsa de 27 g al bulto de 25 kg. Resume la promesa del sitio: lo que dice la etiqueta es lo que hay adentro.

## 2. Enfoque

Mundilácteos se presenta con su producto medido: gramos exactos, unidades por paca, litros que rinde cada bolsa y meses de vida útil. El sitio se construye con los materiales de sus empaques (el blanco de la bolsa, el kraft del bulto, el café y el rojo de la impresión) y tiene un solo gesto audaz: las 12 presentaciones de pie, a escala real. Alrededor de ese gesto funciona una herramienta de cotización que convierte pacas y bultos en kilos al instante, con la luz y la gente de la Costa en la fotografía.

## 3. Idea central

**Lo que dice la etiqueta es lo que hay adentro.** Cada afirmación del sitio es una cifra o una prueba que se puede comprobar (27 g a 25 kg, pacas de 12 a 300 unidades, 12 meses de vida útil, lote impreso en cada bolsa, registro Invima consultable), nunca un adjetivo. El oficio de empacar bien, con precisión, sellado y trazabilidad por lote, es la personalidad de la marca. Para el comprador B2B eso significa confianza; para el consumidor, honestidad.

La idea tiene una segunda mitad, que viene del injerto de Nota de pedido: **lo que usted pide es lo que le llega.** El comprador arma su cotización en pacas y bultos, ve los kilos en cada cambio y una persona de la planta le confirma precio y fecha.

Tres principios que ordenan todas las decisiones:

1. **Cifras en lugar de adjetivos.** Si no se puede medir o verificar, no se publica.
2. **Cada razón con su prueba.** Certificado en PDF, registro con enlace al Invima, foto real de la planta.
3. **Un solo gesto audaz.** La fila a escala es lo memorable. Todo lo demás es una planilla ordenada, y la calidez la ponen las personas reales en las fotos.

---

## 4. Dirección visual

### 4.1 Tablero de referencias

El tablero se arma con objetos del mundo del propio cliente, fotografiados en la planta. No lleva referencias de otras marcas ni imágenes de banco.

| Referencia material | Qué se toma de ella | Dónde aparece |
|---|---|---|
| Saco kraft triple con rotulación condensada en rojo ("12,5 Kilos Neto", "Industria colombiana") | El kraft, el rojo de tinta y la letra condensada en tipo oración | Paleta, titulares, zonas B2B, pie |
| Borde dentado del termosellado de la bolsa | La forma del sello M | Logo, favicon |
| Leyenda de peso neto y codificación de lote y vencimiento | Cifras tabulares, precisión, trazabilidad | Tablas, ficha técnica, Calidad |
| Báscula de verificación y cuchara rasa nivelada | La idea de medida exacta | Fotografía de Materia y Oficio |
| Pacas en estiba | El ritmo de filas iguales | Planilla del catálogo |
| Empaques de The Cántaro y La Becerrita | El color lo ponen los empaques; la interfaz se mantiene neutra | Packshots |
| Luz dura de mediodía sobre concreto en Cartagena | Calidez del lugar sin postal | Fotografía de Clientes |

Queda fuera del tablero: potrero con vaca, salpicaduras, gotas, vasos rebosantes, azul y blanco lácteo, globo terráqueo, murallas, balcones y mar turquesa.

### 4.2 Paleta

| Nombre | Hex | Rol | Presencia aprox. |
|---|---|---|---|
| Blanco bolsa | `#FFFFFF` | Superficie principal y fondo de todos los packshots. Las fotos del cliente ya vienen recortadas sobre blanco. | 75 % |
| Film | `#ECEEEB` | Gris frío del laminado. Paneles secundarios: filtros, mini-ficha, filas alternas de tablas, campos. Si el panel contiene controles, estos llevan borde en Tinta suave. | 10 % |
| Kraft | `#D3B48A` | Solo zonas de venta por volumen: bloque Para su negocio, cabecera de Mi cotización, filas de bultos, bloque de marca propia. Es la regla de color que distingue el B2B. Sobre Kraft el texto va siempre en Tinta café. | 7 % |
| Tinta café | `#3A2618` | Texto, iconos, bordes fuertes, chips activos y fondo del pie. Un café de tinta de impresión, saturado a propósito para que se lea como café y no como negro teñido. | 7 % |
| Rojo saco | `#A8171F` | Botón primario, selección en la fila a escala, mensajes de error (siempre con icono y texto) y titulares de 24 px o más sobre Kraft. Nunca en áreas grandes ni sobre Tinta café. | 1 % |
| Tinta suave | `#66574B` | Texto secundario sobre Blanco y Film. Borde de campos y controles (cumple 3:1). Prohibido sobre Kraft. | texto |

Auxiliares, que no amplían la paleta: **Rojo saco oscuro** `#8A1219` (hover y presionado del botón primario) y **Línea** `#D6D2CB` (divisores decorativos de tablas, nunca como único borde de un control).

Ajuste respecto de la propuesta original: la Tinta café pasa de `#2E2118` a `#3A2618`. El primer valor quedaba cerca del negro teñido que la guía de diseño marca como rasgo genérico (observación del juez 1). El nuevo tono es más saturado (S 41 % frente a 31 %), se reconoce como café en el pie y conserva AAA en todos sus pares.

**Contrastes** (fórmula WCAG 2.x, calculados con python3 sobre los valores finales):

| Primer plano sobre fondo | Contraste | Uso permitido |
|---|---|---|
| Tinta café sobre Blanco | 14,28:1 | Todo texto (AAA) |
| Tinta café sobre Film | 12,24:1 | Todo texto (AAA) |
| Tinta café sobre Kraft | 7,25:1 | Todo texto (AAA) |
| Tinta suave sobre Blanco | 6,93:1 | Texto secundario (AA); bordes de control |
| Tinta suave sobre Film | 5,94:1 | Texto secundario (AA); bordes de control |
| Blanco sobre Rojo saco | 7,48:1 | Texto del botón primario (AAA) |
| Blanco sobre Rojo saco oscuro | 9,63:1 | Hover y presionado (AAA) |
| Rojo saco sobre Blanco | 7,48:1 | Errores, selección, cifra elegida (AAA) |
| Rojo saco sobre Film | 6,41:1 | Errores dentro de paneles (AA) |
| Rojo saco sobre Kraft | 3,80:1 | Solo texto de 24 px o más (o 18,66 px en negrita) y elementos no textuales |
| Kraft sobre Tinta café | 7,25:1 | Enlaces y foco en el pie (AAA) |
| Film o Blanco sobre Tinta café | 12,24:1 y 14,28:1 | Texto del pie, chips activos (AAA) |

Pares prohibidos: Tinta suave sobre Kraft (3,52:1), Rojo saco sobre Tinta café (1,91:1), Tinta suave sobre Tinta café (2,06:1). Kraft contra Blanco (1,97:1), Film contra Blanco (1,17:1) y Línea contra Blanco (1,51:1) solo distinguen zonas de forma decorativa: nunca llevan información por sí solos.

Foco visible: contorno de 3 px en Tinta café con 2 px de separación (14,28:1 contra Blanco, 7,25:1 contra Kraft). En el pie el contorno es Kraft (7,25:1). En el botón rojo el contorno queda por fuera, sobre el fondo de la página.

### 4.3 Tipografía

**Una sola familia: Archivo**, de Omnibus-Type (fundición latinoamericana), variable, licencia OFL.

- Ficha: https://fonts.google.com/specimen/Archivo
- CSS de Google Fonts: `https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap`
- Verificado el 25/09/2026 sobre el archivo servido: subconjunto latin en woff2 de 90.104 bytes (88 KB); ejes `wght` 100 a 900 y `wdth` 62 a 125; funciones `tnum`, `pnum`, `frac`, `numr` y `dnom`; glifos á, é, í, ó, ú, ñ, ü, ¿, ¡, × y − presentes.
- Se descarga ese woff2 y se sirve desde el mismo dominio en Hostinger (`/fuentes/archivo-latin-var.woff2`) con `preload`. Así se evita una conexión a terceros y se controla el caché. No se carga la cursiva: el énfasis se hace con peso.

La misma familia trabaja en dos voces por su ancho: **condensada y pesada** para titulares (eco de la rotulación de los sacos, pero en tipo oración) y **normal** para lectura. Los datos van en semicondensada con cifras tabulares, sin monoespaciada.

| Rol | Escritorio (≥ 1280) | Móvil (< 600) | wdth | wght | Notas |
|---|---|---|---|---|---|
| Titular del hero | 72/72 px (4.5rem) | 48/48 px (3rem) | 68 (móvil 62) | 800 | Entre 600 y 1279 px: 60/60 px, wdth 66 |
| H1 interior | 48/52 px (3rem) | 36/40 px (2.25rem) | 72 | 800 | |
| H2 | 36/40 px (2.25rem) | 24/30 px (1.5rem) | 75 | 800 | |
| H3 | 24/30 px (1.5rem) | 21/28 px (1.3125rem) | 100 | 700 | |
| Entradilla | 21/32 px (1.3125rem) | 21/32 px | 100 | 400 | |
| Cuerpo | 18/28 px (1.125rem) | 18/28 px | 100 | 400; énfasis 600 | Medida de 60 a 72 caracteres |
| Interfaz (botones, menú, etiquetas) | 16/24 px (1rem) | 16/24 px | 100 | botones 600; menú y etiquetas 500 | |
| Datos (tablas, pesos, pacas, kilos, lotes) | 16/24 px; totales 21/32 px | igual | 85 | 600 | `font-variant-numeric: tabular-nums`, alineados a la derecha |
| Meta (migas, notas, pie) | 14/20 px (0.875rem) | 14/20 px | 100 | 400 o 500 | Mínimo absoluto del sitio |
| Cifras de la fila a escala | 24 px | 18 px | 62 a 125 (móvil 75 a 125) | 300 a 900 (móvil 500 a 900) | Ver sección 12 |

Escala: la clásica de *The Elements of Typographic Style* (Bringhurst): 14, 16, 18, 21, 24, 36, 48, 60 y 72 px. El cuerpo sube a 18 px también en móvil porque el comprador lee referencias y cantidades en el celular, muchas veces al sol en la tienda o la bodega. El espaciado vertical va en múltiplos de 4 y 8 px.

Reglas:

- Tipo oración siempre. Sin mayúsculas sostenidas en etiquetas, sin rótulos pequeños sobre los títulos y sin resaltar una palabra suelta del titular con otro color, cursiva o peso.
- Tracking 0 en todos los tamaños (sin tracking negativo en la condensada).
- Todo alineado a la izquierda. Nunca justificado; nada centrado salvo los iconos de la barra inferior.
- Formato colombiano: coma decimal, punto de miles y espacio fino no separable antes de la unidad (12,5 kg; 1.250 kg; 27 g). El nombre de la presentación se escribe como en el empaque (1000 g).
- Ancho y peso se fijan con `font-stretch` y `font-weight`, no con `font-variation-settings`, para que la cascada funcione.
- Respaldo métrico: `@font-face` "Archivo Fallback" sobre Arial con `size-adjust` y `ascent-override` calculados contra Archivo para reducir el salto de diseño (CLS) mientras carga la fuente.
- Se revisaron las sugerencias de ui-ux-pro-max (Playfair Display SC con Karla, Plus Jakarta Sans, Barlow Condensed) y se descartaron: responden a registros de restaurante, SaaS o deporte. Tampoco se adoptó la segunda familia de Nota de pedido (Atkinson Hyperlegible): el cuerpo a 18 px con Archivo resuelve la legibilidad sin sumar peso de carga.

### 4.4 Fotografía

Sin banco de imágenes, sin vacas, sin salpicaduras y sin sonrisas posadas. Color neutro, blancos limpios, sin dominante azul, sin gradación teal y naranja, sin viñeta. Cuatro familias:

1. **Ficha.** Packshots frontales estandarizados: misma cámara, misma altura, luz difusa de 5000 K, fondo blanco y solo sombra de contacto. Cada toma incluye una regla física en el borde del cuadro para calibrar la escala real de la fila (se recorta en posproducción).
2. **Materia.** Macros del polvo con luz rasante: la cuchara rasa, el polvo que se disuelve, el grano con lupa, la costura del saco, el dentado del termosellado.
3. **Oficio.** La planta en Europark: manos, empacadora, codificación del lote, báscula, pacas en estiba, cargue del camión y el equipo real. Encuadre documental a la altura de los ojos.
4. **Clientes** (injerto de Kilómetro Cero). Personas reales en su lugar de trabajo o en su cocina, con luz natural del sitio (la luz dura de mediodía es bienvenida). Da la calidez que la planilla no tiene.

**Lista de tomas a producir** (una jornada en planta y una jornada de visitas a clientes):

| ID | Familia | Toma | Especificación | Uso en el sitio |
|---|---|---|---|---|
| F01 | Ficha | Frente de cada referencia (producto por presentación) | Fondo blanco, 4:5, regla física en cuadro, sombra de contacto | Productos, ficha, fila a escala |
| F02 | Ficha | Reverso de cada referencia con lote y vencimiento legibles | 4:5, luz difusa | Galería de la ficha, Calidad |
| F03 | Ficha | Paca envuelta de cada presentación en bolsa, a tres cuartos | 1:1, fondo blanco | Ficha, planilla |
| F04 | Ficha | Bultos de 5, 12,5 y 25 kg, frente y tres cuartos | 4:5, fondo blanco | Fila, ficha, franja de bultos |
| F05 | Ficha | Las 12 presentaciones de pie sobre una misma línea base, en una sola toma | 21:9, regla visible | Nosotros, imagen para compartir (OG), prensa |
| F06 | Ficha | Bolsas de marca propia | Solo con autorización escrita de la cadena | Marca propia |
| M01 | Materia | Cuchara rasa nivelada con espátula | Macro 1:1, luz rasante | Home, Cuánto rinde |
| M02 | Materia | Polvo disolviéndose en un vaso de 200 ml, secuencia de 3 | 1:1 | Ficha (preparación), Recursos |
| M03 | Materia | Grano bajo lupa de 10x | 1:1 | Calidad |
| M04 | Materia | Costura y papel triple del saco kraft | Macro 3:2 | Ficha de bultos |
| M05 | Materia | Dentado del termosellado de la bolsa | Macro 3:2 | Nosotros (origen del sello M) |
| O01 | Oficio | Manos con guantes y cofia en la empacadora | 3:2 | Calidad, Nosotros |
| O02 | Oficio | Codificación de lote y vencimiento en la bolsa | 3:2 | Home (Así empacamos), Calidad |
| O03 | Oficio | Pesaje de verificación con la pantalla de la báscula legible | 3:2 | Por qué elegirnos, Calidad |
| O04 | Oficio | Pacas en estiba en la bodega | 3:2 | Para su negocio, Distribución |
| O05 | Oficio | Cargue del camión en el muelle y camión saliendo por la vía Turbaco | 3:2 | Distribución |
| O06 | Oficio | Retrato grupal del equipo en alta resolución y retratos de los asesores comerciales | 3:2 y 4:5 | Nosotros, Contacto, confirmación de la solicitud |
| O07 | Oficio | Fachada de la planta en Europark, luz de mañana | 3:2 | Contacto, Nosotros |
| C01 | Clientes | Panadero de Cartagena abriendo un bulto en su obrador, luz de mediodía que entra por la puerta | 4:5 | Home (Hecha para el calor), Para su negocio |
| C02 | Clientes | Tendera recibiendo una paca en su tienda de barrio | 3:2 | ¿Qué necesita?, Distribución |
| C03 | Clientes | Góndola de un supermercado de la Costa con The Cántaro y La Becerrita | 3:2, con permiso de la cadena | Dónde comprar |
| C04 | Clientes | Cocina de casa: alguien prepara un vaso o arequipe con The Cántaro, luz de ventana | 4:5 | Para su casa, Recursos (En la cocina) |
| C05 | Clientes | Operario de una industria de alimentos vaciando un bulto en la mezcladora | 3:2, si un cliente lo permite | Para su negocio, marca propia |

Reglas de producción y uso:

- Autorización firmada de cada persona fotografiada (la imagen es dato personal según la Ley 1581 de 2012).
- Formatos AVIF con respaldo WebP; `srcset` de 480, 960, 1440 y 1920 px; `width` y `height` declarados para reservar el espacio; carga diferida debajo del primer pantallazo. El hero no depende de una foto: su contenido principal es texto y SVG, lo que acelera la primera carga.
- Mientras llega la sesión, el prototipo usa los recursos de `conceptos/compartido/img-cliente/`: `cantaro-entera-frente.webp`, `cantaro-azucarada-frente.webp`, `becerrita-entera-frente.webp`, `cantaro-bulto-25kg.webp`, `becerrita-bulto-25kg.webp`, `bulto-kraft-rojo.webp` y `bultos-trio.webp`. `equipo-planta.webp` solo en Nosotros (es de baja resolución y tiene decoración de temporada). Las bolsas de marca Olímpica solo con permiso. No se usan `foto-actual-vacas.webp` ni el logo actual, salvo como "antes" en la presentación al cliente.
- La estatua de vaca de la planta es real y puede aparecer en Nosotros, nunca como hero ni como símbolo de la marca.

### 4.5 Ilustración e iconografía

- **Pictogramas propios** de trazo 1,75 px con remates y uniones rectos, en Tinta café, sobre retícula de 24 px, dibujados a partir de los formatos reales: bolsa con sello dentado, paca, bulto cosido, estiba, camión, cuchara rasa, vaso de 200 ml, lote y vencimiento, certificado y registro. Solo aparecen donde informan: filtros de formato, filas de empaque de la ficha, calculadora y Distribución.
- **Iconos de interfaz** (buscar, menú, cerrar, más, menos, descargar, copiar enlace, imprimir, confirmación, alerta): se parte de Lucide y se reexportan con el mismo trazo de 1,75 px y remates rectos para que convivan con los pictogramas. Siempre acompañados de texto visible o de `aria-label` si van solos. El glifo de WhatsApp se usa tal como lo exige su marca, solo junto a la palabra WhatsApp.
- **Siluetas de la fila a escala**: monolínea con el mismo trazo, como respaldo mientras llegan los packshots calibrados.
- **Mapa lineal de Colombia** en Distribución: contorno de 1,75 px, Cartagena marcada con un punto relleno y las ciudades de despacho como puntos con nombre. Sin flechas de ruta inventadas y sin pines.
- Nada de iconos dentro de círculos de color, rejillas de beneficios con iconos, emoji, bandera tricolor ni gotas.

### 4.6 Texturas

La interfaz no tiene texturas: el Kraft es un color plano, sin ruido de papel ni grano simulado. Las texturas viven solo en la fotografía (la fibra del saco, el brillo del laminado, el grano del polvo en macro). Se descartó el papel con grano, la perforación de talonario y el sello de goma de Nota de pedido: son recursos esqueuomorfos conocidos, cuestan rendimiento y restan legibilidad.

### 4.7 Movimiento

**Un solo momento orquestado**: la carga de la fila a escala en la Home, con una duración máxima de 900 ms.

1. La línea base se traza de izquierda a derecha (300 ms).
2. Desde los 100 ms, las presentaciones suben 8 px hasta la línea base en orden de peso, como una línea de llenado: 200 ms por pieza, `ease-out`, 40 ms de escalón.
3. Al mismo tiempo, cada cifra pasa de `wght` 100 a su grosor final en 240 ms. Solo se anima el peso: el ancho no se anima y cada cifra tiene una caja de ancho reservado, así el texto no empuja nada.
4. Se reproduce una vez por sesión (se recuerda en `sessionStorage`); al volver atrás aparece en su estado final.

El resto del movimiento solo responde a acciones de la persona:

| Acción | Respuesta | Duración |
|---|---|---|
| Elegir una presentación en la fila | El subrayado rojo se desplaza; la mini-ficha cambia con fundido cruzado | 160 ms |
| Agregar a la cotización | El conteo de Cotizar da un salto de escala (1 a 1,12 a 1); la línea nueva en Mi cotización se resalta en Kraft y se desvanece | 200 ms y 600 ms |
| Abrir hoja inferior (Filtrar, Mi cotización) | Sube desde abajo | 220 ms |
| Abrir panel lateral de cotización | Entra desde la derecha | 240 ms |
| Acordeones de la ficha | Abren y cierran | 200 ms |
| Filtrar o buscar en Productos | Fundido cruzado de resultados | 150 ms |
| Elegir ciudad en Distribución | Resalta el punto y la fila de la tabla | 160 ms |

Sin revelados al hacer scroll, sin parallax, sin carruseles automáticos, sin tarjetas que se elevan al pasar el cursor. Con `prefers-reduced-motion: reduce` todo aparece en su estado final y las hojas se abren sin deslizarse.

---

## 5. Marca y logo

### Concepto: el sello M

El símbolo es la silueta de una bolsa cuyo borde superior de termosellado (el dentado de los sobres) forma una M: dos lados verticales y dos dientes. Una línea horizontal interior marca el nivel de llenado, el peso neto. Es monolínea y de una sola tinta, así que se imprime en flexografía sobre kraft, en film laminado, en etiqueta de paca y en relieve, y sigue siendo legible a 16 px.

Se retira el globo verde y azul con degradado: es el cliché de mundo igual a esfera, pierde detalle al reducirse, no imprime a una tinta y lleva el azul que el brief pide evitar.

### Construcción

```
Retícula de 24 x 24 unidades (u). Trazo de 2 u, remates y uniones rectos.

        x=4             x=20
         |               |
  y=2    *               *        dientes: los dos picos del termosellado
         |\             /|
         | \           / |
         |  \         /  |        diagonales a unos 48 grados de la horizontal
         |   \       /   |
         |    \     /    |
         |     \   /     |
         |      \ /      |
  y=11   |       *       |        valle en x=12, a 9 u del borde superior (45 % del alto)
         |               |
         |               |
  y=16   |   ---------   |        línea de llenado, de x=7 a x=17 (solo de 48 px en adelante)
         |               |
         |               |
  y=22   \_______________/        base con radios de 2 u

Versión de 16 px (favicon): trazo de 3 u, sin línea de llenado.

Firma horizontal:   [sello]  Mundilácteos
                    alto del sello = 1,4 veces la altura de mayúscula; separación = 6 u
Firma vertical:     [sello] sobre Mundilácteos, alineados a la izquierda, separación de 6 u
Área de protección: 6 u alrededor del conjunto (la altura de un diente)
Tamaños mínimos:    sello de 16 px en pantalla y 8 mm en impreso; firma horizontal de 120 px
```

**Logotipo:** "Mundilácteos" en tipo oración, dibujado sobre Archivo (wdth 75, wght 750) con ajustes a mano: la tilde de la á es un trazo recto con el mismo ángulo de las diagonales del sello, se compensan los espacios entre l, á y c, y se corrige la unión "ct". Recupera la tilde que el logo actual omite.

**Descriptor** (opcional, en el pie y en impresos): "Leche en polvo. Empacada en Cartagena."

### Versiones

| Versión | Colores | Uso |
|---|---|---|
| Positiva | Tinta café sobre Blanco o Kraft | Sitio, documentos, etiqueta de paca |
| Acento | Rojo saco sobre Kraft (sello de 24 px o más) | Sacos, cajas, material de punto de venta |
| Negativa | Kraft o Blanco sobre Tinta café | Pie del sitio, vehículos, uniformes oscuros |
| Una tinta | Cualquier tinta plana del impresor | Flexografía, sello de caucho, relieve, bordado |

### Usos

- Favicon SVG y ICO (versión de 16 px), ícono de 180 px para pantallas de inicio, imagen para compartir (OG) con la foto F05.
- Cabecera del sitio: firma horizontal con el sello de 32 px.
- Reverso de The Cántaro y La Becerrita: sello M con la leyenda "Empacado por Mundilácteos en Cartagena". Las marcas de producto conservan sus empaques, que el consumidor ya reconoce.
- Marca propia: el sello aparece en el empaque de la cadena solo si la cadena lo autoriza.
- Etiqueta de paca y de estiba: sello, referencia, lote y vencimiento.
- Documentos comerciales: cotización impresa, fichas técnicas en PDF, firma de correo.

Prohibido: degradados, contornos alrededor del sello, sombras, girarlo, deformarlo, ponerlo sobre fotos sin un panel liso, cambiar el ángulo de los dientes, usar Rojo saco sobre Tinta café, o Rojo saco sobre Kraft por debajo de 24 px.

Entregables: SVG maestro, versiones a una tinta en PDF vectorial para imprenta, favicon, ícono de 180 px, plantilla de etiqueta de paca y guía de marca de una página.

---

## 6. Arquitectura de navegación

### Mapa del sitio

```
/                                   Home
/productos/                         Productos (catálogo con filtros y buscador)
  ?marca=&tipo=&formato=&peso=&uso=&q=&orden=   filtros y búsqueda en la URL
/productos/the-cantaro-entera/      Ficha de producto
/productos/the-cantaro-entera/900-g/   Ficha con la presentación elegida (enlace para WhatsApp)
/marca-propia/                      Marca propia para cadenas (maquila)
/calidad/                           Certificaciones y calidad
/distribucion/                      Distribución y cobertura nacional
/donde-comprar/                     Para el consumidor final: supermercados y Rappi
/nosotros/                          Historia, familia, planta, equipo y valores
/por-que-elegirnos/                 Razones con su prueba
/recursos/                          Guías, recetas y documentos
/recursos/<articulo>/               Artículo
/cotizar/                           Solicitar cotización (3 pasos) y Mi cotización
  ?c=<lista compartida>             cotización compartida por enlace
/contacto/                          Canales, formulario, dirección, PQR
/privacidad/                        Política de tratamiento de datos (Ley 1581 de 2012)
/terminos/                          Términos de uso
/404.html                           Página no encontrada
```

Las URL del sitio actual en WordPress se redirigen con 301 desde `.htaccess` a su equivalente nuevo.

### Menú de escritorio

```
CABECERA ESCRITORIO (>= 1280 px). Al bajar, la franja de utilidad se va y la fila principal pasa de 72 a 56 px
+--------------------------------------------------------------------------------------------------+
| ¿Es para su casa? Dónde comprar                     | Contacto   Escribir a un asesor (WhatsApp) |
+--------------------------------------------------------------------------------------------------+
| [sello M] Mundilácteos  Productos  Marca propia  Calidad  Distribución  Nosotros  Recursos       |
|                                             [ Marca, gramos o código ]    [ Cotizar (3) ]        |
+--------------------------------------------------------------------------------------------------+
| Enlace activo: subrayado de 3 px en Tinta café bajo el texto (no cambia de color).               |
| Entre 1024 y 1279 px el buscador pasa a botón "Buscar", que abre un campo con sugerencias.       |
| "Cotizar" es el único botón rojo de la cabecera. Con referencias en la lista muestra el conteo.  |
+--------------------------------------------------------------------------------------------------+
```

- Seis destinos: Productos, Marca propia, Calidad, Distribución, Nosotros y Recursos. **Marca propia** es destino propio (injerto de Nota de pedido) porque la maquila tiene un comprador distinto.
- **Por qué elegirnos** no ocupa lugar en el menú de escritorio: es un argumento, no un destino. Vive en la Home, en Nosotros, en el menú móvil y en el pie, y tiene su propia página para que un asesor pueda enviarla.
- El **buscador** está siempre visible desde 1280 px (injerto de Nota de pedido). Entre 1024 y 1279 px es un botón que abre el campo.
- **Cotizar** es el único botón rojo. Con referencias en la lista muestra el conteo: "Cotizar (3)". Lleva a `/cotizar/`.
- La franja de utilidad da al consumidor final una entrada directa ("¿Es para su casa? Dónde comprar") sin mezclarlo con el flujo mayorista.

### Menú y barras en móvil

```
MÓVIL: cabecera
+-----------------------------------+
| [M] Mundilácteos            Menú  |
+-----------------------------------+

MÓVIL: menú a pantalla completa
+-----------------------------------+
| [M] Mundilácteos          Cerrar  |
+-----------------------------------+
| [ Marca, gramos o código      ]   |
|                                   |
| Productos                         |  destinos 24/30
| Marca propia                      |
| Calidad                           |
| Distribución                      |
| Nosotros                          |
| Por qué elegirnos                 |
| Recursos                          |
| Contacto                          |
| --------------------------------  |
| ¿Es para su casa? Dónde comprar   |
| Escribir a un asesor (WhatsApp)   |
| Lun a vie 7:00 a. m. a 5:00 p. m. |
| Europark, vía Turbaco, Cartagena  |
+-----------------------------------+

MÓVIL: barra inferior fija (todas las páginas menos Cotizar y ficha)
+-----------------------------------+
| Buscar  | WhatsApp  | Cotizar (3) |
+-----------------------------------+

MÓVIL: barra inferior en la ficha
+-----------------------------------+
| [-] 10 pacas [+] | [  Agregar  ]  |
+-----------------------------------+
```

- Cabecera de 56 px con el sello, el nombre y el botón "Menú" (con texto, no solo el icono).
- El menú a pantalla completa lleva el buscador arriba, los ocho destinos, la entrada del consumidor, WhatsApp, horario y dirección.
- **Barra inferior fija** en todas las páginas salvo Cotizar y la ficha: Buscar, WhatsApp y Cotizar (n). Tres objetivos de 48 px o más con 8 px de separación. Tocar Cotizar abre la hoja Mi cotización si hay referencias, o va a `/cotizar/` si está vacía.
- En la ficha, la barra inferior cambia a cantidad y Agregar.
- No hay burbuja flotante de WhatsApp: taparía la barra y el contenido.

### Pie

Fondo Tinta café. Cuatro grupos: Productos (The Cántaro, La Becerrita, Bultos, Marca propia), Empresa (Nosotros, Por qué elegirnos, Calidad, Distribución, Recursos), Atención (Escribir a un asesor, Contacto, Dónde comprar, Peticiones, quejas y reclamos) y Datos (Inversiones Mundilácteos S.A.S., NIT, Parque Industrial Europark, Km 1 vía Turbaco, Cartagena, horario, Política de datos, Términos). Cierra con el sello M en Kraft y la frase "Industria colombiana. Empacamos en Cartagena."

### Reglas de navegación

- Migas de pan en Productos, ficha, artículos y páginas interiores.
- Cada referencia tiene su URL; los filtros y la búsqueda viven en la URL (injerto de Kilómetro Cero), así un asesor comparte un enlace exacto y el botón Atrás funciona.
- El enlace activo se marca con subrayado de 3 px, no solo con color.
- Enlace "Saltar al contenido" como primer elemento enfocable.

---

## 7. Home, sección por sección

| # | Sección | Propósito | Contenido y comportamiento |
|---|---|---|---|
| 1 | Cabecera | Orientar y dar acceso a cotizar | Franja de utilidad y fila principal (sección 6) |
| 2 | Hero con la fila a escala | Mostrar la amplitud del surtido y el origen en la primera mirada | H1 "Leche en polvo empacada en Cartagena, de 27 gramos a 25 kilos." en columnas 1 a 8. Bajada y botones en columnas 9 a 12, alineados a la base del H1: "Cotizar por volumen" (rojo) y "Ver productos" (enlace). Debajo, la fila a escala con sus 12 presentaciones (sección 12). Al elegir una, la mini-ficha en Film muestra paca, peso de paca, rinde y en qué productos está, con el enlace "Ver 900 g en Productos". Estado inicial: 900 g elegida (en móvil, 1000 g). |
| 3 | ¿Qué necesita? | Enrutar por tipo de comprador (injerto de Kilómetro Cero) | Dos columnas al mismo nivel. **Para su negocio** (fondo Kraft): tres rutas en lista, Supermercados y cadenas (Surtido o marca propia, "Ver marca propia"), Distribuidores y mayoristas (Pacas de 12 a 300 unidades, "Ver pacas"), Panaderías e industria (Bultos de 5, 12,5 y 25 kg, "Ver bultos"), más el botón "Cotizar por volumen". **Para su casa** (fondo Blanco): las cadenas donde se consigue, en texto, foto C04 y "Ver dónde comprar". "Ver pacas" y "Ver bultos" abren Productos ya filtrado. |
| 4 | Cuánto rinde y calculadora | Traducir el producto a litros y el consumo a bultos | Izquierda: foto M01 y "26 g en 200 ml de agua preparan un vaso. Un kilo rinde cerca de 7,7 litros." Derecha: formulario "Calcule su pedido de bultos" con Producto, Litros que prepara al día y Días de trabajo al mes. Resultado en `aria-live`: "Necesita cerca de 34 kg al mes: 1 bulto de 25 kg y 2 de 5 kg (35 kg)." Regla: la combinación que cubre la necesidad con el menor sobrante; si empatan, la de menos bultos. Botón "Agregar estos bultos a la cotización". |
| 5 | Hecha para el calor | Orgullo de la Costa y verdad de producto (injerto de Kilómetro Cero) | "No necesita nevera. Cerrada, en un lugar seco y a la sombra, dura 12 meses: aguanta la ruta, la bodega y la tienda de barrio." Con la foto C01. Se publica solo si la ficha técnica respalda la frase (ver sección 18). |
| 6 | Por qué elegirnos | Confianza verificable (injerto de Nota de pedido y Kilómetro Cero) | Planilla de dos columnas, hecho y prueba, sin tarjetas: planta propia (Ver la planta), ISO 9001:2015 (Descargar certificado), registro Invima por referencia (Consultar en el Invima), lote y vencimiento en cada bolsa (Cómo leer el lote), 12 presentaciones y pacas de 12 a 300 unidades (Ver productos), despacho a toda Colombia (Ver tiempos por ciudad). Enlace "Ver todas las razones". |
| 7 | Nuestras marcas | Arquitectura de marcas | Tres columnas sin marco ni sombra: The Cántaro, La Becerrita y Su marca. Packshot, línea de presentaciones y enlace al catálogo filtrado o a Marca propia. |
| 8 | Así empacamos cada bolsa | Mostrar el oficio | Secuencia real, por eso numerada: 1 Recepción, 2 Análisis, 3 Empaque y pesaje, 4 Sellado, lote y vencimiento, 5 Despacho. Foto O02. Enlace "Ver calidad y certificaciones". |
| 9 | Distribución | Cobertura nacional | Mapa lineal pequeño y lista "Elija su ciudad" con tiempo de entrega de tres ciudades. Enlace "Ver todas las ciudades". |
| 10 | Recursos | Contenido útil y SEO | Tres artículos en lista de texto: título, tema y minutos de lectura. |
| 11 | Pie | Datos, legal y orgullo | Sección 6 |

### Wireframe de escritorio

```
1440 px de ancho, contenedor de 1312 px, 12 columnas, todo alineado a la izquierda
+--------------------------------------------------------------------------------------------------+
| ¿Es para su casa? Dónde comprar                     | Contacto   Escribir a un asesor (WhatsApp) |
+--------------------------------------------------------------------------------------------------+
| [sello M] Mundilácteos  Productos  Marca propia  Calidad  Distribución  Nosotros  Recursos       |
| (en pantalla real, una sola fila)           [ Marca, gramos o código ]    [ Cotizar (3) ]        |
+--------------------------------------------------------------------------------------------------+
| Leche en polvo empacada                                    | Surtimos tiendas, panaderías,       |
| en Cartagena, de 27                                        | supermercados e industria en toda   |
| gramos a 25 kilos.                                         | Colombia, con The Cántaro, La       |
|                                                            | Becerrita o la marca de su cadena.  |
|                                                            | [Cotizar por volumen] Ver productos |
|                                                                                                  |
| Toque una presentación para ver cuántas vienen por paca y cuánto rinde.                          |
| 90 -                                                                                  ########## |
|    -                                                                                  ########## |
|    -                                                                                  ########## |
| 60 -                                                                        ########  ########## |
|    -                                                                        ########  ########## |
|    -                                                                ######  ########  ########## |
|    -                                                                ######  ########  ########## |
| 30 -                                    ###    ####   ####   ####   ######  ########  ########## |
|    -         ##    ###    ###    ###    ###    ####   ####   ####   ######  ########  ########## |
|    -  ##     ##    ###    ###    ###    ###    ####   ####   ####   ######  ########  ########## |
| cm   =========================================================================================== |
|      27 g  104 g  200 g  380 g  400 g  500 g  750 g  900 g  1000 g   5 kg   12,5 kg     25 kg    |
|                                                      ^^^^^                                       |
|      (las cifras ganan grosor y ancho con los gramos: 27 g en 300/62 ... 25 kg en 900/125)       |
+--------------------------------------------------------------------------------------------------+
| 900 g   Paca de 24 bolsas, 21,6 kg   Rinde cerca de 6,9 L por bolsa | [Ver 900 g en Productos]   |
|         Disponible en The Cántaro entera y La Becerrita entera      |                            |
+--------------------------------------------------------------------------------------------------+
| ¿Qué necesita?                                |                                                  |
+-----------------------------------------------+--------------------------------------------------+
| (fondo Kraft) Para su negocio                 | (fondo Blanco) Para su casa                      |
| Supermercados y cadenas                       | Encuéntrenos en Olímpica, Megatiendas,           |
|   Surtido o marca propia  Ver marca propia    | Mr. Bono, Rapimercar, La Garosa y Rappi.         |
| Distribuidores y mayoristas                   | [foto C04: cocina de casa, luz de ventana]       |
|   Pacas de 12 a 300 unidades  Ver pacas       |                                                  |
| Panaderías e industria                        | Ver dónde comprar                                |
|   Bultos de 5, 12,5 y 25 kg   Ver bultos      |                                                  |
| [ Cotizar por volumen ]                       |                                                  |
+-----------------------------------------------+--------------------------------------------------+
| Cuánto rinde                                  | Calcule su pedido de bultos                      |
| [foto M01: cuchara rasa, luz rasante]         | Producto  [ The Cántaro entera, bulto  v ]       |
|                                               | Litros que prepara al día     [ 10 ]             |
| 26 g en 200 ml de agua preparan un vaso.      | Días de trabajo al mes        [ 26 ]             |
| Un kilo rinde cerca de 7,7 litros.            | Necesita cerca de 34 kg al mes:                  |
| (dosis tomada de la etiqueta de cada          | 1 bulto de 25 kg y 2 de 5 kg (35 kg).            |
|  producto; dato a confirmar)                  | [ Agregar estos bultos a la cotización ]         |
+-----------------------------------------------+--------------------------------------------------+
| Hecha para el calor                           | [foto C01: panadero de Cartagena abriendo        |
| No necesita nevera. Cerrada, en un lugar      |  un bulto, luz dura de mediodía]                 |
| seco y a la sombra, dura 12 meses: aguanta    |                                                  |
| la ruta, la bodega y la tienda de barrio.     |                                                  |
+--------------------------------------------------------------------------------------------------+
| Por qué elegirnos                                  Cada razón viene con su prueba.               |
| Planta propia en Europark, vía Turbaco                     | Ver la planta                       |
| ISO 9001:2015 (alcance y vigencia por confirmar)           | Descargar certificado (PDF)         |
| Registro Invima por referencia                             | Consultar en el Invima              |
| Lote y vencimiento impresos en cada bolsa                  | Cómo leer el lote                   |
| 12 presentaciones, pacas de 12 a 300 unidades              | Ver productos                       |
| Despacho desde Cartagena a toda Colombia                   | Ver tiempos por ciudad              |
| Ver todas las razones                                                                            |
+--------------------------------------------------------------------------------------------------+
| Nuestras marcas                |                                |                                |
| [packshot The Cántaro]         | [packshot La Becerrita]        | [bolsa de marca propia]        |
| The Cántaro                    | La Becerrita                   | Su marca                       |
| Entera y azucarada,            | Entera, de 380 g a 25 kg       | Empacamos para su cadena       |
| de 27 g a 25 kg                | Ver La Becerrita               | Ver marca propia               |
| Ver The Cántaro                |                                |                                |
+--------------------------------------------------------------------------------------------------+
| Así empacamos cada bolsa                                     Ver calidad y certificaciones       |
| 1 Recepción   2 Análisis   3 Empaque y pesaje   4 Sellado, lote y vencimiento   5 Despacho       |
| [foto O02: codificación del lote en la bolsa]                                                    |
+--------------------------------------------------------------------------------------------------+
| Distribución                                  | Elija su ciudad                                  |
| [mapa lineal de Colombia: Cartagena marcada,  | Barranquilla      24 a 48 h   Ver                |
|  ciudades de despacho como puntos con         | Montería          48 a 72 h   Ver                |
|  nombre; sin flechas ni pines]                | Medellín          3 a 5 días  Ver                |
|                                               | (tiempos de ejemplo)  Ver todas las ciudades     |
+--------------------------------------------------------------------------------------------------+
| Recursos                                                                   Ver todos             |
| Cuánta leche en polvo necesita su panadería al mes            Para su negocio   5 min            |
| Cómo almacenar bultos en clima cálido                          Para su negocio   4 min           |
| Arequipe casero con leche en polvo                             En la cocina      6 min           |
+--------------------------------------------------------------------------------------------------+
| (pie en Tinta café) Productos  Marca propia  Calidad  Distribución | Parque Industrial Europark  |
| Nosotros  Por qué elegirnos  Recursos  Dónde comprar  Contacto     | Km 1 vía Turbaco, Cartagena |
| Política de datos (Ley 1581 de 2012)   NIT 000.000.000-0           | Lun. a vie., 7 a 5 p. m.    |
| Industria colombiana. Empacamos en Cartagena.                      | [sello M en Kraft]          |
+--------------------------------------------------------------------------------------------------+

Notas:
- Franja de utilidad de 40 px; se va al hacer scroll
- Cabecera fija de 72 px; se compacta a 56 px
- H1: Archivo 72/72, wdth 68, wght 800, columnas 1 a 8
- Bajada: 21/32, columnas 9 a 12, alineada a la base del H1
- Botón rojo Cotizar por volumen y enlace Ver productos
- Pista de la fila: 16/24, Tinta suave
- Mini-ficha de la presentación elegida: fondo Film, aria-live="polite"
- Fin del primer pantallazo: cabecera, H1, fila y mini-ficha caben en 1440 x 800
- H2 36/40, wdth 75, wght 800
- Dos H2 en paralelo; la calculadora es un formulario con resultado aria-live
- Hecha para el calor: se publica solo si la ficha técnica lo respalda
- Por qué elegirnos: H2 y bajada en la misma línea base
- Planilla de dos columnas (hecho y prueba), sin tarjetas ni iconos decorativos
- Marcas: packshots sobre blanco, sin marco ni sombra de interfaz
- Así empacamos: secuencia real, por eso numerada
- Recursos: lista de texto, no tarjetas
```

### Wireframe móvil

```
375 px, margen 16 px, sin scroll horizontal
+-----------------------------------+
| [M] Mundilácteos            Menú  |  cabecera 56 px
+-----------------------------------+
| Leche en polvo                    |  H1 48/48, wdth 62, wght 800
| empacada en                       |
| Cartagena, de 27                  |
| gramos a 25 kilos.                |
| Surtimos tiendas, panaderías,     |  bajada 18/28
| supermercados e industria en      |
| toda Colombia.                    |
| [     Cotizar por volumen     ]   |  botón de ancho completo, 48 px
| Ver productos                     |
|                                   |
|                        ######     |
|                        ######     |
|                        ######     |
|                        ######     |
|                        ######     |
|                   #### ######     |
|             ###   #### ######     |
|        ##   ###   #### ######     |
|  #     ##   ###   #### ######     |
| =============================     |
| 27 g 200 g 1000 g 5 kg 25 kg      |
|            ^^^^^^                 |
| Ver las 12 presentaciones         |
| 1000 g: paca de 12 bolsas,        |  mini-ficha
| 12,0 kg. Rinde cerca de 7,7 L.    |
+-----------------------------------+
| ¿Qué necesita?                    |
| (Kraft) Para su negocio           |
| Supermercados y cadenas       >   |
| Distribuidores y mayoristas   >   |
| Panaderías e industria        >   |
| (Blanco) Para su casa             |
| Olímpica, Megatiendas, Mr. Bono,  |
| Rapimercar, La Garosa y Rappi.    |
| Ver dónde comprar                 |
+-----------------------------------+
| Cuánto rinde + calculadora        |
| Hecha para el calor + foto C01    |
| Por qué elegirnos (6 filas)       |
| Nuestras marcas (1 columna)       |
| Así empacamos (1 a 5 apilados)    |
| Distribución (lista de ciudades)  |
| Recursos (3 enlaces)              |
| Pie en Tinta café                 |
+-----------------------------------+
| Buscar  | WhatsApp  | Cotizar (3) |  barra inferior fija, 64 px
+-----------------------------------+
```

En móvil la fila muestra 5 presentaciones representativas (27 g, 200 g, 1000 g, 5 kg y 25 kg) sin scroll horizontal, con el enlace "Ver las 12 presentaciones". Las secciones se apilan en el mismo orden; las dos columnas de "¿Qué necesita?" pasan a bloques con Kraft primero.

---

## 8. Productos (catálogo)

La página se llama **Productos** en el menú, en el H1 y en los botones ("Ver productos"). Es una planilla por producto con filas por presentación: el comprador B2B cotiza por referencia y compara pacas, pesos y rinde. No es una cuadrícula de tarjetas.

**Vocabulario fijo:** *presentación* es el peso o formato (900 g, 25 kg); *referencia* es un producto en una presentación (The Cántaro entera 900 g). El conteo siempre habla de referencias: "7 referencias de 2 productos".

### Estructura

1. **Encabezado.** Migas, H1 "Productos", entradilla "12 presentaciones de leche en polvo, en bolsa y bulto. El precio por volumen llega con la cotización." y el buscador.
2. **Buscador** (injerto de Nota de pedido). Etiqueta "Buscar productos" y ejemplo "Marca, gramos o código". Busca sobre el JSON del catálogo mientras se escribe (espera de 120 ms) e ignora tildes y mayúsculas. Sinónimos: kilo, kilos y k equivalen a kg; gramos, gr y grs a g; 1 kg a 1000 g; saco y costal a bulto; fardo a paca; azúcar y dulce a azucarada; cantaro a The Cántaro. Un número solo ("400", "25", "12,5" o "12.5") busca la presentación. En Productos filtra la planilla; en la cabecera de otras páginas muestra hasta 6 sugerencias (patrón combobox) y Enter abre `/productos/?q=`.
3. **Filtros** (panel en Film, columna izquierda). Marca (The Cántaro, La Becerrita), Tipo (Entera, Azucarada; las opciones salen de las denominaciones registradas), Formato (Bolsa, Bulto), Peso (12 chips que se ajustan en varias filas, nunca recortados) y Uso (Hogar, Tienda, Panadería, Industria). Cada opción muestra cuántos productos quedan. Todo se refleja en la URL.
4. **Chips de filtros activos y conteo.** "(The Cántaro, quitar) (Bolsa, quitar)", "Quitar filtros" y "7 referencias de 2 productos" anunciado con `aria-live="polite"`. Orden: "Peso, de menor a mayor" (predeterminado) o "Marca".
5. **Bloque de producto.** Foto del producto, marca y denominación exacta del registro. Debajo, una tabla con una fila por presentación: Presentación, Paca (unidades), Peso de paca, Rinde aproximado, Cantidad y Agregar. Cifras tabulares alineadas a la derecha. Cierra con "Ver ficha técnica".
6. **Fila de presentación** (injerto de Nota de pedido: cantidad en cada fila). Control "[−] 1 paca [+]" con campo numérico editable (`inputmode="numeric"`), cálculo en vivo "= 240 bolsas, 216,0 kg" y botón "Agregar". Las bolsas se cotizan por paca; los bultos, por bulto. Estados: *inicial* (cantidad 1, botón Agregar), *agregado* (texto "Agregado", el control queda sincronizado con Mi cotización y aparece "Quitar"), *sin dato* (si falta el dato de paca, se muestra "Consultar" y la fila se puede agregar igual).
7. **Filas de bultos.** Van sobre Kraft: es la regla de color del volumen.
8. **Fila de marca propia** al final: "Su marca: empacamos con la de su cadena. Ver marca propia".
9. **Mi cotización** (injerto de Nota de pedido). Desde 1440 px es una columna fija a la derecha de 304 px: cabecera en Kraft, líneas con su control de cantidad y kilos, totales ("330 bolsas en 13 pacas y 2 bultos. Total 302,0 kg"), botón "Solicitar cotización" y acciones secundarias (Copiar enlace, Imprimir o guardar en PDF, Vaciar la cotización). Entre 1024 y 1439 px, para no apretar la planilla, pasa a una franja fija abajo ("Mi cotización: 3 referencias, 302,0 kg") que abre un panel lateral de 400 px. En móvil es la hoja inferior de Cotizar.
10. **Sin resultados** (injerto de Nota de pedido). Propone la alternativa real con un botón: "No hay La Becerrita en bulto de 5 kg. Sí la hay en 25 kg." [Ver La Becerrita 25 kg] y "Quitar filtros". En búsqueda: "No encontramos «cantaro 700». La presentación más cercana es 750 g." [Ver The Cántaro 750 g].

La página se entrega prerenderizada en HTML con todas las referencias (sirve sin JavaScript y para buscadores). El JavaScript agrega filtros, búsqueda, cantidades y la cotización.

### Wireframe de escritorio

```
PRODUCTOS, ESCRITORIO >= 1440 px (/productos/?marca=the-cantaro&formato=bolsa)
+--------------------------------------------------------------------------------------------------+
| Inicio / Productos                                                                               |
| Productos                                               | [ Buscar: marca, gramos o código    ]  |
| 12 presentaciones de leche en polvo, en bolsa y bulto.  |                                        |
| El precio por volumen llega con la cotización.          |                                        |
+----------------------+----------------------------------------------+----------------------------+
| Filtros (fondo Film) | 7 referencias de 2 productos                 | (cabecera Kraft)           |
|                      | Ordenar: peso, de menor a mayor              | Mi cotización              |
| Marca                | (The Cántaro  x) (Bolsa  x)  Quitar filtros  | 3 referencias              |
| [x] The Cántaro (2)  | -------------------------------------------- | -------------------------- |
| [ ] La Becerrita (1) | [foto] The Cántaro                           | The Cántaro entera 900 g   |
| Tipo                 |        Leche en polvo entera                 | [-] 10 pacas [+] 216,0 kg  |
| [ ] Entera           |                                              | La Becerrita entera 25 kg  |
| [ ] Azucarada        | Pres.  Paca   Peso    Rinde Cantidad         | [-] 2 bultos [+]  50,0 kg  |
| Formato              | 400 g  30 u. 12,0 kg  3,1 L [-] 1 paca [+]   | The Cántaro azuc. 400 g    |
| [Bolsa] [Bulto]      |                               [ Agregar ]    | [-] 3 pacas [+]   36,0 kg  |
| Peso (chips en       | 900 g  24 u. 21,6 kg  6,9 L [-] 10 pacas [+] | -------------------------- |
|  varias filas)       |        Agregado         [ Quitar ]           | 330 bolsas en 13 pacas     |
| [27 g] [104 g]       |        = 240 bolsas, 216,0 kg                | y 2 bultos                 |
| [200 g] [380 g]      |        Ver ficha técnica                     | Total        302,0 kg      |
| [400 g] [500 g]      | -------------------------------------------- |                            |
| [750 g] [900 g]      | [foto] The Cántaro                           | [Solicitar cotización]     |
| [1000 g] [5 kg]      |        (denominación del registro)           | Copiar enlace              |
| [12,5 kg] [25 kg]    |        (mismo formato de filas)              | Imprimir o guardar en PDF  |
| Uso                  | -------------------------------------------- | Vaciar la cotización       |
| [ ] Hogar            | Su marca: empacamos con la de su cadena.     |                            |
| [ ] Tienda           | Ver marca propia                             | Esto no es un pago:        |
| [ ] Panadería        |                                              | es una solicitud de        |
| [ ] Industria        | (cifras tabulares, alineadas a la derecha)   | cotización.                |
+----------------------+----------------------------------------------+----------------------------+
| Entre 1024 y 1439 px: dos columnas (filtros y planilla). Mi cotización pasa a una franja         |
| fija abajo:                                                                                      |
| "Mi cotización: 3 referencias, 302,0 kg  [Ver detalle] [Solicitar cotización]". Ver detalle abre |
| un panel lateral derecho de 400 px con el mismo contenido.                                       |
+--------------------------------------------------------------------------------------------------+

Notas:
- Productos: H1 48/52; el buscador filtra la planilla mientras se escribe
```

### Wireframe móvil, hoja de filtros y hoja de cotización

```
PRODUCTOS, MÓVIL (375 px)
+-----------------------------------+
| [M] Mundilácteos            Menú  |
+-----------------------------------+
| Inicio / Productos                |
| Productos                         |  H1 36/40
| [ Marca, gramos o código      ]   |
| [ Filtrar (2) ]  Ordenar: peso    |
| (The Cántaro x) (Bolsa x)         |
| 7 referencias de 2 productos      |  aria-live
+-----------------------------------+
| [img] The Cántaro                 |
|       Leche en polvo entera       |
| ................................  |
| 400 g   Paca de 30, 12,0 kg       |
|         Rinde cerca de 3,1 L      |
| [-] 1 paca [+]      [ Agregar ]   |
| ................................  |
| 900 g   Paca de 24, 21,6 kg       |
|         Rinde cerca de 6,9 L      |
| [-] 10 pacas [+]     Agregado     |
| = 240 bolsas, 216,0 kg  Quitar    |
| ................................  |
| Ver ficha técnica                 |
+-----------------------------------+
| [img] The Cántaro                 |
|       (denominación del registro) |
|       (mismo formato)             |
+-----------------------------------+
| Buscar  | WhatsApp  | Cotizar (3) |
+-----------------------------------+

Hoja inferior: Filtrar
+-----------------------------------+
| Filtrar                   Cerrar  |
| Marca                             |
| [x] The Cántaro [ ] La Becerrita  |
| Tipo      [Entera] [Azucarada]    |
| Formato   [Bolsa] [Bulto]         |
| Peso                              |
| [27 g] [104 g] [200 g] [380 g]    |
| [400 g] [500 g] [750 g] [900 g]   |
| [1000 g] [5 kg] [12,5 kg]         |
| [25 kg]                           |
| Uso [Hogar] [Tienda] [Panadería]  |
|     [Industria]                   |
| --------------------------------  |
| Quitar filtros                    |
| [      Ver 7 referencias      ]   |
+-----------------------------------+

Hoja inferior: Mi cotización (al tocar Cotizar)
+-----------------------------------+
| (cabecera Kraft) Mi cotización    |
| 3 referencias                     |
| The Cántaro entera 900 g          |
| [-] 10 pacas [+]       216,0 kg   |
| La Becerrita entera 25 kg         |
| [-] 2 bultos [+]        50,0 kg   |
| The Cántaro azucarada 400 g       |
| [-] 3 pacas [+]         36,0 kg   |
| Total                  302,0 kg   |
| 330 bolsas en 13 pacas y 2 bultos |
| [    Solicitar cotización     ]   |
| Enviar por WhatsApp               |
| Copiar enlace                     |
| Imprimir o guardar en PDF         |
| Esto no es un pago: es una        |
| solicitud de cotización.          |
+-----------------------------------+
```

En móvil cada presentación es un bloque apilado (la tabla no se desborda). "Filtrar (2)" abre una hoja inferior con los mismos grupos y el botón "Ver 7 referencias", que se actualiza al elegir.

---

## 9. Ficha de producto

URL por producto y por presentación (`/productos/the-cantaro-entera/900-g/`). La presentación elegida cambia la URL con `history.replaceState`, para que el enlace que se copia o se envía por WhatsApp abra esa misma presentación.

1. **Migas:** Inicio / Productos / The Cántaro / Leche en polvo entera.
2. **Galería:** packshot 4:5 sobre blanco y miniaturas 1:1 (frente, reverso con lote, paca, en uso). Son botones; no hay carrusel automático.
3. **Identificación:** marca (21/32, wght 600), H1 con la **denominación exacta del registro Invima**, número de registro con el enlace "Consultar".
4. **Selector de presentación:** en escritorio, la **fila a escala reducida** con solo las presentaciones de este producto (el elemento firma reaparece con una función). En móvil, chips que se ajustan en varias filas.
5. **Datos de venta:** "Paca de 24 bolsas, 21,6 kg", "Rinde cerca de 6,9 L por bolsa".
6. **Cantidad y acción:** "Cantidad [−] 10 pacas [+]", cálculo "= 240 bolsas de 900 g, 216,0 kg", botón "Agregar a la cotización" y enlace "Preguntar por WhatsApp" (mensaje "Hola, quiero información de The Cántaro entera 900 g.").
7. **Línea del consumidor:** "¿Es para su casa? Vea dónde comprar."
8. **Ficha técnica** en tabla HTML (`th scope="row"`): denominación, ingredientes, preparación, rinde, vida útil, empaque, almacenamiento, alérgenos ("Contiene leche") y registro. Enlace "Descargar ficha técnica (PDF, 180 KB)"; el PDF es una copia, nunca el único lugar del dato.
9. **Información nutricional:** tabla por 100 g y por porción, con cifras tabulares.
10. **Datos logísticos:** medidas de la paca, pacas por estiba, código de barras (EAN).
11. **Relacionados:** otras presentaciones de este producto y productos de uso similar, en lista de texto.

En móvil las secciones 8 a 10 son acordeones (`button` con `aria-expanded`) y la barra inferior fija lleva cantidad y "Agregar".

### Wireframe de escritorio

```
FICHA, ESCRITORIO (/productos/the-cantaro-entera/900-g/)
+--------------------------------------------------------------------------------------------------+
| Inicio / Productos / The Cántaro / Leche en polvo entera                                         |
+----------------------------------------------+---------------------------------------------------+
| [packshot 900 g sobre blanco, 4:5]           | The Cántaro                                       |
|                                              | Leche en polvo entera                             |
|                                              | Registro Invima RSA-000000-0000  Consultar        |
|                                              | Presentación (fila a escala reducida = selector)  |
|                                              |                                    #######        |
|                                              |                                    #######        |
|                                              |                                    #######        |
|                                              |                                    #######        |
|                                              |                      ###    ###    #######        |
|                                              |  #      ##     ##    ###    ###    #######        |
|                                              | ==========================================        |
|                                              | 27 g  200 g  400 g  900 g  1000 g   25 kg         |
|                                              |                     ^^^^^                         |
| [frente] [reverso] [paca] [en uso]           | Paca de 24 bolsas, 21,6 kg                        |
|                                              | Rinde cerca de 6,9 L por bolsa                    |
|                                              | Cantidad  [-]  10 pacas  [+]                      |
|                                              | = 240 bolsas de 900 g, 216,0 kg                   |
|                                              | [Agregar a la cotización]  Preguntar por WhatsApp |
|                                              | ¿Es para su casa? Vea dónde comprar.              |
+----------------------------------------------+---------------------------------------------------+
| Ficha técnica                                           | Descargar ficha técnica (PDF, 180 KB)  |
| Denominación      Leche en polvo entera                 |                                        |
| Ingredientes      Leche entera en polvo                 |                                        |
| Preparación       26 g en 200 ml de agua                |                                        |
| Vida útil         12 meses desde la fecha de empaque    |                                        |
| Empaque           Bolsa laminada; paca termoencogida    |                                        |
| Almacenamiento    Lugar seco, a la sombra; cerrar bien  |                                        |
| Alérgenos         Contiene leche                        |                                        |
+--------------------------------------------------------------------------------------------------+
| Información nutricional                         Por 100 g    Por porción (26 g)                  |
| Energía (kcal)                                        000             000                        |
| Grasa total (g)                                       0,0             0,0                        |
| (valores del laboratorio del cliente)                                                            |
+--------------------------------------------------------------------------------------------------+
| Datos logísticos                              | Otras presentaciones de este producto            |
| Medidas de la paca      00 x 00 x 00 cm       | 27 g   200 g   400 g   1000 g   25 kg            |
| Pacas por estiba        00                    | Productos de uso similar                         |
| Código de barras (EAN)  770000000000          | La Becerrita entera 900 g                        |
+--------------------------------------------------------------------------------------------------+

Notas:
- Marca del producto: 21/32, wght 600
- H1 48/52: denominación exacta del registro Invima
- Miniaturas 1:1 que cambian la foto principal (botones, no carrusel automático)
- Ficha técnica: tabla HTML con th scope="row"; el PDF es copia, no sustituto
- Información nutricional: tabla con cifras tabulares alineadas a la derecha
```

### Wireframe móvil

```
FICHA, MÓVIL
+-----------------------------------+
| < Productos                       |
| [packshot 900 g, 4:5]             |
| [frente] [reverso] [paca]         |
| The Cántaro                       |
| Leche en polvo entera             |  H1 36/40
| Registro Invima RSA-000000-0000   |
| Presentación                      |
| [27 g] [200 g] [400 g] [900 g]    |  chips, se ajustan
| [1000 g] [25 kg]                  |
| Paca de 24 bolsas, 21,6 kg        |
| Rinde cerca de 6,9 L por bolsa    |
| Preguntar por WhatsApp            |
| > Ficha técnica                   |  acordeones
| > Información nutricional         |
| > Empaque y datos logísticos      |
| > Almacenamiento                  |
| Descargar ficha técnica (PDF)     |
| ¿Es para su casa? Dónde comprar   |
+-----------------------------------+
| [-] 10 pacas [+] | [  Agregar  ]  |  barra fija
+-----------------------------------+
```

---

## 10. Mi cotización y Solicitar cotización

Nombres fijos: la lista se llama **Mi cotización** (nunca carrito ni pedido); la acción, **Solicitar cotización**; el envío, **Enviar solicitud de cotización**; la confirmación, **Solicitud enviada**. No hay precios públicos: el precio varía por canal y volumen, así que la herramienta calcula unidades y kilos, no pesos colombianos.

**Mi cotización** (injertos de Nota de pedido):

- Totales en vivo en bolsas, pacas, bultos y kilos.
- Se guarda en `localStorage` (clave `mundi.cotizacion.v1`, envuelta en `try/catch`). Si el navegador bloquea el almacenamiento, funciona en memoria y avisa: "Este navegador no deja guardar la cotización. Envíela antes de cerrar la página o copie el enlace."
- **Copiar enlace**: codifica la lista en la URL (`/cotizar/?c=cantaro-entera-900g.p10,becerrita-entera-25kg.b2`). Un asesor puede enviarle a un tendero su pedido habitual ya armado. Al abrirlo: "Un asesor preparó esta cotización para usted: 3 referencias, 302,0 kg." [Usar esta cotización] [Conservar la mía].
- **Repetir mi última solicitud**: tras enviar, la lista se guarda como última solicitud y se ofrece en la cotización vacía.
- **Imprimir o guardar en PDF**: `window.print()` con una hoja de impresión que muestra sello, fecha, líneas y totales.
- **Vaciar la cotización** con opción de deshacer.
- La nota "Esto no es un pago: es una solicitud de cotización." acompaña siempre el botón de envío.

**Solicitar cotización** (`/cotizar/`): tres pasos, una secuencia real, por eso numerados.

1. **Productos.** Las líneas con su cantidad, "Quitar", "Agregar más productos" y un campo libre "¿Necesita algo que no está en el catálogo? Escríbalo aquí."
2. **Entrega.** Ciudad de entrega (ayuda: "Con su ciudad calculamos el despacho desde Cartagena."), tipo de negocio (Tienda, Panadería, Supermercado, Distribuidor, Industria, Otro), frecuencia de compra y fecha deseada (opcional).
3. **Contacto.** Nombre, empresa (opcional), NIT (opcional), celular, correo, mensaje (opcional) y la casilla de autorización de datos. Botón "Enviar solicitud de cotización".

Comportamiento:

- Etiquetas visibles, `autocomplete` correcto (`name`, `organization`, `tel`, `email`), `inputmode="numeric"` en celular, NIT y cantidades. Validación al salir del campo y al enviar; el foco va al primer error y hay un resumen de errores con enlaces a cada campo.
- Envío por `fetch` a un script PHP en Hostinger (correo SMTP al equipo comercial y acuse al cliente) con campo trampa contra spam y límite de envíos. Sin JavaScript, el formulario se envía igual y el PHP responde una página de confirmación. Alternativa: un servicio de formularios.
- **Confirmación con nombre y hora reales** (injerto de Nota de pedido): el texto sale de `datos/atencion.json` (zona horaria America/Bogota, horario, festivos de Colombia del año y asesores por día), nunca de un texto fijo. Dentro del horario: "Yesenia, del equipo comercial, le escribe hoy antes de las 5:00 p. m. por WhatsApp o correo." Fuera del horario: "Un asesor le escribe el lunes antes de las 10:00 a. m." Si no hay asesor configurado se omite el nombre.
- **Fallo de envío** (injerto de Kilómetro Cero): "No se pudo enviar la solicitud. Revise su conexión e intente de nuevo. Su cotización sigue guardada y también puede enviarla por WhatsApp."
- **Enviar por WhatsApp** está disponible en todos los pasos, con la lista ya escrita en el mensaje.

### Wireframes

```
COTIZAR, ESCRITORIO (/cotizar/). Tres pasos: secuencia real, por eso numerada
+--------------------------------------------------------------------------------------------------+
| Solicitar cotización                                                                             |
| 1 Productos  --------  2 Entrega  --------  3 Contacto                                           |
+--------------------------------------------------------------+-----------------------------------+
| Paso 2 de 3: Entrega                                         | (cabecera Kraft) Su cotización    |
| Ciudad de entrega                                            | The Cántaro entera 900 g          |
| [ Montería                          v ]                      | 10 pacas               216,0 kg   |
| Con su ciudad calculamos el despacho desde Cartagena.        | La Becerrita entera 25 kg         |
| Tipo de negocio                                              | 2 bultos                50,0 kg   |
| ( ) Tienda  (o) Panadería  ( ) Supermercado                  | The Cántaro azucarada 400 g       |
| ( ) Distribuidor  ( ) Industria  ( ) Otro                    | 3 pacas                 36,0 kg   |
| ¿Cada cuánto compra?                                         | Total                  302,0 kg   |
| [ Cada mes                          v ]                      | Editar productos                  |
| Fecha deseada de entrega (opcional)                          |                                   |
| [ dd/mm/aaaa ]                                               | Esto no es un pago: es una        |
|                                                              | solicitud de cotización.          |
| Volver a productos        [ Continuar con contacto ]         |                                   |
+--------------------------------------------------------------+-----------------------------------+
| Paso 3 de 3: Contacto. Nombre, empresa (opcional), NIT (opcional), celular, correo, mensaje      |
| (opcional) y la casilla de autorización de datos. Botón: [ Enviar solicitud de cotización ].     |
| Debajo del botón: "¿Prefiere WhatsApp? Enviar por WhatsApp" con la lista ya escrita.             |
+--------------------------------------------------------------------------------------------------+
| Confirmación                                                                                     |
| Solicitud enviada.                                                                               |
| Yesenia, del equipo comercial, le escribe hoy antes de las 5:00 p. m. por WhatsApp o correo.     |
| Número de solicitud: MDL-0426. Recibida el jueves 25 de septiembre a las 10:42 a. m.             |
| [Imprimir o guardar en PDF]   Copiar enlace   Volver a productos                                 |
+--------------------------------------------------------------------------------------------------+

Notas:
- Solicitar cotización: H1 48/52
- Indicador de pasos: el paso actual va en Tinta café, wght 700, con subrayado
- Confirmación: reemplaza el formulario y el foco pasa a su título
```

```
COTIZAR, MÓVIL (paso 1)
+-----------------------------------+
| < Productos                       |
| Solicitar cotización              |
| Paso 1 de 3: Productos            |
| [===========            ]         |  barra de progreso
| The Cántaro entera 900 g          |
| [-] 10 pacas [+] 216,0 kg Quitar  |
| La Becerrita entera 25 kg         |
| [-] 2 bultos [+]  50,0 kg Quitar  |
| The Cántaro azucarada 400 g       |
| [-] 3 pacas [+]   36,0 kg Quitar  |
| Total                  302,0 kg   |
| 330 bolsas en 13 pacas y 2 bultos |
| Agregar más productos             |
| ¿Necesita algo que no está en     |
| el catálogo? Escríbalo aquí:      |
| [                              ]  |
| [     Continuar con entrega    ]  |
| Enviar por WhatsApp               |
| Esto no es un pago: es una        |
| solicitud de cotización.          |
+-----------------------------------+
```

---

## 11. Resto de páginas

### Marca propia (`/marca-propia/`)

- H1 "Marca propia para cadenas". Entradilla: "Empacamos leche en polvo con la marca de su cadena, en la presentación que necesite."
- **Qué ofrecemos:** presentaciones posibles (de 27 g a 25 kg), tipos de leche, empaque (bolsa laminada, paca, bulto), apoyo con el registro sanitario y la etiqueta (quién es titular del registro: dato a confirmar).
- **Cómo trabajamos** (secuencia real, numerada): 1 Muestras y especificación, 2 Diseño del empaque (lo aporta la cadena), 3 Aprobación de arte y registro, 4 Producción y despacho.
- **Requisitos:** pedido mínimo por referencia y tiempo de arranque (datos a confirmar).
- **Confidencialidad:** "No publicamos las marcas que empacamos sin autorización escrita."
- Formulario "Pedir muestras y costos": empresa, NIT, cargo, presentaciones de interés, volumen mensual estimado, ciudad y contacto. Fotos F06 solo con permiso; si no, F01 de una bolsa genérica sin marca.

### Nosotros (`/nosotros/`)

- H1 "Nosotros". Entradilla: "Somos una empresa familiar de Cartagena y llevamos más de 11 años empacando leche en polvo."
- **Historia:** línea de tiempo con años reales (fundación, primeras cadenas, planta en Europark, certificación ISO, lanzamiento de cada marca). Es una secuencia, así que puede llevar años como marcadores.
- **La familia:** quiénes fundaron la empresa y por qué, con una foto real y una cita corta firmada.
- **La planta:** dirección, fotos O07 y O01, capacidad y metros cuadrados (datos a confirmar).
- **El equipo:** foto O06 y número de personas que trabajan en Cartagena y Turbaco.
- **Valores en la práctica,** cada uno con su evidencia: "Pesamos lo que dice la etiqueta" (verificación de peso), "Cada bolsa lleva su lote" (trazabilidad), "Respondemos en un día hábil" (compromiso a confirmar), "Trabajamos desde Cartagena" (empleo local y despacho desde la Costa).
- **Nuestras marcas:** The Cántaro, La Becerrita y marca propia, con enlaces. Cierra con el enlace a Por qué elegirnos.

### Calidad (`/calidad/`)

- H1 "Calidad y certificaciones" (en el menú, "Calidad"). Entradilla: "Cada bolsa lleva impresos el lote y la fecha de vencimiento. Aquí están los certificados y registros que lo respaldan."
- **ISO 9001:2015:** organismo certificador, número de certificado, alcance, vigencia, "Descargar certificado (PDF)" y enlace de verificación del organismo. Se publica solo con el certificado a la vista.
- **Registros Invima:** tabla por referencia (Referencia, Denominación, Registro, Vigencia, Consultar) con enlace a la consulta pública del Invima.
- **Así empacamos cada bolsa:** los 5 pasos con fotos de Oficio.
- **Cómo leer el lote y la fecha:** foto F02 anotada con el lote y el vencimiento señalados.
- **Fichas técnicas:** lista de PDF por referencia, con peso de archivo.
- **Qué controlamos:** solo los análisis que el cliente pueda sustentar (humedad, grasa, proteína, microbiológicos).
- **Peticiones, quejas y reclamos:** "¿Encontró un problema con un producto? Tenga a mano el lote y escríbanos." con enlace al formulario de Contacto con el motivo ya elegido.

### Por qué elegirnos (`/por-que-elegirnos/`)

- H1 "Por qué elegirnos". Entradilla: "Cada razón viene con su prueba. Si algo no se puede verificar, no lo decimos."
- Planilla completa de hecho y prueba: planta propia, ISO 9001:2015, registros Invima, lote y vencimiento, 12 presentaciones, pacas de 12 a 300 unidades, bultos de 5, 12,5 y 25 kg, más de 11 años, cadenas que venden nuestras marcas (en texto hasta tener autorización para logos), despacho a toda Colombia y respuesta de cotización en un día hábil (si se confirma).
- Testimonios solo si son reales, con nombre, negocio, ciudad y autorización. Ninguno inventado.
- Cierre: "Cotizar por volumen" y "Escribir a un asesor".

### Distribución (`/distribucion/`)

- H1 "Distribución". Entradilla: "Despachamos desde Cartagena a toda Colombia. Elija su ciudad para ver el tiempo de entrega y el pedido mínimo."
- **Mapa interactivo** (injerto de Kilómetro Cero): mapa lineal con puntos de ciudad que son botones. Al elegir uno se resalta su fila y un panel `aria-live` muestra tiempo de entrega, pedido mínimo, días de despacho y el botón "Cotizar para Montería", que lleva a Cotizar con la ciudad ya puesta. La tabla de ciudades es la alternativa accesible y funciona sin el mapa.
- **Cómo llega su pedido** (secuencia real): 1 Solicitud, 2 Confirmación de precio y fecha, 3 Despacho, 4 Entrega con factura.
- "¿Su ciudad no está? Escríbanos y le decimos cómo llegar." y enlace a Dónde comprar.

```
DISTRIBUCIÓN, ESCRITORIO (/distribucion/)
+--------------------------------------------------------------------------------------------------+
| Distribución                                                                                     |
| Despachamos desde Cartagena a toda Colombia. Elija su ciudad para ver el tiempo de entrega y     |
| el pedido mínimo.                                                                                |
+-----------------------------------------------+--------------------------------------------------+
| (mapa lineal, trazo 1,75 px, Tinta café)      | Ciudad                Entrega      Pedido mínimo |
|              o Santa Marta                    | Barranquilla          24 a 48 h    00 pacas      |
|        o Barranquilla                         | Santa Marta           24 a 48 h    00 pacas      |
|    * Cartagena (planta)                       | Sincelejo             48 h         00 pacas      |
|         o Sincelejo                           | > Montería            48 a 72 h    00 pacas      |
|      o Montería      o Bucaramanga            | Medellín              3 a 5 días   00 pacas      |
|         o Medellín                            | Bucaramanga           3 a 5 días   00 pacas      |
|                o Bogotá                       | Bogotá                4 a 6 días   00 pacas      |
|       o Cali                                  | Cali                  5 a 7 días   00 pacas      |
| (punto elegido: anillo rojo de 3 px)          | (tabla = alternativa accesible del mapa)         |
+-----------------------------------------------+--------------------------------------------------+
| Montería: entrega en 48 a 72 horas desde la confirmación. Pedido mínimo: 00 pacas o 00 bultos.   |
| Despachamos martes y viernes. [ Cotizar para Montería ]                                          |
+--------------------------------------------------------------------------------------------------+
| Cómo llega su pedido: 1 Solicitud  2 Confirmación de precio y fecha  3 Despacho  4 Entrega       |
| ¿Su ciudad no está? Escríbanos y le decimos cómo llegar.        ¿Es para su casa? Dónde comprar  |
+--------------------------------------------------------------------------------------------------+

Notas:
- H1 48/52 y entradilla 21/32
- Fila de la ciudad elegida: marcador de 3 px en Rojo saco a la izquierda y texto en 700
- Panel de la ciudad elegida: se anuncia con aria-live="polite"
```

### Dónde comprar (`/donde-comprar/`)

- H1 "Dónde comprar". Entradilla: "The Cántaro y La Becerrita están en supermercados de la Costa y en Rappi."
- Lista por ciudad con las cadenas (Olímpica, Megatiendas, Mr. Bono, Rapimercar, La Garosa), en texto hasta tener autorización para usar logos. Enlace a Rappi.
- Foto C03 y C04. "¿No la encuentra? Escríbanos y le decimos dónde." "¿Tiene una tienda? Cotice por pacas."

### Contacto (`/contacto/`)

- H1 "Contacto". Canales en planilla: Escribir a un asesor (WhatsApp), teléfono, correo comercial, dirección con enlace "Cómo llegar", horario.
- Formulario "Escríbanos": motivo (Cotización, Marca propia, Petición, queja o reclamo, Proveedores, Trabaje con nosotros, Otro), nombre, celular, correo, ciudad, mensaje y autorización de datos. Si el motivo es Cotización, se sugiere "Solicitar cotización".
- Foto O07 de la fachada y retratos O06 de los asesores con su nombre.
- Sin mapa incrustado (pesa y rastrea): imagen estática del mapa con enlace externo.

### Recursos (`/recursos/`)

- H1 "Recursos". Lista de texto filtrable por tema: Para su negocio, En la cocina, Calidad y almacenamiento.
- Primeros artículos: "Cuánta leche en polvo necesita su panadería al mes", "Cómo almacenar bultos en clima cálido", "Cómo leer el lote y la fecha de vencimiento", "Cuánto rinde un kilo de leche en polvo", "Arequipe casero con leche en polvo" y "Primero lo que vence primero: rotación en la tienda". Las recetas se prueban antes de publicar.
- Plantilla de artículo: H1 48/52, entradilla, cuerpo 18/28 a 68 caracteres, tablas con cifras tabulares, "Productos mencionados" con enlace a sus fichas y un cierre según el tema ("Calcule su pedido" o "Dónde comprar"). Fotos de las familias Materia y Clientes.
- También aloja documentos descargables: fichas técnicas, certificado y catálogo en PDF.

### 404 y páginas legales

- 404: H1 "Esta página no existe." Texto: "Vuelva a Productos o escríbanos qué busca." Con el buscador y el enlace a WhatsApp.
- Política de tratamiento de datos (Ley 1581 de 2012 y su reglamentación), términos de uso y aviso de privacidad breve junto a cada formulario. Sin cookies de terceros; si se agrega analítica, que sea sin cookies o con consentimiento previo.

---

## 12. Elemento firma: la fila a escala

Las 12 presentaciones de pie sobre una misma línea base, a su altura real relativa, de la bolsita de 27 g (unos 11 cm) al bulto de 25 kg (unos 90 cm), cerca de 1:8. A la izquierda, una regla vertical en centímetros (0 a 90, marcas cada 10 cm, rótulos cada 30) mide lo que importa: la altura. Debajo de cada pieza, su peso escrito en Archivo variable, con grosor y ancho que crecen con los gramos. **La tipografía pesa lo que pesa el empaque.**

Aparece en dos lugares y en ninguno más: el hero de la Home (completa) y la ficha de producto (reducida, como selector de presentación).

### Datos por presentación

Medidas estimadas a partir de empaques típicos; se reemplazan por las medidas reales del cliente. `t` es la posición logarítmica del peso: t = ln(g / 27) / ln(25000 / 27). Se usa escala logarítmica porque con una lineal todas las bolsas quedarían igual de delgadas y solo los bultos ganarían peso.

| Presentación | Alto (cm) | Ancho (cm) | t | Escritorio wght / wdth | Móvil wght / wdth |
|---|---|---|---|---|---|
| 27 g | 11 | 8 | 0,00 | 300 / 62 | 500 / 75 |
| 104 g | 15 | 11 | 0,20 | 420 / 74 | 580 / 85 |
| 200 g | 18 | 13 | 0,29 | 480 / 80 | 620 / 90 |
| 380 g | 22 | 16 | 0,39 | 530 / 86 | 650 / 94 |
| 400 g | 22 | 16 | 0,39 | 540 / 87 | 660 / 95 |
| 500 g | 24 | 17 | 0,43 | 560 / 89 | 670 / 96 |
| 750 g | 27 | 19 | 0,49 | 590 / 93 | 690 / 99 |
| 900 g | 29 | 20 | 0,51 | 610 / 94 | 710 / 101 |
| 1000 g | 30 | 21 | 0,53 | 620 / 95 | 710 / 101 |
| 5 kg | 45 | 30 | 0,76 | 760 / 110 | 810 / 113 |
| 12,5 kg | 65 | 40 | 0,90 | 840 / 119 | 860 / 120 |
| 25 kg | 90 | 50 | 1,00 | 900 / 125 | 900 / 125 |

### Escala por ancho de pantalla

| Ancho de pantalla | Piezas | px por cm | Separación | Ancho ocupado | Alto del bulto de 25 kg |
|---|---|---|---|---|---|
| < 1024 px | 5 (27 g, 200 g, 1000 g, 5 kg, 25 kg) | 2,0 | 8 px | 336 px (cabe en 343) | 180 px |
| 1024 a 1279 px | 12 | 2,6 | 12 px | 888 px (cabe en 896) | 234 px |
| ≥ 1280 px | 12 | 3,0 | 16 px | 1.007 px (cabe en 1.152) | 270 px |

Cada columna mide como mínimo 48 px aunque la silueta sea más angosta: la bolsa de 27 g se dibuja pequeña, pero su área táctil no lo es (observación de ambos jueces).

### Comportamiento

- **Marcado:** un `fieldset` con leyenda oculta "Presentaciones" y un `input type="radio"` por presentación dentro de su `label`. Las flechas recorren las opciones de forma nativa y el lector anuncia "900 g, bolsa, 8 de 12, seleccionado". No es un `canvas`.
- **Estados:** en reposo, silueta o packshot con la cifra en Tinta café; al pasar el cursor, la silueta toma relleno Film; elegida, la cifra en Rojo saco con subrayado rojo de 3 px (color más forma, nunca solo color); con foco, contorno de 3 px en Tinta café alrededor de la columna.
- **Efecto:** en la Home, elegir actualiza la mini-ficha (`aria-live="polite"`). En la ficha, cambia la presentación, los datos de venta y la URL.
- **Regla:** decorativa (`aria-hidden="true"`), con un texto equivalente oculto: "Alturas reales aproximadas: de 11 cm (27 g) a 90 cm (25 kg)."
- **Cifras legibles:** en pantallas menores de 1024 px la cifra mide 18 px y su peso mínimo es 500 (observación del juez 2).
- **Respaldo:** siluetas SVG monolínea mientras no existan los packshots calibrados (F01 y F04); se reemplazan una por una. Si falla el JavaScript, la fila se ve completa y el `fieldset` es un formulario GET con el botón "Ver en Productos", que abre `/productos/?peso=900-g`.
- **Implementación:** cada `li` recibe `--alto-cm`, `--ancho-cm` y `--t`. La columna mide `max(var(--fila-min-col), calc(var(--ancho-cm) * var(--fila-escala)))`, la imagen se alinea abajo con alto `calc(var(--alto-cm) * var(--fila-escala))`, y la cifra usa `font-weight` y `font-stretch` calculados con `--t`.

---

## 13. Microcopy clave

### Glosario (siempre las mismas palabras)

| Término | Significa | Nunca decir |
|---|---|---|
| Presentación | El peso o formato: 27 g, 900 g, 25 kg | Tamaño, SKU |
| Referencia | Un producto en una presentación: The Cántaro entera 900 g | Ítem |
| Paca / bulto | Unidad de venta de bolsas / saco de 5, 12,5 o 25 kg | Caja, saco (como unidad de venta) |
| Mi cotización | La lista que arma el comprador | Carrito, pedido, comprar, pagar |
| Solicitar cotización | La acción de pedir precio | Enviar pedido, checkout |
| Asesor | La persona que responde | Agente, bot |
| Rinde cerca de | Litros preparados con la dosis de la etiqueta | Rinde hasta |

### Textos por lugar

**Cabecera y navegación**
- Buscador: etiqueta "Buscar productos"; ejemplo "Marca, gramos o código".
- "Escribir a un asesor" (abre WhatsApp; nombre accesible "Escribir a un asesor por WhatsApp").
- "Cotizar" o "Cotizar (3)"; nombre accesible "Cotizar, 3 referencias en su cotización".
- "¿Es para su casa? Dónde comprar".

**Hero**
- Titular: "Leche en polvo empacada en Cartagena, de 27 gramos a 25 kilos."
- Bajada: "Surtimos tiendas, panaderías, supermercados e industria en toda Colombia, con The Cántaro, La Becerrita o la marca de su cadena."
- Botones: "Cotizar por volumen" (primario) y "Ver productos".
- Pista de la fila: "Toque una presentación para ver cuántas vienen por paca y cuánto rinde."
- Mini-ficha (plantilla): "900 g: paca de 24 bolsas, 21,6 kg. Rinde cerca de 6,9 L por bolsa. Disponible en The Cántaro entera y La Becerrita entera." Enlace: "Ver 900 g en Productos".
- Mini-ficha de bulto: "25 kg: bolsa de polietileno y saco kraft triple. Rinde cerca de 192 L."
- Móvil: "Ver las 12 presentaciones".

**¿Qué necesita?**
- "Para su negocio": "Supermercados y cadenas: surtido o marca propia", "Distribuidores y mayoristas: pacas de 12 a 300 unidades", "Panaderías e industria: bultos de 5, 12,5 y 25 kg".
- "Para su casa": "Encuéntrenos en Olímpica, Megatiendas, Mr. Bono, Rapimercar, La Garosa y Rappi." Enlace: "Ver dónde comprar".

**Rinde y calculadora**
- "26 g en 200 ml de agua preparan un vaso. Un kilo rinde cerca de 7,7 litros."
- Campos: "Producto", "Litros de leche que prepara al día", "Días de trabajo al mes".
- Resultado: "Necesita cerca de 34 kg al mes: 1 bulto de 25 kg y 2 de 5 kg (35 kg)."
- Botón: "Agregar estos bultos a la cotización".

**Hecha para el calor**
- "No necesita nevera. Cerrada, en un lugar seco y a la sombra, dura 12 meses: aguanta la ruta, la bodega y la tienda de barrio."

**Productos**
- Entradilla: "12 presentaciones de leche en polvo, en bolsa y bulto. El precio por volumen llega con la cotización."
- Conteo: "7 referencias de 2 productos". Orden: "Peso, de menor a mayor".
- Chip: "The Cántaro, quitar filtro". "Quitar filtros".
- Cantidad: nombre accesible "Pacas de The Cántaro entera 900 g". Cálculo: "= 240 bolsas, 216,0 kg".
- Botón "Agregar". Estado "Agregado". Acción "Quitar".
- Aviso: "Agregado a la cotización: The Cántaro entera 900 g, 10 pacas." Enlace: "Ver cotización".
- Sin resultados de filtros: "No hay La Becerrita en bulto de 5 kg. Sí la hay en 25 kg." Botón: "Ver La Becerrita 25 kg".
- Sin resultados de búsqueda: "No encontramos «cantaro 700». La presentación más cercana es 750 g." Botón: "Ver The Cántaro 750 g".

**Ficha**
- "Registro Invima RSA-000000-0000. Consultar".
- "Cantidad", "Agregar a la cotización", "Preguntar por WhatsApp".
- "Descargar ficha técnica (PDF, 180 KB)".
- "¿Es para su casa? Vea dónde comprar."

**Mi cotización**
- Totales: "330 bolsas en 13 pacas y 2 bultos. Total 302,0 kg".
- "Solicitar cotización", "Enviar por WhatsApp", "Copiar enlace", "Imprimir o guardar en PDF", "Vaciar la cotización".
- Enlace copiado: "Enlace copiado. Quien lo abra verá esta misma cotización."
- Vaciada: "Cotización vaciada." Acción: "Deshacer".
- Nota: "Esto no es un pago: es una solicitud de cotización."
- Vacía: "Su cotización está vacía. Elija presentaciones en Productos o escríbanos qué necesita."
- Repetir: "Repetir mi última solicitud (25 sep: 3 referencias, 302,0 kg)".
- Compartida: "Un asesor preparó esta cotización para usted: 3 referencias, 302,0 kg." Botones: "Usar esta cotización" y "Conservar la mía".
- Almacenamiento bloqueado: "Este navegador no deja guardar la cotización. Envíela antes de cerrar la página o copie el enlace."

**Solicitar cotización**
- Pasos: "Paso 1 de 3: Productos", "Paso 2 de 3: Entrega", "Paso 3 de 3: Contacto".
- Botones: "Continuar con entrega", "Continuar con contacto", "Enviar solicitud de cotización". Mientras envía: "Enviando solicitud".
- Ayuda de ciudad: "Con su ciudad calculamos el despacho desde Cartagena."
- Campo libre: "¿Necesita algo que no está en el catálogo? Escríbalo aquí."
- Consentimiento: "Autorizo a Inversiones Mundilácteos S.A.S. a tratar mis datos para responder esta solicitud, según su política de datos (Ley 1581 de 2012)."
- Errores: "Escriba un celular de 10 dígitos, por ejemplo 300 123 4567." / "Revise el correo: le falta la @ o el dominio, por ejemplo nombre@empresa.com." / "Elija su ciudad para calcular el despacho." / "Escriba el NIT solo con números, sin dígito de verificación." / "Para enviar la solicitud, autorice el tratamiento de sus datos." / "La cantidad mínima es 1 paca."
- Resumen de errores: "Revise 2 campos antes de enviar." con enlaces a cada campo.
- Confirmación: "Solicitud enviada." "Yesenia, del equipo comercial, le escribe hoy antes de las 5:00 p. m. por WhatsApp o correo." "Número de solicitud: MDL-0426. Recibida el jueves 25 de septiembre a las 10:42 a. m." (nombre, hora y número son datos del sistema; el nombre es un ejemplo).
- Fuera de horario: "Recibimos su solicitud fuera del horario de atención. Un asesor le escribe el lunes antes de las 10:00 a. m."
- Fallo: "No se pudo enviar la solicitud. Revise su conexión e intente de nuevo. Su cotización sigue guardada y también puede enviarla por WhatsApp."

**Mensajes prellenados de WhatsApp**
- General: "Hola, quiero cotizar leche en polvo para mi negocio."
- Desde la ficha: "Hola, quiero información de The Cántaro entera 900 g."
- Cotización: "Hola, quiero cotizar: The Cántaro entera 900 g, 10 pacas (216,0 kg); La Becerrita entera 25 kg, 2 bultos (50,0 kg). Ciudad: Montería. Negocio: panadería."

**Otras páginas**
- Distribución: "Despachamos desde Cartagena a toda Colombia. Elija su ciudad para ver el tiempo de entrega y el pedido mínimo." Panel: "Montería: entrega en 48 a 72 horas desde la confirmación. Pedido mínimo: 00 pacas o 00 bultos." "¿Su ciudad no está? Escríbanos y le decimos cómo llegar."
- Marca propia: "Empacamos leche en polvo con la marca de su cadena, en la presentación que necesite." Botón "Pedir muestras y costos". "No publicamos las marcas que empacamos sin autorización escrita."
- Calidad: "Cada bolsa lleva impresos el lote y la fecha de vencimiento." "¿Encontró un problema con un producto? Tenga a mano el lote y escríbanos."
- Nosotros: "Somos una empresa familiar de Cartagena y llevamos más de 11 años empacando leche en polvo."
- Por qué elegirnos: "Cada razón viene con su prueba. Si algo no se puede verificar, no lo decimos."
- Pie: "Industria colombiana. Empacamos en Cartagena."
- 404: "Esta página no existe. Vuelva a Productos o escríbanos qué busca."

---

## 14. Tokens CSS

```css
/* Concepto 2: Peso neto. Tokens base, móvil primero. */

@font-face {
  font-family: "Archivo";
  src: url("/fuentes/archivo-latin-var.woff2") format("woff2");
  font-weight: 100 900;
  font-stretch: 62% 125%;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193,
    U+2212, U+2215, U+FEFF, U+FFFD;
}

:root {
  color-scheme: light;

  /* Color: primitivos */
  --c-blanco-bolsa: #FFFFFF;
  --c-film: #ECEEEB;
  --c-kraft: #D3B48A;
  --c-tinta-cafe: #3A2618;
  --c-tinta-suave: #66574B;
  --c-rojo-saco: #A8171F;
  --c-rojo-saco-oscuro: #8A1219;
  --c-linea: #D6D2CB;

  /* Color: roles */
  --color-fondo: var(--c-blanco-bolsa);
  --color-panel: var(--c-film);
  --color-zona-negocio: var(--c-kraft);
  --color-texto: var(--c-tinta-cafe);
  --color-texto-secundario: var(--c-tinta-suave);     /* nunca sobre Kraft */
  --color-borde-control: var(--c-tinta-suave);        /* 6,93:1 sobre Blanco */
  --color-borde-fuerte: var(--c-tinta-cafe);
  --color-divisor: var(--c-linea);                    /* decorativo */
  --color-accion: var(--c-rojo-saco);
  --color-accion-hover: var(--c-rojo-saco-oscuro);
  --color-sobre-accion: var(--c-blanco-bolsa);
  --color-seleccion: var(--c-rojo-saco);
  --color-error: var(--c-rojo-saco);                  /* siempre con icono y texto */
  --color-chip-activo-fondo: var(--c-tinta-cafe);
  --color-chip-activo-texto: var(--c-blanco-bolsa);
  --color-foco: var(--c-tinta-cafe);
  --color-pie-fondo: var(--c-tinta-cafe);
  --color-pie-texto: var(--c-film);
  --color-pie-enlace: var(--c-kraft);
  --color-pie-foco: var(--c-kraft);
  --color-resaltado: rgb(211 180 138 / 0.45);         /* línea recién agregada */
  --color-velo: rgb(58 38 24 / 0.48);                 /* detrás de hojas y paneles */

  /* Tipografía */
  --fuente: "Archivo", "Archivo Fallback", Arial, sans-serif;
  --fs-14: 0.875rem;  --lh-14: 1.25rem;
  --fs-16: 1rem;      --lh-16: 1.5rem;
  --fs-18: 1.125rem;  --lh-18: 1.75rem;
  --fs-21: 1.3125rem; --lh-21: 2rem;
  --fs-24: 1.5rem;    --lh-24: 1.875rem;
  --fs-36: 2.25rem;   --lh-36: 2.5rem;
  --fs-48: 3rem;      --lh-48: 3.25rem;
  --fs-60: 3.75rem;
  --fs-72: 4.5rem;

  --hero-fs: var(--fs-48);  --hero-lh: 1;            --hero-wdth: 62%;  --hero-wght: 800;
  --h1-fs: var(--fs-36);    --h1-lh: var(--lh-36);   --h1-wdth: 72%;    --h1-wght: 800;
  --h2-fs: var(--fs-24);    --h2-lh: var(--lh-24);   --h2-wdth: 75%;    --h2-wght: 800;
  --h3-fs: var(--fs-21);    --h3-lh: 1.75rem;        --h3-wdth: 100%;   --h3-wght: 700;
  --entradilla-fs: var(--fs-21); --entradilla-lh: var(--lh-21);
  --cuerpo-fs: var(--fs-18);     --cuerpo-lh: var(--lh-18);
  --ui-fs: var(--fs-16);         --ui-lh: var(--lh-16);
  --meta-fs: var(--fs-14);       --meta-lh: var(--lh-14);
  --datos-wdth: 85%;  --datos-wght: 600;
  --medida-texto: 68ch;

  /* Fila a escala */
  --fila-escala: 2px;               /* px por centímetro real */
  --fila-min-col: 48px;
  --fila-separacion: 8px;
  --fila-cifra-fs: var(--fs-18);
  --fila-wght-min: 500;  --fila-wght-max: 900;
  --fila-wdth-min: 75;   --fila-wdth-max: 125;

  /* Espacio (base 4 px) */
  --esp-1: 0.25rem;  --esp-2: 0.5rem;  --esp-3: 0.75rem;  --esp-4: 1rem;
  --esp-5: 1.5rem;   --esp-6: 2rem;    --esp-7: 3rem;     --esp-8: 4rem;   --esp-9: 6rem;
  --seccion: var(--esp-8);

  /* Retícula */
  --contenedor: 82rem;              /* 1312 px */
  --margen: 1rem;
  --canal: 1rem;
  --columnas: 4;
  --cotizacion-ancho: 19rem;        /* 304 px, columna fija desde 1440 px */

  /* Forma */
  --radio-0: 0;                     /* fotos, secciones, paneles */
  --radio-control: 4px;             /* botones, campos, chips */
  --radio-hoja: 8px;                /* esquinas superiores de hojas inferiores */
  --borde-control: 1px solid var(--color-borde-control);
  --borde-divisor: 1px solid var(--color-divisor);
  --subrayado-activo: 3px;
  --sombra-hoja: 0 -8px 24px rgb(58 38 24 / 0.18);   /* única sombra de interfaz */

  /* Interacción */
  --objetivo-tactil: 48px;
  --separacion-tactil: 8px;
  --foco-ancho: 3px;
  --foco-separacion: 2px;
  --cabecera-alto: 56px;
  --utilidad-alto: 0px;
  --barra-inferior-alto: 64px;

  /* Movimiento */
  --dur-rapida: 120ms;
  --dur-cambio: 150ms;
  --dur-seleccion: 160ms;
  --dur-pieza: 200ms;
  --dur-hoja: 220ms;
  --dur-panel: 240ms;
  --dur-resaltado: 600ms;
  --escalon-fila: 40ms;
  --curva-salida: cubic-bezier(0.2, 0.7, 0.2, 1);
  --curva-estandar: cubic-bezier(0.4, 0, 0.2, 1);

  /* Capas */
  --z-cabecera: 50;
  --z-barra-inferior: 60;
  --z-velo: 70;
  --z-hoja: 80;
  --z-aviso: 90;
}

@media (min-width: 600px) {
  :root {
    --margen: 2rem; --canal: 1.5rem; --columnas: 8;
    --hero-fs: var(--fs-60); --hero-wdth: 66%;
  }
}

@media (min-width: 1024px) {
  :root {
    --margen: 4rem; --columnas: 12; --seccion: var(--esp-9);
    --cabecera-alto: 72px; --utilidad-alto: 40px; --barra-inferior-alto: 0px;
    --h1-fs: var(--fs-48); --h1-lh: var(--lh-48);
    --h2-fs: var(--fs-36); --h2-lh: var(--lh-36);
    --h3-fs: var(--fs-24); --h3-lh: var(--lh-24);
    --fila-escala: 2.6px; --fila-separacion: 12px;
    --fila-cifra-fs: var(--fs-24);
    --fila-wght-min: 300; --fila-wdth-min: 62;
  }
}

@media (min-width: 1280px) {
  :root {
    --hero-fs: var(--fs-72); --hero-wdth: 68%;
    --fila-escala: 3px; --fila-separacion: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-rapida: 0ms; --dur-cambio: 0ms; --dur-seleccion: 0ms; --dur-pieza: 0ms;
    --dur-hoja: 0ms; --dur-panel: 0ms; --dur-resaltado: 0ms; --escalon-fila: 0ms;
  }
}

/* Uso base */
html { background: var(--color-fondo); color: var(--color-texto); }
body {
  font-family: var(--fuente);
  font-size: var(--cuerpo-fs);
  line-height: var(--cuerpo-lh);
  font-stretch: 100%;
  font-weight: 400;
  background: var(--color-fondo);
}
:focus-visible {
  outline: var(--foco-ancho) solid var(--color-foco);
  outline-offset: var(--foco-separacion);
}
.cifra, table td.num {
  font-stretch: var(--datos-wdth);
  font-weight: var(--datos-wght);
  font-variant-numeric: tabular-nums;
  text-align: right;
}
.fila-escala li {
  flex: 0 0 max(var(--fila-min-col), calc(var(--ancho-cm) * var(--fila-escala)));
}
.fila-escala .figura { block-size: calc(var(--alto-cm) * var(--fila-escala)); }
.fila-escala .cifra-fila {
  font-size: var(--fila-cifra-fs);
  font-weight: calc(var(--fila-wght-min) + (var(--fila-wght-max) - var(--fila-wght-min)) * var(--t));
  font-stretch: calc((var(--fila-wdth-min) + (var(--fila-wdth-max) - var(--fila-wdth-min)) * var(--t)) * 1%);
}
@media (forced-colors: active) {
  .fila-escala input:checked ~ .cifra-fila { text-decoration: underline 3px; }
}
```

Componentes base con estos tokens:

- **Botón primario:** fondo `--color-accion`, texto `--color-sobre-accion` 16/24 wght 600, alto mínimo 48 px, relleno de 12 por 20 px, `--radio-control`, sin sombra. Hover y presionado: `--color-accion-hover`.
- **Botón secundario:** sin relleno, borde de 2 px en Tinta café, mismo tamaño.
- **Enlace:** Tinta café subrayado (1 px, separación 3 px); en hover el subrayado pasa a 2 px. Sin flechas añadidas al texto.
- **Campo:** fondo Blanco, `--borde-control`, alto de 48 px, etiqueta visible arriba en 16/24 wght 500; error con borde de 2 px en Rojo saco, icono y mensaje debajo.
- **Chip de filtro:** borde Tinta suave, `--radio-control`, alto de 40 px dentro de un área táctil de 48 px; activo con fondo Tinta café y texto Blanco.

---

## 15. Reglas de accesibilidad

Objetivo: WCAG 2.2 nivel AA en todo el sitio, AAA en el contraste del texto principal.

1. **Contraste:** solo los pares aprobados en 4.2. Texto sobre Kraft siempre en Tinta café. Rojo sobre Kraft solo a 24 px o más.
2. **Nunca solo color:** estado elegido con subrayado, error con icono y texto, enlace activo con subrayado, ciudad elegida con marcador y peso 700.
3. **Foco visible** en todo elemento interactivo (3 px, separación de 2 px); nunca `outline: none` sin reemplazo. El foco no queda tapado por la cabecera fija ni por la barra inferior (`scroll-padding` con sus altos).
4. **Objetivos táctiles** de 48 px como mínimo con 8 px de separación, incluidas las columnas de la fila a escala, los chips y los controles de cantidad.
5. **Teclado:** todo se opera sin ratón. Radios nativos en la fila y en el selector de presentación; combobox con flechas, Enter y Escape en el buscador; hojas y paneles con foco atrapado, cierre con Escape y retorno del foco al botón que los abrió.
6. **Anuncios:** conteo de resultados, mini-ficha, totales de la cotización, resultado de la calculadora y panel de ciudad en `aria-live="polite"`; errores de envío en `role="alert"`.
7. **Formularios:** etiqueta visible en cada campo (el ejemplo nunca sustituye la etiqueta), `autocomplete` e `inputmode` correctos, errores asociados con `aria-describedby`, resumen de errores con enlaces y foco en el primero. La confirmación mueve el foco a su título.
8. **Estructura:** `lang="es-CO"`, un H1 por página, jerarquía de títulos sin saltos, `nav`, `main` y `footer` con nombres, migas en `nav aria-label="Migas de pan"`, enlace "Saltar al contenido".
9. **Tablas:** tablas HTML reales con `caption`, `th` y `scope`. En móvil se apilan en bloques sin perder las etiquetas de cada dato.
10. **Imágenes:** texto alternativo que describe lo útil ("Bolsa de The Cántaro entera de 900 g, frente"); las decorativas llevan `alt=""`. La regla y las siluetas decorativas, `aria-hidden`.
11. **Mapa:** los puntos son botones con nombre; la tabla de ciudades es la alternativa completa y funciona sola.
12. **Movimiento:** se respeta `prefers-reduced-motion`; nada parpadea más de 3 veces por segundo; nada se mueve solo más de 5 segundos.
13. **Zoom y reflujo:** sin scroll horizontal a 320 px de ancho ni al 200 % de zoom; el texto crece con la configuración del navegador (tamaños en rem).
14. **Tipografía:** cuerpo de 18 px, mínimo de 14 px, cifras de la fila en móvil con peso mínimo de 500, medida de 60 a 72 caracteres.
15. **Modo de alto contraste:** probar con `forced-colors: active`; la selección de la fila y los chips activos conservan un indicador visible.
16. **Idioma y cifras:** coma decimal y unidades con espacio no separable para que el lector de pantalla lea "doce coma cinco kilogramos".
17. **Enlaces externos y archivos:** se anuncian ("abre WhatsApp", "PDF, 180 KB"). Las fichas técnicas existen también en HTML.
18. **Pruebas antes de publicar:** axe sin errores, navegación completa con teclado, NVDA con Firefox y VoiceOver con Safari en iOS, TalkBack en un Android de gama media.

---

## 16. Implementación estática en Hostinger

- Sitio generado como HTML estático (por ejemplo con Eleventy) a partir de `datos/catalogo.json` (productos, presentaciones, medidas, paca, rinde, registros), `datos/cobertura.json` (ciudades, tiempos, mínimos) y `datos/atencion.json` (horario, festivos, asesores). Cada ficha y cada presentación salen prerenderizadas para buscadores.
- Despliegue en `public_html` por Git o FTP. `.htaccess` con URL limpias, redirecciones 301 desde WordPress, caché larga para fuentes e imágenes y compresión.
- Formularios: script PHP con SMTP de Hostinger, campo trampa, límite por IP y validación en el servidor. Alternativa: servicio de formularios. Respaldo: WhatsApp con mensaje prellenado.
- Presupuesto de carga: fuente de 88 KB, CSS de 25 KB o menos y JavaScript de 35 KB o menos (comprimidos), sin jQuery ni librerías de animación. Objetivo: LCP por debajo de 2,5 s en 4G y Lighthouse de 95 o más en rendimiento y accesibilidad.
- Datos estructurados: `Organization`, `LocalBusiness` y `Product` en JSON-LD; `sitemap.xml`; imagen para compartir por ficha.
- `localStorage` y `sessionStorage` siempre dentro de `try/catch`; el sitio funciona completo si están bloqueados.

---

## 17. Qué NO hacer

1. Vaca en potrero, salpicaduras de leche, gotas, vasos rebosantes ni el globo del logo actual.
2. Azul y blanco lácteo, degradados decorativos, bandera tricolor, murallas, balcones, palmeras o mar turquesa.
3. Fotos de banco de imágenes o de personas posando.
4. Fondo crema o beige: la superficie es Blanco bolsa.
5. Kraft fuera de las zonas de venta por volumen, o Kraft con textura de papel.
6. Rojo en áreas grandes, rojo sobre Tinta café, texto pequeño rojo sobre Kraft, Tinta suave sobre Kraft.
7. Cuadrículas de tarjetas iguales con esquinas redondeadas y la misma sombra gris; el catálogo es una planilla.
8. Rótulos en mayúsculas sobre los títulos, etiquetas en mayúsculas sostenidas, cadenas de datos unidas con punto medio, flechas añadidas a botones y enlaces, fuente monoespaciada para datos.
9. Numeración 01, 02, 03 donde no hay secuencia. Solo llevan números Así empacamos, Cómo trabajamos, Cómo llega su pedido, la historia y los pasos de la cotización.
10. Una cifra gigante con etiqueta pequeña como hero, o franjas de "12 años, 32 departamentos".
11. Revelados al hacer scroll, parallax, carruseles automáticos, tarjetas que suben al pasar el cursor, animación del ancho tipográfico.
12. Un segundo elemento audaz, o la fila a escala repetida como adorno en otras secciones.
13. Palabras de comercio electrónico: carrito, comprar, pagar, checkout. No se muestran precios.
14. Llamar leche a una mezcla con endulzante: cada referencia usa la denominación exacta de su registro Invima.
15. Publicar sellos, certificados, registros, cifras de rinde, pacas, tiempos o mínimos sin verificarlos con el cliente.
16. Mostrar logos de cadenas o bolsas de marca propia sin autorización escrita.
17. Prometer tiempos de respuesta que no salgan del horario configurado.
18. Burbuja flotante de WhatsApp, ventanas emergentes de bienvenida o chat automático.
19. Tomar referencias de sitios de otras marcas del sector.
20. Mapa con pines o flechas de ruta inventadas.

---

## 18. Datos que debe entregar o confirmar el cliente

- Denominación exacta, número y vigencia del registro Invima de cada referencia.
- Qué combinaciones existen (producto por presentación) y cuáles tipos hay en bulto.
- Unidades por paca, peso y medidas de paca, pacas por estiba y código de barras de cada presentación.
- Alto y ancho reales de las 12 presentaciones (para la fila a escala).
- Dosis de preparación de cada producto (para el rinde).
- Certificado ISO 9001:2015: organismo, número, alcance y vigencia.
- Ciudades de despacho, tiempos de entrega, pedido mínimo y días de despacho.
- Horario de atención, asesores y compromiso real de tiempo de respuesta.
- Condiciones de almacenamiento de la ficha técnica (valida o descarta "Hecha para el calor").
- Autorizaciones de las cadenas para nombres, logos y fotos de góndola, y de marca propia.
- Historia: año de fundación, fundadores, hitos, número de empleados.
- NIT, dirección exacta, teléfonos, WhatsApp comercial y correo.
- URL actuales del sitio en WordPress para las redirecciones.

---

## 19. Puntajes de los jueces e injertos

### Puntajes

| Propuesta (ángulo) | Juez | Diferenciación | Ajuste al brief | Conversión B2B | Atractivo consumidor | Accesibilidad | Viabilidad estática | Suma |
|---|---|---|---|---|---|---|---|---|
| Peso neto (materia) | 1 | 8,5 | 8,5 | 8,5 | 6,5 | 9 | 8,5 | 49,5 |
| Peso neto (materia) | 2 | 9 | 9 | 8 | 7 | 8 | 8 | 49,0 |
| Kilómetro Cero (lugar) | 1 | 8 | 8 | 7,5 | 7,5 | 8,5 | 7,5 | 47,0 |
| Kilómetro Cero (lugar) | 2 | 8 | 8 | 7 | 7 | 8 | 7 | 45,0 |
| Nota de pedido (servicio) | 1 | 7 | 8 | 9,5 | 5,5 | 9 | 8 | 47,0 |
| Nota de pedido (servicio) | 2 | 7 | 8 | 9 | 5 | 9 | 8 | 46,0 |

| Propuesta | Juez 1 | Juez 2 | Total (de 120) | Resultado |
|---|---|---|---|---|
| **Peso neto** | 49,5 | 49,0 | **98,5** | Base. Ganadora para ambos jueces |
| Nota de pedido | 47,0 | 46,0 | 93,0 | Donante de la herramienta de cotización |
| Kilómetro Cero | 47,0 | 45,0 | 92,0 | Donante de calidez, lugar y cobertura |

### Qué se injertó y qué no

| De | Injertado | Dónde vive | Descartado y por qué |
|---|---|---|---|
| Nota de pedido | Mi cotización persistente con totales en bolsas, pacas, bultos y kilos | Productos (columna o franja), hoja móvil, Cotizar | La nota de papel kraft con perforación, grano y sello de goma: esqueuomorfismo conocido y un segundo gesto que competiría con la fila |
| Nota de pedido | Cantidad en cada fila del catálogo con cálculo en vivo | Planilla de Productos | El nombre "nota": se mantiene "cotización", más claro para el comprador |
| Nota de pedido | Buscador tolerante a tildes y sinónimos sobre JSON, visible en la cabecera | Cabecera, Productos, menú móvil | Atkinson Hyperlegible como segunda familia: el cuerpo a 18 px con Archivo resuelve la legibilidad con una sola fuente |
| Nota de pedido | Copiar enlace, Repetir mi última solicitud, Imprimir o guardar en PDF, respaldo en memoria | Mi cotización | Barra inferior de 4 pestañas: se usa una de 3 (Buscar, WhatsApp, Cotizar) |
| Nota de pedido | Marca propia como destino del menú | Menú, página propia | La herramienta como hero: el hero es la fila a escala |
| Nota de pedido | "Esto no es un pago: es una solicitud de cotización" | Junto a cada envío | Paleta azul petróleo y verde: se acerca a la paleta típica del sector |
| Nota de pedido | Confirmación con nombre y hora tomados de un horario configurable | Cotizar | Sello rojo animado "Recibido": el momento orquestado sigue siendo la carga de la fila |
| Nota de pedido | "Por qué elegirnos" como lo que se puede verificar, con enlaces a certificado y registros | Home, Por qué elegirnos, Calidad | |
| Nota de pedido | Sin resultados con la alternativa real y un botón | Productos, búsqueda | |
| Kilómetro Cero | "Hecha para el calor" (sujeto a la ficha técnica) | Home | La vía desde el Km 0, las placas viales y el amarillo: hablan de logística, no de leche |
| Kilómetro Cero | "¿Qué necesita?" por tipo de comprador | Home, debajo de la fila | Monograma M-vía: se lee como marca de transporte |
| Kilómetro Cero | Cada razón con su prueba enlazada | Por qué elegirnos | Overpass como segunda familia y Archivo expandida en titulares: desborda a 360 px |
| Kilómetro Cero | Cobertura interactiva con tiempo y pedido mínimo, con tabla equivalente | Distribución | Anclar un SVG al punto del H1: frágil con zoom y cortes de línea |
| Kilómetro Cero | Filtros en la URL | Productos | Mosaico asimétrico de la home: coquetea con las tarjetas |
| Kilómetro Cero | Fotografía de clientes reales con luz de la Costa | Familia Clientes (C01 a C05) | |
| Kilómetro Cero | Mensaje de fallo que confirma que la lista sigue guardada | Cotizar | |

### Ajustes a la base por observaciones de los jueces

| Observación | Juez | Ajuste |
|---|---|---|
| Tinta café `#2E2118` cerca del negro teñido genérico | 1 | Cambia a `#3A2618`, más saturada; todos sus pares siguen en AAA |
| La bolsa de 27 g queda diminuta en móvil | 1 y 2 | Columnas de 48 px como mínimo, independientes del dibujo |
| Cifras de 300 y ancho 62 ilegibles a tamaño pequeño | 2 | En móvil, cifras de 18 px con peso mínimo de 500 y ancho mínimo de 75 |
| Sin buscador | 2 | Buscador visible en cabecera y Productos |
| La cantidad solo se elegía en la ficha | 2 | Control de cantidad en cada fila de la planilla |
| Tono frío de planilla para el consumidor | 1 y 2 | Fotografía de Clientes, "Hecha para el calor", bloque Para su casa, página Dónde comprar y recetas en Recursos |
| El kraft con rojo puede leerse como artesanal o como el rojo de una cadena | 1 | Blanco dominante (75 %), rojo solo en botón y selección, fotografía de planta y tablas precisas que anclan el tono industrial |
| Dependencia de 12 packshots y medidas reales | 2 | Siluetas SVG de respaldo y tabla de medidas estimadas para reemplazar |
| Densidad de tres columnas a 1280 px (señalada en Nota de pedido) | 2 | La columna de cotización aparece desde 1440 px; por debajo es una franja con panel lateral |

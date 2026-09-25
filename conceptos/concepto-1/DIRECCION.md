# Concepto 1: Paralelo 10

> Usa exclusivamente la paleta de marca de `/conceptos/compartido/MARCA.md`. En este concepto manda el azul (Azul Mundilácteos y Azul noche en bandas y titulares); el verde marca la acción y la confirmación. Aplica `/conceptos/compartido/EXPERIENCIA.md` (movimiento, profundidad y tipografía) y cumple los 20 criterios de `/conceptos/compartido/TENDENCIAS.md`.

Dirección final del Concepto 1 para el nuevo sitio de Inversiones Mundilácteos S.A.S. Sirve de guía para diseño, desarrollo y producción de contenido. Versión 1, 25 de septiembre de 2026.

**Cómo se construyó.** La base es la propuesta **Paralelo 10** (ángulo origen y confianza), que obtuvo el mayor puntaje sumado de los dos jueces: 137 de 160, frente a 134 de **A la orden** (ángulo catálogo y servicio). A la base se le injertaron nueve piezas de A la orden que la fortalecen sin sumar un segundo gesto audaz ni traer rasgos del Concepto 2 (sección 20). Antes de aprobar, los jueces pidieron corregir un conflicto geométrico del hero: el titular no cabía en la franja blanca del globo y habría quedado sobre las fotos. Se rediseñó la geometría y se comprobó con una maqueta en Chromium en 11 tamaños de pantalla, de 320 a 1.920 px; el titular queda sobre blanco en todos (sección 13; archivos en `conceptos/concepto-1/verificacion-hero/`). La inspiración viene de los competidores más fuertes del sector (sección 4), tomada con sutileza y sin copiar sus layouts. De ui-ux-pro-max se adoptaron tres pautas de UX (chips que se ajustan en varias filas, tablas con primera columna fija y `inputmode` en campos numéricos); sus parejas tipográficas (Cormorant con Montserrat, EB Garamond con Crimson Text, Playfair Display con Source Serif 4 y JetBrains Mono) responden a registros de lujo, academia o editorial y se descartaron. Todo dato marcado como *dato a confirmar* sale de `conceptos/compartido/catalogo.js` y no se publica sin el soporte del cliente.

---

## 1. Nombre del concepto

**Paralelo 10.** La planta de Mundilácteos está en el Parque Industrial Europark, en Turbaco, cerca del paralelo 10 de latitud norte. El sitio convierte el activo más reconocible de la marca, el globo de franjas del logo, en su gesto visual: las franjas se leen como paralelos, y en el paralelo 10, la franja blanca del medio, corre el titular. Así como el nombre cruza el globo en el logo actual, el titular cruza el globo en la portada.

## 2. Enfoque

Mundilácteos se presenta desde un origen que se puede comprobar: una planta con dirección, personas con nombre y cargo, y cinco registros sanitarios vigentes con su número a la vista. Manda el azul, el verde queda para lo que la persona hace (cotizar, agregar) y para lo que se confirma (verificado, agregado), y una grotesca expandida, ancha como un horizonte, convive con una serif de lectura que da el tono de documento honesto.

## 3. Idea central

**De Turbaco, con nombre y registro.**

Cada producto y cada afirmación del sitio remite a tres anclas que cualquiera puede comprobar:

- **Un lugar:** la planta en Europark, km 1 de la vía a Turbaco, con «Cómo llegar» y «Solicitar visita a la planta».
- **Personas:** quién empaca, quién controla la calidad y quién atiende cada zona, con nombre, cargo y retrato autorizado.
- **Un registro:** el número INVIMA con su vigencia y un botón para verificarlo.

La confianza no se pide con adjetivos, medallas ni fotos de vacas: se muestra el origen y se le da a la persona la herramienta para comprobarlo.

Tres principios ordenan las decisiones:

1. **Origen a la vista.** Toda página responde dónde se hace, quién lo hace y qué lo respalda. Si un dato está por confirmar (ISO 9001:2015, tiempos de entrega, número de empleados, año de fundación), no se publica hasta tener el soporte, y el diseño funciona sin él.
2. **Comprobable en un gesto.** Junto a cada dato hay un verbo que lo verifica: Verificar, Copiar número, Ver en datos.gov.co, Descargar ficha técnica, Cómo llegar. Nunca un sello sin número, ente y vigencia.
3. **Una sola audacia.** El globo de paralelos del hero es lo memorable. Todo lo demás es azul, ordenado y sereno; la calidez la ponen las personas reales de las fotos y una voz que trata de usted sin distancia.

El orgullo colombiano se expresa con hechos: industria de la Costa, empleo en Turbaco y despacho a todo el país. Se evitan el folclor de postal, las murallas y el habla impostada.

---

## 4. Lo que hacen bien los competidores y cómo lo superamos

Revisión hecha sobre las capturas de `auditoria/capturas/competidores/<slug>/`. Se toma la práctica, no el layout ni el estilo.

| Competidor | Lo que hace bien | Cómo lo superamos |
|---|---|---|
| **Alpina** (alpina.com) | Historia por eras con año gigante y fotos de archivo reales (`nosotros-desktop-fold.jpg`). Página de canales con cifras por canal. Filtros con conteo por presentación. SKU y EAN visibles en la ficha. Contacto que clasifica por perfil e incluye «Solicitud de visitas a la planta». | La historia de Mundilácteos es corta (desde 2011, dato a confirmar) y no se estira en eras: el relato es presente y verificable. Registros y normas van en HTML con enlace; Alpina los tiene en un PDF hecho imagen. Toda cifra sale de un único archivo de datos con fuente y fecha, sin contradicciones como su «72 frente a 80 años». Se mantienen el conteo en los filtros y el EAN, y se suma el registro INVIMA verificable. La portada pesa 500 KB o menos, frente a 11 MB y un LCP de 6,1 s. La visita a la planta pasa a ser un botón de la sección Planta. |
| **Alquería** (alqueria.com.co) | Página propia de certificaciones con fotos reales de planta y operarios (`certificaciones-desktop.jpg`). Cadena de valor en pasos y mapa de plantas (`donde-estamos-desktop.jpg`). Tabla nutricional en HTML. «Compra este producto» con enlace a la ficha exacta en cada cadena y comparador de variantes (`ficha-donde-comprar-desktop.jpg`, `ficha-comparador-desktop.jpg`). LCP de 1,35 s. | Cada respaldo lleva número, ente, alcance, vigencia y botón de verificación; Alquería muestra logos sin datos y conserva un sello de bioseguridad de la pandemia. Su cadena de valor y sus mapas son PNG; aquí proceso y cobertura son HTML accesible. Se adoptan los enlaces a la ficha exacta en Megatiendas, Carulla y Éxito, verificados en cada compilación, y un comparador de hasta 4 presentaciones con «Mostrar solo diferencias» y enlace para compartir. Se evitan su fondo crema, las píldoras redondeadas y los titulares bicolor. |
| **Coolechera** (coolechera.com) | El relato de origen caribeño más fuerte del sector, con fotografía regional real de ganaderos y personal de planta (`home-desktop-fold.jpg`, `nosotros-desktop.jpg`). Mapa de centros de trabajo. Directorio de canales con un contacto por canal y WhatsApp por ciudad (`b2b-whatsapp-ciudades-movil.jpg`). | Orgullo costeño sin postal: la prueba es la planta en Europark y su gente, con nombre. Su mapa es imagen y no tiene tiempos; aquí los Anillos desde Turbaco ordenan las ciudades por tiempo de entrega, en HTML, con el asesor de cada zona y el mensaje de WhatsApp ya escrito. El contacto está siempre en el mismo lugar de la cabecera, no en un botón flotante que tapa el titular. Sus fuentes fallan por CORS; aquí son autoalojadas con respaldo métrico. |
| **Nestlé KLIM y El Rodeo** (nestlefamilynes.co, nestle-contigo.co) | Tabla nutricional en HTML con porción y porciones por envase (`ficha-tabla-nutricional-desktop.jpg`). Preparación con medidas caseras. Preguntas frecuentes por producto marcadas como FAQPage. Barra fija de anclas en la ficha. Visor del empaque con puntos que explican la etiqueta. LCP de 1,1 s. | El visor se convierte en «Cómo leer una bolsa»: la foto real del reverso con cinco zonas (registro sanitario, lote, vencimiento, peso neto y tabla nutricional) que acercan la imagen, más la misma información en texto que funciona sin JavaScript. KLIM esconde su origen en la tercera pregunta frecuente; aquí el origen es el hero. Se conservan tabla en HTML, preguntas por producto y anclas, sin textos de interfaz en inglés ni avisos que ocupan el 30 % de la pantalla. |
| **Cosmolac** (competidor directo en leche en polvo) | Su hero explica en una frase el origen industrial: planta pulverizadora propia en Cajicá, leche colombiana y trazabilidad (`home-desktop-fold.jpg`). Muro de clientes y directorio de contacto por área con foto y cargo. | El origen se muestra con la planta y su equipo reales, no con un personaje 3D. Los logos de clientes solo aparecen con autorización escrita; mientras tanto, las cadenas se nombran en texto. Los asesores tienen retrato, zona y WhatsApp con mensaje prellenado. El formulario pide el consentimiento de la Ley 1581 de 2012, que Cosmolac no pide, y hay navegación móvil, que en Cosmolac no existe. |
| **Indunilo** (indunilo.com; referente de maquila) | Separa «Marcas propias» y «Maquilas» y usa un bloque de especificación compacto por producto (`ficha-desktop-fold.jpg`, `maquilas-desktop.jpg`). | La marca propia se presenta como servicio: proceso numerado (es una secuencia real), gramajes autorizados y el registro que la ampara. La especificación compacta pasa a ficha técnica en HTML. Los PDF se alojan en el propio dominio; los de Indunilo, en Drive, dan 404. |

---

## 5. Dirección visual

### 5.1 Paleta

Solo colores de `MARCA.md`. Los tokens se declaran en hex y se redefinen en OKLCH dentro de `@supports` (sección 15).

| Nombre | Hex | OKLCH | Rol en «Paralelo 10» | Presencia aprox. |
|---|---|---|---|---|
| Blanco | `#FFFFFF` | `oklch(100% 0 0)` | Superficie principal, paralelo 10 (franja del titular), huecos del globo y fondo de packshots. | 52 % |
| Azul Mundilácteos | `#0A2F8F` | `oklch(35.5% 0.163 263.8)` | El color que manda: titulares display y H2, franja 4 del globo, bandas de Planta y cierre, cabecera de Productos, chip elegido (relleno), botón secundario (contorno de 2 px) y destello del enlace activo. | 16 % |
| Bruma azul | `#EEF4FB` | `oklch(96.5% 0.011 252.1)` | Paneles: franjas de vitrina bajo los packshots, filtros, tabla comparativa, filas alternas, campos y Tres formas de comprar. | 14 % |
| Azul noche | `#0B1F4F` | `oklch(25.7% 0.092 263.9)` | Texto principal, banda de registros, pie, menú móvil, velo detrás de paneles y sombras de contacto (con transparencia). | 12 % |
| Verde hoja | `#2D7A12` | `oklch(51.2% 0.153 139.5)` | Acción y confirmación: botón primario con texto blanco, estado «Agregado» y marca de verificado sobre fondo claro. Hover y presionado: Verde bosque `#236310` (`oklch(44.1% 0.130 139.8)`). Sobre bandas azules lleva un anillo blanco de 2 px. | 2 % |
| Azul cielo | `#1090E0` | `oklch(63.1% 0.155 245.0)` | Destello sobre fondos oscuros, brillo radial detrás de los packshots, ruta en los Anillos desde Turbaco y relleno de datos en gráficos. Nunca texto. | 1 % |
| Verde Mundilácteos | `#4AA603` | `oklch(64.3% 0.194 137.1)` | Símbolo del logo y marca de verificado sobre Azul noche. Nunca texto sobre claro. | 1 % |
| Cielo profundo | `#0B6FB8` | `oklch(53.0% 0.140 248.5)` | Enlaces dentro de texto, siempre subrayados. | texto |
| Pizarra | `#4A5877` | `oklch(46.1% 0.054 265.5)` | Texto secundario, denominaciones, bordes de campos y chips. | texto |
| Amarillo Becerrita | `#EAC55E` | `oklch(83.6% 0.128 89.6)` | Solo en el contexto de La Becerrita: filete de 4 px sobre su franja y su ficha. | puntual |
| Rojo error | `#B42318` | `oklch(50.0% 0.182 29.5)` | Solo errores, siempre con icono y texto. | puntual |

**Ritmo de color de la Home:** Blanco (hero) → Blanco con franjas Bruma (vitrina) → Azul noche (registros) → Blanco (Cómo leer una bolsa) → Azul Mundilácteos (planta y gente) → Blanco (Anillos) → Bruma (Tres formas de comprar) → Blanco (guías) → Azul Mundilácteos (cierre) → hueco blanco → Azul noche (pie). Nunca hay dos bandas azules seguidas sin un hueco blanco entre ellas, igual que en el globo.

Sin filetes grises: las separaciones se hacen con Bruma azul (filas alternas, franjas) o con espacio. Sin texturas: el kraft y otros colores ajenos a la paleta solo existen dentro de las fotos.

### 5.2 Contrastes

Calculados con python3 (fórmula WCAG 2.x de luminancia relativa) sobre los hex de `MARCA.md`.

| Par | Contraste | Uso |
|---|---|---|
| Azul noche sobre Blanco / sobre Bruma azul | 15,87:1 / 14,34:1 | Texto principal |
| Azul Mundilácteos sobre Blanco / sobre Bruma azul | 11,56:1 / 10,44:1 | Titulares, chip elegido, botón secundario |
| Blanco sobre Azul Mundilácteos / sobre Azul noche | 11,56:1 / 15,87:1 | Texto en bandas |
| Bruma azul sobre Azul noche / sobre Azul Mundilácteos | 14,34:1 / 10,44:1 | Cifras de registro y texto secundario en bandas |
| Pizarra sobre Blanco / sobre Bruma azul | 7,11:1 / 6,42:1 | Texto secundario |
| Cielo profundo sobre Blanco / sobre Bruma azul | 5,28:1 / 4,77:1 | Enlaces en texto |
| Rojo error sobre Blanco / sobre Bruma azul | 6,57:1 / 5,94:1 | Errores |
| Blanco sobre Verde hoja / sobre Verde bosque | 5,38:1 / 7,33:1 | Botón primario y su hover |
| Verde hoja sobre Blanco / sobre Bruma azul | 5,38:1 / 4,86:1 | «Agregado», verificado |
| Verde Mundilácteos sobre Azul noche | 5,10:1 | Verificado en la banda de registros |
| Amarillo Becerrita sobre Azul noche / sobre Azul Mundilácteos | 9,56:1 / 6,96:1 | Nombre de La Becerrita en bandas de su ficha |
| Azul cielo sobre Azul noche / sobre Azul Mundilácteos / sobre Blanco | 4,60:1 / 3,35:1 / 3,45:1 | Solo elementos no textuales (mínimo 3:1) |
| Verde Mundilácteos sobre Azul Mundilácteos | 3,71:1 | Franja del símbolo en su versión sobre azul |
| Anillo blanco del botón sobre Azul Mundilácteos / Azul noche | 11,56:1 / 15,87:1 | Contorno del botón verde en bandas |

**Pares prohibidos**

- Verde hoja sobre bandas azules sin el anillo blanco (2,15:1 sobre Azul Mundilácteos; 2,95:1 sobre Azul noche).
- Verde Mundilácteos como texto sobre Blanco o Bruma (3,11:1 y 2,81:1).
- Azul cielo como texto sobre Blanco o Bruma (3,45:1 y 3,12:1); Blanco sobre Azul cielo (3,45:1).
- Pizarra sobre Azul noche (2,23:1) y Cielo profundo sobre Azul noche (3,01:1).
- Amarillo Becerrita sobre Blanco (1,66:1) y fuera del contexto de La Becerrita.
- Azul Mundilácteos junto a Azul noche (1,37:1): no se distinguen. Nunca van adyacentes sin un hueco Blanco o Bruma entre ellos, ni en bandas ni en el globo.

**Foco visible:** contorno de 3 px en Azul noche con 2 px de separación sobre fondos claros (15,87:1); contorno Blanco sobre Azul noche y Azul Mundilácteos (15,87:1 y 11,56:1). Nunca queda tapado por la cabecera fija (`scroll-padding-top` igual a su alto).

### 5.3 Tipografía

Dos familias con papeles separados: una grotesca expandida para titulares, interfaz y cifras, y una serif de lectura para el texto corrido.

**Encode Sans** (titulares, interfaz, datos), de Impallari Type, Andrés Torresi y Jacques Le Bailly. Variable, licencia OFL.

- Ficha: https://fonts.google.com/specimen/Encode+Sans
- CSS de Google Fonts: `https://fonts.googleapis.com/css2?family=Encode+Sans:wdth,wght@75..125,100..900&display=swap`
- Verificado con fontTools el 25/09/2026 sobre el archivo servido: subconjunto latin en woff2 de 44.612 bytes (44,6 KB), ejes `wdth` 75 a 125 y `wght` 100 a 900, 2.000 unidades por eme, altura de mayúscula 0,74 em. Tiene cifras tabulares, á, é, í, ó, ú, ñ, ü, ¿ y ¡.

**Source Serif 4** (lectura), de Frank Grießhammer (Adobe). Licencia OFL.

- Ficha: https://fonts.google.com/specimen/Source+Serif+4
- CSS de Google Fonts: `https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@20,400;20,600&display=swap`
- Se sirven dos cortes estáticos con tamaño óptico 20: 400 (19,7 KB) y 600 (21,0 KB, archivo verificado de 21.000 bytes). La variable completa pesa 122 KB y no se usa.

Los tres archivos se descargan y se sirven desde el propio dominio (`/fuentes/`), con `font-display: swap`. Se precarga solo Encode Sans. Peso total: 85,3 KB, por debajo de los 88 KB del Concepto 2. Ninguna trae el subíndice ₂: CO₂ se compone con `<sub>`.

**Escala.** Parte de la de Bringhurst (14, 16, 18, 21, 24, 36, 48, 72) y se extiende hacia el display. El H1 del hero se calcula para que siempre quepa en el paralelo 10 (sección 13).

| Rol | Familia | Escritorio (≥ 1024) | Móvil (< 600) | wdth | wght | Interlineado | Notas |
|---|---|---|---|---|---|---|---|
| H1 del hero | Encode Sans | `min(5.4rem, 5.9vw, 0.1 × D)`: 85 px a 1.440, 75,5 a 1.280, 60,4 a 1.024; 2 líneas | `min(clamp(2.25rem, 10.4vw, 2.75rem), 0.08 × D)`: 39 px a 375; 3 líneas | 125 (móvil 112) | 800 | 0,95 | Tracking −0,01 em. Entre 600 y 1.023 px: `min(clamp(2.75rem, 7.2vw, 4rem), 0.08 × D)`, 3 líneas, ancho 112. D es el diámetro del globo (sección 13) |
| H1 interior | Encode Sans | `clamp(2.25rem, 1.46rem + 3.38vw, 4.5rem)`: 36 a 72 px | 36 px; 40 px como máximo si incluye «Mundilácteos» (283 px) | 125 (móvil 112) | 800 | 1,0 | En la ficha: ancho 112 y hasta 64 px, porque comparte fila con el packshot |
| Cifra de registro | Encode Sans | 72 px («RSA-0037312-2025» mide 660 px) | `clamp(1.875rem, 9.6vw, 2.25rem)`: 36 px a 375 (307 px) | 125 (móvil 112) | 300 | 1,0 | `tabular-nums`. Segundo gesto tipográfico de la Home |
| H2 | Encode Sans | `clamp(2rem, 1.47rem + 2.25vw, 3.5rem)`: 32 a 56 px | 32 px | 112 | 750 | 1,02 | `text-wrap: balance` |
| H3 y nombre de producto | Encode Sans | 24 px | 21 px | 100 | 700 | 1,15 | |
| Entradilla | Source Serif 4 | 21 a 24 px | 19 px | — | 400 | 1,45 | |
| Cuerpo | Source Serif 4 | 18/29 px | 17/27 px | — | 400; énfasis 600 | 1,6 | Medida de 60 a 72 caracteres. Sin cursiva |
| Interfaz | Encode Sans | 16/24 px | 16/24 px | 100 | botones 600; menú y chips 500 | 1,5 | Campos a 17 px en móvil (evita el zoom de iOS) |
| Datos | Encode Sans | 16/24 px; totales 21 px | igual | 100 | 500; totales 700 | 1,5 | `tabular-nums`, alineados a la derecha |
| Meta | Encode Sans | 14/20 px | 14/20 px | 100 | 400 o 500 | 1,43 | Mínimo del sitio; el conteo de los chips va a 13 px |

**Anchos medidos en Chromium** (Encode Sans servida, en em): «Leche en polvo de Turbaco» 14,87 em a ancho 125 y peso 800; «para toda Colombia.» 11,21 em; «de Turbaco para» 8,38 em a ancho 112; «Mundilácteos» 7,08 em a ancho 112; «RSA-0037312-2025» 9,17 em a ancho 125 y peso 300.

**Por qué estas fuentes.** Lo expandido nace de la idea: las franjas del globo son paralelos, líneas de horizonte, y un titular ancho y pesado se lee como una banda. Encode Sans viene en parte de una fundición latinoamericana (Impallari Type, Argentina) y está poco vista en el sector: Alpina usa AlpinaSans redondeada, Alquería amsiPro, Coolechera VAG Rounded y KLIM Fraunces. La serif pone la voz de documento serio para contar el origen y explicar la calidad; va en el cuerpo, nunca en display, y sobre blanco o azul frío, no sobre crema. Para que lo expandido no se vuelva una moda, el ancho 125 se reserva a los H1 y a las cifras de registro; todo lo demás va en ancho 100. Se evaluaron y descartaron Anybody (lúdica en los extremos), Mona Sans (asociada a GitHub, 98 KB), Unbounded y Bricolage Grotesque (estética del momento) y Ancizar (ver sección 20).

**Reglas**

- Tipo oración siempre. Sin mayúsculas sostenidas, sin rótulos pequeños sobre los títulos y sin resaltar una palabra del titular con otro color o peso.
- Todo alineado a la izquierda. Nada centrado salvo el emblema del pie.
- Ancho y peso se fijan con `font-stretch` y `font-weight`, no con `font-variation-settings`.
- `text-wrap: balance` en titulares, `pretty` en párrafos; `hyphens: auto` con `lang="es-CO"` en H1 interiores.
- Formato colombiano: coma decimal, punto de miles y espacio fino no separable antes de la unidad (12,5 kg; 1.250 kg). Las presentaciones se escriben como en el empaque.
- Los números de registro se componen con guion normal y cifras tabulares, para que las cinco filas alineen columna por columna.

**Respaldos métricos** (calculados con fontTools contra Liberation Sans y Liberation Serif, que tienen las métricas de Arial y Times; se recalibran en navegador):

- «Encode Sans Fallback» para interfaz y texto (ancho 100, peso 500 contra Arial): `size-adjust: 99.6%`, `ascent-override: 103.4%`, `descent-override: 22.1%`, `line-gap-override: 0%`.
- «Encode Sans Display Fallback» para el H1 del hero (ancho 125, peso 800 contra Arial Bold): `size-adjust: 116.5%`, `ascent-override: 88.4%`, `descent-override: 18.9%`.
- «Source Serif Fallback» (400, tamaño óptico 20, contra Times New Roman): `size-adjust: 110.7%`, `ascent-override: 93.6%`, `descent-override: 30.3%`.

### 5.4 Fotografía

Documental con orden. Retrata el origen (la planta), las personas y el producto, en tomas con estructura horizontal que conviven con las franjas.

**Reglas generales**

- Luz natural o difusa de 5.000 a 5.500 K y color neutro. Sin dominante azul, sin gradación teal y naranja, sin viñeta y sin grano añadido.
- Prohibido: stock, personas generadas con IA, vacas, potreros, salpicaduras, vasos rebosantes, murallas y postales de Cartagena.
- Horizonte nivelado. Cada foto del globo se encuadra para su franja: se entrega recortada a 5:1 y el sujeto ocupa el 80 % central del ancho y el 60 % central del alto, porque el círculo recorta los extremos y los arcos recortan arriba y abajo. Al fotógrafo se le entrega la plantilla de encuadre de la sección 13.
- Nunca hay texto sobre foto.

**Lista de tomas** (una jornada en planta, media jornada de retratos y una de visitas a clientes)

| ID | Familia | Toma | Especificación | Uso |
|---|---|---|---|---|
| H01 | Hero | Fachada de la planta en Europark con la señal del parque y cielo | 5:1 útil, entregar a 3.000 px de ancho; luz de mañana | Franja 1 del globo |
| H02 | Hero | El equipo en una sola fila frente a la línea de empaque o la fachada, a la altura de los ojos, con uniforme y cofia | 5:1; caras dentro del 60 % central del alto | Franja 2 del globo |
| H03 | Hero | Pacas y bultos en estiba, o bolsas selladas en la banda transportadora, con ritmo horizontal | 5:1 | Franja 3 del globo (muestra producto en el primer pantallazo) |
| P01 | Planta | Línea de empaque con operarias de cofia y guantes | 3:2 y ventana de franja 3:1 | Home (Planta y gente), Calidad |
| P02 | Planta | Control de calidad: análisis por lote | 3:2 | Calidad, Por qué elegirnos |
| P03 | Planta | Codificación de lote y vencimiento en la bolsa | 3:2 | Calidad |
| P04 | Planta | Bodega con estibas | 3:2 | Cobertura |
| P05 | Planta | Cargue del camión y salida por la vía a Turbaco | 3:2 | Cobertura |
| P06 | Planta | Fachada con la señal del parque industrial | 3:2 | Contacto («Cómo llegar») |
| N01 | Planta | Equipo completo en grupo, sin decoración de temporada | 3:2, alta resolución | Nosotros |
| R01–R06 | Personas | Retratos 4:5 a la altura de los ojos, en su puesto: jefe de calidad, operaria de empaque, jefe de bodega, asesores comerciales por zona, gerencia o familia fundadora. Dos versiones: mirando a cámara (contacto) y trabajando (Nosotros) | 4:5, luz del lugar | Home, Contacto, confirmación de la cotización, Nosotros |
| E01 | Producto | Frente de cada referencia con empaque «Nueva imagen», fondo blanco para recorte con transparencia | 4:5 | Vitrinas, ficha, globo de respaldo |
| E02 | Producto | Reverso legible con lote, vencimiento, registro, peso neto y tabla; al menos la bolsa de 380 g a 4.000 px | 4:5 | «Cómo leer una bolsa» |
| E03 | Producto | Paca envuelta a tres cuartos | 1:1 | Ficha |
| E04 | Producto | Bultos de 12,5 y 25 kg de frente | 4:5 | Vitrinas, ficha |
| C01 | Clientes | Tendera recibiendo una paca en Cartagena | 3:2 | Tres formas de comprar, Cobertura |
| C02 | Clientes | Panadero de la Costa abriendo un bulto | 4:5 | Por qué elegirnos, ficha de bultos |
| C03 | Clientes | Góndola con The Cántaro, con permiso de la cadena | 3:2 | Dónde comprar |

**Producción y uso**

- Autorización escrita de cada persona fotografiada: la imagen es un dato personal según la Ley 1581 de 2012. Si alguien se retira, su retrato se reemplaza por el de quien asume el cargo.
- `<picture>` con AVIF, WebP y JPEG, `srcset` de 480, 960, 1.440 y 1.920 px, `width` y `height` declarados. Las tres fotos del globo suman 150 KB o menos en móvil; H02 lleva `fetchpriority="high"`.
- **Provisionales del prototipo** (`compartido/img-cliente/`): packshots de bolsas y bultos (empaques de 2022; se reemplazan por «Nueva imagen» cuando lleguen) y `bultos-trio.webp`. `equipo-planta.webp` (900 px, con decoración navideña) solo en Nosotros, recortada y rotulada como provisional; en el globo corta caras (ver `verificacion-hero/capturas/var-foto-1440.png`). Nunca se usan `foto-actual-vacas.webp` ni el logo actual, salvo como «antes» en la presentación. La estatua de vaca de la planta puede aparecer en Nosotros como detalle real, nunca como símbolo.
- **Hasta que exista la sesión H01 a H03, el hero se publica en su variante de respaldo** (sección 13), que ya funciona con los recursos actuales.

### 5.5 Ilustración e iconografía

- **Pictogramas propios** de trazo de 2 px con remates y uniones redondeados, en eco de los brillos del logo, sobre retícula de 24 px. Color: Azul Mundilácteos sobre claro, Bruma azul sobre oscuro. Se dibujan a partir de objetos reales: bolsa, paca, bulto cosido, estiba, camión, planta, lote, registro (documento con marca de verificado), vaso de 200 ml y cuchara. Solo aparecen donde informan: filtros de formato y uso, datos de vitrina y ficha, «Cómo leer una bolsa» y Cobertura.
- **Iconos de interfaz** (buscar, menú, cerrar, más, menos, copiar, descargar, comparar, imprimir, verificado, alerta): se parte de Lucide y se reexportan con el mismo trazo de 2 px y remates redondos. Siempre con texto visible o `aria-label` si van solos. El glifo de WhatsApp se usa según su guía de marca.
- **Anillos desde Turbaco:** diagrama SVG con Turbaco como origen y arcos concéntricos cuyo radio representa el tiempo de entrega, no la distancia. Las ciudades son botones sobre su anillo, hay una lista de texto equivalente y funciona sin JavaScript. Sin pines ni flechas inventadas.
- Nunca: iconos dentro de círculos de color, rejillas de beneficios con iconos, emoji, banderas ni gotas.

### 5.6 Formas de marca y profundidad

Todas salen del globo del logo:

- **El arco de paralelo.** Bordes superiores (y a veces inferiores) de las bandas: arco con sagita del 3 % del ancho, entre 24 y 48 px, más bajo en el centro, como los paralelos de un globo visto desde arriba. Es la misma curva de las franjas del hero.
- **El hueco.** Entre dos bandas azules siempre hay un hueco blanco de 16 a 24 px con el mismo arco, como los huecos del globo.
- **La franja.** Franja Bruma azul con borde superior en arco bajo cada packshot, y «ventana de franja»: foto recortada por dos arcos paralelos.
- **El destello.** Arco corto de 24 × 3 px con remates redondos, tomado de los brillos del logo. Es el único signo gráfico recurrente: marca el enlace activo, la fila de registro enfocada y el subrayado que crece en hover. En Azul Mundilácteos sobre claro y Azul cielo sobre oscuro.
- **Brillo radial** de Azul cielo al 25 % detrás de los packshots en bandas oscuras y en la franja 3 del globo de respaldo.

**Profundidad por capas** (tokens `--z-*`, sección 15):

| Capa | Qué va | Token |
|---|---|---|
| 0 | Blanco, paneles Bruma | `--z-fondo` |
| 1 | Franjas del globo y bandas azules | `--z-franja` |
| 2 | Brillo radial de Azul cielo y sombras de contacto (elipse de Azul noche al 20–35 %) | `--z-brillo` |
| 3 | Packshots recortados que rompen el borde de su franja entre 48 y 64 px; fotos en ventanas de franja | `--z-objeto` |
| 4 | Texto y controles, siempre sobre liso; nunca bajo un packshot | `--z-texto` |
| 50 a 90 | Cabecera, velo, paneles y hojas, avisos | `--z-cabecera` a `--z-aviso` |

Sin vidrio, sin sombras grises genéricas, sin grano. La única sombra de interfaz es la del panel de cotización y las hojas (Azul noche con transparencia).

### 5.7 Movimiento

**Personalidad: envolver y asentar.** Todo se mueve como las franjas de un globo que gira: desplazamientos horizontales o en arco que frenan con decisión y quedan firmes, sin rebote ni elasticidad. Hay un momento orquestado por página; lo demás responde a acciones de la persona. Aplica la ampliación del criterio 7 que hace `EXPERIENCIA.md`.

| Token | Valor | Uso |
|---|---|---|
| `--dur-tap` | 100 ms | Presión (escala .97) |
| `--dur-rapida` | 140 ms | Hover, verificado que se dibuja |
| `--dur-cambio` | 160 ms | Fundido cruzado de datos |
| `--dur-media` | 240 ms | Chips, cifra que rueda, hojas |
| `--dur-panel` | 260 ms | Panel de cotización |
| `--dur-zoom` | 360 ms | «Cómo leer una bolsa» |
| `--dur-vista` | 450 ms | Transición entre vistas |
| `--dur-vuelo` | 520 ms | Miniatura que vuela a «Cotizar» |
| `--dur-orquesta` | 900 ms en total | Carga del globo |
| `--curva-entrada` | `cubic-bezier(.2,.7,.2,1)` | Entradas |
| `--curva-salida` | `cubic-bezier(.4,0,1,1)` | Salidas |

Solo se animan `transform`, `opacity`, `clip-path`, `mask` y el eje de ancho del titular. La curva lineal se usa solo para progreso (la ruta de los anillos). Desplazamientos de 12 a 24 px, giro máximo de 3°, presión con escala .97.

**Momento orquestado: el globo se envuelve** (Home; una vez por sesión, recordado en `sessionStorage` dentro de `try/catch`; 6 pasos, 900 ms)

1. **0 a 420 ms.** La franja 2 (el equipo) entra desde la derecha: `translateX` de 40 px a 0 y `clip-path` que se abre desde su borde derecho.
2. **80 a 500 ms.** La franja 1 entra desde la izquierda.
3. **160 a 580 ms.** La franja 3 entra desde la derecha. Las franjas se alternan como un globo que gira.
4. **240 a 660 ms.** La franja 4 entra desde la izquierda.
5. **120 a 720 ms.** Las líneas del H1 suben 16 px y pasan de opacidad .4 a 1, con 60 ms de escalón (nunca parten de 0: no retrasan el LCP). Solo en escritorio, su ancho pasa de 112 a 125: el titular se abre como un paralelo. Cada línea va en una caja con su ancho final reservado, así nada se desplaza; se mide CLS = 0 antes de aprobar y, si no, se retira solo este efecto.
6. **600 a 900 ms.** El destello recorre la franja 4 (`clip-path`); bajada, botones y credencial suben 12 px desde opacidad .4.

La forma de cada franja va en el contenedor (`clip-path: url(#fN)`) y el movimiento en su hijo, para no pisar el recorte. Sin JavaScript o con movimiento reducido, el globo aparece armado desde el primer pintado.

Otros momentos: en Productos, las primeras seis vitrinas se asientan (12 px, 40 ms de escalón, 600 ms en total); en la ficha, el packshot llega desde la vitrina como elemento compartido (400 ms) y el nombre entra con un recorte de izquierda a derecha (300 ms).

**Transiciones entre vistas**

- **Cambio de ruta:** `document.startViewTransition` en el prototipo (rutas por hash) y `@view-transition { navigation: auto; }` en producción, dentro de `@media (prefers-reduced-motion: no-preference)`.
  - **El horizonte que sube.** La vista nueva se revela desde abajo con un borde en arco de paralelo (más bajo en el centro): una máscara `radial-gradient` elíptica centrada sobre la pantalla cuyo radio vertical se anima con `@property --horizonte`, 450 ms con la curva de entrada. Es el mismo arco de las secciones.
  - La vista saliente baja a opacidad .7 y sube 12 px en 300 ms con la curva de salida.
- **De la vitrina a la ficha:** packshot y nombre son elementos compartidos (`view-transition-name: pack-<producto>` y `nombre-<producto>`); el empaque vuela de su franja a la ficha en 400 ms.
- **Filtros en Productos:** transición en el mismo documento; las vitrinas se reordenan en 300 ms y las que salen se desvanecen escalando a .96 en 150 ms.
- Sin soporte (Firefox) o sin `@property`: fundido de 200 ms o cambio directo.

**Scroll** (solo dentro de `@supports (animation-timeline: view())`; nunca oculta contenido; opcional y se retira sin afectar nada)

- El arco superior de las bandas de registros, planta y cierre se aplana de 48 a 24 px de sagita (`scaleY` del SVG del borde) al entrar en pantalla: el horizonte se abre.
- Los packshots de la vitrina y los retratos de «Planta y gente» se desplazan de 10 a 30 px a otra velocidad que su franja.
- Nada más: sin apariciones por sección, sin parallax de fondos, sin scroll-jacking. El texto nunca se anima con el scroll.

**Microinteracciones** (todas también con `:focus-visible`)

| Elemento | Respuesta | Duración |
|---|---|---|
| Botón primario al pasar el cursor | Entra una franja Verde bosque desde la izquierda con borde en arco (`clip-path`) | 180 ms |
| Cualquier botón al presionar | Escala .97 | 100 ms |
| Enlaces | El destello crece de izquierda a derecha (`scaleX`) | 160 ms |
| Vitrina | El packshot sube 8 px y gira −3°; su sombra de contacto se abre (`scaleX` de 1 a 1,15, opacidad de .5 a .35). La vitrina no se mueve | 220 ms |
| Chip de presentación | Se dibuja la marca de verificado (`clip-path`); EAN, paca, peso y rinde cambian con fundido cruzado | 140 y 160 ms |
| Selector Bolsa / Bulto | El indicador se desliza (`transform`) | 200 ms |
| Agregar a mi cotización | Una miniatura del empaque vuela en arco a «Cotizar» (FLIP), la cifra rueda (`translateY`) y `aria-live` anuncia el cambio con «Deshacer». Con movimiento reducido, solo cambia el número | 520 y 240 ms |
| Copiar número de registro | El botón pasa a «Número copiado» con verificado y vuelve a los 2 s | 160 ms |
| Cómo leer una bolsa | La foto se acerca a la zona elegida (`scale` de 1 a 1,8 más `translate`); el texto cambia con fundido | 360 y 160 ms |
| Anillos desde Turbaco | El tramo desde Turbaco se revela (`clip-path`, lineal); el punto de la ciudad hace escala 1 → 1,35 → 1 | 500 y 240 ms |
| Menú móvil | La hoja baja con borde en arco (`clip-path`); los destinos se escalonan 30 ms | 320 ms |
| Panel de cotización | Entra desde la derecha con borde izquierdo en arco; en móvil, la hoja sube desde abajo | 260 ms |
| Acordeones | La flecha gira; el contenido aparece con fundido | 200 ms |

La cabecera no se oculta ni cambia de tamaño al hacer scroll.

**Movimiento reducido** (`prefers-reduced-motion: reduce`): sin transición de página, sin carga orquestada, sin efectos de scroll y sin vuelos. Los cambios de estado son instantáneos y los anuncios `aria-live` se mantienen.

**Límites:** INP < 200 ms, CLS ≤ 0,1 (meta 0), sin librerías de animación: CSS nativo y unos 4 KB de JavaScript propio para la carga, FLIP y las vistas.

---

## 6. Marca y logo

### Concepto: el globo de paralelos

El logo evoluciona el globo actual en lugar de reemplazarlo: el reconocimiento que ya existe es parte de la confianza. Se conserva su proporción de color (cuerpo verde con base azul, como hoy) para no perder equidad, y se corrige lo que falla:

- Se quitan el degradado y la franja celeste de contorno: dos tintas planas y una versión a una tinta.
- El PNG de baja resolución se reemplaza por un SVG maestro.
- El nombre recupera la tilde: «Mundilácteos».
- En la firma de uso diario, el nombre sale del globo para leerse a 16 px; el emblema con el nombre dentro de la franja queda para piezas grandes.

### Construcción

```
Retícula de 24 x 24 u. Círculo de 24 u. Dos huecos blancos de 2 u, paralelos, con sagita
de 1,5 u (más bajos en el centro, como los paralelos de un globo visto desde arriba).

              . - ~ ~ ~ - .
          .~                 ~.      franja superior (0 a 8 u): Verde Mundilácteos
        /   destello: arco de   \    destello: 5 u de largo, trazo de 1,2 u, remates redondos,
       |    5 u a las 10 h       |   en Azul cielo (solo desde 32 px; es el brillo del logo actual)
       (~~~~~~~~~~~~~~~~~~~~~~~~~)   hueco 1 (8 a 10 u, en arco)
       |                          |  franja media (10 a 15 u): Verde Mundilácteos
       (~~~~~~~~~~~~~~~~~~~~~~~~~)   hueco 2 (15 a 17 u, en arco)
         ~.                   .~     franja inferior (17 a 24 u): Azul Mundilácteos
             ~ - . _ _ _ . - ~       (la base azul del logo actual)

Favicon de 16 px: dos franjas (Verde arriba, Azul abajo), un hueco de 3 u, sin destello.
```

**Logotipo:** «Mundilácteos» en tipo oración, dibujado sobre Encode Sans (ancho 112, peso 700), en Azul Mundilácteos, con tres ajustes a mano: la tilde de la «á» es un fragmento del mismo arco de los huecos; se ajusta el espacio entre «l», «á» y «c»; la «t» se acorta para que no toque la tilde. Así el símbolo conserva el verde de siempre y el nombre habla con el azul del concepto.

**Firmas**

- **Horizontal** (web y documentos): [globo] Mundilácteos. El globo mide 1,6 veces la altura de mayúscula; separación de 6 u.
- **Vertical:** globo sobre el nombre, alineados a la izquierda.
- **Emblema** (vehículos, sacos, uniformes, fachada): el nombre dentro de un paralelo blanco ancho, como el logo actual. Solo desde 40 mm o 160 px.
- **Área de protección:** 4 u. **Tamaños mínimos:** globo de 16 px; firma horizontal de 120 px; 12 mm impreso.
- **Descriptor** (opcional, pie e impresos): «Leche en polvo. Turbaco, Bolívar.»

### Versiones

| Versión | Colores | Uso |
|---|---|---|
| Dos tintas | Globo en Verde Mundilácteos y Azul Mundilácteos; nombre en Azul Mundilácteos; sobre Blanco o Bruma azul | Principal: cabecera, documentos, empaques |
| Negativa | Franjas superior y media en Verde Mundilácteos (5,10:1), inferior y nombre en Blanco, sobre Azul noche | Pie del sitio, menú móvil, uniformes oscuros |
| Una tinta | Azul noche, huecos calados | Etiqueta de paca, sello de caucho, fax, documentos en negro |
| Una tinta de impresor | La que disponga la imprenta | Flexografía sobre kraft, relieve, bordado |

### Usos

- Favicon SVG e ICO, ícono de 180 px e imagen para compartir (OG) con el globo y la foto H02.
- Cabecera: firma horizontal con el globo a 32 px (28 px en móvil, solo el globo).
- Reverso de The Cántaro y La Becerrita: globo y leyenda «Empacado por Mundilácteos en Turbaco, Bolívar». Las marcas de producto conservan sus empaques.
- Etiqueta de paca con globo, referencia, lote y vencimiento; cotización impresa y fichas técnicas en PDF.

**Prohibido:** degradados, sombras o contornos, girar el globo o invertir la curvatura de los huecos, poner la firma sobre fotos sin un panel liso, el nombre en Verde Mundilácteos sobre blanco (3,11:1) y el Azul Mundilácteos del globo sobre Azul noche (1,37:1).

**Validación:** mostrar el globo nuevo y el actual a 5 clientes (tendero, panadero, distribuidor, comprador de cadena y hogar) y comprobar que lo reconocen como la misma marca; probar la lectura a 16 px junto a otros logos de globo.

**Entregables:** SVG maestro, PDF vectorial a una tinta, favicon, ícono de 180 px, plantilla de etiqueta de paca y guía de marca de una página.

---

## 7. Arquitectura de navegación

### Mapa del sitio

```
/                                        Home
/productos/                              Productos: vitrinas, filtros, buscador y tabla comparativa
  ?marca=&tipo=&formato=&peso=&uso=&q=&orden=        filtros y búsqueda en la URL
/productos/<producto>/                   Ficha técnica
/productos/<producto>/<presentacion>/    Ficha con la presentación elegida (enlace para WhatsApp)
/productos/comparar/?p=<a>,<b>,<c>       Comparar hasta 4 presentaciones (enlace para compartir)
/productos/marca-propia/                 Con su marca (maquila), dentro de Productos
/calidad/                                Registros, concepto sanitario, ISO (solo con certificado),
                                         Así trabajamos, Cómo leer una bolsa, documentos y PQR
/por-que-elegirnos/                      Seis razones con su verbo de prueba y Lo que nos preguntan
/cobertura/                              Anillos desde Turbaco, tabla de ciudades, Ser distribuidor
/cobertura/donde-comprar/                Localizador para el consumidor (ciudad y Usar mi ubicación)
/nosotros/                               Globo reducido, historia en años reales, familia, planta,
                                         personas y marcas
/recursos/  /recursos/<articulo>/        Guías, recetas y biblioteca de fichas técnicas
/cotizar/                                Mi cotización y formulario de 5 campos
  ?c=<lista>                             Cotización compartida por enlace
/contacto/                               Asesores por zona, teléfono, formulario, PQR, dirección y horario
/privacidad/  /terminos/  /404.html
```

Las URL del sitio actual en WordPress se redirigen con 301 desde `.htaccess`.

### Cabecera de escritorio

```
>= 1440 px: una sola fila de 72 px, blanca, fija; no se oculta ni cambia de tamaño
+--------------------------------------------------------------------------------------------------+
| [globo] Mundilácteos   Productos  Calidad  Por qué elegirnos  Cobertura  Nosotros  Recursos       |
|                                  (lupa) Buscar   Dónde comprar   (WA) WhatsApp   [ Cotizar ]     |
|                                                         (en pantalla real, una sola fila)        |
+--------------------------------------------------------------------------------------------------+
  Enlace activo: el destello (arco de 24 x 3 px en Azul Mundilácteos) bajo la palabra, peso 600
  y aria-current="page". El color del texto no cambia.

1280 a 1439 px: «Buscar» pasa a botón de icono con nombre accesible y tooltip; «Dónde comprar» sale
de la cabecera (vive en Cobertura, en la vitrina «Para el hogar» y en cada ficha).
< 1280 px: cabecera compacta de móvil con «Menú».
```

- Medido a 16 px, peso 500: logo 178 px, seis destinos 565 px con 24 px de separación, utilidades 460 px. Total 1.267 px, cabe en el contenedor de 1.312 px a 1.440. A 1.280, sin «Dónde comprar» y con «Buscar» como icono, suma 1.073 px en 1.152 px.
- **Seis destinos por tarea** (criterio 8): Productos, Calidad, Por qué elegirnos, Cobertura, Nosotros y Recursos. «Por qué elegirnos» está en el menú porque es el argumento central del concepto. **Marca propia** vive dentro de Productos, como filtro «Con su marca» y como página propia.
- **Buscar** (injerto de A la orden): combobox con hasta 6 sugerencias, tolerante a tildes y mayúsculas, con sinónimos del mostrador: kilo, kilos y k equivalen a kg; gramos, gr y grs a g; saco y costal a bulto; fardo a paca; azúcar y dulce a azucarada; cantaro a The Cántaro. Enter abre `/productos/?q=`.
- **Ayuda consistente** (WCAG 3.2.6, criterio 9): WhatsApp y «Cotizar» están siempre a la derecha de la cabecera, en el mismo orden; el teléfono está siempre en el pie y en el menú móvil. No hay botón flotante, franja de utilidad ni barra inferior.
- **Cotizar** es el único botón verde de la cabecera. Vacío dice «Cotizar»; con referencias, «Cotizar (3)», y abre el panel Mi cotización.

### Cabecera y menú en móvil

```
CABECERA MÓVIL (56 px; objetivos de 44 px separados 8 px)
+-----------------------------------+
| [globo]       (WA) [Cotizar] Menú |
+-----------------------------------+
  [globo]: enlace al inicio, nombre accesible «Mundilácteos, inicio».
  (WA): glifo de WhatsApp con nombre accesible «Escribir por WhatsApp».

MENÚ A PANTALLA COMPLETA (fondo Azul noche; baja con borde en arco)
+-----------------------------------+
| [globo negativo]           Cerrar |
| [ Buscar por marca, peso o código]|
| Productos                         |  destinos en Encode Sans 32/34, ancho 112,
| Calidad                           |  peso 700, en Blanco
| Por qué elegirnos                 |
| Cobertura                         |
| Nosotros                          |
| Recursos                          |
| (hueco en arco)                   |
| Dónde comprar                     |  Bruma azul, 18/28
| Contacto                          |
| (WA) Escribir a un asesor         |  botón verde con anillo blanco
| Llamar al 319 769 0990            |
| Km 1 vía a Turbaco, Europark      |
| Lun. a vie., 7:00 a. m. a 5:00 p. m. (dato a confirmar)
+-----------------------------------+
```

### Pie

Fondo Azul noche, separado de la banda anterior por un hueco blanco en arco. Cuatro grupos:

- **Productos:** The Cántaro, La Becerrita, Bultos, Con su marca, Comparar presentaciones.
- **Empresa:** Nosotros, Por qué elegirnos, Calidad, Cobertura, Recursos.
- **Atención:** Escribir a un asesor (WhatsApp), Llamar al 319 769 0990, Contacto, Dónde comprar, Peticiones, quejas y reclamos.
- **Datos:** Inversiones Mundilácteos S.A.S., NIT 900.514.916-2; Km 1 vía a Turbaco, Lote 2A–2B, Parque Industrial Europark, Bodega 28, Turbaco (Bolívar); horario (dato a confirmar); Política de tratamiento de datos (Ley 1581 de 2012); Términos.

Cierra con el globo en versión negativa y la frase «Leche en polvo hecha en Turbaco, Bolívar, con registro INVIMA vigente.» Los enlaces del pie van en Blanco subrayado.

### Reglas de navegación

- Migas de pan en todas las páginas interiores (`nav aria-label="Migas de pan"`).
- «Saltar al contenido» como primer elemento enfocable; `scroll-padding-top` igual al alto de la cabecera (72 o 56 px).
- Cada referencia tiene su URL; los filtros, la búsqueda y la comparación viven en la URL; el botón Atrás los respeta.
- Paneles, hojas y menú atrapan el foco, se cierran con Escape y devuelven el foco al botón que los abrió.

---

## 8. Home, sección por sección

| # | Sección | Propósito | Contenido y comportamiento |
|---|---|---|---|
| 1 | Cabecera | Orientar y dar acceso a cotizar | Sección 7 |
| 2 | Hero: el globo de paralelos | Origen y producto en la primera mirada | Globo a la derecha, recortado arriba por la cabecera y a la derecha por la pantalla. H1 «Leche en polvo de Turbaco para toda Colombia.» en dos líneas que cruzan el globo por el paralelo 10. Debajo, a la izquierda del círculo: bajada, «Cotizar por volumen» (primario) y «Ver productos» (secundario), y la credencial verificable. Franja 3 con producto (foto H03, o packshots en la variante de respaldo). Sección 13 |
| 3 | Vitrina de marcas | Mostrar el portafolio antes que las pruebas | H2 «The Cántaro, La Becerrita y la marca de su cadena.» Dos vitrinas de tamaño según prioridad: The Cántaro (columnas 1 a 7, tres packshots) y La Becerrita (8 a 12, dos packshots, filete amarillo). Debajo, «Con su marca» en una línea con enlace. Cierra «Compre según su negocio»: cuatro chips (Para el hogar, Por paca para tienda, Por bulto para panadería e industria, Con su marca) que cambian una línea de acción con el mensaje de WhatsApp a la vista (injerto) |
| 4 | Registros a la vista | Confianza comprobable | Banda Azul noche con borde superior en arco. H2 «Cinco registros sanitarios vigentes. Verifíquelos usted mismo.» Cinco filas: número a 72 px en peso 300, denominación, vigencia, «Copiar número» y «Abrir consulta del INVIMA». Concepto sanitario favorable (establecimiento N.º 24741) con «Ver en datos.gov.co». «Última verificación: 25/09/2026.» Enlace «Todas las razones» |
| 5 | Cómo leer una bolsa | Enseñar a comprobar en el empaque | Foto E02 del reverso con cinco zonas como radios: Registro sanitario (elegida al cargar), Lote, Vencimiento, Peso neto y Tabla nutricional. La foto se acerca a la zona; la explicación cambia en `aria-live`. Debajo, la lista de texto equivalente |
| 6 | Planta y gente | Poner cara al origen | Banda Azul Mundilácteos. H2 «Una planta en Turbaco y la gente que la hace funcionar.» Foto P01 en ventana de franja y tres retratos con nombre y cargo (jefe de calidad con una cita breve y firmada, operaria de empaque, asesora comercial). «Cómo llegar», «Solicitar visita a la planta» y «Conocer a Mundilácteos» |
| 7 | Anillos desde Turbaco | Cobertura por tiempo de entrega | H2 «Salimos de Turbaco. Elija su ciudad.» Diagrama de anillos y chips de ciudad. El resultado en `aria-live` da el tiempo (dato a confirmar), el asesor de la zona y «Escribir al asesor de la Costa» con el mensaje a la vista. «Ver cobertura» |
| 8 | Tres formas de comprar | Enrutar al canal correcto | Fondo Bruma. En su supermercado (Megatiendas, Carulla y Éxito, con enlace a la ficha exacta; Rappi), Directo de la planta (por paca o bulto, con asesor) y Con su marca. Tres columnas de texto sin marco |
| 9 | Guías y fichas técnicas | Contenido útil y SEO | Lista de texto: título, para quién y minutos |
| 10 | Cierre | Contacto humano | Banda Azul Mundilácteos. H2 «¿Prefiere hablar con alguien de la planta?» con retrato de la asesora; «Escribir por WhatsApp» (verde con anillo blanco), «Llamar al 319 769 0990» y «Enviar una solicitud» |
| 11 | Pie | Datos, legal y orgullo | Sección 7 |

### Wireframe de escritorio

```
HOME, ESCRITORIO 1440 x 900 (contenedor de 1.312 px, 12 columnas, margen de 64 px; todo a la izquierda)
+--------------------------------------------------------------------------------------------------+
| [globo] Mundilácteos  Productos Calidad Por qué elegirnos Cobertura Nosotros Recursos            |
|                                (lupa) Buscar  Dónde comprar  (WA) WhatsApp  [ Cotizar ]          |
+--------------------------------------------------------------------------------------------------+
|                                                 .-~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-. |
|                                              .~   F1: fachada de la planta en Europark (H01)     |
|                                            (~~~~~~~~~~~~~~~~~~~~ hueco blanco en arco ~~~~~~~~~~ |
|                                           (   F2: el equipo en una fila, a la altura de los ojos |
|                                           (__________________________________ (H02) ____________ |
|                                                                                                  |
|  Leche en polvo de Turbaco  ................ (paralelo 10: franja blanca de 270 px) ..........  |
|  para toda Colombia.                                             [La Becerrita][The Cántaro]     |
|                                           (~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ [bulto 25 kg] ~~ |
|  The Cántaro y La Becerrita, en bolsa de   (  F3: pacas y bultos en estiba (H03)                 |
|  380 a 900 g y en bulto de hasta 25 kg.     (~~~~~~~~~~~~~~~~~ hueco blanco en arco ~~~~~~~~~~~~ |
|  Despachamos a tiendas, panaderías,           ~.  F4: Azul Mundilácteos; el destello la recorre  |
|  supermercados e industria.                      ~-._________________________________________.-~ |
|  [ Cotizar por volumen ]  [ Ver productos ]                                                      |
|  (verificado) Registro INVIMA RSA-006359-2018,                                                   |
|  vigente hasta el 24/05/2028. Verificar                                                          |
+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ (fin del primer pantallazo) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
| The Cántaro, La Becerrita y la marca de su cadena.                      Ver todos los productos  |
|   [bolsa 380 g][bolsa 900 g][bulto 25 kg]              |   [bolsa 900 g][bulto 25 kg]            |
| ~~~~~~~~~~~~ franja Bruma con borde en arco ~~~~~~~~~~ | ~~~~ franja Bruma, filete amarillo ~~~~ |
| The Cántaro                                            | La Becerrita                            |
| Entera con hierro, descremada, azucarada y mezcla      | Entera y mezcla láctea.                 |
| láctea. Bolsa de 380 a 900 g; bulto de 12,5 y 25 kg.   | Bolsa de 380 y 900 g; bulto de 25 kg.   |
| Ver The Cántaro                                        | Ver La Becerrita                        |
| Con su marca: empacamos para cadenas y distribuidores, con registro vigente. Conocer la maquila   |
| Compre según su negocio:  (Para el hogar) [Por paca, para tienda] (Por bulto, para panadería     |
|                           e industria) (Con su marca)                                            |
| Pacas de 12 a 30 bolsas, despachadas desde Turbaco.  [ Cotizar por paca ]  (WA) WhatsApp         |
| Mensaje que se enviará: «Hola, Mundilácteos. Quiero cotizar pacas para mi tienda en ____.»       |
+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ borde superior en arco ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
| (banda Azul noche; texto Blanco y Bruma azul)                                                    |
| Cinco registros sanitarios vigentes.              | Copie el número y consúltelo en el INVIMA.   |
| Verifíquelos usted mismo.                         | Así comprueba cualquier producto antes de    |
|                                                   | comprarlo.                                   |
| RSA-006359-2018      Leche en polvo: entera, descremada,      Vigente hasta el 24/05/2028        |
| (72 px, peso 300)    azucarada y fortificada                   [ Copiar número ]  Abrir INVIMA   |
| RSA-003008-2017      Mezclas en polvo a base de leche          Vigente hasta el 11/09/2031        |
| RSA-0027065-2023     Leche en polvo entera y descremada        Vigente hasta el 11/08/2028        |
|                      (empacar y vender)                                                          |
| RSA-0036572-2025     Alimento lácteo en polvo                  Vigente hasta el 09/05/2030        |
| RSA-0037312-2025     Mezcla láctea con café y panela           Vigente hasta el 18/07/2030        |
| (verificado) Concepto sanitario favorable del establecimiento N.º 24741.  Ver en datos.gov.co    |
| Última verificación: 25/09/2026.                                        Todas las razones        |
+--------------------------------------------------------------------------------------------------+
| Cómo leer una bolsa                                                                              |
| [foto E02: reverso de The Cántaro 380 g,         | [Registro sanitario] (Lote) (Vencimiento)     |
|  grande, con líneas guía a las cinco zonas;      | (Peso neto) (Tabla nutricional)               |
|  al elegir una zona, la foto se acerca]          | Registro sanitario: RSA-006359-2018. Es el    |
|                                                  | número que el INVIMA asigna a este producto.  |
|                                                  | [ Copiar número ]  Verificar en el INVIMA     |
|                                                  | Ver las cinco zonas en texto                  |
+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ borde superior en arco ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
| (banda Azul Mundilácteos; texto Blanco)                                                          |
| Una planta en Turbaco y la gente que la hace funcionar.                                          |
| [foto P01 en ventana de franja, columnas 1 a 7]     [retrato R01] Nombre, jefe de calidad        |
|                                                     «Cita breve y real, firmada.»                |
|                                      [retrato R02] Nombre,       [retrato R04] Nombre,           |
|                                      operaria de empaque         asesora comercial en Bolívar    |
| Parque Industrial Europark, km 1 vía a Turbaco.  Cómo llegar  Solicitar visita a la planta       |
| Conocer a Mundilácteos                                                                           |
+--------------------------------------------------------------------------------------------------+
| Salimos de Turbaco. Elija su ciudad.                                                             |
| [ANILLOS DESDE TURBACO: origen a la izquierda    | (Cartagena) [Barranquilla] (Santa Marta)      |
|  y arcos concéntricos por tiempo de entrega:     | (Montería) (Sincelejo) (Valledupar)           |
|  anillo 1, Costa Caribe; anillo 2, resto del     | (Medellín) (Bogotá) (Otra ciudad)             |
|  país. Al elegir una ciudad, su tramo se dibuja  | Barranquilla: entrega en 24 a 72 h.           |
|  desde Turbaco]                                  | Tiempo de ejemplo, por confirmar.             |
|                                                  | Le atiende: [retrato] Nombre, asesor Costa    |
|                                                  | [ Escribir al asesor de la Costa ]            |
|                                                  | Mensaje: «Hola, Mundilácteos. Quiero cotizar  |
|                                                  | despacho a Barranquilla.»      Ver cobertura  |
+--------------------------------------------------------------------------------------------------+
| (fondo Bruma azul) Tres formas de comprar                                                        |
| En su supermercado             | Directo de la planta            | Con su marca                  |
| Megatiendas, Carulla y Éxito,  | Por paca o por bulto, con       | Empacamos para cadenas y      |
| con enlace al producto; Rappi. | asesor y precio por volumen.    | distribuidores.               |
| Ver dónde comprar              | [ Cotizar por volumen ]         | Conocer la maquila            |
+--------------------------------------------------------------------------------------------------+
| Guías y fichas técnicas                                                         Ver recursos     |
| Cómo verificar un registro sanitario en el INVIMA               Para todos        3 min          |
| Leche en polvo o mezcla láctea: cómo diferenciarlas             Para su casa      4 min          |
| Fichas técnicas de The Cántaro y La Becerrita                   Documentos (HTML y PDF)          |
+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ borde superior en arco ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
| (banda Azul Mundilácteos) ¿Prefiere hablar con alguien de la planta?     [retrato asesora R04]   |
| [ Escribir por WhatsApp ] (anillo blanco)  Llamar al 319 769 0990  Enviar una solicitud          |
+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hueco blanco de 16 a 24 px en arco ~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
| (pie en Azul noche: cuatro grupos, datos legales y globo en negativo)                            |
+--------------------------------------------------------------------------------------------------+
```

**Notas de escritorio**

- **Primer pantallazo a 1.440 × 900:** cabecera, globo, H1, bajada, botones y credencial (el botón «Cotizar por volumen» termina en y = 804 px). A 1.280 × 800 termina en 740 px, y a 1.024 × 768, en 698 px.
- **H1:** Encode Sans 85 px, ancho 125, peso 800, Azul Mundilácteos. La línea 1 mide 1.244 px y cruza el globo; la línea 2 mide 937 px. La bajada va en Source Serif 21/30 con un ancho máximo calculado para no tocar el círculo (sección 13).
- **Gestos tipográficos:** dos en la página, el H1 que cruza el globo y los números de registro a 72 px en peso 300. En ningún otro lugar.
- **Numeración:** no hay números de secuencia en la Home, porque ninguna sección es un paso a paso. «Así trabajamos» vive en Calidad.
- **Profundidad:** franjas y bandas atrás, packshots que rompen el borde de su franja con sombra de contacto al medio, texto adelante sobre liso.
- **Ninguna rejilla de tarjetas iguales:** las vitrinas tienen tamaño según prioridad, sin marco ni sombra de interfaz; los registros son filas; las formas de comprar son columnas de texto.

### Wireframe móvil

```
HOME, MÓVIL 375 px (margen de 16 px; sin scroll horizontal)
+-----------------------------------+
| [globo]       (WA) [Cotizar] Menú |  cabecera de 56 px
+-----------------------------------+
|    .-~~~~~~~~~~~~~~~~~~~~~~~~~-.  |  globo de 136vw (510 px), recortado
|  .~  F1: fachada (H01)          ~ |  a los lados y 10 % arriba
| (~~~~~~~~~~~ hueco ~~~~~~~~~~~~~~~|
| (  F2: el equipo en una fila (H02)|
| (_________________________________|
| Leche en polvo                    |  paralelo 10 (153 px): H1 39 px,
| de Turbaco para                   |  ancho 112, peso 800, tres líneas
| toda Colombia.                    |  de 301, 320 y 302 px
| (~~~~~~~~~~~~~~~~~~~~ [bolsas] ~~~|
|  ( F3: pacas en estiba (H03)      |
|   (~~~~~~~~ hueco ~~~~~~~~~~~~~~~~|
|     ~. F4: Azul Mundilácteos  .~  |
|        ~-.________________.-~     |
| The Cántaro y La Becerrita, en    |  bajada en Source Serif 17/27
| bolsa de 380 a 900 g y en bulto   |
| de hasta 25 kg. Despachamos a     |
| tiendas, panaderías, supermercados|
| e industria.                      |
| [     Cotizar por volumen      ]  |  52 px, ancho completo
| [        Ver productos         ]  |
| (verificado) Registro INVIMA      |
| RSA-006359-2018, vigente hasta el |
| 24/05/2028. Verificar             |
+-----------------------------------+
| Vitrina: The Cántaro y La Becerrita apiladas; packshot a la izquierda (40 %) sobre su franja y   |
| datos a la derecha (60 %). «Con su marca» en una línea. «Compre según su negocio»: chips en      |
| varias filas, de 48 px de alto, y la línea de acción con el mensaje de WhatsApp.                 |
| Registros: un bloque por registro; número a 36 px en peso 300; [Copiar número] de 44 px.         |
| Cómo leer una bolsa: foto arriba; cinco zonas en dos filas de chips; explicación debajo.         |
| Planta y gente: foto en ventana de franja; retratos en lista vertical (sin carrusel).            |
| Anillos: versión compacta con Turbaco arriba y dos anillos; lista de ciudades con tiempos.       |
| Tres formas de comprar apiladas; guías (tres enlaces); cierre con la asesora; hueco; pie.        |
+-----------------------------------+
```

- El H1 se mantiene sobre blanco de 320 a 1.023 px (holgura mínima de 5,3 px a 320; sección 13). En la variante de respaldo, dos packshots se paran sobre la franja 3 a la derecha y cruzan el hueco hacia la franja 4, sin tocar el H1.
- En pantallas de 375 × 667 el botón «Cotizar por volumen» queda justo bajo el primer pantallazo (termina en 707 px); «Cotizar» sigue visible en la cabecera.
- No hay barra inferior ni botón flotante: WhatsApp y Cotizar viven en la cabecera fija.

---

## 9. Productos (catálogo) y Comparar

La página se llama **Productos** en el menú, en el H1 y en los botones. No es una planilla ni una cuadrícula de tarjetas con borde y sombra: cada producto es una **vitrina**, con su packshot parado sobre una franja Bruma azul con borde en arco y los datos debajo, sobre blanco.

**Vocabulario fijo:** *presentación* es el peso o formato (900 g, 25 kg); *referencia* es un producto en una presentación (The Cántaro Entera 900 g). La mezcla láctea nunca se llama «leche».

### Estructura

1. **Encabezado:** banda Azul Mundilácteos con borde inferior en arco. Migas, H1 «Productos» (Blanco, 72 px, ancho 125), entradilla y buscador (campo blanco, texto Azul noche, contorno de foco Blanco).
2. **Compre según su negocio:** chips Para el hogar, Por paca para tienda, Por bulto para panadería e industria, Con su marca. Aplican el filtro de uso y cambian la acción principal de cada vitrina (en «Para el hogar» pasa a «Dónde comprar»).
3. **Filtros** (panel Bruma a la izquierda): Marca, Tipo, Formato (selector Bolsa / Bulto), Presentación (chips que se ajustan en varias filas, nunca recortados) y Uso. Cada opción con su conteo; selección múltiple; resultado instantáneo; todo en la URL. Sin JavaScript se ven todos los productos.
4. **Barra de resultados** (fija bajo la cabecera al bajar): «Mostrando 4 de 9 productos» en `aria-live="polite"`, chips de filtros activos con «quitar», «Quitar filtros», Ordenar (Marca de la A a la Z, Peso de menor a mayor) y «Comparar (2)» cuando hay presentaciones marcadas.
5. **Vitrina por producto:** packshot 4:5 que rompe 56 px el arco de su franja, con sombra de contacto; marca (14 px, peso 500), nombre (H3), denominación exacta del registro (Pizarra); presentaciones como radios nativos con forma de chip (nunca `<select>`); al elegir una cambian EAN, paca, peso de la paca y rinde con fundido de 160 ms, y el enlace de la ficha; registro con «Verificar»; «Agregar a mi cotización» (verde); «Ver ficha técnica»; casilla «Comparar». La vitrina de La Becerrita lleva un filete de 4 px en Amarillo Becerrita sobre su franja.
6. **Estados de la vitrina:** *inicial* «Agregar a mi cotización»; *agregado* texto en Verde hoja con marca, «Agregado. Quitar», sincronizado con la cotización; *sin dato de paca* «Consultar» en lugar de la cifra (se puede agregar igual); *dato pendiente* «Dato a confirmar».
7. **Con su marca:** línea al final de los resultados, «Empacamos con la marca de su cadena, con registro vigente. Conocer la maquila».
8. **Qué presentación me conviene:** tabla de 5 columnas con la primera fija; se resaltan en Bruma las celdas que difieren.
9. **Sin resultados:** proponen la alternativa real con un botón.

Conteos del prototipo (salen de `catalogo.js`): 9 productos y 20 presentaciones; Marca: The Cántaro (7), La Becerrita (2); Tipo: Entera (3), Descremada (1), Azucarada (1), Mezcla láctea (3), Alimento lácteo (1). En producción solo se publica lo que el cliente confirme, y los conteos se recalculan al compilar.

### Wireframe de escritorio

```
PRODUCTOS, ESCRITORIO 1440 px   /productos/?marca=the-cantaro&formato=bolsa
+--------------------------------------------------------------------------------------------------+
| (cabecera)                                                                                       |
+--------------------------------------------------------------------------------------------------+
| (banda Azul Mundilácteos; texto Blanco)                                                          |
| Inicio / Productos                                                                               |
| Productos                                        [ Buscar por marca, peso o código          ]    |
| 9 productos y 20 presentaciones, en bolsa y en bulto.                                            |
| El precio por volumen llega con su cotización.                                                   |
+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ borde inferior en arco ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
| Compre según su negocio: (Para el hogar) (Por paca, para tienda) (Por bulto, para panadería      |
|                          e industria) (Con su marca)                                             |
+------------------------+-------------------------------------------------------------------------+
| Filtros (Bruma azul)   | Mostrando 4 de 9 productos   Ordenar [Marca, de la A a la Z v]  Comparar (2)|
| Marca                  | (The Cántaro, quitar) (Bolsa, quitar)   Quitar filtros                   |
| [x] The Cántaro (7)    |                                                                          |
| [ ] La Becerrita (2)   |      [bolsa]               [bolsa]               [bolsa]                 |
| Tipo                   |  ~~~franja Bruma~~~    ~~~franja Bruma~~~    ~~~franja Bruma~~~          |
| [ ] Entera (3)         |  The Cántaro           The Cántaro           The Cántaro                 |
| [ ] Descremada (1)     |  Entera                Descremada            Azucarada                   |
| [ ] Azucarada (1)      |  Leche en polvo        Leche en polvo        Leche en polvo              |
| [ ] Mezcla láctea (3)  |  entera adicionada     descremada 0 %        entera azucarada            |
| [ ] Alimento lácteo (1)|  con hierro            de grasa                                          |
| Formato                |  (380 g)(400 g*)       [380 g]               [380 g](400 g*)             |
| [ Bolsa | Bulto ]      |  (500 g)(800 g*)                             (500 g*)(900 g)             |
| Presentación           |  [900 g]                                                                 |
| (380 g)(400 g)(500 g)  |  Paca de 12, 10,8 kg   Paca de 30, 11,4 kg   Paca de 30, 11,4 kg         |
| (800 g)(900 g)(5 kg)   |  Rinde 7 L por bolsa   Rinde 3 L por bolsa   Rinde 3 L por bolsa         |
| (12,5 kg)(25 kg)       |  EAN 7707285613439     EAN 7707285612494     EAN 7707285611480           |
| Uso                    |  RSA-006359-2018       RSA-006359-2018       RSA-006359-2018             |
| [ ] Hogar              |  Verificar             Verificar             Verificar                   |
| [ ] Tienda             |  [Agregar a mi         [Agregar a mi         Agregado. Quitar            |
| [ ] Panadería          |   cotización]           cotización]                                      |
| [ ] Industria          |  Ver ficha técnica     Ver ficha técnica     Ver ficha técnica           |
| [ ] Institucional      |  [x] Comparar          [ ] Comparar          [x] Comparar                |
|                        |  (siguiente fila: The Cántaro Mezcla Láctea 900 g)                       |
|                        |  Con su marca: empacamos con la marca de su cadena. Conocer la maquila   |
+------------------------+-------------------------------------------------------------------------+
| Qué presentación me conviene (primera columna fija; en Bruma las celdas que difieren)            |
|                  | Hogar             | Tienda o reventa     | Panadería e industria  | Con su marca|
| Formato          | Bolsa de 380 a    | Paca de 12 a 30      | Bulto de 12,5 o 25 kg  | A definir   |
|                  | 900 g             | bolsas               |                        |             |
| Rinde            | 3 a 7 L por bolsa | 84 a 90 L por paca   | Cerca de 92 o 185 L    | Según       |
|                  |                   |                      | por bulto              | formato     |
| Dónde se compra  | Supermercado      | Directo de la planta | Directo de la planta   | Contrato    |
| Acción           | Dónde comprar     | Cotizar por paca     | Cotizar por bulto      | Pedir       |
|                  |                   |                      |                        | muestras    |
| Rinde de bolsas según el empaque (3 L la de 380 g; 7 L la de 900 g). Bultos: 135 g por litro,    |
| según la ficha técnica (dato a confirmar).                                                       |
+--------------------------------------------------------------------------------------------------+
(* dato a confirmar)
```

Notas:

- Tres vitrinas por fila a 1.440 px (en la columna de resultados de 9 columnas); dos entre 1.024 y 1.279 px. Las vitrinas no tienen marco ni sombra de interfaz; la única sombra es la de contacto del empaque.
- Datos en Encode Sans, ancho 100, con cifras tabulares. Todo dato por confirmar se rotula.
- La página se genera en HTML con todas las referencias (sirve sin JavaScript y para buscadores); el JavaScript agrega filtros, búsqueda, comparación y cotización.

### Comparar presentaciones (injerto de A la orden)

```
COMPARAR, ESCRITORIO   /productos/comparar/?p=cantaro-entera-380g,cantaro-entera-900g,cantaro-entera-25kg
+--------------------------------------------------------------------------------------------------+
| Inicio / Productos / Comparar                                                                    |
| Comparar presentaciones            [x] Mostrar solo diferencias     Copiar enlace    Imprimir    |
|                     | The Cántaro Entera  | The Cántaro Entera  | The Cántaro Entera  | [ + ]    |
|                     | 380 g  [packshot]   | 900 g  [packshot]   | 25 kg  [bulto]      | Agregar  |
| Formato             | Bolsa               | Bolsa               | Bulto               |          |
| Unidades por paca   |                  30 |                  12 |                   — | (Bruma:  |
| Peso de la paca     |             11,4 kg |             10,8 kg |    25 kg el bulto   |  difiere)|
| Rinde               |   3 L (empaque)     |   7 L (empaque)     | Cerca de 185 L *    |          |
| Rinde por paca      |                90 L |                84 L |                   — |          |
| EAN                 |       7707285613583 |       7707285613439 |  Dato a confirmar   |          |
| Registro INVIMA     |     RSA-006359-2018 |     RSA-006359-2018 |     RSA-006359-2018 |          |
| Vida útil           |            12 meses |            12 meses |            12 meses |          |
| Empaque             | Bolsa laminada de tres capas, con CO2     | Bolsa interna y saco |          |
|                     |                                           | kraft de triple capa |          |
| Uso sugerido        | Hogar, tienda       | Hogar, tienda       | Panadería, industria|          |
|                     | [ Agregar ]         | [ Agregar ]         | [ Agregar ]         |          |
| * 135 g por litro según la ficha técnica (dato a confirmar). Hasta 4 presentaciones más la       |
|   columna de atributos. A 360 px la primera columna queda fija y solo se desplaza la tabla.      |
+--------------------------------------------------------------------------------------------------+
```

- Se marca «Comparar» en cada vitrina o ficha (máximo 4). El acceso es «Comparar (n)» en la barra de resultados, no una bandeja inferior.
- Vacío: «Marque hasta 4 presentaciones para compararlas.» Imprimir usa una hoja de impresión con el globo, la fecha y la tabla.

### Wireframe móvil, hoja de filtros y panel de cotización

```
PRODUCTOS, MÓVIL 375 px
+-----------------------------------+
| [globo]       (WA) [Cotizar] Menú |
+-----------------------------------+
| (banda Azul Mundilácteos)         |
| Inicio / Productos                |
| Productos                         |  H1 36/36, ancho 112
| 9 productos y 20 presentaciones.  |
| [ Buscar por marca, peso o código]|
|~~~~~~~~~~ borde en arco ~~~~~~~~~~|
| [ Filtrar (2) ]    Ordenar        |
| (The Cántaro, x) (Bolsa, x)       |
| Mostrando 4 de 9 productos        |  aria-live="polite"
+-----------------------------------+
|  [bolsa] | The Cántaro Entera     |  vitrina horizontal: packshot al 40 %
| ~franja~ | Leche en polvo entera  |  sobre su franja; datos al 60 %
|          | adicionada con hierro  |
| (380 g) (400 g*) (500 g)          |  chips en varias filas, 48 px de alto
| (800 g*) [900 g]                  |
| Paca de 12, 10,8 kg. Rinde 7 L.   |
| EAN 7707285613439                 |
| RSA-006359-2018  Verificar        |
| [   Agregar a mi cotización    ]  |
| Ver ficha técnica   [ ] Comparar  |
+-----------------------------------+

HOJA INFERIOR «FILTRAR» (sube con borde en arco)
+-----------------------------------+
| Filtrar                    Cerrar |
| Marca   [x] The Cántaro (7)       |
|         [ ] La Becerrita (2)      |
| Tipo    (Entera 3) (Descremada 1) |
|         (Azucarada 1) (Mezcla 3)  |
| Formato [ Bolsa | Bulto ]         |
| Presentación (chips en filas)     |
| Uso     (Hogar) (Tienda)          |
|         (Panadería) (Industria)   |
| Quitar filtros                    |
| [    Mostrar 4 productos      ]   |
+-----------------------------------+
```

- La tabla «Qué presentación me conviene» mantiene la primera columna fija; solo se desplaza la tabla.
- Mi cotización se abre desde «Cotizar» de la cabecera como hoja inferior con las mismas líneas (sección 11).

---

## 10. Ficha de producto

URL por producto y por presentación (`/productos/the-cantaro-entera/900-g/`). Elegir otra presentación cambia la URL con `history.replaceState`, para que el enlace que se envía por WhatsApp abra esa misma presentación.

1. **Migas:** Inicio / Productos / The Cántaro Entera.
2. **Packshot** 4:5 sobre su franja Bruma con borde en arco; llega desde la vitrina como elemento compartido. Miniaturas como botones: frente, reverso, paca, bulto. Sin carrusel automático.
3. **Identificación:** marca, H1 (Encode Sans ancho 112, hasta 64 px), denominación exacta del registro en Pizarra, credencial «Registro INVIMA RSA-006359-2018, vigente hasta el 24/05/2028. Verificar».
4. **Presentación:** chips (radios nativos); lo no confirmado lleva asterisco y nota.
5. **Datos de venta:** EAN, paca y peso de la paca, rinde.
6. **Cantidad con su equivalencia** (injerto): «[−] 10 [+] pacas = 120 bolsas, 108,0 kg». En bultos: «[−] 2 [+] bultos = 50,0 kg; cerca de 370 L». Botón «Agregar a mi cotización»; en una presentación en bulto, «Cotizar este bulto».
7. **WhatsApp con vista previa** (injerto): «Preguntar por WhatsApp» y debajo «Mensaje que se enviará: Hola, Mundilácteos. Quiero cotizar The Cántaro Entera 900 g, 10 pacas (120 bolsas). Estoy en ____.»
8. **Para el hogar:** «Dónde comprar 900 g»: enlaces a la ficha exacta en Megatiendas, Carulla y Éxito (verificados en cada compilación; si un enlace responde 404, se oculta).
9. **Barra de anclas** fija bajo la cabecera: Presentaciones, Ficha técnica, Nutrición, Preparación, Cómo leer la bolsa, Preguntas, Dónde comprar.
10. **Ficha técnica en HTML** (`th scope="row"`): denominación, registro y vigencia, fabricante, ingredientes, fortificación, empaque (bolsa laminada de tres capas, polipropileno mate y BOPP metalizado, termosellada, en atmósfera controlada de CO₂), paca y caja (49 × 22 × 34 cm, dato a confirmar), vida útil (12 meses), almacenamiento, alérgenos («Contiene leche»), EAN. «Descargar ficha técnica (PDF, 240 KB)»: el PDF es copia, nunca el único lugar del dato.
11. **Nutrición:** tabla por 100 g y por porción, cifras tabulares (valores del cliente, formato de la Resolución 810 de 2021).
12. **Preparación:** 135 g por litro de agua según la ficha técnica; el empaque dice 3 L por 380 g y 7 L por 900 g (a unificar con el cliente).
13. **Cómo leer la bolsa:** el visor de la Home con el reverso de esta referencia.
14. **Lo que nos preguntan** (FAQPage, injerto): «¿Es leche o mezcla láctea?», «¿Cuánto rinde?», «¿Venden por paca o por bulto?», «¿Cuánto dura cerrada?».
15. **Relacionados:** otras presentaciones de este producto y productos de uso similar, en lista de texto.

### Wireframe de escritorio

```
FICHA, ESCRITORIO   /productos/the-cantaro-entera/900-g/
+--------------------------------------------------------------------------------------------------+
| Inicio / Productos / The Cántaro Entera                                                          |
|                                     | The Cántaro                                                |
|    [packshot 900 g, 4:5,            | The Cántaro Entera          (H1 64 px, ancho 112, peso 800)|
|     rompe el borde de su franja;    | Leche en polvo entera adicionada con hierro                |
|     llega desde la vitrina]         | (verificado) Registro INVIMA RSA-006359-2018, vigente      |
| ~~~~~~~~ franja Bruma en arco ~~~~~ | hasta el 24/05/2028.  Verificar                            |
| [frente] [reverso] [paca]           | Presentación: (380 g) (400 g*) (500 g) (800 g*) [900 g]    |
|                                     | EAN 7707285613439   Paca de 12, 10,8 kg   Rinde 7 L        |
|                                     | [-] 10 [+] pacas = 120 bolsas, 108,0 kg                    |
|                                     | [ Agregar a mi cotización ]   (WA) Preguntar por WhatsApp  |
|                                     | Mensaje que se enviará: «Hola, Mundilácteos. Quiero        |
|                                     | cotizar The Cántaro Entera 900 g, 10 pacas. Estoy en ___.» |
|                                     | ¿Es para su casa? Dónde comprar 900 g: Megatiendas,        |
|                                     | Carulla, Éxito                                             |
+--------------------------------------------------------------------------------------------------+
| Presentaciones  Ficha técnica  Nutrición  Preparación  Cómo leer la bolsa  Preguntas  Dónde comprar|
+--------------------------------------------------------------------------------------------------+
| Ficha técnica                                            | Descargar ficha técnica (PDF, 240 KB) |
| Denominación     Leche en polvo entera adicionada con hierro                                     |
| Registro         RSA-006359-2018, vigente hasta el 24/05/2028                                    |
| Fabricante       Inversiones Mundilácteos S.A.S., Turbaco (Bolívar)                              |
| Empaque          Bolsa laminada de tres capas, termosellada, en atmósfera controlada de CO2       |
| Paca             12 bolsas, 10,8 kg; caja de 49 x 22 x 34 cm*                                    |
| Vida útil        12 meses                                                                        |
| Alérgenos        Contiene leche                                                                  |
+--------------------------------------------------------------------------------------------------+
| Nutrición (por 100 g y por porción; valores del cliente) | Preparación: 135 g por litro de agua  |
|                                                          | según la ficha técnica*                |
+--------------------------------------------------------------------------------------------------+
| Cómo leer la bolsa (visor con el reverso de esta referencia)                                     |
| Lo que nos preguntan (acordeones, FAQPage)            | Otras presentaciones y relacionados      |
+--------------------------------------------------------------------------------------------------+
(* dato a confirmar)
```

### Wireframe móvil

```
FICHA, MÓVIL 375 px
+-----------------------------------+
| [globo]       (WA) [Cotizar] Menú |
+-----------------------------------+
| Productos / The Cántaro Entera    |
|      [packshot 900 g, 4:5]        |
| ~~~~~~~ franja Bruma en arco ~~~~ |
| [frente] [reverso] [paca]         |
| The Cántaro                       |
| The Cántaro Entera                |  H1 36/36, ancho 112
| Leche en polvo entera adicionada  |
| con hierro                        |
| (verificado) RSA-006359-2018,     |
| vigente hasta el 24/05/2028.      |
| Verificar                         |
| (380 g) (400 g*) (500 g)          |
| (800 g*) [900 g]                  |
| Paca de 12, 10,8 kg. Rinde 7 L.   |
| EAN 7707285613439                 |
| [-] 10 [+] pacas                  |
| = 120 bolsas, 108,0 kg            |
| [   Agregar a mi cotización    ]  |  52 px
| (WA) Preguntar por WhatsApp       |
| Dónde comprar 900 g               |
| > Ficha técnica                   |  acordeones con aria-expanded
| > Nutrición                       |
| > Preparación                     |
| > Cómo leer la bolsa              |
| > Lo que nos preguntan            |
| Descargar ficha técnica (PDF)     |
+-----------------------------------+
```

En móvil no hay barra fija de cantidad: el bloque de compra queda arriba y «Cotizar (n)» sigue visible en la cabecera, donde aterriza la miniatura al agregar.

---

## 11. Mi cotización y Solicitar cotización

Nombres fijos: la lista se llama **Mi cotización** (nunca carrito ni pedido); el botón de la cabecera, **Cotizar**; la acción de envío, **Solicitar cotización**; la confirmación, **Solicitud enviada**. No hay precios públicos: el sitio calcula pacas, bultos, kilos y litros, no pesos colombianos.

**Mi cotización** (panel de 420 px que entra desde la derecha, con el borde izquierdo en arco; en móvil, hoja inferior)

- Líneas con «[−] n [+] pacas» o «bultos» y los kilos; totales en vivo: «13 pacas y 2 bultos: 192,2 kg».
- Acción principal: «Solicitar cotización». Secundarias: «Enviar por WhatsApp» (con el mensaje a la vista), «Copiar enlace» (`/cotizar/?c=…`, para que un asesor envíe un pedido armado), «Vaciar la cotización» con «Deshacer».
- Se guarda en `localStorage` (clave `mundi.c1.cotizacion.v1`, en `try/catch`). Si el navegador bloquea el almacenamiento, funciona en memoria y avisa: «Este navegador no guarda la cotización. Envíela antes de cerrar la página o copie el enlace.»
- Vacía: «Su cotización está vacía. Agregue presentaciones desde Productos.» [Ver productos]

**Solicitar cotización** (`/cotizar/`): una sola página, sin cuenta. A la izquierda, «Su lista» (editable); a la derecha, «Sus datos». En móvil se apilan en ese orden.

- **Cinco campos obligatorios** (criterio 13): Nombre (`autocomplete="name"`), WhatsApp (`type="tel"`, `inputmode="numeric"`, `autocomplete="tel-national"`), Ciudad (combobox con las ciudades de Cobertura), Tipo de negocio (Hogar, Tienda, Panadería, Supermercado o cadena, Distribuidor, Industria, Institucional, Otro) y los productos, que llegan precargados desde la lista.
- **Opcionales plegados** en «Agregar datos de facturación»: razón social, NIT (`inputmode="numeric"`), correo y volumen mensual estimado.
- **Consentimiento** sin marcar por defecto, con enlace a la política (Ley 1581 de 2012).
- Nota junto al botón (injerto, redactada para este concepto): «Sin crear cuenta y sin pagos: usted pide precio y un asesor le responde.»
- Validación al salir del campo y al enviar; el foco va al primer error; resumen con enlaces a cada campo.
- Envío por `fetch` a un script PHP en Hostinger (correo SMTP al equipo comercial y acuse), con campo trampa y límite por IP. Sin JavaScript, el formulario se envía igual y el PHP responde una página de confirmación.

**Confirmación** (reemplaza el formulario; el foco pasa a su título)

- «Solicitud enviada. N.º 0142.» (número del sistema)
- Retrato y nombre del asesor de la zona elegida, tomados de `datos/asesores.json`: «[retrato] Le escribe Nombre, asesor comercial para la Costa, por WhatsApp en horario hábil.» Si no hay asesor configurado, se omite el nombre.
- Botones: «Continuar por WhatsApp» (lista y ciudad ya escritas) y «Guardar resumen en PDF».
- Fallo de envío: «No se pudo enviar la solicitud. Revise su conexión e intente de nuevo. Su cotización sigue guardada y puede enviarla por WhatsApp.»

```
SOLICITAR COTIZACIÓN, ESCRITORIO   /cotizar/
+--------------------------------------------------------------------------------------------------+
| Inicio / Solicitar cotización                                                                    |
| Solicitar cotización                          Sin crear cuenta y sin pagos: usted pide precio    |
|                                               y un asesor le responde.                           |
+-----------------------------------------------+--------------------------------------------------+
| (panel Bruma) Su lista                         | Sus datos                                        |
| The Cántaro Entera 900 g                       | Nombre                                           |
| [-] 10 [+] pacas              108,0 kg  Quitar | [                                         ]      |
| La Becerrita Mezcla Láctea 25 kg               | WhatsApp                                         |
| [-] 2 [+] bultos               50,0 kg  Quitar | [ 300 123 4567                            ]      |
| The Cántaro Azucarada 380 g                    | Ciudad                                           |
| [-] 3 [+] pacas                34,2 kg  Quitar | [ Barranquilla                          v ]      |
| --------------------------------------------   | Tipo de negocio                                  |
| 13 pacas y 2 bultos                  192,2 kg  | ( ) Tienda (o) Panadería ( ) Supermercado o      |
| Agregar más productos                          | cadena ( ) Distribuidor ( ) Industria ( ) Otro   |
|                                                | > Agregar datos de facturación (opcional)        |
|                                                | [ ] Autorizo a Inversiones Mundilácteos S.A.S.   |
|                                                |     a tratar mis datos... (Ley 1581 de 2012)     |
|                                                | [ Solicitar cotización ]  (WA) Enviar por        |
|                                                |                           WhatsApp               |
+-----------------------------------------------+--------------------------------------------------+
| Confirmación: Solicitud enviada. N.º 0142.                                                       |
| [retrato] Le escribe Nombre, asesor comercial para la Costa, por WhatsApp en horario hábil.     |
| [ Continuar por WhatsApp ]   Guardar resumen en PDF   Volver a Productos                         |
+--------------------------------------------------------------------------------------------------+
```

---

## 12. Resto de páginas

### Calidad (`/calidad/`)

- H1 «Calidad y registros» (en el menú, «Calidad»). Entradilla: «Cada número de esta página se puede comprobar en una fuente pública.»
- **Registros INVIMA:** tabla con denominación, número (cifra gráfica a 48 px en peso 300), modalidad, vigencia y «Copiar número / Abrir consulta». Fecha de última verificación.
- **Concepto sanitario favorable** del establecimiento N.º 24741, línea «Leches en polvo y crema de leches en polvo», con enlace a datos.gov.co.
- **ISO 9001:2015:** solo cuando lleguen ente, número, alcance y vigencia, con «Descargar certificado (PDF)» y el enlace de verificación del ente. Mientras tanto, la sección no existe.
- **Así trabajamos** (secuencia real, numerada): 1 Recepción, 2 Análisis, 3 Empaque en atmósfera de CO₂, 4 Sellado con lote y vencimiento, 5 Despacho. Fotos P01 a P05 en ventanas de franja.
- **Cómo leer una bolsa** completo, con las cinco zonas.
- **Documentos:** fichas técnicas en HTML con su PDF rotulado («PDF, 240 KB»).
- **PQR:** «¿Encontró un problema con un producto? Tenga a mano el lote y escríbanos.» Enlace a Contacto con el motivo ya elegido.

```
CALIDAD, ESCRITORIO
+--------------------------------------------------------------------------------------------------+
| Inicio / Calidad                                                                                 |
| Calidad y registros                    (H1 72 px, ancho 125, Azul Mundilácteos)                  |
| Cada número de esta página se puede comprobar en una fuente pública.                             |
+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ borde superior en arco ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
| (banda Azul noche) Registro          Ampara                        Modalidad    Vence            |
| RSA-006359-2018 (48 px, 300)         Leche en polvo: entera...     Fabricar     24/05/2028       |
|                                      [ Copiar número ]  Abrir consulta del INVIMA                |
| (cuatro filas más)                   Última verificación: 25/09/2026                             |
| (verificado) Concepto sanitario favorable, establecimiento N.º 24741.  Ver en datos.gov.co      |
+--------------------------------------------------------------------------------------------------+
| Así trabajamos                                                                                   |
| 1 Recepción   2 Análisis   3 Empaque en CO2   4 Sellado con lote y vencimiento   5 Despacho      |
| [foto P01 en ventana de franja]      [foto P02]       [foto P03]                                 |
+--------------------------------------------------------------------------------------------------+
| Cómo leer una bolsa (visor)   |   Documentos: fichas técnicas (HTML y PDF)   |   PQR con el lote  |
+--------------------------------------------------------------------------------------------------+
```

### Por qué elegirnos (`/por-que-elegirnos/`)

- H1 «Por qué elegirnos». Entradilla: «Seis razones, cada una con la forma de comprobarla.»
- **Seis razones en franjas alternas** (foto o documento a un lado, texto al otro), sin numerar porque no son una secuencia, cada una con su verbo:
  - Cinco registros sanitarios vigentes (Verificar).
  - Concepto sanitario favorable (Ver en datos.gov.co).
  - Planta propia en Europark (Solicitar visita a la planta).
  - Bolsa de tres capas sellada con CO₂ y 12 meses de vida útil (Ver ficha técnica).
  - De 380 g a 25 kg, y con su marca (Ver productos).
  - Despacho a todo el país con asesor por zona (Ver cobertura).
- **Lo que nos preguntan antes de comprar** (injerto, FAQPage): preguntas en voz de persona con la respuesta y su prueba. «¿Tienen registro sanitario?» Sí, cinco vigentes; compruébelos en el INVIMA. «¿Despachan fuera de la Costa?» Sí, desde Turbaco a todo el país; vea los tiempos por ciudad. «¿Empacan con la marca de mi cadena?» Sí, con nuestro registro vigente; conozca la maquila. «¿Cuánto dura cerrada?» 12 meses en lugar fresco y seco; vea la ficha técnica. «¿Cómo pido precio?» Arme su cotización sin crear cuenta. Preguntas en Encode Sans 24 px peso 600; respuestas en Source Serif.
- Testimonios solo reales, con nombre, negocio, ciudad y autorización. Cierre: «Cotizar por volumen» y «Escribir a un asesor».

### Cobertura (`/cobertura/`)

- H1 «Distribución y cobertura» (en el menú, «Cobertura»). Entradilla: «Salimos de Turbaco hacia toda Colombia. Elija su ciudad para ver el tiempo de entrega y quién le atiende.»
- **Anillos desde Turbaco** a tamaño completo: anillo 1, Costa Caribe (24 a 72 h); anillo 2, resto del país (3 a 6 días hábiles). Tiempos, pedido mínimo y días de despacho por confirmar.
- **Tabla de ciudades** (alternativa accesible completa): ciudad, tiempo, pedido mínimo, asesor y «Cotizar para Barranquilla».
- **Ser distribuidor:** formulario corto (empresa, ciudad, zona que atiende, WhatsApp y consentimiento).
- «¿Su ciudad no está? Escríbanos y le decimos cómo llegar.» Enlace a Dónde comprar.

```
COBERTURA, ESCRITORIO
+--------------------------------------------------------------------------------------------------+
| Distribución y cobertura                                                                         |
| Salimos de Turbaco hacia toda Colombia. Elija su ciudad para ver el tiempo de entrega y quién    |
| le atiende.                                                                                      |
+-----------------------------------------------+--------------------------------------------------+
|  Turbaco ( )) ))  )))   )))    ))))          | Ciudad          Entrega*     Mínimo*   Asesor    |
|  origen    anillo 1: Costa Caribe            | Cartagena       24 h         —         Nombre    |
|            o Barranquilla  o Santa Marta     | > Barranquilla  24 a 72 h    —         Nombre    |
|            o Sincelejo  o Montería           | Santa Marta     24 a 72 h    —         Nombre    |
|            anillo 2: resto del país          | Montería        24 a 72 h    —         Nombre    |
|            o Medellín  o Bogotá  o Cali      | Medellín        3 a 6 días   —         Nombre    |
|  (el tramo de la ciudad elegida se dibuja    | Bogotá          3 a 6 días   —         Nombre    |
|   desde Turbaco en Azul cielo)               | (tabla = alternativa accesible del diagrama)     |
+-----------------------------------------------+--------------------------------------------------+
| Barranquilla: entrega en 24 a 72 h desde la confirmación*. Le atiende Nombre.                    |
| [ Escribir al asesor de la Costa ]   Mensaje: «Hola, Mundilácteos. Quiero cotizar despacho a     |
| Barranquilla.»                        Cotizar para Barranquilla                                  |
+--------------------------------------------------------------------------------------------------+
| Ser distribuidor (formulario corto)                  ¿Es para su casa? Dónde comprar             |
+--------------------------------------------------------------------------------------------------+
(* dato a confirmar)
```

### Dónde comprar (`/cobertura/donde-comprar/`)

- H1 «Dónde comprar». Entradilla: «The Cántaro está en supermercados de la Costa y del país. Busque su ciudad.»
- Campo de ciudad y botón «Usar mi ubicación» (criterio 15). Resultados en lista: punto de venta, horario, WhatsApp si lo tiene y «Cómo llegar» (enlace a Google Maps o Waze). El mapa se carga solo si la persona lo pide.
- En línea: enlaces a la ficha exacta en Megatiendas, Carulla y Éxito, y a Rappi, verificados en cada compilación.
- Sin cobertura: «Aún no tenemos un punto de venta en su ciudad. Si tiene una tienda, puede ser distribuidor.» [Ser distribuidor]
- La lista de puntos de venta con horario la entrega el cliente (sección 19).

### Con su marca (`/productos/marca-propia/`)

- H1 «Leche en polvo con la marca de su cadena». Entradilla: «Empacamos en Turbaco con nuestro registro sanitario vigente.»
- Qué ofrecemos: gramajes autorizados, tipos de leche, empaque (bolsa, paca, bulto), registro que ampara (RSA-006359-2018; condiciones a confirmar).
- Cómo trabajamos (secuencia real, numerada): 1 Muestras y especificación, 2 Arte del empaque (lo aporta la cadena), 3 Aprobación de arte y registro, 4 Producción y despacho.
- Ficha de especificación en HTML; «Lo que no lleva» solo si el cliente lo certifica.
- «No publicamos las marcas que empacamos sin autorización escrita.» Formulario «Pedir muestras»: empresa, NIT, cargo, presentaciones, volumen mensual, ciudad, contacto y consentimiento.

### Nosotros (`/nosotros/`)

- **Globo reducido** (diámetro de 560 px en escritorio y 136vw en móvil) con la foto del equipo en su franja y el H1 «Nosotros» en el paralelo 10; misma verificación geométrica del hero.
- Entradilla: «Una empresa familiar con planta en Turbaco, Bolívar.»
- **Historia** con años reales como marcadores (es una secuencia): constitución (2011, dato a confirmar), planta en Europark, registros, marcas.
- **La familia:** quién fundó la empresa y por qué, foto real y cita corta firmada.
- **La planta:** dirección, coordenadas para transportadores (dato por confirmar con GPS), «Cómo llegar» y «Solicitar visita a la planta».
- **Las personas:** retratos R01 a R06 con nombre y cargo; foto N01 del equipo completo.
- **Nuestras marcas:** The Cántaro, La Becerrita y Con su marca, con enlaces. Cierre: «Por qué elegirnos».

### Recursos (`/recursos/`)

- H1 «Recursos». Lista de texto filtrable por tema: Para su casa, Para su negocio, Calidad.
- Primeros artículos: «Cómo verificar un registro sanitario en el INVIMA», «Leche en polvo o mezcla láctea: cómo diferenciarlas en la etiqueta», «Cómo preparar un litro con leche en polvo», «Cómo guardar un bulto abierto» y «Arroz con leche costeño» (Recipe, probada antes de publicar).
- Plantilla: H1, entradilla, cuerpo en Source Serif 18/29 a 68 caracteres, tablas con cifras tabulares, «Productos mencionados» y un cierre según el tema.
- Biblioteca de fichas técnicas: cada ficha en HTML con su PDF rotulado.

### Contacto (`/contacto/`)

- H1 «Contacto». Asesores por zona con retrato, nombre, zona y «Escribir por WhatsApp» con mensaje prellenado; teléfono 319 769 0990; correo (dato a confirmar: el dominio impreso en los sacos no resuelve); dirección con «Cómo llegar»; horario.
- Formulario «Escríbanos»: motivo (Cotización, Con su marca, Petición, queja o reclamo, Proveedores, Trabaje con nosotros, Otro), nombre, WhatsApp, ciudad, mensaje y consentimiento. Si el motivo es Cotización, se sugiere «Solicitar cotización».
- Sin mapa incrustado: foto P06 de la fachada y enlace externo.

### 404 y páginas legales

- 404: el globo con las franjas en Bruma azul (sin fotos) y el H1 «Esta página no existe.» en el paralelo 10. Texto: «Busque un producto o vuelva al inicio.» Con el buscador y WhatsApp.
- Política de tratamiento de datos (Ley 1581 de 2012), términos y aviso breve junto a cada formulario. Sin cookies de terceros; analítica sin cookies o con consentimiento previo.

---

## 13. Elemento firma: el globo de paralelos

El logo de Mundilácteos a escala monumental. Sus franjas son ventanas a la planta, a su gente y al producto; por el **paralelo 10**, la franja blanca del medio, corre el titular, igual que el nombre cruza el globo en el logo actual. Es el único gesto audaz del sitio.

**Dónde aparece:** completo en el hero de la Home; reducido en Nosotros; vacío (franjas en Bruma) en la 404. En ningún otro lugar.

### Geometría corregida

Los jueces detectaron que, con la geometría propuesta, el H1 de tres líneas a 120 px (342 px de alto) no cabía en la franja blanca (unos 224 px útiles) y habría caído sobre las fotos. Se corrigió así:

1. **El titular cruza el globo completo en dos líneas** en escritorio («Leche en polvo de Turbaco / para toda Colombia.»), a `min(5.4rem, 5.9vw, 0.1 × D)`. Es más fiel al logo: el nombre atraviesa todo el globo. El tope `0.1 × D` (0,08 × D en móvil y tableta) garantiza que el titular quepa aunque la pantalla sea baja.
2. **El paralelo 10 se ensancha** a 0,26 del diámetro en escritorio y a 0,30 en móvil y tableta.
3. **La sagita de todos los arcos baja al 3 %** del diámetro.
4. **El globo se posiciona a partir del carril del titular**, no al revés: su borde superior queda a `carril − D × (b0 + sagita)`, así el H1 siempre queda centrado en la zona útil.
5. **La bajada y los botones tienen un ancho máximo calculado** para no tocar el círculo.

Todas las medidas se expresan en fracciones del diámetro D, medidas desde el borde superior del globo. Los bordes son arcos parabólicos, más bajos en el centro: `y(x) = y0 + 4 · s · x · (1 − x)`, con x de 0 a 1 en el ancho del globo.

| Franja | Escritorio (≥ 1.024 px) | Móvil y tableta (< 1.024 px) | Contenido |
|---|---|---|---|
| F1 | 0 a 0,200 | 0 a 0,160 | Foto H01: fachada y cielo |
| Hueco | 0,200 a 0,225 | 0,160 a 0,185 | Blanco |
| F2 | 0,225 a 0,385 | 0,185 a 0,340 | Foto H02: el equipo |
| **Paralelo 10** | **0,385 a 0,645 (0,26)** | **0,340 a 0,640 (0,30)** | Blanco; el H1 |
| F3 | 0,645 a 0,815 | 0,640 a 0,820 | Foto H03: producto en estiba |
| Hueco | 0,815 a 0,840 | 0,820 a 0,845 | Blanco |
| F4 | 0,840 a 1 | 0,845 a 1 | Azul Mundilácteos liso; el destello |
| Sagita | 0,03 | 0,03 | |

| Parámetro | Escritorio (≥ 1.024) | Tableta (600 a 1.023) | Móvil (< 600) |
|---|---|---|---|
| Diámetro D | `min(1040px, 72vw, 116vh)` | `min(112vw, 78vh)` | `136vw` |
| Borde izquierdo del globo | `margen + 0,34 × (100vw − 2 × margen)` | `−6vw` | `−6vw` |
| Carril del titular (desde el tope del hero) | `clamp(160px, 30vh, 300px)` | `0,27 × D` | `0,27 × D` |
| Borde superior del globo | `carril − 0,415 × D` (queda bajo la cabecera) | `−0,10 × D` | `−0,10 × D` |
| Alto del carril | `0,23 × D` | `0,27 × D` | `0,27 × D` |
| H1 | 2 líneas, ancho 125, `min(5.4rem, 5.9vw, 0.1 × D)` | 3 líneas, ancho 112, `min(clamp(2.75rem, 7.2vw, 4rem), 0.08 × D)` | 3 líneas, ancho 112, `min(clamp(2.25rem, 10.4vw, 2.75rem), 0.08 × D)` |
| Bajada y botones | A la izquierda del círculo; ancho máximo `min(28rem, borde del globo + 0,03 × D − margen − 24px)` | Debajo del globo | Debajo del globo |

### Verificación

Maqueta en `conceptos/concepto-1/verificacion-hero/hero.html`, con Encode Sans y Source Serif 4 servidas y las imágenes de `compartido/img-cliente/`. El script `verificar.js` (Playwright y Chromium) mide cada línea del H1 con su tinta real (ascendentes con tilde y descendentes de «p»), recorre el ancho del globo cada 2 px y comprueba que la tinta queda dentro del paralelo 10 donde la línea está dentro del círculo, y que bajada, botones y credencial no tocan el círculo. Resultado del 25/09/2026, variantes de respaldo y con fotos: **las 11 pantallas en OK**.

| Pantalla | D | Paralelo 10 | H1 | Ancho de las líneas | Holgura mínima arriba / abajo | Choques | Fin del botón «Cotizar por volumen» |
|---|---|---|---|---|---|---|---|
| 1.920 × 1.080 | 1.040 px | 270 px | 86,4 px, 2 líneas | 1.262 / 954 px | 30,5 / 24,9 px | 0 | 835 px |
| 1.440 × 900 | 1.037 | 270 | 85,0 | 1.244 / 937 | 31,4 / 26,6 | 0 | 804 |
| 1.440 × 640 (pantalla baja) | 742 | 193 | 74,2 | 1.082 / 819 | 8,9 / 3,5 | 0 | 658 |
| 1.280 × 800 | 922 | 240 | 75,5 | 1.104 / 834 | 28,3 / 23,2 | 0 | 740 |
| 1.024 × 768 | 737 | 192 | 60,4 | 880 / 668 | 22,3 / 18,1 | 0 | 698 |
| 900 × 600 (tableta apaisada) | 468 | 140 | 37,4, 3 líneas | 288 / 307 / 290 | 6,5 / 12,2 | 0 | 643 |
| 768 × 1.024 | 799 | 240 | 55,3, 3 líneas | 427 / 456 / 429 | 23,9 / 29,2 | 0 | 941 |
| 390 × 844 | 530 | 159 | 40,6, 3 líneas | 312 / 334 / 315 | 9,7 / 12,8 | 0 | 726 |
| 375 × 667 | 510 | 153 | 39,0 | 301 / 320 / 302 | 9,5 / 11,3 | 0 | 707 |
| 360 × 640 | 490 | 147 | 37,4 | 288 / 307 / 290 | 9,4 / 10,8 | 0 | 689 |
| 320 × 568 | 435 | 131 | 34,8 | 266 / 285 / 269 | 5,3 / 8,0 | 0 | 666 |

Capturas en `verificacion-hero/capturas/`: `var-resp-*` (variante de respaldo) y `var-foto-*` (con la foto provisional, que corta caras y confirma que hace falta la sesión H01 a H03). En producción, el mismo script corre en cada compilación sobre la plantilla real.

### Implementación

- Un `<figure class="globo">` recortado con `clip-path: circle(50%)`. Dentro, cuatro `<div class="franja fN">` posicionados con `top` y `height` en porcentaje del globo, cada uno con su `clip-path: url(#fN)` (`clipPathUnits="objectBoundingBox"`, relativo a su propio rectángulo) y un `<picture>` con `object-fit: cover`. Cada foto se entrega recortada a su franja (unos 5:1), así pesa poco: las tres suman 150 KB o menos en móvil.
- Recortes normalizados (escritorio; en móvil cambian los valores según la tabla):

```
F1  top 0 %,     alto 23 %:  M0,0 L1,0 L1,0.8696 Q0.5,1.1304 0,0.8696 Z
F2  top 22,5 %,  alto 19 %:  M0,0 Q0.5,0.3158 1,0 L1,0.8421 Q0.5,1.1579 0,0.8421 Z
F3  top 64,5 %,  alto 20 %:  M0,0 Q0.5,0.3 1,0 L1,0.85 Q0.5,1.15 0,0.85 Z
F4  top 84 %,    alto 16 %:  M0,0 Q0.5,0.375 1,0 L1,1 L0,1 Z
Móvil: F1 top 0 %, alto 19 %; F2 top 18,5 %, alto 18,5 %; F3 top 64 %, alto 21 %; F4 top 84,5 %, alto 15,5 %.
```

- Texto alternativo: F2 lleva «Equipo de Mundilácteos frente a la planta del Parque Industrial Europark, Turbaco»; F1 y F3 llevan su propia descripción («Fachada de la planta en Europark», «Pacas de leche en polvo en estiba»). F4 es decorativa.
- H1 con `<br>` por ancho: `Leche en polvo<br class="m"> de Turbaco<br class="d"> para<br class="m"> toda Colombia.` (`.d` visible desde 1.024 px, `.m` por debajo). El lector de pantalla lee una sola frase.
- **El destello:** arco blanco de 0,14 D de largo y 0,012 D de grueso, con remates redondos, que sigue el arco de la franja 4.
- **Plantilla de encuadre para el fotógrafo:** rectángulo de 5:1 por franja con dos zonas marcadas: la segura (80 % central del ancho y 60 % central del alto) y la de recorte (bordes que el círculo y los arcos se comen). Ninguna cara fuera de la zona segura. Si una toma no funciona cortada, se usa en Nosotros y no en el hero.
- **Variante de respaldo** (la de lanzamiento mientras no exista la sesión de fotos): F1 Azul Mundilácteos, F2 Bruma azul, F3 Azul Mundilácteos con brillo radial de Azul cielo, F4 Azul Mundilácteos. Tres packshots (The Cántaro 900 g, La Becerrita 900 g y un bulto de 25 kg, con empaque «Nueva imagen») se paran sobre la franja 3, a la derecha del fin de la línea 2, y suben hacia el paralelo 10 sin tocar la tinta del H1, con sombra de contacto. En móvil, dos packshots dentro de F3 cruzan el hueco hacia F4. Cada franja puede pasar a foto por separado, a medida que llegan las tomas.
- Sin JavaScript o con movimiento reducido, el globo aparece armado desde el primer pintado. La carga orquestada está en la sección 5.7.

**Por qué es propio:** es el activo de marca que el cliente ya tiene, llevado a escala y convertido en un marco para la prueba de origen. No es una fila de productos, no es una cifra que engorda y no es una ilustración decorativa.

---

## 14. Microcopy

### Glosario (siempre las mismas palabras)

| Término | Significa | Nunca decir |
|---|---|---|
| Presentación | El peso o formato: 380 g, 900 g, 25 kg | Tamaño, SKU |
| Referencia | Un producto en una presentación: The Cántaro Entera 900 g | Ítem |
| Paca / bulto | Bolsas agrupadas / saco de 12,5 o 25 kg | Caja, costal (como unidad de venta) |
| Mezcla láctea | Mezcla en polvo a base de leche | Leche (nunca, para una mezcla) |
| Mi cotización | La lista que arma la persona | Carrito, pedido, comprar, pagar |
| Cotizar / Solicitar cotización | Abrir la lista / pedir precio | Checkout, enviar pedido |
| Verificar | Comprobar un dato en su fuente pública | Certificado por, garantizado |
| Asesor | La persona que responde, con nombre | Agente, bot |

### Textos por lugar

**Cabecera:** «Buscar» (etiqueta «Buscar productos»; ejemplo «Marca, peso o código»), «Dónde comprar», «WhatsApp» (nombre accesible «Escribir por WhatsApp»), «Cotizar» o «Cotizar (3)» (nombre accesible «Cotizar, 3 referencias en su cotización»), «Menú», «Cerrar».

**Hero**
- H1: «Leche en polvo de Turbaco para toda Colombia.»
- Bajada: «The Cántaro y La Becerrita, en bolsa de 380 a 900 g y en bulto de hasta 25 kg. Despachamos a tiendas, panaderías, supermercados e industria.»
- Botones: «Cotizar por volumen» (primario) y «Ver productos».
- Credencial: «Registro INVIMA RSA-006359-2018, vigente hasta el 24/05/2028.» Enlace: «Verificar».

**Vitrina de la Home**
- H2: «The Cántaro, La Becerrita y la marca de su cadena.» Enlace: «Ver todos los productos».
- «Con su marca: empacamos para cadenas y distribuidores, con registro vigente.» Enlace: «Conocer la maquila».
- «Compre según su negocio»: «Para el hogar», «Por paca, para tienda», «Por bulto, para panadería e industria», «Con su marca».
- Línea de acción, hogar: «En Cartagena la encuentra en Megatiendas, Carulla y Éxito.» [Ver dónde comprar]
- Línea de acción, tienda: «Pacas de 12 a 30 bolsas, despachadas desde Turbaco.» [Cotizar por paca] «Mensaje que se enviará: Hola, Mundilácteos. Quiero cotizar pacas para mi tienda en ____.»

**Registros**
- H2: «Cinco registros sanitarios vigentes. Verifíquelos usted mismo.» Bajada: «Copie el número y consúltelo en el INVIMA. Así comprueba cualquier producto antes de comprarlo.»
- «Copiar número» → «Número copiado». «Abrir consulta del INVIMA». «Concepto sanitario favorable del establecimiento N.º 24741.» «Ver en datos.gov.co». «Última verificación: 25/09/2026.» «Todas las razones».

**Cómo leer una bolsa**
- Zonas: «Registro sanitario», «Lote», «Vencimiento», «Peso neto», «Tabla nutricional».
- Registro sanitario: «Es el número que el INVIMA asigna a este producto. Cópielo y verifíquelo.»
- Lote (dato a confirmar con el cliente): «Indica el día y el turno de empaque. Con él rastreamos cada bolsa.»
- Enlace: «Ver las cinco zonas en texto».

**Planta y gente:** H2 «Una planta en Turbaco y la gente que la hace funcionar.» Enlaces: «Cómo llegar», «Solicitar visita a la planta», «Conocer a Mundilácteos».

**Anillos:** H2 «Salimos de Turbaco. Elija su ciudad.» Resultado: «Barranquilla: entrega en 24 a 72 h. Tiempo de ejemplo, por confirmar.» «Le atiende Nombre, asesor para la Costa.» Botón: «Escribir al asesor de la Costa». Enlace: «Ver cobertura».

**Tres formas de comprar:** «En su supermercado», «Directo de la planta», «Con su marca». Enlaces: «Ver dónde comprar», «Cotizar por volumen», «Conocer la maquila».

**Cierre:** H2 «¿Prefiere hablar con alguien de la planta?» Acciones: «Escribir por WhatsApp», «Llamar al 319 769 0990», «Enviar una solicitud».

**Productos**
- Entradilla: «9 productos y 20 presentaciones, en bolsa y en bulto. El precio por volumen llega con su cotización.» (conteos calculados)
- «Filtrar (2)», «Mostrar 4 productos», «Quitar filtros», «Mostrando 4 de 9 productos», «The Cántaro, quitar filtro».
- «Agregar a mi cotización» → «Agregado. Quitar». Aviso: «The Cántaro Entera 900 g agregada, 1 paca. Su cotización tiene 3 referencias.» [Deshacer]
- Sin resultados de filtros: «No hay La Becerrita en bulto de 12,5 kg. Hay en 25 kg.» [Ver La Becerrita 25 kg]
- Sin resultados de búsqueda: «No encontramos “cantaro 700”. La presentación más cercana es 800 g.» [Ver 800 g]
- «Dato a confirmar», «Consultar».

**Comparar:** «Comparar presentaciones», «Mostrar solo diferencias», «Copiar enlace» → «Enlace copiado», «Imprimir», «Marque hasta 4 presentaciones para compararlas.»

**Ficha:** «Verificar», «Presentación», «10 pacas de 900 g = 120 bolsas, 108,0 kg», «Agregar a mi cotización», «Cotizar este bulto», «Preguntar por WhatsApp», «Mensaje que se enviará: …», «¿Es para su casa? Dónde comprar 900 g», «Descargar ficha técnica (PDF, 240 KB)».

**Mi cotización y Cotizar**
- «13 pacas y 2 bultos: 192,2 kg». «Solicitar cotización», «Enviar por WhatsApp», «Copiar enlace», «Vaciar la cotización» → «Cotización vaciada.» [Deshacer]
- «Sin crear cuenta y sin pagos: usted pide precio y un asesor le responde.»
- Consentimiento (sin marcar): «Autorizo a Inversiones Mundilácteos S.A.S. a tratar mis datos para responder esta solicitud, según la Política de tratamiento de datos (Ley 1581 de 2012).»
- Errores: «Escriba un número de WhatsApp de 10 dígitos, por ejemplo 300 123 4567.» / «Elija su ciudad para saber quién le atiende.» / «Para enviar la solicitud, autorice el tratamiento de sus datos.» / Resumen: «Revise 2 campos antes de enviar.»
- Confirmación: «Solicitud enviada. N.º 0142.» «Le escribe Nombre, asesor comercial para la Costa, por WhatsApp en horario hábil.» [Continuar por WhatsApp] [Guardar resumen en PDF]
- Fallo: «No se pudo enviar la solicitud. Revise su conexión e intente de nuevo. Su cotización sigue guardada y puede enviarla por WhatsApp.»
- Vacía: «Su cotización está vacía. Agregue presentaciones desde Productos.» [Ver productos]

**Mensajes de WhatsApp prellenados** (siempre con espacio para la ciudad)
- General: «Hola, Mundilácteos. Quiero cotizar leche en polvo para mi negocio en ____.»
- Desde la ficha: «Hola, Mundilácteos. Quiero cotizar The Cántaro Entera 900 g, 10 pacas (120 bolsas). Estoy en ____.»
- Desde un bulto: «Hola, Mundilácteos. Quiero cotizar The Cántaro Entera 25 kg. Ciudad: ____.»
- Desde los anillos: «Hola, Mundilácteos. Quiero cotizar despacho a Barranquilla.»
- Desde la cotización: «Hola, Mundilácteos. Quiero cotizar: The Cántaro Entera 900 g, 10 pacas (108,0 kg); La Becerrita Mezcla Láctea 25 kg, 2 bultos (50,0 kg). Ciudad: Barranquilla. Negocio: panadería.»

**Otras páginas:** Calidad «Cada número de esta página se puede comprobar en una fuente pública.»; Por qué elegirnos «Seis razones, cada una con la forma de comprobarla.» y «Lo que nos preguntan antes de comprar»; Cobertura «Salimos de Turbaco hacia toda Colombia. Elija su ciudad para ver el tiempo de entrega y quién le atiende.»; Nosotros «Una empresa familiar con planta en Turbaco, Bolívar.»; 404 «Esta página no existe. Busque un producto o vuelva al inicio.»; pie «Leche en polvo hecha en Turbaco, Bolívar, con registro INVIMA vigente.»

---

## 15. Tokens CSS

```css
/* Concepto 1: Paralelo 10. Tokens base, móvil primero. Solo colores de MARCA.md. */

/* Fuentes autoalojadas en /fuentes/ (subconjunto latin) */
@font-face {
  font-family: "Encode Sans";
  src: url("/fuentes/encode-sans-latin-var.woff2") format("woff2");
  font-weight: 100 900;
  font-stretch: 75% 125%;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
    U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}
@font-face {
  font-family: "Source Serif 4";
  src: url("/fuentes/source-serif-4-op20-400-latin.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Source Serif 4";
  src: url("/fuentes/source-serif-4-op20-600-latin.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
/* Respaldos métricos (fontTools contra Liberation Sans y Serif; recalibrar en navegador) */
@font-face {
  font-family: "Encode Sans Fallback";
  src: local("Arial"), local("ArialMT"), local("Liberation Sans");
  size-adjust: 99.6%; ascent-override: 103.4%; descent-override: 22.1%; line-gap-override: 0%;
}
@font-face {
  font-family: "Encode Sans Display Fallback";
  src: local("Arial Bold"), local("Arial-BoldMT"), local("Liberation Sans Bold");
  font-weight: 800;
  size-adjust: 116.5%; ascent-override: 88.4%; descent-override: 18.9%; line-gap-override: 0%;
}
@font-face {
  font-family: "Source Serif Fallback";
  src: local("Times New Roman"), local("TimesNewRomanPSMT"), local("Liberation Serif");
  size-adjust: 110.7%; ascent-override: 93.6%; descent-override: 30.3%; line-gap-override: 0%;
}

:root {
  color-scheme: light;

  /* Color: primitivos (hex como respaldo; OKLCH en @supports más abajo) */
  --c-azul-noche: #0B1F4F;
  --c-azul-marca: #0A2F8F;
  --c-azul-cielo: #1090E0;
  --c-cielo-profundo: #0B6FB8;
  --c-bruma: #EEF4FB;
  --c-blanco: #FFFFFF;
  --c-pizarra: #4A5877;
  --c-verde-marca: #4AA603;
  --c-verde-hoja: #2D7A12;
  --c-verde-bosque: #236310;
  --c-amarillo-becerrita: #EAC55E;
  --c-rojo-error: #B42318;

  /* Color: roles */
  --color-fondo: var(--c-blanco);
  --color-panel: var(--c-bruma);
  --color-texto: var(--c-azul-noche);                 /* 15,87:1 */
  --color-texto-secundario: var(--c-pizarra);         /* 7,11:1; nunca sobre bandas */
  --color-titular: var(--c-azul-marca);               /* 11,56:1 */
  --color-banda: var(--c-azul-marca);
  --color-banda-oscura: var(--c-azul-noche);
  --color-sobre-banda: var(--c-blanco);
  --color-sobre-banda-suave: var(--c-bruma);          /* cifras de registro, 14,34:1 */
  --color-enlace: var(--c-cielo-profundo);            /* 5,28:1, siempre subrayado */
  --color-enlace-banda: var(--c-blanco);
  --color-accion: var(--c-verde-hoja);                /* blanco encima 5,38:1 */
  --color-accion-hover: var(--c-verde-bosque);        /* blanco encima 7,33:1 */
  --color-sobre-accion: var(--c-blanco);
  --color-anillo-accion: var(--c-blanco);             /* botón verde sobre bandas azules */
  --color-confirmacion: var(--c-verde-hoja);
  --color-verificado-oscuro: var(--c-verde-marca);    /* 5,10:1 sobre Azul noche */
  --color-seleccion-fondo: var(--c-azul-marca);       /* chip elegido */
  --color-seleccion-texto: var(--c-blanco);
  --color-destello: var(--c-azul-marca);
  --color-destello-oscuro: var(--c-azul-cielo);       /* 4,60:1 sobre Azul noche, no texto */
  --color-brillo: rgb(16 144 224 / 0.25);             /* Azul cielo al 25 % */
  --color-sombra-contacto: rgb(11 31 79 / 0.35);      /* Azul noche */
  --color-velo: rgb(11 31 79 / 0.48);
  --color-borde-control: var(--c-pizarra);
  --color-error: var(--c-rojo-error);                 /* siempre con icono y texto */
  --color-becerrita: var(--c-amarillo-becerrita);     /* solo en su contexto */
  --color-foco: var(--c-azul-noche);
  --color-foco-banda: var(--c-blanco);

  /* Tipografía */
  --fuente-sans: "Encode Sans", "Encode Sans Fallback", Arial, sans-serif;
  --fuente-display: "Encode Sans", "Encode Sans Display Fallback", Arial, sans-serif;
  --fuente-serif: "Source Serif 4", "Source Serif Fallback", Georgia, serif;
  --fs-13: 0.8125rem;  --fs-14: 0.875rem;  --fs-16: 1rem;     --fs-17: 1.0625rem;
  --fs-18: 1.125rem;   --fs-19: 1.1875rem; --fs-21: 1.3125rem; --fs-24: 1.5rem;
  --fs-28: 1.75rem;    --fs-32: 2rem;      --fs-36: 2.25rem;   --fs-48: 3rem;   --fs-72: 4.5rem;

  --h1-hero-fs: min(clamp(2.25rem, 10.4vw, 2.75rem), calc(0.08 * var(--globo-d)));
  --h1-hero-wdth: 112%;  --h1-hero-lh: 0.95;
  --h1-fs: clamp(2.25rem, 1.46rem + 3.38vw, 4.5rem);  --h1-wdth: 112%;  --h1-lh: 1;
  --h2-fs: clamp(2rem, 1.47rem + 2.25vw, 3.5rem);     --h2-wdth: 112%;  --h2-lh: 1.02;
  --h3-fs: var(--fs-21);                              --h3-lh: 1.15;
  --cifra-registro-fs: clamp(1.875rem, 9.6vw, 2.25rem);  --cifra-registro-wdth: 112%;
  --entradilla-fs: var(--fs-19);  --entradilla-lh: 1.45;
  --cuerpo-fs: var(--fs-17);      --cuerpo-lh: 1.6;
  --ui-fs: var(--fs-16);          --ui-lh: 1.5;
  --meta-fs: var(--fs-14);        --meta-lh: 1.43;
  --medida-texto: 68ch;

  /* Espacio (base 8 px) */
  --esp-1: 0.25rem; --esp-2: 0.5rem; --esp-3: 1rem;  --esp-4: 1.5rem;
  --esp-5: 2rem;    --esp-6: 3rem;   --esp-7: 4rem;  --esp-8: 6rem;
  --seccion: var(--esp-7);

  /* Retícula */
  --contenedor: 82rem;                  /* 1.312 px */
  --margen: 1rem;
  --canal: 1rem;
  --columnas: 4;
  --cabecera-alto: 56px;

  /* Forma: controles de 8 px, chips en píldora, fotos y bandas sin radio (su forma es el arco) */
  --radio-control: 8px;
  --radio-chip: 999px;
  --radio-0: 0;
  --arco-sagita: clamp(24px, 3vw, 48px);       /* bordes de banda, más bajos en el centro */
  --hueco: clamp(16px, 1.6vw, 24px);           /* entre dos bandas azules */
  --destello-ancho: 24px;
  --destello-grueso: 3px;
  --borde-control: 1.5px solid var(--color-borde-control);
  --sombra-panel: -16px 0 40px rgb(11 31 79 / 0.18);   /* única sombra de interfaz */

  /* Globo de paralelos: móvil y tableta (sección 13) */
  --globo-d: 136vw;
  --globo-x: -6vw;
  --globo-b0: 0.34;
  --globo-b1: 0.64;
  --globo-sagita: 0.03;
  --globo-carril-top: calc(0.27 * var(--globo-d));
  --globo-top: calc(-0.1 * var(--globo-d));
  --globo-carril-alto: calc((var(--globo-b1) - var(--globo-b0) - var(--globo-sagita)) * var(--globo-d));

  /* Interacción */
  --objetivo-tactil: 48px;
  --separacion-tactil: 8px;
  --foco-ancho: 3px;
  --foco-separacion: 2px;
  --panel-ancho: 420px;

  /* Movimiento */
  --dur-tap: 100ms;
  --dur-rapida: 140ms;
  --dur-cambio: 160ms;
  --dur-hover: 180ms;
  --dur-media: 240ms;
  --dur-panel: 260ms;
  --dur-salida-vista: 300ms;
  --dur-zoom: 360ms;
  --dur-vista: 450ms;
  --dur-ruta: 500ms;
  --dur-vuelo: 520ms;
  --dur-orquesta: 900ms;
  --escalon: 60ms;
  --curva-entrada: cubic-bezier(0.2, 0.7, 0.2, 1);
  --curva-salida: cubic-bezier(0.4, 0, 1, 1);
  --desplazamiento: 16px;
  --giro-objeto: -3deg;
  --presion: 0.97;

  /* Capas (profundidad) */
  --z-fondo: 0;
  --z-franja: 1;
  --z-brillo: 2;
  --z-objeto: 3;
  --z-texto: 4;
  --z-cabecera: 50;
  --z-velo: 70;
  --z-hoja: 80;
  --z-aviso: 90;
}

@supports (color: oklch(0% 0 0)) {
  :root {
    --c-azul-noche: oklch(25.7% 0.092 263.9);
    --c-azul-marca: oklch(35.5% 0.163 263.8);
    --c-azul-cielo: oklch(63.1% 0.155 245.0);
    --c-cielo-profundo: oklch(53.0% 0.140 248.5);
    --c-bruma: oklch(96.5% 0.011 252.1);
    --c-blanco: oklch(100% 0 0);
    --c-pizarra: oklch(46.1% 0.054 265.5);
    --c-verde-marca: oklch(64.3% 0.194 137.1);
    --c-verde-hoja: oklch(51.2% 0.153 139.5);
    --c-verde-bosque: oklch(44.1% 0.130 139.8);
    --c-amarillo-becerrita: oklch(83.6% 0.128 89.6);
    --c-rojo-error: oklch(50.0% 0.182 29.5);
  }
}

@media (min-width: 600px) {
  :root {
    --margen: 2rem; --canal: 1.5rem; --columnas: 8;
    --globo-d: min(112vw, 78vh);
    --h1-hero-fs: min(clamp(2.75rem, 7.2vw, 4rem), calc(0.08 * var(--globo-d)));
    --cuerpo-fs: var(--fs-18); --entradilla-fs: var(--fs-21);
  }
}

@media (min-width: 1024px) {
  :root {
    --margen: max(4rem, calc((100vw - var(--contenedor)) / 2));
    --columnas: 12; --seccion: var(--esp-8); --cabecera-alto: 72px;
    --globo-d: min(1040px, 72vw, 116vh);
    --globo-x: calc(var(--margen) + 0.34 * (100vw - 2 * var(--margen)));
    --globo-b0: 0.385;
    --globo-b1: 0.645;
    --globo-carril-top: clamp(160px, 30vh, 300px);
    --globo-top: calc(var(--globo-carril-top) - (var(--globo-b0) + var(--globo-sagita)) * var(--globo-d));
    --h1-hero-fs: min(5.4rem, 5.9vw, calc(0.1 * var(--globo-d)));
    --h1-hero-wdth: 125%; --h1-wdth: 125%;
    --cifra-registro-fs: var(--fs-72); --cifra-registro-wdth: 125%;
    --h3-fs: var(--fs-24); --entradilla-fs: var(--fs-24);
  }
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-tap: 0ms; --dur-rapida: 0ms; --dur-cambio: 0ms; --dur-hover: 0ms; --dur-media: 0ms;
    --dur-panel: 0ms; --dur-salida-vista: 0ms; --dur-zoom: 0ms; --dur-vista: 0ms; --dur-ruta: 0ms;
    --dur-vuelo: 0ms; --dur-orquesta: 0ms; --escalon: 0ms; --desplazamiento: 0px;
  }
}

/* Uso base */
html {
  background: var(--color-fondo);
  color: var(--color-texto);
  scroll-padding-top: var(--cabecera-alto);
}
body {
  font-family: var(--fuente-serif);
  font-size: var(--cuerpo-fs);
  line-height: var(--cuerpo-lh);
  background: var(--color-fondo);
  overflow-x: clip;
}
h1, h2, h3, nav, button, input, select, label, table, .ui {
  font-family: var(--fuente-sans);
  font-stretch: 100%;
}
h1 { font-size: var(--h1-fs); font-stretch: var(--h1-wdth); font-weight: 800; line-height: var(--h1-lh); color: var(--color-titular); text-wrap: balance; hyphens: auto; }
h2 { font-size: var(--h2-fs); font-stretch: var(--h2-wdth); font-weight: 750; line-height: var(--h2-lh); color: var(--color-titular); text-wrap: balance; }
p { text-wrap: pretty; max-width: var(--medida-texto); }
:focus-visible { outline: var(--foco-ancho) solid var(--color-foco); outline-offset: var(--foco-separacion); }
.banda :focus-visible, .pie :focus-visible { outline-color: var(--color-foco-banda); }

.hero { position: relative; padding-block-start: var(--globo-carril-top); padding-inline: var(--margen); overflow-x: clip; }
.hero .carril { position: relative; z-index: var(--z-texto); block-size: var(--globo-carril-alto); display: flex; align-items: center; }
.hero h1 { font-family: var(--fuente-display); font-size: var(--h1-hero-fs); font-stretch: var(--h1-hero-wdth); line-height: var(--h1-hero-lh); letter-spacing: -0.01em; white-space: nowrap; }
.globo {
  position: absolute; z-index: var(--z-franja);
  inline-size: var(--globo-d); block-size: var(--globo-d);
  inset-inline-start: var(--globo-x); inset-block-start: var(--globo-top);
  clip-path: circle(50%);
}
.globo .franja { position: absolute; inset-inline: 0; }
.globo .franja > * { inline-size: 100%; block-size: 100%; object-fit: cover; }  /* el movimiento va en este hijo */

.cifra-registro {
  font-size: var(--cifra-registro-fs); font-stretch: var(--cifra-registro-wdth); font-weight: 300;
  font-variant-numeric: tabular-nums; line-height: 1; color: var(--color-sobre-banda-suave);
}
.dato, table td.num { font-stretch: 100%; font-weight: 500; font-variant-numeric: tabular-nums; text-align: end; }

.btn { min-block-size: var(--objetivo-tactil); padding: 0.75rem 1.25rem; border-radius: var(--radio-control); font-weight: 600; transition: transform var(--dur-tap) var(--curva-entrada); }
.btn:active { transform: scale(var(--presion)); }
.btn-primario { background: var(--color-accion); color: var(--color-sobre-accion); }
.banda .btn-primario, .menu-movil .btn-primario { box-shadow: 0 0 0 2px var(--color-anillo-accion); }
.btn-secundario { border: 2px solid var(--color-titular); color: var(--color-titular); background: transparent; }
.banda .btn-secundario { border-color: var(--color-sobre-banda); color: var(--color-sobre-banda); }
.chip { border: var(--borde-control); border-radius: var(--radio-chip); min-block-size: 40px; }
.chip:has(input:checked) { background: var(--color-seleccion-fondo); color: var(--color-seleccion-texto); border-color: var(--color-seleccion-fondo); }
.sombra-contacto { background: radial-gradient(closest-side, var(--color-sombra-contacto), transparent); }

/* Transición entre vistas: el horizonte que sube */
@media (prefers-reduced-motion: no-preference) {
  @view-transition { navigation: auto; }
  ::view-transition-old(root) { animation: var(--dur-salida-vista) var(--curva-salida) both vista-sale; }
  ::view-transition-new(root) {
    animation: var(--dur-vista) var(--curva-entrada) both vista-entra;
    /* Visible = debajo del borde inferior de una elipse centrada sobre la pantalla:
       ese borde es un arco de paralelo (más bajo en el centro) que sube. */
    mask-image: radial-gradient(160% var(--horizonte) at 50% -40%, transparent 99.5%, #000 100%);
  }
}
@property --horizonte { syntax: "<percentage>"; inherits: false; initial-value: 0%; }
@keyframes vista-entra { from { --horizonte: 145%; } to { --horizonte: 0%; } }
@keyframes vista-sale { to { opacity: 0.7; transform: translateY(-12px); } }
```

Componentes base con estos tokens:

- **Botón primario:** Verde hoja, texto Blanco 16/24 peso 600, alto mínimo de 48 px (52 px en móvil a ancho completo), radio de 8 px. Hover: franja Verde bosque que entra desde la izquierda con borde en arco. Sobre bandas azules, anillo blanco de 2 px.
- **Botón secundario:** contorno de 2 px en Azul Mundilácteos (Blanco sobre bandas), mismo tamaño.
- **Enlace:** Cielo profundo subrayado (1 px, separación de 3 px); en hover el destello crece bajo el texto. Sobre bandas, Blanco subrayado. Sin flechas añadidas.
- **Campo:** fondo Blanco, borde de 1,5 px en Pizarra, alto de 48 px, radio de 8 px, etiqueta visible arriba en 16/24 peso 500; error con borde de 2 px en Rojo error, icono y mensaje debajo.
- **Chip:** borde Pizarra en píldora, alto de 40 px dentro de un área táctil de 48 px; elegido con relleno Azul Mundilácteos, texto Blanco y marca de verificado.
- **Borde de banda:** SVG de ancho completo con el arco de paralelo (`--arco-sagita`), del color de la banda, `aria-hidden`.

---

## 16. Accesibilidad

Objetivo: WCAG 2.2 AA en todo el sitio y AAA en el contraste del texto principal.

1. **Contraste:** solo los pares aprobados de la sección 5.2. Texto siempre sobre liso, nunca sobre foto. El botón verde lleva anillo blanco sobre bandas azules.
2. **Nunca solo color:** chip elegido con relleno y marca; enlace activo con destello, peso 600 y `aria-current`; «Agregado» con marca y texto; errores con icono y texto; ciudad elegida con marcador y peso 700.
3. **Foco visible** de 3 px con separación de 2 px en todo elemento interactivo; Blanco sobre bandas. Nunca tapado por la cabecera fija (`scroll-padding-top`).
4. **Objetivos táctiles** de 44 px como mínimo en la cabecera móvil y de 48 px en chips, filtros y controles de cantidad, con 8 px de separación.
5. **Teclado:** todo se opera sin ratón. Radios nativos en presentaciones, zonas de «Cómo leer una bolsa» y ciudades; combobox con flechas, Enter y Escape en el buscador; paneles y hojas con foco atrapado, cierre con Escape y retorno del foco.
6. **Anuncios** en `aria-live="polite"`: conteo de resultados, cambio de presentación, agregado a la cotización (con «Deshacer»), «Número copiado», zona de la bolsa, resultado de ciudad y totales. Errores de envío con `role="alert"`.
7. **Formularios:** etiqueta visible en cada campo, `autocomplete` e `inputmode` correctos, errores con `aria-describedby`, resumen con enlaces y foco en el primero; la confirmación mueve el foco a su título. Consentimiento sin marcar por defecto.
8. **Estructura:** `lang="es-CO"`, un H1 por página, jerarquía sin saltos, `nav`, `main` y `footer` con nombre, migas en `nav aria-label="Migas de pan"`, «Saltar al contenido».
9. **El globo:** el H1 es texto real (los `<br>` solo cortan líneas); F1, F2 y F3 tienen texto alternativo propio y F4 es decorativa (`aria-hidden`). La plantilla de verificación geométrica corre en cada compilación.
10. **Tablas** HTML reales con `caption`, `th` y `scope`; a 360 px, la primera columna fija y solo se desplaza la tabla, con `tabindex="0"` y nombre en el contenedor desplazable.
11. **Imágenes:** texto alternativo con marca, producto y peso («Bolsa de The Cántaro Entera de 900 g, frente»); las decorativas con `alt=""`.
12. **Diagramas:** los Anillos desde Turbaco tienen botones con nombre y una tabla equivalente completa; «Cómo leer una bolsa» tiene su lista de texto.
13. **Movimiento:** se respeta `prefers-reduced-motion`; nada parpadea más de 3 veces por segundo; nada se mueve solo más de 5 segundos; el scroll nunca oculta contenido.
14. **Zoom y reflujo:** sin scroll horizontal a 320 px ni al 200 % de zoom (a 200 %, el escritorio pasa a la geometría de tableta o móvil del globo, también verificada); tamaños en rem.
15. **Alto contraste** (`forced-colors: active`): las franjas planas desaparecen y el texto queda legible; el chip elegido conserva un borde visible.
16. **Idioma y cifras:** coma decimal y espacio fino no separable antes de la unidad, para que el lector diga «doce coma cinco kilogramos».
17. **Enlaces externos y archivos** se anuncian («abre WhatsApp», «abre la consulta del INVIMA en otra pestaña», «PDF, 240 KB»).
18. **Pruebas antes de publicar:** axe sin errores en inicio, catálogo, ficha, cotización, dónde comprar y marca propia; recorrido completo con teclado; NVDA con Firefox, VoiceOver con Safari en iOS y TalkBack en un Android de gama media.

---

## 17. Implementación estática en Hostinger

- **Generación:** HTML estático (por ejemplo, con Eleventy) a partir de `datos/catalogo.json` (derivado de `compartido/catalogo.js`: productos, presentaciones, EAN, paca, rinde, registros y canales), `datos/cobertura.json` (ciudades, anillos, tiempos, mínimos y asesor), `datos/asesores.json` (nombre, cargo, zona, retrato y WhatsApp) y `datos/atencion.json` (horario y festivos). Cada ficha y cada presentación salen prerenderizadas.
- **Despliegue** en `public_html` por Git o FTP. `.htaccess` con URL limpias, redirecciones 301 desde WordPress, caché larga para fuentes e imágenes, compresión Brotli o gzip y cabeceras de seguridad básicas.
- **Formularios:** script PHP con SMTP de Hostinger, campo trampa, límite por IP y validación en el servidor; sin base de datos. Respaldo: WhatsApp con mensaje prellenado.
- **Presupuesto:** portada móvil de 500 KB o menos, 30 peticiones o menos, fuentes de 85,3 KB, CSS de 30 KB o menos y JavaScript de 35 KB o menos por página (comprimidos), sin jQuery ni librerías de animación. Objetivo: LCP menor de 2 s en 4G, CLS 0, Lighthouse de 95 o más en rendimiento y accesibilidad.
- **Compilación con controles:** verificación geométrica del globo (`verificacion-hero/verificar.js` adaptado a la plantilla), comprobación de enlaces a Megatiendas, Carulla, Éxito y Rappi (se ocultan los que respondan 404), recordatorio trimestral de vigencias de registros desde el archivo de datos, y axe en las plantillas.
- **Datos estructurados:** `Organization` y `LocalBusiness` (planta de Turbaco) en todo el sitio; `Product` con `brand` y `gtin13` en las fichas (sin `offers`, porque no hay precio visible); `BreadcrumbList`; `FAQPage` en fichas y Por qué elegirnos; `Recipe` en recetas. `sitemap.xml` e imagen para compartir por ficha.
- **Almacenamiento:** `localStorage` y `sessionStorage` siempre en `try/catch`; el sitio funciona completo si están bloqueados.

### Checklist de 20 criterios (TENDENCIAS.md)

| # | Criterio | Cómo lo cumple «Paralelo 10» |
|---|---|---|
| 1 | Core Web Vitals | H1 de texto; fotos del globo recortadas a su franja (150 KB o menos en móvil); cajas reservadas; meta LCP < 2 s y CLS 0 |
| 2 | Presupuesto de peso | Portada ≤ 500 KB, JS ≤ 35 KB, dos familias en 85,3 KB autoalojadas |
| 3 | `<picture>` AVIF/WebP/JPEG | En todas las fotos; H02 con `fetchpriority="high"` |
| 4 | Contraste | Pares calculados (5.2); nunca texto sobre foto |
| 5 | 0 errores automáticos | axe en las seis plantillas; `lang="es-CO"`; alt con marca, producto y peso |
| 6 | Teclado y foco | Foco de 3 px, nunca tapado; objetivos de 44 a 48 px |
| 7 | Movimiento (ampliado por EXPERIENCIA.md) | Un momento orquestado de 900 ms; vistas de 450 ms; solo `transform`, `opacity`, `clip-path`, `mask` y ancho tipográfico; todo se anula con movimiento reducido; sin scroll-jacking ni parallax de fondos |
| 8 | Menú de 6 por tareas | Productos, Calidad, Por qué elegirnos, Cobertura, Nosotros, Recursos; visible a 1.280 px |
| 9 | Ayuda consistente | WhatsApp y Cotizar siempre a la derecha de la cabecera; teléfono siempre en el pie y el menú; `wa.me` con producto, presentación y espacio para la ciudad |
| 10 | Filtros | Selección múltiple, conteo, chips activos con quitar, URL; sin JS se ven todos |
| 11 | Fichas completas | URL propia, presentaciones como botones, reverso legible, tabla nutricional en HTML, vida útil, paca y caja, EAN, registro con Verificar, CTA según presentación |
| 12 | Tabla comparativa | «Qué presentación me conviene» (5 columnas, primera fija) y Comparar hasta 4 |
| 13 | Cotización de 5 campos | Nombre, WhatsApp, ciudad, tipo de negocio y productos precargados; confirmación y «Continuar por WhatsApp» |
| 14 | Rendimiento sin precio | «Cerca de 185 L por bulto de 25 kg», «84 a 90 L por paca» |
| 15 | Dónde comprar | Ciudad, «Usar mi ubicación», lista con horario, WhatsApp y Cómo llegar; mapa a pedido; «Ser distribuidor» |
| 16 | Fichas técnicas en HTML | PDF como descarga secundaria rotulada |
| 17 | JSON-LD | Organization, LocalBusiness, Product, BreadcrumbList, FAQPage y Recipe |
| 18 | Cero stock | Fotos propias; testimonios solo reales; sin contadores ni urgencia falsa |
| 19 | Identidad propia | Paleta de MARCA.md en OKLCH con respaldo hex; Encode Sans y Source Serif 4; sin vidrio, sin neubrutalismo, sin cursor propio |
| 20 | Estático | HTML generado desde datos; sin JS se leen todas las páginas; funciones nuevas en `@supports` o `@media` |

---

## 18. Qué NO hacer

1. Vacas, potreros, salpicaduras, gotas, vasos rebosantes, murallas, balcones ni postales de Cartagena.
2. Colores fuera de `MARCA.md`, degradados decorativos, fondo crema, grises o negros teñidos.
3. Fotos de banco, personas generadas con IA o sonrisas posadas.
4. Texto sobre foto o sobre vidrio; el H1 fuera del paralelo 10.
5. Azul Mundilácteos junto a Azul noche sin hueco blanco; botón verde sobre azul sin anillo blanco.
6. Un segundo gesto audaz: el globo no se repite como adorno fuera de Home, Nosotros y 404; no hay frase de pedido, fila a escala ni calculadora.
7. Cuadrículas de tarjetas iguales con la misma sombra gris; vitrinas con marco.
8. Rótulos en mayúsculas sobre los títulos, cadenas de datos unidas con punto medio, flechas añadidas a botones y enlaces, fuente monoespaciada para datos, una palabra del titular resaltada.
9. Numeración 01, 02, 03 donde no hay secuencia. Solo llevan números Así trabajamos, Cómo trabajamos (marca propia) y la historia.
10. Filas de estadísticas con cifra gigante y etiqueta pequeña: las cifras grandes son números de registro reales con su verificación.
11. Apariciones de sección al hacer scroll, parallax de fondos, scroll-jacking, carruseles automáticos, tarjetas que se elevan (solo se mueve el objeto).
12. Franja de utilidad, barra inferior fija, barra de cantidad fija en la ficha o botón flotante de WhatsApp.
13. Palabras de comercio electrónico: carrito, comprar, pagar, checkout. No se muestran precios.
14. Llamar «leche» a una mezcla láctea en títulos, filtros o texto alternativo.
15. Publicar ISO, tiempos, mínimos, número de empleados, año de fundación, rinde o presentaciones sin soporte del cliente.
16. Sellos sin número, ente y vigencia; logos de cadenas o bolsas de marca propia sin autorización escrita.
17. Retratos sin autorización de uso de imagen; nombres de personas que ya no trabajan en la empresa.
18. Usar el logo anterior, la foto de vacas o `equipo-planta.webp` en el hero.
19. Copiar layouts o estilos de la competencia: se toman prácticas, no formas.
20. Serif en display o ancho 125 fuera de los H1 y las cifras de registro.

---

## 19. Datos que debe entregar o confirmar el cliente

- **Portafolio:** lista maestra de SKU vigentes (marca, denominación legal, contenido neto, EAN-13, GTIN-14 de la paca, estado); existencia de 400, 500 y 800 g y de bultos de 5 y 12,5 kg de leche entera; La Becerrita de 400 y 500 g; marca y presentaciones de los registros de 2025.
- **Empaques «Nueva imagen»** en alta resolución: frente, reverso legible (al menos 380 g a 4.000 px) y paca; confirmar que el sello «Milk Mait» está descontinuado.
- **Unidades por paca**, peso y medidas de paca, pacas por estiba y caja (49 × 22 × 34 cm) por presentación.
- **Preparación y rinde:** la ficha técnica dice 135 g por litro; los empaques, cerca de 127 a 129 g por litro. Unificar.
- **Tablas nutricionales** en formato de la Resolución 810 de 2021, ingredientes, fortificación y sellos de advertencia («Exceso en azúcares»).
- **ISO 9001:2015:** ente, número, alcance y vigencia; si no está vigente, se retira.
- **Qué indica el lote** (día y turno de empaque) para «Cómo leer una bolsa».
- **Cobertura:** ciudades de despacho, tiempos por anillo, pedido mínimo, días de despacho y asesor por zona.
- **Asesores y personas:** nombres, cargos, retratos y autorizaciones de uso de imagen (Ley 1581 de 2012).
- **Puntos de venta** por ciudad con horario y WhatsApp para Dónde comprar; enlaces vigentes en cadenas; autorizaciones para nombrar cadenas y mostrar góndolas.
- **Marca propia:** si se publica como servicio, capacidades, gramajes, pedido mínimo y quién es titular del registro.
- **Empresa:** año de fundación (EMIS dice 2011; LinkedIn, 2010), número de empleados (49 según una fuente secundaria), historia, fundadores y cita firmada; coordenadas GPS de la planta; bodega correcta (28, 16 o 2A–2B).
- **Contacto:** un teléfono, un WhatsApp comercial, un correo en un dominio que resuelva, horario de atención.
- **Validaciones:** reconocimiento del globo evolucionado con 5 clientes; tono del titular y de «Paralelo 10» con compradores B2B y hogar.
- URL actuales del sitio en WordPress para las redirecciones.

---

## 20. Puntajes de los jueces e injertos

### Puntajes (escala de 0 a 10 por criterio)

| Propuesta (ángulo) | Juez | Supera a la competencia | Riqueza visual, nada plano | Identidad propia | Distinto del C2 | Conversión B2B | Atractivo consumidor | Vanguardia duradera | Accesibilidad | Suma |
|---|---|---|---|---|---|---|---|---|---|---|
| Paralelo 10 (origen y confianza) | 1 | 9 | 9 | 9 | 9 | 8 | 7,5 | 8,5 | 9 | 69 |
| Paralelo 10 (origen y confianza) | 2 | 9 | 8,5 | 9 | 9 | 8 | 7 | 8,5 | 9 | 68 |
| A la orden (catálogo y servicio) | 1 | 9 | 9 | 8 | 6,5 | 9 | 8,5 | 7,5 | 8,5 | 66 |
| A la orden (catálogo y servicio) | 2 | 9 | 9 | 8 | 7,5 | 9,5 | 8,5 | 8 | 8,5 | 68 |

| Propuesta | Juez 1 | Juez 2 | Total (de 160) | Resultado |
|---|---|---|---|---|
| **Paralelo 10** | 69 | 68 | **137** | Base. Ganadora del juez 1 y empatada en puntos con A la orden para el juez 2 |
| A la orden | 66 | 68 | 134 | Donante de herramientas de catálogo y servicio. El juez 2 la prefirió por conversión; su cercanía con el C2 (6,5 y 7,5) la dejó atrás |

### Qué se injertó

| De A la orden | Injertado | Dónde vive |
|---|---|---|
| WhatsApp con contexto | Mensaje con producto, presentación, uso y ciudad, con vista previa «Mensaje que se enviará»; para el hogar, el botón principal pasa a «Dónde comprar» con enlace a la ficha exacta en cada cadena | Vitrina de la Home, vitrinas, ficha, anillos, cotización |
| Comparador | Hasta 4 presentaciones, «Mostrar solo diferencias», URL para compartir e impresión | `/productos/comparar/`, acceso «Comparar (n)» en la barra de resultados |
| Buscador del mostrador | Sinónimos (kilo, k y kg; gr y g; saco y costal = bulto; fardo = paca; cantaro = The Cántaro), 6 sugerencias y alternativa real sin resultados | Cabecera, Productos, menú móvil |
| Cantidad con equivalencia | «10 pacas de 900 g = 120 bolsas, 108,0 kg» y aviso con «Deshacer» al agregar | Ficha, Mi cotización |
| Anillo blanco del botón verde | Contorno de 2 px sobre bandas azules (verde hoja sobre azul da 2,15:1) | Cierre, Planta y gente, menú móvil |
| Lo que nos preguntan antes de comprar | Preguntas en voz de persona con su prueba, FAQPage | Por qué elegirnos, ficha (no en la Home) |
| Microcopy cálido | «Sin crear cuenta y sin pagos: usted pide precio y un asesor le responde.», número de solicitud y «Guardar resumen en PDF» | Cotizar |
| Escala de profundidad | Capas z como tokens y brillo radial de Azul cielo detrás de los packshots | Tokens, globo de respaldo, bandas oscuras |
| Validación con maqueta | Maqueta del hero con fuentes y empaques reales y control de desborde | `verificacion-hero/`, 11 pantallas en OK |

### Qué no se injertó y por qué

| Pieza de A la orden | Motivo |
|---|---|
| La frase de pedido como hero | Sería un segundo gesto audaz y repite la lógica del C2 (selector que actualiza un resultado en el hero) |
| Mapa lineal de Colombia | Casi idéntico al del C2; se mantienen los Anillos desde Turbaco |
| Franja de utilidad | Existe en el C2 y hace desaparecer el WhatsApp al bajar |
| Mostrador y barra inferior móvil | Repiten la barra inferior del C2 |
| Barra de cantidad fija en la ficha | Repite la del C2; también se retiró de la base |
| Bandeja inferior de comparar | Es otra barra inferior; se reemplazó por «Comparar (n)» en la barra de resultados |
| Borde en «swoosh» Azul cielo y verde | Aire corporativo de los 2000, cercano a la cabecera de Alpina |
| Apariciones al hacer scroll en marcas | Moda pasajera según TENDENCIAS §4 |
| Recorte de texto con `background-clip` en la ficha | Riesgo de accesibilidad sin ganancia de información |
| Ancizar Serif y Sans (UNAL) | Gran hallazgo de orgullo colombiano, pero reemplazaría la voz expandida que sostiene la idea del paralelo y sumaría una tercera familia. Queda como alternativa documentada si el cliente pide una voz más cálida |

### Ajustes a la base por observaciones de los jueces

| Observación | Juez | Ajuste |
|---|---|---|
| El H1 de 342 px no cabía en la franja blanca de unos 224 px útiles | 1 y 2 | H1 de dos líneas que cruza el globo, paralelo 10 de 0,26 D (0,30 en móvil), sagita del 3 %, globo posicionado desde el carril y tope del H1 por diámetro. Verificado en 11 pantallas (sección 13) |
| Depende de una sesión de fotos; la foto actual es de 900 px, con decoración navideña y caras que caen en los huecos | 1 y 2 | Una foto por franja encuadrada a 5:1 con plantilla de zona segura; variante de respaldo como lanzamiento; cada franja pasa a foto por separado; `equipo-planta.webp` fuera del hero |
| Cuatro copias de la misma foto consumían memoria en móvil | Riesgo de la propuesta | Cada franja es su propia imagen pequeña |
| Tono institucional; el consumidor es el punto débil | 1 y 2 | Vitrina antes que registros, «Compre según su negocio» con la ruta del hogar, Lo que nos preguntan, microcopy cálido y personas con nombre en tres secciones |
| La Home pone los registros antes que los productos y el hero no muestra producto | 2 | Vitrina de marcas como segunda sección; franja 3 con producto (H03 o packshots) |
| Sin buscador visible en la cabecera de escritorio | 2 | «Buscar» en la cabecera (texto desde 1.440 px, icono de 1.280 a 1.439) |
| El indicador activo aparecía en dos colores | 1 | Un solo color: destello en Azul Mundilácteos sobre blanco |
| Falta anillo blanco del botón verde sobre azul | 1 | Token `--color-anillo-accion` y regla en bandas y menú |
| La frase del pie repetía la del C2 | 1 | «Leche en polvo hecha en Turbaco, Bolívar, con registro INVIMA vigente.» |
| «Cómo leer una bolsa» rozaba el «Cómo leer el lote» del C2 | 1 | Es un visor de cinco zonas; abre en «Registro sanitario», no en el lote |
| El globo cambiaba la proporción del logo (azul arriba, verde abajo) | 1 | El símbolo conserva el cuerpo verde y la base azul del logo actual; el azul manda en el nombre y en el sitio |
| Los arcos que se aplanan con el scroll son decorativos | 2 | Se mantienen como detalle opcional, en tres bandas, dentro de `@supports`; se retiran sin afectar nada |
| La grotesca expandida es una moda de marca | 2 | Ancho 125 solo en H1 y cifras de registro; el resto en ancho 100 |
| En la primera visita, «Cotizar» no debe mostrar referencias | 2 | Vacío dice «Cotizar»; con referencias, «Cotizar (n)» |
| Empaque «Milk Mait» probablemente descontinuado | 2 | Packshots «Nueva imagen» (E01); los de 2022 solo como provisionales rotulados |
| Precisión geográfica | 2 | Siempre «Turbaco, Bolívar» para la planta; Cartagena solo como área metropolitana |

---

## 21. Diferencias con el Concepto 2

| Aspecto | Concepto 1: Paralelo 10 | Concepto 2: Peso neto |
|---|---|---|
| Idea | El origen comprobable: dónde se hace, quién lo hace y qué registro lo respalda («De Turbaco, con nombre y registro») | La medida: «Lo que dice la etiqueta es lo que hay adentro» |
| Reparto de color | Manda el azul: Azul Mundilácteos en titulares, globo y bandas; Azul noche en registros y pie; el verde solo en acción y confirmación | Mandan el blanco y el verde: Verde Mundilácteos en bandas y en la fila a escala; cifras en Azul noche |
| Tipografía | Dos familias: Encode Sans expandida (ancho 125, peso 800) y cifras ligeras (peso 300) a 72 px, más Source Serif 4 para lectura | Una familia condensada, Archivo, con cifras que engruesan con el peso |
| Elemento firma | El globo de paralelos: el logo a escala monumental, con la planta, la gente y el producto en sus franjas y el titular en el paralelo 10 | La fila a escala de 12 presentaciones sobre una línea base |
| Logo | Evoluciona el globo: conserva cuerpo verde y base azul, sin degradado, con tilde, nombre en Azul Mundilácteos | Retira el globo y crea el sello M dentado |
| Estructura de la Home | Globo; vitrina de marcas con «Compre según su negocio»; registros a la vista; Cómo leer una bolsa; planta y gente; Anillos desde Turbaco; Tres formas de comprar; guías; cierre con asesora | Fila a escala con mini ficha; ¿Qué necesita?; calculadora de bultos; Hecha para el calor; planilla de razones; marcas; Así empacamos; distribución; recursos |
| Catálogo | Vitrinas por producto con presentaciones como chips, comparador de hasta 4 y tabla «Qué presentación me conviene»; la cantidad se ajusta en Mi cotización | Planilla con una fila por presentación y cantidad en cada fila; columna fija de Mi cotización desde 1.440 px |
| Cotizar | Una sola página: lista a la izquierda, cinco campos a la derecha; confirmación con el asesor de la zona | Tres pasos numerados (Productos, Entrega, Contacto) |
| Navegación | Una fila de cabecera con Buscar, Dónde comprar, WhatsApp y Cotizar; «Por qué elegirnos» y «Cobertura» en el menú; Marca propia dentro de Productos; sin franja de utilidad ni barra inferior | Franja de utilidad; «Marca propia» y «Distribución» en el menú; barra inferior fija en móvil y barra de cantidad en la ficha |
| Cobertura | Anillos desde Turbaco por tiempo de entrega | Mapa lineal de Colombia |
| Movimiento | Envolver y asentar: el globo se envuelve al cargar, la vista nueva entra como un horizonte que sube, packshots con profundidad y vuelo a «Cotizar» | Un solo momento (la fila que se llena) y respuestas mínimas; sin efectos de scroll ni elevaciones |
| Formas | Arcos de paralelo, huecos y franjas derivados del globo; controles de 8 px; chips en píldora | Ángulos rectos, dentado del sello; radio de 4 px |
| Iconos | Trazo de 2 px con remates redondos | Trazo de 1,75 px con remates rectos |
| Fotografía | Documental de lugar y de personas con nombre, encuadrada para cortarse en franjas de 5:1 | Packshots frontales con regla, macros de materia, oficio y clientes |
| Pie | Azul noche tras un hueco blanco; «Leche en polvo hecha en Turbaco, Bolívar, con registro INVIMA vigente.» | Fondo oscuro; «Industria colombiana. Empacamos en Cartagena.» |

**Revisión contra los rasgos genéricos de frontend-design y contra el C2** (qué cambió en el camino y por qué):

1. **Fila de estadísticas:** se reemplazó por la lista real de los cinco registros con número, producto, vigencia y acción. La cifra es un documento público, no un adorno.
2. **Apariciones al hacer scroll:** quedó un solo recurso de sección ligado al scroll y derivado del logo (el arco que se abre), opcional, más la profundidad de los packshots. Nada se oculta.
3. **Hover en tarjetas:** solo se mueve el objeto (el packshot se inclina y su sombra se abre).
4. **Botones en píldora:** radio de 8 px; las píldoras quedan solo para chips.
5. **Serif en display:** la serif quedó para lectura, sobre blanco; el display es una grotesca expandida.
6. **Mapa geográfico con puntos:** cambiado por los anillos por tiempo de entrega.
7. **«Así empacamos» en la Home:** se movió a Calidad como «Así trabajamos»; en la Home quedó el visor «Cómo leer una bolsa».
8. **Tres tarjetas iguales de marcas:** vitrinas de tamaño según prioridad y «Con su marca» en una línea.
9. **Hero de tres líneas sobre la foto:** reemplazado por dos líneas que cruzan el globo por el paralelo 10, verificadas en 11 pantallas.
10. **Descartes adicionales:** rótulos en mayúsculas, puntos medios, flechas en enlaces, monoespaciada para datos, numeración decorativa, fondo crema, barra inferior y franja de utilidad.

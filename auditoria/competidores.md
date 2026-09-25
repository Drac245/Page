# Competencia: fichas y síntesis

Auditoría del 25 de septiembre de 2026. Datos: [`auditoria/datos/auditoria-consolidada.json`](datos/auditoria-consolidada.json) (claves `competidores` y `descubrimiento`). Informe: [informe-auditoria.md](informe-auditoria.md).

**Orden de relevancia** para Mundilácteos: cercanía de producto (leche en polvo en bolsa y bulto), canal (góndola de Cartagena, mayoristas del Caribe) y modelo de negocio. Colanta, muy relevante por mercado, no se pudo analizar: su sitio responde 403 (desafío de Cloudflare) y no se intentó rodear el bloqueo.

## Benchmark comparable (Lighthouse 12.8.2 móvil, home, 1 corrida)

| Sitio | Performance | LCP | Peso | Accesibilidad |
|---|---|---|---|---|
| Cosmolac | 62 | 5,2 s | 5,3 MB | 82 |
| Mundilácteos | 58 | 6,1 s | 0,85 MB | 93 |
| Proleche | 53 | 15,7 s | 3,1 MB | 91 |
| Coolechera | 42 | 18,9 s | 5,7 MB | 86 |
| Alquería | 35 | 19,5 s | 3,7 MB | 79 |
| Nestlé KLIM | 31 | 6,0 s | 3,5 MB | 97 |
| Indunilo | 30 | 25,0 s | 4,4 MB | 72 |
| Alpina | 26 | 52,0 s | 12,8 MB | 84 |

Fuente: CMP-13 (`auditoria/datos/critico/lighthouse-benchmark/resumen-home-movil.json`). Las métricas de Playwright de cada ficha usan otro método (sin limitación de red ni CPU) y no son comparables con esta tabla. Proleche (precarga que espera interacción) y Alpina (LCP de 52 s) son atípicos.

## 1. Cosmolac S.A.S.

<https://cosmolac.com.co/> · **Segmento:** B2C y B2B. Planta pulverizadora propia en Cajicá.

**Por qué importa:** El competidor más directo en Cartagena: comparte lineal con The Cántaro en Megatiendas con precios más bajos (900 g a $19.590 frente a $26.550; 380 g a $8.190 frente a $11.190, 2026-09-25) y vende bulto de 12,5 kg vía Dispropan Caribe.

**Benchmark móvil:** Performance 62, LCP 5,2 s, 5,3 MB, Accesibilidad 82.

**Qué hace bien**

- Hero que explica el origen industrial en una frase (planta pulverizadora en Cajicá, leche cruda colombiana) y 5 viñetas de proceso.
- Muro de 8 clientes reconocibles: Alquería, Makro, Ara, PAE, Éxito, Carulla, Surtimayorista y OXXO.
- WhatsApp flotante con mensaje precargado y teléfono visible desde el primer pantallazo.
- Páginas propias de compromiso ganadero y gestión ambiental, y directorio de contacto por área con correo directo.

**Patrones destacados**

- Hero de 'prueba de origen': planta, municipio, materia prima y controles en una frase.
- Ficha organizada por preguntas del comprador: ¿Por qué elegirla?, ¿Cómo usarla?, Importante, Dónde encontrarla.
- WhatsApp con mensaje precargado (mejorable con variantes por intención: bultos, distribuidor, detal).
- Mascota propia usada como sistema en hero, contacto y banners.

**Debilidades**

- Sin navegación en móvil: no hay menú ni hamburguesa a 390 px.
- Restos de la plantilla de imprenta: 7 meta descriptions de 'imprenta', tarjetas móviles hacia un dominio de staging (503) y mailto:andresruge@.
- Fichas sin tabla nutricional, gramajes en texto ni Invima; 4 de 5 sin H1; ninguna certificación ('trabajando en nuevas certificaciones').
- Home desktop de 6,36 MB con un PNG de 4,25 MB; datos contradictorios (3 teléfonos, 2 NIT, planta en Cajicá y Zipaquirá).

**Capturas clave**

- [`auditoria/capturas/competidores/cosmolac/home-desktop-fold.jpg`](capturas/competidores/cosmolac/home-desktop-fold.jpg) (desktop): Home (primer pantallazo)
- [`auditoria/capturas/competidores/cosmolac/menu-movil.jpg`](capturas/competidores/cosmolac/menu-movil.jpg) (móvil): Cabecera móvil (evidencia de que no hay menú)
- [`auditoria/capturas/competidores/cosmolac/catalogo-desktop.jpg`](capturas/competidores/cosmolac/catalogo-desktop.jpg) (desktop): Catálogo /nuestros-productos/
- [`auditoria/capturas/competidores/cosmolac/ficha-descremada-desktop.jpg`](capturas/competidores/cosmolac/ficha-descremada-desktop.jpg) (desktop): Ficha /leche-en-polvo-descremada/ (la más completa)
- [`auditoria/capturas/competidores/cosmolac/clientes-desktop.jpg`](capturas/competidores/cosmolac/clientes-desktop.jpg) (desktop): Home, bloque Nuestros clientes
- [`auditoria/capturas/competidores/cosmolac/empaques-banner-catalogo-zoom.jpg`](capturas/competidores/cosmolac/empaques-banner-catalogo-zoom.jpg) (desktop): Recorte del banner del catálogo (imagen original del sitio)

## 2. Coolechera

<https://coolechera.com/> · **Segmento:** B2C y B2B (institucional e industrial). Cooperativa regional del Caribe con sede en Barranquilla.

**Por qué importa:** Principal competidor regional del Caribe: leche en polvo de 900 g y 25 kg en su sitio y de 380 g en Éxito y Carulla; atiende canal institucional e industrial.

**Benchmark móvil:** Performance 42, LCP 18,9 s, 5,7 MB, Accesibilidad 86.

**Qué hace bien**

- Relato de origen fuerte y verificable: 'Desde 1933', más de 1.000 familias ganaderas y fotografía real de ganaderos caribeños.
- Packshots homogéneos en 80 productos, con franja de color por tipo y gramaje.
- Prueba de escala: mapa de plantas, acopios y distritos, y directorio de contacto por canal de venta.
- Página institucional con cifras B2B (más de 180 restaurantes y hoteles, PAE, Curazao y Venezuela) y WhatsApp por ciudad.

**Patrones destacados**

- Franja lateral de color en cada packshot con tipo de producto y gramaje.
- WhatsApp que despliega ciudades antes de abrir el chat.
- Artículo '¿Qué significan los sellos de nuestras bolsas?' con el empaque anotado.
- Línea de tiempo con hitos industriales (1983: planta de pulverización de 100.000 L/día), aunque en imágenes.
- Tono regional caribeño deliberado ('de verda' verda'', '#CaribeConsumeCaribe').

**Debilidades**

- Fuentes de marca rotas (CORS y 404 en coolechera.co) y unos 80 enlaces internos hacia rutas de coolechera.co que responden 404.
- Carruseles de producto invisibles (opacity 0): 6.458 px en blanco en la página B2B.
- Tienda WooCommerce sin comercio (79 de 80 productos a precio 0) y fichas vacías, sin tabla nutricional ni ficha técnica.
- Sin meta description en 24 URL y sin H1 en home, tienda, Somos, Contacto y B2B.
- Certificaciones dispersas en posts, sin número ni vigencia y con fechas contradictorias; BASC 6.0.1 figura como propósito, aunque el descubrimiento lo reportaba como sello publicado.

**Capturas clave**

- [`auditoria/capturas/competidores/coolechera/home-desktop-fold.jpg`](capturas/competidores/coolechera/home-desktop-fold.jpg) (desktop): Inicio
- [`auditoria/capturas/competidores/coolechera/catalogo-desktop.jpg`](capturas/competidores/coolechera/catalogo-desktop.jpg) (desktop): Tienda /tienda/
- [`auditoria/capturas/competidores/coolechera/ficha-desktop.jpg`](capturas/competidores/coolechera/ficha-desktop.jpg) (desktop): Ficha 'Leche en polvo 900' (/producto/leche-en-polvo-900-ml/)
- [`auditoria/capturas/competidores/coolechera/b2b-whatsapp-ciudades-movil.jpg`](capturas/competidores/coolechera/b2b-whatsapp-ciudades-movil.jpg) (móvil): Canal Institucional: directorio de WhatsApp desplegado
- [`auditoria/capturas/competidores/coolechera/nosotros-desktop.jpg`](capturas/competidores/coolechera/nosotros-desktop.jpg) (desktop): Somos Coolechera /somos-coolechera/
- [`auditoria/capturas/competidores/coolechera/calidad-sellos-desktop.jpg`](capturas/competidores/coolechera/calidad-sellos-desktop.jpg) (desktop): Post '¿Qué significan los sellos que tienen las bolsas de leche Coolechera?'

## 3. Proleche (Grupo Lactalis)

<https://prolechecolombia.com.co/> · **Segmento:** B2C y B2B. Marca nacional del Grupo Lactalis (con Parmalat, President y Kraft).

**Por qué importa:** Portafolio en polvo casi idéntico al de Mundilácteos (bolsas de 200, 380 y 900 g, bulto de 25 kg, azucarada de 104 y 364 g) y el mismo stack (WordPress + Elementor).

**Benchmark móvil:** Performance 53, LCP 15,7 s, 3,1 MB, Accesibilidad 91.

**Qué hace bien**

- Landing de reclutamiento de autoventistas completa: promesa, video, testimonios, requisitos, calculadora de ganancias, FAQ y formulario, con FAQPage y VideoObject.
- Identidad coherente: verde #009038, mascota vaca, ilustración rural tipo grabado y 'Desde 1932' en el logo.
- Catálogo por pestañas con packshots sobre un pedestal ovalado consistente.
- Fotografía real de su cadena (ganadero, planta, laboratorio, punto de venta) y select 'Tema' que separa recolector, productor, comercializador y PQRS.

**Patrones destacados**

- Calculadora de ganancias para distribuidores (clientes por día y ticket promedio).
- Landing de canal: promesa, cómo funciona, testimonios, requisitos, FAQ y formulario.
- Pestañas de categoría con miniatura y pedestal de color bajo cada packshot.

**Debilidades**

- En desktop la precarga LoftLoader tapa el contenido hasta la primera interacción (seguía visible a los 18,8 s).
- Sin certificaciones ni Invima: /tecnologia/ solo contiene PDFs de cookies y de política de TI.
- Sin fichas por producto: ni tabla nutricional, ni especificaciones, ni foto del bulto de 25 kg.
- Páginas clave huérfanas (/emprende-con-proleche/, /leche-en-polvo/ duplicada de Nosotros) y popups B2B con botones ocultos.
- Contraste insuficiente: verde sobre blanco 4,16:1 y enlaces del footer 1,71:1.

**Capturas clave**

- [`auditoria/capturas/competidores/proleche/home-desktop-fold.jpg`](capturas/competidores/proleche/home-desktop-fold.jpg) (desktop): Inicio (/)
- [`auditoria/capturas/competidores/proleche/home-desktop-fold-precarga.jpg`](capturas/competidores/proleche/home-desktop-fold-precarga.jpg) (desktop): Inicio (/)
- [`auditoria/capturas/competidores/proleche/ficha-desktop.jpg`](capturas/competidores/proleche/ficha-desktop.jpg) (desktop): Productos > pestaña EN POLVO (equivalente a ficha; no hay URL por producto)
- [`auditoria/capturas/competidores/proleche/distribuidores-desktop.jpg`](capturas/competidores/proleche/distribuidores-desktop.jpg) (desktop): Emprende con Proleche (/emprende-con-proleche/, landing de autoventistas; solo en sitemap)
- [`auditoria/capturas/competidores/proleche/calidad-desktop.jpg`](capturas/competidores/proleche/calidad-desktop.jpg) (desktop): Tecnología (/tecnologia/), la única página cercana a 'calidad'
- [`auditoria/capturas/competidores/proleche/catalogo-movil.jpg`](capturas/competidores/proleche/catalogo-movil.jpg) (móvil): Productos (/productos/)

## 4. Indunilo S.A.S.

<https://www.indunilo.com/> · **Segmento:** B2B (maquila e institucional) y marcas propias. Empresa familiar de Santander.

**Por qué importa:** El caso más parecido a Mundilácteos: empresa familiar que empezó en 1999 como reempacadora de leche en polvo y hoy pulveriza, empaca, maquila y vende marcas propias (Lacto Leche, Miramonte, Nutralac).

**Benchmark móvil:** Performance 30, LCP 25,0 s, 4,4 MB, Accesibilidad 72.

**Qué hace bien**

- Discurso B2B explícito (maquila, clientela institucional) y formulario de cotización propio.
- Pestañas 'Marcas propias / Maquilas' que muestran capacidad para terceros (Olímpica, Latti, Lelé).
- Ficha con datos de proceso (atomización, malla 120 micras) y declaración de lo que no contiene (sin suero lácteo, edulcorantes ni conservantes).
- Centro de cumplimiento (SAGRILAFT, PTEE, canales de denuncia) y política de calidad con 'prohibición de lactosueros no permitidos'.

**Patrones destacados**

- Pestañas 'Marcas propias / Maquilas' como vitrina de capacidad.
- Bloque de especificación compacto y declaración de 'no contiene'.
- Compromiso antiadulteración escrito en la política de calidad.
- Relato fundacional con conflicto (Decreto 616 de 2006 y reinvención como pulverizadora), aunque enterrado en el blog.

**Debilidades**

- El WhatsApp apunta a un número de Italia (+39 351 473 4637) y los enlaces tel: están mal formados.
- Fichas técnicas en Google Drive con 404 y bloque 'Descargar Portafolio' vacío.
- Enlaces del pie hacia /no-se-encuentra (404 blando con HTTP 200); home sin H1 ni JSON-LD; 0 enlaces a redes.
- Cotizador genérico: producto en texto libre, sin volumen, presentación, NIT ni autorización de datos.
- Lighthouse móvil Perf 30 y LCP 25,0 s, aunque con Playwright sin limitación carga en unos 1,7 s (métodos no comparables).

**Capturas clave**

- [`auditoria/capturas/competidores/indunilo/home-desktop-fold.jpg`](capturas/competidores/indunilo/home-desktop-fold.jpg) (desktop): Inicio (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/maquilas-desktop.jpg`](capturas/competidores/indunilo/maquilas-desktop.jpg) (desktop): Leche en polvo > Entera > Maquilas
- [`auditoria/capturas/competidores/indunilo/ficha-desktop.jpg`](capturas/competidores/indunilo/ficha-desktop.jpg) (desktop): Ficha Miramonte leche en polvo entera
- [`auditoria/capturas/competidores/indunilo/cotizaciones-desktop.jpg`](capturas/competidores/indunilo/cotizaciones-desktop.jpg) (desktop): Cotizaciones (/contactenos/cotizaciones)
- [`auditoria/capturas/competidores/indunilo/calidad-politica-desktop.jpg`](capturas/competidores/indunilo/calidad-politica-desktop.jpg) (desktop): Política de Sistema Gestión Integral
- [`auditoria/capturas/competidores/indunilo/menu-movil-submenu.jpg`](capturas/competidores/indunilo/menu-movil-submenu.jpg) (móvil): Menú abierto con submenú Leche en Polvo

## 5. Nestlé Colombia: KLIM y El Rodeo

<https://www.nestlefamilynes.co/marcas/klim> · **Segmento:** B2C (consumo). Líder de góndola; sitios nestlefamilynes.co y nestle-contigo.co.

**Por qué importa:** KLIM y El Rodeo comparten góndola con The Cántaro en Megatiendas Cartagena (KLIM Fortificada 360 g a $22.890; El Rodeo 875 g a $38.090, 2026-09-25).

**Benchmark móvil:** Performance 31, LCP 6,0 s, 3,5 MB, Accesibilidad 97.

**Qué hace bien**

- Ficha con tabla nutricional en HTML real (24 nutrientes, por 100 mL y por porción) y modo de preparación con medidas caseras.
- FAQ por producto con FAQPage y JSON-LD Product en la ficha.
- Sistema visual coherente (corazón dorado, paleta acotada) y buen contraste (#1f2937 sobre blanco 14,68:1).
- Accesibilidad Lighthouse 97, la más alta del benchmark; 0 de 108 imágenes sin alt en la página de marca.

**Patrones destacados**

- Barra sticky de anclas en pills: Beneficios, Tabla, Preparación, FAQ.
- Rendimiento en unidades de consumo ('Rinde 15 vasos / 3 litros') y preparación con cucharadas y gramos.
- Visor de empaque de El Rodeo con hotspots que explican la etiqueta y el sello de advertencia.
- Pills de segmento en cada tarjeta de producto (Familia, Etapa escolar).

**Debilidades**

- No hay 'Dónde comprar', precio ni enlace a retailers en ninguna página.
- KLIM Clásica queda en la página 2 de un catálogo infantil y no existe filtro de leche en polvo.
- Sin página de calidad ni certificaciones (0 menciones de ISO, FSSC o INVIMA).
- Marca fragmentada en 4 dominios; El Rodeo con tabla nutricional en imagen y contraste 2,27:1.
- Página de marca sin H1; 7,84 MB tras el scroll en desktop.

**Capturas clave**

- [`auditoria/capturas/competidores/nestle-klim/home-desktop-fold.jpg`](capturas/competidores/nestle-klim/home-desktop-fold.jpg) (desktop): Página de marca KLIM, primer pantallazo
- [`auditoria/capturas/competidores/nestle-klim/ficha-tabla-nutricional-desktop.jpg`](capturas/competidores/nestle-klim/ficha-tabla-nutricional-desktop.jpg) (desktop): Pestaña Valores nutricionales
- [`auditoria/capturas/competidores/nestle-klim/ficha-desktop.jpg`](capturas/competidores/nestle-klim/ficha-desktop.jpg) (desktop): Ficha KLIM® Clásica (/producto/klim-clasica)
- [`auditoria/capturas/competidores/nestle-klim/catalogo-filtros-movil.jpg`](capturas/competidores/nestle-klim/catalogo-filtros-movil.jpg) (móvil): Panel de filtros
- [`auditoria/capturas/competidores/nestle-klim/el-rodeo-empaque-0-desktop.jpg`](capturas/competidores/nestle-klim/el-rodeo-empaque-0-desktop.jpg) (desktop): Visor de empaque El Rodeo, frente
- [`auditoria/capturas/competidores/nestle-klim/home-movil-fold.jpg`](capturas/competidores/nestle-klim/home-movil-fold.jpg) (móvil): Página de marca KLIM, primer pantallazo

## 6. Alquería (con Freskaleche)

<https://www.alqueria.com.co/> · **Segmento:** B2C (consumo). La leche en polvo del grupo se vende con la marca Freskaleche (380 y 900 g).

**Por qué importa:** Mejor referente de presentación de calidad y de 'dónde comprar'; su leche en polvo vive en freskaleche.com.co.

**Benchmark móvil:** Performance 35, LCP 19,5 s, 3,7 MB, Accesibilidad 79.

**Qué hace bien**

- 'Compra este producto' enlaza a la ficha exacta en Éxito, Carulla, Rappi y Olímpica.
- Tabla nutricional en HTML, tabla de presentaciones con porciones y comparador de leches.
- Página propia de certificaciones con fotos reales de planta y puntaje B cuantificado (116,4 frente a 52,3 / 94,4 / 95,4).
- Cadena de valor en 8 pasos y mapa de plantas y acopios; sistema visual coherente (rojo #ed1b2e sobre crema).

**Patrones destacados**

- Tarjetas de retail al producto exacto, con respaldo 'también en tiendas y minimercados'.
- Comparador con 3 datos fijos (grasa, proteína, calcio).
- Certificaciones en zigzag con foto real de planta.
- Selector Distribuidor/Comercializador o PQRS en el formulario de Freskaleche.

**Debilidades**

- La leche en polvo es invisible en alqueria.com.co: las URL de producto redirigen 301 a /productos y la búsqueda no devuelve producto.
- Certificaciones sin ISO, Invima, número ni vigencia; Freskaleche oculta sus sellos ISO con display:none.
- Cifras contradictorias: 9 frente a 7 plantas; 62, 65 o 'más de seis décadas' de antigüedad.
- Información clave dentro de imágenes (mapas, teléfonos) y 0 JSON-LD en 13 páginas.
- Sin oferta B2B en alqueria.com.co; la ficha de Freskaleche no tiene H1, usa tabla en imagen y desborda en móvil.

**Capturas clave**

- [`auditoria/capturas/competidores/alqueria/ficha-donde-comprar-desktop.jpg`](capturas/competidores/alqueria/ficha-donde-comprar-desktop.jpg) (desktop): Ficha: Compra este producto
- [`auditoria/capturas/competidores/alqueria/ficha-nutricional-desktop.jpg`](capturas/competidores/alqueria/ficha-nutricional-desktop.jpg) (desktop): Ficha: información nutricional
- [`auditoria/capturas/competidores/alqueria/ficha-comparador-desktop.jpg`](capturas/competidores/alqueria/ficha-comparador-desktop.jpg) (desktop): Ficha: Comparador de leches
- [`auditoria/capturas/competidores/alqueria/certificaciones-desktop.jpg`](capturas/competidores/alqueria/certificaciones-desktop.jpg) (desktop): Certificaciones de calidad
- [`auditoria/capturas/competidores/alqueria/donde-estamos-plantas-desktop.jpg`](capturas/competidores/alqueria/donde-estamos-plantas-desktop.jpg) (desktop): Dónde estamos: contadores y plantas
- [`auditoria/capturas/competidores/alqueria/freskaleche-polvo-desktop.jpg`](capturas/competidores/alqueria/freskaleche-polvo-desktop.jpg) (desktop): Freskaleche: Leche en polvo (ficha del grupo)

## 7. Alpina

<https://alpina.com/> · **Segmento:** B2C (consumo). Referente de catálogo; en polvo solo tiene la línea infantil Nutrimax.

**Por qué importa:** No compite en leche entera en polvo; es el referente de catálogo profundo, transparencia corporativa y triaje de contactos.

**Benchmark móvil:** Performance 26, LCP 52,0 s, 12,8 MB, Accesibilidad 84.

**Qué hace bien**

- Catálogo de 322 productos con megamenú, buscador predictivo y filtros con conteo por presentación.
- Plantilla de packshot con banda de color de variante y volumen; ficha con SKU y EAN visibles.
- Historia por eras con hitos y fotos de archivo.
- Contacto con triaje por perfil (distribuidor, proveedor, empleo), página de canales con cifras y 12 informes de sostenibilidad.

**Patrones destacados**

- Filtros con conteo por atributo real de compra (Presentación: Bolsa 11 / Caja 11).
- SKU y EAN junto al nombre en la ficha.
- Triaje por perfil antes del formulario de contacto.
- Banners con enlace profundo a la ficha del producto en el retailer (exito.com, jumbocolombia.com).
- Búsquedas populares que revelan demanda de 'leche en polvo' sin tener el producto.

**Debilidades**

- El sitio más pesado del grupo: 11,08 MB y 437 solicitudes en desktop.
- Home sin H1, JSON-LD inválido y 84 de 162 imágenes sin alt útil.
- Tienda oculta con CSS: sin precio ni 'dónde comprar' en la ficha, pero con precio en el JSON-LD.
- Página B2B fuera del menú y sin formulario; política de calidad en un PDF de imagen.
- CTA naranja con contraste 2,54:1 y dos líneas gratuitas distintas (018000 519 999 y 018000 529 999).

**Capturas clave**

- [`auditoria/capturas/competidores/alpina/catalogo-desktop.jpg`](capturas/competidores/alpina/catalogo-desktop.jpg) (desktop): https://alpina.com/leches
- [`auditoria/capturas/competidores/alpina/ficha-desktop.jpg`](capturas/competidores/alpina/ficha-desktop.jpg) (desktop): https://alpina.com/alimento-en-polvo-nutrimax-etapa-3-800-g
- [`auditoria/capturas/competidores/alpina/buscador-desktop.jpg`](capturas/competidores/alpina/buscador-desktop.jpg) (desktop): https://alpina.com/
- [`auditoria/capturas/competidores/alpina/contacto-desktop.jpg`](capturas/competidores/alpina/contacto-desktop.jpg) (desktop): https://alpina.com/alpina-contactenos-1
- [`auditoria/capturas/competidores/alpina/distribuidores-desktop.jpg`](capturas/competidores/alpina/distribuidores-desktop.jpg) (desktop): https://alpina.com/canales-de-distribucion
- [`auditoria/capturas/competidores/alpina/nosotros-desktop.jpg`](capturas/competidores/alpina/nosotros-desktop.jpg) (desktop): https://alpina.com/nuestra-historia

## Qué funciona en el segmento

1. Tabla nutricional en HTML real, con porción y porciones por envase (KLIM, Alquería). En imagen pierde indexación y accesibilidad (Alpina, El Rodeo, Freskaleche).
2. 'Dónde comprar' con enlace a la ficha exacta del producto en cada cadena (Alquería: Éxito, Carulla, Rappi y Olímpica; Alpina en banners con UTM).
3. Rendimiento en unidades de consumo: vasos, litros y porciones por presentación, y preparación con cucharadas y gramos (KLIM, El Rodeo, Alquería).
4. FAQ por producto que responde objeciones de compra, con marcado FAQPage (KLIM; Proleche en su landing de canal).
5. Triaje por perfil antes del formulario: distribuidor, proveedor, empleo o PQRS (Alpina, Freskaleche, Proleche con su select 'Tema', Nestlé con 'Solicitud Comercial').
6. Landing de captación de distribuidores con requisitos, calculadora de ganancias, testimonios y FAQ (Proleche).
7. Packshots homogéneos con código de color por variante y gramaje (Coolechera, Alpina, Proleche).
8. Filtros por atributos reales de compra con conteo, y SKU/EAN visibles en la ficha (Alpina).
9. Prueba de calidad con fotos reales de planta y cifras en contexto (Alquería); certificado, foto de la entrega e informe PDF (Indunilo).
10. Relato de origen con hitos fechados y fotos reales de ganaderos o de archivo (Alpina, Coolechera, Freskaleche).
11. Vitrina de capacidad B2B: pestañas 'Marcas propias / Maquilas' (Indunilo) y cifras por canal (Alpina, Coolechera).
12. WhatsApp con mensaje precargado (Cosmolac) o enrutado por ciudad (Coolechera).

## Oportunidades para Mundilácteos

Lo que ningún competidor analizado hace bien:

1. Certificación verificable: ningún competidor publica en HTML el certificado con ente, número, alcance y vigencia, ni el registro Invima por SKU. Mundilácteos puede hacerlo con sus registros vigentes, el concepto sanitario favorable y el ISO 9001:2015 si el cliente lo acredita.
2. Ficha técnica B2B del bulto (5, 12,5 y 25 kg) con especificaciones fisicoquímicas, vida útil, unidades por paca y PDF propio: Proleche no muestra el bulto, Coolechera tiene fichas vacías e Indunilo enlaza PDF con 404.
3. Cotizador mayorista estructurado (producto, presentación, cantidad, frecuencia, ciudad, NIT) con autorización de datos: nadie lo tiene; lo más cercano es el texto libre de Indunilo.
4. 'Dónde comprar' que combine cadenas nacionales y distribuidores de la Costa Caribe con WhatsApp por ciudad: Alquería cubre solo retail nacional y Coolechera solo puntos propios, con mapas rotos.
5. Denominación legal clara (leche en polvo frente a mezcla láctea) y una guía 'cómo leer el empaque': en el segmento abundan las confusiones (Cosmolac Total, Proleche deslactosada, El Rodeo entera o azucarada).
6. Sitio rápido y accesible: en el benchmark Lighthouse móvil nadie supera Performance 62 ni baja de 5,2 s de LCP; un sitio estático puede ser el único con LCP ≤ 2,5 s y CTA con contraste AA.
7. Maquila y marca propia como servicio bien presentado (solo Indunilo lo intenta, con enlaces rotos); el RSA-006359-2018 autoriza 17 marcas, sin nombrar cadenas sin su permiso.
8. Relato 'empresa familiar de Cartagena' en HTML con datos verificables: ninguna marca del Caribe lo cuenta bien (Coolechera tiene la historia en imágenes y el video roto).
9. Datos corporativos consistentes en sitio, empaques y redes: todos los competidores tienen contradicciones de teléfonos, años o cifras.

## Incongruencias detectadas entre fuentes de competencia

- Coolechera: el descubrimiento dice que publica el sello BASC 6.0.1; el análisis profundo solo encontró la intención de recertificarse ('este 2023 queremos…').
- Nestlé KLIM: el descubrimiento midió 1,5 MB y 3,7 s; el análisis profundo, 2,58 MB en networkidle y 7,84 MB tras el scroll (método distinto).
- Proleche: el descubrimiento dice H1 vacío; la home tiene el H1 en la diapositiva 2 del slider y otras páginas no tienen H1.
- Indunilo: el descubrimiento dice que 'Quiénes somos' existe en dos rutas; /la-compania/quienes-somos redirige a /no-se-encuentra.
- Cosmolac: el descubrimiento dice '25 de 30 imágenes sin alt'; en rigor tienen alt vacío, no ausente.
- Coolechera, Indunilo y Cosmolac: tiempos y pesos del descubrimiento (7,9 s y 5,7 MB; 2,0 s y 2,9 MB; 3,1 s y 7,5 MB) difieren de las mediciones profundas (6,0-6,2 s y 6,0 MB; 1,7 s y 4,5-4,8 MB; 2,6 s y 6,36 MB).

## Descartados

- **Colanta:** Bloqueado, no se pudo analizar. Por mercado es muy relevante: está en las góndolas de Megatiendas y Olímpica en bolsas de 380 y 900 g, y Makro vende su bulto de 25 kg (HTTP 200). Pero colanta.com, www.colanta.com, colanta.com.co y pidecolanta.com devuelven 403 con desafío de Cloudflare a curl, a Playwright y a WebFetch. No se intentó rodear el bloqueo. Captura: /tmp/claude-0/-home-user-Page/82c95b4f-955a-5094-841c-d2c658789d1c/scratchpad/competidores/capturas/colanta-home-bloqueado-desktop.jpg. Se recomienda seguirlo a través de los listados de los supermercados.
- **Parmalat Colombia:** Es del mismo grupo (Lactalis) que Proleche, que ya está seleccionado. parmalat.com.co responde 200, pero ni la home ni /quienes-somos/ mencionan 'polvo'.
- **Freskaleche:** Se integra en la ficha de Alquería: su página de leche en polvo, www.freskaleche.com.co/leche-en-polvo/ (200), es la fuente de leche en polvo del grupo. Solo tiene bolsas de 380 y 900 g y es Empresa B. Su sede está en Santander y no se verificó distribución en el Caribe. El dominio freskaleche.com es un dominio estacionado que redirige a /lander.
- **Algarra:** Según Infobae (16/03/2026), Gloria Foods anunció el cierre indefinido de la operación láctea de Algarra y de la planta de Cogua. www.algarra.com.co responde 200 a curl con agente de navegador (403 con el agente por defecto de curl y 403 de CloudFront en Playwright), y su home no menciona 'polvo'.
- **Klaren's (Klarens):** Es regional del Caribe (Valledupar), pero klarens.com.co/productos/ (200) no contiene 'polvo': su foco es suero costeño, quesos y leche líquida. klarens.com es un dominio estacionado (/lander) y lecheklarens.com no respondió (el proxy devolvió 502 al CONNECT).
- **Celema:** celema.co (200) ofrece maquila industrial y menciona BASC, pero la home, /maquila-industria/ y /nuestra-industria/ no contienen 'polvo'.
- **IPF (Ingredientes y Productos Funcionales):** Es un proveedor de ingredientes; según buscadores vende lactosuero en polvo y tiene tienda en tienda.ipf.com.co. ipf.com.co responde 200 pero su home no contiene 'polvo', y no envasa ni vende leche en polvo de consumo, así que su comprador es distinto.
- **Bluxus / Milk Día:** Bluxus (bluxus.com, 200) es un distribuidor mayorista de muchas categorías (combustibles, medicamentos, maquinaria) que revende la leche en polvo Milk Día en bultos de 25 kg y bolsas de 380 y 900 g, con despacho desde Funza. Milk Día está en la góndola de Megatiendas, pero no se encontró su sitio oficial ni se identificó al fabricante. Conviene vigilar a Bluxus por su contenido SEO ('marcas de leche en polvo en Colombia 2026').
- **Marca propia Olímpica y MIL'K:** Olímpica es un canal de venta, no un competidor web: su marca propia (350 a 1000 g) compite solo en góndola. MIL'K Entera 900 g aparece en Olímpica sin fabricante ni sitio identificados.
- **Lácteos Betania:** www.lacteosbetania.com responde 200, pero ni la home ni las categorías (leche, yogures, panadería, dulcería) mencionan 'polvo'.
- **Coolesar y otros dominios sin respuesta:** No verificables. coolesar.com.co, coolesar.com, lactalis.com.co (túnel cerrado), mundoalqueria.co y cosmolac.net.co no respondieron (el proxy devolvió 502 al CONNECT o cerró el túnel). Se reportan como bloqueados o no disponibles.
- **Nido (nido.com.co):** nido.com.co no es de Nestlé: es un sitio de alojamiento construido con Lodgify. Nido no figura en el listado de marcas de Nestlé Colombia (WebFetch) y nestlefamilynes.co/marcas/nido da 404.

## Inventario completo de capturas de competidores

Todas existen en disco. Rutas relativas a la raíz del repositorio.

<details><summary>Cosmolac S.A.S. (40 capturas)</summary>

- [`auditoria/capturas/competidores/cosmolac/home-desktop.jpg`](capturas/competidores/cosmolac/home-desktop.jpg) (desktop): Home
- [`auditoria/capturas/competidores/cosmolac/home-desktop-fold.jpg`](capturas/competidores/cosmolac/home-desktop-fold.jpg) (desktop): Home (primer pantallazo)
- [`auditoria/capturas/competidores/cosmolac/home-movil.jpg`](capturas/competidores/cosmolac/home-movil.jpg) (móvil): Home
- [`auditoria/capturas/competidores/cosmolac/home-movil-fold.jpg`](capturas/competidores/cosmolac/home-movil-fold.jpg) (móvil): Home (primer pantallazo)
- [`auditoria/capturas/competidores/cosmolac/menu-movil.jpg`](capturas/competidores/cosmolac/menu-movil.jpg) (móvil): Cabecera móvil (evidencia de que no hay menú)
- [`auditoria/capturas/competidores/cosmolac/menu-movil-scroll.jpg`](capturas/competidores/cosmolac/menu-movil-scroll.jpg) (móvil): Home con scroll de 1400 px
- [`auditoria/capturas/competidores/cosmolac/menu-desktop-hover.jpg`](capturas/competidores/cosmolac/menu-desktop-hover.jpg) (desktop): Menú principal con hover
- [`auditoria/capturas/competidores/cosmolac/header-desktop-scroll.jpg`](capturas/competidores/cosmolac/header-desktop-scroll.jpg) (desktop): Home con scroll de 1200 px
- [`auditoria/capturas/competidores/cosmolac/clientes-desktop.jpg`](capturas/competidores/cosmolac/clientes-desktop.jpg) (desktop): Home, bloque Nuestros clientes
- [`auditoria/capturas/competidores/cosmolac/footer-desktop.jpg`](capturas/competidores/cosmolac/footer-desktop.jpg) (desktop): Footer
- [`auditoria/capturas/competidores/cosmolac/footer-movil-zoom.jpg`](capturas/competidores/cosmolac/footer-movil-zoom.jpg) (móvil): Footer (recorte de home-movil.jpg)
- [`auditoria/capturas/competidores/cosmolac/catalogo-desktop.jpg`](capturas/competidores/cosmolac/catalogo-desktop.jpg) (desktop): Catálogo /nuestros-productos/
- [`auditoria/capturas/competidores/cosmolac/catalogo-desktop-fold.jpg`](capturas/competidores/cosmolac/catalogo-desktop-fold.jpg) (desktop): Catálogo (primer pantallazo)
- [`auditoria/capturas/competidores/cosmolac/catalogo-movil.jpg`](capturas/competidores/cosmolac/catalogo-movil.jpg) (móvil): Catálogo /nuestros-productos/
- [`auditoria/capturas/competidores/cosmolac/catalogo-movil-fold.jpg`](capturas/competidores/cosmolac/catalogo-movil-fold.jpg) (móvil): Catálogo (primer pantallazo)
- [`auditoria/capturas/competidores/cosmolac/empaques-banner-catalogo-zoom.jpg`](capturas/competidores/cosmolac/empaques-banner-catalogo-zoom.jpg) (desktop): Recorte del banner del catálogo (imagen original del sitio)
- [`auditoria/capturas/competidores/cosmolac/ficha-desktop.jpg`](capturas/competidores/cosmolac/ficha-desktop.jpg) (desktop): Ficha /leche-en-polvo-entera/
- [`auditoria/capturas/competidores/cosmolac/ficha-desktop-fold.jpg`](capturas/competidores/cosmolac/ficha-desktop-fold.jpg) (desktop): Ficha leche en polvo entera (primer pantallazo)
- [`auditoria/capturas/competidores/cosmolac/ficha-movil.jpg`](capturas/competidores/cosmolac/ficha-movil.jpg) (móvil): Ficha /leche-en-polvo-entera/
- [`auditoria/capturas/competidores/cosmolac/ficha-movil-fold.jpg`](capturas/competidores/cosmolac/ficha-movil-fold.jpg) (móvil): Ficha leche en polvo entera (primer pantallazo)
- [`auditoria/capturas/competidores/cosmolac/ficha-descremada-desktop.jpg`](capturas/competidores/cosmolac/ficha-descremada-desktop.jpg) (desktop): Ficha /leche-en-polvo-descremada/ (la más completa)
- [`auditoria/capturas/competidores/cosmolac/ficha-descremada-desktop-fold.jpg`](capturas/competidores/cosmolac/ficha-descremada-desktop-fold.jpg) (desktop): Ficha descremada (primer pantallazo)
- [`auditoria/capturas/competidores/cosmolac/ficha-descremada-movil.jpg`](capturas/competidores/cosmolac/ficha-descremada-movil.jpg) (móvil): Ficha descremada
- [`auditoria/capturas/competidores/cosmolac/ficha-descremada-movil-fold.jpg`](capturas/competidores/cosmolac/ficha-descremada-movil-fold.jpg) (móvil): Ficha descremada (primer pantallazo)
- [`auditoria/capturas/competidores/cosmolac/nosotros-desktop.jpg`](capturas/competidores/cosmolac/nosotros-desktop.jpg) (desktop): /compromiso-ganadero/ (reemplaza a Nosotros)
- [`auditoria/capturas/competidores/cosmolac/nosotros-desktop-fold.jpg`](capturas/competidores/cosmolac/nosotros-desktop-fold.jpg) (desktop): /compromiso-ganadero/ (primer pantallazo)
- [`auditoria/capturas/competidores/cosmolac/nosotros-movil.jpg`](capturas/competidores/cosmolac/nosotros-movil.jpg) (móvil): /compromiso-ganadero/
- [`auditoria/capturas/competidores/cosmolac/nosotros-movil-fold.jpg`](capturas/competidores/cosmolac/nosotros-movil-fold.jpg) (móvil): /compromiso-ganadero/ (primer pantallazo)
- [`auditoria/capturas/competidores/cosmolac/nosotros-404-desktop.jpg`](capturas/competidores/cosmolac/nosotros-404-desktop.jpg) (desktop): /nosotros/ (404)
- [`auditoria/capturas/competidores/cosmolac/nosotros-404-desktop-fold.jpg`](capturas/competidores/cosmolac/nosotros-404-desktop-fold.jpg) (desktop): /nosotros/ (404, primer pantallazo)
- [`auditoria/capturas/competidores/cosmolac/sostenibilidad-desktop.jpg`](capturas/competidores/cosmolac/sostenibilidad-desktop.jpg) (desktop): /responsabilidad-ambiental/
- [`auditoria/capturas/competidores/cosmolac/sostenibilidad-desktop-fold.jpg`](capturas/competidores/cosmolac/sostenibilidad-desktop-fold.jpg) (desktop): /responsabilidad-ambiental/ (primer pantallazo)
- [`auditoria/capturas/competidores/cosmolac/sostenibilidad-movil.jpg`](capturas/competidores/cosmolac/sostenibilidad-movil.jpg) (móvil): /responsabilidad-ambiental/
- [`auditoria/capturas/competidores/cosmolac/sostenibilidad-movil-fold.jpg`](capturas/competidores/cosmolac/sostenibilidad-movil-fold.jpg) (móvil): /responsabilidad-ambiental/ (primer pantallazo)
- [`auditoria/capturas/competidores/cosmolac/sostenibilidad-certificado-compensacion.jpg`](capturas/competidores/cosmolac/sostenibilidad-certificado-compensacion.jpg) (desktop): Documento publicado en /responsabilidad-ambiental/ (imagen original)
- [`auditoria/capturas/competidores/cosmolac/sostenibilidad-declaracion-co2.jpg`](capturas/competidores/cosmolac/sostenibilidad-declaracion-co2.jpg) (desktop): Documento publicado en /responsabilidad-ambiental/ (imagen original)
- [`auditoria/capturas/competidores/cosmolac/contacto-desktop.jpg`](capturas/competidores/cosmolac/contacto-desktop.jpg) (desktop): /contacto/
- [`auditoria/capturas/competidores/cosmolac/contacto-desktop-fold.jpg`](capturas/competidores/cosmolac/contacto-desktop-fold.jpg) (desktop): /contacto/ (primer pantallazo)
- [`auditoria/capturas/competidores/cosmolac/contacto-movil.jpg`](capturas/competidores/cosmolac/contacto-movil.jpg) (móvil): /contacto/
- [`auditoria/capturas/competidores/cosmolac/contacto-movil-fold.jpg`](capturas/competidores/cosmolac/contacto-movil-fold.jpg) (móvil): /contacto/ (primer pantallazo)

</details>

<details><summary>Coolechera (34 capturas)</summary>

- [`auditoria/capturas/competidores/coolechera/home-desktop-fold.jpg`](capturas/competidores/coolechera/home-desktop-fold.jpg) (desktop): Inicio
- [`auditoria/capturas/competidores/coolechera/home-desktop.jpg`](capturas/competidores/coolechera/home-desktop.jpg) (desktop): Inicio (página completa)
- [`auditoria/capturas/competidores/coolechera/menu-desktop-submenu.jpg`](capturas/competidores/coolechera/menu-desktop-submenu.jpg) (desktop): Menú principal (submenú abierto)
- [`auditoria/capturas/competidores/coolechera/home-movil-fold.jpg`](capturas/competidores/coolechera/home-movil-fold.jpg) (móvil): Inicio
- [`auditoria/capturas/competidores/coolechera/home-movil.jpg`](capturas/competidores/coolechera/home-movil.jpg) (móvil): Inicio (página completa)
- [`auditoria/capturas/competidores/coolechera/menu-movil.jpg`](capturas/competidores/coolechera/menu-movil.jpg) (móvil): Menú hamburguesa abierto
- [`auditoria/capturas/competidores/coolechera/menu-movil-submenu.jpg`](capturas/competidores/coolechera/menu-movil-submenu.jpg) (móvil): Menú hamburguesa con submenú
- [`auditoria/capturas/competidores/coolechera/catalogo-desktop.jpg`](capturas/competidores/coolechera/catalogo-desktop.jpg) (desktop): Tienda /tienda/
- [`auditoria/capturas/competidores/coolechera/catalogo-movil-fold.jpg`](capturas/competidores/coolechera/catalogo-movil-fold.jpg) (móvil): Tienda
- [`auditoria/capturas/competidores/coolechera/catalogo-leches-desktop.jpg`](capturas/competidores/coolechera/catalogo-leches-desktop.jpg) (desktop): Categoría Leches
- [`auditoria/capturas/competidores/coolechera/catalogo-leches-movil.jpg`](capturas/competidores/coolechera/catalogo-leches-movil.jpg) (móvil): Categoría Leches
- [`auditoria/capturas/competidores/coolechera/ficha-desktop.jpg`](capturas/competidores/coolechera/ficha-desktop.jpg) (desktop): Ficha 'Leche en polvo 900' (/producto/leche-en-polvo-900-ml/)
- [`auditoria/capturas/competidores/coolechera/ficha-movil-fold.jpg`](capturas/competidores/coolechera/ficha-movil-fold.jpg) (móvil): Ficha 'Leche en polvo 900'
- [`auditoria/capturas/competidores/coolechera/ficha-25kg-desktop-fold.jpg`](capturas/competidores/coolechera/ficha-25kg-desktop-fold.jpg) (desktop): Ficha 'Leche en polvo 25kg'
- [`auditoria/capturas/competidores/coolechera/ficha-25kg-movil.jpg`](capturas/competidores/coolechera/ficha-25kg-movil.jpg) (móvil): Ficha 'Leche en polvo 25kg'
- [`auditoria/capturas/competidores/coolechera/nosotros-desktop.jpg`](capturas/competidores/coolechera/nosotros-desktop.jpg) (desktop): Somos Coolechera /somos-coolechera/
- [`auditoria/capturas/competidores/coolechera/nosotros-movil-fold.jpg`](capturas/competidores/coolechera/nosotros-movil-fold.jpg) (móvil): Somos Coolechera
- [`auditoria/capturas/competidores/coolechera/historia-desktop.jpg`](capturas/competidores/coolechera/historia-desktop.jpg) (desktop): Nuestra Historia /nuestra-historia/
- [`auditoria/capturas/competidores/coolechera/historia-movil-fold.jpg`](capturas/competidores/coolechera/historia-movil-fold.jpg) (móvil): Nuestra Historia
- [`auditoria/capturas/competidores/coolechera/calidad-sellos-desktop.jpg`](capturas/competidores/coolechera/calidad-sellos-desktop.jpg) (desktop): Post '¿Qué significan los sellos que tienen las bolsas de leche Coolechera?'
- [`auditoria/capturas/competidores/coolechera/calidad-sellos-movil.jpg`](capturas/competidores/coolechera/calidad-sellos-movil.jpg) (móvil): Post de sellos
- [`auditoria/capturas/competidores/coolechera/calidad-basc-desktop.jpg`](capturas/competidores/coolechera/calidad-basc-desktop.jpg) (desktop): Post 'La seguridad es compromiso de todos – BASC versión 6 y 6.0.1'
- [`auditoria/capturas/competidores/coolechera/calidad-basc-movil-fold.jpg`](capturas/competidores/coolechera/calidad-basc-movil-fold.jpg) (móvil): Post BASC
- [`auditoria/capturas/competidores/coolechera/b2b-desktop-fold.jpg`](capturas/competidores/coolechera/b2b-desktop-fold.jpg) (desktop): Canal Institucional e Industrial
- [`auditoria/capturas/competidores/coolechera/b2b-desktop.jpg`](capturas/competidores/coolechera/b2b-desktop.jpg) (desktop): Canal Institucional e Industrial (página completa)
- [`auditoria/capturas/competidores/coolechera/b2b-whatsapp-ciudades-movil.jpg`](capturas/competidores/coolechera/b2b-whatsapp-ciudades-movil.jpg) (móvil): Canal Institucional: directorio de WhatsApp desplegado
- [`auditoria/capturas/competidores/coolechera/b2b-whatsapp-ciudades-desktop.jpg`](capturas/competidores/coolechera/b2b-whatsapp-ciudades-desktop.jpg) (desktop): Canal Institucional: directorio de WhatsApp desplegado
- [`auditoria/capturas/competidores/coolechera/b2b-movil.jpg`](capturas/competidores/coolechera/b2b-movil.jpg) (móvil): Canal Institucional e Industrial
- [`auditoria/capturas/competidores/coolechera/contacto-desktop.jpg`](capturas/competidores/coolechera/contacto-desktop.jpg) (desktop): Contacto /contacto/
- [`auditoria/capturas/competidores/coolechera/contacto-movil-fold.jpg`](capturas/competidores/coolechera/contacto-movil-fold.jpg) (móvil): Contacto
- [`auditoria/capturas/competidores/coolechera/donde-comprar-desktop.jpg`](capturas/competidores/coolechera/donde-comprar-desktop.jpg) (desktop): Punto del Sabor /tienda/punto-del-sabor/ (dónde comprar)
- [`auditoria/capturas/competidores/coolechera/donde-comprar-movil.jpg`](capturas/competidores/coolechera/donde-comprar-movil.jpg) (móvil): Punto del Sabor
- [`auditoria/capturas/competidores/coolechera/error-404-polvo-900g-desktop-fold.jpg`](capturas/competidores/coolechera/error-404-polvo-900g-desktop-fold.jpg) (desktop): URL indexada /?product=leche-en-polvo-entera-900g
- [`auditoria/capturas/competidores/coolechera/sostenibilidad-vacia-desktop.jpg`](capturas/competidores/coolechera/sostenibilidad-vacia-desktop.jpg) (desktop): /sostenibilidad/ (en el sitemap, fuera del menú)

</details>

<details><summary>Proleche (Grupo Lactalis) (51 capturas)</summary>

- [`auditoria/capturas/competidores/proleche/home-desktop.jpg`](capturas/competidores/proleche/home-desktop.jpg) (desktop): Inicio (/)
- [`auditoria/capturas/competidores/proleche/home-desktop-fold.jpg`](capturas/competidores/proleche/home-desktop-fold.jpg) (desktop): Inicio (/)
- [`auditoria/capturas/competidores/proleche/home-desktop-fold-slide2.jpg`](capturas/competidores/proleche/home-desktop-fold-slide2.jpg) (desktop): Inicio (/)
- [`auditoria/capturas/competidores/proleche/home-desktop-fold-precarga.jpg`](capturas/competidores/proleche/home-desktop-fold-precarga.jpg) (desktop): Inicio (/)
- [`auditoria/capturas/competidores/proleche/home-desktop-sin-interaccion.jpg`](capturas/competidores/proleche/home-desktop-sin-interaccion.jpg) (desktop): Inicio (/)
- [`auditoria/capturas/competidores/proleche/home-movil.jpg`](capturas/competidores/proleche/home-movil.jpg) (móvil): Inicio (/)
- [`auditoria/capturas/competidores/proleche/home-movil-fold.jpg`](capturas/competidores/proleche/home-movil-fold.jpg) (móvil): Inicio (/)
- [`auditoria/capturas/competidores/proleche/home-movil-fold-precarga.jpg`](capturas/competidores/proleche/home-movil-fold-precarga.jpg) (móvil): Inicio (/)
- [`auditoria/capturas/competidores/proleche/home-movil-sin-interaccion.jpg`](capturas/competidores/proleche/home-movil-sin-interaccion.jpg) (móvil): Inicio (/)
- [`auditoria/capturas/competidores/proleche/menu-movil.jpg`](capturas/competidores/proleche/menu-movil.jpg) (móvil): Menú (inicio)
- [`auditoria/capturas/competidores/proleche/catalogo-desktop.jpg`](capturas/competidores/proleche/catalogo-desktop.jpg) (desktop): Productos (/productos/)
- [`auditoria/capturas/competidores/proleche/catalogo-desktop-fold.jpg`](capturas/competidores/proleche/catalogo-desktop-fold.jpg) (desktop): Productos (/productos/)
- [`auditoria/capturas/competidores/proleche/catalogo-movil.jpg`](capturas/competidores/proleche/catalogo-movil.jpg) (móvil): Productos (/productos/)
- [`auditoria/capturas/competidores/proleche/catalogo-movil-fold.jpg`](capturas/competidores/proleche/catalogo-movil-fold.jpg) (móvil): Productos (/productos/)
- [`auditoria/capturas/competidores/proleche/catalogo-crema-desktop.jpg`](capturas/competidores/proleche/catalogo-crema-desktop.jpg) (desktop): Productos > pestaña Crema de leche
- [`auditoria/capturas/competidores/proleche/ficha-desktop.jpg`](capturas/competidores/proleche/ficha-desktop.jpg) (desktop): Productos > pestaña EN POLVO (equivalente a ficha; no hay URL por producto)
- [`auditoria/capturas/competidores/proleche/ficha-desktop-slide1.jpg`](capturas/competidores/proleche/ficha-desktop-slide1.jpg) (desktop): Productos > EN POLVO, diapositiva 1
- [`auditoria/capturas/competidores/proleche/ficha-desktop-slide2.jpg`](capturas/competidores/proleche/ficha-desktop-slide2.jpg) (desktop): Productos > EN POLVO, diapositiva 2
- [`auditoria/capturas/competidores/proleche/ficha-desktop-slide3.jpg`](capturas/competidores/proleche/ficha-desktop-slide3.jpg) (desktop): Productos > EN POLVO, diapositiva 3
- [`auditoria/capturas/competidores/proleche/ficha-movil.jpg`](capturas/competidores/proleche/ficha-movil.jpg) (móvil): Productos > pestaña EN POLVO
- [`auditoria/capturas/competidores/proleche/ficha-movil-slide1.jpg`](capturas/competidores/proleche/ficha-movil-slide1.jpg) (móvil): Productos > EN POLVO, diapositiva 1
- [`auditoria/capturas/competidores/proleche/ficha-movil-slide2.jpg`](capturas/competidores/proleche/ficha-movil-slide2.jpg) (móvil): Productos > EN POLVO, diapositiva 2
- [`auditoria/capturas/competidores/proleche/ficha-movil-slide3.jpg`](capturas/competidores/proleche/ficha-movil-slide3.jpg) (móvil): Productos > EN POLVO, diapositiva 3
- [`auditoria/capturas/competidores/proleche/nosotros-desktop.jpg`](capturas/competidores/proleche/nosotros-desktop.jpg) (desktop): Nosotros (/nosotros/)
- [`auditoria/capturas/competidores/proleche/nosotros-desktop-fold.jpg`](capturas/competidores/proleche/nosotros-desktop-fold.jpg) (desktop): Nosotros (/nosotros/)
- [`auditoria/capturas/competidores/proleche/nosotros-movil.jpg`](capturas/competidores/proleche/nosotros-movil.jpg) (móvil): Nosotros (/nosotros/)
- [`auditoria/capturas/competidores/proleche/nosotros-movil-fold.jpg`](capturas/competidores/proleche/nosotros-movil-fold.jpg) (móvil): Nosotros (/nosotros/)
- [`auditoria/capturas/competidores/proleche/landing-leche-en-polvo-desktop.jpg`](capturas/competidores/proleche/landing-leche-en-polvo-desktop.jpg) (desktop): Leche en polvo (/leche-en-polvo/, solo en sitemap)
- [`auditoria/capturas/competidores/proleche/landing-leche-en-polvo-desktop-fold.jpg`](capturas/competidores/proleche/landing-leche-en-polvo-desktop-fold.jpg) (desktop): Leche en polvo (/leche-en-polvo/)
- [`auditoria/capturas/competidores/proleche/landing-leche-en-polvo-movil.jpg`](capturas/competidores/proleche/landing-leche-en-polvo-movil.jpg) (móvil): Leche en polvo (/leche-en-polvo/)
- [`auditoria/capturas/competidores/proleche/landing-leche-en-polvo-movil-fold.jpg`](capturas/competidores/proleche/landing-leche-en-polvo-movil-fold.jpg) (móvil): Leche en polvo (/leche-en-polvo/)
- [`auditoria/capturas/competidores/proleche/calidad-desktop.jpg`](capturas/competidores/proleche/calidad-desktop.jpg) (desktop): Tecnología (/tecnologia/), la única página cercana a 'calidad'
- [`auditoria/capturas/competidores/proleche/calidad-desktop-fold.jpg`](capturas/competidores/proleche/calidad-desktop-fold.jpg) (desktop): Tecnología (/tecnologia/)
- [`auditoria/capturas/competidores/proleche/calidad-movil.jpg`](capturas/competidores/proleche/calidad-movil.jpg) (móvil): Tecnología (/tecnologia/)
- [`auditoria/capturas/competidores/proleche/calidad-movil-fold.jpg`](capturas/competidores/proleche/calidad-movil-fold.jpg) (móvil): Tecnología (/tecnologia/)
- [`auditoria/capturas/competidores/proleche/contacto-desktop.jpg`](capturas/competidores/proleche/contacto-desktop.jpg) (desktop): Contacto (/contacto/)
- [`auditoria/capturas/competidores/proleche/contacto-desktop-fold.jpg`](capturas/competidores/proleche/contacto-desktop-fold.jpg) (desktop): Contacto (/contacto/)
- [`auditoria/capturas/competidores/proleche/contacto-movil.jpg`](capturas/competidores/proleche/contacto-movil.jpg) (móvil): Contacto (/contacto/)
- [`auditoria/capturas/competidores/proleche/contacto-movil-fold.jpg`](capturas/competidores/proleche/contacto-movil-fold.jpg) (móvil): Contacto (/contacto/)
- [`auditoria/capturas/competidores/proleche/industria-desktop.jpg`](capturas/competidores/proleche/industria-desktop.jpg) (desktop): Artículo 'Ventajas del uso de leche en polvo en la industria de alimentos'
- [`auditoria/capturas/competidores/proleche/industria-desktop-fold.jpg`](capturas/competidores/proleche/industria-desktop-fold.jpg) (desktop): Artículo de industria
- [`auditoria/capturas/competidores/proleche/industria-movil.jpg`](capturas/competidores/proleche/industria-movil.jpg) (móvil): Artículo de industria
- [`auditoria/capturas/competidores/proleche/industria-movil-fold.jpg`](capturas/competidores/proleche/industria-movil-fold.jpg) (móvil): Artículo de industria
- [`auditoria/capturas/competidores/proleche/distribuidores-desktop.jpg`](capturas/competidores/proleche/distribuidores-desktop.jpg) (desktop): Emprende con Proleche (/emprende-con-proleche/, landing de autoventistas; solo en sitemap)
- [`auditoria/capturas/competidores/proleche/distribuidores-desktop-fold.jpg`](capturas/competidores/proleche/distribuidores-desktop-fold.jpg) (desktop): Emprende con Proleche
- [`auditoria/capturas/competidores/proleche/distribuidores-movil.jpg`](capturas/competidores/proleche/distribuidores-movil.jpg) (móvil): Emprende con Proleche
- [`auditoria/capturas/competidores/proleche/distribuidores-movil-fold.jpg`](capturas/competidores/proleche/distribuidores-movil-fold.jpg) (móvil): Emprende con Proleche
- [`auditoria/capturas/competidores/proleche/grupo-lactalis-desktop.jpg`](capturas/competidores/proleche/grupo-lactalis-desktop.jpg) (desktop): Artículo 'Proleche: orgullo de ser parte de la gran familia Lactalis'
- [`auditoria/capturas/competidores/proleche/grupo-lactalis-desktop-fold.jpg`](capturas/competidores/proleche/grupo-lactalis-desktop-fold.jpg) (desktop): Artículo Lactalis
- [`auditoria/capturas/competidores/proleche/marca-hermana-parmalat-desktop.jpg`](capturas/competidores/proleche/marca-hermana-parmalat-desktop.jpg) (desktop): Parmalat Quiénes somos (https://parmalat.com.co/quienes-somos/)
- [`auditoria/capturas/competidores/proleche/marca-hermana-parmalat-desktop-fold.jpg`](capturas/competidores/proleche/marca-hermana-parmalat-desktop-fold.jpg) (desktop): Parmalat Quiénes somos

</details>

<details><summary>Indunilo S.A.S. (41 capturas)</summary>

- [`auditoria/capturas/competidores/indunilo/home-desktop.jpg`](capturas/competidores/indunilo/home-desktop.jpg) (desktop): Inicio (página completa, 3031 px, sin recorte)
- [`auditoria/capturas/competidores/indunilo/home-desktop-fold.jpg`](capturas/competidores/indunilo/home-desktop-fold.jpg) (desktop): Inicio (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/home-desktop-scroll-sticky.jpg`](capturas/competidores/indunilo/home-desktop-scroll-sticky.jpg) (desktop): Inicio con scroll a 1500 px
- [`auditoria/capturas/competidores/indunilo/home-bienvenidos-video-desktop.jpg`](capturas/competidores/indunilo/home-bienvenidos-video-desktop.jpg) (desktop): Inicio, sección Bienvenidos
- [`auditoria/capturas/competidores/indunilo/submenu-desktop.jpg`](capturas/competidores/indunilo/submenu-desktop.jpg) (desktop): Inicio, submenú Leche en Polvo (hover)
- [`auditoria/capturas/competidores/indunilo/submenu-compania-desktop.jpg`](capturas/competidores/indunilo/submenu-compania-desktop.jpg) (desktop): Inicio, submenú Compañía (hover)
- [`auditoria/capturas/competidores/indunilo/catalogo-desktop.jpg`](capturas/competidores/indunilo/catalogo-desktop.jpg) (desktop): Leche en polvo > Entera (/productos/leche-en-polvo/entera)
- [`auditoria/capturas/competidores/indunilo/catalogo-desktop-fold.jpg`](capturas/competidores/indunilo/catalogo-desktop-fold.jpg) (desktop): Leche en polvo > Entera (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/catalogo-hover-desktop.jpg`](capturas/competidores/indunilo/catalogo-hover-desktop.jpg) (desktop): Leche en polvo > Entera, hover sobre producto
- [`auditoria/capturas/competidores/indunilo/maquilas-desktop.jpg`](capturas/competidores/indunilo/maquilas-desktop.jpg) (desktop): Leche en polvo > Entera > Maquilas
- [`auditoria/capturas/competidores/indunilo/ficha-desktop.jpg`](capturas/competidores/indunilo/ficha-desktop.jpg) (desktop): Ficha Miramonte leche en polvo entera
- [`auditoria/capturas/competidores/indunilo/ficha-desktop-fold.jpg`](capturas/competidores/indunilo/ficha-desktop-fold.jpg) (desktop): Ficha Miramonte (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/nosotros-desktop.jpg`](capturas/competidores/indunilo/nosotros-desktop.jpg) (desktop): Quienes Somos (/compania/quienes-somos)
- [`auditoria/capturas/competidores/indunilo/nosotros-desktop-fold.jpg`](capturas/competidores/indunilo/nosotros-desktop-fold.jpg) (desktop): Quienes Somos (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/historia-publicacion-desktop.jpg`](capturas/competidores/indunilo/historia-publicacion-desktop.jpg) (desktop): Publicación 'Indunilo es líder en pulverización, empaque y distribución de leche' (29 jul 2018)
- [`auditoria/capturas/competidores/indunilo/calidad-politica-desktop.jpg`](capturas/competidores/indunilo/calidad-politica-desktop.jpg) (desktop): Política de Sistema Gestión Integral
- [`auditoria/capturas/competidores/indunilo/calidad-politica-desktop-fold.jpg`](capturas/competidores/indunilo/calidad-politica-desktop-fold.jpg) (desktop): Política SGI (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/certificacion-desktop.jpg`](capturas/competidores/indunilo/certificacion-desktop.jpg) (desktop): Publicación '¡Nuestro compromiso con la sostenibilidad, hoy certificado!' (22 dic 2025)
- [`auditoria/capturas/competidores/indunilo/certificacion-desktop-fold.jpg`](capturas/competidores/indunilo/certificacion-desktop-fold.jpg) (desktop): Publicación de certificación (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/contacto-desktop.jpg`](capturas/competidores/indunilo/contacto-desktop.jpg) (desktop): Contáctenos (/contactenos)
- [`auditoria/capturas/competidores/indunilo/contacto-desktop-fold.jpg`](capturas/competidores/indunilo/contacto-desktop-fold.jpg) (desktop): Contáctenos (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/cotizaciones-desktop.jpg`](capturas/competidores/indunilo/cotizaciones-desktop.jpg) (desktop): Cotizaciones (/contactenos/cotizaciones)
- [`auditoria/capturas/competidores/indunilo/cotizaciones-desktop-fold.jpg`](capturas/competidores/indunilo/cotizaciones-desktop-fold.jpg) (desktop): Cotizaciones (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/enlace-roto-sobre-nosotros-desktop.jpg`](capturas/competidores/indunilo/enlace-roto-sobre-nosotros-desktop.jpg) (desktop): Destino del enlace 'Sobre nosotros' del pie (/la-compania/quienes-somos → /no-se-encuentra)
- [`auditoria/capturas/competidores/indunilo/enlace-roto-sobre-nosotros-desktop-fold.jpg`](capturas/competidores/indunilo/enlace-roto-sobre-nosotros-desktop-fold.jpg) (desktop): Página no encontrada (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/home-movil.jpg`](capturas/competidores/indunilo/home-movil.jpg) (móvil): Inicio (página completa, 4558 px, sin recorte)
- [`auditoria/capturas/competidores/indunilo/home-movil-fold.jpg`](capturas/competidores/indunilo/home-movil-fold.jpg) (móvil): Inicio (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/menu-movil.jpg`](capturas/competidores/indunilo/menu-movil.jpg) (móvil): Menú abierto
- [`auditoria/capturas/competidores/indunilo/menu-movil-submenu.jpg`](capturas/competidores/indunilo/menu-movil-submenu.jpg) (móvil): Menú abierto con submenú Leche en Polvo
- [`auditoria/capturas/competidores/indunilo/catalogo-movil.jpg`](capturas/competidores/indunilo/catalogo-movil.jpg) (móvil): Leche en polvo > Entera
- [`auditoria/capturas/competidores/indunilo/catalogo-movil-fold.jpg`](capturas/competidores/indunilo/catalogo-movil-fold.jpg) (móvil): Leche en polvo > Entera (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/ficha-movil.jpg`](capturas/competidores/indunilo/ficha-movil.jpg) (móvil): Ficha Miramonte
- [`auditoria/capturas/competidores/indunilo/ficha-movil-fold.jpg`](capturas/competidores/indunilo/ficha-movil-fold.jpg) (móvil): Ficha Miramonte (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/nosotros-movil.jpg`](capturas/competidores/indunilo/nosotros-movil.jpg) (móvil): Quienes Somos
- [`auditoria/capturas/competidores/indunilo/nosotros-movil-fold.jpg`](capturas/competidores/indunilo/nosotros-movil-fold.jpg) (móvil): Quienes Somos (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/certificacion-movil.jpg`](capturas/competidores/indunilo/certificacion-movil.jpg) (móvil): Publicación de certificación
- [`auditoria/capturas/competidores/indunilo/certificacion-movil-fold.jpg`](capturas/competidores/indunilo/certificacion-movil-fold.jpg) (móvil): Publicación de certificación (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/contacto-movil.jpg`](capturas/competidores/indunilo/contacto-movil.jpg) (móvil): Contáctenos
- [`auditoria/capturas/competidores/indunilo/contacto-movil-fold.jpg`](capturas/competidores/indunilo/contacto-movil-fold.jpg) (móvil): Contáctenos (primer pantallazo)
- [`auditoria/capturas/competidores/indunilo/cotizaciones-movil.jpg`](capturas/competidores/indunilo/cotizaciones-movil.jpg) (móvil): Cotizaciones
- [`auditoria/capturas/competidores/indunilo/cotizaciones-movil-fold.jpg`](capturas/competidores/indunilo/cotizaciones-movil-fold.jpg) (móvil): Cotizaciones (primer pantallazo)

</details>

<details><summary>Nestlé Colombia: KLIM y El Rodeo (36 capturas)</summary>

- [`auditoria/capturas/competidores/nestle-klim/home-desktop.jpg`](capturas/competidores/nestle-klim/home-desktop.jpg) (desktop): Página de marca KLIM (/marcas/klim), completa
- [`auditoria/capturas/competidores/nestle-klim/home-desktop-fold.jpg`](capturas/competidores/nestle-klim/home-desktop-fold.jpg) (desktop): Página de marca KLIM, primer pantallazo
- [`auditoria/capturas/competidores/nestle-klim/home-movil.jpg`](capturas/competidores/nestle-klim/home-movil.jpg) (móvil): Página de marca KLIM, completa
- [`auditoria/capturas/competidores/nestle-klim/home-movil-fold.jpg`](capturas/competidores/nestle-klim/home-movil-fold.jpg) (móvil): Página de marca KLIM, primer pantallazo
- [`auditoria/capturas/competidores/nestle-klim/menu-movil.jpg`](capturas/competidores/nestle-klim/menu-movil.jpg) (móvil): Menú hamburguesa abierto
- [`auditoria/capturas/competidores/nestle-klim/menu-movil-marcas.jpg`](capturas/competidores/nestle-klim/menu-movil-marcas.jpg) (móvil): Submenú Marcas
- [`auditoria/capturas/competidores/nestle-klim/menu-desktop.jpg`](capturas/competidores/nestle-klim/menu-desktop.jpg) (desktop): Menú abierto (también es hamburguesa en desktop)
- [`auditoria/capturas/competidores/nestle-klim/menu-marcas-desktop.jpg`](capturas/competidores/nestle-klim/menu-marcas-desktop.jpg) (desktop): Submenú Marcas
- [`auditoria/capturas/competidores/nestle-klim/catalogo-desktop.jpg`](capturas/competidores/nestle-klim/catalogo-desktop.jpg) (desktop): Buscador de productos (/producto), página 1
- [`auditoria/capturas/competidores/nestle-klim/catalogo-desktop-fold.jpg`](capturas/competidores/nestle-klim/catalogo-desktop-fold.jpg) (desktop): Buscador de productos, primer pantallazo
- [`auditoria/capturas/competidores/nestle-klim/catalogo-filtro-marcas-desktop.jpg`](capturas/competidores/nestle-klim/catalogo-filtro-marcas-desktop.jpg) (desktop): Filtro Marcas desplegado
- [`auditoria/capturas/competidores/nestle-klim/catalogo-movil.jpg`](capturas/competidores/nestle-klim/catalogo-movil.jpg) (móvil): Buscador de productos, completa
- [`auditoria/capturas/competidores/nestle-klim/catalogo-movil-fold.jpg`](capturas/competidores/nestle-klim/catalogo-movil-fold.jpg) (móvil): Buscador de productos, primer pantallazo
- [`auditoria/capturas/competidores/nestle-klim/catalogo-filtros-movil.jpg`](capturas/competidores/nestle-klim/catalogo-filtros-movil.jpg) (móvil): Panel de filtros
- [`auditoria/capturas/competidores/nestle-klim/ficha-desktop.jpg`](capturas/competidores/nestle-klim/ficha-desktop.jpg) (desktop): Ficha KLIM® Clásica (/producto/klim-clasica)
- [`auditoria/capturas/competidores/nestle-klim/ficha-desktop-fold.jpg`](capturas/competidores/nestle-klim/ficha-desktop-fold.jpg) (desktop): Ficha KLIM® Clásica, primer pantallazo
- [`auditoria/capturas/competidores/nestle-klim/ficha-movil.jpg`](capturas/competidores/nestle-klim/ficha-movil.jpg) (móvil): Ficha KLIM® Clásica, completa
- [`auditoria/capturas/competidores/nestle-klim/ficha-movil-fold.jpg`](capturas/competidores/nestle-klim/ficha-movil-fold.jpg) (móvil): Ficha KLIM® Clásica, primer pantallazo
- [`auditoria/capturas/competidores/nestle-klim/ficha-tabla-nutricional-desktop.jpg`](capturas/competidores/nestle-klim/ficha-tabla-nutricional-desktop.jpg) (desktop): Pestaña Valores nutricionales
- [`auditoria/capturas/competidores/nestle-klim/ficha-beneficios-trazabilidad-desktop.jpg`](capturas/competidores/nestle-klim/ficha-beneficios-trazabilidad-desktop.jpg) (desktop): Carrusel Beneficios (lo más cercano a 'calidad')
- [`auditoria/capturas/competidores/nestle-klim/calidad-porque-klim-desktop.jpg`](capturas/competidores/nestle-klim/calidad-porque-klim-desktop.jpg) (desktop): Sección ¿Por qué KLIM®? (no existe una página de calidad)
- [`auditoria/capturas/competidores/nestle-klim/nosotros-desktop.jpg`](capturas/competidores/nestle-klim/nosotros-desktop.jpg) (desktop): ¿Quiénes somos? (/quienes-somos)
- [`auditoria/capturas/competidores/nestle-klim/nosotros-desktop-fold.jpg`](capturas/competidores/nestle-klim/nosotros-desktop-fold.jpg) (desktop): ¿Quiénes somos?, primer pantallazo
- [`auditoria/capturas/competidores/nestle-klim/nosotros-movil.jpg`](capturas/competidores/nestle-klim/nosotros-movil.jpg) (móvil): ¿Quiénes somos?, completa
- [`auditoria/capturas/competidores/nestle-klim/nosotros-movil-fold.jpg`](capturas/competidores/nestle-klim/nosotros-movil-fold.jpg) (móvil): ¿Quiénes somos?, primer pantallazo
- [`auditoria/capturas/competidores/nestle-klim/contacto-desktop.jpg`](capturas/competidores/nestle-klim/contacto-desktop.jpg) (desktop): Formulario de contacto (Salesforce, nestlecesomni.my.salesforce-sites.com)
- [`auditoria/capturas/competidores/nestle-klim/contacto-desktop-fold.jpg`](capturas/competidores/nestle-klim/contacto-desktop-fold.jpg) (desktop): Contacto, primer pantallazo
- [`auditoria/capturas/competidores/nestle-klim/contacto-movil.jpg`](capturas/competidores/nestle-klim/contacto-movil.jpg) (móvil): Contacto, completa
- [`auditoria/capturas/competidores/nestle-klim/contacto-movil-fold.jpg`](capturas/competidores/nestle-klim/contacto-movil-fold.jpg) (móvil): Contacto, primer pantallazo
- [`auditoria/capturas/competidores/nestle-klim/el-rodeo-desktop.jpg`](capturas/competidores/nestle-klim/el-rodeo-desktop.jpg) (desktop): EL RODEO® en Nestlé Contigo (/ElRodeo)
- [`auditoria/capturas/competidores/nestle-klim/el-rodeo-desktop-fold.jpg`](capturas/competidores/nestle-klim/el-rodeo-desktop-fold.jpg) (desktop): EL RODEO® en Nestlé Contigo, primer pantallazo
- [`auditoria/capturas/competidores/nestle-klim/el-rodeo-empaque-0-desktop.jpg`](capturas/competidores/nestle-klim/el-rodeo-empaque-0-desktop.jpg) (desktop): Visor de empaque El Rodeo, frente
- [`auditoria/capturas/competidores/nestle-klim/el-rodeo-empaque-1-desktop.jpg`](capturas/competidores/nestle-klim/el-rodeo-empaque-1-desktop.jpg) (desktop): Visor de empaque El Rodeo, reverso
- [`auditoria/capturas/competidores/nestle-klim/el-rodeo-empaque-2-desktop.jpg`](capturas/competidores/nestle-klim/el-rodeo-empaque-2-desktop.jpg) (desktop): Visor de empaque El Rodeo, tabla nutricional
- [`auditoria/capturas/competidores/nestle-klim/el-rodeo-movil.jpg`](capturas/competidores/nestle-klim/el-rodeo-movil.jpg) (móvil): EL RODEO® en Nestlé Contigo, completa
- [`auditoria/capturas/competidores/nestle-klim/el-rodeo-movil-fold.jpg`](capturas/competidores/nestle-klim/el-rodeo-movil-fold.jpg) (móvil): EL RODEO® en Nestlé Contigo, primer pantallazo

</details>

<details><summary>Alquería (con Freskaleche) (45 capturas)</summary>

- [`auditoria/capturas/competidores/alqueria/home-desktop-fold.jpg`](capturas/competidores/alqueria/home-desktop-fold.jpg) (desktop): Inicio (primer pantallazo)
- [`auditoria/capturas/competidores/alqueria/home-desktop.jpg`](capturas/competidores/alqueria/home-desktop.jpg) (desktop): Inicio (completa, 6429 px)
- [`auditoria/capturas/competidores/alqueria/home-calidad-sostenibilidad-desktop.jpg`](capturas/competidores/alqueria/home-calidad-sostenibilidad-desktop.jpg) (desktop): Inicio: bloque calidad y sostenibilidad
- [`auditoria/capturas/competidores/alqueria/home-marcas-aliadas-desktop.jpg`](capturas/competidores/alqueria/home-marcas-aliadas-desktop.jpg) (desktop): Inicio: marcas aliadas
- [`auditoria/capturas/competidores/alqueria/menu-productos-desktop.jpg`](capturas/competidores/alqueria/menu-productos-desktop.jpg) (desktop): Mega menú Productos
- [`auditoria/capturas/competidores/alqueria/menu-sostenibilidad-desktop.jpg`](capturas/competidores/alqueria/menu-sostenibilidad-desktop.jpg) (desktop): Menú Sostenibilidad
- [`auditoria/capturas/competidores/alqueria/menu-conocenos-desktop.jpg`](capturas/competidores/alqueria/menu-conocenos-desktop.jpg) (desktop): Menú Conócenos
- [`auditoria/capturas/competidores/alqueria/catalogo-desktop.jpg`](capturas/competidores/alqueria/catalogo-desktop.jpg) (desktop): Catálogo /productos
- [`auditoria/capturas/competidores/alqueria/catalogo-desktop-fold.jpg`](capturas/competidores/alqueria/catalogo-desktop-fold.jpg) (desktop): Catálogo /productos (primer pantallazo)
- [`auditoria/capturas/competidores/alqueria/busqueda-polvo-desktop.jpg`](capturas/competidores/alqueria/busqueda-polvo-desktop.jpg) (desktop): Búsqueda interna 'leche en polvo' (/buscar?q=leche%20en%20polvo)
- [`auditoria/capturas/competidores/alqueria/ficha-desktop.jpg`](capturas/competidores/alqueria/ficha-desktop.jpg) (desktop): Ficha Leche Entera Súper Cremosa (derivado más cercano)
- [`auditoria/capturas/competidores/alqueria/ficha-desktop-fold.jpg`](capturas/competidores/alqueria/ficha-desktop-fold.jpg) (desktop): Ficha (primer pantallazo)
- [`auditoria/capturas/competidores/alqueria/ficha-nutricional-desktop.jpg`](capturas/competidores/alqueria/ficha-nutricional-desktop.jpg) (desktop): Ficha: información nutricional
- [`auditoria/capturas/competidores/alqueria/ficha-donde-comprar-desktop.jpg`](capturas/competidores/alqueria/ficha-donde-comprar-desktop.jpg) (desktop): Ficha: Compra este producto
- [`auditoria/capturas/competidores/alqueria/ficha-comparador-desktop.jpg`](capturas/competidores/alqueria/ficha-comparador-desktop.jpg) (desktop): Ficha: Comparador de leches
- [`auditoria/capturas/competidores/alqueria/nosotros-desktop.jpg`](capturas/competidores/alqueria/nosotros-desktop.jpg) (desktop): Nosotros /conocenos/nosotros
- [`auditoria/capturas/competidores/alqueria/certificaciones-desktop.jpg`](capturas/competidores/alqueria/certificaciones-desktop.jpg) (desktop): Certificaciones de calidad
- [`auditoria/capturas/competidores/alqueria/donde-estamos-desktop.jpg`](capturas/competidores/alqueria/donde-estamos-desktop.jpg) (desktop): Dónde estamos
- [`auditoria/capturas/competidores/alqueria/donde-estamos-plantas-desktop.jpg`](capturas/competidores/alqueria/donde-estamos-plantas-desktop.jpg) (desktop): Dónde estamos: contadores y plantas
- [`auditoria/capturas/competidores/alqueria/contacto-desktop.jpg`](capturas/competidores/alqueria/contacto-desktop.jpg) (desktop): Contacto /contactenos
- [`auditoria/capturas/competidores/alqueria/empresa-b-desktop.jpg`](capturas/competidores/alqueria/empresa-b-desktop.jpg) (desktop): Sostenibilidad: Empresa B
- [`auditoria/capturas/competidores/alqueria/empresa-b-puntaje-desktop.jpg`](capturas/competidores/alqueria/empresa-b-puntaje-desktop.jpg) (desktop): Empresa B: puntaje y línea de tiempo
- [`auditoria/capturas/competidores/alqueria/freskaleche-polvo-desktop.jpg`](capturas/competidores/alqueria/freskaleche-polvo-desktop.jpg) (desktop): Freskaleche: Leche en polvo (ficha del grupo)
- [`auditoria/capturas/competidores/alqueria/freskaleche-polvo-desktop-fold.jpg`](capturas/competidores/alqueria/freskaleche-polvo-desktop-fold.jpg) (desktop): Freskaleche: Leche en polvo (primer pantallazo)
- [`auditoria/capturas/competidores/alqueria/freskaleche-polvo-beneficios-desktop.jpg`](capturas/competidores/alqueria/freskaleche-polvo-beneficios-desktop.jpg) (desktop): Freskaleche: beneficios leche en polvo
- [`auditoria/capturas/competidores/alqueria/freskaleche-polvo-nutricional-desktop.jpg`](capturas/competidores/alqueria/freskaleche-polvo-nutricional-desktop.jpg) (desktop): Freskaleche: tabla nutricional leche en polvo
- [`auditoria/capturas/competidores/alqueria/freskaleche-distribuidores-desktop.jpg`](capturas/competidores/alqueria/freskaleche-distribuidores-desktop.jpg) (desktop): Freskaleche: formulario distribuidor/PQRS y footer
- [`auditoria/capturas/competidores/alqueria/freskaleche-home-desktop.jpg`](capturas/competidores/alqueria/freskaleche-home-desktop.jpg) (desktop): Freskaleche: inicio (completa, 8433 px)
- [`auditoria/capturas/competidores/alqueria/freskaleche-home-desktop-fold.jpg`](capturas/competidores/alqueria/freskaleche-home-desktop-fold.jpg) (desktop): Freskaleche: inicio (primer pantallazo)
- [`auditoria/capturas/competidores/alqueria/freskaleche-sostenibilidad-desktop.jpg`](capturas/competidores/alqueria/freskaleche-sostenibilidad-desktop.jpg) (desktop): Freskaleche: sostenibilidad (recortada a 9000 de 10241 px)
- [`auditoria/capturas/competidores/alqueria/home-movil-fold.jpg`](capturas/competidores/alqueria/home-movil-fold.jpg) (móvil): Inicio (primer pantallazo)
- [`auditoria/capturas/competidores/alqueria/home-movil.jpg`](capturas/competidores/alqueria/home-movil.jpg) (móvil): Inicio (completa, 7942 px)
- [`auditoria/capturas/competidores/alqueria/home-movil-error-intermitente.jpg`](capturas/competidores/alqueria/home-movil-error-intermitente.jpg) (móvil): Inicio (fallo intermitente)
- [`auditoria/capturas/competidores/alqueria/menu-movil.jpg`](capturas/competidores/alqueria/menu-movil.jpg) (móvil): Menú móvil abierto
- [`auditoria/capturas/competidores/alqueria/menu-movil-submenu.jpg`](capturas/competidores/alqueria/menu-movil-submenu.jpg) (móvil): Menú móvil: submenú Productos
- [`auditoria/capturas/competidores/alqueria/catalogo-movil.jpg`](capturas/competidores/alqueria/catalogo-movil.jpg) (móvil): Catálogo /productos
- [`auditoria/capturas/competidores/alqueria/catalogo-movil-fold.jpg`](capturas/competidores/alqueria/catalogo-movil-fold.jpg) (móvil): Catálogo (primer pantallazo)
- [`auditoria/capturas/competidores/alqueria/ficha-movil.jpg`](capturas/competidores/alqueria/ficha-movil.jpg) (móvil): Ficha Leche Entera Súper Cremosa
- [`auditoria/capturas/competidores/alqueria/ficha-movil-fold.jpg`](capturas/competidores/alqueria/ficha-movil-fold.jpg) (móvil): Ficha (primer pantallazo)
- [`auditoria/capturas/competidores/alqueria/nosotros-movil.jpg`](capturas/competidores/alqueria/nosotros-movil.jpg) (móvil): Nosotros (recortada a 9000 de 9638 px)
- [`auditoria/capturas/competidores/alqueria/certificaciones-movil.jpg`](capturas/competidores/alqueria/certificaciones-movil.jpg) (móvil): Certificaciones de calidad
- [`auditoria/capturas/competidores/alqueria/donde-estamos-movil.jpg`](capturas/competidores/alqueria/donde-estamos-movil.jpg) (móvil): Dónde estamos
- [`auditoria/capturas/competidores/alqueria/contacto-movil.jpg`](capturas/competidores/alqueria/contacto-movil.jpg) (móvil): Contacto
- [`auditoria/capturas/competidores/alqueria/freskaleche-polvo-movil.jpg`](capturas/competidores/alqueria/freskaleche-polvo-movil.jpg) (móvil): Freskaleche: Leche en polvo
- [`auditoria/capturas/competidores/alqueria/freskaleche-polvo-movil-fold.jpg`](capturas/competidores/alqueria/freskaleche-polvo-movil-fold.jpg) (móvil): Freskaleche: Leche en polvo (primer pantallazo)

</details>

<details><summary>Alpina (45 capturas)</summary>

- [`auditoria/capturas/competidores/alpina/home-desktop.jpg`](capturas/competidores/alpina/home-desktop.jpg) (desktop): https://alpina.com/
- [`auditoria/capturas/competidores/alpina/home-desktop-fold.jpg`](capturas/competidores/alpina/home-desktop-fold.jpg) (desktop): https://alpina.com/
- [`auditoria/capturas/competidores/alpina/home-desktop-fold-aviso-cookies.jpg`](capturas/competidores/alpina/home-desktop-fold-aviso-cookies.jpg) (desktop): https://alpina.com/
- [`auditoria/capturas/competidores/alpina/menu-productos-desktop.jpg`](capturas/competidores/alpina/menu-productos-desktop.jpg) (desktop): https://alpina.com/
- [`auditoria/capturas/competidores/alpina/megamenu-portafolio-desktop.jpg`](capturas/competidores/alpina/megamenu-portafolio-desktop.jpg) (desktop): https://alpina.com/
- [`auditoria/capturas/competidores/alpina/buscador-desktop.jpg`](capturas/competidores/alpina/buscador-desktop.jpg) (desktop): https://alpina.com/
- [`auditoria/capturas/competidores/alpina/home-movil.jpg`](capturas/competidores/alpina/home-movil.jpg) (móvil): https://alpina.com/
- [`auditoria/capturas/competidores/alpina/home-movil-fold.jpg`](capturas/competidores/alpina/home-movil-fold.jpg) (móvil): https://alpina.com/
- [`auditoria/capturas/competidores/alpina/menu-movil.jpg`](capturas/competidores/alpina/menu-movil.jpg) (móvil): https://alpina.com/
- [`auditoria/capturas/competidores/alpina/menu-movil-productos.jpg`](capturas/competidores/alpina/menu-movil-productos.jpg) (móvil): https://alpina.com/
- [`auditoria/capturas/competidores/alpina/menu-movil-portafolio.jpg`](capturas/competidores/alpina/menu-movil-portafolio.jpg) (móvil): https://alpina.com/
- [`auditoria/capturas/competidores/alpina/catalogo-desktop.jpg`](capturas/competidores/alpina/catalogo-desktop.jpg) (desktop): https://alpina.com/leches
- [`auditoria/capturas/competidores/alpina/catalogo-desktop-fold.jpg`](capturas/competidores/alpina/catalogo-desktop-fold.jpg) (desktop): https://alpina.com/leches
- [`auditoria/capturas/competidores/alpina/catalogo-movil.jpg`](capturas/competidores/alpina/catalogo-movil.jpg) (móvil): https://alpina.com/leches
- [`auditoria/capturas/competidores/alpina/catalogo-movil-fold.jpg`](capturas/competidores/alpina/catalogo-movil-fold.jpg) (móvil): https://alpina.com/leches
- [`auditoria/capturas/competidores/alpina/ficha-desktop.jpg`](capturas/competidores/alpina/ficha-desktop.jpg) (desktop): https://alpina.com/alimento-en-polvo-nutrimax-etapa-3-800-g
- [`auditoria/capturas/competidores/alpina/ficha-desktop-fold.jpg`](capturas/competidores/alpina/ficha-desktop-fold.jpg) (desktop): https://alpina.com/alimento-en-polvo-nutrimax-etapa-3-800-g
- [`auditoria/capturas/competidores/alpina/ficha-tabla-nutricional-desktop.jpg`](capturas/competidores/alpina/ficha-tabla-nutricional-desktop.jpg) (desktop): https://alpina.com/alimento-en-polvo-nutrimax-etapa-3-800-g
- [`auditoria/capturas/competidores/alpina/ficha-tabla-nutricional-zoom-desktop.jpg`](capturas/competidores/alpina/ficha-tabla-nutricional-zoom-desktop.jpg) (desktop): https://alpina.com/alimento-en-polvo-nutrimax-etapa-3-800-g
- [`auditoria/capturas/competidores/alpina/ficha-movil.jpg`](capturas/competidores/alpina/ficha-movil.jpg) (móvil): https://alpina.com/alimento-en-polvo-nutrimax-etapa-3-800-g
- [`auditoria/capturas/competidores/alpina/ficha-movil-fold.jpg`](capturas/competidores/alpina/ficha-movil-fold.jpg) (móvil): https://alpina.com/alimento-en-polvo-nutrimax-etapa-3-800-g
- [`auditoria/capturas/competidores/alpina/nosotros-desktop.jpg`](capturas/competidores/alpina/nosotros-desktop.jpg) (desktop): https://alpina.com/nuestra-historia
- [`auditoria/capturas/competidores/alpina/nosotros-desktop-fold.jpg`](capturas/competidores/alpina/nosotros-desktop-fold.jpg) (desktop): https://alpina.com/nuestra-historia
- [`auditoria/capturas/competidores/alpina/nosotros-movil.jpg`](capturas/competidores/alpina/nosotros-movil.jpg) (móvil): https://alpina.com/nuestra-historia
- [`auditoria/capturas/competidores/alpina/nosotros-movil-fold.jpg`](capturas/competidores/alpina/nosotros-movil-fold.jpg) (móvil): https://alpina.com/nuestra-historia
- [`auditoria/capturas/competidores/alpina/sostenibilidad-desktop.jpg`](capturas/competidores/alpina/sostenibilidad-desktop.jpg) (desktop): https://alpina.com/sostenibilidad/informes
- [`auditoria/capturas/competidores/alpina/sostenibilidad-desktop-fold.jpg`](capturas/competidores/alpina/sostenibilidad-desktop-fold.jpg) (desktop): https://alpina.com/sostenibilidad/informes
- [`auditoria/capturas/competidores/alpina/sostenibilidad-sellos-desktop.jpg`](capturas/competidores/alpina/sostenibilidad-sellos-desktop.jpg) (desktop): https://alpina.com/sostenibilidad/informes
- [`auditoria/capturas/competidores/alpina/sostenibilidad-movil.jpg`](capturas/competidores/alpina/sostenibilidad-movil.jpg) (móvil): https://alpina.com/sostenibilidad/informes
- [`auditoria/capturas/competidores/alpina/sostenibilidad-movil-fold.jpg`](capturas/competidores/alpina/sostenibilidad-movil-fold.jpg) (móvil): https://alpina.com/sostenibilidad/informes
- [`auditoria/capturas/competidores/alpina/calidad-politica-pdf.jpg`](capturas/competidores/alpina/calidad-politica-pdf.jpg) (desktop): https://azstachubdigitalprd01.blob.core.windows.net/hubdigitalcontainer01/TerminosyCondicionesAlpina/tyc_2023/octubre/nueva-pol%C3%ADtica-de-calidad-agosto-2023.pdf
- [`auditoria/capturas/competidores/alpina/contacto-desktop.jpg`](capturas/competidores/alpina/contacto-desktop.jpg) (desktop): https://alpina.com/alpina-contactenos-1
- [`auditoria/capturas/competidores/alpina/contacto-desktop-fold.jpg`](capturas/competidores/alpina/contacto-desktop-fold.jpg) (desktop): https://alpina.com/alpina-contactenos-1
- [`auditoria/capturas/competidores/alpina/contacto-movil.jpg`](capturas/competidores/alpina/contacto-movil.jpg) (móvil): https://alpina.com/alpina-contactenos-1
- [`auditoria/capturas/competidores/alpina/contacto-movil-fold.jpg`](capturas/competidores/alpina/contacto-movil-fold.jpg) (móvil): https://alpina.com/alpina-contactenos-1
- [`auditoria/capturas/competidores/alpina/distribuidores-desktop.jpg`](capturas/competidores/alpina/distribuidores-desktop.jpg) (desktop): https://alpina.com/canales-de-distribucion
- [`auditoria/capturas/competidores/alpina/distribuidores-desktop-fold.jpg`](capturas/competidores/alpina/distribuidores-desktop-fold.jpg) (desktop): https://alpina.com/canales-de-distribucion
- [`auditoria/capturas/competidores/alpina/distribuidores-movil.jpg`](capturas/competidores/alpina/distribuidores-movil.jpg) (móvil): https://alpina.com/canales-de-distribucion
- [`auditoria/capturas/competidores/alpina/distribuidores-movil-fold.jpg`](capturas/competidores/alpina/distribuidores-movil-fold.jpg) (móvil): https://alpina.com/canales-de-distribucion
- [`auditoria/capturas/competidores/alpina/puntos-venta-desktop.jpg`](capturas/competidores/alpina/puntos-venta-desktop.jpg) (desktop): https://alpina.com/tiendas-alpina/alpina-market
- [`auditoria/capturas/competidores/alpina/puntos-venta-desktop-fold.jpg`](capturas/competidores/alpina/puntos-venta-desktop-fold.jpg) (desktop): https://alpina.com/tiendas-alpina/alpina-market
- [`auditoria/capturas/competidores/alpina/puntos-venta-movil.jpg`](capturas/competidores/alpina/puntos-venta-movil.jpg) (móvil): https://alpina.com/tiendas-alpina/alpina-market
- [`auditoria/capturas/competidores/alpina/puntos-venta-movil-fold.jpg`](capturas/competidores/alpina/puntos-venta-movil-fold.jpg) (móvil): https://alpina.com/tiendas-alpina/alpina-market
- [`auditoria/capturas/competidores/alpina/proveedores-desktop.jpg`](capturas/competidores/alpina/proveedores-desktop.jpg) (desktop): https://alpina.com/corporativo/aliados/proveedores
- [`auditoria/capturas/competidores/alpina/proveedores-desktop-fold.jpg`](capturas/competidores/alpina/proveedores-desktop-fold.jpg) (desktop): https://alpina.com/corporativo/aliados/proveedores

</details>

Colanta (bloqueado): [`auditoria/capturas/competidores/colanta/bloqueo-cloudflare-desktop.jpg`](capturas/competidores/colanta/bloqueo-cloudflare-desktop.jpg)

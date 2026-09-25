# Portafolio real y datos corporativos de Mundilácteos

Consulta: 25 de septiembre de 2026. Investigación pasiva de fuentes públicas: no se enviaron formularios, no se crearon cuentas y no se hicieron compras.
Datos estructurados: `auditoria/datos/catalogo.json`. Respuestas crudas: `auditoria/datos/catalogo-fuentes/`. Capturas: `auditoria/capturas/catalogo/`.

Niveles de confianza:
- **Confirmado**: visto en una fuente primaria (registro INVIMA, API de una tienda, foto del empaque).
- **Probable**: indicio fuerte en una sola fuente.
- **No verificado**: declarado o registrado, sin evidencia de que se venda.

## Resumen

- El sitio muestra **3 productos en 6 tarjetas**: The Cántaro entera, The Cántaro "azucarada" y La Becerrita entera, cada uno en bolsa y en bulto.
- El INVIMA registra **5 registros sanitarios vigentes a nombre de Mundilácteos** y **5 más en los que figura como fabricante** para Shadday Soluciones S.A.S., una empresa relacionada.
- El registro principal, RSA-006359-2018, cubre 5 variedades de leche en polvo, 13 presentaciones (de 27 g a 25 kg) y **17 marcas autorizadas**. La mayoría son marcas propias de cadenas, es decir, maquila.
- En tiendas en línea hay **8 EAN distintos de The Cántaro**: 3 disponibles hoy (Carulla y Megatiendas) y 5 publicados en Éxito y Carulla pero no disponibles en el canal por defecto. Entre ellos hay una **leche descremada que no aparece en el sitio** y un **empaque nuevo ("Nueva imagen", 2025)** que el sitio tampoco muestra.
- **Dos mezclas lácteas aparecen en el sitio como "leche en polvo".** Los empaques fotografiados dicen "Mezcla en polvo a base de leche y endulzante" y tienen su propio registro (RSA-003008-2017).
- No hay evidencia pública de La Becerrita en tiendas en línea, ni de los productos registrados en 2025: alimento lácteo en polvo y mezcla con café y panela.
- "Decenas de SKU" es posible si se suman los gramajes autorizados, la maquila y las marcas de terceros. Con evidencia de mercado solo se pueden afirmar los 8 EAN de The Cántaro. **No se inventaron SKU.**

## Productos encontrados

| ID | Marca | Producto | Tipo | Presentaciones (EAN) | Registro | En el sitio | Confianza |
|---|---|---|---|---|---|---|---|
| P01 | The Cántaro | Leche en polvo entera adicionada con hierro, empaque "Nueva imagen" | leche entera fortificada | 380 g (7707285613583), rinde 3 L; 900 g (7707285613439), rinde 7 L | RSA-006359-2018 (variedad) | No | Confirmado |
| P02 | The Cántaro | La misma leche, empaque anterior con sello "Milk Mait" | leche entera fortificada | 380 g (7707285610230); 500 g (solo foto del sitio); 900 g (7707285610247) | RSA-006359-2018 | Sí, sin mencionar el hierro | Confirmado; probablemente descontinuado |
| P03 | The Cántaro | Leche en polvo azucarada, sello "Exceso en azúcares" | leche azucarada | 380 g, empaque anterior (7707285611480); 380 g, "Nueva imagen" (7707285611619, a confirmar); 400, 500 y 900 g solo en el texto del sitio | RSA-006359-2018 | Sí, pero con la foto de una mezcla | Confirmado (380 g); no verificado (el resto) |
| P04 | The Cántaro | Leche en polvo descremada 0 % grasa | leche descremada | 380 g, empaque anterior (7707285613545); 380 g, "Nueva imagen" (7707285612494) | RSA-006359-2018 | **No** | Confirmado |
| P05 | The Cántaro | Leche en polvo entera en bulto (saco kraft) | leche entera | 25 kg (foto); 5 y 12,5 kg solo en el texto | RSA-006359-2018 (leído en el saco) | Sí | Confirmado (25 kg) |
| P06 | The Cántaro | Mezcla en polvo a base de leche y endulzante para preparar bebidas | mezcla láctea | 900 g (bolsa); 12,5 kg (bulto) | RSA-003008-2017 | Sí, **rotulada como "leche azucarada"** | Confirmado (empaque y registro) |
| P07 | La Becerrita | Leche en polvo entera "Fresca y natural" | leche entera | 900 g (foto); 380, 400 y 500 g solo en el texto | RSA-006359-2018 (marca autorizada) | Sí | Probable (900 g) |
| P08 | La Becerrita | Mezcla en polvo a base de leche y endulzante para preparar bebida | mezcla láctea | 25 kg | RSA-003008-2017 (lectura parcial del saco) | Sí, **rotulada como "leche entera"** | Confirmado (empaque) |
| P09 | Olímpica (marca propia) | Leche en polvo entera y entera azucarada | maquila | 900 g y 380 g (fotos de 2022) | RSA-006359-2018 (marca autorizada) | No, solo en la biblioteca de medios | Probable en 2022; no verificado hoy |
| P10 | Medalla de Oro (Olímpica) | Leche en polvo entera | maquila | 900 g (foto de 2022) | RSA-006359-2018 (marca autorizada) | No, solo en la biblioteca de medios | Probable en 2022; no verificado hoy |
| P11 | Sin identificar | Alimento lácteo en polvo | otros | Sin datos | RSA-0036572-2025 | No | No verificado |
| P12 | Sin identificar | Mezcla láctea con café instantáneo y panela (4 variedades) | mezcla láctea | Sin datos | RSA-0037312-2025 | No | No verificado |
| P13 | Sin identificar | Leche en polvo entera y descremada, reempaque | leche entera y descremada | Sin datos | RSA-0027065-2023 (empacar y vender) | No | No verificado |
| P14 | Sin identificar | Leche en polvo entera adicionada con vitaminas A y D | leche entera fortificada | Sin datos | RSA-006359-2018 (variedad) | No | No verificado |

Precios observados el 25 de septiembre de 2026:

| Producto | Tienda | Precio |
|---|---|---|
| Entera 380 g | Megatiendas | $11.190 |
| Entera 380 g | Carulla | $10.100 |
| Entera 900 g | Megatiendas | $26.550 |
| Descremada 380 g "Nueva imagen" | Carulla (Compra y recoge) | $9.370 |

Éxito publica las 8 fichas, todas no disponibles en el canal por defecto. Olímpica tiene 0 productos en su página de marca, y la ficha "LECHE POLV THE CANTARO ENT ADICION 900g" responde "Page not found". En Rappi existe la ficha maestra "The Cantaro Leche en Polvo Entera", agotada en Bogotá, la ubicación por defecto.

No se halló ninguna ficha de La Becerrita. Se consultaron las API de Éxito, Carulla, Megatiendas, Olímpica y Jumbo, además de Rappi.

### Unidades por paca publicadas

Los valores son genéricos por gramaje; no están confirmados por marca.

| Gramaje | Unidades por paca |
|---|---|
| 27 g | 300 |
| 104 g | 100 |
| 200 g | 60 |
| 380 g | 30 |
| 400 g | 30 |
| 500 g | 24 |
| 750 g | 15 |
| 800 g | 12 |
| 900 g | 12 |
| 1000 g | 12 |

Fuentes: la sección "Embalaje" de `/productos/`, donde dice "12 unidades para bolsa de 100gr" en vez de 1000 g, y la consulta INVIMA publicada en Scribd. Esa consulta indica una caja de cartón corrugado de 49 x 22 x 34 cm y que el bulto de 25 kg no lleva segundo embalaje.

## Marcas autorizadas en el registro RSA-006359-2018

| Periodo | Marcas | Fuente |
|---|---|---|
| Concesión, agosto de 2018 | The Cántaro, La Becerrita, La Caribeña | Resolución 2020042829 en Scribd (texto decodificado en `catalogo-fuentes/`) |
| 8 de noviembre de 2018 | Mamamu | Ídem |
| 18 de enero de 2019 | Alkosto, Zapatoca, Los Ibáñez, Aro, Rosalinda | Ídem |
| 24 de septiembre de 2019 | Latti, Lucerito, Productos Castillo Todo un Imperio | Ídem |
| Consulta INVIMA (vencimiento mostrado: 2023/08/27) | Además: Medalla de Oro, Olímpica, Mua, Mercacentro, Unidos | https://www.scribd.com/document/630483993 |

La lista vigente después de la renovación del 24 de mayo de 2023 no se pudo consultar. **No se deben publicar marcas de cadenas sin autorización del cliente y de cada cadena.**

## Registros sanitarios (datos.gov.co, dataset ui32-p9f2, actualizado el 16 de septiembre de 2026)

| Registro | Producto (texto INVIMA, resumido) | Titular | Rol de Mundilácteos | Vence |
|---|---|---|---|---|
| RSA-006359-2018 | Leche en polvo: entera; entera con vitaminas A y D; descremada; entera con hierro; entera azucarada | Mundilácteos | Fabricante | 2028-05-24 |
| RSA-003008-2017 | Mezclas en polvo a base de leche y endulzantes para preparar bebidas | Mundilácteos | Fabricante | 2031-09-11 |
| RSA-0027065-2023 | Leche en polvo entera y descremada | Mundilácteos | Empacador | 2028-08-11 |
| RSA-0036572-2025 | Alimento lácteo en polvo | Mundilácteos | Fabricante | 2030-05-09 |
| RSA-0037312-2025 | Mezcla láctea en polvo con café instantáneo y panela (4 variedades) | Mundilácteos | Fabricante | 2030-07-18 |
| RSA-0018770-2022 | Leche UHT: entera, descremada y deslactosadas | Shadday Soluciones | Fabricante | 2027-04-26 |
| RSA-0018470-2022 | Quesos frescos: mozzarella, doble crema, costeño, campesino y crema | Shadday Soluciones | Fabricante | 2027-04-11 |
| RSA-0018845-2022 | Mantequilla con y sin sal, fantasía "La Becerrita" | Shadday Soluciones | Fabricante | 2027-05-04 |
| RSA-0018847-2022 | Suero costeño tradicional y picante | Shadday Soluciones | Fabricante | 2027-05-04 |
| RSA-0018873-2022 | Yogurt entero con dulce, 17 variedades (fantasía: Golosito, Cantagurt) | Shadday Soluciones | Fabricante | 2027-05-05 |

**Empresa relacionada: Shadday Soluciones S.A.S.**
- NIT 901450026.
- Tiene el mismo representante legal que Mundilácteos, José Ricardo Sepúlveda García.
- Está en Europark, Bodega 16, con la línea "Quesos frescos".
- Es titular, además, de dos registros de bebida láctea fermentada y uno de leche saborizada UHT.

No se halló comercialización pública de estos productos. LinkedIn de Mundilácteos lista "Quesos, Yogurt" entre sus especialidades.

## Datos corporativos

| Dato | Valor | Fuente | Confianza |
|---|---|---|---|
| Razón social | Inversiones Mundilácteos S.A.S. | INVIMA (uhs6-qp53); La República / RUES | Confirmado |
| NIT | 900.514.916-2 | INVIMA sanciones ("900514916-2"); Informa Colombia; consulta INVIMA en Scribd | Confirmado |
| Constitución | 30 de diciembre de 2011, en Cartagena | EMIS; fragmento de buscador de lasempresas.com.co | Probable |
| CIIU | 1040, Elaboración de productos lácteos; también "Comercio al por mayor de productos alimenticios" | La República; fragmento de lasempresas.com.co | Probable |
| Tamaño | Mediana; 49 empleados (2025); ventas 2025 entre 20.000 y 100.000 millones COP | La República, EMIS, Informa | Probable |
| Representante legal | José Ricardo Sepúlveda García | INVIMA, corte del 27 de mayo de 2025 | Confirmado a esa fecha |
| Dirección | Km 1 Vía a Turbaco, Lote 2A-2B, Parque Industrial Europark, R.P.H. Bodega 28, **Turbaco** (Bolívar) | INVIMA, sitio, EMIS | Confirmado |
| Direcciones anteriores | Diagonal 22 No. 30-159, El Prado; Transversal 51 No. 21-36, El Bosque (Cartagena) | Sacos fotografiados; censo ICBF 2018 | Confirmado (históricas) |
| Teléfonos | +57 319 769 0990 (contacto, pie de página y WhatsApp); +57 311 429 3448 (segundo pie del inicio, Informa); (605) 662 6064 y 662 2107 (sacos antiguos) | Sitio, sacos, ICBF 2018 | Se publican; los fijos no están verificados |
| Correo | El sitio no publica ninguno. Los sacos imprimen comercial@mundilacteossas.com, pero **el dominio no resuelve** (NXDOMAIN) | Foto-3.png y consulta DNS | Confirmado |
| Agencia del sitio | Bangboo (bangbooagency.com). El pie dice "Hecho por Bangboo" sin enlace; su portafolio muestra "Content creation and Web design for Mundilacteos" | bangbooagency.com | Confirmado (ubicación en Maringá, Brasil, no verificada) |
| Sitio | Páginas modificadas por última vez el 13 de febrero de 2023; última imagen subida el 24 de enero de 2023; no hay tipo de contenido "producto" | /wp-json/wp/v2/pages, /media y /types | Confirmado |

### Redes sociales

| Red | URL | Estado | Enlazada desde el sitio |
|---|---|---|---|
| Instagram | instagram.com/mundilacteos | Activa: última publicación vista el 12 de febrero de 2026 (The Cántaro adicionada con hierro). Según un buscador, 128 seguidores y 12 publicaciones, sin fecha; el perfil pide iniciar sesión | No |
| TikTok | tiktok.com/@mundilacteos | 4 seguidores, 4 me gusta. Los videos no cargaron. Usa un logo de vaca distinto al del sitio | No |
| LinkedIn | co.linkedin.com/company/inversiones-mundilacteos-sas | 156 seguidores; 8 empleados vinculados; tipo "Asociación"; fundación "2010" | No |
| Facebook | facebook.com/mundilacteos | No determinable: redirige al inicio de sesión | Ícono sin enlace |
| YouTube | youtube.com/@mundilacteos | 404 | Ícono sin enlace |
| X / Twitter | Sin dato | No verificado | Ícono sin enlace |

### Certificaciones

- **ISO 9001:2015**: el sitio la declara sin indicar ente, número, alcance ni vigencia. IAF CertSearch devolvió 0 registros, pero la consulta quedó bajo captcha, así que el resultado no es concluyente. No aparece en ninguna fuente pública. **No verificada.**
- **Concepto sanitario INVIMA: FAVORABLE.** Establecimiento activo No. 24741, línea "Leches en polvo y crema de leches en polvo". Es verificable y se puede publicar.
- **Listas INVIMA de BPM y HACCP:** Mundilácteos no aparece.
- **Antecedente, solo para contexto interno:** multa INVIMA de 500 SMDLV, proceso 201602614, "derivados lácteos", en firme desde el 7 de febrero de 2019.

## Incongruencias entre fuentes

1. **Años de trayectoria:**
   - El inicio del sitio dice "más de 11 años" y "12 años" en la misma página.
   - LinkedIn indica fundación en 2010 y "12 años".
   - Según un buscador, la bio de Instagram dice "10 años".
   - EMIS da como constitución el 30 de diciembre de 2011.
2. **Clientes:** el sitio dice "+869.000"; LinkedIn dice "más de 896.000".
3. **Teléfonos:** el inicio muestra 311 429 3448 y 319 769 0990 en dos pies de página distintos.
4. **Ubicación:**
   - El sitio dice "Cartagena"; INVIMA y los directorios dicen Turbaco.
   - La bodega es la 28 en INVIMA y en el sitio, la 16 en un fragmento del registro mercantil, y "2A-2B" en la resolución INVIMA de 2020.
5. **Tipo de producto:** el sitio llama "leche en polvo" a productos cuyo empaque dice "mezcla en polvo a base de leche y endulzante" (P06 y P08).
6. **Datos en tiendas:** Éxito y Carulla cruzan nombre, URL e imagen de la azucarada y la descremada 380 g con empaque nuevo. El EAN 7707285611619 se llama "descremada" pero su imagen es la azucarada. El EAN 7707285612494 tiene una URL que dice "azucarada" pero su imagen es la descremada.
7. **Medalla de Oro:** Pulzo (2 de junio de 2023) atribuye la leche en polvo Medalla de Oro a Indulino S.A.S. El registro de Mundilácteos también autoriza esa marca, y en su biblioteca de medios hay una foto del empaque. Pueden coexistir varios proveedores.
8. **Unidades por paca:** en el sitio, "100gr" debe ser 1000 g. Además, el sitio lista 800 g en el embalaje, pero no en las presentaciones.
9. **Aliados comerciales:** el sitio muestra a Olímpica, que hoy no publica The Cántaro. Éxito y Carulla sí lo publican y no figuran como aliados.

## Problemas de contenido del catálogo en el sitio actual

- **Portafolio incompleto:** el sitio tiene 3 productos. En el mercado existen además la descremada, el empaque nuevo y la variante con hierro, y en el registro hay 2 productos de 2025 más la maquila.
- **Rotulado erróneo:** dos mezclas aparecen como "leche en polvo". Hay que validarlo con el área de calidad o regulatoria del cliente antes de publicar.
- **Atributos clave omitidos:** hierro, rendimiento en litros, porciones, sello de azúcares, EAN y registro sanitario.
- **Fotos desactualizadas:** son de 2022; hay empaques nuevos de 2025. No hay fotos de pacas ni de reverso.
- **Presentaciones sin respaldo:** se listan gramajes que no aparecen en ninguna fuente externa.
- **Falta de servicios B2B:** no se ofrece maquila ni marca propia, aunque el registro lo respalda. No hay pedido mínimo, cobertura ni fichas técnicas descargables.
- **Sin "Dónde comprar":** no hay enlaces a las tiendas que hoy venden el producto.
- **Productos incrustados en Elementor:** no existe un modelo de datos de producto que permita filtros, fichas ni schema.org.

## Propuesta de taxonomía

**Principio:** separar qué es el producto (denominación del registro INVIMA) de cómo se vende (formato y canal). Un SKU es la combinación de producto, contenido neto y empaque.

**Categorías:**
1. **Leche en polvo:** entera, entera fortificada (hierro o vitaminas A y D), descremada y entera azucarada. Registros RSA-006359-2018 y RSA-0027065-2023.
2. **Mezclas lácteas en polvo para preparar bebidas:** con endulzante, y con café y panela. Registros RSA-003008-2017 y RSA-0037312-2025. Nunca se deben rotular como "leche".
3. **Alimento lácteo en polvo:** registro RSA-0036572-2025.
4. **Refrigerados y derivados (opcional):** solo si el grupo decide incluir los productos de Shadday Soluciones (UHT, quesos, yogurt, mantequilla y suero).
5. **Soluciones para empresas:** venta a granel e industrial (bultos de 5, 12,5 y 25 kg), maquila y marca propia, distribución mayorista por pacas y canal institucional.

**Vistas por público:**

| Público | Qué necesita ver |
|---|---|
| Hogar | Marca, tipo y gramaje, con un botón "Dónde comprar" |
| Tendero o mayorista | Pacas, unidades, pedido mínimo, cobertura y cotización |
| Industria | Bultos, fichas fisicoquímicas y microbiológicas, certificado de análisis por lote |
| Marca propia | Capacidades y gramajes, sin nombrar clientes |

**Filtros:**
- Marca
- Tipo de producto
- Formato: bolsa, paca o bulto
- Contenido neto: hasta 200 g, 380 a 500 g, 750 a 1000 g, 5 kg, 12,5 kg y 25 kg
- Fortificación
- Sello de advertencia
- Uso: hogar, bebidas o industrial
- Tipo de cliente
- Dónde comprar

**Atributos de la ficha técnica:**
- **Identificación:** nombre comercial, denominación legal exacta, marca, referencia interna, EAN-13 de la unidad, GTIN-14 de la paca, registro INVIMA con su vencimiento, y titular, fabricante o empacador.
- **Presentación:** contenido neto, rendimiento en litros, porciones, empaque primario, unidades por paca, dimensiones y peso de la paca, pacas por estiba, y fotos de frente, reverso y paca.
- **Composición y nutrición:** ingredientes, fortificación por porción, alérgenos, tabla nutricional por 100 g y por porción, sellos frontales y modo de preparación. La ficha actual indica 135 g por litro.
- **Calidad:** especificaciones fisicoquímicas (proteína, grasa, humedad, acidez, insolubilidad, cenizas y lactosa) y microbiológicas, normas de referencia, ficha en PDF con versión y fecha, y certificado de análisis por lote a solicitud.
- **Conservación:** vida útil (12 meses según el sitio), almacenamiento y cuidados después de abrir.
- **Comercial B2B:** pedido mínimo, cobertura, tiempos de entrega, condiciones de pago y canal de cotización.
- **SEO:** URL por SKU, schema.org `Product` con `gtin13`, `brand`, `weight` y `offers` (o enlaces a tiendas), y texto alternativo en las imágenes.

## Datos que faltan y deben pedirse al cliente

1. Lista maestra de SKU vigentes: marca, denominación legal, contenido neto, EAN-13, GTIN-14 y estado (activo o descontinuado).
2. EAN correctos de la azucarada y la descremada 380 g con "Nueva imagen".
3. Existencia real de las presentaciones declaradas y no halladas:
   - bolsas de 27, 104, 200, 400, 500, 750, 800 y 1000 g;
   - bultos de 5 y 12,5 kg de leche entera;
   - La Becerrita de 380, 400 y 500 g.
4. Marca, empaque y canal de RSA-0036572-2025, RSA-0037312-2025 y RSA-0027065-2023.
5. Estado de La Caribeña, Mamamu, Latti, Lucerito y las demás marcas autorizadas, y qué se puede publicar.
6. Decisión sobre publicar la maquila y la marca propia como servicio, y cuáles son sus capacidades.
7. Decisión sobre incluir los productos de Shadday Soluciones.
8. Fotos actuales en alta resolución: frente, reverso y paca.
9. Fichas técnicas vigentes con versión y fecha, y tablas nutricionales en el formato de la Resolución 810 de 2021.
10. Certificado ISO 9001:2015 con ente, número, alcance y vigencia. Si no está vigente, hay que retirar la mención.
11. Contacto oficial único: un teléfono, un correo @mundilacteos.com y la dirección con el municipio y la bodega correctos.
12. Año de fundación y cifra de clientes que se van a publicar.
13. URL oficiales de redes sociales.
14. Canales de venta vigentes por ciudad para el módulo "Dónde comprar".

## Fuentes consultadas y bloqueos

**Consultadas con éxito:**
- mundilacteos.com y su API REST de WordPress.
- datos.gov.co: datasets INVIMA ui32-p9f2, uhs6-qp53, rq4n-pzga, jdjx-jx6d, rbvn-xj2w y qu3n-jbd7.
- API públicas VTEX de Éxito, Carulla, Megatiendas, Olímpica y Jumbo.
- Rappi.
- Makro, página de la leche Aro 900 g, que no indica fabricante.
- Scribd, con texto parcial de 4 documentos.
- LinkedIn, TikTok y YouTube.
- La República (RUES), Informa Colombia y EMIS.
- Censo ICBF de plantas de alimentos, Bolívar 2018.
- bangbooagency.com.
- Pulzo e Infobae (no mencionan a Mundilácteos).

**Bloqueadas o sin resultado concluyente** (no se intentó rodear ningún bloqueo):

| Fuente | Resultado |
|---|---|
| Mercado Libre | Pide verificación de cuenta; la API responde 403 |
| Instagram (perfil) | 429 y petición de inicio de sesión |
| Facebook | Petición de inicio de sesión |
| lasempresas.com.co, Veritrade, Datacrédito Empresas y pdfcoffee | 403 |
| einforma, Empresite y Portafolio | 429 |
| Studocu | Verificación anti-bot |
| Fitia | Vercel Security Checkpoint |
| IAF CertSearch | Captcha |
| consultaregistro.invima.gov.co | Redirige a app.invima.gov.co; se usó el dataset abierto |

**No consultadas:** D1, Ara, Isimo, Rapimercar, Mr. Bono, Garosa, X/Twitter y el RUES directo.

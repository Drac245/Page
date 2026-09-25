# Concepto 1: Paralelo 10

Propuesta de nuevo sitio para Inversiones Mundilácteos S.A.S. (Turbaco, Bolívar, área metropolitana de Cartagena). 25 de septiembre de 2026.

- Prototipo navegable: `index.html` (misma carpeta). Tiene 11 páginas principales, 9 fichas de producto, 6 artículos, comparador de presentaciones, página 404 y 2 páginas legales.
- Dirección completa para diseño, desarrollo y contenido: [DIRECCION.md](DIRECCION.md).
- Todo dato marcado con «dato a confirmar» sale de fuentes públicas o del sitio actual. Mundilácteos debe validarlo antes de publicar.

---

## 1. Nombre y enfoque

**Paralelo 10.** La planta de Mundilácteos está en el Parque Industrial Europark, en Turbaco, cerca del paralelo 10 de latitud norte. El sitio toma el activo más reconocible de la marca, el globo de franjas del logo, y lo lleva a escala monumental. Las franjas se leen como paralelos, y por el del medio, el paralelo 10, corre el titular, igual que el nombre cruza el globo en el logo actual.

La idea central es **«De Turbaco, con nombre y registro»**. Mundilácteos se presenta desde un origen que cualquiera puede comprobar: una planta con dirección, personas con cargo y cinco registros INVIMA vigentes con su número a la vista y un botón para verificarlos. Manda el azul. El verde queda para lo que la persona hace (cotizar, agregar) y para lo que se confirma (verificado, agregado).

---

## 2. Moodboard y dirección visual

### 2.1 Referencias visuales

El tablero sale del mundo del propio cliente, sin imágenes de banco.

| Referencia | Qué se toma | Dónde aparece |
|---|---|---|
| El globo de franjas del logo actual | Las franjas como paralelos, los huecos blancos en arco y el brillo del logo | Hero, globo reducido de Nosotros, 404, bordes de todas las bandas |
| Un globo terráqueo visto desde arriba: paralelos que se curvan hacia el centro | El «arco de paralelo», un borde con sagita del 3 %, más bajo en el centro | Bordes superiores e inferiores de bandas, ventanas de foto, paneles |
| La línea del horizonte en la vía a Turbaco | Titulares anchos y pesados que se leen como una banda | H1 en grotesca expandida |
| El documento público: registro sanitario, consulta del INVIMA, datos.gov.co | Números grandes y ligeros, cifras tabulares y una serif de lectura con tono de documento honesto | Banda de registros, Calidad, fichas técnicas |
| Los empaques reales de The Cántaro y La Becerrita, y los sacos de 12,5 y 25 kg | Producto recortado que rompe el borde de su franja, con sombra de contacto | Hero, vitrinas, ficha, escenas de marca |
| La planta en Europark y su gente | Fotografía documental, horizontal, a la altura de los ojos | Planta y gente, Nosotros, Contacto |

**Buenas prácticas del sector que se toman sin copiar su forma:** el relato de origen caribeño con personas reales; páginas de certificaciones con datos; la tabla nutricional en HTML y las preguntas por producto; los enlaces a la ficha exacta en cada cadena; el comparador de presentaciones, y la separación entre marcas propias y maquila. En cada caso se cambia la forma: registros con número y botón de verificación, cobertura por tiempo de entrega en lugar de mapa y proceso en HTML en lugar de imágenes.

**Queda fuera:** vacas, potreros, salpicaduras, vasos rebosantes, murallas, balcones, postales de Cartagena, fondos crema, vidrio esmerilado y degradados decorativos.

### 2.2 Colores

Todos salen de la paleta de marca (`compartido/MARCA.md`). El prototipo usa 12 de sus 14 colores. Verde tenue y Verde tinte pertenecen al reparto del otro concepto. Las sombras y brillos son Azul noche, Azul cielo o Bruma azul con transparencia, no colores nuevos. Los tokens se declaran en hex y se redefinen en OKLCH cuando el navegador lo admite.

| Color | Hex | Rol en «Paralelo 10» | Presencia |
|---|---|---|---|
| Blanco | `#FFFFFF` | Superficie principal, paralelo 10 (franja del titular), huecos del globo | 52 % |
| Azul Mundilácteos | `#0A2F8F` | **El color que manda:** titulares, franjas del globo, bandas de Planta, cierre y encabezados de Productos, Marca propia y Dónde comprar, chip elegido, botón secundario | 16 % |
| Bruma azul | `#EEF4FB` | Franjas bajo los packshots, filtros, filas alternas, «Su lista», marcos de las tomas por producir | 14 % |
| Azul noche | `#0B1F4F` | Texto principal, banda de registros, pie, menú móvil, sombras de contacto | 12 % |
| Verde hoja | `#2D7A12` | **Acción:** botón primario con texto blanco (5,38:1), estado «Agregado», verificado sobre claro. Sobre bandas azules lleva un anillo blanco de 2 px | 2 % |
| Verde bosque | `#236310` | Hover y presionado del botón primario (entra como franja en arco) | puntual |
| Azul cielo | `#1090E0` | Brillo radial detrás de los packshots, tramo de ruta en los Anillos, destello sobre oscuro. Nunca texto | 1 % |
| Verde Mundilácteos | `#4AA603` | Cuerpo del globo del logo y verificado sobre Azul noche (5,10:1). Nunca texto sobre claro | 1 % |
| Cielo profundo | `#0B6FB8` | Enlaces dentro del texto, siempre subrayados (5,28:1) | texto |
| Pizarra | `#4A5877` | Texto secundario, denominaciones, bordes de campos (7,11:1) | texto |
| Amarillo Becerrita | `#EAC55E` | Solo en La Becerrita: filete de 4 px sobre su franja | puntual |
| Rojo error | `#B42318` | Solo mensajes de error, siempre con icono y texto | puntual |

**Ritmo de la portada:** Blanco (globo) → Blanco con franjas Bruma (vitrina de marcas) → Azul noche (registros) → Blanco (Cómo leer una bolsa) → Azul Mundilácteos (Planta y gente) → Blanco (Anillos) → Bruma (Tres formas de comprar) → Blanco (guías) → Azul Mundilácteos (cierre) → hueco blanco → Azul noche (pie). Nunca hay dos azules seguidos sin un hueco blanco, igual que en el globo.

**Foco visible:** contorno de 3 px en Azul noche con 2 px de separación sobre claro; blanco sobre las bandas azules.

### 2.3 Tipografía

Dos familias con papeles separados, las dos con licencia OFL:

- **Encode Sans** (Impallari Type, fundición latinoamericana), variable en ancho y peso: titulares, interfaz y cifras. El ancho 125, el más expandido, se reserva para los H1 y las cifras de registro. Todo lo demás va en ancho 100 o 112.
- **Source Serif 4**: texto de lectura, en dos cortes. Da la voz de documento serio para contar el origen y explicar la calidad. Nunca se usa en titulares.

Medidas tomadas en el prototipo (Chromium):

| Rol | Escritorio (1.440 px) | Móvil (390 px) | Ancho y peso |
|---|---|---|---|
| H1 del hero | 85 px, 2 líneas que cruzan el globo | 40,6 px, 3 líneas | ancho 125 (móvil 112), peso 800, interlineado 0,95 |
| H1 interior | 72 px | 36,5 px | ancho 125 (móvil 112), peso 800 |
| H1 de la ficha | 64 px | 36,5 px | ancho 112, peso 800 |
| Cifra de registro («RSA-006359-2018») | 66 px | 36 px | ancho 125, **peso 300**, cifras tabulares |
| Cifra del teléfono en Contacto | 96 px | 44 px | peso 300 |
| H2 | 56 px | 32 px | ancho 112, peso 750 |
| Entradilla | 21 a 24 px, serif | 19 px | peso 400 |
| Cuerpo | 18/29 px, serif | 17/27 px | peso 400 |
| Datos | 16 px, cifras tabulares | 16 px | peso 500 |

**Gesto tipográfico:** el contraste entre el titular negro y expandido y las cifras de registro finas y enormes. En la portada solo hay dos gestos: el H1 que cruza el globo y los cinco números de registro. Reglas: tipo oración, todo alineado a la izquierda, sin mayúsculas sostenidas, coma decimal y espacio fino antes de la unidad (12,5 kg; 900 g).

### 2.4 Formas de marca y profundidad

Todas salen del globo del logo:

- **Arco de paralelo:** bordes de banda con sagita del 3 %, más bajos en el centro, como paralelos vistos desde arriba.
- **Hueco:** entre dos bandas azules siempre hay un hueco blanco en arco.
- **Franja:** cada packshot se para sobre una franja Bruma azul con borde en arco. Las fotos van en «ventanas de franja», recortadas por dos arcos paralelos.
- **Destello:** arco corto con remates redondos, tomado del brillo del logo. Marca el enlace activo del menú y crece bajo los enlaces al pasar el cursor.
- **Profundidad por capas:** fondo y bandas atrás, brillo radial de Azul cielo y sombra de contacto en medio, packshots que rompen el borde de su franja y texto siempre adelante, sobre liso. Nunca hay texto sobre foto.

### 2.5 Movimiento

Personalidad: **fluida y horizontal, «envolver y asentar».** Todo se mueve como las franjas de un globo que gira: desplazamientos laterales o en arco que frenan con decisión, sin rebote.

| Momento | Qué pasa | Duración |
|---|---|---|
| Carga del hero (una vez por sesión) | Las franjas del globo entran alternando derecha e izquierda. El titular entra por su paralelo desde la izquierda y, en escritorio, se abre de ancho 112 a 125. Los empaques suben desde la franja 3, el destello recorre la franja 4 y bajada, botones y credencial suben 12 px | 900 ms en total |
| Cambio de página | La vista nueva se revela desde abajo con un borde en arco, «el horizonte que sube»; la saliente baja su opacidad. La cabecera queda quieta | 450 ms |
| Del catálogo a la ficha | El packshot viaja de la vitrina a la ficha como elemento compartido y el nombre entra con un recorte de izquierda a derecha | 400 y 300 ms |
| Filtros | Las vitrinas se reordenan; las que salen se desvanecen escalando a 0,96. Las seis primeras se asientan al entrar | 300 ms |
| Agregar a la cotización | Una miniatura del empaque vuela en arco hasta «Cotizar» (técnica FLIP), la cifra rueda y un aviso ofrece «Deshacer». El cambio se anuncia a los lectores de pantalla | 520 ms |
| Cursor o foco sobre una vitrina | El empaque sube 8 px y gira −3°, y su sombra se abre. La vitrina no se mueve | 220 ms |
| Botones y enlaces | Franja Verde bosque que entra en arco; presión a escala 0,97; el destello crece bajo el enlace | 100 a 180 ms |
| Chips de presentación | Se dibuja la marca de verificado y los datos cambian con fundido cruzado | 140 y 160 ms |
| Cómo leer una bolsa y Anillos | El esquema se acerca a la zona elegida; el tramo desde Turbaco se dibuja hasta la ciudad | 360 y 500 ms |
| Menú móvil y panel de cotización | La hoja baja con borde en arco y los destinos se escalonan; el panel entra desde la derecha (en móvil, desde abajo) | 320 y 260 ms |
| Scroll (solo si el navegador lo soporta) | El arco superior de las bandas se aplana al entrar; los empaques derivan de 12 a 24 px a otra velocidad que su franja. Nada se oculta | ligado al scroll |

Salvaguardas: solo se animan `transform`, `opacity`, `clip-path`, máscaras y el ancho de la fuente. Con «reducir movimiento» no hay carga orquestada, transiciones de página, vuelos ni efectos de scroll, y el contenido está siempre visible. Las funciones nuevas se activan solo con soporte. Sin librerías de animación.

### 2.6 Fotografía

Documental con orden: el lugar, las personas y el producto, en tomas horizontales que conviven con las franjas. Luz natural de 5.000 a 5.500 K, color neutro, sin viñeta ni grano, horizonte nivelado y nunca texto sobre foto. Queda prohibido el material de banco, las personas generadas con IA y las vacas.

**Qué usa hoy el prototipo:**

- 11 recortes de empaques reales (bolsas y bultos de The Cántaro y La Becerrita), con sombra de contacto. Son los empaques de 2022, rotulados como provisionales.
- La foto real de los tres sacos juntos, en la franja 2 del globo.
- Las fotos reales del equipo, en Planta y gente y en Nosotros, rotuladas como provisionales porque son de un evento.
- Solo en Marca propia, tres bolsas de marcas propias con el aviso «se muestran con autorización del cliente».

**Variante de lanzamiento del hero.** Mientras no exista la sesión de fotos, el globo usa franjas lisas de marca: la 2 con los sacos reales y la 3 con dos empaques en un brillo radial Azul cielo. Cada franja pasa a foto por separado, a medida que llegan las tomas.

**Tomas por producir.** Mientras no existen, se muestran como una «ventana» de dirección fotográfica: fondo Bruma azul con borde en arco, código de la toma, croquis del encuadre y pie de foto. Hay una por sección como máximo y nunca domina la sección. En el prototipo aparecen E01, E02, P01–P04, P06, R01–R04, R04, R06 y C03.

| ID | Toma | Formato | Uso |
|---|---|---|---|
| H01 | Fachada de la planta en Europark con la señal del parque, luz de mañana | 5:1 | Franja 1 del globo |
| H02 | El equipo en una fila frente a la línea de empaque, a la altura de los ojos | 5:1 | Franja 2 del globo |
| H03 | Pacas y bultos en estiba, o bolsas en la banda transportadora | 5:1 | Franja 3 del globo |
| P01 | Línea de empaque con operarias de cofia y guantes | 3:2 y 3:1 | Planta y gente, Calidad |
| P02 | Control de calidad: análisis por lote | 3:2 | Calidad, Por qué elegirnos |
| P03 | Codificación de lote y vencimiento en la bolsa | 3:2 | Calidad |
| P04 | Bodega con estibas | 3:2 | Cobertura |
| P05 | Cargue del camión y salida por la vía a Turbaco | 3:2 | Cobertura |
| P06 | Fachada con la señal del parque industrial | 3:2 | Contacto («Cómo llegar») |
| N01 | Equipo completo, sin decoración de temporada | 3:2 | Nosotros |
| R01–R06 | Retratos en su puesto: jefe de calidad, operaria de empaque, jefe de bodega, asesores por zona, familia fundadora | 4:5 | Portada, Contacto, Nosotros, confirmación |
| E01 | Frente de cada referencia con el empaque «Nueva imagen», fondo para recorte | 4:5 | Vitrinas, ficha, hero |
| E02 | Reverso legible con lote, vencimiento, registro, peso y tabla (380 g a 4.000 px) | 4:5 | «Cómo leer una bolsa» |
| E03 | Paca envuelta a tres cuartos | 1:1 | Ficha |
| E04 | Bultos de 12,5 y 25 kg de frente | 4:5 | Vitrinas, ficha |
| C01 | Tendera recibiendo una paca en Cartagena | 3:2 | Tres formas de comprar, Cobertura |
| C02 | Panadero de la Costa abriendo un bulto | 4:5 | Por qué elegirnos, ficha de bultos |
| C03 | Góndola con The Cántaro, con permiso de la cadena | 3:2 | Dónde comprar |

Son 23 tomas en una jornada de planta, media de retratos y una de visitas a clientes. Las fotos del globo se entregan a 5:1 con una plantilla de zona segura, porque el círculo y los arcos recortan los bordes. Cada persona firma su autorización (Ley 1581 de 2012).

### 2.7 Iconografía y logo

- **Pictogramas propios** de trazo de 2 px con remates redondos (bolsa, paca, bulto, estiba, camión, planta, lote, registro). Solo aparecen donde informan.
- **Iconos de interfaz** con el mismo trazo y siempre junto a un texto visible. El glifo de WhatsApp va junto a la palabra o el número.
- **Anillos desde Turbaco:** diagrama en SVG con Turbaco como origen y arcos cuyo radio es el tiempo de entrega, no la distancia. Las ciudades son botones y hay una tabla equivalente. Sin pines ni rutas inventadas.
- **Logo, evolución del globo actual:** conserva el cuerpo verde y la base azul, y quita el degradado y el contorno celeste. Queda en dos tintas planas y un SVG maestro, legible a 16 px. El nombre recupera la tilde: «Mundilácteos», en Azul Mundilácteos. Tiene versiones en dos tintas, negativa (pie y menú móvil) y a una tinta.
- Nada de iconos dentro de círculos de color, emoji, gotas ni banderas.

---

## 3. Estructura y navegación

### 3.1 Mapa del sitio

| Página | Ruta en producción | Ruta en el prototipo |
|---|---|---|
| Inicio | `/` | `#inicio` |
| Productos (vitrinas, filtros, buscador, tabla comparativa) | `/productos/?marca=&tipo=&formato=&peso=&uso=&q=` | `#productos~marca-the-cantaro~formato-bulto` |
| Ficha de producto y presentación | `/productos/the-cantaro-entera/900-g/` | `#producto-cantaro-entera~900-g` |
| Comparar presentaciones (hasta 4) | `/productos/comparar/?p=…` | `#comparar~p-…` |
| Con su marca (maquila) | `/productos/marca-propia/` | `#marca-propia` |
| Calidad y registros | `/calidad/` | `#calidad` |
| Por qué elegirnos | `/por-que-elegirnos/` | `#por-que-elegirnos` |
| Distribución y cobertura | `/cobertura/` | `#distribucion` |
| Dónde comprar | `/cobertura/donde-comprar/` | `#donde-comprar` |
| Nosotros | `/nosotros/` | `#nosotros` |
| Recursos y artículos | `/recursos/` y `/recursos/<artículo>/` | `#recursos`, `#articulo-<slug>` |
| Solicitar cotización (y cotización compartida) | `/cotizar/?c=…` | `#cotizar`, `#cotizar~c-…` |
| Contacto | `/contacto/` | `#contacto` |
| Política de datos, términos, 404 | `/privacidad/`, `/terminos/`, `/404.html` | `#privacidad`, `#terminos`, cualquier ruta desconocida |

Filtros, búsqueda, presentación elegida y comparación viven en la dirección. Así un asesor puede enviar un enlace exacto por WhatsApp y el botón Atrás funciona. Cada cambio de página sube al inicio, actualiza el título de la pestaña y lleva el foco al título principal. Las URL del sitio actual en WordPress se redirigen con 301.

### 3.2 Menú de escritorio

```
| [globo] Mundilácteos  Productos  Calidad  Por qué elegirnos  Cobertura  Nosotros  Recursos      |
|                          (lupa) Buscar   Dónde comprar   (WA) 319 769 0990   [ Cotizar (n) ]   |
                       (en pantalla, una sola fila blanca de 72 px, fija)
```

- **Seis destinos por tarea.** «Por qué elegirnos» está en el menú porque es el argumento central del concepto. Marca propia vive dentro de Productos, como filtro «Con su marca» y como página propia.
- **Enlace activo** marcado con el destello bajo la palabra y `aria-current`, sin cambiar el color.
- **Buscar:** buscador con hasta 6 sugerencias, tolerante a tildes y a palabras del mostrador («saco» o «costal» es bulto, «fardo» es paca, «kilo» es kg).
- **WhatsApp y Cotizar** siempre a la derecha, en el mismo orden. Cotizar es el único botón verde: vacío dice «Cotizar» y, con referencias, «Cotizar (3)». Abre el panel Mi cotización.
- Entre 1.280 y 1.439 px, «Buscar» pasa a icono y «Dónde comprar» sale de la cabecera. Por debajo de 1.280 px se usa la cabecera compacta.
- La cabecera no se oculta ni cambia de tamaño al bajar.

### 3.3 Móvil

- **Cabecera de 56 px:** el globo (enlace al inicio), WhatsApp con su etiqueta, Cotizar y «Menú» con texto, cada uno de 44 px como mínimo.
- **Menú a pantalla completa** en Azul noche, que baja con borde en arco. Lleva el buscador, los seis destinos, Dónde comprar, Contacto, «Escribir a un asesor», «Llamar al 319 769 0990», la dirección y el horario.
- **Sin barra inferior ni botón flotante:** WhatsApp y Cotizar viven en la cabecera fija.
- Filtros en hoja inferior con «Mostrar n productos». Mi cotización también se abre como hoja inferior.

### 3.4 Pie

Fondo Azul noche, separado de la banda anterior por un hueco blanco en arco. Tiene cuatro grupos:

- **Productos:** The Cántaro, La Becerrita, Bultos, Con su marca y Comparar presentaciones.
- **Empresa:** Nosotros, Por qué elegirnos, Calidad, Cobertura y Recursos.
- **Atención:** WhatsApp y teléfono con el número visible, Contacto, Dónde comprar y peticiones, quejas y reclamos.
- **Datos:** razón social, NIT, dirección, horario, política de datos y términos.

Cierra con el globo en negativo y la frase «Leche en polvo hecha en Turbaco, Bolívar, con registro INVIMA vigente.».

---

## 4. Secciones principales

### 4.1 Inicio

| # | Sección | Contenido |
|---|---|---|
| 1 | **Hero: el globo de paralelos** | El logo a escala monumental, recortado por la cabecera y el borde de la pantalla. El H1 «Leche en polvo de Turbaco para toda Colombia.» cruza el globo por el paralelo 10, en dos líneas de 85 px. En la franja 2 van los tres sacos reales y en la franja 3, The Cántaro Entera 500 g y La Becerrita Entera 900 g, que suben desde un brillo radial Azul cielo con sombra de contacto. Debajo: bajada en serif, «Cotizar por volumen», «Ver productos» y la credencial «Registro INVIMA RSA-006359-2018, vigente hasta el 24/05/2028. Verificar». La geometría se calcula para que el titular nunca quede sobre las franjas: verificada de 320 a 1.920 px |
| 2 | **The Cántaro, La Becerrita y la marca de su cadena** | Dos vitrinas de tamaño según prioridad: The Cántaro con tres empaques (bolsa, azucarada y bulto) y La Becerrita con dos y su filete amarillo. Los empaques rompen el borde de su franja. Una línea «Con su marca» lleva a la maquila. **Compre según su negocio:** cuatro chips (Para el hogar, Por paca para tienda, Por bulto para panadería e industria, Con su marca) cambian la acción y muestran el mensaje de WhatsApp que se enviará |
| 3 | **Registros a la vista** | Banda Azul noche con borde en arco: «Cinco registros sanitarios vigentes. Verifíquelos usted mismo.». Cinco filas con el número a 66 px en peso 300, qué ampara, vigencia, modalidad, «Copiar número» y «Abrir consulta del INVIMA». Concepto sanitario favorable del establecimiento N.º 24741 con «Ver en datos.gov.co» y «Última verificación: 25/09/2026» |
| 4 | **Cómo leer una bolsa** | Esquema del reverso con cinco zonas como botones de opción: Registro sanitario, Lote, Vencimiento, Peso neto y Tabla nutricional. El esquema se acerca a la zona elegida y la explicación cambia. Hay una lista de texto equivalente. Marco E02 hasta tener la foto del reverso |
| 5 | **Planta y gente** | Banda Azul Mundilácteos: «Una planta en Turbaco y la gente que la hace funcionar.». Foto real del equipo en ventana de franja (provisional), dirección de Europark, marco R01–R04 de los retratos, «Cómo llegar», «Solicitar visita a la planta» y «Conocer a Mundilácteos» |
| 6 | **Salimos de Turbaco. Elija su ciudad.** | Anillos desde Turbaco con 8 ciudades más «Otra ciudad». Al elegir una, su tramo se dibuja y el panel da el tiempo de entrega (dato a confirmar), quién atiende y «Escribir al asesor de la Costa» con el mensaje a la vista |
| 7 | **Tres formas de comprar** | En fondo Bruma, tres columnas de texto: En su supermercado (Megatiendas, Carulla, Éxito y Rappi), Directo de la planta (por paca o bulto, con asesor) y Con su marca |
| 8 | **Guías y fichas técnicas** | Lista de texto con tema y minutos de lectura |
| 9 | **Cierre** | Banda Azul Mundilácteos: «¿Prefiere hablar con alguien de la planta?». «Escribir por WhatsApp» (verde con anillo blanco), «Llamar al 319 769 0990», «Enviar una solicitud», horario y el marco R04 del retrato de la asesora |

No hay números de secuencia, filas de estadísticas ni rejillas de tarjetas iguales.

### 4.2 Productos (catálogo)

Cada producto es una **vitrina**: el empaque se para sobre una franja Bruma azul con borde en arco y los datos van debajo, sobre blanco, sin marco ni sombra de interfaz.

- **Encabezado** en banda Azul Mundilácteos con borde en arco: migas, H1 «Productos», «9 productos y 20 presentaciones, en bolsa y en bulto. El precio por volumen llega con su cotización.» y buscador.
- **Compre según su negocio:** chips Todos, Para el hogar, Por paca para tienda, Por bulto para panadería e industria, y Con su marca. En «Para el hogar», la acción de cada vitrina pasa a «Dónde comprar».
- **Filtros** en un panel Bruma a la izquierda; en móvil, hoja inferior «Filtrar». Hay cinco grupos: Marca, Tipo, Formato (selector Todos, Bolsa y Bulto), Presentación (chips en varias filas) y Uso. Admiten selección múltiple, cada opción muestra cuántos productos quedan y todo se refleja en la dirección.
- **Barra de resultados:** «Mostrando 9 de 9 productos» anunciado a lectores de pantalla, chips de filtros activos con «quitar», Ordenar y «Comparar (n)».
- **Vitrina:** empaque con sombra de contacto, marca, nombre, denominación exacta del registro y presentaciones como chips (botones de opción nativos, nunca una lista desplegable). Al elegir una presentación cambian el empaque, la paca, el rinde, el EAN y el enlace a la ficha. Cierran la vitrina el registro con «Verificar», «Agregar a mi cotización», «Ver ficha técnica» y «Comparar».
- **Estados:** tras agregar, la vitrina muestra «En su cotización» con cantidad `[−] n [+]`, kilos y «Quitar», sincronizados con Mi cotización. Lo no confirmado lleva asterisco o la marca discreta «dato a confirmar». Una presentación sin foto propia muestra la de otra con el pie «Foto de referencia: 500 g». Un producto sin foto muestra el pictograma con «E01 Foto por producir».
- **Registrados en 2025, presentaciones por confirmar:** la mezcla láctea con café y panela y el alimento lácteo, con su registro, vigencia y «Preguntar por WhatsApp».
- **Qué presentación me conviene:** tabla de Hogar, Tienda o reventa, Panadería e industria y Con su marca, con formato, rinde, dónde se compra y acción. En móvil, la primera columna queda fija y solo se desplaza la tabla.
- **Sin resultados:** propone la alternativa real con un botón, por ejemplo «Ver La Becerrita 25 kg».
- **Comparar:** hasta 4 presentaciones lado a lado, con «Mostrar solo diferencias» y «Copiar enlace».
- **Distinción legal:** las mezclas se rotulan siempre «Mezcla láctea», nunca «leche», en nombres, filtros y texto alternativo.

### 4.3 Ficha de producto

- **Migas:** Inicio / Productos / The Cántaro Entera.
- **Galería:** el empaque llega desde la vitrina como elemento compartido, sobre su franja Bruma con brillo y sombra de contacto. Tiene miniaturas como botones y un pie honesto: «Se muestra la bolsa de 500 g como referencia. Empaque de 2022, provisional hasta recibir las fotos "Nueva imagen" (E01)».
- **Identificación:** marca, H1 de 64 px, **denominación exacta del registro** («Leche en polvo entera adicionada con hierro») y la credencial «Registro INVIMA RSA-006359-2018, vigente hasta el 24/05/2028. Verificar».
- **Presentación:** chips con las cinco presentaciones del producto (las no confirmadas con asterisco). Elegir una cambia la dirección (`#producto-cantaro-entera~900-g`) para compartirla por WhatsApp.
- **Datos de venta:** paca y peso («Paca de 12 bolsas, 10,8 kg»), rinde por bolsa y por paca, EAN.
- **Cantidad con su equivalencia:** «[−] 1 [+] paca = 12 bolsas, 10,8 kg». En bultos, la cuenta es en bultos y kilos.
- **Acciones:** «Agregar a mi cotización», «Preguntar por WhatsApp» con la vista previa del mensaje («Hola, Mundilácteos. Quiero cotizar The Cántaro Entera 900 g, 1 paca (12 bolsas). Estoy en ____.») y «Comparar».
- **Para el hogar:** «¿Es para su casa? Dónde comprar 900 g», con enlaces a la ficha exacta en Megatiendas, Carulla y Éxito.
- **Barra de anclas:** Ficha técnica, Nutrición, Preparación, Cómo leer la bolsa, Preguntas y Relacionados. En móvil son acordeones.
- **Ficha técnica en HTML:** denominación, marca, tipo, registro con vigencia, fabricante, fortificación, presentaciones, empaque (bolsa laminada de tres capas, termosellada, en atmósfera de CO₂), paca y caja, vida útil de 12 meses, preparación, alérgenos y EAN por presentación.
- **Nutrición:** lista de los nutrientes que tendrá la tabla (formato de la Resolución 810 de 2021) con «dato a confirmar». No se muestra una tabla vacía.
- **Preparación:** 135 g por litro según la ficha técnica. La ficha señala que el empaque dice 3 L por 380 g y 7 L por 900 g, que dan unos 127 y 129 g por litro, y marca la cifra «por unificar».
- **Cómo leer la bolsa** en texto, con el marco E02 del reverso.
- **Lo que nos preguntan:** «¿Es leche o mezcla láctea?», «¿Cuánto rinde?», «¿Venden por paca o por bulto?» y «¿Cuánto dura cerrada?».
- **Relacionados:** otras presentaciones del producto y productos para el mismo uso.

### 4.4 Mi cotización y Solicitar cotización

- **Mi cotización:** panel que entra desde la derecha con el borde en arco; en móvil, hoja inferior. Líneas con `[−] n [+]` pacas o bultos, kilos y totales en vivo. Acciones: «Solicitar cotización», «Enviar por WhatsApp», «Copiar enlace» y «Vaciar» con «Deshacer». Se guarda en el navegador y, si el almacenamiento está bloqueado, avisa y funciona en memoria. Usa siempre «cotización» y «referencias», nunca «carrito» ni «comprar», y no muestra precios.
- **Solicitar cotización:** una sola página, sin cuenta. A la izquierda va «Su lista», editable; vacía, ofrece cuatro referencias frecuentes para empezar. A la derecha, «Sus datos», con **cinco datos obligatorios**: nombre, WhatsApp, ciudad, tipo de negocio (8 opciones) y autorización de datos, que va sin marcar. Los datos de facturación son opcionales y van plegados. Nota: «Sin crear cuenta y sin pagos: usted pide precio y un asesor le responde.».
- **Validación** en línea y al enviar, con un resumen de errores enlazado a cada campo y el foco en el primero.
- **Confirmación:** «Solicitud enviada. N.º 0142.», quién le escribe según la ciudad (Costa o interior), «Continuar por WhatsApp» con la lista ya escrita y «Copiar resumen».
- **Enlace compartible:** un asesor arma la lista y la envía. Quien la abre la ve cargada, con «Deshacer».

### 4.5 Resto de páginas

- **Marca propia.** Banda azul con el H1 «Leche en polvo con la marca de su cadena» y las tres bolsas de marca propia con el aviso de autorización. Incluye:
  - «Qué empacamos con su marca»: gramajes de 27 g a 1.000 g en bolsa y de 5 a 25 kg en bulto como cifras grandes, tipos de leche y registro que ampara.
  - «Cómo trabajamos» en 4 pasos numerados.
  - Ficha de especificación y bolsas por paca según el gramaje.
  - Lo que necesitamos de su cadena y lo que confirma el área comercial.
  - El formulario «Pedir muestras» y el acceso por WhatsApp.
- **Calidad y registros.** «Cada número de esta página se puede comprobar en una fuente pública.» Incluye:
  - Índice «En esta página».
  - Banda Azul noche con la tabla de los 5 registros: número, qué ampara, modalidad, vigencia, «Copiar número» y «Abrir consulta».
  - «El establecimiento, verificado»: tarjeta del concepto sanitario FAVORABLE, con enlace a datos.gov.co.
  - «Así trabajamos» en 5 pasos, con la foto real de los bultos y el marco P01–P04.
  - Cómo leer una bolsa.
  - Trazabilidad por lote, con los pasos para reportar un problema.
  - Un empaque que protege la leche: capas de la bolsa y el bulto.
  - Las 9 fichas técnicas.
  - La banda «¿Encontró un problema con un producto?».
  - La ISO 9001:2015 no se muestra: aparece solo en las notas plegadas del prototipo hasta tener el certificado.
- **Por qué elegirnos.** Seis razones en franjas alternas, cada una con su prueba visual y su verbo: Ver los registros, Ver en datos.gov.co, Solicitar visita a la planta, Ver ficha técnica, Ver productos y Ver cobertura. Siguen «Lo que nos preguntan antes de comprar», con seis preguntas y su respuesta, y la banda de cierre «Arme su cotización sin crear cuenta.».
- **Nosotros.** Incluye:
  - Globo reducido, con la foto real del equipo en una franja, los sacos en otra y el H1 en el paralelo 10.
  - Datos de la empresa (constitución y número de empleados, por confirmar).
  - «Nuestra historia» con hitos fechados por los registros INVIMA (2011, 2017, 2018, 2023, 2025 y hoy).
  - La gente, con fotos reales, y la familia, con el marco R06.
  - Tres valores con su evidencia.
  - «Visítenos en Europark», con «Solicitar visita a la planta», «Cómo llegar» y «Copiar dirección».
  - Nuestras marcas.
- **Distribución y cobertura.** Incluye:
  - Anillos desde Turbaco a tamaño completo, con 11 ciudades más «Otra ciudad».
  - El panel de la ciudad elegida: anillo, entrega, pedido mínimo, quién atiende, «Escribir al asesor» y «Cotizar para Barranquilla».
  - La tabla «Ciudades, tiempos y asesores».
  - «Cómo despachamos».
  - El formulario «Ser distribuidor».
- **Dónde comprar.** Voz de la marca para el consumidor. Incluye:
  - Búsqueda por ciudad, «Usar mi ubicación» y ciudades frecuentes.
  - «Pídala en línea»: tabla con enlaces a la ficha exacta de cada presentación en Megatiendas, Carulla y Éxito.
  - Cadenas donde se consigue (Olímpica y las regionales, por confirmar) y el marco C03.
  - «¿Tiene una tienda?», que lleva a Ser distribuidor y a las pacas.
- **Recursos.** Incluye:
  - Artículo destacado con la cifra «135 g» por litro (dato a confirmar) y los empaques reales.
  - «Guías y recetas», filtrables por tema: 4 guías completas, 1 en preparación y 1 receta en prueba de cocina.
  - Las 9 fichas técnicas, cada una con «Ver ficha» y «Descargar copia (HTML, 3 KB)».
- **Contacto.** Incluye:
  - «319 769 0990» como cifra de 96 px, con «Escribir por WhatsApp», «Llamar» y «Copiar número».
  - Horario, correo (por confirmar), Instagram y datos de la empresa.
  - Banda «Asesores por zona»: Costa Caribe, Interior del país y Cadenas y marca propia, cada una con su WhatsApp prellenado, más el marco R04.
  - El formulario «Escríbanos», con 7 motivos.
  - La planta, con «Cómo llegar» y el marco P06.
- **404:** el globo con las franjas en Bruma y «Esta página no existe.», con buscador y WhatsApp.

Los cuatro formularios (cotizar, muestras, distribuidor y escríbanos) validan en línea, piden la autorización de la Ley 1581 de 2012 y confirman en la misma página. En el prototipo no envían nada fuera del navegador.

---

## 5. Diferenciadores frente al sitio actual

Cifras de la auditoría del 25/09/2026 (`/auditoria/informe-auditoria.md` y `hallazgos-detallados.md`) y mediciones del prototipo en Chromium.

| Tema | Sitio actual | Concepto 1 «Paralelo 10» |
|---|---|---|
| Catálogo | 3 productos publicados (6 tarjetas) de 14 identificados; falta la descremada | 9 productos y 20 presentaciones, cada producto con su ficha y cada presentación con su enlace; la descremada está incluida |
| Denominación legal | 3 de 6 tarjetas muestran una mezcla con el nombre «leche en polvo» | Denominación exacta del registro INVIMA en cada vitrina y ficha; las mezclas dicen siempre «Mezcla láctea» |
| Presentaciones | 4, 9 o 10 presentaciones de bolsa según la sección | Una sola fuente de datos; lo no confirmado lleva asterisco |
| Cotización | Formulario de 2 campos (nombre y correo), sin producto ni cantidad | Mi cotización con pacas, bultos y kilos; 5 datos obligatorios; número de solicitud; WhatsApp con la lista escrita y enlace compartible |
| Confianza | ISO 9001:2015 nombrada sin ente, número ni vigencia | 5 registros con número, vigencia, «Copiar número» y consulta del INVIMA; concepto FAVORABLE con enlace a datos.gov.co; la ISO no se muestra sin certificado |
| Dónde comprar | 0 enlaces a puntos de venta | Página propia con búsqueda por ciudad, «Usar mi ubicación» y enlaces a la ficha exacta en Megatiendas, Carulla y Éxito |
| Contacto | 0 enlaces tel: o mailto:; sin NIT, correo ni horario | WhatsApp con el número en la cabecera; teléfono en el cierre, el menú, el pie y Contacto; NIT, dirección y horario en el pie |
| Datos personales | 0 de 5 formularios con autorización (Ley 1581); sin política | 4 formularios con la casilla sin marcar y página de política de datos |
| Contraste y accesibilidad | Cotizar a 2,09:1 y Enviar a 1,99:1; el menú móvil no abre con teclado | Botón primario a 5,38:1; 0 violaciones de axe en 12 vistas, en escritorio y móvil, y en 8 estados interactivos; menú y paneles operables con teclado |
| Identidad | 20 colores, 5 colores de botón, 14 tamaños de letra y 3 identidades; logo de 70 × 57 px con 57 % de margen | 12 colores, todos de la paleta de marca; 2 familias con escala en tokens; el globo evolucionado en SVG, legible a 16 px |
| Idioma y SEO | `lang="en"`, 0 de 8 páginas con meta descripción, 3 H1 en la portada | `lang="es-CO"`, meta descripción, un H1 por vista, título por ruta y datos estructurados (Organization, Product, BreadcrumbList, FAQPage, Article) |
| Rendimiento | LCP móvil de 6,26 s; la portada carga 25 archivos JS y 320,6 KiB de fuentes | Portada de 15 peticiones y unos 400 KB con fuentes e imágenes; 3 archivos JS propios; CLS de 0,0017. El LCP se mide en producción |
| Datos contradictorios | 11 frente a 12 años; Cartagena frente a Turbaco | Un solo archivo de datos; la planta siempre «Turbaco, Bolívar»; año de fundación por confirmar |
| Nosotros | 163 palabras | Historia con 6 hitos (constitución, registros INVIMA y planta), equipo real, familia, valores y visita a la planta |
| Imagen principal | Foto de vacas de banco y empaques de 2022 | El globo del logo con los empaques y sacos reales; 0 fotos de banco |

### Frente al otro concepto

PENDIENTE

---

## 6. Capturas

Verificación final del 25/09/2026 en las 24 capturas (`capturas/reporte.json`): 0 desbordes horizontales, 0 errores de consola de la página y 0 violaciones de axe de cualquier gravedad.

- «Primer pantallazo» es lo visible al abrir; «Completa» es la página entera hasta 9.000 px de alto.
- Escritorio a 1.440 × 900 y móvil a 390 × 844, con densidad 2×.
- Los avisos de CORS del reporte son de la herramienta de medición al leer archivos locales, no del prototipo.

| Vista | Escritorio 1.440 px | Móvil 390 px |
|---|---|---|
| Inicio | [Primer pantallazo](capturas/inicio-desktop-fold.jpg) · [Completa](capturas/inicio-desktop.jpg) | [Primer pantallazo](capturas/inicio-movil-fold.jpg) · [Completa](capturas/inicio-movil.jpg) (hasta Tres formas de comprar) |
| Productos | [Primer pantallazo](capturas/productos-desktop-fold.jpg) · [Completa](capturas/productos-desktop.jpg) | [Primer pantallazo](capturas/productos-movil-fold.jpg) · [Completa](capturas/productos-movil.jpg) |
| Ficha (The Cántaro Entera) | [Primer pantallazo](capturas/producto-cantaro-entera-desktop-fold.jpg) · [Completa](capturas/producto-cantaro-entera-desktop.jpg) | [Primer pantallazo](capturas/producto-cantaro-entera-movil-fold.jpg) · [Completa](capturas/producto-cantaro-entera-movil.jpg) |
| Solicitar cotización | [Primer pantallazo](capturas/cotizar-desktop-fold.jpg) · [Completa](capturas/cotizar-desktop.jpg) | [Primer pantallazo](capturas/cotizar-movil-fold.jpg) · [Completa](capturas/cotizar-movil.jpg) |
| Marca propia | [Primer pantallazo](capturas/marca-propia-desktop-fold.jpg) · [Completa](capturas/marca-propia-desktop.jpg) | [Primer pantallazo](capturas/marca-propia-movil-fold.jpg) · [Completa](capturas/marca-propia-movil.jpg) |
| Calidad | [Primer pantallazo](capturas/calidad-desktop-fold.jpg) · [Completa](capturas/calidad-desktop.jpg) | [Primer pantallazo](capturas/calidad-movil-fold.jpg) · [Completa](capturas/calidad-movil.jpg) (hasta Fichas técnicas) |
| Por qué elegirnos | [Primer pantallazo](capturas/por-que-elegirnos-desktop-fold.jpg) · [Completa](capturas/por-que-elegirnos-desktop.jpg) | [Primer pantallazo](capturas/por-que-elegirnos-movil-fold.jpg) · [Completa](capturas/por-que-elegirnos-movil.jpg) |
| Nosotros | [Primer pantallazo](capturas/nosotros-desktop-fold.jpg) · [Completa](capturas/nosotros-desktop.jpg) | [Primer pantallazo](capturas/nosotros-movil-fold.jpg) · [Completa](capturas/nosotros-movil.jpg) (hasta el pie) |
| Distribución y cobertura | [Primer pantallazo](capturas/distribucion-desktop-fold.jpg) · [Completa](capturas/distribucion-desktop.jpg) | [Primer pantallazo](capturas/distribucion-movil-fold.jpg) · [Completa](capturas/distribucion-movil.jpg) |
| Dónde comprar | [Primer pantallazo](capturas/donde-comprar-desktop-fold.jpg) · [Completa](capturas/donde-comprar-desktop.jpg) | [Primer pantallazo](capturas/donde-comprar-movil-fold.jpg) · [Completa](capturas/donde-comprar-movil.jpg) |
| Recursos | [Primer pantallazo](capturas/recursos-desktop-fold.jpg) · [Completa](capturas/recursos-desktop.jpg) | [Primer pantallazo](capturas/recursos-movil-fold.jpg) · [Completa](capturas/recursos-movil.jpg) |
| Contacto | [Primer pantallazo](capturas/contacto-desktop-fold.jpg) · [Completa](capturas/contacto-desktop.jpg) | [Primer pantallazo](capturas/contacto-movil-fold.jpg) · [Completa](capturas/contacto-movil.jpg) |

Solo el prototipo navegable muestra la carga del globo, el horizonte que sube entre páginas, el empaque que viaja a la ficha y el vuelo a «Cotizar».

---

## 7. Checklist de vanguardia duradera

Estados posibles:

- **Cumple.**
- **Parcial en prototipo:** la base está, falta una parte.
- **En producción:** depende del sitio estático final o de datos del cliente.

| # | Criterio | Estado | Evidencia o qué falta |
|---|---|---|---|
| 1 | LCP ≤ 2,5 s, INP < 200 ms y CLS ≤ 0,1 en móvil | En producción | Sin datos de campo en un prototipo. CLS medido en Chromium: 0,0017 en escritorio y 0 en móvil. H1 de texto, empaque del hero con prioridad alta, imágenes con medidas declaradas y animaciones que no mueven contenido ya pintado |
| 2 | JS ≤ 50 KB por página, portada ≤ 1 MB y ≤ 30 peticiones, ≤ 2 familias autoalojadas | Parcial en prototipo | JS por página: núcleo de 35,7 KB más un módulo de hasta 7,1 KB (comprimidos). Portada: 15 peticiones y unos 400 KB. Dos familias. Falta alojar las fuentes en el propio dominio (el formato del prototipo solo admite Google Fonts) y minificar para bajar el núcleo a la meta interna de 35 KB |
| 3 | `<picture>` con AVIF, WebP y JPEG, `srcset`, prioridad de la imagen principal | Parcial en prototipo | WebP con `width` y `height`, carga diferida bajo el primer pantallazo y el empaque del hero con prioridad alta; imágenes del hero de 23 a 65 KB. `<picture>` y `srcset` a 2× se generan en producción con los originales del cliente |
| 4 | Contraste AA en texto, controles y foco | Cumple | Solo pares calculados de la paleta; texto nunca sobre foto; el botón verde lleva anillo blanco sobre azul; axe sin violaciones en las 24 capturas |
| 5 | 0 errores automáticos, `lang="es-CO"`, etiquetas visibles, texto alternativo | Cumple | axe sin violaciones en 12 vistas y 2 dispositivos, y en 8 estados (panel, menú, filtros, errores del formulario, comparar, 404). Etiquetas visibles; texto alternativo con marca, producto y peso |
| 6 | Teclado completo, foco visible no tapado, objetivos táctiles | Cumple | Foco de 3 px; margen de desplazamiento con la altura de la cabecera; objetivos de 44 px en móvil, incluidos los enlaces pequeños. Menú, panel y hojas atrapan el foco y se cierran con Escape. Falta la prueba con lectores de pantalla antes del lanzamiento |
| 7 | Movimiento reducido y límites de animación | Cumple | Aplica EXPERIENCIA.md, que amplía este criterio por pedido del cliente: carga del hero de 900 ms, vistas de 450 ms y solo transform, opacity, clip-path, máscara y ancho de fuente. Con «reducir movimiento» no hay transiciones, vuelos ni efectos de scroll |
| 8 | Menú por tareas con 6 entradas como máximo, sin hamburguesa en escritorio | Cumple | Productos, Calidad, Por qué elegirnos, Cobertura, Nosotros y Recursos, visibles desde 1.280 px; ninguna entrada por tipo de cliente |
| 9 | WhatsApp, teléfono y Cotizar en la misma posición; mensajes prellenados | Cumple | WhatsApp y Cotizar siempre a la derecha de la cabecera, en escritorio y móvil; teléfono en el pie, el menú y el cierre. Cada `wa.me` lleva producto, presentación o ciudad, con la vista previa del mensaje. Sin widget de chat |
| 10 | Filtros múltiples con conteo, filtros aplicados, estado en la URL | Parcial en prototipo | Cumple con JavaScript: se puede compartir y recargar (`#productos~marca-the-cantaro~formato-bulto`). Sin JavaScript, el prototipo muestra solo la portada con sus enlaces; en producción la página sale con todas las referencias |
| 11 | Ficha completa: presentaciones como botones, etiqueta, nutrición, EAN, Invima | Parcial en prototipo | Cumplen la URL por presentación, los chips, el registro con «Verificar», la vida útil, la paca, la CTA según el uso y dónde comprar. Faltan del cliente el reverso legible (E02), la tabla nutricional, varios EAN y las pacas por estiba |
| 12 | Tabla «Qué presentación me conviene», sin desplazamiento de página a 360 px | Cumple | 5 columnas con la primera fija; en móvil solo se desplaza la tabla, en una región enfocable. Se suma el comparador de hasta 4 con «Mostrar solo diferencias» |
| 13 | Cotización con 5 obligatorios como máximo, validación, confirmación y WhatsApp | Cumple | Nombre, WhatsApp, ciudad, tipo de negocio y autorización; productos precargados; `autocomplete` e `inputmode`; confirmación con número y «Continuar por WhatsApp». El envío real (PHP en Hostinger) va en producción |
| 14 | Sin precios: escenario de rendimiento por presentación mayorista | Cumple | «Cerca de 185 L» por bulto de 25 kg, «93 L» por el de 12,5 kg y «84 a 90 L por paca». La cifra de los bultos está marcada por confirmar |
| 15 | Dónde comprar con ciudad, ubicación y mapa bajo pedido | Parcial en prototipo | Búsqueda por ciudad, «Usar mi ubicación», enlaces a la ficha exacta y «Ser distribuidor», sin mapa incrustado. Faltan los puntos de venta con horario, WhatsApp y «Cómo llegar» |
| 16 | Ficha técnica en HTML y PDF como copia rotulada | Parcial en prototipo | Ficha en HTML en cada producto y biblioteca de 9 fichas con copia descargable rotulada («HTML, 3 KB»). El PDF se publica cuando el cliente entregue las fichas |
| 17 | JSON-LD sin errores | Parcial en prototipo | Organization, Product (con `gtin13` cuando hay EAN), BreadcrumbList, FAQPage y Article. Faltan LocalBusiness con coordenadas, Recipe (la receta está en prueba) y la validación con la herramienta de Google |
| 18 | 0 fotos de banco, 0 personas generadas, 0 contadores falsos | Cumple | Solo fotos del cliente y marcos de tomas por producir; testimonios y retratos solo reales; sin avisos de urgencia |
| 19 | Identidad propia con tokens, tipografía distinta de Inter o Roboto, sin efectos de temporada | Cumple | Tokens en propiedades personalizadas, en hex y OKLCH con soporte. Encode Sans y Source Serif 4. Sin vidrio, degradado morado, neubrutalismo ni cursor personalizado |
| 20 | Sitio estático generado desde datos, legible sin JavaScript, funciones nuevas con respaldo | Parcial en prototipo | Los datos de productos, registros y empresa salen de un solo archivo de catálogo. View Transitions, OKLCH, subgrid y animaciones de scroll se activan solo con soporte. Sin JavaScript se ven la portada, el aviso y los contactos. El prerenderizado de todas las páginas es de producción |

Resumen: 11 cumplen, 8 están parciales en el prototipo y 1 depende de la medición en producción.

---

## 8. Datos que debe entregar Mundilácteos

**Productos y catálogo**

- La lista maestra de referencias vigentes: marca, denominación legal, contenido neto, EAN-13 y GTIN-14 de la paca.
- Confirmar las presentaciones marcadas «por confirmar»:
  - 400 y 800 g de The Cántaro Entera.
  - 400 y 500 g de The Cántaro Azucarada y de La Becerrita Entera.
  - Bultos de 5 y 12,5 kg de The Cántaro Entera.
- Nombre comercial y presentaciones de la mezcla láctea con café y panela y del alimento lácteo (registros de 2025).
- Empaques «Nueva imagen» en alta resolución: frente, reverso legible (380 g a 4.000 px) y paca. Confirmar si el sello «Milk Mait» sigue vigente.
- Por presentación: bolsas por paca, peso y medidas de la caja y pacas por estiba.
- Dosis de preparación: la ficha dice 135 g por litro y los empaques, unos 127 a 129 g. Hay que unificar la cifra.
- Tablas nutricionales en el formato de la Resolución 810 de 2021, ingredientes, fortificación y sellos de advertencia.

**Calidad**

- Certificado ISO 9001:2015 con ente, número, alcance, vigencia y PDF. Sin él, no se publica.
- Qué indica el lote (día y turno) y qué análisis por lote se pueden sustentar.
- Tiempo de respuesta real a peticiones, quejas y reclamos.
- Fichas técnicas en PDF.

**Comercial y distribución**

- Ciudades de despacho, tiempos por anillo, pedido mínimo y días de despacho.
- Asesor por zona, con nombre, cargo, WhatsApp y retrato autorizado.
- Puntos de venta por ciudad, con horario y contacto, en especial de La Becerrita.
- Confirmar las cadenas marcadas por confirmar: Olímpica y las regionales.
- Marca propia: pedido mínimo, tiempo de producción y titularidad del registro en la etiqueta de su cadena.

**Empresa y contacto**

- Año de fundación (EMIS dice 2011; LinkedIn, 2010), número de empleados (49 según una fuente secundaria), fundadores, historia y una cita firmada de la familia.
- Coordenadas GPS de la planta y la bodega correcta (28, 16 o 2A–2B).
- Un correo comercial en un dominio que funcione, el horario de atención y el WhatsApp comercial definitivo.
- Las URL del sitio actual, para las redirecciones.

**Autorizaciones, fotografía y marca**

- Autorización escrita de cada cadena para nombrarla, mostrar su góndola o mostrar su bolsa de marca propia.
- Las jornadas de fotos de la sección 2.6, con la autorización firmada de cada persona (Ley 1581 de 2012).
- Texto legal de la política de tratamiento de datos y de los términos.
- Aprobación de la evolución del globo y prueba de reconocimiento con 5 clientes: tendero, panadero, distribuidor, comprador de cadena y hogar.

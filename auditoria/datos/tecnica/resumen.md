# Auditoría técnica y de hosting: mundilacteos.com

Fecha de medición: 25-sep-2026 (UTC). Sitio: https://mundilacteos.com/ (WordPress 6.8.10 + Elementor/Elementor Pro + Astra, en Hostinger).

## 0. Método y límites del entorno

| Herramienta | Versión | Uso |
|---|---|---|
| Lighthouse (CLI) | 12.8.2, Chromium 141 headless | 4 páginas × móvil/desktop, **1 corrida por combinación** (throttling simulado por defecto) |
| Playwright + Chromium | 1194 (Chromium 141) | DOM, SEO, red, consola, foco, objetivos táctiles, capturas |
| axe-core | 4.13.0 | etiquetas wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, best-practice |
| curl | con proxy del entorno | cabeceras, tiempos de servidor, redirecciones, enlaces |
| DNS | dns.google (DoH), RDAP (rdap.org, Verisign) | registros, propietario de IP, registrador |
| Certificados | openssl s_client, CertSpotter | crt.sh devolvió 502 en 5 intentos: no se usó |

Limitaciones que afectan a los números:
- **El tráfico de Chromium pasa por un proxy del entorno que intercepta TLS** (emisor visto por el navegador: "CCR Upstream Proxy CA") y entrega **HTTP/1.1**. Con curl, el servidor responde con HTTP/2 y anuncia HTTP/3 (`alt-svc: h3`). Por eso la auditoría `uses-http2` de Lighthouse ("66 solicitudes no atendidas mediante HTTP/2") y el ahorro de `modern-http-insight` **no son fiables**. Los valores de rendimiento pueden ser algo peores que los de un usuario real.
- El tiempo de respuesta del servidor se midió además con la cabecera propia del CDN de Hostinger (`x-hcdn-upstream-rt`), que no depende del proxy.
- PageSpeed Insights API respondió 429 (cuota diaria agotada): **no hay datos de campo (CrUX)**.
- No se enviaron formularios. En la prueba de validación se bloquearon todas las peticiones distintas de GET: se intentaron 0.

## 1. Rendimiento

### 1.1 Lighthouse (datos de laboratorio, 1 corrida)

| Página | Disp. | Perf | Acc | BP | SEO | FCP | LCP | TBT | CLS | SI | Peso | Req. | Imágenes | JS | CSS | Fuentes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| / | móvil | **62** | 93 | 100 | 85 | 3,9 s | **6,5 s** | 160 ms | 0,001 | 6,3 s | 849,6 KiB | 69 | 213,9 KiB / 18 | 170,7 KiB / 25 | 94,2 KiB / 19 | 320,6 KiB / 5 |
| / | desktop | 84 | 92 | 100 | 85 | 1,1 s | 1,8 s | 0 ms | 0,015 | 2,7 s | 1146,1 KiB | 69 | 602,1 KiB / 19 | 170,6 KiB / 25 | 94,3 KiB / 19 | 228,8 KiB / 4 |
| /productos/ | móvil | 68 | 92 | 100 | 85 | 3,3 s | 5,7 s | 80 ms | 0,001 | 5,4 s | 644,1 KiB | 57 | 142,3 KiB / 10 | 126,4 KiB / 22 | 91,8 KiB / 19 | 243,7 KiB / 4 |
| /productos/ | desktop | 88 | 96 | 100 | 85 | 1,0 s | 1,6 s | 0 ms | 0 | 2,2 s | 800,5 KiB | 56 | 390,4 KiB / 10 | 126,3 KiB / 22 | 91,8 KiB / 19 | 151,9 KiB / 3 |
| /nosotros/ | móvil | 70 | 96 | 100 | 85 | 2,5 s | 5,4 s | 130 ms | 0 | 5,9 s | 642,5 KiB | 53 | 155,2 KiB / 8 | 120,1 KiB / 20 | 90,1 KiB / 19 | 243,7 KiB / 4 |
| /nosotros/ | desktop | 90 | 96 | 100 | 85 | 1,0 s | 1,5 s | 0 ms | 0,001 | 2,0 s | 752,9 KiB | 53 | 357,3 KiB / 9 | 120,1 KiB / 20 | 90,1 KiB / 19 | 151,9 KiB / 3 |
| /contacto/ | móvil | 71 | 96 | 100 | 85 | 2,5 s | 5,3 s | 100 ms | 0,001 | 5,7 s | 585,2 KiB | 53 | 89,8 KiB / 6 | 126,4 KiB / 22 | 90,5 KiB / 19 | 243,7 KiB / 4 |
| /contacto/ | desktop | 86 | 92 | 100 | 85 | 1,3 s | 1,7 s | 0 ms | 0,001 | 2,2 s | 706,9 KiB | 52 | 303,3 KiB / 6 | 126,3 KiB / 22 | 90,5 KiB / 19 | 151,9 KiB / 3 |

Diagnósticos repetidos en las 8 corridas:
- **El LCP es una imagen de fondo CSS** de la primera `section` de Elementor. El navegador no la descubre en el HTML y no tiene precarga ni `fetchpriority`. Desglose del LCP en home móvil: TTFB 1942 ms, retraso de carga 3255 ms, carga 1226 ms, render 99 ms.
- Recursos que bloquean el renderizado: 18 hojas y scripts en home, con un ahorro estimado de 2580 ms en móvil y 620 ms en desktop. Incluyen jQuery 3.7.1 + jquery-migrate, 3 CSS de Font Awesome, eicons, Formidable, block-library y Google Fonts.
- Google Fonts pide **Roboto, Roboto Slab y Nunito con 18 variantes cada una** y `display=auto`, lo que activa las auditorías `font-display` y `font-display-insight`.
- Fuentes de íconos: fa-brands (76 KiB), fa-solid (77 KiB) y eicons (92 KiB), unos 245 KiB para pocos íconos (redes sociales y flechas del carrusel).
- CSS sin usar: entre 37 y 48 KiB por página. Caché de recursos estáticos: `max-age=604800` (7 días), con 47 a 64 recursos marcados por página.
- DOM: 1029 elementos en home móvil y 1051 en desktop. El trabajo del hilo principal en home móvil es de 3,1 s.

### 1.2 Servidor (curl, 3 peticiones por página, sin promediar)

| Página | `x-hcdn-upstream-rt` (s) | TTFB curl (s) | `x-hcdn-cache-status` |
|---|---|---|---|
| / | 2,050 / 1,717 / 1,917 | 2,23 / 1,89 / 2,14 | DYNAMIC |
| /productos/ | 1,406 / 1,462 / 1,330 | 1,70 / 1,63 / 1,75 | DYNAMIC |
| /nosotros/ | 1,326 / 1,132 / 1,386 | 1,50 / 1,29 / 1,57 | DYNAMIC |
| /contacto/ | 1,273 / 1,244 / 1,142 | 1,44 / 2,04 / 1,33 | DYNAMIC |

El HTML se sirve con `cache-control: private, no-store` y el CDN no lo guarda en caché (DYNAMIC). No hay caché de página completa: PHP 7.4 genera cada visita, en 1,1 a 2,1 s en el origen.

### 1.3 Red medida con Playwright (tras scroll completo, sin recarga)

| Página | Desktop | Móvil |
|---|---|---|
| / | 72 req, 1213,9 KiB (imágenes 665,9 KiB) | 72 req, 913,0 KiB |
| /productos/ | 59 req, 885,3 KiB | 60 req, 701,1 KiB |
| /nosotros/ | 52 req, 746,5 KiB | 53 req, 640,8 KiB |
| /contacto/ | 52 req, 710,6 KiB | 53 req, 583,3 KiB |

La imagen más pesada es el fondo del hero de home (`2022/11/Diseño-sin-título-1-copia-2.jpg`): 313 KiB en desktop y 63 KiB en móvil. El CDN la entrega convertida a WebP.

## 2. Estructura HTML y SEO técnico

| Punto | Resultado medido |
|---|---|
| `lang` | `en` en las 8 páginas; además `og:locale=en_US` y `inLanguage:"en"` en el JSON-LD. El contenido está en español. |
| `<title>` | Genéricos: "Home - Mundilacteos" (19 car.), "Productos - Mundilacteos", "Nosotros - Mundilacteos", "Contacto - Mundilacteos". Sin términos como "leche en polvo" ni "Cartagena". |
| Meta description | **Ausente en las 8 páginas** (Lighthouse `meta-description` falla en las 8 corridas). |
| Canonical | Presente y autorreferente en todas. |
| Open Graph / Twitter | Generados por Yoast. `og:description` es texto concatenado de la página (en home repite "Contáctanos Contáctanos"). /contacto/ no tiene `og:image`. `twitter:data1` de home: "10 minutes" de lectura, inflado por bloques duplicados. |
| JSON-LD | Grafo de Yoast con WebPage, WebSite, Organization y BreadcrumbList. `WebSite.description` = **"Just another WordPress site"**. Organization tiene solo logo y `sameAs` de Instagram; no hay LocalBusiness, dirección, teléfono ni Product. |
| h1 | Home tiene **3 h1** en el DOM: "Home" (oculto), "Atrae y fideliza más clientes" (visible solo en desktop) y "Productores de leche en polvo… más de 11 años" (visible solo en móvil). Las otras páginas tienen 1 h1. |
| Jerarquía | Home: 30 h2, de los cuales 7 están ocultos en todos los dispositivos. El footer usa h3 para "Derechos reservados…". /nosotros/ pasa del h1 al h2 del CTA del footer. /productos/ repite 4 veces el h2 "The Cantaro". |
| Contenido duplicado en el DOM | En home hay 14 contenedores `.elementor-hidden-desktop`, 15 `-tablet` y 14 `-mobile`, con entre 9 966 y 17 681 caracteres de texto oculto según el dispositivo. 16 bloques de texto aparecen dos veces (por ejemplo, "12 años en el mercado" y "Somos una compañía certificada"). |
| robots.txt | Bloque de Yoast: `Disallow:` vacío y `Sitemap: /sitemap_index.xml`. |
| Sitemaps | El índice incluye post-sitemap (**/uncategorized/hello-world/**), page-sitemap (/, **/sample-page/**, /contacto/, /productos/, /nosotros/), category-sitemap (**/category/uncategorized/**) y author-sitemap (**/author/admin/**). El último `lastmod` es de 2023-02-13. |
| Páginas basura indexables | /sample-page/, /uncategorized/hello-world/, /category/uncategorized/ y /author/admin/ responden 200 con `index, follow` y están en el sitemap. Sample Page muestra el texto de ejemplo de WordPress y un enlace a /wp-admin/. Hello world tiene los comentarios abiertos y 1 comentario de ejemplo. |
| Búsqueda y 404 | `/?s=` usa `noindex, follow`. Una URL inexistente devuelve 404 con noindex (correcto). |
| Imágenes | 0 imágenes sin atributo alt, pero **las imágenes de producto y los logos de clientes tienen `alt=""`**: home 17/39, productos 9/10, nosotros 5/6. Algunos alt son nombres de archivo ("Foto-22-removebg-preview (1) 1", "Mega-tiendas-"). |
| Enlaces rotos | Los íconos **Facebook, Twitter y YouTube del footer son `<a>` sin `href`** en las 8 páginas. "Contacta a un asesor" en /productos/ apunta a `href="#"` y es visible. "Saber mas" en home apunta a `#` (oculto). |
| Redirecciones | http→https: 301. `http://www` → `https://www` → `https://apex`: 2 saltos. Hay enlaces internos sin barra final (`/productos`, `/contacto`) que causan un 301. `/sitemap.xml` y `/wp-sitemap.xml` redirigen con 301 a `/sitemap_index.xml`. |
| Enlaces externos | `wa.me/573197690990`: 302 a api.whatsapp.com, que responde 200. join.chat: 403 por el desafío de Cloudflare (no verificable). Instagram (`sameAs`): 302 a la página de login (no verificable). Detalle en `http/verificacion-enlaces.tsv`. |

## 3. Accesibilidad

### 3.1 axe-core 4.13.0

| Página | Disp. | Reglas violadas | Nodos | Crítico | Grave | Moderado |
|---|---|---|---|---|---|---|
| / | desktop | 3 | 11 | 0 | 2 | 1 |
| / | móvil | 3 | 8 | 0 | 2 | 1 |
| /productos/ | desktop | 3 | 45 | 0 | 2 | 1 |
| /productos/ | móvil | 3 | 45 | 0 | 2 | 1 |
| /nosotros/ | desktop | 2 | 8 | 0 | 1 | 1 |
| /nosotros/ | móvil | 2 | 8 | 0 | 1 | 1 |
| /contacto/ | desktop | 3 | 17 | 0 | 2 | 1 |
| /contacto/ | móvil | 3 | 17 | 0 | 2 | 1 |

Reglas encontradas:
- `color-contrast` (grave, WCAG 1.4.3):
  - Texto, placeholders y labels en #7a7a7a sobre blanco: **4,29:1**. Afecta a 37 nodos en /productos/.
  - Botón "Cotizar" blanco sobre #dfab3d: **2,09:1**.
  - axe dejó sin resolver (`incomplete`) 55 nodos en home, 19 en productos y 8 en contacto: texto sobre imágenes que requiere revisión manual.
- `aria-prohibited-attr` (grave): `.joinchat__close` tiene `aria-label` en un `div` sin `role`.
- `region` (moderado): contenido fuera de landmarks, entre 4 y 7 nodos.

### 3.2 Revisión manual (Playwright)

- **Formularios sin `<label>`**: los 3 formularios Elementor visibles de home y productos usan solo placeholder. Hay **IDs duplicados** (`form-field-name` y `form-field-email` aparecen 2 veces en home y en productos) y un `id="false"`. /contacto/ sí tiene labels visibles.
- **Foco visible** (40 pulsaciones de Tab por página, en desktop):
  - Los botones "Enviar" y "Cotizar" **no cambian ningún estilo al recibir el foco**.
  - Los enlaces muestran un contorno **punteado blanco de 1 px** (`rgb(255,255,255)`), apenas visible (captura `auditoria/capturas/tecnica/tecnica-foco-home-desktop.jpg`).
  - "Saber Mas" tiene un contorno de 0 px.
  - Elementos sin ningún cambio de estilo: 4 en home, 5 en productos, 3 en contacto y 0 en nosotros.
- **Botón de WhatsApp (Joinchat) inaccesible por teclado**: es un `div.joinchat__button` sin `role` ni `tabindex`. El ciclo de Tab vuelve a "Skip to content" sin llegar a él.
- **Objetivos táctiles** (390 px):
  - Las flechas del carrusel de home miden **20×20 px**, por debajo de los 24 px de WCAG 2.5.8.
  - El conmutador de menú mide 195×33 px.
  - Los botones Cotizar y Enviar miden 40 px de alto (menos de 44).
  - Los íconos sociales no cuentan porque, al no tener `href`, no son enfocables.
- Sin desbordamiento horizontal en móvil: `scrollWidth` = 390 en las 4 páginas.

## 4. Errores de carga

En las 16 cargas con Playwright (8 páginas × 2 dispositivos) se midió:
- 0 errores de consola;
- 0 `pageerror`;
- 0 peticiones fallidas;
- 0 respuestas 4xx/5xx;
- 0 recursos mixtos (http://);
- 0 fuentes con estado `error`.

Lighthouse `errors-in-console` pasó en las 8 corridas.

Observación: el CDN de Hostinger devuelve un **403 "Checking your browser…"** a algunos clientes que no son navegadores. Ejemplo: una imagen pedida con curl y solo `Accept-Encoding: gzip` o `br` recibió 403, mientras que la misma petición con cabeceras de navegador recibió 200. No se observó en navegadores.

## 5. Formularios (sin envío) y WhatsApp

| Página | Formulario | Plugin | Campos (obligatorio*) | Visible en |
|---|---|---|---|---|
| / | "Header" | Elementor Pro Forms | Nombre*, Email*, Mensaje; botón "Enviar" | solo desktop |
| / | "New Form" | Elementor Pro Forms | Nombre*, Email*; botón "Cotizar" | desktop y móvil (oculto en tablet) |
| / | `form_home1` | **Formidable Forms** | Nombre, Email, honeypot `frm_verify` | **oculto en todos los dispositivos** (se carga pero nunca se muestra) |
| /productos/ | 2× "New Form" | Elementor Pro Forms | Nombre*, Email*; "Cotizar" | todos |
| /contacto/ | "New Form" | Elementor Pro Forms | Nombre (opcional), Email*, Telefono* (`type=tel`), Mensaje; "Enviar" | todos |
| /uncategorized/hello-world/ | comentarios | WordPress | comentario, nombre, email, web | todos (comentarios abiertos) |

- **WPForms Lite** está instalado (su script se carga en todas las páginas), pero no hay formularios WPForms. Formidable carga su CSS en todas las páginas, aunque su único formulario está oculto.
- **Antispam**:
  - no hay reCAPTCHA, hCaptcha ni Turnstile;
  - ningún formulario Elementor tiene campo honeypot;
  - solo el formulario oculto de Formidable tiene honeypot;
  - Wordfence está instalado (namespace REST `wordfence/v1`).
- **Validación con el formulario vacío** (se usó `reportValidity()` sin pulsar Enviar):
  - Los campos obligatorios bloquean el envío nativo porque el formulario no tiene `novalidate`.
  - El email rechaza "correo-invalido".
  - **El patrón del teléfono `[0-9()#&+*-=.]+` es inválido para Chromium actual (flag `v`) y se ignora: el campo acepta "abc"**.
  - No hay atributos `autocomplete`, `minlength` ni `maxlength`.
  - Captura: `auditoria/capturas/tecnica/tecnica-formulario-contacto-desktop.jpg`.
- No se midió qué ocurre al enviar ni a qué correo o sistema llegan los datos.
- **Joinchat 4.5.11**:
  - Teléfono `573197690990` (+57 319 769 0990), que coincide con "Tel: 319 7690990" del footer.
  - Sin mensaje precargado (`message_send: ""`).
  - Saludo "Hola, como podemos ayudarte?" (sin tilde ni signo de apertura) y tooltip "Open chat" en inglés.
  - El botón aparece a los 3 s y el mensaje a los 10 s.
  - Muestra "Powered by Joinchat" y `mobile_only: false`.

## 6. Seguridad y mantenimiento (observación pasiva)

| Elemento | Observado | Referencia |
|---|---|---|
| PHP | `x-powered-by: PHP/7.4.33` en todas las respuestas HTML | php.net/eol: rama 7.4 sin soporte desde el 28-nov-2022; 7.4.33 fue la última versión |
| WordPress | 6.8.10, visible en `meta generator`, en el RSS y en `?ver=`; `readme.html` y `license.txt` responden 200 | api.wordpress.org ofrece 7.1.2 como versión actual |
| Elementor | 3.7.8 | actual 4.3.2 |
| Elementor Pro | 3.7.7 | CVE-2023-3124 (escalada de privilegios, suscriptor+) corregida en 3.11.7 |
| Formidable Forms | 5.5.2 (`frm.min.js?ver=5.5.2`) | actual 6.35; **CVE-2023-1405 (inyección de objetos PHP sin autenticación) corregida en 6.2** |
| WPForms Lite | 1.7.7.2 | actual 2.0.2.1 |
| Yoast SEO | 19.8 | actual 28.5 |
| Joinchat | 4.5.11 | actual 6.4.0 |
| Astra | 4.10.0 | actual 4.14.0 |
| Wordfence | presente (REST); versión no visible | actual 9.0.1 |

Las versiones de plugins se deducen del parámetro `?ver=` de sus recursos. No se confirmaron en el servidor.

- **Cabeceras de seguridad ausentes**: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy y COOP. La CSP solo contiene `upgrade-insecure-requests`.
- **Usuarios**: `/wp-json/wp/v2/users` devuelve 401 y `/?author=1` devuelve 404 (bloqueados). Sin embargo, **author-sitemap.xml y /author/admin/ son públicos** (slug "admin") y el RSS muestra `dc:creator` "admin". No se enumeró nada más.
- `xmlrpc.php`: 405 por GET ("XML-RPC server accepts POST requests only."), es decir, el endpoint está activo.
- `wp-login.php`: 200. `/wp-content/uploads/` y `/wp-includes/`: 403 (sin listado de directorios). `.htaccess` y `debug.log`: 403.
- Comentarios abiertos en "Hello world!" (`wp-comments-post.php` activo). Es un vector de spam.
- DNS: sin registro CAA, sin DNSSEC y DMARC con `p=none` sin `rua`.

## 7. Hosting, DNS y correo

| Registro | Valor | Interpretación |
|---|---|---|
| A (apex) | 212.1.212.148; 191.101.104.69 | RDAP: HOSTINGER-HOSTING y HOSTINGER-CDN |
| AAAA | 2a02:4780:22:c70c:…; 2a02:4780:1e:3d6d:… | rango de Hostinger |
| CNAME www | www.mundilacteos.com.cdn.hstgr.net (92.113.16.162, 92.113.23.30) | CDN de Hostinger |
| NS | ns1/ns2.dns-parking.com; SOA dns.hostinger.com, serial 2026092401 | DNS gestionado en Hostinger |
| MX | mx1.hostinger.com (5), mx2.hostinger.com (10); autodiscover → autodiscover.mail.hostinger.com | **el correo está en Hostinger Email** (no en Google ni Microsoft) |
| SPF | `v=spf1 include:_spf.mail.hostinger.com ~all` | correcto para Hostinger |
| DKIM | `hostingermail1._domainkey` con clave RSA publicada | activo |
| DMARC | `v=DMARC1; p=none` | solo monitoreo, sin reportes |
| ftp | 149.62.37.40 (HOSTINGER-HOSTING, BR) | probable servidor de origen (inferencia) |
| Registrador | **GoDaddy.com, LLC** (IANA 146); creado 2022-04-14, vence 2027-04-14; DNSSEC no | el dominio no está registrado en Hostinger |
| Certificado | Let's Encrypt YE2 (ECDSA), 2026-09-21 → 2026-12-20, SAN apex + www; el anterior (CertSpotter) cubría 2026-07-23 → 2026-10-21 | renovación automática funcionando |
| Cabeceras | `platform: hostinger`, `panel: hpanel`, `server: hcdn`, `x-hcdn-cache-status`, `alt-svc: h3` | hosting web de Hostinger con hPanel y CDN activo |

### 7.1 Qué permite Hostinger (documentación oficial consultada el 25-sep-2026)

| Capacidad | Planes según Hostinger | Fuente |
|---|---|---|
| Sitio HTML estático en `public_html` (File Manager o FTP) | planes web, cloud y agency | hostinger.com/support/4548688 |
| Despliegue Git (hPanel → Avanzado → Git) | "custom PHP and HTML websites hosted on web and cloud hosting plans"; conexión OAuth con GitHub o GitLab; auto-despliegue al hacer merge; destino `public_html` por defecto; sobrescribe archivos. No menciona pasos de build. | hostinger.com/support/1583302 (act. 15-sep-2026) |
| Apps Node.js | **Business Web** y Cloud (Startup, Professional, Enterprise, Enterprise Plus); Astro, Next.js, Vite, etc.; Node 18/20/22/24. **Se crean como sitio nuevo: hay que eliminar antes el sitio existente del dominio** | hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger (act. 15-sep-2026) |
| SSH, SFTP y rsync | **Premium Web o superior**, desactivado por defecto; no disponible en Single | hostinger.com/support/1583245 y /which-file-transfer… |
| Versiones PHP | seleccionables de 8.2 a 8.5 (8.3 por defecto); las anteriores a 8.2 están obsoletas y ocultas, y solo se fuerzan por `.htaccess` | hostinger.com/support/1575755 (act. 15-sep-2026) |
| CDN de Hostinger | "Premium Web, Business Web, Cloud or Agency" (artículo del CDN, act. 23-sep-2026). **Otra página de Hostinger dice "Business Web Hosting and above"** | hostinger.com/support/7935917 |

**Conclusión de despliegue sin WordPress:**
1. **Viable en cualquier plan web**: un sitio estático (HTML/CSS/JS, por ejemplo generado con Astro) publicado en `public_html` mediante la integración Git de hPanel o por FTP o File Manager. Como el documento de Git no menciona build, conviene publicar los archivos ya compilados, por ejemplo en una rama de despliegue generada con GitHub Actions.
2. Si el plan es Premium o superior, también se puede desplegar por SSH, SFTP o rsync.
3. Node.js (SSR) solo es posible en Business o Cloud y obliga a recrear el sitio. Un sitio estático no lo necesita.
4. Para los formularios sin WordPress se puede usar un endpoint PHP 8.3 propio en el mismo hosting, un servicio externo o el enlace de WhatsApp.
5. El CDN activo indica que el plan probablemente **no** es Single (inferencia basada en el artículo del CDN; hay una contradicción entre las dos páginas de Hostinger).

**Datos que faltan por confirmar con el cliente:**
- plan exacto y fecha de renovación;
- acceso a hPanel y a la cuenta de GoDaddy (registrador);
- cuentas de correo activas en Hostinger Email (hay que conservar MX, SPF y DKIM);
- si hay otros sitios en el mismo plan;
- por qué corre PHP 7.4 si hPanel ya no lo ofrece (posible override en `.htaccess`);
- a qué correo llegan hoy los formularios;
- quién es titular de la licencia de Elementor Pro y de la agencia "Bangboo" que figura en el footer;
- política de respaldos.

## 8. Incongruencias detectadas

1. Home dice "más de 11 años de experiencia" (h1 móvil) y "12 años en el mercado / 12 años" (contadores y tarjetas) en la misma página.
2. El h1 visible cambia según el dispositivo: "Atrae y fideliza más clientes" en desktop y "Productores de leche en polvo…" en móvil.
3. El footer muestra Facebook, Twitter y YouTube sin URL. El JSON-LD declara solo Instagram (`sameAs`).
4. El idioma declarado es inglés (`lang`, `og:locale` y `inLanguage`), pero el contenido está en español.
5. El JSON-LD y el RSS describen el sitio como "Just another WordPress site".
6. El sitio corre PHP 7.4.33, aunque la documentación de hPanel indica que las versiones anteriores a 8.2 ya no se pueden seleccionar.
7. Las páginas de Hostinger se contradicen sobre qué planes incluyen CDN (Premium+ o Business+).
8. Con curl el servidor responde HTTP/2, pero Chromium en este entorno recibe HTTP/1.1 por el proxy. Es un sesgo de medición, no un defecto del sitio.
9. "Nombre" es obligatorio en los formularios de home y productos, pero opcional en /contacto/.

## 9. No medido

- Datos de campo (CrUX/PageSpeed Insights): cuota de la API agotada (429). INP no medido.
- Lighthouse: una sola corrida por página y dispositivo; no se midió la tableta.
- crt.sh: 502 en 5 intentos; se usaron CertSpotter y el certificado en vivo.
- Envío real de formularios, destino de los leads y entregabilidad del correo.
- Plan de Hostinger, recursos (CPU, RAM, inodos), respaldos, configuración de hPanel y versión o configuración de Wordfence.
- Lista completa de plugins instalados: solo los visibles en HTML o REST.
- Existencia del perfil de Instagram (muro de login) y del destino de join.chat (desafío de Cloudflare).
- Pruebas con lector de pantalla, zoom al 400 % y navegación por teclado en móvil.
- Indexación real en Google de las páginas basura (sin Search Console).
- Veracidad de ISO 9001:2015 y del registro Invima (fuera del alcance técnico).

## 10. Archivos

- `lighthouse/lh-{pagina}-{mobile|desktop}.report.json`: JSON crudo, menos de 2 MB cada uno.
- `lighthouse/*.report.html.gz`: informe HTML comprimido.
- `lighthouse/resumen-lighthouse.json`: métricas extraídas.
- `axe/axe-{pagina}-{desktop|mobile}.json`: violaciones e incompletos de axe.
- `playwright/auditoria-dom-red-axe.json`: DOM, SEO, red, consola, foco, objetivos táctiles y axe de las 8 páginas × 2 dispositivos. En las 4 páginas principales en desktop, la red incluye una recarga usada para la prueba de foco.
- `playwright/validacion-formularios-red-limpia.json`: validación sin envío, red sin recarga y desbordamiento horizontal.
- `dns/`: respuestas DoH, RDAP de IPs y dominio, CertSpotter.
- `http/`: cabeceras por página, sitemaps y `verificacion-enlaces.tsv`.
- Capturas: `auditoria/capturas/tecnica/`. Ninguna página superó 9000 px de alto, así que no hubo recortes.

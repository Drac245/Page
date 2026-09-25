# Auditoría de mundilacteos.com

25 de septiembre de 2026 · Inversiones Mundilácteos S.A.S. · Anexo: [hallazgos-detallados.md](hallazgos-detallados.md) · Competencia: [competidores.md](competidores.md)

**Estado general.** El sitio (WordPress 6.8.10 sobre PHP 7.4.33, sin soporte desde 2022) es liviano pero lento en móvil, está desactualizado y es débil en SEO y accesibilidad.
Comercialmente falla: muestra 3 de 14 productos, rotula mezclas como leche y no permite cotizar, saber dónde comprar ni medir resultados.

## Hallazgos priorizados

**a) Código, rendimiento y SEO**

- LCP móvil de 6,26 s (mediana de 3 corridas; objetivo ≤ 2,5 s) y Performance de 58 a 68: el hero es un fondo CSS y el HTML no se cachea (TTFB de 1,09 a 1,98 s).
- 18 recursos bloquean el render; la home carga 25 JS y 320,6 KiB de fuentes.
- 0/8 páginas con meta description, `lang="en"`, 3 h1 en la home y 4 URL de ejemplo de WordPress indexables.
- Sin analítica: 0 etiquetas en 16 cargas.

**b) Diseño y UX**

- 0/5 formularios piden autorización de datos (Ley 1581) y no hay política publicada.
- La cotización tiene 2 campos (nombre y email); hay 0 enlaces tel:, mailto: o a puntos de venta.
- Contraste de botones: Cotizar 2,09:1 y Enviar 1,99:1 (mínimo 4,5:1). El menú móvil no abre con teclado.
- Sin sistema visual: 20 colores, 5 colores de botón y 14 tamaños de letra; logo de 70×57 px con 57 % de margen y 3 identidades distintas.

**c) Contenido y catálogo**

- 3 de 6 tarjetas muestran empaques que dicen "mezcla en polvo" bajo el nombre "leche en polvo".
- 3 productos publicados frente a 14 identificados; falta la descremada que vende Carulla y las fotos son anteriores al empaque "Nueva imagen".
- Datos contradictorios: 11 frente a 12 años, 4, 9 o 10 presentaciones de bolsa, Cartagena frente a Turbaco.
- ISO 9001:2015 sin ente, número ni vigencia; más de 20 errores ortográficos distintos.

**d) Hosting y mantenimiento**

- PHP sin parches desde hace 3 años y 9 meses y al menos 3 de 7 componentes con CVE públicas; faltan 6 cabeceras de seguridad.
- El dominio impreso en los sacos, mundilacteossas.com, no está registrado (RDAP 404).
- Hostinger admite un sitio estático en public_html (Git de hPanel o FTP); falta confirmar el plan. Dominio en GoDaddy, DNS y correo en Hostinger: no tocar MX, SPF ni DKIM.

## Prioridades para el rediseño

1. Cerrar riesgos antes de lanzar: registrar mundilacteossas.com, publicar la política de datos con casilla de autorización y actualizar o apagar el WordPress.
2. Construir el catálogo desde una lista maestra de SKU validada por el cliente: denominación legal INVIMA, gramajes, EAN, fotos vigentes y fichas con tabla nutricional.
3. Publicar un sitio estático en Hostinger con presupuesto: LCP ≤ 2,5 s, TTFB ≤ 0,8 s, ≤ 1 MB, contraste AA, `lang="es-CO"` y schema LocalBusiness y Product.
4. Convertir B2B y B2C: cotizador mayorista (producto, presentación, cantidad, ciudad, NIT), WhatsApp y tel: clicables y "Dónde comprar" con enlaces a cada cadena.
5. Unificar datos e identidad: logo oficial en SVG, un solo año de fundación, municipio y teléfono, certificados con número y vigencia y GA4 con consentimiento.

**No medido:** datos de campo (CrUX e INP), plan y panel de Hostinger, envío real de formularios, lector de pantalla y Safari real, Search Console y el sitio de Colanta (bloqueado).

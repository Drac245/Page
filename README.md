# Mundilácteos: rediseño del sitio web

Auditoría del sitio actual, análisis de competidores y dos conceptos de sitio nuevo para mundilacteos.com (septiembre de 2026).

## Enlaces (privados hasta compartirlos desde el menú Share de cada página)

- Presentación completa: https://claude.ai/artifact/Pan1b9ivWkdXo7Uo1jpcSY
- Concepto 1 «Paralelo 10», prototipo navegable: https://claude.ai/artifact/XF3krJWmpdwKERm255EeWu
- Concepto 2 «Peso neto», prototipo navegable: https://claude.ai/artifact/BHcz4tfZatisdjrVbzYmoS

## Contenido

- `auditoria/`: informe de 1 página (`informe-auditoria.md`), anexo con 97 hallazgos (`hallazgos-detallados.md`), análisis de 7 competidores (`competidores.md`), capturas desktop, móvil y tablet, y datos crudos (Lighthouse, axe, INVIMA, catálogo).
- `conceptos/compartido/`: paleta de marca (`MARCA.md`), guía de movimiento y tipografía (`EXPERIENCIA.md`), tendencias consolidadas y checklist (`TENDENCIAS.md`), catálogo verificado (`catalogo.js`) e imágenes del cliente.
- `conceptos/concepto-1/` y `conceptos/concepto-2/`: dirección visual (`DIRECCION.md`), entregable (`CONCEPTO.md`), prototipo (`index.html`, `estilos.css`, `app.js`) y capturas finales.
- `conceptos/herramientas/`: `preview.js` (vista local idéntica a la publicada) y `capturar.js` (capturas, desborde, errores y axe).
- `presentacion/`: página web que reúne todo.

## Publicación gratuita fuera de claude.ai

`docs/` contiene la presentación y los dos prototipos como sitio estático estándar (se regenera con `node conceptos/herramientas/exportar-sitio.js` después de cualquier cambio):

- `docs/index.html`: presentación
- `docs/concepto-1/`: prototipo «Paralelo 10»
- `docs/concepto-2/`: prototipo «Peso neto»

Con GitHub Pages (gratis en repositorios públicos): Settings → Pages → Build and deployment → Source: *Deploy from a branch* → rama `claude/mundilacteos-redesign-n9v8wx`, carpeta `/docs` → Save. Quedará en `https://drac245.github.io/Page/`, `…/Page/concepto-1/` y `…/Page/concepto-2/`.

Las páginas llevan `noindex` para que los buscadores no las indexen.

## Ver un prototipo en local

```
node conceptos/herramientas/preview.js conceptos/concepto-1
# abrir conceptos/concepto-1/_preview.html en el navegador
```

## Despliegue previsto

Sitio estático (HTML, CSS y JS generados a partir del catálogo) publicado en `public_html` del hosting actual en Hostinger, sin WordPress. El correo (MX, SPF, DKIM) sigue en Hostinger y no se toca.

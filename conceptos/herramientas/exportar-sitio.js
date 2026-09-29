// Exporta la presentación y los dos prototipos a /docs como sitio estático estándar
// (HTML completo con doctype), listo para GitHub Pages, Cloudflare Pages, Netlify o Hostinger.
// Uso: node conceptos/herramientas/exportar-sitio.js
// Estructura resultante:
//   docs/index.html            presentación
//   docs/concepto-1/index.html prototipo «Paralelo 10»
//   docs/concepto-2/index.html prototipo «Peso neto»
//   docs/v2/                   propuesta v2 (presentación y conceptos 3 y 4, ya en HTML completo)
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', '..');
const SALIDA = path.join(RAIZ, 'docs');

// Enlaces de claude.ai que en el sitio exportado pasan a rutas relativas.
const ENLACES = {
  'https://claude.ai/artifact/Pan1b9ivWkdXo7Uo1jpcSY': './',
  'https://claude.ai/artifact/XF3krJWmpdwKERm255EeWu': 'concepto-1/',
  'https://claude.ai/artifact/BHcz4tfZatisdjrVbzYmoS': 'concepto-2/',
  'https://drac245.github.io/Page/v2/': 'v2/',
};

const OMITIR = new Set(['_preview.html', 'capturas', 'verificacion-hero', 'original']);

function envolver(cuerpo) {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<style>
:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif;background:#fafafa}
img{max-width:100%}
[hidden]{display:none!important}
</style>
</head>
<body>
${cuerpo}
</body>
</html>
`;
}

function reemplazarEnlaces(texto, prefijo) {
  for (const [url, rel] of Object.entries(ENLACES)) texto = texto.split(url).join(prefijo + rel);
  return texto;
}

function copiar(origen, destino, prefijo) {
  for (const nombre of fs.readdirSync(origen)) {
    if (OMITIR.has(nombre) || nombre.endsWith('.md')) continue;
    const o = path.join(origen, nombre);
    const d = path.join(destino, nombre);
    if (fs.statSync(o).isDirectory()) {
      fs.mkdirSync(d, { recursive: true });
      copiar(o, d, prefijo);
    } else if (/\.(html|js|css)$/.test(nombre)) {
      let texto = fs.readFileSync(o, 'utf8');
      texto = reemplazarEnlaces(texto, prefijo);
      fs.writeFileSync(d, texto);
    } else {
      fs.copyFileSync(o, d);
    }
  }
}

function exportar(origenRel, destinoRel, prefijo) {
  const origen = path.join(RAIZ, origenRel);
  const destino = path.join(SALIDA, destinoRel);
  fs.mkdirSync(destino, { recursive: true });
  copiar(origen, destino, prefijo);
  const indice = path.join(destino, 'index.html');
  fs.writeFileSync(indice, envolver(fs.readFileSync(indice, 'utf8')));
}

fs.rmSync(SALIDA, { recursive: true, force: true });
fs.mkdirSync(SALIDA, { recursive: true });
exportar('presentacion', '', '');
exportar('conceptos/concepto-1', 'concepto-1', '../');
exportar('conceptos/concepto-2', 'concepto-2', '../');
// La propuesta v2 ya viene con doctype: se copia sin envolver.
fs.mkdirSync(path.join(SALIDA, 'v2'), { recursive: true });
copiar(path.join(RAIZ, 'propuesta-v2'), path.join(SALIDA, 'v2'), '../');
fs.writeFileSync(path.join(SALIDA, '.nojekyll'), '');
console.log('Sitio exportado en ' + SALIDA);

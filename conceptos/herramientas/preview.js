// Genera <concepto>/_preview.html envolviendo index.html con el mismo esqueleto
// que aplica la publicación como Artifact (doctype, charset, viewport y reset base),
// para revisar el prototipo en local exactamente como se verá publicado.
// Uso: node conceptos/herramientas/preview.js conceptos/concepto-1
const fs = require('fs');
const path = require('path');

const dir = path.resolve(process.argv[2] || '.');
const src = path.join(dir, 'index.html');
if (!fs.existsSync(src)) {
  console.error('No existe ' + src);
  process.exit(1);
}
const body = fs.readFileSync(src, 'utf8');
const skeleton = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>
:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif;background:#fafafa}
img{max-width:100%}
[hidden]{display:none!important}
</style>
</head>
<body>
${body}
</body>
</html>
`;
fs.writeFileSync(path.join(dir, '_preview.html'), skeleton);
console.log('OK ' + path.join(dir, '_preview.html'));

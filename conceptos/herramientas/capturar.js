// Captura y revisa un prototipo: por cada ruta (hash) toma capturas desktop y móvil,
// mide desborde horizontal, errores de consola e incidencias de accesibilidad (axe-core).
// Uso: NODE_PATH=$(npm root -g) node conceptos/herramientas/capturar.js conceptos/concepto-1 [salida] [rutas separadas por coma]
// Requiere haber generado _preview.html con preview.js.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const AXE = '/tmp/claude-0/-home-user-Page/82c95b4f-955a-5094-841c-d2c658789d1c/scratchpad/imgtool/node_modules/axe-core/axe.min.js';
const dir = path.resolve(process.argv[2] || '.');
const out = path.resolve(process.argv[3] || path.join(dir, 'capturas'));
const routes = (process.argv[4] || 'inicio,productos,nosotros,calidad,cobertura,cotizar,recursos').split(',').filter(Boolean);
const MAXH = 9000;

const devices = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  movil: {
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  },
};

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const url = 'file://' + path.join(dir, '_preview.html');
  const browser = await chromium.launch(process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY } } : {});
  const report = [];
  for (const [dev, opts] of Object.entries(devices)) {
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push(String(e)));
    page.on('requestfailed', r => errors.push('requestfailed ' + r.url()));
    for (const r of routes) {
      errors.length = 0;
      await page.goto(url + '#' + r, { waitUntil: 'load' });
      await page.waitForTimeout(700);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(res => setTimeout(res, 40)); }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(300);
      const m = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        height: document.documentElement.scrollHeight,
        title: document.title,
      }));
      const base = path.join(out, `${r}-${dev}`);
      await page.screenshot({ path: base + '-fold.jpg', type: 'jpeg', quality: 70 });
      const h = Math.min(m.height, MAXH);
      await page.screenshot({ path: base + '.jpg', type: 'jpeg', quality: 62, fullPage: true, clip: { x: 0, y: 0, width: opts.viewport.width, height: h } });
      let axe = null;
      try {
        await page.addScriptTag({ path: AXE });
        axe = await page.evaluate(async () => {
          const res = await window.axe.run(document, { resultTypes: ['violations'] });
          return res.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, ejemplo: v.nodes[0] && v.nodes[0].target.join(' ') }));
        });
      } catch (e) { axe = [{ id: 'axe-error', impact: 'n/a', nodes: 0, ejemplo: String(e) }]; }
      report.push({ ruta: r, dispositivo: dev, desborde: m.scrollWidth > m.clientWidth, scrollWidth: m.scrollWidth, clientWidth: m.clientWidth, alto: m.height, recortado: m.height > MAXH, errores: [...errors], axe });
      console.log(`${r} ${dev} alto=${m.height} desborde=${m.scrollWidth > m.clientWidth} errores=${errors.length} axe=${axe.length}`);
    }
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(out, 'reporte.json'), JSON.stringify(report, null, 1));
})().catch(e => { console.error(e); process.exit(1); });

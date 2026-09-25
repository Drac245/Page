// Verifica la geometría del globo de paralelos: cada línea del H1 debe quedar sobre blanco
// (fuera del círculo o dentro de la franja del titular) y la bajada, los botones y la credencial
// no deben tocar el círculo. Uso: NODE_PATH=$(npm root -g) node conceptos/concepto-1/verificacion-hero/verificar.js
const { chromium } = require('playwright');
const path = require('path');
(async()=>{
  const b = await chromium.launch();
  const vps=[[1920,1080,1],[1440,900,1],[1440,640,1],[1280,800,1],[1024,768,1],[900,600,1],[768,1024,1],[390,844,2],[375,667,2],[360,640,2],[320,568,2]];
  for (const variante of ['var-resp','var-foto']) for (const [w,h,dpr] of vps){
    const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:dpr});
    const p=await ctx.newPage(); await p.goto('file://'+path.join(__dirname,'hero.html'));
    await p.evaluate(v=>{document.body.className=v}, variante);
    await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(300);
    const r=await p.evaluate(()=>window.verificar());
    const ok = r.lineas.every(l=>l.holgura_sup>0&&l.holgura_inf>0) && r.choques.length===0;
    console.log(`${variante} ${w}x${h} fs=${r.lineas[0].fs} D=${r.D} franja=${r.franja_titular_px}px lineas=${r.lineas.map(l=>l.ancho+'px('+l.holgura_sup+'/'+l.holgura_inf+')').join(' ')} choques=${r.choques.length} boton=${r.boton_cotizar_bottom} ${ok?'OK':'FALLA'}`);
    if([1440,1280,390,375].includes(w)) await p.screenshot({path:path.join(__dirname,'capturas',`${variante}-${w}.png`)});
    await ctx.close();
  }
  await b.close();
})();

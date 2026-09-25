/* Mundilácteos. Concepto 1: Paralelo 10. Prototipo navegable.
   Router por hash, catálogo desde window.CATALOGO, Mi cotización persistente (localStorage en try/catch),
   transiciones entre vistas (View Transitions), vuelo FLIP al agregar y microinteracciones.
   Sin librerías. Todo el contenido existe sin movimiento; el movimiento se suma encima. */
(function () {
  'use strict';

  var C = window.CATALOGO;
  if (!C) return;

  /* ---------------------------------------------------------------------------
     Utilidades
     --------------------------------------------------------------------------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var NNBSP = ' ';
  var CLAVE_COTIZACION = 'mundi.c1.cotizacion.v1';
  var INVIMA = C.calidad.verificar_registro_url;
  var reducido = function () { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; };
  var escritorio = function () { return window.matchMedia('(min-width: 1024px)').matches; };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmt(n, dec) {
    return Number(n).toLocaleString('es-CO', { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 });
  }
  function kg(n) { return fmt(n, 1) + NNBSP + 'kg'; }
  function fechaCO(iso) { return iso.split('-').reverse().join('/'); }
  function presKey(contenido) { return contenido.toLowerCase().replace(',', '-').replace(/\s+/g, '-'); }
  function conUnidad(contenido) { return contenido.replace(' ', NNBSP); }
  function plural(n, uno, varios) { return n === 1 ? uno : varios; }
  function normal(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }
  function waUrl(texto) { return 'https://wa.me/' + C.empresa.whatsapp + '?text=' + encodeURIComponent(String(texto).replace(/\u202F/g, ' ')); }
  function icono(id, extra) { return '<svg class="ico ' + (extra || '') + '" aria-hidden="true"><use href="#' + id + '"/></svg>'; }
  var CHECK = '<span class="chip-marca" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4.2 8.4l2.5 2.4 5.1-5.3"/></svg></span>';
  function porConfirmar(texto) { return '<span class="por-confirmar">' + esc(texto || 'dato a confirmar') + '</span>'; }
  function nw(t) { return '<span class="nw">' + t + '</span>'; }
  /* Presentaciones con punto de miles, como en el empaque: «1.000 g» */
  function miles(c) { return String(c).replace(/^(\d)(\d{3})(?=\s)/, '$1.$2'); }

  var MARCAS = {}; C.marcas.forEach(function (m) { MARCAS[m.id] = m; });
  var CATS = {}; C.categorias.forEach(function (c) { CATS[c.id] = c; });
  var REGS = {}; C.calidad.registros.forEach(function (r) { REGS[r.numero] = r; });
  var PRODS = C.productos;
  /* Una mezcla láctea nunca se rotula como «leche»: el nombre de trabajo del catálogo se muestra con su tipo delante.
     El nombre comercial lo confirma el cliente. */
  var NOMBRES_MEZCLA = { 'cafe-con-leche-panela': 'Mezcla láctea con café y panela' };
  PRODS.forEach(function (p) {
    if (NOMBRES_MEZCLA[p.slug]) { p.nombre_catalogo = p.nombre; p.nombre = NOMBRES_MEZCLA[p.slug]; p.nombre_por_confirmar = true; }
  });
  var TIPO_CORTO = { 'leche-entera': 'Entera', 'leche-descremada': 'Descremada', 'leche-azucarada': 'Azucarada', 'mezcla-lactea': 'Mezcla láctea', 'alimento-lacteo': 'Alimento lácteo' };
  var USO_CORTO = { hogar: 'Hogar', tienda: 'Tienda', panaderia: 'Panadería', industria: 'Industria', institucional: 'Institucional' };
  var DIM = {
    'becerrita-entera-380g.webp': [241, 350], 'becerrita-entera-900g.webp': [247, 374], 'becerrita-mezcla-bulto-25kg.webp': [318, 458],
    'cantaro-azucarada-380g.webp': [283, 374], 'cantaro-azucarada-900g-380g.webp': [392, 270], 'cantaro-entera-500g.webp': [273, 386],
    'cantaro-entera-800g.webp': [240, 354], 'cantaro-entera-bulto-25kg.webp': [266, 461], 'cantaro-mezcla-900g.webp': [284, 397],
    'cantaro-mezcla-bulto-12-5kg.webp': [317, 443], 'cantaro-azucarada-380g-b.webp': [258, 337]
  };

  function producto(slug) { for (var i = 0; i < PRODS.length; i++) if (PRODS[i].slug === slug) return PRODS[i]; return null; }
  function presentacion(p, key) { for (var i = 0; i < p.presentaciones.length; i++) if (presKey(p.presentaciones[i].contenido) === key) return p.presentaciones[i]; return null; }
  function esBulto(pr) { return pr.formato === 'bulto'; }
  function nombreBase(p) { return p.nombre.replace(/ en bulto$/, ''); }
  function referencia(p, pr) { return nombreBase(p) + ' ' + conUnidad(pr.contenido); }
  function esMezcla(p) { return p.categoria === 'mezcla-lactea'; }

  /* Presentación por defecto: la más completa (confirmada, con EAN y rinde); si no, la confirmada con foto; si no, la primera confirmada.
     La foto de otra presentación se muestra como referencia, rotulada. */
  function presPorDefecto(p) {
    var ps = p.presentaciones;
    if (!ps.length) return null;
    var conf = ps.filter(function (x) { return x.estado === 'confirmado'; });
    var completas = conf.filter(function (x) { return x.ean && x.rinde; });
    if (completas.length) return completas.sort(function (a, b) { return b.gramos - a.gramos; })[0];
    for (var i = 0; i < conf.length; i++) if (conf[i].imagen && conf[i].imagen === p.imagen) return conf[i];
    return conf[0] || ps[0];
  }
  /* Imagen que se muestra para una presentación: la propia o la del producto como referencia */
  function imagenDe(p, pr) {
    var archivo = (pr && pr.imagen) || p.imagen;
    if (!archivo) return null;
    var dueña = null;
    p.presentaciones.forEach(function (x) { if (x.imagen === archivo && !dueña) dueña = x; });
    var d = DIM[archivo] || [300, 400];
    var tipo = dueña && esBulto(dueña) ? 'bulto' : 'bolsa';
    var alt = nombreBase(p) + ', ' + tipo + (dueña ? ' de ' + conUnidad(dueña.contenido) : '');
    if (archivo === 'cantaro-azucarada-900g-380g.webp') alt = 'The Cántaro Azucarada, bolsas de 900 g y 380 g';
    var ref = !!(pr && !pr.imagen && dueña && dueña !== pr);
    if (ref) alt += ', foto de referencia de la presentación de ' + conUnidad(pr.contenido);
    return { src: 'img/r-' + archivo, w: d[0], h: d[1], alt: alt, referencia: ref, de: dueña ? dueña.contenido : null };
  }

  function rindeDe(p, pr) {
    if (pr.rinde) {
      var m = pr.rinde.match(/^([\d,]+)\s*litros/);
      var por = pr.rinde.match(/([\d,]+)\s*porciones/);
      if (m) return { texto: m[1] + NNBSP + 'L por bolsa', litros: parseFloat(m[1].replace(',', '.')), fuente: 'empaque', porciones: por ? por[1] : null };
    }
    if (esBulto(pr) && p.categoria === 'leche-entera') {
      var L = pr.gramos / C.calidad.preparacion.g_por_litro;
      return { texto: 'Cerca de ' + fmt(Math.round(L)) + NNBSP + 'L por bulto', litros: L, fuente: 'ficha', confirmar: true };
    }
    return null;
  }
  function ventaDe(pr) {
    if (esBulto(pr)) return { unidad: 'bulto', unidades: 'bultos', texto: 'Por bulto de ' + conUnidad(pr.contenido), kgUnidad: pr.gramos / 1000 };
    var n = pr.unidades_por_paca;
    if (!n) return { unidad: 'paca', unidades: 'pacas', texto: 'Consultar', kgUnidad: null };
    return { unidad: 'paca', unidades: 'pacas', texto: 'Paca de ' + n + ' bolsas, ' + kg(n * pr.gramos / 1000), kgUnidad: n * pr.gramos / 1000, bolsas: n };
  }

  function datosVentaHTML(p, pr) {
    var v = ventaDe(pr), r = rindeDe(p, pr);
    var h = '<dt>Venta</dt><dd>' + esc(v.texto) + '</dd>';
    h += '<dt>Rinde</dt><dd>' + (r ? esc(r.texto) + (r.confirmar ? ' ' + porConfirmar() : '') : porConfirmar()) + '</dd>';
    if (r && r.fuente === 'empaque' && v.bolsas) h += '<dt>Por paca</dt><dd>' + fmt(r.litros * v.bolsas) + NNBSP + 'L</dd>';
    h += '<dt>EAN</dt><dd>' + (pr.ean ? '<span class="num">' + pr.ean + '</span>' : porConfirmar()) + '</dd>';
    if (pr.estado === 'por_confirmar') h += '<dt>Estado</dt><dd>' + porConfirmar('presentación por confirmar') + '</dd>';
    return h;
  }

  function chipsPresentacion(p, nombre, sel) {
    return p.presentaciones.map(function (pr) {
      var k = presKey(pr.contenido);
      var ast = pr.estado === 'por_confirmar' ? '<span class="ast" aria-hidden="true">*</span><span class="sr"> (dato a confirmar)</span>' : '';
      return '<label class="chip"><input type="radio" name="' + nombre + '" value="' + k + '"' + (sel && presKey(sel.contenido) === k ? ' checked' : '') + '><span class="chip-cara">' + CHECK + esc(conUnidad(miles(pr.contenido))) + ast + '</span></label>';
    }).join('');
  }
  function tieneAsterisco(p) { return p.presentaciones.some(function (x) { return x.estado === 'por_confirmar'; }); }

  function copiarTexto(texto) {
    return new Promise(function (ok, falla) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(texto).then(ok, function () { respaldo() ? ok() : falla(); });
        } else if (respaldo()) ok(); else falla();
      } catch (e) { respaldo() ? ok() : falla(); }
      function respaldo() {
        try {
          var t = document.createElement('textarea');
          t.value = texto; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
          document.body.appendChild(t); t.select();
          var r = document.execCommand('copy'); t.remove(); return r;
        } catch (e) { return false; }
      }
    });
  }

  var anuncio = $('#anuncio');
  function anunciar(texto) {
    anuncio.textContent = '';
    window.setTimeout(function () { anuncio.textContent = texto; }, 60);
  }

  /* ---------------------------------------------------------------------------
     Mi cotización (localStorage solo aquí, siempre en try/catch)
     --------------------------------------------------------------------------- */
  var Q = { items: [], memoria: false };
  function cargarQ() {
    try {
      var v = window.localStorage.getItem(CLAVE_COTIZACION);
      var arr = v ? JSON.parse(v) : [];
      Q.items = Array.isArray(arr) ? arr.filter(function (i) { var p = producto(i.s); return p && presentacion(p, i.p) && i.n > 0; }) : [];
    } catch (e) { Q.items = []; Q.memoria = true; }
  }
  function guardarQ() {
    try { window.localStorage.setItem(CLAVE_COTIZACION, JSON.stringify(Q.items)); } catch (e) { Q.memoria = true; }
  }
  function itemQ(s, k) { for (var i = 0; i < Q.items.length; i++) if (Q.items[i].s === s && Q.items[i].p === k) return Q.items[i]; return null; }
  function lineaInfo(i) {
    var p = producto(i.s), pr = presentacion(p, i.p), v = ventaDe(pr);
    return { p: p, pr: pr, v: v, kg: v.kgUnidad ? v.kgUnidad * i.n : null, ref: referencia(p, pr) };
  }
  function totalesQ() {
    var pacas = 0, bultos = 0, total = 0, sinDato = false;
    Q.items.forEach(function (i) {
      var L = lineaInfo(i);
      if (L.v.unidad === 'bulto') bultos += i.n; else pacas += i.n;
      if (L.kg != null) total += L.kg; else sinDato = true;
    });
    var partes = [];
    if (pacas) partes.push(pacas + ' ' + plural(pacas, 'paca', 'pacas'));
    if (bultos) partes.push(bultos + ' ' + plural(bultos, 'bulto', 'bultos'));
    return { texto: partes.join(' y '), kg: total, sinDato: sinDato };
  }
  function textoLineaWA(i) {
    var L = lineaInfo(i);
    var s = L.ref + ', ' + i.n + ' ' + plural(i.n, L.v.unidad, L.v.unidades);
    if (L.kg != null) s += ' (' + kg(L.kg) + ')';
    return s;
  }
  function mensajeCotizacion(ciudad, negocio) {
    if (!Q.items.length) return 'Hola, Mundilácteos. Quiero cotizar leche en polvo para mi negocio en ____.';
    return 'Hola, Mundilácteos. Quiero cotizar: ' + Q.items.map(textoLineaWA).join('; ') + '. Ciudad: ' + (ciudad || '____') + '. Negocio: ' + (negocio || '____') + '.';
  }
  function codificarQ() { return Q.items.map(function (i) { return i.s + '.' + i.p + '.' + i.n; }).join('_'); }
  function decodificarQ(s) {
    return String(s || '').split('_').map(function (t) {
      var a = t.split('.'); var p = producto(a[0]); var n = parseInt(a[2], 10);
      return p && presentacion(p, a[1]) && n > 0 ? { s: a[0], p: a[1], n: Math.min(n, 999) } : null;
    }).filter(Boolean);
  }

  var deshacerPendiente = null, avisoTimer = null, avisoPausa = false, avisoActivo = null;
  var AVISO_MS = 10000;
  function cerrarAviso() {
    window.clearTimeout(avisoTimer);
    ['#aviso', '#panel-aviso'].forEach(function (s) { var el = $(s); if (el) el.hidden = true; });
    avisoActivo = null; deshacerPendiente = null;
  }
  function programarCierre() {
    window.clearTimeout(avisoTimer);
    avisoTimer = window.setTimeout(function () { if (!avisoPausa) cerrarAviso(); else programarCierre(); }, AVISO_MS);
  }
  function aviso(texto, deshacer) {
    cerrarAviso();
    var enPanel = !$('#panel-cotizacion').hidden;
    var el = $(enPanel ? '#panel-aviso' : '#aviso');
    $(enPanel ? '#panel-aviso-texto' : '#aviso-texto').textContent = texto;
    deshacerPendiente = deshacer || null;
    $('[data-deshacer]', el).hidden = !deshacer;
    el.hidden = false; el.classList.remove('entra'); void el.offsetWidth; el.classList.add('entra');
    avisoActivo = el; avisoPausa = false;
    anunciar(texto + (deshacer ? ' Puede deshacer desde el aviso.' : ''));
    programarCierre();
  }
  ['#aviso', '#panel-aviso'].forEach(function (sel) {
    var el = $(sel);
    el.addEventListener('mouseenter', function () { avisoPausa = true; });
    el.addEventListener('mouseleave', function () { avisoPausa = false; });
    el.addEventListener('focusin', function () { avisoPausa = true; });
    el.addEventListener('focusout', function () { avisoPausa = false; });
    $('[data-deshacer]', el).addEventListener('click', function () {
      var fn = deshacerPendiente;
      cerrarAviso();
      if (fn) fn();
      anunciar('Cambio deshecho.');
      if (sel === '#panel-aviso') { var t = $('#panel-titulo'); t.setAttribute('tabindex', '-1'); t.focus(); }
    });
  });

  function fijarQ(items) { Q.items = items; guardarQ(); refrescarCotizacion(); }
  function agregarQ(s, k, n, origen) {
    var antes = JSON.parse(JSON.stringify(Q.items));
    var it = itemQ(s, k);
    if (it) it.n = Math.min(999, it.n + n); else Q.items.push({ s: s, p: k, n: n });
    guardarQ();
    var p = producto(s), pr = presentacion(p, k), v = ventaDe(pr);
    refrescarSinConteo();
    vuelo(origen).then(function () { pintarConteoCabecera(true); });
    var total = Q.items.length;
    aviso(referencia(p, pr) + ' agregada, ' + n + ' ' + plural(n, v.unidad, v.unidades) + '. Su cotización tiene ' + total + ' ' + plural(total, 'referencia', 'referencias') + '.', function () { fijarQ(antes); });
  }
  function quitarQ(s, k) {
    var antes = JSON.parse(JSON.stringify(Q.items));
    var p = producto(s), pr = presentacion(p, k);
    Q.items = Q.items.filter(function (i) { return !(i.s === s && i.p === k); });
    guardarQ(); refrescarCotizacion();
    aviso(referencia(p, pr) + ' quitada de su cotización.', function () { fijarQ(antes); });
  }
  function cantidadQ(s, k, n) {
    var it = itemQ(s, k); if (!it) return;
    it.n = Math.max(1, Math.min(999, n || 1)); guardarQ(); refrescarCotizacion();
  }

  /* Vuelo FLIP: una miniatura del empaque vuela en arco hasta «Cotizar» */
  function vuelo(origen) {
    return new Promise(function (fin) {
      var destino = $('#btn-cotizar');
      if (!origen || !destino || reducido() || !origen.getBoundingClientRect || !Element.prototype.animate) { fin(); return; }
      var a = origen.getBoundingClientRect(), b = destino.getBoundingClientRect();
      if (!a.width || !b.width) { fin(); return; }
      var clon = origen.cloneNode(false);
      clon.removeAttribute('style'); clon.className = 'vuelo'; clon.alt = ''; clon.removeAttribute('data-vt-pack');
      clon.style.left = a.left + 'px'; clon.style.top = a.top + 'px'; clon.style.width = a.width + 'px'; clon.style.height = a.height + 'px';
      document.body.appendChild(clon);
      var dx = (b.left + b.width / 2) - (a.left + a.width / 2), dy = (b.top + b.height / 2) - (a.top + a.height / 2);
      var escala = Math.max(0.12, Math.min(1, 36 / a.height));
      var anim = clon.animate([
        { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
        { transform: 'translate(' + dx * 0.45 + 'px, ' + (dy * 0.45 - 90) + 'px) scale(' + (0.5 + escala / 2) + ') rotate(-8deg)', opacity: 1, offset: 0.5 },
        { transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + escala + ') rotate(-3deg)', opacity: 0.3 }
      ], { duration: 520, easing: 'cubic-bezier(.2,.7,.2,1)' });
      anim.onfinish = function () { clon.remove(); fin(); };
      anim.oncancel = function () { clon.remove(); fin(); };
    });
  }

  /* La cifra de «Cotizar (n)» rueda */
  var conteoAnterior = null;
  function pintarConteoCabecera(animar) {
    var n = Q.items.length, caja = $('#btn-cotizar .conteo-caja'), rueda = $('#btn-cotizar .rueda');
    caja.hidden = n === 0;
    if (conteoAnterior === n) return;
    if (animar && conteoAnterior != null && !reducido() && n > 0) {
      var viejo = rueda.firstElementChild;
      var nuevo = document.createElement('span'); nuevo.textContent = n; nuevo.className = 'entra';
      if (viejo) { viejo.className = 'sale'; window.setTimeout(function () { viejo.remove(); }, 260); }
      rueda.appendChild(nuevo);
    } else {
      rueda.innerHTML = '<span>' + n + '</span>';
    }
    conteoAnterior = n;
  }

  function refrescarSinConteo() {
    $$('[data-agregar]').forEach(pintarBotonAgregar);
    if (!$('#panel-cotizacion').hidden) pintarPanel();
    if (rutaActual && rutaActual.vista === 'cotizar') pintarListaCotizar();
  }
  function refrescarCotizacion(animar) {
    pintarConteoCabecera(animar);
    $$('[data-agregar]').forEach(pintarBotonAgregar);
    if (!$('#panel-cotizacion').hidden) pintarPanel();
    if (rutaActual && rutaActual.vista === 'cotizar') pintarListaCotizar();
  }

  /* ---------------------------------------------------------------------------
     Líneas de la cotización (panel y página Cotizar)
     --------------------------------------------------------------------------- */
  function lineasHTML(prefijo) {
    return '<ul class="lineas">' + Q.items.map(function (i) {
      var L = lineaInfo(i), im = imagenDe(L.p, L.pr);
      var id = prefijo + '-' + i.s + '-' + i.p;
      return '<li class="linea" data-linea="' + i.s + '|' + i.p + '">' + miniEscena(L.p, L.pr) +
        '<p class="linea-nombre"><a href="#producto-' + i.s + '~' + i.p + '">' + esc(L.ref) + '</a></p>' +
        '<div class="linea-control">' +
          '<span class="paso"><button type="button" data-paso="-1" aria-label="Quitar una ' + L.v.unidad + ' de ' + esc(L.ref) + '"' + (i.n <= 1 ? ' disabled' : '') + '>' + icono('i-menos') + '</button>' +
          '<label class="sr" for="' + id + '">Cantidad de ' + L.v.unidades + ' de ' + esc(L.ref) + '</label>' +
          '<input id="' + id + '" type="text" inputmode="numeric" pattern="[0-9]*" value="' + i.n + '" data-cantidad>' +
          '<button type="button" data-paso="1" aria-label="Agregar una ' + L.v.unidad + ' de ' + esc(L.ref) + '">' + icono('i-mas') + '</button></span>' +
          '<span>' + plural(i.n, L.v.unidad, L.v.unidades) + '</span>' +
          '<span class="linea-kg">' + (L.kg != null ? kg(L.kg) : porConfirmar('peso a confirmar')) + '</span>' +
          '<button class="linea-quitar" type="button" data-quitar-linea>Quitar<span class="sr"> ' + esc(L.ref) + '</span></button>' +
        '</div></li>';
    }).join('') + '</ul>';
  }
  /* Miniatura del empaque sobre su franja con arco y sombra de contacto (cotización y comparador) */
  function miniEscena(p, pr) {
    var im = imagenDe(p, pr);
    return '<span class="linea-escena" aria-hidden="true">' + (im ? '<img src="' + im.src + '" width="' + im.w + '" height="' + im.h + '" alt="">'
      : '<span class="linea-img-vacia"><svg width="28" height="38" viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="2"><use href="#p-' + (pr && esBulto(pr) ? 'bulto' : 'bolsa') + '"/></svg></span>') + '</span>';
  }
  function totalesHTML() {
    var t = totalesQ();
    return '<p class="totales" aria-live="polite"><span>' + t.texto + '</span><span>' + kg(t.kg) + (t.sinDato ? ' ' + porConfirmar('parcial') : '') + '</span></p>';
  }
  function avisoAlmacenHTML() {
    return Q.memoria ? '<p class="aviso-almacen">Este navegador no guarda la cotización. Envíela antes de cerrar la página o copie el enlace.</p>' : '';
  }
  function delegarLineas(cont) {
    cont.addEventListener('click', function (e) {
      var li = e.target.closest('[data-linea]'); if (!li) return;
      var par = li.getAttribute('data-linea').split('|');
      var paso = e.target.closest('[data-paso]');
      if (paso) { var it = itemQ(par[0], par[1]); if (it) { cantidadQ(par[0], par[1], it.n + parseInt(paso.getAttribute('data-paso'), 10)); enfocarDespues(cont, par, paso.getAttribute('data-paso')); } }
      if (e.target.closest('[data-quitar-linea]')) {
        quitarQ(par[0], par[1]);
        window.requestAnimationFrame(function () {
          var sig = cont.querySelector('[data-quitar-linea]') || document.getElementById(cont.id === 'panel-cuerpo' ? 'panel-titulo' : 'h2-lista');
          if (sig) { if (!sig.hasAttribute('tabindex') && sig.tagName === 'H2') sig.setAttribute('tabindex', '-1'); sig.focus(); }
        });
      }
    });
    cont.addEventListener('change', function (e) {
      if (!e.target.matches('[data-cantidad]')) return;
      var li = e.target.closest('[data-linea]'); var par = li.getAttribute('data-linea').split('|');
      cantidadQ(par[0], par[1], parseInt(e.target.value.replace(/\D/g, ''), 10) || 1);
    });
  }
  function enfocarDespues(cont, par, dir) {
    window.requestAnimationFrame(function () {
      var li = cont.querySelector('[data-linea="' + par[0] + '|' + par[1] + '"]');
      var b = li && li.querySelector('[data-paso="' + dir + '"]');
      if (b && !b.disabled) b.focus(); else if (li) li.querySelector('[data-cantidad]').focus();
    });
  }

  /* Panel Mi cotización */
  var panel = $('#panel-cotizacion'), velo = $('#velo'), panelOrigen = null;
  function pintarPanel() {
    var cuerpo = $('#panel-cuerpo'), pie = $('#panel-pie');
    if (!Q.items.length) {
      cuerpo.innerHTML = '<div class="lista-vacia"><p>Su cotización está vacía. Agregue presentaciones desde Productos.</p><a class="btn btn-primario" href="#productos">Ver productos</a></div>' + avisoAlmacenHTML();
      pie.innerHTML = '';
      return;
    }
    cuerpo.innerHTML = lineasHTML('pq') + avisoAlmacenHTML();
    var msg = mensajeCotizacion();
    pie.innerHTML = totalesHTML() +
      '<a class="btn btn-primario btn-ancho" href="#cotizar">Solicitar cotización</a>' +
      '<div class="acciones"><a class="btn btn-secundario" href="' + esc(waUrl(msg)) + '" target="_blank" rel="noopener">' + icono('i-wa', 'ico-relleno') + 'Enviar por WhatsApp</a>' +
      '<button class="btn btn-texto" type="button" data-copiar-enlace>' + icono('i-enlace') + 'Copiar enlace</button>' +
      '<button class="btn btn-texto" type="button" data-vaciar>Vaciar la cotización</button></div>' +
      '<p class="mensaje-wa">Mensaje que se enviará al 319 769 0990: <q>' + esc(msg) + '</q></p>';
  }
  delegarLineas($('#panel-cuerpo'));
  function abrirPanel(origen) {
    cerrarAviso();
    panelOrigen = origen || document.activeElement;
    pintarPanel();
    panel.hidden = false; velo.hidden = false;
    panel.classList.remove('abierto'); void panel.offsetWidth; panel.classList.add('abierto');
    velo.classList.add('entra');
    document.documentElement.style.overflow = 'hidden';
    window.setTimeout(function () { $('#panel-titulo').setAttribute('tabindex', '-1'); $('#panel-titulo').focus(); }, 30);
  }
  function cerrarPanel(devolver) {
    if (panel.hidden) return;
    if (avisoActivo && avisoActivo.id === 'panel-aviso') cerrarAviso();
    panel.hidden = true; velo.hidden = true;
    document.documentElement.style.overflow = '';
    if (devolver !== false && panelOrigen && panelOrigen.focus) panelOrigen.focus();
  }
  velo.addEventListener('click', function () { cerrarPanel(); cerrarHojaFiltros(); });
  panel.addEventListener('click', function (e) {
    if (e.target.closest('[data-cerrar-panel]')) cerrarPanel();
    else if (e.target.closest('a[href^="#"]')) cerrarPanel(false);
  });
  $('#btn-cotizar').addEventListener('click', function (e) {
    e.preventDefault();
    abrirPanel(this);
  });

  /* Acciones comunes por delegación */
  document.addEventListener('click', function (e) {
    var copiar = e.target.closest('[data-copiar]');
    if (copiar) {
      var numero = copiar.getAttribute('data-copiar');
      copiarTexto(numero).then(function () {
        copiar.classList.add('copiado');
        var t = copiar.querySelector('span:not(.sr)'); var antes = t.textContent, hecho = copiar.getAttribute('data-copiado');
        t.textContent = hecho || 'Número copiado';
        anunciar(hecho ? hecho + '.' : 'Número ' + numero + ' copiado.');
        window.setTimeout(function () { copiar.classList.remove('copiado'); t.textContent = antes; }, 2000);
      }, function () { aviso('No se pudo copiar. El texto es: ' + numero + '.'); });
      return;
    }
    if (e.target.closest('[data-copiar-enlace]')) {
      var url = location.href.split('#')[0] + '#cotizar~c-' + codificarQ();
      copiarTexto(url).then(function () { aviso('Enlace de la cotización copiado. Un asesor puede abrirlo con la lista armada.'); }, function () { aviso('Copie este enlace: ' + url); });
      return;
    }
    if (e.target.closest('[data-vaciar]')) {
      var antes = JSON.parse(JSON.stringify(Q.items));
      fijarQ([]);
      aviso('Cotización vaciada.', function () { fijarQ(antes); });
      return;
    }
    var agregar = e.target.closest('[data-agregar]');
    if (agregar) { accionAgregar(agregar); return; }
    var ir = e.target.closest('[data-ir]');
    if (ir && !e.target.closest('a, button, input, label')) { location.hash = ir.getAttribute('data-ir'); return; }
    var ancla = e.target.closest('[data-ancla]');
    if (ancla) {
      e.preventDefault();
      var destino = document.getElementById(ancla.getAttribute('data-ancla'));
      if (destino) {
        if (destino.tagName === 'DETAILS') destino.open = true;
        destino.scrollIntoView({ behavior: reducido() ? 'auto' : 'smooth', block: 'start' });
        var s = destino.querySelector('summary') || destino; s.setAttribute('tabindex', s.tagName === 'SUMMARY' ? '0' : '-1');
        s.focus({ preventScroll: true });
      }
      return;
    }
    var enlace = e.target.closest('a[href^="#"]');
    if (enlace && enlace.getAttribute('href') === location.hash && !enlace.hasAttribute('data-saltar')) {
      e.preventDefault();
      window.scrollTo(0, 0);
      enfocarH1();
    }
  });

  $('[data-saltar]').addEventListener('click', function (e) {
    e.preventDefault();
    var h1 = $('main h1:not([hidden])');
    var visible = $$('main h1').filter(function (h) { return h.offsetParent !== null; })[0];
    (visible || h1 || $('#contenido')).focus();
  });

  /* ---------------------------------------------------------------------------
     Buscador del mostrador (combobox con sinónimos)
     --------------------------------------------------------------------------- */
  var SINONIMOS = { kilo: 'kg', kilos: 'kg', k: 'kg', kgs: 'kg', kilogramos: 'kg', gramos: 'g', gr: 'g', grs: 'g', gramo: 'g', saco: 'bulto', costal: 'bulto', sacos: 'bulto', bultos: 'bulto', fardo: 'paca', pacas: 'paca', azucar: 'azucarada', dulce: 'azucarada', cantaro: 'cantaro', becerrita: 'becerrita', mezcla: 'mezcla', descremada: 'descremada', deslactosada: 'descremada' };
  function tokens(q) {
    var t = normal(q).replace(/,/g, '.').replace(/(\d)(kg|g|k|kilos?|gr|grs)\b/g, '$1 $2').split(/[\s_]+/).filter(Boolean);
    return t.map(function (x) { return SINONIMOS[x] || x; }).filter(function (x) { return ['de', 'la', 'el', 'en', 'the', 'leche', 'polvo', 'x'].indexOf(x) === -1 || x === 'leche'; });
  }
  function pajar(p, pr) {
    var s = [p.nombre, p.denominacion, MARCAS[p.marca].nombre, CATS[p.categoria].nombre, p.registro, TIPO_CORTO[p.categoria]];
    var prs = pr ? [pr] : p.presentaciones;
    prs.forEach(function (x) {
      s.push(x.contenido.replace(',', '.'), x.contenido.replace(' ', '').replace(',', '.'), x.formato, x.ean || '');
      s.push(esBulto(x) ? 'bulto' : 'bolsa paca');
    });
    p.usos.forEach(function (u) { s.push(USO_CORTO[u]); });
    return ' ' + normal(s.join(' ')) + ' ';
  }
  function coincideTexto(p, q, pr) {
    var t = tokens(q); if (!t.length) return true;
    var h = pajar(p, pr);
    return t.every(function (x) {
      if (x === 'leche') return p.categoria !== 'mezcla-lactea' ? true : false;
      if (/^\d/.test(x)) return h.indexOf(' ' + x + ' ') !== -1 || h.indexOf(' ' + x + 'g ') !== -1 || h.indexOf(' ' + x + 'kg ') !== -1 || h.indexOf(x) !== -1;
      if (x === 'g' || x === 'kg') return h.indexOf(' ' + x + ' ') !== -1 || new RegExp('\\d' + x + ' ').test(h);
      return h.indexOf(x) !== -1;
    });
  }
  function sugerencias(q) {
    var out = [];
    if (!tokens(q).length) return out;
    PRODS.forEach(function (p) {
      if (!p.presentaciones.length) { if (coincideTexto(p, q)) out.push({ texto: p.nombre, meta: 'Presentaciones por confirmar', href: '#producto-' + p.slug }); return; }
      p.presentaciones.forEach(function (pr) {
        if (coincideTexto(p, q, pr)) out.push({ texto: referencia(p, pr), meta: esBulto(pr) ? 'Bulto' : 'Bolsa, por paca', href: '#producto-' + p.slug + '~' + presKey(pr.contenido) });
      });
    });
    return out.slice(0, 6);
  }
  function qAHash(q) { return normal(q).replace(/,/g, '.').replace(/[^a-z0-9.\-\s]/g, '').trim().replace(/\s+/g, '_'); }

  function montarBuscador(raiz, alIr) {
    var input = raiz.querySelector('input'), lista = raiz.querySelector('.sugerencias');
    var items = [], activo = -1;
    function cerrar() { lista.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); activo = -1; }
    function pintar() {
      if (!input.value.trim()) { cerrar(); return; }
      lista.innerHTML = items.length ? items.map(function (it, i) {
        return '<li role="option" id="' + lista.id + '-o' + i + '" aria-selected="' + (i === activo) + '" data-i="' + i + '"><span>' + esc(it.texto) + '</span><span class="sug-meta">' + esc(it.meta) + '</span></li>';
      }).join('') : '<li class="sug-vacia" role="option" aria-disabled="true" aria-selected="false">Sin coincidencias. Pulse Enter para buscar en Productos.</li>';
      lista.hidden = false; input.setAttribute('aria-expanded', 'true');
      if (activo >= 0) input.setAttribute('aria-activedescendant', lista.id + '-o' + activo); else input.removeAttribute('aria-activedescendant');
    }
    function ir(href) { cerrar(); input.value = ''; if (alIr) alIr(); location.hash = href; }
    input.addEventListener('input', function () { items = sugerencias(input.value); activo = -1; pintar(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' && items.length) { e.preventDefault(); activo = (activo + 1) % items.length; pintar(); }
      else if (e.key === 'ArrowUp' && items.length) { e.preventDefault(); activo = activo <= 0 ? items.length - 1 : activo - 1; pintar(); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (activo >= 0 && items[activo]) ir(items[activo].href);
        else if (input.value.trim()) ir('#productos~q-' + qAHash(input.value));
      } else if (e.key === 'Escape') {
        if (!lista.hidden) { e.stopPropagation(); cerrar(); }
      }
    });
    input.addEventListener('blur', function () { window.setTimeout(cerrar, 150); });
    lista.addEventListener('mousedown', function (e) { e.preventDefault(); });
    lista.addEventListener('click', function (e) { var li = e.target.closest('[data-i]'); if (li) ir(items[+li.getAttribute('data-i')].href); });
  }

  var panelBuscar = $('#buscador-panel'), btnBuscar = $('.util-buscar');
  function cerrarBuscador(devolver) {
    if (panelBuscar.hidden) return;
    panelBuscar.hidden = true; btnBuscar.setAttribute('aria-expanded', 'false');
    if (devolver) btnBuscar.focus();
  }
  btnBuscar.addEventListener('click', function () {
    var abrir = panelBuscar.hidden;
    panelBuscar.hidden = !abrir; btnBuscar.setAttribute('aria-expanded', String(abrir));
    if (abrir) $('#buscar-cabecera').focus();
  });
  $('[data-cerrar-buscador]').addEventListener('click', function () { cerrarBuscador(true); });
  montarBuscador($('#buscador-panel [data-buscador]'), function () { cerrarBuscador(false); });

  /* Menú móvil */
  var menu = $('#menu-movil'), btnMenu = $('#btn-menu');
  function abrirMenu() {
    cerrarAviso();
    menu.hidden = false; menu.classList.remove('abierto'); void menu.offsetWidth; menu.classList.add('abierto');
    btnMenu.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    window.setTimeout(function () { $('[data-cerrar-menu]').focus(); }, 30);
  }
  function cerrarMenu(devolver) {
    if (menu.hidden) return;
    menu.hidden = true; btnMenu.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    if (devolver !== false) btnMenu.focus();
  }
  btnMenu.addEventListener('click', abrirMenu);
  $('[data-cerrar-menu]').addEventListener('click', function () { cerrarMenu(); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a[href^="#"]')) cerrarMenu(false); });
  montarBuscador($('#menu-movil [data-buscador]'), function () { cerrarMenu(false); });

  /* Foco atrapado y Escape en menú, panel y hoja */
  function enfocables(c) {
    return $$('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])', c).filter(function (el) { return el.offsetParent !== null || el === document.activeElement; });
  }
  function atrapar(c, e) {
    var f = enfocables(c); if (!f.length) return;
    var primero = f[0], ultimo = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === primero || !c.contains(document.activeElement))) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
  }
  document.addEventListener('keydown', function (e) {
    var hoja = $('.hoja-filtros:not([hidden])');
    if (e.key === 'Escape') {
      if (!menu.hidden) cerrarMenu();
      else if (!panel.hidden) cerrarPanel();
      else if (hoja) cerrarHojaFiltros();
      else if (!panelBuscar.hidden) cerrarBuscador(true);
      return;
    }
    if (e.key !== 'Tab') return;
    if (!menu.hidden) atrapar(menu, e);
    else if (!panel.hidden) atrapar(panel, e);
    else if (hoja) atrapar(hoja, e);
  });
  window.addEventListener('resize', function () { if (window.matchMedia('(min-width: 1280px)').matches) cerrarMenu(false); });

  /* ---------------------------------------------------------------------------
     Router por hash
     --------------------------------------------------------------------------- */
  var SECCION = { productos: 'productos', producto: 'productos', 'marca-propia': 'productos', calidad: 'calidad', 'por-que-elegirnos': 'por-que-elegirnos', distribucion: 'distribucion', 'donde-comprar': 'distribucion', nosotros: 'nosotros', recursos: 'recursos', articulo: 'recursos' };
  var rutaActual = null, compartiendo = null;

  function leerRuta() {
    var h = (location.hash || '').replace(/^#/, '');
    try { h = decodeURIComponent(h); } catch (e) { /* hash sin codificar */ }
    h = h || 'inicio';
    var partes = h.split('~'), base = partes[0], params = partes.slice(1);
    if (base.indexOf('producto-') === 0 && base !== 'productos') return { vista: 'producto', slug: base.slice(9), params: params, hash: h };
    if (base.indexOf('articulo-') === 0) return { vista: 'articulo', slug: base.slice(9), params: params, hash: h };
    var conocidas = ['inicio', 'productos', 'comparar', 'nosotros', 'calidad', 'por-que-elegirnos', 'distribucion', 'donde-comprar', 'cotizar', 'marca-propia', 'recursos', 'contacto', 'privacidad', 'terminos'];
    if (conocidas.indexOf(base) !== -1) return { vista: base, params: params, hash: h };
    /* Un hash igual a un id solo es un ancla si ese elemento está en la vista visible (o fuera de main) */
    var el = document.getElementById(base);
    if (el) {
      var ini = $('#vista-inicio'), vis = $('#vista');
      if (ini.contains(el)) return !ini.hidden && rutaActual ? { vista: 'ancla', id: base, hash: h } : { vista: 'inicio', params: [], hash: h, ancla: base };
      if (vis.contains(el)) return !vis.hidden ? { vista: 'ancla', id: base, hash: h } : { vista: 'no-existe', params: [], hash: h };
      if (!$('main').contains(el)) return rutaActual ? { vista: 'ancla', id: base, hash: h } : { vista: 'inicio', params: [], hash: h, ancla: base };
    }
    return { vista: 'no-existe', params: [], hash: h };
  }

  function enfocarH1() {
    var h = rutaActual && rutaActual.vista === 'inicio' ? $('#h1-inicio') : $('#vista h1');
    if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  }
  function marcarNavegacion(vista) {
    var sec = SECCION[vista] || null;
    $$('[data-seccion]').forEach(function (a) {
      if (a.getAttribute('data-seccion') === sec) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  function render(r, primera) {
    var inicio = $('#vista-inicio'), vista = $('#vista');
    cerrarBuscador(false);
    catalogoVivo = null; fichaViva = null;
    document.documentElement.classList.remove('ruta-interior');
    if (r.vista === 'inicio') {
      inicio.hidden = false; vista.hidden = true; vista.innerHTML = '';
      document.title = 'Mundilácteos: leche en polvo de Turbaco para toda Colombia';
    } else {
      inicio.hidden = true; vista.hidden = false;
      var v = VISTAS[r.vista] || VISTAS['no-existe'];
      var res = v(r);
      vista.innerHTML = res.html;
      document.title = res.titulo + ' | Mundilácteos';
      if (res.montar) res.montar(vista, r);
    }
    marcarNavegacion(r.vista);
    var destino = r.ancla && document.getElementById(r.ancla);
    if (destino) destino.scrollIntoView({ block: 'start' });
    else if (!primera || location.hash) window.scrollTo(0, 0);
  }

  function slugCompartido(anterior, nueva) {
    if (nueva.vista === 'producto') return nueva.slug;
    if (anterior && anterior.vista === 'producto' && nueva.vista === 'productos') return anterior.slug;
    return null;
  }
  /* Solo el packshot es elemento compartido; el nombre de la ficha entra con su propio recorte */
  function nombrar(slug, activo) {
    $$('[data-vt-pack="' + slug + '"]').filter(function (el) { return el.offsetParent !== null; }).slice(0, 1).forEach(function (el) { el.style.viewTransitionName = activo ? 'pack' : ''; });
  }

  function navegar() {
    var r = leerRuta();
    if (r.vista === 'ancla') return;
    if (rutaActual && rutaActual.vista === 'productos' && r.vista === 'productos') { aplicarRutaCatalogo(r); rutaActual = r; return; }
    if (rutaActual && rutaActual.vista === 'producto' && r.vista === 'producto' && rutaActual.slug === r.slug && fichaViva) { fichaViva.elegirDesdeRuta(r); rutaActual = r; return; }
    var anterior = rutaActual;
    cerrarPanel(false); cerrarMenu(false); cerrarHojaFiltros(false); cerrarAviso();
    var puede = anterior && document.startViewTransition && !reducido();
    if (!puede) { rutaActual = r; render(r, !anterior); if (!r.ancla) enfocarH1(); return; }
    var slug = slugCompartido(anterior, r);
    compartiendo = slug;
    if (slug) nombrar(slug, true);
    var t = document.startViewTransition(function () {
      if (slug) nombrar(slug, false);
      rutaActual = r;
      render(r);
      if (slug) nombrar(slug, true);
    });
    var foco = function () { if (!r.ancla) enfocarH1(); };
    t.updateCallbackDone.then(foco, foco);
    var limpiar = function () { compartiendo = null; if (slug) nombrar(slug, false); };
    t.finished.then(limpiar, limpiar);
  }
  window.addEventListener('hashchange', navegar);

  /* ---------------------------------------------------------------------------
     Vistas
     --------------------------------------------------------------------------- */
  function migas(items) {
    return '<nav class="migas" aria-label="Migas de pan"><ol>' + items.map(function (it, i) {
      return '<li>' + (i === items.length - 1 ? '<span aria-current="page">' + esc(it[0]) + '</span>' : '<a href="' + it[1] + '">' + esc(it[0]) + '</a>') + '</li>';
    }).join('') + '</ol></nav>';
  }
  function cabezaInterior(titulo, entradilla, rastro) {
    return '<section class="contenedor interior-cabeza">' + migas(rastro || [['Inicio', '#inicio'], [titulo, '']]) +
      '<h1>' + esc(titulo) + '</h1>' + (entradilla ? '<p class="entradilla">' + entradilla + '</p>' : '') + '</section>';
  }
  var VISTAS = {};

  /* ---------- Productos ---------- */
  var F = null, catalogoVivo = null;
  function filtrosVacios() { return { marca: [], tipo: [], formato: '', peso: [], uso: [], q: '', orden: '', negocio: '' }; }
  function filtrosDesdeRuta(r) {
    var f = filtrosVacios();
    (r.params || []).forEach(function (t) {
      var i = t.indexOf('-'); if (i < 1) return;
      var k = t.slice(0, i), v = t.slice(i + 1);
      if (['marca', 'tipo', 'peso', 'uso'].indexOf(k) !== -1) { if (f[k].indexOf(v) === -1) f[k].push(v); }
      else if (k === 'formato' && (v === 'bolsa' || v === 'bulto')) f.formato = v;
      else if (k === 'q') f.q = v.replace(/_/g, ' ');
      else if (k === 'orden' && (v === 'marca' || v === 'peso')) f.orden = v;
      else if (k === 'negocio' && ['hogar', 'tienda', 'panaderia', 'marca'].indexOf(v) !== -1) f.negocio = v;
    });
    if (f.negocio && !f.uso.length) f.uso = usosDeNegocio(f.negocio);
    return f;
  }
  function usosDeNegocio(n) { return n === 'hogar' ? ['hogar'] : n === 'tienda' ? ['tienda'] : n === 'panaderia' ? ['panaderia', 'industria'] : []; }
  function hashDeFiltros(f) {
    var t = ['productos'];
    if (f.negocio) t.push('negocio-' + f.negocio);
    f.marca.forEach(function (v) { t.push('marca-' + v); });
    f.tipo.forEach(function (v) { t.push('tipo-' + v); });
    if (f.formato) t.push('formato-' + f.formato);
    f.peso.forEach(function (v) { t.push('peso-' + v); });
    var usosNeg = usosDeNegocio(f.negocio).join(',');
    if (f.uso.join(',') !== usosNeg) f.uso.forEach(function (v) { t.push('uso-' + v); });
    if (f.q) t.push('q-' + qAHash(f.q));
    if (f.orden) t.push('orden-' + f.orden);
    return '#' + t.join('~');
  }
  function coincide(p, f, omitir) {
    if (omitir !== 'marca' && f.marca.length && f.marca.indexOf(p.marca) === -1) return false;
    if (omitir !== 'tipo' && f.tipo.length && f.tipo.indexOf(p.categoria) === -1) return false;
    if (omitir !== 'uso' && f.uso.length && !p.usos.some(function (u) { return f.uso.indexOf(u) !== -1; })) return false;
    var pf = omitir !== 'formato' && f.formato, pp = omitir !== 'peso' && f.peso.length;
    if (pf || pp) {
      if (!p.presentaciones.some(function (x) { return (!pf || x.formato === f.formato) && (!pp || f.peso.indexOf(presKey(x.contenido)) !== -1); })) return false;
    }
    if (omitir !== 'q' && f.q && !coincideTexto(p, f.q)) return false;
    return true;
  }
  function conteo(k, v, f) {
    var g = JSON.parse(JSON.stringify(f));
    if (k === 'formato') g.formato = v; else g[k] = [v];
    return PRODS.filter(function (p) { return coincide(p, g); }).length;
  }
  var PESOS = (function () {
    var m = {};
    PRODS.forEach(function (p) { p.presentaciones.forEach(function (x) { var k = presKey(x.contenido); if (!m[k]) m[k] = { k: k, c: x.contenido, g: x.gramos, confirmado: false }; if (x.estado === 'confirmado') m[k].confirmado = true; }); });
    return Object.keys(m).map(function (k) { return m[k]; }).sort(function (a, b) { return a.g - b.g; });
  })();
  var TOTAL_PRES = PRODS.reduce(function (s, p) { return s + p.presentaciones.length; }, 0);

  function vitrinaHTML(p) {
    var sel = presPorDefecto(p), becerrita = p.marca === 'la-becerrita';
    var key = sel ? presKey(sel.contenido) : '';
    var destino = '#producto-' + p.slug + (key ? '~' + key : '');
    var im = imagenDe(p, sel);
    var escena = '<div class="escena" data-ir="' + destino + '"><span class="franja' + (becerrita ? ' filete-becerrita' : '') + '" aria-hidden="true"></span><span class="brillo" aria-hidden="true"></span>' +
      (im ? '<img class="pack" src="' + im.src + '" width="' + im.w + '" height="' + im.h + '" alt="' + esc(im.alt) + '" loading="lazy" data-vt-pack="' + p.slug + '">'
          : '<svg class="pictograma" viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-vt-pack="' + p.slug + '"><use href="#p-bolsa"/></svg><span class="pictograma-pie"><span class="codigo-toma">E01</span>Foto por producir</span>') +
      '<span class="sombra" aria-hidden="true"></span></div>';
    return '<article class="vitrina" data-slug="' + p.slug + '" aria-labelledby="vn-' + p.slug + '">' + escena +
      '<div class="vitrina-cabeza"><p class="marca-nombre">' + esc(MARCAS[p.marca].nombre) + '</p>' +
      '<h3 id="vn-' + p.slug + '"><a href="' + destino + '" data-vt-nombre="' + p.slug + '" data-ficha>' + esc(p.nombre) + '</a></h3>' +
      '<p class="denominacion">' + esc(p.denominacion) + '</p></div>' +
      '<div class="vitrina-resto">' +
        '<fieldset><legend class="pres-legend">Presentación</legend><div class="chips">' + chipsPresentacion(p, 'pv-' + p.slug, sel) + '</div>' +
        (tieneAsterisco(p) ? '<p class="nota-asterisco">* Presentación por confirmar con el cliente.</p>' : '') + '</fieldset>' +
        '<dl class="datos-venta" data-datos>' + datosVentaHTML(p, sel) + '</dl>' +
        '<p class="registro-linea"><span class="verificado">' + icono('i-verificado') + '<span>Registro ' + p.registro + '</span></span><a href="' + INVIMA + '" target="_blank" rel="noopener">Verificar<span class="sr"> ' + p.registro + ' en el INVIMA, abre otra pestaña</span></a></p>' +
        '<div class="vitrina-acciones">' +
          '<button class="btn btn-primario btn-agregar" type="button" data-agregar="' + p.slug + '" data-pres="' + key + '">' + icono('i-mas', 'ico-mas') + icono('i-hecho', 'ico-hecho') + '<span class="txt">Agregar a mi cotización</span><span class="sr" data-sr-ref> ' + esc(referencia(p, sel)) + '</span></button>' +
          '<a class="btn btn-primario btn-donde" href="' + donde(sel) + '"' + (sel && sel.donde.length ? ' target="_blank" rel="noopener"' : '') + '>Dónde comprar<span class="sr"> ' + esc(referencia(p, sel)) + '</span></a>' +
          '<a class="ficha-enlace" href="' + destino + '" data-ficha>Ver ficha técnica<span class="sr"> de ' + esc(p.nombre) + '</span></a>' +
        '</div>' +
      '</div></article>';
  }
  function donde(pr) { return pr && pr.donde && pr.donde.length ? pr.donde[0].url : '#donde-comprar'; }

  function nuevoFilaHTML(p) {
    var r = REGS[p.registro];
    var msg = 'Hola, Mundilácteos. Quiero información sobre ' + p.nombre.toLowerCase() + ' (registro ' + p.registro + '). Estoy en ____.';
    return '<div class="nuevo-fila" data-slug="' + p.slug + '"><div><h4><a href="#producto-' + p.slug + '">' + esc(p.nombre) + '</a></h4><p class="denominacion">' + esc(p.denominacion) + '</p></div>' +
      '<p class="registro-linea"><span class="verificado">' + icono('i-verificado') + '<span>' + p.registro + ', vigente hasta el ' + fechaCO(r.vence) + '</span></span><a href="' + INVIMA + '" target="_blank" rel="noopener">Verificar<span class="sr"> ' + p.registro + ', abre otra pestaña</span></a></p>' +
      '<a class="btn btn-secundario" href="' + esc(waUrl(msg)) + '" target="_blank" rel="noopener">' + icono('i-wa', 'ico-relleno') + 'Preguntar por WhatsApp</a></div>';
  }

  function filtrosFormHTML() {
    var marcas = C.marcas.filter(function (m) { return m.id !== 'marca-propia'; });
    var tipos = C.categorias;
    var usos = C.usos;
    var casilla = function (grupo, v, etiqueta) {
      return '<label class="casilla-fila"><span class="izq"><input type="checkbox" name="' + grupo + '" value="' + v + '">' + esc(etiqueta) + '</span><span class="conteo" data-conteo="' + grupo + '|' + v + '"></span></label>';
    };
    return '<form id="filtros-form" class="filtros-form" aria-label="Filtros de productos">' +
      '<fieldset class="filtro-grupo"><legend>Marca</legend>' + marcas.map(function (m) { return casilla('marca', m.id, m.nombre); }).join('') + '</fieldset>' +
      '<fieldset class="filtro-grupo"><legend>Tipo</legend>' + tipos.map(function (t) { return casilla('tipo', t.id, TIPO_CORTO[t.id]); }).join('') + '</fieldset>' +
      '<fieldset class="filtro-grupo"><legend>Formato</legend><div class="segmentado"><span class="indicador" aria-hidden="true"></span>' +
        '<label><input type="radio" name="formato" value="" checked>Todos</label><label><input type="radio" name="formato" value="bolsa">Bolsa <span class="sr">(</span><span data-conteo="formato|bolsa" class="sr"></span><span class="sr">)</span></label><label><input type="radio" name="formato" value="bulto">Bulto <span class="sr">(</span><span data-conteo="formato|bulto" class="sr"></span><span class="sr">)</span></label></div></fieldset>' +
      '<fieldset class="filtro-grupo"><legend>Presentación</legend><div class="chips">' + PESOS.map(function (x) {
        return '<label class="chip"><input type="checkbox" name="peso" value="' + x.k + '"><span class="chip-cara">' + CHECK + esc(conUnidad(x.c)) + (x.confirmado ? '' : '<span class="ast" aria-hidden="true">*</span><span class="sr"> (por confirmar)</span>') + ' <span class="conteo" data-conteo="peso|' + x.k + '"></span></span></label>';
      }).join('') + '</div><p class="nota-asterisco">* Presentación por confirmar.</p></fieldset>' +
      '<fieldset class="filtro-grupo"><legend>Uso</legend>' + usos.map(function (u) { return casilla('uso', u.id, USO_CORTO[u.id]); }).join('') + '</fieldset>' +
      '<button class="btn-quitar-filtros quitar-todo" type="button" data-quitar-todo>Quitar filtros</button>' +
      '</form>';
  }

  function tablaConvieneHTML() {
    var fila = function (th, celdas) { return '<tr><th scope="row">' + th + '</th>' + celdas.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; };
    return '<section class="conviene" aria-labelledby="h2-conviene"><h2 id="h2-conviene">Qué presentación me conviene</h2>' +
      '<div class="tabla-marco" tabindex="0" role="region" aria-labelledby="cap-conviene"><table class="tabla tabla-fija"><caption id="cap-conviene">Presentaciones según el uso</caption>' +
      '<thead><tr><th scope="col"><span class="sr">Atributo</span></th><th scope="col">Hogar</th><th scope="col">Tienda o reventa</th><th scope="col">Panadería e industria</th><th scope="col">Con su marca</th></tr></thead><tbody>' +
      fila('Formato', ['Bolsa de 380 a 900' + NNBSP + 'g', 'Paca de 12 a 30 bolsas', 'Bulto de 12,5 o 25' + NNBSP + 'kg', 'A definir con su cadena']) +
      fila('Rinde', ['3 a 7' + NNBSP + 'L por bolsa, según el empaque', '84 a 90' + NNBSP + 'L por paca', 'Cerca de 93 o 185' + NNBSP + 'L por bulto*', 'Según el formato']) +
      fila('Dónde se compra', ['Supermercado', 'Directo de la planta', 'Directo de la planta', 'Contrato de maquila']) +
      fila('Acción', ['<a href="#donde-comprar">Dónde comprar</a>', '<a href="#productos~negocio-tienda">Cotizar por paca</a>', '<a href="#productos~negocio-panaderia">Cotizar por bulto</a>', '<a href="#marca-propia">Pedir muestras</a>']) +
      '</tbody></table></div><p class="nota">Rinde de las bolsas según su empaque: 3' + NNBSP + 'L la de 380' + NNBSP + 'g y 7' + NNBSP + 'L la de 900' + NNBSP + 'g. * Bultos de leche entera a 135' + NNBSP + 'g por litro, según la ficha técnica. ' + porConfirmar() + '</p></section>';
  }

  VISTAS.productos = function (r) {
    F = filtrosDesdeRuta(r);
    var conPres = PRODS.filter(function (p) { return p.presentaciones.length; });
    var sinPres = PRODS.filter(function (p) { return !p.presentaciones.length; });
    var negocio = [['', 'Todos'], ['hogar', 'Para el hogar'], ['tienda', 'Por paca, para tienda'], ['panaderia', 'Por bulto, para panadería e industria'], ['marca', 'Con su marca']];
    var html =
      '<section class="banda azul arco-inf cabeza-banda oscuro"><div class="contenedor">' + migas([['Inicio', '#inicio'], ['Productos', '']]) +
      '<div class="cabeza-productos"><div><h1>Productos</h1><p class="entradilla">' + PRODS.length + ' productos y ' + TOTAL_PRES + ' presentaciones, en bolsa y en bulto. El precio por volumen llega con su cotización.</p></div>' +
      '<div class="buscador" role="search"><label for="q-productos">Buscar por marca, peso o código</label><div style="position:relative">' + icono('i-buscar', 'ico-lupa') +
      '<input class="control" id="q-productos" type="search" autocomplete="off" placeholder="Por ejemplo: cántaro 900 g, bulto, 25 kilos"></div></div></div></div></section>' +
      '<div class="contenedor">' +
        '<fieldset class="negocio-productos"><legend>Compre según su negocio</legend><div class="chips">' + negocio.map(function (n) {
          return '<label class="chip"><input type="radio" name="negocio-prod" value="' + n[0] + '"><span class="chip-cara">' + CHECK + esc(n[1]) + '</span></label>';
        }).join('') + '</div></fieldset>' +
        '<div class="catalogo"><aside class="filtros" aria-labelledby="h2-filtros"><h2 class="sr" id="h2-filtros">Filtros</h2><div data-filtros-casa>' + filtrosFormHTML() + '</div></aside>' +
        '<div class="resultados"><h2 class="sr">Resultados</h2>' +
          '<div class="resultados-barra"><div class="resultados-linea"><p class="resultados-conteo" id="conteo-productos" aria-live="polite"></p>' +
          '<div class="resultados-controles"><button class="btn btn-secundario btn-filtrar" type="button" aria-haspopup="dialog" data-abrir-filtros>Filtrar<span data-n-filtros></span></button>' +
          '<label class="ordenar">Ordenar <select id="orden-productos"><option value="">Recomendado</option><option value="marca">Marca, de la A a la Z</option><option value="peso">Peso, de menor a mayor</option></select></label></div></div>' +
          '<div class="aplicados" id="aplicados"></div></div>' +
          '<div class="aviso-negocio"><p><strong>Con su marca:</strong> empacamos leche en polvo con la marca de su cadena o distribuidora, amparada en nuestro registro sanitario vigente. Gramajes de 27' + NNBSP + 'g a 25' + NNBSP + 'kg.</p><div class="acciones" style="margin-top:1rem"><a class="btn btn-primario" href="#marca-propia">Conocer la maquila</a></div></div>' +
          '<div class="vitrinas" id="vitrinas">' + conPres.map(vitrinaHTML).join('') + '</div>' +
          '<div class="sin-resultados" id="sin-resultados" hidden></div>' +
          '<div class="registros-nuevos" id="registros-nuevos"><h3>Registrados en 2025, presentaciones por confirmar</h3><p>Productos con registro sanitario vigente cuya marca y presentaciones confirma el cliente antes de publicarlos.</p>' + sinPres.map(nuevoFilaHTML).join('') + '</div>' +
          '<p class="linea-marca-propia"><strong>Con su marca:</strong> empacamos con la marca de su cadena, con registro vigente. <a href="#marca-propia">Conocer la maquila</a></p>' +
        '</div></div>' + tablaConvieneHTML() +
      '</div>' +
      '<div class="hoja-filtros" role="dialog" aria-modal="true" aria-labelledby="h2-hoja-filtros" hidden><div class="panel-cabeza"><h2 id="h2-hoja-filtros">Filtrar</h2><button class="btn-cerrar-panel" type="button" data-cerrar-filtros>' + icono('i-cerrar') + 'Cerrar</button></div><div class="panel-cuerpo" data-filtros-hoja></div><div class="panel-pie"><button class="btn btn-primario btn-ancho" type="button" data-cerrar-filtros data-mostrar-n>Mostrar productos</button></div></div>';
    return { titulo: 'Productos', html: html, montar: montarCatalogo };
  };

  function montarCatalogo(vista) {
    var form = $('#filtros-form', vista), grid = $('#vitrinas', vista);
    var q = $('#q-productos', vista), orden = $('#orden-productos', vista);
    catalogoVivo = { vista: vista, form: form, grid: grid };
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    sincronizarControles();
    aplicar(false);
    if (!reducido()) { grid.classList.add('asentar'); window.setTimeout(function () { grid.classList.remove('asentar'); }, 800); }

    form.addEventListener('change', function (e) {
      var t = e.target;
      if (t.name === 'formato') F.formato = t.value;
      else if (['marca', 'tipo', 'peso', 'uso'].indexOf(t.name) !== -1) {
        F[t.name] = $$('input[name="' + t.name + '"]:checked', form).map(function (i) { return i.value; });
        if (t.name === 'uso') F.negocio = '';
      }
      aplicar(true);
    });
    vista.addEventListener('change', function (e) {
      var t = e.target;
      if (t.name === 'negocio-prod') {
        F.negocio = t.value; F.uso = usosDeNegocio(t.value);
        aplicar(true);
      } else if (t.id === 'orden-productos') { F.orden = t.value; aplicar(true); }
      else if (t.name && t.name.indexOf('pv-') === 0) elegirPresVitrina(t);
    });
    var qTimer = null;
    q.addEventListener('input', function () { window.clearTimeout(qTimer); qTimer = window.setTimeout(function () { F.q = q.value.trim(); aplicar(false); }, 160); });
    q.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); F.q = q.value.trim(); aplicar(true); } });
    vista.addEventListener('click', function (e) {
      var quitar = e.target.closest('[data-quitar]');
      if (quitar) {
        var par = quitar.getAttribute('data-quitar').split('|');
        if (par[0] === 'formato') F.formato = ''; else if (par[0] === 'q') F.q = ''; else if (par[0] === 'negocio') { F.negocio = ''; F.uso = []; }
        else { F[par[0]] = F[par[0]].filter(function (v) { return v !== par[1]; }); if (par[0] === 'uso') F.negocio = ''; }
        sincronizarControles(); aplicar(true);
        var sig = $('#aplicados [data-quitar]', vista) || $('#conteo-productos', vista);
        if (sig) { if (sig.id === 'conteo-productos') sig.setAttribute('tabindex', '-1'); sig.focus(); }
        return;
      }
      if (e.target.closest('[data-quitar-todo]')) {
        var n = F.negocio; F = filtrosVacios(); F.negocio = '';
        sincronizarControles(); aplicar(true);
        anunciar('Filtros quitados.');
        return;
      }
      var sug = e.target.closest('[data-sugerencia]');
      if (sug) { F = JSON.parse(sug.getAttribute('data-sugerencia')); sincronizarControles(); aplicar(true); return; }
      if (e.target.closest('[data-abrir-filtros]')) { abrirHojaFiltros(e.target.closest('[data-abrir-filtros]')); return; }
      if (e.target.closest('[data-cerrar-filtros]')) { cerrarHojaFiltros(); return; }
    });
  }

  function sincronizarControles() {
    if (!catalogoVivo) return;
    var v = catalogoVivo.vista, form = catalogoVivo.form;
    ['marca', 'tipo', 'peso', 'uso'].forEach(function (k) { $$('input[name="' + k + '"]', form).forEach(function (i) { i.checked = F[k].indexOf(i.value) !== -1; }); });
    $$('input[name="formato"]', form).forEach(function (i) { i.checked = i.value === F.formato; });
    $$('input[name="negocio-prod"]', v).forEach(function (i) { i.checked = i.value === F.negocio; });
    $('#q-productos', v).value = F.q;
    $('#orden-productos', v).value = F.orden;
  }

  function aplicar(conTransicion) {
    if (!catalogoVivo) return;
    var hacer = function () { aplicarDOM(); };
    var nuevoHash = hashDeFiltros(F);
    if (location.hash !== nuevoHash) { try { history.replaceState(null, '', nuevoHash); } catch (e) { /* sin historial */ } rutaActual = leerRuta(); }
    if (conTransicion && document.startViewTransition && !reducido()) {
      var grid = catalogoVivo.grid;
      $$('.vitrina', grid).forEach(function (el) { if (!el.hidden) el.style.viewTransitionName = 'v-' + el.getAttribute('data-slug'); });
      document.documentElement.classList.add('vt-filtro');
      var t = document.startViewTransition(function () {
        hacer();
        $$('.vitrina', grid).forEach(function (el) { el.style.viewTransitionName = el.hidden ? '' : 'v-' + el.getAttribute('data-slug'); });
      });
      t.finished.finally(function () {
        document.documentElement.classList.remove('vt-filtro');
        $$('.vitrina', grid).forEach(function (el) { el.style.viewTransitionName = ''; });
      });
    } else hacer();
  }

  function aplicarDOM() {
    var v = catalogoVivo.vista, grid = catalogoVivo.grid;
    var visibles = PRODS.filter(function (p) { return coincide(p, F); });
    var orden = PRODS.slice();
    if (F.orden === 'marca') orden.sort(function (a, b) { return MARCAS[a.marca].nombre.localeCompare(MARCAS[b.marca].nombre, 'es') || a.nombre.localeCompare(b.nombre, 'es'); });
    if (F.orden === 'peso') orden.sort(function (a, b) { var ga = a.presentaciones.length ? Math.min.apply(null, a.presentaciones.map(function (x) { return x.gramos; })) : 1e9; var gb = b.presentaciones.length ? Math.min.apply(null, b.presentaciones.map(function (x) { return x.gramos; })) : 1e9; return ga - gb; });
    orden.forEach(function (p) {
      var el = grid.querySelector('.vitrina[data-slug="' + p.slug + '"]') || v.querySelector('.nuevo-fila[data-slug="' + p.slug + '"]');
      if (!el) return;
      el.hidden = visibles.indexOf(p) === -1;
      if (el.classList.contains('vitrina')) grid.appendChild(el);
    });
    var nuevos = v.querySelector('#registros-nuevos');
    nuevos.hidden = !$$('.nuevo-fila', nuevos).some(function (el) { return !el.hidden; });
    // Conteos por opción
    $$('[data-conteo]', v).forEach(function (el) {
      var par = el.getAttribute('data-conteo').split('|');
      var n = conteo(par[0], par[1], F);
      el.textContent = par[0] === 'formato' ? String(n) : '(' + n + ')';
      var input = el.closest('label') && el.closest('label').querySelector('input');
      if (input && par[0] !== 'formato') { input.disabled = n === 0 && !input.checked; }
    });
    v.querySelector('.resultados').classList.toggle('modo-marca', F.negocio === 'marca');
    v.querySelector('.resultados').classList.toggle('modo-hogar', F.negocio === 'hogar');
    // Conteo y chips aplicados
    var n = visibles.length;
    $('#conteo-productos', v).textContent = 'Mostrando ' + n + ' de ' + PRODS.length + ' productos';
    var chips = [];
    if (F.negocio) chips.push(['negocio', '', { hogar: 'Para el hogar', tienda: 'Para tienda', panaderia: 'Panadería e industria', marca: 'Con su marca' }[F.negocio]]);
    F.marca.forEach(function (x) { chips.push(['marca', x, MARCAS[x].nombre]); });
    F.tipo.forEach(function (x) { chips.push(['tipo', x, TIPO_CORTO[x]]); });
    if (F.formato) chips.push(['formato', F.formato, F.formato === 'bolsa' ? 'Bolsa' : 'Bulto']);
    F.peso.forEach(function (x) { var pp = PESOS.filter(function (y) { return y.k === x; })[0]; chips.push(['peso', x, pp ? conUnidad(pp.c) : x]); });
    if (!F.negocio) F.uso.forEach(function (x) { chips.push(['uso', x, USO_CORTO[x] || x]); });
    if (F.q) chips.push(['q', '', '«' + F.q + '»']);
    $('#aplicados', v).innerHTML = chips.map(function (c) {
      return '<button class="chip-quitar" type="button" data-quitar="' + c[0] + '|' + c[1] + '">' + esc(c[2]) + icono('i-cerrar') + '<span class="sr">, quitar filtro</span></button>';
    }).join('') + (chips.length > 1 ? '<button class="btn-quitar-filtros" type="button" data-quitar-todo>Quitar filtros</button>' : '');
    var nf = chips.length;
    $$('[data-n-filtros]', v).forEach(function (el) { el.textContent = nf ? ' (' + nf + ')' : ''; });
    $$('[data-mostrar-n]', document).forEach(function (el) { el.textContent = 'Mostrar ' + n + ' ' + plural(n, 'producto', 'productos'); });
    // Sin resultados: la alternativa real
    var sin = $('#sin-resultados', v);
    if (n === 0) { sin.hidden = false; sin.innerHTML = sinResultadosHTML(); } else { sin.hidden = true; sin.innerHTML = ''; }
    // Cotización: estado de los botones
    $$('[data-agregar]', v).forEach(pintarBotonAgregar);
  }

  function sinResultadosHTML() {
    var h = '<h3>No hay productos con esta combinación.</h3>';
    var opciones = [];
    if (F.q) {
      var num = normal(F.q).replace(',', '.').match(/(\d+(?:\.\d+)?)\s*(kg|k|kilos?|g|gr|grs|gramos)?/);
      if (num) {
        var val = parseFloat(num[1]), unidad = num[2] || '';
        var gramos = /^k/.test(unidad) || (!unidad && val <= 25) ? val * 1000 : val;
        var resto = F.q.replace(num[0], '').trim();
        var candidatos = [];
        PRODS.forEach(function (p) { if (!resto || coincideTexto(p, resto)) p.presentaciones.forEach(function (x) { candidatos.push(x); }); });
        if (candidatos.length) {
          candidatos.sort(function (a, b) { return Math.abs(a.gramos - gramos) - Math.abs(b.gramos - gramos); });
          var cerca = candidatos[0];
          var g = JSON.parse(JSON.stringify(F)); g.q = resto; g.peso = [presKey(cerca.contenido)];
          h = '<h3>No encontramos «' + esc(F.q) + '».</h3><p>La presentación más cercana es ' + esc(conUnidad(cerca.contenido)) + '.</p>';
          opciones.push(['Ver ' + conUnidad(cerca.contenido), g]);
        }
      }
    }
    ['formato', 'peso', 'tipo', 'marca', 'uso', 'q'].forEach(function (k) {
      var activo = k === 'formato' || k === 'q' ? !!F[k] : F[k].length;
      if (!activo) return;
      var g = JSON.parse(JSON.stringify(F));
      if (k === 'formato' || k === 'q') g[k] = ''; else g[k] = [];
      if (k === 'uso') g.negocio = '';
      var n = PRODS.filter(function (p) { return coincide(p, g); }).length;
      if (n) opciones.push(['Quitar ' + { formato: 'el formato', peso: 'la presentación', tipo: 'el tipo', marca: 'la marca', uso: 'el uso', q: 'la búsqueda' }[k] + ' (' + n + ' ' + plural(n, 'producto', 'productos') + ')', g]);
    });
    return h + '<div class="acciones">' + opciones.slice(0, 3).map(function (o, i) {
      return '<button class="btn ' + (i === 0 ? 'btn-primario' : 'btn-secundario') + '" type="button" data-sugerencia="' + esc(JSON.stringify(o[1])) + '">' + esc(o[0]) + '</button>';
    }).join('') + '<button class="btn-quitar-filtros" type="button" data-quitar-todo>Quitar filtros</button></div>';
  }

  function elegirPresVitrina(input) {
    var art = input.closest('.vitrina'), p = producto(art.getAttribute('data-slug')), pr = presentacion(p, input.value);
    var dl = $('[data-datos]', art);
    dl.innerHTML = datosVentaHTML(p, pr);
    dl.classList.remove('cambia'); void dl.offsetWidth; dl.classList.add('cambia');
    var destino = '#producto-' + p.slug + '~' + input.value;
    $$('[data-ficha]', art).forEach(function (a) { a.setAttribute('href', destino); });
    $('.escena', art).setAttribute('data-ir', destino);
    var btn = $('[data-agregar]', art); btn.setAttribute('data-pres', input.value);
    $('[data-sr-ref]', btn).textContent = ' ' + referencia(p, pr);
    pintarBotonAgregar(btn);
    var dondeA = $('.btn-donde', art);
    dondeA.setAttribute('href', donde(pr));
    if (pr.donde.length) { dondeA.setAttribute('target', '_blank'); dondeA.setAttribute('rel', 'noopener'); } else { dondeA.removeAttribute('target'); }
    var img = $('img.pack', art), im = imagenDe(p, pr);
    if (img && im && img.getAttribute('src') !== im.src) {
      img.animate && !reducido() ? img.animate([{ opacity: 1 }, { opacity: 0.2 }], { duration: 120, easing: 'ease-out' }).onfinish = function () { cambiarImg(img, im); img.animate([{ opacity: 0.2, transform: 'translateX(-50%) translateY(10px)' }, { opacity: 1, transform: 'translateX(-50%)' }], { duration: 240, easing: 'cubic-bezier(.2,.7,.2,1)' }); } : cambiarImg(img, im);
    }
    anunciar(referencia(p, pr) + ': ' + ventaDe(pr).texto + '.');
  }
  function cambiarImg(img, im) { img.src = im.src; img.width = im.w; img.height = im.h; img.alt = im.alt; }

  function pintarBotonAgregar(btn) {
    var s = btn.getAttribute('data-agregar'), k = btn.getAttribute('data-pres');
    var hay = !!itemQ(s, k), txt = $('.txt', btn);
    var ficha = btn.hasAttribute('data-ficha-boton');
    btn.classList.toggle('agregado', hay);
    if (ficha) {
      var pr = presentacion(producto(s), k);
      txt.textContent = hay ? 'En su cotización. Agregar más' : (pr && esBulto(pr) ? 'Cotizar este bulto' : 'Agregar a mi cotización');
      btn.classList.toggle('agregado', false);
    } else {
      txt.textContent = hay ? 'Agregado. Quitar' : 'Agregar a mi cotización';
    }
  }
  function accionAgregar(btn) {
    var s = btn.getAttribute('data-agregar'), k = btn.getAttribute('data-pres');
    if (!k) return;
    var cont = btn.closest('.vitrina, .ficha-rejilla, [data-con-pack]');
    var img = cont ? cont.querySelector('img.pack') : null;
    if (btn.hasAttribute('data-ficha-boton')) {
      var n = parseInt(($('#cantidad-ficha') || {}).value, 10) || 1;
      agregarQ(s, k, n, img);
    } else if (itemQ(s, k)) {
      quitarQ(s, k);
    } else {
      agregarQ(s, k, 1, img);
      btn.classList.add('recien'); window.setTimeout(function () { btn.classList.remove('recien'); }, 400);
    }
  }

  /* Hoja de filtros (móvil): el mismo formulario se mueve a la hoja y vuelve */
  var hojaOrigen = null;
  function abrirHojaFiltros(origen) {
    var v = catalogoVivo && catalogoVivo.vista; if (!v) return;
    var hoja = $('.hoja-filtros', v);
    cerrarAviso();
    hojaOrigen = origen;
    $('[data-filtros-hoja]', v).appendChild(catalogoVivo.form);
    hoja.hidden = false; hoja.classList.remove('abierto'); void hoja.offsetWidth; hoja.classList.add('abierto');
    velo.hidden = false; velo.classList.add('entra');
    document.documentElement.style.overflow = 'hidden';
    window.setTimeout(function () { var c = $('[data-cerrar-filtros]', hoja); if (c) c.focus(); }, 30);
  }
  function cerrarHojaFiltros(devolver) {
    var v = catalogoVivo && catalogoVivo.vista; if (!v) return;
    var hoja = $('.hoja-filtros', v); if (!hoja || hoja.hidden) return;
    $('[data-filtros-casa]', v).appendChild(catalogoVivo.form);
    hoja.hidden = true; velo.hidden = true;
    document.documentElement.style.overflow = '';
    if (devolver !== false && hojaOrigen) hojaOrigen.focus();
  }

  function aplicarRutaCatalogo(r) {
    F = filtrosDesdeRuta(r);
    sincronizarControles();
    aplicar(true);
    window.scrollTo(0, 0);
  }

  /* ---------- Ficha de producto ---------- */
  var fichaViva = null;
  function tablaNutricionHTML(p) {
    var filas = [['Calorías', 'kcal'], ['Grasa total', 'g'], ['Grasa saturada', 'g'], ['Grasas trans', 'mg'], ['Carbohidratos totales', 'g'], ['Azúcares totales', 'g'], ['Azúcares añadidos', 'g'], ['Proteína', 'g'], ['Sodio', 'mg']];
    if (p.fortificacion === 'Hierro') filas.push(['Hierro', 'mg']);
    var porciones = p.presentaciones.map(function (x) { var r = rindeDe(p, x); return r && r.porciones ? conUnidad(x.contenido) + ': ' + r.porciones + ' porciones' : null; }).filter(Boolean);
    return '<div class="tabla-marco" tabindex="0" role="region" aria-labelledby="cap-nutricion"><table class="tabla nutricion-tabla"><caption id="cap-nutricion">Información nutricional de ' + esc(p.nombre) + ' ' + porConfirmar('valores por confirmar con la etiqueta vigente') + '</caption>' +
      '<thead><tr><th scope="col">Nutriente</th><th scope="col" class="der">Por 100' + NNBSP + 'g</th><th scope="col" class="der">Por porción</th></tr></thead><tbody>' +
      filas.map(function (f) { return '<tr><th scope="row">' + f[0] + ' (' + f[1] + ')</th><td class="der vacia">—<span class="sr"> dato a confirmar</span></td><td class="der vacia">—<span class="sr"> dato a confirmar</span></td></tr>'; }).join('') +
      '</tbody></table></div>' +
      '<p class="nota-asterisco">Formato de la Resolución 810 de 2021. ' + (porciones.length ? 'Porciones por envase, según el empaque: ' + esc(porciones.join('; ')) + '.' : 'Porciones por envase por confirmar.') + '</p>';
  }
  function tablaTecnicaHTML(p) {
    var r = REGS[p.registro];
    var formatos = {}; p.presentaciones.forEach(function (x) { formatos[x.formato] = true; });
    var filas = [
      ['Denominación', esc(p.denominacion)],
      ['Marca', esc(MARCAS[p.marca].nombre) + (p.estado === 'por_confirmar' ? ' ' + porConfirmar() : '')],
      ['Tipo', esc(CATS[p.categoria].nombre) + (CATS[p.categoria].nota ? '. ' + esc(CATS[p.categoria].nota) : '')],
      ['Registro INVIMA', p.registro + ', ' + esc(r.modalidad.toLowerCase()) + ', vigente hasta el ' + fechaCO(r.vence) + '. <a href="' + INVIMA + '" target="_blank" rel="noopener">Verificar<span class="sr">, abre otra pestaña</span></a>'],
      ['Fabricante', 'Inversiones Mundilácteos S.A.S., Turbaco (Bolívar)']
    ];
    if (p.fortificacion) filas.push(['Fortificación', 'Adicionada con ' + esc(p.fortificacion.toLowerCase())]);
    filas.push(['Presentaciones', p.presentaciones.length ? p.presentaciones.map(function (x) { return esc(conUnidad(x.contenido)) + (x.estado === 'por_confirmar' ? '*' : ''); }).join(', ') + (tieneAsterisco(p) ? ' <span class="nota-asterisco">(* por confirmar)</span>' : '') : porConfirmar('presentaciones por confirmar')]);
    if (formatos.bolsa) filas.push(['Empaque de la bolsa', esc(C.calidad.empaque.bolsa)]);
    if (formatos.bulto) filas.push(['Empaque del bulto', esc(C.calidad.empaque.bulto)]);
    if (formatos.bolsa) filas.push(['Paca y caja', p.presentaciones.filter(function (x) { return x.formato === 'bolsa'; }).map(function (x) { return esc(conUnidad(x.contenido)) + ': ' + x.unidades_por_paca + ' bolsas'; }).join('; ') + '. ' + esc(C.calidad.empaque.caja.valor) + ' ' + porConfirmar()]);
    filas.push(['Vida útil', C.calidad.vida_util_meses + ' meses, con el empaque cerrado']);
    if (p.categoria.indexOf('leche') === 0) filas.push(['Preparación', C.calidad.preparacion.g_por_litro + NNBSP + 'g por litro de agua, según la ficha técnica']);
    filas.push(['Alérgenos', 'Contiene leche']);
    if (p.sello_advertencia) filas.push(['Sello de advertencia', esc(p.sello_advertencia.valor) + ' ' + porConfirmar()]);
    filas.push(['EAN', p.presentaciones.length ? p.presentaciones.map(function (x) { return esc(conUnidad(x.contenido)) + ': ' + (x.ean ? '<span class="num">' + x.ean + '</span>' : 'por confirmar'); }).join('; ') : porConfirmar()]);
    return '<div class="tabla-marco" tabindex="0" role="region" aria-labelledby="cap-tecnica"><table class="tabla tabla-tecnica"><caption id="cap-tecnica">Ficha técnica de ' + esc(p.nombre) + '</caption><tbody>' +
      filas.map(function (f) { return '<tr><th scope="row">' + f[0] + '</th><td>' + f[1] + '</td></tr>'; }).join('') +
      '</tbody></table></div><p class="nota-asterisco">La versión en PDF de esta ficha se publicará como copia de esta tabla, nunca como el único lugar del dato.</p>';
  }
  function preguntasHTML(p) {
    var qs = [];
    if (esMezcla(p)) qs.push(['¿Es leche o mezcla láctea?', 'Es una mezcla láctea, no es leche: una mezcla en polvo a base de leche' + (p.categoria === 'mezcla-lactea' && /endulz/.test(p.denominacion) ? ' con endulzante' : '') + '. Su registro, ' + p.registro + ', la ampara como «' + esc(REGS[p.registro].producto) + '».']);
    else if (p.categoria === 'alimento-lacteo') qs.push(['¿Es leche o un alimento lácteo?', 'Es un alimento lácteo en polvo, registrado como tal (' + p.registro + '). Su composición se publica cuando el cliente la confirme.']);
    else qs.push(['¿Es leche o mezcla láctea?', 'Es leche en polvo: ' + esc(p.denominacion.toLowerCase()) + ', amparada en el registro ' + p.registro + '.']);
    var rinden = p.presentaciones.map(function (x) { var r = rindeDe(p, x); return r ? (r.fuente === 'empaque' ? 'la bolsa de ' + conUnidad(x.contenido) + ' rinde ' + fmt(r.litros) + ' litros según su empaque' : 'el bulto de ' + conUnidad(x.contenido) + ' da cerca de ' + fmt(Math.round(r.litros)) + ' litros a ' + C.calidad.preparacion.g_por_litro + ' g por litro') : null; }).filter(Boolean);
    qs.push(['¿Cuánto rinde?', rinden.length ? rinden.join('; ').replace(/^./, function (c) { return c.toUpperCase(); }) + '. ' + porConfirmar('cifras por unificar con el cliente') : 'El rinde de este producto está por confirmar con su ficha técnica.']);
    var bolsas = p.presentaciones.filter(function (x) { return x.formato === 'bolsa'; }), bultos = p.presentaciones.filter(esBulto);
    var venta = [];
    if (bolsas.length) venta.push('las bolsas, por paca (' + bolsas.map(function (x) { return x.unidades_por_paca + ' de ' + conUnidad(x.contenido); }).join(', ') + ')');
    if (bultos.length) venta.push('los bultos, por unidad (' + bultos.map(function (x) { return conUnidad(x.contenido); }).join(', ') + ')');
    qs.push(['¿Venden por paca o por bulto?', venta.length ? 'Sí: ' + venta.join(', y ') + '. El precio por volumen llega con su cotización.' : 'Las presentaciones de este producto están por confirmar. Escríbanos y le contamos.']);
    qs.push(['¿Cuánto dura cerrada?', C.calidad.vida_util_meses + ' meses desde el empaque, con la bolsa o el saco cerrado.']);
    return qs.map(function (x) { return '<details><summary>' + x[0] + icono('i-mas') + '</summary><div><p>' + x[1] + '</p></div></details>'; }).join('');
  }

  VISTAS.producto = function (r) {
    var p = producto(r.slug);
    if (!p) return VISTAS['no-existe'](r);
    var sel = null;
    (r.params || []).forEach(function (t) { if (!sel && presentacion(p, t)) sel = presentacion(p, t); });
    sel = sel || presPorDefecto(p);
    var becerrita = p.marca === 'la-becerrita';
    var reg = REGS[p.registro];
    var im = imagenDe(p, sel);
    var media;
    if (im) {
      var imagenes = [];
      [p.imagen].concat(p.presentaciones.map(function (x) { return x.imagen; })).forEach(function (a) { if (a && imagenes.indexOf(a) === -1) imagenes.push(a); });
      if (p.slug === 'cantaro-azucarada') imagenes.push('cantaro-azucarada-380g-b.webp');
      media = '<div class="escena ficha-escena"><span class="franja' + (becerrita ? ' filete-becerrita' : '') + '" aria-hidden="true"></span><span class="brillo" aria-hidden="true"></span>' +
        '<img class="pack" id="pack-ficha" src="' + im.src + '" width="' + im.w + '" height="' + im.h + '" alt="' + esc(im.alt) + '" data-vt-pack="' + p.slug + '" fetchpriority="high"><span class="sombra" aria-hidden="true"></span></div>' +
        '<p class="ficha-pie-foto" id="pie-foto">' + esc(pieFoto(p, sel)) + '</p>' +
        (imagenes.length > 1 ? '<div class="miniaturas" role="group" aria-label="Fotos del empaque">' + imagenes.map(function (a, i) {
          var d = DIM[a] || [300, 400];
          return '<button class="miniatura" type="button" data-foto="' + a + '" aria-pressed="' + (('img/r-' + a) === im.src) + '"><img src="img/r-' + a + '" width="' + d[0] + '" height="' + d[1] + '" alt="" loading="lazy"><span class="sr">Ver foto ' + (i + 1) + ' del empaque</span></button>';
        }).join('') + '</div>' : '');
    } else {
      media = '<figure class="marco ficha-marco-media"><div class="marco-area"><svg viewBox="0 0 48 64" aria-hidden="true" data-vt-pack="' + p.slug + '"><use href="#p-bolsa"/></svg></div><figcaption><span class="codigo-toma">E01</span><span>' +
        (p.presentaciones.length ? 'Frente de ' + esc(p.nombre) + ' por fotografiar, con el empaque «Nueva imagen» sobre fondo blanco.' : 'Empaque por definir: marca y presentaciones por confirmar con el cliente.') + '</span></figcaption></figure>';
    }
    var compra = '';
    if (sel) {
      compra = '<fieldset class="ficha-bloque"><legend>Presentación</legend><div class="chips" id="chips-ficha">' + chipsPresentacion(p, 'pf-' + p.slug, sel) + '</div>' +
        (tieneAsterisco(p) ? '<p class="nota-asterisco">* Presentación por confirmar con el cliente.</p>' : '') + '</fieldset>' +
        '<div class="ficha-datos"><dl class="datos-venta" id="datos-ficha" aria-live="polite">' + datosVentaHTML(p, sel) + '</dl></div>' +
        '<div class="cantidad"><span class="paso"><button type="button" data-paso-ficha="-1" aria-label="Quitar una">' + icono('i-menos') + '</button><label class="sr" for="cantidad-ficha" id="lbl-cantidad">Cantidad</label><input id="cantidad-ficha" type="text" inputmode="numeric" pattern="[0-9]*" value="1"><button type="button" data-paso-ficha="1" aria-label="Agregar una">' + icono('i-mas') + '</button></span>' +
        '<span id="unidad-ficha"></span><span class="equivalencia" id="equivalencia-ficha" aria-live="polite"></span></div>' +
        '<div class="ficha-acciones"><button class="btn btn-primario btn-agregar" type="button" data-agregar="' + p.slug + '" data-pres="' + presKey(sel.contenido) + '" data-ficha-boton>' + icono('i-mas', 'ico-mas') + '<span class="txt">Agregar a mi cotización</span></button>' +
        '<a class="btn btn-secundario" id="wa-ficha" href="#" target="_blank" rel="noopener">' + icono('i-wa', 'ico-relleno') + 'Preguntar por WhatsApp</a></div>' +
        '<p class="mensaje-wa" id="mensaje-ficha"></p>' +
        '<div class="donde-linea" id="donde-ficha"></div>';
    } else {
      var msg = 'Hola, Mundilácteos. Quiero información sobre ' + p.nombre.toLowerCase() + ' (registro ' + p.registro + '). Estoy en ____.';
      compra = '<div class="ficha-datos"><p>Registro sanitario vigente desde 2025. La marca, la composición y las presentaciones se publican cuando el cliente las confirme. ' + porConfirmar() + '</p></div>' +
        '<div class="ficha-acciones"><a class="btn btn-primario" href="' + esc(waUrl(msg)) + '" target="_blank" rel="noopener">' + icono('i-wa', 'ico-relleno') + 'Preguntar por WhatsApp</a></div>' +
        '<p class="mensaje-wa">Mensaje que se enviará al 319 769 0990: <q>' + esc(msg) + '</q></p>';
    }
    var anclas = [['sec-ficha', 'Ficha técnica'], ['sec-nutricion', 'Nutrición'], ['sec-preparacion', 'Preparación'], ['sec-bolsa', 'Cómo leer la bolsa'], ['sec-preguntas', 'Preguntas'], ['sec-relacionados', 'Relacionados']];
    var relacionados = PRODS.filter(function (x) { return x !== p && x.presentaciones.length && x.usos.some(function (u) { return p.usos.indexOf(u) !== -1; }); }).slice(0, 5);
    var acordeon = function (id, titulo, cuerpo) { return '<details class="acordeon" id="' + id + '" open><summary><h2>' + titulo + '</h2>' + icono('i-abajo') + '</summary><div class="acordeon-cuerpo">' + cuerpo + '</div></details>'; };
    var preparacion = p.categoria.indexOf('leche') === 0
      ? '<div class="cuerpo-texto"><p>' + esc(C.calidad.preparacion.texto) + '</p><p>' + esc(C.calidad.preparacion.incongruencia.replace(/"([^"]+)"/g, '«$1»')) + ' ' + porConfirmar('cifra por unificar con el cliente') + '</p></div>'
      : '<div class="cuerpo-texto"><p>Siga las indicaciones del empaque. La proporción de preparación de este producto se publica con su ficha técnica. ' + porConfirmar() + '</p></div>';
    var bolsa = '<div class="ficha-dos"><div class="cuerpo-texto"><dl class="zonas-lista" style="display:grid;gap:.75rem">' +
      '<dt>Registro sanitario</dt><dd>' + p.registro + ', vigente hasta el ' + fechaCO(reg.vence) + '. Cópielo y verifíquelo en la consulta pública del INVIMA.</dd>' +
      '<dt>Lote</dt><dd>Día y turno de empaque, para rastrear cada bolsa. ' + porConfirmar() + '</dd>' +
      '<dt>Vencimiento</dt><dd>' + C.calidad.vida_util_meses + ' meses desde el empaque, con la bolsa cerrada.</dd>' +
      '<dt>Peso neto</dt><dd>' + (p.presentaciones.length ? p.presentaciones.map(function (x) { return conUnidad(x.contenido); }).join(', ') : 'Por confirmar') + '.</dd>' +
      '<dt>Tabla nutricional</dt><dd>Por porción y por 100' + NNBSP + 'g, con el formato de la Resolución 810 de 2021.</dd></dl></div>' +
      '<figure class="marco"><div class="marco-area" style="--marco-ratio: 4 / 3"><svg viewBox="0 0 48 64" aria-hidden="true"><use href="#p-bolsa"/></svg></div><figcaption><span class="codigo-toma">E02</span><span>Reverso legible de ' + esc(p.nombre) + ', por fotografiar a 4.000 px con las cinco zonas.</span></figcaption></figure></div>';
    var rel = '<section class="relacionados" id="sec-relacionados" aria-labelledby="h2-rel"><h2 id="h2-rel" style="font-size:clamp(1.5rem,1.2rem + 1.2vw,2.25rem);margin-top:var(--esp-5)">Otras presentaciones y relacionados</h2><div class="ficha-dos" style="margin-top:1rem">' +
      (p.presentaciones.length > 1 ? '<div><h3>Otras presentaciones de ' + esc(p.nombre) + '</h3><ul>' + p.presentaciones.map(function (x) { return '<li><a href="#producto-' + p.slug + '~' + presKey(x.contenido) + '">' + esc(referencia(p, x)) + (x.estado === 'por_confirmar' ? ' (por confirmar)' : '') + '</a></li>'; }).join('') + '</ul></div>' : '') +
      '<div><h3>Para el mismo uso</h3><ul>' + relacionados.map(function (x) { return '<li><a href="#producto-' + x.slug + '">' + esc(x.nombre) + '</a></li>'; }).join('') + '</ul></div></div></section>';
    var ld = { '@context': 'https://schema.org', '@type': 'Product', name: p.nombre, description: p.denominacion, brand: { '@type': 'Brand', name: MARCAS[p.marca].nombre }, manufacturer: { '@type': 'Organization', name: C.empresa.razon_social } };
    if (sel && sel.ean) ld.gtin13 = sel.ean;
    if (im) ld.image = im.src;
    var html =
      '<div class="contenedor ficha-cabeza">' + migas([['Inicio', '#inicio'], ['Productos', '#productos'], [p.nombre, '']]) +
        '<div class="ficha-rejilla"><div class="ficha-media">' + media + '</div>' +
        '<div class="ficha-info' + (becerrita ? ' becerrita' : '') + '">' +
          '<p class="marca-nombre">' + esc(MARCAS[p.marca].nombre) + '</p>' +
          '<h1 data-vt-nombre="' + p.slug + '">' + esc(p.nombre) + '</h1>' +
          '<p class="denominacion">' + esc(p.denominacion) + '</p>' +
          '<p class="credencial verificado">' + icono('i-verificado') + '<span>Registro INVIMA ' + p.registro + ', vigente hasta el ' + fechaCO(reg.vence) + '. <a href="' + INVIMA + '" target="_blank" rel="noopener">Verificar<span class="sr"> en la consulta del INVIMA, abre otra pestaña</span></a></span></p>' +
          compra +
        '</div></div></div>' +
      '<nav class="anclas" aria-label="Secciones de la ficha"><ul>' + anclas.map(function (a) { return '<li><a href="#producto-' + p.slug + '" data-ancla="' + a[0] + '">' + a[1] + '</a></li>'; }).join('') + '</ul></nav>' +
      '<div class="contenedor ficha-secciones">' +
        acordeon('sec-ficha', 'Ficha técnica', tablaTecnicaHTML(p)) +
        '<div class="ficha-dos">' + acordeon('sec-nutricion', 'Nutrición', '<div class="nutricion">' + tablaNutricionHTML(p) + '</div>') + acordeon('sec-preparacion', 'Preparación', preparacion) + '</div>' +
        acordeon('sec-bolsa', 'Cómo leer la bolsa', bolsa) +
        acordeon('sec-preguntas', 'Lo que nos preguntan', '<div class="preguntas">' + preguntasHTML(p) + '</div>') +
        rel +
      '</div>' +
      '<script type="application/ld+json">' + JSON.stringify(ld).replace(/</g, '\\u003c') + '<\/script>';
    return { titulo: p.nombre, html: html, montar: function (vista) { montarFicha(vista, p, sel); } };
  };

  function pieFoto(p, pr) {
    var im = imagenDe(p, pr);
    var t = 'Empaque de 2022, provisional hasta recibir las fotos «Nueva imagen» (E01).';
    if (im && im.referencia && im.de) t = 'Se muestra la bolsa de ' + conUnidad(im.de) + ' como referencia. ' + t;
    return t;
  }

  function montarFicha(vista, p, sel) {
    var info = $('.ficha-info', vista);
    if (!reducido() && compartiendo !== p.slug) { info.classList.add('entra'); }
    if (!escritorio()) $$('.acordeon', vista).forEach(function (d, i) { d.open = i === 0; });
    if (!sel) { fichaViva = null; return; }
    var estado = { pres: sel };
    var cantidad = $('#cantidad-ficha', vista);
    function pintar(cambioPres) {
      var pr = estado.pres, v = ventaDe(pr), n = Math.max(1, Math.min(999, parseInt(cantidad.value, 10) || 1));
      cantidad.value = n;
      $('#unidad-ficha', vista).textContent = plural(n, v.unidad, v.unidades);
      $('#lbl-cantidad', vista).textContent = 'Cantidad de ' + v.unidades;
      $('[data-paso-ficha="-1"]', vista).setAttribute('aria-label', 'Quitar ' + (v.unidad === 'paca' ? 'una paca' : 'un bulto'));
      $('[data-paso-ficha="1"]', vista).setAttribute('aria-label', 'Agregar ' + (v.unidad === 'paca' ? 'una paca' : 'un bulto'));
      $('[data-paso-ficha="-1"]', vista).disabled = n <= 1;
      var eq = '';
      if (v.bolsas) eq = '= <strong>' + fmt(n * v.bolsas) + ' bolsas</strong>, ' + kg(n * v.kgUnidad);
      else if (v.kgUnidad) { var r = rindeDe(p, pr); eq = '= <strong>' + kg(n * v.kgUnidad) + '</strong>' + (r ? '; cerca de ' + fmt(Math.round(n * r.litros)) + NNBSP + 'L' : ''); }
      $('#equivalencia-ficha', vista).innerHTML = eq;
      var ref = referencia(p, pr);
      var msg = v.unidad === 'paca'
        ? 'Hola, Mundilácteos. Quiero cotizar ' + ref + ', ' + n + ' ' + plural(n, 'paca', 'pacas') + (v.bolsas ? ' (' + fmt(n * v.bolsas) + ' bolsas)' : '') + '. Estoy en ____.'
        : 'Hola, Mundilácteos. Quiero cotizar ' + ref + ', ' + n + ' ' + plural(n, 'bulto', 'bultos') + '. Ciudad: ____.';
      $('#wa-ficha', vista).setAttribute('href', waUrl(msg));
      $('#mensaje-ficha', vista).innerHTML = 'Mensaje que se enviará al 319 769 0990: <q>' + esc(msg) + '</q>';
      if (cambioPres) {
        var dl = $('#datos-ficha', vista); dl.innerHTML = datosVentaHTML(p, pr);
        dl.classList.remove('cambia'); void dl.offsetWidth; dl.classList.add('cambia');
        var btn = $('[data-ficha-boton]', vista); btn.setAttribute('data-pres', presKey(pr.contenido));
        var dondeHTML = pr.donde.length
          ? '<p>¿Es para su casa? Dónde comprar ' + esc(conUnidad(pr.contenido)) + ':</p><ul>' + pr.donde.map(function (d) { return '<li><a href="' + esc(d.url) + '" target="_blank" rel="noopener">' + esc(d.canal) + '<span class="sr">, abre otra pestaña</span></a></li>'; }).join('') + '</ul>'
          : '<p>¿Es para su casa? Esta presentación aún no tiene enlaces verificados en supermercados. <a href="#donde-comprar">Ver dónde comprar</a></p>';
        $('#donde-ficha', vista).innerHTML = dondeHTML;
        var img = $('#pack-ficha', vista), im = imagenDe(p, pr);
        if (img && im && img.getAttribute('src') !== im.src) {
          if (!reducido() && img.animate) {
            img.animate([{ opacity: 1 }, { opacity: 0.15 }], { duration: 140 }).onfinish = function () {
              cambiarImg(img, im);
              img.animate([{ opacity: 0.15, transform: 'translateX(calc(-50% + 24px))' }, { opacity: 1, transform: 'translateX(-50%)' }], { duration: 300, easing: 'cubic-bezier(.2,.7,.2,1)' });
            };
          } else cambiarImg(img, im);
          $$('.miniatura', vista).forEach(function (b) { b.setAttribute('aria-pressed', String('img/r-' + b.getAttribute('data-foto') === im.src)); });
        }
        var pie = $('#pie-foto', vista); if (pie) pie.textContent = pieFoto(p, pr);
      }
      pintarBotonAgregar($('[data-ficha-boton]', vista));
    }
    pintar(true);
    vista.addEventListener('change', function (e) {
      if (e.target.name === 'pf-' + p.slug) {
        estado.pres = presentacion(p, e.target.value);
        try { history.replaceState(null, '', '#producto-' + p.slug + '~' + e.target.value); } catch (er) { /* sin historial */ }
        rutaActual = leerRuta();
        pintar(true);
        anunciar(referencia(p, estado.pres) + '. ' + ventaDe(estado.pres).texto + '.');
      }
      if (e.target === cantidad) pintar(false);
    });
    cantidad.addEventListener('input', function () { cantidad.value = cantidad.value.replace(/\D/g, '').slice(0, 3); });
    vista.addEventListener('click', function (e) {
      var paso = e.target.closest('[data-paso-ficha]');
      if (paso) { cantidad.value = (parseInt(cantidad.value, 10) || 1) + parseInt(paso.getAttribute('data-paso-ficha'), 10); pintar(false); if (paso.disabled) cantidad.focus(); return; }
      var mini = e.target.closest('[data-foto]');
      if (mini) {
        var a = mini.getAttribute('data-foto'), d = DIM[a] || [300, 400], img = $('#pack-ficha', vista);
        img.src = 'img/r-' + a; img.width = d[0]; img.height = d[1];
        img.alt = a === 'cantaro-azucarada-380g-b.webp' ? 'The Cántaro Azucarada, bolsa de 380 g, otra vista' : (imagenDe(p, p.presentaciones.filter(function (x) { return x.imagen === a; })[0] || null) || { alt: img.alt }).alt;
        $$('.miniatura', vista).forEach(function (b) { b.setAttribute('aria-pressed', String(b === mini)); });
      }
    });
    fichaViva = {
      elegirDesdeRuta: function (r) {
        var k = (r.params || []).filter(function (t) { return presentacion(p, t); })[0];
        if (!k) return;
        var input = $('input[name="pf-' + p.slug + '"][value="' + k + '"]', vista);
        if (input && !input.checked) { input.checked = true; estado.pres = presentacion(p, k); pintar(true); }
      }
    };
  }

  /* ---------- Cotizar ---------- */
  var CIUDADES = ['Cartagena', 'Turbaco', 'Barranquilla', 'Santa Marta', 'Montería', 'Sincelejo', 'Valledupar', 'Riohacha', 'Medellín', 'Bogotá', 'Cali', 'Bucaramanga'];
  var COSTA = ['Cartagena', 'Turbaco', 'Barranquilla', 'Santa Marta', 'Montería', 'Sincelejo', 'Valledupar', 'Riohacha'];
  var NEGOCIOS = ['Hogar', 'Tienda', 'Panadería', 'Supermercado o cadena', 'Distribuidor', 'Industria', 'Institucional', 'Otro'];
  var FRECUENTES = [['cantaro-entera-bulto', '25-kg'], ['becerrita-mezcla-bulto', '25-kg'], ['cantaro-entera', '900-g'], ['becerrita-entera', '380-g']];

  VISTAS.cotizar = function (r) {
    var compartida = null;
    (r.params || []).forEach(function (t) { if (t.indexOf('c-') === 0) compartida = decodificarQ(t.slice(2)); });
    if (compartida && compartida.length) {
      var antes = JSON.parse(JSON.stringify(Q.items));
      Q.items = compartida; guardarQ();
      window.setTimeout(function () { aviso('Se cargó la cotización compartida por enlace.', function () { fijarQ(antes); }); refrescarCotizacion(); }, 50);
      try { history.replaceState(null, '', '#cotizar'); } catch (e) { /* sin historial */ }
    }
    var campo = function (id, etiqueta, input, error, ayuda) {
      return '<div class="campo" id="campo-' + id + '"><label for="' + id + '">' + etiqueta + '</label>' + (ayuda ? '<p class="ayuda" id="' + id + '-ayuda">' + ayuda + '</p>' : '') + input +
        '<p class="error-campo" id="' + id + '-error">' + icono('i-alerta') + '<span>' + error + '</span></p></div>';
    };
    var html = cabezaInterior('Solicitar cotización', 'Sin crear cuenta y sin pagos: usted pide precio y un asesor le responde.', [['Inicio', '#inicio'], ['Solicitar cotización', '']]) +
      '<div class="contenedor cotizar-rejilla">' +
        '<section class="su-lista" aria-labelledby="h2-lista"><h2 id="h2-lista" tabindex="-1">Su lista</h2><div id="lista-cotizar"></div></section>' +
        '<section class="sus-datos" aria-labelledby="h2-datos" id="sus-datos"><h2 id="h2-datos">Sus datos</h2>' +
          '<form id="form-cotizar" novalidate>' +
            '<div class="resumen-errores" id="resumen-errores" role="alert" tabindex="-1" hidden></div>' +
            campo('f-nombre', 'Nombre', '<input class="control" id="f-nombre" name="nombre" type="text" autocomplete="name" required aria-describedby="f-nombre-error">', 'Escriba su nombre.') +
            campo('f-wa', 'WhatsApp', '<input class="control" id="f-wa" name="whatsapp" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="300 123 4567" required aria-describedby="f-wa-error">', 'Escriba un número de WhatsApp de 10 dígitos, por ejemplo 300 123 4567.') +
            campo('f-ciudad', 'Ciudad', '<input class="control" id="f-ciudad" name="ciudad" type="text" list="lista-ciudades" autocomplete="address-level2" required aria-describedby="f-ciudad-ayuda f-ciudad-error"><datalist id="lista-ciudades">' + CIUDADES.map(function (c) { return '<option value="' + c + '">'; }).join('') + '</datalist>', 'Elija su ciudad para saber quién le atiende.', 'Escriba o elija su ciudad.') +
            '<fieldset class="campo tipo-negocio" id="campo-f-negocio" aria-describedby="f-negocio-error"><legend>Tipo de negocio</legend><div class="chips">' + NEGOCIOS.map(function (n, i) {
              return '<label class="chip"><input type="radio" name="negocio" value="' + n + '"' + (i === 0 ? ' id="f-negocio"' : '') + '><span class="chip-cara">' + CHECK + n + '</span></label>';
            }).join('') + '</div><p class="error-campo" id="f-negocio-error">' + icono('i-alerta') + '<span>Elija el tipo de negocio.</span></p></fieldset>' +
            '<details class="facturacion"><summary>' + icono('i-mas') + 'Agregar datos de facturación (opcional)</summary><div>' +
              '<div class="campo"><label for="f-razon">Razón social</label><input class="control" id="f-razon" name="razon" type="text" autocomplete="organization"></div>' +
              '<div class="campo"><label for="f-nit">NIT</label><input class="control" id="f-nit" name="nit" type="text" inputmode="numeric" autocomplete="off"></div>' +
              '<div class="campo"><label for="f-correo">Correo</label><input class="control" id="f-correo" name="correo" type="email" autocomplete="email"></div>' +
              '<div class="campo"><label for="f-volumen">Volumen mensual estimado, en kilos</label><input class="control" id="f-volumen" name="volumen" type="text" inputmode="numeric" autocomplete="off"></div>' +
            '</div></details>' +
            '<div class="campo" id="campo-f-acepto"><label class="casilla"><input type="checkbox" id="f-acepto" name="acepto" aria-describedby="f-acepto-error"><span>Autorizo a Inversiones Mundilácteos S.A.S. a tratar mis datos para responder esta solicitud, según la <a href="#privacidad">Política de tratamiento de datos</a> (Ley 1581 de 2012).</span></label>' +
              '<p class="error-campo" id="f-acepto-error">' + icono('i-alerta') + '<span>Para enviar la solicitud, autorice el tratamiento de sus datos.</span></p></div>' +
            '<div class="acciones acciones-apiladas"><button class="btn btn-primario" type="submit">Solicitar cotización</button><a class="btn btn-secundario" id="wa-cotizar" href="#" target="_blank" rel="noopener">' + icono('i-wa', 'ico-relleno') + 'Enviar por WhatsApp</a></div>' +
            '<p class="mensaje-wa" id="mensaje-cotizar"></p>' +
            '<p class="nota-prototipo">Prototipo: la solicitud no se envía a ningún servidor. En el sitio publicado llega al equipo comercial por correo.</p>' +
          '</form>' +
        '</section>' +
      '</div>';
    var ciudadPre = null;
    (r.params || []).forEach(function (t) { if (t.indexOf('ciudad-') === 0) ciudadPre = ciudadDeSlug(t.slice(7)); });
    return { titulo: 'Solicitar cotización', html: html, montar: function (vista) {
      montarCotizar(vista);
      if (ciudadPre) { $('#f-ciudad', vista).value = ciudadPre; actualizarWACotizar(); }
    } };
  };

  function pintarListaCotizar() {
    var cont = $('#lista-cotizar'); if (!cont) return;
    if (!Q.items.length) {
      cont.innerHTML = '<div class="lista-vacia"><p>Su cotización está vacía. Agregue presentaciones desde Productos.</p>' +
        '<div class="frecuentes"><p class="etiqueta">O empiece con una de las más pedidas:</p><div class="chips">' + FRECUENTES.map(function (f) {
          var p = producto(f[0]), pr = presentacion(p, f[1]);
          return '<button class="chip-enlace chip" type="button" data-agregar-rapido="' + f[0] + '|' + f[1] + '"><span class="chip-cara">' + icono('i-mas') + esc(referencia(p, pr)) + '</span></button>';
        }).join('') + '</div></div><a class="btn btn-secundario" href="#productos">Ver productos</a></div>' + avisoAlmacenHTML();
    } else {
      cont.innerHTML = lineasHTML('cq') + totalesHTML() + '<div class="acciones" style="margin-top:1rem"><a class="enlace" href="#productos">Agregar más productos</a><button class="btn btn-texto" type="button" data-copiar-enlace>' + icono('i-enlace') + 'Copiar enlace</button><button class="btn btn-texto" type="button" data-vaciar>Vaciar la cotización</button></div>' + avisoAlmacenHTML();
    }
    actualizarWACotizar();
  }
  function actualizarWACotizar() {
    var form = $('#form-cotizar'); if (!form) return;
    var ciudad = $('#f-ciudad').value.trim(), neg = (form.querySelector('input[name="negocio"]:checked') || {}).value;
    var msg = mensajeCotizacion(ciudad, neg ? neg.toLowerCase() : '');
    $('#wa-cotizar').setAttribute('href', waUrl(msg));
    $('#mensaje-cotizar').innerHTML = 'Mensaje que se enviará al 319 769 0990: <q>' + esc(msg) + '</q>';
  }

  function montarCotizar(vista) {
    var form = $('#form-cotizar', vista);
    pintarListaCotizar();
    delegarLineas($('#lista-cotizar', vista));
    $('#lista-cotizar', vista).addEventListener('click', function (e) {
      var b = e.target.closest('[data-agregar-rapido]'); if (!b) return;
      var par = b.getAttribute('data-agregar-rapido').split('|');
      agregarQ(par[0], par[1], 1, b.querySelector('svg'));
      window.setTimeout(function () { var h = $('#h2-lista'); if (h) h.focus(); }, 30);
    });
    var tocado = {};
    function validar(campo) {
      var errores = [];
      var reglas = {
        'f-nombre': function () { return $('#f-nombre', form).value.trim().length >= 2; },
        'f-wa': function () { return /^3\d{9}$|^\d{10}$/.test($('#f-wa', form).value.replace(/\D/g, '').replace(/^57(?=\d{10}$)/, '')); },
        'f-ciudad': function () { return $('#f-ciudad', form).value.trim().length >= 3; },
        'f-negocio': function () { return !!form.querySelector('input[name="negocio"]:checked'); },
        'f-acepto': function () { return $('#f-acepto', form).checked; }
      };
      Object.keys(reglas).forEach(function (id) {
        if (campo && campo !== id) return;
        var ok = reglas[id](), cont = $('#campo-' + id, form);
        if (ok) cont.removeAttribute('data-error'); else { cont.setAttribute('data-error', ''); errores.push(id); }
        var input = $('#' + id, form); if (input) input.setAttribute('aria-invalid', String(!ok));
      });
      return errores;
    }
    form.addEventListener('focusout', function (e) {
      var id = e.target.id === 'f-acepto' ? 'f-acepto' : e.target.name === 'negocio' ? 'f-negocio' : e.target.id;
      if (['f-nombre', 'f-wa', 'f-ciudad'].indexOf(id) !== -1 && e.target.value.trim()) { tocado[id] = true; validar(id); }
    });
    form.addEventListener('input', function (e) { if (tocado[e.target.id]) validar(e.target.id); actualizarWACotizar(); });
    form.addEventListener('change', function (e) {
      if (e.target.name === 'negocio') validar('f-negocio');
      if (e.target.id === 'f-acepto' && tocado.enviado) validar('f-acepto');
      actualizarWACotizar();
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      tocado.enviado = true; tocado['f-nombre'] = tocado['f-wa'] = tocado['f-ciudad'] = true;
      var errores = validar();
      var sinLista = !Q.items.length;
      var resumen = $('#resumen-errores', form);
      if (errores.length || sinLista) {
        var nombres = { 'f-nombre': 'Nombre', 'f-wa': 'WhatsApp', 'f-ciudad': 'Ciudad', 'f-negocio': 'Tipo de negocio', 'f-acepto': 'Autorización de datos' };
        var items = errores.map(function (id) { return '<li><a href="#' + id + '" data-enfocar="' + id + '">' + nombres[id] + ': ' + $('#' + id + '-error', form).textContent.trim() + '</a></li>'; });
        if (sinLista) items.unshift('<li><a href="#h2-lista" data-enfocar="h2-lista">Su lista: agregue al menos una presentación.</a></li>');
        var total = items.length;
        resumen.innerHTML = '<h3>' + icono('i-alerta') + 'Revise ' + total + ' ' + plural(total, 'campo', 'campos') + ' antes de enviar.</h3><ul>' + items.join('') + '</ul>';
        resumen.hidden = false; resumen.focus();
        return;
      }
      resumen.hidden = true;
      var ciudad = $('#f-ciudad', form).value.trim(), neg = form.querySelector('input[name="negocio"]:checked').value;
      var costa = COSTA.some(function (c) { return normal(c) === normal(ciudad); });
      var numero = String(Math.floor(Date.now() / 60000) % 10000).padStart(4, '0');
      var msg = mensajeCotizacion(ciudad, neg.toLowerCase()).replace('Quiero cotizar:', 'Envié la solicitud N.º ' + numero + '. Quiero cotizar:');
      var resumenTexto = 'Solicitud N.º ' + numero + '\n' + Q.items.map(textoLineaWA).join('\n') + '\nTotal: ' + totalesQ().texto + ', ' + kg(totalesQ().kg) + '\nCiudad: ' + ciudad + '\nNegocio: ' + neg;
      var sec = $('#sus-datos', vista);
      sec.innerHTML = '<div class="confirmacion"><h2 id="h2-confirmacion" tabindex="-1"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M7.8 12.4l2.9 2.8 5.5-5.9"/></svg>Solicitud enviada. N.º ' + numero + '.</h2>' +
        '<p>Le escribe un asesor comercial ' + (costa ? 'para la Costa' : 'para el interior del país') + ', por WhatsApp en horario hábil, al número que nos dejó.</p>' +
        '<p class="meta">Resumen: ' + esc(totalesQ().texto) + ', ' + kg(totalesQ().kg) + '. Ciudad: ' + esc(ciudad) + '. Negocio: ' + esc(neg.toLowerCase()) + '.</p>' +
        '<div class="acciones"><a class="btn btn-primario" href="' + esc(waUrl(msg)) + '" target="_blank" rel="noopener">' + icono('i-wa', 'ico-relleno') + 'Continuar por WhatsApp</a>' +
        '<button class="btn btn-secundario solo-js" type="button" data-copiar-resumen>' + icono('i-copiar') + 'Copiar resumen</button><a class="enlace" href="#productos">Volver a Productos</a></div>' +
        '<p class="mensaje-wa">Mensaje que se enviará al 319 769 0990: <q>' + esc(msg) + '</q></p>' +
        '<p class="nota-prototipo">Prototipo: la solicitud no salió de este navegador.</p></div>';
      $('[data-copiar-resumen]', sec).addEventListener('click', function () { copiarTexto(resumenTexto).then(function () { aviso('Resumen copiado.'); }, function () { aviso('No se pudo copiar el resumen.'); }); });
      $('#h2-confirmacion', sec).focus();
      anunciar('Solicitud enviada. Número ' + numero + '.');
    });
    form.addEventListener('click', function (e) {
      var a = e.target.closest('[data-enfocar]'); if (!a) return;
      e.preventDefault();
      var el = document.getElementById(a.getAttribute('data-enfocar'));
      if (el) { el.scrollIntoView({ block: 'center' }); el.focus(); }
    });
  }

  /* ---------- Vista de texto simple (páginas legales) ---------- */
  function enlacesHTML(lista) { return '<div class="interior-enlaces">' + lista.map(function (l) { return '<a class="enlace" href="' + l[1] + '">' + esc(l[0]) + '</a>'; }).join('') + '</div>'; }
  function minima(titulo, entradilla, cuerpo, enlaces, rastro) {
    return { titulo: titulo, html: cabezaInterior(titulo, entradilla, rastro) + '<div class="contenedor interior-cuerpo">' + (cuerpo || '') + (enlaces ? enlacesHTML(enlaces) : '') + '</div>' };
  }

  /* ---------------------------------------------------------------------------
     Páginas interiores: componentes compartidos
     --------------------------------------------------------------------------- */
  var TEL = C.empresa.telefono_visible;
  var TEL_HREF = 'tel:' + C.empresa.telefono.replace(/\s/g, '');
  var WA_VISIBLE = '+57 ' + TEL;
  var MAPS = 'https://www.google.com/maps/search/?api=1&query=Parque+Industrial+Europark+Turbaco+Bol%C3%ADvar';
  var DATOS_GOV = C.calidad.invima_establecimiento.fuente;
  var DIRECCION_TXT = C.empresa.direccion + '. Turbaco, Bolívar (área metropolitana de Cartagena).';
  var NB = '&#8239;';
  var T_COSTA = (C.cobertura.tiempos.valor.match(/Costa Caribe: ([^.]+)\./) || [])[1] || '';
  var T_RESTO = (C.cobertura.tiempos.valor.match(/Resto del país: ([^.]+)\./) || [])[1] || '';
  DIM['bultos-trio.webp'] = [883, 366];

  function enlaceExterno(href, html, sr) { return '<a href="' + esc(href) + '" target="_blank" rel="noopener">' + html + '<span class="sr">' + esc(sr || ', abre otra pestaña') + '</span></a>'; }
  function btnWA(msg, texto, clase) { return '<a class="btn ' + (clase || 'btn-primario') + '" href="' + esc(waUrl(msg)) + '" target="_blank" rel="noopener">' + icono('i-wa', 'ico-relleno') + esc(texto) + '<span class="sr">, abre WhatsApp</span></a>'; }
  function lineaWA(msg) { return '<p class="mensaje-wa">Mensaje que se enviará al ' + TEL + ': <q>' + esc(msg) + '</q></p>'; }
  function btnCopiar(texto, etiqueta, copiado, sr) {
    return '<button class="btn btn-secundario btn-copiar solo-js" type="button" data-copiar="' + esc(texto) + '"' + (copiado ? ' data-copiado="' + esc(copiado) + '"' : '') + '>' + icono('i-copiar', 'ico-copiar') + icono('i-hecho', 'ico-hecho') + '<span>' + esc(etiqueta) + '</span>' + (sr ? '<span class="sr"> ' + esc(sr) + '</span>' : '') + '</button>';
  }
  function verificado(html) { return '<p class="verificado">' + icono('i-verificado') + '<span>' + html + '</span></p>'; }
  function titulo2(id, texto, clase) { return '<h2 id="' + id + '" tabindex="-1"' + (clase ? ' class="' + clase + '"' : '') + '>' + texto + '</h2>'; }

  function cabeza(o) {
    return '<section class="contenedor interior-cabeza' + (o.clase ? ' ' + o.clase : '') + '">' + migas(o.rastro || [['Inicio', '#inicio'], [o.titulo, '']]) +
      '<div class="cabeza-rejilla"><div><h1>' + esc(o.titulo) + '</h1>' + (o.entradilla ? '<p class="entradilla">' + o.entradilla + '</p>' : '') + (o.meta || '') + '</div>' +
      (o.lado ? '<div class="cabeza-lado">' + o.lado + '</div>' : '') + '</div></section>';
  }
  function enPagina(ruta, items) {
    return '<nav class="en-pagina" aria-label="En esta página"><p class="etiqueta">En esta página</p><ul>' + items.map(function (it) {
      return '<li><a href="#' + ruta + '" data-ancla="' + it[0] + '">' + esc(it[1]) + '</a></li>';
    }).join('') + '</ul></nav>';
  }
  /* La secuencia corre sobre un arco de paralelo: y = 4·x·(1 − x) */
  function recorridoHTML(items, tipo) {
    var n = items.length;
    return '<div class="recorrido-marco recorrido-' + tipo + '" style="--n:' + n + '"><svg class="recorrido-arco" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 0Q50 20 100 0"/></svg>' +
      '<ol class="recorrido" style="--n:' + n + '">' + items.map(function (it, i) {
        var x = n > 1 ? i / (n - 1) : 0, y = 4 * x * (1 - x);
        var marca = tipo === 'anios'
          ? '<span class="recorrido-punto" aria-hidden="true"></span><p class="recorrido-anio">' + esc(it.marca) + '</p>'
          : '<span class="recorrido-num" aria-hidden="true">' + (i + 1) + '</span>';
        return '<li style="--y:' + y.toFixed(3) + '">' + marca + '<h3>' + it.titulo + '</h3><p>' + it.texto + '</p></li>';
      }).join('') + '</ol></div>';
  }
  function itemPack(archivo, alt, clase) {
    var d = DIM[archivo] || [300, 400];
    return '<div class="item' + (clase ? ' ' + clase : '') + '"><img src="img/r-' + archivo + '" width="' + d[0] + '" height="' + d[1] + '" alt="' + esc(alt) + '" loading="lazy"></div>';
  }
  function escenaGrupo(items, clase, becerrita) {
    return '<div class="escena marca-escena' + (clase ? ' ' + clase : '') + '"><span class="franja' + (becerrita ? ' filete-becerrita' : '') + '" aria-hidden="true"></span><span class="brillo" aria-hidden="true"></span><div class="grupo">' + items.join('') + '</div></div>';
  }
  function marcoToma(codigo, texto, pictograma, clase, ratio) {
    return '<figure class="marco' + (clase ? ' ' + clase : '') + '"><div class="marco-area' + (/marco-ancho/.test(clase || '') ? ' arco-sup arco-inf' : '') + '"' + (ratio ? ' style="--marco-ratio:' + ratio + '"' : '') + '><svg viewBox="' + (pictograma === 'p-retratos' ? '0 0 72 40' : '0 0 48 64') + '" aria-hidden="true"><use href="#' + pictograma + '"/></svg></div><figcaption><span class="codigo-toma">' + codigo + '</span><span>' + texto + '</span></figcaption></figure>';
  }
  function numeroSolicitud() { return String(Math.floor(Date.now() / 60000) % 10000).padStart(4, '0'); }

  /* Formularios cortos: validación al salir del campo y al enviar, resumen con enlaces, confirmación */
  function campoTexto(id, etiqueta, attrs, error, ayuda, opcional) {
    var describe = (ayuda ? id + '-ayuda ' : '') + (error ? id + '-error' : '');
    var control = attrs.indexOf('textarea') === 0
      ? '<textarea class="control" id="' + id + '"' + attrs.slice(8) + (describe ? ' aria-describedby="' + describe.trim() + '"' : '') + '></textarea>'
      : '<input class="control" id="' + id + '"' + attrs + (describe ? ' aria-describedby="' + describe.trim() + '"' : '') + '>';
    return '<div class="campo" id="campo-' + id + '"><label for="' + id + '">' + etiqueta + (opcional ? ' <span class="campo-opcional">(opcional)</span>' : '') + '</label>' +
      (ayuda ? '<p class="ayuda" id="' + id + '-ayuda">' + ayuda + '</p>' : '') + control +
      (error ? '<p class="error-campo" id="' + id + '-error">' + icono('i-alerta') + '<span>' + error + '</span></p>' : '') + '</div>';
  }
  function campoWA(id) {
    return campoTexto(id, 'WhatsApp', ' name="whatsapp" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="300 123 4567" required', 'Escriba un número de WhatsApp de 10 dígitos, por ejemplo 300 123 4567.');
  }
  function campoAcepto(id, para) {
    return '<div class="campo" id="campo-' + id + '"><label class="casilla"><input type="checkbox" id="' + id + '" name="acepto" data-regla="' + id + '" aria-describedby="' + id + '-error"><span>Autorizo a Inversiones Mundilácteos S.A.S. a tratar mis datos para ' + para + ', según la <a href="#privacidad">Política de tratamiento de datos</a> (Ley 1581 de 2012).</span></label>' +
      '<p class="error-campo" id="' + id + '-error">' + icono('i-alerta') + '<span>Para enviar, autorice el tratamiento de sus datos.</span></p></div>';
  }
  var validaWA = function (v) { return /^3\d{9}$/.test(String(v).replace(/\D/g, '').replace(/^57(?=\d{10}$)/, '')); };
  var validaTexto = function (min) { return function (v) { return String(v).trim().length >= min; }; };
  function montarFormulario(form, reglas, alEnviar) {
    var tocado = {};
    function valor(id) { var el = $('#' + id, form); return el ? (el.type === 'checkbox' ? el.checked : el.value) : ''; }
    function validar(solo) {
      var errores = [];
      Object.keys(reglas).forEach(function (id) {
        if (solo && solo !== id) return;
        var r = reglas[id], ok = r.grupo ? !!form.querySelector('input[name="' + r.grupo + '"]:checked') : r.ok(valor(id));
        var cont = $('#campo-' + id, form);
        if (ok) cont.removeAttribute('data-error'); else { cont.setAttribute('data-error', ''); errores.push(id); }
        var el = $('#' + id, form); if (el && !r.grupo) el.setAttribute('aria-invalid', String(!ok));
      });
      return errores;
    }
    form.addEventListener('focusout', function (e) {
      var id = e.target.id;
      if (reglas[id] && !reglas[id].grupo && e.target.type !== 'checkbox' && String(e.target.value).trim()) { tocado[id] = true; validar(id); }
    });
    form.addEventListener('input', function (e) { if (reglas[e.target.id] && (tocado[e.target.id] || tocado.enviado) && e.target.type !== 'checkbox') validar(e.target.id); });
    form.addEventListener('change', function (e) { var g = e.target.getAttribute('data-regla'); if (g && tocado.enviado) validar(g); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      tocado.enviado = true;
      var errores = validar(), resumen = $('.resumen-errores', form);
      if (errores.length) {
        resumen.innerHTML = '<h3>' + icono('i-alerta') + 'Revise ' + errores.length + ' ' + plural(errores.length, 'campo', 'campos') + ' antes de enviar.</h3><ul>' + errores.map(function (id) {
          return '<li><a href="#' + id + '" data-enfocar="' + id + '">' + esc(reglas[id].nombre) + ': ' + esc($('#' + id + '-error', form).textContent.trim()) + '</a></li>';
        }).join('') + '</ul>';
        resumen.hidden = false; resumen.focus();
        return;
      }
      resumen.hidden = true;
      alEnviar(function (id) { var el = $('#' + id, form); return el ? el.value.trim() : ''; });
    });
    form.addEventListener('click', function (e) {
      var a = e.target.closest('[data-enfocar]'); if (!a) return;
      e.preventDefault();
      var el = document.getElementById(a.getAttribute('data-enfocar'));
      if (el) { el.scrollIntoView({ block: 'center' }); el.focus(); }
    });
  }
  function confirmar(cont, o) {
    var numero = numeroSolicitud();
    var msg = o.msg.replace('{n}', numero);
    cont.innerHTML = '<div class="confirmacion"><h2 id="' + o.id + '" tabindex="-1"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M7.8 12.4l2.9 2.8 5.5-5.9"/></svg>' + esc(o.titulo) + ' N.º ' + numero + '.</h2>' +
      '<p>' + o.texto + '</p>' +
      '<div class="acciones">' + btnWA(msg, 'Continuar por WhatsApp') + (o.extra || '') + '</div>' + lineaWA(msg) +
      '<p class="nota-prototipo">Prototipo: el mensaje no salió de este navegador. En el sitio publicado llega al equipo comercial por correo.</p></div>';
    var h = $('#' + o.id, cont); if (h) h.focus();
    anunciar(o.titulo + ' Número ' + numero + '.');
  }
  function resumenErroresHTML() { return '<div class="resumen-errores" role="alert" tabindex="-1" hidden></div>'; }

  /* Esquema de la bolsa: mismo visor de la Home, con radios propios (sin ids repetidos) */
  var ZONAS_BOLSA = [
    ['registro', 'Registro sanitario', 'Es el número que el INVIMA asigna a este producto. Cópielo y verifíquelo. En The Cántaro Entera es el <strong class="nw">RSA-006359-2018</strong>.', true],
    ['lote', 'Lote', 'Indica el día y el turno de empaque. Con él rastreamos cada bolsa. Téngalo a mano si necesita escribirnos por un producto. ' + porConfirmar()],
    ['vence', 'Vencimiento', 'La fecha hasta la que la bolsa cerrada conserva su calidad. La vida útil es de ' + C.calidad.vida_util_meses + ' meses desde el empaque, en un lugar fresco y seco.'],
    ['peso', 'Peso neto', 'Lo que contiene la bolsa, sin contar el empaque: 380' + NB + 'g en la bolsa de este ejemplo, que rinde 3 litros según su etiqueta.'],
    ['tabla', 'Tabla nutricional', 'Los valores por porción y por 100' + NB + 'g, con el formato de la Resolución 810 de 2021. En cada ficha técnica la encuentra también como tabla.']
  ];
  function visorBolsaHTML(pref) {
    var svg = '<svg class="esquema-bolsa" viewBox="0 0 300 400" role="img" aria-label="Esquema del reverso de una bolsa con cinco zonas: lote, vencimiento, tabla nutricional, registro sanitario y peso neto"><g class="lienzo">' +
      '<path class="bolsa-cuerpo" d="M40 380Q40 386 46 386H254Q260 386 260 380V40L255 32L250 40L245 40L240 40L235 32L230 40L225 40L220 40L215 32L210 40L205 40L200 40L195 32L190 40L185 40L180 40L175 32L170 40L165 40L160 40L155 32L150 40L145 40L140 40L135 32L130 40L125 40L120 40L115 32L110 40L105 40L100 40L95 32L90 40L85 40L80 40L75 32L70 40L65 40L60 40L55 32L50 40L45 40L40 40Z"/>' +
      '<path class="linea" d="M44 56H256"/><rect class="zona z-lote" x="62" y="70" width="80" height="24" rx="3"/><text class="rotulo" x="70" y="86">Lote</text>' +
      '<rect class="zona z-vence" x="158" y="70" width="80" height="24" rx="3"/><text class="rotulo" x="166" y="86">Vence</text>' +
      '<rect class="zona z-tabla" x="62" y="114" width="110" height="194" rx="3"/><text class="rotulo" x="70" y="130">Información</text><text class="rotulo" x="70" y="141">nutricional</text>' +
      [156, 174, 192, 210, 228, 246, 264, 282].map(function (y, i) { return '<path class="linea" d="M70 ' + y + 'H' + (i % 3 === 2 ? 150 : 164) + '"/>'; }).join('') +
      [120, 132, 144, 156, 168, 180, 192, 204, 216].map(function (y, i) { return '<path class="linea" d="M188 ' + y + 'H' + (i % 3 === 2 ? 228 : 242) + '"/>'; }).join('') +
      '<rect class="zona z-registro" x="62" y="326" width="110" height="24" rx="3"/><text class="rotulo" x="70" y="342">RSA-006359-2018</text>' +
      '<rect class="zona z-peso" x="186" y="316" width="56" height="42" rx="3"/><text class="rotulo" x="193" y="333">Peso neto</text><text class="rotulo" x="193" y="348">380 g</text></g></svg>';
    return '<div class="bolsa-visor"><figure class="marco bolsa-marco"><div class="marco-area">' + svg + '</div><figcaption><span class="codigo-toma">E02</span><span>Toma por producir: reverso legible de The Cántaro 380' + NB + 'g. Mientras llega, este esquema señala las cinco zonas.</span></figcaption></figure>' +
      '<div class="bolsa-explica"><fieldset><legend class="sr">Zona de la bolsa</legend><div class="chips">' + ZONAS_BOLSA.map(function (z, i) {
        return '<label class="chip"><input type="radio" name="' + pref + '-zona" data-zona="' + z[0] + '"' + (i === 0 ? ' checked' : '') + '><span class="chip-cara">' + CHECK + z[1] + '</span></label>';
      }).join('') + '</div></fieldset><div aria-live="polite">' + ZONAS_BOLSA.map(function (z) {
        return '<div class="zona-texto zt-' + z[0] + '"><h3>' + z[1] + '</h3><p>' + z[2] + '</p>' + (z[3] ? '<div class="acciones">' + btnCopiar('RSA-006359-2018', 'Copiar número') + enlaceExterno(INVIMA, 'Verificar en el INVIMA') + '</div>' : '') + '</div>';
      }).join('') + '</div></div></div>';
  }

  /* Globo reducido (Nosotros y 404): misma geometría del hero; el titular corre por el paralelo 10 */
  function cabezaGlobo(o) {
    var f2 = o.foto ? '<img class="relleno foto" src="' + o.foto[0] + '" width="' + o.foto[1] + '" height="' + o.foto[2] + '" alt="' + esc(o.foto[3]) + '">' : '<div class="relleno"></div>';
    return '<section class="cabeza-globo' + (o.clase ? ' ' + o.clase : '') + '" style="--cg-k:' + o.k + '">' +
      '<div class="contenedor">' + migas(o.rastro) + '</div>' +
      '<div class="cg-escenario"><div class="globo globo-mini' + (o.bruma ? ' globo-bruma' : '') + '">' +
        '<div class="franja f1"><div class="relleno"></div></div><div class="franja f2">' + f2 + '</div><div class="franja f3"><div class="relleno"></div></div>' +
        '<div class="franja f4"><div class="relleno"><svg class="destello" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M30 50.75Q37 52.85 44 53.48"/></svg></div></div></div>' +
        '<div class="cg-carril"><h1>' + o.h1 + '</h1></div>' +
        '<div class="cg-bajo">' + o.bajo + '</div>' +
      '</div></section>';
  }
  function entrarGlobo(vista) {
    var s = $('.cabeza-globo', vista);
    if (!s || reducido()) return;
    s.classList.add('entra');
    window.setTimeout(function () { s.classList.remove('entra'); }, 1300);
  }

  /* ---------- Nosotros ---------- */
  VISTAS.nosotros = function () {
    var e = C.empresa;
    var historia = [
      { marca: e.constitucion.valor, titulo: 'Nace la empresa', texto: 'Se constituye ' + esc(e.razon_social) + ', NIT ' + e.nit + '. EMIS registra el 30/12/2011; LinkedIn, 2010. ' + porConfirmar() },
      { marca: '2017', titulo: 'Registro para mezclas lácteas', texto: 'El INVIMA expide el RSA-003008-2017 para mezclas en polvo a base de leche y endulzantes, vigente hasta el ' + fechaCO(REGS['RSA-003008-2017'].vence) + '.' },
      { marca: '2018', titulo: 'Registro para leche en polvo', texto: 'RSA-006359-2018: leche en polvo entera, descremada, azucarada y fortificada. Es el registro de The Cántaro y La Becerrita.' },
      { marca: '2023', titulo: 'Registro para empacar', texto: 'RSA-0027065-2023: empacar y vender leche en polvo entera y descremada.' },
      { marca: '2025', titulo: 'Dos productos nuevos', texto: 'Alimento lácteo en polvo (RSA-0036572-2025) y mezcla láctea con café, endulzada con panela (RSA-0037312-2025).' },
      { marca: 'Hoy', titulo: 'Planta en Europark', texto: 'Fabricamos y empacamos en el Parque Industrial Europark, en Turbaco, y despachamos a todo el país.' }
    ];
    var bajo = '<p class="entradilla">Una empresa familiar con planta en Turbaco, Bolívar.</p>' +
      '<div class="credencial">' + verificado('Concepto sanitario favorable del INVIMA para la planta de Europark. ' + enlaceExterno(DATOS_GOV, 'Ver en datos.gov.co')) + '</div>';
    var html = cabezaGlobo({
      rastro: [['Inicio', '#inicio'], ['Nosotros', '']], k: 5.08, h1: '<span class="frag">Nosotros</span>', bajo: bajo,
      foto: ['img/equipo-evento-b-recorte.webp', 560, 375, 'Siete personas del equipo de Mundilácteos en fila, con camisetas de La Becerrita']
    }) +
      '<section class="bloque" aria-labelledby="h2-somos"><div class="contenedor dos-col siete-cinco">' +
        '<div class="cuerpo-texto">' + titulo2('h2-somos', 'Leche en polvo hecha en Turbaco.') +
          '<p>Somos ' + esc(e.razon_social) + '. En nuestra planta del Parque Industrial Europark, en el km 1 de la vía a Turbaco, fabricamos y empacamos leche en polvo con dos marcas de la casa, The Cántaro y La Becerrita, y con la marca de las cadenas y distribuidores que nos confían su producto.</p>' +
          '<p>Trabajamos con cinco registros sanitarios vigentes y despachamos desde Bolívar a tiendas, panaderías, supermercados e industria de todo el país.</p></div>' +
        '<dl class="ficha-datos-lista empresa-datos">' +
          '<dt>Razón social</dt><dd>' + esc(e.razon_social) + '</dd><dt>NIT</dt><dd class="num">' + e.nit + '</dd>' +
          '<dt>Planta</dt><dd>Parque Industrial Europark, Bodega 28</dd><dt>Municipio</dt><dd>Turbaco, Bolívar (área metropolitana de Cartagena)</dd>' +
          '<dt>Constitución</dt><dd>' + e.constitucion.valor + ' ' + porConfirmar() + '</dd>' +
          '<dt>Equipo</dt><dd>' + e.empleados.valor + ' personas ' + porConfirmar() + '</dd></dl>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-historia"><div class="contenedor">' + titulo2('h2-historia', 'Nuestra historia, en años reales.') +
        '<p class="bloque-intro">Cada año de esta línea remite a un documento público: el registro mercantil o un registro sanitario del INVIMA.</p>' +
        recorridoHTML(historia, 'anios') + '</div></section>' +
      '<section class="banda azul arco-sup abre oscuro" aria-labelledby="h2-gente"><div class="contenedor">' + titulo2('h2-gente', 'La gente que hace Mundilácteos.') +
        '<p class="bloque-intro" style="margin-top:1.25rem;color:var(--c-bruma)">Detrás de cada bolsa hay alguien que la empaca, alguien que controla el lote y alguien que atiende su pedido. Pronto los conocerá por su nombre y su cargo.</p>' +
        '<div class="gente-rejilla"><figure><div class="ventana-franja arco-sup arco-inf ventana-alta"><img src="img/equipo-planta.webp" width="900" height="466" alt="Equipo completo de Mundilácteos con camisetas de La Becerrita frente a la planta de Europark, con la estatua de vaca de la entrada" loading="lazy"></div>' +
          '<figcaption class="foto-pie">El equipo frente a la planta de Europark. Foto provisional, con decoración de fin de año: la reemplaza la toma N01.</figcaption></figure>' +
        '<div class="gente-lado"><figure><div class="ventana"><img src="img/equipo-evento-a.webp" width="606" height="404" alt="Las mujeres del equipo de Mundilácteos con camisetas de La Becerrita, en la celebración de fin de año" loading="lazy"></div>' +
          '<figcaption class="foto-pie">Parte del equipo en la celebración de fin de año. Foto provisional: los retratos R01 a R06, con nombre y cargo, están por producir.</figcaption></figure></div></div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-familia"><div class="contenedor dos-col siete-cinco centrado">' +
        '<div class="cuerpo-texto">' + titulo2('h2-familia', 'Una empresa de familia.') +
          '<p>Mundilácteos es una empresa familiar. En este espacio sus fundadores contarán, con su nombre y una cita firmada, por qué empezaron a hacer leche en polvo en Turbaco. ' + porConfirmar('texto por entregar') + '</p>' +
          '<p class="nota">No publicamos testimonios ni citas sin la autorización de quien las firma.</p></div>' +
        '<div class="familia-marco">' + marcoToma('R06', 'Retrato de la familia fundadora en la planta, por producir, con autorización de uso de imagen.', 'p-retratos', '', '4 / 5') + '</div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-valores"><div class="contenedor">' + titulo2('h2-valores', 'Lo que nos guía.', 'bloque-titulo') +
        '<p class="bloque-intro">Tres compromisos, cada uno con la forma de comprobarlo. ' + porConfirmar('redacción por validar con la empresa') + '</p>' +
        '<ul class="valores">' +
          '<li><h3>Decir de dónde viene.</h3><p>Lo que vendemos se fabrica o se empaca en nuestra planta de Europark, en Turbaco. La dirección está en esta página y en cada empaque.</p><a class="enlace" href="' + MAPS + '" target="_blank" rel="noopener">Cómo llegar<span class="sr">, abre Google Maps</span></a></li>' +
          '<li><h3>Dar la cara.</h3><p>Cada pedido tiene una persona que le responde por WhatsApp o por teléfono, con su nombre y su cargo.</p><a class="enlace" href="#contacto">Asesores por zona</a></li>' +
          '<li><h3>Mostrar el registro.</h3><p>Cada producto lleva su registro sanitario vigente, con el número a la vista para que usted lo verifique en el INVIMA.</p><a class="enlace" href="#calidad">Ver los registros</a></li>' +
        '</ul></div></section>' +
      '<section class="bloque" aria-labelledby="h2-planta-n"><div class="contenedor dos-col siete-cinco">' +
        '<div class="direccion-bloque">' + titulo2('h2-planta-n', 'Visítenos en Europark.') +
          '<address><strong>Parque Industrial Europark</strong>' + esc(DIRECCION_TXT) + '</address>' +
          '<p>Si compra en volumen, venga a conocer la planta: coordine la visita con el área comercial y le indicamos la fecha y quién le recibe.</p>' +
          '<div class="acciones"><a class="btn btn-primario" href="#contacto~visita">Solicitar visita a la planta</a>' +
            '<a class="btn btn-secundario" href="' + MAPS + '" target="_blank" rel="noopener">' + icono('i-lugar') + 'Cómo llegar<span class="sr">, abre Google Maps</span></a>' +
            btnCopiar(DIRECCION_TXT, 'Copiar dirección', 'Dirección copiada') + '</div></div>' +
        '<div class="planta-ficha"><h3>La planta en datos</h3><dl class="ficha-datos-lista">' +
          '<dt>Parque</dt><dd>Industrial Europark, Bodega 28</dd><dt>Lote</dt><dd>2A–2B</dd><dt>Vía</dt><dd>Km 1 vía a Turbaco</dd>' +
          '<dt>Municipio</dt><dd>Turbaco, Bolívar</dd><dt>Coordenadas</dt><dd>' + porConfirmar('dato a confirmar con GPS') + '</dd>' +
          '<dt>Atención</dt><dd>' + esc(e.horario.valor) + ' ' + porConfirmar() + '</dd><dt>Teléfono</dt><dd><a href="' + TEL_HREF + '">' + TEL + '</a></dd></dl></div>' +
      '</div></section>' +
      '<section class="panel-bruma arco-sup seccion marcas-bloque" aria-labelledby="h2-marcas-n"><div class="contenedor">' + titulo2('h2-marcas-n', 'Nuestras marcas.', 'bloque-titulo') +
        '<div class="marcas-nosotros">' +
          '<div class="con-tilt">' + escenaGrupo([itemPack('cantaro-entera-500g.webp', 'The Cántaro Entera, bolsa de 500 g', 'bolsa'), itemPack('cantaro-entera-bulto-25kg.webp', 'The Cántaro Entera, bulto de 25 kg')], 'escena-media') +
            '<h3>The Cántaro</h3><p>' + esc(MARCAS['the-cantaro'].descripcion) + '</p><a class="enlace" href="#productos~marca-the-cantaro">Ver The Cántaro</a></div>' +
          '<div class="con-tilt">' + escenaGrupo([itemPack('becerrita-entera-900g.webp', 'La Becerrita Entera, bolsa de 900 g', 'bolsa'), itemPack('becerrita-mezcla-bulto-25kg.webp', 'La Becerrita Mezcla Láctea, bulto de 25 kg')], 'escena-media', true) +
            '<h3>La Becerrita</h3><p>' + esc(MARCAS['la-becerrita'].descripcion.replace(/"([^"]+)"/g, '«$1»')) + '</p><a class="enlace" href="#productos~marca-la-becerrita">Ver La Becerrita</a></div>' +
          '<div>' + '<div class="escena marca-escena escena-media"><span class="franja" aria-hidden="true"></span><div class="grupo"><svg class="pictograma-grupo" viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#p-bolsa"/></svg></div></div>' +
            '<h3>Con su marca</h3><p>' + esc(MARCAS['marca-propia'].descripcion) + '</p><a class="enlace" href="#marca-propia">Conocer la maquila</a></div>' +
        '</div></div></section>' +
      '<section class="bloque" aria-labelledby="h2-cierre-n"><div class="contenedor">' + titulo2('h2-cierre-n', 'Seis razones, cada una con la forma de comprobarla.') +
        '<div class="cierre-enlaces"><a class="btn btn-primario" href="#por-que-elegirnos">Ver por qué elegirnos</a><a class="enlace" href="#calidad">Calidad y registros</a><a class="enlace" href="#contacto">Contacto</a></div></div></section>';
    return { titulo: 'Nosotros', html: html, montar: entrarGlobo };
  };

  /* ---------- Calidad ---------- */
  VISTAS.calidad = function () {
    var filas = C.calidad.registros.map(function (r) {
      return '<tr role="row"><th scope="row" role="rowheader"><span class="cifra-48">' + r.numero + '</span></th>' +
        '<td role="cell" class="reg-ampara">' + esc(r.producto) + '</td>' +
        '<td role="cell" data-etq="Modalidad">' + esc(r.modalidad) + '</td>' +
        '<td role="cell" class="reg-vence" data-etq="Estado"><strong>' + esc(r.estado) + '</strong> hasta el ' + fechaCO(r.vence) + '</td>' +
        '<td role="cell" class="reg-acciones"><div class="registro-acciones">' + btnCopiar(r.numero, 'Copiar número', null, r.numero) +
        '<a href="' + INVIMA + '" target="_blank" rel="noopener">Abrir consulta<span class="sr"> del INVIMA para ' + r.numero + ', abre otra pestaña</span></a></div></td></tr>';
    }).join('');
    var pasos = [
      { titulo: 'Recepción', texto: 'Recibimos materias primas e insumos con su documentación. Detalle del proceso: ' + porConfirmar() },
      { titulo: 'Análisis', texto: 'Cada lote se analiza antes de empacar. Parámetros y laboratorio: ' + porConfirmar() },
      { titulo: 'Empaque en atmósfera de CO<sub>2</sub>', texto: 'La leche se envasa en bolsa laminada de tres capas, en atmósfera controlada de CO<sub>2</sub>.' },
      { titulo: 'Sellado con lote y vencimiento', texto: 'La bolsa se termosella y lleva impresos su lote y su fecha de vencimiento: ' + C.calidad.vida_util_meses + ' meses.' },
      { titulo: 'Despacho', texto: 'Pacas y bultos salen de Europark hacia la Costa Caribe y el resto del país.' }
    ];
    var capas = '<svg class="capas" viewBox="0 0 480 300" role="img" aria-labelledby="capas-titulo"><title id="capas-titulo">Corte esquemático de la bolsa laminada: tres capas por fuera y, adentro, la leche en polvo en atmósfera controlada de CO2.</title>' +
      [[20, 'c1', 'Capa 1'], [46, 'c2', 'Capa 2'], [72, 'c3', 'Capa 3']].map(function (c) {
        var y = c[0];
        return '<path class="capa ' + c[1] + '" d="M20 ' + y + 'Q160 ' + (y + 40) + ' 300 ' + y + 'L300 ' + (y + 20) + 'Q160 ' + (y + 60) + ' 20 ' + (y + 20) + 'Z"/><path class="guia" d="M306 ' + (y + 10) + 'H330"/><text x="338" y="' + (y + 15) + '">' + c[2] + '</text>';
      }).join('') +
      '<path class="interior" d="M20 100Q160 140 300 100L300 250Q160 290 20 250Z"/>' +
      [[62, 146], [90, 164], [118, 150], [146, 172], [174, 152], [204, 168], [232, 150], [262, 162], [76, 188], [106, 196], [134, 184], [162, 200], [192, 190], [222, 198], [250, 186], [280, 176]].map(function (p) { return '<circle class="polvo" cx="' + p[0] + '" cy="' + p[1] + '" r="4"/>'; }).join('') +
      '<text class="fuerte" x="160" y="226" text-anchor="middle">Leche en polvo</text><text x="160" y="246" text-anchor="middle">en atmósfera controlada de CO<tspan dy="4" font-size="11">2</tspan></text></svg>';
    var fichas = PRODS.map(function (p) {
      return '<li><span class="f-nombre">' + esc(p.nombre) + '</span><span class="f-reg">' + p.registro + '</span><a href="#producto-' + p.slug + '">Ver en HTML<span class="sr"> la ficha técnica de ' + esc(p.nombre) + '</span></a>' +
        '<button class="btn-descargar solo-js" type="button" data-descargar-ficha="' + p.slug + '">' + icono('i-abajo') + 'Descargar (HTML, ' + pesoFicha(p) + ')<span class="sr"> ficha técnica de ' + esc(p.nombre) + '</span></button></li>';
    }).join('');
    var msgPQR = 'Hola, Mundilácteos. Quiero reportar un problema con un producto. Lote: ____. Vencimiento: ____. Ciudad: ____.';
    var html = cabeza({
      titulo: 'Calidad y registros', entradilla: 'Cada número de esta página se puede comprobar en una fuente pública.',
      lado: enPagina('calidad', [['h2-reg-c', 'Registros'], ['h2-cert', 'Certificaciones'], ['h2-proceso', 'Así trabajamos'], ['h2-bolsa-c', 'Cómo leer una bolsa'], ['h2-traza', 'Trazabilidad'], ['h2-empaque', 'Empaque'], ['h2-docs', 'Fichas técnicas']])
    }) +
      '<section class="banda noche arco-sup abre oscuro registros registros-calidad" aria-labelledby="h2-reg-c"><div class="contenedor">' +
        '<div class="registros-cabeza">' + titulo2('h2-reg-c', 'Cinco registros sanitarios vigentes.') + '<p>Copie el número y consúltelo en el INVIMA. Última verificación: 25/09/2026.</p></div>' +
        '<table class="tabla-reg" role="table"><caption class="sr">Registros sanitarios de Mundilácteos ante el INVIMA</caption><thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader">Registro</th><th scope="col" role="columnheader">Ampara</th><th scope="col" role="columnheader">Modalidad</th><th scope="col" role="columnheader">Vigencia</th><th scope="col" role="columnheader">Verificar</th></tr></thead><tbody role="rowgroup">' + filas + '</tbody></table>' +
        '<div class="concepto-sanitario">' + verificado('Concepto sanitario favorable del establecimiento N.º 24741, línea «Leches en polvo y crema de leches en polvo».') + '<p>' + enlaceExterno(DATOS_GOV, 'Ver en datos.gov.co') + '</p></div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-cert"><div class="contenedor">' + titulo2('h2-cert', 'Lo que está verificado y lo que falta por confirmar.', 'bloque-titulo') +
        '<div class="certs">' +
          '<article class="cert cert-verificada" aria-labelledby="h3-invima"><p class="cert-estado">' + icono('i-verificado') + 'Verificado en fuente pública</p><h3 id="h3-invima">Concepto sanitario del INVIMA</h3>' +
            '<dl class="ficha-datos-lista"><dt>Ente</dt><dd>INVIMA</dd><dt>Establecimiento</dt><dd>N.º 24741, activo</dd><dt>Concepto</dt><dd>Favorable</dd><dt>Línea</dt><dd>Leches en polvo y crema de leches en polvo</dd><dt>Registros</dt><dd>Cinco, vigentes hasta 2028, 2030 y 2031</dd></dl>' +
            '<div class="acciones">' + enlaceExterno(DATOS_GOV, 'Ver en datos.gov.co') + enlaceExterno(INVIMA, 'Consulta de registros del INVIMA') + '</div></article>' +
          '<article class="cert cert-pendiente" aria-labelledby="h3-iso"><p class="cert-estado">' + icono('i-alerta') + 'Pendiente de soporte: no se muestra como sello</p><h3 id="h3-iso">ISO 9001:2015</h3>' +
            '<p class="texto-sans">El sitio actual la declara. Para publicarla como certificación faltan cuatro datos:</p>' +
            '<ul><li><span>Ente certificador</span>' + porConfirmar() + '</li><li><span>Número de certificado</span>' + porConfirmar() + '</li><li><span>Alcance</span>' + porConfirmar() + '</li><li><span>Vigencia</span>' + porConfirmar() + '</li></ul>' +
            '<p class="nota">Cuando lleguen, aquí irán el certificado en PDF y el enlace de verificación del ente. Si no está vigente, se retira.</p></article>' +
        '</div></div></section>' +
      '<section class="bloque" aria-labelledby="h2-proceso"><div class="contenedor">' + titulo2('h2-proceso', 'Así trabajamos.') +
        '<p class="bloque-intro" style="margin-top:1rem">Cinco pasos, de la recepción al camión. Lo que aún no tiene soporte está marcado.</p>' + recorridoHTML(pasos, 'pasos') +
        '<div style="margin-top:var(--esp-6)">' + marcoToma('P01–P05', 'Fotos por producir de cada paso: recepción, análisis por lote, línea de empaque, codificación de lote y vencimiento, y cargue del camión.', 'p-bolsa', 'marco-ancho') + '</div>' +
      '</div></section>' +
      '<section class="panel-bruma arco-sup seccion" aria-labelledby="h2-bolsa-c"><div class="contenedor"><div class="encabezado-seccion">' + titulo2('h2-bolsa-c', 'Cómo leer una bolsa') + '</div>' + visorBolsaHTML('cq') + '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-traza"><div class="contenedor dos-col">' +
        '<div class="cuerpo-texto">' + titulo2('h2-traza', 'Trazabilidad por lote.') +
          '<p>Cada bolsa y cada bulto llevan impresos su lote y su fecha de vencimiento. El lote indica el día y el turno de empaque: con él rastreamos la bolsa hasta su producción. ' + porConfirmar() + '</p>' +
          '<p>Si algo no está bien con un producto, el lote es lo primero que le vamos a pedir.</p></div>' +
        '<div class="recuadro"><h3>¿Encontró un problema con un producto?</h3><ol class="pasos-articulo" style="margin-top:1.25rem">' +
          '<li><h4 class="h4-paso">Guarde el empaque</h4><p>Anote el lote y la fecha de vencimiento, o tómeles una foto.</p></li>' +
          '<li><h4 class="h4-paso">Escríbanos</h4><p>Por WhatsApp o por el formulario de contacto, con la foto y su ciudad.</p></li>' +
          '<li><h4 class="h4-paso">Revisamos el lote</h4><p>El área de calidad revisa esa producción y le responde. Tiempo de respuesta: ' + porConfirmar() + '</p></li></ol>' +
          '<div class="acciones" style="margin-top:1.25rem"><a class="btn btn-primario" href="#contacto~pqr">Escribir por un producto</a>' + btnWA(msgPQR, 'WhatsApp', 'btn-secundario') + '</div>' + lineaWA(msgPQR) + '</div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-empaque"><div class="contenedor">' + titulo2('h2-empaque', 'Un empaque que protege la leche.', 'bloque-titulo') +
        '<div class="empaque-rejilla"><div><h3>La bolsa</h3>' + capas +
          '<dl class="ficha-datos-lista"><dt>Material</dt><dd>' + esc(C.calidad.empaque.bolsa.replace('CO₂', 'CO2')).replace('CO2', 'CO<sub>2</sub>') + '</dd><dt>Capas</dt><dd>Composición de cada capa ' + porConfirmar() + '</dd><dt>Vida útil</dt><dd>' + C.calidad.vida_util_meses + ' meses, con la bolsa cerrada</dd><dt>Caja</dt><dd>' + esc(C.calidad.empaque.caja.valor) + ' ' + porConfirmar() + '</dd></dl></div>' +
          '<div class="con-tilt"><h3>El bulto</h3>' + escenaGrupo([itemPack('cantaro-entera-bulto-25kg.webp', 'The Cántaro Entera, bulto de 25 kg'), itemPack('cantaro-mezcla-bulto-12-5kg.webp', 'The Cántaro Mezcla Láctea, bulto de 12,5 kg')], 'escena-media') +
          '<dl class="ficha-datos-lista" style="margin-top:1.25rem"><dt>Material</dt><dd>' + esc(C.calidad.empaque.bulto) + '</dd><dt>Pesos</dt><dd>12,5 y 25' + NB + 'kg</dd></dl></div></div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-docs"><div class="contenedor"><div class="encabezado-seccion">' + titulo2('h2-docs', 'Fichas técnicas.') + '<a class="enlace" href="#recursos">Ver recursos</a></div>' +
        '<p class="bloque-intro">Cada ficha existe como página: la descarga es una copia de esa misma tabla. El PDF se publica con el sitio, rotulado con su peso.</p><ul class="fichas-lista">' + fichas + '</ul></div></section>' +
      '<section class="banda azul arco-sup arco-inf abre oscuro cierre cierre-interior" aria-labelledby="h2-pqr"><div class="contenedor cierre-rejilla"><div>' + titulo2('h2-pqr', '¿Encontró un problema con un producto?') +
        '<p style="margin-top:1rem;color:var(--c-bruma)">Tenga a mano el lote y escríbanos. Le responde el área de calidad.</p>' +
        '<div class="acciones"><a class="btn btn-primario" href="#contacto~pqr">Escribir por un producto</a><a class="btn btn-secundario" href="' + TEL_HREF + '">' + icono('i-tel') + 'Llamar al ' + TEL + '</a></div>' +
        '<p class="telefono-visible">WhatsApp y teléfono: ' + TEL + '.</p></div></div></section>';
    return { titulo: 'Calidad y registros', html: html };
  };

  /* Fichas técnicas descargables: copia en HTML de la misma tabla de la ficha */
  function documentoFicha(p) {
    var tabla = tablaTecnicaHTML(p).replace(/<span class="sr">[^<]*<\/span>/g, '').replace(/ tabindex="0" role="region" aria-labelledby="cap-tecnica"/, '');
    return '<!doctype html><html lang="es-CO"><head><meta charset="utf-8"><title>Ficha técnica: ' + esc(p.nombre) + '</title><meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<style>body{font:16px/1.55 Arial,sans-serif;color:#0B1F4F;background:#FFFFFF;max-width:780px;margin:32px auto;padding:0 16px}h1{color:#0A2F8F;font-size:30px;line-height:1.1;margin:0 0 6px}p{margin:0 0 12px}table{border-collapse:collapse;width:100%;margin-top:16px}caption{text-align:left;font-weight:700;padding-bottom:8px}th,td{text-align:left;vertical-align:top;padding:8px 12px}th{width:30%;color:#0A2F8F}tr:nth-child(odd)>*{background:#EEF4FB}a{color:#0B6FB8}.por-confirmar,.nota-asterisco{color:#4A5877;font-size:13px}.por-confirmar::before{content:"("}.por-confirmar::after{content:")"}small{color:#4A5877}</style></head><body>' +
      '<p><small>Inversiones Mundilácteos S.A.S. NIT ' + C.empresa.nit + '. ' + esc(C.empresa.direccion) + ', Turbaco (Bolívar). Tel. y WhatsApp ' + TEL + '.</small></p>' +
      '<h1>Ficha técnica: ' + esc(p.nombre) + '</h1><p>' + esc(p.denominacion) + '</p>' + tabla +
      '<p><small>Documento generado desde el catálogo del ' + fechaCO(C.actualizado) + '. Los datos marcados «dato a confirmar» los valida el cliente antes de publicar.</small></p></body></html>';
  }
  function pesoFicha(p) { var b = documentoFicha(p).length; return Math.max(1, Math.round(b / 1024)) + NB + 'KB'; }
  function descargarFicha(slug) {
    var p = producto(slug); if (!p) return;
    try {
      var blob = new Blob([documentoFicha(p)], { type: 'text/html;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = 'ficha-tecnica-' + slug + '.html'; a.style.display = 'none';
      document.body.appendChild(a); a.click(); a.remove();
      window.setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      aviso('Ficha técnica de ' + p.nombre + ' descargada en HTML. Puede abrirla en su navegador y guardarla como PDF.');
    } catch (e) {
      aviso('No se pudo descargar la ficha. Puede consultarla en su página de producto.');
    }
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-descargar-ficha]');
    if (b) descargarFicha(b.getAttribute('data-descargar-ficha'));
  });

  /* ---------- Por qué elegirnos ---------- */
  var PREGUNTAS = [
    ['¿Tienen registro sanitario?', 'Sí, cinco, todos vigentes. Compruébelos en la consulta pública del INVIMA con el número que trae cada empaque.', '#calidad', 'Ver los registros'],
    ['¿Despachan fuera de la Costa?', 'Sí. Despachamos desde Turbaco a todo el país. En Cobertura están los tiempos de ejemplo por ciudad; el asesor de su zona le confirma el de su pedido.', '#distribucion', 'Ver cobertura'],
    ['¿Empacan con la marca de mi cadena?', 'Sí, con nuestro registro sanitario vigente, en gramajes de 27' + NB + 'g a 25' + NB + 'kg. Las condiciones se acuerdan con cada cadena.', '#marca-propia', 'Conocer la maquila'],
    ['¿Cuánto dura la leche en polvo cerrada?', C.calidad.vida_util_meses + ' meses desde el empaque, en un lugar fresco y seco. La fecha exacta está impresa en cada bolsa, junto al lote.', '#producto-cantaro-entera', 'Ver la ficha técnica'],
    ['¿Es leche o mezcla láctea?', 'Depende del producto. La leche en polvo es leche; la mezcla láctea es una mezcla en polvo a base de leche y endulzante. Cada ficha lo dice en su denominación.', '#articulo-leche-o-mezcla-lactea', 'Cómo diferenciarlas'],
    ['¿Cómo pido precio?', 'Arme su cotización con las presentaciones y cantidades que necesita y envíela sin crear cuenta ni pagar nada. Un asesor le responde por WhatsApp.', '#cotizar', 'Solicitar cotización']
  ];
  VISTAS['por-que-elegirnos'] = function () {
    var regs = C.calidad.registros.map(function (r) { return '<li><span class="cifra">' + r.numero + '</span><span class="vence">Vigente hasta el ' + fechaCO(r.vence) + '</span></li>'; }).join('');
    var razones = [
      { id: 'registros', titulo: 'Cinco registros sanitarios vigentes.', texto: 'Cada producto que vendemos está amparado por un registro del INVIMA, con su número y su fecha de vencimiento a la vista. El más próximo a vencer, el de leche en polvo, está vigente hasta el 24/05/2028.',
        acciones: '<a class="btn btn-primario" href="#calidad">Ver los registros</a>' + enlaceExterno(INVIMA, 'Verificar en el INVIMA'),
        prueba: '<div class="prueba-registros arco-sup arco-inf"><ol aria-label="Números de registro sanitario">' + regs + '</ol></div>' },
      { id: 'concepto', titulo: 'Concepto sanitario favorable.', texto: 'El INVIMA registra nuestra planta como establecimiento activo, con concepto sanitario favorable para la línea de leches en polvo. Es un dato público, no una declaración nuestra.',
        acciones: '<a class="btn btn-secundario" href="' + esc(DATOS_GOV) + '" target="_blank" rel="noopener">Ver en datos.gov.co<span class="sr">, abre otra pestaña</span></a>',
        prueba: '<div class="prueba-documento"><div class="documento"><p class="doc-cabeza"><svg viewBox="0 0 40 48" aria-hidden="true"><path d="M6 3h20l8 8v34H6z"/><path d="M26 3v8h8"/><path d="M12 20h16M12 26h16M12 32h9"/><circle cx="29" cy="38" r="6"/><path d="M26.4 38.2l1.8 1.7 3.2-3.4"/></svg>Establecimiento ante el INVIMA</p>' +
          '<p class="doc-estado">' + icono('i-verificado') + 'Concepto favorable</p><dl class="ficha-datos-lista"><dt>N.º</dt><dd>24741</dd><dt>Línea</dt><dd>Leches en polvo y crema de leches en polvo</dd><dt>Titular</dt><dd>' + esc(C.empresa.razon_social) + '</dd><dt>NIT</dt><dd>' + C.empresa.nit + '</dd></dl></div></div>' },
      { id: 'planta', titulo: 'Planta propia en Europark.', texto: 'Fabricamos y empacamos en el Parque Industrial Europark, en el km 1 de la vía a Turbaco, Bolívar. Si compra en volumen, venga a conocerla: coordine la visita con el área comercial.',
        acciones: '<a class="btn btn-primario" href="#contacto~visita">Solicitar visita a la planta</a><a class="btn btn-secundario" href="' + MAPS + '" target="_blank" rel="noopener">' + icono('i-lugar') + 'Cómo llegar<span class="sr">, abre Google Maps</span></a>',
        prueba: '<figure><div class="ventana-franja arco-sup arco-inf"><img src="img/equipo-planta.webp" width="900" height="466" alt="Equipo de Mundilácteos frente a la planta del Parque Industrial Europark, en Turbaco" loading="lazy"></div><figcaption class="foto-pie">El equipo frente a la planta. Foto provisional con decoración de fin de año; la reemplaza la toma P06.</figcaption></figure>' },
      { id: 'empaque', titulo: 'Bolsa de tres capas sellada con CO<sub>2</sub> y ' + C.calidad.vida_util_meses + ' meses de vida útil.', texto: 'La bolsa laminada de tres capas se termosella y se envasa en atmósfera controlada de CO<sub>2</sub>, que protege la leche de la humedad del Caribe. Cerrada, conserva su calidad ' + C.calidad.vida_util_meses + ' meses.',
        acciones: '<a class="btn btn-secundario" href="#producto-cantaro-entera">Ver ficha técnica</a><a class="enlace" href="#calidad">Cómo es el empaque</a>',
        prueba: '<div class="con-tilt">' + escenaGrupo([itemPack('cantaro-entera-500g.webp', 'The Cántaro Entera, bolsa laminada de 500 g', 'bolsa'), itemPack('cantaro-azucarada-380g.webp', 'The Cántaro Azucarada, bolsa de 380 g', 'bolsa-chica')], 'escena-media') + '<p class="pie-escena">Empaques de 2022, provisionales hasta las fotos «Nueva imagen» (E01).</p></div>' },
      { id: 'presentaciones', titulo: 'De 380' + NB + 'g a 25' + NB + 'kg, y con su marca.', texto: 'Bolsas de 380 a 900' + NB + 'g para el hogar y la tienda, pacas de 12 a 30 bolsas y bultos de 12,5 y 25' + NB + 'kg para panaderías e industria. Y si su cadena quiere su propia marca, la empacamos con nuestro registro.',
        acciones: '<a class="btn btn-primario" href="#productos">Ver productos</a><a class="enlace" href="#marca-propia">Conocer la maquila</a>',
        prueba: '<div class="con-tilt">' + escenaGrupo([itemPack('becerrita-entera-380g.webp', 'La Becerrita Entera, bolsa de 380 g', 'bolsa-chica'), itemPack('cantaro-mezcla-900g.webp', 'The Cántaro Mezcla Láctea, bolsa de 900 g', 'bolsa'), itemPack('cantaro-mezcla-bulto-12-5kg.webp', 'The Cántaro Mezcla Láctea, bulto de 12,5 kg')], 'escena-media') + '</div>' },
      { id: 'despacho', titulo: 'Despacho a todo el país, con asesor por zona.', texto: 'Salimos de Turbaco hacia la Costa Caribe y el resto de Colombia. Cada zona tiene un asesor que le confirma el tiempo de entrega y las condiciones de su pedido. ' + porConfirmar('tiempos por confirmar'),
        acciones: '<a class="btn btn-secundario" href="#distribucion">Ver cobertura</a><a class="enlace" href="#donde-comprar">Dónde comprar</a>',
        prueba: '<div class="con-tilt">' + escenaGrupo([itemPack('bultos-trio.webp', 'Tres bultos: The Cántaro Entera de 25 kg, La Becerrita Mezcla Láctea de 25 kg y The Cántaro Mezcla Láctea de 12,5 kg', 'ancho')], 'escena-media despacho-escena') + '</div>' }
    ];
    var ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: PREGUNTAS.map(function (q) { return { '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1].replace(/&#8239;/g, ' ') } }; }) };
    var msg = 'Hola, Mundilácteos. Quiero cotizar leche en polvo para mi negocio en ____.';
    var html = cabeza({ titulo: 'Por qué elegirnos', entradilla: 'Seis razones, cada una con la forma de comprobarla.' }) +
      '<div class="contenedor bloque" style="padding-top:var(--esp-4)"><div class="razones">' + razones.map(function (r) {
        return '<section class="razon" aria-labelledby="h2-r-' + r.id + '"><div class="razon-prueba">' + r.prueba + '</div><div class="razon-texto"><h2 id="h2-r-' + r.id + '">' + r.titulo + '</h2><p>' + r.texto + '</p><div class="acciones">' + r.acciones + '</div></div></section>';
      }).join('') + '</div></div>' +
      '<section class="panel-bruma arco-sup seccion" aria-labelledby="h2-preguntas"><div class="contenedor">' + titulo2('h2-preguntas', 'Lo que nos preguntan antes de comprar.', 'bloque-titulo') +
        '<div class="preguntas preguntas-grandes">' + PREGUNTAS.map(function (q) {
          return '<details><summary>' + q[0] + icono('i-mas') + '</summary><div><p>' + q[1] + '</p><p><a class="enlace" href="' + q[2] + '">' + q[3] + '</a></p></div></details>';
        }).join('') + '</div>' +
        '<p class="nota" style="margin-top:var(--esp-5)">Testimonios de clientes: solo se publican reales, con nombre, negocio, ciudad y autorización. ' + porConfirmar('por recopilar') + '</p></div></section>' +
      '<section class="banda azul arco-sup arco-inf abre oscuro cierre cierre-interior" aria-labelledby="h2-cierre-p"><div class="contenedor cierre-rejilla"><div>' + titulo2('h2-cierre-p', 'Arme su cotización sin crear cuenta.') +
        '<div class="acciones"><a class="btn btn-primario" href="#cotizar">Cotizar por volumen</a>' + btnWA(msg, 'Escribir a un asesor', 'btn-secundario') + '</div>' +
        '<p class="telefono-visible">WhatsApp y teléfono: ' + TEL + '.</p></div></div></section>' +
      '<script type="application/ld+json">' + JSON.stringify(ld).replace(/</g, '\\u003c') + '<\/script>';
    return { titulo: 'Por qué elegirnos', html: html };
  };

  /* ---------- Distribución y cobertura ---------- */
  var COB = [
    { id: 'cartagena', n: 'Cartagena', a: 1, ang: -60 }, { id: 'barranquilla', n: 'Barranquilla', a: 1, ang: -40 }, { id: 'santa-marta', n: 'Santa Marta', a: 1, ang: -20 },
    { id: 'riohacha', n: 'Riohacha', a: 1, ang: 0 }, { id: 'valledupar', n: 'Valledupar', a: 1, ang: 20 }, { id: 'sincelejo', n: 'Sincelejo', a: 1, ang: 40 }, { id: 'monteria', n: 'Montería', a: 1, ang: 60 },
    { id: 'bucaramanga', n: 'Bucaramanga', a: 2, ang: -36 }, { id: 'medellin', n: 'Medellín', a: 2, ang: -12 }, { id: 'bogota', n: 'Bogotá', a: 2, ang: 12 }, { id: 'cali', n: 'Cali', a: 2, ang: 36 }
  ];
  function cobPorId(id) { for (var i = 0; i < COB.length; i++) if (COB[i].id === id) return COB[i]; return null; }
  function anillosSVG(o) {
    var O = o.O, pt = function (r, ang) { var t = ang * Math.PI / 180; return [O[0] + r * Math.cos(t), O[1] + r * Math.sin(t)]; };
    var f = function (n) { return n.toFixed(1); };
    var arco = function (r, a) { var p0 = pt(r, -a), p1 = pt(r, a); return 'M' + f(p0[0]) + ' ' + f(p0[1]) + 'A' + r + ' ' + r + ' 0 0 1 ' + f(p1[0]) + ' ' + f(p1[1]); };
    var s1 = pt(o.r1, -o.a1), s2 = pt(o.r1, o.a1);
    var h = '<svg class="anillos-diagrama anillos-grande ' + o.clase + '" viewBox="0 0 ' + o.w + ' ' + o.h + '" role="img" aria-labelledby="' + o.clase + '-t"><title id="' + o.clase + '-t">Anillos desde Turbaco. Primer anillo, Costa Caribe: Cartagena, Barranquilla, Santa Marta, Riohacha, Valledupar, Sincelejo y Montería, de ' + T_COSTA + '. Segundo anillo, resto del país: Bucaramanga, Medellín, Bogotá y Cali, de ' + T_RESTO + '. Tiempos por confirmar.</title>' +
      '<path class="anillo-fondo" d="M' + O[0] + ' ' + O[1] + 'L' + f(s1[0]) + ' ' + f(s1[1]) + 'A' + o.r1 + ' ' + o.r1 + ' 0 0 1 ' + f(s2[0]) + ' ' + f(s2[1]) + 'Z" opacity="0.7"/>' +
      '<path class="anillo" d="' + arco(o.r1, o.a1) + '"/><path class="anillo" d="' + arco(o.r2, o.a2) + '"/>' + (o.etiquetas || '');
    COB.forEach(function (c) {
      var p = pt(c.a === 1 ? o.r1 : o.r2, c.ang);
      var m = [(O[0] + p[0]) / 2, (O[1] + p[1]) / 2], dx = p[0] - O[0], dy = p[1] - O[1], L = Math.sqrt(dx * dx + dy * dy);
      var q = [m[0] + dy / L * 0.18 * L, m[1] - dx / L * 0.18 * L];
      h += '<path class="ruta" data-ruta="' + c.id + '" d="M' + O[0] + ' ' + O[1] + 'Q' + f(q[0]) + ' ' + f(q[1]) + ' ' + f(p[0]) + ' ' + f(p[1]) + '"/>';
    });
    h += '<g class="origen"><circle cx="' + O[0] + '" cy="' + O[1] + '" r="9"/><text x="' + (O[0] - 12) + '" y="' + (O[1] + 30) + '">Turbaco</text></g>';
    COB.forEach(function (c) {
      var p = pt(c.a === 1 ? o.r1 : o.r2, c.ang), fin = o.anclaFin && c.a === 2;
      h += '<g class="ciudad" data-ciudad="' + c.id + '"><circle class="blanco-toque" cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="18"/><circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="6.5"/><text x="' + f(p[0] + (fin ? -12 : 12)) + '" y="' + f(p[1] + 4.5) + '"' + (fin ? ' text-anchor="end"' : '') + '>' + c.n + '</text></g>';
    });
    return h + '</svg>';
  }
  function resultadoCobHTML(c) {
    if (!c) {
      var msgO = 'Hola, Mundilácteos. Quiero cotizar despacho a ____.';
      return '<h3>Otra ciudad</h3><p>Escríbanos y le decimos cómo llegar a su ciudad: un asesor le responde con el tiempo y el costo del despacho.</p><div class="acciones">' + btnWA(msgO, 'Escribir a un asesor') + '<a class="enlace" href="#donde-comprar">Dónde comprar</a></div>' + lineaWA(msgO);
    }
    var costa = c.a === 1, msg = 'Hola, Mundilácteos. Quiero cotizar despacho a ' + c.n + '.';
    return '<h3>' + c.n + '</h3><dl class="ficha-datos-lista"><dt>Anillo</dt><dd>' + (costa ? 'Costa Caribe' : 'Resto del país') + '</dd>' +
      '<dt>Entrega</dt><dd>' + (costa ? T_COSTA : T_RESTO) + ' desde la confirmación ' + porConfirmar('tiempo de ejemplo') + '</dd>' +
      '<dt>Pedido mínimo</dt><dd>' + porConfirmar() + '</dd><dt>Le atiende</dt><dd>Asesor comercial ' + (costa ? 'de la Costa Caribe' : 'para el interior') + ' ' + porConfirmar('nombre por confirmar') + '</dd></dl>' +
      '<div class="acciones">' + btnWA(msg, costa ? 'Escribir al asesor de la Costa' : 'Escribir a un asesor') + '<a class="enlace" href="#cotizar~ciudad-' + c.id + '">Cotizar para ' + c.n + '</a></div>' + lineaWA(msg);
  }
  VISTAS.distribucion = function (r) {
    var sel = null; (r.params || []).forEach(function (t) { if (cobPorId(t)) sel = t; });
    sel = sel || 'barranquilla';
    var ancho = anillosSVG({ clase: 'anillos-ancho', w: 640, h: 600, O: [56, 300], r1: 190, a1: 72, r2: 390, a2: 46, anclaFin: false,
      etiquetas: '<text class="anillo-etq" x="96" y="532">Costa Caribe: ' + T_COSTA + '*</text><text class="anillo-etq" x="330" y="596">Resto del país: ' + T_RESTO + '*</text>' });
    var compacto = anillosSVG({ clase: 'anillos-compacto', w: 360, h: 330, O: [28, 165], r1: 120, a1: 70, r2: 250, a2: 40, anclaFin: false });
    var chips = COB.map(function (c) {
      return '<label class="chip"><input type="radio" name="cob-ciudad" value="' + c.id + '"' + (c.id === sel ? ' checked' : '') + '><span class="chip-cara">' + CHECK + c.n + '</span></label>';
    }).join('') + '<label class="chip"><input type="radio" name="cob-ciudad" value="otra"><span class="chip-cara">' + CHECK + 'Otra ciudad</span></label>';
    var filas = COB.map(function (c) {
      var costa = c.a === 1;
      return '<tr data-fila="' + c.id + '"><th scope="row">' + c.n + '</th><td>' + (costa ? 'Costa Caribe' : 'Resto del país') + '</td><td>' + (costa ? T_COSTA : T_RESTO) + '*</td><td>' + porConfirmar() + '</td><td>Asesor ' + (costa ? 'de la Costa' : 'del interior') + '*</td><td><a href="#cotizar~ciudad-' + c.id + '">Cotizar para ' + c.n + '</a></td></tr>';
    }).join('') + '<tr><th scope="row">Otras ciudades</th><td>—</td><td>Consultar</td><td>Consultar</td><td>Un asesor</td><td><a href="' + esc(waUrl('Hola, Mundilácteos. Quiero cotizar despacho a ____.')) + '" target="_blank" rel="noopener">Escribir por WhatsApp<span class="sr">, abre WhatsApp</span></a></td></tr>';
    var html = cabeza({
      titulo: 'Distribución y cobertura', rastro: [['Inicio', '#inicio'], ['Cobertura', '']],
      entradilla: 'Salimos de Turbaco hacia toda Colombia. Elija su ciudad para ver el tiempo de entrega y quién le atiende.',
      lado: enPagina('distribucion', [['h2-anillos-c', 'Anillos desde Turbaco'], ['h2-ciudades', 'Ciudades y tiempos'], ['h2-despacho', 'Cómo despachamos'], ['h2-distribuidor', 'Ser distribuidor']])
    }) +
      '<section class="bloque" aria-labelledby="h2-anillos-c" style="padding-top:var(--esp-4)"><div class="contenedor">' + titulo2('h2-anillos-c', 'Anillos desde Turbaco.', 'bloque-titulo') +
        '<div class="cobertura-rejilla"><figure>' + ancho + compacto +
          '<figcaption class="meta" style="margin-top:0.75rem">Los anillos ordenan las ciudades por tiempo de entrega, no por distancia. Primer anillo, Costa Caribe: ' + T_COSTA + '. Segundo anillo, resto del país: ' + T_RESTO + '. * Tiempos de ejemplo, por confirmar con el área comercial.</figcaption></figure>' +
        '<div class="cob-ciudades"><fieldset><legend class="etiqueta" style="margin-bottom:0.5rem">Su ciudad</legend><div class="chips">' + chips + '</div></fieldset>' +
          '<div class="cob-resultado" id="cob-resultado" aria-live="polite">' + resultadoCobHTML(cobPorId(sel)) + '</div></div></div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-ciudades"><div class="contenedor">' + titulo2('h2-ciudades', 'Ciudades, tiempos y asesores.', 'bloque-titulo') +
        '<div class="tabla-marco tabla-ciudades" tabindex="0" role="region" aria-labelledby="cap-ciudades"><table class="tabla tabla-fija"><caption id="cap-ciudades">Tiempos de entrega y pedido mínimo por ciudad (datos a confirmar)</caption>' +
        '<thead><tr><th scope="col">Ciudad</th><th scope="col">Anillo</th><th scope="col">Entrega</th><th scope="col">Pedido mínimo</th><th scope="col">Le atiende</th><th scope="col">Acción</th></tr></thead><tbody>' + filas + '</tbody></table></div>' +
        '<p class="nota" style="margin-top:0.75rem">* Tiempo de ejemplo desde la confirmación del pedido y asesor por zona: datos a confirmar con el área comercial, igual que el pedido mínimo.</p></div></section>' +
      '<section class="panel-bruma arco-sup seccion" aria-labelledby="h2-despacho"><div class="contenedor dos-col centrado">' +
        '<div class="con-tilt">' + escenaGrupo([itemPack('bultos-trio.webp', 'Tres bultos: The Cántaro Entera de 25 kg, La Becerrita Mezcla Láctea de 25 kg y The Cántaro Mezcla Láctea de 12,5 kg', 'ancho')], 'despacho-escena') + '</div>' +
        '<div>' + titulo2('h2-despacho', 'Cómo despachamos.') + '<p style="margin-top:1rem">Despachamos a toda Colombia desde el Parque Industrial Europark, en el km 1 de la vía a Turbaco (Bolívar), en el área metropolitana de Cartagena.</p>' +
          '<dl class="ficha-datos-lista" style="margin-top:1.25rem"><dt>Origen</dt><dd>Parque Industrial Europark, Turbaco (Bolívar)</dd><dt>Formatos</dt><dd>Pacas de 12 a 30 bolsas y bultos de 12,5 y 25' + NB + 'kg</dd>' +
          '<dt>Tiempos</dt><dd>Costa Caribe: ' + T_COSTA + '. Resto del país: ' + T_RESTO + '. ' + porConfirmar() + '</dd><dt>Pedido mínimo</dt><dd>' + porConfirmar() + '</dd><dt>Días de despacho</dt><dd>' + porConfirmar() + '</dd></dl>' +
          '<div class="acciones" style="margin-top:1.5rem"><a class="btn btn-primario" href="#cotizar">Cotizar por volumen</a></div></div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-distribuidor" id="ser-distribuidor"><div class="contenedor dos-col siete-cinco">' +
        '<div id="caja-distribuidor">' + titulo2('h2-distribuidor', 'Ser distribuidor.') +
          '<p style="margin:1rem 0 1.5rem">¿Tiene una distribuidora, un mayorista o una red de tiendas? Déjenos sus datos y un asesor de su zona le escribe para conocer su negocio.</p>' +
          '<form class="form-corto" id="form-distribuidor" novalidate>' + resumenErroresHTML() +
            campoTexto('d-empresa', 'Empresa', ' name="empresa" type="text" autocomplete="organization" required', 'Escriba el nombre de su empresa.') +
            '<div class="dos-campos">' + campoTexto('d-ciudad', 'Ciudad', ' name="ciudad" type="text" list="d-lista-ciudades" autocomplete="address-level2" required', 'Escriba su ciudad.') +
              campoWA('d-wa') + '</div>' +
            '<datalist id="d-lista-ciudades">' + CIUDADES.map(function (c) { return '<option value="' + c + '">'; }).join('') + '</datalist>' +
            campoTexto('d-zona', 'Zona que atiende', ' name="zona" type="text" required', 'Cuéntenos qué zona atiende.', 'Barrios, municipios o departamentos donde vende.') +
            campoAcepto('d-acepto', 'responder esta solicitud') +
            '<div class="acciones acciones-apiladas"><button class="btn btn-primario" type="submit">Quiero ser distribuidor</button></div>' +
          '</form></div>' +
        '<aside class="recuadro" aria-labelledby="h3-casa"><h3 id="h3-casa">¿Es para su casa?</h3><p>The Cántaro está en supermercados de la Costa y del país.</p><div class="acciones" style="margin-top:1rem"><a class="btn btn-secundario" href="#donde-comprar">Ver dónde comprar</a></div>' +
          '<h3 style="margin-top:1.75rem">Qué pasa después</h3><p>Un asesor de su zona le escribe por WhatsApp, conoce su negocio y le envía las condiciones. ' + porConfirmar('condiciones por confirmar') + '</p></aside>' +
      '</div></section>';
    return { titulo: 'Distribución y cobertura', html: html, montar: function (vista) { montarCobertura(vista, sel, r); } };
  };
  function montarCobertura(vista, sel, r) {
    var res = $('#cob-resultado', vista);
    function marcar(id, anunciarlo) {
      $$('[data-ruta]', vista).forEach(function (el) { el.classList.toggle('activa', el.getAttribute('data-ruta') === id); });
      $$('.ciudad', vista).forEach(function (el) { el.classList.toggle('activa', el.getAttribute('data-ciudad') === id); });
      $$('[data-fila]', vista).forEach(function (el) { el.classList.toggle('activa', el.getAttribute('data-fila') === id); });
      if (anunciarlo) {
        res.innerHTML = resultadoCobHTML(cobPorId(id));
        if (!reducido()) { res.classList.remove('cambia'); void res.offsetWidth; res.classList.add('cambia'); }
        try { history.replaceState(null, '', '#distribucion' + (cobPorId(id) ? '~' + id : '')); rutaActual = leerRuta(); } catch (e) { /* sin historial */ }
      }
    }
    window.requestAnimationFrame(function () { marcar(sel, false); });
    vista.addEventListener('change', function (e) { if (e.target.name === 'cob-ciudad') marcar(e.target.value, true); });
    vista.addEventListener('click', function (e) {
      var g = e.target.closest('.ciudad[data-ciudad]'); if (!g) return;
      var input = $('input[name="cob-ciudad"][value="' + g.getAttribute('data-ciudad') + '"]', vista);
      if (input && !input.checked) { input.checked = true; marcar(input.value, true); }
    });
    var form = $('#form-distribuidor', vista);
    montarFormulario(form, {
      'd-empresa': { nombre: 'Empresa', ok: validaTexto(2) }, 'd-ciudad': { nombre: 'Ciudad', ok: validaTexto(3) },
      'd-wa': { nombre: 'WhatsApp', ok: validaWA }, 'd-zona': { nombre: 'Zona que atiende', ok: validaTexto(3) },
      'd-acepto': { nombre: 'Autorización de datos', ok: function (v) { return v === true; } }
    }, function (v) {
      confirmar($('#caja-distribuidor', vista), { id: 'h2-dist-ok', titulo: 'Solicitud enviada.', texto: 'Un asesor de su zona le escribe por WhatsApp en horario hábil para conocer ' + esc(v('d-empresa')) + '.',
        msg: 'Hola, Mundilácteos. Envié la solicitud N.º {n} para ser distribuidor. Empresa: ' + v('d-empresa') + '. Ciudad: ' + v('d-ciudad') + '. Zona: ' + v('d-zona') + '.' });
    });
    if ((r.params || []).indexOf('distribuidor') !== -1) {
      window.setTimeout(function () { var h = $('#h2-distribuidor', vista); if (h) { h.scrollIntoView({ block: 'start' }); h.focus({ preventScroll: true }); } }, 80);
    }
  }

  /* ---------- Dónde comprar ---------- */
  var COORD = { 'Cartagena': [10.391, -75.479], 'Turbaco': [10.332, -75.412], 'Barranquilla': [10.964, -74.796], 'Santa Marta': [11.241, -74.199], 'Montería': [8.748, -75.881], 'Sincelejo': [9.304, -75.397], 'Valledupar': [10.463, -73.253], 'Riohacha': [11.544, -72.907], 'Medellín': [6.244, -75.581], 'Bogotá': [4.711, -74.072], 'Cali': [3.451, -76.532], 'Bucaramanga': [7.119, -73.122] };
  var PRINCIPALES = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga'];
  function ciudadCanonica(t) { var n = normal(t).trim(); for (var i = 0; i < CIUDADES.length; i++) if (normal(CIUDADES[i]) === n) return CIUDADES[i]; return null; }
  function slugCiudad(n) { return normal(n).trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function ciudadDeSlug(s) { for (var i = 0; i < CIUDADES.length; i++) if (slugCiudad(CIUDADES[i]) === s) return CIUDADES[i]; return null; }
  function resultadosDondeHTML(texto) {
    var nombre = ciudadCanonica(texto);
    var dist = '<a class="btn btn-secundario" href="#distribucion~distribuidor">Ser distribuidor</a>';
    if (!nombre) {
      var enLinea = C.canales.filter(function (c) { return c.region === 'Nacional'; });
      return '<div class="resultado-cabeza"><h2 id="h2-res-donde" tabindex="-1">Aún no tenemos un punto de venta confirmado en ' + esc(texto) + '.</h2></div>' +
        '<div class="sin-cobertura"><p>Si tiene una tienda, puede ser distribuidor. Mientras tanto, The Cántaro está publicada en tiendas en línea de alcance nacional:</p><ul class="puntos">' + enLinea.map(function (c) { return puntoHTML(c, null); }).join('') + '</ul><div class="acciones">' + dist + '</div></div>';
    }
    var costa = COSTA.indexOf(nombre) !== -1;
    var lista = C.canales.filter(function (c) {
      if (c.region === 'Nacional') return true;
      if (c.region === 'Costa Caribe') return costa;
      if (c.region === 'Ciudades principales') return PRINCIPALES.indexOf(nombre) !== -1;
      return false;
    });
    return '<div class="resultado-cabeza"><h2 id="h2-res-donde" tabindex="-1">Dónde buscar The Cántaro en ' + esc(nombre) + '</h2>' +
      '<p class="nota">' + lista.length + ' cadenas, según el catálogo del ' + fechaCO(C.actualizado) + '. La lista de puntos de venta con dirección, horario y WhatsApp la entrega Mundilácteos. ' + porConfirmar() + '</p></div>' +
      '<ul class="puntos">' + lista.map(function (c) { return puntoHTML(c, nombre); }).join('') + '</ul>' +
      '<div class="acciones" style="margin-top:1.25rem"><a class="btn btn-primario" href="#cotizar~ciudad-' + slugCiudad(nombre) + '">¿Para su negocio? Cotizar por volumen</a>' + dist + '</div>';
  }
  function puntoHTML(c, ciudad) {
    var pendiente = /por confirmar|Aliado/i.test(c.estado);
    var estado = c.estado + (ciudad === 'Bogotá' && c.nombre === 'Rappi' ? '' : '');
    var acciones = [];
    if (c.url) acciones.push(enlaceExterno(c.url, 'Ver tienda en línea', ' de ' + c.nombre + ', abre otra pestaña'));
    if (ciudad && c.tipo === 'Supermercado') acciones.push(enlaceExterno('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(c.nombre + ' ' + ciudad), icono('i-lugar') + 'Cómo llegar', ' a ' + c.nombre + ' en ' + ciudad + ', abre Google Maps'));
    return '<li class="punto"><div><h3>' + esc(c.nombre) + '</h3><p class="tipo">' + esc(c.tipo) + '. ' + esc(c.region) + '.</p></div>' +
      '<p class="estado">' + (pendiente ? esc(estado) + ' ' + porConfirmar() : '<span class="verificado">' + icono('i-verificado') + '<span>' + esc(estado) + '</span></span>') + '</p>' +
      '<div class="acciones">' + (acciones.join('') || '<span class="nota">Horario y dirección ' + porConfirmar() + '</span>') + '</div></li>';
  }
  VISTAS['donde-comprar'] = function (r) {
    var inicial = null; (r.params || []).forEach(function (t) { if (ciudadDeSlug(t)) inicial = ciudadDeSlug(t); });
    var refs = [];
    PRODS.forEach(function (p) { p.presentaciones.forEach(function (x) { if (x.donde && x.donde.length) refs.push([p, x]); }); });
    var cadenas = ['Megatiendas', 'Carulla', 'Éxito'];
    var filas = refs.map(function (rf) {
      var p = rf[0], x = rf[1], im = imagenDe(p, x);
      var celdas = cadenas.map(function (cad) {
        var d = x.donde.filter(function (y) { return y.canal === cad; })[0];
        return '<td>' + (d ? enlaceExterno(d.url, 'Ver ficha', ' de ' + referencia(p, x) + ' en ' + cad + ', abre otra pestaña') : '<span aria-hidden="true">—</span><span class="sr">No publicada</span>') + '</td>';
      }).join('');
      return '<tr><th scope="row"><span class="ref-celda">' + (im ? '<img src="' + im.src + '" width="' + im.w + '" height="' + im.h + '" alt="" loading="lazy">' : '<svg viewBox="0 0 48 64" aria-hidden="true"><use href="#p-bolsa"/></svg>') + '<a href="#producto-' + p.slug + '~' + presKey(x.contenido) + '">' + esc(referencia(p, x)) + '</a></span></th>' + celdas + '</tr>';
    }).join('');
    var rapidas = ['Cartagena', 'Barranquilla', 'Santa Marta', 'Montería', 'Bogotá', 'Medellín'];
    var html = '<section class="banda azul arco-inf cabeza-banda oscuro"><div class="contenedor">' + migas([['Inicio', '#inicio'], ['Cobertura', '#distribucion'], ['Dónde comprar', '']]) +
        '<div class="cabeza-productos"><div><h1>Dónde comprar</h1><p class="entradilla">The Cántaro está en supermercados de la Costa y del país. Busque su ciudad.</p></div>' +
        '<form class="buscar-ciudad" id="form-donde" role="search" novalidate><label for="dc-ciudad">Su ciudad</label><div class="buscar-fila">' +
          '<input class="control" id="dc-ciudad" name="ciudad" type="text" list="dc-lista" autocomplete="address-level2" placeholder="Nombre de su ciudad"' + (inicial ? ' value="' + esc(inicial) + '"' : '') + '>' +
          '<datalist id="dc-lista">' + CIUDADES.map(function (c) { return '<option value="' + c + '">'; }).join('') + '</datalist>' +
          '<button class="btn btn-primario" type="submit">' + icono('i-buscar') + 'Buscar</button></div>' +
          '<div class="acciones"><button class="btn btn-secundario solo-js" type="button" id="dc-ubicacion">' + icono('i-lugar') + 'Usar mi ubicación</button></div>' +
          '<p class="estado-ubicacion" id="dc-estado" aria-live="polite"></p></form></div></div></section>' +
      '<section class="bloque" aria-label="Resultados de la búsqueda"><div class="contenedor"><div id="dc-resultados" aria-live="polite">' +
        (inicial ? resultadosDondeHTML(inicial) : '<div class="resultado-cabeza"><h2 id="h2-res-donde" tabindex="-1">Elija su ciudad.</h2><p class="nota">O empiece por una de estas:</p></div>') + '</div>' +
        '<div class="chips" style="margin-top:1rem" id="dc-rapidas">' + rapidas.map(function (c) { return '<button class="chip chip-enlace" type="button" data-ciudad-rapida="' + c + '"><span class="chip-cara">' + icono('i-lugar') + c + '</span></button>'; }).join('') + '</div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-en-linea"><div class="contenedor dos-col siete-cinco centrado"><div>' + titulo2('h2-en-linea', 'Pídala en línea.', 'bloque-titulo') +
        '<p class="bloque-intro">Enlaces a la ficha exacta de cada presentación en los supermercados que la publican. Se verifican en cada actualización del sitio.</p>' +
        '<div class="tabla-marco en-linea-tabla" tabindex="0" role="region" aria-labelledby="cap-en-linea"><table class="tabla tabla-fija"><caption id="cap-en-linea">Presentaciones con ficha en supermercados en línea, al ' + fechaCO(C.actualizado) + '</caption><thead><tr><th scope="col">Presentación</th>' + cadenas.map(function (c) { return '<th scope="col">' + c + '</th>'; }).join('') + '</tr></thead><tbody>' + filas + '</tbody></table></div></div>' +
        '<div class="con-tilt">' + escenaGrupo([itemPack('cantaro-entera-500g.webp', 'The Cántaro Entera, bolsa de leche en polvo', 'bolsa'), itemPack('cantaro-azucarada-380g.webp', 'The Cántaro Azucarada, bolsa de 380 g', 'bolsa-chica')], 'escena-media') + '<p class="pie-escena">Empaques de 2022, provisionales hasta las fotos «Nueva imagen».</p></div>' +
      '</div></section>' +
      '<section class="panel-bruma arco-sup seccion" aria-labelledby="h2-cadenas"><div class="contenedor">' + titulo2('h2-cadenas', 'Cadenas donde se consigue.', 'bloque-titulo') +
        '<ul class="canales-lista">' + C.canales.map(function (c) {
          var pend = /por confirmar|Aliado/i.test(c.estado);
          return '<li><strong>' + esc(c.nombre) + '</strong><span>' + esc(c.tipo) + '. ' + esc(c.region) + '</span><span>' + esc(c.estado) + (pend ? ' ' + porConfirmar() : '') + (c.url ? '. ' + enlaceExterno(c.url, 'Ir al sitio', ' de ' + c.nombre + ', abre otra pestaña') : '') + '</span></li>';
        }).join('') + '</ul>' +
        '<div style="margin-top:var(--esp-6)">' + marcoToma('C03', 'Góndola con The Cántaro en un supermercado de Cartagena, con permiso de la cadena, por fotografiar.', 'p-bolsa', 'marco-ancho') + '</div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-tienda"><div class="contenedor dos-col siete-cinco"><div>' + titulo2('h2-tienda', '¿Tiene una tienda?') +
        '<p style="margin-top:1rem">Aún no tenemos un punto de venta en todas las ciudades. Si tiene una tienda o una distribuidora, puede vender The Cántaro y La Becerrita.</p>' +
        '<div class="acciones" style="margin-top:1.25rem"><a class="btn btn-primario" href="#distribucion~distribuidor">Ser distribuidor</a><a class="enlace" href="#productos~negocio-tienda">Ver pacas para tienda</a></div></div>' +
        '<aside class="recuadro" aria-labelledby="h3-volumen"><h3 id="h3-volumen">¿Compra para su negocio?</h3><p>Por paca o por bulto, directo de la planta, con precio por volumen.</p><div class="acciones" style="margin-top:1rem"><a class="btn btn-secundario" href="#cotizar">Solicitar cotización</a></div>' +
          '<p class="nota" style="margin-top:1rem">Sin mapa incrustado: «Cómo llegar» abre Google Maps solo cuando usted lo pide.</p></aside></div></section>';
    return { titulo: 'Dónde comprar', html: html, montar: montarDonde };
  };
  function montarDonde(vista) {
    var form = $('#form-donde', vista), input = $('#dc-ciudad', vista), res = $('#dc-resultados', vista), estado = $('#dc-estado', vista);
    function buscar(texto, enfocar) {
      texto = String(texto || '').trim();
      if (!texto) { estado.textContent = 'Escriba el nombre de su ciudad.'; input.focus(); return; }
      estado.textContent = '';
      res.innerHTML = resultadosDondeHTML(texto);
      var nombre = ciudadCanonica(texto);
      try { history.replaceState(null, '', '#donde-comprar' + (nombre ? '~' + slugCiudad(nombre) : '')); rutaActual = leerRuta(); } catch (e) { /* sin historial */ }
      if (enfocar) { var h = $('#h2-res-donde', res); if (h) { h.focus({ preventScroll: true }); h.scrollIntoView({ block: 'start', behavior: reducido() ? 'auto' : 'smooth' }); } }
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); buscar(input.value, true); });
    vista.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ciudad-rapida]'); if (!b) return;
      input.value = b.getAttribute('data-ciudad-rapida'); buscar(input.value, true);
    });
    $('#dc-ubicacion', vista).addEventListener('click', function () {
      if (!navigator.geolocation) { estado.textContent = 'Este navegador no comparte la ubicación. Escriba su ciudad.'; return; }
      estado.textContent = 'Buscando su ubicación…';
      try {
        navigator.geolocation.getCurrentPosition(function (pos) {
          var la = pos.coords.latitude, lo = pos.coords.longitude, mejor = null, dmin = Infinity;
          Object.keys(COORD).forEach(function (c) { var d = Math.pow(COORD[c][0] - la, 2) + Math.pow((COORD[c][1] - lo) * Math.cos(la * Math.PI / 180), 2); if (d < dmin) { dmin = d; mejor = c; } });
          var km = Math.sqrt(dmin) * 111;
          if (mejor && km < 60) { input.value = mejor; estado.textContent = 'Usamos su ubicación: está cerca de ' + mejor + '.'; buscar(mejor, true); }
          else { estado.textContent = 'No encontramos una ciudad con puntos de venta cerca de usted. Escriba su ciudad.'; }
        }, function () {
          estado.textContent = 'No pudimos usar su ubicación. Escriba su ciudad.';
        }, { timeout: 8000, maximumAge: 600000 });
      } catch (err) { estado.textContent = 'No pudimos usar su ubicación. Escriba su ciudad.'; }
    });
  }

  /* ---------- Con su marca (maquila) ---------- */
  VISTAS['marca-propia'] = function () {
    var gr = C.maquila.gramajes, bolsas = gr.filter(function (g) { return / g$/.test(g); }), bultos = gr.filter(function (g) { return / kg$/.test(g); });
    var altMP = ['Bolsa de leche en polvo entera de marca propia de una cadena, empacada por Mundilácteos', 'Bolsa de leche en polvo entera de otra marca propia, empacada por Mundilácteos', 'Bolsa de leche en polvo entera azucarada de marca propia, empacada por Mundilácteos'];
    var dimMP = { 'marca-propia-a.webp': [240, 366], 'marca-propia-b.webp': [245, 341], 'marca-propia-c.webp': [255, 352] };
    var bolsasMP = C.maquila.imagenes.map(function (a, i) { var d = dimMP[a] || [240, 360]; return '<div class="item"><img src="img/' + a + '" width="' + d[0] + '" height="' + d[1] + '" alt="' + altMP[i] + '"' + (i ? ' loading="lazy"' : '') + '></div>'; }).join('');
    var pasos = [
      { titulo: 'Muestras y especificación', texto: 'Nos cuenta qué presentaciones, tipos de leche y volúmenes necesita, y le enviamos muestras para evaluar.' },
      { titulo: 'Arte del empaque', texto: 'Su cadena aporta el diseño con su marca. Le indicamos los datos que la etiqueta debe llevar.' },
      { titulo: 'Aprobación de arte y registro', texto: 'Revisamos juntos el arte final y su amparo en el registro sanitario RSA-006359-2018.' },
      { titulo: 'Producción y despacho', texto: 'Empacamos en Turbaco y despachamos a sus centros de distribución. Tiempos: ' + porConfirmar() }
    ];
    var paca = Object.keys(C.unidades_por_paca).map(function (g) {
      var u = C.unidades_por_paca[g], gramos = parseInt(g, 10);
      return '<tr><th scope="row">' + conUnidad(g) + '</th><td class="der">' + u + '</td><td class="der">' + kg(u * gramos / 1000) + '</td></tr>';
    }).join('');
    var reg = REGS['RSA-006359-2018'];
    var msg = 'Hola, Mundilácteos. Quiero información para empacar leche en polvo con mi marca. Empresa: ____. Ciudad: ____.';
    var html = '<section class="cabeza-mp"><div class="banda azul arco-inf cabeza-banda oscuro"><div class="contenedor">' + migas([['Inicio', '#inicio'], ['Productos', '#productos'], ['Con su marca', '']]) +
        '<div class="cabeza-texto"><h1>Leche en polvo con la marca de su cadena</h1><p class="entradilla">Empacamos en Turbaco con nuestro registro sanitario vigente.</p>' +
        '<div class="acciones" style="margin-top:1.5rem"><a class="btn btn-primario" href="#marca-propia" data-ancla="h2-muestras">Pedir muestras</a>' + btnWA(msg, 'WhatsApp', 'btn-secundario') + '</div>' + lineaWA(msg) + '</div></div></div>' +
        '<div class="mp-bolsas"><div class="escena marca-escena"><div class="grupo">' + bolsasMP + '</div></div></div>' +
        '<p class="pie-escena mp-aviso">Empaques de marcas propias fabricados por Mundilácteos en 2022. Se muestran con autorización del cliente. No publicamos las marcas que empacamos sin autorización escrita.</p></section>' +
      '<section class="bloque" aria-labelledby="h2-ofrecemos"><div class="contenedor gramajes-rejilla"><div>' + titulo2('h2-ofrecemos', 'Qué empacamos con su marca.') +
          '<div class="gramajes-grupo" style="margin-top:1.5rem"><p class="etiqueta">En bolsa</p><ul class="gramajes">' + bolsas.map(function (g) { return '<li>' + conUnidad(g) + '</li>'; }).join('') + '</ul></div>' +
          '<div class="gramajes-grupo"><p class="etiqueta">En bulto</p><ul class="gramajes">' + bultos.map(function (g) { return '<li>' + conUnidad(g) + '</li>'; }).join('') + '</ul></div></div>' +
        '<dl class="ficha-datos-lista"><dt>Tipos</dt><dd>' + esc(reg.producto.replace(/^Leche en polvo: /, 'Leche en polvo ')) + '</dd><dt>Registro</dt><dd>' + reg.numero + ', vigente hasta el ' + fechaCO(reg.vence) + '. Condiciones de uso ' + porConfirmar() + '</dd>' +
          '<dt>Respaldo</dt><dd>' + esc(C.maquila.evidencia) + '</dd></dl>' +
      '</div></section>' +
      '<section class="panel-bruma arco-sup seccion" aria-labelledby="h2-como-mp"><div class="contenedor">' + titulo2('h2-como-mp', 'Cómo trabajamos.') + recorridoHTML(pasos, 'pasos') + '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-espec"><div class="contenedor dos-col siete-cinco"><div>' + titulo2('h2-espec', 'Ficha de especificación.', 'bloque-titulo') +
          '<div class="tabla-marco" tabindex="0" role="region" aria-labelledby="cap-espec"><table class="tabla tabla-tecnica"><caption id="cap-espec">Especificación de la leche en polvo con marca propia</caption><tbody>' +
          '<tr><th scope="row">Producto</th><td>' + esc(reg.producto) + '</td></tr><tr><th scope="row">Registro INVIMA</th><td>' + reg.numero + ', vigente hasta el ' + fechaCO(reg.vence) + '. <a href="' + INVIMA + '" target="_blank" rel="noopener">Verificar<span class="sr">, abre otra pestaña</span></a></td></tr>' +
          '<tr><th scope="row">Empaque de la bolsa</th><td>' + esc(C.calidad.empaque.bolsa) + '</td></tr><tr><th scope="row">Empaque del bulto</th><td>' + esc(C.calidad.empaque.bulto) + '</td></tr>' +
          '<tr><th scope="row">Vida útil</th><td>' + C.calidad.vida_util_meses + ' meses, con el empaque cerrado</td></tr><tr><th scope="row">Pedido mínimo</th><td>' + porConfirmar() + '</td></tr><tr><th scope="row">Tiempo de producción</th><td>' + porConfirmar() + '</td></tr>' +
          '</tbody></table></div>' +
          '<div class="tabla-marco tabla-paca" tabindex="0" role="region" aria-labelledby="cap-paca" style="margin-top:var(--esp-5)"><table class="tabla"><caption id="cap-paca">Bolsas por paca según el gramaje ' + porConfirmar('confirmar por referencia') + '</caption><thead><tr><th scope="col">Gramaje</th><th scope="col" class="der">Bolsas por paca</th><th scope="col" class="der">Peso de la paca</th></tr></thead><tbody>' + paca + '</tbody></table></div></div>' +
        '<div class="recuadro"><h3>Lo que necesitamos de su cadena</h3><ul class="texto-sans" style="margin:0.75rem 0 0;padding-left:1.25rem;display:grid;gap:0.5rem"><li>Razón social y NIT.</li><li>Presentaciones y volumen mensual estimado.</li><li>El arte del empaque con su marca.</li><li>Ciudades de despacho.</li></ul>' +
          '<h3 style="margin-top:1.75rem">Lo que le confirma el área comercial</h3><ul class="texto-sans" style="margin:0.75rem 0 0;padding-left:1.25rem;display:grid;gap:0.5rem"><li>Pedido mínimo ' + porConfirmar() + '</li><li>Tiempo de producción ' + porConfirmar() + '</li><li>Titularidad del registro para su marca ' + porConfirmar() + '</li></ul></div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-muestras"><div class="contenedor dos-col siete-cinco"><div id="caja-muestras">' + titulo2('h2-muestras', 'Pedir muestras.') +
          '<p style="margin:1rem 0 1.5rem">Cuéntenos qué necesita su cadena. Un asesor le escribe para coordinar el envío de muestras.</p>' +
          '<form class="form-corto" id="form-muestras" novalidate>' + resumenErroresHTML() +
            '<div class="dos-campos">' + campoTexto('m-empresa', 'Empresa', ' name="empresa" type="text" autocomplete="organization" required', 'Escriba el nombre de su empresa.') +
              campoTexto('m-nit', 'NIT', ' name="nit" type="text" inputmode="numeric" autocomplete="off"', null, null, true) + '</div>' +
            '<div class="dos-campos">' + campoTexto('m-nombre', 'Su nombre y cargo', ' name="nombre" type="text" autocomplete="name" required', 'Escriba su nombre y su cargo.') + campoWA('m-wa') + '</div>' +
            campoTexto('m-ciudad', 'Ciudad', ' name="ciudad" type="text" list="m-lista-ciudades" autocomplete="address-level2" required', 'Escriba su ciudad.') +
            '<datalist id="m-lista-ciudades">' + CIUDADES.map(function (c) { return '<option value="' + c + '">'; }).join('') + '</datalist>' +
            '<fieldset class="campo"><legend>Presentaciones de interés <span class="campo-opcional">(opcional)</span></legend><div class="chips">' + gr.map(function (g) { return '<label class="chip"><input type="checkbox" name="m-pres" value="' + g + '"><span class="chip-cara">' + CHECK + conUnidad(g) + '</span></label>'; }).join('') + '</div></fieldset>' +
            campoTexto('m-volumen', 'Volumen mensual estimado, en kilos', ' name="volumen" type="text" inputmode="numeric" autocomplete="off"', null, null, true) +
            campoAcepto('m-acepto', 'responder esta solicitud') +
            '<div class="acciones acciones-apiladas"><button class="btn btn-primario" type="submit">Pedir muestras</button></div></form></div>' +
        '<aside class="recuadro" aria-labelledby="h3-mp-wa"><h3 id="h3-mp-wa">¿Prefiere hablar ya?</h3><p>Escríbanos por WhatsApp al ' + TEL + ' o llámenos.</p><div class="acciones" style="margin-top:1rem">' + btnWA(msg, 'Escribir por WhatsApp') + '<a class="btn btn-secundario" href="' + TEL_HREF + '">' + icono('i-tel') + 'Llamar al ' + TEL + '</a></div></aside>' +
      '</div></section>';
    return { titulo: 'Con su marca', html: html, montar: function (vista) {
      var s = $('.cabeza-mp', vista);
      if (s && !reducido()) { s.classList.add('entra'); window.setTimeout(function () { s.classList.remove('entra'); }, 1200); }
      var form = $('#form-muestras', vista);
      montarFormulario(form, {
        'm-empresa': { nombre: 'Empresa', ok: validaTexto(2) }, 'm-nombre': { nombre: 'Su nombre y cargo', ok: validaTexto(3) },
        'm-wa': { nombre: 'WhatsApp', ok: validaWA }, 'm-ciudad': { nombre: 'Ciudad', ok: validaTexto(3) },
        'm-acepto': { nombre: 'Autorización de datos', ok: function (v) { return v === true; } }
      }, function (v) {
        var pres = $$('input[name="m-pres"]:checked', form).map(function (i) { return i.value; });
        confirmar($('#caja-muestras', vista), { id: 'h2-muestras-ok', titulo: 'Solicitud de muestras enviada.', texto: 'Un asesor le escribe por WhatsApp en horario hábil para coordinar las muestras de ' + esc(v('m-empresa')) + '.',
          msg: 'Hola, Mundilácteos. Envié la solicitud de muestras N.º {n}. Empresa: ' + v('m-empresa') + '. Ciudad: ' + v('m-ciudad') + (pres.length ? '. Presentaciones: ' + pres.join(', ') : '') + '.' });
      });
    } };
  };

  /* ---------- Recursos y artículos ---------- */
  var ARTICULOS = {
    'preparar-un-litro': { titulo: 'Cómo preparar leche con leche en polvo: rendimiento y reconstitución', tema: 'casa negocio', para: 'Para su casa y su negocio', min: 5, estado: 'Guía completa',
      entradilla: 'Cuánto polvo lleva un litro, cuánto rinde cada presentación y cómo prepararla bien. Con las cifras de la ficha técnica y de los empaques, lado a lado.' },
    'verificar-registro-invima': { titulo: 'Cómo verificar un registro sanitario en el INVIMA', tema: 'calidad', para: 'Para todos', min: 3, estado: 'Guía completa',
      entradilla: 'Cada empaque trae impreso su número de registro sanitario. Con ese número usted comprueba, en la consulta pública del INVIMA, quién está detrás del producto, qué ampara el registro y hasta cuándo está vigente.' },
    'leche-o-mezcla-lactea': { titulo: 'Leche en polvo o mezcla láctea: cómo diferenciarlas en la etiqueta', tema: 'casa calidad', para: 'Para su casa', min: 4, estado: 'Guía completa',
      entradilla: 'Se parecen en la bolsa, pero no son lo mismo. La denominación del frente y el registro sanitario le dicen qué está comprando.' },
    'guia-presentaciones': { titulo: 'Guía de presentaciones: qué bolsa o bulto le conviene', tema: 'negocio', para: 'Para su negocio', min: 4, estado: 'Guía completa',
      entradilla: 'Del hogar a la industria: qué presentación sirve para cada uso, cuántas bolsas trae cada paca y cuánto pesa.' },
    'guardar-bulto-abierto': { titulo: 'Cómo guardar un bulto abierto', tema: 'negocio calidad', para: 'Para su negocio', min: 3, estado: 'En preparación',
      entradilla: 'Recomendaciones del equipo de calidad para conservar la leche en polvo después de abrir el saco.' },
    'arroz-con-leche': { titulo: 'Arroz con leche costeño', tema: 'casa', para: 'Receta para su casa', min: 6, estado: 'Receta en prueba',
      entradilla: 'La receta de siempre, preparada con leche en polvo. Se publica cuando esté probada en cocina, con cantidades exactas.' }
  };
  function mencionadoHTML(slug, key) {
    var p = producto(slug), pr = key ? presentacion(p, key) : presPorDefecto(p);
    if (!p || !pr) return '';
    var im = imagenDe(p, pr), k = presKey(pr.contenido);
    return '<div class="mencionado" data-con-pack><div class="escena" data-ir="#producto-' + slug + '~' + k + '"><span class="franja" aria-hidden="true"></span><span class="brillo" aria-hidden="true"></span>' +
      (im ? '<img class="pack" src="' + im.src + '" width="' + im.w + '" height="' + im.h + '" alt="' + esc(im.alt) + '" loading="lazy">' : '<svg class="pictograma" viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><use href="#p-bolsa"/></svg>') +
      '<span class="sombra" aria-hidden="true"></span></div>' +
      '<p class="m-nombre"><a href="#producto-' + slug + '~' + k + '">' + esc(referencia(p, pr)) + '</a></p><p class="m-meta">' + esc(ventaDe(pr).texto) + '</p>' +
      '<button class="btn btn-primario btn-agregar" type="button" data-agregar="' + slug + '" data-pres="' + k + '">' + icono('i-mas', 'ico-mas') + icono('i-hecho', 'ico-hecho') + '<span class="txt">Agregar a mi cotización</span><span class="sr"> ' + esc(referencia(p, pr)) + '</span></button></div>';
  }
  function tablaRegistrosClaraHTML() {
    return '<div class="tabla-marco" tabindex="0" role="region" aria-labelledby="cap-reg-art"><table class="tabla tabla-fija" style="min-width:40rem"><caption id="cap-reg-art">Registros sanitarios de Mundilácteos (última verificación: 25/09/2026)</caption><thead><tr><th scope="col">Registro</th><th scope="col">Ampara</th><th scope="col">Vigente hasta</th><th scope="col"><span class="sr">Copiar</span></th></tr></thead><tbody>' +
      C.calidad.registros.map(function (r) { return '<tr><th scope="row" class="num nw">' + r.numero + '</th><td>' + esc(r.producto) + '</td><td class="num">' + fechaCO(r.vence) + '</td><td>' + btnCopiar(r.numero, 'Copiar', 'Copiado', r.numero) + '</td></tr>'; }).join('') + '</tbody></table></div>';
  }
  function cuerpoArticulo(slug) {
    var gl = C.calidad.preparacion.g_por_litro;
    if (slug === 'verificar-registro-invima') {
      return { cuerpo:
        '<h2>En cuatro pasos</h2><ol class="pasos-articulo">' +
          '<li><h3>Busque el número en el empaque</h3><p>Empieza por RSA y termina con el año en que se expidió, por ejemplo RSA-006359-2018. Está impreso en el empaque de cada producto.</p></li>' +
          '<li><h3>Abra la consulta pública del INVIMA</h3><p>El INVIMA es el Instituto Nacional de Vigilancia de Medicamentos y Alimentos. Su consulta de registros es pública.</p><div class="acciones"><a class="btn btn-secundario" href="' + INVIMA + '" target="_blank" rel="noopener">Abrir la consulta del INVIMA<span class="sr">, abre otra pestaña</span></a></div></li>' +
          '<li><h3>Busque por el número de registro</h3><p>Escríbalo tal como aparece en el empaque, con los guiones. Si es uno de los nuestros, cópielo de la tabla de abajo.</p></li>' +
          '<li><h3>Compare tres datos</h3><ul><li>Quién es el titular o el fabricante: en nuestros productos, Inversiones Mundilácteos S.A.S.</li><li>Qué ampara: el tipo de producto, por ejemplo leche en polvo entera.</li><li>El estado y la fecha de vencimiento del registro.</li></ul></li></ol>' +
        '<h2>Los cinco registros de Mundilácteos</h2>' + tablaRegistrosClaraHTML() +
        '<h2>También puede verificar la planta</h2><p>El INVIMA publica en datos.gov.co el estado de los establecimientos que vigila. La planta de Mundilácteos aparece activa, con concepto sanitario favorable para la línea «Leches en polvo y crema de leches en polvo».</p><p>' + enlaceExterno(DATOS_GOV, 'Ver el registro del establecimiento en datos.gov.co') + '</p>' +
        '<div class="recuadro"><h3>¿Algo no coincide?</h3><p>Si el número de un empaque no aparece en la consulta, o sus datos no corresponden, escríbanos con el lote y una foto del empaque.</p><div class="acciones" style="margin-top:1rem"><a class="btn btn-primario" href="#contacto~pqr">Reportar un producto</a></div></div>',
        mencionados: [['cantaro-entera', '900-g'], ['becerrita-mezcla-bulto', '25-kg']], cierre: [['Calidad y registros', '#calidad'], ['Por qué elegirnos', '#por-que-elegirnos']] };
    }
    if (slug === 'preparar-un-litro') {
      var filas = [];
      var agregar = function (nombre, gramos, empaque) { filas.push('<tr><th scope="row">' + nombre + '</th><td class="der">' + (empaque ? empaque : '<span aria-hidden="true">—</span><span class="sr">Sin dato en el empaque</span>') + '</td><td class="der">' + fmt(gramos / gl, 1) + NB + 'L</td></tr>'); };
      agregar('Bolsa de 380' + NB + 'g', 380, '3' + NB + 'L');
      agregar('Bolsa de 500' + NB + 'g', 500, null);
      agregar('Bolsa de 900' + NB + 'g', 900, '7' + NB + 'L');
      agregar('Paca de 30 bolsas de 380' + NB + 'g', 11400, '90' + NB + 'L');
      agregar('Paca de 12 bolsas de 900' + NB + 'g', 10800, '84' + NB + 'L');
      agregar('Bulto de 25' + NB + 'kg', 25000, null);
      return { cuerpo:
        '<h2>La proporción</h2><p>La ficha técnica publicada indica <strong>' + gl + NB + 'g de leche en polvo por cada litro de agua</strong>. Los empaques dicen algo parecido, pero no igual: la bolsa de 380' + NB + 'g rinde 3 litros (unos 127' + NB + 'g por litro) y la de 900' + NB + 'g, 7 litros (unos 129' + NB + 'g por litro). ' + porConfirmar('cifra por unificar con el cliente') + '</p>' +
        '<h2>Cómo prepararla</h2><ol class="pasos-articulo">' +
          '<li><h3>Mida la leche en polvo</h3><p>Para un litro, ' + gl + NB + 'g según la ficha técnica. Una balanza de cocina le da la medida exacta.</p></li>' +
          '<li><h3>Disuélvala en parte del agua</h3><p>Agregue el polvo a una parte del agua potable y mezcle hasta que no queden grumos.</p></li>' +
          '<li><h3>Complete el litro</h3><p>Agregue el resto del agua y vuelva a mezclar.</p></li>' +
          '<li><h3>Guarde lo preparado en frío</h3><p>Una vez preparada, consérvela en la nevera y consúmala pronto, como cualquier leche líquida.</p></li></ol>' +
        '<p class="nota">Siga siempre las indicaciones del empaque. Las mezclas lácteas tienen su propia preparación: esta guía es para leche en polvo.</p>' +
        '<h2>Cuánto rinde cada presentación</h2><div class="tabla-marco" tabindex="0" role="region" aria-labelledby="cap-rinde"><table class="tabla tabla-fija" style="min-width:30rem"><caption id="cap-rinde">Litros de leche preparada por presentación de leche en polvo entera</caption><thead><tr><th scope="col">Presentación</th><th scope="col" class="der">Según el empaque</th><th scope="col" class="der">A ' + gl + NB + 'g por litro</th></tr></thead><tbody>' + filas.join('') + '</tbody></table></div>' +
        '<p class="nota">«Según el empaque»: texto impreso en la bolsa. «A ' + gl + NB + 'g por litro»: cálculo con la ficha técnica, redondeado a un decimal. ' + porConfirmar() + '</p>' +
        '<h2>Para su negocio</h2><p>Si prepara leche en volumen, calcule con el peso y no con la cuchara: un bulto de 25' + NB + 'kg de leche entera da cerca de ' + fmt(Math.round(25000 / gl)) + ' litros a ' + gl + NB + 'g por litro. Para una panadería o una heladería, pese el polvo en cada tanda y anote el lote que usó.</p>',
        mencionados: [['cantaro-entera', '380-g'], ['cantaro-entera', '900-g'], ['cantaro-entera-bulto', '25-kg']], cierre: [['Guía de presentaciones', '#articulo-guia-presentaciones'], ['Ver productos', '#productos']] };
    }
    if (slug === 'leche-o-mezcla-lactea') {
      var filasM = PRODS.map(function (p) {
        var es = p.categoria.indexOf('leche') === 0 ? 'Sí: leche en polvo' : p.categoria === 'mezcla-lactea' ? 'No: mezcla láctea' : 'Es un alimento lácteo en polvo';
        return '<tr><th scope="row">' + esc(p.nombre) + '</th><td>' + esc(p.denominacion) + '</td><td class="num nw">' + p.registro + '</td><td>' + es + '</td></tr>';
      }).join('');
      return { cuerpo:
        '<h2>Mire la denominación</h2><p>Es el nombre legal del producto y va en el frente del empaque. «Leche en polvo entera» es leche. «Mezcla en polvo a base de leche y endulzante para preparar bebidas» es una mezcla láctea: tiene leche, pero también otros ingredientes, como endulzantes.</p>' +
        '<h2>Mire el registro sanitario</h2><p>En Mundilácteos, la leche en polvo lleva el registro RSA-006359-2018 y las mezclas en polvo a base de leche, el RSA-003008-2017. Puede verificar ambos en la consulta pública del INVIMA.</p><p><a class="enlace" href="#articulo-verificar-registro-invima">Cómo verificar un registro</a></p>' +
        '<h2>Mire los ingredientes y los sellos</h2><p>En la leche en polvo, el ingrediente es la leche, con sus vitaminas o minerales si está fortificada. En la mezcla láctea verá además endulzantes. Las mezclas y la leche azucarada pueden llevar el sello de advertencia «Exceso en azúcares». ' + porConfirmar('sellos por confirmar con la etiqueta vigente') + '</p>' +
        '<h2>Nuestros productos, uno por uno</h2><div class="tabla-marco" tabindex="0" role="region" aria-labelledby="cap-mezcla"><table class="tabla tabla-fija" style="min-width:44rem"><caption id="cap-mezcla">Denominación y registro de cada producto de Mundilácteos</caption><thead><tr><th scope="col">Producto</th><th scope="col">Denominación</th><th scope="col">Registro</th><th scope="col">¿Es leche?</th></tr></thead><tbody>' + filasM + '</tbody></table></div>' +
        '<h2>¿Cuál elegir?</h2><p>Para tomar como leche, elija leche en polvo. La mezcla láctea está pensada para bebidas calientes y frías, coladas y repostería, y tiene un precio accesible.</p>',
        mencionados: [['cantaro-entera', '900-g'], ['cantaro-mezcla', '900-g']], cierre: [['Ver productos', '#productos'], ['Calidad y registros', '#calidad']] };
    }
    if (slug === 'guia-presentaciones') {
      var bolsas = {};
      PRODS.forEach(function (p) { p.presentaciones.forEach(function (x) { if (x.formato === 'bolsa') { var b = bolsas[x.contenido] || (bolsas[x.contenido] = { g: x.gramos, u: x.unidades_por_paca, conf: false }); if (x.estado === 'confirmado') b.conf = true; } }); });
      var filasB = Object.keys(bolsas).sort(function (a, b) { return bolsas[a].g - bolsas[b].g; }).map(function (k) {
        var b = bolsas[k];
        return '<tr><th scope="row">' + conUnidad(k) + (b.conf ? '' : '*') + '</th><td class="der">' + b.u + '</td><td class="der">' + kg(b.u * b.g / 1000) + '</td></tr>';
      }).join('');
      return { cuerpo:
        tablaConvieneHTML() +
        '<h2>Bolsas por paca</h2><p>Las bolsas se venden por paca. El número de bolsas depende del gramaje:</p><div class="tabla-marco" tabindex="0" role="region" aria-labelledby="cap-bolsas-paca"><table class="tabla tabla-fija" style="min-width:24rem"><caption id="cap-bolsas-paca">Bolsas y peso por paca</caption><thead><tr><th scope="col">Bolsa</th><th scope="col" class="der">Bolsas por paca</th><th scope="col" class="der">Peso de la paca</th></tr></thead><tbody>' + filasB + '</tbody></table></div>' +
        '<p class="nota">* Presentación por confirmar. Unidades por paca publicadas en el sitio actual, por gramaje; se confirman por referencia. ' + porConfirmar() + '</p>' +
        '<h2>Bultos</h2><ul><li><strong>25' + NB + 'kg:</strong> The Cántaro Entera y La Becerrita Mezcla Láctea.</li><li><strong>12,5' + NB + 'kg:</strong> The Cántaro Mezcla Láctea. En leche entera, por confirmar.</li><li><strong>5' + NB + 'kg:</strong> leche entera, por confirmar.</li></ul>' +
        '<p>La mezcla láctea no es leche: úsela para bebidas, coladas y repostería. Para leche, elija The Cántaro Entera.</p>',
        mencionados: [['cantaro-entera', '900-g'], ['cantaro-entera-bulto', '25-kg'], ['becerrita-mezcla-bulto', '25-kg']], cierre: [['Ver productos', '#productos'], ['Solicitar cotización', '#cotizar']] };
    }
    if (slug === 'guardar-bulto-abierto') {
      return { cuerpo: '<div class="recuadro"><h3>Guía en preparación</h3><p>El equipo de calidad de Mundilácteos prepara estas recomendaciones. Incluirán cómo cerrar el saco después de abrirlo, dónde guardarlo y cuánto tiempo usar el producto abierto. ' + porConfirmar('contenido por entregar') + '</p></div>' +
        '<h2>Mientras tanto</h2><p>La vida útil de ' + C.calidad.vida_util_meses + ' meses aplica al empaque cerrado. Si tiene una duda sobre un bulto abierto, escríbanos con el lote.</p>',
        mencionados: [['cantaro-entera-bulto', '25-kg']], cierre: [['Contacto', '#contacto'], ['Ver recursos', '#recursos']] };
    }
    if (slug === 'arroz-con-leche') {
      return { cuerpo: '<div class="recuadro"><h3>Receta en prueba de cocina</h3><p>Publicamos recetas solo después de prepararlas y medirlas en cocina. Esta incluirá ingredientes con cantidades exactas, el paso a paso y cuánta leche en polvo usar. ' + porConfirmar('receta por probar') + '</p></div>' +
        '<h2>Mientras tanto</h2><p>Para preparar la leche que pide la receta, use la proporción de la guía de rendimiento.</p><p><a class="enlace" href="#articulo-preparar-un-litro">Cómo preparar leche con leche en polvo</a></p>',
        mencionados: [['cantaro-entera', '900-g']], cierre: [['Ver recursos', '#recursos']] };
    }
    return null;
  }
  VISTAS.recursos = function () {
    var temas = [['', 'Todos'], ['casa', 'Para su casa'], ['negocio', 'Para su negocio'], ['calidad', 'Calidad']];
    var lista = Object.keys(ARTICULOS).map(function (k) {
      var a = ARTICULOS[k];
      return '<li data-tema="' + a.tema + '"><a href="#articulo-' + k + '"><span class="g-titulo">' + esc(a.titulo) + '</span><span class="g-meta">' + esc(a.para) + '</span><span class="g-meta">' + a.min + ' min</span><span class="g-estado">' + esc(a.estado) + '</span></a></li>';
    }).join('');
    var fichas = PRODS.map(function (p) {
      return '<li><span class="f-nombre">' + esc(p.nombre) + '</span><span class="f-reg">' + p.registro + '</span><a href="#producto-' + p.slug + '">Ver en HTML<span class="sr"> la ficha técnica de ' + esc(p.nombre) + '</span></a>' +
        '<button class="btn-descargar solo-js" type="button" data-descargar-ficha="' + p.slug + '">' + icono('i-abajo') + 'Descargar (HTML, ' + pesoFicha(p) + ')<span class="sr"> ficha técnica de ' + esc(p.nombre) + '</span></button></li>';
    }).join('');
    var gl = C.calidad.preparacion.g_por_litro;
    var html = cabeza({ titulo: 'Recursos', entradilla: 'Guías, recetas y fichas técnicas para su casa y su negocio.' }) +
      '<section class="bloque" aria-labelledby="h2-destacado" style="padding-top:var(--esp-4)"><div class="contenedor destacado">' +
        '<div><p class="cifra-guia">' + gl + NB + 'g<span>de leche en polvo por litro de agua, según la ficha técnica ' + porConfirmar() + '</span></p>' +
          '<h2 id="h2-destacado"><a href="#articulo-preparar-un-litro" style="color:inherit;text-decoration-thickness:2px">Rendimiento y reconstitución: cómo preparar un litro</a></h2>' +
          '<p>Cuánto rinde cada bolsa, cada paca y cada bulto, con las cifras del empaque y de la ficha técnica lado a lado.</p><div class="acciones" style="margin-top:1.25rem"><a class="btn btn-primario" href="#articulo-preparar-un-litro">Leer la guía</a></div></div>' +
        '<div class="con-tilt">' + escenaGrupo([itemPack('cantaro-entera-500g.webp', 'The Cántaro Entera, bolsa de 500 g', 'bolsa'), itemPack('cantaro-entera-bulto-25kg.webp', 'The Cántaro Entera, bulto de 25 kg')], 'escena-media') + '</div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-guias-r"><div class="contenedor">' + titulo2('h2-guias-r', 'Guías y recetas.', 'bloque-titulo') +
        '<fieldset class="temas solo-js"><legend>Tema</legend><div class="chips">' + temas.map(function (t, i) { return '<label class="chip"><input type="radio" name="tema-recursos" value="' + t[0] + '"' + (i === 0 ? ' checked' : '') + '><span class="chip-cara">' + CHECK + t[1] + '</span></label>'; }).join('') + '</div></fieldset>' +
        '<p class="sr" id="conteo-recursos" aria-live="polite"></p><ul class="guias-lista recursos-lista">' + lista + '</ul></div></section>' +
      '<section class="panel-bruma arco-sup seccion" aria-labelledby="h2-fichas-r"><div class="contenedor">' + titulo2('h2-fichas-r', 'Fichas técnicas.', 'bloque-titulo') +
        '<p class="bloque-intro">Cada ficha es una página en HTML. La descarga es una copia de la misma tabla; el PDF se publica con el sitio.</p><ul class="fichas-lista">' + fichas + '</ul></div></section>';
    return { titulo: 'Recursos', html: html, montar: function (vista) {
      vista.addEventListener('change', function (e) {
        if (e.target.name !== 'tema-recursos') return;
        var t = e.target.value, n = 0;
        $$('.recursos-lista li', vista).forEach(function (li) { var ok = !t || li.getAttribute('data-tema').split(' ').indexOf(t) !== -1; li.hidden = !ok; if (ok) n++; });
        $('#conteo-recursos', vista).textContent = 'Mostrando ' + n + ' ' + plural(n, 'guía', 'guías') + '.';
      });
    } };
  };
  VISTAS.articulo = function (r) {
    var a = ARTICULOS[r.slug], c = a && cuerpoArticulo(r.slug);
    if (!a || !c) return VISTAS['no-existe'](r);
    var ld = { '@context': 'https://schema.org', '@type': 'Article', headline: a.titulo, dateModified: C.actualizado, author: { '@type': 'Organization', name: C.empresa.razon_social }, publisher: { '@type': 'Organization', name: C.empresa.razon_social } };
    var html = '<article>' + cabeza({
      titulo: a.titulo, entradilla: esc(a.entradilla), rastro: [['Inicio', '#inicio'], ['Recursos', '#recursos'], [a.titulo, '']], clase: 'articulo-cabeza',
      meta: '<p class="meta">' + esc(a.para) + '. Lectura de ' + a.min + ' minutos. Actualizado el ' + fechaCO(C.actualizado) + '. ' + esc(a.estado) + '.</p>'
    }) + '<div class="contenedor articulo-rejilla"><div class="articulo-cuerpo">' + c.cuerpo +
      '<div class="articulo-cierre"><div class="interior-enlaces">' + c.cierre.map(function (l) { return '<a class="enlace" href="' + l[1] + '">' + esc(l[0]) + '</a>'; }).join('') + '<a class="enlace" href="#recursos">Todas las guías</a></div></div></div>' +
      '<aside class="articulo-lado mencionados" aria-labelledby="h2-mencionados"><h2 id="h2-mencionados">Productos mencionados</h2>' + c.mencionados.map(function (m) { return mencionadoHTML(m[0], m[1]); }).join('') + '</aside></div></article>' +
      (a.estado === 'Guía completa' ? '<script type="application/ld+json">' + JSON.stringify(ld).replace(/</g, '\\u003c') + '<\/script>' : '');
    return { titulo: a.titulo, html: html, montar: function (vista) { $$('[data-agregar]', vista).forEach(pintarBotonAgregar); } };
  };

  /* ---------- Contacto ---------- */
  var MOTIVOS = [['cotizacion', 'Cotización'], ['marca', 'Con su marca'], ['pqr', 'Petición, queja o reclamo'], ['visita', 'Visita a la planta'], ['proveedores', 'Proveedores'], ['empleo', 'Trabaje con nosotros'], ['otro', 'Otro']];
  var SUGERENCIAS = {
    cotizacion: 'Para cotizar más rápido, arme su lista en <a href="#cotizar">Solicitar cotización</a>: el asesor recibe presentaciones y cantidades.',
    marca: 'Si ya sabe qué presentaciones necesita, use el formulario <a href="#marca-propia">Pedir muestras</a>.',
    pqr: 'Tenga a mano el lote y la fecha de vencimiento del empaque, y si puede, una foto.',
    visita: 'Indique en el mensaje la fecha que prefiere y cuántas personas vienen.'
  };
  VISTAS.contacto = function (r) {
    var e = C.empresa, sel = null;
    (r.params || []).forEach(function (t) { MOTIVOS.forEach(function (m) { if (m[0] === t) sel = t; }); });
    var msgGeneral = 'Hola, Mundilácteos. Quiero cotizar leche en polvo para mi negocio en ____.';
    var asesores = [
      ['Costa Caribe', 'Bolívar, Atlántico, Magdalena, La Guajira, Cesar, Sucre y Córdoba', 'Hola, Mundilácteos. Quiero hablar con el asesor de la Costa Caribe. Estoy en ____.'],
      ['Interior del país', 'Antioquia, Santander, Bogotá, Valle del Cauca y el resto de Colombia', 'Hola, Mundilácteos. Quiero hablar con el asesor del interior del país. Estoy en ____.'],
      ['Cadenas y marca propia', 'Supermercados, cadenas y distribuidores que quieren su propia marca', 'Hola, Mundilácteos. Quiero información para empacar leche en polvo con mi marca. Empresa: ____. Ciudad: ____.']
    ];
    var html = cabeza({ titulo: 'Contacto', entradilla: 'Escríbanos, llámenos o visítenos en la planta. Le responde una persona del área comercial.' }) +
      '<section class="bloque" aria-labelledby="h2-linea" style="padding-top:var(--esp-3)"><div class="contenedor dos-col siete-cinco">' +
        '<div class="linea-directa"><h2 id="h2-linea" class="etiqueta" style="font-size:var(--fs-18);font-stretch:100%;color:var(--c-azul-noche)">Línea comercial, teléfono y WhatsApp</h2>' +
          '<a class="numero-grande" href="' + TEL_HREF + '">' + TEL + '<span class="sr">, llamar</span></a>' +
          '<div class="acciones">' + btnWA(msgGeneral, 'Escribir por WhatsApp') + '<a class="btn btn-secundario" href="' + TEL_HREF + '">' + icono('i-tel') + 'Llamar</a>' + btnCopiar(TEL, 'Copiar número', 'Número copiado') + '</div>' +
          '<p class="texto-sans">WhatsApp: ' + WA_VISIBLE + '. ' + lineaWA(msgGeneral).replace(/^<p class="mensaje-wa">|<\/p>$/g, '') + '</p></div>' +
        '<dl class="ficha-datos-lista"><dt>Horario</dt><dd>' + esc(e.horario.valor) + ' ' + porConfirmar() + '</dd>' +
          '<dt>Correo</dt><dd><a href="mailto:' + e.correo.valor + '">' + e.correo.valor + '</a> ' + porConfirmar() + '</dd>' +
          '<dt>Instagram</dt><dd>' + enlaceExterno(e.instagram, '@mundilacteos') + '</dd><dt>Empresa</dt><dd>' + esc(e.razon_social) + ', NIT ' + e.nit + '</dd></dl>' +
      '</div></section>' +
      '<section class="banda azul arco-sup abre oscuro" aria-labelledby="h2-asesores"><div class="contenedor">' + titulo2('h2-asesores', 'Asesores por zona.') +
        '<div class="asesores-rejilla"><ul class="asesores">' + asesores.map(function (a) {
          return '<li class="asesor"><div><h3>' + a[0] + '</h3><p class="zona">' + a[1] + '.</p></div><div><p class="texto-sans">Le atiende: ' + porConfirmar('nombre por confirmar') + '</p>' + lineaWA(a[2]) + '</div><div class="acciones">' + btnWA(a[2], 'Escribir por WhatsApp') + '</div></li>';
        }).join('') + '</ul>' + marcoToma('R04', 'Retratos de los asesores por zona, mirando a cámara, con nombre, cargo y autorización de uso de imagen. Por producir.', 'p-retratos') + '</div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-escribanos"><div class="contenedor contacto-rejilla"><div id="caja-contacto">' + titulo2('h2-escribanos', 'Escríbanos.') +
        '<form class="form-corto" id="form-contacto" novalidate style="margin-top:1.5rem">' + resumenErroresHTML() +
          '<fieldset class="campo" id="campo-k-motivo" aria-describedby="k-motivo-error"><legend>Motivo</legend><div class="chips">' + MOTIVOS.map(function (m, i) {
            return '<label class="chip"><input type="radio" name="k-motivo" value="' + m[0] + '" data-regla="k-motivo"' + (i === 0 ? ' id="k-motivo"' : '') + (m[0] === sel ? ' checked' : '') + '><span class="chip-cara">' + CHECK + m[1] + '</span></label>';
          }).join('') + '</div><p class="error-campo" id="k-motivo-error">' + icono('i-alerta') + '<span>Elija el motivo de su mensaje.</span></p></fieldset>' +
          '<p class="sugerencia" id="k-sugerencia" aria-live="polite"' + (sel && SUGERENCIAS[sel] ? '' : ' hidden') + '>' + (sel && SUGERENCIAS[sel] ? SUGERENCIAS[sel] : '') + '</p>' +
          '<div class="dos-campos">' + campoTexto('k-nombre', 'Nombre', ' name="nombre" type="text" autocomplete="name" required', 'Escriba su nombre.') + campoWA('k-wa') + '</div>' +
          '<div class="dos-campos">' + campoTexto('k-ciudad', 'Ciudad', ' name="ciudad" type="text" list="k-lista-ciudades" autocomplete="address-level2" required', 'Escriba su ciudad.') +
            campoTexto('k-correo', 'Correo', ' name="correo" type="email" autocomplete="email"', null, null, true) + '</div>' +
          '<datalist id="k-lista-ciudades">' + CIUDADES.map(function (c) { return '<option value="' + c + '">'; }).join('') + '</datalist>' +
          '<div id="k-lote-caja"' + (sel === 'pqr' ? '' : ' hidden') + '>' + campoTexto('k-lote', 'Lote y fecha de vencimiento', ' name="lote" type="text" autocomplete="off"', null, 'Están impresos en el empaque.', true) + '</div>' +
          campoTexto('k-mensaje', 'Mensaje', 'textarea name="mensaje" rows="5" required', 'Escriba su mensaje.') +
          campoAcepto('k-acepto', 'responder este mensaje') +
          '<div class="acciones acciones-apiladas"><button class="btn btn-primario" type="submit">Enviar mensaje</button></div>' +
        '</form></div>' +
        '<div class="direccion-bloque"><h2 style="font-size:var(--fs-28)">La planta</h2><address><strong>Parque Industrial Europark</strong>' + esc(DIRECCION_TXT) + '</address>' +
          '<div class="acciones"><a class="btn btn-secundario" href="' + MAPS + '" target="_blank" rel="noopener">' + icono('i-lugar') + 'Cómo llegar<span class="sr">, abre Google Maps</span></a>' + btnCopiar(DIRECCION_TXT, 'Copiar dirección', 'Dirección copiada') + '</div>' +
          '<p class="nota">Sin mapa incrustado: el enlace abre Google Maps. Coordenadas para transportadores ' + porConfirmar() + '</p>' +
          marcoToma('P06', 'Fachada de la planta con la señal del parque, por fotografiar.', 'p-bulto', '', '3 / 2') + '</div>' +
      '</div></section>';
    return { titulo: 'Contacto', html: html, montar: function (vista) {
      var form = $('#form-contacto', vista);
      form.addEventListener('change', function (ev) {
        if (ev.target.name !== 'k-motivo') return;
        var v = ev.target.value, s = $('#k-sugerencia', form);
        s.innerHTML = SUGERENCIAS[v] || ''; s.hidden = !SUGERENCIAS[v];
        $('#k-lote-caja', form).hidden = v !== 'pqr';
      });
      montarFormulario(form, {
        'k-motivo': { nombre: 'Motivo', grupo: 'k-motivo' }, 'k-nombre': { nombre: 'Nombre', ok: validaTexto(2) }, 'k-wa': { nombre: 'WhatsApp', ok: validaWA },
        'k-ciudad': { nombre: 'Ciudad', ok: validaTexto(3) }, 'k-mensaje': { nombre: 'Mensaje', ok: validaTexto(5) },
        'k-acepto': { nombre: 'Autorización de datos', ok: function (v) { return v === true; } }
      }, function (v) {
        var m = form.querySelector('input[name="k-motivo"]:checked'), motivo = MOTIVOS.filter(function (x) { return x[0] === m.value; })[0][1];
        confirmar($('#caja-contacto', vista), { id: 'h2-contacto-ok', titulo: 'Mensaje enviado.', texto: 'Le respondemos por WhatsApp al número que nos dejó, en horario hábil.',
          msg: 'Hola, Mundilácteos. Envié el mensaje N.º {n}. Motivo: ' + motivo.toLowerCase() + '. Ciudad: ' + v('k-ciudad') + (v('k-lote') ? '. Lote: ' + v('k-lote') : '') + '.' });
      });
    } };
  };

  VISTAS.privacidad = function () { return minima('Política de tratamiento de datos', 'Cómo tratamos sus datos personales, según la Ley 1581 de 2012. El texto lo entrega el cliente.', '<div class="cuerpo-texto"><p>Responsable: ' + esc(C.empresa.razon_social) + ', NIT ' + C.empresa.nit + '. Los datos de los formularios se usan solo para responder su solicitud. ' + porConfirmar('texto legal por entregar') + '</p></div>', [['Contacto', '#contacto']]); };
  VISTAS.terminos = function () { return minima('Términos de uso', 'Condiciones de uso del sitio. El texto lo entrega el cliente.', '<div class="cuerpo-texto"><p>Los precios se entregan con cada cotización; el sitio no vende en línea. ' + porConfirmar('texto legal por entregar') + '</p></div>', [['Contacto', '#contacto']]); };

  /* ---------- 404: el globo vacío ---------- */
  VISTAS['no-existe'] = function () {
    var msg = 'Hola, Mundilácteos. Busco un producto en su sitio y no lo encuentro. Estoy en ____.';
    var bajo = '<p class="entradilla">Busque un producto o vuelva al inicio.</p>' +
      '<div class="buscador" role="search" data-buscador><label class="sr" for="buscar-404">Buscar productos</label>' + icono('i-buscar') +
        '<input class="control" id="buscar-404" type="search" placeholder="Marca, peso o código" autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="sug-404">' +
        '<ul class="sugerencias" id="sug-404" role="listbox" aria-label="Sugerencias" hidden></ul></div>' +
      '<div class="acciones"><a class="btn btn-primario" href="#productos">Ver productos</a>' + btnWA(msg, 'WhatsApp', 'btn-secundario') + '<a class="enlace" href="#inicio">Ir al inicio</a></div>' +
      '<p class="telefono-visible nota">WhatsApp y teléfono: ' + TEL + '.</p>';
    var html = cabezaGlobo({ rastro: [['Inicio', '#inicio'], ['Página no encontrada', '']], k: 6.48, clase: 'cg-dos-lineas no-existe-bajo', bruma: true,
      h1: '<span class="frag">Esta página</span><br> <span class="frag">no existe.</span>', bajo: bajo });
    return { titulo: 'Página no encontrada', html: html, montar: function (vista) {
      entrarGlobo(vista);
      montarBuscador($('[data-buscador]', vista), null);
    } };
  };

  /* ---------------------------------------------------------------------------
     Arranque
     --------------------------------------------------------------------------- */
  cargarQ();
  pintarConteoCabecera(false);
  var r0 = leerRuta();
  rutaActual = r0.vista === 'ancla' ? { vista: 'inicio', params: [] } : r0;
  render(rutaActual, true);
  if (location.hash && location.hash !== '#inicio') enfocarH1();
})();

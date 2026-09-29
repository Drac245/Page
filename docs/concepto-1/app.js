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
     Comparar presentaciones (hasta 4; la lista vive en memoria y en el enlace #comparar~p-…)
     --------------------------------------------------------------------------- */
  var CMP = [], CMP_MAX = 4;
  function cmpId(slug, key) { return slug + '.' + key; }
  function enComparar(slug, key) { return CMP.indexOf(cmpId(slug, key)) !== -1; }
  function hashComparar(lista) { return '#comparar' + (lista || CMP).map(function (id) { return '~p-' + id; }).join(''); }
  function cmpValido(id) { var a = id.split('.'); var p = producto(a[0]); return !!(p && presentacion(p, a[1])); }
  function pintarComparar() {
    $$('[data-comparar]').forEach(function (c) { c.checked = enComparar(c.getAttribute('data-comparar'), c.getAttribute('data-comparar-pres')); });
    $$('[data-comparar-n]').forEach(function (a) {
      a.hidden = !CMP.length; a.setAttribute('href', hashComparar());
      var n = $('[data-n]', a); if (n) n.textContent = CMP.length;
    });
  }
  document.addEventListener('change', function (e) {
    var c = e.target.closest('[data-comparar]'); if (!c) return;
    var slug = c.getAttribute('data-comparar'), key = c.getAttribute('data-comparar-pres'), id = cmpId(slug, key);
    var ref = referencia(producto(slug), presentacion(producto(slug), key));
    if (c.checked) {
      if (CMP.length >= CMP_MAX) { c.checked = false; aviso('Puede comparar hasta ' + CMP_MAX + ' presentaciones. Quite una para agregar ' + ref + '.'); return; }
      if (CMP.indexOf(id) === -1) CMP.push(id);
      anunciar(ref + ' para comparar. ' + CMP.length + ' de ' + CMP_MAX + '.');
    } else {
      CMP = CMP.filter(function (x) { return x !== id; });
      anunciar(ref + ' fuera de la comparación.');
    }
    pintarComparar();
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
    if (barraObs) { barraObs.disconnect(); barraObs = null; }
    document.documentElement.style.removeProperty('--barra-alto');
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

  /* Páginas interiores: su código (vistas.js) se carga la primera vez que se visita una de ellas */
  var MODULO = { producto: 'ficha', comparar: 'comparar', nosotros: 'nosotros', calidad: 'calidad', 'por-que-elegirnos': 'por-que', distribucion: 'cobertura', 'donde-comprar': 'donde-comprar', 'marca-propia': 'marca-propia', recursos: 'recursos', articulo: 'recursos', contacto: 'contacto' };
  var cargas = {};
  function necesitaVistas(r) { return !!MODULO[r.vista] && !VISTAS[r.vista]; }
  function cargarVistas(r) {
    var m = MODULO[(r || leerRuta()).vista];
    if (!cargas[m]) {
      cargas[m] = new Promise(function (ok, falla) {
        var sc = document.createElement('script');
        sc.src = 'vistas/' + m + '.js'; sc.onload = ok; sc.onerror = function () { cargas[m] = null; falla(); };
        document.body.appendChild(sc);
      });
    }
    return cargas[m];
  }
  function navegar() {
    var r = leerRuta();
    if (r.vista === 'ancla') return;
    if (necesitaVistas(r)) {
      cargarVistas(r).then(navegar, function () { aviso('No se pudo cargar esta página. Revise su conexión e intente de nuevo.'); });
      return;
    }
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
    var base = location.href.split('#')[0];
    var ld = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(function (it, i) {
      var li = { '@type': 'ListItem', position: i + 1, name: it[0] }; if (it[1]) li.item = base + it[1]; return li;
    }) };
    return '<nav class="migas" aria-label="Migas de pan"><ol>' + items.map(function (it, i) {
      return '<li>' + (i === items.length - 1 ? '<span aria-current="page">' + esc(it[0]) + '</span>' : '<a href="' + it[1] + '">' + esc(it[0]) + '</a>') + '</li>';
    }).join('') + '</ol></nav><script type="application/ld+json">' + JSON.stringify(ld).replace(/</g, '\\u003c') + '<\/script>';
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
      '<span class="sombra" aria-hidden="true"></span>' + (im ? '<span class="pie-ref" aria-hidden="true"' + (im.referencia ? '' : ' hidden') + '>' + (im.referencia ? 'Foto de referencia: ' + esc(conUnidad(im.de)) : '') + '</span>' : '') + '</div>';
    return '<article class="vitrina" data-slug="' + p.slug + '" aria-labelledby="vn-' + p.slug + '">' + escena +
      '<div class="vitrina-cabeza"><p class="marca-nombre">' + esc(MARCAS[p.marca].nombre) + '</p>' +
      '<h3 id="vn-' + p.slug + '"><a href="' + destino + '" data-ficha>' + esc(p.nombre) + '</a></h3>' +
      '<p class="denominacion">' + esc(p.denominacion) + '</p></div>' +
      '<div class="vitrina-resto">' +
        '<fieldset><legend class="pres-legend">Presentación</legend><div class="chips">' + chipsPresentacion(p, 'pv-' + p.slug, sel) + '</div>' +
        (tieneAsterisco(p) ? '<p class="nota-asterisco">* Presentación por confirmar.</p>' : '') + '</fieldset>' +
        '<dl class="datos-venta" data-datos>' + datosVentaHTML(p, sel) + '</dl>' +
        '<p class="registro-linea"><span class="verificado">' + icono('i-verificado') + '<span>Registro ' + p.registro + '</span></span><a href="' + INVIMA + '" target="_blank" rel="noopener">Verificar<span class="sr"> ' + p.registro + ' en el INVIMA, abre otra pestaña</span></a></p>' +
        '<div class="vitrina-acciones">' +
          '<button class="btn btn-primario btn-agregar" type="button" data-agregar="' + p.slug + '" data-pres="' + key + '">' + icono('i-mas', 'ico-mas') + icono('i-hecho', 'ico-hecho') + '<span class="txt">Agregar a mi cotización</span><span class="sr" data-sr-ref> ' + esc(referencia(p, sel)) + '</span></button>' +
          cantidadVitrinaHTML(p.slug) +
          '<a class="btn btn-primario btn-donde" href="' + donde(sel) + '"' + (sel && sel.donde.length ? ' target="_blank" rel="noopener"' : '') + '>Dónde comprar<span class="sr"> ' + esc(referencia(p, sel)) + '</span></a>' +
          '<a class="ficha-enlace" href="' + destino + '" data-ficha>Ver ficha técnica<span class="sr"> de ' + esc(p.nombre) + '</span></a>' +
          casillaComparar(p.slug, key, 'pv') +
        '</div>' +
      '</div></article>';
  }
  function donde(pr) { return pr && pr.donde && pr.donde.length ? pr.donde[0].url : '#donde-comprar'; }
  /* Cantidad en línea: aparece al agregar y queda sincronizada con Mi cotización */
  function cantidadVitrinaHTML(slug) {
    var id = 'vc-' + slug;
    return '<div class="vitrina-cantidad" data-vcant="' + slug + '" hidden>' +
      '<span class="vc-estado">' + icono('i-hecho') + 'En su cotización</span>' +
      '<span class="paso"><button type="button" data-vpaso="-1" aria-label="Quitar una">' + icono('i-menos') + '</button>' +
      '<label class="sr" for="' + id + '" data-vlabel>Cantidad</label><input id="' + id + '" type="text" inputmode="numeric" pattern="[0-9]*" value="1" data-vcantidad>' +
      '<button type="button" data-vpaso="1" aria-label="Agregar una">' + icono('i-mas') + '</button></span>' +
      '<span class="vc-kg" aria-live="polite" data-vkg></span>' +
      '<button class="vc-quitar" type="button" data-vquitar>Quitar<span class="sr" data-vquitar-ref></span></button></div>';
  }
  function casillaComparar(slug, key, pref) {
    return '<label class="comparar-casilla solo-js"><input type="checkbox" data-comparar="' + slug + '" data-comparar-pres="' + key + '" id="' + pref + '-cmp-' + slug + '"' + (enComparar(slug, key) ? ' checked' : '') + '>Comparar<span class="sr" data-cmp-ref> ' + esc(referencia(producto(slug), presentacion(producto(slug), key))) + '</span></label>';
  }

  function nuevoFilaHTML(p) {
    var r = REGS[p.registro];
    var msg = 'Hola, Mundilácteos. Quiero información sobre ' + p.nombre.toLowerCase() + ' (registro ' + p.registro + '). Estoy en ____.';
    return '<div class="nuevo-fila" data-slug="' + p.slug + '"><div><h4><a href="#producto-' + p.slug + '">' + esc(p.nombre) + '</a>' + (p.nombre_por_confirmar ? ' ' + porConfirmar('nombre por confirmar') : '') + '</h4><p class="denominacion">' + esc(p.denominacion) + '</p></div>' +
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
      '<div class="buscador" role="search" aria-label="Buscar en el catálogo"><label for="q-productos">Buscar por marca, peso o código</label><div style="position:relative">' + icono('i-buscar', 'ico-lupa') +
      '<input class="control" id="q-productos" type="search" autocomplete="off" placeholder="' + (window.matchMedia('(max-width: 599px)').matches ? 'Ej.: cántaro 900 g' : 'Por ejemplo: cántaro 900 g, bulto, 25 kilos') + '"></div></div></div></div></section>' +
      '<div class="contenedor">' +
        '<fieldset class="negocio-productos"><legend>Compre según su negocio</legend><div class="chips">' + negocio.map(function (n) {
          return '<label class="chip"><input type="radio" name="negocio-prod" value="' + n[0] + '"><span class="chip-cara">' + CHECK + esc(n[1]) + '</span></label>';
        }).join('') + '</div></fieldset>' +
        '<div class="catalogo"><aside class="filtros" aria-labelledby="h2-filtros"><h2 class="sr" id="h2-filtros">Filtros</h2><div data-filtros-casa>' + filtrosFormHTML() + '</div></aside>' +
        '<div class="resultados"><h2 class="sr">Resultados</h2>' +
          '<div class="resultados-barra"><div class="resultados-linea"><div class="resultados-conteo-fila"><p class="resultados-conteo" id="conteo-productos" aria-live="polite"></p>' +
          '<a class="btn btn-secundario btn-comparar" href="#comparar" data-comparar-n hidden>Comparar (<span data-n>0</span>)</a></div>' +
          '<div class="resultados-controles"><button class="btn btn-secundario btn-filtrar" type="button" aria-haspopup="dialog" data-abrir-filtros>Filtrar<span data-n-filtros></span></button>' +
          '<label class="ordenar"><span class="ordenar-texto">Ordenar</span> <select id="orden-productos"><option value="">Recomendado</option><option value="marca">Marca, de la A a la Z</option><option value="peso">Peso, de menor a mayor</option></select></label></div></div>' +
          '<div class="aplicados" id="aplicados"></div></div>' +
          '<div class="aviso-negocio"><p><strong>Con su marca:</strong> empacamos leche en polvo con la marca de su cadena o distribuidora, amparada en nuestro registro sanitario vigente. Gramajes de 27' + NNBSP + 'g a 25' + NNBSP + 'kg.</p><div class="acciones" style="margin-top:1rem"><a class="btn btn-primario" href="#marca-propia">Conocer la maquila</a></div></div>' +
          '<div class="vitrinas" id="vitrinas">' + conPres.map(vitrinaHTML).join('') +
            '<p class="linea-marca-propia"><strong>Con su marca:</strong> empacamos con la marca de su cadena, con registro vigente. <a href="#marca-propia">Conocer la maquila</a></p></div>' +
          '<div class="sin-resultados" id="sin-resultados" hidden></div>' +
          '<div class="registros-nuevos" id="registros-nuevos"><h3>Registrados en 2025, presentaciones por confirmar</h3><p>Productos con registro sanitario vigente desde 2025. Su marca y sus presentaciones se publican cuando estén confirmadas.</p>' + sinPres.map(nuevoFilaHTML).join('') + '</div>' +
        '</div></div>' + tablaConvieneHTML() +
      '</div>' +
      '<div class="hoja-filtros" role="dialog" aria-modal="true" aria-labelledby="h2-hoja-filtros" hidden><div class="panel-cabeza"><h2 id="h2-hoja-filtros">Filtrar</h2><button class="btn-cerrar-panel" type="button" data-cerrar-filtros>' + icono('i-cerrar') + 'Cerrar</button></div><div class="panel-cuerpo" data-filtros-hoja></div><div class="panel-pie"><button class="btn btn-primario btn-ancho" type="button" data-cerrar-filtros data-mostrar-n>Mostrar productos</button></div></div>';
    return { titulo: 'Productos', html: html, montar: montarCatalogo };
  };

  /* Alto real de la barra fija de resultados (escritorio): el foco nunca queda tapado */
  var barraObs = null;
  function vigilarBarra(barra) {
    if (barraObs) { barraObs.disconnect(); barraObs = null; }
    var fijar = function () {
      var fija = barra.isConnected && getComputedStyle(barra).position === 'sticky';
      document.documentElement.style.setProperty('--barra-alto', fija ? Math.ceil(barra.getBoundingClientRect().height) + 'px' : '0px');
    };
    fijar();
    if (window.ResizeObserver) { barraObs = new ResizeObserver(fijar); barraObs.observe(barra); }
  }
  function montarCatalogo(vista) {
    var form = $('#filtros-form', vista), grid = $('#vitrinas', vista);
    var q = $('#q-productos', vista), orden = $('#orden-productos', vista);
    catalogoVivo = { vista: vista, form: form, grid: grid };
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    sincronizarControles();
    aplicar(false);
    pintarComparar();
    vigilarBarra($('.resultados-barra', vista));
    if (!reducido()) { grid.classList.add('asentar'); window.setTimeout(function () { grid.classList.remove('asentar'); }, 800); }

    form.addEventListener('change', function (e) {
      var t = e.target;
      if (t.name === 'formato') F.formato = t.value;
      else if (['marca', 'tipo', 'peso', 'uso'].indexOf(t.name) !== -1) {
        F[t.name] = $$('input[name="' + t.name + '"]:checked', form).map(function (i) { return i.value; });
        if (t.name === 'uso') F.negocio = '';
      }
      aplicar(true, true);
    });
    vista.addEventListener('change', function (e) {
      var t = e.target;
      if (t.name === 'negocio-prod') {
        F.negocio = t.value; F.uso = usosDeNegocio(t.value);
        aplicar(true, true);
      } else if (t.id === 'orden-productos') { F.orden = t.value; aplicar(true, true); }
      else if (t.name && t.name.indexOf('pv-') === 0) elegirPresVitrina(t);
      else if (t.matches('[data-vcantidad]')) {
        var btn = $('[data-agregar]', t.closest('.vitrina'));
        cantidadQ(btn.getAttribute('data-agregar'), btn.getAttribute('data-pres'), parseInt(t.value.replace(/\D/g, ''), 10) || 1);
      }
    });
    var qTimer = null;
    q.addEventListener('input', function () { window.clearTimeout(qTimer); qTimer = window.setTimeout(function () { F.q = q.value.trim(); aplicar(false); }, 160); });
    q.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); F.q = q.value.trim(); aplicar(true, true); } });
    vista.addEventListener('click', function (e) {
      if (accionCantidadVitrina(e)) return;
      var quitar = e.target.closest('[data-quitar]');
      if (quitar) {
        var par = quitar.getAttribute('data-quitar').split('|');
        if (par[0] === 'formato') F.formato = ''; else if (par[0] === 'q') F.q = ''; else if (par[0] === 'negocio') { F.negocio = ''; F.uso = []; }
        else { F[par[0]] = F[par[0]].filter(function (v) { return v !== par[1]; }); if (par[0] === 'uso') F.negocio = ''; }
        sincronizarControles(); aplicar(true, true);
        var sig = $('#aplicados [data-quitar]', vista) || $('#conteo-productos', vista);
        if (sig) { if (sig.id === 'conteo-productos') sig.setAttribute('tabindex', '-1'); sig.focus(); }
        return;
      }
      if (e.target.closest('[data-quitar-todo]')) {
        F = filtrosVacios(); F.negocio = '';
        sincronizarControles(); aplicar(true, true);
        anunciar('Filtros quitados.');
        return;
      }
      var sug = e.target.closest('[data-sugerencia]');
      if (sug) { F = JSON.parse(sug.getAttribute('data-sugerencia')); sincronizarControles(); aplicar(true, true); return; }
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

  /* Cambios discretos (casillas, chips, orden) crean una entrada en el historial: «Atrás» deshace el filtro.
     Mientras se escribe en el buscador, la URL se reemplaza. */
  function aplicar(conTransicion, nuevaEntrada) {
    if (!catalogoVivo) return;
    var hacer = function () { aplicarDOM(); };
    var nuevoHash = hashDeFiltros(F);
    if (location.hash !== nuevoHash) {
      try { if (nuevaEntrada) history.pushState(null, '', nuevoHash); else history.replaceState(null, '', nuevoHash); } catch (e) { /* sin historial */ }
      rutaActual = leerRuta();
    }
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
    var tarjetaMarca = $('.linea-marca-propia', grid);
    if (tarjetaMarca) { grid.appendChild(tarjetaMarca); ajustarHueco(); }
    preseleccionar(visibles);
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

  /* «Con su marca» ocupa las columnas que quedan libres en la última fila */
  function ajustarHueco() {
    if (!catalogoVivo) return;
    var grid = catalogoVivo.grid, cols = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length || 1;
    var n = $$('.vitrina', grid).filter(function (el) { return !el.hidden; }).length, resto = n % cols;
    grid.style.setProperty('--hueco-cols', String(resto ? cols - resto : cols));
  }
  window.addEventListener('resize', function () { if (catalogoVivo) ajustarHueco(); });
  /* Si el filtro o la búsqueda piden una presentación (380 g, 25 kg), cada vitrina la deja elegida */
  function gramosBuscados() {
    var g = [];
    F.peso.forEach(function (k) { PESOS.forEach(function (x) { if (x.k === k) g.push(x.g); }); });
    var t = tokens(F.q);
    t.forEach(function (x, i) {
      if (!/^\d+(\.\d+)?$/.test(x)) return;
      var val = parseFloat(x), u = t[i + 1];
      g.push(u === 'kg' || (u !== 'g' && val <= 25) ? val * 1000 : val);
    });
    return g;
  }
  function preseleccionar(visibles) {
    var g = gramosBuscados(); if (!g.length) return;
    visibles.forEach(function (p) {
      var pr = p.presentaciones.filter(function (x) { return g.indexOf(x.gramos) !== -1; })[0]; if (!pr) return;
      var input = catalogoVivo.grid.querySelector('input[name="pv-' + p.slug + '"][value="' + presKey(pr.contenido) + '"]');
      if (input && !input.checked) { input.checked = true; elegirPresVitrina(input, true); }
    });
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

  function elegirPresVitrina(input, silencioso) {
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
      img.animate && !reducido() && !silencioso ? img.animate([{ opacity: 1 }, { opacity: 0.2 }], { duration: 120, easing: 'ease-out' }).onfinish = function () { cambiarImg(img, im); img.animate([{ opacity: 0.2, transform: 'translateX(-50%) translateY(10px)' }, { opacity: 1, transform: 'translateX(-50%)' }], { duration: 240, easing: 'cubic-bezier(.2,.7,.2,1)' }); } : cambiarImg(img, im);
    } else if (img && im) img.alt = im.alt;
    var pie = $('.pie-ref', art);
    if (pie && im) { pie.hidden = !im.referencia; pie.textContent = im.referencia ? 'Foto de referencia: ' + conUnidad(im.de) : ''; }
    var cmp = $('[data-comparar]', art);
    if (cmp) { cmp.setAttribute('data-comparar-pres', input.value); cmp.checked = enComparar(p.slug, input.value); $('[data-cmp-ref]', art).textContent = ' ' + referencia(p, pr); }
    if (!silencioso) anunciar(referencia(p, pr) + ': ' + ventaDe(pr).texto + '.');
  }
  function cambiarImg(img, im) { img.src = im.src; img.width = im.w; img.height = im.h; img.alt = im.alt; }

  function pintarBotonAgregar(btn) {
    var s = btn.getAttribute('data-agregar'), k = btn.getAttribute('data-pres');
    var it = itemQ(s, k), hay = !!it, txt = $('.txt', btn);
    var ficha = btn.hasAttribute('data-ficha-boton');
    btn.classList.toggle('agregado', hay);
    if (ficha) {
      var pr = presentacion(producto(s), k);
      txt.textContent = hay ? 'En su cotización. Agregar más' : (pr && esBulto(pr) ? 'Cotizar este bulto' : 'Agregar a mi cotización');
      btn.classList.toggle('agregado', false);
      return;
    }
    var art = btn.closest('.vitrina'), vc = art && $('[data-vcant]', art);
    if (vc) {
      /* Vitrina: al agregar, el botón deja su lugar a la cantidad en línea */
      btn.hidden = hay; vc.hidden = !hay;
      if (hay) {
        var p = producto(s), prv = presentacion(p, k), v = ventaDe(prv), ref = referencia(p, prv);
        var input = $('[data-vcantidad]', vc);
        if (document.activeElement !== input) input.value = it.n;
        $('[data-vlabel]', vc).textContent = 'Cantidad de ' + v.unidades + ' de ' + ref;
        $('[data-vpaso="-1"]', vc).setAttribute('aria-label', 'Quitar ' + (v.unidad === 'paca' ? 'una paca' : 'un bulto') + ' de ' + ref);
        $('[data-vpaso="1"]', vc).setAttribute('aria-label', 'Agregar ' + (v.unidad === 'paca' ? 'una paca' : 'un bulto') + ' de ' + ref);
        $('[data-vpaso="-1"]', vc).disabled = it.n <= 1;
        $('[data-vkg]', vc).textContent = plural(it.n, v.unidad, v.unidades) + (v.kgUnidad ? ' · ' + kg(it.n * v.kgUnidad) : '');
        $('[data-vquitar-ref]', vc).textContent = ' ' + ref + ' de su cotización';
      }
      return;
    }
    txt.textContent = hay ? 'Agregado. Quitar' : 'Agregar a mi cotización';
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
      var vc = cont && $('[data-vcant]', cont);
      if (vc) { window.requestAnimationFrame(function () { var mas = $('[data-vpaso="1"]', vc); if (mas && !vc.hidden) mas.focus(); }); }
      else { btn.classList.add('recien'); window.setTimeout(function () { btn.classList.remove('recien'); }, 400); }
    }
  }
  /* Controles de la cantidad en la vitrina (delegados en el catálogo) */
  function accionCantidadVitrina(e) {
    var vc = e.target.closest('[data-vcant]'); if (!vc) return false;
    var btn = $('[data-agregar]', vc.closest('.vitrina'));
    var s = btn.getAttribute('data-agregar'), k = btn.getAttribute('data-pres'), it = itemQ(s, k);
    var paso = e.target.closest('[data-vpaso]');
    if (paso && it) { cantidadQ(s, k, it.n + parseInt(paso.getAttribute('data-vpaso'), 10)); if (paso.disabled) $('[data-vcantidad]', vc).focus(); return true; }
    if (e.target.closest('[data-vquitar]')) {
      quitarQ(s, k);
      window.requestAnimationFrame(function () { btn.focus(); });
      return true;
    }
    return false;
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
    aplicar(true, false);
    window.scrollTo(0, 0);
  }

  /* ---------- Ficha de producto (la vista vive en vistas/ficha.js) ---------- */
  var fichaViva = null;
  function fijarFicha(f) { fichaViva = f; }
  function listaComparar() { return CMP.slice(); }
  function fijarComparar(l) { CMP = l.filter(cmpValido).slice(0, CMP_MAX); }
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
    filas.push(['Presentaciones', p.presentaciones.length ? p.presentaciones.map(function (x) { return esc(conUnidad(miles(x.contenido))) + (x.estado === 'por_confirmar' ? '*' : ''); }).join(', ') + (tieneAsterisco(p) ? ' <span class="nota-asterisco">(* por confirmar)</span>' : '') : porConfirmar('presentaciones por confirmar')]);
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
    var html = cabezaInterior('Solicitar cotización', 'Revise su lista, déjenos cinco datos y un asesor le responde con el precio por volumen.', [['Inicio', '#inicio'], ['Solicitar cotización', '']]) +
      '<div class="contenedor cotizar-rejilla">' +
        '<div class="su-lista-caja"><section class="su-lista" aria-labelledby="h2-lista"><h2 id="h2-lista" tabindex="-1">Su lista</h2><div id="lista-cotizar"></div></section>' +
        '<p class="nota-destello">Sin crear cuenta y sin pagos: usted pide precio y un asesor le responde.</p></div>' +
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
        '<div class="frecuentes"><p class="etiqueta">O empiece con una de estas:</p><div class="chips">' + FRECUENTES.map(function (f) {
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
  /* Toma por producir: ventana de franja (dos arcos) en la proporción real de la toma, código como cifra gráfica
     y croquis de 2 px de la escena. La sagita del arco es el 3 % del ancho. */
  var CROQUIS = { 's-retratos': '0 0 120 40', 's-retrato': '0 0 80 100', 's-familia': '0 0 80 100', 's-linea-empaque': '0 0 120 80', 's-fachada': '0 0 120 80', 's-gondola': '0 0 120 80', 's-reverso': '0 0 80 100', 's-estiba': '0 0 120 80' };
  function marcoToma(codigo, texto, croquis, ratio, clase) {
    var r = String(ratio || '3 / 2').split('/').map(function (x) { return parseFloat(x); }), sg = +(3 * r[0] / r[1]).toFixed(1);
    var d = 'M0 0Q50 ' + (2 * sg) + ' 100 0L100 ' + (100 - sg) + 'Q50 ' + (100 + sg) + ' 0 ' + (100 - sg) + 'Z';
    return '<figure class="toma' + (r[0] / r[1] >= 2.5 ? ' toma-ancha' : '') + (clase ? ' ' + clase : '') + '" style="--toma-ratio: ' + (ratio || '3 / 2') + '"><div class="toma-area" aria-hidden="true">' +
      '<svg class="toma-ventana" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false"><path d="' + d + '"/></svg>' +
      '<span class="toma-codigo">' + codigo + '</span><svg class="toma-croquis" viewBox="' + (CROQUIS[croquis] || '0 0 120 80') + '" focusable="false"><use href="#' + croquis + '"/></svg></div>' +
      '<figcaption><span class="toma-codigo-linea">' + codigo + '</span> ' + texto + '</figcaption></figure>';
  }
  /* Notas internas del prototipo: aparte, plegadas al pie de la vista; no son copy público */
  function notasHTML(lista) {
    return '<details class="notas-prototipo"><summary>Notas del prototipo</summary><ul>' + lista.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></details>';
  }
  /* Globo reducido (Nosotros y 404): misma geometría del hero; el titular corre por el paralelo 10 */
  function cabezaGlobo(o) {
    var f2 = o.foto ? '<img class="relleno foto" src="' + o.foto[0] + '" width="' + o.foto[1] + '" height="' + o.foto[2] + '" alt="' + esc(o.foto[3]) + '">' : '<div class="relleno"></div>';
    return '<section class="cabeza-globo' + (o.clase ? ' ' + o.clase : '') + '" style="--cg-k:' + o.k + '">' +
      '<div class="contenedor">' + migas(o.rastro) + '</div>' +
      '<div class="cg-escenario"><div class="globo globo-mini' + (o.bruma ? ' globo-bruma' : '') + '">' +
        '<div class="franja f1"><div class="relleno"></div></div><div class="franja f2">' + f2 + '</div>' +
        '<div class="franja f3"><div class="relleno">' + (o.producto ? '<img class="f3-bultos" src="img/r-bultos-trio.webp" width="883" height="366" alt="Tres bultos: The Cántaro Entera de 25 kg, La Becerrita Mezcla Láctea de 25 kg y The Cántaro Mezcla Láctea de 12,5 kg">' : '') + '</div></div>' +
        '<div class="franja f4"><div class="relleno"><svg class="destello" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M18 44.4Q29 49.7 40 51.3"/></svg></div></div></div>' +
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

  function ciudadCanonica(t) { var n = normal(t).trim(); for (var i = 0; i < CIUDADES.length; i++) if (normal(CIUDADES[i]) === n) return CIUDADES[i]; return null; }
  function slugCiudad(n) { return normal(n).trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function ciudadDeSlug(s) { for (var i = 0; i < CIUDADES.length; i++) if (slugCiudad(CIUDADES[i]) === s) return CIUDADES[i]; return null; }
  VISTAS.privacidad = function () { var v = minima('Política de tratamiento de datos', 'Cómo tratamos sus datos personales, según la Ley 1581 de 2012.', '<div class="cuerpo-texto"><p>Responsable: ' + esc(C.empresa.razon_social) + ', NIT ' + nw(C.empresa.nit) + '. Los datos de los formularios se usan solo para responder su solicitud. ' + porConfirmar('texto completo por publicar') + '</p></div>', [['Contacto', '#contacto']]); v.html += notasHTML(['El texto legal completo de la política lo entrega el cliente.']); return v; };
  VISTAS.terminos = function () { var v = minima('Términos de uso', 'Condiciones de uso del sitio.', '<div class="cuerpo-texto"><p>Los precios se entregan con cada cotización; el sitio no vende en línea. ' + porConfirmar('texto completo por publicar') + '</p></div>', [['Contacto', '#contacto']]); v.html += notasHTML(['El texto legal de los términos lo entrega el cliente.']); return v; };

  /* ---------- 404: el globo vacío ---------- */
  VISTAS['no-existe'] = function () {
    var msg = 'Hola, Mundilácteos. Busco un producto en su sitio y no lo encuentro. Estoy en ____.';
    var bajo = '<p class="entradilla">Busque un producto o vuelva al inicio.</p>' +
      '<div class="buscador" role="search" aria-label="Buscar desde esta página" data-buscador><label class="sr" for="buscar-404">Buscar productos</label>' + icono('i-buscar') +
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

  /* ---------- Componentes de las páginas interiores (compartidos por varias) ---------- */

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
    var svg = '<svg class="esquema-bolsa" viewBox="0 0 300 400" role="img" aria-label="Esquema de ejemplo del reverso de una bolsa con cinco zonas: lote, vencimiento, tabla nutricional, registro sanitario y peso neto"><g class="lienzo"><path class="bolsa-cuerpo" d="M40 380Q40 386 46 386H254Q260 386 260 380V40L255 32L250 40L245 40L240 40L235 32L230 40L225 40L220 40L215 32L210 40L205 40L200 40L195 32L190 40L185 40L180 40L175 32L170 40L165 40L160 40L155 32L150 40L145 40L140 40L135 32L130 40L125 40L120 40L115 32L110 40L105 40L100 40L95 32L90 40L85 40L80 40L75 32L70 40L65 40L60 40L55 32L50 40L45 40L40 40Z"/><path class="sello" d="M44 56H256"/><text class="ejemplo" x="252" y="51" text-anchor="end">ejemplo</text><g class="zg zg-lote"><rect class="zona" x="52" y="64" width="94" height="38" rx="3"/><text class="rotulo fuerte" x="58" y="79">Lote</text><text class="rotulo" x="58" y="95">L 0000-0</text></g><g class="zg zg-vence"><rect class="zona" x="154" y="64" width="94" height="38" rx="3"/><text class="rotulo fuerte" x="160" y="79">Vence</text><text class="rotulo" x="160" y="95">DD/MM/AA</text></g><g class="zg zg-tabla"><rect class="zona" x="52" y="112" width="122" height="196" rx="3"/><text class="rotulo fuerte" x="58" y="128">Información</text><text class="rotulo fuerte" x="58" y="142">nutricional</text><path class="guia-fila gruesa" d="M58 149H168"/><text class="impreso" x="58" y="166">Porción</text><path class="guia-fila" d="M58 171H168"/><text class="impreso" x="58" y="184">Calorías</text><path class="guia-fila" d="M58 189H168"/><text class="impreso" x="58" y="202">Grasa total</text><path class="guia-fila" d="M58 207H168"/><text class="impreso" x="58" y="220">Carbohidratos</text><path class="guia-fila" d="M58 225H168"/><text class="impreso" x="58" y="238">Azúcares</text><path class="guia-fila" d="M58 243H168"/><text class="impreso" x="58" y="256">Proteína</text><path class="guia-fila" d="M58 261H168"/><text class="impreso" x="58" y="274">Sodio</text><path class="guia-fila" d="M58 279H168"/><text class="impreso" x="58" y="292">Hierro</text><path class="guia-fila" d="M58 297H168"/></g><g class="zg-resto"><text class="impreso" x="188" y="128">Hecho en</text><text class="impreso" x="188" y="144">Turbaco,</text><text class="impreso" x="188" y="160">Bolívar.</text><text class="impreso" x="188" y="190">Lugar</text><text class="impreso" x="188" y="206">fresco y</text><text class="impreso" x="188" y="222">seco.</text></g><g class="zg zg-registro"><rect class="zona" x="52" y="320" width="124" height="36" rx="3"/><text class="impreso" x="58" y="334">Registro INVIMA</text><text class="rotulo fuerte" x="58" y="350">RSA-006359-2018</text></g><g class="zg zg-peso"><rect class="zona" x="180" y="312" width="70" height="46" rx="3"/><text class="impreso" x="186" y="328">Peso neto</text><text class="rotulo grande" x="186" y="349">380 g</text></g></g></svg>';
    return '<div class="bolsa-visor"><figure class="marco bolsa-marco"><div class="marco-area">' + svg + '</div><figcaption><span class="codigo-toma">E02</span><span>Esquema de ejemplo. La foto del reverso de The Cántaro 380' + NB + 'g está por producir.</span></figcaption></figure>' +
      '<div class="bolsa-explica"><fieldset><legend class="sr">Zona de la bolsa</legend><div class="chips">' + ZONAS_BOLSA.map(function (z, i) {
        return '<label class="chip"><input type="radio" name="' + pref + '-zona" data-zona="' + z[0] + '"' + (i === 0 ? ' checked' : '') + '><span class="chip-cara">' + CHECK + z[1] + '</span></label>';
      }).join('') + '</div></fieldset><div aria-live="polite">' + ZONAS_BOLSA.map(function (z) {
        return '<div class="zona-texto zt-' + z[0] + '"><h3>' + z[1] + '</h3><p>' + z[2] + '</p>' + (z[3] ? '<div class="acciones">' + btnCopiar('RSA-006359-2018', 'Copiar número') + enlaceExterno(INVIMA, 'Verificar en el INVIMA') + '</div>' : '') + '</div>';
      }).join('') + '</div><button class="btn-texto ver-completa solo-js" type="button" data-bolsa-completa hidden>Ver la bolsa completa</button></div></div>';
  }

  /* Fichas técnicas descargables: copia en HTML de la misma tabla de la ficha */
  function documentoFicha(p) {
    var tabla = tablaTecnicaHTML(p).replace(/<span class="sr">[^<]*<\/span>/g, '').replace(/ tabindex="0" role="region" aria-labelledby="cap-tecnica"/, '');
    return '<!doctype html><html lang="es-CO"><head><meta charset="utf-8"><title>Ficha técnica: ' + esc(p.nombre) + '</title><meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<style>body{font:16px/1.55 Arial,sans-serif;color:#0B1F4F;background:#FFFFFF;max-width:780px;margin:32px auto;padding:0 16px}h1{color:#0A2F8F;font-size:30px;line-height:1.1;margin:0 0 6px}p{margin:0 0 12px}table{border-collapse:collapse;width:100%;margin-top:16px}caption{text-align:left;font-weight:700;padding-bottom:8px}th,td{text-align:left;vertical-align:top;padding:8px 12px}th{width:30%;color:#0A2F8F}tr:nth-child(odd)>*{background:#EEF4FB}a{color:#0B6FB8}.por-confirmar,.nota-asterisco{color:#4A5877;font-size:13px}.por-confirmar::before{content:"("}.por-confirmar::after{content:")"}small{color:#4A5877}</style></head><body>' +
      '<p><small>Inversiones Mundilácteos S.A.S. NIT ' + C.empresa.nit + '. ' + esc(C.empresa.direccion) + ', Turbaco (Bolívar). Tel. y WhatsApp ' + TEL + '.</small></p>' +
      '<h1>Ficha técnica: ' + esc(p.nombre) + '</h1><p>' + esc(p.denominacion) + '</p>' + tabla +
      '<p><small>Documento generado desde el catálogo del ' + fechaCO(C.actualizado) + '. Los datos marcados «dato a confirmar» están por confirmar.</small></p></body></html>';
  }
  function pesoFicha(p) { var b = documentoFicha(p).length; return Math.max(1, Math.round(b / 1024)) + '\u00a0KB'; }
  function fichaFilaHTML(p) {
    return '<li><span class="f-nombre">' + esc(p.nombre) + '</span><span class="f-reg nw">' + p.registro + '</span><a href="#producto-' + p.slug + '">Ver ficha<span class="sr"> técnica de ' + esc(p.nombre) + '</span></a>' +
      '<button class="btn-descargar solo-js" type="button" data-descargar-ficha="' + p.slug + '">' + icono('i-abajo') + 'Descargar copia (HTML, ' + pesoFicha(p) + ')<span class="sr"> de la ficha técnica de ' + esc(p.nombre) + '</span></button></li>';
  }
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

  /* Utilidades para las páginas interiores (vistas.js, que se carga a pedido) */
  function actualizarRuta() { rutaActual = leerRuta(); }
  window.MUNDI_C1 = { '$': $, '$$': $$, C: C, CHECK: CHECK, CIUDADES: CIUDADES, COSTA: COSTA, DATOS_GOV: DATOS_GOV, DIM: DIM, DIRECCION_TXT: DIRECCION_TXT, INVIMA: INVIMA, MAPS: MAPS, MARCAS: MARCAS, NB: NB, PRODS: PRODS, REGS: REGS, TEL: TEL, TEL_HREF: TEL_HREF, T_COSTA: T_COSTA, T_RESTO: T_RESTO, VISTAS: VISTAS, WA_VISIBLE: WA_VISIBLE, anunciar: anunciar, aviso: aviso, btnCopiar: btnCopiar, btnWA: btnWA, cabeza: cabeza, cabezaGlobo: cabezaGlobo, ciudadCanonica: ciudadCanonica, ciudadDeSlug: ciudadDeSlug, conUnidad: conUnidad, enPagina: enPagina, enlaceExterno: enlaceExterno, entrarGlobo: entrarGlobo, esc: esc, fechaCO: fechaCO, fmt: fmt, icono: icono, imagenDe: imagenDe, kg: kg, leerRuta: leerRuta, lineaWA: lineaWA, marcoToma: marcoToma, migas: migas, miles: miles, notasHTML: notasHTML, nw: nw, pintarBotonAgregar: pintarBotonAgregar, plural: plural, porConfirmar: porConfirmar, presKey: presKey, presPorDefecto: presPorDefecto, presentacion: presentacion, producto: producto, reducido: reducido, referencia: referencia, slugCiudad: slugCiudad, tablaConvieneHTML: tablaConvieneHTML, tablaTecnicaHTML: tablaTecnicaHTML, titulo2: titulo2, ventaDe: ventaDe, verificado: verificado, waUrl: waUrl, actualizarRuta: actualizarRuta, recorridoHTML: recorridoHTML, itemPack: itemPack, escenaGrupo: escenaGrupo, numeroSolicitud: numeroSolicitud, campoTexto: campoTexto, campoWA: campoWA, campoAcepto: campoAcepto, montarFormulario: montarFormulario, confirmar: confirmar, resumenErroresHTML: resumenErroresHTML, visorBolsaHTML: visorBolsaHTML, documentoFicha: documentoFicha, pesoFicha: pesoFicha, fichaFilaHTML: fichaFilaHTML, descargarFicha: descargarFicha, validaWA: validaWA, validaTexto: validaTexto, ZONAS_BOLSA: ZONAS_BOLSA, CMP_MAX: CMP_MAX, NNBSP: NNBSP, TIPO_CORTO: TIPO_CORTO, USO_CORTO: USO_CORTO, cambiarImg: cambiarImg, casillaComparar: casillaComparar, chipsPresentacion: chipsPresentacion, cmpValido: cmpValido, copiarTexto: copiarTexto, datosVentaHTML: datosVentaHTML, enComparar: enComparar, esBulto: esBulto, esMezcla: esMezcla, escritorio: escritorio, fijarComparar: fijarComparar, fijarFicha: fijarFicha, hashComparar: hashComparar, listaComparar: listaComparar, miniEscena: miniEscena, rindeDe: rindeDe, tieneAsterisco: tieneAsterisco };

  /* ---------------------------------------------------------------------------
     Arranque
     --------------------------------------------------------------------------- */
  /* Anclas del inicio para navegar sin JavaScript: con JavaScript el router manda y esos id se retiran */
  $$('[data-sinjs]').forEach(function (el) { el.removeAttribute('id'); });
  /* El horario sale siempre del catálogo */
  $$('[data-horario]').forEach(function (el) { el.textContent = C.empresa.horario.valor; });
  /* Cómo leer una bolsa: en reposo, la bolsa completa; se acerca a la zona solo cuando la persona la elige */
  document.addEventListener('change', function (e) {
    var z = e.target.closest && e.target.closest('[data-zona]'); if (!z) return;
    var v = z.closest('.bolsa-visor'); if (!v) return;
    v.classList.add('acercar');
    var b = $('[data-bolsa-completa]', v); if (b) b.hidden = false;
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-bolsa-completa]'); if (!b) return;
    var v = b.closest('.bolsa-visor'); v.classList.remove('acercar'); b.hidden = true;
    anunciar('Se muestra la bolsa completa.');
  });

  cargarQ();
  pintarConteoCabecera(false);
  function arrancar() {
    var r0 = leerRuta();
    rutaActual = r0.vista === 'ancla' ? { vista: 'inicio', params: [] } : r0;
    render(rutaActual, true);
    if (location.hash && location.hash !== '#inicio') enfocarH1();
  }
  if (necesitaVistas(leerRuta())) cargarVistas(leerRuta()).then(arrancar, arrancar); else arrancar();
})();

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

  var MARCAS = {}; C.marcas.forEach(function (m) { MARCAS[m.id] = m; });
  var CATS = {}; C.categorias.forEach(function (c) { CATS[c.id] = c; });
  var REGS = {}; C.calidad.registros.forEach(function (r) { REGS[r.numero] = r; });
  var PRODS = C.productos;
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

  /* Presentación por defecto: la que coincide con la foto del producto, si no la primera confirmada */
  function presPorDefecto(p) {
    if (!p.presentaciones.length) return null;
    for (var i = 0; i < p.presentaciones.length; i++) if (p.presentaciones[i].imagen && p.presentaciones[i].imagen === p.imagen) return p.presentaciones[i];
    for (var j = 0; j < p.presentaciones.length; j++) if (p.presentaciones[j].estado === 'confirmado') return p.presentaciones[j];
    return p.presentaciones[0];
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
    return {
      src: 'img/r-' + archivo, w: d[0], h: d[1], alt: alt,
      referencia: !!(pr && !pr.imagen && dueña && dueña !== pr), de: dueña ? dueña.contenido : null
    };
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
      return '<label class="chip"><input type="radio" name="' + nombre + '" value="' + k + '"' + (sel && presKey(sel.contenido) === k ? ' checked' : '') + '><span class="chip-cara">' + CHECK + esc(conUnidad(pr.contenido)) + ast + '</span></label>';
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

  var deshacerPendiente = null, avisoTimer = null;
  function aviso(texto, deshacer) {
    var el = $('#aviso');
    $('#aviso-texto').textContent = texto;
    deshacerPendiente = deshacer || null;
    $('#aviso-deshacer').hidden = !deshacer;
    el.hidden = false; el.classList.remove('entra'); void el.offsetWidth; el.classList.add('entra');
    anunciar(texto + (deshacer ? ' Puede deshacer desde el aviso.' : ''));
    window.clearTimeout(avisoTimer);
    avisoTimer = window.setTimeout(function () { el.hidden = true; }, 6500);
  }
  $('#aviso-deshacer').addEventListener('click', function () {
    if (deshacerPendiente) { deshacerPendiente(); deshacerPendiente = null; }
    $('#aviso').hidden = true;
    anunciar('Cambio deshecho.');
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
      return '<li class="linea" data-linea="' + i.s + '|' + i.p + '">' +
        (im ? '<img src="' + im.src + '" width="' + im.w + '" height="' + im.h + '" alt="">' : '<span class="linea-img-vacia"><svg width="28" height="38" viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><use href="#p-' + (esBulto(L.pr) ? 'bulto' : 'bolsa') + '"/></svg></span>') +
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
        var t = copiar.querySelector('span:not(.sr)'); var antes = t.textContent; t.textContent = 'Número copiado';
        anunciar('Número ' + numero + ' copiado.');
        window.setTimeout(function () { copiar.classList.remove('copiado'); t.textContent = antes; }, 2000);
      }, function () { aviso('No se pudo copiar. El número es ' + numero + '.'); });
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
    var conocidas = ['inicio', 'productos', 'nosotros', 'calidad', 'por-que-elegirnos', 'distribucion', 'donde-comprar', 'cotizar', 'marca-propia', 'recursos', 'contacto', 'privacidad', 'terminos'];
    if (conocidas.indexOf(base) !== -1) return { vista: base, params: params, hash: h };
    if (document.getElementById(base)) return { vista: 'ancla', id: base, hash: h };
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
    if (!primera || location.hash) window.scrollTo(0, 0);
  }

  function slugCompartido(anterior, nueva) {
    if (nueva.vista === 'producto') return nueva.slug;
    if (anterior && anterior.vista === 'producto' && nueva.vista === 'productos') return anterior.slug;
    return null;
  }
  function nombrar(slug, activo) {
    $$('[data-vt-pack="' + slug + '"]').slice(0, 1).forEach(function (el) { el.style.viewTransitionName = activo ? 'pack' : ''; });
    $$('[data-vt-nombre="' + slug + '"]').slice(0, 1).forEach(function (el) { el.style.viewTransitionName = activo ? 'nombre' : ''; });
  }

  function navegar() {
    var r = leerRuta();
    if (r.vista === 'ancla') return;
    if (rutaActual && rutaActual.vista === 'productos' && r.vista === 'productos') { aplicarRutaCatalogo(r); rutaActual = r; return; }
    if (rutaActual && rutaActual.vista === 'producto' && r.vista === 'producto' && rutaActual.slug === r.slug && fichaViva) { fichaViva.elegirDesdeRuta(r); rutaActual = r; return; }
    var anterior = rutaActual;
    cerrarPanel(false); cerrarMenu(false); cerrarHojaFiltros(false);
    var puede = anterior && document.startViewTransition && !reducido();
    if (!puede) { rutaActual = r; render(r, !anterior); enfocarH1(); return; }
    var slug = slugCompartido(anterior, r);
    compartiendo = slug;
    if (slug) nombrar(slug, true);
    var t = document.startViewTransition(function () {
      if (slug) nombrar(slug, false);
      rutaActual = r;
      render(r);
      if (slug) nombrar(slug, true);
    });
    t.updateCallbackDone.then(enfocarH1, enfocarH1);
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
    var cont = btn.closest('.vitrina, .ficha-rejilla');
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
    return { titulo: 'Solicitar cotización', html: html, montar: montarCotizar };
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

  /* ---------- Vistas mínimas (se completan en la tarea 2) ---------- */
  function enlacesHTML(lista) { return '<div class="interior-enlaces">' + lista.map(function (l) { return '<a class="enlace" href="' + l[1] + '">' + esc(l[0]) + '</a>'; }).join('') + '</div>'; }
  function minima(titulo, entradilla, cuerpo, enlaces, rastro) {
    return { titulo: titulo, html: cabezaInterior(titulo, entradilla, rastro) + '<div class="contenedor interior-cuerpo">' + (cuerpo || '') + (enlaces ? enlacesHTML(enlaces) : '') + '</div>' };
  }
  VISTAS.nosotros = function () {
    return minima('Nosotros', 'Una empresa familiar con planta en Turbaco, Bolívar.',
      '<div class="cuerpo-texto"><p>' + esc(C.empresa.razon_social) + ' fabrica y empaca leche en polvo en el Parque Industrial Europark, en Turbaco, con las marcas The Cántaro y La Becerrita, y empaca para cadenas y distribuidores con su marca.</p><p>Año de constitución: ' + esc(C.empresa.constitucion.valor) + ' ' + porConfirmar() + '</p></div>',
      [['Por qué elegirnos', '#por-que-elegirnos'], ['Ver productos', '#productos'], ['Contacto', '#contacto']]);
  };
  VISTAS.calidad = function () {
    var lista = '<ul class="lista-limpia" style="display:grid;gap:.75rem;font-family:var(--fuente-sans)">' + C.calidad.registros.map(function (r) {
      return '<li class="verificado">' + icono('i-verificado') + '<span><strong class="num">' + r.numero + '</strong>: ' + esc(r.producto) + '. Vigente hasta el ' + fechaCO(r.vence) + '. <a href="' + INVIMA + '" target="_blank" rel="noopener">Verificar<span class="sr"> ' + r.numero + ', abre otra pestaña</span></a></span></li>';
    }).join('') + '</ul><p class="verificado" style="font-family:var(--fuente-sans)">' + icono('i-verificado') + '<span>Concepto sanitario favorable del establecimiento N.º 24741. <a href="' + esc(C.calidad.invima_establecimiento.fuente) + '" target="_blank" rel="noopener">Ver en datos.gov.co<span class="sr">, abre otra pestaña</span></a></span></p>';
    return minima('Calidad y registros', 'Cada número de esta página se puede comprobar en una fuente pública.', lista, [['Por qué elegirnos', '#por-que-elegirnos'], ['Contacto para peticiones, quejas y reclamos', '#contacto']]);
  };
  VISTAS['por-que-elegirnos'] = function () {
    var razones = ['Cinco registros sanitarios vigentes.', 'Concepto sanitario favorable del establecimiento.', 'Planta propia en el Parque Industrial Europark, Turbaco.', 'Bolsa de tres capas sellada en atmósfera de CO₂ y 12 meses de vida útil.', 'De 380 g a 25 kg, y con su marca.', 'Despacho a todo el país con asesor por zona.'];
    return minima('Por qué elegirnos', 'Seis razones, cada una con la forma de comprobarla.', '<ul class="cuerpo-texto">' + razones.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>', [['Verificar registros', '#calidad'], ['Ver productos', '#productos'], ['Ver cobertura', '#distribucion']]);
  };
  VISTAS.distribucion = function () {
    return minima('Distribución y cobertura', 'Salimos de Turbaco hacia toda Colombia. Elija su ciudad para ver el tiempo de entrega y quién le atiende.',
      '<div class="cuerpo-texto"><p>' + esc(C.cobertura.texto) + '</p><p>' + esc(C.cobertura.tiempos.valor) + ' ' + porConfirmar() + '</p><p>Pedido mínimo: ' + esc(C.cobertura.pedido_minimo.valor) + '</p></div>',
      [['Cotizar por volumen', '#cotizar'], ['Dónde comprar', '#donde-comprar'], ['Contacto', '#contacto']], [['Inicio', '#inicio'], ['Cobertura', '']]);
  };
  VISTAS['donde-comprar'] = function () {
    var canales = '<ul class="lista-limpia" style="display:grid;gap:.5rem;font-family:var(--fuente-sans)">' + C.canales.filter(function (c) { return c.url; }).map(function (c) {
      return '<li><a href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(c.nombre) + '<span class="sr">, abre otra pestaña</span></a>: ' + esc(c.tipo.toLowerCase()) + ', ' + esc(c.region.toLowerCase()) + '. ' + esc(c.estado) + '.</li>';
    }).join('') + '</ul>';
    return minima('Dónde comprar', 'The Cántaro está en supermercados de la Costa y del país. Busque su ciudad.', canales, [['Ser distribuidor', '#distribucion'], ['Ver productos para el hogar', '#productos~negocio-hogar']], [['Inicio', '#inicio'], ['Cobertura', '#distribucion'], ['Dónde comprar', '']]);
  };
  VISTAS['marca-propia'] = function () {
    var imgs = '<figure><div class="chips" style="gap:1.5rem;align-items:flex-end">' + C.maquila.imagenes.map(function (a, i) {
      return '<img src="img/' + a + '" width="120" height="180" style="height:180px;width:auto" alt="Empaque de marca propia fabricado por Mundilácteos, ejemplo ' + (i + 1) + '" loading="lazy">';
    }).join('') + '</div><figcaption class="foto-pie">Empaques de marcas propias fabricados en 2022. Se muestran con autorización del cliente.</figcaption></figure>';
    return minima('Leche en polvo con la marca de su cadena', 'Empacamos en Turbaco con nuestro registro sanitario vigente.',
      '<div class="cuerpo-texto"><p>' + esc(C.maquila.resumen) + '</p><p>Gramajes: ' + esc(C.maquila.gramajes.map(conUnidad).join(', ')) + '.</p><p>No publicamos las marcas que empacamos sin autorización escrita.</p></div>' + imgs,
      [['Pedir muestras', '#contacto'], ['Ver productos', '#productos']], [['Inicio', '#inicio'], ['Productos', '#productos'], ['Con su marca', '']]);
  };
  var ARTICULOS = {
    'verificar-registro-invima': ['Cómo verificar un registro sanitario en el INVIMA', 'Copie el número de registro de la bolsa, por ejemplo RSA-006359-2018, ábralo en la consulta pública del INVIMA y compruebe el titular, el producto y la vigencia.'],
    'leche-o-mezcla-lactea': ['Leche en polvo o mezcla láctea: cómo diferenciarlas en la etiqueta', 'La denominación del frente y el registro sanitario le dicen qué compra: la leche en polvo es leche; la mezcla láctea es una mezcla en polvo a base de leche con otros ingredientes, como endulzantes.'],
    'preparar-un-litro': ['Cómo preparar un litro con leche en polvo', 'La ficha técnica indica 135 g de leche en polvo por litro de agua; el empaque de 380 g dice que rinde 3 litros. Cifras por unificar con el cliente.'],
    'guardar-bulto-abierto': ['Cómo guardar un bulto abierto', 'Recomendaciones del equipo de calidad para conservar la leche en polvo después de abrir el saco. Guía en preparación con el cliente.'],
    'arroz-con-leche': ['Arroz con leche costeño', 'Receta con leche en polvo, probada en cocina antes de publicarse. Receta en preparación.']
  };
  VISTAS.recursos = function () {
    return minima('Recursos', 'Guías, recetas y fichas técnicas para su casa y su negocio.',
      '<ul class="guias-lista">' + Object.keys(ARTICULOS).map(function (k) { return '<li><a href="#articulo-' + k + '"><span class="g-titulo">' + esc(ARTICULOS[k][0]) + '</span></a></li>'; }).join('') + '</ul>',
      [['Fichas técnicas en Productos', '#productos']]);
  };
  VISTAS.articulo = function (r) {
    var a = ARTICULOS[r.slug];
    if (!a) return VISTAS['no-existe'](r);
    return minima(a[0], esc(a[1]), '', [['Ver recursos', '#recursos'], ['Ver productos', '#productos']], [['Inicio', '#inicio'], ['Recursos', '#recursos'], [a[0], '']]);
  };
  VISTAS.contacto = function () {
    var e = C.empresa;
    var cuerpo = '<div class="datos-contacto">' +
      '<p><a href="' + esc(waUrl('Hola, Mundilácteos. Quiero cotizar leche en polvo para mi negocio en ____.')) + '" target="_blank" rel="noopener">Escribir por WhatsApp</a>: ' + e.telefono_visible + '</p>' +
      '<p><a href="tel:' + e.telefono.replace(/\s/g, '') + '">Llamar</a>: ' + e.telefono_visible + '</p>' +
      '<p><a href="mailto:' + e.correo.valor + '">Correo</a>: ' + e.correo.valor + ' ' + porConfirmar() + '</p>' +
      '<p>' + esc(e.direccion) + '. ' + esc(e.municipio) + '.</p>' +
      '<p>' + esc(e.horario.valor) + ' ' + porConfirmar() + '</p></div>';
    return minima('Contacto', 'Asesores por zona, teléfono y dirección de la planta.', cuerpo, [['Solicitar cotización', '#cotizar'], ['Cómo llegar', 'https://www.google.com/maps/search/?api=1&query=Parque+Industrial+Europark+Turbaco+Bol%C3%ADvar']]);
  };
  VISTAS.privacidad = function () { return minima('Política de tratamiento de datos', 'Cómo tratamos sus datos personales, según la Ley 1581 de 2012. El texto lo entrega el cliente.', '', [['Contacto', '#contacto']]); };
  VISTAS.terminos = function () { return minima('Términos de uso', 'Condiciones de uso del sitio. El texto lo entrega el cliente.', '', [['Contacto', '#contacto']]); };
  VISTAS['no-existe'] = function () { return minima('Esta página no existe.', 'Busque un producto o vuelva al inicio.', '', [['Ir al inicio', '#inicio'], ['Ver productos', '#productos']]); };

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

/* Mundilácteos, Concepto 2 «Peso neto». Prototipo navegable.
   Enrutamiento por hash, catálogo desde window.CATALOGO, Mi cotización persistente (localStorage con try/catch). */
(function () {
  'use strict';

  var C = window.CATALOGO;
  if (!C) return;
  document.documentElement.lang = 'es-CO';

  /* =========================================================
     Utilidades
     ========================================================= */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var NB = ' '; // espacio fino no separable antes de la unidad
  var NBSP = ' ';
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var norm = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); };
  function fmtNum(n, dec) {
    var s = Math.abs(n).toFixed(dec).split('.');
    var ent = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (n < 0 ? '−' : '') + ent + (s[1] ? ',' + s[1] : '');
  }
  var fmtKg = function (kg) { return fmtNum(kg, 1) + NB + 'kg'; };
  var fmtL = function (l) { return (l < 10 ? fmtNum(l, 1) : fmtNum(Math.round(l), 0)) + NB + 'L'; };
  var fmtPres = function (c) { return String(c).replace(' ', NB); };
  var plural = function (n, s, p) { return n === 1 ? s : p; };
  function lista(arr, conj) {
    conj = conj || 'y';
    if (arr.length <= 1) return arr.join('');
    return arr.slice(0, -1).join(', ') + ' ' + conj + ' ' + arr[arr.length - 1];
  }
  var icono = function (id, clase) { return '<svg class="' + (clase || 'icono') + '" aria-hidden="true" focusable="false"><use href="#' + id + '"/></svg>'; };
  var aconf = function (txt) { return '<span class="aconf">' + (txt || 'dato a confirmar') + '</span>'; };
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  function fechaLarga(iso) { var p = iso.split('-'); return parseInt(p[2], 10) + ' de ' + MESES[parseInt(p[1], 10) - 1] + ' de ' + p[0]; }
  var reducido = function () { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; };
  var esEscritorio = function () { return window.matchMedia('(min-width: 1024px)').matches; };

  /* =========================================================
     Datos derivados del catálogo
     ========================================================= */
  var E = C.empresa;
  var TEL_VISIBLE = E.telefono_visible.replace(/ /g, NBSP);
  var MARCA = {}; C.marcas.forEach(function (m) { MARCA[m.id] = m; });
  var CAT = {}; C.categorias.forEach(function (c) { CAT[c.id] = c; });
  var USO = {}; C.usos.forEach(function (u) { USO[u.id] = u; });
  var REG = {}; C.calidad.registros.forEach(function (r) { REG[r.numero] = r; });
  var G_POR_L = C.calidad.preparacion.g_por_litro;
  var TIPOS = [
    { id: 'entera', cat: 'leche-entera' }, { id: 'descremada', cat: 'leche-descremada' },
    { id: 'azucarada', cat: 'leche-azucarada' }, { id: 'mezcla', cat: 'mezcla-lactea' }, { id: 'alimento', cat: 'alimento-lacteo' },
  ];
  var TIPO_DE_CAT = {}; TIPOS.forEach(function (t) { TIPO_DE_CAT[t.cat] = t.id; });
  var CAT_DE_TIPO = {}; TIPOS.forEach(function (t) { CAT_DE_TIPO[t.id] = t.cat; });
  var esLeche = function (p) { return p.categoria.indexOf('leche-') === 0; };
  var presSlug = function (c) { return String(c).toLowerCase().replace(',', '.').replace(/\s+/g, '-'); };
  var esBulto = function (pr) { return pr.formato === 'bulto'; };
  var unidad = function (pr, n) { return esBulto(pr) ? plural(n, 'bulto', 'bultos') : plural(n, 'paca', 'pacas'); };
  var kgUnidad = function (pr) { return esBulto(pr) ? pr.gramos / 1000 : (pr.unidades_por_paca ? pr.unidades_por_paca * pr.gramos / 1000 : null); };
  var rinde = function (p, pr) { return esLeche(p) ? pr.gramos / G_POR_L : null; };

  var PROD = {}; C.productos.forEach(function (p, i) { PROD[p.slug] = p; p._i = i; });
  var REFS = [];
  C.productos.forEach(function (p) {
    p.presentaciones.forEach(function (pr) {
      var r = { id: p.slug + '_' + presSlug(pr.contenido), p: p, pr: pr };
      r.idx = norm([MARCA[p.marca] ? MARCA[p.marca].nombre : '', p.nombre, p.denominacion, CAT[p.categoria].nombre, pr.formato,
        pr.contenido, pr.contenido.replace(' ', ''), pr.ean || '', p.registro, p.usos.map(function (u) { return USO[u].nombre; }).join(' '),
        esBulto(pr) ? 'bulto granel' : 'bolsa paca', p.fortificacion || ''].join(' '));
      REFS.push(r);
    });
  });
  var REF = {}; REFS.forEach(function (r) { REF[r.id] = r; });
  var nombreRef = function (r) { return r.p.nombre + ' ' + r.pr.contenido; };
  var nombreRefNB = function (r) { return r.p.nombre + ' ' + fmtPres(r.pr.contenido); };
  var porPeso = function (a, b) { return a.pr.gramos - b.pr.gramos || a.p._i - b.p._i; };
  var PESOS = []; REFS.slice().sort(porPeso).forEach(function (r) { if (PESOS.indexOf(r.pr.contenido) === -1) PESOS.push(r.pr.contenido); });

  // Fila a escala: medidas estimadas de DIRECCION.md §12 (800 g interpolada: solo aparece en la ficha)
  var FILA = [
    { c: '27 g', g: 27, alto: 11, ancho: 8 }, { c: '104 g', g: 104, alto: 15, ancho: 11 }, { c: '200 g', g: 200, alto: 18, ancho: 13 },
    { c: '380 g', g: 380, alto: 22, ancho: 16 }, { c: '400 g', g: 400, alto: 22, ancho: 16 }, { c: '500 g', g: 500, alto: 24, ancho: 17 },
    { c: '750 g', g: 750, alto: 27, ancho: 19 }, { c: '800 g', g: 800, alto: 28, ancho: 20 }, { c: '900 g', g: 900, alto: 29, ancho: 20 },
    { c: '1000 g', g: 1000, alto: 30, ancho: 21 }, { c: '5 kg', g: 5000, alto: 45, ancho: 30 }, { c: '12,5 kg', g: 12500, alto: 65, ancho: 40 },
    { c: '25 kg', g: 25000, alto: 90, ancho: 50 },
  ];
  var FILA_DE = {};
  FILA.forEach(function (f) { f.t = Math.round(Math.log(f.g / 27) / Math.log(25000 / 27) * 100) / 100; FILA_DE[f.c] = f; });

  function estadoGramaje(c) {
    var refs = REFS.filter(function (r) { return r.pr.contenido === c; });
    if (!refs.length) return { estado: 'maquila', refs: refs };
    return { estado: refs.some(function (r) { return r.pr.estado === 'confirmado'; }) ? 'casa' : 'porconfirmar', refs: refs };
  }

  function silueta(tipo, w, h, punteada) {
    var r = function (n) { return Math.round(n * 100) / 100; };
    var d, extra;
    if (tipo === 'bolsa') {
      var n = Math.max(3, Math.round(w / 1.6)), tw = w / n, th = r(Math.min(0.7, h * 0.05));
      d = 'M0 ' + h + 'V' + th;
      for (var i = 0; i < n; i++) d += 'L' + r(tw * i + tw / 2) + ' 0L' + r(tw * (i + 1)) + ' ' + th;
      d += 'V' + h + 'Z';
      var s1 = r(th + Math.max(0.9, h * 0.07)), s2 = r(h - Math.max(0.8, h * 0.06));
      extra = '<path class="sello-linea" d="M0 ' + s1 + 'H' + w + 'M0 ' + s2 + 'H' + w + '"/>';
    } else {
      var e = r(Math.min(1.8, w * 0.05)), c = r(Math.max(2.2, h * 0.05));
      d = 'M0 ' + e + 'L' + e + ' 0H' + r(w - e) + 'L' + w + ' ' + e + 'V' + r(h - e / 2) + 'L' + r(w - e / 2) + ' ' + h + 'H' + r(e / 2) + 'L0 ' + r(h - e / 2) + 'Z';
      extra = '<path class="costura" d="M' + e + ' ' + c + 'H' + r(w - e) + '"/>';
    }
    return '<svg class="silueta' + (punteada ? ' silueta--maquila' : '') + '" viewBox="-0.6 -0.6 ' + r(w + 1.2) + ' ' + r(h + 1.2) +
      '" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false"><path class="contorno" d="' + d + '"/>' + extra + '</svg>';
  }

  // Tomas de la lista de producción (DIRECCION.md §4.4)
  var TOMAS = {
    F01: { fam: 'Ficha', desc: 'Frente de la referencia sobre fondo blanco, con regla física en el cuadro.', spec: 'Formato 4:5, sombra de contacto.' },
    F02: { fam: 'Ficha', desc: 'Reverso con lote y vencimiento legibles.', spec: 'Formato 4:5, luz difusa.' },
    F03: { fam: 'Ficha', desc: 'Paca envuelta de esta presentación, a tres cuartos.', spec: 'Formato 1:1, fondo blanco.' },
    F04: { fam: 'Ficha', desc: 'Bulto de frente y a tres cuartos.', spec: 'Formato 4:5, fondo blanco.' },
    M02: { fam: 'Materia', desc: 'Polvo disolviéndose en un vaso de 200 ml, secuencia de 3.', spec: 'Formato 1:1.' },
    M04: { fam: 'Materia', desc: 'Costura y papel triple del saco kraft.', spec: 'Macro 3:2.' },
    C01: { fam: 'Clientes', desc: 'Panadero de Cartagena abriendo un bulto en su obrador, con luz de mediodía.', spec: 'Formato 4:5.' },
    C04: { fam: 'Clientes', desc: 'Cocina de casa: alguien prepara un vaso o arequipe, con luz de ventana.', spec: 'Formato 4:5.' },
    C05: { fam: 'Clientes', desc: 'Operario de una industria de alimentos vaciando un bulto en la mezcladora.', spec: 'Formato 3:2.' },
    C03: { fam: 'Clientes', desc: 'Góndola de un supermercado de la Costa con The Cántaro y La Becerrita.', spec: 'Formato 3:2, con permiso de la cadena.' },
    M03: { fam: 'Materia', desc: 'Grano de leche en polvo bajo lupa de 10x.', spec: 'Formato 1:1.' },
    O01: { fam: 'Oficio', desc: 'Manos con guantes y cofia en la empacadora.', spec: 'Formato 3:2.' },
    O02: { fam: 'Oficio', desc: 'Codificación de lote y vencimiento en la bolsa, en la línea de empaque.', spec: 'Formato 3:2.' },
    O03: { fam: 'Oficio', desc: 'Pesaje de verificación con la pantalla de la báscula legible.', spec: 'Formato 3:2.' },
    O04: { fam: 'Oficio', desc: 'Pacas en estiba en la bodega.', spec: 'Formato 3:2.' },
    O05: { fam: 'Oficio', desc: 'Cargue del camión en el muelle y camión saliendo por la vía a Turbaco.', spec: 'Formato 3:2.' },
    O06: { fam: 'Oficio', desc: 'Retrato grupal del equipo en alta resolución.', spec: 'Formatos 3:2 y 4:5.' },
    O07: { fam: 'Oficio', desc: 'Fachada de la planta en Europark, con luz de mañana.', spec: 'Formato 3:2.' },
  };
  var PICTO_FAMILIA = { Ficha: 'p-bolsa', Materia: 'p-cuchara', Oficio: 'p-planta', Clientes: 'p-tienda' };
  function htmlToma(cod, proporcion, desc, extra) {
    var t = TOMAS[cod];
    var d = desc || t.desc;
    proporcion = proporcion || '4 / 5';
    return '<figure class="toma' + (proporcion === '4 / 5' ? ' toma--vertical' : '') + '" style="--proporcion:' + proporcion + '">' +
      '<span class="toma-cuadro" aria-hidden="true">' + icono(PICTO_FAMILIA[t.fam], 'toma-picto') + '<span class="toma-codigo">' + cod + '</span><span class="toma-estado">Toma por producir</span>' + (extra || '') + '</span>' +
      '<figcaption class="toma-pie"><span class="sr">Foto por producir, toma ' + cod + ': </span>' + esc(d) + ' <span aria-hidden="true">Familia ' + t.fam + '. ' + t.spec + '</span></figcaption></figure>';
  }
  // Máximo un marco por sección: las demás tomas pendientes se nombran en una línea de texto
  function tomaExtra(cod) {
    var t = TOMAS[cod];
    return '<p class="toma-extra">También por producir, toma ' + cod + ': ' + esc(t.desc.charAt(0).toLowerCase() + t.desc.slice(1)) + '</p>';
  }

  // Packshots recortados (fondo transparente, sin margen) para apoyarlos sobre la línea base con sombra de contacto
  var RECORTE = {
    'becerrita-entera-380g': [237, 346], 'becerrita-entera-900g': [236, 360], 'becerrita-mezcla-bulto-25kg': [314, 454],
    'cantaro-azucarada-380g': [262, 360], 'cantaro-azucarada-900g-380g': [390, 266], 'cantaro-entera-500g': [254, 360],
    'cantaro-entera-800g': [236, 350], 'cantaro-entera-bulto-25kg': [262, 457], 'cantaro-mezcla-900g': [256, 360],
    'cantaro-mezcla-bulto-12-5kg': [314, 439],
  };
  function recorte(archivo) {
    var k = String(archivo).replace(/\.webp$/, '');
    var d = RECORTE[k] || [400, 400];
    return { src: RECORTE[k] ? 'img/r-' + k + '.webp' : 'img/' + archivo, w: d[0], h: d[1] };
  }
  function imagenDe(p, pr) {
    var r;
    if (pr && pr.imagen) { r = recorte(pr.imagen); r.propia = true; r.de = pr.contenido; return r; }
    if (p.imagen) {
      var de = p.presentaciones.filter(function (x) { return x.imagen === p.imagen; })[0];
      r = recorte(p.imagen); r.propia = !pr || de === pr; r.de = de ? de.contenido : null; return r;
    }
    return null;
  }
  function altDe(p, img) {
    return p.imagen_alt + (img.de ? ', presentación de ' + img.de : '');
  }

  /* =========================================================
     WhatsApp
     ========================================================= */
  var MSJ_GENERAL = 'Hola, quiero cotizar leche en polvo para mi negocio. Mi ciudad es: ';
  var waHref = function (txt) { return 'https://wa.me/' + E.whatsapp + '?text=' + encodeURIComponent(txt); };
  function waEnlace(txt, etiqueta, clase) {
    return '<a class="' + (clase || 'enlace-wa enlace') + '" href="' + waHref(txt) + '" target="_blank" rel="noopener">' + icono('i-whatsapp') +
      '<span>' + etiqueta + ' ' + TEL_VISIBLE + '</span><span class="sr"> (abre WhatsApp)</span></a>';
  }
  var msjFicha = function (r) { return 'Hola, quiero información de ' + nombreRef(r) + '. Mi ciudad es: '; };
  function msjCot(lineas, extra) {
    var partes = lineas.map(function (l) {
      var r = REF[l.id]; var kg = kgUnidad(r.pr);
      return nombreRef(r) + ', ' + l.cant + ' ' + unidad(r.pr, l.cant) + (kg != null ? ' (' + fmtNum(kg * l.cant, 1) + ' kg)' : '');
    });
    var t = 'Hola, quiero cotizar: ' + (partes.length ? partes.join('; ') : 'leche en polvo para mi negocio') + '.';
    if (extra && extra.otros) t += ' También necesito: ' + extra.otros + '.';
    t += ' Ciudad: ' + (extra && extra.ciudad ? extra.ciudad : '') + '.';
    if (extra && extra.negocio) t += ' Negocio: ' + extra.negocio.toLowerCase() + '.';
    return t;
  }

  /* =========================================================
     Mi cotización (localStorage solo para esta lista, siempre en try/catch)
     ========================================================= */
  var CLAVE = 'mundi.cotizacion.v1';
  var cot = { lineas: [], ultima: null };
  var almacenBloqueado = false;
  var pend = {}; // cantidades elegidas antes de agregar
  function limpiarLineas(ls) {
    return (Array.isArray(ls) ? ls : []).filter(function (l) { return l && REF[l.id]; })
      .map(function (l) { return { id: l.id, cant: Math.max(1, Math.min(9999, parseInt(l.cant, 10) || 1)) }; });
  }
  function leerCot() {
    try {
      var raw = window.localStorage.getItem(CLAVE);
      if (raw) {
        var o = JSON.parse(raw);
        cot.lineas = limpiarLineas(o.lineas);
        cot.ultima = o.ultima && Array.isArray(o.ultima.lineas) && o.ultima.lineas.length ? { fecha: String(o.ultima.fecha || ''), lineas: limpiarLineas(o.ultima.lineas) } : null;
      }
    } catch (e) { almacenBloqueado = true; }
  }
  function guardarCot() {
    try { window.localStorage.setItem(CLAVE, JSON.stringify(cot)); almacenBloqueado = false; } catch (e) { almacenBloqueado = true; }
  }
  var linea = function (id) { return cot.lineas.filter(function (l) { return l.id === id; })[0]; };
  function totales(lineas) {
    var t = { refs: lineas.length, bolsas: 0, pacas: 0, bultos: 0, kg: 0 };
    lineas.forEach(function (l) {
      var r = REF[l.id]; if (!r) return;
      if (esBulto(r.pr)) { t.bultos += l.cant; t.kg += l.cant * r.pr.gramos / 1000; }
      else { t.pacas += l.cant; if (r.pr.unidades_por_paca) { t.bolsas += l.cant * r.pr.unidades_por_paca; t.kg += l.cant * r.pr.unidades_por_paca * r.pr.gramos / 1000; } }
    });
    return t;
  }
  function textoTotales(t) {
    var partes = [];
    if (t.pacas) partes.push(fmtNum(t.bolsas, 0) + ' ' + plural(t.bolsas, 'bolsa', 'bolsas') + ' en ' + t.pacas + ' ' + plural(t.pacas, 'paca', 'pacas'));
    if (t.bultos) partes.push(t.bultos + ' ' + plural(t.bultos, 'bulto', 'bultos'));
    return lista(partes);
  }
  var textoRefs = function (n) { return n + ' ' + plural(n, 'referencia', 'referencias'); };
  function fijarLinea(id, cant, silencioso) {
    cant = Math.max(1, Math.min(9999, cant | 0));
    var l = linea(id);
    if (l) l.cant = cant; else cot.lineas.push({ id: id, cant: cant });
    delete pend[id];
    guardarCot();
    alCambiarCot({ estructura: !l, id: id, silencioso: silencioso });
  }
  function quitarLinea(id) {
    cot.lineas = cot.lineas.filter(function (l) { return l.id !== id; });
    guardarCot();
    alCambiarCot({ estructura: true, id: id });
  }
  function cantDe(id) { var l = linea(id); return l ? l.cant : (pend[id] || 1); }

  /* =========================================================
     Aviso (toast accesible)
     ========================================================= */
  var avisoT = null;
  function ocultarAviso() { clearTimeout(avisoT); $('#aviso').classList.remove('visible'); }
  function avisar(html, ms) {
    var a = $('#aviso');
    a.innerHTML = html;
    a.classList.add('visible');
    clearTimeout(avisoT);
    var ocultar = function () { if (!a.contains(document.activeElement)) a.classList.remove('visible'); else avisoT = setTimeout(ocultar, 2000); };
    avisoT = setTimeout(ocultar, ms || 5000);
  }

  /* =========================================================
     Componentes HTML
     ========================================================= */
  function migas(items) {
    return '<nav class="migas" aria-label="Migas de pan"><ol>' + items.map(function (it) {
      return '<li>' + (it[0] ? '<a href="' + it[0] + '">' + esc(it[1]) + '</a>' : '<span aria-current="page">' + esc(it[1]) + '</span>') + '</li>';
    }).join('') + '</ol></nav>';
  }
  function htmlCantidad(r, cant, ctx) {
    var u = esBulto(r.pr) ? 'bulto' : 'paca';
    var n = esc(nombreRef(r));
    return '<div class="cantidad">' +
      '<button type="button" data-menos aria-label="Un' + (u === 'paca' ? 'a paca' : ' bulto') + ' menos de ' + n + '">' + icono('i-menos') + '</button>' +
      '<input type="text" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" value="' + cant + '" data-cant aria-label="' + (u === 'paca' ? 'Pacas' : 'Bultos') + ' de ' + n + '"' + (ctx ? ' id="cant-' + ctx + '"' : '') + '>' +
      '<span class="cant-unidad" aria-hidden="true" data-unidad>' + unidad(r.pr, cant) + '</span>' +
      '<button type="button" data-mas aria-label="Un' + (u === 'paca' ? 'a paca' : ' bulto') + ' más de ' + n + '">' + icono('i-mas') + '</button></div>';
  }
  function calcTexto(r, cant, conPres) {
    var pr = r.pr, kg = kgUnidad(pr);
    if (esBulto(pr)) return '= ' + fmtKg(kg * cant);
    if (!pr.unidades_por_paca) return 'Unidades por paca: consultar';
    var b = cant * pr.unidades_por_paca;
    return '= ' + fmtNum(b, 0) + ' ' + plural(b, 'bolsa', 'bolsas') + (conPres ? ' de ' + fmtPres(pr.contenido) : '') + ', ' + fmtKg(kg * cant);
  }
  function htmlAccion(r, agregado) {
    var n = esc(nombreRef(r));
    return '<div class="accion">' +
      '<button type="button" class="boton" data-agregar' + (agregado ? ' hidden' : '') + '>Agregar<span class="sr"> ' + n + '</span></button>' +
      '<span class="estado-agregado"' + (agregado ? '' : ' hidden') + '>' + icono('i-check') + 'Agregado</span>' +
      '<button type="button" class="enlace-boton" data-quitar' + (agregado ? '' : ' hidden') + '>Quitar<span class="sr"> ' + n + '</span></button></div>';
  }

  /* =========================================================
     Búsqueda (tolerante a tildes, mayúsculas y sinónimos)
     ========================================================= */
  function compilarBusqueda(q) {
    var s = ' ' + norm(q) + ' ';
    s = s.replace(/(\d)\s*[,.]\s*(\d)/g, '$1.$2');
    s = s.replace(/(\d)\s*(kilogramos|kilos|kilo|kgs|kg|k)(?![a-z])/g, '$1 kg ');
    s = s.replace(/(\d)\s*(gramos|gramo|grs|gr|g)(?![a-z])/g, '$1 g ');
    s = s.replace(/\b(kilogramos|kilos|kilo|kgs)\b/g, 'kg').replace(/\b(gramos|gramo|grs|gr)\b/g, 'g');
    s = s.replace(/\b(sacos?|costal|costales|bultos)\b/g, 'bulto').replace(/\b(fardos?|pacas)\b/g, 'paca');
    s = s.replace(/\b(azucar|dulce|endulzada|azucaradas)\b/g, 'azucarada').replace(/\bleches\b/g, 'leche').replace(/\bbolsas\b/g, 'bolsa');
    var partes = s.trim().split(/\s+/).filter(Boolean);
    var textos = [], numeros = [];
    var vacias = ['de', 'la', 'el', 'en', 'x', 'por', 'y', 'con'];
    for (var i = 0; i < partes.length; i++) {
      var t = partes[i];
      if (/^\d+(\.\d+)?$/.test(t) && t.length < 6) {
        var n = parseFloat(t), u = null;
        if (partes[i + 1] === 'kg' || partes[i + 1] === 'g') { u = partes[i + 1]; i++; }
        numeros.push(u === 'kg' ? { g: n * 1000 } : u === 'g' ? { g: n } : { n: n });
      } else if (t === 'g' || t === 'kg' || vacias.indexOf(t) !== -1) {
        /* se ignora */
      } else textos.push(t);
    }
    return { textos: textos, numeros: numeros, vacia: !textos.length && !numeros.length };
  }
  function coincideNumero(g, x) {
    if (x.g != null) return Math.abs(g - x.g) < 0.5;
    return Math.abs(g - x.n) < 0.5 || Math.abs(g - x.n * 1000) < 0.5;
  }
  function coincideBusqueda(r, b) {
    if (b.vacia) return true;
    for (var i = 0; i < b.textos.length; i++) if (r.idx.indexOf(b.textos[i]) === -1) return false;
    for (var j = 0; j < b.numeros.length; j++) if (!coincideNumero(r.pr.gramos, b.numeros[j])) return false;
    return true;
  }
  var tokenQ = function (q) { return norm(q).trim().replace(/,/g, '.').replace(/\s+/g, '_').replace(/[^a-z0-9._-]/g, ''); };

  /* =========================================================
     Productos: estado de filtros en el hash
     ========================================================= */
  var FACETAS = [
    { k: 'marca', titulo: 'Marca', tipo: 'lista', de: function (r) { return [r.p.marca]; },
      opciones: function () { return C.marcas.filter(function (m) { return m.id !== 'marca-propia'; }).map(function (m) { return { v: m.id, t: m.nombre }; }); } },
    { k: 'tipo', titulo: 'Tipo', tipo: 'lista', de: function (r) { return [TIPO_DE_CAT[r.p.categoria]]; },
      opciones: function () { return TIPOS.map(function (t) { return { v: t.id, t: CAT[t.cat].nombre }; }); } },
    { k: 'formato', titulo: 'Formato', tipo: 'chips', de: function (r) { return [r.pr.formato]; },
      opciones: function () { return [{ v: 'bolsa', t: 'Bolsa', picto: 'p-bolsa' }, { v: 'bulto', t: 'Bulto', picto: 'p-bulto' }]; } },
    { k: 'peso', titulo: 'Peso', tipo: 'chips', de: function (r) { return [presSlug(r.pr.contenido)]; },
      opciones: function () { return PESOS.map(function (c) { return { v: presSlug(c), t: fmtPres(c) }; }); } },
    { k: 'uso', titulo: 'Uso', tipo: 'lista', de: function (r) { return r.p.usos; },
      opciones: function () { return C.usos.map(function (u) { return { v: u.id, t: u.nombre }; }); } },
  ];
  var FACETA = {}; FACETAS.forEach(function (f) { FACETA[f.k] = f; });
  var estadoCat = null;
  function estadoVacio() { return { marca: [], tipo: [], formato: [], peso: [], uso: [], q: '', orden: 'peso' }; }
  function estadoDeTokens(tokens) {
    var e = estadoVacio();
    tokens.forEach(function (t) {
      var m = t.match(/^(marca|tipo|formato|peso|uso|q|orden)-(.+)$/);
      if (!m) return;
      if (m[1] === 'q') e.q = m[2].replace(/_/g, ' ');
      else if (m[1] === 'orden') e.orden = m[2] === 'marca' ? 'marca' : 'peso';
      else {
        var validas = FACETA[m[1]].opciones().map(function (o) { return o.v; });
        if (validas.indexOf(m[2]) !== -1 && e[m[1]].indexOf(m[2]) === -1) e[m[1]].push(m[2]);
      }
    });
    return e;
  }
  function hashDeEstado(e) {
    var t = ['productos'];
    FACETAS.forEach(function (f) { e[f.k].forEach(function (v) { t.push(f.k + '-' + v); }); });
    if (e.q.trim() && tokenQ(e.q)) t.push('q-' + tokenQ(e.q));
    if (e.orden === 'marca') t.push('orden-marca');
    return '#' + t.join('~');
  }
  function coincide(r, e, excepto) {
    for (var i = 0; i < FACETAS.length; i++) {
      var f = FACETAS[i];
      if (f.k === excepto || !e[f.k].length) continue;
      var vals = f.de(r), ok = false;
      for (var j = 0; j < vals.length; j++) if (e[f.k].indexOf(vals[j]) !== -1) { ok = true; break; }
      if (!ok) return false;
    }
    return true;
  }
  var nFiltros = function (e) { return FACETAS.reduce(function (n, f) { return n + e[f.k].length; }, 0); };

  function resultados(e) {
    var b = compilarBusqueda(e.q);
    return REFS.filter(function (r) { return coincide(r, e) && coincideBusqueda(r, b); });
  }
  function nuevosVisibles(e) {
    if (e.formato.length || e.peso.length) return [];
    var b = compilarBusqueda(e.q);
    if (b.numeros.length) return [];
    return C.productos.filter(function (p) {
      if (p.presentaciones.length) return false;
      if (e.marca.length && e.marca.indexOf(p.marca) === -1) return false;
      if (e.tipo.length && e.tipo.indexOf(TIPO_DE_CAT[p.categoria]) === -1) return false;
      if (e.uso.length && !p.usos.some(function (u) { return e.uso.indexOf(u) !== -1; })) return false;
      var idx = norm([p.nombre, p.denominacion, CAT[p.categoria].nombre, p.registro].join(' '));
      return b.textos.every(function (t) { return idx.indexOf(t) !== -1; });
    });
  }

  function vistaProductos(tokens) {
    estadoCat = estadoDeTokens(tokens);
    var e = estadoCat;
    var html = '<div class="envoltura">' + migas([['#inicio', 'Inicio'], [null, 'Productos']]) +
      '<div class="pagina-cab pagina-cab--productos"><div><h1>Productos</h1><p class="entradilla">Leche en polvo y mezclas lácteas, en bolsa y bulto. El precio por volumen llega con la cotización.</p></div>' +
      '<div class="buscador buscador--pagina"><label for="busca-productos">Buscar productos</label><div class="buscador-campo">' + icono('i-buscar', 'icono buscador-icono') +
      '<input id="busca-productos" type="search" placeholder="Marca, gramos o código" autocomplete="off" spellcheck="false" value="' + esc(e.q) + '"></div></div></div>' +
      '<div class="catalogo">' +
      '<div class="filtros" id="filtros" role="group" aria-labelledby="t-filtros">' +
      '<div class="filtros-cab"><h2 id="t-filtros">Filtrar</h2><button type="button" class="boton-menu" data-cerrar-filtros>' + icono('i-cerrar') + 'Cerrar</button></div>' +
      '<div class="filtros-cuerpo">' + htmlFiltros(e) + '</div>' +
      '<div class="filtros-pie"><button type="button" class="enlace-boton" data-quitar-filtros>Quitar filtros</button><button type="button" class="boton" data-cerrar-filtros data-ver-n></button></div>' +
      '</div>' +
      '<section class="planilla" aria-labelledby="conteo-res">' +
      '<div class="planilla-barra"><button type="button" class="boton boton-sec boton-filtrar" data-abrir-filtros aria-expanded="false" aria-controls="filtros">Filtrar<span data-n-filtros></span></button>' +
      '<p class="conteo-res" id="conteo-res" aria-live="polite"></p>' +
      '<div class="orden"><label for="orden">Ordenar</label><select id="orden"><option value="peso"' + (e.orden === 'peso' ? ' selected' : '') + '>Peso, de menor a mayor</option><option value="marca"' + (e.orden === 'marca' ? ' selected' : '') + '>Marca</option></select></div></div>' +
      '<div class="aplicados" id="aplicados"></div>' +
      '<div class="resultados" id="resultados"></div>' +
      '<div class="fila-marca-propia zona-negocio"><p><strong>Su marca:</strong> empacamos con la de su cadena en 12 presentaciones, de 27' + NB + 'g a 25' + NB + 'kg. Las de 27, 104, 200, 750 y 1000' + NB + 'g hoy son solo para marca propia.</p><a class="enlace" href="#marca-propia">Ver marca propia</a></div>' +
      htmlConviene() +
      '</section>' +
      '<aside class="cot-columna" aria-label="Mi cotización" data-cotizacion="columna"></aside>' +
      '</div></div>';
    montar(html);
    renderCotizaciones();
    actualizarProductos(false);
  }

  function htmlFiltros(e) {
    return FACETAS.map(function (f) {
      var ops = f.opciones().map(function (o) {
        var id = 'f-' + f.k + '-' + o.v.replace(/[^a-z0-9-]/g, '');
        var ch = e[f.k].indexOf(o.v) !== -1 ? ' checked' : '';
        if (f.tipo === 'chips') {
          return '<label class="chip" for="' + id + '"><input type="checkbox" id="' + id + '" data-faceta="' + f.k + '" value="' + o.v + '"' + ch + '>' +
            '<span class="chip-cara">' + (o.picto ? icono(o.picto) : '') + '<span>' + o.t + '</span> <span class="n" data-n></span></span></label>';
        }
        return '<label class="opcion-lista" for="' + id + '"><input type="checkbox" id="' + id + '" data-faceta="' + f.k + '" value="' + o.v + '"' + ch + '>' +
          '<span>' + esc(o.t) + ' <span class="n" data-n></span></span></label>';
      }).join('');
      var nota = f.k === 'peso' ? '<p class="filtros-nota">27, 104, 200, 750 y 1000' + NB + 'g: solo para marca propia.</p>' : '';
      return '<fieldset class="grupo-filtro"><legend>' + f.titulo + '</legend>' + (f.tipo === 'chips' ? '<div class="chips">' + ops + '</div>' : ops) + nota + '</fieldset>';
    }).join('');
  }

  function htmlConviene() {
    return '<section class="conviene" aria-labelledby="t-conviene"><h2 id="t-conviene">Qué presentación le conviene</h2>' +
      '<div class="tabla-desliza" tabindex="0" role="region" aria-label="Tabla comparativa de presentaciones, se desliza de lado"><table class="tabla tabla-conviene"><caption class="sr">Comparación de presentaciones por tipo de comprador</caption>' +
      '<thead><tr><th scope="col"><span class="sr">Dato</span></th><th scope="col">Hogar</th><th scope="col">Tienda o reventa</th><th scope="col">Panadería o industria</th><th scope="col">Marca propia</th></tr></thead><tbody>' +
      '<tr><th scope="row">Presentaciones</th><td>Bolsas de 380 a 900' + NB + 'g</td><td>Pacas de bolsas de 380 a 900' + NB + 'g</td><td>Bultos de 5, 12,5 y 25' + NB + 'kg</td><td>12 presentaciones, de 27' + NB + 'g a 25' + NB + 'kg</td></tr>' +
      '<tr><th scope="row">Unidad de venta</th><td>Bolsa</td><td>Paca de 12 a 30 bolsas</td><td>Bulto</td><td>Pedido por referencia ' + aconf() + '</td></tr>' +
      '<tr><th scope="row">Rinde, en leche</th><td>6,7' + NB + 'L por bolsa de 900' + NB + 'g</td><td>80' + NB + 'L por paca de 900' + NB + 'g</td><td>185' + NB + 'L por bulto de 25' + NB + 'kg</td><td>Según la presentación</td></tr>' +
      '<tr><th scope="row">Dónde</th><td><a href="#donde-comprar">Supermercados y Rappi</a></td><td><a href="#cotizar">Cotización</a></td><td><a href="#cotizar">Cotización</a></td><td><a href="#marca-propia">Marca propia</a></td></tr>' +
      '</tbody></table></div><p class="meta">Rinde calculado con 135' + NB + 'g por litro, la dosis de la ficha técnica.</p></section>';
  }

  function actualizarProductos(desdeUsuario) {
    var e = estadoCat;
    // Conteos por opción (lo que queda si se elige esa opción)
    var b = compilarBusqueda(e.q);
    FACETAS.forEach(function (f) {
      var base = REFS.filter(function (r) { return coincide(r, e, f.k) && coincideBusqueda(r, b); });
      f.opciones().forEach(function (o) {
        var inp = document.getElementById('f-' + f.k + '-' + o.v.replace(/[^a-z0-9-]/g, ''));
        if (!inp) return;
        var n = base.filter(function (r) { return f.de(r).indexOf(o.v) !== -1; }).length;
        inp.checked = e[f.k].indexOf(o.v) !== -1;
        inp.disabled = !n && !inp.checked;
        var sp = inp.parentNode.querySelector('[data-n]');
        if (sp) sp.textContent = '(' + n + ')';
      });
    });
    var res = resultados(e);
    var prods = [];
    res.forEach(function (r) { if (prods.indexOf(r.p) === -1) prods.push(r.p); });
    if (e.orden === 'marca') prods.sort(function (a, c) { return MARCA[a.marca].nombre.localeCompare(MARCA[c.marca].nombre) || minG(a, res) - minG(c, res); });
    else prods.sort(function (a, c) { return minG(a, res) - minG(c, res) || a._i - c._i; });
    var nuevos = nuevosVisibles(e);

    var conteo = res.length ? textoRefs(res.length) + ' de ' + prods.length + ' ' + plural(prods.length, 'producto', 'productos') : 'Sin referencias';
    $('#conteo-res').textContent = conteo;
    var nf = nFiltros(e);
    var nfEl = $('[data-n-filtros]'); if (nfEl) nfEl.textContent = nf ? ' (' + nf + ')' : '';
    var vn = $('[data-ver-n]'); if (vn) vn.textContent = res.length ? 'Ver ' + textoRefs(res.length) : 'Ver resultados';

    // Chips de filtros aplicados
    var ap = [];
    FACETAS.forEach(function (f) {
      e[f.k].forEach(function (v) {
        var o = f.opciones().filter(function (x) { return x.v === v; })[0];
        ap.push('<button type="button" class="chip-quitar" data-quitar-filtro="' + f.k + '|' + v + '" aria-label="' + esc(o.t.replace(NB, ' ')) + ', quitar filtro">' + esc(o.t) + icono('i-cerrar') + '</button>');
      });
    });
    if (e.q.trim()) ap.push('<button type="button" class="chip-quitar" data-quitar-busqueda aria-label="Búsqueda «' + esc(e.q) + '», quitar">«' + esc(e.q) + '»' + icono('i-cerrar') + '</button>');
    if (ap.length) ap.push('<button type="button" class="enlace-boton" data-quitar-filtros>Quitar filtros</button>');
    $('#aplicados').innerHTML = ap.join('');

    var cont = $('#resultados');
    var html = '';
    if (!res.length) html += htmlSinResultados(e);
    html += prods.map(function (p) { return htmlBloqueProducto(p, res.filter(function (r) { return r.p === p; }).sort(porPeso)); }).join('');
    if (nuevos.length) {
      html += '<section class="nuevos" aria-labelledby="t-nuevos"><h2 id="t-nuevos">Con registro sanitario nuevo</h2><p>Registros vigentes desde 2025. Marca, composición y presentaciones por confirmar.</p><ul>' +
        nuevos.map(function (p) { return '<li><a href="#producto-' + p.slug + '">' + esc(p.denominacion) + '</a><span class="meta">Registro Invima ' + p.registro + ' ' + aconf('presentaciones: dato a confirmar') + '</span></li>'; }).join('') + '</ul></section>';
    }
    cont.innerHTML = html;
    if (desdeUsuario && !reducido()) { cont.classList.remove('cambia'); void cont.offsetWidth; cont.classList.add('cambia'); }
  }
  function minG(p, res) { return Math.min.apply(null, res.filter(function (r) { return r.p === p; }).map(function (r) { return r.pr.gramos; })); }

  function htmlBloqueProducto(p, refs) {
    var img = imagenDe(p, null);
    var foto = img ? '<img src="' + img.src + '" alt="' + esc(altDe(p, img)) + '" width="' + img.w + '" height="' + img.h + '" loading="lazy" decoding="async" data-vt="' + p.slug + '">'
      : '<span class="toma"><span class="toma-cuadro" role="img" aria-label="Foto por producir, toma F01 de ' + esc(p.nombre) + '">' + icono('p-bolsa', 'toma-picto') + '</span></span>';
    var id = 'p-' + p.slug;
    return '<article class="producto" aria-labelledby="' + id + '">' +
      '<div class="producto-cab"><a class="producto-foto" href="#producto-' + p.slug + '" tabindex="-1" aria-hidden="true">' + foto + '</a><div>' +
      '<p class="producto-marca">' + esc(MARCA[p.marca].nombre) + '</p>' +
      '<h2 id="' + id + '"><a href="#producto-' + p.slug + '">' + esc(p.nombre) + '</a></h2>' +
      '<p class="producto-denominacion">' + esc(p.denominacion) + '</p>' +
      '<p class="meta producto-registro">Registro Invima ' + p.registro + '</p></div></div>' +
      '<table class="tabla-pres"><caption class="sr">Presentaciones de ' + esc(p.nombre) + '. Unidades por paca publicadas por gramaje, dato a confirmar por referencia. Rinde por bolsa o por bulto con 135 g por litro.</caption>' +
      '<thead><tr><th scope="col">Presentación</th><th scope="col" class="num">Paca</th><th scope="col" class="num">Peso de paca o bulto</th><th scope="col" class="num">Rinde aprox.</th><th scope="col">Cantidad</th><th scope="col"><span class="sr">Acción</span></th></tr></thead><tbody>' +
      refs.map(htmlFilaPres).join('') + '</tbody></table>' +
      '<p class="producto-pie"><a class="enlace" href="#producto-' + p.slug + '">Ver ficha técnica<span class="sr"> de ' + esc(p.nombre) + '</span></a></p></article>';
  }
  function htmlFilaPres(r) {
    var p = r.p, pr = r.pr, l = linea(r.id), cant = cantDe(r.id), bulto = esBulto(pr);
    var kg = kgUnidad(pr), ren = rinde(p, pr);
    return '<tr class="' + (bulto ? 'es-bulto' : 'es-bolsa') + '" data-ref="' + r.id + '" data-modo="fila">' +
      '<th scope="row"><a href="#producto-' + p.slug + '~' + presSlug(pr.contenido) + '">' + fmtPres(pr.contenido) + '<span class="sr"> de ' + esc(p.nombre) + '</span></a>' + (pr.estado !== 'confirmado' ? ' ' + aconf() : '') + '</th>' +
      '<td class="num" data-etiqueta="Paca">' + (bulto ? 'Bulto' : (pr.unidades_por_paca ? pr.unidades_por_paca + NB + 'u.' : 'Consultar')) + '</td>' +
      '<td class="num" data-etiqueta="' + (bulto ? 'Peso del bulto' : 'Peso de paca') + '">' + (kg != null ? fmtKg(kg) : 'Consultar') + '</td>' +
      '<td class="num" data-etiqueta="Rinde aprox.">' + (ren != null ? fmtL(ren) : aconf()) + '</td>' +
      '<td class="celda-cant" data-etiqueta="Cantidad">' + htmlCantidad(r, cant) + '<p class="calc-linea" data-calc>' + calcTexto(r, cant) + '</p></td>' +
      '<td class="celda-accion">' + htmlAccion(r, !!l) + '</td></tr>';
  }

  function htmlSinResultados(e) {
    var b = compilarBusqueda(e.q);
    var out = '<div class="sin-resultados" role="status">';
    if (e.q.trim() && !nFiltros(e)) {
      out += '<p>No encontramos «' + esc(e.q) + '».</p>';
      if (b.numeros.length) {
        var x = b.numeros[0];
        var objetivo = x.g != null ? x.g : (x.n >= 27 && x.n <= 1000 ? x.n : x.n * 1000);
        var cand = REFS.filter(function (r) { return b.textos.every(function (t) { return r.idx.indexOf(t) !== -1; }); });
        if (!cand.length) cand = REFS.slice();
        cand.sort(function (a, c) { return Math.abs(Math.log(a.pr.gramos / objetivo)) - Math.abs(Math.log(c.pr.gramos / objetivo)); });
        var m = cand[0];
        out += '<p>La presentación más cercana es ' + fmtPres(m.pr.contenido) + '.</p><div class="acciones-linea"><a class="boton" href="#producto-' + m.p.slug + '~' + presSlug(m.pr.contenido) + '">Ver ' + esc(nombreRefNB(m)) + '</a>';
      } else {
        out += '<p>Pruebe con la marca, los gramos o el código de barras.</p><div class="acciones-linea">';
      }
      out += '<button type="button" class="enlace-boton" data-quitar-busqueda>Quitar búsqueda</button>' + waEnlace('Hola, busco ' + e.q + '. Mi ciudad es: ', 'Preguntar por WhatsApp al') + '</div></div>';
      return out;
    }
    // Filtros sin resultado: se propone la alternativa real
    var orden = ['peso', 'formato', 'uso', 'tipo', 'marca'];
    var prop = null;
    for (var i = 0; i < orden.length; i++) {
      var k = orden[i];
      if (!e[k].length) continue;
      var alt = REFS.filter(function (r) { return coincide(r, e, k) && coincideBusqueda(r, b); }).sort(porPeso);
      if (alt.length) { prop = { k: k, alt: alt }; break; }
    }
    out += '<p>' + describirSinResultados(e) + '</p>';
    if (prop) {
      var vals = [];
      prop.alt.forEach(function (r) { var v = FACETA[prop.k].de(r)[0]; if (vals.indexOf(v) === -1) vals.push(v); });
      var textoVals = vals.map(function (v) { return FACETA[prop.k].opciones().filter(function (o) { return o.v === v; })[0].t; });
      var nuevo = JSON.parse(JSON.stringify(e)); nuevo[prop.k] = [vals[0]];
      var etiqueta = prop.k === 'peso' ? 'Sí hay en ' + lista(textoVals, 'y') + '.' : 'Sin el filtro de ' + FACETA[prop.k].titulo.toLowerCase() + ' hay ' + textoRefs(prop.alt.length) + '.';
      var r0 = prop.alt[0];
      var btn = prop.k === 'peso' || prop.k === 'formato' ? 'Ver ' + (e.marca.length === 1 ? MARCA[e.marca[0]].nombre + ' ' : '') + textoVals[0] : 'Ver ' + textoRefs(resultados(nuevo).length);
      if (!resultados(nuevo).length) { nuevo = JSON.parse(JSON.stringify(e)); nuevo[prop.k] = []; btn = 'Ver ' + textoRefs(prop.alt.length); }
      void r0;
      out += '<p>' + etiqueta + '</p><div class="acciones-linea"><a class="boton" href="' + hashDeEstado(nuevo) + '">' + btn + '</a>';
    } else out += '<div class="acciones-linea">';
    out += '<button type="button" class="enlace-boton" data-quitar-filtros>Quitar filtros</button></div></div>';
    return out;
  }
  function describirSinResultados(e) {
    var t = (e.marca.length ? e.marca.map(function (v) { return MARCA[v].nombre; }).join(' ni ') : 'referencias');
    if (e.tipo.length) t += ' de ' + e.tipo.map(function (v) { return CAT[CAT_DE_TIPO[v]].nombre.toLowerCase(); }).join(' o ');
    if (e.formato.length) t += ' en ' + e.formato.join(' o ');
    if (e.peso.length) t += ' de ' + e.peso.map(function (v) { return FACETA.peso.opciones().filter(function (o) { return o.v === v; })[0].t; }).join(' o ');
    if (e.uso.length) t += ' para ' + e.uso.map(function (v) { return USO[v].nombre.toLowerCase(); }).join(' o ');
    if (e.q.trim()) t += ' que coincidan con «' + esc(e.q) + '»';
    return 'No hay ' + t + '.';
  }
  function aplicarEstado(desdeUsuario) {
    try { history.replaceState(null, '', hashDeEstado(estadoCat)); } catch (err) { /* sin historial */ }
    ultimoHash = location.hash;
    actualizarProductos(desdeUsuario);
  }

  /* =========================================================
     Ficha de producto
     ========================================================= */
  var ficha = null; // { p, pr }
  function presDefecto(p) {
    var conFoto = p.presentaciones.filter(function (x) { return x.imagen === p.imagen && x.estado === 'confirmado'; })[0];
    return conFoto || p.presentaciones.filter(function (x) { return x.estado === 'confirmado'; })[0] || p.presentaciones[0] || null;
  }
  function figuraFicha(x, f) {
    if (x.imagen) {
      var r = recorte(x.imagen);
      return '<span class="fila-figura fila-figura--foto"><img src="' + r.src + '" alt="" width="' + r.w + '" height="' + r.h + '" decoding="async"></span>';
    }
    return '<span class="fila-figura fila-figura--silueta">' + silueta(x.formato, f.ancho, f.alto, false) + '</span>';
  }
  function vistaProducto(slug, tokens) {
    var p = PROD[slug];
    if (!p) return vista404();
    var pr = null;
    tokens.forEach(function (t) { p.presentaciones.forEach(function (x) { if (presSlug(x.contenido) === t) pr = x; }); });
    pr = pr || presDefecto(p);
    ficha = { p: p, pr: pr, foto: 'frente' };
    var marca = MARCA[p.marca].nombre;
    var reg = REG[p.registro];
    var selector = '';
    if (p.presentaciones.length) {
      selector = '<fieldset class="selector-pres"><legend>Presentación</legend><ul class="fila-lista">' + p.presentaciones.map(function (x, i) {
        var f = FILA_DE[x.contenido] || { alto: 20, ancho: 15, t: 0.5 };
        if (x.imagen) { var rr = recorte(x.imagen); f = { alto: f.alto, ancho: Math.round(f.alto * rr.w / rr.h), t: f.t }; }
        var id = 'pres-' + presSlug(x.contenido);
        return '<li class="fila-pieza" style="--alto-cm:' + f.alto + ';--ancho-cm:' + f.ancho + ';--t:' + f.t + ';--i:' + i + '">' +
          '<input type="radio" name="presentacion-ficha" id="' + id + '" value="' + presSlug(x.contenido) + '"' + (x === pr ? ' checked' : '') + '>' +
          '<label for="' + id + '">' + figuraFicha(x, f) +
          '<span class="fila-cifra">' + fmtPres(x.contenido) + (x.estado !== 'confirmado' ? '<span class="fila-ast" aria-hidden="true">*</span>' : '') + '</span>' +
          '<span class="sr">, ' + x.formato + (x.estado !== 'confirmado' ? ', presentación por confirmar' : '') + '</span></label></li>';
      }).join('') + '</ul></fieldset>';
      if (p.presentaciones.some(function (x) { return x.estado !== 'confirmado'; })) selector += '<p class="meta">* Presentación por confirmar con el cliente.</p>';
    } else {
      selector = '<p>Presentaciones ' + aconf() + '</p>';
    }
    var octo = p.sello_advertencia ? '<p class="sello-advertencia"><svg class="octogono" viewBox="0 0 36 36" aria-hidden="true"><path class="octogono-fondo" d="M11 1h14l10 10v14L25 35H11L1 25V11Z"/><path class="octogono-borde" d="M11.8 3h12.4L33 11.8v12.4L24.2 33H11.8L3 24.2V11.8Z" fill="none" stroke-width="1.2"/></svg><span>Sello frontal de advertencia: «' + esc(p.sello_advertencia.valor) + '» ' + (p.sello_advertencia.estado !== 'confirmado' ? aconf() : '') + '</span></p>' : '';
    var html = '<div class="envoltura">' + migas([['#inicio', 'Inicio'], ['#productos', 'Productos'], ['#productos~marca-' + p.marca, marca], [null, p.nombre]]) +
      '<div class="ficha">' +
      '<div class="ficha-galeria" data-dep="galeria"></div>' +
      '<div class="ficha-info">' +
      '<p class="ficha-marca">' + esc(marca) + (p.estado === 'por_confirmar' ? ' ' + aconf('marca por confirmar') : '') + '</p>' +
      '<h1>' + esc(p.denominacion) + '</h1>' +
      '<p class="ficha-nombre">Nombre comercial: ' + esc(p.nombre) + (p.nuevo ? ' ' + aconf('registro nuevo') : '') + '</p>' +
      '<p class="ficha-registro">Registro Invima ' + p.registro + (reg ? ', ' + reg.estado.toLowerCase() + ' hasta el ' + fechaLarga(reg.vence) : '') + '. <a href="' + C.calidad.verificar_registro_url + '" target="_blank" rel="noopener">Consultar<span class="sr"> el registro ' + p.registro + ' en el sitio del Invima (abre otro sitio)</span></a></p>' +
      octo + selector +
      '<div data-dep="venta"></div>' +
      '</div></div>' +
      '<div class="ficha-secciones" data-dep="secciones"></div>' +
      '</div>';
    montar(html);
    renderFichaDep();
    if (!reducido()) {
      var fi = $('.ficha');
      if (fi) { fi.classList.add('ficha--entra'); setTimeout(function () { fi.classList.remove('ficha--entra'); }, 900); }
    }
  }
  function renderFichaDep() {
    var p = ficha.p, pr = ficha.pr;
    var r = pr ? REF[p.slug + '_' + presSlug(pr.contenido)] : null;
    // Galería
    var img = imagenDe(p, pr);
    var fotos = [
      { k: 'frente', rot: 'Frente', cod: 'F01', foto: !!img, html: img ? '<span class="galeria-cifra" aria-hidden="true" style="--n:' + (pr ? pr.contenido.length : 4) + '">' + (pr ? fmtPres(pr.contenido) : '') + '</span><span class="galeria-sombra" aria-hidden="true"></span><img src="' + img.src + '" alt="' + esc(altDe(p, img)) + ', frente" width="' + img.w + '" height="' + img.h + '" data-vt="' + p.slug + '">' : htmlToma('F01', '4 / 5', 'Frente de ' + p.nombre + (pr ? ' ' + pr.contenido : '') + ' sobre fondo blanco, con regla física en el cuadro.') },
      { k: 'reverso', rot: 'Reverso', cod: 'F02', html: htmlToma('F02', '4 / 5') },
      { k: 'paca', rot: pr && esBulto(pr) ? 'Costura' : 'Paca', cod: pr && esBulto(pr) ? 'M04' : 'F03', html: pr && esBulto(pr) ? htmlToma('M04', '4 / 5') : htmlToma('F03', '4 / 5') },
      { k: 'uso', rot: 'En uso', cod: pr && esBulto(pr) ? (p.usos.indexOf('industria') !== -1 ? 'C05' : 'C01') : (p.categoria === 'mezcla-lactea' ? 'M02' : 'C04'), html: pr && esBulto(pr) ? htmlToma(p.usos.indexOf('industria') !== -1 ? 'C05' : 'C01', '4 / 5') : htmlToma(p.categoria === 'mezcla-lactea' ? 'M02' : 'C04', '4 / 5') },
    ];
    var actual = fotos.filter(function (f) { return f.k === ficha.foto; })[0] || fotos[0];
    var nota = img && !img.propia && actual.k === 'frente' ? '<p class="galeria-nota">Foto de referencia de la presentación de ' + fmtPres(img.de) + '. La toma F01 de ' + fmtPres(pr.contenido) + ' está por producir.</p>' : '';
    $('[data-dep="galeria"]').innerHTML = '<div class="galeria-principal' + (actual.foto ? ' galeria-principal--foto' : '') + '" aria-live="polite">' + actual.html + '</div>' + nota +
      '<ul class="miniaturas" aria-label="Fotos del producto">' + fotos.map(function (f) {
        var mini = f.k === 'frente' && img ? '<img src="' + img.src + '" alt="" width="' + img.w + '" height="' + img.h + '">' : '<span class="toma"><span class="toma-cuadro"><span class="toma-codigo">' + f.cod + '</span></span></span>';
        return '<li><button type="button" class="miniatura" data-foto="' + f.k + '" aria-pressed="' + (f.k === actual.k) + '" aria-label="Ver foto: ' + f.rot + '">' + mini + '</button><span class="miniatura-rotulo" aria-hidden="true">' + f.rot + '</span></li>';
      }).join('') + '</ul>';

    // Venta, cantidad y acciones
    var venta = '';
    if (r) {
      var bulto = esBulto(pr), kg = kgUnidad(pr), ren = rinde(p, pr), cant = cantDe(r.id), l = linea(r.id);
      var principal = bulto ? 'Bulto de ' + fmtPres(pr.contenido) : (pr.unidades_por_paca ? 'Paca de ' + pr.unidades_por_paca + ' bolsas, ' + fmtKg(kg) : 'Paca: consultar unidades');
      var sub = bulto ? 'Bolsa interna de polietileno y saco de papel kraft de triple capa.' : 'Bolsa de ' + fmtPres(pr.contenido) + ', laminada y termosellada.';
      venta = '<div class="venta' + (bulto ? ' es-bulto' : '') + '" aria-live="polite"><p class="venta-principal">' + principal + (bulto ? '' : ' ' + aconf()) + '</p>' +
        '<p>' + (ren != null ? 'Rinde cerca de ' + fmtL(ren) + ' por ' + (bulto ? 'bulto' : 'bolsa') + '.' : 'Rinde: ' + aconf('dosis de la mezcla: dato a confirmar')) + '</p>' +
        '<p class="meta">' + sub + (pr.estado !== 'confirmado' ? ' Presentación ' + aconf() : '') + '</p></div>' +
        '<div class="ficha-cantidad" data-ref="' + r.id + '" data-modo="ficha"><label for="cant-ficha">Cantidad</label>' + htmlCantidad(r, cant, 'ficha') +
        '<p class="calc-linea" data-calc aria-live="polite">' + calcTexto(r, cant, true) + '</p>' +
        '<div class="ficha-acciones"><button type="button" class="boton" data-agregar-ficha>' + (l ? 'Actualizar la cotización' : 'Agregar a la cotización') + '</button>' +
        waEnlace(msjFicha(r), 'Preguntar por WhatsApp al') + '</div>' +
        (l ? '<p class="meta" data-en-cot>En su cotización: ' + l.cant + ' ' + unidad(pr, l.cant) + '. <button type="button" class="enlace-boton" data-quitar>Quitar</button></p>' : '') + '</div>';
    } else {
      venta = '<div class="ficha-acciones">' + waEnlace('Hola, quiero información de ' + p.nombre + ' (' + p.denominacion + '). Mi ciudad es: ', 'Preguntar por WhatsApp al') + '</div>';
    }
    var donde = pr && pr.donde && pr.donde.length ? ' En línea: ' + pr.donde.map(function (d) { return '<a href="' + d.url + '" target="_blank" rel="noopener">' + esc(d.canal) + '<span class="sr"> (abre otro sitio)</span></a>'; }).join(', ') + '.' : '';
    venta += '<p class="ficha-consumidor">¿Es para su casa? <a href="#donde-comprar">Vea dónde comprar.</a>' + donde + '</p>';
    $('[data-dep="venta"]').innerHTML = venta;

    // Secciones (acordeones en móvil)
    $('[data-dep="secciones"]').innerHTML = htmlSeccionesFicha(p, pr, r);

    // Barra inferior móvil de la ficha
    var bf = $('#barra-ficha');
    if (r) {
      bf.innerHTML = '<div data-ref="' + r.id + '" data-modo="barra">' + htmlCantidad(r, cantDe(r.id)) + '</div><button type="button" class="boton" data-agregar-ficha>' + (linea(r.id) ? 'Actualizar' : 'Agregar') + '<span class="sr"> ' + esc(nombreRef(r)) + ' a la cotización</span></button>';
      bf.hidden = false; document.body.classList.add('con-barra-ficha');
    } else { bf.hidden = true; bf.innerHTML = ''; document.body.classList.remove('con-barra-ficha'); }

    document.title = (r ? nombreRef(r) : p.nombre) + ' | Mundilácteos';
    ldProducto(p, pr);
  }
  function htmlSeccionesFicha(p, pr, r) {
    var abiertas = esEscritorio();
    var cat = CAT[p.categoria], reg = REG[p.registro];
    var filas = [];
    filas.push(['Denominación', esc(p.denominacion) + ' <span class="meta">(como figura en el registro sanitario)</span>']);
    filas.push(['Categoría', esc(cat.nombre) + (cat.nota ? '<p class="nota-ficha">' + esc(cat.nota) + '</p>' : '')]);
    if (p.fortificacion) filas.push(['Fortificación', 'Adicionada con ' + esc(p.fortificacion.toLowerCase())]);
    filas.push(['Ingredientes', aconf()]);
    if (esLeche(p)) {
      filas.push(['Preparación', G_POR_L + NB + 'g de leche en polvo por litro de agua, según la ficha técnica publicada.']);
      var rindeTxt = pr ? 'Cerca de ' + fmtL(rinde(p, pr)) + ' por ' + (esBulto(pr) ? 'bulto' : 'bolsa') + ' de ' + fmtPres(pr.contenido) + '.' : '';
      var emp = pr && pr.rinde ? ' En el empaque de esta presentación: «' + esc(pr.rinde.replace(/\s·\s/g, ', ').replace(/\s*\(texto del empaque\)/, '')) + '».' : '';
      filas.push(['Rinde', rindeTxt + '<p class="nota-ficha"><strong>Nota:</strong> ' + esc(C.calidad.preparacion.incongruencia) + emp + ' La dosis de la ficha y la del empaque no coinciden: ' + aconf() + '</p>']);
    } else {
      filas.push(['Preparación', aconf()]);
      filas.push(['Rinde', aconf('según la dosis de la mezcla: dato a confirmar')]);
    }
    filas.push(['Vida útil', C.calidad.vida_util_meses + ' meses']);
    if (pr) filas.push(['Empaque', esc(esBulto(pr) ? C.calidad.empaque.bulto : C.calidad.empaque.bolsa)]);
    filas.push(['Almacenamiento', aconf()]);
    filas.push(['Alérgenos', 'Contiene leche.']);
    if (p.sello_advertencia) filas.push(['Sello de advertencia', '«' + esc(p.sello_advertencia.valor) + '» ' + aconf()]);
    filas.push(['Registro sanitario', 'Invima ' + p.registro + (reg ? '. ' + esc(reg.modalidad) + '. ' + reg.estado + ' hasta el ' + fechaLarga(reg.vence) + '.' : '') + ' <a href="' + C.calidad.verificar_registro_url + '" target="_blank" rel="noopener">Consultar en el Invima<span class="sr"> (abre otro sitio)</span></a>']);
    if (pr && pr.evidencia) filas.push(['Evidencia de la presentación', esc(pr.evidencia)]);
    var tecnica = '<table class="tabla tabla-ficha"><caption class="sr">Ficha técnica de ' + esc(p.nombre) + (pr ? ' ' + esc(pr.contenido) : '') + '</caption><tbody>' +
      filas.map(function (f) { return '<tr><th scope="row">' + f[0] + '</th><td>' + f[1] + '</td></tr>'; }).join('') + '</tbody></table>' +
      '<p class="seccion-pie meta">La ficha técnica en PDF se publica como copia de esta tabla cuando el cliente la entregue. <a href="#contacto">Solicitar ficha técnica</a></p>';

    var nut = ['Energía (kcal)', 'Grasa total (g)', 'Grasa saturada (g)', 'Grasas trans (mg)', 'Carbohidratos totales (g)', 'Azúcares totales (g)', 'Azúcares añadidos (g)', 'Proteína (g)', 'Sodio (mg)'];
    if (p.fortificacion === 'Hierro') nut.push('Hierro (mg)');
    var nutri = '<table class="tabla tabla-nutri"><caption class="meta" style="text-align:left;padding-bottom:8px">Valores del laboratorio del cliente ' + aconf() + '</caption>' +
      '<thead><tr><th scope="col">Nutriente</th><th scope="col" class="num">Por 100' + NB + 'g</th><th scope="col" class="num">Por porción</th></tr></thead><tbody>' +
      nut.map(function (n) { return '<tr><th scope="row">' + n + '</th><td class="num"><span aria-hidden="true">—</span><span class="sr">por confirmar</span></td><td class="num"><span aria-hidden="true">—</span><span class="sr">por confirmar</span></td></tr>'; }).join('') +
      '</tbody></table>';

    var log = [];
    if (pr) {
      if (esBulto(pr)) {
        log.push(['Peso neto del bulto', fmtKg(pr.gramos / 1000)]);
        log.push(['Bultos por estiba', aconf()]);
      } else {
        log.push(['Unidades por paca', (pr.unidades_por_paca || '') + ' bolsas ' + aconf('publicado por gramaje: dato a confirmar')]);
        log.push(['Peso de la paca', kgUnidad(pr) != null ? fmtKg(kgUnidad(pr)) : aconf()]);
        log.push(['Medidas de la caja', '49 × 22 × 34' + NB + 'cm ' + aconf()]);
        log.push(['Pacas por estiba', aconf()]);
      }
      log.push(['Código de barras (EAN)', pr.ean ? '<span class="cifra">' + pr.ean + '</span>' : aconf()]);
    }
    var logistica = pr ? '<table class="tabla tabla-ficha"><caption class="sr">Empaque y datos logísticos</caption><tbody>' + log.map(function (f) { return '<tr><th scope="row">' + f[0] + '</th><td>' + f[1] + '</td></tr>'; }).join('') + '</tbody></table>' : '<p>Presentaciones ' + aconf() + '</p>';

    var otras = p.presentaciones.filter(function (x) { return x !== pr; });
    var similares = C.productos.filter(function (x) { return x !== p && x.presentaciones.length && x.usos.some(function (u) { return p.usos.indexOf(u) !== -1; }); })
      .sort(function (a, b) { return (b.categoria === p.categoria) - (a.categoria === p.categoria); }).slice(0, 4);
    var relac = '<div class="relacionados">' +
      (otras.length ? '<div><h3>Otras presentaciones de este producto</h3><ul class="lista-pres">' + otras.map(function (x) { return '<li><a href="#producto-' + p.slug + '~' + presSlug(x.contenido) + '">' + fmtPres(x.contenido) + '<span class="sr"> de ' + esc(p.nombre) + '</span></a></li>'; }).join('') + '</ul></div>' : '') +
      '<div><h3>Productos de uso similar</h3><ul class="lista-texto">' + similares.map(function (x) { return '<li><a href="#producto-' + x.slug + '">' + esc(x.nombre) + '</a></li>'; }).join('') + '</ul></div></div>';

    var acc = function (id, titulo, cuerpo) {
      var cab = abiertas ? '<h2 id="h-' + id + '" class="ficha-seccion-titulo">' + titulo + '</h2>'
        : '<h2 id="h-' + id + '"><button type="button" class="acordeon-boton" aria-expanded="false" aria-controls="c-' + id + '">' + titulo + icono('i-mas') + '</button></h2>';
      return '<section class="ficha-seccion" aria-labelledby="h-' + id + '">' + cab +
        '<div class="acordeon-cuerpo" id="c-' + id + '"' + (abiertas ? '' : ' hidden') + '>' + cuerpo + '</div></section>';
    };
    return acc('tecnica', 'Ficha técnica', tecnica) + acc('nutricional', 'Información nutricional', nutri) + acc('logistica', 'Empaque y datos logísticos', logistica) +
      '<section class="ficha-seccion" aria-labelledby="h-relacionados"><h2 id="h-relacionados" class="sr">Relacionados</h2>' + relac + '</section>';
  }
  function ldProducto(p, pr) {
    var s = document.getElementById('ld-producto');
    if (!s) { s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'ld-producto'; document.body.appendChild(s); }
    var o = { '@context': 'https://schema.org', '@type': 'Product', name: p.nombre + (pr ? ' ' + pr.contenido : ''), description: p.denominacion, brand: { '@type': 'Brand', name: MARCA[p.marca].nombre } };
    if (pr && pr.ean) o.gtin13 = pr.ean;
    if (pr) o.size = pr.contenido;
    s.textContent = JSON.stringify(o);
  }
  function ldOrganizacion() {
    var s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'ld-organizacion';
    s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: E.nombre, legalName: E.razon_social, taxID: E.nit, telephone: E.telefono,
      address: { '@type': 'PostalAddress', streetAddress: E.direccion, addressLocality: 'Turbaco', addressRegion: 'Bolívar', addressCountry: 'CO' },
      brand: [{ '@type': 'Brand', name: 'The Cántaro' }, { '@type': 'Brand', name: 'La Becerrita' }], sameAs: [E.instagram] });
    document.body.appendChild(s);
  }
  function quitarLdProducto() { var s = document.getElementById('ld-producto'); if (s) s.parentNode.removeChild(s); }

  /* =========================================================
     Mi cotización: render (columna, panel, franja)
     ========================================================= */
  function htmlLineaCot(l) {
    var r = REF[l.id], kg = kgUnidad(r.pr);
    return '<li class="cot-linea" data-ref="' + r.id + '" data-modo="linea"><p class="cot-linea-nombre">' + esc(nombreRefNB(r)) + '</p>' +
      '<div class="cot-linea-fila">' + htmlCantidad(r, l.cant) + '<span class="cot-linea-kg num" data-kg>' + (kg != null ? fmtKg(kg * l.cant) : 'Consultar') + '</span></div>' +
      '<button type="button" class="enlace-boton" data-quitar>Quitar<span class="sr"> ' + esc(nombreRef(r)) + '</span></button></li>';
  }
  function htmlTotales(t) {
    return '<p class="cot-total"><span>Total</span><span class="num">' + htmlKg(t.kg) + '</span></p><p class="cot-resumen-txt">' + textoTotales(t) + '</p>';
  }
  // Los kilos totales giran como un contador: cada cifra es una tira 0–9 que se desplaza (solo transform).
  // El lector de pantalla recibe el valor final en texto; la tira es decorativa.
  var kgMostrado = null, rodarPend = null;
  function htmlOdo(desde, hasta) {
    var out = '', n = hasta.length, m = desde.length;
    for (var i = 0; i < n; i++) {
      var c = hasta.charAt(i), prev = desde.charAt(m - (n - i));
      if (/\d/.test(c)) {
        out += '<span class="odo-d"><span class="odo-tira" style="--d:' + (/\d/.test(prev) ? prev : 0) + '" data-a="' + c + '"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></span></span>';
      } else out += '<span class="odo-c">' + c + '</span>';
    }
    return out;
  }
  function htmlKg(kg) {
    var hasta = fmtKg(kg), desde = kgMostrado == null || reducido() ? hasta : fmtKg(kgMostrado);
    rodarContadores();
    return '<span class="sr">' + hasta + '</span><span class="odo" aria-hidden="true">' + htmlOdo(desde, hasta) + '</span>';
  }
  function rodarContadores() {
    if (rodarPend) return;
    rodarPend = requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        rodarPend = null;
        $$('.odo-tira[data-a]').forEach(function (el) { el.style.setProperty('--d', el.getAttribute('data-a')); el.removeAttribute('data-a'); });
        kgMostrado = totales(cot.lineas).kg;
      });
    });
  }
  function htmlAvisoAlmacen() {
    return almacenBloqueado ? '<p class="cot-aviso-almacen" role="alert">' + icono('i-alerta') + '<span>Este navegador no deja guardar la cotización. Envíela antes de cerrar la página o copie el enlace.</span></p>' : '';
  }
  function htmlRepetir() {
    if (!cot.ultima || !cot.ultima.lineas.length) return '';
    var t = totales(cot.ultima.lineas);
    var f = cot.ultima.fecha ? new Date(cot.ultima.fecha) : null;
    var fecha = f && !isNaN(f) ? f.getDate() + ' ' + MESES[f.getMonth()].slice(0, 3) + ': ' : '';
    return '<button type="button" class="boton boton-sec" data-repetir>Repetir mi última solicitud (' + fecha + textoRefs(t.refs) + ', ' + fmtKg(t.kg) + ')</button>';
  }
  function htmlCot(modo) {
    var t = totales(cot.lineas);
    var idT = modo === 'panel' ? 'panel-cot-titulo' : 'cot-titulo-' + modo;
    var cerrar = modo === 'panel' ? '<button type="button" class="cot-cerrar" data-cerrar-panel aria-label="Cerrar Mi cotización">' + icono('i-cerrar') + '</button>' : '';
    var cab = '<div class="cot-cab"><h2 id="' + idT + '">Mi cotización</h2><p data-cot-refs>' + (t.refs ? textoRefs(t.refs) : 'Sin referencias') + '</p>' + cerrar + '</div>';
    if (!t.refs) {
      return '<div class="cot">' + cab + htmlAvisoAlmacen() + '<div class="cot-vacia"><p>Su cotización está vacía. Elija presentaciones en <a href="#productos">Productos</a> o escríbanos qué necesita.</p>' + htmlRepetir() +
        waEnlace(MSJ_GENERAL, 'Escribir por WhatsApp al') + '</div></div>';
    }
    return '<div class="cot">' + cab + htmlAvisoAlmacen() +
      '<ul class="cot-lineas">' + cot.lineas.map(htmlLineaCot).join('') + '</ul>' +
      '<div class="cot-totales" aria-live="polite" data-cot-totales>' + htmlTotales(t) + '</div>' +
      '<div class="cot-acciones"><a class="boton" href="#cotizar">Solicitar cotización</a>' +
      '<span data-wa-cot>' + waEnlace(msjCot(cot.lineas), 'Enviar por WhatsApp al') + '</span>' +
      '<button type="button" class="enlace-boton" data-copiar-enlace>' + icono('i-enlace') + 'Copiar enlace</button>' +
      '<button type="button" class="enlace-boton" data-vaciar>Vaciar la cotización</button>' +
      '<p class="cot-nota">Esto no es un pago: es una solicitud de cotización.</p></div></div>';
  }
  function renderCotizaciones() {
    $$('[data-cotizacion="columna"], [data-cotizacion="panel"]').forEach(function (c) {
      if (c.closest('[hidden]') && c.getAttribute('data-cotizacion') === 'panel') return;
      c.innerHTML = htmlCot(c.getAttribute('data-cotizacion'));
    });
  }
  function actualizarNumerosCot() {
    var t = totales(cot.lineas);
    $$('[data-cot-totales]').forEach(function (el) { el.innerHTML = htmlTotales(t); });
    $$('[data-cot-refs]').forEach(function (el) { el.textContent = t.refs ? textoRefs(t.refs) : 'Sin referencias'; });
    $$('[data-wa-cot]').forEach(function (el) { el.innerHTML = waEnlace(msjCot(cot.lineas), 'Enviar por WhatsApp al'); });
    $$('[data-modo="linea"]').forEach(function (li) {
      var r = REF[li.getAttribute('data-ref')], l = linea(r.id); if (!l) return;
      var kg = kgUnidad(r.pr); var k = $('[data-kg]', li); if (k && kg != null) k.textContent = fmtKg(kg * l.cant);
    });
  }
  function actualizarConteos(animar) {
    var n = cot.lineas.length;
    $$('[data-conteo]').forEach(function (el) {
      el.hidden = !n; el.textContent = n;
      if (animar && !reducido()) { el.classList.remove('salta'); void el.offsetWidth; el.classList.add('salta'); }
    });
    var t = totales(cot.lineas);
    var bc = $('[data-boton-cotizar]');
    if (bc) bc.setAttribute('aria-label', n ? 'Cotizar, ' + textoRefs(n) + ' en su cotización' : 'Cotizar');
    $$('[data-accion-cotizar]').forEach(function (bi) { bi.setAttribute('aria-label', n ? 'Cotizar, ' + textoRefs(n) + ' en su cotización' : 'Cotizar'); });
    // Franja de 1024 a 1439 px en Productos
    var fr = $('#franja-cot');
    var enProductos = document.body.getAttribute('data-ruta') === 'productos';
    if (enProductos && n) {
      fr.innerHTML = '<div class="envoltura franja-in"><p><strong>Mi cotización:</strong> ' + textoRefs(n) + ', ' + htmlKg(t.kg) + '</p><div><button type="button" class="enlace-boton" data-abrir-panel>Ver detalle</button><a class="boton" href="#cotizar">Solicitar cotización</a></div></div>';
      fr.hidden = false; document.body.classList.add('con-franja');
    } else { fr.hidden = true; document.body.classList.remove('con-franja'); }
  }
  function sincronizarRef(id, cant, origen) {
    $$('[data-ref="' + id + '"]').forEach(function (cont) {
      var r = REF[id];
      var inp = $('[data-cant]', cont);
      if (inp && inp !== origen && document.activeElement !== inp) inp.value = cant;
      var u = $('[data-unidad]', cont); if (u) u.textContent = unidad(r.pr, cant);
      var c = $('[data-calc]', cont); if (c) c.textContent = calcTexto(r, cant, cont.getAttribute('data-modo') === 'ficha');
      var agregado = !!linea(id);
      var a = $('[data-agregar]', cont), q = $('[data-quitar]', cont), s = $('.estado-agregado', cont);
      if (cont.getAttribute('data-modo') === 'fila') {
        if (a) a.hidden = agregado; if (q) q.hidden = !agregado; if (s) s.hidden = !agregado;
      }
    });
  }
  function alCambiarCot(o) {
    o = o || {};
    actualizarConteos(o.estructura);
    if (o.estructura) {
      var enfocado = document.activeElement;
      var panelAbierto = !$('#panel-cot').hidden;
      $$('[data-cotizacion="columna"]').forEach(function (c) { c.innerHTML = htmlCot('columna'); });
      if (panelAbierto) $('#panel-cot [data-cotizacion]').innerHTML = htmlCot('panel');
      if (o.id) {
        $$('.cot-linea[data-ref="' + o.id + '"]').forEach(function (li) { if (!reducido()) li.classList.add('resaltada'); });
      }
      if (enfocado && !document.body.contains(enfocado) && panelAbierto) { var f = $('#panel-cot button, #panel-cot a'); if (f) f.focus(); }
    } else actualizarNumerosCot();
    if (o.id) { var l = linea(o.id); sincronizarRef(o.id, l ? l.cant : cantDe(o.id)); }
    else {
      var ids = {};
      $$('[data-ref]').forEach(function (el) { ids[el.getAttribute('data-ref')] = 1; });
      Object.keys(ids).forEach(function (id) { sincronizarRef(id, cantDe(id)); });
    }
    if (document.body.getAttribute('data-ruta') === 'cotizar' && o.estructura && !o.desdeCotizar) renderPaso1Lineas();
    if (document.body.getAttribute('data-ruta') === 'cotizar') renderResumenCotizar();
    if (ficha && document.body.getAttribute('data-ruta') === 'producto' && o.estructura) refrescarAccionesFicha();
  }
  function refrescarAccionesFicha() {
    var p = ficha.p, pr = ficha.pr; if (!pr) return;
    var r = REF[p.slug + '_' + presSlug(pr.contenido)], l = linea(r.id);
    $$('[data-agregar-ficha]').forEach(function (b) {
      var enBarra = !!b.closest('#barra-ficha');
      b.firstChild.textContent = l ? (enBarra ? 'Actualizar' : 'Actualizar la cotización') : (enBarra ? 'Agregar' : 'Agregar a la cotización');
    });
    var cont = $('.ficha-cantidad');
    var info = $('[data-en-cot]', cont);
    if (l) {
      var html = 'En su cotización: ' + l.cant + ' ' + unidad(pr, l.cant) + '. <button type="button" class="enlace-boton" data-quitar>Quitar</button>';
      if (info) info.innerHTML = html; else cont.insertAdjacentHTML('beforeend', '<p class="meta" data-en-cot>' + html + '</p>');
    } else if (info) info.parentNode.removeChild(info);
  }

  /* Panel lateral u hoja inferior de Mi cotización */
  var trampa = null;
  function atrapar(cont, alCerrar, disparador) {
    soltar(false);
    var h = function (e) {
      if (e.key === 'Escape') { e.preventDefault(); alCerrar(); return; }
      if (e.key !== 'Tab') return;
      var f = $$('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]', cont)
        .filter(function (el) { return el.offsetWidth || el.offsetHeight || el === document.activeElement; });
      if (!f.length) return;
      var a = f[0], z = f[f.length - 1];
      if (!cont.contains(document.activeElement)) { e.preventDefault(); a.focus(); return; }
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener('keydown', h);
    trampa = { h: h, disparador: disparador, cont: cont };
  }
  function soltar(devolver) {
    if (!trampa) return;
    document.removeEventListener('keydown', trampa.h);
    var d = trampa.disparador; trampa = null;
    if (devolver && d && document.body.contains(d)) d.focus();
  }
  function abrirPanel(disparador) {
    cerrarTodo(false);
    ocultarAviso();
    var p = $('#panel-cot');
    $('[data-cotizacion]', p).innerHTML = htmlCot('panel');
    p.hidden = false; $('#velo').hidden = false; document.body.classList.add('bloqueado');
    atrapar(p, cerrarPanel, disparador || document.activeElement);
    var f = $('.cot-cerrar', p); if (f) f.focus();
  }
  function cerrarPanel() {
    $('#panel-cot').hidden = true; $('#velo').hidden = true; document.body.classList.remove('bloqueado');
    soltar(true);
  }
  function abrirMenu(disparador, foco) {
    cerrarTodo(false);
    var m = $('#menu-movil'); m.hidden = false; document.body.classList.add('bloqueado');
    $$('[data-abrir-menu]').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    atrapar(m, cerrarMenu, disparador);
    (foco ? $(foco) : $('[data-cerrar-menu]')).focus();
  }
  function cerrarMenu() {
    $('#menu-movil').hidden = true; document.body.classList.remove('bloqueado');
    $$('[data-abrir-menu]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    soltar(true);
  }
  function abrirFiltros(disparador) {
    var f = $('#filtros'); if (!f) return;
    f.setAttribute('data-abierta', ''); $('#velo').hidden = false; document.body.classList.add('bloqueado');
    f.setAttribute('role', 'dialog'); f.setAttribute('aria-modal', 'true');
    $$('[data-abrir-filtros]').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    atrapar(f, cerrarFiltros, disparador);
    $('[data-cerrar-filtros]', f).focus();
  }
  function cerrarFiltros() {
    var f = $('#filtros'); if (!f || !f.hasAttribute('data-abierta')) return;
    f.removeAttribute('data-abierta'); f.setAttribute('role', 'group'); f.removeAttribute('aria-modal');
    $('#velo').hidden = true; document.body.classList.remove('bloqueado');
    $$('[data-abrir-filtros]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    soltar(true);
  }
  function cerrarTodo(devolver) {
    if (!$('#panel-cot').hidden) { $('#panel-cot').hidden = true; }
    if (!$('#menu-movil').hidden) { $('#menu-movil').hidden = true; $$('[data-abrir-menu]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); }); }
    var f = $('#filtros'); if (f && f.hasAttribute('data-abierta')) { f.removeAttribute('data-abierta'); f.setAttribute('role', 'group'); f.removeAttribute('aria-modal'); }
    $('#velo').hidden = true; document.body.classList.remove('bloqueado');
    soltar(devolver);
  }

  /* Copiar enlace de la cotización */
  function enlaceCot(lineas) {
    var base = location.href.split('#')[0];
    return base + '#cotizar~' + lineas.map(function (l) { return 'l-' + l.id + '_' + l.cant; }).join('~');
  }
  function copiarEnlace() {
    var url = enlaceCot(cot.lineas);
    var ok = function () { avisar('<p>Enlace copiado. Quien lo abra verá esta misma cotización.</p>'); };
    var falla = function () {
      avisar('<p>No se pudo copiar automáticamente. Copie este enlace:</p><label class="sr" for="enlace-manual">Enlace de la cotización</label><input id="enlace-manual" readonly value="' + esc(url) + '">', 12000);
      var i = $('#enlace-manual'); if (i) { i.focus(); i.select(); }
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok, falla);
      else falla();
    } catch (e) { falla(); }
  }
  function vaciar() {
    var copia = cot.lineas.slice();
    cot.lineas = []; guardarCot(); alCambiarCot({ estructura: true });
    avisar('<p>Cotización vaciada. <button type="button" class="enlace-boton" data-deshacer>Deshacer</button></p>', 8000);
    deshacer = copia;
  }
  var deshacer = null;

  /* =========================================================
     Solicitar cotización (tres pasos)
     ========================================================= */
  var formCot = { paso: 1, datos: {} };
  var HORARIO = { 1: [7, 17], 2: [7, 17], 3: [7, 17], 4: [7, 17], 5: [7, 17], 6: [7, 12] }; // dato a confirmar
  function vistaCotizar(tokens) {
    var compartida = [];
    var ciudad = '';
    tokens.forEach(function (t) {
      if (t.indexOf('l-') === 0) {
        var s = t.slice(2), i = s.lastIndexOf('_');
        var id = s.slice(0, i), n = parseInt(s.slice(i + 1), 10);
        if (REF[id] && n > 0) compartida.push({ id: id, cant: Math.min(9999, n) });
      }
      if (t.indexOf('ciudad-') === 0) ciudad = CIUDAD[t.slice(7)] ? CIUDAD[t.slice(7)].n : t.slice(7).replace(/-/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
    });
    if (ciudad) formCot.datos.ciudad = ciudad;
    formCot.paso = 1;
    var igual = JSON.stringify(compartida) === JSON.stringify(cot.lineas);
    var banner = compartida.length && !igual ? '<div class="banner-compartida" role="region" aria-label="Cotización compartida"><p>Un asesor preparó esta cotización para usted: ' + textoRefs(compartida.length) + ', ' + fmtKg(totales(compartida).kg) + '.</p><div>' +
      '<button type="button" class="boton" data-usar-compartida>Usar esta cotización</button><button type="button" class="enlace-boton" data-conservar>Conservar la mía</button></div></div>' : '';
    vistaCotizar.compartida = compartida;
    var html = '<div class="envoltura">' + migas([['#inicio', 'Inicio'], ['#productos', 'Productos'], [null, 'Solicitar cotización']]) +
      '<div class="pagina-cab"><h1>Solicitar cotización</h1>' + banner + '</div>' +
      '<ol class="pasos" aria-label="Pasos"><li data-paso-ind="1">1 Productos</li><li data-paso-ind="2">2 Entrega</li><li data-paso-ind="3">3 Contacto</li></ol>' +
      '<p class="paso-actual" data-paso-txt aria-live="polite"></p><div class="progreso" aria-hidden="true"><span data-progreso></span></div>' +
      '<div class="cotizar-cols">' +
      '<form class="form-cot" id="form-cot" novalidate>' +
      '<div class="resumen-errores" data-resumen tabindex="-1" hidden></div>' +
      '<fieldset class="paso" data-paso="1"><legend class="sr">Paso 1 de 3: Productos</legend><h2>Productos</h2>' + htmlAvisoAlmacen() +
      '<div data-paso1-lineas></div>' +
      '<p><a class="enlace" href="#productos">Agregar más productos</a></p>' +
      '<div class="campo" data-campo="otros"><label for="c-otros">¿Necesita algo que no está en el catálogo? Escríbalo aquí. <span class="opcional">(opcional)</span></label><textarea id="c-otros" name="otros" rows="3" aria-describedby="c-otros-error"></textarea><p class="error-campo" id="c-otros-error" hidden></p></div>' +
      '<div class="paso-acciones"><button type="button" class="boton" data-continuar="2">Continuar con entrega</button><span data-wa-form></span></div></fieldset>' +
      '<fieldset class="paso" data-paso="2" hidden><legend class="sr">Paso 2 de 3: Entrega</legend><h2>Entrega</h2>' +
      '<div class="campo" data-campo="ciudad"><label for="c-ciudad">Ciudad de entrega</label><input type="text" id="c-ciudad" name="ciudad" autocomplete="address-level2" list="ciudades" aria-describedby="c-ciudad-ayuda c-ciudad-error"><p class="ayuda" id="c-ciudad-ayuda">Con su ciudad calculamos el despacho desde Cartagena.</p><p class="error-campo" id="c-ciudad-error" hidden></p>' +
      '<datalist id="ciudades"><option value="Cartagena"><option value="Barranquilla"><option value="Santa Marta"><option value="Sincelejo"><option value="Montería"><option value="Valledupar"><option value="Medellín"><option value="Bucaramanga"><option value="Bogotá"><option value="Cali"></datalist></div>' +
      '<fieldset class="campo" data-campo="negocio" aria-describedby="c-negocio-error"><legend>Tipo de negocio</legend><div class="opciones">' +
      ['Tienda', 'Panadería', 'Supermercado', 'Distribuidor', 'Industria', 'Otro'].map(function (n, i) { return '<label class="opcion"><input type="radio" name="negocio" value="' + n + '"' + (i === 0 ? ' id="c-negocio"' : '') + '>' + n + '</label>'; }).join('') +
      '</div><p class="error-campo" id="c-negocio-error" hidden></p></fieldset>' +
      '<div class="campo"><label for="c-frecuencia">¿Cada cuánto compra? <span class="opcional">(opcional)</span></label><select id="c-frecuencia" name="frecuencia"><option value="">Elija una opción</option><option>Cada semana</option><option>Cada quince días</option><option>Cada mes</option><option>De vez en cuando</option><option>Es mi primera compra</option></select></div>' +
      '<div class="campo campo--corto"><label for="c-fecha">Fecha deseada de entrega <span class="opcional">(opcional)</span></label><input type="date" id="c-fecha" name="fecha"></div>' +
      '<div class="paso-acciones"><button type="button" class="boton" data-continuar="3">Continuar con contacto</button><button type="button" class="enlace-boton" data-volver="1">Volver a productos</button></div></fieldset>' +
      '<fieldset class="paso" data-paso="3" hidden><legend class="sr">Paso 3 de 3: Contacto</legend><h2>Contacto</h2>' +
      '<div class="campo" data-campo="nombre"><label for="c-nombre">Nombre</label><input type="text" id="c-nombre" name="nombre" autocomplete="name" aria-describedby="c-nombre-error"><p class="error-campo" id="c-nombre-error" hidden></p></div>' +
      '<div class="campo"><label for="c-empresa">Empresa <span class="opcional">(opcional)</span></label><input type="text" id="c-empresa" name="empresa" autocomplete="organization"></div>' +
      '<div class="campo campo--corto" data-campo="nit"><label for="c-nit">NIT <span class="opcional">(opcional)</span></label><input type="text" id="c-nit" name="nit" inputmode="numeric" autocomplete="off" aria-describedby="c-nit-error"><p class="error-campo" id="c-nit-error" hidden></p></div>' +
      '<div class="campo" data-campo="celular"><label for="c-celular">Celular</label><input type="tel" id="c-celular" name="celular" inputmode="numeric" autocomplete="tel-national" aria-describedby="c-celular-error"><p class="error-campo" id="c-celular-error" hidden></p></div>' +
      '<div class="campo" data-campo="correo"><label for="c-correo">Correo <span class="opcional">(opcional)</span></label><input type="email" id="c-correo" name="correo" autocomplete="email" aria-describedby="c-correo-error"><p class="error-campo" id="c-correo-error" hidden></p></div>' +
      '<div class="campo"><label for="c-mensaje">Mensaje <span class="opcional">(opcional)</span></label><textarea id="c-mensaje" name="mensaje" rows="3"></textarea></div>' +
      '<div class="trampa" aria-hidden="true"><label for="c-web">No llene este campo</label><input type="text" id="c-web" name="web" tabindex="-1" autocomplete="off"></div>' +
      '<div class="campo" data-campo="datos"><label class="casilla" for="c-datos"><input type="checkbox" id="c-datos" name="datos" aria-describedby="c-datos-error"><span>Autorizo a Inversiones Mundilácteos S.A.S. a tratar mis datos para responder esta solicitud, según su <a href="#privacidad">política de datos</a> (Ley 1581 de 2012).</span></label><p class="error-campo" id="c-datos-error" hidden></p></div>' +
      '<div class="paso-acciones"><button type="submit" class="boton" data-enviar>Enviar solicitud de cotización</button><button type="button" class="enlace-boton" data-volver="2">Volver a entrega</button></div>' +
      '<p>¿Prefiere WhatsApp? <span data-wa-form></span></p></fieldset>' +
      '<p class="cot-nota">Esto no es un pago: es una solicitud de cotización.</p>' +
      '</form>' +
      '<aside class="cot-resumen" aria-labelledby="t-su-cot" data-resumen-cot></aside>' +
      '</div></div>';
    montar(html);
    if (formCot.datos.ciudad) $('#c-ciudad').value = formCot.datos.ciudad;
    renderPaso1Lineas();
    renderResumenCotizar();
    irPaso(1, false);
  }
  function renderPaso1Lineas() {
    var c = $('[data-paso1-lineas]'); if (!c) return;
    var t = totales(cot.lineas);
    if (!t.refs) {
      c.innerHTML = '<div class="cot-vacia" style="padding:0"><p>Su cotización está vacía. Elija presentaciones en <a href="#productos">Productos</a> o escriba abajo qué necesita.</p>' + htmlRepetir() + '</div>';
    } else {
      c.innerHTML = '<div class="cot"><ul class="cot-lineas">' + cot.lineas.map(htmlLineaCot).join('') + '</ul><div class="cot-totales" aria-live="polite" data-cot-totales>' + htmlTotales(t) + '</div></div>';
    }
    actualizarWaForm();
  }
  function renderResumenCotizar() {
    var a = $('[data-resumen-cot]'); if (!a) return;
    var t = totales(cot.lineas);
    a.innerHTML = '<div class="cot"><div class="cot-cab"><h2 id="t-su-cot">Su cotización</h2><p>' + (t.refs ? textoRefs(t.refs) : 'Sin referencias') + '</p></div>' +
      (t.refs ? '<ul class="cot-resumen-lineas">' + cot.lineas.map(function (l) {
        var r = REF[l.id], kg = kgUnidad(r.pr);
        return '<li><span>' + esc(nombreRefNB(r)) + '<small>' + l.cant + ' ' + unidad(r.pr, l.cant) + '</small></span><span class="num">' + (kg != null ? fmtKg(kg * l.cant) : '') + '</span></li>';
      }).join('') + '</ul><div class="cot-totales">' + htmlTotales(t) + '</div>' : '<p class="cot-vacia">Aún no hay referencias.</p>') +
      '<div class="cot-acciones">' + (formCot.paso > 1 ? '<button type="button" class="enlace-boton" data-volver="1">Editar productos</button>' : '') + '<p class="cot-nota">Esto no es un pago: es una solicitud de cotización.</p></div></div>';
    actualizarWaForm();
  }
  function datosForm() {
    var f = $('#form-cot'); if (!f) return {};
    var neg = $('input[name="negocio"]:checked', f);
    return { otros: $('#c-otros', f).value.trim(), ciudad: $('#c-ciudad', f).value.trim(), negocio: neg ? neg.value : '' };
  }
  function actualizarWaForm() {
    var d = datosForm();
    $$('[data-wa-form]').forEach(function (s) { s.innerHTML = waEnlace(msjCot(cot.lineas, d), 'Enviar por WhatsApp al'); });
  }
  function irPaso(n, enfocar) {
    formCot.paso = n;
    $$('.paso').forEach(function (fs) { fs.hidden = +fs.getAttribute('data-paso') !== n; });
    $$('[data-paso-ind]').forEach(function (li) {
      var k = +li.getAttribute('data-paso-ind');
      if (k === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      li.classList.toggle('hecho', k < n);
    });
    var nombres = ['Productos', 'Entrega', 'Contacto'];
    $('[data-paso-txt]').textContent = 'Paso ' + n + ' de 3: ' + nombres[n - 1];
    $('[data-progreso]').style.setProperty('--avance', Math.round(n / 3 * 100) + '%');
    ocultarResumen();
    renderResumenCotizar();
    if (enfocar) { var h = $('.paso[data-paso="' + n + '"] h2'); h.setAttribute('tabindex', '-1'); h.focus(); var cab = $('.pasos'); (cab && cab.offsetParent ? cab : h).scrollIntoView({ block: 'start' }); }
  }
  var REGLAS = {
    otros: function (v) { return !cot.lineas.length && !v ? 'Agregue al menos una referencia o escriba qué necesita.' : ''; },
    ciudad: function (v) { return v.length < 3 ? 'Elija su ciudad para calcular el despacho.' : ''; },
    negocio: function () { return $('input[name="negocio"]:checked') ? '' : 'Elija el tipo de negocio.'; },
    nombre: function (v) { return v.length < 2 ? 'Escriba su nombre.' : ''; },
    nit: function (v) { return v && !/^\d{6,10}$/.test(v.replace(/[.\s]/g, '')) ? 'Escriba el NIT solo con números, sin dígito de verificación.' : ''; },
    celular: function (v) { return !/^3\d{9}$/.test(v.replace(/[\s()-]/g, '').replace(/^\+?57/, '')) ? 'Escriba un celular de 10 dígitos, por ejemplo 300 123 4567.' : ''; },
    correo: function (v) { return v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? 'Revise el correo: le falta la @ o el dominio, por ejemplo nombre@empresa.com.' : ''; },
    datos: function () { return $('#c-datos').checked ? '' : 'Para enviar la solicitud, autorice el tratamiento de sus datos.'; },
  };
  var CAMPOS_PASO = { 1: ['otros'], 2: ['ciudad', 'negocio'], 3: ['nombre', 'nit', 'celular', 'correo', 'datos'] };
  function validarCampo(k) {
    var cont = $('[data-campo="' + k + '"]'); if (!cont) return '';
    var inp = $('#c-' + k);
    var msg = REGLAS[k](inp && inp.value !== undefined ? inp.value.trim() : '');
    var err = $('#c-' + k + '-error');
    cont.classList.toggle('con-error', !!msg);
    if (inp && inp.type !== 'radio') { if (msg) inp.setAttribute('aria-invalid', 'true'); else inp.removeAttribute('aria-invalid'); }
    if (err) { err.hidden = !msg; err.innerHTML = msg ? icono('i-alerta') + '<span>' + msg + '</span>' : ''; }
    return msg;
  }
  function validarPaso(n) {
    var errores = [];
    CAMPOS_PASO[n].forEach(function (k) { var m = validarCampo(k); if (m) errores.push({ k: k, m: m }); });
    var res = $('[data-resumen]');
    if (errores.length) {
      res.innerHTML = '<p>' + icono('i-alerta') + 'Revise ' + errores.length + ' ' + plural(errores.length, 'campo', 'campos') + ' antes de ' + (n === 3 ? 'enviar' : 'continuar') + '.</p><ul>' +
        errores.map(function (e) { return '<li><button type="button" class="enlace-boton" data-ir-campo="' + e.k + '">' + e.m + '</button></li>'; }).join('') + '</ul>';
      res.hidden = false; res.focus();
    } else ocultarResumen();
    return !errores.length;
  }
  function ocultarResumen() { var r = $('[data-resumen]'); if (r) { r.hidden = true; r.innerHTML = ''; } }
  function mensajeHorario(ahora) {
    // Hora de Bogotá (UTC−5, sin horario de verano)
    var b = new Date(ahora.getTime() - 5 * 3600000);
    var dia = b.getUTCDay(), h = b.getUTCHours() + b.getUTCMinutes() / 60;
    var hoy = HORARIO[dia];
    if (hoy && h >= hoy[0] && h < hoy[1] - 0.5) {
      return 'Un asesor del equipo comercial le escribe hoy antes de las ' + (hoy[1] === 12 ? '12:00 m.' : (hoy[1] - 12) + ':00 p. m.') + ' por WhatsApp o correo.';
    }
    var d = dia, salto = 0;
    do { d = (d + 1) % 7; salto++; } while (!HORARIO[d] && salto < 8);
    var cuando = salto === 1 && (!hoy || h >= hoy[1] - 0.5) ? 'mañana, ' + DIAS[d] + ',' : 'el ' + DIAS[d];
    if (hoy && h < hoy[0]) cuando = 'hoy';
    return 'Recibimos su solicitud fuera del horario de atención. Un asesor le escribe ' + cuando + ' antes de las 10:00 a. m.';
  }
  function enviarCot() {
    for (var n = 1; n <= 3; n++) {
      if (!validarPaso(n)) { if (formCot.paso !== n) { irPaso(n, false); validarPaso(n); } return; }
    }
    var btn = $('[data-enviar]');
    btn.disabled = true; btn.textContent = 'Enviando solicitud';
    var d = datosForm();
    var trampaLlena = $('#c-web').value;
    setTimeout(function () {
      var ahora = new Date();
      var b = new Date(ahora.getTime() - 5 * 3600000);
      var hh = b.getUTCHours(), mm = String(b.getUTCMinutes()).padStart(2, '0');
      var hora = (hh % 12 || 12) + ':' + mm + (hh < 12 ? ' a. m.' : (hh === 12 && mm === '00' ? ' m.' : ' p. m.'));
      var fecha = DIAS[b.getUTCDay()] + ' ' + b.getUTCDate() + ' de ' + MESES[b.getUTCMonth()];
      var numero = 'MDL-' + String(Math.floor(ahora.getTime() / 1000) % 10000).padStart(4, '0');
      var lineas = cot.lineas.slice();
      if (!trampaLlena && lineas.length) { cot.ultima = { fecha: ahora.toISOString(), lineas: lineas }; }
      cot.lineas = []; guardarCot(); actualizarConteos(false);
      var form = $('#form-cot');
      var conf = document.createElement('div');
      conf.className = 'confirmacion';
      conf.innerHTML = '<h2 tabindex="-1">' + icono('i-check') + 'Solicitud enviada.</h2><p class="entradilla">' + mensajeHorario(ahora) + '</p>' +
        '<p>Número de solicitud: <strong class="cifra">' + numero + '</strong>. Recibida el ' + fecha + ' a las ' + hora + (/\.$/.test(hora) ? '' : '.') + '</p>' +
        '<p class="meta">Prototipo: la solicitud no sale de este navegador. Horario de atención ' + aconf() + '</p>' +
        '<div class="paso-acciones">' + waEnlace(msjCot(lineas, d), 'Enviar también por WhatsApp al') + '<a class="enlace" href="#productos">Volver a productos</a></div>';
      form.parentNode.replaceChild(conf, form);
      $$('.pasos, [data-paso-txt], .progreso, [data-resumen-cot]').forEach(function (el) { el.hidden = true; });
      $('h2', conf).focus();
    }, reducido() ? 50 : 600);
  }

  /* =========================================================
     Páginas interiores
     ========================================================= */
  var FECHA_DATOS = fechaLarga(C.actualizado);
  var TEL_HREF = 'tel:' + E.telefono.replace(/\s/g, '');
  var MAPS_PLANTA = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Parque Industrial Europark, Km 1 vía a Turbaco, Bolívar');
  var INV = C.calidad.invima_establecimiento;
  var URL_INVIMA = C.calidad.verificar_registro_url;
  function ext(url, txt, sr) { return '<a href="' + url + '" target="_blank" rel="noopener">' + txt + '<span class="sr"> ' + (sr || '(abre otro sitio)') + '</span></a>'; }
  function cabecera(titulo, entradilla, extra, items, clase) {
    return migas(items || [['#inicio', 'Inicio'], [null, titulo]]) +
      '<div class="pagina-cab' + (clase ? ' ' + clase : '') + '"><div class="pagina-cab-texto"><h1>' + esc(titulo) + '</h1>' +
      (entradilla ? '<p class="entradilla">' + entradilla + '</p>' : '') + '</div>' + (extra || '') + '</div>';
  }
  function bloque(id, titulo, cuerpo, clase, cabExtra) {
    var h = '<h2 id="t-' + id + '">' + titulo + '</h2>';
    return '<section class="bloque' + (clase ? ' ' + clase : '') + '" id="s-' + id + '" aria-labelledby="t-' + id + '">' +
      (cabExtra ? '<div class="bloque-cab">' + h + cabExtra + '</div>' : h) + cuerpo + '</section>';
  }
  function tablaDatos(arr, caption, clase) {
    return '<table class="tabla tabla-datos' + (clase ? ' ' + clase : '') + '">' + (caption ? '<caption class="sr">' + caption + '</caption>' : '') + '<tbody>' +
      arr.map(function (f) { return '<tr><th scope="row">' + f[0] + '</th><td>' + f[1] + '</td></tr>'; }).join('') + '</tbody></table>';
  }
  var ESTADOS = { ok: 'Verificado', pend: 'Por confirmar' };
  function estado(k, txt) { return '<span class="estado estado--' + k + '"><span class="estado-linea" aria-hidden="true"></span><span>' + (txt || ESTADOS[k]) + '</span></span>'; }
  var LEYENDA_ESTADOS = '<ul class="leyenda-estados" aria-label="Cómo leer el estado de cada dato"><li>' + estado('ok', 'Línea continua: verificado en una fuente pública o en el empaque') +
    '</li><li>' + estado('pend', 'Línea punteada: por confirmar con Mundilácteos') + '</li></ul>';
  function foto(src, alt, w, h, pie, clase) {
    return '<figure class="foto' + (clase ? ' ' + clase : '') + '"><img src="img/' + src + '" alt="' + esc(alt) + '" width="' + w + '" height="' + h + '" loading="lazy" decoding="async">' +
      (pie ? '<figcaption>' + pie + '</figcaption>' : '') + '</figure>';
  }
  function pasos(items, clase) {
    return '<ol class="pasos-empaque' + (clase ? ' ' + clase : '') + '">' + items.map(function (it) { return '<li><h3>' + it[0] + '</h3><p>' + it[1] + '</p></li>'; }).join('') + '</ol>';
  }
  var acciones = function (html) { return '<div class="acciones-linea">' + html + '</div>'; };
  var prodsDe = function (num) { return C.productos.filter(function (p) { return p.registro === num; }); };
  var enlaceProd = function (p) { return '<a href="#producto-' + p.slug + '">' + esc(p.nombre) + '</a>'; };
  var fechaNum = function (iso) { var p = iso.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; };
  function numeroSolicitud() { return 'MDL-' + String(Math.floor(Date.now() / 1000) % 10000).padStart(4, '0'); }

  // Dónde se encontró cada producto publicado en línea, por canal
  var DONDE = {};
  C.productos.forEach(function (p) {
    p.presentaciones.forEach(function (pr) {
      (pr.donde || []).forEach(function (d) { (DONDE[d.canal] = DONDE[d.canal] || []).push({ t: p.nombre + ' ' + fmtPres(pr.contenido), url: d.url }); });
    });
  });

  // Ciudades de ejemplo para Distribución y Dónde comprar. x, y: posición esquemática en el mapa (viewBox 204 × 277),
  // ajustada unos milímetros para que ningún punto quede a menos de 24 px de otro en móvil.
  var CIUDADES = [
    { s: 'cartagena', n: 'Cartagena', lat: 10.39, lon: -75.51, x: 60.64, y: 38.56, lado: 'izq', costa: true, planta: true },
    { s: 'barranquilla', n: 'Barranquilla', lat: 10.96, lon: -74.8, x: 73, y: 28.5, lado: 'arriba', costa: true },
    { s: 'santa-marta', n: 'Santa Marta', lat: 11.24, lon: -74.2, x: 88, y: 25, lado: 'der', costa: true },
    { s: 'valledupar', n: 'Valledupar', lat: 10.46, lon: -73.25, x: 98, y: 39, lado: 'der', costa: true },
    { s: 'sincelejo', n: 'Sincelejo', lat: 9.3, lon: -75.4, x: 62.4, y: 56, lado: 'der', costa: true },
    { s: 'monteria', n: 'Montería', lat: 8.75, lon: -75.88, x: 52, y: 68.5, lado: 'izq', costa: true },
    { s: 'medellin', n: 'Medellín', lat: 6.24, lon: -75.58, x: 59.5, y: 105, lado: 'der' },
    { s: 'bucaramanga', n: 'Bucaramanga', lat: 7.12, lon: -73.12, x: 98.9, y: 90.9, lado: 'der' },
    { s: 'bogota', n: 'Bogotá', lat: 4.71, lon: -74.07, x: 83.7, y: 129.4, lado: 'der' },
    { s: 'cali', n: 'Cali', lat: 3.45, lon: -76.53, x: 44.3, y: 149.6, lado: 'izq' },
  ];
  var CIUDAD = {}; CIUDADES.forEach(function (c) { CIUDAD[c.s] = c; });
  var TIEMPOS = {};
  C.cobertura.tiempos.valor.split('.').forEach(function (s) { var m = s.split(':'); if (m[1]) TIEMPOS[m[0].trim()] = m[1].trim().replace(/ (h|días)/, NB + '$1'); });
  var regionDe = function (c) { return c.costa ? 'Costa Caribe' : 'Resto del país'; };
  var tiempoDe = function (c) { return TIEMPOS[regionDe(c)] || 'por confirmar'; };
  var MAPA_D = 'M122.08 5.44L127.68 15.2L114.72 23.04L111.2 29.6L102.4 37.6L100.48 48L95.2 56.8L101.6 60L110.4 67.2L109.28 78.4L109.6 87.2L120 92L132.8 92L147.2 93.6L159.2 100L161.6 105.6L189.12 105.76L183.68 116.8L183.2 132.8L187.2 142.4L191.2 152L194.4 161.6L196 171.2L198.88 185.28L182.4 176.8L177.6 172.8L158.4 177.6L151.2 187.68L148 195.2L148 203.2L155.2 208L157.6 222.4L149.6 272.48L143.2 266.4L137.6 252.8L133.6 240.8L123.2 243.2L113.6 235.2L97.6 225.6L84.8 217.6L72 208L64 203.2L48 200L35.2 197.6L26.4 191.52L17.6 187.2L7.2 181.92L8 176L15.2 164.8L22.4 163.2L28 155.2L35.2 142.72L30.4 136L30.4 124.8L29.6 115.2L29.6 105.6L25.6 96L22.56 89.44L32 78.4L30.88 65.92L35.2 70.4L37.6 77.6L41.12 75.2L40.32 69.92L45.92 63.2L53.6 54.4L59.2 53.6L59.52 46.4L60 38.4L65.6 32L71.2 27.2L79.2 28.8L81.6 24.8L92.8 24L102.4 20L108.8 16L114.4 9.6Z';

  /* ---------- Nosotros ---------- */
  var MARCAS_HTML = '<ul class="marcas-lista">' +
    '<li><div class="marca-foto"><img src="img/r-cantaro-entera-500g.webp" alt="Bolsa de The Cántaro Entera de 500 g, frente" width="254" height="360" loading="lazy" decoding="async"></div><h3>The Cántaro</h3><p>Leche en polvo entera, descremada y azucarada, y mezcla láctea. De 380' + NB + 'g a 25' + NB + 'kg.</p><a class="enlace" href="#productos~marca-the-cantaro">Ver The Cántaro</a></li>' +
    '<li><div class="marca-foto"><img src="img/r-becerrita-entera-900g.webp" alt="Bolsa de La Becerrita Entera de 900 g, frente" width="236" height="360" loading="lazy" decoding="async"></div><h3>La Becerrita</h3><p>Leche en polvo entera de 380 a 900' + NB + 'g y mezcla láctea en bulto de 25' + NB + 'kg.</p><a class="enlace" href="#productos~marca-la-becerrita">Ver La Becerrita</a></li>' +
    '<li><div class="marca-foto"><div class="su-marca" aria-hidden="true">' + silueta('bolsa', 20, 29, true) + '<span>Su marca</span></div></div><h3>Su marca</h3><p>Empacamos con la marca de su cadena, en 12 presentaciones de 27' + NB + 'g a 25' + NB + 'kg.</p><a class="enlace" href="#marca-propia">Ver marca propia</a></li></ul>';

  function vistaNosotros() {
    var r18 = REG['RSA-006359-2018'];
    var datos = '<dl class="datos-empresa">' + [
      ['Razón social', esc(E.razon_social)], ['NIT', E.nit], ['Planta', 'Parque Industrial Europark, Km 1 vía a Turbaco'],
      ['Personas', E.empleados.valor + ' ' + aconf()],
    ].map(function (d) { return '<div><dt>' + d[0] + '</dt><dd>' + d[1] + '</dd></div>'; }).join('') + '</dl>';
    var hitos = [
      ['2011', 'Se constituye Inversiones Mundilácteos S.A.S. en el área metropolitana de Cartagena.', 'Fuentes: EMIS, 30/12/2011; LinkedIn, 2010. ' + aconf()],
      ['2017', 'Registro Invima RSA-003008-2017 para mezclas en polvo a base de leche y endulzantes para preparar bebidas.', ''],
      ['2018', 'Registro Invima RSA-006359-2018 para leche en polvo entera, descremada, fortificada y azucarada. Hoy ampara más de 15 marcas, entre ellas The Cántaro, La Becerrita y marcas propias de cadenas.', 'Vigente hasta el ' + fechaLarga(r18.vence) + '.'],
      ['2022', 'The Cántaro y La Becerrita en bolsas de 380 a 900' + NB + 'g, y marcas propias para cadenas del país.', 'Según las fotos de empaque de ese año.'],
      ['2023', 'Registro Invima RSA-0027065-2023 para empacar leche en polvo entera y descremada.', ''],
      ['2025', 'Dos registros nuevos: alimento lácteo en polvo y mezcla láctea en polvo con café instantáneo, endulzada con panela.', 'RSA-0036572-2025 y RSA-0037312-2025.'],
    ];
    var sinAnio = ['Planta en el Parque Industrial Europark', 'Lanzamiento de The Cántaro', 'Lanzamiento de La Becerrita', 'Certificación ISO 9001:2015'];
    var historia = '<ol class="linea-tiempo">' + hitos.map(function (h) {
      return '<li><span class="lt-anio">' + h[0] + '</span><div><p>' + h[1] + '</p>' + (h[2] ? '<p class="meta">' + h[2] + '</p>' : '') + '</div></li>';
    }).join('') + '</ol>' +
      '<h3 class="lt-sub">Hitos sin año confirmado</h3><ul class="linea-tiempo linea-tiempo--pend">' + sinAnio.map(function (t) {
        return '<li><span class="lt-anio lt-anio--pend" aria-hidden="true">20__</span><div><p>' + t + '<span class="sr">, año por confirmar</span></p></div></li>';
      }).join('') + '</ul><p class="meta lt-nota">Los años de 2017 a 2025 salen del número de cada registro en el Invima. Años sin fecha ' + aconf() + '</p>';

    var familia = '<div class="dos-cols"><div class="texto"><p>Mundilácteos es una empresa familiar de Cartagena. Esta sección presenta a la familia fundadora con su nombre, una foto real y una cita firmada: cuándo empezó y por qué eligió empacar leche en polvo.</p>' +
      '<p>' + aconf('fundadores, año y motivo: dato a confirmar') + '</p>' +
      '<figure class="cita-pend"><blockquote><p>Cita por recoger: una frase de la familia fundadora sobre por qué empezó a empacar leche en polvo en Cartagena.</p></blockquote><figcaption>Nombre y cargo de quien firma ' + aconf() + '</figcaption></figure></div>' +
      htmlToma('O06', '4 / 5', 'Retrato de la familia fundadora en la planta, a la altura de los ojos.') + '</div>';

    var planta = '<div class="dos-cols"><div class="texto">' + tablaDatos([
      ['Dirección', esc(E.direccion)],
      ['Ubicación', esc(E.municipio)],
      ['Concepto sanitario', 'FAVORABLE del INVIMA para la línea de leches en polvo y crema de leches en polvo. ' + ext(INV.fuente, 'Ver en datos.gov.co')],
      ['Área de la planta', aconf()],
      ['Capacidad de empaque', aconf()],
    ], 'Datos de la planta') +
      acciones('<a class="enlace" href="' + MAPS_PLANTA + '" target="_blank" rel="noopener">Cómo llegar<span class="sr"> (abre Google Maps)</span></a><a class="enlace" href="#calidad">Ver calidad y certificaciones</a>') + '</div>' +
      '<div class="tomas-par">' + htmlToma('O07', '3 / 2') + tomaExtra('O01') + '</div></div>';

    var equipo = '<div class="texto"><p>' + E.empleados.valor + ' personas trabajan en Mundilácteos ' + aconf('fuente secundaria, La República, 2025: dato a confirmar') + '. Son quienes reciben, empacan, sellan y despachan cada bolsa desde Europark.</p>' +
      '<p>Los retratos de los asesores comerciales, con su nombre, llegan con la toma O06 y se publican también en <a href="#contacto">Contacto</a>.</p></div>' +
      '<div class="fotos-par">' +
      foto('equipo-evento-a.webp', 'Parte del equipo de Mundilácteos, con camisetas de La Becerrita, en una celebración de diciembre', 606, 404, 'Parte del equipo en la celebración de diciembre. Foto del cliente.') +
      foto('equipo-evento-b.webp', 'Siete personas del equipo de Mundilácteos, con camisetas de La Becerrita, en la misma celebración', 622, 415, 'En la misma celebración. Foto del cliente.') + '</div>';

    var valores = '<table class="planilla-razones"><caption class="sr">Valores de Mundilácteos y la evidencia de cada uno</caption><thead class="sr"><tr><th scope="col">Valor</th><th scope="col">Evidencia</th></tr></thead><tbody>' + [
      ['Pesamos lo que dice la etiqueta', 'Cada bolsa se pesa en la línea de empaque contra el peso neto impreso. ' + aconf('registro de pesaje por lote: dato a confirmar')],
      ['Cada bolsa lleva su lote', 'Lote y fecha de vencimiento impresos en cada bolsa. <a href="#calidad~lote">Cómo leer el lote</a>'],
      ['Respondemos en un día hábil', 'Compromiso de respuesta a cada cotización ' + aconf()],
      ['Trabajamos desde Cartagena', 'Planta en Europark, empleo local y despacho desde la Costa a toda Colombia. <a href="#distribucion">Ver distribución</a>'],
    ].map(function (f) { return '<tr><th scope="row">' + f[0] + '</th><td>' + f[1] + '</td></tr>'; }).join('') + '</tbody></table>';

    montar('<div class="envoltura pagina">' +
      cabecera('Nosotros', 'Somos una empresa familiar de Cartagena que empaca leche en polvo desde 2011. ' + aconf(), datos, null, 'pagina-cab--dos') +
      foto('equipo-planta.webp', 'El equipo de Mundilácteos, con camisetas verdes de La Becerrita, frente a la planta y a la estatua de una vaca', 900, 466,
        'El equipo frente a la planta del Parque Industrial Europark. Foto del cliente, de baja resolución: la reemplaza la toma O06.', 'foto--equipo') +
      bloque('historia', 'Historia', historia) +
      bloque('familia', 'La familia', familia) +
      bloque('planta', 'La planta', planta) +
      bloque('equipo', 'El equipo', equipo) +
      bloque('valores', 'Valores en la práctica', '<p class="bloque-intro">Cada valor, con lo que lo demuestra.</p>' + valores) +
      bloque('marcas', 'Nuestras marcas', MARCAS_HTML + '<p class="bloque-pie"><a class="enlace" href="#por-que-elegirnos">Ver por qué elegirnos</a></p>') +
      '</div>');
    return 'Nosotros';
  }

  /* ---------- Calidad ---------- */
  var PASOS_EMPAQUE = [
    ['Recepción', 'Cada ingreso de materia prima queda registrado con su lote.'],
    ['Análisis', 'Se verifica antes de empacar.'],
    ['Empaque y pesaje', 'Cada bolsa se pesa contra lo que dice la etiqueta.'],
    ['Sellado, lote y vencimiento', 'Bolsa laminada, termosellada en atmósfera controlada de CO₂, con lote y vencimiento impresos.'],
    ['Despacho', 'Pacas y bultos salen de Europark hacia toda Colombia.'],
  ];
  function tomaAnotada() {
    return htmlToma('F02', '4 / 5', 'Reverso de la bolsa con el lote (1) y la fecha de vencimiento (2) señalados.',
      '<span class="toma-marca" style="--mx:62%;--my:30%">1</span><span class="toma-marca" style="--mx:62%;--my:46%">2</span>');
  }
  function vistaCalidad() {
    var fav = '<div class="prueba"><h3>Concepto sanitario del INVIMA</h3>' + estado('ok', 'Verificado en datos.gov.co el ' + FECHA_DATOS) +
      '<p class="prueba-valor">FAVORABLE</p>' +
      tablaDatos([['Establecimiento', esc(E.razon_social) + ', NIT ' + E.nit], ['Línea', 'Leches en polvo y crema de leches en polvo'], ['Estado', 'Activo']], 'Concepto sanitario del establecimiento') +
      '<p>' + ext(INV.fuente, 'Ver el concepto en datos.gov.co') + '</p></div>';
    var iso = '<div class="prueba prueba--pend"><h3>ISO 9001:2015</h3>' + estado('pend', 'Por confirmar: no se muestra como sello') +
      '<p>Declarada en el sitio actual de Mundilácteos. Se publica como certificación cuando el certificado esté a la vista.</p>' +
      tablaDatos([['Organismo certificador', aconf()], ['Número de certificado', aconf()], ['Alcance', aconf()], ['Vigencia', aconf()], ['Certificado en PDF', 'Se publica con el certificado']], 'Datos del certificado ISO 9001:2015') + '</div>';
    var regs = '<table class="tabla tabla-registros tabla-apila"><caption class="sr">Registros sanitarios Invima de Mundilácteos, con lo que ampara cada uno</caption>' +
      '<thead><tr><th scope="col">Registro</th><th scope="col">Qué ampara</th><th scope="col">Modalidad</th><th scope="col">Vence</th><th scope="col">Productos en este sitio</th></tr></thead><tbody>' +
      C.calidad.registros.map(function (r) {
        var ps = prodsDe(r.numero);
        return '<tr><th scope="row"><span class="cifra">' + r.numero + '</span>' + estado('ok', r.estado) + '</th><td data-etiqueta="Qué ampara">' + esc(r.producto) + '</td>' +
          '<td data-etiqueta="Modalidad">' + esc(r.modalidad) + '</td><td data-etiqueta="Vence" class="cifra">' + fechaNum(r.vence) + '</td>' +
          '<td data-etiqueta="Productos en este sitio">' + (ps.length ? ps.map(enlaceProd).join(', ') : '<span class="tenue">Sin referencias publicadas</span>') + '</td></tr>';
      }).join('') + '</tbody></table>' +
      '<p class="meta bloque-pie">Datos tomados de los registros del Invima publicados en datos.gov.co el ' + FECHA_DATOS + '.</p>' +
      acciones(ext(URL_INVIMA, 'Consultar un registro en el Invima', '(abre el sitio del Invima)'));
    var empaque = '<div class="dos-cols">' + pasos(PASOS_EMPAQUE) + '<div class="tomas-par">' + htmlToma('O02', '3 / 2') + tomaExtra('O03') + '</div></div>' +
      '<p class="meta bloque-pie">Controles de cada paso por validar con la planta ' + aconf() + '</p>';
    var lote = '<div class="dos-cols"><div class="texto"><p class="entradilla">Cada bolsa lleva impresos el lote y la fecha de vencimiento. La vida útil es de ' + C.calidad.vida_util_meses + ' meses, según la ficha técnica.</p>' +
      '<ol class="lista-num"><li><p><strong>Lote.</strong> Identifica la tanda de empaque. Téngalo a mano si va a escribirnos por un reclamo.</p></li>' +
      '<li><p><strong>Fecha de vencimiento.</strong> Consuma el producto antes de esa fecha y guarde la bolsa cerrada, en un lugar seco y a la sombra. ' + aconf() + '</p></li></ol>' +
      '<p class="meta">Ubicación y formato del código en cada empaque ' + aconf() + '</p>' +
      '<h3>Trazabilidad por lote</h3><p>Con el lote, la planta ubica la fecha de empaque de la bolsa y los registros de esa tanda: materia prima, análisis y despacho. ' + aconf('procedimiento: dato a confirmar') + '</p>' +
      '<p><a class="enlace" href="#contacto~motivo-pqr">Escribir un reclamo con el lote</a></p></div>' + tomaAnotada() + '</div>';
    var materiales = tablaDatos([
      [icono('p-bolsa', 'picto') + '<span>Bolsa</span>', esc(C.calidad.empaque.bolsa)],
      [icono('p-bolsa', 'picto') + '<span>Paca</span>', esc(C.calidad.empaque.caja.valor) + ' ' + aconf()],
      [icono('p-bulto', 'picto') + '<span>Bulto</span>', esc(C.calidad.empaque.bulto)],
      ['<span>Vida útil</span>', C.calidad.vida_util_meses + ' meses, según la ficha técnica'],
      ['<span>Almacenamiento</span>', 'Cerrada, en un lugar seco y a la sombra ' + aconf()],
    ], 'Materiales de empaque y conservación', 'tabla-empaque');
    var controles = '<div class="dos-cols"><div class="texto"><p>Solo publicamos los análisis que podamos sustentar con resultados. Método, frecuencia y límites de cada uno ' + aconf() + '</p>' +
      '<ul class="lista-controles">' + ['Humedad', 'Grasa', 'Proteína', 'Análisis microbiológicos'].map(function (t) { return '<li><span>' + t + '</span>' + estado('pend') + '</li>'; }).join('') + '</ul></div>' +
      htmlToma('M03', '1 / 1') + '</div>';
    var fichas = '<ul class="lista-articulos lista-docs">' + C.productos.map(function (p) {
      return '<li><a href="#producto-' + p.slug + '">' + esc(p.nombre) + '<span class="sr">: ficha técnica</span></a><span class="art-datos">Ficha técnica en HTML. ' + aconf('PDF por publicar') + '</span></li>';
    }).join('') + '</ul>';
    var pqr = '<section class="bloque" aria-labelledby="t-pqr"><div class="panel-film"><h2 id="t-pqr">¿Encontró un problema con un producto?</h2><p>Tenga a mano el lote y escríbanos. Respondemos en horario de atención.</p>' +
      acciones('<a class="boton" href="#contacto~motivo-pqr">Escribir una petición, queja o reclamo</a>' + waEnlace('Hola, quiero reportar un problema con un producto. Lote: ', 'WhatsApp:')) + '</div></section>';
    montar('<div class="envoltura pagina">' +
      cabecera('Calidad y certificaciones', 'Cada bolsa lleva impresos el lote y la fecha de vencimiento. Aquí están los certificados y registros que lo respaldan.', LEYENDA_ESTADOS) +
      bloque('certificaciones', 'Certificaciones', '<div class="pruebas">' + fav + iso + '</div>') +
      bloque('registros', 'Registros sanitarios Invima', regs) +
      bloque('empaque', 'Así empacamos cada bolsa', empaque) +
      bloque('lote', 'Lote, vencimiento y trazabilidad', lote) +
      bloque('materiales', 'Empaque y conservación', materiales) +
      bloque('controles', 'Qué controlamos', controles) +
      bloque('fichas', 'Fichas técnicas', '<p class="bloque-intro">La ficha técnica de cada producto está en HTML, dentro de su página. El PDF será una copia de esa tabla.</p>' + fichas) +
      pqr + '</div>');
    return 'Calidad y certificaciones';
  }

  /* ---------- Por qué elegirnos ---------- */
  function vistaPorQue() {
    var vence = C.calidad.registros.map(function (r) { return +r.vence.slice(0, 4); });
    var enLinea = ['Megatiendas', 'Carulla', 'Éxito'].filter(function (c) { return DONDE[c]; });
    var tabla = function (arr, cap, pend) {
      return '<table class="planilla-razones planilla-razones--prueba' + (pend ? ' planilla-razones--pend' : '') + '"><caption class="sr">' + cap + '</caption>' +
        '<thead class="sr"><tr><th scope="col">Hecho</th><th scope="col">Prueba</th></tr></thead><tbody>' +
        arr.map(function (f) { return '<tr><th scope="row">' + f[0] + '</th><td><span class="pruebas-enlaces">' + f[1] + '</span></td></tr>'; }).join('') + '</tbody></table>';
    };
    var ok = [
      ['Concepto sanitario FAVORABLE del INVIMA para la línea de leches en polvo y crema de leches en polvo', ext(INV.fuente, 'Ver el concepto en datos.gov.co')],
      [C.calidad.registros.length + ' registros sanitarios Invima vigentes, hasta ' + Math.min.apply(null, vence) + ' y ' + Math.max.apply(null, vence), ext(URL_INVIMA, 'Consultar en el Invima') + '<a href="#calidad~registros">Ver la tabla de registros</a>'],
      ['The Cántaro publicado en línea en ' + lista(enLinea), enLinea.map(function (c) { return ext(DONDE[c][0].url, 'Ver en ' + c); }).join('')],
      ['El registro RSA-006359-2018 ampara más de 15 marcas, entre ellas marcas propias de cadenas del país', '<a href="#marca-propia">Ver marca propia</a>'],
      ['Planta en el Parque Industrial Europark, Km 1 vía a Turbaco', '<a href="#nosotros~planta">Ver la planta</a>'],
      ['Lote y vencimiento impresos en cada bolsa', '<a href="#calidad~lote">Cómo leer el lote</a>'],
      ['12 presentaciones empacadas en planta, de 27' + NB + 'g a 25' + NB + 'kg', '<a href="#articulo-guia-presentaciones">Ver la guía de presentaciones</a>'],
      ['Bultos de 12,5 y 25' + NB + 'kg con bolsa interna y saco kraft de triple capa', '<a href="#productos~formato-bulto">Ver bultos</a>'],
    ];
    var pend = [
      ['Más de 11 años empacando leche en polvo', 'Constitución en 2011, según EMIS ' + aconf()],
      ['ISO 9001:2015', 'Organismo, número, alcance y vigencia del certificado ' + aconf()],
      ['Pacas de 12 a 300 unidades', 'Unidades por paca publicadas por gramaje ' + aconf() + '<a href="#productos~formato-bolsa">Ver pacas</a>'],
      ['Bulto de 5' + NB + 'kg', 'Presentación en marcas de la casa ' + aconf()],
      ['Despacho a toda Colombia desde Cartagena', 'Tiempos por región y pedido mínimo ' + aconf() + '<a href="#distribucion">Ver tiempos por ciudad</a>'],
      ['Respuesta de cotización en un día hábil', 'Compromiso según el horario de atención ' + aconf()],
    ];
    var testimonios = '<ul class="pendientes">' + [
      ['Testimonio 1', 'Tendero o tendera de Cartagena que compre por pacas.'],
      ['Testimonio 2', 'Panadería de Barranquilla que compre bultos.'],
      ['Testimonio 3', 'Cadena con marca propia, solo con su autorización escrita.'],
    ].map(function (t) { return '<li class="pendiente"><p class="pendiente-cod">' + t[0] + '</p><p>' + t[1] + '</p><p class="meta">Nombre, negocio, ciudad y autorización firmada.</p></li>'; }).join('') + '</ul>';
    montar('<div class="envoltura pagina">' +
      cabecera('Por qué elegirnos', 'Cada razón viene con su prueba. Si algo no se puede verificar, no lo decimos.', LEYENDA_ESTADOS) +
      bloque('comprobable', 'Lo que puede comprobar hoy', tabla(ok, 'Razones con prueba verificable', false)) +
      bloque('por-confirmar', 'Por confirmar antes de publicar', '<p class="bloque-intro">El prototipo las muestra para que Mundilácteos las valide. En el sitio publicado solo quedan las que tengan prueba.</p>' + tabla(pend, 'Razones que falta confirmar', true)) +
      bloque('testimonios', 'Testimonios', '<p class="bloque-intro">Solo publicaremos testimonios reales, con nombre, negocio, ciudad y autorización firmada. Ninguno es inventado.</p>' + testimonios) +
      '<div class="cierre">' + acciones('<a class="boton" href="#cotizar">Cotizar por volumen</a>' + waEnlace(MSJ_GENERAL, 'Escribir a un asesor al')) + '</div></div>');
    return 'Por qué elegirnos';
  }

  /* ---------- Distribución ---------- */
  function htmlPanelCiudad(c) {
    if (!c) return '<p class="panel-ciudad-titulo">Elija su ciudad</p><p>Toque un punto del mapa o una ciudad de la tabla.</p>';
    return '<p class="panel-ciudad-titulo">' + c.n + (c.planta ? ': aquí está la planta' : '') + '</p>' +
      '<p>' + (c.planta ? 'Parque Industrial Europark, a 1' + NB + 'km de Cartagena. ' : '') + 'Entrega en ' + tiempoDe(c) + ' desde la confirmación. ' + aconf() + '</p>' +
      '<p>Pedido mínimo: ' + esc(C.cobertura.pedido_minimo.valor.replace(/\.$/, '').toLowerCase()) + '. Días de despacho ' + aconf() + '</p>' +
      '<p><a class="boton" href="#cotizar~ciudad-' + c.s + '">Cotizar para ' + c.n + '</a></p>';
  }
  function elegirCiudad(s, desdeUsuario) {
    var c = CIUDAD[s]; if (!c) return;
    $$('[data-ciudad]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-ciudad') === s)); });
    $$('[data-fila-ciudad]').forEach(function (tr) { tr.classList.toggle('es-elegida', tr.getAttribute('data-fila-ciudad') === s); });
    $$('[data-ciudad-rotulo]').forEach(function (r) { r.classList.toggle('es-elegida', r.getAttribute('data-ciudad-rotulo') === s); });
    var p = $('#panel-ciudad');
    if (p) {
      p.innerHTML = htmlPanelCiudad(c);
      if (desdeUsuario && !reducido()) { p.classList.remove('cambia'); void p.offsetWidth; p.classList.add('cambia'); }
    }
    if (desdeUsuario) { try { history.replaceState(null, '', '#distribucion~ciudad-' + s); } catch (e) { /* sin historial */ } ultimoHash = location.hash; }
  }
  function vistaDistribucion(tokens) {
    var sel = 'monteria';
    tokens.forEach(function (t) { if (t.indexOf('ciudad-') === 0 && CIUDAD[t.slice(7)]) sel = t.slice(7); });
    var pc = function (v, tot) { return Math.round(v / tot * 10000) / 100; };
    var mapa = '<div class="mapa-col"><div class="mapa-dist" role="group" aria-labelledby="t-mapa-dist"><p class="sr" id="t-mapa-dist">Mapa lineal de Colombia con Cartagena y las ciudades de despacho. Elija una ciudad para ver el tiempo de entrega.</p>' +
      '<svg viewBox="0 0 204 277" aria-hidden="true" focusable="false"><path class="mapa-contorno" d="' + MAPA_D + '"/></svg>' +
      CIUDADES.map(function (c) {
        var st = ' style="--x:' + pc(c.x, 204) + ';--y:' + pc(c.y, 277) + '"';
        return '<button type="button" class="mapa-boton' + (c.planta ? ' mapa-boton--planta' : '') + '"' + st + ' data-ciudad="' + c.s + '" aria-pressed="false" aria-label="' + c.n + (c.planta ? ', planta' : '') + ': ver tiempo de entrega"></button>' +
          '<span class="mapa-rotulo mapa-rotulo--' + c.lado + '"' + st + ' data-ciudad-rotulo="' + c.s + '" aria-hidden="true">' + c.n + '</span>';
      }).join('') + '</div><ul class="mapa-leyenda" aria-hidden="true"><li><span class="mapa-muestra mapa-muestra--planta"></span>Planta en Cartagena</li><li><span class="mapa-muestra"></span>Ciudad de despacho</li></ul></div>';
    var tabla = '<table class="tabla tabla-dist"><caption class="sr">Tiempo de entrega desde la confirmación y pedido mínimo, por ciudad. Es la alternativa al mapa.</caption>' +
      '<thead><tr><th scope="col">Ciudad</th><th scope="col" class="col-region">Región</th><th scope="col">Entrega</th><th scope="col">Pedido mínimo</th></tr></thead><tbody>' +
      CIUDADES.map(function (c) {
        return '<tr data-fila-ciudad="' + c.s + '"><th scope="row"><button type="button" class="ciudad-boton" data-ciudad="' + c.s + '" aria-pressed="false">' + c.n + '</button></th>' +
          '<td class="col-region">' + regionDe(c) + '</td><td>' + tiempoDe(c) + '</td><td class="tenue">Por confirmar</td></tr>';
      }).join('') + '</tbody></table><p class="meta">Ciudades de ejemplo. Tiempos por región, pedido mínimo y días de despacho ' + aconf() + '</p>';
    var llega = pasos([
      ['Solicitud', 'Usted arma su cotización en pacas y bultos y la envía por el sitio o por WhatsApp.'],
      ['Confirmación de precio y fecha', 'Un asesor le confirma el precio, la fecha de entrega y las condiciones.'],
      ['Despacho', 'El pedido sale del Parque Industrial Europark hacia su ciudad.'],
      ['Entrega con factura', 'Recibe sus pacas y bultos con la factura.'],
    ]);
    var distribuidor = '<section class="bloque" id="s-distribuidor" aria-labelledby="t-distribuidor"><div class="zona-negocio bloque-negocio"><div class="dos-cols"><div class="texto">' +
      '<h2 id="t-distribuidor">Sea distribuidor</h2><p>¿Tiene una distribuidora o un depósito y quiere llevar The Cántaro y La Becerrita a su zona? Escríbanos y le contamos las condiciones.</p>' +
      '<p>Zonas disponibles, volumen mínimo y condiciones comerciales ' + aconf() + '</p>' +
      acciones('<a class="boton" href="#contacto~motivo-distribuidor">Quiero ser distribuidor</a>' + waEnlace('Hola, quiero ser distribuidor de The Cántaro y La Becerrita. Mi ciudad es: ', 'WhatsApp:')) +
      '</div>' + htmlToma('O04', '3 / 2') + '</div></div></section>';
    montar('<div class="envoltura pagina">' +
      cabecera('Distribución', 'Despachamos desde Cartagena a toda Colombia. Elija su ciudad para ver el tiempo de entrega y el pedido mínimo.') +
      '<section class="bloque bloque--primero" aria-labelledby="t-cobertura"><h2 id="t-cobertura" class="sr">Cobertura por ciudad</h2><div class="dist-grid">' +
      mapa + '<div class="panel-ciudad" id="panel-ciudad" aria-live="polite"></div><div class="dist-tabla">' + tabla + '</div></div>' +
      '<p class="dist-falta">¿Su ciudad no está? Escríbanos y le decimos cómo llegar. ' + waEnlace('Hola, quiero saber si despachan a mi ciudad: ', 'WhatsApp:') + '</p></section>' +
      bloque('llega', 'Cómo llega su pedido', '<div class="dos-cols">' + llega + htmlToma('O05', '3 / 2') + '</div>') +
      distribuidor +
      '<p class="linea-casa">¿Es para su casa? <a href="#donde-comprar">Dónde comprar</a></p></div>');
    elegirCiudad(sel, false);
    return 'Distribución';
  }

  /* ---------- Dónde comprar ---------- */
  var CADENAS = C.canales.map(function (c) { return { c: c, costa: c.region === 'Costa Caribe', pend: /confirmar|sin productos/.test(c.estado), prods: DONDE[c.nombre] || [] }; });
  function htmlCadena(k, ciudad) {
    var c = k.c, enl = [];
    if (c.url) enl.push(ext(c.url, 'Ir a ' + c.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')));
    if (c.url && c.tipo !== 'Domicilios') enl.push(ext('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(c.nombre + ' ' + (ciudad ? ciudad.n : 'Costa Caribe')), 'Buscar tiendas en el mapa', '(abre Google Maps)'));
    return '<li class="tienda' + (k.pend ? ' tienda--pend' : '') + '"><div class="tienda-cab"><h3>' + esc(c.nombre) + '</h3><p class="meta">' + esc(c.tipo) + '. ' + esc(c.region) + '.</p></div>' +
      '<p>' + (k.prods.length ? 'The Cántaro en línea: ' + k.prods.map(function (p) { return ext(p.url, esc(p.t)); }).join(', ') + '.' : esc(c.estado.replace(/;?\s*por confirmar$/, '')) + (k.pend ? ' ' + aconf() : '.')) + '</p>' +
      (enl.length ? '<p class="tienda-enlaces">' + enl.join('') + '</p>' : '') + '</li>';
  }
  var SIN_COBERTURA = '<p class="sin-cobertura">¿Quiere llevar The Cántaro y La Becerrita a su zona? <a href="#distribucion~distribuidor">Sea distribuidor</a></p>';
  function htmlDonde(c, q) {
    var costa = CADENAS.filter(function (k) { return k.costa; }), resto = CADENAS.filter(function (k) { return !k.costa; });
    var ul = function (arr) { return '<ul class="tiendas">' + arr.map(function (k) { return htmlCadena(k, c); }).join('') + '</ul>'; };
    if (!c && !q) return '<h2>En la Costa Caribe</h2>' + ul(costa) + '<h2>En todo el país</h2>' + ul(resto);
    if (!c) return '<h2>No tenemos puntos confirmados en «' + esc(q) + '»</h2><p class="donde-intro">Estas cadenas publican The Cántaro en todo el país. Revise su sitio o escríbanos y le decimos dónde.</p>' + ul(resto) + SIN_COBERTURA;
    return '<h2>Dónde encontrar The Cántaro en ' + c.n + '</h2>' + ul((c.costa ? costa : []).concat(resto)) + (c.costa ? '' : SIN_COBERTURA);
  }
  function pintarDonde(c, q, aviso) {
    var res = $('#donde-res'); if (!res) return;
    res.innerHTML = htmlDonde(c, q);
    var n = (c ? (c.costa ? CADENAS.length : CADENAS.filter(function (k) { return !k.costa; }).length) : (q ? CADENAS.filter(function (k) { return !k.costa; }).length : CADENAS.length));
    $('#donde-estado').textContent = aviso || (c ? n + ' ' + plural(n, 'lugar', 'lugares') + ' para ' + c.n + '.' : q ? 'Sin puntos confirmados en «' + q + '».' : '');
  }
  function buscarCiudad(q) {
    var n = norm(q).trim(); if (!n) return null;
    return CIUDADES.filter(function (c) { return norm(c.n) === n; })[0] || CIUDADES.filter(function (c) { return norm(c.n).indexOf(n) === 0; })[0] || null;
  }
  function buscarDonde() {
    var q = $('#donde-ciudad').value.trim();
    var c = buscarCiudad(q);
    try { history.replaceState(null, '', '#donde-comprar' + (c ? '~ciudad-' + c.s : '')); } catch (e) { /* sin historial */ }
    ultimoHash = location.hash;
    if (c) $('#donde-ciudad').value = c.n;
    pintarDonde(c, q);
  }
  function usarUbicacion() {
    var est = $('#donde-estado');
    var falla = function () { est.textContent = 'No pudimos usar su ubicación. Escriba su ciudad.'; $('#donde-ciudad').focus(); };
    try {
      if (!navigator.geolocation) { falla(); return; }
      est.textContent = 'Buscando su ubicación.';
      navigator.geolocation.getCurrentPosition(function (pos) {
        var la = pos.coords.latitude, lo = pos.coords.longitude, rad = Math.PI / 180;
        var dist = function (c) {
          var a = Math.pow(Math.sin((c.lat - la) * rad / 2), 2) + Math.cos(la * rad) * Math.cos(c.lat * rad) * Math.pow(Math.sin((c.lon - lo) * rad / 2), 2);
          return 12742 * Math.asin(Math.sqrt(a));
        };
        var c = CIUDADES.slice().sort(function (a, b) { return dist(a) - dist(b); })[0];
        var km = Math.round(dist(c));
        $('#donde-ciudad').value = c.n;
        try { history.replaceState(null, '', '#donde-comprar~ciudad-' + c.s); } catch (e) { /* */ }
        ultimoHash = location.hash;
        pintarDonde(c, c.n, 'La ciudad más cercana de la lista es ' + c.n + (km > 30 ? ', a ' + fmtNum(km, 0) + NB + 'km.' : '.'));
      }, falla, { timeout: 8000, maximumAge: 600000 });
    } catch (e) { falla(); }
  }
  function vistaDonde(tokens) {
    var c = null;
    tokens.forEach(function (t) { if (t.indexOf('ciudad-') === 0 && CIUDAD[t.slice(7)]) c = CIUDAD[t.slice(7)]; });
    var form = '<form class="buscar-ciudad" id="form-donde" role="search" aria-label="Buscar por ciudad" novalidate><label for="donde-ciudad">Su ciudad</label>' +
      '<div class="buscar-ciudad-fila"><input id="donde-ciudad" type="text" list="donde-ciudades" autocomplete="address-level2" value="' + (c ? c.n : '') + '"><button type="submit" class="boton">Buscar</button></div>' +
      '<datalist id="donde-ciudades">' + CIUDADES.map(function (x) { return '<option value="' + x.n + '"></option>'; }).join('') + '</datalist>' +
      '<button type="button" class="enlace-boton" data-ubicacion>' + icono('i-ubicacion') + 'Usar mi ubicación</button><p class="meta" id="donde-estado" aria-live="polite"></p></form>';
    montar('<div class="envoltura pagina">' +
      cabecera('Dónde comprar', 'Encontramos The Cántaro publicado en Megatiendas, Éxito, Carulla y Rappi. Busque su ciudad para ver dónde comprar.') +
      '<section class="bloque bloque--primero" aria-labelledby="t-donde"><h2 id="t-donde" class="sr">Buscar por ciudad</h2><div class="dos-cols dos-cols--ancha"><div class="donde-col">' + form +
      '<div class="donde-res" id="donde-res"></div><p class="meta">Cobertura de cada cadena por ciudad y puntos de venta de La Becerrita ' + aconf() + '</p>' +
      '<p class="donde-ayuda">¿No la encuentra? Escríbanos y le decimos dónde. ' + waEnlace('Hola, no encuentro The Cántaro en mi ciudad. Mi ciudad es: ', 'WhatsApp:') + '</p></div>' +
      '<div class="tomas-par">' + htmlToma('C03', '3 / 2') + tomaExtra('C04') + '</div></div></section>' +
      '<section class="bloque" aria-labelledby="t-tienda"><div class="zona-negocio bloque-negocio bloque-negocio--linea"><div><h2 id="t-tienda">¿Tiene una tienda?</h2><p>Cotice por pacas de 12 a 30 bolsas, o por bultos si tiene panadería.</p></div>' +
      acciones('<a class="boton" href="#cotizar">Cotizar por volumen</a><a class="enlace" href="#productos~formato-bolsa">Ver pacas</a>') + '</div></section></div>');
    pintarDonde(c, c ? c.n : '');
    return 'Dónde comprar';
  }

  /* ---------- Formularios genéricos (Contacto y Marca propia) ---------- */
  function campo(f, k, etq, o) {
    o = o || {};
    var id = f + '-' + k, desc = [];
    if (o.ayuda) desc.push(id + '-ayuda');
    desc.push(id + '-error');
    var at = ' id="' + id + '" name="' + k + '" aria-describedby="' + desc.join(' ') + '"' + (o.auto ? ' autocomplete="' + o.auto + '"' : '') + (o.modo ? ' inputmode="' + o.modo + '"' : '') + (o.lista ? ' list="' + o.lista + '"' : '');
    var ctl;
    if (o.area) ctl = '<textarea' + at + ' rows="4"></textarea>';
    else if (o.ops) ctl = '<select' + at + '><option value="">Elija una opción</option>' + o.ops.map(function (op) { return '<option value="' + op[0] + '"' + (o.valor === op[0] ? ' selected' : '') + '>' + op[1] + '</option>'; }).join('') + '</select>';
    else ctl = '<input type="' + (o.tipo || 'text') + '"' + at + '>';
    return '<div class="campo' + (o.corto ? ' campo--corto' : '') + '" data-campo="' + k + '"' + (o.oculto ? ' hidden' : '') + '><label for="' + id + '">' + etq + (o.opcional ? ' <span class="opcional">(opcional)</span>' : '') + '</label>' + ctl +
      (o.ayuda ? '<p class="ayuda" id="' + id + '-ayuda">' + o.ayuda + '</p>' : '') + '<p class="error-campo" id="' + id + '-error" hidden></p></div>';
  }
  function casillaDatos(f) {
    return '<div class="campo" data-campo="datos"><label class="casilla" for="' + f + '-datos"><input type="checkbox" id="' + f + '-datos" name="datos" aria-describedby="' + f + '-datos-error"><span>Autorizo a Inversiones Mundilácteos S.A.S. a tratar mis datos para responder esta solicitud, según su <a href="#privacidad">política de datos</a> (Ley 1581 de 2012).</span></label><p class="error-campo" id="' + f + '-datos-error" hidden></p></div>';
  }
  var trampaGen = function (f) { return '<div class="trampa" aria-hidden="true"><label for="' + f + '-web">No llene este campo</label><input type="text" id="' + f + '-web" name="web" tabindex="-1" autocomplete="off"></div>'; };
  var V = {
    req: function (msg) { return function (v) { return v ? '' : msg; }; },
    celular: function (v) { return !/^3\d{9}$/.test(v.replace(/[\s().-]/g, '').replace(/^\+?57/, '')) ? 'Escriba un celular de 10 dígitos, por ejemplo 300 123 4567.' : ''; },
    correo: function (v) { return v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? 'Revise el correo: le falta la @ o el dominio, por ejemplo nombre@empresa.com.' : ''; },
    nit: function (v) { return v && !/^\d{6,10}$/.test(v.replace(/[.\s]/g, '')) ? 'Escriba el NIT solo con números, sin dígito de verificación.' : ''; },
    datos: function (v) { return v ? '' : 'Para enviar, autorice el tratamiento de sus datos.'; },
  };
  var MOTIVOS = [['cotizacion', 'Cotización'], ['marca-propia', 'Marca propia'], ['pqr', 'Petición, queja o reclamo'], ['distribuidor', 'Ser distribuidor'], ['proveedores', 'Proveedores'], ['empleo', 'Trabaje con nosotros'], ['otro', 'Otro']];
  var FORMS = {
    contacto: {
      campos: { motivo: V.req('Elija el motivo de su mensaje.'), nombre: V.req('Escriba su nombre.'), celular: V.celular, correo: V.correo, mensaje: V.req('Escriba su mensaje.'), datos: V.datos },
      enviando: 'Enviando mensaje',
      enviado: function (d) {
        return '<h3>' + icono('i-check') + 'Mensaje enviado.</h3><p class="entradilla">' + mensajeHorario(new Date()) + '</p>' +
          '<p>Motivo: ' + esc(d.motivoTexto) + '. Número de mensaje: <strong class="cifra">' + numeroSolicitud() + '</strong>.</p>' +
          '<p class="meta">Prototipo: el mensaje no sale de este navegador. Horario de atención ' + aconf() + '</p>' +
          acciones(waEnlace('Hola, les escribí por el sitio. Motivo: ' + d.motivoTexto + '. ' + (d.mensaje || ''), 'Enviar también por WhatsApp al') + '<a class="enlace" href="#inicio">Volver al inicio</a>');
      },
    },
    muestras: {
      campos: { empresa: V.req('Escriba el nombre de la empresa o cadena.'), nit: V.nit, pres: V.req('Elija al menos una presentación.'), nombre: V.req('Escriba su nombre.'), celular: V.celular, correo: V.correo, datos: V.datos },
      enviando: 'Enviando solicitud',
      enviado: function (d) {
        return '<h3>' + icono('i-check') + 'Solicitud enviada.</h3><p class="entradilla">' + mensajeHorario(new Date()) + '</p>' +
          '<p>Presentaciones de interés: ' + esc(d.pres) + '. Número de solicitud: <strong class="cifra">' + numeroSolicitud() + '</strong>.</p>' +
          '<p class="meta">Prototipo: la solicitud no sale de este navegador. Horario de atención ' + aconf() + '</p>' +
          acciones(waEnlace('Hola, quiero muestras y costos de marca propia para ' + d.empresa + '. Presentaciones: ' + d.pres + '.', 'Enviar también por WhatsApp al') + '<a class="enlace" href="#productos">Ver productos</a>');
      },
    },
  };
  function valorCampo(form, k) {
    var els = $$('[name="' + k + '"]', form);
    if (!els.length) return '';
    if (els[0].type === 'checkbox' && els.length === 1) return els[0].checked ? 'si' : '';
    if (els[0].type === 'checkbox' || els[0].type === 'radio') return els.filter(function (x) { return x.checked; }).map(function (x) { return x.value; }).join(', ');
    return els[0].value.trim();
  }
  function validarCampoGen(form, k) {
    var f = form.getAttribute('data-form'), cfg = FORMS[f];
    var cont = $('[data-campo="' + k + '"]', form);
    if (!cont || cont.hidden || !cfg.campos[k]) return '';
    var msg = cfg.campos[k](valorCampo(form, k), form);
    var err = document.getElementById(f + '-' + k + '-error');
    var inp = document.getElementById(f + '-' + k);
    cont.classList.toggle('con-error', !!msg);
    if (inp && inp.type !== 'checkbox') { if (msg) inp.setAttribute('aria-invalid', 'true'); else inp.removeAttribute('aria-invalid'); }
    if (err) { err.hidden = !msg; err.innerHTML = msg ? icono('i-alerta') + '<span>' + msg + '</span>' : ''; }
    return msg;
  }
  function enviarGen(form) {
    var f = form.getAttribute('data-form'), cfg = FORMS[f], errores = [];
    Object.keys(cfg.campos).forEach(function (k) { var m = validarCampoGen(form, k); if (m) errores.push({ k: k, m: m }); });
    var res = $('.resumen-errores', form);
    if (errores.length) {
      res.innerHTML = '<p>' + icono('i-alerta') + 'Revise ' + errores.length + ' ' + plural(errores.length, 'campo', 'campos') + ' antes de enviar.</p><ul>' +
        errores.map(function (e) { return '<li><button type="button" class="enlace-boton" data-ir-id="' + f + '-' + e.k + '">' + e.m + '</button></li>'; }).join('') + '</ul>';
      res.hidden = false; res.focus();
      return;
    }
    res.hidden = true; res.innerHTML = '';
    var d = {};
    $$('[name]', form).forEach(function (el) { if (!(el.name in d)) d[el.name] = valorCampo(form, el.name); });
    var sel = $('select[name="motivo"]', form);
    d.motivoTexto = sel && sel.selectedIndex > 0 ? sel.options[sel.selectedIndex].text : '';
    var btn = $('[type="submit"]', form);
    btn.disabled = true; btn.textContent = cfg.enviando;
    setTimeout(function () {
      if (!document.body.contains(form)) return;
      var conf = document.createElement('div');
      conf.className = 'confirmacion';
      conf.innerHTML = cfg.enviado(d);
      form.parentNode.replaceChild(conf, form);
      var h = $('h3', conf); h.setAttribute('tabindex', '-1'); h.focus();
    }, reducido() ? 50 : 500);
  }
  function alCambiarMotivo(v) {
    $$('[data-si-motivo]').forEach(function (el) { el.hidden = el.getAttribute('data-si-motivo') !== v; });
    ['producto', 'lote'].forEach(function (k) { var c = $('[data-form="contacto"] [data-campo="' + k + '"]'); if (c) c.hidden = v !== 'pqr'; });
  }

  /* ---------- Marca propia ---------- */
  function vistaMarcaPropia() {
    var gr = C.maquila.gramajes;
    var bolsas = gr.filter(function (c) { return FILA_DE[c].g < 5000; }).map(function (c) { return c.replace(/\s*g$/, ''); });
    var bultos = gr.filter(function (c) { return FILA_DE[c].g >= 5000; }).map(function (c) { return c.replace(/\s*kg$/, ''); });
    var rL = REG['RSA-006359-2018'], rM = REG['RSA-003008-2017'];
    var oferta = '<section class="bloque bloque--primero" id="s-oferta" aria-labelledby="t-oferta"><div class="zona-negocio bloque-negocio"><h2 id="t-oferta">Qué ofrecemos</h2>' + tablaDatos([
      ['Presentaciones', 'Bolsas de ' + lista(bolsas) + NB + 'g. Bultos de ' + lista(bultos) + NB + 'kg.'],
      ['Leche en polvo', esc(rL.producto.replace(/^Leche en polvo:\s*/, '').replace(/^./, function (x) { return x.toUpperCase(); })) + '. Registro ' + rL.numero + '.'],
      ['Mezclas lácteas', esc(rM.producto) + ' (registro ' + rM.numero + '). Se rotulan como mezcla, nunca como leche.'],
      ['Empaque', 'Bolsa laminada de tres capas, termosellada en atmósfera controlada de CO₂, en pacas. Bulto con bolsa interna de polietileno y saco kraft de triple capa.'],
      ['Registro sanitario', esc(C.maquila.resumen) + ' ' + esc(C.maquila.evidencia)],
      ['Titular del registro en su etiqueta', aconf()],
    ], 'Qué ofrecemos en marca propia', 'tabla-negocio') + '</div></section>';
    var tamanos = [[292, 439], [350, 525], [314, 471]];
    var fotos = '<ul class="mp-fotos">' + C.maquila.imagenes.map(function (src, i) {
      var t = tamanos[i] || [300, 450];
      return '<li class="mp-foto"><img src="img/' + src + '" alt="Bolsa de leche en polvo de marca propia empacada por Mundilácteos para una cadena (' + (i + 1) + ' de ' + C.maquila.imagenes.length + ')" width="' + t[0] + '" height="' + t[1] + '" loading="lazy" decoding="async"></li>';
    }).join('') + '</ul><p class="meta mp-aviso">' + esc(C.maquila.nota_imagenes.replace(/ Mostrar.*$/, '')) + ' Se muestran con autorización del cliente. Autorización escrita de cada cadena ' + aconf() + '</p>';
    var trabajo = pasos([
      ['Muestras y especificación', 'Nos cuenta presentaciones, tipo de leche y volumen. Le enviamos muestras.'],
      ['Diseño del empaque', 'Su cadena aporta el arte de la marca; lo ajustamos a la bolsa o al saco.'],
      ['Aprobación de arte y registro', 'Revisamos juntos la etiqueta y el registro sanitario antes de imprimir.'],
      ['Producción y despacho', 'Empacamos en Europark y despachamos a sus centros de distribución.'],
    ], 'pasos-empaque--fila');
    var requisitos = '<div class="dos-cols"><div>' + tablaDatos([
      ['Pedido mínimo por referencia', aconf()], ['Tiempo de arranque', aconf()], ['Arte del empaque', 'Lo aporta la cadena'], ['Muestras', 'Sin costo ' + aconf()],
    ], 'Requisitos de marca propia') + '</div><div class="confidencial"><h3>Confidencialidad</h3><p>No publicamos las marcas que empacamos sin autorización escrita. El sello de Mundilácteos va en su empaque solo si su cadena lo autoriza.</p></div></div>';
    var chips = '<fieldset class="campo" data-campo="pres" aria-describedby="muestras-pres-error"><legend>Presentaciones de interés</legend><div class="chips">' + gr.map(function (c, i) {
      var id = 'muestras-pres' + (i ? '-' + i : '');
      return '<label class="chip" for="' + id + '"><input type="checkbox" id="' + id + '" name="pres" value="' + c + '"><span class="chip-cara">' + fmtPres(c) + '</span></label>';
    }).join('') + '</div><p class="error-campo" id="muestras-pres-error" hidden></p></fieldset>';
    var form = '<form class="form-gen" data-form="muestras" novalidate aria-labelledby="t-muestras"><div class="resumen-errores" tabindex="-1" hidden></div>' +
      campo('muestras', 'empresa', 'Empresa o cadena', { auto: 'organization' }) +
      '<div class="campos-par">' + campo('muestras', 'nit', 'NIT', { opcional: true, modo: 'numeric' }) + campo('muestras', 'cargo', 'Cargo', { opcional: true, auto: 'organization-title' }) + '</div>' +
      chips +
      '<div class="campos-par">' + campo('muestras', 'volumen', 'Volumen mensual estimado', { opcional: true, ops: [['menos-1000', 'Menos de 1.000 kg'], ['1000-5000', '1.000 a 5.000 kg'], ['5000-20000', '5.000 a 20.000 kg'], ['mas-20000', 'Más de 20.000 kg'], ['no-se', 'Aún no lo sé']] }) +
      campo('muestras', 'ciudad', 'Ciudad', { opcional: true, auto: 'address-level2' }) + '</div>' +
      campo('muestras', 'nombre', 'Nombre de contacto', { auto: 'name' }) +
      '<div class="campos-par">' + campo('muestras', 'celular', 'Celular', { tipo: 'tel', modo: 'numeric', auto: 'tel-national' }) + campo('muestras', 'correo', 'Correo', { tipo: 'email', auto: 'email', opcional: true }) + '</div>' +
      trampaGen('muestras') + casillaDatos('muestras') +
      '<div class="paso-acciones"><button type="submit" class="boton">Pedir muestras y costos</button></div><p class="cot-nota">Esto no es un pedido: es una solicitud de muestras y costos.</p></form>';
    montar('<div class="envoltura pagina">' +
      cabecera('Marca propia para cadenas', 'Empacamos leche en polvo con la marca de su cadena, en la presentación que necesite.',
        acciones('<a class="boton" href="#marca-propia~muestras">Pedir muestras y costos</a>' + waEnlace('Hola, quiero información sobre marca propia (maquila). Mi cadena es: ', 'WhatsApp:'))) +
      oferta +
      bloque('empaques', 'Empaques que ya hacemos', '<div class="dos-cols"><div>' + fotos + '</div>' + htmlToma('C05', '3 / 2') + '</div>') +
      bloque('como', 'Cómo trabajamos', trabajo) +
      bloque('requisitos', 'Requisitos', requisitos) +
      bloque('muestras', 'Pedir muestras y costos', '<div class="dos-cols dos-cols--ancha">' + form +
        '<div class="form-lado"><p>Le respondemos con muestras, costos por presentación y los pasos para arrancar.</p><p>¿Prefiere hablar ya? ' + waEnlace('Hola, quiero información sobre marca propia (maquila). Mi cadena es: ', 'WhatsApp:') + '</p><p class="meta">Tiempo de respuesta ' + aconf() + '</p></div></div>') +
      '</div>');
    return 'Marca propia para cadenas';
  }

  /* ---------- Recursos y artículos ---------- */
  var TEMAS = { negocio: 'Para su negocio', cocina: 'En la cocina', calidad: 'Calidad y almacenamiento' };
  function cuerpoRinde() {
    var l = 10, d = 26, kg = l * d * G_POR_L / 1000;
    var filasR = C.maquila.gramajes.map(function (c) {
      var g = FILA_DE[c].g;
      return '<tr><th scope="row">' + fmtPres(c) + '</th><td class="num">' + fmtL(g / G_POR_L) + '</td><td class="num">' + fmtNum(Math.floor(g / (G_POR_L / 5)), 0) + '</td></tr>';
    }).join('');
    return '<p>La ficha técnica de Mundilácteos indica ' + G_POR_L + NB + 'g de leche en polvo por cada litro de agua. Con esa dosis la cuenta es sencilla: divida los gramos de la bolsa entre ' + G_POR_L + '.</p>' +
      '<p class="formula"><span class="cifra">900' + NB + 'g</span> <span aria-hidden="true">÷</span><span class="sr">dividido entre</span> <span class="cifra">' + G_POR_L + NB + 'g por litro</span> = <span class="cifra">' + fmtNum(900 / G_POR_L, 1) + ' litros</span></p>' +
      '<h2>Cuánto prepara cada presentación</h2><p>Estas son las 12 presentaciones que empaca la planta. Un vaso de 200' + NB + 'ml lleva ' + (G_POR_L / 5) + NB + 'g de leche en polvo.</p>' +
      '<table class="tabla tabla-rinde"><caption class="sr">Litros y vasos de 200 ml que prepara cada presentación, con ' + G_POR_L + ' g por litro</caption><thead><tr><th scope="col">Presentación</th><th scope="col" class="num">Litros</th><th scope="col" class="num">Vasos de 200' + NB + 'ml</th></tr></thead><tbody>' + filasR + '</tbody></table>' +
      '<p class="meta">Las de 27, 104, 200, 750 y 1000' + NB + 'g hoy son solo para marca propia. <a href="#articulo-guia-presentaciones">Ver la guía de presentaciones</a></p>' +
      '<h2>Cómo prepararla</h2><ol class="lista-num">' +
      '<li><p>Pese ' + G_POR_L + NB + 'g de leche en polvo por cada litro que vaya a preparar. La primera vez, péselos en una balanza: así sabe cuántas cucharadas son.</p></li>' +
      '<li><p>Disuélvalos en una parte del agua potable y revuelva hasta que no queden grumos.</p></li>' +
      '<li><p>Complete con agua hasta el litro y revuelva otra vez.</p></li></ol>' +
      '<p class="meta">Temperatura del agua y conservación de la leche preparada, según el empaque de cada producto ' + aconf() + '</p>' +
      htmlToma('M02', '1 / 1') +
      '<h2>Del litro al bulto</h2><p>Una panadería que prepara ' + l + ' litros al día, ' + d + ' días al mes, usa ' + l + ' × ' + d + ' × ' + G_POR_L + NB + 'g = ' + fmtKg(kg) + ' al mes. Un bulto de 25' + NB + 'kg y uno de 12,5' + NB + 'kg cubren el mes con ' + fmtKg(37.5 - kg) + ' de sobra. ' + aconf('bulto de 12,5 kg de leche entera: dato a confirmar') + '</p>' +
      '<form class="conversor" id="conversor" novalidate aria-labelledby="t-conversor"><h3 id="t-conversor">Calcule su consumo</h3>' +
      '<div class="campos-par"><div class="campo"><label for="conv-litros">Litros que prepara al día</label><input id="conv-litros" type="text" inputmode="decimal" value="' + l + '" autocomplete="off"></div>' +
      '<div class="campo"><label for="conv-dias">Días de trabajo al mes</label><input id="conv-dias" type="text" inputmode="numeric" value="' + d + '" autocomplete="off"></div></div>' +
      '<div class="calc-resultado" id="conv-resultado" aria-live="polite"></div><p><a class="enlace" href="#productos~formato-bulto">Ver bultos en Productos</a></p></form>' +
      '<h2>La mezcla no es leche</h2><p>Estas cuentas son para la leche en polvo. Las mezclas en polvo a base de leche y endulzantes tienen su propia dosis, que se publicará cuando la confirme su ficha técnica. ' + aconf() + '</p>';
  }
  function calcConversor() {
    var out = $('#conv-resultado'); if (!out) return;
    var l = parseFloat(String($('#conv-litros').value).replace(/\s/g, '').replace(',', '.')), d = parseInt($('#conv-dias').value, 10);
    if (!(l > 0 && l <= 100000) || !(d >= 1 && d <= 31)) { out.innerHTML = '<p>Escriba los litros al día y los días al mes con números, por ejemplo 10 y 26.</p>'; return; }
    var kg = l * d * G_POR_L / 1000, b = Math.ceil(kg / 25), bo = Math.ceil(kg * 1000 / 900);
    out.innerHTML = '<p><strong>Necesita cerca de ' + fmtKg(kg) + ' al mes</strong> para ' + fmtNum(l * d, l * d % 1 ? 1 : 0) + NB + 'L.</p><p>Equivale a ' + b + ' ' + plural(b, 'bulto', 'bultos') + ' de 25' + NB + 'kg o ' + fmtNum(bo, 0) + ' ' + plural(bo, 'bolsa', 'bolsas') + ' de 900' + NB + 'g.</p>';
  }
  function cuerpoGuia() {
    var casa = C.maquila.gramajes.filter(function (c) { return estadoGramaje(c).estado !== 'maquila'; });
    var solo = C.maquila.gramajes.filter(function (c) { return estadoGramaje(c).estado === 'maquila'; }).map(function (c) { return c.replace(/\s*g$/, ''); });
    var filasG = C.maquila.gramajes.map(function (c) {
      var f = FILA_DE[c], e = estadoGramaje(c), bulto = f.g >= 5000;
      var marcas = e.estado === 'maquila' ? '<span class="tenue">Solo marca propia</span>' : e.refs.map(function (r) {
        return '<a href="#producto-' + r.p.slug + '~' + presSlug(c) + '">' + esc(r.p.nombre) + '</a>' + (r.pr.estado !== 'confirmado' ? ' ' + aconf() : '');
      }).join('<br>');
      return '<tr><th scope="row">' + fmtPres(c) + '</th><td data-etiqueta="Formato">' + (bulto ? 'Bulto' : 'Bolsa') + '</td><td data-etiqueta="Se vende">' + (bulto ? 'Por bulto' : 'Paca de ' + C.unidades_por_paca[c] + ' bolsas') + '</td>' +
        '<td data-etiqueta="Rinde en leche">' + fmtL(f.g / G_POR_L) + '</td><td data-etiqueta="Marcas de la casa">' + marcas + '</td></tr>';
    }).join('');
    return '<p>La planta empaca 12 presentaciones. Las bolsas se venden por paca y los bultos por unidad. ' + casa.length + ' llevan hoy The Cántaro o La Becerrita; las de ' + lista(solo) + NB + 'g se empacan solo con la marca de su cadena.</p>' +
      '<h2>Las 12 presentaciones</h2>' +
      '<table class="tabla tabla-guia tabla-apila"><caption class="sr">Las 12 presentaciones, cómo se venden, cuánto rinden y en qué marcas están</caption><thead><tr><th scope="col">Presentación</th><th scope="col">Formato</th><th scope="col">Se vende</th><th scope="col">Rinde en leche</th><th scope="col">Marcas de la casa</th></tr></thead><tbody>' + filasG + '</tbody></table>' +
      '<p class="meta">Unidades por paca publicadas por gramaje ' + aconf() + ' Rinde de la leche en polvo, con ' + G_POR_L + NB + 'g por litro; la dosis de las mezclas está por confirmar. The Cántaro Entera también se fotografió en 800' + NB + 'g en 2022; su vigencia está por confirmar.</p>' +
      '<h2>Bolsa o bulto</h2><p>La bolsa es laminada de tres capas, termosellada y envasada en atmósfera controlada de CO₂; se agrupa en pacas para tiendas y distribuidores. El bulto lleva una bolsa interna de polietileno y un saco de papel kraft de triple capa: es la presentación de panaderías, heladerías e industria.</p>' +
      htmlConviene();
  }
  var ARTICULOS = [
    { slug: 'cuanto-rinde-un-kilo', t: 'Cuánto rinde un kilo de leche en polvo', tema: 'negocio', cuerpo: cuerpoRinde, alMontar: calcConversor,
      e: 'Con la dosis de la ficha técnica, ' + G_POR_L + NB + 'g por litro, un kilo prepara cerca de ' + fmtNum(1000 / G_POR_L, 1) + ' litros. Esta es la cuenta para cada presentación y para su pedido del mes.',
      productos: ['cantaro-entera', 'cantaro-entera-bulto', 'cantaro-descremada', 'cantaro-azucarada', 'becerrita-entera'],
      cierre: acciones('<a class="boton" href="#cotizar">Cotizar por volumen</a><a class="enlace" href="#productos~formato-bulto">Ver bultos</a>') },
    { slug: 'guia-presentaciones', t: 'Guía de presentaciones: de 27 g a 25 kg', tema: 'negocio', cuerpo: cuerpoGuia,
      e: 'Qué presentaciones empaca la planta, cómo se venden, cuánto rinden y cuáles llevan The Cántaro o La Becerrita.',
      productos: ['cantaro-entera', 'cantaro-entera-bulto', 'cantaro-azucarada', 'cantaro-mezcla', 'becerrita-entera', 'becerrita-mezcla-bulto'],
      cierre: acciones('<a class="boton" href="#productos">Ver productos</a><a class="enlace" href="#marca-propia">Ver marca propia</a>') },
    { slug: 'leche-panaderia-mes', t: 'Cuánta leche en polvo necesita su panadería al mes', tema: 'negocio', estado: 'En preparación',
      e: 'Una guía para calcular el consumo mensual de una panadería y convertirlo en bultos.',
      plan: ['Cuánta leche usa cada tipo de producto de panadería', 'Una tabla de consumo por litros al día', 'Cómo convertir el consumo en bultos de 5, 12,5 y 25 kg'],
      falta: 'Consumos reales de panaderías clientes, con su autorización.', mientras: 'Mientras tanto, la cuenta básica está en <a href="#articulo-cuanto-rinde-un-kilo">Cuánto rinde un kilo de leche en polvo</a>.' },
    { slug: 'almacenar-bultos-clima-calido', t: 'Cómo almacenar bultos en clima cálido', tema: 'calidad', estado: 'En preparación',
      e: 'Cómo guardar bultos de leche en polvo en la bodega para que lleguen al último kilo en buen estado.',
      plan: ['Dónde y cómo apilar los bultos', 'Humedad, sol y ventilación', 'Qué hacer con un bulto abierto'],
      falta: 'Condiciones de almacenamiento de la ficha técnica.' },
    { slug: 'leer-lote-vencimiento', t: 'Cómo leer el lote y la fecha de vencimiento', tema: 'calidad', estado: 'En preparación',
      e: 'Dónde está impreso el código de cada bolsa y cómo leerlo.',
      plan: ['Dónde está impreso el código', 'Cómo leer el lote y la fecha', 'Qué hacer si el código no se lee'],
      falta: 'La foto F02 y el formato del código de cada empaque.', mientras: 'Mientras tanto, vea <a href="#calidad~lote">Lote, vencimiento y trazabilidad</a> en Calidad.' },
    { slug: 'arequipe-casero', t: 'Arequipe casero con leche en polvo', tema: 'cocina', estado: 'Receta en prueba',
      e: 'La receta de arequipe con leche en polvo, probada en cocina antes de publicarla.',
      plan: ['Ingredientes y cantidades', 'Paso a paso', 'Cómo guardarlo'],
      falta: 'La receta se prueba en cocina antes de publicarla.' },
    { slug: 'rotacion-en-la-tienda', t: 'Primero lo que vence primero: rotación en la tienda', tema: 'negocio', estado: 'En preparación',
      e: 'Cómo ordenar la estantería por fecha de vencimiento para no perder producto.',
      plan: ['Cómo ordenar la estantería por fecha', 'Cómo revisar el vencimiento al recibir una paca', 'Qué hacer con producto próximo a vencer'],
      falta: 'Revisión con el área comercial.' },
  ];
  var ART = {}; ARTICULOS.forEach(function (a) { ART[a.slug] = a; });
  function minutosDe(a) {
    if (a._min == null) a._min = Math.max(1, Math.round(a.cuerpo().replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 200));
    return a._min;
  }
  function pintarRecursos(tema) {
    var arts = ARTICULOS.filter(function (a) { return !tema || a.tema === tema; });
    $('#lista-art').innerHTML = arts.map(function (a) {
      return '<li><a href="#articulo-' + a.slug + '">' + esc(a.t) + '</a><span class="art-datos"><span>' + TEMAS[a.tema] + '</span>' +
        (a.cuerpo ? '<span>' + minutosDe(a) + ' min de lectura</span>' : estado('pend', a.estado)) + '</span></li>';
    }).join('');
    $('#conteo-art').textContent = arts.length + ' ' + plural(arts.length, 'artículo', 'artículos') + (tema ? ': ' + TEMAS[tema] : '');
    $$('[data-tema]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-tema') === tema)); });
  }
  function vistaRecursos(tokens) {
    var tema = '';
    tokens.forEach(function (t) { if (t.indexOf('tema-') === 0 && TEMAS[t.slice(5)]) tema = t.slice(5); });
    var filtros = '<div class="temas" role="group" aria-label="Filtrar artículos por tema"><button type="button" class="tema-boton" data-tema="" aria-pressed="false">Todos</button>' +
      Object.keys(TEMAS).map(function (k) { return '<button type="button" class="tema-boton" data-tema="' + k + '" aria-pressed="false">' + TEMAS[k] + '</button>'; }).join('') + '</div>' +
      '<p class="conteo-res" id="conteo-art" aria-live="polite"></p>';
    var docs = '<table class="tabla tabla-docs tabla-apila"><caption class="sr">Documentos para compradores y su estado</caption><thead><tr><th scope="col">Documento</th><th scope="col">Dónde está</th><th scope="col">Estado</th></tr></thead><tbody>' +
      C.productos.filter(function (p) { return p.presentaciones.length; }).map(function (p) {
        return '<tr><th scope="row">Ficha técnica de ' + esc(p.nombre) + '</th><td data-etiqueta="Dónde está"><a href="#producto-' + p.slug + '">Ver en HTML<span class="sr">: ficha técnica de ' + esc(p.nombre) + '</span></a></td><td data-etiqueta="Estado">' + estado('pend', 'PDF por publicar') + '</td></tr>';
      }).join('') +
      '<tr><th scope="row">Registros sanitarios Invima</th><td data-etiqueta="Dónde está">' + ext(URL_INVIMA, 'Consulta pública del Invima') + '</td><td data-etiqueta="Estado">' + estado('ok', 'Consultable') + '</td></tr>' +
      '<tr><th scope="row">Concepto sanitario del establecimiento</th><td data-etiqueta="Dónde está">' + ext(INV.fuente, 'Datos abiertos, datos.gov.co') + '</td><td data-etiqueta="Estado">' + estado('ok', 'FAVORABLE') + '</td></tr>' +
      '<tr><th scope="row">Certificado ISO 9001:2015</th><td data-etiqueta="Dónde está"><span class="tenue">Aún no disponible</span></td><td data-etiqueta="Estado">' + estado('pend') + '</td></tr>' +
      '<tr><th scope="row">Catálogo en PDF</th><td data-etiqueta="Dónde está"><span class="tenue">Aún no disponible</span></td><td data-etiqueta="Estado">' + estado('pend', 'Por publicar') + '</td></tr></tbody></table>';
    montar('<div class="envoltura pagina">' +
      cabecera('Recursos', 'Guías, recetas y documentos sobre la leche en polvo, para su negocio y para su cocina.') +
      '<section class="bloque bloque--primero" aria-labelledby="t-articulos"><h2 id="t-articulos">Artículos</h2>' + filtros + '<ul class="lista-articulos lista-articulos--recursos" id="lista-art"></ul></section>' +
      bloque('documentos', 'Documentos para compradores', '<p class="bloque-intro">Cada ficha técnica existe en HTML dentro de la página del producto. El PDF será una copia, nunca el único lugar del dato.</p>' + docs) +
      '</div>');
    pintarRecursos(tema);
    return 'Recursos';
  }
  function vistaArticulo(slug) {
    var a = ART[slug];
    if (!a) return vista404();
    var html = '<div class="envoltura pagina">' + migas([['#inicio', 'Inicio'], ['#recursos', 'Recursos'], [null, a.t]]);
    if (a.cuerpo) {
      html += '<article class="articulo" aria-labelledby="t-art"><header class="articulo-cab"><h1 id="t-art">' + esc(a.t) + '</h1><p class="entradilla">' + a.e + '</p>' +
        '<p class="articulo-meta">' + TEMAS[a.tema] + '. ' + minutosDe(a) + ' min de lectura. Actualizado el ' + FECHA_DATOS + '.</p></header>' +
        '<div class="articulo-cuerpo">' + a.cuerpo() + '</div>' +
        '<div class="articulo-lado"><h2>Productos mencionados</h2><ul class="lista-texto">' + a.productos.map(function (s) { return '<li><a href="#producto-' + s + '">' + esc(PROD[s].nombre) + '</a></li>'; }).join('') + '</ul>' + a.cierre + '</div></article>';
    } else {
      html += '<article class="articulo articulo--pend" aria-labelledby="t-art"><header class="articulo-cab"><h1 id="t-art">' + esc(a.t) + '</h1><p class="entradilla">' + a.e + '</p>' +
        '<p class="articulo-meta">' + TEMAS[a.tema] + '. ' + estado('pend', a.estado) + '</p></header>' +
        '<div class="articulo-cuerpo"><h2>Qué va a encontrar</h2><ul class="lista-plan">' + a.plan.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul>' +
        '<h2>Qué falta para publicarlo</h2><p>' + a.falta + ' ' + aconf() + '</p>' + (a.mientras ? '<p>' + a.mientras + '</p>' : '') +
        '<p><a class="enlace" href="#recursos">Ver todos los recursos</a></p></div></article>';
    }
    montar(html + '</div>');
    if (a.alMontar) a.alMontar();
    return a.t;
  }

  /* ---------- Contacto ---------- */
  var SVG_UBICACION = '<svg class="ubicacion" viewBox="0 30 320 114" role="img" aria-labelledby="t-ubicacion" focusable="false"><title id="t-ubicacion">Esquema sin escala: la planta queda en el kilómetro 1 de la vía a Turbaco, en el Parque Industrial Europark, Bodega 28.</title>' +
    '<path class="ub-via" d="M8 92H312M8 106H312"/><path class="ub-via ub-eje" d="M8 99H312"/><path class="ub-via" d="M96 68V92"/><path class="ub-via" d="M96 106V114"/>' +
    '<rect class="ub-punto" x="89" y="54" width="14" height="14"/>' +
    '<text x="112" y="50" class="ub-fuerte">Parque Industrial Europark</text><text x="112" y="68">Lote 2A–2B, Bodega 28</text>' +
    '<text x="8" y="134">Cartagena</text><text x="103" y="134">Km 1</text><text x="200" y="134" text-anchor="middle">Vía a Turbaco</text><text x="312" y="134" text-anchor="end">Turbaco</text></svg>';
  function vistaContacto(tokens) {
    var motivo = '';
    tokens.forEach(function (t) { if (t.indexOf('motivo-') === 0 && MOTIVOS.some(function (m) { return m[0] === t.slice(7); })) motivo = t.slice(7); });
    var canales = '<table class="planilla-razones planilla-canales"><caption class="sr">Canales de atención de Mundilácteos</caption><thead class="sr"><tr><th scope="col">Canal</th><th scope="col">Dato</th></tr></thead><tbody>' + [
      ['Escribir a un asesor (WhatsApp)', '<a class="enlace-wa" href="' + waHref(MSJ_GENERAL) + '" target="_blank" rel="noopener">' + icono('i-whatsapp') + '<span>' + TEL_VISIBLE + '</span><span class="sr"> (abre WhatsApp)</span></a>'],
      ['Teléfono', '<a href="' + TEL_HREF + '">' + TEL_VISIBLE + '</a>'],
      ['Correo comercial', '<a href="mailto:' + E.correo.valor + '">' + E.correo.valor + '</a> ' + aconf()],
      ['Dirección', '<span class="dato-bloque">' + esc(E.direccion) + '. ' + esc(E.municipio) + '.</span><a href="' + MAPS_PLANTA + '" target="_blank" rel="noopener">Cómo llegar<span class="sr"> (abre Google Maps)</span></a>'],
      ['Horario', esc(E.horario.valor) + ' ' + aconf()],
      ['Instagram', ext(E.instagram, '@mundilacteos')],
    ].map(function (f) { return '<tr><th scope="row">' + f[0] + '</th><td>' + f[1] + '</td></tr>'; }).join('') + '</tbody></table>';
    var form = '<form class="form-gen" data-form="contacto" novalidate aria-labelledby="t-escribanos"><div class="resumen-errores" tabindex="-1" hidden></div>' +
      campo('contacto', 'motivo', 'Motivo', { ops: MOTIVOS, valor: motivo }) +
      '<p class="nota-motivo" data-si-motivo="cotizacion"' + (motivo === 'cotizacion' ? '' : ' hidden') + '>Para cotizar pacas o bultos es más rápido <a href="#cotizar">Solicitar cotización</a>: calcula los kilos y llega al equipo comercial con su lista.</p>' +
      '<p class="nota-motivo" data-si-motivo="marca-propia"' + (motivo === 'marca-propia' ? '' : ' hidden') + '>Si ya sabe qué presentaciones necesita, use <a href="#marca-propia~muestras">Pedir muestras y costos</a>.</p>' +
      '<p class="nota-motivo" data-si-motivo="pqr"' + (motivo === 'pqr' ? '' : ' hidden') + '>Tenga a mano el lote: está impreso en la bolsa o en el saco.</p>' +
      '<div class="campos-par">' + campo('contacto', 'producto', 'Producto y presentación', { opcional: true, oculto: motivo !== 'pqr', ayuda: 'Por ejemplo: The Cántaro Entera 900 g.' }) +
      campo('contacto', 'lote', 'Lote', { opcional: true, oculto: motivo !== 'pqr' }) + '</div>' +
      campo('contacto', 'nombre', 'Nombre', { auto: 'name' }) +
      '<div class="campos-par">' + campo('contacto', 'celular', 'Celular', { tipo: 'tel', modo: 'numeric', auto: 'tel-national' }) + campo('contacto', 'correo', 'Correo', { tipo: 'email', auto: 'email', opcional: true }) + '</div>' +
      campo('contacto', 'ciudad', 'Ciudad', { opcional: true, auto: 'address-level2' }) +
      campo('contacto', 'mensaje', 'Mensaje', { area: true }) +
      trampaGen('contacto') + casillaDatos('contacto') +
      '<div class="paso-acciones"><button type="submit" class="boton">Enviar mensaje</button></div><p>¿Prefiere WhatsApp? ' + waEnlace(MSJ_GENERAL, 'Escribir al') + '</p></form>';
    montar('<div class="envoltura pagina">' +
      cabecera('Contacto', 'Escríbanos, llámenos o visítenos en la planta. Respondemos en horario de atención.') +
      '<section class="bloque bloque--primero" aria-labelledby="t-canales"><h2 id="t-canales">Canales</h2><div class="dos-cols dos-cols--ancha">' + canales +
      '<div class="contacto-lado">' + SVG_UBICACION + '<p class="meta">Esquema sin escala. <a href="' + MAPS_PLANTA + '" target="_blank" rel="noopener">Ver en Google Maps<span class="sr"> (abre otro sitio)</span></a></p>' + htmlToma('O07', '3 / 2') + '</div></div></section>' +
      bloque('escribanos', 'Escríbanos', '<div class="dos-cols dos-cols--ancha">' + form +
        '<div class="form-lado"><h3>Asesores comerciales</h3><p>Nombres y retratos de los asesores ' + aconf() + '</p>' + htmlToma('O06', '4 / 5', 'Retratos de los asesores comerciales, cada uno con su nombre.') + '</div></div>') +
      '</div>');
    return 'Contacto';
  }

  /* ---------- Legales ---------- */
  function vistaLegal(tipo) {
    var priv = tipo === 'privacidad';
    var t = priv ? 'Política de tratamiento de datos' : 'Términos de uso';
    var cuerpo = priv ?
      '<h2>Responsable</h2><p>' + esc(E.razon_social) + ', NIT ' + E.nit + '. ' + esc(E.direccion) + ', ' + esc(E.municipio) + '. Teléfono ' + TEL_VISIBLE + '.</p>' +
      '<h2>Para qué usamos sus datos</h2><p>Para responder sus solicitudes de cotización, mensajes, peticiones, quejas y reclamos, y para enviarle muestras y costos de marca propia cuando los pida.</p>' +
      '<h2>Sus derechos</h2><ul class="lista-plan"><li>Conocer, actualizar y rectificar sus datos.</li><li>Pedir prueba de la autorización que nos dio.</li><li>Saber cómo usamos sus datos.</li><li>Presentar quejas ante la Superintendencia de Industria y Comercio.</li><li>Revocar la autorización o pedir que borremos sus datos.</li></ul>' +
      '<h2>Cómo ejercerlos</h2><p>Escríbanos por los canales de <a href="#contacto">Contacto</a> con el motivo «Petición, queja o reclamo».</p>' :
      '<h2>Precios y cotizaciones</h2><p>El sitio no publica precios. Una solicitud de cotización no es un pedido ni un pago: el precio y la fecha los confirma un asesor.</p>' +
      '<h2>Información de producto</h2><p>Los datos de cada producto salen de su ficha técnica y de su registro sanitario. Lo marcado como dato a confirmar puede cambiar.</p>' +
      '<h2>Enlaces a otros sitios</h2><p>Los enlaces a cadenas, al Invima y a otros sitios se abren fuera de este sitio, con sus propias condiciones.</p>';
    montar('<div class="envoltura pagina">' + cabecera(t, priv ? 'Tratamos los datos que usted nos envía solo para responder su solicitud, según la Ley 1581 de 2012.' : 'Condiciones de uso del sitio de Mundilácteos.') +
      '<div class="texto legal">' + cuerpo + '<p class="meta">Texto por validar con el área jurídica de Mundilácteos ' + aconf() + '</p></div></div>');
    return t;
  }

  /* ---------- 404 ---------- */
  function vista404() {
    montar('<div class="envoltura pagina">' + cabecera('Esta página no existe.', 'Vuelva a Productos o escríbanos qué busca.', null, [['#inicio', 'Inicio'], [null, 'Página no encontrada']]) +
      '<div class="error404"><div class="buscador buscador--pagina" data-buscador="404"><label for="busca-404">Buscar productos</label><div class="buscador-campo">' + icono('i-buscar', 'icono buscador-icono') +
      '<input id="busca-404" type="search" placeholder="Marca, gramos o código" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="sugerencias-404"></div>' +
      '<ul class="sugerencias" id="sugerencias-404" role="listbox" aria-label="Sugerencias" hidden></ul></div>' +
      acciones('<a class="boton" href="#productos">Ver productos</a>' + waEnlace(MSJ_GENERAL, 'Escribir por WhatsApp al')) +
      '<ul class="lista-texto lista-404"><li><a href="#cotizar">Solicitar cotización</a></li><li><a href="#donde-comprar">Dónde comprar</a></li><li><a href="#marca-propia">Marca propia</a></li><li><a href="#contacto">Contacto</a></li></ul></div></div>');
    var b = $('[data-buscador="404"]'); if (b) iniciarBuscador(b);
    return 'Página no encontrada';
  }

  var PAGINAS = {
    nosotros: vistaNosotros, calidad: vistaCalidad, 'por-que-elegirnos': vistaPorQue, distribucion: vistaDistribucion, 'donde-comprar': vistaDonde,
    'marca-propia': vistaMarcaPropia, recursos: vistaRecursos, contacto: vistaContacto,
    privacidad: function () { return vistaLegal('privacidad'); }, terminos: function () { return vistaLegal('terminos'); },
  };

  /* =========================================================
     Home: fila a escala, mini-ficha y calculadora
     ========================================================= */
  function htmlMinificha(f) {
    var e = estadoGramaje(f.c), bulto = f.g >= 5000;
    var l1 = bulto ? 'Bulto de ' + fmtPres(f.c) + ': bolsa de polietileno y saco kraft de triple capa.'
      : (C.unidades_por_paca[f.c] ? 'Paca de ' + C.unidades_por_paca[f.c] + ' bolsas, ' + fmtKg(C.unidades_por_paca[f.c] * f.g / 1000) + '.' : 'Paca: consultar.');
    var l2 = 'En leche en polvo rinde cerca de ' + (f.g < 100 ? fmtNum(f.g / G_POR_L * 1000, 0) + NB + 'ml' : fmtL(f.g / G_POR_L)) + ' por ' + (bulto ? 'bulto' : 'bolsa') + '.';
    var l3;
    // Agrupa por marca para que la línea sea corta: "The Cántaro Entera, Azucarada y Mezcla Láctea; La Becerrita Entera"
    var agrupar = function (refs) {
      var orden = [], por = {};
      refs.forEach(function (r) {
        var m = MARCA[r.p.marca].nombre;
        if (!por[m]) { por[m] = []; orden.push(m); }
        por[m].push(r.p.nombre.indexOf(m + ' ') === 0 ? r.p.nombre.slice(m.length + 1) : r.p.nombre);
      });
      return orden.map(function (m) { return m + ' ' + lista(por[m]); }).join('; ');
    };
    if (e.estado === 'maquila') l3 = 'Hoy solo para marca propia: la empacamos con la marca de su cadena.';
    else {
      var conf = e.refs.filter(function (r) { return r.pr.estado === 'confirmado'; }), pc = e.refs.filter(function (r) { return r.pr.estado !== 'confirmado'; });
      l3 = (conf.length ? 'Hoy en ' + agrupar(conf) + '.' : '') + (pc.length ? ' En ' + agrupar(pc) + ' ' + aconf() : '');
    }
    var acc = e.estado === 'maquila' ? '<a class="enlace" href="#marca-propia">Ver marca propia</a>'
      : '<a class="enlace" href="#productos~peso-' + presSlug(f.c) + '">Ver ' + fmtPres(f.c) + ' en Productos</a>';
    return '<div class="minificha-datos"><p class="minificha-cifra" style="--n:' + f.c.length + '">' + fmtPres(f.c) + '</p><p>' + l1 + ' ' + l2 + '</p><p>' + l3 + '</p></div><p class="minificha-accion">' + acc + '</p>';
  }
  function iniciarFila() {
    var form = $('#fila-inicio'); if (!form) return;
    form.classList.add('fila--js');
    var lista = $('.fila-lista', form);
    var ind = document.createElement('span'); ind.className = 'fila-indicador'; ind.setAttribute('aria-hidden', 'true');
    lista.appendChild(ind);
    var mf = $('#minificha');
    var mover = function () {
      var inp = $('input:checked', form); if (!inp) return;
      var cifra = $('label[for="' + inp.id + '"] .fila-cifra', form);
      var lr = lista.getBoundingClientRect(), cr = cifra.getBoundingClientRect();
      if (!cr.width) { ind.style.width = '0px'; return; }
      ind.style.setProperty('--x', (cr.left - lr.left) + 'px');
      ind.style.setProperty('--w', cr.width + 'px');
    };
    var pintar = function (animar) {
      var inp = $('input:checked', form); if (!inp) return;
      var f = FILA.filter(function (x) { return presSlug(x.c) === inp.value; })[0];
      mf.innerHTML = htmlMinificha(f);
      if (animar && !reducido()) { mf.classList.remove('cambia'); void mf.offsetWidth; mf.classList.add('cambia'); }
      mover();
    };
    form.addEventListener('change', function () { pintar(true); });
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    window.addEventListener('resize', mover);
    // Carga orquestada del hero, una vez por sesión y solo si se entra por la Home (EXPERIENCIA.md §2).
    // En móvil el estado inicial es 900 g, que está entre las 5 visibles.
    var hero = form.closest('.hero');
    try {
      if (!sessionStorage.getItem('mundi.fila.vista') && parsear().base === 'inicio') {
        if (!reducido() && hero) {
          hero.classList.add('hero--anima');
          setTimeout(function () { hero.classList.remove('hero--anima'); mover(); }, 1000);
        }
        sessionStorage.setItem('mundi.fila.vista', '1');
      }
    } catch (e) { /* sin sessionStorage: no se anima */ }
    pintar(false);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(mover);
    var ver = $('[data-ver-todas]');
    if (ver) ver.addEventListener('click', function () {
      var abierto = form.classList.toggle('fila--completa');
      ver.setAttribute('aria-expanded', String(abierto));
      ver.textContent = abierto ? 'Ver 5 presentaciones' : 'Ver las 12 presentaciones';
      if (!abierto) {
        var inp = $('input:checked', form);
        if (inp && inp.closest('.fila-pieza--extra')) { $('#fila-900-g').checked = true; pintar(true); }
      }
      mover();
    });
  }

  var CALC = ['cantaro-entera-bulto', 'cantaro-mezcla', 'becerrita-mezcla-bulto'];
  var calcCombo = null;
  function combinar(needKg, pres) {
    var tams = pres.map(function (pr) { return pr.gramos / 1000; }).sort(function (a, b) { return b - a; });
    var mejor = null;
    var max0 = Math.ceil(needKg / tams[0]) + 1;
    var lim = function (i) { return i === 0 ? max0 : Math.ceil(tams[0] / tams[i]) + 1; };
    var cuenta = [0, 0, 0];
    (function rec(i) {
      if (i === tams.length) {
        var tot = 0, n = 0;
        for (var k = 0; k < tams.length; k++) { tot += cuenta[k] * tams[k]; n += cuenta[k]; }
        if (tot + 1e-9 < needKg || !n) return;
        var sob = tot - needKg;
        if (!mejor || sob < mejor.sob - 1e-9 || (Math.abs(sob - mejor.sob) < 1e-9 && n < mejor.n)) mejor = { sob: sob, n: n, tot: tot, c: cuenta.slice(0, tams.length) };
        return;
      }
      for (var c = 0; c <= lim(i); c++) { cuenta[i] = c; rec(i + 1); }
      cuenta[i] = 0;
    })(0);
    if (!mejor) return null;
    return { tot: mejor.tot, items: tams.map(function (t, i) { return { kg: t, n: mejor.c[i], pr: pres.filter(function (pr) { return pr.gramos / 1000 === t; })[0] }; }).filter(function (x) { return x.n; }) };
  }
  function iniciarCalculadora() {
    var f = $('#calculadora'); if (!f) return;
    var sel = $('#calc-producto', f), lit = $('#calc-litros', f), dias = $('#calc-dias', f), out = $('#calc-resultado', f);
    var num = function (v) { return parseFloat(String(v).replace(/\s/g, '').replace(',', '.')); };
    var marcarError = function (inp, msg) {
      var e = $('#' + inp.id + '-error');
      inp.closest('.campo').classList.toggle('con-error', !!msg);
      if (msg) inp.setAttribute('aria-invalid', 'true'); else inp.removeAttribute('aria-invalid');
      e.hidden = !msg; e.innerHTML = msg ? icono('i-alerta') + '<span>' + msg + '</span>' : '';
    };
    var calcular = function () {
      var l = num(lit.value), d = parseInt(dias.value, 10);
      var el = !(l > 0 && l <= 100000) ? 'Escriba los litros con números, por ejemplo 10.' : '';
      var ed = !(d >= 1 && d <= 31) ? 'Escriba un número de días entre 1 y 31.' : '';
      marcarError(lit, el); marcarError(dias, ed);
      if (el || ed) { calcCombo = null; out.innerHTML = '<p>Complete los datos para calcular.</p>'; return; }
      var p = PROD[sel.value];
      var pres = p.presentaciones.filter(esBulto);
      var need = l * d * G_POR_L / 1000;
      var cb = combinar(need, pres);
      calcCombo = cb ? { p: p, items: cb.items } : null;
      if (!cb) { out.innerHTML = '<p>No hay bultos disponibles para este producto.</p>'; return; }
      var partes = cb.items.map(function (it, i) { return it.n + ' ' + (i === 0 ? plural(it.n, 'bulto', 'bultos') + ' de ' : 'de ') + fmtKg(it.kg).replace(',0' + NB, NB); });
      var porConf = cb.items.filter(function (it) { return it.pr.estado !== 'confirmado'; }).map(function (it) { return fmtKg(it.kg).replace(',0' + NB, NB); });
      var html = '<p><strong>Necesita cerca de ' + fmtKg(need) + ' al mes:</strong> ' + lista(partes) + ' (' + fmtKg(cb.tot) + ').</p>';
      if (porConf.length) html += '<p>Bulto de ' + lista(porConf) + ' ' + aconf() + '</p>';
      if (!esLeche(p)) html += '<p>La dosis de esta mezcla está por confirmar; el cálculo usa la de la leche en polvo (' + G_POR_L + NB + 'g por litro).</p>';
      out.innerHTML = html;
    };
    var t;
    f.addEventListener('input', function () { clearTimeout(t); t = setTimeout(calcular, 150); });
    f.addEventListener('change', calcular);
    f.addEventListener('submit', function (e) {
      e.preventDefault(); calcular();
      if (!calcCombo) { var inv = $('[aria-invalid="true"]', f); if (inv) inv.focus(); return; }
      var partes = [];
      calcCombo.items.forEach(function (it) {
        var id = calcCombo.p.slug + '_' + presSlug(it.pr.contenido);
        var l = linea(id);
        fijarLinea(id, (l ? l.cant : 0) + it.n, true);
        partes.push(it.n + ' ' + plural(it.n, 'bulto', 'bultos') + ' de ' + fmtPres(it.pr.contenido));
      });
      volarACotizacion($('button[type="submit"]', f), 'p-bulto');
      avisar('<p>Agregado a la cotización: ' + esc(calcCombo.p.nombre) + ', ' + lista(partes) + '.</p><p class="aviso-acciones"><button type="button" class="enlace-boton" data-abrir-panel>Ver cotización</button></p>');
    });
    calcular();
  }

  /* =========================================================
     Buscador con sugerencias (combobox)
     ========================================================= */
  function irBusqueda(q) {
    q = q.trim(); if (!q) { location.hash = '#productos'; return; }
    location.hash = '#productos~q-' + tokenQ(q);
  }
  function iniciarBuscador(raiz) {
    var input = $('input', raiz), lista = $('.sugerencias', raiz);
    var activo = -1, t;
    var cerrar = function () { lista.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); activo = -1; };
    var opcionesEl = function () { return $$('[role="option"]:not([aria-disabled="true"])', lista); };
    var marcar = function () {
      opcionesEl().forEach(function (o, i) { o.setAttribute('aria-selected', String(i === activo)); });
      var o = opcionesEl()[activo];
      if (o) { input.setAttribute('aria-activedescendant', o.id); o.scrollIntoView({ block: 'nearest' }); } else input.removeAttribute('aria-activedescendant');
    };
    var pintar = function () {
      var q = input.value.trim();
      if (!q) { cerrar(); return; }
      var b = compilarBusqueda(q);
      var ops = REFS.filter(function (r) { return coincideBusqueda(r, b); }).sort(porPeso).slice(0, 6);
      var html = ops.map(function (r, i) {
        return '<li role="option" id="' + lista.id + '-' + i + '" aria-selected="false" data-href="#producto-' + r.p.slug + '~' + presSlug(r.pr.contenido) + '"><span>' + esc(r.p.nombre) + '</span><span class="sug-pres">' + fmtPres(r.pr.contenido) + '</span></li>';
      }).join('');
      if (!ops.length) html = '<li role="option" aria-disabled="true" class="sug-vacia" id="' + lista.id + '-vacia">Sin coincidencias en el catálogo</li>';
      html += '<li role="option" aria-selected="false" id="' + lista.id + '-todos" class="sug-todos" data-q="1">Buscar «' + esc(q) + '» en Productos</li>';
      lista.innerHTML = html; lista.hidden = false; input.setAttribute('aria-expanded', 'true'); activo = -1; marcar();
    };
    var ir = function (o) {
      if (!o) return;
      var q = input.value;
      cerrar(); input.value = '';
      cerrarTodo(false);
      if (o.hasAttribute('data-q')) irBusqueda(q); else location.hash = o.getAttribute('data-href');
    };
    input.addEventListener('input', function () { clearTimeout(t); t = setTimeout(pintar, 120); });
    input.addEventListener('keydown', function (e) {
      var ops = opcionesEl();
      if (e.key === 'ArrowDown') { e.preventDefault(); if (lista.hidden) pintar(); activo = Math.min(activo + 1, opcionesEl().length - 1); marcar(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); activo = Math.max(activo - 1, -1); marcar(); }
      else if (e.key === 'Enter') { e.preventDefault(); if (activo >= 0 && ops[activo]) ir(ops[activo]); else { var q = input.value; cerrar(); input.value = ''; cerrarTodo(false); irBusqueda(q); } }
      else if (e.key === 'Escape') { if (!lista.hidden) { e.preventDefault(); e.stopPropagation(); cerrar(); } else if (input.value) { e.preventDefault(); input.value = ''; } }
    });
    lista.addEventListener('mousedown', function (e) { e.preventDefault(); });
    lista.addEventListener('click', function (e) { var o = e.target.closest('[role="option"]'); if (o && o.getAttribute('aria-disabled') !== 'true') ir(o); });
    input.addEventListener('blur', function () { setTimeout(cerrar, 120); });
  }

  /* =========================================================
     Enrutamiento por hash
     ========================================================= */
  var ultimoHash = null;
  var primeraCarga = true;
  function montar(html) {
    var v = $('#vista');
    v.innerHTML = html;
    // El encabezado (migas, H1 y entradilla) sale del contenedor y va en una banda Verde tenue de borde dentado
    var cab = $('.pagina-cab', v);
    if (cab) {
      var env = cab.parentNode, banda = document.createElement('div'), dentro = document.createElement('div');
      banda.className = 'pagina-banda dentado-abajo'; dentro.className = 'envoltura';
      var mig = $('.migas', env);
      if (mig && mig.parentNode === env) dentro.appendChild(mig);
      dentro.appendChild(cab); banda.appendChild(dentro);
      v.insertBefore(banda, v.firstChild);
    }
    v.hidden = false;
    $('#vista-inicio').hidden = true;
  }
  function parsear() {
    var h = location.hash.replace(/^#/, '');
    try { h = decodeURIComponent(h); } catch (e) { /* hash mal formado */ }
    if (!h || h === 'contenido') h = 'inicio';
    var partes = h.split('~');
    return { base: partes[0], tokens: partes.slice(1).filter(function (t) { return /^[A-Za-z0-9._~-]+$/.test(t); }) };
  }
  var marcadosVt = [];
  function marcarVt(slug) {
    if (!slug) return;
    var el = $$('[data-vt="' + slug + '"]').filter(function (x) {
      var r = x.getBoundingClientRect(); return r.width && r.bottom > 0 && r.top < window.innerHeight;
    })[0];
    if (el) { el.style.viewTransitionName = 'packshot'; marcadosVt.push(el); }
  }
  function desmarcarVt() { marcadosVt.forEach(function (el) { el.style.viewTransitionName = ''; }); marcadosVt = []; }
  function navegar() {
    if (location.hash === ultimoHash) return;
    if (primeraCarga || !document.startViewTransition || reducido()) { mostrarRuta(); return; }
    var destino = parsear().base;
    var slug = destino.indexOf('producto-') === 0 ? destino.slice(9) : (ficha ? ficha.p.slug : null);
    marcarVt(slug);
    try {
      var t = document.startViewTransition(function () { desmarcarVt(); mostrarRuta(); marcarVt(slug); });
      t.finished.then(desmarcarVt, desmarcarVt);
    } catch (err) { desmarcarVt(); mostrarRuta(); }
  }
  function mostrarRuta() {
    if (location.hash === ultimoHash) return;
    ultimoHash = location.hash;
    cerrarTodo(false);
    ocultarAviso();
    var r = parsear();
    var titulo = '', grupo = r.base, rutaBody = r.base;
    ficha = null;
    $('#barra-ficha').hidden = true; document.body.classList.remove('con-barra-ficha');
    quitarLdProducto();
    if (r.base === 'inicio') {
      $('#vista').hidden = true; $('#vista').innerHTML = ''; $('#vista-inicio').hidden = false;
      titulo = 'Mundilácteos | Leche en polvo empacada en Cartagena';
    } else if (r.base === 'productos') {
      vistaProductos(r.tokens); titulo = 'Productos | Mundilácteos';
    } else if (r.base.indexOf('producto-') === 0) {
      rutaBody = 'producto'; grupo = 'productos';
      vistaProducto(r.base.slice(9), r.tokens);
      titulo = document.title;
      if (!ficha) rutaBody = '404';
    } else if (r.base === 'cotizar') {
      vistaCotizar(r.tokens); titulo = 'Solicitar cotización | Mundilácteos';
    } else if (r.base.indexOf('articulo-') === 0) {
      grupo = 'recursos'; rutaBody = 'articulo';
      titulo = vistaArticulo(r.base.slice(9)) + ' | Mundilácteos';
    } else if (PAGINAS[r.base]) {
      titulo = PAGINAS[r.base](r.tokens) + ' | Mundilácteos';
    } else {
      rutaBody = '404'; titulo = vista404() + ' | Mundilácteos';
    }
    document.title = titulo;
    document.body.setAttribute('data-ruta', rutaBody);
    document.body.classList.toggle('sin-barra', rutaBody === 'cotizar' || rutaBody === 'producto');
    $$('[data-nav]').forEach(function (a) { if (a.getAttribute('data-nav') === grupo) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    actualizarConteos(false);
    window.scrollTo(0, 0);
    var h1 = $(r.base === 'inicio' ? '#vista-inicio h1' : '#vista h1');
    if (h1) {
      h1.setAttribute('tabindex', '-1');
      if (!primeraCarga || location.hash) h1.focus({ preventScroll: true });
    }
    // Enlace a una sección de la página (#calidad~lote, #contacto~motivo-pqr): se baja a ella y se enfoca su título
    var destino = null;
    r.tokens.forEach(function (t) {
      var el = document.getElementById('s-' + (t.indexOf('motivo-') === 0 ? 'escribanos' : t));
      if (el && $('#vista').contains(el)) destino = el;
    });
    if (destino) {
      var hd = $('h2', destino);
      if (hd) { hd.setAttribute('tabindex', '-1'); hd.focus({ preventScroll: true }); }
      destino.scrollIntoView();
    }
    primeraCarga = false;
  }

  /* =========================================================
     Eventos delegados
     ========================================================= */
  function leerCant(inp) { var n = parseInt(String(inp.value).replace(/\D/g, ''), 10); return n > 0 ? Math.min(n, 9999) : 0; }
  function cambiarCant(cont, nueva, origen) {
    var id = cont.getAttribute('data-ref');
    nueva = Math.max(1, Math.min(9999, nueva));
    if (linea(id)) {
      var modo = cont.getAttribute('data-modo');
      var l = linea(id); l.cant = nueva; guardarCot();
      actualizarNumerosCot(); actualizarConteos(false);
      sincronizarRef(id, nueva, origen);
      if (document.body.getAttribute('data-ruta') === 'cotizar') renderResumenCotizar();
      if (modo === 'ficha' || modo === 'barra') refrescarAccionesFicha();
    } else { pend[id] = nueva; sincronizarRef(id, nueva, origen); }
  }
  function destinoCot() {
    // Prioridad: la columna de Mi cotización (desde 1440 px), la franja (1024 a 1439 px) y después el botón Cotizar visible
    var cands = [].concat($$('.cot-columna .cot-cab'), $$('#franja-cot:not([hidden]) .franja-in p'), $$('[data-destino-cot]'));
    for (var i = 0; i < cands.length; i++) {
      var r = cands[i].getBoundingClientRect();
      if (r.width && r.height && r.bottom > 0 && r.top < window.innerHeight) return cands[i];
    }
    return null;
  }
  function pulso(el) {
    if (!el || reducido()) return;
    el.classList.remove('recibe'); void el.offsetWidth; el.classList.add('recibe');
    $$('[data-conteo]', el).forEach(function (c) { c.classList.remove('salta'); void c.offsetWidth; c.classList.add('salta'); });
    setTimeout(function () { el.classList.remove('recibe'); }, 450);
  }
  // FLIP: la miniatura del empaque sale de su lugar y vuela a "Mi cotización"; con movimiento reducido solo cambia el número
  function volarACotizacion(origen, picto) {
    var destino = destinoCot();
    if (!destino) return;
    if (reducido() || !origen || !Element.prototype.animate) { pulso(destino); return; }
    var ro = origen.getBoundingClientRect(), rd = destino.getBoundingClientRect();
    var enVista = ro.width && ro.bottom > 0 && ro.top < window.innerHeight;
    var el, w, h;
    if (origen.tagName === 'IMG' && enVista) {
      el = document.createElement('img'); el.src = origen.currentSrc || origen.src; el.alt = ''; el.className = 'vuelo';
      h = Math.min(ro.height, 160); w = ro.width * h / ro.height;
    } else {
      el = document.createElement('span'); el.className = 'vuelo vuelo--picto'; el.innerHTML = icono(picto || 'p-bolsa', 'icono');
      w = h = 48;
    }
    el.setAttribute('aria-hidden', 'true');
    el.style.setProperty('--w', w + 'px'); el.style.setProperty('--h', h + 'px');
    var x0 = ro.left + ro.width / 2 - w / 2, y0 = ro.top + ro.height / 2 - h / 2;
    var x1 = rd.left + rd.width / 2 - w / 2, y1 = rd.top + rd.height / 2 - h / 2;
    var xm = x0 + (x1 - x0) * 0.55, ym = Math.max(8, Math.min(y0, y1) - 90);
    document.body.appendChild(el);
    var a = el.animate([
      { transform: 'translate(' + x0 + 'px,' + y0 + 'px) scale(1) rotate(0deg)', opacity: 1 },
      { transform: 'translate(' + xm + 'px,' + ym + 'px) scale(0.72) rotate(-10deg)', opacity: 1, offset: 0.55 },
      { transform: 'translate(' + x1 + 'px,' + y1 + 'px) scale(0.22) rotate(-16deg)', opacity: 0.35 },
    ], { duration: 560, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', fill: 'forwards' });
    var fin = function () { if (el.parentNode) el.parentNode.removeChild(el); pulso(destino); };
    a.onfinish = fin; a.oncancel = fin;
  }
  function origenVuelo(cont, boton) {
    var modo = cont.getAttribute('data-modo');
    var img = modo === 'fila' ? $('.producto-foto img', cont.closest('.producto') || document) : $('.galeria-principal img');
    if (img) { var r = img.getBoundingClientRect(); if (r.width && r.bottom > 0 && r.top < window.innerHeight) return img; }
    return boton || cont;
  }
  function agregarDesde(cont, boton) {
    var id = cont.getAttribute('data-ref'), r = REF[id];
    var inp = $('[data-cant]', cont);
    var cant = leerCant(inp) || 1;
    var ya = !!linea(id);
    var origen = origenVuelo(cont, boton);
    fijarLinea(id, cant);
    volarACotizacion(origen, esBulto(r.pr) ? 'p-bulto' : 'p-bolsa');
    var fila = cont.closest('tr');
    if (fila && !reducido()) { fila.classList.remove('resaltada'); void fila.offsetWidth; fila.classList.add('resaltada'); }
    avisar('<p>' + (ya ? 'Cotización actualizada: ' : 'Agregado a la cotización: ') + esc(nombreRefNB(r)) + ', ' + cant + ' ' + unidad(r.pr, cant) + '.</p><p class="aviso-acciones"><button type="button" class="enlace-boton" data-abrir-panel>Ver cotización</button></p>');
    if (boton && cont.getAttribute('data-modo') === 'fila') { var q = $('[data-quitar]', cont); if (q) q.focus(); }
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    var el;
    if ((el = t.closest('[data-saltar]'))) {
      e.preventDefault();
      var h1 = $('#vista').hidden ? $('#vista-inicio h1') : $('#vista h1');
      if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus(); h1.scrollIntoView(); }
      return;
    }
    if ((el = t.closest('[data-menos], [data-mas]'))) {
      var cont = el.closest('[data-ref]'); var inp = $('[data-cant]', cont);
      var n = (leerCant(inp) || 1) + (el.hasAttribute('data-mas') ? 1 : -1);
      if (n < 1) { avisar('<p>La cantidad mínima es 1 ' + unidad(REF[cont.getAttribute('data-ref')].pr, 1) + '.</p>', 3000); n = 1; }
      inp.value = n; cambiarCant(cont, n, inp); return;
    }
    if ((el = t.closest('[data-agregar]'))) { agregarDesde(el.closest('[data-ref]'), el); return; }
    if ((el = t.closest('[data-agregar-ficha]'))) {
      var c2 = el.closest('#barra-ficha') ? $('#barra-ficha [data-ref]') : $('.ficha-cantidad');
      agregarDesde(c2, el); return;
    }
    if ((el = t.closest('[data-quitar]'))) {
      var c3 = el.closest('[data-ref]'); var id = c3.getAttribute('data-ref'); var r = REF[id];
      var modo = c3.getAttribute('data-modo');
      quitarLinea(id);
      avisar('<p>Quitado de la cotización: ' + esc(nombreRefNB(r)) + '.</p>', 3500);
      if (modo === 'fila') { var a = $('[data-agregar]', c3); if (a) a.focus(); }
      if (modo === 'ficha') { var b2 = $('[data-agregar-ficha]'); if (b2) b2.focus(); }
      return;
    }
    if ((el = t.closest('[data-abrir-panel]'))) { e.preventDefault(); abrirPanel(el); return; }
    if ((el = t.closest('[data-cerrar-panel]'))) { cerrarPanel(); return; }
    if (t.closest('#velo')) { if (!$('#panel-cot').hidden) cerrarPanel(); else cerrarFiltros(); return; }
    if ((el = t.closest('[data-copiar-enlace]'))) { copiarEnlace(); return; }
    if ((el = t.closest('[data-vaciar]'))) { vaciar(); return; }
    if ((el = t.closest('[data-deshacer]'))) {
      if (deshacer) { cot.lineas = deshacer; deshacer = null; guardarCot(); alCambiarCot({ estructura: true }); avisar('<p>Cotización recuperada.</p>', 3000); }
      return;
    }
    if ((el = t.closest('[data-repetir]'))) {
      if (cot.ultima) { cot.lineas = cot.ultima.lineas.map(function (l) { return { id: l.id, cant: l.cant }; }); guardarCot(); alCambiarCot({ estructura: true }); avisar('<p>Recuperamos su última solicitud: ' + textoRefs(cot.lineas.length) + '.</p>', 4000); }
      return;
    }
    if ((el = t.closest('[data-abrir-menu]'))) { abrirMenu(el); return; }
    if ((el = t.closest('[data-cerrar-menu]'))) { cerrarMenu(); return; }
    if ((el = t.closest('[data-abrir-buscador]'))) {
      var cab = $('#cabecera'); var abierto = cab.classList.toggle('cabecera--buscando');
      el.setAttribute('aria-expanded', String(abierto));
      if (abierto) $('#busca-cabecera').focus();
      return;
    }
    if ((el = t.closest('[data-accion-buscar]'))) {
      if (document.body.getAttribute('data-ruta') === 'productos' && $('#busca-productos')) { $('#busca-productos').focus(); $('#busca-productos').scrollIntoView({ block: 'center' }); }
      else abrirMenu(el, '#busca-menu');
      return;
    }
    if ((el = t.closest('[data-accion-cotizar]'))) {
      if (cot.lineas.length) { e.preventDefault(); abrirPanel(el); }
      return;
    }
    if ((el = t.closest('[data-abrir-filtros]'))) { abrirFiltros(el); return; }
    if ((el = t.closest('[data-cerrar-filtros]'))) { cerrarFiltros(); return; }
    if ((el = t.closest('[data-quitar-filtros]'))) {
      var q = estadoCat ? estadoCat.q : '';
      estadoCat = estadoVacio(); estadoCat.q = el.closest('.sin-resultados') ? '' : q;
      if (el.closest('.aplicados')) estadoCat.q = '';
      var bq = $('#busca-productos'); if (bq) bq.value = estadoCat.q;
      aplicarEstado(true); return;
    }
    if ((el = t.closest('[data-quitar-filtro]'))) {
      var kv = el.getAttribute('data-quitar-filtro').split('|');
      estadoCat[kv[0]] = estadoCat[kv[0]].filter(function (v) { return v !== kv[1]; });
      aplicarEstado(true);
      var sig = $('#aplicados .chip-quitar') || $('#busca-productos'); if (sig) sig.focus();
      return;
    }
    if ((el = t.closest('[data-quitar-busqueda]'))) {
      estadoCat.q = ''; var bq2 = $('#busca-productos'); if (bq2) bq2.value = '';
      aplicarEstado(true); if (bq2) bq2.focus(); return;
    }
    if ((el = t.closest('[data-foto]'))) {
      ficha.foto = el.getAttribute('data-foto'); renderFichaDep();
      var nb = $('[data-foto="' + ficha.foto + '"]'); if (nb) nb.focus();
      return;
    }
    if ((el = t.closest('.acordeon-boton'))) {
      if (esEscritorio()) return;
      var exp = el.getAttribute('aria-expanded') === 'true';
      el.setAttribute('aria-expanded', String(!exp));
      var cuerpo = document.getElementById(el.getAttribute('aria-controls'));
      cuerpo.hidden = exp;
      if (!exp && !reducido()) { cuerpo.classList.remove('abre'); void cuerpo.offsetWidth; cuerpo.classList.add('abre'); }
      return;
    }
    if ((el = t.closest('[data-continuar]'))) {
      var actual = formCot.paso;
      if (validarPaso(actual)) irPaso(+el.getAttribute('data-continuar'), true);
      return;
    }
    if ((el = t.closest('[data-volver]'))) { irPaso(+el.getAttribute('data-volver'), true); return; }
    if ((el = t.closest('[data-ir-campo]'))) {
      var k = el.getAttribute('data-ir-campo');
      var campo = $('#c-' + k) || $('[data-campo="' + k + '"] input');
      if (campo) { campo.focus(); campo.scrollIntoView({ block: 'center' }); }
      return;
    }
    if ((el = t.closest('[data-usar-compartida]'))) {
      cot.lineas = vistaCotizar.compartida.slice(); guardarCot();
      try { history.replaceState(null, '', '#cotizar'); } catch (err) { /* */ }
      ultimoHash = location.hash; var ban = $('.banner-compartida'); if (ban) ban.parentNode.removeChild(ban);
      alCambiarCot({ estructura: true }); avisar('<p>Usamos la cotización que le enviaron.</p>', 3500);
      $('#vista h1').focus(); return;
    }
    if ((el = t.closest('[data-conservar]'))) {
      try { history.replaceState(null, '', '#cotizar'); } catch (err) { /* */ }
      ultimoHash = location.hash; var ban2 = $('.banner-compartida'); if (ban2) ban2.parentNode.removeChild(ban2);
      $('#vista h1').focus(); return;
    }
    if ((el = t.closest('[data-ciudad], [data-ciudad-rotulo]'))) { elegirCiudad(el.getAttribute('data-ciudad') || el.getAttribute('data-ciudad-rotulo'), true); return; }
    if ((el = t.closest('[data-tema]'))) {
      var tm = el.getAttribute('data-tema');
      try { history.replaceState(null, '', '#recursos' + (tm ? '~tema-' + tm : '')); } catch (err) { /* sin historial */ }
      ultimoHash = location.hash; pintarRecursos(tm); return;
    }
    if ((el = t.closest('[data-ubicacion]'))) { usarUbicacion(); return; }
    if ((el = t.closest('[data-ir-id]'))) {
      var ob = document.getElementById(el.getAttribute('data-ir-id'));
      if (ob) { ob.focus(); ob.scrollIntoView({ block: 'center' }); }
      return;
    }
    // Enlaces internos que apuntan a la ruta actual: forzar vuelta arriba
    if ((el = t.closest('a[href^="#"]')) && el.getAttribute('href') === location.hash) {
      e.preventDefault(); ultimoHash = null; navegar();
    }
  });

  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches('[data-cant]')) {
      var cont = t.closest('[data-ref]');
      var n = leerCant(t);
      if (n) cambiarCant(cont, n, t);
      return;
    }
    if (t.id === 'busca-productos') {
      clearTimeout(t._t);
      t._t = setTimeout(function () { estadoCat.q = t.value; aplicarEstado(true); }, 120);
      return;
    }
    if (t.closest('#conversor')) { calcConversor(); return; }
    if (t.closest('[data-form]')) {
      var cg = t.closest('[data-campo]');
      if (cg && cg.classList.contains('con-error')) validarCampoGen(t.closest('[data-form]'), cg.getAttribute('data-campo'));
      return;
    }
    if (t.closest('#form-cot')) {
      var campo = t.closest('[data-campo]');
      if (campo && campo.classList.contains('con-error')) validarCampo(campo.getAttribute('data-campo'));
      if (t.id === 'c-otros' || t.id === 'c-ciudad' || t.name === 'negocio') actualizarWaForm();
    }
  });
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.matches('[data-cant]')) {
      var n = leerCant(t);
      if (!n) { avisar('<p>La cantidad mínima es 1 ' + unidad(REF[t.closest('[data-ref]').getAttribute('data-ref')].pr, 1) + '.</p>', 3000); n = 1; t.value = 1; }
      cambiarCant(t.closest('[data-ref]'), n, null);
      return;
    }
    if (t.matches('[data-faceta]')) {
      var k = t.getAttribute('data-faceta');
      if (t.checked) { if (estadoCat[k].indexOf(t.value) === -1) estadoCat[k].push(t.value); }
      else estadoCat[k] = estadoCat[k].filter(function (v) { return v !== t.value; });
      aplicarEstado(true); return;
    }
    if (t.id === 'orden') { estadoCat.orden = t.value; aplicarEstado(true); return; }
    if (t.name === 'presentacion-ficha' && ficha) {
      var pr = ficha.p.presentaciones.filter(function (x) { return presSlug(x.contenido) === t.value; })[0];
      ficha.pr = pr; ficha.foto = 'frente';
      try { history.replaceState(null, '', '#producto-' + ficha.p.slug + '~' + t.value); } catch (err) { /* */ }
      ultimoHash = location.hash;
      renderFichaDep();
      return;
    }
    if (t.closest('#form-cot') && t.name === 'negocio') validarCampo('negocio');
    if (t.id === 'contacto-motivo') alCambiarMotivo(t.value);
    if (t.closest('[data-form]')) {
      var cg = t.closest('[data-campo]');
      if (cg && (cg.classList.contains('con-error') || t.tagName === 'SELECT')) validarCampoGen(t.closest('[data-form]'), cg.getAttribute('data-campo'));
    }
  });
  document.addEventListener('focusout', function (e) {
    var t = e.target;
    if (t.closest && t.closest('[data-form]')) {
      var cg = t.closest('[data-campo]'), fg = t.closest('[data-form]');
      if (!cg || t.type === 'checkbox' || t.type === 'radio' || t.tagName === 'SELECT') return;
      var kg = cg.getAttribute('data-campo');
      if (t.value || cg.classList.contains('con-error')) setTimeout(function () { if (document.body.contains(cg)) validarCampoGen(fg, kg); }, 250);
      return;
    }
    if (t.closest && t.closest('#form-cot')) {
      var campo = t.closest('[data-campo]');
      if (!campo || t.type === 'radio' || t.type === 'checkbox') return;
      var k = campo.getAttribute('data-campo');
      if (k === 'otros') return;
      // Se valida un instante después para que el mensaje no desplace el botón que se está pulsando
      if (t.value || campo.classList.contains('con-error')) setTimeout(function () { if (document.body.contains(campo)) validarCampo(k); }, 250);
    }
  });
  document.addEventListener('submit', function (e) {
    if (e.target.id === 'form-cot') { e.preventDefault(); enviarCot(); }
    else if (e.target.matches('[data-form]')) { e.preventDefault(); enviarGen(e.target); }
    else if (e.target.id === 'form-donde') { e.preventDefault(); buscarDonde(); }
    else if (e.target.id === 'conversor' || e.target.id === 'fila-inicio' || e.target.id === 'calculadora') { e.preventDefault(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && $('#cabecera').classList.contains('cabecera--buscando')) {
      $('#cabecera').classList.remove('cabecera--buscando');
      var b = $('[data-abrir-buscador]'); b.setAttribute('aria-expanded', 'false'); b.focus();
    }
  });
  window.addEventListener('hashchange', navegar);
  window.addEventListener('scroll', function () { document.body.classList.toggle('compacta', window.scrollY > 40); }, { passive: true });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', function () {
    if (esEscritorio()) { cerrarFiltros(); if (!$('#menu-movil').hidden) cerrarMenu(); }
  });

  /* =========================================================
     Inicio
     ========================================================= */
  leerCot();
  ldOrganizacion();
  $$('[data-wa="general"]').forEach(function (a) { a.href = waHref(MSJ_GENERAL); });
  $$('[data-buscador]').forEach(iniciarBuscador);
  iniciarFila();
  iniciarCalculadora();
  navegar();
  actualizarConteos(false);
})();

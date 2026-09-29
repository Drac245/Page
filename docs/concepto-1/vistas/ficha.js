/* Mundilácteos. Concepto 1: Paralelo 10. Ficha de producto.
   Se carga la primera vez que se visita esta página; usa las utilidades que app.js expone en window.MUNDI_C1. */
(function (N) {
  'use strict';
  if (!N) return;
  var actualizarRuta = N.actualizarRuta;
  var $ = N['$'];
  var $$ = N['$$'];
  var C = N.C;
  var DIM = N.DIM;
  var INVIMA = N.INVIMA;
  var MARCAS = N.MARCAS;
  var NNBSP = N.NNBSP;
  var PRODS = N.PRODS;
  var REGS = N.REGS;
  var VISTAS = N.VISTAS;
  var anunciar = N.anunciar;
  var cambiarImg = N.cambiarImg;
  var casillaComparar = N.casillaComparar;
  var chipsPresentacion = N.chipsPresentacion;
  var conUnidad = N.conUnidad;
  var datosVentaHTML = N.datosVentaHTML;
  var enComparar = N.enComparar;
  var esBulto = N.esBulto;
  var esMezcla = N.esMezcla;
  var esc = N.esc;
  var escritorio = N.escritorio;
  var fechaCO = N.fechaCO;
  var fijarFicha = N.fijarFicha;
  var fmt = N.fmt;
  var icono = N.icono;
  var imagenDe = N.imagenDe;
  var kg = N.kg;
  var marcoToma = N.marcoToma;
  var migas = N.migas;
  var pintarBotonAgregar = N.pintarBotonAgregar;
  var plural = N.plural;
  var porConfirmar = N.porConfirmar;
  var presKey = N.presKey;
  var presPorDefecto = N.presPorDefecto;
  var presentacion = N.presentacion;
  var producto = N.producto;
  var reducido = N.reducido;
  var referencia = N.referencia;
  var rindeDe = N.rindeDe;
  var tablaTecnicaHTML = N.tablaTecnicaHTML;
  var tieneAsterisco = N.tieneAsterisco;
  var ventaDe = N.ventaDe;
  var waUrl = N.waUrl;

  /* ---------- Ficha de producto ---------- */
  /* Mientras el cliente no entregue los valores, una nota con los nutrientes que se publicarán (no una tabla vacía) */
  function tablaNutricionHTML(p) {
    var filas = ['Calorías', 'Grasa total', 'Grasa saturada', 'Grasas trans', 'Carbohidratos totales', 'Azúcares totales', 'Azúcares añadidos', 'Proteína', 'Sodio'];
    if (p.fortificacion === 'Hierro') filas.push('Hierro');
    var porciones = p.presentaciones.map(function (x) { var r = rindeDe(p, x); return r && r.porciones ? conUnidad(x.contenido) + ': ' + r.porciones + ' porciones' : null; }).filter(Boolean);
    return '<div class="nutricion-pendiente"><p>La tabla nutricional se publica con los valores de la etiqueta vigente, por 100' + NNBSP + 'g y por porción, en el formato de la Resolución 810 de 2021. ' + porConfirmar() + '</p>' +
      '<ul aria-label="Nutrientes que tendrá la tabla">' + filas.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul></div>' +
      (porciones.length ? '<p class="nota-asterisco">Porciones por envase, según el empaque: ' + esc(porciones.join('; ')) + '.</p>' : '');
  }
  function preguntasHTML(p) {
    var qs = [];
    if (esMezcla(p)) qs.push(['¿Es leche o mezcla láctea?', 'Es una mezcla láctea, no es leche: una mezcla en polvo a base de leche' + (p.categoria === 'mezcla-lactea' && /endulz/.test(p.denominacion) ? ' con endulzante' : '') + '. Su registro, ' + p.registro + ', la ampara como «' + esc(REGS[p.registro].producto) + '».']);
    else if (p.categoria === 'alimento-lacteo') qs.push(['¿Es leche o un alimento lácteo?', 'Es un alimento lácteo en polvo, registrado como tal (' + p.registro + '). Su composición se publica cuando esté confirmada.']);
    else qs.push(['¿Es leche o mezcla láctea?', 'Es leche en polvo: ' + esc(p.denominacion.toLowerCase()) + ', amparada en el registro ' + p.registro + '.']);
    var rinden = p.presentaciones.map(function (x) { var r = rindeDe(p, x); return r ? (r.fuente === 'empaque' ? 'la bolsa de ' + conUnidad(x.contenido) + ' rinde ' + fmt(r.litros) + ' litros según su empaque' : 'el bulto de ' + conUnidad(x.contenido) + ' da cerca de ' + fmt(Math.round(r.litros)) + ' litros a ' + C.calidad.preparacion.g_por_litro + ' g por litro') : null; }).filter(Boolean);
    qs.push(['¿Cuánto rinde?', rinden.length ? rinden.join('; ').replace(/^./, function (c) { return c.toUpperCase(); }) + '. ' + porConfirmar('cifras por unificar') : 'El rinde de este producto está por confirmar con su ficha técnica.']);
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
        '<img class="pack" id="pack-ficha" src="' + im.src + '" width="' + im.w + '" height="' + im.h + '" alt="' + esc(im.alt) + '" data-vt-pack="' + p.slug + '" fetchpriority="high" style="--nat-h:' + im.h + 'px"><span class="sombra" aria-hidden="true"></span></div>' +
        '<p class="ficha-pie-foto" id="pie-foto">' + esc(pieFoto(p, sel)) + '</p>' +
        (imagenes.length > 1 ? '<div class="miniaturas" role="group" aria-label="Fotos del empaque">' + imagenes.map(function (a, i) {
          var d = DIM[a] || [300, 400];
          return '<button class="miniatura" type="button" data-foto="' + a + '" aria-pressed="' + (('img/r-' + a) === im.src) + '"><img src="img/r-' + a + '" width="' + d[0] + '" height="' + d[1] + '" alt="" loading="lazy"><span class="sr">Ver foto ' + (i + 1) + ' del empaque</span></button>';
        }).join('') + '</div>' : '');
    } else {
      media = '<div data-vt-pack="' + p.slug + '">' + marcoToma('E01', p.presentaciones.length ? 'Frente de ' + esc(p.nombre) + ' por fotografiar, con el empaque «Nueva imagen» sobre fondo blanco.' : 'Empaque por definir: la marca y las presentaciones están por confirmar.', 's-reverso', '4 / 5', 'toma-vertical toma-ficha') + '</div>';
    }
    var compra = '';
    if (sel) {
      compra = '<fieldset class="ficha-bloque"><legend>Presentación</legend><div class="chips" id="chips-ficha">' + chipsPresentacion(p, 'pf-' + p.slug, sel) + '</div>' +
        (tieneAsterisco(p) ? '<p class="nota-asterisco">* Presentación por confirmar.</p>' : '') + '</fieldset>' +
        '<div class="ficha-datos"><dl class="datos-venta" id="datos-ficha" aria-live="polite">' + datosVentaHTML(p, sel) + '</dl></div>' +
        '<div class="cantidad"><span class="paso"><button type="button" data-paso-ficha="-1" aria-label="Quitar una">' + icono('i-menos') + '</button><label class="sr" for="cantidad-ficha" id="lbl-cantidad">Cantidad</label><input id="cantidad-ficha" type="text" inputmode="numeric" pattern="[0-9]*" value="1"><button type="button" data-paso-ficha="1" aria-label="Agregar una">' + icono('i-mas') + '</button></span>' +
        '<span id="unidad-ficha"></span><span class="equivalencia" id="equivalencia-ficha" aria-live="polite"></span></div>' +
        '<div class="ficha-acciones"><button class="btn btn-primario btn-agregar" type="button" data-agregar="' + p.slug + '" data-pres="' + presKey(sel.contenido) + '" data-ficha-boton>' + icono('i-mas', 'ico-mas') + '<span class="txt">Agregar a mi cotización</span></button>' +
        '<a class="btn btn-secundario" id="wa-ficha" href="#" target="_blank" rel="noopener">' + icono('i-wa', 'ico-relleno') + 'Preguntar por WhatsApp</a>' + casillaComparar(p.slug, presKey(sel.contenido), 'pf') + '</div>' +
        '<p class="mensaje-wa" id="mensaje-ficha"></p>' +
        '<div class="donde-linea" id="donde-ficha"></div>';
    } else {
      var msg = 'Hola, Mundilácteos. Quiero información sobre ' + p.nombre.toLowerCase() + ' (registro ' + p.registro + '). Estoy en ____.';
      compra = '<div class="ficha-datos"><p>Registro sanitario vigente desde 2025. La marca, la composición y las presentaciones se publican cuando estén confirmadas. ' + porConfirmar() + '</p></div>' +
        '<div class="ficha-acciones"><a class="btn btn-primario" href="' + esc(waUrl(msg)) + '" target="_blank" rel="noopener">' + icono('i-wa', 'ico-relleno') + 'Preguntar por WhatsApp</a></div>' +
        '<p class="mensaje-wa">Mensaje que se enviará al 319 769 0990: <q>' + esc(msg) + '</q></p>';
    }
    var anclas = [['sec-ficha', 'Ficha técnica'], ['sec-nutricion', 'Nutrición'], ['sec-preparacion', 'Preparación'], ['sec-bolsa', 'Cómo leer la bolsa'], ['sec-preguntas', 'Preguntas'], ['sec-relacionados', 'Relacionados']];
    var relacionados = PRODS.filter(function (x) { return x !== p && x.presentaciones.length && x.usos.some(function (u) { return p.usos.indexOf(u) !== -1; }); }).slice(0, 5);
    var acordeon = function (id, titulo, cuerpo) { return '<details class="acordeon" id="' + id + '" open><summary><h2>' + titulo + '</h2>' + icono('i-abajo') + '</summary><div class="acordeon-cuerpo">' + cuerpo + '</div></details>'; };
    var preparacion = p.categoria.indexOf('leche') === 0
      ? '<div class="cuerpo-texto"><p>' + esc(C.calidad.preparacion.texto) + '</p><p>' + esc(C.calidad.preparacion.incongruencia.replace(/"([^"]+)"/g, '«$1»')) + ' ' + porConfirmar('cifra por unificar') + '</p></div>'
      : '<div class="cuerpo-texto"><p>Siga las indicaciones del empaque. La proporción de preparación de este producto se publica con su ficha técnica. ' + porConfirmar() + '</p></div>';
    var bolsa = '<div class="ficha-dos"><div class="cuerpo-texto"><dl class="zonas-lista" style="display:grid;gap:.75rem">' +
      '<dt>Registro sanitario</dt><dd>' + p.registro + ', vigente hasta el ' + fechaCO(reg.vence) + '. Cópielo y verifíquelo en la consulta pública del INVIMA.</dd>' +
      '<dt>Lote</dt><dd>Día y turno de empaque, para rastrear cada bolsa. ' + porConfirmar() + '</dd>' +
      '<dt>Vencimiento</dt><dd>' + C.calidad.vida_util_meses + ' meses desde el empaque, con la bolsa cerrada.</dd>' +
      '<dt>Peso neto</dt><dd>' + (p.presentaciones.length ? p.presentaciones.map(function (x) { return conUnidad(x.contenido); }).join(', ') : 'Por confirmar') + '.</dd>' +
      '<dt>Tabla nutricional</dt><dd>Por porción y por 100' + NNBSP + 'g, con el formato de la Resolución 810 de 2021.</dd></dl></div>' +
      marcoToma('E02', 'Reverso legible de ' + esc(p.nombre) + ', por fotografiar a 4.000 px con las cinco zonas.', 's-reverso', '4 / 5', 'toma-vertical') + '</div>';
    var rel = '<section class="relacionados" id="sec-relacionados" aria-labelledby="h2-rel"><h2 id="h2-rel" class="h2-util" style="margin-top:var(--esp-5)">Otras presentaciones y relacionados</h2><div class="ficha-dos" style="margin-top:1rem">' +
      (p.presentaciones.length > 1 ? '<div><h3>Otras presentaciones de ' + esc(p.nombre) + '</h3><ul>' + p.presentaciones.map(function (x) { return '<li><a href="#producto-' + p.slug + '~' + presKey(x.contenido) + '">' + esc(referencia(p, x)) + (x.estado === 'por_confirmar' ? ' (por confirmar)' : '') + '</a></li>'; }).join('') + '</ul></div>' : '') +
      '<div><h3>Para el mismo uso</h3><ul>' + relacionados.map(function (x) { return '<li><a href="#producto-' + x.slug + '">' + esc(x.nombre) + '</a></li>'; }).join('') + '</ul></div></div></section>';
    var ld = { '@context': 'https://schema.org', '@type': 'Product', name: p.nombre, description: p.denominacion, brand: { '@type': 'Brand', name: MARCAS[p.marca].nombre }, manufacturer: { '@type': 'Organization', name: C.empresa.razon_social } };
    if (sel && sel.ean) ld.gtin13 = sel.ean;
    if (im) ld.image = im.src;
    var html =
      '<div class="contenedor ficha-cabeza">' + migas([['Inicio', '#inicio'], ['Productos', '#productos'], [p.nombre, '']]) +
        '<div class="ficha-rejilla"><div class="ficha-media">' + media + '</div>' +
        '<div class="ficha-info' + (becerrita ? ' becerrita' : '') + '">' +
          '<p class="marca-nombre">' + esc(MARCAS[p.marca].nombre) + (p.estado === 'por_confirmar' ? ' ' + porConfirmar('marca por confirmar') : '') + '</p>' +
          '<h1>' + esc(p.nombre) + '</h1>' + (p.nombre_por_confirmar ? '<p class="nombre-pendiente">' + porConfirmar('nombre comercial por confirmar') + '</p>' : '') +
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
    if (!reducido()) { info.classList.add('entra'); }
    if (!escritorio()) $$('.acordeon', vista).forEach(function (d, i) { d.open = i === 0; });
    if (!sel) { fijarFicha(null); return; }
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
        var cmp = $('[data-comparar]', vista);
        if (cmp) { cmp.setAttribute('data-comparar-pres', presKey(pr.contenido)); cmp.checked = enComparar(p.slug, presKey(pr.contenido)); $('[data-cmp-ref]', cmp.parentNode).textContent = ' ' + ref; }
        var dondeHTML = pr.donde.length
          ? '<p>¿Es para su casa? Dónde comprar ' + esc(conUnidad(pr.contenido)) + ':</p><ul>' + pr.donde.map(function (d) { return '<li><a href="' + esc(d.url) + '" target="_blank" rel="noopener">' + esc(d.canal) + '<span class="sr">, abre otra pestaña</span></a></li>'; }).join('') + '</ul>'
          : '<p>¿Es para su casa? Esta presentación aún no tiene enlaces verificados en supermercados. <a href="#donde-comprar">Ver dónde comprar</a></p>';
        $('#donde-ficha', vista).innerHTML = dondeHTML;
        var img = $('#pack-ficha', vista), im = imagenDe(p, pr);
        if (img && im) { img.style.setProperty('--nat-h', im.h + 'px'); img.alt = im.alt; }
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
        actualizarRuta();
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
        img.src = 'img/r-' + a; img.width = d[0]; img.height = d[1]; img.style.setProperty('--nat-h', d[1] + 'px');
        img.alt = a === 'cantaro-azucarada-380g-b.webp' ? 'The Cántaro Azucarada, bolsa de 380 g, otra vista' : (imagenDe(p, p.presentaciones.filter(function (x) { return x.imagen === a; })[0] || null) || { alt: img.alt }).alt;
        $$('.miniatura', vista).forEach(function (b) { b.setAttribute('aria-pressed', String(b === mini)); });
      }
    });
    fijarFicha({
      elegirDesdeRuta: function (r) {
        var k = (r.params || []).filter(function (t) { return presentacion(p, t); })[0];
        if (!k) return;
        var input = $('input[name="pf-' + p.slug + '"][value="' + k + '"]', vista);
        if (input && !input.checked) { input.checked = true; estado.pres = presentacion(p, k); pintar(true); }
      }
    });
  }
})(window.MUNDI_C1);

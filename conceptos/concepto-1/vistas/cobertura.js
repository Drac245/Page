/* Mundilácteos. Concepto 1: Paralelo 10. Página Distribución y cobertura.
   Se carga la primera vez que se visita esta página; usa las utilidades que app.js expone en window.MUNDI_C1. */
(function (N) {
  'use strict';
  if (!N) return;
  var $ = N['$'];
  var $$ = N['$$'];
  var CHECK = N.CHECK;
  var CIUDADES = N.CIUDADES;
  var NB = N.NB;
  var T_COSTA = N.T_COSTA;
  var T_RESTO = N.T_RESTO;
  var VISTAS = N.VISTAS;
  var btnWA = N.btnWA;
  var cabeza = N.cabeza;
  var enPagina = N.enPagina;
  var esc = N.esc;
  var lineaWA = N.lineaWA;
  var porConfirmar = N.porConfirmar;
  var reducido = N.reducido;
  var titulo2 = N.titulo2;
  var waUrl = N.waUrl;
  var actualizarRuta = N.actualizarRuta;
  var itemPack = N.itemPack;
  var escenaGrupo = N.escenaGrupo;
  var campoTexto = N.campoTexto;
  var campoWA = N.campoWA;
  var campoAcepto = N.campoAcepto;
  var montarFormulario = N.montarFormulario;
  var confirmar = N.confirmar;
  var resumenErroresHTML = N.resumenErroresHTML;
  var validaWA = N.validaWA;
  var validaTexto = N.validaTexto;

  /* ---------- Distribución y cobertura ---------- */
  var COB = [
    { id: 'cartagena', n: 'Cartagena', a: 1, ang: -60 }, { id: 'barranquilla', n: 'Barranquilla', a: 1, ang: -40 }, { id: 'santa-marta', n: 'Santa Marta', a: 1, ang: -20 },
    { id: 'riohacha', n: 'Riohacha', a: 1, ang: 0 }, { id: 'valledupar', n: 'Valledupar', a: 1, ang: 20 }, { id: 'sincelejo', n: 'Sincelejo', a: 1, ang: 40 }, { id: 'monteria', n: 'Montería', a: 1, ang: 60 },
    { id: 'bucaramanga', n: 'Bucaramanga', a: 2, ang: -36 }, { id: 'medellin', n: 'Medellín', a: 2, ang: -12 }, { id: 'bogota', n: 'Bogotá', a: 2, ang: 12 }, { id: 'cali', n: 'Cali', a: 2, ang: 36 }
  ];
  function cobPorId(id) { for (var i = 0; i < COB.length; i++) if (COB[i].id === id) return COB[i]; return null; }
  function anillosSVG(o) {
    var rot = o.rot || 0;
    var O = o.O, pt = function (r, ang) { var t = (ang + rot) * Math.PI / 180; return [O[0] + r * Math.cos(t), O[1] + r * Math.sin(t)]; };
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
    h += o.vertical
      ? '<g class="origen"><circle cx="' + O[0] + '" cy="' + O[1] + '" r="9"/><text x="' + (O[0] + 16) + '" y="' + (O[1] + 5) + '">Turbaco</text></g>'
      : '<g class="origen"><circle cx="' + O[0] + '" cy="' + O[1] + '" r="9"/><text x="' + (O[0] - 12) + '" y="' + (O[1] + 30) + '">Turbaco</text></g>';
    COB.forEach(function (c) {
      var p = pt(c.a === 1 ? o.r1 : o.r2, c.ang), fin = o.anclaFin && c.a === 2, etq;
      if (o.vertical) {
        /* Versión compacta: solo se ve el rótulo de la ciudad elegida, entre los dos anillos, sin tapar otros puntos */
        etq = '<text x="' + O[0] + '" y="' + (O[1] + o.r1 + 36) + '" text-anchor="middle">' + c.n + '</text>';
      } else etq = '<text x="' + f(p[0] + (fin ? -12 : 12)) + '" y="' + f(p[1] + 4.5) + '"' + (fin ? ' text-anchor="end"' : '') + '>' + c.n + '</text>';
      h += '<g class="ciudad" data-ciudad="' + c.id + '"><circle class="blanco-toque" cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="18"/><circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="6.5"/>' + etq + '</g>';
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
    var compacto = anillosSVG({ clase: 'anillos-compacto', w: 320, h: 300, O: [160, 30], r1: 118, a1: 72, r2: 232, a2: 44, rot: 90, vertical: true });
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
      '<section class="bloque" aria-labelledby="h2-anillos-c" style="padding-top:var(--esp-4)"><div class="contenedor">' + titulo2('h2-anillos-c', 'Anillos desde Turbaco', 'bloque-titulo') +
        '<div class="cobertura-rejilla"><figure>' + ancho + compacto +
          '<ul class="anillos-leyenda cob-leyenda"><li><span class="anillo-muestra" aria-hidden="true"></span>Anillo 1, Costa Caribe: ' + T_COSTA + '*</li><li><span class="anillo-muestra a2" aria-hidden="true"></span>Anillo 2, resto del país: ' + T_RESTO + '*</li></ul>' +
          '<figcaption class="meta" style="margin-top:0.75rem">Los anillos ordenan las ciudades por tiempo de entrega, no por distancia. Primer anillo, Costa Caribe: ' + T_COSTA + '. Segundo anillo, resto del país: ' + T_RESTO + '. * Tiempos de ejemplo, por confirmar con el área comercial.</figcaption></figure>' +
        '<div class="cob-ciudades"><fieldset><legend class="etiqueta" style="margin-bottom:0.5rem">Su ciudad</legend><div class="chips">' + chips + '</div></fieldset>' +
          '<div class="cob-resultado" id="cob-resultado" aria-live="polite">' + resultadoCobHTML(cobPorId(sel)) + '</div></div></div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-ciudades"><div class="contenedor">' + titulo2('h2-ciudades', 'Ciudades, tiempos y asesores', 'bloque-titulo') +
        '<div class="tabla-marco tabla-ciudades" tabindex="0" role="region" aria-labelledby="cap-ciudades"><table class="tabla tabla-fija"><caption id="cap-ciudades">Tiempos de entrega y pedido mínimo por ciudad (datos a confirmar)</caption>' +
        '<thead><tr><th scope="col">Ciudad</th><th scope="col">Anillo</th><th scope="col">Entrega</th><th scope="col">Pedido mínimo</th><th scope="col">Le atiende</th><th scope="col">Acción</th></tr></thead><tbody>' + filas + '</tbody></table></div>' +
        '<p class="nota" style="margin-top:0.75rem">* Tiempo de ejemplo desde la confirmación del pedido y asesor por zona: datos a confirmar con el área comercial, igual que el pedido mínimo.</p></div></section>' +
      '<section class="panel-bruma arco-sup seccion" aria-labelledby="h2-despacho"><div class="contenedor dos-col centrado">' +
        '<div class="con-tilt">' + escenaGrupo([itemPack('bultos-trio.webp', 'Tres bultos: The Cántaro Entera de 25 kg, La Becerrita Mezcla Láctea de 25 kg y The Cántaro Mezcla Láctea de 12,5 kg', 'ancho')], 'despacho-escena') + '</div>' +
        '<div>' + titulo2('h2-despacho', 'Cómo despachamos') + '<p style="margin-top:1rem">Despachamos a toda Colombia desde el Parque Industrial Europark, en el km 1 de la vía a Turbaco (Bolívar), en el área metropolitana de Cartagena.</p>' +
          '<dl class="ficha-datos-lista" style="margin-top:1.25rem"><dt>Origen</dt><dd>Parque Industrial Europark, Turbaco (Bolívar)</dd><dt>Formatos</dt><dd>Pacas de 12 a 30 bolsas y bultos de 12,5 y 25' + NB + 'kg</dd>' +
          '<dt>Tiempos</dt><dd>Costa Caribe: ' + T_COSTA + '. Resto del país: ' + T_RESTO + '. ' + porConfirmar() + '</dd><dt>Pedido mínimo</dt><dd>' + porConfirmar() + '</dd><dt>Días de despacho</dt><dd>' + porConfirmar() + '</dd></dl>' +
          '<div class="acciones" style="margin-top:1.5rem"><a class="btn btn-primario" href="#cotizar">Cotizar por volumen</a></div></div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-distribuidor" id="ser-distribuidor"><div class="contenedor dos-col siete-cinco">' +
        '<div id="caja-distribuidor">' + titulo2('h2-distribuidor', 'Ser distribuidor') +
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
        try { history.replaceState(null, '', '#distribucion' + (cobPorId(id) ? '~' + id : '')); actualizarRuta(); } catch (e) { /* sin historial */ }
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
})(window.MUNDI_C1);

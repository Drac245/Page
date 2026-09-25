/* Mundilácteos. Concepto 1: Paralelo 10. Página Calidad y registros.
   Se carga la primera vez que se visita esta página; usa las utilidades que app.js expone en window.MUNDI_C1. */
(function (N) {
  'use strict';
  if (!N) return;
  var C = N.C;
  var DATOS_GOV = N.DATOS_GOV;
  var INVIMA = N.INVIMA;
  var NB = N.NB;
  var PRODS = N.PRODS;
  var TEL = N.TEL;
  var TEL_HREF = N.TEL_HREF;
  var VISTAS = N.VISTAS;
  var btnCopiar = N.btnCopiar;
  var btnWA = N.btnWA;
  var cabeza = N.cabeza;
  var enPagina = N.enPagina;
  var enlaceExterno = N.enlaceExterno;
  var esc = N.esc;
  var fechaCO = N.fechaCO;
  var icono = N.icono;
  var lineaWA = N.lineaWA;
  var marcoToma = N.marcoToma;
  var notasHTML = N.notasHTML;
  var nw = N.nw;
  var porConfirmar = N.porConfirmar;
  var titulo2 = N.titulo2;
  var verificado = N.verificado;
  var recorridoHTML = N.recorridoHTML;
  var itemPack = N.itemPack;
  var escenaGrupo = N.escenaGrupo;
  var visorBolsaHTML = N.visorBolsaHTML;
  var fichaFilaHTML = N.fichaFilaHTML;

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
      return fichaFilaHTML(p);
    }).join('');
    var msgPQR = 'Hola, Mundilácteos. Quiero reportar un problema con un producto. Lote: ____. Vencimiento: ____. Ciudad: ____.';
    var html = cabeza({
      titulo: 'Calidad y registros', entradilla: 'Cada número de esta página se puede comprobar en una fuente pública.',
      lado: enPagina('calidad', [['h2-reg-c', 'Registros'], ['h2-cert', 'Establecimiento'], ['h2-proceso', 'Así trabajamos'], ['h2-bolsa-c', 'Cómo leer una bolsa'], ['h2-traza', 'Trazabilidad'], ['h2-empaque', 'Empaque'], ['h2-docs', 'Fichas técnicas']])
    }) +
      '<section class="banda noche arco-sup abre oscuro registros registros-calidad" aria-labelledby="h2-reg-c"><div class="contenedor">' +
        '<div class="registros-cabeza">' + titulo2('h2-reg-c', 'Cinco registros sanitarios vigentes') + '<p>Copie el número y consúltelo en el INVIMA. Última verificación: 25/09/2026.</p></div>' +
        '<table class="tabla-reg" role="table"><caption class="sr">Registros sanitarios de Mundilácteos ante el INVIMA</caption><thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader">Registro</th><th scope="col" role="columnheader">Ampara</th><th scope="col" role="columnheader">Modalidad</th><th scope="col" role="columnheader">Vigencia</th><th scope="col" role="columnheader">Verificar</th></tr></thead><tbody role="rowgroup">' + filas + '</tbody></table>' +
        '<div class="concepto-sanitario">' + verificado('Concepto sanitario favorable del establecimiento N.º 24741, línea «Leches en polvo y crema de leches en polvo».') + '<p>' + enlaceExterno(DATOS_GOV, 'Ver en datos.gov.co') + '</p></div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-cert"><div class="contenedor">' + titulo2('h2-cert', 'El establecimiento, verificado', 'bloque-titulo') +
        '<div class="certs certs-una">' +
          '<article class="cert cert-verificada" aria-labelledby="h3-invima"><p class="cert-estado">' + icono('i-verificado') + 'Verificado en fuente pública</p><h3 id="h3-invima">Concepto sanitario del INVIMA</h3>' +
            '<dl class="ficha-datos-lista"><dt>Ente</dt><dd>INVIMA</dd><dt>Establecimiento</dt><dd>N.º 24741, activo</dd><dt>Concepto</dt><dd>Favorable</dd><dt>Línea</dt><dd>Leches en polvo y crema de leches en polvo</dd><dt>Registros</dt><dd>Cinco, vigentes hasta 2028, 2030 y 2031</dd></dl>' +
            '<div class="acciones">' + enlaceExterno(DATOS_GOV, 'Ver en datos.gov.co') + enlaceExterno(INVIMA, 'Consulta de registros del INVIMA') + '</div></article>' +
        '</div></div></section>' +
      '<section class="bloque" aria-labelledby="h2-proceso"><div class="contenedor">' + titulo2('h2-proceso', 'Así trabajamos') +
        '<p class="bloque-intro" style="margin-top:1rem">Cinco pasos, de la recepción al camión. Lo que aún no tiene soporte está marcado.</p>' + recorridoHTML(pasos, 'pasos') +
        '<div class="proceso-fotos">' +
          '<figure class="con-tilt">' + escenaGrupo([itemPack('bultos-trio.webp', 'Tres bultos listos para despacho: The Cántaro Entera de 25 kg, La Becerrita Mezcla Láctea de 25 kg y The Cántaro Mezcla Láctea de 12,5 kg', 'ancho')], 'despacho-escena') +
            '<figcaption class="pie-escena">Paso 5, despacho: bultos de 25 y 12,5' + NB + 'kg listos para salir de Europark.</figcaption></figure>' +
          marcoToma('P01–P04', 'Recepción, análisis por lote, línea de empaque y codificación. Fotos por producir.', 's-linea-empaque', '3 / 2') +
        '</div>' +
      '</div></section>' +
      '<section class="panel-bruma arco-sup seccion" aria-labelledby="h2-bolsa-c"><div class="contenedor"><div class="encabezado-seccion">' + titulo2('h2-bolsa-c', 'Cómo leer una bolsa') + '</div>' + visorBolsaHTML('cq') + '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-traza"><div class="contenedor dos-col">' +
        '<div class="cuerpo-texto">' + titulo2('h2-traza', 'Trazabilidad por lote') +
          '<p>Cada bolsa y cada bulto llevan impresos su lote y su fecha de vencimiento. El lote indica el día y el turno de empaque: con él rastreamos la bolsa hasta su producción. ' + porConfirmar() + '</p>' +
          '<p>Si algo no está bien con un producto, el lote es lo primero que le vamos a pedir.</p></div>' +
        '<div class="recuadro"><h3>¿Encontró un problema con un producto?</h3><ol class="pasos-articulo" style="margin-top:1.25rem">' +
          '<li><h4 class="h4-paso">Guarde el empaque</h4><p>Anote el lote y la fecha de vencimiento, o tómeles una foto.</p></li>' +
          '<li><h4 class="h4-paso">Escríbanos</h4><p>Por WhatsApp o por el formulario de contacto, con la foto y su ciudad.</p></li>' +
          '<li><h4 class="h4-paso">Revisamos el lote</h4><p>El área de calidad revisa esa producción y le responde. Tiempo de respuesta: ' + porConfirmar() + '</p></li></ol>' +
          '<div class="acciones" style="margin-top:1.25rem"><a class="btn btn-primario" href="#contacto~pqr">Escribir por un producto</a>' + btnWA(msgPQR, 'WhatsApp', 'btn-secundario') + '</div>' + lineaWA(msgPQR) + '</div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-empaque"><div class="contenedor">' + titulo2('h2-empaque', 'Un empaque que protege la leche', 'bloque-titulo') +
        '<div class="empaque-rejilla"><div><h3>La bolsa</h3>' + capas +
          '<dl class="ficha-datos-lista"><dt>Material</dt><dd>' + esc(C.calidad.empaque.bolsa.replace('CO₂', 'CO2')).replace('CO2', 'CO<sub>2</sub>') + '</dd><dt>Capas</dt><dd>Composición de cada capa ' + porConfirmar() + '</dd><dt>Vida útil</dt><dd>' + C.calidad.vida_util_meses + ' meses, con la bolsa cerrada</dd><dt>Caja</dt><dd>' + esc(C.calidad.empaque.caja.valor) + ' ' + porConfirmar() + '</dd></dl></div>' +
          '<div class="con-tilt"><h3>El bulto</h3>' + escenaGrupo([itemPack('cantaro-entera-bulto-25kg.webp', 'The Cántaro Entera, bulto de 25 kg'), itemPack('cantaro-mezcla-bulto-12-5kg.webp', 'The Cántaro Mezcla Láctea, bulto de 12,5 kg')], 'escena-media') +
          '<dl class="ficha-datos-lista" style="margin-top:1.25rem"><dt>Material</dt><dd>' + esc(C.calidad.empaque.bulto) + '</dd><dt>Pesos</dt><dd>12,5 y 25' + NB + 'kg</dd></dl></div></div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-docs"><div class="contenedor"><div class="encabezado-seccion">' + titulo2('h2-docs', 'Fichas técnicas', 'h2-util') + '<a class="enlace" href="#recursos">Ver recursos</a></div>' +
        '<p class="bloque-intro">Cada ficha técnica es una página. Puede descargar una copia en HTML de la misma tabla.</p><ul class="fichas-lista">' + fichas + '</ul></div></section>' +
      '<section class="banda azul arco-sup arco-inf abre oscuro cierre cierre-interior" aria-labelledby="h2-pqr"><div class="contenedor cierre-rejilla"><div>' + titulo2('h2-pqr', '¿Encontró un problema con un producto?') +
        '<p style="margin-top:1rem;color:var(--c-bruma)">Tenga a mano el lote y escríbanos. Le responde el área de calidad.</p>' +
        '<div class="acciones"><a class="btn btn-primario" href="#contacto~pqr">Escribir por un producto</a><a class="btn btn-secundario" href="' + TEL_HREF + '">' + icono('i-tel') + 'Llamar al ' + TEL + '</a></div>' +
        '<p class="telefono-visible">WhatsApp y teléfono: ' + nw(TEL) + '.</p></div></div></section>' +
      notasHTML(['ISO 9001:2015: el sitio actual la declara, pero faltan el ente certificador, el número de certificado, el alcance y la vigencia. Según la dirección del concepto, la sección no se publica hasta tener ese soporte; si no está vigente, se retira.', 'Por confirmar con el cliente: detalle de la recepción, parámetros y laboratorio del análisis por lote, composición de cada capa de la bolsa y tiempo de respuesta de las PQR.', 'El PDF de cada ficha técnica se publica con el sitio, rotulado con su peso; en el prototipo se descarga una copia en HTML.']);
    return { titulo: 'Calidad y registros', html: html };
  };
})(window.MUNDI_C1);

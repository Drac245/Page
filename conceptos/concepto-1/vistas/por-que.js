/* Mundilácteos. Concepto 1: Paralelo 10. Página Por qué elegirnos.
   Se carga la primera vez que se visita esta página; usa las utilidades que app.js expone en window.MUNDI_C1. */
(function (N) {
  'use strict';
  if (!N) return;
  var C = N.C;
  var DATOS_GOV = N.DATOS_GOV;
  var INVIMA = N.INVIMA;
  var MAPS = N.MAPS;
  var NB = N.NB;
  var TEL = N.TEL;
  var VISTAS = N.VISTAS;
  var btnWA = N.btnWA;
  var cabeza = N.cabeza;
  var enlaceExterno = N.enlaceExterno;
  var esc = N.esc;
  var fechaCO = N.fechaCO;
  var icono = N.icono;
  var notasHTML = N.notasHTML;
  var nw = N.nw;
  var porConfirmar = N.porConfirmar;
  var titulo2 = N.titulo2;
  var itemPack = N.itemPack;
  var escenaGrupo = N.escenaGrupo;

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
      { id: 'registros', titulo: 'Cinco registros sanitarios vigentes', texto: 'Cada producto que vendemos está amparado por un registro del INVIMA, con su número y su fecha de vencimiento a la vista. El más próximo a vencer, el de leche en polvo, está vigente hasta el 24/05/2028.',
        acciones: '<a class="btn btn-primario" href="#calidad">Ver los registros</a>' + enlaceExterno(INVIMA, 'Verificar en el INVIMA'),
        prueba: '<div class="prueba-registros arco-sup arco-inf"><ol aria-label="Números de registro sanitario">' + regs + '</ol></div>' },
      { id: 'concepto', titulo: 'Concepto sanitario favorable', texto: 'El INVIMA registra nuestra planta como establecimiento activo, con concepto sanitario favorable para la línea de leches en polvo. Es un dato público, no una declaración nuestra.',
        acciones: '<a class="btn btn-secundario" href="' + esc(DATOS_GOV) + '" target="_blank" rel="noopener">Ver en datos.gov.co<span class="sr">, abre otra pestaña</span></a>',
        prueba: '<div class="prueba-documento"><div class="documento"><p class="doc-cabeza"><svg viewBox="0 0 40 48" aria-hidden="true"><path d="M6 3h20l8 8v34H6z"/><path d="M26 3v8h8"/><path d="M12 20h16M12 26h16M12 32h9"/><circle cx="29" cy="38" r="6"/><path d="M26.4 38.2l1.8 1.7 3.2-3.4"/></svg>Establecimiento ante el INVIMA</p>' +
          '<p class="doc-estado">' + icono('i-verificado') + 'Concepto favorable</p><dl class="ficha-datos-lista"><dt>N.º</dt><dd>24741</dd><dt>Línea</dt><dd>Leches en polvo y crema de leches en polvo</dd><dt>Titular</dt><dd>' + esc(C.empresa.razon_social) + '</dd><dt>NIT</dt><dd>' + C.empresa.nit + '</dd></dl></div></div>' },
      { id: 'planta', titulo: 'Planta propia en Europark', texto: 'Fabricamos y empacamos en el Parque Industrial Europark, en el km 1 de la vía a Turbaco, Bolívar. Si compra en volumen, venga a conocerla: coordine la visita con el área comercial.',
        acciones: '<a class="btn btn-primario" href="#contacto~visita">Solicitar visita a la planta</a><a class="btn btn-secundario" href="' + MAPS + '" target="_blank" rel="noopener">' + icono('i-lugar') + 'Cómo llegar<span class="sr">, abre Google Maps</span></a>',
        prueba: '<div class="prueba-documento"><div class="documento"><p class="doc-cabeza"><svg viewBox="0 0 40 48" aria-hidden="true"><path d="M4 44V20L20 10L36 20V44Z"/><path d="M15 44V32H25V44"/><path d="M2 44H38"/></svg>La planta de Mundilácteos</p>' +
          '<address class="doc-direccion"><strong>Parque Industrial Europark</strong><br>' + esc(C.empresa.direccion) + '<br>Turbaco, Bolívar</address>' +
          '<dl class="ficha-datos-lista"><dt>Titular</dt><dd>' + esc(C.empresa.razon_social) + '</dd><dt>NIT</dt><dd>' + nw(C.empresa.nit) + '</dd><dt>Establecimiento</dt><dd>N.º 24741, INVIMA</dd></dl></div></div>' },
      { id: 'empaque', titulo: 'Bolsa de tres capas sellada con CO<sub>2</sub> y ' + C.calidad.vida_util_meses + ' meses de vida útil', texto: 'La bolsa laminada de tres capas se termosella y se envasa en atmósfera controlada de CO<sub>2</sub>, que protege la leche de la humedad del Caribe. Cerrada, conserva su calidad ' + C.calidad.vida_util_meses + ' meses.',
        acciones: '<a class="btn btn-secundario" href="#producto-cantaro-entera">Ver ficha técnica</a><a class="enlace" href="#calidad">Cómo es el empaque</a>',
        prueba: '<div class="con-tilt">' + escenaGrupo([itemPack('cantaro-entera-500g.webp', 'The Cántaro Entera, bolsa laminada de 500 g', 'bolsa'), itemPack('cantaro-azucarada-380g.webp', 'The Cántaro Azucarada, bolsa de 380 g', 'bolsa-chica')], 'escena-media') + '<p class="pie-escena">Empaques de 2022, provisionales hasta las fotos «Nueva imagen» (E01).</p></div>' },
      { id: 'presentaciones', titulo: 'De 380' + NB + 'g a 25' + NB + 'kg, y con su marca', texto: 'Bolsas de 380 a 900' + NB + 'g para el hogar y la tienda, pacas de 12 a 30 bolsas y bultos de 12,5 y 25' + NB + 'kg para panaderías e industria. Y si su cadena quiere su propia marca, la empacamos con nuestro registro.',
        acciones: '<a class="btn btn-primario" href="#productos">Ver productos</a><a class="enlace" href="#marca-propia">Conocer la maquila</a>',
        prueba: '<div class="con-tilt">' + escenaGrupo([itemPack('becerrita-entera-380g.webp', 'La Becerrita Entera, bolsa de 380 g', 'bolsa-chica'), itemPack('cantaro-mezcla-900g.webp', 'The Cántaro Mezcla Láctea, bolsa de 900 g', 'bolsa'), itemPack('cantaro-mezcla-bulto-12-5kg.webp', 'The Cántaro Mezcla Láctea, bulto de 12,5 kg')], 'escena-media') + '</div>' },
      { id: 'despacho', titulo: 'Despacho a todo el país, con asesor por zona', texto: 'Salimos de Turbaco hacia la Costa Caribe y el resto de Colombia. Cada zona tiene un asesor que le confirma el tiempo de entrega y las condiciones de su pedido. ' + porConfirmar('tiempos por confirmar'),
        acciones: '<a class="btn btn-secundario" href="#distribucion">Ver cobertura</a><a class="enlace" href="#donde-comprar">Dónde comprar</a>',
        prueba: '<div class="con-tilt">' + escenaGrupo([itemPack('bultos-trio.webp', 'Tres bultos: The Cántaro Entera de 25 kg, La Becerrita Mezcla Láctea de 25 kg y The Cántaro Mezcla Láctea de 12,5 kg', 'ancho')], 'escena-media despacho-escena') + '</div>' }
    ];
    var ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: PREGUNTAS.map(function (q) { return { '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1].replace(/&#8239;/g, ' ') } }; }) };
    var msg = 'Hola, Mundilácteos. Quiero cotizar leche en polvo para mi negocio en ____.';
    var html = cabeza({ titulo: 'Por qué elegirnos', entradilla: 'Seis razones, cada una con la forma de comprobarla.' }) +
      '<div class="contenedor bloque" style="padding-top:var(--esp-4)"><div class="razones">' + razones.map(function (r) {
        return '<section class="razon" aria-labelledby="h2-r-' + r.id + '"><div class="razon-prueba">' + r.prueba + '</div><div class="razon-texto"><h2 id="h2-r-' + r.id + '">' + r.titulo + '</h2><p>' + r.texto + '</p><div class="acciones">' + r.acciones + '</div></div></section>';
      }).join('') + '</div></div>' +
      '<section class="panel-bruma arco-sup seccion" aria-labelledby="h2-preguntas"><div class="contenedor">' + titulo2('h2-preguntas', 'Lo que nos preguntan antes de comprar', 'bloque-titulo') +
        '<div class="preguntas preguntas-grandes">' + PREGUNTAS.map(function (q) {
          return '<details><summary>' + q[0] + icono('i-mas') + '</summary><div><p>' + q[1] + '</p><p><a class="enlace" href="' + q[2] + '">' + q[3] + '</a></p></div></details>';
        }).join('') + '</div></div></section>' +
      '<section class="banda azul arco-sup arco-inf abre oscuro cierre cierre-interior" aria-labelledby="h2-cierre-p"><div class="contenedor cierre-rejilla"><div>' + titulo2('h2-cierre-p', 'Arme su cotización sin crear cuenta.') +
        '<div class="acciones"><a class="btn btn-primario" href="#cotizar">Cotizar por volumen</a>' + btnWA(msg, 'Escribir a un asesor', 'btn-secundario') + '</div>' +
        '<p class="telefono-visible">WhatsApp y teléfono: ' + nw(TEL) + '.</p></div></div></section>' +
      notasHTML(['Testimonios de clientes: solo se publican reales, con nombre, negocio, ciudad y autorización escrita. Están por recopilar.', 'La foto de la fachada de la planta (P06) está por producir; mientras tanto, la razón «Planta propia» se prueba con la dirección y el establecimiento del INVIMA.']) +
      '<script type="application/ld+json">' + JSON.stringify(ld).replace(/</g, '\\u003c') + '<\/script>';
    return { titulo: 'Por qué elegirnos', html: html };
  };
})(window.MUNDI_C1);

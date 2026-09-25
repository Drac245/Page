/* Mundilácteos. Concepto 1: Paralelo 10. Página Nosotros.
   Se carga la primera vez que se visita esta página; usa las utilidades que app.js expone en window.MUNDI_C1. */
(function (N) {
  'use strict';
  if (!N) return;
  var C = N.C;
  var DATOS_GOV = N.DATOS_GOV;
  var DIRECCION_TXT = N.DIRECCION_TXT;
  var MAPS = N.MAPS;
  var MARCAS = N.MARCAS;
  var REGS = N.REGS;
  var TEL = N.TEL;
  var TEL_HREF = N.TEL_HREF;
  var VISTAS = N.VISTAS;
  var btnCopiar = N.btnCopiar;
  var cabezaGlobo = N.cabezaGlobo;
  var enlaceExterno = N.enlaceExterno;
  var entrarGlobo = N.entrarGlobo;
  var esc = N.esc;
  var fechaCO = N.fechaCO;
  var icono = N.icono;
  var marcoToma = N.marcoToma;
  var notasHTML = N.notasHTML;
  var nw = N.nw;
  var porConfirmar = N.porConfirmar;
  var producto = N.producto;
  var titulo2 = N.titulo2;
  var verificado = N.verificado;
  var recorridoHTML = N.recorridoHTML;
  var itemPack = N.itemPack;
  var escenaGrupo = N.escenaGrupo;

  /* ---------- Nosotros ---------- */
  VISTAS.nosotros = function () {
    var e = C.empresa;
    var historia = [
      { marca: e.constitucion.valor, titulo: 'Nace la empresa', texto: 'Constituida en ' + e.constitucion.valor + ' como ' + esc(e.razon_social) + ', NIT ' + nw(e.nit) + '. ' + porConfirmar() },
      { marca: '2017', titulo: 'Registro para mezclas lácteas', texto: 'El INVIMA expide el ' + nw('RSA-003008-2017') + ' para mezclas en polvo a base de leche y endulzantes, vigente hasta el ' + fechaCO(REGS['RSA-003008-2017'].vence) + '.' },
      { marca: '2018', titulo: 'Registro para leche en polvo', texto: nw('RSA-006359-2018') + ': leche en polvo entera, descremada, azucarada y fortificada. Es el registro de The Cántaro y La Becerrita.' },
      { marca: '2023', titulo: 'Registro para empacar', texto: nw('RSA-0027065-2023') + ': empacar y vender leche en polvo entera y descremada.' },
      { marca: '2025', titulo: 'Dos productos nuevos', texto: 'Alimento lácteo en polvo (' + nw('RSA-0036572-2025') + ') y mezcla láctea con café, endulzada con panela (' + nw('RSA-0037312-2025') + ').' },
      { marca: 'Hoy', titulo: 'Planta en Europark', texto: 'Fabricamos y empacamos en el Parque Industrial Europark, en Turbaco, y despachamos a todo el país.' }
    ];
    var bajo = '<p class="entradilla">Una empresa familiar con planta en Turbaco, Bolívar.</p>' +
      '<div class="credencial">' + verificado('Concepto sanitario favorable del INVIMA para la planta de Europark. ' + enlaceExterno(DATOS_GOV, 'Ver en datos.gov.co')) + '</div>';
    var html = cabezaGlobo({
      rastro: [['Inicio', '#inicio'], ['Nosotros', '']], k: 5.08, h1: '<span class="frag">Nosotros</span>', bajo: bajo, producto: true,
      foto: ['img/equipo-evento-b-recorte.webp', 560, 375, 'Siete personas del equipo de Mundilácteos en fila, con camisetas de La Becerrita']
    }) +
      '<section class="bloque" aria-labelledby="h2-somos"><div class="contenedor dos-col siete-cinco">' +
        '<div class="cuerpo-texto">' + titulo2('h2-somos', 'Leche en polvo hecha en Turbaco') +
          '<p>Somos ' + esc(e.razon_social.replace(/\.$/, '')) + '. En nuestra planta del Parque Industrial Europark, en el km 1 de la vía a Turbaco, fabricamos y empacamos leche en polvo con dos marcas de la casa, The Cántaro y La Becerrita, y con la marca de las cadenas y distribuidores que nos confían su producto.</p>' +
          '<p>Trabajamos con cinco registros sanitarios vigentes y despachamos desde Bolívar a tiendas, panaderías, supermercados e industria de todo el país.</p></div>' +
        '<dl class="ficha-datos-lista empresa-datos">' +
          '<dt>Razón social</dt><dd>' + esc(e.razon_social) + '</dd><dt>NIT</dt><dd class="num">' + e.nit + '</dd>' +
          '<dt>Planta</dt><dd>Parque Industrial Europark, Bodega 28</dd><dt>Municipio</dt><dd>Turbaco, Bolívar (área metropolitana de Cartagena)</dd>' +
          '<dt>Constitución</dt><dd>' + e.constitucion.valor + ' ' + porConfirmar() + '</dd>' +
          '<dt>Equipo</dt><dd>' + e.empleados.valor + ' personas ' + porConfirmar() + '</dd></dl>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-historia"><div class="contenedor">' + titulo2('h2-historia', 'Nuestra historia') +
        '<p class="bloque-intro">Cada año de esta línea remite a un documento público: el registro mercantil o un registro sanitario del INVIMA.</p>' +
        recorridoHTML(historia, 'anios') + '</div></section>' +
      '<section class="banda azul arco-sup abre oscuro" aria-labelledby="h2-gente"><div class="contenedor">' + titulo2('h2-gente', 'La gente que hace Mundilácteos') +
        '<p class="bloque-intro" style="margin-top:1.25rem;color:var(--c-bruma)">Detrás de cada bolsa hay alguien que la empaca, alguien que controla el lote y alguien que atiende su pedido. Pronto los conocerá por su nombre y su cargo.</p>' +
        '<div class="gente-rejilla"><figure><div class="ventana-franja arco-sup arco-inf ventana-planta"><img src="img/equipo-planta.webp" width="900" height="466" alt="El equipo de Mundilácteos, con camisetas de La Becerrita, frente a la planta de Europark" loading="lazy"></div>' +
          '<figcaption class="foto-pie">El equipo frente a la planta de Europark. Foto provisional: la reemplaza la toma N01.</figcaption></figure>' +
        '<div class="gente-lado"><figure><div class="ventana"><img src="img/equipo-evento-a-recorte.webp" width="394" height="263" alt="Las mujeres del equipo de Mundilácteos con camisetas de La Becerrita" loading="lazy"></div>' +
          '<figcaption class="foto-pie">Parte del equipo. Foto provisional: los retratos R01 a R06, con nombre y cargo, están por producir.</figcaption></figure></div></div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-familia"><div class="contenedor dos-col siete-cinco centrado">' +
        '<div class="cuerpo-texto">' + titulo2('h2-familia', 'Una empresa de familia') +
          '<p>Mundilácteos es una empresa familiar. Aquí sus fundadores contarán, con su nombre y una cita firmada, por qué empezaron a hacer leche en polvo en Turbaco. ' + porConfirmar('texto por entregar') + '</p>' +
          '<p class="nota">No publicamos testimonios ni citas sin la autorización de quien las firma.</p></div>' +
        '<div class="familia-marco">' + marcoToma('R06', 'Retrato de la familia fundadora en la planta. Por producir.', 's-familia', '4 / 5', 'toma-vertical') + '</div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-valores"><div class="contenedor">' + titulo2('h2-valores', 'Lo que nos guía', 'bloque-titulo') +
        '<p class="bloque-intro">Tres compromisos, cada uno con la forma de comprobarlo.</p>' +
        '<ul class="valores">' +
          '<li><h3>Decir de dónde viene</h3><p>Lo que vendemos se fabrica o se empaca en nuestra planta de Europark, en Turbaco. La dirección está en esta página y en cada empaque.</p><a class="enlace" href="' + MAPS + '" target="_blank" rel="noopener">Cómo llegar<span class="sr">, abre Google Maps</span></a></li>' +
          '<li><h3>Dar la cara</h3><p>Cada pedido tiene una persona que le responde por WhatsApp o por teléfono, con su nombre y su cargo.</p><a class="enlace" href="#contacto">Asesores por zona</a></li>' +
          '<li><h3>Mostrar el registro</h3><p>Cada producto lleva su registro sanitario vigente, con el número a la vista para que usted lo verifique en el INVIMA.</p><a class="enlace" href="#calidad">Ver los registros</a></li>' +
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
      '<section class="panel-bruma arco-sup seccion marcas-bloque" aria-labelledby="h2-marcas-n"><div class="contenedor">' + titulo2('h2-marcas-n', 'Nuestras marcas', 'bloque-titulo') +
        '<div class="marcas-nosotros">' +
          '<div class="con-tilt">' + escenaGrupo([itemPack('cantaro-entera-500g.webp', 'The Cántaro Entera, bolsa de 500 g', 'bolsa'), itemPack('cantaro-entera-bulto-25kg.webp', 'The Cántaro Entera, bulto de 25 kg')], 'escena-media') +
            '<h3>The Cántaro</h3><p>' + esc(MARCAS['the-cantaro'].descripcion) + '</p><a class="enlace" href="#productos~marca-the-cantaro">Ver The Cántaro</a></div>' +
          '<div class="con-tilt">' + escenaGrupo([itemPack('becerrita-entera-900g.webp', 'La Becerrita Entera, bolsa de 900 g', 'bolsa'), itemPack('becerrita-mezcla-bulto-25kg.webp', 'La Becerrita Mezcla Láctea, bulto de 25 kg')], 'escena-media', true) +
            '<h3>La Becerrita</h3><p>' + esc(MARCAS['la-becerrita'].descripcion.replace(/"([^"]+)"/g, '«$1»')) + '</p><a class="enlace" href="#productos~marca-la-becerrita">Ver La Becerrita</a></div>' +
          '<div>' + '<div class="escena marca-escena escena-media"><span class="franja" aria-hidden="true"></span><div class="grupo"><svg class="pictograma-grupo" viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#p-bolsa"/></svg></div></div>' +
            '<h3>Con su marca</h3><p>' + esc(MARCAS['marca-propia'].descripcion) + '</p><a class="enlace" href="#marca-propia">Conocer la maquila</a></div>' +
        '</div></div></section>' +
      '<section class="bloque" aria-labelledby="h2-cierre-n"><div class="contenedor">' + titulo2('h2-cierre-n', 'Seis razones, cada una con la forma de comprobarla') +
        '<div class="cierre-enlaces"><a class="btn btn-primario" href="#por-que-elegirnos">Ver por qué elegirnos</a><a class="enlace" href="#calidad">Calidad y registros</a><a class="enlace" href="#contacto">Contacto</a></div></div></section>' +
      notasHTML(['Año de constitución: EMIS registra el 30/12/2011 y LinkedIn, 2010. Se publica el que confirme el cliente.', 'Número de empleados (' + e.empleados.valor + '): fuente secundaria, La República, 2025.', 'Los tres compromisos de «Lo que nos guía» son una redacción por validar con la empresa.', 'Las fotos del equipo son provisionales (celebración de fin de año); las reemplazan las tomas N01 y R01 a R06.']);
    return { titulo: 'Nosotros', html: html, montar: entrarGlobo };
  };
})(window.MUNDI_C1);

/* Mundilácteos. Concepto 1: Paralelo 10. Página Dónde comprar.
   Se carga la primera vez que se visita esta página; usa las utilidades que app.js expone en window.MUNDI_C1. */
(function (N) {
  'use strict';
  if (!N) return;
  var $ = N['$'];
  var C = N.C;
  var CIUDADES = N.CIUDADES;
  var COSTA = N.COSTA;
  var PRODS = N.PRODS;
  var VISTAS = N.VISTAS;
  var ciudadCanonica = N.ciudadCanonica;
  var ciudadDeSlug = N.ciudadDeSlug;
  var enlaceExterno = N.enlaceExterno;
  var esc = N.esc;
  var fechaCO = N.fechaCO;
  var icono = N.icono;
  var imagenDe = N.imagenDe;
  var marcoToma = N.marcoToma;
  var migas = N.migas;
  var notasHTML = N.notasHTML;
  var porConfirmar = N.porConfirmar;
  var presKey = N.presKey;
  var reducido = N.reducido;
  var referencia = N.referencia;
  var slugCiudad = N.slugCiudad;
  var titulo2 = N.titulo2;
  var actualizarRuta = N.actualizarRuta;
  var itemPack = N.itemPack;
  var escenaGrupo = N.escenaGrupo;
  var confirmar = N.confirmar;

  /* ---------- Dónde comprar ---------- */
  var COORD = { 'Cartagena': [10.391, -75.479], 'Turbaco': [10.332, -75.412], 'Barranquilla': [10.964, -74.796], 'Santa Marta': [11.241, -74.199], 'Montería': [8.748, -75.881], 'Sincelejo': [9.304, -75.397], 'Valledupar': [10.463, -73.253], 'Riohacha': [11.544, -72.907], 'Medellín': [6.244, -75.581], 'Bogotá': [4.711, -74.072], 'Cali': [3.451, -76.532], 'Bucaramanga': [7.119, -73.122] };
  var PRINCIPALES = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga'];
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
      '<p class="nota">' + lista.length + ' cadenas con The Cántaro. La dirección, el horario y el WhatsApp de cada punto de venta se publican cuando estén confirmados. ' + porConfirmar() + '</p></div>' +
      '<ul class="puntos">' + lista.map(function (c) { return puntoHTML(c, nombre); }).join('') + '</ul>' +
      '<div class="acciones" style="margin-top:1.25rem"><a class="btn btn-primario" href="#cotizar~ciudad-' + slugCiudad(nombre) + '">¿Para su negocio? Cotizar por volumen</a>' + dist + '</div>';
  }
  /* Estado público de cada canal: las notas de investigación («según el sitio actual») van a las notas del prototipo */
  function estadoCanal(c) {
    if (/^Aliados? según el sitio actual/i.test(c.estado)) return { texto: /^Aliados/.test(c.estado) ? 'Puntos de venta aliados' : 'Punto de venta aliado', pendiente: true };
    if (/^Publicado/.test(c.estado)) return { texto: 'Publicado en línea', pendiente: false };
    return { texto: c.estado, pendiente: /por confirmar/i.test(c.estado) };
  }
  function puntoHTML(c, ciudad) {
    var ec = estadoCanal(c), pendiente = ec.pendiente, estado = ec.texto;
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
        '<form class="buscar-ciudad" id="form-donde" role="search" aria-label="Buscar puntos de venta por ciudad" novalidate><label for="dc-ciudad">Su ciudad</label><div class="buscar-fila">' +
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
      '<section class="panel-bruma arco-sup seccion" aria-labelledby="h2-cadenas"><div class="contenedor">' + titulo2('h2-cadenas', 'Cadenas donde se consigue', 'bloque-titulo') +
        '<div class="cadenas-rejilla"><ul class="canales-lista">' + C.canales.map(function (c) {
          var ec = estadoCanal(c);
          return '<li><strong>' + esc(c.nombre) + '</strong><span>' + esc(c.tipo) + '. ' + esc(c.region) + '</span><span>' + esc(ec.texto) + (ec.pendiente ? ' ' + porConfirmar() : '') + (c.url ? '. ' + enlaceExterno(c.url, 'Ir al sitio', ' de ' + c.nombre + ', abre otra pestaña') : '') + '</span></li>';
        }).join('') + '</ul>' +
        marcoToma('C03', 'Góndola con The Cántaro en un supermercado de Cartagena, con permiso de la cadena. Por fotografiar.', 's-gondola', '3 / 2') + '</div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-tienda"><div class="contenedor dos-col siete-cinco"><div>' + titulo2('h2-tienda', '¿Tiene una tienda?') +
        '<p style="margin-top:1rem">Aún no tenemos un punto de venta en todas las ciudades. Si tiene una tienda o una distribuidora, puede vender The Cántaro y La Becerrita.</p>' +
        '<div class="acciones" style="margin-top:1.25rem"><a class="btn btn-primario" href="#distribucion~distribuidor">Ser distribuidor</a><a class="enlace" href="#productos~negocio-tienda">Ver pacas para tienda</a></div></div>' +
        '<aside class="recuadro" aria-labelledby="h3-volumen"><h3 id="h3-volumen">¿Compra para su negocio?</h3><p>Por paca o por bulto, directo de la planta, con precio por volumen.</p><div class="acciones" style="margin-top:1rem"><a class="btn btn-secundario" href="#cotizar">Solicitar cotización</a></div></aside></div></section>' +
      notasHTML(['Olímpica, Mr. Bono, La Garosa y Rapimercar figuran como aliados en el sitio actual, sin productos en línea: se publican cuando el cliente lo confirme.', 'Rappi: la ficha estaba agotada en Bogotá el ' + fechaCO(C.actualizado) + '.', 'Sin mapa incrustado: «Cómo llegar» abre Google Maps solo cuando la persona lo pide. La lista de puntos de venta con dirección, horario y WhatsApp la entrega el cliente.']);
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
      try { history.replaceState(null, '', '#donde-comprar' + (nombre ? '~' + slugCiudad(nombre) : '')); actualizarRuta(); } catch (e) { /* sin historial */ }
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
})(window.MUNDI_C1);

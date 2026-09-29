/* Mundilácteos. Concepto 1: Paralelo 10. Páginas Recursos y artículos.
   Se carga la primera vez que se visita esta página; usa las utilidades que app.js expone en window.MUNDI_C1. */
(function (N) {
  'use strict';
  if (!N) return;
  var $ = N['$'];
  var $$ = N['$$'];
  var C = N.C;
  var CHECK = N.CHECK;
  var DATOS_GOV = N.DATOS_GOV;
  var INVIMA = N.INVIMA;
  var NB = N.NB;
  var PRODS = N.PRODS;
  var VISTAS = N.VISTAS;
  var btnCopiar = N.btnCopiar;
  var cabeza = N.cabeza;
  var conUnidad = N.conUnidad;
  var enlaceExterno = N.enlaceExterno;
  var esc = N.esc;
  var fechaCO = N.fechaCO;
  var fmt = N.fmt;
  var icono = N.icono;
  var imagenDe = N.imagenDe;
  var kg = N.kg;
  var pintarBotonAgregar = N.pintarBotonAgregar;
  var plural = N.plural;
  var porConfirmar = N.porConfirmar;
  var presKey = N.presKey;
  var presPorDefecto = N.presPorDefecto;
  var presentacion = N.presentacion;
  var producto = N.producto;
  var referencia = N.referencia;
  var tablaConvieneHTML = N.tablaConvieneHTML;
  var titulo2 = N.titulo2;
  var ventaDe = N.ventaDe;
  var itemPack = N.itemPack;
  var escenaGrupo = N.escenaGrupo;
  var fichaFilaHTML = N.fichaFilaHTML;

  /* ---------- Recursos y artículos ---------- */
  var ARTICULOS = {
    'preparar-un-litro': { titulo: 'Cómo preparar un litro con leche en polvo: rendimiento y reconstitución', tema: 'casa negocio', para: 'Para su casa y su negocio', min: 5, estado: 'Guía completa',
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
        '<h2>La proporción</h2><p>La ficha técnica publicada indica <strong>' + gl + NB + 'g de leche en polvo por cada litro de agua</strong>. Los empaques dicen algo parecido, pero no igual: la bolsa de 380' + NB + 'g rinde 3 litros (unos 127' + NB + 'g por litro) y la de 900' + NB + 'g, 7 litros (unos 129' + NB + 'g por litro). ' + porConfirmar('cifra por unificar') + '</p>' +
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
        '<p class="nota">* Presentación por confirmar. Las unidades por paca se indican por gramaje y se confirman por referencia. ' + porConfirmar() + '</p>' +
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
        '<h2>Mientras tanto</h2><p>Para preparar la leche que pide la receta, use la proporción de la guía de rendimiento.</p><p><a class="enlace" href="#articulo-preparar-un-litro">Cómo preparar un litro con leche en polvo</a></p>',
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
    var fichas = PRODS.map(fichaFilaHTML).join('');
    var gl = C.calidad.preparacion.g_por_litro;
    var html = cabeza({ titulo: 'Recursos', entradilla: 'Guías, recetas y fichas técnicas para su casa y su negocio.' }) +
      '<section class="bloque" aria-labelledby="h2-destacado" style="padding-top:var(--esp-4)"><div class="contenedor destacado">' +
        '<div><p class="cifra-guia">' + gl + NB + 'g<span>de leche en polvo por litro de agua, según la ficha técnica ' + porConfirmar() + '</span></p>' +
          '<h2 id="h2-destacado"><a href="#articulo-preparar-un-litro" style="color:inherit;text-decoration-thickness:2px">Rendimiento y reconstitución: cómo preparar un litro</a></h2>' +
          '<p>Cuánto rinde cada bolsa, cada paca y cada bulto, con las cifras del empaque y de la ficha técnica lado a lado.</p><div class="acciones" style="margin-top:1.25rem"><a class="btn btn-primario" href="#articulo-preparar-un-litro">Leer la guía</a></div></div>' +
        '<div class="con-tilt">' + escenaGrupo([itemPack('cantaro-entera-500g.webp', 'The Cántaro Entera, bolsa de 500 g', 'bolsa'), itemPack('cantaro-entera-bulto-25kg.webp', 'The Cántaro Entera, bulto de 25 kg')], 'escena-media') + '</div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-guias-r"><div class="contenedor">' + titulo2('h2-guias-r', 'Guías y recetas', 'bloque-titulo') +
        '<fieldset class="temas solo-js"><legend>Tema</legend><div class="chips">' + temas.map(function (t, i) { return '<label class="chip"><input type="radio" name="tema-recursos" value="' + t[0] + '"' + (i === 0 ? ' checked' : '') + '><span class="chip-cara">' + CHECK + t[1] + '</span></label>'; }).join('') + '</div></fieldset>' +
        '<p class="sr" id="conteo-recursos" aria-live="polite"></p><ul class="guias-lista recursos-lista">' + lista + '</ul></div></section>' +
      '<section class="panel-bruma arco-sup seccion" aria-labelledby="h2-fichas-r"><div class="contenedor">' + titulo2('h2-fichas-r', 'Fichas técnicas', 'bloque-titulo h2-util') +
        '<p class="bloque-intro">Cada ficha técnica es una página. Puede descargar una copia en HTML de la misma tabla.</p><ul class="fichas-lista">' + fichas + '</ul></div></section>';
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
})(window.MUNDI_C1);

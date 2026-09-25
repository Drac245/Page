/* Mundilácteos. Concepto 1: Paralelo 10. Comparar presentaciones.
   Se carga la primera vez que se visita esta página; usa las utilidades que app.js expone en window.MUNDI_C1. */
(function (N) {
  'use strict';
  if (!N) return;
  var actualizarRuta = N.actualizarRuta;
  var $ = N['$'];
  var $$ = N['$$'];
  var C = N.C;
  var CMP_MAX = N.CMP_MAX;
  var MARCAS = N.MARCAS;
  var NNBSP = N.NNBSP;
  var TIPO_CORTO = N.TIPO_CORTO;
  var USO_CORTO = N.USO_CORTO;
  var VISTAS = N.VISTAS;
  var anunciar = N.anunciar;
  var aviso = N.aviso;
  var cmpValido = N.cmpValido;
  var conUnidad = N.conUnidad;
  var copiarTexto = N.copiarTexto;
  var esBulto = N.esBulto;
  var esc = N.esc;
  var fijarComparar = N.fijarComparar;
  var hashComparar = N.hashComparar;
  var icono = N.icono;
  var kg = N.kg;
  var listaComparar = N.listaComparar;
  var migas = N.migas;
  var miles = N.miles;
  var miniEscena = N.miniEscena;
  var nw = N.nw;
  var pintarBotonAgregar = N.pintarBotonAgregar;
  var plural = N.plural;
  var porConfirmar = N.porConfirmar;
  var presentacion = N.presentacion;
  var producto = N.producto;
  var referencia = N.referencia;
  var rindeDe = N.rindeDe;
  var ventaDe = N.ventaDe;

  /* ---------- Comparar presentaciones ---------- */
  VISTAS.comparar = function (r) {
    var desdeRuta = (r.params || []).filter(function (t) { return t.indexOf('p-') === 0; }).map(function (t) { return t.slice(2); }).filter(cmpValido);
    if (desdeRuta.length) fijarComparar(desdeRuta.slice(0, CMP_MAX));
    var items = listaComparar().map(function (id) { var a = id.split('.'), p = producto(a[0]); return { id: id, p: p, pr: presentacion(p, a[1]), k: a[1] }; });
    var rastro = [['Inicio', '#inicio'], ['Productos', '#productos'], ['Comparar', '']];
    var cabezaHTML = '<section class="contenedor interior-cabeza">' + migas(rastro) + '<h1>Comparar presentaciones</h1>' +
      '<p class="entradilla">Hasta ' + CMP_MAX + ' presentaciones lado a lado, con los datos del catálogo. En Bruma, lo que difiere de la primera.</p></section>';
    if (!items.length) {
      return { titulo: 'Comparar presentaciones', html: cabezaHTML + '<div class="contenedor bloque" style="padding-top:0"><div class="comparar-vacia"><p>Marque hasta ' + CMP_MAX + ' presentaciones para compararlas. En cada vitrina de Productos y en cada ficha está la casilla «Comparar».</p><a class="btn btn-primario" href="#productos">Ver productos</a></div></div>' };
    }
    var fila = function (etq, fn) {
      var vals = items.map(fn), texto = vals.map(function (v) { return String(v).replace(/<[^>]+>/g, ''); });
      var igual = texto.every(function (t) { return t === texto[0]; });
      return '<tr' + (igual ? ' class="igual"' : '') + '><th scope="row">' + etq + '</th>' + vals.map(function (v, i) { return '<td' + (!igual && i > 0 && texto[i] !== texto[0] ? ' class="difiere"' : '') + '>' + v + '</td>'; }).join('') + (items.length < CMP_MAX ? '<td aria-hidden="true"></td>' : '') + '</tr>';
    };
    var cabezas = items.map(function (it) {
      return '<th scope="col"><div class="cmp-cabeza">' + miniEscena(it.p, it.pr) + '<a href="#producto-' + it.p.slug + '~' + it.k + '">' + esc(referencia(it.p, it.pr)) + '</a>' +
        '<button class="cmp-quitar" type="button" data-cmp-quitar="' + it.id + '">Quitar<span class="sr"> ' + esc(referencia(it.p, it.pr)) + ' de la comparación</span></button></div></th>';
    }).join('') + (items.length < CMP_MAX ? '<th scope="col"><a class="cmp-agregar" href="#productos">' + icono('i-mas') + 'Agregar presentación</a></th>' : '');
    var cuerpo =
      fila('Marca', function (it) { return esc(MARCAS[it.p.marca].nombre); }) +
      fila('Tipo', function (it) { return esc(TIPO_CORTO[it.p.categoria]); }) +
      fila('Formato', function (it) { return esBulto(it.pr) ? 'Bulto' : 'Bolsa'; }) +
      fila('Contenido', function (it) { return esc(conUnidad(miles(it.pr.contenido))); }) +
      fila('Unidades por paca', function (it) { return it.pr.unidades_por_paca ? it.pr.unidades_por_paca + ' bolsas' : '—'; }) +
      fila('Peso de la paca', function (it) { var v = ventaDe(it.pr); return v.bolsas ? kg(v.kgUnidad) : (esBulto(it.pr) ? kg(v.kgUnidad) + ' el bulto' : porConfirmar()); }) +
      fila('Rinde', function (it) { var rr = rindeDe(it.p, it.pr); return rr ? esc(rr.texto) + (rr.confirmar ? ' ' + porConfirmar() : '') : porConfirmar(); }) +
      fila('EAN', function (it) { return it.pr.ean ? '<span class="num">' + it.pr.ean + '</span>' : porConfirmar(); }) +
      fila('Registro INVIMA', function (it) { return nw(it.p.registro); }) +
      fila('Vida útil', function () { return C.calidad.vida_util_meses + ' meses'; }) +
      fila('Empaque', function (it) { return esBulto(it.pr) ? 'Bolsa interna y saco kraft de triple capa' : 'Bolsa laminada de tres capas, con CO<sub>2</sub>'; }) +
      fila('Uso sugerido', function (it) { return it.p.usos.map(function (u) { return USO_CORTO[u]; }).join(', '); }) +
      fila('Estado', function (it) { return it.pr.estado === 'confirmado' ? 'Confirmada' : porConfirmar('presentación por confirmar'); }) +
      '<tr class="cmp-acciones"><th scope="row"><span class="sr">Cotizar</span></th>' + items.map(function (it) {
        return '<td><button class="btn btn-primario btn-agregar" type="button" data-agregar="' + it.p.slug + '" data-pres="' + it.k + '">' + icono('i-mas', 'ico-mas') + icono('i-hecho', 'ico-hecho') + '<span class="txt">Agregar a mi cotización</span><span class="sr"> ' + esc(referencia(it.p, it.pr)) + '</span></button></td>';
      }).join('') + (items.length < CMP_MAX ? '<td aria-hidden="true"></td>' : '') + '</tr>';
    var html = cabezaHTML + '<div class="contenedor bloque" style="padding-top:0">' +
      '<div class="comparar-barra"><label class="solo-dif"><input type="checkbox" id="solo-dif">Mostrar solo diferencias</label>' +
      '<button class="btn btn-texto" type="button" data-copiar-comparar>' + icono('i-enlace') + 'Copiar enlace</button><a class="enlace" href="#productos">Volver a Productos</a></div>' +
      '<div class="tabla-marco" tabindex="0" role="region" aria-labelledby="cap-comparar"><table class="tabla tabla-fija tabla-comparar"><caption id="cap-comparar">Comparación de ' + items.length + ' ' + plural(items.length, 'presentación', 'presentaciones') + '</caption>' +
      '<thead><tr><th scope="col"><span class="sr">Dato</span></th>' + cabezas + '</tr></thead><tbody>' + cuerpo + '</tbody></table></div>' +
      '<p class="nota" style="margin-top:0.75rem">Rinde de las bolsas según su empaque; bultos a ' + C.calidad.preparacion.g_por_litro + NNBSP + 'g por litro, según la ficha técnica. Los datos marcados están por confirmar.</p></div>';
    return { titulo: 'Comparar presentaciones', html: html, montar: function (vista) {
      $$('[data-agregar]', vista).forEach(pintarBotonAgregar);
      if (desdeRuta.length !== items.length || !desdeRuta.length) { try { history.replaceState(null, '', hashComparar()); actualizarRuta(); } catch (e) { /* sin historial */ } }
      vista.addEventListener('change', function (e) { if (e.target.id === 'solo-dif') { $('.tabla-comparar', vista).classList.toggle('solo-diferencias', e.target.checked); anunciar(e.target.checked ? 'Se muestran solo las filas que difieren.' : 'Se muestran todas las filas.'); } });
      vista.addEventListener('click', function (e) {
        var q = e.target.closest('[data-cmp-quitar]');
        if (q) { var id = q.getAttribute('data-cmp-quitar'); fijarComparar(listaComparar().filter(function (x) { return x !== id; })); location.hash = hashComparar(); return; }
        if (e.target.closest('[data-copiar-comparar]')) {
          var url = location.href.split('#')[0] + hashComparar();
          copiarTexto(url).then(function () { aviso('Enlace de la comparación copiado.'); }, function () { aviso('Copie este enlace: ' + url); });
        }
      });
    } };
  };
})(window.MUNDI_C1);

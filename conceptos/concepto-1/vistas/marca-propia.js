/* Mundilácteos. Concepto 1: Paralelo 10. Página Con su marca (maquila).
   Se carga la primera vez que se visita esta página; usa las utilidades que app.js expone en window.MUNDI_C1. */
(function (N) {
  'use strict';
  if (!N) return;
  var $ = N['$'];
  var $$ = N['$$'];
  var C = N.C;
  var CHECK = N.CHECK;
  var CIUDADES = N.CIUDADES;
  var INVIMA = N.INVIMA;
  var REGS = N.REGS;
  var TEL = N.TEL;
  var TEL_HREF = N.TEL_HREF;
  var VISTAS = N.VISTAS;
  var btnWA = N.btnWA;
  var conUnidad = N.conUnidad;
  var esc = N.esc;
  var fechaCO = N.fechaCO;
  var icono = N.icono;
  var kg = N.kg;
  var lineaWA = N.lineaWA;
  var migas = N.migas;
  var miles = N.miles;
  var porConfirmar = N.porConfirmar;
  var reducido = N.reducido;
  var titulo2 = N.titulo2;
  var recorridoHTML = N.recorridoHTML;
  var campoTexto = N.campoTexto;
  var campoWA = N.campoWA;
  var campoAcepto = N.campoAcepto;
  var montarFormulario = N.montarFormulario;
  var confirmar = N.confirmar;
  var resumenErroresHTML = N.resumenErroresHTML;
  var validaWA = N.validaWA;
  var validaTexto = N.validaTexto;

  /* ---------- Con su marca (maquila) ---------- */
  VISTAS['marca-propia'] = function () {
    var gr = C.maquila.gramajes.map(miles), bolsas = gr.filter(function (g) { return / g$/.test(g); }), bultos = gr.filter(function (g) { return / kg$/.test(g); });
    var altMP = ['Bolsa de leche en polvo entera de marca propia de una cadena, empacada por Mundilácteos', 'Bolsa de leche en polvo entera de otra marca propia, empacada por Mundilácteos', 'Bolsa de leche en polvo entera azucarada de marca propia, empacada por Mundilácteos'];
    var dimMP = { 'marca-propia-a.webp': [240, 366], 'marca-propia-b.webp': [245, 341], 'marca-propia-c.webp': [255, 352] };
    var bolsasMP = C.maquila.imagenes.map(function (a, i) { var d = dimMP[a] || [240, 360]; return '<div class="item"><img src="img/' + a + '" width="' + d[0] + '" height="' + d[1] + '" alt="' + altMP[i] + '"' + (i ? ' loading="lazy"' : '') + '></div>'; }).join('');
    var pasos = [
      { titulo: 'Muestras y especificación', texto: 'Nos cuenta qué presentaciones, tipos de leche y volúmenes necesita, y le enviamos muestras para evaluar.' },
      { titulo: 'Arte del empaque', texto: 'Su cadena aporta el diseño con su marca. Le indicamos los datos que la etiqueta debe llevar.' },
      { titulo: 'Aprobación de arte y registro', texto: 'Revisamos juntos el arte final y su amparo en el registro sanitario RSA-006359-2018.' },
      { titulo: 'Producción y despacho', texto: 'Empacamos en Turbaco y despachamos a sus centros de distribución. Tiempos: ' + porConfirmar() }
    ];
    var paca = Object.keys(C.unidades_por_paca).map(function (g) {
      var u = C.unidades_por_paca[g], gramos = parseInt(g, 10);
      return '<tr><th scope="row">' + conUnidad(miles(g)) + '</th><td class="der">' + u + '</td><td class="der">' + kg(u * gramos / 1000) + '</td></tr>';
    }).join('');
    var reg = REGS['RSA-006359-2018'];
    var msg = 'Hola, Mundilácteos. Quiero información para empacar leche en polvo con mi marca. Empresa: ____. Ciudad: ____.';
    var html = '<section class="cabeza-mp"><div class="banda azul arco-inf cabeza-banda oscuro"><div class="contenedor">' + migas([['Inicio', '#inicio'], ['Productos', '#productos'], ['Con su marca', '']]) +
        '<div class="cabeza-texto"><h1>Leche en polvo con la marca de su cadena</h1><p class="entradilla">Empacamos en Turbaco con nuestro registro sanitario vigente.</p>' +
        '<div class="acciones" style="margin-top:1.5rem"><a class="btn btn-primario" href="#marca-propia" data-ancla="h2-muestras">Pedir muestras</a>' + btnWA(msg, 'WhatsApp', 'btn-secundario') + '</div>' + lineaWA(msg) + '</div></div></div>' +
        '<div class="mp-bolsas"><div class="escena marca-escena"><div class="grupo">' + bolsasMP + '</div></div></div>' +
        '<p class="pie-escena mp-aviso">Empaques de marcas propias fabricados por Mundilácteos en 2022. Se muestran con autorización del cliente. No publicamos las marcas que empacamos sin autorización escrita.</p></section>' +
      '<section class="bloque" aria-labelledby="h2-ofrecemos"><div class="contenedor gramajes-rejilla"><div>' + titulo2('h2-ofrecemos', 'Qué empacamos con su marca') +
          '<div class="gramajes-grupo" style="margin-top:1.5rem"><p class="etiqueta">En bolsa</p><ul class="gramajes">' + bolsas.map(function (g) { return '<li>' + conUnidad(g) + '</li>'; }).join('') + '</ul></div>' +
          '<div class="gramajes-grupo"><p class="etiqueta">En bulto</p><ul class="gramajes">' + bultos.map(function (g) { return '<li>' + conUnidad(g) + '</li>'; }).join('') + '</ul></div></div>' +
        '<dl class="ficha-datos-lista"><dt>Tipos</dt><dd>' + esc(reg.producto.replace(/^Leche en polvo: /, 'Leche en polvo ')) + '</dd><dt>Registro</dt><dd>' + reg.numero + ', vigente hasta el ' + fechaCO(reg.vence) + '. Condiciones de uso ' + porConfirmar() + '</dd>' +
          '<dt>Respaldo</dt><dd>' + esc(C.maquila.evidencia) + '</dd></dl>' +
      '</div></section>' +
      '<section class="panel-bruma arco-sup seccion" aria-labelledby="h2-como-mp"><div class="contenedor">' + titulo2('h2-como-mp', 'Cómo trabajamos') + recorridoHTML(pasos, 'pasos') + '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-espec"><div class="contenedor dos-col siete-cinco"><div>' + titulo2('h2-espec', 'Ficha de especificación', 'bloque-titulo h2-util') +
          '<div class="tabla-marco" tabindex="0" role="region" aria-labelledby="cap-espec"><table class="tabla tabla-tecnica"><caption id="cap-espec">Especificación de la leche en polvo con marca propia</caption><tbody>' +
          '<tr><th scope="row">Producto</th><td>' + esc(reg.producto) + '</td></tr><tr><th scope="row">Registro INVIMA</th><td>' + reg.numero + ', vigente hasta el ' + fechaCO(reg.vence) + '. <a href="' + INVIMA + '" target="_blank" rel="noopener">Verificar<span class="sr">, abre otra pestaña</span></a></td></tr>' +
          '<tr><th scope="row">Empaque de la bolsa</th><td>' + esc(C.calidad.empaque.bolsa) + '</td></tr><tr><th scope="row">Empaque del bulto</th><td>' + esc(C.calidad.empaque.bulto) + '</td></tr>' +
          '<tr><th scope="row">Vida útil</th><td>' + C.calidad.vida_util_meses + ' meses, con el empaque cerrado</td></tr><tr><th scope="row">Pedido mínimo</th><td>' + porConfirmar() + '</td></tr><tr><th scope="row">Tiempo de producción</th><td>' + porConfirmar() + '</td></tr>' +
          '</tbody></table></div>' +
          '<div class="tabla-marco tabla-paca" tabindex="0" role="region" aria-labelledby="cap-paca" style="margin-top:var(--esp-5)"><table class="tabla"><caption id="cap-paca">Bolsas por paca según el gramaje ' + porConfirmar('confirmar por referencia') + '</caption><thead><tr><th scope="col">Gramaje</th><th scope="col" class="der">Bolsas por paca</th><th scope="col" class="der">Peso de la paca</th></tr></thead><tbody>' + paca + '</tbody></table></div></div>' +
        '<div class="recuadro"><h3>Lo que necesitamos de su cadena</h3><ul class="texto-sans" style="margin:0.75rem 0 0;padding-left:1.25rem;display:grid;gap:0.5rem"><li>Razón social y NIT.</li><li>Presentaciones y volumen mensual estimado.</li><li>El arte del empaque con su marca.</li><li>Ciudades de despacho.</li></ul>' +
          '<h3 style="margin-top:1.75rem">Lo que le confirma el área comercial</h3><ul class="texto-sans" style="margin:0.75rem 0 0;padding-left:1.25rem;display:grid;gap:0.5rem"><li>Pedido mínimo ' + porConfirmar() + '</li><li>Tiempo de producción ' + porConfirmar() + '</li><li>Titularidad del registro para su marca ' + porConfirmar() + '</li></ul></div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-muestras"><div class="contenedor dos-col siete-cinco"><div id="caja-muestras">' + titulo2('h2-muestras', 'Pedir muestras') +
          '<p style="margin:1rem 0 1.5rem">Cuéntenos qué necesita su cadena. Un asesor le escribe para coordinar el envío de muestras.</p>' +
          '<form class="form-corto" id="form-muestras" novalidate>' + resumenErroresHTML() +
            '<div class="dos-campos">' + campoTexto('m-empresa', 'Empresa', ' name="empresa" type="text" autocomplete="organization" required', 'Escriba el nombre de su empresa.') +
              campoTexto('m-nit', 'NIT', ' name="nit" type="text" inputmode="numeric" autocomplete="off"', null, null, true) + '</div>' +
            '<div class="dos-campos">' + campoTexto('m-nombre', 'Su nombre y cargo', ' name="nombre" type="text" autocomplete="name" required', 'Escriba su nombre y su cargo.') + campoWA('m-wa') + '</div>' +
            campoTexto('m-ciudad', 'Ciudad', ' name="ciudad" type="text" list="m-lista-ciudades" autocomplete="address-level2" required', 'Escriba su ciudad.') +
            '<datalist id="m-lista-ciudades">' + CIUDADES.map(function (c) { return '<option value="' + c + '">'; }).join('') + '</datalist>' +
            '<fieldset class="campo"><legend>Presentaciones de interés <span class="campo-opcional">(opcional)</span></legend><div class="chips">' + gr.map(function (g) { return '<label class="chip"><input type="checkbox" name="m-pres" value="' + g + '"><span class="chip-cara">' + CHECK + conUnidad(g) + '</span></label>'; }).join('') + '</div></fieldset>' +
            campoTexto('m-volumen', 'Volumen mensual estimado, en kilos', ' name="volumen" type="text" inputmode="numeric" autocomplete="off"', null, null, true) +
            campoAcepto('m-acepto', 'responder esta solicitud') +
            '<div class="acciones acciones-apiladas"><button class="btn btn-primario" type="submit">Pedir muestras</button></div></form></div>' +
        '<aside class="recuadro" aria-labelledby="h3-mp-wa"><h3 id="h3-mp-wa">¿Prefiere hablar ya?</h3><p>Escríbanos por WhatsApp al ' + TEL + ' o llámenos.</p><div class="acciones" style="margin-top:1rem">' + btnWA(msg, 'Escribir por WhatsApp') + '<a class="btn btn-secundario" href="' + TEL_HREF + '">' + icono('i-tel') + 'Llamar al ' + TEL + '</a></div></aside>' +
      '</div></section>';
    return { titulo: 'Con su marca', html: html, montar: function (vista) {
      var s = $('.cabeza-mp', vista);
      if (s && !reducido()) { s.classList.add('entra'); window.setTimeout(function () { s.classList.remove('entra'); }, 1200); }
      var form = $('#form-muestras', vista);
      montarFormulario(form, {
        'm-empresa': { nombre: 'Empresa', ok: validaTexto(2) }, 'm-nombre': { nombre: 'Su nombre y cargo', ok: validaTexto(3) },
        'm-wa': { nombre: 'WhatsApp', ok: validaWA }, 'm-ciudad': { nombre: 'Ciudad', ok: validaTexto(3) },
        'm-acepto': { nombre: 'Autorización de datos', ok: function (v) { return v === true; } }
      }, function (v) {
        var pres = $$('input[name="m-pres"]:checked', form).map(function (i) { return i.value; });
        confirmar($('#caja-muestras', vista), { id: 'h2-muestras-ok', titulo: 'Solicitud de muestras enviada.', texto: 'Un asesor le escribe por WhatsApp en horario hábil para coordinar las muestras de ' + esc(v('m-empresa')) + '.',
          msg: 'Hola, Mundilácteos. Envié la solicitud de muestras N.º {n}. Empresa: ' + v('m-empresa') + '. Ciudad: ' + v('m-ciudad') + (pres.length ? '. Presentaciones: ' + pres.join(', ') : '') + '.' });
      });
    } };
  };
})(window.MUNDI_C1);

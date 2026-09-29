/* Mundilácteos. Concepto 1: Paralelo 10. Página Contacto.
   Se carga la primera vez que se visita esta página; usa las utilidades que app.js expone en window.MUNDI_C1. */
(function (N) {
  'use strict';
  if (!N) return;
  var $ = N['$'];
  var C = N.C;
  var CHECK = N.CHECK;
  var CIUDADES = N.CIUDADES;
  var DIRECCION_TXT = N.DIRECCION_TXT;
  var MAPS = N.MAPS;
  var TEL = N.TEL;
  var TEL_HREF = N.TEL_HREF;
  var VISTAS = N.VISTAS;
  var WA_VISIBLE = N.WA_VISIBLE;
  var btnCopiar = N.btnCopiar;
  var btnWA = N.btnWA;
  var cabeza = N.cabeza;
  var enlaceExterno = N.enlaceExterno;
  var esc = N.esc;
  var icono = N.icono;
  var lineaWA = N.lineaWA;
  var marcoToma = N.marcoToma;
  var notasHTML = N.notasHTML;
  var porConfirmar = N.porConfirmar;
  var titulo2 = N.titulo2;
  var campoTexto = N.campoTexto;
  var campoWA = N.campoWA;
  var campoAcepto = N.campoAcepto;
  var montarFormulario = N.montarFormulario;
  var confirmar = N.confirmar;
  var resumenErroresHTML = N.resumenErroresHTML;
  var validaWA = N.validaWA;
  var validaTexto = N.validaTexto;

  /* ---------- Contacto ---------- */
  var MOTIVOS = [['cotizacion', 'Cotización'], ['marca', 'Con su marca'], ['pqr', 'Petición, queja o reclamo'], ['visita', 'Visita a la planta'], ['proveedores', 'Proveedores'], ['empleo', 'Trabaje con nosotros'], ['otro', 'Otro']];
  var SUGERENCIAS = {
    cotizacion: 'Para cotizar más rápido, arme su lista en <a href="#cotizar">Solicitar cotización</a>: el asesor recibe presentaciones y cantidades.',
    marca: 'Si ya sabe qué presentaciones necesita, use el formulario <a href="#marca-propia">Pedir muestras</a>.',
    pqr: 'Tenga a mano el lote y la fecha de vencimiento del empaque, y si puede, una foto.',
    visita: 'Indique en el mensaje la fecha que prefiere y cuántas personas vienen.'
  };
  VISTAS.contacto = function (r) {
    var e = C.empresa, sel = null;
    (r.params || []).forEach(function (t) { MOTIVOS.forEach(function (m) { if (m[0] === t) sel = t; }); });
    var msgGeneral = 'Hola, Mundilácteos. Quiero cotizar leche en polvo para mi negocio en ____.';
    var asesores = [
      ['Costa Caribe', 'Bolívar, Atlántico, Magdalena, La Guajira, Cesar, Sucre y Córdoba', 'Hola, Mundilácteos. Quiero hablar con el asesor de la Costa Caribe. Estoy en ____.'],
      ['Interior del país', 'Antioquia, Santander, Bogotá, Valle del Cauca y el resto de Colombia', 'Hola, Mundilácteos. Quiero hablar con el asesor del interior del país. Estoy en ____.'],
      ['Cadenas y marca propia', 'Supermercados, cadenas y distribuidores que quieren su propia marca', 'Hola, Mundilácteos. Quiero información para empacar leche en polvo con mi marca. Empresa: ____. Ciudad: ____.']
    ];
    var html = cabeza({ titulo: 'Contacto', entradilla: 'Escríbanos, llámenos o visítenos en la planta. Le responde una persona del área comercial.' }) +
      '<section class="bloque" aria-labelledby="h2-linea" style="padding-top:var(--esp-3)"><div class="contenedor dos-col siete-cinco">' +
        '<div class="linea-directa"><h2 id="h2-linea" class="etiqueta" style="font-size:var(--fs-18);font-stretch:100%;color:var(--c-azul-noche)">Línea comercial, teléfono y WhatsApp</h2>' +
          '<a class="numero-grande" href="' + TEL_HREF + '">' + TEL + '<span class="sr">, llamar</span></a>' +
          '<div class="acciones">' + btnWA(msgGeneral, 'Escribir por WhatsApp') + '<a class="btn btn-secundario" href="' + TEL_HREF + '">' + icono('i-tel') + 'Llamar</a>' + btnCopiar(TEL, 'Copiar número', 'Número copiado') + '</div>' +
          '<p class="texto-sans">WhatsApp: ' + WA_VISIBLE + '. ' + lineaWA(msgGeneral).replace(/^<p class="mensaje-wa">|<\/p>$/g, '') + '</p></div>' +
        '<dl class="ficha-datos-lista"><dt>Horario</dt><dd>' + esc(e.horario.valor) + ' ' + porConfirmar() + '</dd>' +
          '<dt>Correo</dt><dd><a href="mailto:' + e.correo.valor + '">' + e.correo.valor + '</a> ' + porConfirmar() + '</dd>' +
          '<dt>Instagram</dt><dd>' + enlaceExterno(e.instagram, '@mundilacteos') + '</dd><dt>Empresa</dt><dd>' + esc(e.razon_social) + ', NIT ' + e.nit + '</dd></dl>' +
      '</div></section>' +
      '<section class="banda azul arco-sup abre oscuro" aria-labelledby="h2-asesores"><div class="contenedor">' + titulo2('h2-asesores', 'Asesores por zona') +
        '<div class="asesores-rejilla"><ul class="asesores">' + asesores.map(function (a) {
          return '<li class="asesor"><div><h3>' + a[0] + '</h3><p class="zona">' + a[1] + '.</p></div><div><p class="texto-sans">Le atiende: ' + porConfirmar('nombre por confirmar') + '</p>' + lineaWA(a[2]) + '</div><div class="acciones">' + btnWA(a[2], 'Escribir por WhatsApp') + '</div></li>';
        }).join('') + '</ul>' + marcoToma('R04', 'Retratos de los asesores por zona, mirando a cámara, con nombre y cargo. Por producir.', 's-retrato', '4 / 5', 'toma-vertical toma-texto-movil') + '</div>' +
      '</div></section>' +
      '<section class="bloque" aria-labelledby="h2-escribanos"><div class="contenedor contacto-rejilla"><div id="caja-contacto">' + titulo2('h2-escribanos', 'Escríbanos.') +
        '<form class="form-corto" id="form-contacto" novalidate style="margin-top:1.5rem">' + resumenErroresHTML() +
          '<fieldset class="campo" id="campo-k-motivo" aria-describedby="k-motivo-error"><legend>Motivo</legend><div class="chips">' + MOTIVOS.map(function (m, i) {
            return '<label class="chip"><input type="radio" name="k-motivo" value="' + m[0] + '" data-regla="k-motivo"' + (i === 0 ? ' id="k-motivo"' : '') + (m[0] === sel ? ' checked' : '') + '><span class="chip-cara">' + CHECK + m[1] + '</span></label>';
          }).join('') + '</div><p class="error-campo" id="k-motivo-error">' + icono('i-alerta') + '<span>Elija el motivo de su mensaje.</span></p></fieldset>' +
          '<p class="sugerencia" id="k-sugerencia" aria-live="polite"' + (sel && SUGERENCIAS[sel] ? '' : ' hidden') + '>' + (sel && SUGERENCIAS[sel] ? SUGERENCIAS[sel] : '') + '</p>' +
          '<div class="dos-campos">' + campoTexto('k-nombre', 'Nombre', ' name="nombre" type="text" autocomplete="name" required', 'Escriba su nombre.') + campoWA('k-wa') + '</div>' +
          '<div class="dos-campos">' + campoTexto('k-ciudad', 'Ciudad', ' name="ciudad" type="text" list="k-lista-ciudades" autocomplete="address-level2" required', 'Escriba su ciudad.') +
            campoTexto('k-correo', 'Correo', ' name="correo" type="email" autocomplete="email"', null, null, true) + '</div>' +
          '<datalist id="k-lista-ciudades">' + CIUDADES.map(function (c) { return '<option value="' + c + '">'; }).join('') + '</datalist>' +
          '<div id="k-lote-caja"' + (sel === 'pqr' ? '' : ' hidden') + '>' + campoTexto('k-lote', 'Lote y fecha de vencimiento', ' name="lote" type="text" autocomplete="off"', null, 'Están impresos en el empaque.', true) + '</div>' +
          campoTexto('k-mensaje', 'Mensaje', 'textarea name="mensaje" rows="5" required', 'Escriba su mensaje.') +
          campoAcepto('k-acepto', 'responder este mensaje') +
          '<div class="acciones acciones-apiladas"><button class="btn btn-primario" type="submit">Enviar mensaje</button></div>' +
        '</form></div>' +
        '<div class="direccion-bloque"><h2 style="font-size:var(--fs-28)">La planta</h2><address><strong>Parque Industrial Europark</strong>' + esc(DIRECCION_TXT) + '</address>' +
          '<div class="acciones"><a class="btn btn-secundario" href="' + MAPS + '" target="_blank" rel="noopener">' + icono('i-lugar') + 'Cómo llegar<span class="sr">, abre Google Maps</span></a>' + btnCopiar(DIRECCION_TXT, 'Copiar dirección', 'Dirección copiada') + '</div>' +
          '<p class="nota">Coordenadas para transportadores ' + porConfirmar() + '</p>' +
          marcoToma('P06', 'Fachada de la planta con la señal del parque. Por fotografiar.', 's-fachada', '3 / 2') + '</div>' +
      '</div></section>' +
      notasHTML(['Sin mapa incrustado: «Cómo llegar» abre Google Maps. Las coordenadas GPS de la planta y la bodega correcta (28, 16 o 2A–2B) las confirma el cliente.', 'El correo ' + esc(e.correo.valor) + ' está por confirmar: el dominio impreso en los sacos no resuelve.', 'Los nombres de los asesores por zona y sus retratos (R04) llegan con su autorización de uso de imagen.']);
    return { titulo: 'Contacto', html: html, montar: function (vista) {
      var form = $('#form-contacto', vista);
      form.addEventListener('change', function (ev) {
        if (ev.target.name !== 'k-motivo') return;
        var v = ev.target.value, s = $('#k-sugerencia', form);
        s.innerHTML = SUGERENCIAS[v] || ''; s.hidden = !SUGERENCIAS[v];
        $('#k-lote-caja', form).hidden = v !== 'pqr';
      });
      montarFormulario(form, {
        'k-motivo': { nombre: 'Motivo', grupo: 'k-motivo' }, 'k-nombre': { nombre: 'Nombre', ok: validaTexto(2) }, 'k-wa': { nombre: 'WhatsApp', ok: validaWA },
        'k-ciudad': { nombre: 'Ciudad', ok: validaTexto(3) }, 'k-mensaje': { nombre: 'Mensaje', ok: validaTexto(5) },
        'k-acepto': { nombre: 'Autorización de datos', ok: function (v) { return v === true; } }
      }, function (v) {
        var m = form.querySelector('input[name="k-motivo"]:checked'), motivo = MOTIVOS.filter(function (x) { return x[0] === m.value; })[0][1];
        confirmar($('#caja-contacto', vista), { id: 'h2-contacto-ok', titulo: 'Mensaje enviado.', texto: 'Le respondemos por WhatsApp al número que nos dejó, en horario hábil.',
          msg: 'Hola, Mundilácteos. Envié el mensaje N.º {n}. Motivo: ' + motivo.toLowerCase() + '. Ciudad: ' + v('k-ciudad') + (v('k-lote') ? '. Lote: ' + v('k-lote') : '') + '.' });
      });
    } };
  };
})(window.MUNDI_C1);

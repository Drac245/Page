/* Mundilácteos: página de presentación. JavaScript propio, sin librerías.
   Todo el contenido se lee sin este archivo; aquí solo se suman progreso, sección activa,
   cifras que cuentan, galerías, visor de capturas, pestañas y comparador antes/después. */
(function () {
  'use strict';

  var raiz = document.documentElement;
  raiz.classList.add('js');
  var reducido = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var suave = reducido ? 'auto' : 'smooth';
  var lista = function (sel, base) { return Array.prototype.slice.call((base || document).querySelectorAll(sel)); };

  /* 1. Barra de progreso de lectura (respaldo si no hay animation-timeline) */
  var progreso = document.getElementById('progreso');
  var tieneScrollTL = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()'));
  if (progreso && !tieneScrollTL) {
    var pendiente = false;
    var medir = function () {
      pendiente = false;
      var max = raiz.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progreso.style.setProperty('--p', p.toFixed(4));
    };
    window.addEventListener('scroll', function () {
      if (!pendiente) { pendiente = true; window.requestAnimationFrame(medir); }
    }, { passive: true });
    window.addEventListener('resize', medir);
    medir();
  }

  /* 1b. Desplazamiento suave hacia las anclas internas (solo con movimiento permitido).
     Se hace aquí y no con scroll-behavior en CSS para no alterar los desplazamientos por script. */
  document.addEventListener('click', function (ev) {
    if (reducido || ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
    var a = ev.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    var destino = id ? document.getElementById(id) : null;
    if (!destino || typeof destino.scrollIntoView !== 'function') return;
    ev.preventDefault();
    destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
    try { history.pushState(null, '', '#' + id); } catch (e) { /* sin historial */ }
    if (!destino.hasAttribute('tabindex')) destino.setAttribute('tabindex', '-1');
    try { destino.focus({ preventScroll: true }); } catch (e) { /* sin foco */ }
  });

  /* 2. Sección activa en la navegación fija */
  var enlaces = lista('#menu a');
  var menuNav = document.querySelector('.menu-nav');
  var porId = {};
  var secciones = [];
  enlaces.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    var s = document.getElementById(id);
    if (s) { porId[id] = a; secciones.push(s); }
  });
  // La portada no tiene enlace en el menú: al estar en ella no se marca ninguna sección
  var portada = document.getElementById('inicio');
  if (portada) secciones.unshift(portada);
  var bordesMenu = function () {
    if (!menuNav) return;
    var max = menuNav.scrollWidth - menuNav.clientWidth;
    menuNav.classList.toggle('mas-izq', max > 2 && menuNav.scrollLeft > 2);
    menuNav.classList.toggle('mas-der', max > 2 && menuNav.scrollLeft < max - 2);
  };
  if (menuNav) {
    var colaMenu = false;
    menuNav.addEventListener('scroll', function () {
      if (!colaMenu) { colaMenu = true; window.requestAnimationFrame(function () { colaMenu = false; bordesMenu(); }); }
    }, { passive: true });
    window.addEventListener('resize', bordesMenu);
    bordesMenu();
  }
  var activa = null;
  var marcar = function (id) {
    if (id === activa) return;
    activa = id;
    enlaces.forEach(function (a) {
      if (a === porId[id]) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    var a = porId[id];
    if (!a && menuNav) { try { menuNav.scrollTo({ left: 0, behavior: suave }); } catch (e) { menuNav.scrollLeft = 0; } }
    if (a && menuNav && menuNav.scrollWidth > menuNav.clientWidth + 2 && a.offsetParent) {
      var r = a.getBoundingClientRect();
      var n = menuNav.getBoundingClientRect();
      var delta = (r.left + r.width / 2) - (n.left + n.width / 2);
      try { menuNav.scrollBy({ left: delta, behavior: suave }); } catch (e) { menuNav.scrollLeft += delta; }
    }
  };
  if ('IntersectionObserver' in window && secciones.length) {
    var visibles = {};
    var ioSec = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { visibles[e.target.id] = e.isIntersecting; });
      for (var i = 0; i < secciones.length; i++) {
        if (visibles[secciones[i].id]) { marcar(secciones[i].id); break; }
      }
    }, { rootMargin: '-38% 0px -58% 0px' });
    secciones.forEach(function (s) { ioSec.observe(s); });
  }

  /* 3. Cifras que cuentan al entrar en pantalla (el HTML ya trae el valor final) */
  var formato = function (v, d) {
    try { return v.toLocaleString('es-CO', { minimumFractionDigits: d, maximumFractionDigits: d }); }
    catch (e) { return v.toFixed(d).replace('.', ','); }
  };
  var contar = function (el) {
    var fin = parseFloat(el.getAttribute('data-cuenta'));
    var dec = parseInt(el.getAttribute('data-decimales') || '0', 10);
    if (isNaN(fin)) return;
    var dur = 900;
    var t0 = null;
    var paso = function (t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      el.textContent = formato(fin * e, dec);
      if (k < 1) window.requestAnimationFrame(paso);
      else el.textContent = formato(fin, dec);
    };
    window.requestAnimationFrame(paso);
  };
  var contadores = lista('[data-cuenta]');
  if (!reducido && 'IntersectionObserver' in window && contadores.length) {
    var ioCifras = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        ioCifras.unobserve(e.target);
        contar(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    contadores.forEach(function (el) { ioCifras.observe(el); });
  }

  /* 4. Galerías con scroll-snap: botones Anterior y Siguiente */
  var flecha = function (d) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + (d < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7') + '"/></svg>';
  };
  lista('[data-galeria]').forEach(function (g) {
    var pista = g.querySelector('.galeria-pista');
    if (!pista) return;
    var nombre = (pista.getAttribute('aria-label') || 'capturas').toLowerCase();
    var ctrl = document.createElement('div');
    ctrl.className = 'galeria-ctrl';
    ctrl.innerHTML =
      '<button type="button" class="galeria-btn" data-dir="-1" aria-label="Anterior en ' + nombre + '">' + flecha(-1) + '</button>' +
      '<button type="button" class="galeria-btn" data-dir="1" aria-label="Siguiente en ' + nombre + '">' + flecha(1) + '</button>';
    g.insertBefore(ctrl, pista);
    var bAnt = ctrl.children[0];
    var bSig = ctrl.children[1];
    var estado = function () {
      var max = pista.scrollWidth - pista.clientWidth - 2;
      ctrl.hidden = max <= 0;
      bAnt.disabled = pista.scrollLeft <= 2;
      bSig.disabled = pista.scrollLeft >= max;
      pista.classList.toggle('mas-der', max > 0 && pista.scrollLeft < max);
    };
    pista.__estado = estado;
    ctrl.addEventListener('click', function (ev) {
      var b = ev.target.closest('.galeria-btn');
      if (!b) return;
      var dir = parseInt(b.getAttribute('data-dir'), 10);
      pista.scrollBy({ left: dir * Math.max(240, pista.clientWidth * 0.8), behavior: suave });
    });
    var cola = false;
    pista.addEventListener('scroll', function () {
      if (!cola) { cola = true; window.requestAnimationFrame(function () { cola = false; estado(); }); }
    }, { passive: true });
    window.addEventListener('resize', estado);
    lista('img', pista).forEach(function (i) { if (!i.complete) i.addEventListener('load', estado); });
    estado();
  });

  /* 5. Visor de capturas: teclado (Escape, flechas), foco atrapado y regreso del foco.
     En el celular ocupa la pantalla, amplía la captura (se recorre con el dedo) y admite deslizar para pasar. */
  var visor = document.getElementById('visor');
  var angosto = window.matchMedia ? window.matchMedia('(max-width: 699px)') : { matches: false };
  if (visor && typeof visor.showModal === 'function') {
    var vImg = document.getElementById('visor-img');
    var vMarco = document.getElementById('visor-marco');
    var vPie = document.getElementById('visor-pie');
    var vCuenta = document.getElementById('visor-cuenta');
    var vAyuda = document.getElementById('visor-ayuda');
    var vAnt = document.getElementById('visor-ant');
    var vSig = document.getElementById('visor-sig');
    var vZoom = document.getElementById('visor-zoom');
    var vCerrar = document.getElementById('visor-cerrar');
    var grupo = [];
    var idx = 0;
    var origen = null;
    var ampliado = false;

    var imagenDe = function (btn) {
      return btn.querySelector('img') || (btn.closest('figure') ? btn.closest('figure').querySelector('img') : null);
    };
    var datos = function (btn) {
      var img = imagenDe(btn);
      var fig = btn.closest('figure');
      var cap = fig ? fig.querySelector('figcaption') : null;
      var pie = btn.getAttribute('data-pie') || img.getAttribute('data-pie') || (cap ? cap.textContent.trim() : '');
      return {
        src: img.currentSrc || img.src,
        alt: img.getAttribute('alt') || '',
        pie: btn.classList.contains('tira-abrir') && cap ? cap.firstChild.textContent.trim() : pie,
        w: parseInt(img.getAttribute('width'), 10) || 0,
        h: parseInt(img.getAttribute('height'), 10) || 0
      };
    };
    var aplicarZoom = function () {
      var d = datos(grupo[idx]);
      var largo = d.w && d.h / d.w > 2.4;
      var puede = angosto.matches && !largo && d.w > 0;
      visor.classList.toggle('visor-largo', !!largo);
      visor.classList.toggle('visor-ampliado', puede && ampliado);
      vZoom.hidden = !puede;
      vZoom.setAttribute('aria-pressed', puede && ampliado ? 'true' : 'false');
      vAyuda.hidden = !(angosto.matches && ((puede && ampliado) || largo));
      if (puede && ampliado) {
        // Ancho ampliado: el natural de la captura, hasta 2 veces el ancho del visor
        var marcoAncho = vMarco.clientWidth || window.innerWidth;
        vImg.style.setProperty('--ancho-ampliado', Math.round(Math.max(marcoAncho, Math.min(d.w, marcoAncho * 2))) + 'px');
      }
      vMarco.scrollTop = 0;
      vMarco.scrollLeft = 0;
    };
    var mostrar = function (i) {
      idx = (i + grupo.length) % grupo.length;
      var d = datos(grupo[idx]);
      if (d.w) vImg.setAttribute('width', d.w);
      if (d.h) vImg.setAttribute('height', d.h);
      vImg.src = d.src;
      vImg.alt = d.alt;
      vPie.textContent = d.pie;
      vCuenta.textContent = grupo.length > 1 ? 'Captura ' + (idx + 1) + ' de ' + grupo.length : 'Captura';
      vAnt.hidden = vSig.hidden = grupo.length < 2;
      aplicarZoom();
    };
    document.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.zoom, .tira-abrir');
      if (!btn || !imagenDe(btn)) return;
      var g = btn.getAttribute('data-grupo');
      grupo = g ? lista('.zoom[data-grupo="' + g + '"]') : [btn];
      origen = btn;
      ampliado = angosto.matches;
      visor.showModal();
      mostrar(Math.max(0, grupo.indexOf(btn)));
      vCerrar.focus();
    });
    vAnt.addEventListener('click', function () { mostrar(idx - 1); });
    vSig.addEventListener('click', function () { mostrar(idx + 1); });
    vZoom.addEventListener('click', function () { ampliado = !ampliado; aplicarZoom(); });
    vCerrar.addEventListener('click', function () { visor.close(); });
    visor.addEventListener('click', function (ev) { if (ev.target === visor) visor.close(); });
    visor.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowLeft' && grupo.length > 1) { ev.preventDefault(); mostrar(idx - 1); }
      else if (ev.key === 'ArrowRight' && grupo.length > 1) { ev.preventDefault(); mostrar(idx + 1); }
      else if (ev.key === 'Tab') {
        var focos = [vAnt, vSig, vZoom, vCerrar].filter(function (b) { return !b.hidden && b.offsetParent !== null; });
        var primero = focos[0];
        var ultimo = focos[focos.length - 1];
        if (ev.shiftKey && (document.activeElement === primero || !visor.contains(document.activeElement))) { ev.preventDefault(); ultimo.focus(); }
        else if (!ev.shiftKey && (document.activeElement === ultimo || !visor.contains(document.activeElement))) { ev.preventDefault(); primero.focus(); }
      }
    });
    // Deslizar a los lados para pasar de captura (solo con la captura ajustada a la pantalla)
    var toque = null;
    vMarco.addEventListener('touchstart', function (e) {
      toque = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
    }, { passive: true });
    vMarco.addEventListener('touchend', function (e) {
      if (!toque || grupo.length < 2 || visor.classList.contains('visor-ampliado')) { toque = null; return; }
      var t = e.changedTouches[0];
      var dx = t.clientX - toque.x;
      var dy = t.clientY - toque.y;
      toque = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) mostrar(idx + (dx < 0 ? 1 : -1));
    }, { passive: true });
    visor.addEventListener('close', function () {
      visor.classList.remove('visor-ampliado', 'visor-largo');
      if (origen && document.body.contains(origen)) origen.focus();
    });
  }

  /* 5b. Portada completa en el celular: vista previa recortada y botón que abre el visor */
  lista('.tira-abrir').forEach(function (b) { b.hidden = false; });

  /* 6. Pestañas de competidores (sin JavaScript se ven las siete fichas seguidas) */
  var contPest = document.querySelector('[data-pestanas]');
  if (contPest) {
    var fichas = lista('.ficha-comp', contPest);
    if (fichas.length > 1) {
      var tablist = document.createElement('div');
      tablist.className = 'pestanas';
      tablist.setAttribute('role', 'tablist');
      tablist.setAttribute('aria-label', 'Competidores');
      var tabs = fichas.map(function (f) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'pestana';
        b.id = 'pestana-' + f.id;
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-controls', f.id);
        b.textContent = f.getAttribute('data-etiqueta') || f.id;
        f.setAttribute('role', 'tabpanel');
        f.setAttribute('aria-labelledby', b.id);
        f.setAttribute('tabindex', '0');
        tablist.appendChild(b);
        return b;
      });
      contPest.insertBefore(tablist, fichas[0]);
      contPest.classList.add('con-pestanas');
      var elegir = function (i, enfocar) {
        tabs.forEach(function (t, j) {
          var sel = i === j;
          t.setAttribute('aria-selected', sel ? 'true' : 'false');
          t.tabIndex = sel ? 0 : -1;
          fichas[j].hidden = !sel;
        });
        if (enfocar) tabs[i].focus();
        fichas[i].classList.remove('recien');
        void fichas[i].offsetWidth;
        fichas[i].classList.add('recien');
        lista('.galeria-pista', fichas[i]).forEach(function (p) { if (p.__estado) p.__estado(); });
      };
      // Misma altura para todas las fichas: el contenido de abajo no salta al cambiar de competidor
      var igualar = function () {
        var max = 0;
        fichas.forEach(function (f) { f.style.minHeight = ''; });
        if (window.innerWidth >= 700) {
          fichas.forEach(function (f) {
            var oculto = f.hidden;
            f.hidden = false;
            lista('.galeria-pista', f).forEach(function (p) { if (p.__estado) p.__estado(); });
            max = Math.max(max, f.offsetHeight);
            f.hidden = oculto;
          });
          fichas.forEach(function (f) { f.style.minHeight = max + 'px'; });
        }
      };
      var colaIg = null;
      window.addEventListener('resize', function () { window.clearTimeout(colaIg); colaIg = window.setTimeout(igualar, 150); });
      tablist.addEventListener('click', function (e) {
        var t = e.target.closest('.pestana');
        if (t) elegir(tabs.indexOf(t), false);
      });
      tablist.addEventListener('keydown', function (e) {
        var i = tabs.indexOf(document.activeElement);
        if (i < 0) return;
        var n = null;
        if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = tabs.length - 1;
        if (n !== null) { e.preventDefault(); elegir(n, true); }
      });
      elegir(0, false);
      igualar();
      window.addEventListener('load', igualar);
    }
  }

  /* 7. Comparador antes/después: control deslizante nativo (teclado) y arrastre */
  var comp = document.getElementById('comparador');
  if (comp) {
    var marco = document.getElementById('comp-marco');
    var rango = document.getElementById('comp-rango');
    var imgAntes = document.getElementById('comp-antes');
    var imgDesp = document.getElementById('comp-despues');
    var etq = document.getElementById('comp-etq');
    document.getElementById('comp-rango-fila').hidden = false;
    document.getElementById('ad-controles').hidden = false;

    var fuentes = {
      actual: {
        desktop: ['img/actual/inicio-desktop-primer-pantallazo.webp', 1280, 800, 'Sitio actual, portada en escritorio: foto de vacas, titular «Atrae y fideliza más clientes» y formulario de contacto.'],
        movil: ['img/actual/inicio-movil-primer-pantallazo.webp', 520, 1125, 'Sitio actual, portada en celular: foto de vacas y titular «Productores de leche en polvo y derivados con más de 11 años de experiencia».']
      },
      c1: {
        desktop: ['img/conceptos/c1-inicio-desktop.webp', 1280, 800, 'Concepto 1, portada en escritorio: titular sobre el globo de franjas azules con sacos y bolsas.'],
        movil: ['img/conceptos/c1-inicio-movil.webp', 520, 1125, 'Concepto 1, portada en celular: titular sobre el globo de franjas.']
      },
      c2: {
        desktop: ['img/conceptos/c2-inicio-desktop.webp', 1280, 800, 'Concepto 2, portada en escritorio: titular condensado y las 12 presentaciones a escala.'],
        movil: ['img/conceptos/c2-inicio-movil.webp', 520, 1125, 'Concepto 2, portada en celular: titular condensado y barra inferior.']
      }
    };
    var sel = { c: 'c1', v: 'desktop' };
    var nombre = function () { return sel.c === 'c1' ? 'Concepto 1' : 'Concepto 2'; };
    var fijar = function (v) {
      v = Math.max(0, Math.min(100, v));
      comp.style.setProperty('--pos', v + '%');
      var r = Math.round(v);
      if (+rango.value !== r) rango.value = r;
      rango.setAttribute('aria-valuetext', r + ' % sitio actual y ' + (100 - r) + ' % ' + nombre());
    };
    var poner = function (img, f) {
      img.setAttribute('width', f[1]);
      img.setAttribute('height', f[2]);
      img.src = f[0];
      img.alt = f[3];
    };
    var pintar = function () {
      poner(imgAntes, fuentes.actual[sel.v]);
      poner(imgDesp, fuentes[sel.c][sel.v]);
      etq.textContent = nombre();
      comp.setAttribute('data-vista', sel.v);
      comp.classList.remove('cambia');
      void comp.offsetWidth;
      comp.classList.add('cambia');
      fijar(+rango.value);
    };
    rango.addEventListener('input', function () { fijar(+rango.value); });
    lista('input[name="ad-concepto"]').forEach(function (r) {
      r.addEventListener('change', function () { if (r.checked) { sel.c = r.value; pintar(); } });
    });
    lista('input[name="ad-vista"]').forEach(function (r) {
      r.addEventListener('change', function () { if (r.checked) { sel.v = r.value; pintar(); } });
    });

    var arrastre = null;
    var desde = function (e) {
      var r = marco.getBoundingClientRect();
      if (r.width) fijar((e.clientX - r.left) / r.width * 100);
    };
    marco.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      arrastre = { id: e.pointerId, x: e.clientX, y: e.clientY, tactil: e.pointerType !== 'mouse', activo: e.pointerType === 'mouse' };
      if (arrastre.activo) { desde(e); try { marco.setPointerCapture(e.pointerId); } catch (err) { /* sin captura */ } }
    });
    marco.addEventListener('pointermove', function (e) {
      if (!arrastre || arrastre.id !== e.pointerId) return;
      if (!arrastre.activo) {
        var dx = Math.abs(e.clientX - arrastre.x);
        var dy = Math.abs(e.clientY - arrastre.y);
        if (dx > 6 && dx > dy) { arrastre.activo = true; try { marco.setPointerCapture(e.pointerId); } catch (err) { /* sin captura */ } }
        else if (dy > 6) { arrastre = null; return; }
      }
      if (arrastre && arrastre.activo) desde(e);
    });
    var soltar = function (e) {
      if (arrastre && arrastre.tactil && !arrastre.activo && e.type === 'pointerup') desde(e);
      arrastre = null;
    };
    marco.addEventListener('pointerup', soltar);
    marco.addEventListener('pointercancel', function () { arrastre = null; });
    // Abre en 35 %: se ve más concepto que sitio actual.
    fijar(35);
    // En pantallas angostas se compara directamente la vista de celular.
    if (window.matchMedia && window.matchMedia('(max-width: 599px)').matches) {
      var enCelular = document.getElementById('ad-movil');
      if (enCelular) { enCelular.checked = true; sel.v = 'movil'; pintar(); }
    }
  }
  /* 8. Listas largas plegables en el celular (abiertas sin JavaScript y en pantallas anchas) */
  var plegables = lista('details.plegable');
  if (plegables.length && window.matchMedia) {
    var mqPleg = window.matchMedia('(max-width: 699px)');
    var ajustarPleg = function () { plegables.forEach(function (d) { d.open = !mqPleg.matches; }); };
    ajustarPleg();
    var alCambiar = function () { ajustarPleg(); };
    if (mqPleg.addEventListener) mqPleg.addEventListener('change', alCambiar);
    else if (mqPleg.addListener) mqPleg.addListener(alCambiar);
  }
})();

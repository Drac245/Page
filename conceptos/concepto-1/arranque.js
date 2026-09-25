/* Se ejecuta antes de pintar el hero: marca que hay JavaScript y decide la carga
   orquestada del globo (una vez por sesión, nunca con movimiento reducido). */
(function () {
  var d = document.documentElement;
  d.classList.add('js');
  d.setAttribute('lang', 'es-CO');
  try {
    var h = (location.hash || '').replace('#', '');
    var enInicio = !h || h === 'inicio';
    var reducido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var visto = false;
    try { visto = window.sessionStorage.getItem('mundi.c1.orquesta') === '1'; } catch (e) { visto = false; }
    if (!enInicio) d.classList.add('ruta-interior');
    if (enInicio && !reducido && !visto) {
      d.classList.add('orquesta');
      try { window.sessionStorage.setItem('mundi.c1.orquesta', '1'); } catch (e) { /* sin almacenamiento: se repite, no pasa nada */ }
      window.setTimeout(function () { d.classList.remove('orquesta'); }, 1400);
    }
  } catch (e) { /* el hero queda armado desde el primer pintado */ }
})();

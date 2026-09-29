/* Concepto 3 · comportamiento compartido: tema, búsqueda instantánea, navegación inferior y cotización persistente */
(function(){
  var store={get:function(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
  window.C1={store:store};
  var root=document.documentElement;

  /* Tema: sigue al sistema; el botón fija claro u oscuro */
  function isDark(){var t=root.getAttribute('data-theme');return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches}
  function paintThemeBtn(){document.querySelectorAll('[data-theme-btn]').forEach(function(b){b.setAttribute('aria-pressed',isDark());var l=b.querySelector('.lbl');if(l)l.textContent=isDark()?'Claro':'Oscuro';b.setAttribute('aria-label',isDark()?'Cambiar a modo claro':'Cambiar a modo oscuro')})}
  document.addEventListener('click',function(e){var b=e.target.closest('[data-theme-btn]');if(!b)return;var next=isDark()?'light':'dark';root.setAttribute('data-theme',next);store.set('ml-c1-theme',next);paintThemeBtn();});
  paintThemeBtn();

  /* Cotización guardada entre páginas */
  window.C1.quote=function(q){if(q){store.set('ml-c1-quote',q)}return store.get('ml-c1-quote',{})};
  window.C1.paintBadge=function(){var n=Object.keys(C1.quote()).length;document.querySelectorAll('[data-qcount]').forEach(function(el){el.textContent=n;el.hidden=!n})};
  C1.paintBadge();

  /* Búsqueda instantánea */
  var cmd=document.getElementById('cmd');
  if(cmd&&window.ML){
    var input=cmd.querySelector('input'),list=cmd.querySelector('ul'),sel=0,items=[];
    var pages=[['Calidad y certificaciones','index.html#calidad','Página'],['Distribución y cobertura','index.html#cobertura','Página'],['Solicitar cotización','index.html#cotizar','Página'],['Catálogo completo','catalogo.html','Página'],['Marca propia','index.html#marcas','Servicio']];
    function norm(s){return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/(\d)\s*(g|kg)\b/g,'$1 $2')}
    function render(){
      var q=norm(input.value.trim()),toks=q.split(/\s+/).filter(Boolean);
      var sk=ML.skus.filter(function(x){var h=norm(x.brand+' '+x.type+' '+x.name+' '+x.label+' '+x.format+(x.format==='Bulto'?' saco industria panaderia':' paca tienda hogar'));return toks.every(function(t){return h.indexOf(t)>=0})}).slice(0,8);
      var pg=pages.filter(function(p){var h=norm(p[0]);return !toks.length||toks.every(function(t){return h.indexOf(t)>=0})});
      items=sk.map(function(x){return {href:'catalogo.html#p-'+x.id,html:'<img src="../assets/img/'+x.img+'.webp" alt=""><span><b>'+x.brand+' '+x.type.toLowerCase()+' '+x.label+'</b><small>'+x.format+(x.pack?', paca de '+x.pack+' unidades':', empaque kraft')+'</small></span><span class="kbd">Ficha</span>'}}).concat(pg.map(function(p){return {href:p[1],html:'<span></span><span><b>'+p[0]+'</b><small>'+p[2]+'</small></span><span class="kbd">Ir</span>'}}));
      sel=Math.min(sel,Math.max(items.length-1,0));
      list.innerHTML=items.length?(sk.length?'<li class="grp">Productos</li>':'')+items.map(function(it,i){return (i===sk.length&&pg.length?'<li class="grp">Páginas</li>':'')+'<li><a role="option" id="cmd-'+i+'" href="'+it.href+'" aria-selected="'+(i===sel)+'">'+it.html+'</a></li>'}).join(''):'<li class="grp">Sin resultados. Pruebe con "900 g", "azucarada" o "bulto".</li>';
      input.setAttribute('aria-activedescendant',items.length?'cmd-'+sel:'');
    }
    function open(){input.value='';sel=0;render();cmd.showModal();input.focus()}
    input.addEventListener('input',function(){sel=0;render()});
    input.addEventListener('keydown',function(e){if(e.key==='ArrowDown'){sel=Math.min(sel+1,items.length-1);render();e.preventDefault();var a=document.getElementById('cmd-'+sel);a&&a.scrollIntoView({block:'nearest'})}else if(e.key==='ArrowUp'){sel=Math.max(sel-1,0);render();e.preventDefault();var b=document.getElementById('cmd-'+sel);b&&b.scrollIntoView({block:'nearest'})}else if(e.key==='Enter'&&items[sel]){e.preventDefault();go(items[sel].href)}});
    function go(h){cmd.close();var here=location.pathname.split('/').pop()||'index.html',tgt=h.split('#')[0];if(tgt===here){location.hash=h.split('#')[1]||'';window.dispatchEvent(new HashChangeEvent('hashchange'))}else location.href=h}
    list.addEventListener('click',function(e){var a=e.target.closest('a');if(!a)return;e.preventDefault();go(a.getAttribute('href'))});
    cmd.addEventListener('click',function(e){if(e.target===cmd)cmd.close()});
    document.addEventListener('keydown',function(e){if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();cmd.open?cmd.close():open()}});
    document.addEventListener('click',function(e){if(e.target.closest('[data-cmd]')){e.preventDefault();open()}});
  }
})();

/* Capa estética: luz que sigue al puntero y conteo de cifras al entrar en pantalla */
(function(){
  var fine=matchMedia('(pointer: fine)').matches, calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(fine){document.addEventListener('pointermove',function(e){var el=e.target.closest&&e.target.closest('[data-spot]');if(!el)return;var r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px');},{passive:true});}
  if(calm||!('IntersectionObserver' in window))return;
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;io.unobserve(en.target);var el=en.target,to=+el.dataset.count,t0=performance.now();(function f(t){var p=Math.min(1,(t-t0)/900);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0);})},{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(function(el){io.observe(el)});
})();

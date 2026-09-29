/* Concepto 4 · pedido y tipo de cliente compartidos entre páginas */
(function(){
  var store={get:function(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
  window.C2={
    order:function(o){if(o)store.set('ml-c2-order',o);return store.get('ml-c2-order',{})},
    aud:function(a){if(a)store.set('ml-c2-aud',a);return store.get('ml-c2-aud','')},
    paint:function(bump){var o=C2.order(),n=Object.keys(o).filter(function(k){return o[k]>0}).length;document.querySelectorAll('[data-ocount]').forEach(function(el){el.textContent=n;el.hidden=!n;if(bump){el.classList.remove('bump');void el.offsetWidth;el.classList.add('bump')}})}
  };
  C2.paint();
  var b=document.getElementById('menuBtn'),n=document.getElementById('nav');
  if(b)b.onclick=function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)};
})();
/* Cifras que cuentan al entrar en pantalla */
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;io.unobserve(en.target);var el=en.target,to=+el.dataset.count,t0=performance.now();(function f(t){var p=Math.min(1,(t-t0)/1000);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)})},{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(function(el){io.observe(el)});
})();

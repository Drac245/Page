/* Catálogo de prototipo. Fuente: mundilacteos.com (productos y embalaje), consultado el 25-sep-2026.
   Supuesto: los gramajes 27, 104, 200, 750 y 1000 g se asignan a The Cántaro entera (el sitio los lista sin marca).
   Parámetros fisicoquímicos: ficha técnica pública de The Cántaro (referencia, por validar con Mundilácteos). */
(function () {
  var PACK = { 27: 300, 104: 100, 200: 60, 380: 30, 400: 30, 500: 24, 750: 15, 900: 12, 1000: 12 };
  var G_PER_L = 130; // referencia de reconstitución: 130 g por litro (por validar con ficha técnica)
  var families = [
    { id: 'cantaro-entera', brand: 'The Cántaro', type: 'Entera', name: 'Leche en polvo entera',
      bag: [27, 104, 200, 380, 400, 500, 750, 900, 1000], sack: [5, 12.5, 25],
      imgBag: 'cantaro-entera-bolsa', imgSack: 'cantaro-entera-bulto',
      note: 'Adicionada con hierro aminoquelado según ficha técnica pública.' },
    { id: 'cantaro-azucarada', brand: 'The Cántaro', type: 'Azucarada', name: 'Leche en polvo azucarada',
      bag: [380, 400, 500, 900], sack: [5, 12.5, 25],
      imgBag: 'cantaro-azucarada-bolsa', imgSack: 'cantaro-azucarada-bulto',
      note: 'Lista para preparar bebidas dulces y postres.' },
    { id: 'becerrita-entera', brand: 'La Becerrita', type: 'Entera', name: 'Leche en polvo entera',
      bag: [380, 400, 500, 900], sack: [5, 12.5, 25],
      imgBag: 'becerrita-entera-bolsa', imgSack: 'becerrita-entera-bulto',
      note: 'Marca de precio accesible para canal tradicional.' }
  ];
  var skus = [];
  families.forEach(function (f) {
    f.bag.forEach(function (g) {
      skus.push({ id: f.id + '-' + g + 'g', family: f.id, brand: f.brand, type: f.type, name: f.name,
        format: 'Bolsa', grams: g, label: g >= 1000 ? (g / 1000) + ' kg' : g + ' g',
        pack: PACK[g], img: f.imgBag, life: '12 meses', note: f.note,
        use: g <= 200 ? 'Hogar y tienda' : 'Hogar, tienda y supermercado' });
    });
    f.sack.forEach(function (k) {
      skus.push({ id: f.id + '-' + k + 'kg', family: f.id, brand: f.brand, type: f.type, name: f.name,
        format: 'Bulto', grams: k * 1000, label: String(k).replace('.', ',') + ' kg',
        pack: null, img: f.imgSack, life: '12 meses', note: f.note,
        use: 'Panadería, heladería e industria' });
    });
  });
  var spec = [
    ['Proteína', '24,5 – 33,0 %'], ['Grasa', '26,0 – 34,0 %'], ['Humedad', 'máx. 4,0 %'],
    ['Acidez', '0,90 – 1,30 %'], ['Lactosa', 'máx. 44,0 %']
  ];
  var packaging = {
    Bolsa: 'Bolsa polilaminada y termosellada de 3 películas (polipropileno mate y BOPP metalizado), dosificada en atmósfera controlada de CO₂. Se agrupa en pacas según gramaje.',
    Bulto: 'Bolsa interna de polietileno de baja densidad protegida con saco de papel kraft de triple capa.'
  };
  function liters(grams) { return grams / G_PER_L; }
  window.ML = { families: families, skus: skus, spec: spec, packaging: packaging, PACK: PACK, G_PER_L: G_PER_L, liters: liters,
    fmt: function (n, d) { return n.toLocaleString('es-CO', { maximumFractionDigits: d == null ? 0 : d, minimumFractionDigits: 0 }); } };
})();

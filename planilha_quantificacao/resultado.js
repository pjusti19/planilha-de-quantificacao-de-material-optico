
 const urlParams = new URLSearchParams(window.location.search);
 document.getElementById('resultado_pavimentos').textContent = urlParams.get('numero_pavimentos');
 document.getElementById('resultado_fibras').textContent = urlParams.get('pares_fibras');
 document.getElementById('resultado_medida').textContent = urlParams.get('medida_basica');
 document.getElementById('resultado_caracteristica').textContent = urlParams.get('caracteristica');
 document.getElementById('resultado_backbone_andar').textContent = urlParams.get('backbone_andar');
 document.getElementById('resultado_backbone_primario').textContent = urlParams.get('backbone_primario');
 document.getElementById('resultado_backbone_secundario').textContent = urlParams.get('backbone_secundario');
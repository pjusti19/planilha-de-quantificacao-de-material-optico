function obterParametrosURL() {
    const urlParams = new URLSearchParams(window.location.search);

    // Resgata os valores das variaveis
    document.getElementById('numeroPavimentos').textContent = urlParams.get('numero_pavimentos');
    document.getElementById('paresFibras').textContent = urlParams.get('pares_fibras');
    document.getElementById('medidaBasica').textContent = urlParams.get('medida_basica');
    document.getElementById('caracteristica').textContent = urlParams.get('caracteristica');
    document.getElementById('backboneAndar').textContent = urlParams.get('backbone_andar');
    document.getElementById('backbonePrimario').textContent = urlParams.get('backbone_primario');
    document.getElementById('backboneSecundario').textContent = urlParams.get('backbone_secundario');
    document.getElementById('fibraOpticaMetros').textContent = urlParams.get('fibraOpticaMetros');
    document.getElementById('bandejaEmenda').textContent = urlParams.get('bandejaEmenda');
    document.getElementById('terminadorOpt8fibras').textContent = urlParams.get('terminadorOpt8fibras');
    document.getElementById('qntdAcopladorOptSM').textContent = urlParams.get('qntdAcopladorOptSM');
    document.getElementById('qntdCordaoOpticoSMExt').textContent = urlParams.get('qntdCordaoOpticoSMExt');
    document.getElementById('qntdAcopladorOptMM').textContent = urlParams.get('qntdAcopladorOptMM');
    document.getElementById('qntdCordaoOptMMInt').textContent = urlParams.get('qntdCordaoOptMMInt');
    document.getElementById('qntdPigTailSMSimples').textContent = urlParams.get('qntdPigTailSMSimples');
    document.getElementById('qntdPigTailSMDuplo').textContent = urlParams.get('qntdPigTailSMDuplo');
    document.getElementById('qntdPigTailMMSimples').textContent = urlParams.get('qntdPigTailMMSimples');
    document.getElementById('qntdPigTailMMDuplo').textContent = urlParams.get('qntdPigTailMMDuplo');
}
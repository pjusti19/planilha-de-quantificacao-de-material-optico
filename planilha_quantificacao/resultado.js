function obterParametrosURL() {
    const urlParams = new URLSearchParams(window.location.search);

    // Resgata os valores das variaveis
    document.getElementById('fibraOpticaMetros').textContent = urlParams.get('fibraOpticaMetros');
    document.getElementById('quantidadeDio').textContent = urlParams.get('quantidadeDio');
    document.getElementById('bandejaEmenda').textContent = urlParams.get('bandejaEmenda');
    document.getElementById('terminadorOpt8fibras').textContent = urlParams.get('terminadorOpt8fibras');
    document.getElementById('qntdAcopladorOptSM').textContent = urlParams.get('qntdAcopladorOptSM');
    document.getElementById('qntdCordaoOptSM').textContent = urlParams.get('qntdCordaoOptSM');
    document.getElementById('qntdAcopladorOptMM').textContent = urlParams.get('qntdAcopladorOptMM');
    document.getElementById('qntdCordaoOptMM').textContent = urlParams.get('qntdCordaoOptMM');
    document.getElementById('qntdPigTailSMSimples').textContent = urlParams.get('qntdPigTailSMSimples');
    document.getElementById('qntdPigTailSMDuplo').textContent = urlParams.get('qntdPigTailSMDuplo');
    document.getElementById('qntdPigTailMMSimples').textContent = urlParams.get('qntdPigTailMMSimples');
    document.getElementById('qntdPigTailMMDuplo').textContent = urlParams.get('qntdPigTailMMDuplo');
}
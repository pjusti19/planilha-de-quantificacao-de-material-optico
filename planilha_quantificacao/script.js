// bom dia duda
document.getElementById('Calculo').addEventListener('click', function() {
    // Pegando os valores do arquivo
    const numeroPavimentos = document.getElementById('numero_pavimentos').value;
    const paresFibras = document.getElementById('pares_fibras_disponiveis').value;
    const medidaBasica = document.getElementById('medida_basica').value;
    const caracteristica = document.getElementById('caracteristica').value;
    const backboneAndar = document.getElementById('backbone_andar').value;
    const backbonePrimario = document.getElementById('backbone_primario').checked ? 'Sim' : 'Não';
    const backboneSecundario = document.getElementById('backbone_secundario').checked ? 'Sim' : 'Não';

    // Faz os calculos ai em baixo

   

    // redireciona os valores pra outra pagina
    window.location.href = `resultado.html?numero_pavimentos=${numeroPavimentos}&pares_fibras=${paresFibras}&medida_basica=${medidaBasica}&caracteristica=${caracteristica}&backbone_andar=${backboneAndar}&backbone_primario=${backbonePrimario}&backbone_secundario=${backboneSecundario}`;
});
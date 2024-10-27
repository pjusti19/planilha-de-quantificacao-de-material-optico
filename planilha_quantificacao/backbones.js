document.addEventListener('DOMContentLoaded', function() {
    let backbonePrimario = document.getElementById('backbone_primario');
    let backboneSecundario = document.getElementById('backbone_secundario');
    let inputs_primarios = document.getElementById('inputs');
    let inputs_secundarios = document.getElementById('inputs_secundarios');
    let botao = document.getElementById('botao');

    function atualizarVisibilidade() {
        inputs_primarios.classList.toggle('hidden', !(backbonePrimario.checked || backboneSecundario.checked));
        
        inputs_secundarios.classList.toggle('hidden', !backboneSecundario.checked);

        botao.classList.toggle('hidden', !(backbonePrimario.checked || backboneSecundario.checked));
    }

    backbonePrimario.addEventListener('change', atualizarVisibilidade);
    backboneSecundario.addEventListener('change', atualizarVisibilidade);


    atualizarVisibilidade();
});

// bom dia duda
document.getElementById('Calculo').addEventListener('click', function () {
    // Pegando os valores do arquivo
    const numeroPavimentos = parseInt(document.getElementById('numero_pavimentos').value) || 0;
    const qntdFibras = parseInt(document.getElementById('qntd_fibras_disponiveis').value) || 0;
    const qntdPredios = parseInt(document.getElementById('qntd_predios').value) || 0
    const distancia = parseInt(document.getElementById('distancia').value) || 0
    const medidaBasica = parseFloat(document.getElementById('medida_basica').value) || 0;
    const backboneAndar = parseInt(document.getElementById('backbone_andar').value) || 0;
    const backbonePrimario = document.getElementById('backbone_primario').checked ? 'Sim' : 'Não';
    const backboneSecundario = document.getElementById('backbone_secundario').checked ? 'Sim' : 'Não';
    const comboBox = document.getElementById("especificacao");
    const especificacao = comboBox.options[comboBox.selectedIndex].text;
    const qntdFibrasPredio = parseInt(document.getElementById('numeroFibras').value) || 0;

    // Faz os calculos ai em baixo

    // colocar no resultado
    let comprimentoFibra = 0;

    let fibraOpticaMetros = 0;

    let aux;

    let quantidadeDio = 0;

    let qntdPigTailSMDuplo = 0;
    let qntdPigTailMMDuplo = 0;
    let qntdPigTailSMSimples = 0;
    let qntdPigTailMMSimples = 0;

    let qntdAcopladorOptMM = 0;
    let qntdAcopladorOptSM = 0;

    let bandejaEmenda = 0;

    let qntdCordaoOptSM = 0;
    let qntdCordaoOptMM = 0;

    let terminadorOpt8fibras;

    if (backbonePrimario == 'Sim' && backboneSecundario == 'Não') {

        for (let i = 1; i < numeroPavimentos; i++) {
            aux = (i + 1) * medidaBasica + medidaBasica;
            fibraOpticaMetros += aux;
        }

        quantidadeDio = (numeroPavimentos - 1) * qntdFibras * backboneAndar;
        quantidadeDio /= 24;
        bandejaEmenda = (numeroPavimentos - 1) * qntdFibras / 12;
        terminadorOpt8fibras = (numeroPavimentos - 1) * qntdFibras / 8 * backboneAndar;

        fibraOpticaMetros = fibraOpticaMetros * 1.2 * backboneAndar;

        if (especificacao == 'multimodo') {
            qntdAcopladorOptMM = (qntdFibras * (numeroPavimentos - 1)) / 2 * backboneAndar;
            qntdCordaoOptMM = (qntdFibras * (numeroPavimentos - 1)) / 2 * backboneAndar;
            qntdPigTailMMSimples = (qntdFibras * (numeroPavimentos - 1)) * backboneAndar;
            qntdPigTailMMDuplo = (qntdFibras * (numeroPavimentos - 1)) / 2 * backboneAndar;
        }

        else if (especificacao == 'monomodo') {
            qntdAcopladorOptSM = (qntdFibras * (numeroPavimentos - 1)) / 2 * backboneAndar;
            qntdCordaoOptSM = (qntdFibras * (numeroPavimentos - 1)) / 2 * backboneAndar;
            qntdPigTailSMSimples = (qntdFibras * (numeroPavimentos - 1)) * backboneAndar;
            qntdPigTailSMDuplo = (qntdFibras * (numeroPavimentos - 1)) / 2 * backboneAndar;
        }

        fibraOpticaMetros = Math.ceil(fibraOpticaMetros);
        quantidadeDio = Math.ceil(quantidadeDio);
        bandejaEmenda = Math.ceil(bandejaEmenda);
        terminadorOpt8fibras = Math.ceil(terminadorOpt8fibras);

        qntdAcopladorOptSM = Math.ceil(qntdAcopladorOptSM);
        qntdAcopladorOptMM = Math.ceil(qntdAcopladorOptMM);

        qntdCordaoOptSM = Math.ceil(qntdCordaoOptSM);
        qntdCordaoOptMM = Math.ceil(qntdCordaoOptMM);

        qntdPigTailSMSimples = Math.ceil(qntdPigTailSMSimples);
        qntdPigTailSMDuplo = Math.ceil(qntdPigTailSMDuplo);
        qntdPigTailMMSimples = Math.ceil(qntdPigTailMMSimples);
        qntdPigTailMMDuplo = Math.ceil(qntdPigTailMMDuplo);

    } else if (backboneSecundario == 'Sim') {

        quantidadeDio = (qntdPredios) * 2 * backboneAndar;
        
        if (distancia != 0)
            comprimentoFibra = (qntdPredios) * distancia;

        for (let i = 1; i < numeroPavimentos; i++) {

            aux = (i + 1) * medidaBasica + medidaBasica;
            fibraOpticaMetros += aux;
        }

        fibraOpticaMetros = fibraOpticaMetros * 1.2 * backboneAndar * qntdPredios;
        bandejaEmenda = (qntdFibras * (numeroPavimentos - 1) + qntdFibrasPredio) / 12 * qntdPredios * backboneAndar;
        terminadorOpt8fibras = (numeroPavimentos - 1) * qntdFibras / 8 * backboneAndar;

        contador = qntdFibras * (numeroPavimentos - 1);
        contador -= 24;

        while(contador > 0) {

            quantidadeDio++;
            contador -= 24;
        }

        if (especificacao == 'multimodo') {
            qntdAcopladorOptMM = ((qntdFibras * (numeroPavimentos - 1)) / 2 + qntdFibrasPredio / 2) * qntdPredios * backboneAndar;
            qntdCordaoOptMM = ((qntdFibras * (numeroPavimentos - 1)) / 2 + qntdFibrasPredio) * qntdPredios * backboneAndar;
            qntdPigTailMMSimples = ((qntdFibras * (numeroPavimentos - 1)) + qntdFibrasPredio) * qntdPredios * backboneAndar;
            qntdPigTailMMDuplo = (qntdFibras * (numeroPavimentos - 1)) / 2 * qntdPredios * backboneAndar;
        }
        else if (especificacao == 'monomodo') {
            qntdAcopladorOptSM = ((qntdFibras * (numeroPavimentos - 1)) / 2 + qntdFibrasPredio / 2) * qntdPredios * backboneAndar;
            qntdCordaoOptSM = ((qntdFibras * (numeroPavimentos - 1)) / 2 + qntdFibrasPredio) * qntdPredios * backboneAndar;
            qntdPigTailSMSimples = ((qntdFibras * (numeroPavimentos - 1)) + qntdFibrasPredio) * qntdPredios * backboneAndar;
            qntdPigTailSMDuplo = (qntdFibras * (numeroPavimentos - 1)) / 2 * qntdPredios * backboneAndar;
        }

        fibraOpticaMetros = Math.ceil(fibraOpticaMetros);
        quantidadeDio = Math.ceil(quantidadeDio);
        bandejaEmenda = Math.ceil(bandejaEmenda);
        terminadorOpt8fibras = Math.ceil(terminadorOpt8fibras) * qntdPredios;

        qntdAcopladorOptSM = Math.ceil(qntdAcopladorOptSM);
        qntdAcopladorOptMM = Math.ceil(qntdAcopladorOptMM);

        qntdCordaoOptSM = Math.ceil(qntdCordaoOptSM);
        qntdCordaoOptMM = Math.ceil(qntdCordaoOptMM);

        qntdPigTailSMSimples = Math.ceil(qntdPigTailSMSimples);
        qntdPigTailSMDuplo = Math.ceil(qntdPigTailSMDuplo);
        qntdPigTailMMSimples = Math.ceil(qntdPigTailMMSimples);
        qntdPigTailMMDuplo = Math.ceil(qntdPigTailMMDuplo);
    }

    // Math.ceil() -> usar para números quebrados
    document.getElementById('Calculo').addEventListener('click', function () {
    
        // Dados calculados
        let dadosCalculados = [
            { 'Parâmetro': 'Fibra Óptica em Metros', 'Valor': fibraOpticaMetros },
            { 'Parâmetro': 'Bandeja de Emenda', 'Valor': bandejaEmenda },
            { 'Parâmetro': 'Terminador Óptico 8 Fibras', 'Valor': terminadorOpt8fibras },
            { 'Parâmetro': 'Acoplador Óptico SM', 'Valor': qntdAcopladorOptSM },
            { 'Parâmetro': 'Acoplador Óptico MM', 'Valor': qntdAcopladorOptMM },
            { 'Parâmetro': 'Cordão Óptico SM', 'Valor': qntdCordaoOptSM },
            { 'Parâmetro': 'Cordão Óptico MM', 'Valor': qntdCordaoOptMM },
            { 'Parâmetro': 'PigTail SM Simples', 'Valor': qntdPigTailSMSimples },
            { 'Parâmetro': 'PigTail SM Duplo', 'Valor': qntdPigTailSMDuplo },
            { 'Parâmetro': 'PigTail MM Simples', 'Valor': qntdPigTailMMSimples },
            { 'Parâmetro': 'PigTail MM Duplo', 'Valor': qntdPigTailMMDuplo }
        ];
    
        // Criar uma nova pasta de trabalho (workbook)
        let novaPlanilha = XLSX.utils.book_new();
    
        // Adicionar os dados calculados
        let sheetCalculados = XLSX.utils.json_to_sheet(dadosCalculados);
        XLSX.utils.book_append_sheet(novaPlanilha, sheetCalculados, 'Dados Calculados');
    
        // Exportar para arquivo Excel (.xlsx)
        XLSX.writeFile(novaPlanilha, 'Projeto_Estrutura_Fibra_Optica.xlsx');
    });
    
    console.log("fibraOpticaMetros:", fibraOpticaMetros);
    console.log("bandejaEmenda:", bandejaEmenda);
    console.log("terminadorOpt8fibras:", terminadorOpt8fibras);
    console.log("qntdAcopladorOptSM:", qntdAcopladorOptSM);
    console.log("qntdAcopladorOptMM:", qntdAcopladorOptMM);
    console.log("qntdCordaoOptMMInt:", qntdCordaoOptMM);
    console.log("qntdPigTailSMSimples:", qntdPigTailSMSimples);
    console.log("qntdPigTailSMDuplo:", qntdPigTailSMDuplo);
    console.log("qntdPigTailMMSimples:", qntdPigTailMMSimples);
    console.log("qntdPigTailMMDuplo:", qntdPigTailMMDuplo);
    // redireciona os valores pra outra pagina
       
    window.location.href = `resultado.html?numero_pavimentos=${numeroPavimentos}&pares_fibras=${qntdFibras}&comprimentoFibra=${comprimentoFibra}&medida_basica=${medidaBasica}
    &especificacao=${especificacao}&backbone_andar=${backboneAndar}&backbone_primario=${backbonePrimario}
    &backbone_secundario=${backboneSecundario}&fibraOpticaMetros=${fibraOpticaMetros}&quantidadeDio=${quantidadeDio}&bandejaEmenda=${bandejaEmenda}
    &terminadorOpt8fibras=${terminadorOpt8fibras}&qntdAcopladorOptSM=${qntdAcopladorOptSM}
    &qntdCordaoOptSM=${qntdCordaoOptSM}&qntdCordaoOptMM=${qntdCordaoOptMM}
    &qntdAcopladorOptMM=${qntdAcopladorOptMM}
    &qntdPigTailSMSimples=${qntdPigTailSMSimples}&qntdPigTailSMDuplo=${qntdPigTailSMDuplo}&qntdPigTailMMSimples=${qntdPigTailMMSimples}&qntdPigTailMMDuplo=${qntdPigTailMMDuplo}`;

    });
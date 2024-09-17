// bom dia duda
document.getElementById('Calculo').addEventListener('click', function () {
    // Pegando os valores do arquivo
    const numeroPavimentos = parseInt(document.getElementById('numero_pavimentos').value) || 0;
    const paresFibras = parseInt(document.getElementById('pares_fibras_disponiveis').value) || 0;
    const medidaBasica = parseFloat(document.getElementById('medida_basica').value) || 0;
    const caracteristica = document.getElementById('caracteristica').value;
    const backboneAndar = parseInt(document.getElementById('backbone_andar').value) || 0;
    const backbonePrimario = document.getElementById('backbone_primario').checked ? 'Sim' : 'Não';
    const backboneSecundario = document.getElementById('backbone_secundario').checked ? 'Sim' : 'Não';
    const comboBox = document.getElementById("especificacao");
    const especificacao = comboBox.options[comboBox.selectedIndex].text;
    const comboBox2 = document.getElementById('tipoFibraPredio');
    const tipoFibraPredio = comboBox2.options[comboBox2.selectedIndex].text;
    const qntdFibrasPredio = parseInt(document.getElementById('numeroFibras').value) || 0;
    console.log(1);

    // Faz os calculos ai em baixo

    let fibraOpticaMetros = 0;

    let aux;

    // Todo projeto começara com 2 dios, um externo, que recebe o cabo de fora e o interno que liga os andares. 
    let quantidadeDio = 2;

    // PigTail's que ficarão no dio externo
    let qntdPigTailSMSimplesExt = 0;
    let qntdPigTailMMSimplesExt = 0;

    // PigTail's que ficarão no dio interno
    let qntdPigTailSMDuplo = 0;
    let qntdPigTailMMDuplo = 0;
    let qntdPigTailSMSimples = 0;
    let qntdPigTailMMSimples = 0;

    // iteração do while
    let continuar = true;

    let qntdAcopladorOptMM = 0;
    let qntdAcopladorOptSM = 0;

    // multipliquei por 2 porque um par de fibras são 2 fibras
    let qntdFibras = paresFibras * 2;

    let bandejaEmenda = 0;

    // Cordão óptico do dio(s) externo(s)
    let qntdCordaoOptSMInt = 0;
    let qntdCordaoOptMMInt = 0;

    // Cordão óptico do dio(s) externo(s)
    let qntdCordaoOpticoSMExt = 0;
    let qntdCordaoOpticoMMExt = 0;

    let terminadorOpt8fibras;

    if (backbonePrimario == 'Não' && backboneSecundario == 'Não') {
        console.log(1);
        // Conectores do Switch
        let sfpMM;
        let sfpSM;

        // 1 switch de sobra caso o número de ligações ultrapasse o número de portas do switch principal
        let nmrSwitchs = numeroPavimentos + 1;

        for (let i = 1; i < numeroPavimentos; i++) {
            console.log(i);
            aux = (i + 1) * medidaBasica + medidaBasica;
            fibraOpticaMetros += aux;
        }

        fibraOpticaMetros = fibraOpticaMetros * 1.2;

        if (especificacao == 'multimodo') {
            console.log(1);
            sfpMM = qntdFibras * (numeroPavimentos - 1) * 2;
            qntdAcopladorOptMM = sfpMM;
        }
        else if (especificacao == 'monomodo') {
            console.log(2);
            sfpSM = qntdFibras * (numeroPavimentos - 1) * 2;
            qntdAcopladorOptSM = sfpSM;
        }
        if (tipoFibraPredio == 'multimodo') {
            console.log(3);
            sfpMM = qntdFibrasPredio;
            qntdAcopladorOptMM = sfpMM;
        } else {
            console.log(4);
            sfpSM = qntdFibrasPredio;
            qntdAcopladorOptSM = sfpSM;
        }

    } else if (backbonePrimario == 'Sim' && backboneSecundario == 'Não') {
        console.log(5);
        // O i varia de 16 em 16 porque irei considerar um dio de 24 portas em que deixarei 8 livres para ligações com outros dios
        // Por exemplo, o dio interno precisa estar ligado ao externo -> se chega 4 fibras no externo, precisa de 2 portas para ligar os dios com cordão optico duplo
        for (let i = 16; continuar; i += 16) {
            console.log(i);
            if (qntdFibras * (numeroPavimentos - 1) <= i) {
                console.log(6);
                continuar = false;
                break;
            }
            quantidadeDio++;

        }

        for (let i = 1; i < numeroPavimentos; i++) {
            console.log(i);
            aux = (i + 1) * medidaBasica + medidaBasica;
            fibraOpticaMetros += aux;
        }

        fibraOpticaMetros = fibraOpticaMetros * 1.2;

        if (especificacao == 'multimodo') {
            console.log(7);
            qntdAcopladorOptMM = (qntdFibras * (numeroPavimentos - 1)) / 2;
            qntdCordaoOptMMInt = (qntdFibras * (numeroPavimentos - 1)) / 2 + qntdFibrasPredio / 2;
            qntdPigTailMMSimples = qntdFibras * (numeroPavimentos - 1);
            qntdPigTailMMDuplo = qntdFibras * (numeroPavimentos - 1) / 2;
        }

        else if (especificacao == 'monomodo') {
            console.log(8);
            qntdAcopladorOptSM = (qntdFibras * (numeroPavimentos - 1)) / 2;
            qntdCordaoOptSMInt = (qntdFibras * (numeroPavimentos - 1)) / 2 + qntdFibrasPredio / 2;
            qntdPigTailSMSimples = qntdFibras * (numeroPavimentos - 1);
            qntdPigTailSMDuplo = qntdFibras * (numeroPavimentos - 1) / 2;
        }
        if (tipoFibraPredio == 'multimodo') {
            console.log(9);
            qntdAcopladorOptMM += qntdFibrasPredio / 2;
            qntdPigTailMMSimplesExt = qntdFibrasPredio;
            qntdCordaoOpticoMMExt = qntdFibrasPredio / 2;

        } else {
            console.log(10);
            qntdAcopladorOptSM += qntdFibrasPredio / 2;
            qntdPigTailSMSimplesExt = qntdFibrasPredio;
            qntdCordaoOpticoSMExt = qntdFibrasPredio / 2;
        }

        console.log(11);
        bandejaEmenda += (qntdFibrasPredio + qntdFibras * (numeroPavimentos - 1));
        bandejaEmenda /= 12;
        bandejaEmenda = Math.ceil(bandejaEmenda);
        terminadorOpt8fibras = qntdFibras * (numeroPavimentos - 1) / 8;
        terminadorOpt8fibras = Math.ceil(terminadorOpt8fibras);
        qntdAcopladorOptSM = Math.ceil(qntdAcopladorOptSM);
        qntdCordaoOpticoSMExt = Math.ceil(qntdCordaoOpticoSMExt);
        qntdAcopladorOptMM = Math.ceil(qntdAcopladorOptMM);
        fibraOpticaMetros = Math.ceil(fibraOpticaMetros);
        qntdCordaoOptSMInt = Math.ceil(qntdCordaoOptSMInt);
        qntdPigTailSMSimples = Math.ceil(qntdPigTailSMSimples);
        qntdPigTailSMDuplo = Math.ceil(qntdPigTailSMDuplo);
        qntdCordaoOptMMInt = Math.ceil(qntdCordaoOptMMInt);
        qntdPigTailMMSimples = Math.ceil(qntdPigTailMMSimples);
        qntdPigTailMMDuplo = Math.ceil(qntdPigTailMMDuplo);

    } else if (backbonePrimario == 'Sim' && backboneSecundario == 'Sim') {

        let backbonesTotal = backboneAndar * (numeroPavimentos - 1);
        let qntdFibrasTot = qntdFibras * backbonesTotal;
        quantidadeDio += backbonesTotal * 2;

        // O i varia de 16 em 16 porque irei considerar um dio de 24 portas em que deixarei 8 livres para ligações com outros dios
        // Por exemplo, o dio interno precisa estar ligado ao externo -> se chega 4 fibras no externo, precisa de 2 portas para ligar os dios com cordão optico duplo
        for (let i = 16; continuar; i += 16) {

            if (qntdFibras * (backboneAndar / 2) <= i)
                continuar = false;

            quantidadeDio++;
        }

        for (let i = 1; i < numeroPavimentos; i++) {

            aux = ((i + 1) * medidaBasica + medidaBasica) * backboneAndar;
            fibraOpticaMetros += aux;
        }

        fibraOpticaMetros = fibraOpticaMetros * 1.2;

        if (especificacao == 'multimodo') {
            qntdAcopladorOptMM = qntdFibrasTot / 2 + (qntdFibras / 2 * backbonesTotal);
            qntdCordaoOptMMInt = qntdFibrasTot / 2 + qntdFibrasPredio / 2 + (qntdFibras / 2 * backbonesTotal) + qntdFibras / 2;
            qntdPigTailMMSimples = qntdFibrasTot;
            qntdPigTailMMDuplo = qntdFibrasTot / 2;
        }
        else if (especificacao == 'monomodo') {
            qntdAcopladorOptSM = qntdFibrasTot / 2 + (qntdFibras / 2 * backbonesTotal);
            qntdCordaoOptSMInt = qntdFibrasTot / 2 + qntdFibrasPredio / 2 + (qntdFibras / 2 * backbonesTotal) + qntdFibras / 2;
            qntdPigTailSMSimples = qntdFibrasTot;
            qntdPigTailSMDuplo = qntdFibrasTot / 2;
        }
        if (tipoFibraPredio == 'multimodo') {
            qntdAcopladorOptMM += qntdFibrasPredio / 2;
            qntdPigTailMMSimplesExt = qntdFibrasPredio;
            qntdCordaoOpticoMMExt = qntdFibrasPredio / 2;
        } else {
            qntdAcopladorOptSM += qntdFibrasPredio / 2;
            qntdPigTailSMSimplesExt = qntdFibrasPredio;
            qntdCordaoOpticoSMExt = qntdFibrasPredio / 2;
        }

        bandejaEmenda += (qntdFibrasPredio + qntdFibrasTot);
        bandejaEmenda /= 12;
        bandejaEmenda = Math.ceil(bandejaEmenda);
        terminadorOpt8fibras = qntdFibras * (numeroPavimentos - 1) / 8;
        terminadorOpt8fibras = Math.ceil(terminadorOpt8fibras);
        qntdAcopladorOptSM = Math.ceil(qntdAcopladorOptSM);
        qntdCordaoOpticoSMExt = Math.ceil(qntdCordaoOpticoSMExt);
        qntdAcopladorOptMM = Math.ceil(qntdAcopladorOptMM);
        fibraOpticaMetros = Math.ceil(fibraOpticaMetros);
        qntdCordaoOptSMInt = Math.ceil(qntdCordaoOptSMInt);
        qntdPigTailSMSimples = Math.ceil(qntdPigTailSMSimples);
        qntdPigTailSMDuplo = Math.ceil(qntdPigTailSMDuplo);
        qntdCordaoOptMMInt = Math.ceil(qntdCordaoOptMMInt);
        qntdPigTailMMSimples = Math.ceil(qntdPigTailMMSimples);
        qntdPigTailMMDuplo = Math.ceil(qntdPigTailMMDuplo);
    }

    // Math.ceil() -> usar para números quebrados
    document.getElementById('ExportarExcel').addEventListener('click', function () {
        // Dados de entrada
        let dadosEntrada = [
            { 'Parâmetro': 'Número de Pavimentos', 'Valor': numeroPavimentos },
            { 'Parâmetro': 'Pares de Fibras Disponíveis', 'Valor': paresFibras },
            { 'Parâmetro': 'Medida Básica', 'Valor': medidaBasica },
            { 'Parâmetro': 'Característica', 'Valor': caracteristica },
            { 'Parâmetro': 'Backbone por Andar', 'Valor': backboneAndar },
            { 'Parâmetro': 'Backbone Primário', 'Valor': backbonePrimario },
            { 'Parâmetro': 'Backbone Secundário', 'Valor': backboneSecundario },
            { 'Parâmetro': 'Especificação', 'Valor': especificacao },
            { 'Parâmetro': 'Tipo de Fibra no Prédio', 'Valor': tipoFibraPredio }
        ];
    
        // Dados calculados
        let dadosCalculados = [
            { 'Parâmetro': 'Bandeja de Emenda', 'Valor': bandejaEmenda },
            { 'Parâmetro': 'Terminador Óptico 8 Fibras', 'Valor': terminadorOpt8fibras },
            { 'Parâmetro': 'Acoplador Óptico SM', 'Valor': qntdAcopladorOptSM },
            { 'Parâmetro': 'Cordão Óptico SM Externo', 'Valor': qntdCordaoOpticoSMExt },
            { 'Parâmetro': 'Acoplador Óptico MM', 'Valor': qntdAcopladorOptMM },
            { 'Parâmetro': 'Fibra Óptica em Metros', 'Valor': fibraOpticaMetros },
            { 'Parâmetro': 'Cordão Óptico SM Interno', 'Valor': qntdCordaoOptSMInt },
            { 'Parâmetro': 'PigTail SM Simples', 'Valor': qntdPigTailSMSimples },
            { 'Parâmetro': 'PigTail SM Duplo', 'Valor': qntdPigTailSMDuplo },
            { 'Parâmetro': 'Cordão Óptico MM Interno', 'Valor': qntdCordaoOptMMInt },
            { 'Parâmetro': 'PigTail MM Simples', 'Valor': qntdPigTailMMSimples },
            { 'Parâmetro': 'PigTail MM Duplo', 'Valor': qntdPigTailMMDuplo }
        ];
    
        // Criar uma nova pasta de trabalho (workbook)
        let novaPlanilha = XLSX.utils.book_new();
    
        // Adicionar os dados de entrada
        let sheetEntrada = XLSX.utils.json_to_sheet(dadosEntrada);
        XLSX.utils.book_append_sheet(novaPlanilha, sheetEntrada, 'Dados de Entrada');
    
        // Adicionar os dados calculados
        let sheetCalculados = XLSX.utils.json_to_sheet(dadosCalculados);
        XLSX.utils.book_append_sheet(novaPlanilha, sheetCalculados, 'Dados Calculados');
    
        // Exportar para arquivo Excel (.xlsx)
        XLSX.writeFile(novaPlanilha, 'Projeto_Estrutura_Fibra_Optica.xlsx');
    });
    console.log("TipoFibraPredio", tipoFibraPredio);
    console.log("fibraOpticaMetros:", fibraOpticaMetros);
    console.log("bandejaEmenda:", bandejaEmenda);
    console.log("terminadorOpt8fibras:", terminadorOpt8fibras);
    console.log("qntdAcopladorOptSM:", qntdAcopladorOptSM);
    console.log("qntdCordaoOpticoSMExt:", qntdCordaoOpticoSMExt);
    console.log("qntdAcopladorOptMM:", qntdAcopladorOptMM);
    console.log("qntdCordaoOptMMInt:", qntdCordaoOptMMInt);
    console.log("qntdPigTailSMSimples:", qntdPigTailSMSimples);
    console.log("qntdPigTailSMDuplo:", qntdPigTailSMDuplo);
    console.log("qntdPigTailMMSimples:", qntdPigTailMMSimples);
    console.log("qntdPigTailMMDuplo:", qntdPigTailMMDuplo);
    // redireciona os valores pra outra pagina
       
    window.location.href = `resultado.html?numero_pavimentos=${numeroPavimentos}&pares_fibras=${paresFibras}&medida_basica=${medidaBasica}
    &especificacao=${especificacao}&caracteristica=${caracteristica}&backbone_andar=${backboneAndar}&backbone_primario=${backbonePrimario}
    &backbone_secundario=${backboneSecundario}&fibraOpticaMetros=${fibraOpticaMetros}&bandejaEmenda=${bandejaEmenda}&terminadorOpt8fibras=${terminadorOpt8fibras}
    &qntdAcopladorOptSM=${qntdAcopladorOptSM}&qntdCordaoOpticoSMExt=${qntdCordaoOpticoSMExt}&qntdAcopladorOptMM=${qntdAcopladorOptMM}&qntdCordaoOptMMInt=${qntdCordaoOptMMInt}
    &qntdPigTailSMSimples=${qntdPigTailSMSimples}&qntdPigTailSMDuplo=${qntdPigTailSMDuplo}&qntdPigTailMMSimples=${qntdPigTailMMSimples}&qntdPigTailMMDuplo=${qntdPigTailMMDuplo}`;

    });
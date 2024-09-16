// bom dia duda
document.getElementById('Calculo').addEventListener('click', function () {
    // Pegando os valores do arquivo
    const numeroPavimentos = document.getElementById('numero_pavimentos').value;
    const paresFibras = document.getElementById('pares_fibras_disponiveis').value;
    const medidaBasica = document.getElementById('medida_basica').value;
    const caracteristica = document.getElementById('caracteristica').value;
    const backboneAndar = document.getElementById('backbone_andar').value;
    const backbonePrimario = document.getElementById('backbone_primario').checked ? 'Sim' : 'Não';
    const backboneSecundario = document.getElementById('backbone_secundario').checked ? 'Sim' : 'Não';
    const comboBox = document.getElementById('especificacao');
    const especificacao = comboBox.options[comboBox.selectedIndex].text;
    const comboBox2 = document.getElementById('tipoFibraPredio');
    const tipoFibraPredio = comboBox2.options[comboBox.selectedIndex].text;
    const qntdFibrasPredio = document.getElementById('numeroFibras');

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

        // Conectores do Switch
        let sfpMM;
        let sfpSM;

        // 1 switch de sobra caso o número de ligações ultrapasse o número de portas do switch principal
        let nmrSwitchs = numeroPavimentos + 1;

        for (let i = 1; i < numeroPavimentos; i++) {

            aux = (i + 1) * medidaBasica + medidaBasica;
            fibraOpticaMetros += aux;
        }

        fibraOpticaMetros = fibraOpticaMetros * 1.2;

        if (especificacao == 'multimodo') {
            sfpMM = qntdFibras * (numeroPavimentos - 1) * 2;
            qntdAcopladorOptMM = sfpMM;
        }
        else if (especificacao == 'monomodo') {
            sfpSM = qntdFibras * (numeroPavimentos - 1) * 2;
            qntdAcopladorOptSM = sfpSM;
        }
        if (tipoFibraPredio == 'multimodo') {
            sfpMM = qntdFibrasPredio;
            qntdAcopladorOptMM = sfpMM;
        } else {
            sfpSM = qntdFibrasPredio;
            qntdAcopladorOptSM = sfpSM;
        }

    } else if (backbonePrimario == 'Sim' && backboneSecundario == 'Não') {

        // O i varia de 16 em 16 porque irei considerar um dio de 24 portas em que deixarei 8 livres para ligações com outros dios
        // Por exemplo, o dio interno precisa estar ligado ao externo -> se chega 4 fibras no externo, precisa de 2 portas para ligar os dios com cordão optico duplo
        for (let i = 16; continuar; i += 16) {

            if (qntdFibras * (numeroPavimentos - 1) <= i) {
                continuar = false;
                break;
            }
            quantidadeDio++;

        }

        for (let i = 1; i < numeroPavimentos; i++) {

            aux = (i + 1) * medidaBasica + medidaBasica;
            fibraOpticaMetros += aux;
        }

        fibraOpticaMetros = fibraOpticaMetros * 1.2;

        if (especificacao == 'multimodo') {
            qntdAcopladorOptMM = (qntdFibras * (numeroPavimentos - 1)) / 2;
            qntdCordaoOptMMInt = (qntdFibras * (numeroPavimentos - 1)) / 2 + qntdFibrasPredio / 2;
            qntdPigTailMMSimples = qntdFibras * (numeroPavimentos - 1);
            qntdPigTailMMDuplo = qntdFibras * (numeroPavimentos - 1) / 2;
        }

        else if (especificacao == 'monomodo') {
            qntdAcopladorOptSM == (qntdFibras * (numeroPavimentos - 1)) / 2;
            qntdCordaoOptSMInt = (qntdFibras * (numeroPavimentos - 1)) / 2 + qntdFibrasPredio / 2;
            qntdPigTailSMSimples = qntdFibras * (numeroPavimentos - 1);
            qntdPigTailSMDuplo = qntdFibras * (numeroPavimentos - 1) / 2;
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


        bandejaEmenda += (qntdFibrasPredio + qntdFibras * (numeroPavimentos - 1));
        bandejaEmenda /= 12;
        bandejaEmenda = Math.ceil(bandejaEmenda);
        terminadorOpt8fibras = qntdFibras * (numeroPavimentos - 1) / 8;
        terminadorOpt8fibras = Math.ceil(terminadorOpt8fibras);
        qntdAcopladorOptSM = Math.ceil(qntdAcopladorOptSM);
        qntdCordaoOpticoSMExt = Math.ceil(qntdCordaoOpticoSMExt);
        qntdAcopladorOptMM = Math.ceil(qntdAcopladorOptMM);
        qntdAcopladorOptMM = Math.ceil(qntdAcopladorOptMM);
        fibraOpticaMetros = Math.ceil(fibraOpticaMetros);
        qntdAcopladorOptSM == Math.ceil(qntdAcopladorOptSM);
        qntdCordaoOptSMInt = Math.ceil(qntdCordaoOptSMInt);
        qntdPigTailSMSimples = Math.ceil(qntdPigTailSMSimples);
        qntdPigTailSMDuplo = Math.ceil(qntdPigTailSMDuplo);
        qntdAcopladorOptMM == Math.ceil(qntdAcopladorOptMM);
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
        qntdAcopladorOptMM = Math.ceil(qntdAcopladorOptMM);
        fibraOpticaMetros = Math.ceil(fibraOpticaMetros);
        qntdAcopladorOptSM == Math.ceil(qntdAcopladorOptSM);
        qntdCordaoOptSMInt = Math.ceil(qntdCordaoOptSMInt);
        qntdPigTailSMSimples = Math.ceil(qntdPigTailSMSimples);
        qntdPigTailSMDuplo = Math.ceil(qntdPigTailSMDuplo);
        qntdAcopladorOptMM == Math.ceil(qntdAcopladorOptMM);
        qntdCordaoOptMMInt = Math.ceil(qntdCordaoOptMMInt);
        qntdPigTailMMSimples = Math.ceil(qntdPigTailMMSimples);
        qntdPigTailMMDuplo = Math.ceil(qntdPigTailMMDuplo);
    }

    // Math.ceil() -> usar para números quebrados

    function exportarParaExcel() {
        // Seleciona a tabela HTML
        let tabela = document.getElementById('tabelaDados');
        let planilha = XLSX.utils.table_to_sheet(tabela);

        // Cria uma nova pasta de trabalho (workbook)
        let novaPlanilha = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(novaPlanilha, planilha, 'Resultados');

        // Exporta para arquivo Excel (.xlsx)
        XLSX.writeFile(novaPlanilha, 'Planilha_Resultado.xlsx');
    }

    // redireciona os valores pra outra pagina
    window.location.href = `resultado.html?numero_pavimentos=${numeroPavimentos}&pares_fibras=${paresFibras}&medida_basica=${medidaBasica}&especificacao=${especificacao}&caracteristica=${caracteristica}&backbone_andar=${backboneAndar}&backbone_primario=${backbonePrimario}&backbone_secundario=${backboneSecundario}`;
});
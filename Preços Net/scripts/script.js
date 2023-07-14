// Criar tabela nova

var confirmar = 1
var padraoHora
function levantamentoNew(){
    //Input
    var nome = document.getElementById('nameLanva') 
    const valorNome = nome.value
    // const confirmar = 1
    // console.log(valorNome + ' ' + confirmar )

    //Error: Nome não escrito.
    
    if (valorNome == '' || valorNome == undefined){
        var msgErroNameUndefined = document.getElementById('erro_nomeUndefined')
        msgErroNameUndefined.style.display = 'block'

        var notificationErro = document.getElementById('notificationErro')
        notificationErro.style.display = 'block'

        var limparConsoBnt = document.getElementById('limparConso')
        limparConsoBnt.style.marginLeft = '40px'

        console.error('Erro! Nome não digitado.')
    }else{
        newTabela()
    }

    //Escrever na tabela
        function newTabela() {
            var divTabelaGetElement = document.getElementById('tabela');
            
            //Valor(es) padrao(es)
                var SituaPayNoPay = "Não";
                var padraoHora = "--:--"
            
            var idUnica = Date.now();
            const idUnicaFinal = "nome-"+valorNome+"_ID-"+idUnica
            //console.log("Criado linha: " + idUnica)

            var dadosLinha = {
            nome: valorNome,
            statusPay: SituaPayNoPay,
            timePlano: padraoHora,
            comecoNet: padraoHora,
            vencimentoTimeMin: padraoHora,
            idUnicaEnd: idUnicaFinal,
            horaComprada: "--:--",
            dataComprada: "",
            statusTime: "",
            vendendor: "",
            start: "false",
            };
            localStorage.setItem(idUnicaFinal, JSON.stringify(dadosLinha));

            var conteudoTabela = `
                <table>
                    <tr id="${idUnicaFinal}" class="near">
                    <td class="none" id="nomeValorTd">${valorNome}</td>
                    <td id="stats">
                        <span id="stats_pay">
                        <span style="font-size: 10px;"> Pagamento: </span>
                        <span id="pay_NoPay">${SituaPayNoPay}</span>
                        </span>
                    </td>
                    <td id="plano">
                        <span style="font-size: 10px;">Plano: </span><span id="timePlano">${padraoHora}</span>
                    </td>
                    <td id="start"><span style="font-size: 10px;">Começo: </span><span id="comecoNet">${padraoHora}</span>
                    </td>
                    <td id="vencimento">
                        <span style="font-size: 10px;">Vencimento: </span><span id="vencimentoTimeMin">${padraoHora}</span>
                    </td>
                    <td id="buttonTabela">
                        <button style="margin-left: 0px; margin-right: 15px; margin-bottom: 2px;" onclick="openEditar(event)" id="editBntTableCntdTable">Editar</button> 
                        <button onclick="openExcluir(event)" id="ExluirBntTableCntdTable">Excluir</button>
                    </td>
                    </tr>
                </table>
                `;
            divTabelaGetElement.innerHTML += `${conteudoTabela}`;

            limparConso(newTabela)
            function limparConso(newTabela){
                const msgErroNameUndefined = document.getElementById('erro_nomeUndefined')
                msgErroNameUndefined.style.display = 'none'
            
                var notificationErro = document.getElementById('notificationErro')
                notificationErro.style.display = 'none'
            
                var limparConsoBnt = document.getElementById('limparConso')
                limparConsoBnt.style.marginLeft = '1px'
            }
        }

    //Reescrever Input

    nome.value = ''

}
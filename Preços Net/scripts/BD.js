var divTabelaGetElement = document.getElementById('tabela');
var conteudoTabela = '';

for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  
  // Verificar se a chave começa com "N" minúscula
  if (key.startsWith("n")) {
    var localStorageData = JSON.parse(localStorage.getItem(key));

    var idUnica = key.split('_ID-')[1]; // Extrair o ID único da chave
    var idUnicaFinal = "nome-" + localStorageData.nome + "_ID-" + idUnica; // Gerar o valor de idUnicaFinal

    if (localStorageData.timePlano == undefined){
      localStorageData.timePlano = "--:--"
    }

    if (localStorageData.comecoNet == ""){
      localStorageData.comecoNet = "--:--"
    }

    if (localStorageData.vencimentoTimeMin == "NaN:NaN"){
      localStorageData.vencimentoTimeMin = "--:--"
    }

    // Substituir as variáveis no código HTML com os valores da LocalStorage
    var tabelaItem = `
      <tr id="${idUnicaFinal}" class="near">
        <td class="none" id="nomeValorTd">${localStorageData.nome}</td>
        <td id="stats">
          <span id="stats_pay">
            <span style="font-size: 10px;"> Pagamento: </span>
            <span id="pay_NoPay">${localStorageData.statusPay}</span>
          </span>
        </td>
        <td id="plano">
          <span style="font-size: 10px;">Plano: </span><span id="timePlano">${localStorageData.timePlano}</span>
        </td>
        <td id="start"><span style="font-size: 10px;">Começo: </span><span id="comecoNet">${localStorageData.comecoNet}</span>
        </td>
        <td id="vencimento">
          <span style="font-size: 10px;">Vencimento: </span><span id="vencimentoTimeMin">${localStorageData.vencimentoTimeMin}</span>
        </td>
        <td id="buttonTabela">
          <button style="margin-left: 0px; margin-right: 15px; margin-bottom: 2px;" onclick="openEditar(event)" id="editBntTableCntdTable">Editar</button> 
          <button onclick="openExcluir(event)" id="ExluirBntTableCntdTable">Excluir</button>
        </td>
      </tr>
    `;

    conteudoTabela += tabelaItem;
  }
}

// Adicionar o conteúdo à tabela
divTabelaGetElement.innerHTML = `
  <table>${conteudoTabela}</table>
`;

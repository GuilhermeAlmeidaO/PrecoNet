//Escrever na Preview table

var divTabelaGetElement = document.getElementById('preview_conteudo');
var conteudoTabela = '';

for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  
  // Verificar se a chave começa com "N" minúscula
  if (key.startsWith("n")) {
    var localStorageData = JSON.parse(localStorage.getItem(key));

    var idUnica = key.split('_ID-')[1]; // Extrair o ID único da chave
    var idUnicaFinal = "nome-" + localStorageData.nome + "_ID-" + idUnica; // Gerar o valor de idUnicaFinal

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
      </tr>
    `;

    conteudoTabela += tabelaItem;
  }
}

// Adicionar o conteúdo à tabela
divTabelaGetElement.innerHTML = `
  <table>${conteudoTabela}</table>
`;



//Importar e exportar

function importExportDev() {
  var request = prompt("Escolha se você quer importar ou exportar:\nImportar: 1\nExportar: 2");

  if (request === "2") { // Exportar
    var confirmExport = window.confirm("Confirme para exportar o LocalStorage inteiro.");

    if (confirmExport) {
      var localStorageContent = JSON.stringify(localStorage);
      //document.getElementsByName("body")[0].innerHTML = '<output id="outputTempExport" style="display: none">abc<output>'
      
      function copiarValor(variavel) {
        
        var inputTemporario = document.createElement('input');
        inputTemporario.value = variavel;
        document.body.appendChild(inputTemporario);
        inputTemporario.select();
        document.execCommand('copy');// Remove
        document.body.removeChild(inputTemporario);
      
        //console.log('Valor copiado: ' + variavel);
      }

      copiarValor(localStorageContent);
    }
  }

  if (request === "1") { // Importar

    function reescreverLocalStorageComInput() {
      var inputContent = prompt("Digite o código do LocalStorage:");
    
      if (inputContent) {
        try {
          var parsedContent = JSON.parse(inputContent);
    
          // Salva o valor atual do item "LoginNoPass"
          var loginNoPassValue = localStorage.getItem("LoginNoPass");
    
          // Limpa o LocalStorage atual
          localStorage.clear();
    
          // Reescreve o LocalStorage com base no conteúdo fornecido,
          // exceto o item "LoginNoPass"
          for (var key in parsedContent) {
            if (parsedContent.hasOwnProperty(key) && key !== "LoginNoPass") {
              localStorage.setItem(key, parsedContent[key]);
            }
          }
    
          // Restaura o valor do item "LoginNoPass" no LocalStorage
          if (loginNoPassValue) {
            localStorage.setItem("LoginNoPass", loginNoPassValue);
          }
    
          console.log('LocalStorage reescrito com sucesso (exceto "LoginNoPass").');
        } catch (error) {
          console.error('Erro ao reescrever o LocalStorage:', error);
        }
      }
    }
    
    reescreverLocalStorageComInput();

    location.reload()
    
  }
}

//Escrevar localstorage na div

function exibirLocalStorage() {
  var previewDiv = document.getElementById("previewLocalStorage");
  previewDiv.innerHTML = ""; // Limpa o conteúdo atual da div

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);

    var keyValueString = `<span style="font-weight: 900; background-color: red; color: #ddd; margin-left: 4px; margin-bottom: 5px; height: 15px; border-radius: 5px; padding: 1px;">${i}:</span> ${key}: ${value}`;
    var keyValueElement = document.createElement("p");
    keyValueElement.innerHTML = keyValueString;
    keyValueElement.style.borderBottom = "1px solid black";

    previewDiv.appendChild(keyValueElement);
  }
}

exibirLocalStorage();


//Div edit LocalStorage

var buttonEditLS = document.getElementById("editLocalStorage")

buttonEditLS.addEventListener("click", function(){

  //Mostrar preSet
  document.getElementById("preSetEditLS").style.display = "block"
  })

document.getElementById("advencedPreset").addEventListener("click", function(){
  //Mostrar tabela
  var divEdit = document.getElementById("divEditLocalStorage")
  divEdit.style.display = "block"

  //Mostrar Base da Tabela
  var baseDivEdit = document.getElementById("baseEditLS")
  baseDivEdit.style.display = "block"

  divEdit.innerHTML = ""; // Limpa o conteúdo atual da div

  for (var i = 0; i < localStorage.length; i++) {

    var localStorageContent = JSON.stringify(localStorage)
    divEdit.innerHTML = localStorageContent
  }

  var bntSaveEditLS = document.getElementById("saveEditLS")

  bntSaveEditLS.addEventListener("click", function(){
    //var divEdit = document.getElementById("divEditLocalStorage").textContent
    
    var localStorageContent = JSON.stringify(localStorage)

    var inputContent = document.getElementById("divEditLocalStorage").textContent;

    try {
        // Verifica se o conteúdo do input é diferente do conteúdo atual do LocalStorage
        if (inputContent !== JSON.stringify(localStorage)) {
        localStorage.clear(); // Limpa o LocalStorage atual
        var parsedContent = JSON.parse(inputContent);

        // Reescreve o LocalStorage com base no conteúdo fornecido
        for (var key in parsedContent) {
            if (parsedContent.hasOwnProperty(key)) {
            localStorage.setItem(key, parsedContent[key]);
            }
        }

        console.log('LocalStorage reescrito com sucesso.');
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }

    //Esconder tabela
    var divEdit = document.getElementById("divEditLocalStorage")
    divEdit.style.display = "none"

    //Esconder Base da Tabela
    var baseDivEdit = document.getElementById("baseEditLS")
    baseDivEdit.style.display = "none"

})

  var closeEditLSBnt = document.getElementById("closeEditLS")

closeEditLSBnt.addEventListener("click", function(){
   //Esconder tabela
   var divEdit = document.getElementById("divEditLocalStorage")
   divEdit.style.display = "none"

  //Esconder Base da Tabela
   var baseDivEdit = document.getElementById("baseEditLS")
   baseDivEdit.style.display = "none"
  })
})

//Pega o LS pelo o número do input:number
var outputGetIdLS_presetEditLS_validation = null
document.getElementById("editLS_presetEditLS").addEventListener("click", function() {
  document.getElementById("getItemDiv").style.display = "none"
  document.getElementById("removeItemDiv").style.display = "none"
  document.getElementById("setItemDiv").style.display = "none";

  var index = parseInt(document.getElementById("inputNumberLS_PresetEditLS").value);
  var keys = Object.keys(localStorage);
  
  if (index >= 0 && index < keys.length) {
    var selectedKey = keys[index];

    document.getElementById("outputGetIdLS_presetEditLS").innerHTML = `${selectedKey}`;
    document.getElementById("consoleErrorsPreSet").style.display = "none";
    document.getElementById("inputNumberLS_PresetEditLS").value = 0;
    outputGetIdLS_presetEditLS_validation = true
    //console.log(selectedKey);
  } else {
    document.getElementById("consoleErrorsPreSet").innerHTML = `<span style="color: red;">Este LocalStorage não existe</span>`
    document.getElementById("consoleErrorsPreSet").style.display = "inline"
    document.getElementById("outputGetIdLS_presetEditLS").innerHTML = ``;
    document.getElementById("inputNumberLS_PresetEditLS").value = 0;

    //console.log("Índice inválido");
  }
});

//Fechar Preset

document.getElementById("closePreset").addEventListener("click", function(){
  document.getElementById("preSetEditLS").style.display = "none"
})

//Abrir getItem

document.getElementById("getItemLS_presetEditLS").addEventListener("click", function(){
  if (outputGetIdLS_presetEditLS_validation == null){
    document.getElementById("consoleErrorsPreSet").style.display = "inline"
    document.getElementById("consoleErrorsPreSet").innerHTML = `<span style="color: red;">Você não selecionou nenhum LocalStorage</span>`
    document.getElementById("removeItemDiv").style.display = "none"
  }else{
    openDivGetitem();
  }

  function openDivGetitem(){
    document.getElementById("getItemDiv").style.display = "block";
    let chaveLS = document.getElementById("outputGetIdLS_presetEditLS").value;
    let LS = localStorage.getItem(chaveLS);
    document.getElementById("content_getItemDiv").innerHTML = LS;
    document.getElementById("removeItemDiv").style.display = "none"
    document.getElementById("setItemDiv").style.display = "none";
}

  //console.log(document.getElementById("outputGetIdLS_presetEditLS").textContent)
});

//Salvar getItem

document.getElementById("Save_getItemDiv").addEventListener("click", function(){
  //Pegar referencias
  let chaveLS = document.getElementById("outputGetIdLS_presetEditLS").value;
  let newContent = document.getElementById("content_getItemDiv").textContent;

  //Reescrever o LocalStorage para null
  localStorage.setItem(chaveLS, null)

  //Escrever o localstorage para o content da div
  localStorage.setItem(chaveLS, newContent)

  //Recarregar a página
  location.reload()
  //console.log(`localstorage.setItem(${chaveLS}, "${newContent}")`)
})

//Fechar a getItemDiv
document.getElementById("Close_getItemDiv").addEventListener("click", function(){
  document.getElementById("getItemDiv").style.display = "none"
})

//Abrir removeItem

document.getElementById("removeItemLS_presetEditLS").addEventListener("click", function(){

  if (outputGetIdLS_presetEditLS_validation == null){
    document.getElementById("consoleErrorsPreSet").style.display = "inline"
    document.getElementById("consoleErrorsPreSet").innerHTML = `<span style="color: red;">Você não selecionou nenhum LocalStorage</span>`
    document.getElementById("getItemDiv").style.display = "none"
    document.getElementById("setItemDiv").style.display = "none"
  }else{
    openDivRemoveItem();
  }

  function openDivRemoveItem(){
    document.getElementById("removeItemDiv").style.display = "block";

    let chaveLS = document.getElementById("outputGetIdLS_presetEditLS").value;

    let LS = localStorage.getItem(chaveLS);

    let fieldChaveSpan = document.querySelector("#fieldChave_removeItemDiv");
    let fieldValorSpan = document.querySelector("#fieldValor_removeItemDiv");

    fieldChaveSpan.innerHTML = chaveLS;
    fieldValorSpan.innerHTML = JSON.stringify(LS);

    
    document.getElementById("getItemDiv").style.display = "none"
    document.getElementById("setItemDiv").style.display = "none"
  }
});



//Fechar removeItem

document.getElementById("Cancel_removeItemDiv").addEventListener("click", function(){
  document.getElementById("removeItemDiv").style.display = "none"
})

//Remover localStorage

document.getElementById("removeItem_removeItemDiv").addEventListener("click", function(){
  var questionDelorNoDel = prompt(`Você tem certeza que quer excluir este LocalStorage? \n(s)Sim \n(n)Não`)
  if (questionDelorNoDel == "s" || questionDelorNoDel == "ss" || questionDelorNoDel == "S" || questionDelorNoDel == "SS"){
    let chaveLS = document.getElementById("outputGetIdLS_presetEditLS").value;
    localStorage.removeItem(chaveLS)
    location.reload()
  }else{
    alert("Ação cancelada.")
  }
})

//Abrir setItem

document.getElementById("SetItemLS_presetEditLS").addEventListener("click", function(){

  if (outputGetIdLS_presetEditLS_validation == null){
    openDivRemoveItem();
    document.getElementById("consoleErrorsPreSet").innerHTML = `<span style="color: red;"></span>`
    document.getElementById("consoleErrorsPreSet").style.display = "none"
    document.getElementById("getItemDiv").style.display = "none"
    document.getElementById("removeItemDiv").style.display = "none"
  }else{
    openDivRemoveItem();
  }

  function openDivRemoveItem(){
    document.getElementById("setItemDiv").style.display = "block";
    document.getElementById("getItemDiv").style.display = "none"
    document.getElementById("removeItemDiv").style.display = "none"
  }
})

//Fechar setItem

document.getElementById("Cancel_setItemDiv").addEventListener("click", function(){
  document.getElementById("setItemDiv").style.display = "none"
})

//Setar LocalStorage setItemDiv

document.getElementById("setItem_setItemDiv").addEventListener("click", function(){
  
  let chaveInput = document.getElementById("fieldChave_setItemDiv").value
  let valorInput = document.getElementById("fieldValor_setItemDiv").value
  var valorInputFormt = `{${valorInput}}`

if (chaveInput == "" && valorInput == ""){
  document.getElementById("consoleErrorsPreSet").style.display = "inline"
  document.getElementById("consoleErrorsPreSet").innerHTML = `<span style="color: red;">Preencha todos os campos</span>`
}else{
  funcionarSetItem()
}

  function funcionarSetItem(){
    localStorage.setItem(chaveInput, valorInputFormt)
    document.getElementById("setItemDiv").style.display = "none";
    document.getElementById("consoleErrorsPreSet").innerHTML = `<span style="color: red;"></span>`
    document.getElementById("consoleErrorsPreSet").style.display = "none"
    location.reload()
  }
})

//escrever console na div
var consoleDiv = document.getElementById("content_contentConsole");

(function() {
  var consoleDiv = document.getElementById("content_contentConsole");

  // Salvar a referência do método original do console.log
  var originalConsoleLog = console.log;

  // Sobrescrever o método console.log
  console.log = function(message) {
    // Adicionar a mensagem na div
    consoleDiv.innerHTML += message + "<br>";

    // Chamar o método original do console.log
    originalConsoleLog.apply(console, arguments);
  };
})();
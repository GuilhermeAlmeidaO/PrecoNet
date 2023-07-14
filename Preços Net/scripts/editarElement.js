//Fechar Editar Div


var outputPlanoVery;
function ExitEdit(){
    document.getElementById("editarElementFun").style.display = 'none'
    document.getElementById("baseEditElement").style.display = 'none'

    function removeElementByClass(className) {
      var elements = document.getElementsByClassName(className);
      if (elements.length > 0) {
        var element = elements[0]; // Acessa o primeiro elemento encontrado com a classe
        element.parentNode.removeChild(element);
        //console.log("Elemento removido com sucesso.");
      } else {
        //console.error("Elemento não encontrado com a classe:", className);
      }
    }

    if (outputPlanoVery){
    //Colocar o margin bottom -12px
    document.getElementById("outputPlano").style.display = "none"
    let divPlanos = document.getElementById("planoCompradaDivId")
    divPlanos.style.marginBottom = "-12px"

    outputPlanoVery = false
    }
    
    // Exemplo de uso:
    removeElementByClass("idElementDivEdit"); //Copiar essa function
    
    location.reload();
}


//Abrir Editar Div e Config Extra

function openEditar(event){
    //Abrir div
    document.getElementById("editarElementFun").style.display = 'block'
    document.getElementById("baseEditElement").style.display = 'block'

    //Informações da Linha
    
    //Reescrevendo os inputs
    var button = event.target; // Botão clicado
      var trElement = button.parentElement.parentElement; // Encontra o elemento <tr> pai do botão
      var nomeValorTd = trElement.querySelector("#nomeValorTd"); // Encontra o elemento <td> com id "nomeValorTd"
      var payNoPay = trElement.querySelector("#pay_NoPay"); // Encontra o elemento <span> com id "pay_NoPay"
      var timePlano = trElement.querySelector("#timePlano"); // Encontra o elemento <span> com id "timePlano"
      var comecoNet = trElement.querySelector("#comecoNet"); // Encontra o elemento <span> com id "comecoNet"
      var vencimentoTimeMin = trElement.querySelector("#vencimentoTimeMin"); // Encontra o elemento <span> com id "vencimentoTimeMin"

      var nomeVendendorInput = document.getElementById("nomeVendendor");
      var nomeClienteInput = document.getElementById("nomeCliente");
      var horaCompradaInput = document.getElementById("horaComprada");
      var dataCompradaInput = document.getElementById("dataComprada");
      var pagamentoSituaYesInput = document.getElementById("pagamentoSituaYes");
      var pagamentoSituaNoInput = document.getElementById("pagamentoSituaNo");
      var planoSelect = document.getElementById("plano_P");

      // Copia os valores dos elementos encontrados para os inputs correspondentes
      nomeClienteInput.value = nomeValorTd.textContent;
      horaCompradaInput.value = comecoNet.textContent;
      pagamentoSituaYesInput.checked = payNoPay.textContent === "Sim";
      pagamentoSituaNoInput.checked = payNoPay.textContent === "Não";
      planoSelect.value = timePlano.textContent;
      
      //Conseguir o Id do Element

      var buttonExcluir = event.target;
      var trElement = buttonExcluir.closest("tr");
      var trId = trElement.id;
      var span = document.getElementById("idValorElement")
      var spanId = span.innerHTML = `${trId}`
      dadosLinha.idUnicaEnd = spanId

      //Conseguir infos que não tem no TR

      //Vendendor
      var localStorageValue = localStorage.getItem(trId);
      const localStorageObj = JSON.parse(localStorageValue);
      var varVendendor = localStorageObj.vendendor;
      nomeVendendorInput.value = varVendendor
      //console.log(varVendendor)

      //DataComprada
      var varDataComprada = localStorageObj.dataComprada;
      dataCompradaInput.value = varDataComprada
      //console.log(varDataComprada)

      //Calcular Start

      if (localStorageObj.dataComprada !== "" && localStorageObj.horaComprada !== ""){
        document.getElementById("calcEditElement").style.display = "none"
      }else{
        document.getElementById("calcEditElement").style.display = "block"
      }

      //Vencimento span

      var venicmentoValue = localStorageObj.vencimentoTimeMin
      document.getElementById("inputVencimentoValue").innerHTML = venicmentoValue

      //Plano div

      var planoDiv = localStorageObj.timePlano
      var selectElement = document.getElementById("select_EditElement");
      var optionText = planoDiv;

      for (var i = 0; i < selectElement.options.length; i++) {
        var option = selectElement.options[i];
        
        if (option.text === optionText) {
          // Selecionar o <option>
          option.selected = true;
          break;
        }
      }

      //Criar div para pegar o ID do TR

      document.querySelector("footer#FooterEditarElement").innerHTML += `<div class="idElementDivEdit" id="${trId}" style="display: none;">${trId}</div>`

      //If do plano select
      if (localStorageObj.timePlano !== "--:--"){

        //Pegar o plano selecionado
        var selectElement = document.getElementById('select_EditElement');
        var selectedOption = selectElement.options[selectElement.selectedIndex];
        selectedText = selectedOption.text;

        //Esconder o select
        let select = document.getElementById("select_EditElement")
        select.style.display = "none"

        //Criar um output
        let areaPlanosSpan = document.getElementById("areaPlanos")
        areaPlanosSpan.innerHTML += `<output id="outputPlano" style="display: none;">${selectedText}</output>`
        document.getElementById("outputPlano").style.display = "block"

        //Tira o margin-button -12 da div plano
        let divPlanos = document.getElementById("planoCompradaDivId")
        divPlanos.style.marginBottom = "0px"
        

        //Deixar o output true
        var outputPlanoVery = true

        //console.log("Plano selecionado")
      }else{
        //console.log("Plano virgem")
      }
}

//Remover div para pegar ID do TR

// function removeElement(idElementDivEdit) {
//   var element = document.getElementsByClassName("idElementDivEdit")
//   if (element) {
//     element.parentNode.removeChild(element);
//     console.log("Elemento removido com sucesso.");
//   } else {
//     console.error("Elemento não encontrado com o ID:", idElementDivEdit);
//   }
// }

//Calcular date e hora

let hora1 = ''; // Inicializa a variável hora1 como string vazia

function calcEditElementDate(event){
  var inputHora = document.getElementById('horaComprada');
  var inputDate = document.getElementById('dataComprada');

  var dateCalc = new Date();
  const horas = dateCalc.getHours();
  const minutos = dateCalc.getMinutes();
  const dataDay = dateCalc.getDate();
  const dataMonth = dateCalc.getMonth() + 1;

  inputHora.value = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  inputDate.value = `2023-${dataMonth.toString().padStart(2, '0')}-${dataDay.toString().padStart(2, '0')}`;

  const dateAgroup = `${horas}:${minutos} - ${dataDay}/${dataMonth}/2023`;

  const dataCompradaNew = `2023-${dataMonth}-${dataDay}`;
  const horaCompradaNew = `${horas}:${minutos}`;

  hora1 = `${horas}:${minutos}`; // Atualiza a variável hora1
}

let stateStartPlayLig; 
let statePlayPauseLig;
let statesPlayNoPlay;

//Dar play no time
function starTimeStand() {
  let div = document.getElementById("stateStartPlay");
  div.style.display = "contents";
  stateStartPlayLig = true;
  statesPlayNoPlay = "play";

  if (statePlayPauseLig) {
    let div = document.getElementById("statePlayPause");
    div.style.display = "none";
  }
}
        
// Situação do pagamento
let paySitua;
var paymentSituationYes = document.getElementById('pagamentoSituaYes');

paymentSituationYes.addEventListener('change', (event) => {
  //console.log('Yes selected!');
  paySitua = "Sim";
});

var paymentSituationNo = document.getElementById('pagamentoSituaNo');

paymentSituationNo.addEventListener('change', (event) => {
  //console.log('No selected!');
  paySitua = "Não";
});

if (paySitua == undefined){
  paySitua = "Não"
}

//Function Excluir Item

function openExcluir(event) {
  var buttonExcluir = event.target;
  var trElement = buttonExcluir.closest("tr");
  var trId = trElement.id;

  var r = prompt('Você tem certeza que quer apagar o "' + trId + '"? \n' + '(Sim/Não)');

  if (r === "sim" || r === "Sim" || r == "Sim " || r == "sim " || r == "ss" || r == "s" || r == "S" || r == "SS") {
    localStorage.removeItem(trId);
    trElement.remove();
    alert(trId + " foi excluído.");
  }
  //console.log(trId);
}

//Option Script

    var selectElement = document.getElementById('select_EditElement');
    let hora2 = '';

    selectElement.addEventListener('change', function() {
      var selectedOption = selectElement.options[selectElement.selectedIndex];
      selectedText = selectedOption.text; // Atribui o valor a selectedText
      hora2 = selectedText; // Atualiza a variável hora2

      calcularSomaHoras(); // Chama a função para calcular a soma das horas
    });


//Set vencimento

  function somarHoras(hora1, hora2) {
    var partesHora1 = hora1.split(':');
    var partesHora2 = hora2.split(':');

    var horas1 = parseInt(partesHora1[0]);
    var minutos1 = parseInt(partesHora1[1]);
    var horas2 = parseInt(partesHora2[0]);
    var minutos2 = parseInt(partesHora2[1]);

    var totalMinutos = minutos1 + minutos2;
    var horasCarry = Math.floor(totalMinutos / 60);
    var minutosResultado = totalMinutos % 60;
    var horasResultado = horas1 + horas2 + horasCarry;

    if (horasResultado >= 24) {
      horasResultado -= 24;
    }

    return horasResultado.toString().padStart(2, '0') + ':' + minutosResultado.toString().padStart(2, '0');
  }

  // Chama a função para calcular a soma das horas
  var somaHoras;

  function calcularSomaHoras() {
    var somaHoras = somarHoras(document.getElementById("horaComprada").value, hora2);
    //console.log(somaHoras); // Exibe a soma das horas

    //Escrever na div
    var vencimentoDiv = document.getElementById("inputVencimentoValue")
    vencimentoDiv.innerHTML = `${somaHoras}` 
  }

  // Chama a função para calcular a soma das horas
  calcularSomaHoras();

//Funtion SaveEdit

let dadosLinha = {
  nome: undefined, 
  statusPay: undefined, 
  timePlano: undefined,
  comecoNet: undefined,
  vencimentoTimeMin: undefined,
  idUnicaEnd: undefined,
  horaComprada: undefined,
  dataComprada: undefined,
  statusTime: undefined,
  vendendor: undefined,
};

function SalvarEdit() {
  // Inputs
  var nomeVendendorInput = document.getElementById("nomeVendendor").value; // String *
  var horaCompradaInput = document.getElementById("horaComprada").value; // String *
  var dataCompradaInput = document.getElementById("dataComprada").value; // String *
  var pagamentoSituaYesInput = document.getElementById("pagamentoSituaYes").value; // String *
  var pagamentoSituaNoInput = document.getElementById("pagamentoSituaNo").value; // String *
  var nomeClienteInput = document.getElementById("nomeCliente").value; // String *
  var idFinalSave = document.querySelector("footer#FooterEditarElement > div").id;

  function getContentFromDiv(divId) {
    var divElement = document.getElementById(divId);
    if (divElement) {
      return divElement.innerHTML;
    } else {
      console.error("Div não encontrada com o ID:", divId);
      return ""; // Retorna uma string vazia se a div não for encontrada
    }
  }

  var selectElement = document.getElementById('select_EditElement');
  var selectedOption = selectElement.options[selectElement.selectedIndex];
  selectedText = selectedOption.text; // Atribui o valor a selectedText

  // Exemplo de uso:
  var content = getContentFromDiv("inputVencimentoValue");

  let dadosLinha = {
    nome: nomeClienteInput, // Inputs
    statusPay: paySitua, // Line 124 a 138
    timePlano: selectedText, // Line 154
    comecoNet: horaCompradaInput, //
    vencimentoTimeMin: content, //
    idUnicaEnd: idFinalSave, // Inputs
    horaComprada: horaCompradaInput, // Inputs
    dataComprada: dataCompradaInput, // Inputs
    statusTime: statesPlayNoPlay, // Line 96 a 122
    vendendor: nomeVendendorInput, // Inputs
  };

  console.log(dadosLinha);

  // Remover o item existente no LocalStorage com o ID
  localStorage.removeItem(idFinalSave);

  // Criar um novo item no LocalStorage com as informações atualizadas
  localStorage.setItem(idFinalSave, JSON.stringify(dadosLinha));

  
  //location.reload();

}


function SalvarExitEdit(){
  SalvarEdit() //Salvar
  ExitEdit() //Fechar
}
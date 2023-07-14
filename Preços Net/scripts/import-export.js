//Export

function copyDivContentExportar() {
    var divElement = document.getElementById('outputExport');

    var range = document.createRange();
    range.selectNode(divElement);

    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    document.execCommand('copy');

    window.getSelection().removeAllRanges();
}

    //Fechar div de exportar e importar

function closeImportExport(){
    let div = document.getElementById("importExport_LS")
    div.style.display = "none"

    document.getElementById("exportar").style.display = "none"
    document.getElementById("importar").style.display = "none"

    document.getElementById("bntExport").style.border = "none"
    document.getElementById("bntImport").style.border = "none"
    clearOutput()
}

    //Abrir div de exportar e importar

function importExport(){
    let div = document.getElementById("importExport_LS")
    div.style.display = "block"
}

    //Abrir parte da div de importar

function importPart(){
    document.getElementById("importar").style.display = "block"
    document.getElementById("exportar").style.display = "none"

    document.getElementById("bntImport").style.border = "1px solid black"
    document.getElementById("bntExport").style.border = "none"
    clearOutput()
}

    //Abrir parte da div de exportar

function exportPart(){
    document.getElementById("exportar").style.display = "block"
    document.getElementById("importar").style.display = "none"

    document.getElementById("bntExport").style.border = "1px solid black"
    document.getElementById("bntImport").style.border = "none"

}

//Limpar output 1

function clearOutput(){
    document.getElementById("statusOutput").innerHTML = ""
}

    //Button que copia localStorage

    // JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Função para copiar o LocalStorage
    function copiarLocalStorage() {
      var localStorageContent = JSON.stringify(localStorage);
  
      navigator.clipboard.writeText(localStorageContent)
        .then(function() {
          console.log('LocalStorage copiado com sucesso!');
        })
        .catch(function(error) {
          console.error('Erro ao copiar o LocalStorage:', error);
        });
    }
  
    // Função para reescrever o LocalStorage com base no valor do input
    function reescreverLocalStorage() {
    var inputContent = document.getElementById("inptImportar").value;

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
        location.reload()
        console.clear()
    }

  
    // Obtém referências aos botões
    var btnCopiarLocalStorage = document.getElementById("copyLS");
    var btnReescreverLocalStorage = document.getElementsByClassName("subsImport")[0];
  
    // Adiciona os listeners de evento aos botões
    btnCopiarLocalStorage.addEventListener('click', copiarLocalStorage);
    btnReescreverLocalStorage.addEventListener('click', reescreverLocalStorage);
  });
  

// //Function para a resposta: Melhor não

// function bntQuestN(){
//     document.getElementById("divQuestYorN").style.display = "none"
// }

//Limpar output 2

function clearOutputII(){
    document.getElementById("outputQuest").innerHTML = ""
}

// //Function para a resposta: Sim, tenho

// function bntQuestY(){
    
// }
//Limpar console
function limparConso(){
    const msgErroNameUndefined = document.getElementById('erro_nomeUndefined')
    msgErroNameUndefined.style.display = 'none'

    var notificationErro = document.getElementById('notificationErro')
    notificationErro.style.display = 'none'

    var limparConsoBnt = document.getElementById('limparConso')
    limparConsoBnt.style.marginLeft = '1px'

    console.clear();
}

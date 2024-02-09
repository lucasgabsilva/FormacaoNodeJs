function enviarEmail (corpo, para, callback){
    setTimeout(() =>{
        
        var erro = true
        if (erro){
            callback("Houve um erro durante o envio do email")
        }else {
            callback()//recebe um undefined em caso de não haver erro
        }
    },8000)
}

console.log("Inicio do envio de email")
enviarEmail("Olá, seja bem-vindo!","teste@udemy.com", (erro)=> {
    if(erro == undefined){
        console.log("Email enviado sem erros.")
    }else{
        console.log(`Ocorreu um erro: ${erro}`)
    }
})
console.log("Seu email está sendo enviado, aguarde alguns instantes...")
function enviarEmail (corpo, para){ 
    return new Promise((resolve, reject) => {
        setTimeout (() => {
            var erro = true

            if (!erro){
                resolve({time: 6, to:"Lucas@gmail.com"})
            }else{
                reject("Fila cheia")
            }

        },3000)//tempo de espera de 3 segundos
    })    
}

enviarEmail("Hello, world!", "Lucas@gmail.com").then((dados)=>{
    console.log(`
        Time: ${dados.time}
        -------------------
        To: ${dados.to}
    `)
}).catch((erro)=>{
    console.log(`Houve um erro: ${erro}`)
})
function pegarId(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(5)
        },1500)
    })
}

function buscarEmailBanco (id){
    return new Promise ((resolve,reject)=>{
        setTimeout(() => {
            resolve("Lucas@gmail.com")
        },2000)
    })
}
function enviarEmail (corpo, para){ 
    return new Promise((resolve, reject) => {
        setTimeout (() => {
            var erro = false

            if (!erro){
                resolve({time: 6, to:"Lucas@gmail.com"})
            }else{
                reject("Fila cheia")
            }

        },3000)//tempo de espera de 3 segundos
    })    
}

function pegarUser (){
    return new Promise((resolve, reject)=> {
        setTimeout(()=>{
            resolve ([
                {name: "Victor", lang:"JS"},
                {name: "Lucas", lang:"Java"},
                {name: "Gabriel", lang:"PHP"}
            ])
        },3000)
        
    })
}

async function principal(){
    var usuarios = await pegarUser()
    console.log(usuarios)
    console.log("Olá mundo.")
}
principal()

//antes
console.log("Começo.")
pegarId().then((id) => {
    buscarEmailBanco(id).then((email)=> {
        enviarEmail("Olá, tudo bem?", email).then(()=>{
            console.log(`Email enviado com sucesso para o usuário: ${id}`)
        }).catch((err)=>{
            console.log(err)
        })
    })
})

//depois
async function principal(){
   var id = await pegarId()//busca o id e só segue quando concluir
   var email = await buscarEmailBanco(id)//espera a busca pelo id
   enviarEmail("Olá, tudo bem?", email).then(()=> {
    console.log("Email enviado")
   }).catch(()=>{
    console.log(err)
   })
}
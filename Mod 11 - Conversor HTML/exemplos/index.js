const fs = require("fs")

function modificarUsuario(nome, curso, categoria){
    fs.readFile("./usuario.json",{encoding: 'utf-8'},(erro, dados)=>{
        if(erro){
            console.log("[ERRO] não foi possível salvar o arquivo")
        }else{
            var conteudo = JSON.parse(dados)
            conteudo.nome = nome
            conteudo.curso = curso
            conteudo.categoria = categoria
    
            //edita o usuário e converte um objeto para texto
            fs.writeFile("./usuario.json", JSON.stringify(conteudo), (erro) => {
                if (erro){
                    console.log("[ERRO] não foi possível editar o arquivo.")
                }
            })
        }
    })
}

modificarUsuario("João", "PHP na prática", "PHP")


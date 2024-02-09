const express = require("express")//Importando o express
const app = express()//variáveis declaradas como constantes não podem ser sobrescritas (essa linha inicia o express)

app.get("/", function(req, res){
    res.send("Bem vindo ao curso de node.js")//essa resposta só pode ser enviada uma vez
})

app.get("/blog", function(req,res){
    res.send("<h1>Bem vindo ao meu blog</h1>")
})

app.get("/canal/youtube", function(req,res){
    var canal = req.query["canal"]
    res.send(canal)
})

app.get("/ola/:nome/:moradia?", function(req, res){//a interrogação torna o parâmetro moradia opcional
    /*
    REQ: Dados enviados pelo usuário
    RES: Resposta enviada ao usuário
    */
    var nome = req.params.nome
    var moradia = req.params.moradia
    if (moradia){
        res.send("<h1>Olá, " + nome + " de " + moradia + ". Tudo bem?</h1>")
    } else{
        res.send("<h1>Olá, " + nome + ".Tudo bem?</h1>")
    }
    
})

app.listen(4000,function(erro){
    if(erro){
        console.log("Ocorreu um erro.")
    } else{
        console.log("Servidor inciado com sucesso.")
    }
})
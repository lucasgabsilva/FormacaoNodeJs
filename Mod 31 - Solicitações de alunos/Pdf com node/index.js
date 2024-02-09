var pdf = require("html-pdf")
var ejs = require("ejs")

var nome = "Lucas"
var curso = "Formação node.js"
var categoria = "JavaScript"

ejs.renderFile("./meuarquivo.ejs",{nome: nome, curso: curso, categoria: categoria}, (err, html)=> {
    if(err){
        console.log(err + "[Erro] Não foi possível concluir essa ação.")
    }else{
        pdf.create(html,{}).toFile("pdfs/pdf5.pdf",(err,res)=> {
            if(err){
                console.log("Um erro aconteceu.")
            }else{
                console.log(res)
            }
        })
    }
})

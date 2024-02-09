const mongoose = require ("mongoose")
const articleModel = require("./article")

mongoose.connect("mongodb://localhost:27017/aprendendoMongo")

const article = mongoose.model("Article",articleModel)

article.findByIdAndUpdate("65bb8e401ed0b0a7ec73abe7",{title: "Aprendendo vue", author: "Mariana Silva"}).then(() => {
    console.log("Dados atualizados com sucesso.")
}).catch(err => {
    console.log("Não foi possível atualizar os dados.")
})

/*
Atualização de dados
*/





/*
Deleção de dados
------------------------------------------------
article.findByIdAndDelete('65bb9b6bfae73b3ca78645a6').then(() =>
    console.log("Dados removidos")
).catch(err => {
    console.log("Erro na deleção de artigo")
})
*/


/*
Busca por um dado em específico
-----------------------------------------------
article.findOne({'author': 'Lucas Silva'}).then(article => {
    console.log(article)
}).catch(err => {
    console.log(err)
})
*/

/*
Listagem de conteúdo
----------------------------------
article.find({}).then(articles => {
    console.log(articles)
}).catch( err => {
    console.log(err)
})
*/


/*
Cadastro de artigos
--------------------------------

const artigo = new article({
    title: "Mongo db é difícil?", 
    author:"Lucas",
    body:"Entenda como usar mongo",
    resume: {
        content: "lsadfkjhggru9y",
        author: "Teste"
    }    
})

artigo.save().then(()=> {
    console.log("Artigo salvo com sucesso.")
}).catch(err => {
    console.log(err)
    console.log("Erro ao salvar artigo")
})
*/
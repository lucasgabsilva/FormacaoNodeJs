const express = require("express")//importando o módulo do express
const app = express()
const bodyParser = require("body-parser") //importa o body parser
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")//importa o módulo de perguntas
const Resposta = require("./database/Resposta")//importamos as respostas


connection.
    authenticate()
    .then(()=>{
       console.log("Conexão com o banco de dados bem sucedida") 
    })
    .catch((msgErro)=> {
        console.log(msgErro)
    })

//usando o ejs como view engine
app.set('view engine', 'ejs')
//definindo arquivos estáticos
app.use(express.static('public'))

//decodifica os dados enviados pelo formulário
app.use(bodyParser.urlencoded({extended: false}))
// permite que dados de formulários sejam lidos via json
app.use(bodyParser.json())


//rota principal
app.get("/",(req,res) => { 
    /*
    equivale ao SELECT * from perguntas no sql
    aqui pesquisamos pelas perguntas e armazenamos a lista de perguntas dentro da variável perguntas
    */
    Pergunta.findAll({ ram: true, order:[
        ['id','DESC']//define a regra de ordenação das perguntas(nesse caso por id e ordem decrescente)
    ]}).then(perguntas => {
        //jogamos os dados das variáveis para o front end
        res.render("index",{
            perguntas:perguntas// recebemos um array de perguntas
        }) 
      })
    })

app.get("/perguntar",(req,res) =>{
    res.render("perguntar")
})


app.post("/salvarpergunta",(req,res)=>{
    var titulo = req.body.titulo
    var descricao = req.body.descricao

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })
})

//uma rota para selecionar uma pergunta em específico por id
app.get("/pergunta/:id",(req,res)=> {
    var id = req.params.id
    //busca no banco de dados um dado em específico
    Pergunta.findOne({
        where: {id: id}//busca no banco uma pergunta que tenha id igual ao valor da rota
    }).then(pergunta => {
        if(pergunta != undefined){//testa se a pergunta foi encontrada

            //busca todas as respostas que fazem parte daquela pergunta
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[
                  ['id','DESC']  
                ]
                
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
        } else{//para caso a pergunta não seja encontrada
            res.redirect("/")
        }
    })
})


//Rota que vai receber os dados do formulário da rota responder
app.post("/responder", (req, res)=> {
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() =>{
        res.redirect("/pergunta/"+perguntaId)//redireciona o usuário que responder a pergunta á página da mesma
    })
})

app.listen(8080,()=>{
   console.log("App em funcionamento.") 
})



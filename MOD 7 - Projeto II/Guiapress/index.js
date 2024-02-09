const express = require("express")//criando o módulo do express
const app = express()//cria a instância do express
const bodyParser = require("body-parser")//importando o body parser
const connection = require("./database/database")//importando o arquivo de conexão
const session = require("express-session")//importando a biblioteca session do express

//importando o arquivo router de categorias
const categoriesController = require ("./categories/CategoriesController")

//importando o arquivo router de artigos
const articlesController = require("./articles/ArticlesController")

//Importando os arquivos de artigos e categorias
const Article = require("./articles/Article")
const Category = require("./categories/Category")

//importando o model user
const User = require("./users/User")

//Importando o controller de usuários
const usersController = require("./users/UsersController")

//Carregando a view engine
app.set('view engine', 'ejs')

//configurando sessões
app.use(session({
    secret: "qualquercoisaaleatoria", cookie: {maxAge: 30000}//tempo expiração de sessão
}))

//Configurando arquivos estáticos e definindo seu diretório
app.use(express.static('public'))

//Configurando o body parser
app.use(bodyParser.urlencoded({extended: false}))//recebe dados de formulário
app.use(bodyParser.json())//recebe dados json

//conectando-se ao banco de dados chamando o objeto de conexão
connection
    .authenticate()
    .then(() =>{
        console.log("Conexão realizada com sucesso")
    }).catch((error)=>{
        console.log(error)
    })

//dizendo para aplicação que queremos usar as rotas do arquivo importado
app.use("/",categoriesController)
app.use("/",articlesController)
app.use("/",usersController)

//rota principal da aplicação
app.get("/",(req,res) =>{
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles =>{

        Category.findAll().then( categories => {
            res.render("index", {articles: articles, categories: categories})
        }) 
    })
})

//rota para acessar um determinado artigo via slug
app.get("/:slug",(req,res) => {
    var slug = req.params.slug
    Article.findOne({
        //busca o artigo pela slug
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then( categories => {
                res.render("article", {article: article, categories: categories})
            })
         } else {
            res.redirect("/")
         }
    }).catch(err => {
        res.redirect("/")
    })
})


//pesquisa uma categoria via seu slug e redireciona em caso de erro
app.get("/category/:slug", (req,res) =>{
    var slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then( category =>{
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index",{articles: category.articles, categories: categories})
            })
        }else {
            res.redirect("/")
        }
    }).catch ( err => {
        res.redirect("/")
    })
})

app.listen(8080,()=>{
    console.log("Sistema em funcionamento")
})
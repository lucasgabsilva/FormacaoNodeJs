const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")
const Article = require("./Article")
const slugify = require("slugify")
const adminAuth = require("../middlewares/adminAuth")

router.get("/admin/articles", adminAuth, (req,res)=>{
    //vamos exibir na tela os artigos do banco de dados
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render("admin/articles/index",{articles: articles})
    })
})

router.get("/admin/articles/new", adminAuth,(req,res)=> {
    Category.findAll().then(categories => {
        res.render("admin/articles/new",{categories: categories})
    })
})

//rota para salvar os artigos no banco de dados
router.post("/articles/save", adminAuth,(req,res) => {
    var title = req.body.title
    var body = req.body.body
    var category = req.body.category

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category//chave extrangeira, que cria o relacionamento
    }).then(() => {
        res.redirect("/admin/articles")     
    })
})


//rota para deletar um artigo
router.post("/articles/delete", adminAuth,(req,res)=>{
    var id = req.body.id//recebe o id da categoria a ser deletada
    //verifica se o id não é nulo
    if(id != undefined){
        //se for diferente de  nulo, ainda faremos outro teste, nesse caso, testar se o id é numérico
        if(!isNaN(id)){
            //se passar no teste, deleta a categoria
            Article.destroy({
                where: {
                    //deleta o artigo com o id igual ao id passado à variável
                    id:id
                }
            }).then(()=>{//feito o processo, redireciona para essa rota
                    res.redirect("/admin/articles")
                })
        }else{
            //caso o id seja nulo, redireciona o user para esta página
            res.redirect("/admin/articles")
        }
    }else{
        res.redirect("/admin/articles")
    }
})



// Rota para a edição de artigos já criados
router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id

    Article.findByPk(id, {
        include: [{ model: Category }] // Inclui a categoria associada ao artigo
    }).then(article => {
            if (article != undefined) {
                Category.findAll().then(categories => {
                    // Passa o artigo e as categorias para a renderização da página
                    res.render("admin/articles/edit", { article: article, categories: categories })
                })
            } else {
                res.redirect("/")
            }
        })
        .catch(err => {
            res.redirect("/")
        })
})

//rota para salvar as atualizações no banco de dados
router.post("/articles/update", adminAuth, (req,res) =>{
    var id = req.body.id
    var title = req.body.title
    var body = req.body.body
    var category = req.body.category

    Article.update({title: title, body: body, categoryId: category, slug:slugify(title)},{
        where: {
            id: id
        }
    }).then (() => {
        res.redirect("/admin/articles")
    }).catch(err => {
        res.redirect("/")
    })
})


//rota para a paginação de artigos
router.get("/articles/page/:num", (req,res) => {
    var page = req.params.num
    var offset = 0
    
    //se a página não for um número o offset é 0 ou se a página é 1
    if(isNaN(page) || page == 1){
        offset = 0
    }else {
        //off vai ser o valor da página
        offset = (parseInt(page) -1 ) * 4//o offset x a quantidade de elementos da pág
    }


    //retorna todos os artigos e uma contagem deles
    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {


        var next
        //se o offset atual + a quantidade de elementos da página for maior que ac ontagem de artigos não existe outra página a ser exibida
        if (offset + 4 >= articles.count){
            next = false
        }else{
            next = true
        }
        var result = {
            page: parseInt(page),
            next: next,
            articles : articles
        }

        //Passando as categorias para a view page
        Category.findAll().then(categories => {
            res.render("admin/articles/page",{ result: result, categories: categories})
        })
    })
})


//exportando o arquivo de rotas
module.exports = router
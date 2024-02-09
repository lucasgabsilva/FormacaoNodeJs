const express = require("express")
const router = express.Router()
const Category = require("./Category")
const slugify = require("slugify")

router.get("/categories",(req,res)=>{
    res.send("Rota de categorias")
})

router.get("/admin/categories/new",(req,res)=> {
    res.render("admin/categories/new")
})

router.post("/categories/save", (req,res) =>{
    var title = req.body.title//variável que recebe os dados do formulário
    if (title != undefined){
        //salva no banco de dados um título não nulo
        Category.create({
            title:title,
            slug: slugify(title)//título otimizado para URL
        }).then(() =>{
            res.redirect("/admin/categories")
        })
    }else {
        //redireciona o usuário em caso de título vazio
        res.redirect("/admin/categories/new")
    }
})

router.get("/admin/categories",(req,res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index",{categories: categories})
    })
})


//rota para deletar categorias
router.post("/categories/delete",(req,res)=>{
    var id = req.body.id//recebe o id da categoria a ser deletada
    //verifica se o id não é nulo
    if(id != undefined){
        //se for diferente de  nulo, ainda faremos outro teste, nesse caso, testar se o id é numérico
        if(!isNaN(id)){
            //se passar no teste, deleta a categoria
            Category.destroy({
                where: {
                    //deleta a categoria com o id igual ao id passado à variável
                    id:id
                }
            }).then(()=>{//feito o processo, redireciona para essa rota
                    res.redirect("/admin/categories")
                })
        }else{
            //caso o id seja nulo, redireciona o user para esta página
            res.redirect("/admin/categories")
        }
    }else{
        res.redirect("/admin/categories")
    }
})

//rota para editar uma categoria via seu respectivo id
router.get("/admin/categories/edit/:id", (req,res)=>{
    var id = req.params.id

    //corrigindo o bug de achar o id mesmo com strings no meio
    if(isNaN(id)){
        res.redirect("/admin/categories")
    }

    //esse método serve para pequisar uma categoria via seu id
    Category.findByPk(id).then(category => {
        //precisamos antes testar para saber se a categoria é nula ou não
        if(category != undefined){
            //caso não seja nula, passaremos ela para uma view
            res.render("admin/categories/edit",{category:category})

        } else {
            res.redirect("/admin/categoriy")
        }
    }).catch(erro => {
        res.redirect("/admin/category")
    })
})

//rota para atualizar no banco a categoria
router.post("/categories/update",(req,res)=>{
    var id = req.body.id
    var title = req.body.title

    //atualizando o título da categoria via id recebido pelo form
    Category.update({title: title, slug: slugify(title)},{
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/categories")
    })
})

//exportando o arquivo de rotas
module.exports = router
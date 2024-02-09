const express = require("express")
const router = express.Router()
const User = require("./User")
const bcrypt = require('bcryptjs')

router.get("/admin/users", (req,res)=> {
    User.findAll().then(users => {
        res.render("admin/users/index",{users:users})
    })
})

//Rota para a criação de novos usuários
router.get("/admin/users/create",(req, res)=> {
    res.render("admin/users/create")
})

router.post("/users/create", (req,res)=> {
    var email = req.body.email
    var password = req.body.password

    if (password == "" || undefined){
        res.redirect("/admin/users/create")
        alert("erro")
    }else{
      User.findOne({where: {email:email}}).then(user => {
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)

            User.create ({
                email: email,
                password: hash //variável que recebe o hash gerado
            }).then(()=>{
                res.redirect("/")
            }).catch((err)=> {
                res.redirect("/")
            })
        }else{
            res.redirect("/admin/users/create")
        }
    })   
    }    
})

//rota para deletar usuários
router.post("/users/delete",(req,res)=>{
    var id = req.body.id//recebe o id da categoria a ser deletada
    //verifica se o id não é nulo
    if(id != undefined){
        //se for diferente de  nulo, ainda faremos outro teste, nesse caso, testar se o id é numérico
        if(!isNaN(id)){
            //se passar no teste, deleta a categoria
            User.destroy({
                where: {
                    //deleta a categoria com o id igual ao id passado à variável
                    id:id
                }
            }).then(()=>{//feito o processo, redireciona para essa rota
                    res.redirect("/admin/users")
                })
        }else{
            //caso o id seja nulo, redireciona o user para esta página
            res.redirect("/admin/users")
        }
    }else{
        res.redirect("/admin/users")
    }
})

router.get("/login", (req,res)=> {
    res.render("admin/users/login")
})


//rota de autenticação de usuário com email e senha
router.post("/authenticate",(req,res)=>{
    var email = req.body.email
    var password = req.body.password

    User.findOne({where:{email: email}}).then(user => {
        if(user != undefined){//se o usuário for encotrado, validaremos a senha
            //validando a senha por comparação de hash
            var correct = bcrypt.compareSync(password, user.password)
            if(correct){
                //se a senha estiver correta, faz o login
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles")
            }else {
                res.redirect("/login")
            }
        }else {
            res.redirect("/login")
        }
    })
})

//rota para desfazer o login
router.get("/logout",(req,res)=> {
    req.session.user = undefined
    res.redirect("/")
})

module.exports = router
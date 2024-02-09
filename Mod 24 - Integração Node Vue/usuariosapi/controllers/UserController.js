var User = require("../models/User")
var PasswordToken = require("../models/PasswordToken")
var jwt = require("jsonwebtoken")

var bcrypt = require("bcrypt")

var secret = "pijasdhpaisduhpwedoui934"

class UserController {

    async index(req,res){
        var users = await User.findAll()
        res.json(users)
    }

    async findUser(req, res){
        var id = req.params.id
        var user = await User.findById(id)
        if(user == undefined){
            res.status(404)
            res.json({})
        }else{
            res.status(200)
            res.json(user)
        }
    }

    async create(req,res){
        var {email, name, password} = req.body

        if (email == undefined || email == "" || email == " "){
            res.status(400)
            res.json({err: "Email digitado inválido, tente novamente."})
            return
        }else if (name == undefined || name == "" || name == " "){
            res.status(400)
            res.json({err: "Nome de usuário inválido, tente novamente."})
            return
        }else if (password == undefined || password == "" || password == " "){
            res.status(400)
            res.json({err: "Senha inválida, tente novamente."})
            return
        } else {

            var emailExist = await User.findEmail(email)

            if(emailExist){
                res.status(406)
                res.json({err: "O email digitado já se encontra cadastrado no sistema."})
                return
            }

            await User.new(email,password,name)
            res.status(200)
            res.send("tudo ok")
        }

    }
    async edit(req,res){
        var {id, name, role, email} = req.body
        var result = await User.update(id,email,name,role)
        if(result != undefined){
            if(result.status){
                res.status(200)
                res.send("Tudo ok.")
            }else{
                res.status(406)
                res.send(result.errr)
            }
        }else{
            res.status(406)
            res.send("Houve um erro no servidor.")
        }
    }
    
    async remove(req,res){
        var id = req.params.id

        var result = await User.delete(id)
        if(result.status){
            res.status(200)
            res.send("Tudo ok.")
        }else{
            res.status(406)
            res.send(result.err)
        }
    }
    async recoverPassword(req,res){
        var email = req.body.email
        var result = await PasswordToken.create(email)

        if(result.status){
            res.status(200)
            res.send("" + result.token)
        }else{
            res.status(406)
            res.send(result.err)
        }
    }
    async changePassword(req,res){
        var token = req.body.token
        var password = req.body.password

        var isTokenValid = await PasswordToken.validate(token)

        if (isTokenValid.status){
            await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)

            res.status(200)
            res.send("Senha alterada com sucesso.")
        }else{
            res.status(406)
            res.send("Token de recuperação de senha inválido.")
        } 
    }


    async login(req,res){

        var {email,password} = req.body

        var user = await User.findByEmail(email)

        if(user != undefined){
            var resultado = await bcrypt.compare(password,user.password)
            if(resultado){
                var token = jwt.sign({email: user.email, role: user.role}, secret)

                res.status(200)
                res.json({token: token})
            }else{
                res.status(406)
                res.json({err: "Senha incorreta"})
            }
        }else{
            res.status(406)
            res.json({status: false, err: "Usuário não encontrado."}) 
        }
    }
}

module.exports = new UserController()
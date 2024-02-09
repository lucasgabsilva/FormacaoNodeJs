
var bcrypt = require("bcrypt")
const knex = require("../database/connection")
const PasswordToken = require("./PasswordToken")

class User {

    //lista todos os usuários cadastrados no sistema
    async findAll(){
        try{
            var result = await knex.select(["name","email","id","role"]).table("users")
            
            if(result.length > 0){
                return result[0]
            }else{
                return undefined
            }

        }catch{
            console.log(err)
            return undefined
        }
    }

    async findById(id){
        try{
            var result = await knex.select(["id","email","role","name"]).where({id: id}).table("users")

            if(result.length > 0){
                return result[0]
            }else{
                return undefined
            }
        
        }catch(err){
            console.log(err)
            return undefined
        }
    }

    async findByEmail(email){
        try{
            var result = await knex.select(["id","email","password","role","name"]).where({email: email}).table("users")

            if(result.length > 0){
                return result[0]
            }else{
                return undefined
            }
        
        }catch(err){
            console.log(err)
            return undefined
        }
    }


    async new(email,password,name){
        try {
            var hash =  await bcrypt.hash(password, 10)

            await knex.insert({email, password: hash, name, role: 0}).table("users")
        }catch {
            console.log(err)
        } 
    }

    //verifica se o email já existe no banco de dados
    async findEmail(email){
        try{
         var result = await knex.select("*").from("users").where({email: email})
         if(result.length > 0){
            return true
         }else{
            return false
         }
         console.log(result)
        }catch(err){
            console.log(err)
            return false
        }   
    }

    //atualiza os dados do usuário (caso ele exista)
    async update(id,email,name,role){
       var user = await this.findById(id)

       if(user != undefined){
        var editUser = {}

        //verifica se o email existe
            //caso o emai exista, verifica se ele é igual ao informado
        if(email != undefined){
            if(email != user.email){
                var result = await this.findEmail(email)
                if(!result){
                    editUser.email = email
                }else{
                    return {status: false, err: "O E-mail já está cadastrado no sistema."}
                }
            }
        }

        //testa se o nome existe no banco de dados
        if(name != undefined){
            //caso o nome não seja undefined, pega o campo edit user para ele
            editUser.name = name 
        }

        if (role != undefined){
            editUser.role = role
        }

        try{
            await knex.update(editUser).where({id: id}).table("users")
            return {status: true}
        }catch(err){
            return {status: false, err: err}
        }


       }else{
            return {status: false,err: "Usuário não encontrado."}
       }
    }

    async delete(id) {
       var user = await this.findById(id)
       if(user != undefined || user != "" || user != " "){
        try{
            await knex.delete().where({id: id}).table("users")
            return {status: true}
        }catch(err){
            return {status: false, err: err}
        }
        
       }else{
         return {status: false, err: "Usuário não encontrado."}
       }
    }

    async changePassword(newPassword,id,token){
        var hash =  await bcrypt.hash(newPassword, 10)
        await knex.update({password: hash}).where({id: id}).table("users")
        await PasswordToken.setUsed(token)
    }
}

module.exports = new User()
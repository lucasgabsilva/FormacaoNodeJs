var jwt = require("jsonwebtoken")
var secret = "pijasdhpaisduhpwedoui934"

module.exports = function(req,res,next){
    const authToken = req.headers['authorization']

    if(authToken != undefined){
        const bearer = authToken.split(' ')
        var token = bearer[1]

        try{
            var decoded = jwt.verify(token,secret)
            console.log(decoded)

            if(decoded.role == 1){
                next()
            }else{
                res.status(400)
            res.send("Você não tem cargo de administrador.")
            return
            }
        }catch(err){
            res.status(400)
            res.send("Usuário não autorizado.")
            return
        }
    }else{
        res.status(400)
        res.send("Usuário não autorizado.")
        return
    }
}
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const JWTSecret = "dvlaewrhfglsadgopeqhrpgh"

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//middleware de autenticação
function auth(req,res,next){
    const authToken = req.headers['authorization']
    
    if(authToken != undefined){
        const bearer = authToken.split(' ')
        var token = bearer[1]

        jwt.verify(token,JWTSecret,(err,data) => {
            if (err){
                res.status(401)
                res.json({err:"Token de autenticação inválido"})
            }else{
                req.token = token
                req.loggedUser = {id: data.id,email: data.email}
                next()
            }
        })
        
    }else{
        res.sendStatus(401)
        res.json({err: "Token inválido."})
    }
    
}



//banco de dados falso
var DB = {
    games: [
        {
            id: 23,
            title: "Call of duty MW",
            year: 2019,
            price: 200
        },
        {
            id: 12,
            title: "Fifa 21",
            year: 2021,
            price: 300
        },
        {
            id: 3,
            title: "GTA V",
            year: 2015,
            price: 400
        },
        {
            id: 33,
            title: "Euro Truck Simulator 2",
            year: 2010,
            price: 70
        }
    ],
    users: [
        {
            id: 1,
            name: "Lucas Silva",
            email: "Lucas@gmail.com",
            password: "123456"
        },
        {
            id: 2,
            name: "Gabriel Sivla",
            email: "Gabriel@gmail.com",
            password: "654321"
        }
    ]

}

//retorna a lista de games que é protegida por autenticação
app.get("/games",auth,(req,res) =>{
    var HATEOAS = [
        {
            href: "http://localhost:8080/game/0",
            method: "DELETE",
            rel: "delete_game"
        },
        {
            href: "http://localhost:8080/games",
            method: "GET",
            rel: "get_game"
        },
        {
            href: "http://localhost:8080/auth",
            method: "POST",
            rel: "login"
        }
    ]

    res.statusCode = 200
    res.json({games:DB.games, _links: HATEOAS})
})

//rota para retornar os dados do game
app.get("/game/:id",auth,(req,res) => {

    //testando para ver se o id é numérico
    if(isNaN(req.params.id)){
        res.sendStatus(400)//código de erro de bad request
    }else {
        var id = parseInt(req.params.id)

        var HATEOAS = [
            {
                href: "http://localhost:8080/game/" + id,
                method: "DELETE",
                rel: "delete_game"
            },
            {
                href: "http://localhost:8080/game/" + id,
                method: "PUT",
                rel: "edit_game"
            },
            {
                href: "http://localhost:8080/game" +id,
                method: "GET",
                rel: "get_game"
            },
            {
                href: "http://localhost:8080/auth",
                method: "POST",
                rel: "get_all_games"
            }
        ]

        var game = DB.games.find(g => g.id == id)

        //se o usuário passar um valor que não existe:
        if (game != undefined){
            res.statusCode = 200
            res.json({game, _links: HATEOAS})
        }else{
            res.sendStatus(404)
        }
    }
})

//rota para criar games
app.post("/game",auth,(req,res) => {
    var { title, price,year} = req.body

    DB.games.push({
        id: 2323,
        title,
        price,
        year
    })
    res.sendStatus(200)
})

//rota para deletar um game
app.delete("/game/:id", (req,res)=> {
    if(isNaN(req.params.id)){
        res.sendStatus(400)//código de erro de bad request
    }else {
        var id = parseInt(req.params.id)
        var index = DB.games.findIndex(g => g.id == id)

        //se o index do elemento dentro do array não existe
        if (index == -1){
            res.sendStatus(404)
        }else{
            DB.games.splice(index,1)
            res.sendStatus(200)
        }
    }
})

//rota para edição de games
app.put("/game/:id",(req,res)=> {
    if(isNaN(req.params.id)){
        res.sendStatus(400)//código de erro de bad request
    }else {
        var id = parseInt(req.params.id)
        var game = DB.games.find(g => g.id == id)

        //se o usuário passar um id de jogo inexistente
        if (game != undefined){
            var {title, price,year} = req.body

            if (title != undefined){
                game.title = title
            }

            if(price != undefined){
                game.price = price
            }

            if(year != undefined){
                game.year = year
            }

        }else{
            res.sendStatus(404)
        }
    }
})

app.post("/auth",(req,res)=>{
    var {email, password} = req.body
    if(email != undefined){
        //procura no "banco de dados" um email igual ao da requisição
        var user = DB.users.find(u => u.email == email)

        //verificação de usuário válido ou não
        if (user != undefined){
            //verifica se a senha está correta
            if (user.password == password){

                jwt.sign({id: user.id, email:user.email},JWTSecret,{expiresIn:'1h'}, (err, token)=> {
                    if(err){
                        res.status(400)
                        res.json({err: "Falha interna."})
                    }else{
                       res.status(200)
                       res.json({token:token})
                    }
                })
            }else{
                res.status(401)
                res.json({err: "Senha inválida"})
            }
        }else{
            res.status(404)
            res.json({err:"Usuário não encontrado."})
        }
    }else {
        //se o email for inválido, retorna:
        res.status(400)
        res.json({err:"Email inválido, tente novamente."})
    }
})

app.listen(8080,() => {
    console.log("API em funcionamento.")
})

var bodyParser = require("body-parser")
var express = require ("express")
var app = express()
var session = require("express-session")
var flash = require("express-flash")
var cookieParser = require("cookie-parser")


app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(cookieParser("asdfabvrbreba"))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))
app.use(flash())

app.get("/",(req,res)=>{

    var emailError = req.flash("emailError")
    var pontosError = req.flash("pontosError")
    var nomeError = req.flash("nomeError")

    //operador ternário para testar a valia do emaila
    emailError = (emailError == undefined || emailError.length == 0) ? undefined:emailError

    res.render("index",{emailError,pontosError,nomeError})
})

app.post("/form",(req,res) => {
    var {email, nome, pontos} = req.body

    var emailError
    var pontosError
    var nomeError

    if (email == undefined || email == ""){
        emailError = "O email não pode ser vazio."
    }
    if (pontos == undefined || pontos < 20){
        pontosError = "O número de pontos não pode ser vazio ou menor que 20."
    }
    if (nome == undefined || nome == ""){
        nomeError = "O nome não pode ser vazio"
    }
    if (nome.length <= 4){
        nomeError = "Nome muito curto"
    }
    //se os códigos de erros não estiverem vazios, houve um erro de validação
    if(emailError != undefined || pontosError != undefined || nomeError != undefined){
        req.flash("emailError", emailError)
        req.flash("pontosError", pontosError)
        req.flash("nomeError", nomeError)
        res.redirect("/")
    }else{
        res.send("Tudo certo, nenhum erro encotrado.")
    }
})

app.listen(8080,(req,res) =>{
    console.log("Servidor em funcionamento")
})
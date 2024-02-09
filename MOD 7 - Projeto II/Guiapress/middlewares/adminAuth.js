function adminAuth(req, res, next){
    if(req.session.user != undefined){
        //se o login estiver funcionando, libera para o próximo passo
        next()
    }else {
        //se não existe login, vai para o home page
        res.redirect("/login")
    }
}

//exportando a função para uso posterior
module.exports = adminAuth
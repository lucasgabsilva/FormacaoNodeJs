var http = require("http")//importa o módulo HTTP do node


http.createServer(function(requisicao,resposta){
    resposta.end("Hello, World")
}).listen(8181) //cria o servidor e define a porta em que ele vai rodar


console.log('Hello, world!')
console.log('Nosso servidor está rodando com sucesso')
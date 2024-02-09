var somaFuncao = require("./modulos02")//importa a função soma para o arquivo modulos02.js

function soma (a,b){
    return a + b
}

function mult (a,b){
    return a * b 
}

function sub (a,b){
    return a - b 
}
//divisão
function div (a,b){
    return a / b 
}

console.log(somaFuncao(10,20))
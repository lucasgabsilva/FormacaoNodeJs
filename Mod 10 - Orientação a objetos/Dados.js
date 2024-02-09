class Dado{
    constructor(faces){
        this.faces = faces
    }
    Jogar(){
        console.log("Resultado do dado: " + this.GetRandomIntInclusive(1,this.faces)) 
    }
    GetRandomIntInclusive(min, max){
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}

var d6 = new Dado(6)// um dado com 6 faces
var d12 = new Dado(12)// dado com 12 faces
var d100 = new Dado(100)// dado com 100 faces


//funções para jogar os dados
d6.Jogar()
d12.Jogar()
d100.Jogar()
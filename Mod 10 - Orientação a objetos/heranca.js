class Animal {
    constructor(nome, idade, preco){
        this.nome = nome
        this.idade = idade
        this.preco = preco
    }
    ChecarEstoque(){
        return 10
    }

    QualquerMetodo(){
        console.log("Esse método faz parte da classe mãe")
    }
}

class Cachorro extends Animal{

    constructor(nome, idade, preco, raca, peso) {
        super(nome, idade, preco)
        this.raca
        this.peso
    }

    Latir(){
        console.log("*Som de cachorro latindo*")
    }
    ChecarEstoque(){
        console.log("temos 4 cachorros na loja.")
    }
    QualquerMetodo(){
        super.QualquerMetodo
        console.log("Podemos inserir mais funcionalidades aqui:")
    }
}

var dog = new Cachorro ("Flutter",5,250,"PitBull",4)

console.log(dog.ChecarEstoque())

class Pato extends Animal {

}

var pat = new Pato ("Patolino",1,30)
console.log(pat.ChecarEstoque())

dog.Latir()
dog.ChecarEstoque()
dog.QualquerMetodo()
console.log(dog.idade)
console.log(dog.raca)
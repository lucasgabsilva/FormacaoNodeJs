class Filme {
    constructor(titulo, ano, genero, diretor, duracao){
        this.titulo = titulo
        this.ano = ano
        this.genero = genero
        this.diretor = diretor
        this.duracao = duracao
        this.atores = []
        
    }

    Reproduzir(){
        console.log("Reproduzindo filme")
    }

    Pausar(){
        console.log("Filme pausado")
    }

    Avançar(){
        console.log("Avançar >>>")
    }
    Fechar(){
        console.log("Fechar X")
    }

    ficha(){
        console.log("Título: " + this.titulo)
        /*
        console.log("Ano de lançamento: " + this.ano)
        console.log("Gênero: " + this.genero)
        console.log("Diretor: " + this.diretor)
        console.log("Duração: " + this.duracao)
        console.log("Diretor: " + this.diretor)
        this.Reproduzir()
        */
    }
}

//Criando um novo objeto dentro da classe filme
var vingadores = new Filme("Vingadores - a era de últron", 2014, "ação", "Joss Wedon", 140)
vingadores.ficha()




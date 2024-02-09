class Video{
    constructor(){
        //Quais as características desse video? o que ele tem?
        this.titulo = ''
        this.duracao = ''
        this.tamanho = ''
        this.autor = ''
        this.qualidade = 1080
        this.genero = 'comédia'
    }
    Reproduzir(){
        console.log("Clique para começar o vídeo")
    }
    Pausar(){
        console.log("Pausar vídeo")
    }
    Retroceder(){
        console.log("Voltar 5 segundos")
    }
    Avançar(){
        console.log("Avançar 5 segundos")
    }
    Like(){
        console.log("Gostei!")
    }
    Deslike(){
        console.log("Não gostei!")
    }
    Comentar(){
        console.log("Deixe um comentário:")
    }
}
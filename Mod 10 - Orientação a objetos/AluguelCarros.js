class AlugarCarro{
    constructor(){
        this.cor = "Prata"
        this.modelo = "Jeep compass"
        this.potencia = "185 cv"
        this.combustível = "Diesel"
        this.precodiaria = 500
    }
    //atributos, o que o sistema faz?
    SelecionarModelo(){
        console.log("Escolha um modelo")
    }
    SelecionarCor(){
        console.log("Escolha uma cor para o carro")
    }
    SelecionarCombust(){
        console.log("Escolha o tipo de combustível")
    }
    SelecionarTempo(){
        console.log("Defina por quanto tempo vai precisar do carro")
    }
    SelecionarSeguro(){
        console.log("Escolha a opção de seguro")
    }
    SelecionarLimiteKm(){
        console.log("Escolha um limite de quilômetros para rodar com o carro")
    }
    Pagar(){
        console.log("Pagar o aluguél")
    }
}
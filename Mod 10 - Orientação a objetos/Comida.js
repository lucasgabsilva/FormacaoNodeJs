//Abstração de atributos (o que tem em um) para um sistema de comida em cardápio

class Comida {
    constructor(){
        this.nome = 'Macarrão'
        this.preco = 'R$20,00'
        this.peso = 200
        this.envio = 'R$5,00'
    }
    //métodos
    Reservar(){
        console.log("Reservar esse prato")
    }
    Pedir(){
        console.log("Pedir este prato")
    }
}
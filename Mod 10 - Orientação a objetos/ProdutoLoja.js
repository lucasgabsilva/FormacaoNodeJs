//Abstração de atributos (o que tem em um) para um sistema de produtos de uma loja
class ProdutoLoja {
    constructor(){
        this.preço = 'R$220,00'
        this.peso = 453
        this.imagem = 'img'
        this.frete = 'R$20,00'
        this.recomendações = 'excelente produto, chegou rápido'
        this.cores = 'azul'
        this.estoque = 5
        this.validade = '04/02/2024'
    }
    Comprar(){
        console.log("Comprar agora")
    }
    Carrinho(){
        console.log("Adicionar ao carrinho")
    }
    Devolver(){
        console.log("Não gostei do produto, quero meu dinheiro de volta")
    }
    Pagamento(){
        console.log("Definir opções de pagamento")
    }
}
//Abstração de métodos (o que faz um) para um sistema de produtos de uma loja


/*
Quais os atributos de um sistema desses?

preço 
imagem
frete
recomendações
cores
estoque
*/
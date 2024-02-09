class Table{
    //recebe os dados processados
    constructor(arr){
        this.header = arr[0]//pegamos a primeira linha da tabela
        arr.shift()//remove a primeira linha do array
        this.rows = arr//salva o corpo do array sem o cabeçalho
    }

    get RowCount(){
        return this.rows.length
    }

    get ColumnCount(){
        return this.header.length
    }
}

module.exports = Table
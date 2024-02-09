//classe do leitor do projeto

//importando o sitema de leiteura
const fs = require('fs')

const util = require("util")



class Reader{

    constructor(){
        this.reader = util.promisify(fs.readFile)
    }

    //método responsável pela leitura
    async Read(filepath){
        try {
            return await this.reader(filepath,"utf-8",)
        } catch (err) {
            return undefined
        }
    }
}

//exportando a classe
module.exports = Reader
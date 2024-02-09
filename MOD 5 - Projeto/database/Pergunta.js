const Sequelize = require("sequelize")
const connection = require("./database")

const Pergunta = connection.define('perguntas',{
    titulo:{
        //Cria no banco um campo de título
        type: Sequelize.STRING,
        //impede que o campo fique vazio
        allowNull:false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

//sincroniza os campos de texto com o banco de dados e não força a criação da tabela
Pergunta.sync({force: false}).then(() => {})

module.exports = Pergunta



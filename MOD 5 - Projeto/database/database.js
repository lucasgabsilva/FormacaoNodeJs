const Sequelize = require('sequelize')


//respectivamente, o nome do banco; o usuário; a senha; o local e o tipo de banco que usaremos
const connection = new Sequelize('guiaperguntas', 'root', '123456',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection // Exporta a instância da conexão com o banco de dados para que ela possa ser utilizada em outros arquivos do projeto.
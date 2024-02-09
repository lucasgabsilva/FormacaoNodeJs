//importamos o sequelize
const Sequelize = require("sequelize")

//criamos o objeto de conexão
const connection = new Sequelize('guiapress', 'root', '123456',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
})

//exportando a variável de conexão
module.exports = connection
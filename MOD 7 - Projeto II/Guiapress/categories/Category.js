const Sequelize = require("sequelize")
const connection = require("../database/database")

const Category = connection.define('categories',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },slug: {//define o título das categorias para usar em URL
        type: Sequelize.STRING,
        allowNull:false
    },
})

module.exports = Category
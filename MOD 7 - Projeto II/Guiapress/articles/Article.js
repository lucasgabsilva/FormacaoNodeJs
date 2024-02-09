const Sequelize = require("sequelize")
const connection = require("../database/database")
//importamos o model category para o relacionamento
const Category = require("../categories/Category")

const Article = connection.define('articles',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },slug: {//define o título das categorias para usar em URL
    type: Sequelize.STRING,
    allowNull:false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

//estamos dizendo que uma categoria tem muitos artigos
Category.hasMany(Article)
//estamos dizendo que o artigo pertence a categorias (1 para 1)
Article.belongsTo(Category)

module.exports = Article
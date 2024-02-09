var ejs = require("ejs")

class HtmlParser {
    //recebe a tabela e a converte
    static async Parse(table){
        return await ejs.renderFile("./table.ejs",{header: table.header, rows: table.rows})
    }
}

module.exports = HtmlParser
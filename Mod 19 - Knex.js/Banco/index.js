var database = require("./database")

async function testeTransacao(){
    try{
        await database.transaction(async trans => { 
            await database.insert({nome: "EA Games"}).table("estudios")
            await database.insert({nome: "Pyxerelia"}).table("estudios")
            await database.insert({nome: "Volkswagen"}).table("estudios")
            await database.insert({nome: "Mojang"}).table("estudios")
        })
    }catch(err){
        console.log(err)
    }
}

testeTransacao()


/*
database.select([
    "estudios.nome as estudio_nome",
    "games.nome as game_nome",
    "games.preco"
    ]).table("games_estudios")
    .innerJoin("games","games.id","games_estudios.game_id")
    .innerJoin("estudios","estudios.id","games_estudios.estudio_id",)
    .where("games.id",10)    
    .then(data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })

*/

/*
database.select(["games.*","estudios.nome as estudio_nome"]).table("games").innerJoin("estudios","estudios.game_id","games.id").then(data => {
    var estudiosGamesArray = data
    var game = {
        id: 0,
        nome: "",
        estudios:[]
    }

    game.id = data[0].id
    game.nome = data[0].nome

    //para cada estúdio encontrado
    data.forEach(estudio => {
        game.estudios.push({nome: estudio.estudio_nome})
    })
    console.log(game)
}).catch(err => {
    console.log(err)
})
*/


/*
//queremos um select entre as tabelas games e estudios aos quais tem campos relacionados
//queremos um retorno onde o game_id do estúdio é igual ao id do game
database.select("games.id","estudios.id as estudio_id","games.nome as game_nome", "estudios.nome as games_nome").table("games").innerJoin("estudios","estudios.game_id","games.id").where("games.id",6).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})
*/

/*
database.insert({
    nome: "Firsttouch games",
    game_id: 6
}).table("estudios").then(data => {
    console.log(data)
}).catch( err => {
    console.log(err)
})
*/

/*
//ordenamos os grames por ordem de preço descrescente
database.select().table("games").orderBy("nome","asc").then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})
*/

/*
UPDATE
--------------------------
//desejo mudar o preço de um game com id 5 na tabela games
database.where({id: 5}).update({preco: 40}).table("games").then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})
*/

/*
//quero deletar um game que tenha o ID x dentro da tabela games
database.where({id: 4}).delete().table("games").then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})
*?

/*
database.raw("SELECT * FROM games").then(data => {
    console.log(data)
}).catch( err => {
    console.log(err)
})
*/

/*
WHERE
-------------------------------
database.select()
    .whereRaw("nome = 'The Last Of Us' OR preco > 120")
    .table("games").then( data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
*/

/*
NESTED QUERIES
----------------------------------
database.insert({nome: "The Last Of US",preco: 25}).into("games").then(data => {
    database.select(['nome']).table("games").then( data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
}).catch(err => {
    console.log(err)
})
*/

/*
SELECT
-------------------------------
database.select(['preco']).table("games").then( data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})
*/


/*
INSERT
-----------------------
var dados = [
    {
        nome: "Fifa 21",
        preco: 399.90
    },
    {
        nome: "Dream league soccer",
        preco: 10.00
    },
    {
        nome: "Pubg",
        preco: 99.90
    }
]

database.insert(dados).into("games").then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})
*/


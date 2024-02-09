let app = require("../src/app")
let supertest = require("supertest")
let request = supertest(app)


test ("A aplicação deve estar rodando na porta 3131", async () => {
    //fazemos uma requisição e queremos que a resposta seja 200
    return request.get("/").then(res => expect(res.statusCode).toEqual(200))
    
})

test("Cor", ()=> {
    return request.get("/cor/lucas").then(res => {
        expect(res.body.cor).toEqual("azul")
    }
    )
})
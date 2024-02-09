let app = require("../src/app")
let supertest = require("supertest")
let request = supertest(app)

let mainUser = {name: "Lucas Silva", email: "lucas@guia.com", password: "123456"}

beforeAll(() => {
    return request.post("/user")
    .send(mainUser)
    then(res => {

    }).catch(err => {
        console.log(err)
    })
})

afterAll(() => {
    return request.delete("/remove/" + mainUser.email)
    .then(res => {})
    .catch(err => {
        console.log(err)
    })
})

//categoria de cadastro minimzada, clicar para vizualizar
describe("Cadastro de usuário", () => {
    test("Deve cadastrar um usuário com sucesso", () => {
        //pegamos a data atual
        let time = Date.now()
        //geramos um email com a data atual concatenado a um email
        let email = `${time}@gmail.com`
        let user = {name: "Lucas", email, password: "123456"}

        //faz uma requisição post para a rota user assim como fizemos manualmente no postman
        return request.post("/user")
        .send(user)
        .then(res => {
            // testa se o status code é 200 
            //testa se o email que recebemos no retorno é igual ao da requisição
            expect(res.statusCode).toEqual(200)
            expect(res.body.email).toEqual(email)
        }).catch(err => {
            console.log(err)
        })
    })

    test("Deve impedir que dados vazios sejam cadastrados no banco",() => {

        let user = {name: "", email: "",password: ""}

        return request.post("/user")
        .send(user)
        .then(res => {
            expect(res.statusCode).toEqual(400)
        }).catch(err => {
            console.log(err)
        })
    })
    test("Deve impedir emails repetidos", () => {
        let time = Date.now()
        let email = `${time}@gmail.com`
        let user = {name: "Lucas", email, password: "123456"}

        return request.post("/user")
        .send(user)
        .then(res => {
            expect(res.statusCode).toEqual(200)
            expect(res.body.email).toEqual(email)

            return request.post("/user")
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400)
                expect(res.body.error).toEqual("E-mail já cadastrado.")
            }).catch( err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    })
})

describe("Autenticação", () => {
    test("Deve retornar o token quando fizer login", () => {
        return request.post("/auth")
        .send({email: mainUser.email, password: mainUser.password})
        .then(res => {
            expect(res.statusCode).toEqual(200)
            expect(res.body.token).toBeDefined()
        }).catch(err => {
            console.log(err)
        })
    })

    test("Deve impedir login se um usuário não cadastrado", () => {
        return request.post("/auth")
        .send({email: "umemailqualquer@gmail.com", password: "ewafwewf"})
        .then(res => {
            expect(res.statusCode).toEqual(403)
            expect(res.body.errors.email).toEqual("E-mail não cadastrado")
        }).catch(err => {
            console.log(err)
        })
    })

    test("Deve impedir o login com senha incorreta", () => {
        return request.post("/auth")
        .send({email: mainUser.email, password: "ewafwewf"})
        .then(res => {
            expect(res.statusCode).toEqual(403)
            expect(res.body.errors.password).toEqual("Senha incorreta.")
        }).catch(err => {
            console.log(err)
        })
    })
})
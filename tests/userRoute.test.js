const supertest = require('supertest');
const app = require("../index");


describe("User Route", () => {

    it("POST /register works", async () => {
        const userToAdd = {
            "first_name": "Bart",
            "last_name": "Simpson",
            "email": "badBart@gmail.com",
            "password": "1234",
            "username": "badBart"
        }
        const response = await supertest(app).post("/api/auth/register").send(userToAdd);
        expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
        expect(response.status).tobe(201);
        expect(response.body.first_name).toStrictEqual("Bart");
        expect(response.body.last_name).toStrictEqual("Simpson");
        expect(response.body.email).toStrictEqual("badBart@gmail.com");
        expect(response.body.password).toStrictEqual("1234");
        expect(response.body.username).toStrictEqual("badBart");
    })

    it("POST /login works", async () => {
        const userToLogin = {
            "email": "badBart@gmail.com",
            "password": "1234",
        }
        const response = await supertest(app).post("/api/auth/register").send(userToLogin);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(response.status).toBe(201);
        expect(response.body.first_name).toBe("Bart");
        expect(response.body.last_name).toBe("Simpson");
        expect(response.body.email).toBe("badBart@gmail.com");
        expect(response.body.password).toBe("1234");
        expect(response.body.username).toBe("badBart");
    })
})
const supertest = require('supertest');
const app = require("../index");


describe("Auth Route", () => {

    it("POST /register works", async () => {
        const userToAdd = {
            "first_name": "Bart",
            "last_name": "Simpson",
            "email": "badBart@gmail.com",
            "password": "1234",
            "username": "badBart"
        }
        const response = await supertest(app).post("/api/auth/register").send(userToAdd);
        expect(response.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(response.status).toBe(201);
        expect(response.body.first_name).toEqual("Bart");
        expect(response.body.last_name).toEqual("Simpson");
        expect(response.body.email).toEqual("badBart@gmail.com");
        expect(response.body.password).toEqual("1234");
        expect(response.body.username).toEqual("badBart");
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
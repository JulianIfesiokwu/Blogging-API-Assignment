const supertest = require('supertest');
const User = require("../models/User")
const { connect } = require("./database");

const app = require("../index");

describe("auth route", () => {
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it("should signup a user", async () => {
        const userToAdd = {
            "first_name": "Bart",
            "last_name": "Simpson",
            "email": "badBart@gmail.com",
            "password": "1234",
        }
        const response = await supertest(app)
            .post("/api/auth/register")
            .set("content-type", "application/json")
            .send(userToAdd)

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("msg","User successfully created");
        expect(response.body).toHaveProperty("User", {"first_name": "Bart",
            "last_name": "Simpson",
            "email": "badBart@gmail.com",
            "password": "1234",
        });
    })

    it("should login a user", async () => {
        // create user in db
        const userToLogin = await User.create({
            first_name: 'Bart',
            last_name: 'Simpson',
            email: 'badBart@gmail.com',
            password: 'badBart'
        });

        // login user
        const response = await supertest(app)
        .post("/api/auth/login")
        .set('content-type', 'application/json')
        .send({
            email: 'badBart@gmail.com',
            password: 'badBart' 
        });
        
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty("msg", "User logged in");
        expect(response.body).toHaveProperty("token", token);
        }
    );
});

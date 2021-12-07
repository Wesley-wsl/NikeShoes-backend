import request from "supertest";

import app from "../server";

describe("createNewUser", () => {
    test("return 400 if first_name is not provided", async () => {
        const sut = request(app);
        const result = await sut.post("/users").send({
            last_name: "Victor'",
            email: "rodrigovictor@gmail.com",
            password: "1234",
            admin: false,
        });
        expect(result.body.error).toEqual("first_name is required");
        expect(result.statusCode).toBe(400);
    });

    test("return 400 if last_name is not provided", async () => {
        const sut = request(app);
        const result = await sut.post("/users").send({
            first_name: "Rodrigo",
            email: "rodrigovictor@gmail.com",
            password: "1234",
            admin: false,
        });
        expect(result.body.error).toEqual("last_name is required");
        expect(result.statusCode).toBe(400);
    });

    test("return 400 if password is not provided", async () => {
        const sut = request(app);
        const result = await sut.post("/users").send({
            first_name: "Rodrigo",
            last_name: "Victor'",
            email: "rodrigovictor@gmail.com",
            admin: false,
        });
        expect(result.body.error).toEqual("password is required");
        expect(result.statusCode).toBe(400);
    });

    test("return 400 if email is not provided", async () => {
        const sut = request(app);
        const result = await sut.post("/users").send({
            first_name: "Rodrigo",
            last_name: "Victor'",
            password: "1234",
            admin: false,
        });
        expect(result.body.error).toEqual("email is required");
        expect(result.statusCode).toBe(400);
    });

    test("should be able create a new user", async () => {
        const sut = request(app);
        const result = await sut.post("/users").send({
            first_name: "Rodrigo",
            last_name: "Victor'",
            email: "rodrigovictor@gmail.com",
            password: "1234",
            admin: false,
        });
        expect(result.body.newUserCreated).toHaveProperty("_id");
        expect(result.statusCode).toBe(201);
    });

    test("Cannot create a user with an existing email ", async () => {
        const sut = request(app);
        const result = await sut.post("/users").send({
            first_name: "Rodrigo",
            last_name: "Victor'",
            email: "rodrigovictor@gmail.com",
            password: "1234",
            admin: false,
        });
        expect(result.body.error).toEqual("User already registered");
        expect(result.statusCode).toBe(400);
    });
});

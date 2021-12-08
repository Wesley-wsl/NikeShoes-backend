import request from "supertest";

import UserModel from "../api/models/UserModel";
import app from "../server";
import { connect, disconnect } from "./helpers/database";

describe("createNewUser", () => {
    jest.setTimeout(20000);

    beforeAll(() => connect());

    afterAll(() => disconnect());

    afterEach(() => UserModel.deleteMany({}));

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

        await sut.post("/users").send({
            first_name: "Rodrigo",
            last_name: "Victor'",
            email: "rodrigovictor@gmail.com",
            password: "1234",
            admin: false,
        });

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

describe("Login", () => {
    jest.setTimeout(20000);

    beforeAll(() => connect());

    afterAll(() => disconnect());

    afterEach(() => UserModel.deleteMany({}));

    test("should return error if email is incorrect", async () => {
        const sut = request(app);

        await sut.post("/users").send({
            first_name: "Rodrigo",
            last_name: "Victor'",
            email: "rodrigovictor@gmail.com",
            password: "1234",
            admin: false,
        });

        const result = await sut.post("/users/login").send({
            email: "test@gmail.com",
            password: "1234",
        });

        expect(result.body).toHaveProperty("error");
        expect(result.body.error).toEqual("Email/Password incorrect");
        expect(result.statusCode).toBe(400);
    });

    test("should return error if password is incorrect", async () => {
        const sut = request(app);

        await sut.post("/users").send({
            first_name: "Rodrigo",
            last_name: "Victor'",
            email: "rodrigovictor@gmail.com",
            password: "1234",
            admin: false,
        });

        const result = await sut.post("/users/login").send({
            email: "rodrigo@gmail.com",
            password: "test",
        });

        expect(result.body).toHaveProperty("error");
        expect(result.body.error).toEqual("Email/Password incorrect");
        expect(result.statusCode).toBe(400);
    });

    test("should return error if email is not provided", async () => {
        const sut = request(app);

        const result = await sut.post("/users/login").send({
            password: "1234",
        });

        expect(result.body).toHaveProperty("error");
        expect(result.body.error).toEqual("Email/Password incorrect");
        expect(result.statusCode).toBe(400);
    });

    test("should return error if password is not provided", async () => {
        const sut = request(app);

        const result = await sut.post("/users/login").send({
            email: "rodrigo@gmail.com",
        });

        expect(result.body).toHaveProperty("error");
        expect(result.body.error).toEqual("Email/Password incorrect");
        expect(result.statusCode).toBe(400);
    });

    test("should authenticate user", async () => {
        const sut = request(app);

        await sut.post("/users").send({
            first_name: "Rodrigo",
            last_name: "Victor'",
            email: "rodrigovictor@gmail.com",
            password: "1234",
            admin: false,
        });

        const result = await sut.post("/users/login").send({
            email: "rodrigovictor@gmail.com",
            password: "1234",
        });

        expect(result.statusCode).toBe(200);
    });
});

// describe("deleteUserById", () => {
//     test("", () => {});
// });

// describe("listUsers", () => {
//     test("", () => {});
// });

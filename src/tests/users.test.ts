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
    });
});

import request from "supertest";

import ProductModel from "../api/models/ProductModel";
import UserModel from "../api/models/UserModel";
import { app } from "../server";
import { connect, disconnect } from "./helpers/database";

describe("Cart", () => {
    jest.setTimeout(20000);

    beforeAll(() => connect());

    afterAll(() => disconnect());

    afterEach(() => ProductModel.deleteMany({}));
    afterEach(() => UserModel.deleteMany({}));

    test("should add product in your cart", async () => {
        const sut = request(app);

        await sut.post("/users").send({
            first_name: "Teste",
            last_name: "Teste",
            email: "admin@gmail.com",
            password: "1234",
            admin: true,
        });

        const token = await sut.post("/users/login").send({
            email: "admin@gmail.com",
            password: "1234",
        });

        const product = await sut
            .post("/products")
            .set("Authorization", `Bearer ${token.body}`)
            .send({
                name: "TênisNike",
                description: "TênisNike",
                product_image: "randomimage",
                category: "Man",
                price: 100,
            });

        const result = await sut
            .post(`/cart/${product.body.newProductCreated._id}`)
            .set("Authorization", `Bearer ${token.body}`);

        expect(result.statusCode).toBe(200);
        expect(result.body).toHaveProperty("productAdded");
        expect(result.body.success).toEqual(true);
    });
});

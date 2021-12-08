import request from "supertest";

import ProductModel from "../api/models/ProductModel";
import { app } from "../server";
import { connect, disconnect } from "./helpers/database";

describe("createNewProduct", () => {
    jest.setTimeout(20000);

    beforeAll(() => connect());

    afterAll(() => disconnect());

    afterEach(() => ProductModel.deleteMany({}));

    test("should be admin to create new product", async () => {
        const sut = request(app);

        await sut.post("/users").send({
            first_name: "Admin",
            last_name: "Admin",
            email: "admin@gmail.com",
            password: "1234",
            admin: false,
        });

        const token = await sut.post("/users/login").send({
            email: "admin@gmail.com",
            password: "1234",
        });

        const result = await sut
            .post("/products")
            .set("Authorization", `Bearer ${token.body}`)
            .send({
                name: "TênisNike",
                description: "TênisNike",
                product_image: "randomimage",
                category: "Man",
                price: 100,
            });

        expect(result.statusCode).toBe(401);
    });

    test("should be create a new product", async () => {
        const sut = request(app);

        await sut.post("/users").send({
            first_name: "Admin",
            last_name: "Admin'",
            email: "adm@gmail.com",
            password: "1234",
            admin: true,
        });

        const token = await sut.post("/users/login").send({
            email: "adm@gmail.com",
            password: "1234",
        });

        const result = await sut
            .post("/products")
            .set("Authorization", `Bearer ${token.body}`)
            .send({
                name: "TênisNike",
                description: "TênisNike",
                product_image: "randomimage",
                category: "Man",
                price: 100,
            });

        expect(result.body).toHaveProperty("newProductCreated");
        expect(result.statusCode).toBe(201);
        expect(result.body.success).toEqual(true);
    });
});

describe("listProducts", () => {
    jest.setTimeout(20000);

    beforeAll(() => connect());

    afterAll(() => disconnect());

    afterEach(() => ProductModel.deleteMany({}));

    test("should list all products", async () => {
        const sut = request(app);

        const result = await sut.get("/products");

        expect(result.body).toHaveProperty("listProducts");
        expect(result.statusCode).toBe(200);
        expect(result.body.success).toEqual(true);
    });

    test("should list product by id", async () => {
        const sut = request(app);

        await sut.post("/users").send({
            first_name: "Admin",
            last_name: "Admin'",
            email: "adm@gmail.com",
            password: "1234",
            admin: true,
        });

        const token = await sut.post("/users/login").send({
            email: "adm@gmail.com",
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

        const result = await sut.get(
            `/products/${product.body.newProductCreated._id}`,
        );

        expect(result.body).toHaveProperty("product");
        expect(result.statusCode).toBe(200);
        expect(result.body.success).toEqual(true);
    });
});

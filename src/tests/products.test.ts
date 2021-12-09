import request from "supertest";

import ProductModel from "../api/models/ProductModel";
import UserModel from "../api/models/UserModel";
import { app } from "../server";
import { connect, disconnect } from "./helpers/database";

describe("createNewProduct", () => {
    jest.setTimeout(20000);

    beforeAll(() => connect());

    afterAll(() => disconnect());

    afterEach(() => ProductModel.deleteMany({}));
    afterEach(() => UserModel.deleteMany({}));

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

describe("Delete product", () => {
    jest.setTimeout(20000);

    beforeAll(() => connect());

    afterAll(() => disconnect());

    afterEach(() => ProductModel.deleteMany({}));

    test("should delete product by id", async () => {
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

        const result = await sut
            .delete(`/products/${product.body.newProductCreated._id}`)
            .set("Authorization", `Bearer ${token.body}`);

        expect(result.body).toHaveProperty("productDeleted");
        expect(result.statusCode).toBe(200);
        expect(result.body.success).toEqual(true);
    });
});

describe("Update product", () => {
    jest.setTimeout(20000);

    beforeAll(() => connect());

    afterAll(() => disconnect());

    afterEach(() => ProductModel.deleteMany({}));

    test("should update product by id", async () => {
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

        const result = await sut
            .put(`/products/${product.body.newProductCreated._id}`)
            .set("Authorization", `Bearer ${token.body}`)
            .send({
                name: "Niike",
                description: "TênisNike",
                product_image: "randomimage",
                category: "Man",
                price: 100,
            });

        expect(result.body).toHaveProperty("productEdited");
        expect(result.statusCode).toBe(200);
        expect(result.body.success).toEqual(true);
    });
});

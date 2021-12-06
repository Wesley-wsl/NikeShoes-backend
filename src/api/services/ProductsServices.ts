import { ICategory, IId, IProducts } from "../@types";
import ProductModel from "../models/ProductModel";

export default {
    async createNewProduct({
        name,
        description,
        product_image,
        category,
        price,
    }: IProducts) {
        const ProductExists = await ProductModel.findOne({
            name,
            description,
            category,
        });

        if (ProductExists) throw new Error("Product already exists.");

        const newProductCreated = await ProductModel.create({
            name,
            description,
            product_image,
            category,
            price,
        });

        return newProductCreated;
    },

    async listProducts({ category }: ICategory) {
        if (category === "Man") {
            const productMan = await ProductModel.find({ category: "Man" });
            return productMan;
        }
        if (category === "Woman") {
            const productWoman = await ProductModel.find({ category: "Woman" });
            return productWoman;
        }

        const productList = await ProductModel.find();

        return productList;
    },

    async findProductById({ id }: IId) {
        const product = await ProductModel.findById({ _id: id });

        return product;
    },

    async editProductById({
        id,
        name,
        description,
        product_image,
        category,
        price,
    }: IProducts) {
        const product = await ProductModel.findByIdAndUpdate(
            { _id: id },
            {
                name,
                description,
                product_image,
                category,
                price,
            },
        );

        return product;
    },

    async deleteProductById({ id }: IId) {
        const productDeleted = await ProductModel.findByIdAndDelete({
            _id: id,
        });

        return productDeleted;
    },
};

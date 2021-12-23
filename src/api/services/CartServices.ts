import { IEditProduct, IId, IUserId } from "../@types";
import CartModel from "../models/CartModel";
import ProductModel from "../models/ProductModel";

export default {
    async addProductInCart({ userId, id }: IId) {
        const findProduct = await ProductModel.findById({ _id: id });

        if (!findProduct) throw new Error("Product don't exists");

        const productInCart = await CartModel.findOne({
            productId: id,
            userId: userId,
        });

        if (productInCart) throw new Error("Product already add in your cart");

        const productAddInCart = await CartModel.create({
            userId: userId,
            productId: id,
        });

        return productAddInCart;
    },

    async listUserCart({ userId }: IUserId) {
        const userCart = await CartModel.find({ userId: userId }).populate({
            path: "productId",
        });

        return userCart;
    },

    async removeProductFromCart({ userId, id }: IId) {
        const findProduct = await ProductModel.findById({ _id: id });

        if (!findProduct) throw new Error("Product don't exists");

        const productInCart = await CartModel.findOne({
            productId: id,
            userId: userId,
        });

        if (!productInCart)
            throw new Error("Product don't exists in your cart");

        const productDeleted = await CartModel.deleteOne({
            productId: id,
            userId: userId,
        });

        return productDeleted;
    },

    async editQuantity({ id, userId, quantity }: IEditProduct) {
        const findProduct = await ProductModel.findById({ _id: id });

        if (!findProduct) throw new Error("Product don't exists");

        const productInCart = await CartModel.findOne({
            productId: id,
            userId: userId,
        });

        if (!productInCart)
            throw new Error("Product don't exists in your cart");

        const quantityUpdated = await CartModel.findOneAndUpdate(
            {
                productId: id,
                userId: userId,
            },
            {
                quantity,
            },
        );

        return quantityUpdated;
    },
};

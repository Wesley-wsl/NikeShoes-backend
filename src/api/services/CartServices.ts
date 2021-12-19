import { IId } from "../@types";
import ProductModel from "../models/ProductModel";
import UserModel from "../models/UserModel";

export default {
    async addProductInCart({ userId, id }: IId) {
        const findProduct = await ProductModel.findById({ _id: id });

        if (!findProduct) throw new Error("Product don't exists");

        const findUser = await UserModel.findById({ _id: userId });
        const productInCart = findUser.cart.some(
            (product: { _id: string }) => product._id == id,
        );

        if (productInCart) throw new Error("Product already add in your cart");

        findUser.cart.push(id);
        findUser.save();

        return findProduct;
    },

    async removeProductFromCart({ userId, id }: IId) {
        const findProduct = await ProductModel.findById({ _id: id });

        if (!findProduct) throw new Error("Product don't exists");

        const findUser = await UserModel.findById({ _id: userId });

        findUser.cart.forEach((element: string, index: number) => {
            if (element == id) return findUser.cart.splice(index, 1);
        });
        findUser.save();

        return findProduct;
    },
};

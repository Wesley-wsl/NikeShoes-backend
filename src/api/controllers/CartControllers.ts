import { Request, Response } from "express";

import CartServices from "../services/CartServices";

export default {
    async addProductInCart(request: Request, response: Response) {
        const { id } = request.params;
        const userId = request?.res?.locals?.userId;

        const productAdded = await CartServices.addProductInCart({
            userId,
            id,
        });

        return response.status(200).json({
            success: true,
            productAdded,
        });
    },

    async listUserCart(request: Request, response: Response) {
        const userId = request?.res?.locals?.userId;

        const cartUser = await CartServices.listUserCart({ userId });

        return response.status(200).json({
            success: true,
            cartUser,
        });
    },

    async removeProductFromCart(request: Request, response: Response) {
        const { id } = request.params;
        const userId = request?.res?.locals?.userId;

        const productRemoved = await CartServices.removeProductFromCart({
            userId,
            id,
        });

        return response.status(200).json({
            success: true,
            productRemoved,
        });
    },

    async editQuantity(request: Request, response: Response) {
        const { id } = request.params;
        const { quantity } = request.body;
        const userId = request?.res?.locals?.userId;

        const productEdit = await CartServices.editQuantity({
            id,
            userId,
            quantity,
        });

        return response.status(200).json({
            success: true,
            productEdit,
        });
    },
};

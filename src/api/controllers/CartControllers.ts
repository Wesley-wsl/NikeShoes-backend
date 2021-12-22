import { NextFunction, Request, Response } from "express";

import CartServices from "../services/CartServices";

export default {
    async addProductInCart(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = request.params;
            const { userId }: any = request?.res?.locals;

            const productAdded = await CartServices.addProductInCart({
                userId,
                id,
            });

            return response.status(200).json({
                success: true,
                productAdded,
            });
        } catch (err) {
            next(err);
        }
    },

    async listUserCart(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        try {
            const { userId }: any = request?.res?.locals;

            const cartUser = await CartServices.listUserCart({ userId });

            return response.status(200).json({
                success: true,
                cartUser,
            });
        } catch (err) {
            next(err);
        }
    },

    async removeProductFromCart(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = request.params;
            const { userId }: any = request?.res?.locals;

            const productRemoved = await CartServices.removeProductFromCart({
                userId,
                id,
            });

            return response.status(200).json({
                success: true,
                productRemoved,
            });
        } catch (err) {
            next(err);
        }
    },

    async editQuantity(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = request.params;
            const { quantity } = request.body;
            const { userId }: any = request?.res?.locals;

            const productEdit = await CartServices.editQuantity({
                id,
                userId,
                quantity,
            });

            return response.status(200).json({
                success: true,
                productEdit,
            });
        } catch (err) {
            next(err);
        }
    },
};

import { NextFunction, Request, Response } from "express";

import { ICategory } from "../@types";
import ProductsServices from "../services/ProductsServices";

export default {
    async createNewProduct(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        try {
            const { name, description, product_image, category, price } =
                request.body;

            const newProductCreated = await ProductsServices.createNewProduct({
                name,
                description,
                product_image,
                category,
                price,
            });

            return response.status(201).json({
                success: true,
                newProductCreated,
            });
        } catch (err) {
            next(err);
        }
    },

    async listProducts(request: Request, response: Response) {
        const { category }: ICategory = request.query;
        const listProducts = await ProductsServices.listProducts({ category });

        return response.status(200).json({
            success: true,
            listProducts,
        });
    },

    async findProductById(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = request.params;

            const product = await ProductsServices.findProductById({ id });

            return response.status(200).json({
                success: true,
                product,
            });
        } catch (err) {
            next(err);
        }
    },

    async editProductById(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        try {
            const { name, description, product_image, category, price } =
                request.body;
            const { id } = request.params;

            const productEdited = await ProductsServices.editProductById({
                id,
                name,
                description,
                product_image,
                category,
                price,
            });

            return response.status(200).json({
                success: true,
                productEdited,
            });
        } catch (err) {
            next(err);
        }
    },

    async deleteProductById(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = request.params;

            const productDeleted = await ProductsServices.deleteProductById({
                id,
            });

            return response.status(200).json({
                success: true,
                productDeleted,
            });
        } catch (err) {
            next(err);
        }
    },
};

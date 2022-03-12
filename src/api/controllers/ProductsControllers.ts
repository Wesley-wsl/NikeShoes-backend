import { Request, Response } from "express";

import { ICategory } from "../@types";
import ProductsServices from "../services/ProductsServices";

export default {
    async createNewProduct(request: Request, response: Response) {
        const { name, description, product_image, category, price, video_url } =
            request.body;

        const newProductCreated = await ProductsServices.createNewProduct({
            name,
            description,
            product_image,
            category,
            price,
            video_url,
        });

        return response.status(201).json({
            success: true,
            newProductCreated,
        });
    },

    async listProducts(request: Request, response: Response) {
        const { category }: ICategory = request.query;
        const listProducts = await ProductsServices.listProducts({ category });

        return response.status(200).json({
            success: true,
            listProducts,
        });
    },

    async findProductById(request: Request, response: Response) {
        const { id } = request.params;

        const product = await ProductsServices.findProductById({ id });

        return response.status(200).json({
            success: true,
            product,
        });
    },

    async editProductById(request: Request, response: Response) {
        const { name, description, product_image, category, price, video_url } =
            request.body;
        const { id } = request.params;

        const productEdited = await ProductsServices.editProductById({
            id,
            name,
            description,
            product_image,
            category,
            price,
            video_url,
        });

        return response.status(200).json({
            success: true,
            productEdited,
        });
    },

    async deleteProductById(request: Request, response: Response) {
        const { id } = request.params;

        const productDeleted = await ProductsServices.deleteProductById({
            id,
        });

        return response.status(200).json({
            success: true,
            productDeleted,
        });
    },
};

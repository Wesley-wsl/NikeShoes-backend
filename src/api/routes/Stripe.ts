import dotenv from "dotenv";
import express, { Request, Response } from "express";

import { IPriceDate, IProductsStripe } from "../@types";
import { ensureAuthenticated } from "../middlewares";
import CartModel from "../models/CartModel";

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const routes = express.Router();

routes.post("/", ensureAuthenticated, async (req: Request, res: Response) => {
    const { userId }: any = req?.res?.locals;

    const products: IProductsStripe[] = [];

    const userCart = await CartModel.find({ userId: userId }).populate({
        path: "productId",
    });

    userCart.forEach(
        (element: { productId: IProductsStripe[]; quantity: number }) => {
            element.productId[0].quantity = element.quantity;
            products.push(element.productId[0]);
        },
    );

    const items: IPriceDate[] = [];

    products.forEach(product => {
        items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    images: [product.product_image],
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity,
        });
    });

    if (items.length === 0) {
        return res.status(400).json({
            success: false,
            error: "Don't exists products",
        });
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [...items],
        mode: "payment",
        success_url: `http://localhost:3000/`,
        cancel_url: `http://localhost:3000/cart`,
    });

    res.json({ url: session.url });
});

export { routes as Stripe };

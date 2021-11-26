import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const routes = express.Router();

routes.post("/", async (req: Request, res: Response) => {
    const { product } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: product.amount * 100,
                },
                quantity: product.quantity,
            },
        ],
        mode: "payment",
        success_url: `http://localhost:3333/success.html`,
        cancel_url: `http://localhost:3333/cancel.html`,
    });

    res.json({ url: session.url });
});

export { routes as Stripe };

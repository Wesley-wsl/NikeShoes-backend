import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import { CartRoutes, ProductRoutes, Stripe, UserRoutes } from "./api/routes";

import "express-async-errors";
import "./config/dbConfig";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);
app.use("/cart", CartRoutes);
app.use("/payment", Stripe);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }

    return res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
});

const server = app.listen(3333, () =>
    console.log("Server is running in port 3333."),
);

export { app, server };

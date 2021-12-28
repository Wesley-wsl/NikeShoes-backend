import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { CartRoutes, ProductRoutes, Stripe, UserRoutes } from "./api/routes";
import swaggerJSON from "./config/swagger/index.json";

import "express-async-errors";
import "./config/dbConfig";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSON));
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

const server = app.listen(PORT, () =>
    console.log(`Server is running in port ${PORT}.`),
);

export { app, server };

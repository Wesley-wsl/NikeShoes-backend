import "express-async-errors";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { handleError } from "./api/middlewares/handleError";
import { CartRoutes, ProductRoutes, Stripe, UserRoutes } from "./api/routes";
import swaggerJSON from "./config/swagger/index.json";

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

app.use(handleError);

const server = app.listen(PORT, () =>
    console.log(`Server is running in port ${PORT}.`),
);

export { app, server };

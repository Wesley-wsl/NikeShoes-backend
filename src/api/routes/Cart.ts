import express from "express";

import CartControllers from "../controllers/CartControllers";
import { ensureAuthenticated, isValidId } from "../middlewares";

const routes = express.Router();

routes.post(
    "/:id",
    isValidId,
    ensureAuthenticated,
    CartControllers.addProductInCart,
);

routes.delete(
    "/:id",
    isValidId,
    ensureAuthenticated,
    CartControllers.removeProductFromCart,
);

export { routes as CartRoutes };

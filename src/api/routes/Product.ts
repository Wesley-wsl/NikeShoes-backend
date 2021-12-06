import express from "express";

import ProductsControllers from "../controllers/ProductsControllers";
import { ensureAdmin, ensureAuthenticated, isValidId } from "../middlewares";

const routes = express.Router();

routes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    ProductsControllers.createNewProduct,
);
routes.get("/", ProductsControllers.listProducts);
routes.get("/:id", isValidId, ProductsControllers.findProductById);
routes.delete(
    "/:id",
    isValidId,
    ensureAuthenticated,
    ensureAdmin,
    ProductsControllers.deleteProductById,
);
routes.put(
    "/:id",
    isValidId,
    ensureAuthenticated,
    ensureAdmin,
    ProductsControllers.editProductById,
);

export { routes as ProductRoutes };

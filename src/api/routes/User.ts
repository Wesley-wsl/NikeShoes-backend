import express from "express";

import AuthenticateUserController from "../controllers/AuthenticateUserController";
import UserControllers from "../controllers/UserControllers";
import { ensureAdmin, ensureAuthenticated, isValidId } from "../middlewares";

const routes = express.Router();

routes.post("/", UserControllers.createNewUser);
routes.post("/login", AuthenticateUserController.handle);
routes.delete(
    "/:id",
    ensureAuthenticated,
    ensureAdmin,
    isValidId,
    UserControllers.deleteUserById,
);
routes.get("/", ensureAuthenticated, UserControllers.listUsers);

export { routes as UserRoutes };

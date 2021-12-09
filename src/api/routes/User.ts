import express from "express";
import { body } from "express-validator";

import AuthenticateUserController from "../controllers/AuthenticateUserController";
import UserControllers from "../controllers/UserControllers";
import { ensureAdmin, ensureAuthenticated, isValidId } from "../middlewares";

const routes = express.Router();

routes.post(
    "/",
    [
        body("email").isEmail().withMessage("email invalid"),
        body("password")
            .isLength({ min: 4 })
            .withMessage("password must be at least 4 characters "),
    ],
    UserControllers.createNewUser,
);
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

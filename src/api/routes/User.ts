import express from "express";
import { body } from "express-validator";

import AuthenticateUserController from "../controllers/AuthenticateUserController";
import UserControllers from "../controllers/UserControllers";
import { ensureAuthenticated, isValidId } from "../middlewares";

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
    isValidId,
    UserControllers.deleteUserById,
);
routes.get("/", ensureAuthenticated, UserControllers.listUsers);
routes.get("/validjwt/:token", UserControllers.jwtValid);
routes.get("/:id", isValidId, UserControllers.findUserById);

export { routes as UserRoutes };

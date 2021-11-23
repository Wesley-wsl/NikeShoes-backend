import express, { Request, Response } from "express";
import AuthenticateUserController from "../controllers/AuthenticateUserController";
import UserControllers from "../controllers/UserControllers";

const routes = express.Router();

routes.post("/", UserControllers.createNewUser);
routes.post("/login", AuthenticateUserController.handle);
routes.delete("/:id", UserControllers.deleteUserById);

export { routes as UserRoutes };

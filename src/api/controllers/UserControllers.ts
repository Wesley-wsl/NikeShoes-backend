import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import UserServices from "../services/UserServices";

export default {
    async createNewUser(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        try {
            const {
                first_name,
                last_name,
                email,
                password,
                admin = false,
            } = request.body;

            const requiredFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ];
            for (const field of requiredFields) {
                if (!request.body[field])
                    throw new Error(`${field} is required`);
            }

            const errors = validationResult(request);
            if (!errors.isEmpty()) throw new Error(errors.array()[0].msg);

            const newUserCreated = await UserServices.createNewUser({
                first_name,
                last_name,
                email,
                password,
                admin,
            });

            return response.status(201).json({
                success: true,
                newUserCreated: newUserCreated,
            });
        } catch (err) {
            next(err);
        }
    },

    async deleteUserById(request: Request, response: Response) {
        const { id } = request.params;

        const userDeleted = await UserServices.deleteUserById({ id });

        return response.status(200).json({
            success: true,
            userDeleted,
        });
    },

    async listUsers(request: Request, response: Response) {
        const users = await UserServices.listUsers();

        return response.status(200).json({
            success: true,
            users,
        });
    },
};

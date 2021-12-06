import { NextFunction, Request, Response } from "express";

import AuthenticateUserService from "../services/AuthenticateUserService";

export default {
    async handle(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, password } = request.body;

            const token = await AuthenticateUserService.execute({
                email,
                password,
            });

            return response.json(token);
        } catch (err) {
            next(err);
        }
    },
};

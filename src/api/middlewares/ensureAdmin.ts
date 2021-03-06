import { Request, Response, NextFunction } from "express";

import UserModel from "../models/UserModel";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const userId = request?.res?.locals?.userId;

    const { admin } = await UserModel.findById({ _id: userId });

    if (admin) return next();

    return response.status(401).json({
        error: "Unauthorized",
    });
}

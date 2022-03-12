/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

export function handleError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (err instanceof Error) {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }

    return res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
}

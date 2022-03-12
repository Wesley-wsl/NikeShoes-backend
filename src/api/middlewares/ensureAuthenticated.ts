import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    const decoded = verify(token, `${process.env.SECRET}`);
    response.locals.userId = decoded.sub;
    return next();
}

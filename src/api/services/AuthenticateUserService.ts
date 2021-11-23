import { compare } from "bcryptjs";
import { IAuthenticateRequest } from "../@types";
import UserModel from "../models/UserModel";
import { sign } from "jsonwebtoken";

export default {
    async execute({ email, password }: IAuthenticateRequest) {
        const user = await UserModel.findOne({ email });

        if (!user) throw new Error("Email/Password incorrect");

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) throw new Error("Email/Password incorrect");

        const token = sign(
            {
                email: user.email,
            },
            `${process.env.SECRET}`,
            {
                subject: user.email,
                expiresIn: "1d",
            }
        );

        return token;
    },
};

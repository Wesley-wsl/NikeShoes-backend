import { hash } from "bcryptjs";

import { IId, IUser } from "../@types";
import UserModel from "../models/UserModel";

export default {
    async createNewUser({
        first_name,
        last_name,
        email,
        password,
        admin,
    }: IUser) {
        const userExists = await UserModel.findOne({ email });

        if (userExists) throw new Error("User already registered");

        const passwordHash = await hash(password as string, 8);

        const createUser = await UserModel.create({
            first_name,
            last_name,
            email,
            password: passwordHash,
            admin,
        });

        return createUser;
    },

    async deleteUserById({ id }: IId) {
        const userDeleted = await UserModel.findByIdAndDelete({ _id: id });

        return userDeleted;
    },

    async listUsers() {
        const users = await UserModel.find({}).populate({ path: "cart" });
        return users;
    },
};

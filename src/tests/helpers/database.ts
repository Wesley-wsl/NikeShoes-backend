import dotenv from "dotenv";
import mongoose from "mongoose";

import { server } from "../../server";
dotenv.config();

export const connect = async (): Promise<void> => {
    await mongoose.connection.close();
    const uri =
        process.env.NODE_ENV == "test"
            ? process.env.DB_TEST
            : process.env.MONGODB_URI;

    if (!uri) {
        throw new Error("MongoDB servernot initialized");
    }

    await mongoose.connect(uri);
};

export const disconnect = async (): Promise<void> => {
    await mongoose.connection.close();
    server.close();
};

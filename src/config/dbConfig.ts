import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : " .env",
});

const dbConfig = `${process.env.MONGODB_URI}`;

const connection = mongoose.connect(dbConfig);

export default connection;

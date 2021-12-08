import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbConfig = `${process.env.MONGODB_URI}`;
const dbTest = `${process.env.DB_TEST}`;

const connection = mongoose.connect(
    process.env.NODE_ENV == "test" ? dbTest : dbConfig,
);

export default connection;

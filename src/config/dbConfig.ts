import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbConfig = `${process.env.MONGODB_URI}`;

const connection = mongoose.connect(dbConfig);

export default connection;

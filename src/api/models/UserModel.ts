import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: false,
            default: [],
        },
    ],
    admin: { type: Boolean, required: true, default: false },
});

export default mongoose.model("User", UserModel);

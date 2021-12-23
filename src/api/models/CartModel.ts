import mongoose from "mongoose";

const CartModel = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    productId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    ],
    quantity: { type: Number, required: true, default: 1 },
});

export default mongoose.model("Cart", CartModel);

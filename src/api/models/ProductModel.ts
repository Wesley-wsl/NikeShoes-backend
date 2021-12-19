import mongoose from "mongoose";

const ProductModel = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    product_image: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    video_url: { type: String, required: false },
});

export default mongoose.model("Product", ProductModel);

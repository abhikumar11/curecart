const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: String,
    productImages: [String],
    price: Number,
    description: String,
    disease: [String],
    bodypart: [String],
    inStock: Number
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
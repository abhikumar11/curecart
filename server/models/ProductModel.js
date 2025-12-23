const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },

    section: {
        type: String,
        required: true,
        enum: ["Medicine", "Healthcare", "Beauty"]
    },
    
    category: {
        type: String,
        required: true
    },
    
    disease: {
        type: String,
        default: "N/A" 
    },
    productImages: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    inStock: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            name: String, 

            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    shippingAddress: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentInfo: {
        id: { type: String },      

        orderId: { type: String }, 

        status: { type: String },
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },
    orderStatus: {
        type: String,
        enum: ["placed", "packed", "shipped", "delivered", "cancelled"],
        default: "placed",
    },
    deliveredAt: {
        type: Date,
    }
}, { 
    timestamps: true 

});

module.exports = mongoose.model("Order", orderSchema);
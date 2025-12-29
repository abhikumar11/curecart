const OrdeModel=require("../models/OrderModel");

const getMyOrders = async (req, res) => {
    try {

        const orders = await OrdeModel.find({ customerId: req.params.id })
        .populate("items.productId", "productImages productName")
        .sort("-createdAt");

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getOrderDetails = async (req, res) => {
    try {
        const order = await OrdeModel.findById(req.params.orderid)
            .populate("customerId", "name email") 

            .populate("items.productId", "name productImages category"); 

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {

        const orders = await OrdeModel.find()
            .populate("customerId", "name") 
            .sort("-createdAt");

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const order = await OrdeModel.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.orderStatus = req.body.status;

        if (req.body.status === "delivered") {
            order.deliveredAt = Date.now();
            order.paymentStatus = "paid"; 

        }

        await order.save();

        res.status(200).json({
            success: true,
            message: `Order status updated to ${req.body.status}`,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports={getMyOrders,getAllOrders,getOrderDetails,updateOrderStatus}
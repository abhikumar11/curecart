const Razorpay = require("razorpay");
const crypto = require("crypto");
const OrderModel = require("../models/OrderModel");
require("dotenv").config();

const rzp = new Razorpay({
  key_id: process.env.RAZORPAYKEYID,
  key_secret: process.env.RAZORPAYKEYSECRET,
});

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };
    const order = await rzp.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = req.body;

  const hmac = crypto.createHmac("sha256", process.env.RAZORPAYKEYSECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === razorpay_signature) {
    try {
      const newOrder = new OrderModel({
        customerId: orderDetails.customerId,
        items: orderDetails.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: orderDetails.totalAmount,
        paymentStatus: "paid",
        orderStatus: "placed"
      });
      await newOrder.save();
      res.status(200).json({
        success: true,
        message: "Payment successful and order recorded",
        orderId: newOrder._id
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Payment verified but database save failed",
        error: err.message
      });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid Payment Signature"});
  }
};
module.exports = { createOrder, verifyPayment };
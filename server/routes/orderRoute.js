const express = require('express');
const router = express.Router();
const {getMyOrders,getOrderDetails, getAllOrders, updateOrderStatus} = require('../controllers/OrderController');
const verifyToken = require('../middleware/AuthMiddleware');

router.get("/myorders/:id", getMyOrders);
router.get("/orderdetail/:orderid",getOrderDetails);
router.get("/admin/orders", getAllOrders);
router.put("/admin/order/:id",updateOrderStatus);
module.exports=router;
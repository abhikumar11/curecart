const express = require("express");
const router = express.Router();

router.use("/",require("./authRoute"));
router.use("/user",require("./userRoute"));
router.use("/product",require("./productRoute"));
router.use("/payment",require("./paymentRoute"));
router.use("/order",require("./orderRoute"));
module.exports=router;
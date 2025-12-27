const express = require("express");
const router = express.Router();

router.use("/",require("./authRoute"));
router.use("/product",require("./productRoute"));
router.use("/payment",require("./paymentRoute"));
module.exports=router;
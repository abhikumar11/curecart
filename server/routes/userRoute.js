const express=require("express");
const {addAddress, getAddress } = require("../controllers/UserController");
const verifyToken = require("../middleware/AuthMiddleware");

const router=express.Router();

router.put("/update-address",verifyToken,addAddress);
router.get("/get-address", verifyToken, getAddress);
module.exports=router;
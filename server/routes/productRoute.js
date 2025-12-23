const express=require("express");
const { addProduct, getAllProduct } = require("../controllers/ProductController");
const router=express.Router();

router.post("/add",addProduct);
router.get("/getall",getAllProduct);

module.exports=router;
const express=require("express");
const { addProduct, getAllProduct,getProductDetails } = require("../controllers/ProductController");
const router=express.Router();

router.post("/add",addProduct);
router.get("/getall",getAllProduct);
router.get("/:id", getProductDetails);
module.exports=router;
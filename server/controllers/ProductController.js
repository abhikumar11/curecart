const ProductModel = require("../models/ProductModel");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary=require("../config/Cloudinary");

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"productimages",
        format:async(req,file)=>"jpg",
        public_id: (req, file) => Date.now() + '-' + file.originalname,
    }
})
const upload = multer({ storage: storage }).array("proimage",5); 

const addProduct = async (req, res) => {
   
    upload(req, res, async (err) => {
        if (err) {
            console.error("Multer Error:", err);
            return res.status(500).json({ message: "Upload failed", error: err.message });
        }

        try {
            
            console.log("Files received:", req.files); 
            console.log("Body received:", req.body);

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No images uploaded. Check frontend field name 'proimage'" });
            }

            const { productName, category, description, price,disease, inStock,section} = req.body;

            
            const images = req.files.map(file => file.path || file.secure_url);

            const product = await ProductModel.create({
               productName: productName,
            category: category,
            description: description,
            price: Number(price),
            inStock: Number(inStock),
            section:section,
            disease: disease,
                productImages: images 
            });

           
            return res.status(201).json({ 
                success: true, 
                message: "Product added successfully", 
                product 
            });

        } catch (dbErr) {
            console.error("Database Error:", dbErr);
            return res.status(500).json({ message: "Database save failed", error: dbErr.message });
        }
    });
};

const getAllProduct=async(req,res)=>{
        try{
                const pro=await ProductModel.find();
                
                if(pro){
                   return res.status(200).send(pro);
                }
        }catch(err){
                    res.status(500).send("something went wrong");
        }
}
module.exports={addProduct,getAllProduct};
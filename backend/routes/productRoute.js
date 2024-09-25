const express= require("express")
const dotenv = require("dotenv")

dotenv.config();
const router = express.Router()
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const multer = require("multer")

const {createProduct,getAllProducts,findSingleProduct} = require("../Controller/productController");
const { updateProduct } = require("../Controller/productController");
const { SearchProduct } = require("../Controller/productController");


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  })

  const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder : "BLOG",
        allowedFormats: ['png', 'jpg', 'jpeg'],  // Allowed file formats
        transformation: [{ width: 250, height: 250, crop: 'fill' }] 
    }
})

const upload = multer({storage : storage})  

router.post("/create",upload.single("file"),createProduct)
router.get("/getAll",getAllProducts)
router.get("/singleProduct/:id",findSingleProduct)
router.put("/:id",upload.single("file"),updateProduct)
router.get("/search/:keyword",SearchProduct)

module.exports = router;
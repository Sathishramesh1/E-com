const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    productName : {
        type : String,
        required : true
    },
    productImage : {
        type : String,
        required : true
    },
    description : {
       type : String,
       required : true
    },
    categoryName : {
        type : String,
        required : true
    },
    price : {

        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    cloudinary_id: {
        type: String,
    },

})

module.exports = mongoose.model("Product",productSchema)
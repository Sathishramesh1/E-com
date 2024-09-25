const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({

    cartItems :{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
        },
    addedByUser:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
       }

})

module.exports = mongoose.model("Cart",cartSchema)
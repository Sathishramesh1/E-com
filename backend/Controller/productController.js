const productModel = require("../model/productModel")
const cloudinary = require("cloudinary").v2;

const createProduct = async(req,res)=>{

      try{

        const {productName,categoryName,description,price,quantity} = req.body;

        console.log(req.file)
        
        const verifyProduct = await productModel.findOne({productName})

        console.log("check",verifyProduct)
  
        if(verifyProduct){
  
           res.send({message : "Product already exists"})
        }else{
           
         if(req.file){
           
          const createOne = new productModel({
         
              productImage : req.file.path,
              productName : productName,
              categoryName : categoryName,
              description : description,
              price : price,
              quantity : quantity,
              cloudinary_id : req.file.filename
            })
           
            await createOne.save();

            console.log(createOne)
  
            res.status(200).send({message : "product created..!"})
       }
       
      }  

    } catch(err){

         res.status(500).send({message : err.message})
      }    
}

const getAllProducts = async(req,res)=>{

   try{
    const allItems = await productModel.find({})
    
    if(allItems){
        res.status(200).send(allItems)
    }else{
        res.send({message : "No products find"})
    }
   }catch(err){

      res.status(500).send({message : err.message})   
    
    }
    
}

const findSingleProduct = async(req,res)=>{

    try{
    
    const {id} = req.params;
    
    const getSingle = await productModel.findById(id) 

    if(getSingle){
        res.status(200).send(getSingle)
    }else{
        res.send({message : "There is No product"})
    }
    }catch(err){
        res.status(500).send({message : err.message})
    }
}


const updateProduct = async(req,res)=>{

    try{

        const {id} = req.params;
        const {productName,categoryName,description,price,quantity} = req.body;
       
        let updateData ={}

       const checkData = await productModel.findById({_id : id})
        
        if(!checkData){
           res.status(404).send({message : "Product not found"})
        }else{
          
           if(req.file){
               
               await cloudinary.uploader.destroy(checkData.cloudinary_id)
   
               updateData.productImage = req.file.path,
               updateData.productName = productName,
               updateData.description = description,
               updateData.categoryName = categoryName,
               updateData.price = price,
               updateData.quantity = quantity
           }

           console.log(updateData)
   
           const Update = await productModel.findByIdAndUpdate(id,updateData,{ new: true })

           console.log(Update)

           res.status(200).send({message : "The Blog updated successfully"})
        }

    }catch(err){
        res.status(500).send({message : err.message})
    }
     
}


const SearchProduct = async(req,res)=>{
   
    
    try {
        const { keyword } = req.params;
        console.log(keyword)
        const results = await productModel
          .find({
            $or: [
              { productName: { $regex: keyword, $options: "i" } },
              { description: { $regex: keyword, $options: "i" } },
            ],
            // createdBy : userId
          })

          console.log(results)
         
        res.status(200).send(results);
      } catch (error) {
       
        res.status(400).send({
          success: false,
          message: error.message,
          error,
        });
      }
}



// const editProduct = async(req,res)=>{

//     try{
//         const {id} = req.params;
//         const data = req.body;
    
//         const updateItem = await productModel.findByIdAndUpdate({_id: id ,data})
//         res.status(200).send({message : "Product Updated",updateItem})
//     }catch(err){
//         res.status(500).send({message: err.message})
//     }


// }

module.exports = {createProduct,getAllProducts,findSingleProduct,updateProduct,SearchProduct};
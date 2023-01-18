const express=require("express")
const {ProductModel}=require("../models/product.model")

const productRouter=express.Router()

productRouter.get("/",async(req,res)=>{
     try {
        let products=await ProductModel.find()
        res.send(products)
        
     } catch (error) {
        console.log(error);
     }
})

productRouter.post("/add",async (req,res)=>{
    let payload=req.body
    try {
        const product=new ProductModel(payload)
        await product.save()
        res.send({"msg":"Product Added Sucessfully"})
        
    } catch (error) {
        console.log(error)
    }
})


module.exports={
    productRouter
}
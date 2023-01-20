const express=require("express")
const {ProductModel}=require("../models/product.model")
const {authenticate}=require("../middleware/authenticate.middleware")
const {CartModel}=require("../models/cart.model")
const jwt=require("jsonwebtoken")
const productRouter=express.Router()
const cors=require("cors")

productRouter.use(cors())

productRouter.get("/",async(req,res)=>{
     try {
        let products=await ProductModel.find()
        res.send(products)
        
     } catch (error) {
        console.log(error);
     }
})

productRouter.get("/allcart",authenticate, async (req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,process.env.key)
    const userID=decoded.userID
    try {
       const cartdata=await CartModel.find({userID})
       res.send(cartdata)
    } catch (error) {
        console.log(error)
    }
 })

productRouter.delete("/cart/delete/:id", async (req,res)=>{
    let id=req.params.id
    try {
        let data=await CartModel.findByIdAndDelete({_id:id})
        res.send({"msg":"Item Deleted"})
        
    } catch (error) {
        console.log(error)
    }
})

 
 productRouter.get("/cart/one/:id",async (req,res)=>{
    let id=req.params.id
    try {
        let data=await CartModel.find({_id:id})
        res.send(data)
        
    } catch (error) {
        console.log(error);
    }
 })
productRouter.get("/one/:id",async(req,res)=>{
    let id=req.params.id
    try {
       let products=await ProductModel.findOne({_id:id})
       res.send(products)
       
    } catch (error) {
       console.log(error);
    }
})
productRouter.get("/:productfor",async (req,res)=>{
    let product=req.params.productfor
    try {
        let products=await ProductModel.find({
            productfor:{$regex : `${product}`,$options: "i"}
        })
        res.send(products)
        
    } catch (error) {
        console.log(error)
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

productRouter.patch("/cart/update/:id",async (req,res)=>{
    let id=req.params.id
    let payload=req.body
    try {
        const post= await CartModel.findByIdAndUpdate({_id:id},payload)
        res.send({"msg":"Cart updated Sucessfully."})   
    } catch (error) {
       console.log(error);
    }
})

productRouter.patch("/update/:id",async (req,res)=>{
    let id=req.params.id;
    let payload=req.body;
    try {
        const post= await ProductModel.findByIdAndUpdate({_id:id},payload)
        res.send({"msg":"Product updated Sucessfully."})   
    } catch (error) {
       console.log(error);
    }
})



productRouter.delete("/delete/:id",async (req,res)=>{
    let id=req.params.id;
    try {
        const post= await ProductModel.findByIdAndDelete({_id:id})
        res.send({"msg":"Product Deleted Sucessfully."})   
    } catch (error) {
       console.log(error);
    }
 })




 productRouter.post("/cart",authenticate,async (req,res)=>{
         let payload=req.body
         let name= await CartModel.findOne({name:payload.name})||{name:"Ajit"}
         try {
            if(payload.name!= name.name){
                const cartItem=new CartModel(payload)
                await cartItem.save()
                res.send({"msg":"Product Added to Cart"})
            }else{
                res.send({"msg":"Product Already exist in the Cart"})
            }
           
            
         } catch (error) {
            console.log(error)
         }
 })
 

module.exports={
    productRouter
}
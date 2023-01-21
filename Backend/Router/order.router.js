
const express=require("express")
const { orderauthenticate } = require("../middleware/orderAuthenticate.middleware")
const {authenticate}=require("../middleware/authenticate.middleware")
const {OrderModel}=require("../models/order.model")
const jwt=require("jsonwebtoken")

const orderRouter=express.Router()



orderRouter.get("/", authenticate,async (req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,process.env.key)
    const userID=decoded.userID
    try {
       const ordereddata=await OrderModel.find({userID:userID})
       res.send(ordereddata)
    } catch (error) {
        console.log(error)
    }
})


orderRouter.post("/add",orderauthenticate, async (req,res)=>{
    let payload=req.body
   try {
      let addOrders=await OrderModel.insertMany(payload)
      res.send({"msg":"Order Added sucessfully"})
    
   } catch (error) {
    
   }
})

orderRouter.delete("/delete/:id", async (req,res)=>{
    let id=req.params.id
    try {
        let data=await OrderModel.findByIdAndDelete({_id:id})
        res.send({"msg":"Item Deleted"})
    } catch (error) {
        console.log(error)
    }
})


module.exports={
    orderRouter
}
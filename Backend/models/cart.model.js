const mongoose=require("mongoose")

const cartSchema=mongoose.Schema({
    name:String,
    price:String,
    image1:String,
    MRP:String,
    size:String,
    color:String,
    quantity:Number,
    userID:String
})

const CartModel=mongoose.model("cart",cartSchema)

module.exports={
    CartModel
}
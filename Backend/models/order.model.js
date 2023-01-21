const mongoose=require("mongoose")

const orderSchema=mongoose.Schema({
    name:String,
    image:String,
    price:String,
    status:String,
    quantity:String,
    color:String,
    size:String,
    userID:String
})

const OrderModel= mongoose.model("order",orderSchema)

module.exports={
    OrderModel
}
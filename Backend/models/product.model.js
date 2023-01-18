const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name:String,
    price:String,
    image1:String,
    image2:String,
    MRP:String,
    size:String,
    color:String,
    rating: Number,
    category:String,
    productfor:String
})

const ProductModel=mongoose.model("product",productSchema)

module.exports={
    ProductModel
}
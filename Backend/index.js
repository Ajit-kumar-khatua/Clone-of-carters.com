const express=require("express")
const { connection } = require("./config/db")
const { productRouter } = require("./Router/product.router")
const { userRouter } = require("./Router/user.router")
require("dotenv").config()
const cors=require("cors")


const app=express()
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use("/products",productRouter)


app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("Connected to DB");
        
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running at ${process.env.port}`)
})
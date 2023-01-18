const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {UserModel}=require("../models/user.model")

const userRouter=express.Router()

userRouter.get("/",(req,res)=>{
    res.send("All Good")
})

userRouter.post("/register",async (req,res)=>{
    const {firstname,lastname,email,password}=req.body
    try {
        bcrypt.hash(password,5,async (err,secure_password)=>{
            if(err){
                console.log(err);
            }else{
                const user=new UserModel({email,password:secure_password,firstname,lastname})
                await user.save()
                res.send({"msg":"Registered"})
            }
        })
       
    } catch (error) {
        res.send("Error While Registering")
        console.log(error)
    }
    
})
userRouter.post("/login", async (req,res)=>{
    let {email,password}=req.body
    try {
        const user=await UserModel.find({email:email})
        // console.log(user)
        const hash_pass=user[0].password
        if(user.length>0){
            bcrypt.compare(password,hash_pass, (err, result)=> {
                if(result){
                    var token = jwt.sign({userID:user[0]._id} , process.env.key);
                    res.send({"msg":"login Sucessful","token":token,"name":user[0].firstname})
                }else{
                    res.send({"msg":"Wrong Credentials"})
                }
            });
            
        }else{
            res.send("Wrong credentials")
        }      
    } catch (error) {
        console.log(error)
    }
})


module.exports={
    userRouter
}
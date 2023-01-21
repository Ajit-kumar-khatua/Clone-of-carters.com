

const jwt =require("jsonwebtoken")
require('dotenv').config()

const orderauthenticate=(req,res,next)=>{
    let data=req.body
    const token=req.headers.authorization
    if(token){
        const decoded=jwt.verify(token,process.env.key)
        if(decoded){
            const userID=decoded.userID
            for(let item of data){
                item.userID=userID
            }
            next()
        }else{
            res.send("Please login First")
        }
    }else{
        res.send("Please login First")
    }
}

module.exports={
    orderauthenticate
}
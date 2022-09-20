const express=require('express')
const route=express.Router()

//@route  api/post
//get request

route.get("/",(req,res)=>{
  res.send("post api")
});

module.exports=route
const { log } = require('console')
const express=require('express')
const router=express.Router()
router.get("/",(req,res)=>{
    res.render("login")
})
router.post("/home",(req,res)=>{
    res.render("home")
    
    
})
router.get("/logout",(req,res)=>{
    res.redirect('/')
})


module.exports=router
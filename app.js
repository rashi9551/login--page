// modules import  
const express=require('express')
const userrouter=require("./router/router")
const app=express()


// view engine 
app.set("view engine","hbs")
app.use(express.urlencoded({extended:true}))


// router connect  
app.use("/",userrouter)

    

// host   
app.listen(3000)

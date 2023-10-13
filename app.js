// modules import  
const express=require('express')
const session=require("express-session")
const userrouter=require("./router/router")
const app=express()


// view engine 
app.set("view engine","hbs")
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:"your-secret-key",
    resave:false,
    saveUninitialized:true
}))


// router connect  
app.use("/",userrouter)

// host   
app.listen(3000)

const express=require('express')
const mongoose=require("mongoose")
const router=express.Router()

router.use(express.urlencoded({extended:true}))

// connecting mongoose  
mongoose.connect("mongodb://127.0.0.1:27017/users")
.then(console.log("done"))
const userschema=new mongoose.Schema({
    username:String,
    email:String,
    password:String

})
const usersModel=new mongoose.model("details",userschema)
function signin(req,res,next)
{
    if(req.session.isAuth)
    {
        next()
    }
    else
    {
        res.redirect("/")
    }
}

// login pgae  
router.get("/",(req,res)=>{
    res.render("login")
})
// signup page  
router.get("/signup",(req,res)=>{
    res.render("signup")
    
    
})
// login process  
router.post("/login",async(req,res)=>{
    try{
        // email checking  
        const data= await usersModel.findOne({username:req.body.username})
        if(data.username==req.body.username)
        {
            if(data.password==req.body.password)
            {
                req.session.isAuth=true;
                res.redirect("/home")
            }
            else
            {
            res.render("login",{perror:"invalid password"})
          
            }

        }
        else
        {
            res.render("login",{perror:"invalid username"})
        }

        
    }
    catch
    {
        const error="bug indu mwoney"
        console.log(error)
    }
    
})
// signup data collection  
router.post("/sign",async(req,res)=>{
    const{username,email,password}=req.body
    await usersModel.insertMany([{username:username,email:email,password:password}])  
    res.redirect('/')
})
router.get("/home",signin,(req,res)=>{
    if(req.session.isAuth)
    {
        res.render("home")
    }
    else
    {
        res.redirect("/")

    }

})
router.get("/logout",(req,res)=>{
    req.session.destroy()
    res.redirect("/")
})



module.exports=router
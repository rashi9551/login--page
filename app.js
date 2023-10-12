const express=require('express')
const app=express()

const userrouter=require("./router/router")
app.use("/",userrouter)

app.listen(3000)

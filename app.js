const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const loginModel = require("./Models/Admin")

let app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://sonasabu:sonavi306@cluster0.ejzjjq6.mongodb.net/mernblood_donationdb?retryWrites=true&w=majority&appName=Cluster0")


app.post("/adminSignUp",(req,res)=>{
    let input = req.body
    let hashedPassword = bcrypt.hashSync(req.body.password,10)
    console.log(hashedPassword)
    req.body.password = hashedPassword
    console.log(input)
    let result = new loginModel(input)
    result.save()
    res.json({"status":"success"})
})

app.listen(8080,()=>{
    console.log("server started...")
})
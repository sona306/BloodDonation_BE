const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const loginModel = require("./Models/Admin")
const donarloginModel = require("./Models/Donar")
const consumerloginModel = require("./Models/Cosumer")


let app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://sonasabu:sonavi306@cluster0.ejzjjq6.mongodb.net/mernblood_donationdb?retryWrites=true&w=majority&appName=Cluster0")

//ADMIN SIGIN UP
app.post("/adminSignUp",(req,res)=>{
    let input = req.body
    let hashedPassword = bcrypt.hashSync(req.body.password,10)
    //console.log(hashedPassword)
    let hashedConfirm = bcrypt.hashSync(req.body.confirm,10)
    req.body.password = hashedPassword
    req.body.confirm = hashedConfirm

    loginModel.find({ email: req.body.email }).then(
        (items) => {
            if (items.length > 0) {
                res.json({ "status": "Email id already exits" })
            } else {
                let result = new loginModel(input)
                result.save()
                res.json({ "status": "success" })
            }
        }
    )
})

//ADMIN SIGN IN
app.post("/adminSignIn",(req,res)=>{
    let input = req.body
    let result = loginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator=bcrypt.compareSync(input.password,response[0].password)
                if (validator) {
                    jwt.sign({email:input.username},"blood-donation",{expiresIn:"2d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status" : "token creation failed"})
                            } else {
                                res.json({"status" : "success","token":token})
                            }
                        })
                } else {
                    res.json({"status" : "incorect password"})
                }
            } else {
                res.json({"status" : "username doesnt exist"})
            }
        }
    )
})

//DONAR SIGN UP
app.post("/donarSignUp",(req,res)=>{
    let input = req.body
    let hashedPassword = bcrypt.hashSync(req.body.password,10)
    //console.log(hashedPassword)
    let hashedConfirm = bcrypt.hashSync(req.body.confirm,10)
    req.body.password = hashedPassword
    req.body.confirm = hashedConfirm

    donarloginModel.find({ email: req.body.email }).then(
        (items) => {
            if (items.length > 0) {
                res.json({ "status": "Email id already exits" })
            } else {
                let result = new donarloginModel(input)
                result.save()
                res.json({ "status": "success" })
            }
        }
    )
})

//DONAR SIGN IN

app.post("/donarSignIn",(req,res)=>{
    let input = req.body
    let result = donarloginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator=bcrypt.compareSync(input.password,response[0].password)
                if (validator) {
                    jwt.sign({email:input.username},"blood-donation",{expiresIn:"2d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status" : "token creation failed"})
                            } else {
                                res.json({"status" : "success","token":token})
                            }
                        })
                } else {
                    res.json({"status" : "incorect password"})
                }
            } else {
                res.json({"status" : "username doesnt exist"})
            }
        }
    )
})

//CONSUMER SIGN UP
app.post("/consumerSignUp",(req,res)=>{
    let input = req.body
    let hashedPassword = bcrypt.hashSync(req.body.password,10)
    //console.log(hashedPassword)
    let hashedConfirm = bcrypt.hashSync(req.body.confirm,10)
    req.body.password = hashedPassword
    req.body.confirm = hashedConfirm

    consumerloginModel.find({ email: req.body.email }).then(
        (items) => {
            if (items.length > 0) {
                res.json({ "status": "Email id already exits" })
            } else {
                let result = new consumerloginModel(input)
                result.save()
                res.json({ "status": "success" })
            }
        }
    )
})

//CONSUMER SIGN IN

app.post("/consumerSignIn",(req,res)=>{
    let input = req.body
    let result = consumerloginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator=bcrypt.compareSync(input.password,response[0].password)
                if (validator) {
                    jwt.sign({email:input.username},"blood-donation",{expiresIn:"2d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status" : "token creation failed"})
                            } else {
                                res.json({"status" : "success","token":token})
                            }
                        })
                } else {
                    res.json({"status" : "incorect password"})
                }
            } else {
                res.json({"status" : "username doesnt exist"})
            }
        }
    )
})

app.listen(8080,()=>{
    console.log("server started...")
})
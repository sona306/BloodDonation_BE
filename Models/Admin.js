const mongoose = require("mongoose")

const loginSchema = mongoose.Schema(
    {
        username:{type:String,require:true},
        fullname:{type:String,require:true},
        role:{type:String,require:true},
        phone:{type:String,require:true},
        email:{type:String,require:true},
        employeeid:{type:String,require:true},
        password:{type:String,require:true}
    }
)

const loginModel = mongoose.model("adminlogin",loginSchema)
module.exports=loginModel
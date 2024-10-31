const mongoose = require("mongoose")

const consumerLoginSchema = mongoose.Schema(
    {
        username:{type:String,require:true},
        fullname:{type:String,require:true},
        dateofbirth:{type:String,require:true},
        gender:{type:String,require:true},
        BloodGroup:{type:String,require:true},
        phonenumber:{type:String,require:true},
        email:{type:String,require:true},
        homeaddress:{type:String,require:true},
        location:{type:String,require:true},
        medicalhistory:{type:String,require:true},
        lastdonationrecieveddate:{type:String,require:true},
        hospitalname:{type:String,require:true},
        emergencycontactnumber:{type:String,require:true},
        password:{type:String,require:true},
        confirm:{type:String,require:true}    
    }
)

const consumerloginModel = mongoose.model("consumerlogin",consumerLoginSchema)
module.exports=consumerloginModel
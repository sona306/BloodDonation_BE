const mongoose = require("mongoose")

const hospitalLoginSchema = mongoose.Schema(
    {
        username:{type:String,require:true},
        hospitalname:{type:String,require:true},
        registrationnumber:{type:String,require:true},
        typeoforganization:{type:String,require:true},
        bloodtype:{type:String,require:true},
        phonenumber:{type:String,require:true},
        email:{type:String,require:true},
        homeaddress:{type:String,require:true},
        location:{type:String,require:true},
        medicalhistory:{type:String,require:true},
        lastdonationdate:{type:String,require:true},
        hospitalname:{type:String,require:true},
        emergencycontactnumber:{type:String,require:true},
        password:{type:String,require:true},
        confirm:{type:String,require:true}    
    }
)

const donarloginModel = mongoose.model("donarlogin",donarLoginSchema)
module.exports=donarloginModel
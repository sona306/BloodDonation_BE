const mongoose = require("mongoose")

const hospitalLoginSchema = mongoose.Schema(
    {
        username:{type:String,require:true},
        hospitalname:{type:String,require:true},
        registrationnumber:{type:String,require:true},
        typeoforganization:{type:String,require:true},
        avaliablebloodtype:{type:String,require:true},
        phonenumber:{type:String,require:true},
        email:{type:String,require:true},
        hospitaladdress:{type:String,require:true},
        location:{type:String,require:true},
        bloodstoragecapacity:{type:String,require:true},
        operatinghours:{type:String,require:true},
        emergencycontactnumber:{type:String,require:true},
        emergencybloodrequesthandling:{type:String,require:true},
        password:{type:String,require:true},
        confirm:{type:String,require:true}    
    }
)

const hospitalloginModel = mongoose.model("hospitallogin",hospitalLoginSchema)
module.exports=hospitalloginModel
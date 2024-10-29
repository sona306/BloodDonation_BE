const mongoose = require("mongoose")
const postSchema = mongoose.Schema(
    {
        adminId : {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Admin"
        },
        Message:String,
        postedDate:{
            type: Date,
            default: Date.now
        }
    }
)

var postModel = mongoose.model("posts",postSchema)
module.exports = postModel
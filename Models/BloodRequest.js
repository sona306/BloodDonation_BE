const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    requestedDate: {
        type: Date,
        required: true
    },
    urgency:{
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    bloodtype: {
        type: String,
        required: true
    },
    Amount: {
        type: String,
        required: true
    }
});

const bloodRequestModel = mongoose.model("bloodreq", bloodRequestSchema);
module.exports = bloodRequestModel;
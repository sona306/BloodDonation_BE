const mongoose = require("mongoose");

const donationRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donar"
    },
    fullname:{
        type: String,
        required: true
    },
    requestedDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    location: {
        type: String,
        required: true
    },
    BloodGroup: {
        type: String,
        required: true
    },
    Amount: {
        type: String,
        required: true
    },
    confirmavalibility: {
        type: String,
        required: true
    },
    donationHistory: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        validate: {
            validator: function(v) {
                return this.donationHistory ? v != null : true;
            },
            message: "Date is required if donation history is true."
        }
    },
    hospitalName: {
        type: String,
        validate: {
            validator: function(v) {
                return this.donationHistory ? v != null : true;
            },
            message: "Hospital name is required if donation history is true."
        }
    },
    quality: {
        type: String,
        validate: {
            validator: function(v) {
                return this.donationHistory ? v != null : true;
            },
            message: "Quality is required if donation history is true."
        }
    }
});

const donationRequestModel = mongoose.model("donationreq", donationRequestSchema);
module.exports = donationRequestModel;
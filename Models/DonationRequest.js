const mongoose = require("mongoose");

const donationRequestSchema = new mongoose.Schema({
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donar",
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
    adminResponseDate: {
        type: Date
    }
});

module.exports = mongoose.model("DonationRequest", donationRequestSchema);

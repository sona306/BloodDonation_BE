const mongoose = require("mongoose");

const bloodInventorySchema = new mongoose.Schema({
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "requestType" // Dynamic reference to either consumer or hospital request
    },
    requestType: {
        type: String,
        enum: ["ConsumerRequest", "HospitalRequest"], // Identify request source
        required: false
    },
    Amount: { 
        type: Number, 
        required: true, 
        default: 0
    },
    BloodGroup: {
        type: String,
        required: true,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    }
});

const BloodInventory = mongoose.model('BloodInventory', bloodInventorySchema);
module.exports = BloodInventory;

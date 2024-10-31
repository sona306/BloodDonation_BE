const mongoose = require("mongoose");

const bloodInventorySchema = new mongoose.Schema({
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DonationRequest"
    },
    Amount: { 
        type: Number, 
        default: 0,
        required: true // Ensure that an amount is provided
    },
    BloodGroup: {
        type: String,
        required: true, // Ensure that blood group is provided
        enum: ["A+","A-","B+","B-","AB+","AB-","O+","O-"] // Define allowed blood groups
    }
});

const BloodInventory = mongoose.model('BloodInventory', bloodInventorySchema);
module.exports = BloodInventory;
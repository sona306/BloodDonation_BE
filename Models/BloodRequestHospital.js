const mongoose = require('mongoose');

const BloodRequestHospitalSchema = new mongoose.Schema({
    hospitalName: { type: String, required: true },
    bloodType: { type: String, required: true },
    unitsRequired: { type: Number, required: true },
    urgencyLevel: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
    contactNumber: { type: String, required: true },
    location: { type: String },
    additionalNotes: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    requestTime: { type: Date, default: Date.now },
    expectedDeliveryTime: { type: Date } // New attribute added
});

module.exports = mongoose.model('BloodRequestHospital', BloodRequestHospitalSchema);

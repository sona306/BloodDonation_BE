const mongoose = require('mongoose');

const campRegistrationSchema = new mongoose.Schema({
  campId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Camp',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], // Restrict to valid blood groups
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

const CampRegistration = mongoose.model('CampRegistration', campRegistrationSchema);

module.exports = CampRegistration;

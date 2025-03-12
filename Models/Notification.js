const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Donor',
  },
  campId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Camp',
  },
  message: {
    type: String,
    required: true,
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notification', notificationSchema);

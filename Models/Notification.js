const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donar' },
    read: { type: Boolean, default: false },
    campId: { type: mongoose.Schema.Types.ObjectId, ref: 'Camp' }, // Reference to the camp
}, { timestamps: true });

const NotificationModel = mongoose.model('Notification', notificationSchema);
module.exports = NotificationModel;

const mongoose = require('mongoose')

const campSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, // Assuming you have an Admin model
  createdAt: { type: Date, default: Date.now }
});

const Camp = mongoose.model('Camp', campSchema);

module.exports = Camp;

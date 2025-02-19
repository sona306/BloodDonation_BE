const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donar", // Ensure this matches your Donor model
        required: true,
    },
    question: { type: String, required: true },
    answer: { type: String },
    answeredBy: { type: String }, // Admin who answered
}, { timestamps: true });

const Doubt = mongoose.model("Doubt", doubtSchema); // Corrected model name

module.exports = Doubt; // Ensure this is exported properly

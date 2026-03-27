const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  name: {
    type: String,
    required: true
  },

  dosage: String,

  time: {
    type: String,
    required: true
  },

  frequency: {
    type: String,
    default: "daily"
  },

  status: {
    type: String,
    enum: ["pending", "taken", "missed"],
    default: "pending"
  },

  takenCount: {
    type: Number,
    default: 0
  },

  missedCount: {
    type: Number,
    default: 0
  },

  nextReminder: {
    type: Date,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("medicines", MedicineSchema);
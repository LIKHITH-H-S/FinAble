const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  balance: { type: Number, default: 0 },
  accessibilitySettings: {
    highContrast: { type: Boolean, default: false },
    largeText: { type: Boolean, default: false },
    voiceEnabled: { type: Boolean, default: true },
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

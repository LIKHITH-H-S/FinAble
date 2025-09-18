const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["transfer", "bill", "deposit", "withdraw"], default: "transfer" },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "completed" },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);

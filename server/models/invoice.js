const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  merchant: { type: String },
  amount: { type: Number, required: true },
  category: { type: String, enum: ["electricity", "water", "internet", "shopping", "other"], default: "other" },
  ocrText: { type: String },
  status: { type: String, enum: ["unpaid", "paid"], default: "unpaid" },
}, { timestamps: true });

module.exports = mongoose.model("Invoice", invoiceSchema);

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/user");
const Invoice = require("../models/invoice");
const Transaction = require("../models/transaction");

// ✅ Create Bill
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { merchant, amount, category, ocrText } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: "Invalid bill amount" });

    const newBill = new Invoice({
      user: req.user.id,
      merchant,
      amount,
      category,
      ocrText,
    });
    await newBill.save();

    res.json({ message: "Bill created successfully", bill: newBill });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get User Bills
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bills = await Invoice.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Pay Bill
router.post("/pay/:id", authMiddleware, async (req, res) => {
  try {
    const billId = req.params.id;
    const user = await User.findById(req.user.id);
    const billToPay = await Invoice.findById(billId);

    if (!billToPay) return res.status(404).json({ message: "Bill not found" });
    if (billToPay.status === "paid") return res.status(400).json({ message: "Bill already paid" });
    if (user.balance < billToPay.amount) return res.status(400).json({ message: "Insufficient balance" });

    // Deduct money from user
    user.balance -= billToPay.amount;
    await user.save();

    // Mark bill as paid
    billToPay.status = "paid";
    await billToPay.save();

    // Log the transaction
    const tx = new Transaction({
      sender: user._id,
      receiver: user._id,
      amount: billToPay.amount,
      type: "bill",
      status: "completed",
    });
    await tx.save();

    res.json({ message: "Bill paid successfully", balance: user.balance, bill: billToPay });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

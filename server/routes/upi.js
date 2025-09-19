const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/user");
const Transaction = require("../models/transaction");

// ✅ Realistic UPI Payment
router.post("/pay", authMiddleware, async (req, res) => {
  try {
    const { upiId, amount } = req.body;

    if (!upiId || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid UPI ID or amount" });
    }

    const sender = await User.findById(req.user.id);
    if (!sender) return res.status(404).json({ message: "Sender not found" });

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // 🔹 For simplicity, map upiId = receiver email
    const receiver = await User.findOne({ email: upiId });
    if (!receiver) return res.status(404).json({ message: "Receiver not found for given UPI ID" });

    // Deduct & Add balance
    sender.balance -= amount;
    receiver.balance += amount;
    await sender.save();
    await receiver.save();

    // Log transaction
    const tx = new Transaction({
      sender: sender._id,
      receiver: receiver._id,
      amount,
      type: "transfer",
      status: "completed",
    });
    await tx.save();

    res.json({ 
      message: `✅ UPI payment of ₹${amount} to ${upiId} successful!`,
      balance: sender.balance 
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

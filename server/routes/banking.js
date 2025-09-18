const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/user");
const Transaction = require("../models/transaction"); // make sure filename is transaction.js

// ✅ Get Balance
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add Money
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: "Invalid amount" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.balance += amount;
    await user.save();

    // 🔹 Log transaction
    const tx = new Transaction({
      sender: user._id,
      receiver: user._id,
      amount,
      type: "deposit",
      status: "completed",
    });
    await tx.save();

    res.json({ message: "Money added successfully", balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Transfer Money
router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const { email, amount } = req.body;
    const sender = await User.findById(req.user.id);
    const receiver = await User.findOne({ email });

    if (!receiver) return res.status(404).json({ message: "Receiver not found" });
    if (sender.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

    sender.balance -= amount;
    receiver.balance += amount;
    await sender.save();
    await receiver.save();

    // 🔹 Log transaction
    const tx = new Transaction({
      sender: sender._id,
      receiver: receiver._id,
      amount,
      type: "transfer",
      status: "completed",
    });
    await tx.save();

    res.json({ message: `₹${amount} transferred to ${receiver.name}`, balance: sender.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

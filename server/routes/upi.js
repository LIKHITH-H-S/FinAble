const express = require("express");
const router = express.Router();

// Simulated UPI route
router.post("/pay", (req, res) => {
  const { upiId, amount } = req.body;

  if (!upiId || !amount) {
    return res.status(400).json({ message: "Missing UPI ID or amount" });
  }

  // Fake success
  res.json({ message: `✅ UPI payment of ₹${amount} to ${upiId} successful!` });
});

module.exports = router;

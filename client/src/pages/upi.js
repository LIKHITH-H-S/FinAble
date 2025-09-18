import React, { useState } from "react";
import API from "../api/axios.js";
import { TextField, Button, Typography, Box } from "@mui/material";

function UPI() {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleUPIPayment = async () => {
    if (!upiId || !amount) {
      alert("Please enter UPI ID and amount");
      return;
    }
    try {
      // Simulate a UPI payment API
      const { data } = await API.post("/upi/pay", { upiId, amount });
      setStatus(data.message);
    } catch (err) {
      setStatus(err.response?.data?.message || "UPI Payment failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        UPI Payment
      </Typography>
      <TextField
        label="UPI ID"
        fullWidth
        margin="normal"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
      />
      <TextField
        label="Amount"
        fullWidth
        type="number"
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleUPIPayment}>
        Pay
      </Button>
    </Box>
  );
}

export default UPI;

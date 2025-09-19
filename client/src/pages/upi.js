import React, { useState } from "react";
import { Container, Typography, TextField, Button, Card, CardContent, Stack } from "@mui/material";
import API from "../api/axios.js";

function UPI() {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleUPIPayment = async () => {
    if (!upiId || !amount) {
      setMessage("Please enter UPI ID and amount");
      return;
    }
    try {
      const { data } = await API.post("/upi/pay", { upiId, amount });
      setMessage(data.message);
      setUpiId("");
      setAmount("");
    } catch (err) {
      setMessage(err.response?.data?.message || "UPI Payment failed");
    }
  };

  return (
    <Container sx={{ mt: 5, maxWidth: 400 }}>
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            UPI Payment
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              fullWidth
            />
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleUPIPayment}>
              Pay
            </Button>
          </Stack>

          {message && (
            <Typography sx={{ mt: 2 }} color="green">
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default UPI;

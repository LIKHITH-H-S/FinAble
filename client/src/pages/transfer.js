import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Stack, Card, CardContent } from "@mui/material";
import { useLocation } from "react-router-dom";
import API from "../api/axios.js";
import VoiceControl from "../components/VoiceControl.js";

function Transfer() {
  const location = useLocation();
  const [form, setForm] = useState({ email: "", amount: "" });
  const [message, setMessage] = useState("");

  // Pre-fill form if query params exist
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setForm({
      email: params.get("email") || "",
      amount: params.get("amount") || "",
    });
  }, [location.search]);

  const handleTransfer = async () => {
    try {
      const { data } = await API.post("/banking/transfer", {
        email: form.email,
        amount: Number(form.amount),
      });
      setMessage(data.message);
      setForm({ email: "", amount: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error transferring money");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container sx={{ mt: 5, maxWidth: 400 }}>
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Transfer Money
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Recipient Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleTransfer}>
              Transfer
            </Button>
          </Stack>

          {message && (
            <Typography sx={{ mt: 2 }} color="green">
              {message}
            </Typography>
          )}

          {/* Voice Control */}
          <VoiceControl
            actions={{
              transferMoney: (email, amount) => {
                setForm({ email, amount });
                handleTransfer();
              },
            }}
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export default Transfer;

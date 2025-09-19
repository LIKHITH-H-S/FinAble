import React, { useState, useEffect } from "react";
import API from "../api/axios.js";
import { Button, TextField, Typography, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import VoiceControl from "../components/VoiceControl.js";

function Transfer() {
  const [form, setForm] = useState({ email: "", amount: "" });
   const location = useLocation();

    useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get("email");
    const amount = params.get("amount");
    setForm({
      email: email || "",
      amount: amount || "",
    });
  }, [location.search]);

  const handleTransfer = async () => {
    try {
      const { data } = await API.post("/banking/transfer", {
        email: form.email,
        amount: Number(form.amount),
      });
      alert(data.message);
      setForm({ email: "", amount: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error transferring money");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


    return (
    <div style={{ maxWidth: 400, margin: "20px auto" }}>
      <Typography variant="h4" gutterBottom>
        Transfer Money
      </Typography>

      <Stack spacing={2}>
        <TextField
          type="email"
          label="Recipient Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          type="number"
          label="Amount"
          name="amount"
          value={form.amount}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={() => handleTransfer()}>
          Transfer
        </Button>
      </Stack>

      {/* Voice Control */}
      <VoiceControl
        actions={{
          transferMoney: handleTransfer,
        }}
      />
    </div>
  );
}

export default Transfer;

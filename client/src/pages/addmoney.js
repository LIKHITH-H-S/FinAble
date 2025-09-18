// src/pages/addmoney.js
import React, { useState } from "react";
import API from "../api/axios.js";
import { Button, TextField, Typography, Stack } from "@mui/material";
import VoiceControl from "../components/VoiceControl.js";

function AddMoney() {
  const [amount, setAmount] = useState("");

  const handleAdd = async (amt = amount) => {
    try {
      const { data } = await API.post("/banking/add", { amount: Number(amt) });
      alert(data.message);
      setAmount("");
    } catch (err) {
      alert(err.response?.data?.message || "Error adding money");
    }
  };

 return (
    <div style={{ maxWidth: 400, margin: "20px auto" }}>
      <Typography variant="h4" gutterBottom>
        Add Money
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={() => handleAdd()}>
          Add
        </Button>
      </Stack>

      {/* Voice Control */}
      <VoiceControl
        actions={{
          addMoney: handleAdd,
        }}
      />
    </div>
  );
}

export default AddMoney;

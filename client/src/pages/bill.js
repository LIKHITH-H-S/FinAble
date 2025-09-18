import React, { useEffect, useState } from "react";
import API from "../api/axios.js";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import BillCard from "../components/billcard.js";
import VoiceControl from "../components/VoiceControl.js";
import OCRReader from "../components/OCRReader.js";

function Bill() {
  const [bills, setBills] = useState([]);

  const fetchBills = async () => {
    try {
      const { data } = await API.get("/bills");
      setBills(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePay = async (id) => {
    try {
      const { data } = await API.post(`/bills/pay/${id}`);
      alert(data.message);
      fetchBills();
    } catch (err) {
      alert(err.response?.data?.message || "Error paying bill");
    }
  };

  const handleReadBills = () => {
    if (!bills.length) return alert("No bills to read.");
    const text = bills
      .map((bill, idx) => `${idx + 1}. ${bill.name}: ₹${bill.amount}, status: ${bill.status}`)
      .join(". ");
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

useEffect(() => {
    fetchBills();
  }, []);

  

 return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <Typography variant="h4" gutterBottom>
        Bills
      </Typography>

      {/* OCR Reader */}
      <OCRReader />

      <Stack spacing={2} marginTop={2}>
        {bills.map((bill, index) => (
          <Card key={bill._id}>
            <CardContent>
              <Typography variant="h6">{bill.name}</Typography>
              <Typography>Amount: ₹{bill.amount}</Typography>
              <Typography>Status: {bill.status}</Typography>
              {bill.status === "unpaid" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePay(bill._id)}
                  style={{ marginTop: 10 }}
                >
                  Pay
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Voice Control */}
      <VoiceControl
        actions={{
          payBill: (idx) => {
            if (bills[idx]) handlePay(bills[idx]._id);
          },
          readBills: handleReadBills,
        }}
      />
    </div>
  );
}

export default Bill;

import React, { useEffect, useState } from "react";
import { Container, Typography, Stack, Card, CardContent, Button } from "@mui/material";
import API from "../api/axios.js";
import VoiceControl from "../components/VoiceControl.js";
import OCRReader from "../components/OCRReader.js";

function Bill() {
  const [bills, setBills] = useState([]);
  const [message, setMessage] = useState("");

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
      setMessage(data.message);
      fetchBills();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error paying bill");
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
    <Container sx={{ mt: 5, maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>
        Bills
      </Typography>

      {/* OCR Reader */}
      <OCRReader />

      {message && (
        <Typography sx={{ mt: 2, mb: 2 }} color="green">
          {message}
        </Typography>
      )}

      <Stack spacing={2} sx={{ mt: 2 }}>
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
                  sx={{ mt: 1 }}
                  onClick={() => handlePay(bill._id)}
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
    </Container>
  );
}

export default Bill;

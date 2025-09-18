import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import VoiceControl from "../components/VoiceControl.js";
import { Card, CardContent, Typography, Button } from "@mui/material";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  // Voice actions
  const handleAddMoney = (amount) => navigate(`/addmoney?amount=${amount}`);
  const handleTransfer = (email, amount) =>
    navigate(`/transfer?email=${email}&amount=${amount}`);
  const handleUPIPayment = async (upiId, amount) => {
    try {
      const { data } = await API.post("/banking/upi", { upiId, amount });
      alert(data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error processing UPI payment");
    }
  };
  const handleReadBills = () => navigate("/bill");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const { data } = await API.get("/banking/balance");
        setBalance(data.balance);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Card variant="outlined" sx={{ maxWidth: 400, marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Your Balance
          </Typography>
          <Typography variant="h4" color="primary">
            ₹{balance}
          </Typography>
        </CardContent>
      </Card>

      <VoiceControl
        actions={{
          addMoney: handleAddMoney,
          transferMoney: handleTransfer,
          payBill: () => {},
          payUPI: handleUPIPayment,
          readBills: handleReadBills,
        }}
      />

      <div style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/addmoney")}
          sx={{ marginRight: 1 }}
        >
          Add Money
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/transfer")}
          sx={{ marginRight: 1 }}
        >
          Transfer
        </Button>
        <Button variant="contained" onClick={handleReadBills}>
          View Bills
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;

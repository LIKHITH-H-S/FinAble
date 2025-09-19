import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import API from "../api/axios.js";
import VoiceControl from "../components/VoiceControl.js";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  // Fetch balance
  const fetchBalance = async () => {
    try {
      const { data } = await API.get("/banking/balance");
      setBalance(data.balance);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch last transactions
  const fetchTransactions = async () => {
    try {
      const { data } = await API.get("/banking/transactions");
      setTransactions(data.slice(0, 5)); // last 5 transactions
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to FinBank
      </Typography>

      {/* Balance Card */}
      <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6">Your Balance</Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
            ₹{balance}
          </Typography>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => navigate("/addmoney")}
          >
            Add Money
          </Button>
        </Grid>
        <Grid item xs={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => navigate("/transfer")}
          >
            Transfer
          </Button>
        </Grid>
        <Grid item xs={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/bill")}
          >
            Pay Bills
          </Button>
        </Grid>
        <Grid item xs={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={() => navigate("/upi")}
          >
            UPI Payment
          </Button>
        </Grid>
      </Grid>

      {/* Last Transactions */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Last Transactions
        </Typography>
        {transactions.length === 0 ? (
          <Typography>No transactions yet.</Typography>
        ) : (
          <Stack spacing={1}>
            {transactions.map((tx, idx) => (
              <Card key={idx} sx={{ p: 1, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="body1">
                    {tx.type.toUpperCase()} - ₹{tx.amount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {tx.status} | {new Date(tx.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Paper>

      {/* Placeholder for future Charts */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Spending Overview</Typography>
        <Typography variant="body2" color="text.secondary">
          (Chart will go here later 📊)
        </Typography>
      </Box>

      {/* Voice Control */}
      <VoiceControl
        actions={{
          addMoney: (amount) => navigate(`/addmoney?amount=${amount}`),
          transferMoney: (email, amount) =>
            navigate(`/transfer?email=${email}&amount=${amount}`),
          payBill: () => navigate("/bill"),
          payUPI: (upiId, amount) => navigate("/upi"),
          readBills: () => navigate("/bill"),
        }}
        navigate={navigate}
      />
    </Container>
  );
}

export default Dashboard;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UPI from "./pages/upi.js";
// Pages
import Login from "./pages/login.js";
import Signup from "./pages/signup.js";
import Dashboard from "./pages/dashboard.js";
import AddMoney from "./pages/addmoney.js";
import Transfer from "./pages/transfer.js";
import Bill from "./pages/bill.js";

// Components
import Navbar from "./components/navbar.js";

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addmoney"
          element={
            <ProtectedRoute>
              <AddMoney />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transfer"
          element={
            <ProtectedRoute>
              <Transfer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bill"
          element={
            <ProtectedRoute>
              <Bill />
            </ProtectedRoute>
          }
        />
      <Route
          path="/upi"
          element={
            <ProtectedRoute>
              <UPI />
            </ProtectedRoute>
          }
        />
</Routes>
    </>
  );
}

export default App;

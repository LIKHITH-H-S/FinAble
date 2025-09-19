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
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/addmoney"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <AddMoney />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transfer"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Transfer />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bill"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Bill />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/upi"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <UPI />
              </>
            </ProtectedRoute>
          }
        />

        {/* Default route: redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

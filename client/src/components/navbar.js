import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import API from "../api/axios.js";
import { useAccessibility } from "../context/AccessibilityContext.js";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { highContrast, largeText, toggleContrast, toggleLargeText, toggleVoice, voiceEnabled } = useAccessibility();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

   return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: highContrast ? "#000" : "primary.main",
        color: highContrast ? "#fff" : "inherit",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer", fontSize: largeText ? "1.5rem" : "1.25rem" }}
          onClick={() => navigate("/")}
        >
          FinBank
        </Typography>

        {/* Right menu */}
        <div>
          {token ? (
            <>
              <Button color="inherit" component={Link} to="/">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/addmoney">
                Add Money
              </Button>
              <Button color="inherit" component={Link} to="/transfer">
                Transfer
              </Button>
              <Button color="inherit" component={Link} to="/bill">
                Bills
              </Button>
              <Button color="inherit" component={Link} to="/upi">
                UPI
              </Button>
              {/* Accessibility Toggles */}
              <Button color="inherit" onClick={toggleContrast}>
                {highContrast ? "Normal Contrast" : "High Contrast"}
              </Button>
              <Button color="inherit" onClick={toggleLargeText}>
                {largeText ? "Normal Text" : "Large Text"}
              </Button>
              <Button color="inherit" onClick={toggleVoice}>
                {voiceEnabled ? "Voice Off" : "Voice On"}
              </Button>

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

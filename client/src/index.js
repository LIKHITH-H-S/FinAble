import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import "./index.css";

// ✅ Import AccessibilityProvider and useAccessibility
import { AccessibilityProvider, useAccessibility } from "./context/AccessibilityContext.js";

// Wrapper component to apply accessibility settings globally
function AppWrapper() {
  const { highContrast, largeText } = useAccessibility();

  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
    document.body.classList.toggle("large-text", largeText);
  }, [highContrast, largeText]);

  return <App />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AccessibilityProvider>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </AccessibilityProvider>
);

import React, { createContext, useState, useContext, useEffect } from "react";

const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Persist settings in localStorage
  useEffect(() => {
    const storedContrast = localStorage.getItem("highContrast") === "true";
    const storedLargeText = localStorage.getItem("largeText") === "true";
    const storedVoice = localStorage.getItem("voiceEnabled") !== "false";

    setHighContrast(storedContrast);
    setLargeText(storedLargeText);
    setVoiceEnabled(storedVoice);
  }, []);

  useEffect(() => {
    localStorage.setItem("highContrast", highContrast);
    localStorage.setItem("largeText", largeText);
    localStorage.setItem("voiceEnabled", voiceEnabled);
  }, [highContrast, largeText, voiceEnabled]);

  const toggleContrast = () => setHighContrast(prev => !prev);
  const toggleLargeText = () => setLargeText(prev => !prev);
  const toggleVoice = () => setVoiceEnabled(prev => !prev);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        largeText,
        voiceEnabled,
        toggleContrast,
        toggleLargeText,
        toggleVoice,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}

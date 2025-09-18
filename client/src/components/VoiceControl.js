import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function VoiceControl({ navigate, actions }) {
  const commands = [
    {
      command: "go to *",
      callback: (page) => {
        const route = page.toLowerCase();
        if (["dashboard", "add money", "transfer", "bill", "login", "signup"].includes(route)) {
          navigate(`/${route === "dashboard" ? "" : route.replace(" ", "")}`);
        }
      },
    },
    {
      command: "add * rupees",
      callback: (amount) => {
        actions.addMoney(Number(amount));
      },
    },
    {
      command: "transfer * rupees to *",
      callback: (amount, email) => {
        actions.transferMoney(email, Number(amount));
      },
    },
    {
      command: "pay bill number *",
      callback: (index) => {
        // adjust for 1-based numbering in speech
        actions.payBill(Number(index) - 1);
      },
    },
    {
    command: "pay * rupees via UPI to *",
    callback: (amount, upiId) => {
      actions.payUPI(upiId, Number(amount));
    },
  },
  ];

  const { transcript, listening, resetTranscript } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (transcript) {
      console.log("Transcript:", transcript);
    }
  }, [transcript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Browser does not support speech recognition.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <p>🎤 Voice Control Active: {listening ? "Listening..." : "Not Listening"}</p>
      <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>
        Start Voice
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop Voice</button>
      <button onClick={resetTranscript}>Clear</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
}

export default VoiceControl;

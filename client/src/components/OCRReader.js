import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { Button, Typography } from "@mui/material";

function OCRReader() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const { data } = await Tesseract.recognize(file, "eng");
      setText(data.text);
    } catch (err) {
      alert("Error reading image");
      console.log(err);
    }
    setLoading(false);
  };

  const handleReadImage = () => {
    if (!image) return alert("Please upload an image first");
    setLoading(true);
    Tesseract.recognize(image, "eng", { logger: (m) => console.log(m) })
      .then(({ data: { text } }) => {
        setText(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h3>OCR Bill Reader</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleReadImage} disabled={loading}>
        {loading ? "Reading..." : "Read Bill"}
      </button>
      {text && (
        <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc" }}>
          <strong>Extracted Text:</strong>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}

export default OCRReader;

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/banking", require("./routes/banking"));
app.use("/api/bills", require("./routes/bill"));
app.use("/api/upi", require("./routes/upi"));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`)))
.catch((err) => console.log("❌ MongoDB Error:", err));

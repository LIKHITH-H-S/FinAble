const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const upiRoutes = require("./routes/upi");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/upi", upiRoutes);
// Routes
const authRoutes = require("./routes/auth");
const bankingRoutes = require("./routes/banking");
const billRoutes = require("./routes/bill");

app.use("/api/auth", authRoutes);
app.use("/api/banking", bankingRoutes);
app.use("/api/bills", billRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch((err) => console.log(err));

// main server file - sets up express, connects to mongodb, registers routes

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Customer = require("./models/Customer");
const customerRoutes = require("./routes/customers");
const instructorRoutes = require("./routes/instructors");
const packageRoutes = require("./routes/packages");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// health check
app.get("/", (req, res) => {
  res.json({ message: "YogiTrack API is running" });
});

// routes
app.use("/customers", customerRoutes);
app.use("/instructors", instructorRoutes);
app.use("/packages", packageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

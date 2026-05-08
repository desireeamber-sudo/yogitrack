// main server file - sets up express, connects to mongodb, registers routes

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const { requireAuth } = require("./middleware/requireAuth");

const customerRoutes = require("./routes/customers");
const instructorRoutes = require("./routes/instructors");
const packageRoutes = require("./routes/packages");
const classRoutes = require("./routes/classes");
const attendanceRoutes = require("./routes/attendance");
const authRoutes = require("./routes/auth");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "yogitrack-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 8 }  // 8 hour session
}));

// redirect root to login if not authenticated
app.get("/", (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.redirect("/login.html");
  }
  res.redirect("/index.html");
});

// protect index.html directly
app.get("/index.html", (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.redirect("/login.html");
  }
  res.sendFile("index.html", { root: "./public" });
});

app.use(express.static("public"));  // static files
app.use(requireAuth);               // auth check

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// routes
app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);
app.use("/instructors", instructorRoutes);
app.use("/packages", packageRoutes);
app.use("/classes", classRoutes);
app.use("/attendance", attendanceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
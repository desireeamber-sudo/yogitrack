require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Customer = require("./models/Customer");
const customerRoutes = require("./routes/customers");
const instructorRoutes = require("./routes/instructors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

app.get("/", (req, res) => {
  res.json({
    message: "API is running"
  });
});

app.use("/customers", customerRoutes);
app.use("/instructors", instructorRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
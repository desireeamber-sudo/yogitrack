require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./models/Customer");
const customerRoutes = require("./routes/customers");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

app.get("/", (req, res) => {
    res.send("YogiTrack server is running");
});

app.get("/add-test-customer", async (req, res) => {
  try {
    const customer = new Customer({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      phone: "555-1234"
    });

    await customer.save();

    res.send("Test customer added");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding customer");
  }
});

app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving customers");
  }
});

app.use("/customers", customerRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
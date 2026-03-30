const express = require("express");
const router = express.Router();

const Customer = require("../models/Customer");

// GET all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving customers");
  }
});

// ADD test customer
router.get("/add-test", async (req, res) => {
  try {
    const customer = new Customer({
      firstName: "Route",
      lastName: "Test",
      email: "route@test.com",
      phone: "555-5678"
    });

    await customer.save();

    res.send("Customer added from route file");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding customer");
  }
});

// DELETE customer by ID
router.get("/delete/:id", async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.send("Customer deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting customer");
  }
});

// UPDATE customer by ID
router.get("/update/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        firstName: "Updated",
        lastName: "Customer"
      },
      { returnDocument: "after" }
    );

    res.json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating customer");
  }
});
module.exports = router;
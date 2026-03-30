const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

// GET all customers
router.get("/", customerController.getAllCustomers);

// ADD test customer
router.get("/add-test", customerController.addTestCustomer);

// DELETE customer
router.get("/delete/:id", customerController.deleteCustomer);

// UPDATE customer
router.get("/update/:id", customerController.updateCustomer);

module.exports = router;
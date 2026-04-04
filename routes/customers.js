const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

// GET all customers
router.get("/", customerController.getAllCustomers);

// GET one customer by id
router.get("/:id", customerController.getCustomerById);

// CREATE customer
router.post("/", customerController.createCustomer);

// UPDATE customer
router.put("/:id", customerController.updateCustomer);

// DELETE customer
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
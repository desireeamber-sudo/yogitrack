// customer controller - handles all customer crud operations

const Customer = require("../models/Customer");

// get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort("firstName");
    res.json({ message: "Customers retrieved successfully", data: customers });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving customers");
  }
};

// get one customer by id
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.json({ message: "Customer retrieved successfully", data: customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving customer" });
  }
};

// create new customer
exports.createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, address, email, phone, preferredContact } = req.body;

    // make sure all fields are present
    if (!firstName || !lastName || !address || !email || !phone || !preferredContact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check for duplicate name
    const existingCustomer = await Customer.findOne({ firstName, lastName });
    const allowDuplicate = req.headers["x-allow-duplicate"] === "true";

    if (existingCustomer && !allowDuplicate) {
      return res.status(400).json({
        message: "A customer with that name already exists. Please confirm before adding a duplicate."
      });
    }

    // generate next customer id based on highest existing - avoids collisions after deletes
    const lastCustomer = await Customer.findOne({ customerId: /^C/ }).sort({ customerId: -1 });
    const lastNum = lastCustomer ? parseInt(lastCustomer.customerId.replace("C", "")) : 0;
    const newCustomerId = "C" + String(lastNum + 1).padStart(5, "0");

    const customer = new Customer({
      ...req.body,
      customerId: newCustomerId,
      classBalance: 0
    });

    await customer.save();
    res.status(201).json({ message: "Customer created successfully", data: customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating customer" });
  }
};

// update customer
exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id, req.body, { returnDocument: "after" }
    );
    res.json({ message: "Customer updated successfully", data: updatedCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating customer");
  }
};

// delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting customer");
  }
};

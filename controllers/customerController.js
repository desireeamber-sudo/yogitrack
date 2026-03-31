const Customer = require("../models/Customer");

// GET all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving customers");
  }
};

// ADD test customer
exports.addTestCustomer = async (req, res) => {
  try {
    const customer = new Customer({
      firstName: "Controller",
      lastName: "Test",
      email: "controller@test.com",
      phone: "555-9999"
    });

    await customer.save();

    res.send("Customer added from controller");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding customer");
  }
};

// DELETE customer
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.send("Customer deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting customer");
  }
};

// UPDATE customer
exports.updateCustomer = async (req, res) => {
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
};

// CREATE customer from request body
exports.createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const customer = new Customer(req.body);
    await customer.save();

    res.status(201).json({
      message: "Customer created successfully",
      data: customer
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating customer"
    });
  }
};

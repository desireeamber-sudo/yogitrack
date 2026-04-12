// customer schema

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customerId: { type: String },                          // auto-generated e.g. C00001
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  preferredContact: { type: String, required: true, enum: ["phone", "email"] },
  classBalance: { type: Number, default: 0 }             // starts at 0 on creation
});

module.exports = mongoose.model("Customer", customerSchema);

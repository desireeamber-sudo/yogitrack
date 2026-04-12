const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  instructorId: {
    type: String
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  preferredContact: {
    type: String,
    required: true,
    enum: ["phone", "email"]
  }
});

module.exports = mongoose.model("Instructor", instructorSchema);
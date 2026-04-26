// class schema

const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  classId: { type: String },                            // auto-generated e.g. CL00001
  instructorId: { type: String, required: true },       // links to instructor record
  day: { type: String, required: true, enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
  time: { type: String, required: true },               // e.g. "09:00 AM"
  classType: { type: String, required: true, enum: ["General", "Special"] },
  payRate: { type: Number, required: true }
});

module.exports = mongoose.model("Class", classSchema);
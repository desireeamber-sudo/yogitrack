// attendance schema

const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  attendanceId: { type: String },                    // auto-generated e.g. AT00001
  classId: { type: String, required: true },         // which class
  date: { type: Date, required: true },              // date of attendance
  customers: [{ type: String }]                      // array of customerIds who attended
});

module.exports = mongoose.model("Attendance", attendanceSchema);
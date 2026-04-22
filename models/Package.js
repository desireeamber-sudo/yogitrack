// package schema

const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  packageId: { type: String },                          // auto-generated e.g. P00001
  packageName: { type: String, required: true },
  category: { type: String, required: true, enum: ["General", "Senior"] },
  numberOfClasses: { type: String, required: true, enum: ["1", "4", "10", "Unlimited"] },
  classType: { type: String, required: true, enum: ["General", "Special"] },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model("Package", packageSchema);
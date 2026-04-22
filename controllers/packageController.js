// package controller - handles all package crud operations

const Package = require("../models/Package");

// get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort("packageName");
    res.json({ message: "Packages retrieved successfully", data: packages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving packages" });
  }
};

// get one package by id
exports.getPackageById = async (req, res) => {
  try {
    const package_ = await Package.findById(req.params.id);
    res.json({ message: "Package retrieved successfully", data: package_ });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving package" });
  }
};

// create new package
exports.createPackage = async (req, res) => {
  try {
    const { packageName, category, numberOfClasses, classType, startDate, endDate, price } = req.body;

    // make sure all fields are present
    if (!packageName || !category || !numberOfClasses || !classType || !startDate || !endDate || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // generate next package id based on highest existing - avoids collisions after deletes
    const lastPackage = await Package.findOne({ packageId: /^P/ }).sort({ packageId: -1 });
    const lastNum = lastPackage ? parseInt(lastPackage.packageId.replace("P", "")) : 0;
    const newPackageId = "P" + String(lastNum + 1).padStart(5, "0");

    const package_ = new Package({ ...req.body, packageId: newPackageId });
    await package_.save();

    res.status(201).json({ message: "Package created successfully", data: package_ });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating package" });
  }
};

// update package
exports.updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id, req.body, { returnDocument: "after" }
    );
    res.json({ message: "Package updated successfully", data: updatedPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating package" });
  }
};

// delete package
exports.deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting package" });
  }
};
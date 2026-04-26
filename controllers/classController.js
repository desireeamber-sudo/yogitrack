// class controller - handles all class crud operations

const Class = require("../models/Class");
const Instructor = require("../models/Instructor");

// get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({ day: 1, time: 1 });
    res.json({ message: "Classes retrieved successfully", data: classes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving classes" });
  }
};

// get one class by id
exports.getClassById = async (req, res) => {
  try {
    const class_ = await Class.findById(req.params.id);
    res.json({ message: "Class retrieved successfully", data: class_ });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving class" });
  }
};

// create new class
exports.createClass = async (req, res) => {
  try {
    const { instructorId, day, time, classType, payRate } = req.body;

    // make sure all fields are present
    if (!instructorId || !day || !time || !classType || !payRate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check for schedule conflict - only one class can be held at a time
    const conflict = await Class.findOne({ day, time });
    if (conflict) {
      return res.status(400).json({
        message: `Schedule conflict — a class is already scheduled on ${day} at ${time}. Please choose a different day or time.`
      });
    }

    // verify instructor exists
    const instructor = await Instructor.findOne({ instructorId });
    if (!instructor) {
      return res.status(400).json({ message: "Instructor not found. Please check the Instructor ID." });
    }

    // generate next class id based on highest existing
    const lastClass = await Class.findOne({ classId: /^CL/ }).sort({ classId: -1 });
    const lastNum = lastClass ? parseInt(lastClass.classId.replace("CL", "")) : 0;
    const newClassId = "CL" + String(lastNum + 1).padStart(5, "0");

    const class_ = new Class({ ...req.body, classId: newClassId });
    await class_.save();

    res.status(201).json({ message: "Class scheduled successfully", data: class_ });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating class" });
  }
};

// update class
exports.updateClass = async (req, res) => {
  try {
    // check for schedule conflict on update - exclude current record
    const { day, time } = req.body;
    if (day && time) {
      const conflict = await Class.findOne({ day, time, _id: { $ne: req.params.id } });
      if (conflict) {
        return res.status(400).json({
          message: `Schedule conflict — a class is already scheduled on ${day} at ${time}. Please choose a different day or time.`
        });
      }
    }

    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id, req.body, { returnDocument: "after" }
    );
    res.json({ message: "Class updated successfully", data: updatedClass });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating class" });
  }
};

// delete class
exports.deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting class" });
  }
};
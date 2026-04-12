const Instructor = require("../models/Instructor");

// GET all instructors
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();

    res.json({
      message: "Instructors retrieved successfully",
      data: instructors
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving instructors"
    });
  }
};

// GET one instructor by id
exports.getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);

    res.json({
      message: "Instructor retrieved successfully",
      data: instructor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving instructor"
    });
  }
};

// CREATE instructor
exports.createInstructor = async (req, res) => {
  try {
    const { firstName, lastName, address, email, phone, preferredContact } = req.body;

    if (!firstName || !lastName || !address || !email || !phone || !preferredContact) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingInstructor = await Instructor.findOne({
      firstName,
      lastName
    });

    const allowDuplicate = req.headers["x-allow-duplicate"] === "true";

    if (existingInstructor && !allowDuplicate) {
      return res.status(400).json({
        message: "An instructor with that name already exists. Do you want to continue?"
      });
    }

    const lastInstructor = await Instructor.findOne({ instructorId: /^I/ })
      .sort({ instructorId: -1 });
    const lastNum = lastInstructor
      ? parseInt(lastInstructor.instructorId.replace("I", ""))
      : 0;
    const newInstructorId = "I" + String(lastNum + 1).padStart(5, "0");

    const instructor = new Instructor({
      ...req.body,
      instructorId: newInstructorId
    });

    await instructor.save();

    res.status(201).json({
      message: "Instructor created successfully",
      data: instructor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating instructor"
    });
  }
};

// UPDATE instructor
exports.updateInstructor = async (req, res) => {
  try {
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    res.json({
      message: "Instructor updated successfully",
      data: updatedInstructor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating instructor"
    });
  }
};

// DELETE instructor
exports.deleteInstructor = async (req, res) => {
  try {
    await Instructor.findByIdAndDelete(req.params.id);

    res.json({
      message: "Instructor deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting instructor"
    });
  }
};
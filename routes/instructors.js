const express = require("express");
const router = express.Router();

const instructorController = require("../controllers/instructorController");

// GET all instructors
router.get("/", instructorController.getAllInstructors);

// GET one instructor by id
router.get("/:id", instructorController.getInstructorById);

// CREATE instructor
router.post("/", instructorController.createInstructor);

// UPDATE instructor
router.put("/:id", instructorController.updateInstructor);

// DELETE instructor
router.delete("/:id", instructorController.deleteInstructor);

module.exports = router;
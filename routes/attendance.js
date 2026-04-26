// attendance routes

const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.get("/", attendanceController.getAllAttendance);
router.get("/:id", attendanceController.getAttendanceById);
router.post("/", attendanceController.recordAttendance);
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;
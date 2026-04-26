// attendance controller

const Attendance = require("../models/Attendance");
const Customer = require("../models/Customer");
const Class = require("../models/Class");

// get all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().sort({ date: -1 });
    res.json({ message: "Attendance retrieved successfully", data: records });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving attendance" });
  }
};

// get attendance by id
exports.getAttendanceById = async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id);
    res.json({ message: "Attendance retrieved successfully", data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving attendance" });
  }
};

// record attendance - deducts class balance for each customer
exports.recordAttendance = async (req, res) => {
  try {
    const { classId, date, customers } = req.body;

    if (!classId || !date || !customers || customers.length === 0) {
      return res.status(400).json({ message: "Class, date, and at least one customer are required" });
    }

    // verify class exists
    const class_ = await Class.findOne({ classId });
    if (!class_) {
      return res.status(400).json({ message: "Class not found" });
    }

    // generate attendance id
    const lastRecord = await Attendance.findOne({ attendanceId: /^AT/ }).sort({ attendanceId: -1 });
    const lastNum = lastRecord ? parseInt(lastRecord.attendanceId.replace("AT", "")) : 0;
    const newAttendanceId = "AT" + String(lastNum + 1).padStart(5, "0");

    // save attendance record
    const record = new Attendance({ attendanceId: newAttendanceId, classId, date, customers });
    await record.save();

    // deduct 1 from each customer's class balance
    const updates = await Promise.all(customers.map(async (customerId) => {
      const customer = await Customer.findOneAndUpdate(
        { customerId },
        { $inc: { classBalance: -1 } },
        { returnDocument: "after" }
      );
      return customer;
    }));

    res.status(201).json({
      message: "Attendance recorded successfully",
      data: record,
      customers: updates
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error recording attendance" });
  }
};

// delete attendance record
exports.deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ message: "Attendance deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting attendance" });
  }
};
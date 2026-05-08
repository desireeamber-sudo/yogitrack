/**
 * seed.js
 * Seeds demo data for YogiTrack - Yoga H'om Pittsburgh
 * Run with: node seed.js
 *
 * Seeds:
 *   - 3 Instructors
 *   - 7 Customers (with class balances)
 *   - 5 Packages
 *   - 6 Classes
 *   - 2 Attendance records
 */

const mongoose = require("mongoose");
require("dotenv").config();

const Instructor = require("./models/Instructor");
const Customer   = require("./models/Customer");
const Package    = require("./models/Package");
const Class      = require("./models/Class");
const Attendance = require("./models/Attendance");

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  // clear existing data
  await Instructor.deleteMany({});
  await Customer.deleteMany({});
  await Package.deleteMany({});
  await Class.deleteMany({});
  await Attendance.deleteMany({});
  console.log("Cleared existing data");

  // ── INSTRUCTORS ──
  const instructors = await Instructor.insertMany([
    { instructorId: "I00001", firstName: "Margaret", lastName: "Kowalski",
      address: "412 Shadyside Ave, Pittsburgh, PA 15232", phone: "412-555-0181",
      email: "m.kowalski@yogahom.com", preferredContact: "email" },
    { instructorId: "I00002", firstName: "Patricia", lastName: "Novak",
      address: "88 Squirrel Hill Rd, Pittsburgh, PA 15217", phone: "412-555-0247",
      email: "p.novak@yogahom.com", preferredContact: "phone" },
    { instructorId: "I00003", firstName: "Rachel", lastName: "Stemple",
      address: "204 Mount Lebanon Blvd, Pittsburgh, PA 15228", phone: "412-555-0392",
      email: "r.stemple@yogahom.com", preferredContact: "email" },
  ]);
  console.log(`Seeded ${instructors.length} instructors`);

  // ── CUSTOMERS ──
  const customers = await Customer.insertMany([
    { customerId: "C00001", firstName: "Sandra",    lastName: "Dubowski",
      address: "55 Mount Lebanon Blvd, Pittsburgh, PA 15228", phone: "412-555-1021",
      email: "sandra.dubowski@gmail.com",   preferredContact: "email",  classBalance: 4 },
    { customerId: "C00002", firstName: "James",     lastName: "Harrington",
      address: "301 Beechwood Blvd, Pittsburgh, PA 15217",   phone: "412-555-2033",
      email: "j.harrington@gmail.com",      preferredContact: "phone",  classBalance: 10 },
    { customerId: "C00003", firstName: "Maria",     lastName: "Petrocelli",
      address: "78 Forbes Ave, Pittsburgh, PA 15213",         phone: "412-555-3044",
      email: "maria.p@outlook.com",         preferredContact: "email",  classBalance: 0 },
    { customerId: "C00004", firstName: "Dorothy",   lastName: "Blackwell",
      address: "19 Frick Park Lane, Pittsburgh, PA 15217",    phone: "412-555-4055",
      email: "d.blackwell@gmail.com",       preferredContact: "email",  classBalance: 2 },
    { customerId: "C00005", firstName: "Anthony",   lastName: "Russo",
      address: "543 Penn Ave, Pittsburgh, PA 15222",          phone: "412-555-5066",
      email: "a.russo@yahoo.com",           preferredContact: "phone",  classBalance: 8 },
    { customerId: "C00006", firstName: "Linda",     lastName: "Mazurek",
      address: "112 Walnut St, Pittsburgh, PA 15232",         phone: "412-555-6077",
      email: "linda.m@gmail.com",           preferredContact: "email",  classBalance: 1 },
    { customerId: "C00007", firstName: "Robert",    lastName: "Gaffney",
      address: "667 Murray Ave, Pittsburgh, PA 15217",        phone: "412-555-7088",
      email: "r.gaffney@comcast.net",       preferredContact: "phone",  classBalance: 3 },
  ]);
  console.log(`Seeded ${customers.length} customers`);

  // ── PACKAGES ──
  const packages = await Package.insertMany([
    { packageId: "P00001", packageName: "Single Drop-In (General)",
      category: "General", numberOfClasses: "1", classType: "General",
      startDate: new Date("2026-01-01"), endDate: new Date("2026-12-31"), price: 20 },
    { packageId: "P00002", packageName: "4 Class Pass (General)",
      category: "General", numberOfClasses: "4", classType: "General",
      startDate: new Date("2026-01-01"), endDate: new Date("2026-01-31"), price: 70 },
    { packageId: "P00003", packageName: "10 Class Pass (General)",
      category: "General", numberOfClasses: "10", classType: "General",
      startDate: new Date("2026-01-01"), endDate: new Date("2026-03-31"), price: 140 },
    { packageId: "P00004", packageName: "3 Months Unlimited (General)",
      category: "General", numberOfClasses: "Unlimited", classType: "General",
      startDate: new Date("2026-01-01"), endDate: new Date("2026-03-31"), price: 400 },
    { packageId: "P00005", packageName: "4 Class Pass (Senior)",
      category: "Senior", numberOfClasses: "4", classType: "General",
      startDate: new Date("2026-01-01"), endDate: new Date("2026-01-31"), price: 60 },
  ]);
  console.log(`Seeded ${packages.length} packages`);

  // ── CLASSES ──
  const classes = await Class.insertMany([
    { classId: "CL00001", instructorId: "I00001", day: "Monday",
      time: "9:00 AM", classType: "General", payRate: 45 },
    { classId: "CL00002", instructorId: "I00002", day: "Monday",
      time: "6:15 PM", classType: "General", payRate: 45 },
    { classId: "CL00003", instructorId: "I00003", day: "Wednesday",
      time: "9:00 AM", classType: "General", payRate: 45 },
    { classId: "CL00004", instructorId: "I00001", day: "Wednesday",
      time: "4:45 PM", classType: "Special", payRate: 55 },
    { classId: "CL00005", instructorId: "I00002", day: "Friday",
      time: "9:00 AM", classType: "General", payRate: 45 },
    { classId: "CL00006", instructorId: "I00003", day: "Saturday",
      time: "9:00 AM", classType: "General", payRate: 45 },
  ]);
  console.log(`Seeded ${classes.length} classes`);

  // ── ATTENDANCE ──
  const attendance = await Attendance.insertMany([
    { attendanceId: "AT00001", classId: "CL00001",
      date: new Date("2026-04-28"),
      customers: ["C00001", "C00002", "C00004", "C00007"] },
    { attendanceId: "AT00002", classId: "CL00003",
      date: new Date("2026-04-30"),
      customers: ["C00001", "C00005", "C00006"] },
  ]);
  console.log(`Seeded ${attendance.length} attendance records`);

  await mongoose.disconnect();
  console.log("\nSeed complete!");
  console.log("\nSummary:");
  console.log("  Instructors: I00001 (Kowalski), I00002 (Novak), I00003 (Stemple)");
  console.log("  Customers: C00001-C00007 (various balances)");
  console.log("  Packages: P00001-P00005 (General and Senior options)");
  console.log("  Classes: CL00001-CL00006 (Mon/Wed/Fri/Sat schedule)");
  console.log("  Attendance: AT00001-AT00002");
}

seed().catch(err => { console.error("Seed failed:", err); process.exit(1); });

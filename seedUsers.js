/**
 * seedUsers.js
 * Seeds default manager and instructor accounts into the database.
 * Run with: node seedUsers.js
 *
 * Default credentials:
 *   Manager:
 *     Email:    manager@yogahom.com
 *     Password: Manager123!
 *   Instructor:
 *     Email:    instructor@yogahom.com
 *     Password: Instructor123!
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function seedUsers() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // clear existing users
    await User.deleteMany({});
    console.log("Cleared existing users");

    const managerHash = await bcrypt.hash("Manager123!", 10);
    const instructorHash = await bcrypt.hash("Instructor123!", 10);

    await User.insertMany([
      {
        fullName: "Studio Manager",
        email: "manager@yogahom.com",
        password: managerHash,
        role: "Manager"
      },
      {
        fullName: "Margaret Kowalski",
        email: "instructor@yogahom.com",
        password: instructorHash,
        role: "Instructor"
      }
    ]);

    console.log("\nAccounts created:");
    console.log("  Manager:");
    console.log("    Email:    manager@yogahom.com");
    console.log("    Password: Manager123!");
    console.log("  Instructor:");
    console.log("    Email:    instructor@yogahom.com");
    console.log("    Password: Instructor123!");

    await mongoose.disconnect();
    console.log("\nDone.");
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seedUsers();
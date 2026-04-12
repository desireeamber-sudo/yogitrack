const mongoose = require("mongoose");
require("dotenv").config();

const Customer = require("./models/Customer");
const Instructor = require("./models/Instructor");

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

const instructors = [
  {
    instructorId: "I00001",
    firstName: "Margaret",
    lastName: "Kowalski",
    address: "412 Shadyside Ave, Pittsburgh, PA 15232",
    phone: "412-555-0181",
    email: "m.kowalski@yogahom.com",
    preferredContact: "email"
  },
  {
    instructorId: "I00002",
    firstName: "Diane",
    lastName: "Petrosky",
    address: "88 Squirrel Hill Rd, Pittsburgh, PA 15217",
    phone: "412-555-0234",
    email: "d.petrosky@yogahom.com",
    preferredContact: "email"
  },
  {
    instructorId: "I00003",
    firstName: "Rachel",
    lastName: "Mancini",
    address: "214 Lawrenceville Blvd, Pittsburgh, PA 15201",
    phone: "412-555-0378",
    email: "r.mancini@yogahom.com",
    preferredContact: "phone"
  }
];

const customers = [
  {
    customerId: "C00001",
    firstName: "Sandra",
    lastName: "Dubowski",
    address: "55 Mount Lebanon Blvd, Pittsburgh, PA 15228",
    phone: "412-555-1021",
    email: "sandra.dubowski@gmail.com",
    preferredContact: "email",
    classBalance: 4
  },
  {
    customerId: "C00002",
    firstName: "Carol",
    lastName: "Fitzpatrick",
    address: "310 Brookline Ave, Pittsburgh, PA 15226",
    phone: "412-555-1142",
    email: "cfitzpatrick@outlook.com",
    preferredContact: "phone",
    classBalance: 10
  },
  {
    customerId: "C00003",
    firstName: "Patricia",
    lastName: "Yablonsky",
    address: "78 Oakland Ave, Pittsburgh, PA 15213",
    phone: "412-555-1267",
    email: "pyablonsky@gmail.com",
    preferredContact: "email",
    classBalance: 0
  },
  {
    customerId: "C00004",
    firstName: "Thomas",
    lastName: "Grzelak",
    address: "902 Penn Hills Dr, Pittsburgh, PA 15235",
    phone: "412-555-1389",
    email: "tgrzelak@yahoo.com",
    preferredContact: "phone",
    classBalance: 4
  },
  {
    customerId: "C00005",
    firstName: "Linda",
    lastName: "Stankiewicz",
    address: "1204 Beechview St, Pittsburgh, PA 15216",
    phone: "412-555-1445",
    email: "lstankiewicz@gmail.com",
    preferredContact: "email",
    classBalance: 10
  },
  {
    customerId: "C00006",
    firstName: "James",
    lastName: "Murdoch",
    address: "47 North Side Blvd, Pittsburgh, PA 15212",
    phone: "412-555-1563",
    email: "jmurdoch@gmail.com",
    preferredContact: "phone",
    classBalance: 1
  },
  {
    customerId: "C00007",
    firstName: "Barbara",
    lastName: "Chmielewski",
    address: "333 Polish Hill Ave, Pittsburgh, PA 15224",
    phone: "412-555-1678",
    email: "bchmielewski@outlook.com",
    preferredContact: "email",
    classBalance: 0
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await Customer.deleteMany({});
    await Instructor.deleteMany({});
    console.log("Cleared existing data");

    await Instructor.insertMany(instructors);
    console.log(`Inserted ${instructors.length} instructors`);

    await Customer.insertMany(customers);
    console.log(`Inserted ${customers.length} customers`);

    console.log("\nSeed complete! Data summary:");
    console.log(`  Instructors: I00001 - I000${String(instructors.length).padStart(2,"0")}`);
    console.log(`  Customers:   C00001 - C000${String(customers.length).padStart(2,"0")}`);

    await mongoose.disconnect();
    console.log("Done.");
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();

# YogiTrack 🪷

A web-based studio management application for **Yoga H'om**, a yoga studio located in the suburbs of Pittsburgh, PA. YogiTrack automates the core business processes of the studio, replacing a manual paper-based record-keeping system with a modern full-stack web application.

**Live Application:** https://yogitrack-des-9bc253af7715.herokuapp.com/

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Deployment | Heroku |
| Version Control | Git, GitHub |

---

## Features (Application 1.0)

- **Add Instructor** — Name duplicate check, system-generated Instructor ID (I00001...), full validation
- **Edit Instructor** — Load existing record, update and save
- **Delete Instructor** — Confirmation dialog before permanent removal
- **Add Customer** — Name duplicate check, system-generated Customer ID (C00001...), class balance initialized to 0
- **Edit Customer** — Load existing record, update and save
- **Delete Customer** — Confirmation dialog before permanent removal
- **People List** — Unified view of all customers and instructors with color-coded type badges, per-column filtering on all fields, sorted by ID

---

## Project Structure

```
yogitrack/
├── controllers/
│   ├── customerController.js    # Customer CRUD business logic
│   └── instructorController.js  # Instructor CRUD business logic
├── models/
│   ├── Customer.js              # Mongoose customer schema
│   └── Instructor.js            # Mongoose instructor schema
├── routes/
│   ├── customers.js             # Customer API routes
│   └── instructors.js           # Instructor API routes
├── public/
│   ├── index.html               # Home / navigation
│   ├── people.html              # Unified people list
│   ├── add-customer.html        # Add customer form
│   ├── add-instructor.html      # Add instructor form
│   ├── edit-customer.html       # Edit customer form
│   ├── edit-instructor.html     # Edit instructor form
│   └── styles.css               # Global stylesheet
├── seed.js                      # Database seed script (Pittsburgh test data)
├── server.js                    # Express app entry point
├── package.json
└── .env                         # Environment variables (not committed)
```

---

## API Endpoints

### Customers `/customers`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/customers` | Get all customers |
| GET | `/customers/:id` | Get customer by MongoDB ID |
| POST | `/customers` | Create new customer |
| PUT | `/customers/:id` | Update customer |
| DELETE | `/customers/:id` | Delete customer |

### Instructors `/instructors`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/instructors` | Get all instructors |
| GET | `/instructors/:id` | Get instructor by MongoDB ID |
| POST | `/instructors` | Create new instructor |
| PUT | `/instructors/:id` | Update instructor |
| DELETE | `/instructors/:id` | Delete instructor |

---

## Data Models

### Customer
```
customerId        String   (auto-generated, e.g. C00001)
firstName         String   (required)
lastName          String   (required)
address           String   (required)
phone             String   (required, format: 123-456-7890)
email             String   (required)
preferredContact  String   (required, enum: phone | email)
classBalance      Number   (default: 0)
```

### Instructor
```
instructorId      String   (auto-generated, e.g. I00001)
firstName         String   (required)
lastName          String   (required)
address           String   (required)
phone             String   (required, format: 123-456-7890)
email             String   (required)
preferredContact  String   (required, enum: phone | email)
```

---

## Local Development Setup

### Prerequisites
- Node.js
- MongoDB Atlas account (or local MongoDB)

### Installation

```bash
# Clone the repository
git clone https://github.com/desireeamber-sudo/yogitrack.git
cd yogitrack

# Install dependencies
npm install

# Create .env file
echo "MONGO_URI=your_mongodb_connection_string" > .env

# Start the development server
node server.js
```

The application will be available at `http://localhost:3000`.

### Seed Database

To populate the database with sample Pittsburgh-area yoga studio data:

```bash
node seed.js
```

This will insert 3 instructors and 7 customers, clearing any existing records.

---

## Deployment

YogiTrack is deployed on Heroku with a GitHub-connected CI/CD pipeline. Pushes to the `main` branch automatically trigger a new deployment.

```bash
# Deploy manually via Heroku CLI
git push heroku main

# Run seed script on production
heroku run node seed.js --app yogitrack-des
```

---

## Course Information

**Course:** ACS-5423-999 — Software Development for the World Wide Web  
**Term:** Spring 2026  
**Project:** YogiTrack — Yoga H'om Studio Management System

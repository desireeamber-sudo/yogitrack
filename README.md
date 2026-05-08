# YogiTrack 🪷

A web-based studio management application for **Yoga H'om**, a yoga studio located in the suburbs of Pittsburgh, PA. YogiTrack automates the core business processes of the studio, replacing a manual paper-based record-keeping system with a modern full-stack web application.

**Live Application:** https://yogitrack-des-9bc253af7715.herokuapp.com/  
**GitHub Repository:** https://github.com/desireeamber-sudo/yogitrack

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript | UI pages, forms, dynamic table rendering, Fetch API |
| Backend | Node.js, Express.js | REST API, routing, business logic, session management |
| Database | MongoDB, Mongoose | NoSQL document storage, schema validation |
| Authentication | express-session, bcryptjs | Session-based auth, password hashing, role-based access |
| Deployment | Heroku (Eco Dyno) | Cloud hosting, CI/CD auto-deploy pipeline |
| Version Control | Git, GitHub | Source control, commit history |

---

## Features (Application 2.0)

### Authentication
- Login / Logout with session-based authentication
- Role-based access control (Manager vs Instructor)
- Manager-only user registration and management
- Passwords stored as bcrypt hashes

### Customer Management
- Add Customer — name duplicate check, system-generated ID (C00001...), class balance initialized to 0
- Edit Customer — load existing record, update and save
- Delete Customer — confirmation dialog before removal
- People List — unified view with color-coded badges, per-column filtering

### Instructor Management
- Add Instructor — name duplicate check, system-generated ID (I00001...)
- Edit / Delete Instructor
- Appears in unified People List alongside customers

### Package Management
- Add / Edit / Delete class packages
- System-generated Package ID (P00001...)
- Category (General / Senior), Class Type (General / Special), number of classes, price, validity dates
- Color-coded badges on package list

### Class Management
- Add / Edit / Delete classes
- System-generated Class ID (CL00001...)
- Schedule conflict detection — only one class per day/time slot
- Instructor dropdown populated from existing instructors
- Color-coded class type badges on schedule

### Attendance Recording
- Instructor selects their assigned class
- Date/time pre-filled to now, editable
- Schedule mismatch warning if date/time doesn't match class schedule
- Customer checklist with live class balance display
- Balance warning for customers with zero or negative balance
- On save: deducts 1 credit from each attending customer's balance
- Check-in confirmation message displayed for each customer

---

## Project Structure

```
yogitrack/
├── controllers/
│   ├── attendanceController.js
│   ├── authController.js
│   ├── classController.js
│   ├── customerController.js
│   ├── instructorController.js
│   └── packageController.js
├── middleware/
│   └── requireAuth.js
├── models/
│   ├── Attendance.js
│   ├── Class.js
│   ├── Customer.js
│   ├── Instructor.js
│   ├── Package.js
│   └── User.js
├── routes/
│   ├── attendance.js
│   ├── auth.js
│   ├── classes.js
│   ├── customers.js
│   ├── instructors.js
│   └── packages.js
├── public/
│   ├── index.html               # Manager dashboard
│   ├── instructor.html          # Instructor dashboard
│   ├── login.html               # Login page
│   ├── register.html            # Register new user (manager only)
│   ├── manage-users.html        # User management (manager only)
│   ├── people.html              # Unified people list
│   ├── add-customer.html
│   ├── edit-customer.html
│   ├── add-instructor.html
│   ├── edit-instructor.html
│   ├── packages.html
│   ├── add-package.html
│   ├── edit-package.html
│   ├── classes.html
│   ├── add-class.html
│   ├── edit-class.html
│   ├── attendance.html
│   ├── record-attendance.html
│   ├── checkManagerRole.js      # Shared role protection script
│   └── styles.css               # Global stylesheet
├── seed.js                      # Demo data seed script
├── seedUsers.js                 # Default user accounts seed script
├── server.js                    # Express app entry point
├── package.json
└── .env                         # Environment variables (not committed)
```

---

## API Endpoints

### Authentication `/auth`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | Login with email and password |
| POST | `/auth/logout` | Destroy session and log out |
| POST | `/auth/register` | Register new user (Manager only) |
| GET | `/auth/users` | Get all users (Manager only) |
| PUT | `/auth/users/:id` | Update user (Manager only) |
| DELETE | `/auth/users/:id` | Delete user (Manager only) |
| GET | `/auth/me` | Get current session role |

### Customers `/customers`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/customers` | Get all customers |
| GET | `/customers/:id` | Get customer by MongoDB ID |
| POST | `/customers` | Create new customer |
| PUT | `/customers/:id` | Update customer |
| DELETE | `/customers/:id` | Delete customer |

### Instructors `/instructors`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/instructors` | Get all instructors |
| GET | `/instructors/:id` | Get instructor by MongoDB ID |
| POST | `/instructors` | Create new instructor |
| PUT | `/instructors/:id` | Update instructor |
| DELETE | `/instructors/:id` | Delete instructor |

### Packages `/packages`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/packages` | Get all packages |
| GET | `/packages/:id` | Get package by MongoDB ID |
| POST | `/packages` | Create new package |
| PUT | `/packages/:id` | Update package |
| DELETE | `/packages/:id` | Delete package |

### Classes `/classes`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/classes` | Get all classes |
| GET | `/classes/:id` | Get class by MongoDB ID |
| POST | `/classes` | Create new class (conflict check) |
| PUT | `/classes/:id` | Update class (conflict check) |
| DELETE | `/classes/:id` | Delete class |

### Attendance `/attendance`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/attendance` | Get all attendance records |
| GET | `/attendance/:id` | Get attendance record by MongoDB ID |
| POST | `/attendance` | Record attendance and deduct balances |
| DELETE | `/attendance/:id` | Delete attendance record |

---

## Default Credentials

| Role | Email | Password |
|---|---|---|
| Manager | manager@yogahom.com | Manager123! |
| Instructor | instructor@yogahom.com | Instructor123! |

> Run `node seedUsers.js` to create these accounts.

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
echo "SESSION_SECRET=your_session_secret" >> .env

# Seed the database
node seed.js
node seedUsers.js

# Start the development server
node server.js
```

The application will be available at `http://localhost:3000`.

---

## Deployment

YogiTrack is deployed on Heroku with a GitHub-connected CI/CD pipeline. Every push to the `main` branch automatically triggers a new Heroku deployment.

```bash
# Seed production database
heroku run node seed.js --app yogitrack-des
heroku run node seedUsers.js --app yogitrack-des
```

---

## Course Information

**Course:** ACS-5423-999 — Software Development for the World Wide Web
**Term:** Spring 2026
**Project:** YogiTrack — Yoga H'om Studio Management System
**Student:** Des Dew
// auth controller - login, logout, register

const User = require("../models/User");
const bcrypt = require("bcryptjs");

// show login page
exports.getLogin = (req, res) => {
  res.sendFile("login.html", { root: "./public" });
};

// handle login form submit
exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // set session
    req.session.userId = user._id;
    req.session.role = user.role;
    req.session.fullName = user.fullName;

    res.json({ message: "Login successful", role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

// handle logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login.html");
};

// register new user - manager only
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check email not already in use
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "An account with that email already exists" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ fullName, email, password: hashed, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully", data: { fullName, email, role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// get all users - manager only
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ message: "Users retrieved successfully", data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};

// delete user - manager only
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};
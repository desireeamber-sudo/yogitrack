// auth controller - login, logout, register

const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res) => {
  res.sendFile("login.html", { root: "./public" });
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });
    // set session data on successful login
    req.session.userId = user._id;
    req.session.role = user.role;
    req.session.fullName = user.fullName;
    res.json({ message: "Login successful", role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login.html");
};

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "An account with that email already exists" });
    }
    // hash password before storing
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashed, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully", data: { fullName, email, role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ message: "Users retrieved successfully", data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};

// update user - manager only
exports.updateUser = async (req, res) => {
  try {
    const { fullName, email, role, password } = req.body;
    const updates = { fullName, email, role };

    // only hash and update password if one was provided
    if (password && password.trim() !== "") {
      updates.password = await bcrypt.hash(password, 10);
    }

    const updated = await User.findByIdAndUpdate(
      req.params.id, updates, { new: true }
    ).select("-password");

    res.json({ message: "User updated successfully", data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

// auth routes

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.postLogin);
router.post("/logout", authController.logout);
router.post("/register", authController.register);
router.get("/users", authController.getAllUsers);
router.delete("/users/:id", authController.deleteUser);

// check current session - used by frontend pages to verify role
router.get("/me", (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: "Not logged in" });
  }
  res.json({ role: req.session.role, fullName: req.session.fullName });
});

module.exports = router;
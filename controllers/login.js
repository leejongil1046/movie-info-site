const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models/database.js"); // Import the promise-based pool
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query to find the user by email
    const findUserQuery = "SELECT * FROM users WHERE email = ?";
    const [users] = await db.query(findUserQuery, [email]);

    if (users.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const user = users[0];

    // Check if the password matches
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    // Login successful
    res.json({ success: true, message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

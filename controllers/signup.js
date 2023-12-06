const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/dbConfig"); // Assuming you have a dbConfig.js file as explained earlier
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    // Extract form data
    const { username, email, password, confirmPassword, year, month, day } =
      req.body;

    // Validate inputs...

    // Check if the passwords match
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    // Format birthdate
    const formattedMonth = month.length === 1 ? `0${month}` : month;
    const formattedDay = day.length === 1 ? `0${day}` : day;
    const birthdate = `${year}${formattedMonth}${formattedDay}`;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into the database
    const result = await db.execute(
      `INSERT INTO Users (Username, Email, Password, Birthdate) VALUES (?, ?, ?, ?)`,
      [username, email, hashedPassword, birthdate]
    );

    // Redirect or send a success message
    res.redirect("/success");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;

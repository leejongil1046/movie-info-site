// const express = require("express");
// const bcrypt = require("bcrypt");
// const db = require("../models/database.js"); // Assuming you have a dbConfig.js file as explained earlier
// const signupModel = require("../models/signup");
// const router = express.Router();

// exports.checkUsername = async (req, res) => {
//   const isTaken = await userModel.checkUsername(req.body.username);
//   res.json({ isTaken });
// };

// exports.checkEmail = async (req, res) => {
//   const isTaken = await userModel.checkEmail(req.body.email);
//   res.json({ isTaken });
// };

// exports.registerUser = async (req, res) => {
//   try {
//     const { username, email, password, confirmPassword, year, month, day } =
//       req.body;
//     if (password !== confirmPassword) {
//       return res.status(400).send("Passwords do not match");
//     }

//     const formattedMonth = month.length === 1 ? `0${month}` : month;
//     const formattedDay = day.length === 1 ? `0${day}` : day;
//     const birthdate = `${year}-${formattedMonth}-${formattedDay}`;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await signupModel.registerUser(username, email, hashedPassword, birthdate);
//     res.redirect("/success");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// };

// module.exports = router;

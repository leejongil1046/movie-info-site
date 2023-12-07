// const db = require("../models/database.js");

// exports.checkUsername = async (username) => {
//   const [rows] = await db.query(`SELECT * FROM Users WHERE Username = ?`, [
//     username,
//   ]);
//   return rows.length > 0;
// };

// exports.checkEmail = async (email) => {
//   const [rows] = await db.query(`SELECT * FROM Users WHERE Email = ?`, [email]);
//   return rows.length > 0;
// };

// exports.registerUser = async (username, email, hashedPassword, birthdate) => {
//   const query = `INSERT INTO Users (Username, Email, Password, Birthdate) VALUES (?, ?, ?, ?)`;
//   try {
//     const [result] = await db.execute(query, [
//       username,
//       email,
//       hashedPassword,
//       birthdate,
//     ]);
//     return result;
//   } catch (err) {
//     throw err; // 에러를 다시 던져서 컨트롤러에서 처리할 수 있도록 함
//   }
// };

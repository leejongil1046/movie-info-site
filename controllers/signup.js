const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models/database.js"); // Assuming you have a dbConfig.js file as explained earlier
const router = express.Router();

exports.checkUsername = async (req, res) => {
  console.log(req);
  const username = req.body.username;
  try {
    const query = "SELECT COUNT(*) FROM users WHERE username = ?";
    const result = await db.query(query, [username]);

    const isTaken = result[0]["COUNT(*)"] > 0;
    res.json({ isTaken });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.checkEmail = async (req, res) => {
  const email = req.body.email;
  try {
    const query = "SELECT COUNT(*) FROM users WHERE email = ?";
    const result = await db.query(query, [email]);

    const isTaken = result[0]["COUNT(*)"] > 0;
    res.json({ isTaken });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, year, month, day } =
      req.body;

    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match.");
    }

    // 날짜 포매팅
    const birthdate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL 쿼리문 작성
    const query = `INSERT INTO users (username, email, password, birthdate) VALUES (?, ?, ?, ?)`;

    // 데이터베이스에 쿼리 실행
    await db.query(query, [username, email, hashedPassword, birthdate]);

    // 성공 페이지로 리다이렉트
    res.redirect("/success");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error during registration.");
  }
};
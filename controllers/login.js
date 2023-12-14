const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models/database.js"); // Promise 기반의 데이터베이스 풀을 가져옴
const router = express.Router(); // Express 라우터 인스턴스 생성

// 로그인 요청을 처리하는 라우터
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // 요청에서 이메일과 비밀번호 추출

    // 이메일을 사용하여 사용자 찾는 쿼리
    const findUserQuery = "SELECT * FROM users WHERE email = ?";
    const [users] = await db.query(findUserQuery, [email]); // 쿼리 실행

    // 사용자가 존재하지 않는 경우
    if (users.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }

    const user = users[0]; // 첫 번째 사용자 정보 추출

    // 비밀번호가 일치하는지 확인
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "비밀번호가 일치하지 않습니다." });
    }

    // 로그인 성공
    res.json({ success: true, message: "성공적으로 로그인했습니다." });
  } catch (error) {
    console.error(error); // 오류 로깅
    res.status(500).json({ success: false, message: "서버 오류" }); // 서버 오류 응답
  }
});

module.exports = router; // 라우터 모듈로 내보냄

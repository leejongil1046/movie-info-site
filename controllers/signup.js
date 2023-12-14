const bcrypt = require("bcrypt");
const db = require("../models/database.js"); // 데이터베이스 설정 파일을 불러옴

// 사용자 이름 중복 여부를 확인하는 함수
exports.checkUsername = async (req, res) => {
  const username = req.body.username.toLowerCase(); // 사용자 입력을 소문자로 변환
  try {
    const [rows] = await db.execute(
      "SELECT COUNT(*) as count FROM users WHERE LOWER(username) = ?", // 데이터베이스에서 소문자로 변환한 username을 검색
      [username]
    );

    const isTaken = rows[0].count > 0; // username이 이미 존재하는지 여부를 확인
    res.json({ isTaken }); // 결과를 JSON 형태로 반환
  } catch (error) {
    console.error("Database error:", error); // 데이터베이스 오류 로깅
    res.status(500).send("Internal Server Error"); // 서버 오류 응답
  }
};

// 이메일 중복 여부를 확인하는 함수
exports.checkEmail = async (req, res) => {
  const email = req.body.email; // 요청에서 이메일 추출
  try {
    const [rows] = await db.execute(
      "SELECT COUNT(*) as count FROM users WHERE email = ?", // 이메일로 사용자 검색
      [email]
    );

    const isTaken = rows[0].count > 0; // 이메일이 이미 존재하는지 여부 확인
    res.json({ isTaken }); // 결과를 JSON 형태로 반환
  } catch (error) {
    console.error("Database error:", error); // 데이터베이스 오류 로깅
    res.status(500).send("Internal Server Error"); // 서버 오류 응답
  }
};

// 사용자 등록을 처리하는 함수
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, year, month, day } =
      req.body; // 요청에서 사용자 정보 추출

    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match."); // 비밀번호 불일치 시 오류 응답
    }

    // 생년월일 포매팅
    const birthdate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호를 해시 처리

    // 사용자 정보를 데이터베이스에 저장하는 SQL 쿼리문 작성
    const query = `INSERT INTO users (username, email, password, birthdate) VALUES (?, ?, ?, ?)`;

    // 데이터베이스에 쿼리 실행
    await db.query(query, [username, email, hashedPassword, birthdate]);

    // 사용자 등록 성공 시 리다이렉트
    res.redirect("/success"); // 성공 페이지로 리다이렉트
  } catch (err) {
    console.error(err); // 오류 로깅
    res.status(500).send("Server error during registration."); // 서버 오류 응답
  }
};

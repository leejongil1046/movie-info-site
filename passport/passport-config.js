const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

// 데이터베이스 연결 설정
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "fakeflix",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = async function (passport) {
  // Passport 로컬 전략 설정
  passport.use(
    new LocalStrategy(
      { usernameField: "email" }, // 사용자 인증 시 이메일을 사용
      async (email, password, done) => {
        try {
          console.log("Authenticating user:", email); // 사용자 인증 로그
          const connection = await db.getConnection();
          console.log("Database connection established."); // 데이터베이스 연결 로그
          const [result] = await connection.query(
            "SELECT * FROM users WHERE email = ?", // 이메일로 사용자 조회 쿼리
            [email]
          );
          connection.release(); // 데이터베이스 연결 해제
          console.log("Database connection released."); // 데이터베이스 연결 해제 로그

          if (result.length === 0) {
            // 사용자가 없으면 오류 반환
            return done(null, false, {
              message: "해당 이메일의 사용자가 없습니다.",
            });
          }

          const user = result[0]; // 사용자 객체 추출
          console.log("Found user:", user); // 사용자 정보 로깅
          const isMatch = await bcrypt.compare(password, user.password); // 비밀번호 일치 여부 검사

          if (isMatch) {
            // 비밀번호가 일치하면 사용자 객체 반환
            return done(null, user);
          } else {
            // 비밀번호가 일치하지 않으면 오류 반환
            return done(null, false, {
              message: "비밀번호가 정확하지 않습니다.",
            });
          }
        } catch (err) {
          console.error("Authentication error:", err); // 인증 중 오류 발생 로그
          return done(err);
        }
      }
    )
  );

  // 사용자 직렬화
  passport.serializeUser((user, done) => {
    console.log("Serializing user:", user); // 사용자 직렬화 로그
    if (user && user.user_id) {
      // user 객체에 user_id가 존재하면 직렬화 처리
      done(null, user.user_id);
    } else {
      // user_id가 없으면 오류 반환
      console.error("User ID not found in user object");
      done("User ID not found");
    }
  });

  // 사용자 역직렬화
  passport.deserializeUser(async (user_id, done) => {
    console.log("Deserializing user:", user_id); // 사용자 역직렬화 로그
    try {
      const connection = await db.getConnection();
      console.log("Database connection established."); // 데이터베이스 연결 로그
      const [result] = await connection.query(
        "SELECT * FROM users WHERE user_id = ?", // user_id로 사용자 조회 쿼리
        [user_id]
      );
      connection.release(); // 데이터베이스 연결 해제
      console.log("Database connection released."); // 데이터베이스 연결 해제 로그

      if (result.length === 0) {
        // 사용자가 없으면 오류 반환
        return done(null, false, { message: "사용자를 찾을 수 없습니다." });
      }

      done(null, result[0]); // 조회된 사용자 반환
    } catch (err) {
      console.error("Error deserializing user:", err); // 역직렬화 중 오류 발생 로그
      return done(err);
    }
  });
};

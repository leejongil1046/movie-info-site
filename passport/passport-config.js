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
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          console.log("Authenticating user:", email);
          const connection = await db.getConnection();
          console.log("Database connection established."); // 데이터베이스 연결 로그 추가
          const [result] = await connection.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
          );
          connection.release();
          console.log("Database connection released."); // 데이터베이스 연결 해제 로그 추가

          if (result.length === 0) {
            return done(null, false, { message: "No user with that email" });
          }

          const user = result[0];
          console.log("Found user:", user); // 사용자 정보 로깅
          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        } catch (err) {
          console.error("Authentication error:", err);
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log("Serializing user:", user);
    if (user && user.user_id) {
      done(null, user.user_id);
    } else {
      console.error("User ID not found in user object");
      done("User ID not found");
    }
  });

  passport.deserializeUser(async (user_id, done) => {
    console.log("Deserializing user:", user_id); // 사용자 역직렬화 로그
    try {
      const connection = await db.getConnection();
      console.log("Database connection established."); // 데이터베이스 연결 로그 추가
      const [result] = await connection.query(
        "SELECT * FROM users WHERE user_id = ?",
        [user_id]
      );
      connection.release();
      console.log("Database connection released."); // 데이터베이스 연결 해제 로그 추가

      if (result.length === 0) {
        return done(null, false, { message: "User not found" });
      }

      done(null, result[0]);
    } catch (err) {
      console.error("Error deserializing user:", err); // 역직렬화 오류 로그
      return done(err);
    }
  });
};

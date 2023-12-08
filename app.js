const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "fakeflix",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testDBConnection() {
  try {
    const connection = await db.getConnection();
    console.log("Database connection established.");
    connection.release();
    console.log("Database connection released.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

// 서버 시작 전에 DB 연결 확인 함수 호출
testDBConnection();

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const flash = require("express-flash");
const passport = require("passport");
require("./passport/passport-config.js")(passport);

const app = express();

const indexRouter = require("./routes/index.js");
const signupRouter = require("./routes/signup.js");
const movieRouter = require("./routes/movie.js");
const successRouter = require("./routes/success.js");

// static 파일 제공 미들웨어
app.use(express.static("public"));

// JSON 형식의 본문을 파싱하기 위해 body-parser 사용
app.use(bodyParser.json());

// URL 인코딩된 데이터를 파싱하기 위해 body-parser 사용
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "yourSecretString",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// 라우터 연결
app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/movie", movieRouter);
app.use("/success", successRouter);

// Login Route
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true, // Optionally use flash messages
  }),
  (req, res) => {
    console.log(req.user);
    // 이 부분에서 템플릿 엔진을 사용하여 플래시 메시지를 렌더링하고 클라이언트에게 전달
    res.render("login", { message: req.flash("error") }); // "error" 플래시 메시지 전달
  }
);

// 로그인 페이지를 보여주는 GET 라우트
app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    // 이미 로그인된 경우
    console.log("이미 로그인 중입니다.");
    res.redirect("/"); // 홈페이지로 리디렉션
  } else {
    // 로그인되지 않은 경우
    console.log("로그인이 필요합니다.");
    res.sendFile(path.join(__dirname, "views", "index.html"));
  }
});

// 현재 로그인 상태를 반환하는 API
app.get("/api/login-status", (req, res) => {
  res.json({ loggedIn: req.isAuthenticated() });
});

app.get("/api/userinfo", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ username: req.user.username });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

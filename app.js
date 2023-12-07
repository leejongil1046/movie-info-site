const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const indexRouter = require("./routes/index");
const signupRouter = require("./routes/signup");
const movieRouter = require("./routes/movie");
const successRouter = require("./routes/success");

// static 파일 제공 미들웨어
app.use(express.static("public"));

// JSON 형식의 본문을 파싱하기 위해 body-parser 사용
app.use(bodyParser.json());

// URL 인코딩된 데이터를 파싱하기 위해 body-parser 사용
app.use(bodyParser.urlencoded({ extended: true }));

// 라우터 연결
app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/movie", movieRouter);
app.use("/success", successRouter);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

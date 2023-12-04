const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const app = express();

const indexRouter = require("./routes/index");
const joinRouter = require("./routes/join");
const movieRouter = require("./routes/movie");

// static 파일 제공 미들웨어
app.use(express.static("public"));

// 라우터 연결
app.use("/", indexRouter);
app.use("/join", joinRouter);
app.use("/movie", movieRouter);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const app = express();

const movieRouter = require("./routes/index");
const joinRouter = require("./routes/join");

// static 파일 제공 미들웨어
app.use(express.static("public"));

// 라우터 연결
app.use("/", movieRouter);
app.use("/join", joinRouter);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

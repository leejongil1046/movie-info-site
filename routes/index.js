const express = require("express");
const path = require("path");
const router = express.Router();

// index.html 페이지 라우팅
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});

module.exports = router;

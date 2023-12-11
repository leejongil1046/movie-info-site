const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const router = express.Router();

// movie.html 페이지 라우팅
router.get("/:id", function (req, res) {
  res.sendFile(path.join(__dirname, "../views", "movie.html"));
});

module.exports = router;

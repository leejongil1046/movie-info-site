const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "영화 정보 사이트" });
});

module.exports = router;

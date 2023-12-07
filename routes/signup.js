const express = require("express");
const path = require("path");
const router = express.Router();
// const signupController = require("../controllers/signup");

// signup.html 페이지 라우팅
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../views", "signup.html"));
});

// router.post("/check-username", signupController.checkUsername);
// router.post("/check-email", signupController.checkEmail);
// router.post("/register", signupController.register);

module.exports = router;

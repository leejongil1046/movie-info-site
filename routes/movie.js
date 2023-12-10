const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const router = express.Router();

// movie.html 페이지 라우팅
router.get("/:id", function (req, res) {
  res.sendFile(path.join(__dirname, "../views", "movie.html"));
});

// 영화 상세 정보 API
// router.get("/details/:id", async (req, res) => {
//   const movieId = req.params.id;
//   const apiUrl = `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`;

//   try {
//     const response = await fetch(apiUrl);
//     const movieData = await response.json();
//     res.json(movieData); // JSON 데이터로 응답
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

module.exports = router;

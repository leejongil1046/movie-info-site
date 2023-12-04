const express = require("express");
const path = require("path");
const router = express.Router();

// index.html 페이지 라우팅
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});

router.get("/api/movies", async (req, res) => {
  try {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?sort_by=download_count"
    );
    const moviesData = await response.json();
    res.json(moviesData);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Error fetching movies");
  }
});

module.exports = router;

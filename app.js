const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const app = express();

app.use(express.static("public")); // 정적 파일 제공

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api/movies", async (req, res) => {
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

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

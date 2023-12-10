const db = require("../models/database.js"); // 데이터베이스 설정 파일

exports.checkLikeStatus = async (req, res) => {
  const { movieId, username } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT `like` FROM movie_reviews WHERE movie_id = ? AND username = ?",
      [movieId, username]
    );
    if (rows.length > 0) {
      res.json({ like: rows[0].like });
    } else {
      res.json({ like: false });
    }
  } catch (error) {
    console.error("Error fetching like status:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.toggleLike = async (req, res) => {
  const { movieId, username } = req.params;
  const { like } = req.body;
  try {
    const [rows] = await db.query(
      "SELECT * FROM movie_reviews WHERE movie_id = ? AND username = ?",
      [movieId, username]
    );
    if (rows.length > 0) {
      await db.query(
        "UPDATE movie_reviews SET `like` = ? WHERE movie_id = ? AND username = ?",
        [like, movieId, username]
      );
    } else {
      await db.query(
        "INSERT INTO movie_reviews (movie_id, username, `like`) VALUES (?, ?, ?)",
        [movieId, username, like]
      );
    }
    res.json({ message: "Like status updated" });
  } catch (error) {
    console.error("Error toggling like status:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getTotalLikes = async (req, res) => {
  const { movieId } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT SUM(`like`) AS totalLikes FROM movie_reviews WHERE movie_id = ?",
      [movieId]
    );
    const totalLikes = rows[0].totalLikes || 0;
    res.json({ totalLikes });
  } catch (error) {
    console.error("Error fetching total likes:", error);
    res.status(500).json({ error: "Server error" });
  }
};

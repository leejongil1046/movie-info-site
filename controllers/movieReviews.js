const db = require("../models/database.js"); // 데이터베이스 설정 파일

// 1. 특정 영화의 모든 리뷰 조회 (rating과 review가 null이 아닌 데이터)
exports.fetchReviews = async (req, res) => {
  const movieId = req.params.movieId;
  try {
    // 리뷰 목록 가져오기
    const [reviews] = await db.query(
      "SELECT * FROM movie_reviews WHERE movie_id = ? AND rating IS NOT NULL AND review IS NOT NULL ORDER BY review_created_at ASC",
      [movieId]
    );

    // 평균 평점 가져오기
    const [averageRatingResult] = await db.query(
      "SELECT AVG(rating) AS averageRating FROM movie_reviews WHERE movie_id = ? AND rating IS NOT NULL",
      [movieId]
    );
    const averageRating = averageRatingResult[0].averageRating || 0;
    // 리뷰 목록과 평균 평점을 함께 반환
    res.json({
      reviews: reviews,
      averageRating: averageRating,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// 2. 리뷰 추가 또는 업데이트 (있으면 업데이트, 없으면 추가)
exports.submitReview = async (req, res) => {
  const { movieId, username, rating, reviewText } = req.body;
  try {
    const [rows] = await db.query(
      "SELECT * FROM movie_reviews WHERE movie_id = ? AND username = ?",
      [movieId, username]
    );
    if (rows.length > 0) {
      // 리뷰가 이미 존재하는 경우: 업데이트
      await db.query(
        "UPDATE movie_reviews SET rating = ?, review = ?, review_created_at = NOW() WHERE movie_id = ? AND username = ?",
        [rating, reviewText, movieId, username]
      );
    } else {
      // 새로운 리뷰 추가
      await db.query(
        "INSERT INTO movie_reviews (movie_id, username, rating, review, `like`, review_created_at) VALUES (?, ?, ?, ?, 0, NOW())",
        [movieId, username, rating, reviewText]
      );
    }
    res.json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// 3. 리뷰 업데이트
exports.modifyReview = async (req, res) => {
  const { movieId, username, rating, reviewText } = req.body;
  try {
    await db.query(
      "UPDATE movie_reviews SET rating = ?, review = ? WHERE movie_id = ? AND username = ?",
      [rating, reviewText, movieId, username]
    );
    res.json({ message: "Review updated successfully" });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// 4. 리뷰 삭제 (rating과 review를 null로 설정)
exports.deleteReview = async (req, res) => {
  const { movieId, username } = req.params;
  try {
    await db.query(
      "UPDATE movie_reviews SET rating = NULL, review = NULL WHERE movie_id = ? AND username = ?",
      [movieId, username]
    );
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Server error" });
  }
};

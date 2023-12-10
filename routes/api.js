const express = require("express");
const router = express.Router();
const movieLikesController = require("../controllers/movieLikes.js");
const movieReviewsController = require("../controllers/movieReviews.js");

router.get("/movies", async (req, res) => {
  try {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?sort_by=download_count&limit=50"
    );
    const moviesData = await response.json();
    res.json(moviesData);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Error fetching movies");
  }
});

// 영화 상세 정보 API
router.get("/movie/details/:id", async (req, res) => {
  const movieId = req.params.id;
  const apiUrl = `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`;

  try {
    const response = await fetch(apiUrl);
    const movieData = await response.json();
    res.json(movieData); // JSON 데이터로 응답
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// 현재 영화의 좋아요 상태 확인
router.get("/likes/:movieId/:username", movieLikesController.checkLikeStatus);

// 좋아요 상태 토글
router.post("/toggle-like/:movieId/:username", movieLikesController.toggleLike);

// 영화의 전체 좋아요 수 조회
router.get("/total-likes/:movieId", movieLikesController.getTotalLikes);

// 리뷰 데이터 가져오기
router.get("/movie/:movieId/reviews", movieReviewsController.fetchReviews);

// 리뷰 제출하기
router.post("/movie/review/:movieId", movieReviewsController.submitReview);

// 리뷰 수정하기
router.put(
  "/movie/review/:movieId/user/:username",
  movieReviewsController.modifyReview
);

// 리뷰 삭제하기
router.delete(
  "/movies/review/:movieId/user/:username",
  movieReviewsController.deleteReview
);

module.exports = router;

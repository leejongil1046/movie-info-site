const express = require("express");
const router = express.Router();
const movieLikesController = require("../controllers/movieLikes.js");

// 현재 영화의 좋아요 상태 확인
router.get("/likes/:movieId/:username", movieLikesController.checkLikeStatus);

// 좋아요 상태 토글
router.post("/toggle-like/:movieId/:username", movieLikesController.toggleLike);

// 영화의 전체 좋아요 수 조회
router.get("/total-likes/:movieId", movieLikesController.getTotalLikes);

module.exports = router;

const db = require("../models/database.js"); // 데이터베이스 설정 파일을 불러옴

// 특정 영화에 대한 사용자의 '좋아요' 상태를 확인하는 함수
exports.checkLikeStatus = async (req, res) => {
  const { movieId, username } = req.params; // 요청에서 영화 ID와 사용자 이름 추출
  try {
    const [rows] = await db.query(
      "SELECT `like` FROM movie_reviews WHERE movie_id = ? AND username = ?",
      [movieId, username]
    );
    if (rows.length > 0) {
      // '좋아요' 상태가 존재하면 해당 상태 반환
      res.json({ like: rows[0].like });
    } else {
      // '좋아요' 상태가 존재하지 않으면 false 반환
      res.json({ like: false });
    }
  } catch (error) {
    console.error("Error fetching like status:", error); // 오류 로깅
    res.status(500).json({ error: "Server error" }); // 서버 오류 응답
  }
};

// '좋아요' 상태를 토글하는 함수
exports.toggleLike = async (req, res) => {
  const { movieId, username } = req.params; // 요청에서 영화 ID와 사용자 이름 추출
  const { like } = req.body; // 요청에서 '좋아요' 상태 추출
  try {
    const [rows] = await db.query(
      "SELECT * FROM movie_reviews WHERE movie_id = ? AND username = ?",
      [movieId, username]
    );
    if (rows.length > 0) {
      // 리뷰가 이미 존재하면 '좋아요' 상태 업데이트
      await db.query(
        "UPDATE movie_reviews SET `like` = ? WHERE movie_id = ? AND username = ?",
        [like, movieId, username]
      );
    } else {
      // 리뷰가 존재하지 않으면 새로운 리뷰 추가
      await db.query(
        "INSERT INTO movie_reviews (movie_id, username, `like`) VALUES (?, ?, ?)",
        [movieId, username, like]
      );
    }
    res.json({ message: "Like status updated" }); // '좋아요' 상태 업데이트 메시지 반환
  } catch (error) {
    console.error("Error toggling like status:", error); // 오류 로깅
    res.status(500).json({ error: "Server error" }); // 서버 오류 응답
  }
};

// 특정 영화의 전체 '좋아요' 개수를 가져오는 함수
exports.getTotalLikes = async (req, res) => {
  const { movieId } = req.params; // 요청에서 영화 ID 추출
  try {
    const [rows] = await db.query(
      "SELECT SUM(`like`) AS totalLikes FROM movie_reviews WHERE movie_id = ?",
      [movieId]
    );
    const totalLikes = rows[0].totalLikes || 0; // 전체 '좋아요' 개수 계산
    res.json({ totalLikes }); // 전체 '좋아요' 개수 반환
  } catch (error) {
    console.error("Error fetching total likes:", error); // 오류 로깅
    res.status(500).json({ error: "Server error" }); // 서버 오류 응답
  }
};

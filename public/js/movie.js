import {
  createLoadingMessage,
  removeLoadingMessage,
} from "/js/modules/loadingMessageControl.js";

import {
  setupBackButton,
  setupRefreshButton,
} from "/js/modules/navigationControl.js";

import { fetchMovieDetails } from "/js/modules/movieDetailsAPI.js"; // Adjust the path as needed

// DOM이 로드되었을 때 실행
document.addEventListener("DOMContentLoaded", () => {
  // URL에서 ID를 추출
  const movieId = new URL(window.location).pathname.split("/").pop();

  // 로딩 메시지 추가
  createLoadingMessage();

  setupBackButton("back-icon");
  setupRefreshButton("refresh-icon");

  // 페이지 로드 시 영화 상세 정보를 가져옴
  fetchMovieDetails(movieId);

  window.addEventListener("unload", function () {
    document.querySelector("#movie-image").style.display = "none";
    document.querySelector(".movie-story").style.display = "none";
    document.querySelector(".movie-reviews").style.display = "none";
  });
});

document
  .getElementById("review-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // 폼 기본 제출 동작 방지

    // 입력된 점수와 댓글 텍스트를 가져옵니다
    const score = document.getElementById("review-score").value;
    const text = document.getElementById("review-text").value;

    // 댓글을 표시할 요소 생성
    const newReview = document.createElement("p");
    newReview.textContent = `점수: ${score}, 댓글: ${text}`;

    // 댓글 목록에 새 댓글 추가
    document.getElementById("reviews-list").appendChild(newReview);

    // 입력 필드 초기화
    document.getElementById("review-score").value = "";
    document.getElementById("review-text").value = "";
  });

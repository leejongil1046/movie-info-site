import {
  createLoadingMessage,
  removeLoadingMessage,
} from "/js/modules/loadingMessageControl.js";

import {
  setupBackButton,
  setupRefreshButton,
} from "/js/modules/navigationControl.js";

import { fetchMovieDetails } from "/js/modules/movieDetailsAPI.js";

import {
  loginProcess,
  logoutProcess,
  loginCheck,
} from "/js/modules/logInOutControl.js";

import {
  starRating,
  reviewContainer,
} from "/js/modules/starRatingAndReview.js";

// DOM이 로드되었을 때 실행
document.addEventListener("DOMContentLoaded", () => {
  // URL에서 ID를 추출
  const movieId = new URL(window.location).pathname.split("/").pop();

  // 로딩 메시지 추가
  createLoadingMessage();

  loginCheck();

  setupBackButton("back-icon");
  setupRefreshButton("refresh-icon");

  loginProcess();
  logoutProcess();

  starRating();
  reviewContainer();

  // 페이지 로드 시 영화 상세 정보를 가져옴
  fetchMovieDetails(movieId);
});

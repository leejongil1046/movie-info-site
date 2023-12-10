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

import { starRating, reviewContainer } from "/js/modules/starRatingReview.js";

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

  loginProcess();
  logoutProcess();

  loginCheck().then(() => {
    const loggedInUsername = document.querySelector("#loggedin-username");
    if (loggedInUsername && loggedInUsername.textContent) {
      const username = loggedInUsername.textContent;
      console.log("Logged in as:", username);
      starRating();
      reviewContainer(username);
    }
  });
});

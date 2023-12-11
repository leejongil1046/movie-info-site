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
  fetchReviews,
  reviewsAddEventFunction,
} from "/js/modules/movieReviewsAPI.js";

import {
  updateLikeStatus,
  displayTotalLikes,
} from "/js/modules/movieLikesAPI.js";

import { restrictAccessToNotLoggedinUsers } from "/js/modules/accessControl.js";

// DOM이 로드되었을 때 실행
document.addEventListener("DOMContentLoaded", async () => {
  // URL에서 ID를 추출
  const movieId = new URL(window.location).pathname.split("/").pop();

  // 로딩 메시지 추가
  createLoadingMessage();

  setupBackButton("back-icon");
  setupRefreshButton("refresh-icon");

  // 페이지 로드 시 영화 상세 정보를 가져옴
  await fetchMovieDetails(movieId);
  await fetchReviews(movieId);

  loginProcess();
  logoutProcess();

  const loginData = await loginCheck();
  if (loginData && loginData.loggedIn) {
    const username = loginData.username;
    console.log("Logged in as:", username);
    updateLikeStatus(movieId, username);
    reviewsAddEventFunction(movieId, username);
    // 여기서 추가 로직을 수행할 수 있습니다.
  } else {
    console.log("User is not logged in.");
    restrictAccessToNotLoggedinUsers();
    // 로그인하지 않은 상태에 대한 처리를 할 수 있습니다.
  }
  displayTotalLikes(movieId);
});

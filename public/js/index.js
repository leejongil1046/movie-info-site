import {
  createLoadingMessage,
  removeLoadingMessage,
} from "/js/modules/loadingMessageControl.js";

import {
  setupBackButton,
  setupRefreshButton,
} from "/js/modules/navigationControl.js";

import { fetchMoviesData } from "/js/modules/moviesAPI.js"; // Adjust the path as needed

// DOM이 로드되었을 때 실행
document.addEventListener("DOMContentLoaded", () => {
  // 로딩 메시지 추가
  createLoadingMessage();

  setupBackButton("back-icon");
  setupRefreshButton("refresh-icon");

  fetchMoviesData();
});

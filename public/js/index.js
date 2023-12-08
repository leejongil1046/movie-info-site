import {
  createLoadingMessage,
  removeLoadingMessage,
} from "/js/modules/loadingMessageControl.js";

import {
  setupBackButton,
  setupRefreshButton,
} from "/js/modules/navigationControl.js";

import { fetchMoviesData } from "/js/modules/moviesAPI.js";

import {
  loginProcess,
  logoutProcess,
  loginCheck,
} from "/js/modules/logInOutControl.js";

// DOM이 로드되었을 때 실행
document.addEventListener("DOMContentLoaded", () => {
  // 로딩 메시지 추가
  createLoadingMessage();

  loginCheck();

  setupBackButton("back-icon");
  setupRefreshButton("refresh-icon");

  loginProcess();
  logoutProcess();

  fetchMoviesData();
});

import {
  setupBackButton,
  setupRefreshButton,
  sortButtonHandler,
  updateSortMenuState,
  searchButtonHandler,
} from "/js/modules/navigationControl.js";

import { fetchAndStoreMoviesData } from "/js/modules/moviesAPI.js";

import {
  loginProcess,
  logoutProcess,
  loginCheck,
} from "/js/modules/logInOutControl.js";

// DOM이 로드되었을 때 실행
document.addEventListener("DOMContentLoaded", () => {
  loginCheck();

  setupBackButton("back-icon");
  setupRefreshButton("refresh-icon");

  fetchAndStoreMoviesData(1);

  sortButtonHandler();
  updateSortMenuState();
  searchButtonHandler();

  loginProcess();
  logoutProcess();
});

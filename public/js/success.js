import {
  setupBackButton,
  setupRefreshButton,
} from "/js/modules/navigationControl.js";

// DOM이 로드되었을 때 실행
document.addEventListener("DOMContentLoaded", () => {
  setupBackButton("back-icon");
  setupRefreshButton("refresh-icon");

  // 3초 후에 index.html로 리다이렉트
  setTimeout(() => {
    window.location.href = "/";
  }, 3000); // 3000 밀리초 후에 실행
});

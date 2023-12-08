import {
  createLoadingMessage,
  removeLoadingMessage,
} from "/js/modules/loadingMessageControl.js";

import {
  setupBackButton,
  setupRefreshButton,
} from "/js/modules/navigationControl.js";

import { fetchMoviesData } from "/js/modules/moviesAPI.js";

import { loginCheck, getUsername } from "/js/modules/loginControl.js";

// DOM이 로드되었을 때 실행
document.addEventListener("DOMContentLoaded", () => {
  // 로딩 메시지 추가
  createLoadingMessage();

  setupBackButton("back-icon");
  setupRefreshButton("refresh-icon");

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // 폼 데이터 수집
      const email = document.querySelector("#login-form #email").value;
      const password = document.querySelector("#login-form #password").value;

      // 서버에 로그인 요청 보내기
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          // 성공적인 응답을 확인하고 적절한 페이지로 리디렉션
          if (response.ok) {
            window.location.href = window.location.href;
          } else {
            throw new Error("로그인 실패");
          }
        })
        .catch((error) => {
          console.error("에러 발생:", error);
          // 여기에서 사용자에게 로그인 실패를 알리는 UI 처리를 할 수 있습니다.
        });
    });
  }

  loginCheck();
  getUsername();

  fetchMoviesData();
});

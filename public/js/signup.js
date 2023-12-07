import {
  setupBackButton,
  setupRefreshButton,
} from "/js/modules/navigationControl.js";

import { generateBirthOptions } from "/js/modules/birthOptions.js";

import { checkPasswordValidation } from "/js/modules/passwordValidation.js";

import { checkBirthdateValidation } from "/js/modules/birthdateValidation.js";

let isPwValid = false;
let isPwReValid = false;
let isUsernameValid = false;
let isEmailValid = false;
let isBirthdateValid = false;
const submitButton = document.querySelector("#submit-btn");
const form = document.querySelector("#signup-form");

document.addEventListener("DOMContentLoaded", function () {
  setupBackButton("back-icon");
  setupRefreshButton("refresh-icon");

  generateBirthOptions();

  checkPasswordValidation(isPwValid, isPwReValid);
  checkBirthdateValidation(isBirthdateValid);
});

// 사용자 이름 중복 검사
// const usernameInput = document.getElementById("username");
// usernameInput.addEventListener("blur", function () {
//   fetch("/check-username", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username: this.value }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       isUsernameValid = !data.isTaken;
//       updateSubmitButtonState();
//     });
// });

// 이메일 중복 검사
// const emailInput = document.getElementById("email");
// emailInput.addEventListener("blur", function () {
//   fetch("/check-email", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email: this.value }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       isEmailValid = !data.isTaken;
//       updateSubmitButtonState();
//     });
// });

// 폼 제출 핸들러 추가
form.addEventListener("submit", function (event) {
  // 유효성 검사 조건 확인
  submitButton.disabled = !(isPwValid && isPwReValid && isBirthdateFilled);
  if (submitButton.disabled) {
    event.preventDefault(); // 폼 제출 방지
  } else {
  }
  // 여기에 폼이 유효할 때의 처리 로직을 추가할 수 있습니다.
});

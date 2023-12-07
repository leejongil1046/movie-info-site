import {
  setupBackButton,
  setupRefreshButton,
} from "/js/modules/navigationControl.js";

import { generateBirthOptions } from "/js/modules/birthOptions.js";

import { usernameDuplicationCheck } from "/js/modules/usernameDuplicationCheck.js";

import { emailDuplicationCheck } from "/js/modules/emailDuplicationCheck.js";

import { checkPasswordValidation } from "/js/modules/passwordValidation.js";

import { checkBirthdateValidation } from "/js/modules/birthdateValidation.js";

let isUsernameValid = false;
let isEmailValid = false;
let isPwValid = false;
let isPwReValid = false;
let isBirthdateValid = false;
const submitButton = document.querySelector("#submit-btn");
const form = document.querySelector("#signup-form");

document.addEventListener("DOMContentLoaded", function () {
  setupBackButton("back-icon");
  setupRefreshButton("refresh-icon");

  generateBirthOptions();

  usernameDuplicationCheck(isUsernameValid);
  emailDuplicationCheck(isEmailValid);
  checkPasswordValidation(isPwValid, isPwReValid);
  checkBirthdateValidation(isBirthdateValid);
});

// 폼 제출 핸들러 추가
form.addEventListener("submit", function (event) {
  event.preventDefault(); // 폼의 기본 제출 동작을 항상 방지

  if (
    isUsernameValid &&
    isEmailValid &&
    isPwValid &&
    isPwReValid &&
    isBirthdateValid
  ) {
    // 폼 데이터 수집
    const formData = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value, // 패스워드 입력 필드의 id를 확인하고 맞춰주세요.
      confirmPassword: document.getElementById("confirmPassword").value, // 확인 패스워드 입력 필드의 id를 확인하고 맞춰주세요.
      year: document.getElementById("birth-year").value,
      month: document.getElementById("birth-month").value,
      day: document.getElementById("birth-day").value,
    };

    // 서버로 데이터 전송
    fetch("/signup/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => {
        window.location.href = "/success"; // 성공 페이지 또는 메인 페이지로 리다이렉트
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    alert("Please ensure all fields are valid before submitting.");
  }
});

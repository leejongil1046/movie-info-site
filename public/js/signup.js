import {
  generateYearOptions,
  generateMonthOptions,
  generateDayOptions,
} from "/js/modules/birthOptions.js";

import {
  validatePassword,
  checkPasswordMatch,
} from "/js/modules/passwordValidation.js";

import {
  setupBackButton,
  setupRefreshButton,
} from "/js/modules/navigationControl.js";

document.addEventListener("DOMContentLoaded", function () {
  generateBirthOptions();

  let isPwValid = false;
  checkPasswordValidation(isPwValid);

  setupBackButton("back-icon");
  setupRefreshButton("refresh-icon");
});

function generateBirthOptions() {
  const birthYearEl = document.querySelector("#birth-year");
  const birthMonthEl = document.querySelector("#birth-month");
  const birthDayEl = document.querySelector("#birth-day");

  generateYearOptions(birthYearEl, 1940, 2022);
  generateMonthOptions(birthMonthEl);
  generateDayOptions(birthDayEl);
}

function checkPasswordValidation(isPwValid) {
  const pwInputEl = document.querySelector("#info__pw");
  const pwErrorMsgEl = document.querySelector("#pw-msg");
  const pwReInputEl = document.querySelector("#info__pwRe");
  const pwReErrorMsgEl = document.querySelector("#pwRe-msg");

  pwInputEl.addEventListener("change", () => {
    isPwValid = validatePassword(pwInputEl, pwErrorMsgEl); // 비밀번호 유효성 검사 결과 업데이트
    if (isPwValid) checkPasswordMatch(pwInputEl, pwReInputEl, pwReErrorMsgEl); // 비밀번호 일치 여부 검사
  });

  pwReInputEl.addEventListener("change", () => {
    if (isPwValid) checkPasswordMatch(pwInputEl, pwReInputEl, pwReErrorMsgEl); // 비밀번호 일치 여부 검사
  });
}

// // pwVal: 패스워드, pwReVal: 패스워드 재입력, isPwValid: 패스워드 유효 여부
// let isUsernameValid = false;
// let isEmailValid = false;
// let isBirthdateFilled = false;

// // 사용자 이름 중복 검사
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

// // 이메일 중복 검사
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

// // 제출 버튼 상태 업데이트
// const submitButton = document.getElementById("submit");
// function updateSubmitButtonState() {
//   submitButton.disabled = !(
//     isUsernameValid &&
//     isEmailValid &&
//     isPwValid &&
//     isBirthdateFilled
//   );
// }

// // 생년월일 입력 여부 검사
// const yearInput = document.getElementById("birth-year");
// const monthInput = document.getElementById("birth-month");
// const dayInput = document.getElementById("birth-day");
// [yearInput, monthInput, dayInput].forEach((input) =>
//   input.addEventListener("input", () => {
//     isBirthdateFilled = yearInput.value && monthInput.value && dayInput.value;
//     updateSubmitButtonState();
//   })
// );

// // 폼 제출 처리
// const form = document.getElementById("signup-form");
// form.addEventListener("submit", async function (event) {
//   event.preventDefault();

//   // 폼 데이터를 가져와서 서버에 전송할 데이터를 만듭니다.
//   const username = document.getElementById("username").value;
//   const email = document.getElementById("email").value;
//   const password = pwVal; // 앞서 검증한 패스워드 값을 사용합니다.
//   const confirmPassword = pwReVal;
//   const year = document.getElementById("birth-year").value;
//   const month = document.getElementById("birth-month").value;
//   const day = document.getElementById("birth-day").value;

//   const formData = {
//     username,
//     email,
//     password,
//     confirmPassword,
//     year,
//     month,
//     day,
//   };

//   try {
//     // 서버에 POST 요청을 보냅니다.
//     const response = await fetch("/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     if (response.status === 200) {
//       // 회원가입이 성공한 경우
//       alert("회원가입이 성공적으로 완료되었습니다.");
//       // 원하는 페이지로 리다이렉트하거나 다른 작업을 수행하세요.
//     } else {
//       // 서버에서 오류 응답을 받은 경우
//       alert("회원가입 중 오류가 발생했습니다.");
//       // 오류 메시지를 처리하거나 사용자에게 알림을 표시하세요.
//     }
//   } catch (error) {
//     // 네트워크 오류 등 예외 상황을 처리합니다.
//     console.error("회원가입 중 오류 발생:", error);
//     alert("회원가입 중 오류가 발생했습니다.");
//   }
// });

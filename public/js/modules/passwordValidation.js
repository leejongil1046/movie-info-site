let isPwValid = false; // 비밀번호가 유효한지 여부를 나타내는 변수
let isPwReValid = false; // 비밀번호 확인이 유효한지 여부를 나타내는 변수

// 비밀번호 유효성을 검증하는 함수
function validatePassword(
  pwInputEl, // 비밀번호 입력 필드
  pwErrorMsgEl, // 비밀번호 오류 메시지를 표시할 요소
  pwReInputEl, // 비밀번호 확인 입력 필드
  pwReErrorMsgEl // 비밀번호 확인 오류 메시지를 표시할 요소
) {
  let pwVal = pwInputEl.value; // 비밀번호 입력 값
  let pwReVal = pwReInputEl.value; // 비밀번호 확인 입력 값
  // 비밀번호 유효성을 검사하는 정규 표현식 (8~20자, 문자, 숫자, 특수문자 포함)
  const pwRegExp =
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  // 비밀번호가 정규 표현식과 일치할 경우
  if (pwRegExp.test(pwVal)) {
    pwErrorMsgEl.style.color = "limegreen";
    pwErrorMsgEl.textContent = "The password is valid.";
    isPwValid = true;
  } else {
    // 비밀번호가 정규 표현식과 불일치할 경우
    pwErrorMsgEl.style.color = "red";
    pwErrorMsgEl.textContent =
      "Please enter a password of 8-20 characters with letters, numbers, and special characters.";
    isPwValid = false;
  }

  // 비밀번호가 유효할 경우, 비밀번호 확인이 비밀번호와 일치하는지 검사
  if (isPwValid) {
    if (pwVal === pwReVal) {
      pwReErrorMsgEl.style.color = "limegreen";
      pwReErrorMsgEl.textContent = "The passwords match.";
      isPwReValid = true;
    } else {
      pwReErrorMsgEl.style.color = "red";
      pwReErrorMsgEl.textContent = "The passwords do not match.";
      isPwReValid = false;
    }
  } else {
    pwReErrorMsgEl.textContent = "";
    isPwReValid = false;
  }
}

// 비밀번호 유효성 검사를 수행하는 함수
function checkPasswordValidation() {
  const pwInputEl = document.querySelector("#info__pw"); // 비밀번호 입력 필드 선택
  const pwErrorMsgEl = document.querySelector("#pw-error-msg"); // 비밀번호 오류 메시지 요소 선택
  const pwReInputEl = document.querySelector("#info__pwRe"); // 비밀번호 확인 입력 필드 선택
  const pwReErrorMsgEl = document.querySelector("#pwRe-error-msg"); // 비밀번호 확인 오류 메시지 요소 선택

  // 비밀번호 입력 필드에 입력 이벤트 리스너 추가
  pwInputEl.addEventListener("input", () => {
    validatePassword(pwInputEl, pwErrorMsgEl, pwReInputEl, pwReErrorMsgEl);
  });

  // 비밀번호 확인 입력 필드에 입력 이벤트 리스너 추가
  pwReInputEl.addEventListener("input", () => {
    validatePassword(pwInputEl, pwErrorMsgEl, pwReInputEl, pwReErrorMsgEl);
  });

  return { isPwValid, isPwReValid }; // 유효성 검사 결과 반환
}

export { checkPasswordValidation, isPwValid, isPwReValid }; // 함수와 변수를 다른 모듈에서 사용할 수 있도록 export

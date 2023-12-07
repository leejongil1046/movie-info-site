function validatePassword(pwInputEl, pwErrorMsgEl) {
  let pwVal = pwInputEl.value;
  const pwRegExp =
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  if (pwRegExp.test(pwVal)) {
    pwErrorMsgEl.style.color = "limegreen";
    pwErrorMsgEl.textContent = "The password is valid.";
    return true;
  } else {
    pwErrorMsgEl.style.color = "red";
    pwErrorMsgEl.textContent =
      "Please enter a password with 8-20 characters, including letters, numbers, and symbols.";
    return false;
  }
}

function checkPasswordMatch(pwInputEl, pwReInputEl, pwReErrorMsgEl) {
  let pwVal = pwInputEl.value;
  let pwReVal = pwReInputEl.value;

  if (pwReVal === "") {
    pwReErrorMsgEl.textContent = "";
    return false;
  } else if (pwVal === pwReVal) {
    pwReErrorMsgEl.style.color = "limegreen";
    pwReErrorMsgEl.textContent = "The passwords match.";
    return true;
  } else {
    pwReErrorMsgEl.style.color = "red";
    pwReErrorMsgEl.textContent = "The passwords do not match.";
    return false;
  }
}

function checkPasswordValidation(isPwValid, isPwReValid) {
  const pwInputEl = document.querySelector("#info__pw");
  const pwErrorMsgEl = document.querySelector("#pw-error-msg");
  const pwReInputEl = document.querySelector("#info__pwRe");
  const pwReErrorMsgEl = document.querySelector("#pwRe-error-msg");

  pwInputEl.addEventListener("blur", () => {
    if (pwInputEl.value === "") {
      pwErrorMsgEl.style.color = "red";
      pwErrorMsgEl.textContent = "Please enter a password.";
    }
  });

  pwInputEl.addEventListener("change", () => {
    isPwValid = validatePassword(pwInputEl, pwErrorMsgEl); // 비밀번호 유효성 검사 결과 업데이트
    console.log("isPwValid = ", isPwValid);
  });

  pwReInputEl.addEventListener("change", () => {
    if (isPwValid)
      isPwReValid = checkPasswordMatch(pwInputEl, pwReInputEl, pwReErrorMsgEl); // 비밀번호 일치 여부 검사
    console.log("isPwReValid = ", isPwReValid);
  });
}

export { checkPasswordValidation };

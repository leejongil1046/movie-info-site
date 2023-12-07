let isPwValid = false;
let isPwReValid = false;

function validatePassword(pwInputEl, pwErrorMsgEl) {
  let pwVal = pwInputEl.value;
  const pwRegExp =
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  if (pwRegExp.test(pwVal)) {
    pwErrorMsgEl.style.color = "limegreen";
    pwErrorMsgEl.textContent = "The password is valid.";
    isPwValid = true;
  } else {
    pwErrorMsgEl.style.color = "red";
    pwErrorMsgEl.textContent =
      "Please enter a password with 8-20 characters, including letters, numbers, and symbols.";
    isPwValid = false;
  }
}

function checkPasswordMatch(pwInputEl, pwReInputEl, pwReErrorMsgEl) {
  let pwVal = pwInputEl.value;
  let pwReVal = pwReInputEl.value;

  if (pwVal === pwReVal) {
    pwReErrorMsgEl.style.color = "limegreen";
    pwReErrorMsgEl.textContent = "The passwords match.";
    isPwReValid = true;
  } else {
    pwReErrorMsgEl.style.color = "red";
    pwReErrorMsgEl.textContent = "The passwords do not match.";
    isPwReValid = false;
  }
}

function checkPasswordValidation() {
  const pwInputEl = document.querySelector("#info__pw");
  const pwErrorMsgEl = document.querySelector("#pw-error-msg");
  const pwReInputEl = document.querySelector("#info__pwRe");
  const pwReErrorMsgEl = document.querySelector("#pwRe-error-msg");

  pwInputEl.addEventListener("blur", () => {
    validatePassword(pwInputEl, pwErrorMsgEl);
  });

  pwReInputEl.addEventListener("blur", () => {
    if (isPwValid) checkPasswordMatch(pwInputEl, pwReInputEl, pwReErrorMsgEl);
  });

  return { isPwValid, isPwReValid };
}

export { checkPasswordValidation, isPwValid, isPwReValid };

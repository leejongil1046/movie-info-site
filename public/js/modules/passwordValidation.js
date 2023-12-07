let isPwValid = false;
let isPwReValid = false;

function validatePassword(
  pwInputEl,
  pwErrorMsgEl,
  pwReInputEl,
  pwReErrorMsgEl
) {
  let pwVal = pwInputEl.value;
  let pwReVal = pwReInputEl.value;
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

function checkPasswordValidation() {
  const pwInputEl = document.querySelector("#info__pw");
  const pwErrorMsgEl = document.querySelector("#pw-error-msg");
  const pwReInputEl = document.querySelector("#info__pwRe");
  const pwReErrorMsgEl = document.querySelector("#pwRe-error-msg");

  pwInputEl.addEventListener("input", () => {
    validatePassword(pwInputEl, pwErrorMsgEl, pwReInputEl, pwReErrorMsgEl);
  });

  pwReInputEl.addEventListener("input", () => {
    validatePassword(pwInputEl, pwErrorMsgEl, pwReInputEl, pwReErrorMsgEl);
  });

  return { isPwValid, isPwReValid };
}

export { checkPasswordValidation, isPwValid, isPwReValid };

function validatePassword(pwInputEl, pwErrorMsgEl) {
  let pwVal = pwInputEl.value;
  const pwRegExp =
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  if (pwRegExp.test(pwVal)) {
    pwErrorMsgEl.style.color = "limegreen";
    pwErrorMsgEl.textContent = "Your password is valid.";
    return true;
  } else {
    pwErrorMsgEl.style.color = "red";
    pwErrorMsgEl.textContent =
      "Enter a password with 8-20 characters, including letters, numbers, and symbols.";
    return false;
  }
}

function checkPasswordMatch(pwInputEl, pwReInputEl, pwReErrorMsgEl) {
  let pwVal = pwInputEl.value;
  let pwReVal = pwReInputEl.value;

  if (pwReVal === "") {
    pwReErrorMsgEl.textContent = "";
  } else if (pwVal === pwReVal) {
    pwReErrorMsgEl.style.color = "limegreen";
    pwReErrorMsgEl.textContent = "The passwords match.";
  } else {
    pwReErrorMsgEl.style.color = "red";
    pwReErrorMsgEl.textContent = "The passwords do not match.";
  }
}

export { validatePassword, checkPasswordMatch };

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

function emailDuplicationCheck(isEmailValid) {
  // 이메일 중복 검사
  const emailErrorMsgEl = document.querySelector("#email-error-msg");
  const emailInput = document.querySelector("#email");
  emailInput.addEventListener("blur", function () {
    if (this.value === "") {
      emailErrorMsgEl.style.color = "red";
      emailErrorMsgEl.textContent = "Please enter an email address.";
      return; // 형식이 유효하지 않으면 여기서 중단
    }

    if (!validateEmail(this.value)) {
      emailErrorMsgEl.style.color = "red";
      emailErrorMsgEl.textContent = "Please enter a valid email address.";
      return; // 형식이 유효하지 않으면 여기서 중단
    }

    fetch("/signup/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: this.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        isEmailValid = !data.isTaken;
        if (isEmailValid) {
          emailErrorMsgEl.style.color = "limegreen";
          emailErrorMsgEl.textContent = "The email is available.";
        } else {
          emailErrorMsgEl.style.color = "red";
          emailErrorMsgEl.textContent = "The email already exists.";
        }
      });
  });
}

export { emailDuplicationCheck };

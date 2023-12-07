function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

function emailDuplicationCheck() {
  return new Promise((resolve, reject) => {
    const emailErrorMsgEl = document.querySelector("#email-error-msg");
    const emailInput = document.querySelector("#email");

    emailInput.addEventListener("blur", function () {
      if (this.value === "") {
        emailErrorMsgEl.style.color = "red";
        emailErrorMsgEl.textContent = "Please enter an email address.";
        resolve(false);
        return;
      }

      if (!validateEmail(this.value)) {
        emailErrorMsgEl.style.color = "red";
        emailErrorMsgEl.textContent = "Please enter a valid email address.";
        resolve(false);
        return;
      }

      fetch("/signup/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.value }),
      })
        .then((response) => response.json())
        .then((data) => {
          const isEmailValid = !data.isTaken;
          if (isEmailValid) {
            emailErrorMsgEl.style.color = "limegreen";
            emailErrorMsgEl.textContent = "The email is available.";
          } else {
            emailErrorMsgEl.style.color = "red";
            emailErrorMsgEl.textContent = "The email already exists.";
          }
          resolve(isEmailValid);
        })
        .catch((error) => {
          console.error("Error:", error);
          reject(error);
        });
    });
  });
}

export { emailDuplicationCheck };

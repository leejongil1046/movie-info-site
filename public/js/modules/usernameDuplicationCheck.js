function usernameDuplicationCheck() {
  return new Promise((resolve, reject) => {
    const usernameErrorMsgEl = document.querySelector("#username-error-msg");
    const usernameInput = document.querySelector("#username");

    usernameInput.addEventListener("blur", function () {
      if (this.value === "") {
        usernameErrorMsgEl.style.color = "red";
        usernameErrorMsgEl.textContent = "Please enter a username.";
        resolve(false);
        return;
      }

      fetch("/signup/check-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: this.value }),
      })
        .then((response) => response.json())
        .then((data) => {
          const isUsernameValid = !data.isTaken;
          if (isUsernameValid) {
            usernameErrorMsgEl.style.color = "limegreen";
            usernameErrorMsgEl.textContent = "The username is available.";
          } else {
            usernameErrorMsgEl.style.color = "red";
            usernameErrorMsgEl.textContent = "The username already exists.";
          }
          resolve(isUsernameValid);
        })
        .catch((error) => {
          console.error("Error:", error);
          reject(error);
        });
    });
  });
}

export { usernameDuplicationCheck };

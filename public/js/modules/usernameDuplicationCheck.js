function usernameDuplicationCheck(isUsernameValid) {
  // 사용자 이름 중복 검사
  const usernameErrorMsgEl = document.querySelector("#username-error-msg");
  const usernameInput = document.querySelector("#username");
  usernameInput.addEventListener("blur", function () {
    if (this.value === "") {
      usernameErrorMsgEl.style.color = "red";
      usernameErrorMsgEl.textContent = "Please enter a username.";
      return; // 형식이 유효하지 않으면 여기서 중단
    }

    fetch("/signup/check-username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: this.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        isUsernameValid = !data.isTaken;
        if (isUsernameValid) {
          usernameErrorMsgEl.style.color = "limegreen";
          usernameErrorMsgEl.textContent = "The username is available.";
        } else {
          usernameErrorMsgEl.style.color = "red";
          usernameErrorMsgEl.textContent = "The username already exists.";
        }
      });
  });
}

export { usernameDuplicationCheck };

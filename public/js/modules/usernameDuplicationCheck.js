// 사용자 이름의 중복 여부를 확인하는 함수
function usernameDuplicationCheck() {
  // Promise 객체를 반환합니다. Promise는 비동기 작업을 처리하기 위한 객체입니다.
  return new Promise((resolve, reject) => {
    // 사용자 이름 입력 필드와 오류 메시지를 위한 요소를 선택합니다.
    const usernameErrorMsgEl = document.querySelector("#username-error-msg");
    const usernameInput = document.querySelector("#username");

    // 사용자 이름 입력 필드에 'blur' 이벤트 리스너를 추가합니다.
    // 'blur' 이벤트는 해당 입력 필드가 포커스를 잃었을 때 발생합니다.
    usernameInput.addEventListener("blur", function () {
      // 사용자가 아무것도 입력하지 않았을 경우
      if (this.value === "") {
        // 오류 메시지를 표시하고 Promise를 false로 resolve합니다.
        usernameErrorMsgEl.style.color = "red";
        usernameErrorMsgEl.textContent = "Please enter a username.";
        resolve(false);
        return;
      }

      // 서버에 사용자 이름의 중복 여부를 확인하는 POST 요청을 보냅니다.
      fetch("/signup/check-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: this.value }),
      })
        .then((response) => response.json()) // 서버 응답을 JSON으로 변환
        .then((data) => {
          // 중복 여부에 따라 적절한 메시지를 표시하고, 결과를 resolve합니다.
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
          // 오류 발생 시, 오류를 콘솔에 출력하고 Promise를 reject합니다.
          console.error("Error:", error);
          reject(error);
        });
    });
  });
}

// 함수를 다른 모듈에서 사용할 수 있도록 export합니다.
export { usernameDuplicationCheck };

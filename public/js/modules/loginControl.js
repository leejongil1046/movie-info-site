function loginCheck() {
  // login-box 요소 찾기
  const loginBox = document.querySelector("#login-box");
  // loggedin-box 요소 찾기
  const loggedInBox = document.querySelector("#loggedin-box");
  fetch("/api/login-status")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.loggedIn) {
        // 로그인 되었을 때의 UI 변경 로직
        // login-box 숨기기
        loginBox.style.display = "none";
        // loggedin-box 보이기
        loggedInBox.style.display = "block";
        console.log("로그인");
      } else {
        // 로그인 되지 않았을 때의 UI 변경 로직
        // login-box 보이기
        loginBox.style.display = "block";
        // loggedin-box 숨기기
        loggedInBox.style.display = "none";
        console.log("로그아웃");
      }
    });
}

function getUsername() {
  fetch("/api/userinfo")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Not authenticated");
      }
    })
    .then((data) => {
      console.log("로그인한 사용자:", data.username);
      // 여기에서 사용자 이름을 UI에 표시하거나 다른 처리를 할 수 있습니다.
    })
    .catch((error) => console.error(error));
}

export { loginCheck, getUsername };

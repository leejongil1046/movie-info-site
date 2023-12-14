let username;

// 이메일 형식을 검증하는 함수
function validateEmail(email) {
  // 이메일 형식을 정의하는 정규 표현식
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // 입력된 이메일이 정규 표현식과 일치하는지 검사
  return emailRegex.test(email);
}

// 로그인 처리를 위한 함수
function loginProcess() {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // 폼의 기본 제출 동작 방지

      // 폼 입력 필드에서 데이터 수집
      const emailField = document.querySelector("#login-form #email");
      const passwordField = document.querySelector("#login-form #password");
      const email = emailField.value;
      const password = passwordField.value;

      // 이메일 형식 검증
      if (!validateEmail(email)) {
        alert("Please enter a correct email address.");
        emailField.value = "";
        passwordField.value = "";
        emailField.focus();
        return;
      }

      // 이메일과 비밀번호가 모두 입력되었는지 확인
      if (!email || !password) {
        alert("Please enter both email and password.");
        emailField.value = "";
        passwordField.value = "";
        emailField.focus();
        return;
      }

      // 서버로 로그인 요청 보내기
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          // 응답이 성공적이면 페이지 리디렉션
          if (response.ok) {
            window.location.href = window.location.href; // 페이지 리디렉션
          } else {
            response.json().then((data) => {
              alert(data.message || "The email or password is incorrect.");
            });
          }
        })
        .catch((error) => {
          console.error(
            "Login error: Failed to communicate with server. Please check your network connection and try again.",
            error
          );
          // 로그인 실패 시 사용자에게 알리는 UI 처리
        });
    });
  }
}

// 로그아웃 처리를 위한 함수
function logoutProcess() {
  document
    .querySelector("#logout-button")
    .addEventListener("click", function () {
      fetch("/logout", { method: "GET" })
        .then((response) => {
          if (response.redirected) {
            window.location.href = window.location.href; // 페이지 리디렉션
          }
        })
        .catch((error) =>
          console.error(
            "Logout error: Unable to log out. Please try again later.",
            error
          )
        );
    });
}

// 로그인 상태 확인을 위한 함수
async function loginCheck() {
  const loginBox = document.querySelector("#login-box");
  const loggedInBox = document.querySelector("#loggedin-box");
  const loggedInUsername = document.querySelector("#loggedin-username");

  const response = await fetch("/api/login-status");
  const data = await response.json();

  if (data.loggedIn) {
    loggedInUsername.innerHTML = data.username;
    loggedInBox.style.display = "block";
    return data; // 로그인된 사용자의 이름 반환
  } else {
    loginBox.style.display = "block";
    return null; // 로그인되지 않았을 경우 null 반환
  }
}

export { loginProcess, logoutProcess, loginCheck }; // 함수들을 다른 모듈에서 사용할 수 있도록 export

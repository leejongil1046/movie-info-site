// 이메일 형식을 검증하는 함수
function validateEmail(email) {
  // 이메일 형식을 정의하는 정규 표현식
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // 입력된 이메일이 정규 표현식과 일치하는지 검사
  return emailRegex.test(email);
}

function loginProcess() {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // 폼 데이터 수집
      const emailField = document.querySelector("#login-form #email");
      const passwordField = document.querySelector("#login-form #password");
      const email = emailField.value;
      const password = passwordField.value;

      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        emailField.value = "";
        passwordField.value = "";
        emailField.focus();
        return;
      }

      // 입력 값 검증
      if (!email || !password) {
        alert("Please enter both your email and password.");
        emailField.value = "";
        passwordField.value = "";
        emailField.focus();
        return;
      }

      // 서버에 로그인 요청 보내기
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          // 성공적인 응답을 확인하고 적절한 페이지로 리디렉션
          if (response.ok) {
            getUsername();
            // 클라이언트 측 JavaScript를 사용하여 페이지를 리디렉션
            window.location.href = window.location.href;
          } else {
            response.json().then((data) => {
              alert(data.message || "The email or password is incorrect.");
            });
          }
        })
        .catch((error) => {
          console.error("에러 발생:", error);
          // 여기에서 사용자에게 로그인 실패를 알리는 UI 처리를 할 수 있습니다.
        });
    });
  }
}

function logoutProcess() {
  document
    .querySelector("#logout-button")
    .addEventListener("click", function () {
      fetch("/logout", { method: "GET" })
        .then((response) => {
          if (response.redirected) {
            window.location.href = window.location.href;
          }
        })
        .catch((error) => console.error("Error:", error));
    });
}

function loginCheck() {
  // login-box 요소 찾기
  const loginBox = document.querySelector("#login-box");
  // loggedin-box 요소 찾기
  const loggedInBox = document.querySelector("#loggedin-box");
  const loggedInUsername = document.querySelector("#loggedin-username");
  fetch("/api/login-status")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.loggedIn) {
        getUsername();
        // loggedin-box 보이기
        loggedInBox.style.display = "block";
        console.log("로그인");
      } else {
        // login-box 보이기
        loginBox.style.display = "block";
        console.log("로그아웃");
      }
    });
}

function getUsername() {
  const loggedInUsername = document.querySelector("#loggedin-username");
  fetch("/api/userinfo")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Not authenticated");
      }
    })
    .then((data) => {
      loggedInUsername.innerHTML = data.username;
      console.log("로그인한 사용자:", data.username);
      // 여기에서 사용자 이름을 UI에 표시하거나 다른 처리를 할 수 있습니다.
    })
    .catch((error) => console.error(error));
}

export { loginProcess, logoutProcess, loginCheck };

// 이메일 형식을 검증하는 함수
function validateEmail(email) {
  // 이메일 형식을 정의하는 정규 표현식
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // 입력된 이메일이 정규 표현식과 일치하는지 검사
  return emailRegex.test(email);
}

// 이메일의 중복 여부를 확인하는 함수
function emailDuplicationCheck() {
  // Promise 객체를 반환. 비동기 작업을 처리하기 위한 객체입니다.
  return new Promise((resolve, reject) => {
    // 이메일 입력 필드와 오류 메시지를 위한 요소를 선택
    const emailErrorMsgEl = document.querySelector("#email-error-msg");
    const emailInput = document.querySelector("#email");

    // 이메일 입력 필드에 'blur' 이벤트 리스너 추가
    // 'blur' 이벤트는 해당 입력 필드가 포커스를 잃었을 때 발생
    emailInput.addEventListener("blur", function () {
      // 사용자가 아무것도 입력하지 않은 경우
      if (this.value === "") {
        emailErrorMsgEl.style.color = "red";
        emailErrorMsgEl.textContent = "Please enter your email address.";
        resolve(false);
        return;
      }

      // 이메일 형식이 유효하지 않은 경우
      if (!validateEmail(this.value)) {
        emailErrorMsgEl.style.color = "red";
        emailErrorMsgEl.textContent = "Please enter a valid email address.";
        resolve(false);
        return;
      }

      // 서버에 이메일의 중복 여부를 확인하는 POST 요청을 보냄
      fetch("/signup/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.value }),
      })
        .then((response) => response.json()) // 서버 응답을 JSON으로 변환
        .then((data) => {
          // 중복 여부에 따라 적절한 메시지를 표시하고 결과를 resolve
          const isEmailValid = !data.isTaken;
          if (isEmailValid) {
            emailErrorMsgEl.style.color = "limegreen";
            emailErrorMsgEl.textContent = "The email is available.";
          } else {
            emailErrorMsgEl.style.color = "red";
            emailErrorMsgEl.textContent = "This email already exists.";
          }
          resolve(isEmailValid);
        })
        .catch((error) => {
          // 오류 발생 시, 오류를 콘솔에 출력하고 Promise를 reject
          console.error("Error occurred during email validation:", error);
          reject(error);
        });
    });
  });
}

// 함수를 다른 모듈에서 사용할 수 있도록 export
export { emailDuplicationCheck };

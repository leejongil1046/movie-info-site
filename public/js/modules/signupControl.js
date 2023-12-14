function signupSubmit(isSubmitValidFunc) {
  const signupForm = document.querySelector("#signup-form");
  // 폼 제출 핸들러 추가
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 항상 방지

    if (isSubmitValidFunc()) {
      // 폼 데이터 수집
      const signupFormData = {
        username: document.querySelector("#username").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#info__pw").value, // 비밀번호 입력 필드의 id를 확인하고 맞춰주세요.
        confirmPassword: document.querySelector("#info__pwRe").value, // 비밀번호 확인 필드의 id를 확인하고 맞춰주세요.
        year: document.querySelector("#birth-year").value,
        month: document.querySelector("#birth-month").value,
        day: document.querySelector("#birth-day").value,
      };

      // formData 객체의 값을 검증
      const hasEmptyValue = Object.values(signupFormData).some(
        (value) => value === ""
      );

      if (hasEmptyValue) {
        // 빈 값이 하나라도 있으면 오류 처리
        alert("Please ensure all fields are valid before submitting."); // 또는 원하는 오류 처리 방법을 선택하세요.
      } else {
        // 모든 필드가 채워져 있을 때 다음 동작 수행
        // 서버로 데이터 전송
        fetch("/signup/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupFormData),
        })
          .then((response) => {
            if (response.ok) {
              return response.text();
            }
            throw new Error("Network response was not ok.");
          })
          .then(() => {
            window.location.href = "/success"; // 성공 페이지 또는 메인 페이지로 리다이렉트
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } else {
      alert("Please ensure all fields are valid before submitting.");
    }
  });
}

export { signupSubmit }; // 함수를 다른 모듈에서 사용할 수 있도록 export

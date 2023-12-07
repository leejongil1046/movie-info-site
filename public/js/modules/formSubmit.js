function formSubmit(isSubmitValidFunc) {
  const form = document.querySelector("#signup-form");
  // 폼 제출 핸들러 추가
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // 폼n의 기본 제출 동작을 항상 방지

    console.log(isSubmitValidFunc());

    if (isSubmitValidFunc()) {
      // 폼 데이터 수집
      const formData = {
        username: document.querySelector("#username").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#info__pw").value, // 패스워드 입력 필드의 id를 확인하고 맞춰주세요.
        confirmPassword: document.querySelector("#info__pwRe").value, // 확인 패스워드 입력 필드의 id를 확인하고 맞춰주세요.
        year: document.querySelector("#birth-year").value,
        month: document.querySelector("#birth-month").value,
        day: document.querySelector("#birth-day").value,
      };

      // 서버로 데이터 전송
      fetch("/signup/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
    } else {
      alert("Please ensure all fields are valid before submitting.");
    }
  });
}

export { formSubmit };

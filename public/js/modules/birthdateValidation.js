let isBirthdateValid = false; // 생년월일이 유효한지 여부를 나타내는 변수

// 생년월일 유효성을 검증하는 함수
function validateBirthdate(yearInput, monthInput, dayInput, birthErrorMsgEl) {
  // 윤년인지 확인하는 함수
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  // 해당 월의 일 수를 반환하는 함수
  function getDaysInMonth(year, month) {
    return [
      31,
      isLeapYear(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ][month - 1];
  }

  const year = parseInt(yearInput.value, 10); // 입력된 년도
  const month = parseInt(monthInput.value, 10); // 입력된 월
  const day = parseInt(dayInput.value, 10); // 입력된 일
  console.log(year && month && day); // 입력된 년, 월, 일이 유효한지 확인
  if (year && month && day) {
    // 입력된 날짜가 해당 월의 일 수 이내인지 검사
    isBirthdateValid = day <= getDaysInMonth(year, month);

    if (isBirthdateValid) {
      // 날짜가 유효할 경우
      birthErrorMsgEl.style.color = "limegreen";
      birthErrorMsgEl.textContent = "The date is valid.";
      isBirthdateValid = true;
    } else {
      // 날짜가 유효하지 않을 경우
      birthErrorMsgEl.style.color = "red";
      birthErrorMsgEl.textContent = "The date is invalid.";
      isBirthdateValid = false;
    }
  }
}

// 생년월일 유효성 검사를 수행하는 함수
function checkBirthdateValidation() {
  // 생년월일 입력 필드 선택
  const yearInput = document.getElementById("birth-year");
  const monthInput = document.getElementById("birth-month");
  const dayInput = document.getElementById("birth-day");
  const birthErrorMsgEl = document.querySelector("#birth-error-msg");

  // 각 입력 필드에 입력 이벤트 리스너 추가
  [(yearInput, monthInput, dayInput)].forEach((input) =>
    input.addEventListener("input", () => {
      validateBirthdate(yearInput, monthInput, dayInput, birthErrorMsgEl);
    })
  );
}

export { checkBirthdateValidation, isBirthdateValid }; // 함수와 변수를 다른 모듈에서 사용할 수 있도록 export

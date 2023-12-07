function validateBirthdate(yearInput, monthInput, dayInput, birthErrorMsgEl) {
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

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

  const year = parseInt(yearInput.value, 10);
  const month = parseInt(monthInput.value, 10);
  const day = parseInt(dayInput.value, 10);
  let isBirthdateValid = false;

  if (year && month && day) {
    isBirthdateValid = day <= getDaysInMonth(year, month);

    if (isBirthdateValid) {
      birthErrorMsgEl.style.color = "limegreen";
      birthErrorMsgEl.textContent = "The date is valid.";
    } else {
      birthErrorMsgEl.style.color = "red";
      birthErrorMsgEl.textContent = "The date is invalid";
    }
  }

  return isBirthdateValid;
}

function checkBirthdateValidation(isBirthdateValid) {
  // 생년월일 입력 여부 검사
  const yearInput = document.getElementById("birth-year");
  const monthInput = document.getElementById("birth-month");
  const dayInput = document.getElementById("birth-day");
  const birthErrorMsgEl = document.querySelector("#birth-error-msg");
  [yearInput, monthInput, dayInput].forEach((input) =>
    input.addEventListener("input", () => {
      isBirthdateValid = validateBirthdate(
        yearInput,
        monthInput,
        dayInput,
        birthErrorMsgEl
      );
      console.log("isBirthdateValid = ", isBirthdateValid);
    })
  );
}

export { checkBirthdateValidation };

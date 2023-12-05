// pwVal: 패스워드, pwReVal: 패스워드 재입력, isPwValid: 패스워드 유효 여부
let pwVal = "",
  pwReVal = "",
  isPwValid = false;
const pwInputEl = document.querySelector("#info__pw");
const pwErrorMsgEl = document.querySelector("#pw-msg");
pwInputEl.addEventListener("change", () => {
  const pwRegExp =
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  pwVal = pwInputEl.value;
  if (pwRegExp.test(pwVal)) {
    // 정규식 조건 만족 O
    isPwValid = true;
    pwErrorMsgEl.style.color = "green";
    pwErrorMsgEl.textContent = "사용가능한 비밀번호입니다.";
  } else {
    // 정규식 조건 만족 X
    isPwValid = false;
    pwErrorMsgEl.style.color = "red";
    pwErrorMsgEl.textContent =
      "8~20자의 영문, 숫자, 특수문자를 모두 포함한 비밀번호를 입력해주세요.";
  }
  checkPwValid();
  console.log(pwVal, pwReVal, isPwValid, account);
});

/*** SECTION - PASSWORD RECHECK ***/
const pwReInputEl = document.querySelector("#info__pwRe");
const pwReErrorMsgEl = document.querySelector("#pwRe-msg");
pwReInputEl.addEventListener("change", () => {
  pwReVal = pwReInputEl.value;
  if (isPwValid) checkPwValid();
  // console.log(pwVal, pwReVal, isPwValid, account);
  console.log(pwVal, pwReVal, isPwValid);
});

// 비밀번호와 재입력 값 일치 여부
function checkPwValid() {
  //account.pw = null; // default null 처리
  if (pwReVal === "") {
    // 미입력
    pwReErrorMsgEl.textContent = "";
  } else if (pwVal === pwReVal) {
    // 비밀번호 재입력 일치
    //if (isPwValid)
    //account.pw = pwVal;
    pwReErrorMsgEl.style.color = "green";
    pwReErrorMsgEl.textContent = "비밀번호가 일치합니다.";
  } else {
    // 비밀번호 재입력 불일치
    pwReErrorMsgEl.style.color = "red";
    pwReErrorMsgEl.textContent = "비밀번호가 일치하지 않습니다.";
  }
}

// '출생 연도' 셀렉트 박스 option 목록 동적 생성
const birthYearEl = document.querySelector("#birth-year");
// option 목록 생성 여부 확인
isYearOptionExisted = false;
birthYearEl.addEventListener("focus", function () {
  // year 목록 생성되지 않았을 때 (최초 클릭 시)
  if (!isYearOptionExisted) {
    isYearOptionExisted = true;
    for (var i = 1940; i <= 2022; i++) {
      // option element 생성
      const YearOption = document.createElement("option");
      YearOption.setAttribute("value", i);
      YearOption.innerText = i;
      // birthYearEl의 자식 요소로 추가
      this.appendChild(YearOption);
    }
  }
});

// '출생 연도' 셀렉트 박스 option 목록 동적 생성
const birthMonthEl = document.querySelector("#birth-month");
// option 목록 생성 여부 확인
isMonthOptionExisted = false;
birthMonthEl.addEventListener("focus", function () {
  // year 목록 생성되지 않았을 때 (최초 클릭 시)
  if (!isMonthOptionExisted) {
    isMonthOptionExisted = true;
    for (var i = 1; i <= 12; i++) {
      // option element 생성
      const MonthOption = document.createElement("option");
      MonthOption.setAttribute("value", i);
      MonthOption.innerText = i;
      // birthMonthEl의 자식 요소로 추가
      this.appendChild(MonthOption);
    }
  }
});

// '출생 연도' 셀렉트 박스 option 목록 동적 생성
const birthDayEl = document.querySelector("#birth-day");
// option 목록 생성 여부 확인
isDayOptionExisted = false;
birthDayEl.addEventListener("focus", function () {
  // day 목록 생성되지 않았을 때 (최초 클릭 시)
  if (!isDayOptionExisted) {
    isDayOptionExisted = true;
    for (var i = 1; i <= 31; i++) {
      // option element 생성
      const DayOption = document.createElement("option");
      DayOption.setAttribute("value", i);
      DayOption.innerText = i;
      // birthDayEl의 자식 요소로 추가
      this.appendChild(DayOption);
    }
  }
});

// "뒤로 가기" 이모티콘에 클릭 이벤트 리스너 추가
document
  .getElementById("back-icon")
  .addEventListener("click", function (event) {
    event.preventDefault(); // 기본 동작 방지
    window.history.back(); // 브라우저 히스토리에서 뒤로 가기
  });

document.getElementById("refresh-icon").addEventListener("click", function () {
  location.reload(); // 현재 페이지 새로고침
});

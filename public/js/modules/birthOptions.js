// 특정 범위 내의 연도 옵션을 생성하는 함수
function generateYearOptions(birthYearEl, startYear, endYear) {
  let isYearOptionExisted = false; // 연도 옵션이 이미 생성되었는지 확인하는 플래그
  birthYearEl.addEventListener("focus", function () {
    if (!isYearOptionExisted) {
      isYearOptionExisted = true;
      for (let i = startYear; i <= endYear; i++) {
        const yearOption = document.createElement("option"); // 새로운 option 요소 생성
        yearOption.setAttribute("value", i); // 연도 값을 value 속성에 설정
        yearOption.innerText = i; // 연도 텍스트 설정
        birthYearEl.appendChild(yearOption); // 연도 옵션을 select 요소에 추가
      }
    }
  });
}

// 월 옵션을 생성하는 함수
function generateMonthOptions(birthMonthEl) {
  let isMonthOptionExisted = false; // 월 옵션이 이미 생성되었는지 확인하는 플래그
  birthMonthEl.addEventListener("focus", function () {
    if (!isMonthOptionExisted) {
      isMonthOptionExisted = true;
      for (let i = 1; i <= 12; i++) {
        const monthOption = document.createElement("option"); // 새로운 option 요소 생성
        monthOption.setAttribute("value", i); // 월 값을 value 속성에 설정
        monthOption.innerText = i; // 월 텍스트 설정
        birthMonthEl.appendChild(monthOption); // 월 옵션을 select 요소에 추가
      }
    }
  });
}

// 일 옵션을 생성하는 함수
function generateDayOptions(birthDayEl) {
  let isDayOptionExisted = false; // 일 옵션이 이미 생성되었는지 확인하는 플래그
  birthDayEl.addEventListener("focus", function () {
    if (!isDayOptionExisted) {
      isDayOptionExisted = true;
      for (let i = 1; i <= 31; i++) {
        const dayOption = document.createElement("option"); // 새로운 option 요소 생성
        dayOption.setAttribute("value", i); // 일 값을 value 속성에 설정
        dayOption.innerText = i; // 일 텍스트 설정
        birthDayEl.appendChild(dayOption); // 일 옵션을 select 요소에 추가
      }
    }
  });
}

// 생년월일 옵션을 생성하는 함수
function generateBirthOptions() {
  const birthYearEl = document.querySelector("#birth-year"); // 연도 선택 요소
  const birthMonthEl = document.querySelector("#birth-month"); // 월 선택 요소
  const birthDayEl = document.querySelector("#birth-day"); // 일 선택 요소

  generateYearOptions(birthYearEl, 1940, 2022); // 연도 옵션 생성
  generateMonthOptions(birthMonthEl); // 월 옵션 생성
  generateDayOptions(birthDayEl); // 일 옵션 생성
}

export { generateBirthOptions }; // 함수를 다른 모듈에서 사용할 수 있도록 export

function generateYearOptions(birthYearEl, startYear, endYear) {
  let isYearOptionExisted = false;
  birthYearEl.addEventListener("focus", function () {
    if (!isYearOptionExisted) {
      isYearOptionExisted = true;
      for (let i = startYear; i <= endYear; i++) {
        const yearOption = document.createElement("option");
        yearOption.setAttribute("value", i);
        yearOption.innerText = i;
        birthYearEl.appendChild(yearOption);
      }
    }
  });
}

function generateMonthOptions(birthMonthEl) {
  let isMonthOptionExisted = false;
  birthMonthEl.addEventListener("focus", function () {
    if (!isMonthOptionExisted) {
      isMonthOptionExisted = true;
      for (let i = 1; i <= 12; i++) {
        const monthOption = document.createElement("option");
        monthOption.setAttribute("value", i);
        monthOption.innerText = i;
        birthMonthEl.appendChild(monthOption);
      }
    }
  });
}

function generateDayOptions(birthDayEl) {
  let isDayOptionExisted = false;
  birthDayEl.addEventListener("focus", function () {
    if (!isDayOptionExisted) {
      isDayOptionExisted = true;
      for (let i = 1; i <= 31; i++) {
        const dayOption = document.createElement("option");
        dayOption.setAttribute("value", i);
        dayOption.innerText = i;
        birthDayEl.appendChild(dayOption);
      }
    }
  });
}

function generateBirthOptions() {
  const birthYearEl = document.querySelector("#birth-year");
  const birthMonthEl = document.querySelector("#birth-month");
  const birthDayEl = document.querySelector("#birth-day");

  generateYearOptions(birthYearEl, 1940, 2022);
  generateMonthOptions(birthMonthEl);
  generateDayOptions(birthDayEl);
}

export { generateBirthOptions };

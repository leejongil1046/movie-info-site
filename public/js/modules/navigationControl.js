import { showNewSortedMovies } from "/js/modules/moviesAPI.js";

function setupBackButton(backButtonId) {
  const backButton = document.getElementById(backButtonId);
  if (backButton) {
    backButton.addEventListener("click", function (event) {
      event.preventDefault();
      window.history.back();
    });
  }
}

function setupRefreshButton(refreshButtonId) {
  const refreshButton = document.getElementById(refreshButtonId);
  if (refreshButton) {
    refreshButton.addEventListener("click", function () {
      location.reload();
    });
  }
}

function updateSortMenuState() {
  const currentSortCriteria = sessionStorage.getItem("currentSortCriteria");
  const sortButtons = {
    title: document.querySelector("#sort-title"),
    rating: document.querySelector("#sort-rating"),
    year: document.querySelector("#sort-year"),
  };

  // 모든 버튼에서 'choiced' 클래스 제거
  Object.values(sortButtons).forEach((button) =>
    button.classList.remove("choiced")
  );

  // 현재 정렬 기준에 해당하는 버튼에 'choiced' 클래스 추가
  if (currentSortCriteria && sortButtons[currentSortCriteria]) {
    sortButtons[currentSortCriteria].classList.add("choiced");
  }
}

function sortButtonHandler() {
  const sortIcon = document.querySelector("#sort-icon");
  const sortMenu = document.querySelector("#sort-menu");
  sortIcon.addEventListener("click", function () {
    sortIcon.classList.toggle("used");
    sortMenu.classList.toggle("open");
  });

  const sortTitleButton = document.querySelector("#sort-title");
  const sortRatingButton = document.querySelector("#sort-rating");
  const sortYearButton = document.querySelector("#sort-year");
  // 버튼과 해당 정렬 기준을 매핑
  const buttonsWithCriteria = [
    { button: sortTitleButton, criteria: "title" },
    { button: sortRatingButton, criteria: "rating" },
    { button: sortYearButton, criteria: "year" },
  ];

  // 각 버튼에 이벤트 리스너 추가
  buttonsWithCriteria.forEach(({ button, criteria }) => {
    button.addEventListener("click", function () {
      window.location.href = "/";

      // 현재 클릭된 버튼에만 'choiced' 클래스 토글
      this.classList.toggle("choiced");

      // 다른 버튼들에서 'choiced' 클래스 제거
      buttonsWithCriteria.forEach(({ button: otherButton }) => {
        if (otherButton !== this && otherButton.classList.contains("choiced")) {
          otherButton.classList.remove("choiced");
        }
      });

      // newSortedMovies 함수 호출
      showNewSortedMovies(criteria);
    });
  });
}

function searchButtonHandler() {
  const searchButton = document.querySelector("#search-icon");
  const searchInput = document.querySelector("#search-input");
  const resultsContainer = document.querySelector("#search-results");
  searchButton.addEventListener("click", function () {
    searchButton.classList.toggle("used");
    searchInput.classList.toggle("open");
    if (searchInput.classList.contains("open")) searchInput.focus();
    else {
      searchInput.blur();
      searchInput.value = "";
      setTimeout(() => {
        resultsContainer.innerHTML = "";
      }, 1000);
    }
  });
}

export {
  setupBackButton,
  setupRefreshButton,
  sortButtonHandler,
  updateSortMenuState,
  searchButtonHandler,
};

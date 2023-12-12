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

function sortButton() {
  const sortIcon = document.querySelector("#sort-icon");
  const sortMenu = document.querySelector("#sort-menu");
  sortIcon.addEventListener("click", function () {
    sortMenu.classList.toggle("open");
  });

  const sortTitleButton = document.querySelector("#sort-title");
  const sortRatingButton = document.querySelector("#sort-rating");
  const sortYearButton = document.querySelector("#sort-year");
}

export { setupBackButton, setupRefreshButton };

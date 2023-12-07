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

export { setupBackButton, setupRefreshButton };

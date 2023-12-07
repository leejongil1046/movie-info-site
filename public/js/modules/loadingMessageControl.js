function createLoadingMessage() {
  const loadingMessage = document.createElement("p");
  loadingMessage.textContent = "Loading";
  loadingMessage.id = "loading-message";
  document.body.appendChild(loadingMessage);
}

function removeLoadingMessage() {
  const loadingMessage = document.querySelector("#loading-message");
  if (loadingMessage) {
    document.body.removeChild(loadingMessage);
  }
}

export { createLoadingMessage, removeLoadingMessage };

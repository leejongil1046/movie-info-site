// 로딩 메시지를 생성하는 함수
function createLoadingMessage() {
  const loadingMessage = document.createElement("p"); // 새로운 p 요소 생성
  loadingMessage.textContent = "Loading"; // 로딩 메시지 텍스트 설정
  loadingMessage.id = "loading-message"; // 요소에 id 속성 부여
  document.body.appendChild(loadingMessage); // 생성된 메시지를 문서 body에 추가
}

// 로딩 메시지를 제거하는 함수
function removeLoadingMessage() {
  const loadingMessage = document.querySelector("#loading-message"); // 로딩 메시지 요소 선택
  if (loadingMessage) {
    document.body.removeChild(loadingMessage); // 로딩 메시지가 존재하면 제거
  }
}

export { createLoadingMessage, removeLoadingMessage }; // 함수들을 다른 모듈에서 사용할 수 있도록 export

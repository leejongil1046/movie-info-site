// DOM이 로드되었을 때 실행
document.addEventListener("DOMContentLoaded", () => {
  // '/api/movies' 경로로 HTTP GET 요청을 보냄
  fetch("/api/movies")
    .then((response) => {
      // 응답을 JSON 형식으로 파싱
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // 파싱된 데이터 처리
      const moviesContainer = document.querySelector("#movies-container");
      // 로딩 문구 제거
      const loadingMessage = moviesContainer.querySelector("#loading-message");
      if (loadingMessage) {
        loadingMessage.innerHTML = ""; // 'p' 태그의 내용을 비움
      }
      data.data.movies.forEach((movie) => {
        // 각 영화에 대한 HTML 요소 생성 및 추가
        const movieElement = document.createElement("div");
        movieElement.innerHTML = `
                <img src="${movie.medium_cover_image}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                `;
        moviesContainer.appendChild(movieElement);
      });
    })
    .catch((error) => {
      // 오류 처리
      console.error("Fetch error:", error);
    });
});

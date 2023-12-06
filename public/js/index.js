// DOM이 로드되었을 때 실행
document.addEventListener("DOMContentLoaded", () => {
  // 로딩 메시지 추가
  const loadingMessage = document.createElement("p");
  loadingMessage.textContent = "Loading";
  loadingMessage.id = "loading-message";
  document.body.appendChild(loadingMessage);

  fetchMoviesData();
});

function fetchMoviesData() {
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
      // 로딩 메시지 제거
      const loadingMessage = document.getElementById("loading-message");
      if (loadingMessage) {
        document.body.removeChild(loadingMessage);
      }
      // 파싱된 데이터 처리
      const moviesContainer = document.querySelector("#movies-container");
      data.data.movies.forEach((movie) => {
        // 각 영화에 대한 HTML 요소 생성 및 추가
        const movieElement = document.createElement("div");
        movieElement.innerHTML = `
                  <a href="/movie">
                    <img src="${movie.medium_cover_image}" alt="${movie.title}">
                  </a>          
                  <h3>${movie.title}</h3>
                  `;
        moviesContainer.appendChild(movieElement);

        movieElement.querySelector("a").addEventListener("click", (event) => {
          event.preventDefault(); // 기본 이벤트 방지
          window.location.href = `/movie/${movie.id}`; // 영화 상세 페이지로 이동
        });
      });
    })
    .catch((error) => {
      // 오류 처리
      console.error("Fetch error:", error);
    });
}

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

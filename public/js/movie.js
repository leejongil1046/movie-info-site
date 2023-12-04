// URL에서 ID를 추출
const movieId = new URL(window.location).pathname.split("/").pop();

// 영화 상세 정보를 가져오는 함수
function fetchMovieDetails(movieId) {
  fetch(`/movie/details/${movieId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        document.getElementById("movie-title").textContent =
          data.data.movie.title;
        document.getElementById("movie-image").src =
          data.data.movie.medium_cover_image;
        document.getElementById("movie-image").alt = data.data.movie.title;
        document.getElementById("movie-description").textContent =
          data.data.movie.description_full;
      } else {
        document.getElementById("movie-title").textContent = "Movie not found";
      }
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
      document.getElementById("movie-title").textContent =
        "Error loading movie details";
    });
}

// 페이지 로드 시 영화 상세 정보를 가져옴
fetchMovieDetails(movieId);

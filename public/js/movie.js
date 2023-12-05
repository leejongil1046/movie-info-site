// 페이지 로딩 시 이미지와 설명을 숨김
document.querySelector("#movie-image").style.display = "none";
document.querySelector(".movie-story").style.display = "none";

// 로딩 메시지 추가
const loadingMessage = document.createElement("p");
loadingMessage.textContent = "Loading...";
loadingMessage.id = "loading-message";
document.body.appendChild(loadingMessage);

// URL에서 ID를 추출
const movieId = new URL(window.location).pathname.split("/").pop();

// 영화 상세 정보를 가져오는 함수
function fetchMovieDetails(movieId) {
  fetch(`/movie/details/${movieId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // 로딩 메시지 제거
      const loadingMessage = document.querySelector("#loading-message");
      if (loadingMessage) {
        document.body.removeChild(loadingMessage);
      }
      if (data.status === "ok") {
        document.querySelector("#movie-image").style.display = "block";
        document.querySelector(".movie-story").style.display = "block";
        document.querySelector("#movie-title").textContent =
          data.data.movie.title_long;
        document.querySelector("#movie-image").src =
          data.data.movie.medium_cover_image;
        document.querySelector("#movie-image").alt = data.data.movie.title;
        document.querySelector("#movie-genres").innerHTML =
          data.data.movie.genres.join(" / ");
        document.querySelector("#movie-runtime").innerHTML =
          data.data.movie.runtime + " min";
        document.querySelector("#movie-language").innerHTML =
          '<span id="language-label"><i class="fa-solid fa-language"></i></span> ' +
          data.data.movie.language;
        document.querySelector("#movie-rating").innerHTML =
          '<span id="rating-label"><i class="fa-solid fa-star"></i></span> ' +
          data.data.movie.rating +
          "/10";
        document.querySelector("#movie-like").innerHTML =
          '<span id="like-label"><i class="fa-solid fa-heart"></i></span> ' +
          data.data.movie.like_count;
        document.querySelector("#movie-description").innerHTML =
          '<div id="description-label">description</div><br> ' +
          data.data.movie.description_full.substring(
            0,
            data.data.movie.description_full.indexOf("—")
          );
      } else {
        document.querySelector("#movie-title").textContent = "Movie not found";
      }
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
      document.querySelector("#movie-title").textContent =
        "Error loading movie details";
    });
}

// 페이지 로드 시 영화 상세 정보를 가져옴
fetchMovieDetails(movieId);

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

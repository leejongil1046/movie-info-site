// 페이지 로딩 시 이미지와 설명을 숨김
document.querySelector("#movie-image").style.display = "none";
document.querySelector(".movie-story").style.display = "none";
document.querySelector(".movie-reviews").style.display = "none";

// 로딩 메시지 추가
const loadingMessage = document.createElement("p");
loadingMessage.textContent = "Loading";
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
        // API 응답에서 이미지 URL 추출
        const imageUrl = data.data.movie.background_image;
        // body 태그의 배경 이미지로 설정
        document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url('${imageUrl}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center center";
        document.querySelector("#movie-image").style.display = "block";
        document.querySelector(".movie-story").style.display = "block";
        document.querySelector(".movie-reviews").style.display = "block";
        document.querySelector("#movie-title").textContent =
          data.data.movie.title_long;
        document.querySelector("#movie-image").src =
          data.data.movie.medium_cover_image;
        document.querySelector("#movie-image").alt = data.data.movie.title;
        document.querySelector("#movie-genres").innerHTML =
          data.data.movie.genres.join(" / ");
        document.querySelector("#movie-runtime").innerHTML =
          '<span id="runtime-label"><i class="fa-regular fa-clock"></i></span> &nbsp;&nbsp;' +
          data.data.movie.runtime +
          " min";
        let language;
        if (data.data.movie.language === "en") language = "English";
        document.querySelector("#movie-language").innerHTML =
          '<span id="language-label"><i class="fa-solid fa-volume-high"></i></span> &nbsp;' +
          language;
        document.querySelector("#movie-rating").innerHTML =
          '<span id="rating-label"><i class="fa-solid fa-star"></i></span> &nbsp;&nbsp;' +
          data.data.movie.rating +
          "/10";
        document.querySelector("#movie-like").innerHTML =
          '<span id="like-label"><i class="fa-solid fa-heart"></i></span> &nbsp;&nbsp;' +
          data.data.movie.like_count;
        const descriptionFull = data.data.movie.description_full;
        let descriptionText;

        // "—" 문자가 있는지 확인
        if (descriptionFull.indexOf("—") !== -1) {
          // "—" 문자가 있으면, 그 위치까지의 문자열을 추출
          descriptionText = descriptionFull.substring(
            0,
            descriptionFull.indexOf("—")
          );
        } else {
          // "—" 문자가 없으면, 전체 문자열을 사용
          descriptionText = descriptionFull;
        }

        // 결과를 HTML 요소에 적용
        document.querySelector("#movie-description").innerHTML =
          '<h2 id="description-label">Description</h2> &nbsp;&nbsp;' +
          descriptionText;
        document.querySelector(
          "#movie-more"
        ).innerHTML = `<a href=${data.data.movie.url}><button id="more-button">More...</button></a> `;
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

document
  .getElementById("review-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // 폼 기본 제출 동작 방지

    // 입력된 점수와 댓글 텍스트를 가져옵니다
    const score = document.getElementById("review-score").value;
    const text = document.getElementById("review-text").value;

    // 댓글을 표시할 요소 생성
    const newReview = document.createElement("p");
    newReview.textContent = `점수: ${score}, 댓글: ${text}`;

    // 댓글 목록에 새 댓글 추가
    document.getElementById("reviews-list").appendChild(newReview);

    // 입력 필드 초기화
    document.getElementById("review-score").value = "";
    document.getElementById("review-text").value = "";
  });

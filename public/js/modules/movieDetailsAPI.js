import { removeLoadingMessage } from "/js/modules/loadingMessageControl.js"; // Adjust the path as needed

function truncateDescription(description, maxLength) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
}

// 영화 상세 정보를 가져오는 함수
function fetchMovieDetails(movieId) {
  fetch(`/api/movie/details/${movieId}`)
    .then((response) => response.json())
    .then((data) => {
      // 로딩 메시지 제거
      removeLoadingMessage();
      if (data.status === "ok") {
        // API 응답에서 이미지 URL 추출
        const imageUrl = data.data.movie.background_image;
        // body 태그의 배경 이미지로 설정
        document.body.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), url('${imageUrl}')`;
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
        if (data.data.movie.language === "en") {
          language = "English";
        } else {
          language = data.data.movie.language;
        }
        document.querySelector("#movie-language").innerHTML =
          '<span id="language-label"><i class="fa-solid fa-volume-high"></i></span> &nbsp;' +
          language;
        const imdbIconUrl = "../images/imdb-icon.png";
        document.querySelector("#imdb-rating").innerHTML =
          `<img src="${imdbIconUrl}" alt="아이콘"> &nbsp;&nbsp;` +
          data.data.movie.rating +
          "/10";
        document.querySelector("#movie-rating").style.display = "block";
        document.querySelector("#movie-like").style.display = "block";

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

        const truncatedDescription = truncateDescription(descriptionText, 1000);

        // 결과를 HTML 요소에 적용
        document.querySelector("#movie-description").innerHTML =
          '<h2 id="description-label">Description</h2> &nbsp;&nbsp;' +
          truncatedDescription;
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

export { fetchMovieDetails };

const languageMap = {
  // 여러 언어 코드와 해당하는 언어의 이름을 매핑
  "ar-XA": "Arabic",
  bg: "Bulgarian",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  de: "German",
  el: "Greek",
  en: "English",
  et: "Estonian",
  es: "Spanish",
  fi: "Finnish",
  fr: "French",
  ga: "Irish",
  hi: "Hindi",
  hu: "Hungarian",
  he: "Hebrew",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  lv: "Latvian",
  lt: "Lithuanian",
  nl: "Dutch",
  no: "Norwegian",
  pl: "Polish",
  pt: "Portuguese",
  sv: "Swedish",
  ro: "Romanian",
  ru: "Russian",
  "sr-CS": "Serbian",
  sk: "Slovak",
  sl: "Slovenian",
  th: "Thai",
  tr: "Turkish",
  "uk-UA": "Ukrainian",
  "zh-chs": "Chinese (Simplified)",
  "zh-cht": "Chinese (Traditional)",
};

// 언어 코드를 전체 언어 이름으로 변환하는 함수
function getFullLanguageName(code) {
  return languageMap[code] || code;
}

// 설명을 최대 길이로 자르는 함수
function truncateDescription(description, maxLength) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
}

// 영화 상세 정보를 불러오는 함수
function fetchMovieDetails(movieId) {
  // 세션 스토리지에서 영화 데이터 로드
  const storedMovies = JSON.parse(sessionStorage.getItem("moviesData"));
  if (storedMovies) {
    const movie = storedMovies.find((movie) => movie.id === parseInt(movieId));
    console.log(movie);

    if (movie) {
      // 영화 데이터를 사용하여 상세 정보 업데이트
      updateMovieDetails(movie);

      // 전체 영화 데이터 개수
      const totalMoviesCount = storedMovies.length;

      // 해당 movie가 전체 중 몇 번째인지
      const movieIndex = storedMovies.findIndex(
        (m) => m.id === parseInt(movieId)
      );
      document.querySelector("#index-movie").innerHTML = `${
        movieIndex + 1
      } / ${totalMoviesCount}`;
    } else {
      document.querySelector("#movie-title").textContent = "Movie not found";
    }
  } else {
    document.querySelector("#movie-title").textContent =
      "No movies in session storage";
  }
}

// 영화 상세 정보를 UI에 반영하는 함수
function updateMovieDetails(movie) {
  // 영화 상세 정보를 UI에 반영
  document.querySelector(
    "#movie-detail-title"
  ).innerHTML = `FAKEFLIX - ${movie.title}`;

  // 영화 배경 이미지 설정
  // document.body.style.backgroundImage = ` linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 10%),
  //   linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 10%),
  //   linear-gradient(to top, rgba(0, 0, 0, 1) 50%, rgba(255, 255, 255, 0) 70%),url('${movie.background_image}')`;
  document.body.style.backgroundImage = `linear-gradient(to bottom, rgba(255, 255, 255, 0) 300px, rgba(0, 0, , 1) 600px), radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0) 30%, rgba(0, 0, 0, 1) 85%), url('${movie.background_image}')`;
  // document.body.style.backgroundImage = ` linear-gradient(to top, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0.1)), url('${movie.background_image}')`;
  // document.body.style.backgroundImage = `url('${movie.background_image}')`;
  document.body.style.backgroundPosition = "center 50px";
  document.body.style.backgroundSize = "100% auto";
  document.body.style.backgroundRepeat = "no-repeat";

  // 각종 영화 정보를 화면에 표시
  document.querySelector("#movie-image").style.display = "block";
  document.querySelector(".movie-story").style.display = "block";
  document.querySelector(".movie-reviews").style.display = "block";
  document.querySelector("#movie-title").textContent = movie.title_long;
  document.querySelector("#movie-image").src = movie.medium_cover_image;
  document.querySelector("#movie-image").alt = movie.title;
  document.querySelector("#movie-genres").innerHTML = movie.genres.join(" / ");
  document.querySelector("#movie-runtime").innerHTML =
    '<span id="runtime-label"><i class="fa-regular fa-clock"></i></span> &nbsp;' +
    movie.runtime +
    " min";

  // 영화의 언어를 표시
  let language = getFullLanguageName(movie.language);
  document.querySelector("#movie-language").innerHTML =
    '<span id="language-label"><i class="fa-solid fa-volume-high"></i></span> &nbsp;' +
    language;

  // IMDB 평점 표시
  const imdbIconUrl = "../images/imdb-icon.png";
  document.querySelector("#imdb-rating").innerHTML =
    `<img src="${imdbIconUrl}" alt="아이콘"> &nbsp;&nbsp;` +
    movie.rating +
    "/10";
  document.querySelector("#movie-rating").style.display = "block";
  document.querySelector("#movie-like").style.display = "block";

  // 영화 설명을 적절한 길이로 자르고 표시
  const descriptionFull = movie.description_full;
  let descriptionText = descriptionFull.includes("—")
    ? descriptionFull.substring(0, descriptionFull.indexOf("—"))
    : descriptionFull;
  const truncatedDescription = truncateDescription(descriptionText, 1500);

  document.querySelector("#movie-description").innerHTML =
    '<h2 id="description-label">Description</h2> &nbsp;&nbsp;' +
    truncatedDescription;
  document.querySelector(
    "#movie-more"
  ).innerHTML = `<a href=${movie.url}><button id="more-button">More...</button></a>`;
}

export { fetchMovieDetails };

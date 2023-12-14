const languageMap = {
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

function getFullLanguageName(code) {
  return languageMap[code] || code;
}

function truncateDescription(description, maxLength) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
}

function fetchMovieDetails(movieId) {
  // 세션 스토리지에서 영화 데이터 로드
  const storedMovies = JSON.parse(sessionStorage.getItem("moviesData"));
  if (storedMovies) {
    const movie = storedMovies.find((movie) => movie.id === parseInt(movieId));
    console.log(movie);

    if (movie) {
      // 영화 데이터를 사용하여 상세 정보 업데이트
      updateMovieDetails(movie);
    } else {
      document.querySelector("#movie-title").textContent = "Movie not found";
    }
  } else {
    document.querySelector("#movie-title").textContent =
      "No movies in session storage";
  }
}

function updateMovieDetails(movie) {
  // 영화 상세 정보를 UI에 반영
  document.querySelector(
    "#movie-detail-title"
  ).innerHTML = `FAKEFLIX - ${movie.title}`;

  document.body.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), url('${movie.background_image}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center center";

  document.querySelector("#movie-image").style.display = "block";
  document.querySelector(".movie-story").style.display = "block";
  document.querySelector(".movie-reviews").style.display = "block";

  document.querySelector("#movie-title").textContent = movie.title_long;
  document.querySelector("#movie-image").src = movie.medium_cover_image;
  document.querySelector("#movie-image").alt = movie.title;
  document.querySelector("#movie-genres").innerHTML = movie.genres.join(" / ");
  // movie.genres.forEach((genre) => {
  //   const span = document.createElement("span");
  //   span.className = "genre-span";
  //   span.textContent = genre;
  //   document.querySelector("#movie-genres").appendChild(span);
  // });

  document.querySelector("#movie-runtime").innerHTML =
    '<span id="runtime-label"><i class="fa-regular fa-clock"></i></span> &nbsp;' +
    movie.runtime +
    " min";

  let language = getFullLanguageName(movie.language);
  document.querySelector("#movie-language").innerHTML =
    '<span id="language-label"><i class="fa-solid fa-volume-high"></i></span> &nbsp;' +
    language;

  const imdbIconUrl = "../images/imdb-icon.png";
  document.querySelector("#imdb-rating").innerHTML =
    `<img src="${imdbIconUrl}" alt="아이콘"> &nbsp;&nbsp;` +
    movie.rating +
    "/10";
  document.querySelector("#movie-rating").style.display = "block";
  document.querySelector("#movie-like").style.display = "block";

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

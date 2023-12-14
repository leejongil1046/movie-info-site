let searchTimeout;

function quickSearchInput() {
  const searchInputButton = document.querySelector("#search-input");
  const resultsContainer = document.querySelector("#search-results");
  const loadingIcon = document.querySelector("#search-loading-icon");

  searchInputButton.addEventListener("input", (event) => {
    clearTimeout(searchTimeout);
    loadingIcon.classList.add("visible"); // 로딩 아이콘 표시
    searchTimeout = setTimeout(() => {
      loadingIcon.classList.remove("visible"); // 로딩 아이콘 숨김
      resultsContainer.classList.add("hidden");
      if (event.target.value.length >= 1) performSearch(event.target.value);
    }, 1000);
  });

  searchInputButton.addEventListener("focus", (event) => {
    if (resultsContainer.innerHTML !== "")
      resultsContainer.classList.remove("hidden");
  });

  searchInputButton.addEventListener("blur", (event) => {
    if (searchInputButton.value === "") resultsContainer.innerHTML = "";
    resultsContainer.classList.add("hidden");
  });
}

function performSearch(keyword) {
  const movies = JSON.parse(sessionStorage.getItem("moviesData")) || [];
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (filteredMovies.length > 0) {
    // 여기에 정렬 로직 추가 (예: 평점 순으로 정렬)
    filteredMovies.sort((a, b) => b.rating - a.rating);

    displaySearchResults(filteredMovies);
  } else {
    const resultsContainer = document.getElementById("search-results");

    const noFoundDiv = document.createElement("div");
    noFoundDiv.innerHTML = `<i class="fa-regular fa-file-excel"></i>
    <div>No Found Results</div>`;
    noFoundDiv.id = "no-found";

    resultsContainer.innerHTML = ""; // 결과 컨테이너 초기화
    resultsContainer.appendChild(noFoundDiv);
    resultsContainer.classList.remove("hidden");
  }
}

function displaySearchResults(movies) {
  const resultsContainer = document.querySelector("#search-results");

  resultsContainer.innerHTML = "";
  addMoviesToResultsContainer(movies);
  resultsContainer.classList.remove("hidden");
}

async function addMoviesToResultsContainer(movies) {
  const resultsContainer = document.querySelector("#search-results");
  await movies.forEach((movie) => {
    const movieElement = createMovieElement(movie);
    resultsContainer.appendChild(movieElement);
  });
}

function createMovieElement(movie) {
  const movieDiv = document.createElement("div");
  movieDiv.className = "searched-movie";

  const movieImage = document.createElement("img");
  movieImage.src = movie.medium_cover_image;
  movieImage.alt = movie.title;

  const movieInfo = document.createElement("div");

  const movieTitle = document.createElement("h4");
  movieTitle.textContent = movie.title;

  const movieYear = document.createElement("h6");
  movieYear.textContent = `${movie.year}`;

  movieInfo.appendChild(movieTitle);
  movieInfo.appendChild(movieYear);

  movieDiv.appendChild(movieImage);
  movieDiv.appendChild(movieInfo);

  // 클릭 이벤트 리스너를 추가합니다.
  movieDiv.addEventListener("click", () => {
    // 영화 상세 페이지 URL로 이동합니다.
    window.location.href = `/movie/${movie.id}`; // 이 부분은 실제 URL 속성에 맞게 변경해야 합니다.
  });

  return movieDiv;
}

export { quickSearchInput };

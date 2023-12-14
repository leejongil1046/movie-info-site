let searchTimeout;

// 빠른 검색 입력 처리 함수
function quickSearchInput() {
  const searchInputButton = document.querySelector("#search-input"); // 검색 입력 필드
  const resultsContainer = document.querySelector("#search-results"); // 검색 결과 컨테이너
  const loadingIcon = document.querySelector("#search-loading-icon"); // 로딩 아이콘

  // 검색 입력 이벤트 리스너
  searchInputButton.addEventListener("input", (event) => {
    clearTimeout(searchTimeout); // 이전 타이머 초기화
    loadingIcon.classList.add("visible"); // 로딩 아이콘 표시
    searchTimeout = setTimeout(() => {
      loadingIcon.classList.remove("visible"); // 로딩 아이콘 숨김
      resultsContainer.classList.add("hidden");
      if (event.target.value.length >= 1) performSearch(event.target.value); // 검색 수행
    }, 1000); // 1초 후에 검색 수행
  });

  // 입력 필드 포커스 이벤트 리스너
  searchInputButton.addEventListener("focus", (event) => {
    if (resultsContainer.innerHTML !== "")
      resultsContainer.classList.remove("hidden");
  });

  // 입력 필드 포커스 해제 이벤트 리스너
  searchInputButton.addEventListener("blur", (event) => {
    if (searchInputButton.value === "") resultsContainer.innerHTML = "";
    resultsContainer.classList.add("hidden");
  });
}

// 검색을 수행하는 함수
function performSearch(keyword) {
  const movies = JSON.parse(sessionStorage.getItem("moviesData")) || []; // 영화 데이터 로드
  const filteredMovies = movies.filter(
    (movie) => movie.title.toLowerCase().includes(keyword.toLowerCase()) // 영화 제목으로 필터
  );

  if (filteredMovies.length > 0) {
    // 검색된 영화가 있을 경우
    filteredMovies.sort((a, b) => b.rating - a.rating); // 평점 순으로 정렬

    displaySearchResults(filteredMovies); // 검색 결과 표시
  } else {
    // 검색된 영화가 없을 경우
    const resultsContainer = document.getElementById("search-results");

    const noFoundDiv = document.createElement("div"); // '검색 결과 없음' 메시지
    noFoundDiv.innerHTML = `<i class="fa-regular fa-file-excel"></i>
    <div>No Found Results</div>`;
    noFoundDiv.id = "no-found";

    resultsContainer.innerHTML = ""; // 결과 컨테이너 초기화
    resultsContainer.appendChild(noFoundDiv);
    resultsContainer.classList.remove("hidden");
  }
}

// 검색 결과를 화면에 표시하는 함수
function displaySearchResults(movies) {
  const resultsContainer = document.querySelector("#search-results");

  resultsContainer.innerHTML = "";
  addMoviesToResultsContainer(movies); // 영화 정보를 결과 컨테이너에 추가
  resultsContainer.classList.remove("hidden");
}

// 영화 정보를 결과 컨테이너에 추가하는 비동기 함수
async function addMoviesToResultsContainer(movies) {
  const resultsContainer = document.querySelector("#search-results");
  await movies.forEach((movie) => {
    const movieElement = createMovieElement(movie); // 영화 요소 생성
    resultsContainer.appendChild(movieElement);
  });
}

// 영화 요소를 생성하는 함수
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

export { quickSearchInput }; // 함수를 다른 모듈에서 사용할 수 있도록 export

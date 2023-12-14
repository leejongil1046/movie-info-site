import {
  createLoadingMessage,
  removeLoadingMessage,
} from "/js/modules/loadingMessageControl.js"; // 필요에 따라 경로 조정

let allMovies = [];
let allMovieIds = [];
let currentPage = 1;
const moviesPerPage = 10;

// 주어진 페이지에 영화를 표시하는 함수
function displayMovies(page) {
  const startIndex = (page - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const moviesToShow = allMovies.slice(startIndex, endIndex);

  const moviesContainer = document.querySelector("#movies-container");
  moviesContainer.innerHTML = ""; // 기존 영화 목록 제거

  moviesToShow.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.innerHTML = `
      <a href="/movie/${movie.id}">
        <img src="${movie.medium_cover_image}" alt="${movie.title}">
        <h3>${movie.title}</h3>
      </a>          
    `;
    moviesContainer.appendChild(movieElement);
  });
}

// 페이지네이션 정보 업데이트 함수
function updatePaginationInfo() {
  const pageInfo = document.querySelector("#page-info");
  const totalPages = Math.ceil(allMovies.length / moviesPerPage);
  pageInfo.textContent = `${currentPage} / ${totalPages}`;
}

// 페이지네이션 설정 함수
function setupPagination() {
  const paginationContainer = document.querySelector(
    "#movies-pagination-container"
  );
  paginationContainer.innerHTML = `
    <button id="prev-button"><i class="fa-solid fa-angle-left"></i></button>
    <span id="page-info"></span>
    <button id="next-button"><i class="fa-solid fa-angle-right"></i></button>
  `;

  const prevButton = document.querySelector("#prev-button");
  const nextButton = document.querySelector("#next-button");

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayMovies(currentPage);
      updatePaginationInfo();
    }
  });

  nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(allMovies.length / moviesPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayMovies(currentPage);
      updatePaginationInfo();
    }
  });

  updatePaginationInfo();
}

// 세션 스토리지의 데이터를 수정하는 함수
function modifyStoredData() {
  // 세션 스토리지에서 영화 데이터를 가져옵니다.
  const storedMovies = sessionStorage.getItem("moviesData");

  // 데이터가 존재하면 JSON 형식으로 파싱합니다.
  if (storedMovies) {
    let movies = JSON.parse(storedMovies);

    // 원하는 영화를 찾아 설명을 업데이트합니다.
    const movieIndex = movies.findIndex((movie) => movie.id === 3611);
    if (movieIndex !== -1) {
      movies[movieIndex].description_full =
        "Socially awkward teen Charlie (Logan Lerman) is a wallflower, always watching life from the sidelines, until two charismatic students become his mentors. Free-spirited Sam (Emma Watson) and her stepbrother Patrick (Ezra Miller) help Charlie discover the joys of friendship, first love, music and more, while a teacher sparks Charlie's dreams of becoming a writer. However, as his new friends prepare to leave for college, Charlie's inner sadness threatens to shatter his newfound confidence.";

      // 수정된 데이터를 다시 세션 스토리지에 저장합니다.
      sessionStorage.setItem("moviesData", JSON.stringify(movies));
    }
  }
}

// 세션 스토리지에 저장된 영화를 정렬하는 함수
function sortStoredMovies(sortBy) {
  sessionStorage.setItem("currentSortCriteria", sortBy);
  const storedMovies = sessionStorage.getItem("moviesData");

  if (!storedMovies) {
    console.error("No movies data in sessionStorage.");
    return [];
  }

  let movies = JSON.parse(storedMovies);

  switch (sortBy) {
    case "title":
      movies.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "year":
      movies.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title)); // 연도가 같을 경우 타이틀로 정렬
      break;
    case "rating":
      movies.sort(
        (a, b) => b.rating - a.rating || a.title.localeCompare(b.title)
      ); // 평점이 같을 경우 타이틀로 정렬
      break;
    // 다른 정렬 기준 추가 가능
    default:
      console.error("Invalid sort criteria");
      break;
  }

  // 정렬된 영화 데이터를 세션 스토리지에 저장
  sessionStorage.setItem("moviesData", JSON.stringify(movies));

  // 영화 ID만 추출하여 저장
  const sortedMovieIds = movies.map((movie) => movie.id);
  sessionStorage.setItem("moviesIdData", JSON.stringify(sortedMovieIds));

  allMovies = movies;
  allMovieIds = sortedMovieIds;
}

// 새로운 정렬 기준에 따라 영화를 표시하는 함수
function showNewSortedMovies(sortBy) {
  sortStoredMovies(sortBy);
  displayMovies(1);
  setupPagination();
}

// 영화 데이터를 가져오고 저장하는 함수
function fetchAndStoreMoviesData(page) {
  const storedMovies = sessionStorage.getItem("moviesData");

  if (storedMovies) {
    // 세션 스토리지에서 이전 데이터를 불러옴
    allMovies = JSON.parse(storedMovies);
    displayMovies(page); // 현재 페이지의 영화 표시
    setupPagination(); // 페이지네이션 설정
  } else {
    allMovies = [];

    function fetchPage(page) {
      fetch(
        `https://yts.mx/api/v2/list_movies.json?sort_by=like_count&limit=50&page=${page}`
      )
        .then((response) => response.json())
        .then((data) => {
          const newMovies = data.data.movies;
          console.log(data);
          // 이전 데이터와 현재 데이터 결합
          allMovies = allMovies.concat(newMovies);

          // 다음 페이지로 이동 (선택사항)
          const totalPages = 12;
          // const totalPages = Math.ceil(data.data.movie_count / moviesPerPage);
          if (page < totalPages) {
            fetchPage(page + 1);
          } else {
            // 모든 페이지의 데이터를 불러온 후에 세션 스토리지에 저장
            sessionStorage.setItem("moviesData", JSON.stringify(allMovies));
            modifyStoredData();
            removeLoadingMessage();
            showNewSortedMovies("rating");
            document.querySelector("#sort-rating").classList.toggle("choiced");
          }
        })
        .catch((error) => console.error("Fetch error:", error));
    }

    createLoadingMessage();
    fetchPage(page);
  }
}

export { fetchAndStoreMoviesData, showNewSortedMovies };

import {
  createLoadingMessage,
  removeLoadingMessage,
} from "/js/modules/loadingMessageControl.js"; // Adjust the path as needed

let allMovies = [];
let allMovieIds = [];
let currentPage = 1;
const moviesPerPage = 10;

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

function updatePaginationInfo() {
  const pageInfo = document.querySelector("#page-info");
  const totalPages = Math.ceil(allMovies.length / moviesPerPage);
  pageInfo.textContent = `${currentPage} / ${totalPages}`;
}

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
      movies.sort((a, b) => b.year - a.year); // 내림차순 정렬
      break;
    case "rating":
      movies.sort((a, b) => b.rating - a.rating); // 내림차순 정렬
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

function newSortedMovies(sortBy) {
  sortStoredMovies(sortBy);
  displayMovies(1);
  setupPagination();
}

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
        `https://yts.mx/api/v2/list_movies.json?sort_by=download_count&limit=50&page=${page}`
      )
        .then((response) => response.json())
        .then((data) => {
          const newMovies = data.data.movies;

          // 이전 데이터와 현재 데이터 결합
          allMovies = allMovies.concat(newMovies);

          // 다음 페이지로 이동 (선택사항)
          const totalPages = 6;
          // const totalPages = Math.ceil(data.data.movie_count / moviesPerPage);
          if (page < totalPages) {
            fetchPage(page + 1);
          } else {
            // 모든 페이지의 데이터를 불러온 후에 세션 스토리지에 저장
            removeLoadingMessage();
            sessionStorage.setItem("moviesData", JSON.stringify(allMovies));
            newSortedMovies("rating");
            document.querySelector("#sort-rating").classList.toggle("choiced");
          }
        })
        .catch((error) => console.error("Fetch error:", error));
    }

    createLoadingMessage();
    fetchPage(page);
  }
}

export { fetchAndStoreMoviesData, newSortedMovies };

import { removeLoadingMessage } from "/js/modules/loadingMessageControl.js"; // Adjust the path as needed

let allMovies = [];
let currentPage = 1;
const moviesPerPage = 20;

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
  const paginationContainer = document.querySelector("#pagination-container");
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

function fetchMoviesData() {
  fetch("/api/movies")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      removeLoadingMessage();
      allMovies = data.data.movies;
      displayMovies(1); // 첫 페이지의 영화 표시
      setupPagination(allMovies.length); // 페이지네이션 설정
    })
    .catch((error) => console.error("Fetch error:", error));
}

export { fetchMoviesData };

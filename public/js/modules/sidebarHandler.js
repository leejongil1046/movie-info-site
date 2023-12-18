let sidebarOpen = false;

// 마우스 움직임에 반응하는 이벤트 리스너
document.addEventListener("mousemove", function (e) {
  const sidebar = document.getElementById("sidebar-movies");
  if (e.clientX < 10 && !sidebarOpen) {
    sidebar.style.left = "0px";
    sidebarOpen = true;
  } else if (e.clientX > 230 && sidebarOpen) {
    sidebar.style.left = "-2300px";
    sidebarOpen = false;
  }
});

// 사이드바에 영화 목록을 추가하는 함수
function addMoviesToSidebar(currentMovieId) {
  const sidebar = document.getElementById("sidebar-movies");
  const movies = JSON.parse(sessionStorage.getItem("moviesData")) || [];
  let currentMovieElement = null;

  sidebar.innerHTML = "";

  movies.forEach((movie, index) => {
    const movieElement = createMovieElement(movie, index, movies.length);
    if (movie.id === parseInt(currentMovieId)) {
      movieElement.classList.add("current-movie");
      currentMovieElement = movieElement;
    }
    sidebar.appendChild(movieElement);
  });

  if (currentMovieElement) {
    currentMovieElement.scrollIntoView(); // 스크롤을 현재 영화 요소로 이동
  }
}

// 영화 요소를 생성하는 함수
function createMovieElement(movie, index, total) {
  const movieDiv = document.createElement("div");
  movieDiv.className = "sidebar-movie";

  const movieImage = document.createElement("img");
  movieImage.src = movie.medium_cover_image;
  movieImage.alt = movie.title;

  const movieInfo = document.createElement("div");

  const movieTitle = document.createElement("h4");
  movieTitle.textContent = movie.title_long;

  const movieIndex = document.createElement("span");
  movieIndex.className = "sidebar-movie-index";
  movieIndex.textContent = `${index + 1} / ${total}`;
  movieDiv.appendChild(movieIndex);

  movieInfo.appendChild(movieTitle);

  movieDiv.appendChild(movieImage);
  movieDiv.appendChild(movieInfo);

  // 클릭 이벤트 리스너를 추가합니다.
  movieDiv.addEventListener("click", () => {
    // 영화 상세 페이지 URL로 이동합니다.
    window.location.href = `/movie/${movie.id}`; // 이 부분은 실제 URL 속성에 맞게 변경해야 합니다.
  });

  return movieDiv;
}

export { addMoviesToSidebar };

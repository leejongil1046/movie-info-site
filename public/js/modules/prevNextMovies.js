function updateNavigationButtons(movieId) {
  const allMovies = JSON.parse(sessionStorage.getItem("moviesData"));
  const allMovieIds = JSON.parse(sessionStorage.getItem("moviesIdData"));
  if (!allMovieIds) {
    console.error("No movie IDs in sessionStorage.");
    return;
  }

  const currentIndex = allMovieIds.indexOf(parseInt(movieId));
  const prevMovieId = allMovieIds[currentIndex - 1];
  const nextMovieId = allMovieIds[currentIndex + 1];

  const prevMovieContainer = document.querySelector("#prev-movie");
  const nextMovieContainer = document.querySelector("#next-movie");

  if (currentIndex > 0) {
    // 이전 영화가 존재할 경우
    const prevMovie = allMovies.find((movie) => movie.id === prevMovieId);
    prevMovieContainer.innerHTML = `
    <div>Prev</div>
    <a href="/movie/${prevMovieId}">
      <img src="${prevMovie.medium_cover_image}" alt="${prevMovie.title}">
    </a> `;
    prevMovieContainer.style.display = "block";
  } else {
    // 첫 페이지일 경우 이전 버튼 숨기기
    prevMovieContainer.style.display = "none";
  }

  if (currentIndex < allMovieIds.length - 1) {
    // 다음 영화가 존재할 경우
    const nextMovie = allMovies.find((movie) => movie.id === nextMovieId);
    nextMovieContainer.innerHTML = `
    <div>Next</div>
    <a href="/movie/${nextMovieId}">
      <img src="${nextMovie.medium_cover_image}" alt="${nextMovie.title}">
    </a> `;
    nextMovieContainer.style.display = "block";
  } else {
    // 마지막 페이지일 경우 다음 버튼 숨기기
    nextMovieContainer.style.display = "none";
  }
}

export { updateNavigationButtons };

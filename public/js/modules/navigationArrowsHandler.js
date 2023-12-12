import { fetchMovieDetails } from "/js/modules/movieDetailsAPI.js";

function setupNavigationArrows(movieId) {
  const allMovieIds = JSON.parse(sessionStorage.getItem("moviesIdData"));
  const currentIndex = allMovieIds.indexOf(parseInt(movieId));

  document.querySelector("#left-movie i").addEventListener("click", () => {
    if (currentIndex > 0) {
      window.location.href = `/movie/${allMovieIds[currentIndex - 1]}`;
    } else {
      alert("This is the first movie. There are no more movies to the left.");
    }
  });

  document.querySelector("#right-movie i").addEventListener("click", () => {
    if (currentIndex < allMovieIds.length - 1) {
      window.location.href = `/movie/${allMovieIds[currentIndex + 1]}`;
    } else {
      alert("This is the last movie. There are no more movies to the right.");
    }
  });
}

export { setupNavigationArrows };

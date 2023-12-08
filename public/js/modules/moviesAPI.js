import { removeLoadingMessage } from "/js/modules/loadingMessageControl.js"; // Adjust the path as needed

function fetchMoviesData() {
  fetch("/api/movies")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      removeLoadingMessage();
      const moviesContainer = document.querySelector("#movies-container");
      data.data.movies.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.innerHTML = `
          <a href="/movie">
            <img src="${movie.medium_cover_image}" alt="${movie.title}">
            <h3 id="movie-api-title">${movie.title}</h3>
          </a>          
        `;
        moviesContainer.appendChild(movieElement);

        movieElement.querySelector("a").addEventListener("click", (event) => {
          event.preventDefault();
          window.location.href = `/movie/${movie.id}`;
        });
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

export { fetchMoviesData };

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById(`main`);
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWE1OTU2NjVhODdkMWY1ZTUzOTI3ZjQ0OTdmNGE1NSIsIm5iZiI6MTcyMzUyOTc1OC43Mzc5MDIsInN1YiI6IjY2YjllYzQ0OTdlODlkMjU4OTMwYTBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2ZrgcFR6nwN9fS_7OcQxF8RgKku9AUB5AU3zO1XgWQ",
  },
};

const getFilme = async () => {
  try {
    // res steht wohl fuer response?
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing",
      options
    );
    console.log(res);
    if (!res.ok) throw Error("Fetching failed");

    const filmedata = await res.json();

    console.log(filmedata);
    // renderFilme(filmedata);
    Showmovies(filmedata.results);
  } catch (error) {
    // Etwas mit dem Fehler tun
    console.error(error);
  }
};

getFilme();
function Showmovies(filmedata) {
  main.innerHTML = ``;
  filmedata.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;

    const movieEl = document.createElement(`div`);
    movieEl.classList.add(`movie`);
    movieEl.innerHTML = `
      <img src="${IMG_URL + poster_path}" alt="${title}">
      <button
        class="absolute top-2 right-2 bg-blue-500 text-white w-10 h-10 rounded-lg flex items-center justify-center"
        title="Add to Journal">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </button>
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}"> ${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>`;
    main.appendChild(movieEl);

    // Add event listener to the button to add movie to favorites
    const addButton = movieEl.querySelector("button");
    addButton.addEventListener("click", () =>
      addToFavorites({ title, poster_path, vote_average, overview, id })
    );
  });
}

function addToFavorites(movie) {
  // Retrieve the current favorites from localStorage, or create an empty array if it doesn't exist
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if the movie is already in the favorites array
  const isAlreadyFavorite = favorites.some(
    (favMovie) => favMovie.id === movie.id
  );

  if (!isAlreadyFavorite) {
    // Add the new movie to the array
    favorites.push(movie);

    // Save the updated array back to localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Log a message and the current favorites array to the console
    console.log(`${movie.title} has been added to your favorites!`);
    console.log("Current Favorites Array:", favorites);

    // Optional: Display a message or update the UI to show the movie has been added
    alert(`${movie.title} has been added to your favorites!`);
  } else {
    alert(`${movie.title} is already in your favorites!`);
  }
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

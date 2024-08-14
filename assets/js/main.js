const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById(`main`);
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWE1OTU2NjVhODdkMWY1ZTUzOTI3ZjQ0OTdmNGE1NSIsIm5iZiI6MTcyMzUyOTc1OC43Mzc5MDIsInN1YiI6IjY2YjllYzQ0OTdlODlkMjU4OTMwYTBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T2ZrgcFR6nwN9fS_7OcQxF8RgKku9AUB5AU3zO1XgWQ'
    }
  };


  const getFilme = async () => {
    try {
     // res steht wohl fuer response?
      const res = await fetch('https://api.themoviedb.org/3/movie/now_playing', options);
       console.log(res);
      if (!res.ok) throw Error('Fetching failed');
  
      const filmedata = await res.json();
  
      console.log(filmedata);
      // renderFilme(filmedata);
      Showmovies (filmedata.results);
    } catch (error) {
      // Etwas mit dem Fehler tun
      console.error(error);
      
    }
  };
  
  getFilme();
  function Showmovies (filmedata) {
    main.innerHTML= ``;
    filmedata.forEach(movie => {
        const { title, poster_path, vote_average, overview}= movie;
        const movieEl= document.createElement(`div`);
        movieEl.classList.add(`movie`);
        movieEl.innerHTML= `  <img src="${IMG_URL+poster_path}"
            alt="${title} ">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)} "> ${vote_average}</span>
            </div>
            <div class="overview">
            <h3>Overview</h3>
            ${overview}
            </div>`
            main.appendChild(movieEl);
        
    });
  }

  function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}



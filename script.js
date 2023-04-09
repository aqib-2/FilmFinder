const apiKey = "api_key=6c06f0bf93cf0046a11895adcf8e3415";
const URL = "https://api.themoviedb.org/3";
const apiURL =URL + "/discover/movie?language=en-US&sort_by=popularity.desc&" + apiKey;
const posterURL = "https://image.tmdb.org/t/p/w500/";
const searchURL = URL + "/search/movie?" + apiKey + "&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const tagEle = document.getElementById('tags');

const genres=[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}];

setGenre();
//function to display genres
function setGenre(){
   tagEle.innerHTML='';
   genres.forEach(genre => {
     const t=document.createElement('div');
     t.classList.add('tag');
     t.id=genre.id;
     t.innerText=genre.name;
     t.addEventListener('click', () => {
      
     })
     tagEle.appendChild(t);
   })
}

getMovies(apiURL);//Invoking the function to display data on html page

//function to fetch the API and get the data
async function getMovies(URL) {
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const data = await response.json();
      console.log(data.results);
      showMovies(data.results);
    }
  } catch (error) {
    console.log(error);
  }
}

//function to Display the data on html page and format the data to
function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    if (poster_path && title) {
      const movieEle = document.createElement("div");
      movieEle.classList.add("movie");
      movieEle.innerHTML = `
            <img src="${posterURL + poster_path}" alt="${title} Poster">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average.toFixed(1)}</span>
            </div>
            <div class="overview">
                <h4>Overview</h4>
                ${overview}
            </div>
            `;
      main.appendChild(movieEle);
    }
  });
}



//Function to pick the color based on the ratings
function getColor(rating) {
  if (rating >= 8) {
    return "green";
  } else if (rating < 5) {
    return "red";
  } else {
    return "orange";
  }
}

//Function to generate results based on the search query
form.addEventListener("submit", (element) => {
  element.preventDefault();
  const term = search.value;
  if (term) {
    getMovies(searchURL  + term);
  } else {
    getMovies(apiURL);
  }
});

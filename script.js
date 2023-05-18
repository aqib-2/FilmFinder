const apiKey = "api_key=6c06f0bf93cf0046a11895adcf8e3415";
const URL = "https://api.themoviedb.org/3";
const apiURL =URL + "/discover/movie?language=en-US&sort_by=popularity.desc&" + apiKey;
const posterURL = "https://image.tmdb.org/t/p/w500/";
const searchURL = URL + "/search/movie?" + apiKey + "&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(apiURL);//Invoking the function to display data on html page

//function to fetch the API and get the data
async function getMovies(link) {
  try {
    const response = await fetch(link);
    if (response.ok) {
      const data = await response.json();
      console.log(data.results);
      showMovies(data.results);
    }
  }catch(error) {
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

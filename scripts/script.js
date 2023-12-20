/**
 * Giving the url of the local API
 */
const urlApi = "http://localhost:8000/api/v1/titles/";

/**
 * Function fetching informations for the best movie by imdb score
 */
async function fetchBestMovie() {
  try {
    let bestImage = document.getElementById("best-cover-img");
    let bestTitle = document.getElementById("best-cover-title");
    let bestDescription = document.getElementById("best-cover-description")

    const response = await fetch(urlApi + "?sort_by=-imdb_score");
    const data = await response.json();

    bestImage.src = data.results[0].image_url;
    bestTitle.textContent = data.results[0].title;

    const movieResponse = await fetch(data.results[0].url);
    const movieData = await movieResponse.json();

    bestDescription.innerHTML = movieData.description;

    const moreInfoBtn = document.getElementById("more-info-btn");

    moreInfoBtn.addEventListener("click", () => {
        openModal(data.results[0].id);
    });

  } catch (error) {
    console.error(error);
  }
}

/**
 * Function managing the open and close of the modal box
 * @param {number} id : unique number of each movies in the API
 */
function openModal(id) {
  let modal = document.getElementById("modal");
  let span = document.getElementsByClassName("close")[0];

  fetchModalData(id);

  modal.style.display = "block";

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) modal.style.display = "none";
  };
}


/**
 * Function fetching all the datas required to be shown in the modal box
 * @param {number} id : unique number of each movies in the API
 */
async function fetchModalData(id) {
  try {
    const response = await fetch(urlApi + id);
    const data = await response.json();

    document.getElementById("modal-cover").src = data.image_url;
    document.getElementById("modal-title").innerHTML = data.original_title;
    document.getElementById("modal-date").innerHTML = data.date_published;
    document.getElementById("modal-duration").innerHTML =
      data.duration + " minutes";
    document.getElementById("modal-genres").innerHTML = data.genres;
    document.getElementById("modal-imdb").innerHTML = data.imdb_score + "/10";
    document.getElementById("modal-directors").innerHTML = data.directors;
    document.getElementById("modal-cast").innerHTML = data.actors;
    document.getElementById("modal-country").innerHTML = data.countries;
    document.getElementById("modal-info").innerHTML = data.long_description;
    document.getElementById("modal-rated").innerHTML = data.rated;

    let modalBoxOffice = document.getElementById("modal-box-office");
    if (data["worldwide_gross_income"] == null) {
      modalBoxOffice.innerHTML = "Unknown";
    }

    let modalInfo = document.getElementById("modal-info");
    if (data["long_description"] == "|") {
      modalInfo.innerHTML = "Unknown";
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Function creating the carousel
 * @param {string} category : category name
 * @param {HTMLDivClass} containerSelector : div in the html where the carousel will be created
 */
async function fetchAndCreateCarousel(category, containerSelector) {
  try {
    const response = await fetch(`${urlApi}?sort_by=-imdb_score&genre=${category}&page_size=9`);
    const data = await response.json();

    const movies = data.results.slice(0, 7);
    const carouselContainer = document.querySelector(containerSelector);
    const moviesPerPage = 5;
    let position = 0;

    function renderMovies() {
      carouselContainer.innerHTML = '';

      for (let i = 0; i < moviesPerPage; i++) {
        const index = (position + i + movies.length) % movies.length;
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
          <img src="${movies[index].image_url}" alt="${movies[index].title}" class="movie-image">
        `;
        carouselContainer.appendChild(movieCard);

        movieCard.addEventListener('click', () => {
          openModal(movies[index].id);
        });
      }
    }

    renderMovies();

    const carouselPrev = carouselContainer.parentElement.querySelector('.carousel-prev');
    const carouselNext = carouselContainer.parentElement.querySelector('.carousel-next');

    carouselPrev.addEventListener('click', function() {
      position = (position - 1 + movies.length) % movies.length;
      renderMovies();
    });

    carouselNext.addEventListener('click', function() {
      position = (position + 1) % movies.length;
      renderMovies();
    });
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
  }
}


/**
 * Function fetching the top rated 7 movies in all the API movies 
 */
async function fetchTopRatedMovies() {
  try {
    const response = await fetch(`${urlApi}?sort_by=-imdb_score&genre=&page_size=10`);
    const data = await response.json();

    const topMovies = data.results.slice(1, 8);
    const carousel = document.querySelector('.best-carousel');
    const moviesPerPage = 5;
    let position = 0;

    function renderMovies() {
      carousel.innerHTML = '';

      for (let i = 0; i < moviesPerPage; i++) {
        const index = (position + i + topMovies.length) % topMovies.length;
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
          <img src="${topMovies[index].image_url}" alt="${topMovies[index].title}" class="movie-image">
        `;
        carousel.appendChild(movieCard);

        movieCard.addEventListener('click', () => {
          openModal(topMovies[index].id);
        });
      }
    }

    renderMovies();

    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');

    carouselPrev.addEventListener('click', function() {
      position = (position - 1 + topMovies.length) % topMovies.length;
      renderMovies();
    });

    carouselNext.addEventListener('click', function() {
      position = (position + 1) % topMovies.length;
      renderMovies();
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}



fetchBestMovie()
fetchTopRatedMovies()
fetchAndCreateCarousel("Sci-fi", ".sci-fi-carousel")
fetchAndCreateCarousel("Comedy", ".comedy-carousel")
fetchAndCreateCarousel("Mystery", ".mystery-carousel")
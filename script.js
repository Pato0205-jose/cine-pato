const apiKey = "5f35bee03c189a6a68aa0631ab208c1f"; // Tu key de TMDB
const imageBase = "https://image.tmdb.org/t/p/w500";

document.addEventListener("DOMContentLoaded", () => {
  loadMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es-MX&page=1`);
});

// Escucha el botón de buscar
document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.trim();
  if (query !== "") {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-MX&query=${encodeURIComponent(query)}`;
    loadMovies(searchUrl);
  }
});

function loadMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const carousel = document.getElementById("carousel");
      carousel.innerHTML = ""; // limpia el carrusel

      if (data.results.length === 0) {
        carousel.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
      }

      data.results.forEach(movie => {
        if (!movie.poster_path) return; // omite películas sin póster
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.innerHTML = `
          <img src="${imageBase + movie.poster_path}" alt="${movie.title}" data-id="${movie.id}">
        `;
        carousel.appendChild(slide);
      });

      initSwiper();
      addListeners();
    })
    .catch(err => console.error("Error al cargar películas:", err));
}

function initSwiper() {
  new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    grabCursor: true,
    pagination: { el: '.swiper-pagination', clickable: true }
  });
}

function addListeners() {
  document.querySelectorAll('.swiper-slide img').forEach(img => {
    img.addEventListener('click', () => showMovieDetails(img.dataset.id));
  });
}

function showMovieDetails(id) {
  document.getElementById("movie-details").classList.remove("hidden");

  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-MX`)
    .then(res => res.json())
    .then(movie => {
      document.getElementById("title").textContent = movie.title;
      document.getElementById("overview").textContent = movie.overview;
      document.getElementById("rating").textContent = movie.vote_average.toFixed(1);
    });

  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=es-MX`)
    .then(res => res.json())
    .then(data => {
      const trailerDiv = document.getElementById("trailer");
      const video = data.results.find(v => v.site === "YouTube" && v.type === "Trailer");
      trailerDiv.innerHTML = video
        ? `<iframe src="https://www.youtube.com/embed/${video.key}" frameborder="0" allowfullscreen></iframe>`
        : "<p>Tráiler no disponible</p>";
    });

  fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}&language=es-MX`)
    .then(res => res.json())
    .then(data => {
      const reviewsDiv = document.getElementById("reviews");
      if (data.results.length > 0) {
        reviewsDiv.innerHTML = data.results.slice(0, 3).map(r => `
          <p><strong>${r.author}:</strong> ${r.content}</p>
        `).join("");
      } else {
        reviewsDiv.innerHTML = "<p>No hay reseñas disponibles.</p>";
      }
    });
}

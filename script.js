const apiKey = '5f35bee03c189a6a68aa0631ab208c1f';
const apiUrl = 'https://api.themoviedb.org/3';

// Verificar sesión
if (!localStorage.getItem("isLoggedIn")) {
  window.location.href = "login.html";
}

// Buscar películas o series según filtro y texto
function searchMovies() {
  const query = document.getElementById('searchInput').value.trim();
  const type = document.getElementById('typeFilter').value;

  // Limpiar detalles anteriores
  document.getElementById('movie-details').innerHTML = '';
  document.getElementById('movie-details').classList.add('hidden');

  let endpoint;
  if (type === 'movie') {
    endpoint = '/search/movie';
  } else if (type === 'tv') {
    endpoint = '/search/tv';
  } else {
    endpoint = '/search/multi';
  }

  fetch(`${apiUrl}${endpoint}?api_key=${apiKey}&language=es-ES&query=${query}`)
    .then(res => res.json())
    .then(data => showResults(data.results))
    .catch(console.error);
}

// Mostrar resultados en carrusel
function showResults(items) {
  const results = document.getElementById('results');
  results.innerHTML = '';

  if (!items || items.length === 0) {
    results.innerHTML = '<p style="text-align:center; color:#f4c542;">No se encontraron resultados.</p>';
    return;
  }

  items.forEach(item => {
    const title = item.title || item.name || "Sin título";
    const poster = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '';
    const overview = item.overview || "Sin sinopsis disponible.";

    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <img src="${poster}" alt="${title}" onclick="showDetails(${item.id}, '${item.media_type || (item.title ? 'movie' : 'tv')}')">
      <h3>${title}</h3>
      <p>${overview.substring(0, 100)}...</p>
    `;
    results.appendChild(slide);
  });

  new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: { el: ".swiper-pagination", clickable: true }
  });
}

// Mostrar detalles de una película o serie
function showDetails(id, type) {
  const details = document.getElementById('movie-details');
  details.classList.remove('hidden');
  details.innerHTML = '';

  fetch(`${apiUrl}/${type}/${id}?api_key=${apiKey}&language=es-ES`)
    .then(res => res.json())
    .then(data => {
      let releaseDate = data.release_date || data.first_air_date || 'Desconocida';
      details.innerHTML = `<h2>${data.title || data.name}</h2><p>Fecha de lanzamiento: ${releaseDate}</p>`;

      fetch(`${apiUrl}/${type}/${id}/credits?api_key=${apiKey}&language=es-ES`)
        .then(res => res.json())
        .then(credits => {
          if (credits.cast && credits.cast.length > 0) {
            let actorsHTML = "<h3>Actores principales:</h3><div class='actors'>";
            credits.cast.slice(0, 5).forEach(actor => {
              const img = actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : '';
              actorsHTML += `<div><img src="${img}" alt="${actor.name}"><p>${actor.name}</p></div>`;
            });
            actorsHTML += "</div>";
            details.innerHTML += actorsHTML;
          }
        });

      fetch(`${apiUrl}/${type}/${id}/images?api_key=${apiKey}`)
        .then(res => res.json())
        .then(images => {
          if (images.backdrops && images.backdrops.length > 0) {
            let imagesHTML = "<h3>Imágenes:</h3><div class='carousel'>";
            images.backdrops.slice(0, 5).forEach(img => {
              imagesHTML += `<img src="https://image.tmdb.org/t/p/w500${img.file_path}">`;
            });
            imagesHTML += "</div>";
            details.innerHTML += imagesHTML;
          }
        });

      fetch(`${apiUrl}/${type}/${id}/videos?api_key=${apiKey}&language=es-ES`)
        .then(res => res.json())
        .then(videos => {
          const trailer = videos.results.find(v => v.type === "Trailer");
          if (trailer) {
            details.innerHTML += `<h3>Tráiler:</h3><div id="trailer"><iframe src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe></div>`;
          } else {
            details.innerHTML += `<p>Tráiler no disponible.</p>`;
          }
        });
    });
}

// Cargar películas populares al abrir la página
function loadPopular() {
  fetch(`${apiUrl}/movie/popular?api_key=${apiKey}&language=es-ES`)
    .then(res => res.json())
    .then(data => showResults(data.results))
    .catch(console.error);
}

// Botón de cerrar sesión
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

// Ejecutar al cargar la página
loadPopular();

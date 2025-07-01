# Cine Pato 🦆🎬

Proyecto web para mostrar una cartelera de películas y series, con autenticación de usuarios, búsqueda avanzada y detalles completos, utilizando la API de TMDB.

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación y uso](#instalación-y-uso)
- [Autenticación](#autenticación)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Cómo contribuir](#cómo-contribuir)
- [Licencia](#licencia)
- [Contacto](#contacto)

---

## Descripción

Cine Pato es una aplicación web que permite a los usuarios buscar películas y series, ver detalles como sinopsis, actores, imágenes y tráileres, todo consumiendo la API pública de TMDB. Además incluye funcionalidades básicas de autenticación para simular sesiones de usuario.

---

## Tecnologías

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- API pública de [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Almacenamiento local con `localStorage`

---

## Características

- Registro y login de usuarios con validación básica.
- Buscador con filtro por tipo (Películas, Series o Todos).
- Resultados mostrados en cards con póster, título y sinopsis corta.
- Vista detallada con:
  - Título completo y fecha de lanzamiento.
  - Lista de actores principales con foto.
  - Carrusel de imágenes.
  - Reproductor de tráiler de YouTube o mensaje cuando no está disponible.
- Sesiones gestionadas con `localStorage`.
- Diseño moderno con estilos iluminados y responsivo básico.

---

## Requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet para consumir la API de TMDB
- No requiere servidor backend (aplicación estática)

---

## Instalación y uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Pato0205-jose/cine-pato.git

// Variable para almacenar el índice del primer elemento visible en el catálogo
let indiceInicio = 0;

// Función para determinar si un elemento está visible en la ventana del navegador
function isVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para mostrar las secciones cuando están visibles
function mostrarSecciones() {
    const secciones = document.querySelectorAll('section');
    secciones.forEach(seccion => {
        if (isVisible(seccion)) {
            seccion.classList.remove('invisible'); // Elimina la clase invisible para hacer visible la sección
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const peliculas = document.querySelectorAll('.pelicula');
    const numPeliculas = peliculas.length;

    // Ocultar todas las películas
    peliculas.forEach(pelicula => pelicula.style.display = 'none');

    // Mostrar las primeras 10 películas
    for (let i = 0; i < Math.min(10, numPeliculas); i++) {
        peliculas[i].style.display = 'block';
    }

    // Mostrar ambos botones de navegación
    document.getElementById('anterior').style.display = 'inline-block';
    document.getElementById('siguiente').style.display = 'inline-block';
});

// Función para mostrar las siguientes películas en el catálogo
function mostrarSiguiente() {
    const peliculas = document.querySelectorAll('.pelicula');
    const numPeliculas = peliculas.length;

    // Calcular el nuevo índice de inicio
    indiceInicio += 10;

    // Si se alcanza el final de la lista, volver al inicio
    if (indiceInicio >= numPeliculas) {
        indiceInicio = 0;
    }

    // Ocultar todas las películas
    peliculas.forEach(pelicula => pelicula.style.display = 'none');

    // Mostrar las próximas 10 películas
    for (let i = indiceInicio; i < Math.min(indiceInicio + 10, numPeliculas); i++) {
        peliculas[i].style.display = 'block';
    }
}

// Función para mostrar las películas anteriores en el catálogo
function mostrarAnterior() {
    const peliculas = document.querySelectorAll('.pelicula');
    const numPeliculas = peliculas.length;

    // Calcular el nuevo índice de inicio
    indiceInicio -= 10;

    // Si se alcanza el principio de la lista, ir al final
    if (indiceInicio < 0) {
        indiceInicio = Math.max(0, Math.floor(numPeliculas / 10) * 10);
    }

    // Ocultar todas las películas
    peliculas.forEach(pelicula => pelicula.style.display = 'none');

    // Mostrar las películas anteriores
    for (let i = indiceInicio; i < indiceInicio + 10; i++) {
        peliculas[i % numPeliculas].style.display = 'block';
    }

    // Si estamos en el inicio del catálogo, mostrar ambos botones de navegación
    if (indiceInicio === 0) {
        document.getElementById('anterior').style.display = 'inline-block';
        document.getElementById('siguiente').style.display = 'inline-block';
    }
}

// Función para desplazarse suavemente a la sección de tendencias
function scrollToTendencias() {
    const tendenciasSection = document.getElementById('tendencias');
    tendenciasSection.scrollIntoView({ behavior: 'smooth' });
}

// Mostrar las secciones cuando se carga la página y cada vez que se hace scroll
document.addEventListener('DOMContentLoaded', mostrarSecciones);
window.addEventListener('scroll', mostrarSecciones);

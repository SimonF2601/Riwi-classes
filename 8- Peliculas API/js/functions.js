//Selectores
const inputTitle = document.querySelector("#search");
const containerCards = document.querySelector(".container-cards");

//Funciones

//Funcion para hacer el llamado a la API
export async function callToApi(title, mode) {
  let URL, response, data;
  if (mode === "search") {
    //Modifico la URL de la peticion donde le añado el titulo de la pelicula
    URL = `https://www.omdbapi.com/?apikey=29790cec&s=${title}`;
    //Realizo la peticion HTTP con el servicio fecth
    //Await  = codigo no bloqueante A codigo bloqueante
    response = await fetch(URL);
    data = await response.json();
    printMovies(data.Search);
  } else if (mode === "see more") {
    URL = `https://www.omdbapi.com/?&apikey=29790cec&i=${title}`;
    response = await fetch(URL);
    data = await response.json();
    printSeeMore(data);
  }
}

//Funcion hecha por kevin
async function loadShowMore(id) {
  URL = `https://www.omdbapi.com/?&apikey=29790cec&i=${id}`;
  try {
    response = await fetch(URL);
    data = await response.json();
    //Funcion para impormir en el HTML los detalles de la pelicula
    printSeeMore(data);
  } catch (error) {}
}

//Funcion para mostrar las peliculas en el HTML
export function printMovies(movies) {
  //Limpiar el HTML
  cleanHTML();

  //Validar que si existan peliculas
  if (!movies) {
    const titleError = document.createElement("h2");
    titleError.textContent = `la pelicula: ${inputTitle.value}. NO FUE ENCONTRADA 😕`;
    titleError.classList.add("alert");

    containerCards.appendChild(titleError);
  }
  //Recorremos la lista
  movies.forEach((movie) => {
    //Inyectar html al contenedor de las cartas
    containerCards.innerHTML += `
            <div class="card">
                <h2 class = "title-movie">${movie.Title}</h2>
                <img 
                src= ${movie.Poster} 
                alt="">
                <p>Año: <span>${movie.Year}</span></p>
                <p>Tipo: <span>${movie.Type}</span></p>
    
                <button class="see-more" id="${movie.imdbID}">Ver más</button>
             </div>
        `;
  });
}

//Funcion para eliminar
export function cleanHTML() {
  console.log(containerCards.firstChild);
  while (containerCards.firstChild) {
    containerCards.firstChild.remove();
  }
}

export function printSeeMore(movie) {
  //Desestructuracion del objeto movie
  const {
    Poster,
    Language,
    Genre,
    Director,
    Country,
    BoxOffice,
    Actors,
    Title,
    Writer,
    Year,
    Released,
    Plot,
  } = movie;

  cleanHTML();

  // Multiculsor se activa con control+ Alt, para seleccionar en multicursor de un caracter en una misma linea control+D,
  containerCards.innerHTML = `
    <div class ="card-show-more">
        <i class='bx bx-arrow-back title-movie"${Title}"'></i>
        <img src="${Poster}"/>
        <div>
            <p> Title: <span> ${Title}</span> </p>
            <p> Genre: <span> ${Genre}</span> </p>
            <p> Language: <span> ${Language}</span> </p>
            <p> Language: <span> ${Language}</span></p>
            <p> Writer: <span> ${Writer}</span> </p>
            <p> Released: <span> ${Released}</span> </p>
            <p> Country: <span> ${Country}</span> </p>
            <p> Actors: <span> ${Actors}</span> </p>
            <p> Plot: <span> ${Plot}</span> </p>
            <p> BoxOffice: <span> ${BoxOffice}</span> </p>
            <p> Director: <span> ${Director}</span> </p>
            <p> Year: <span> ${Year}</span> </p>
        </div>

    </div>
    `;
}

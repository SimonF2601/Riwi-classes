//Petición HTTP con fetch

//Selectores
const btnText = document.querySelector("#btnLoadText");
const textHTML = document.querySelector("#texto");

//Eventos
btnText.addEventListener("click", () => {
  consumirTxtSegundaForma();
});

function consumirTxt() {
  //Fetch es un servicio integrado de Javascript que nos permite hacer peticiones HTTP,
  //Fetch recibe como parametro la URL del archivo al cual se le va a hacer la petición.
  //(FETCH RETORNA UNA PROMESA)
  const URL = "data/data.txt";

  fetch(URL)
    .then((respuesta) => {
      //Si quiero la respuesta en texto = text()
      //En JSON = .json()
      return respuesta.text();
    })
    .then((valor) => {
      console.log(valor);
      textHTML.textContent = valor;
    });
}

//Segunda forma de usar fetch
async function consumirTxtSegundaForma() {
  const URL = "data/data.txt";

  try {
    const respuesta = await fetch(URL);
    if (respuesta.status != 200){
        throw new Error("Ocurrio un error");
    }
    const valor = await respuesta.text();
    textHTML.textContent = valor;
  } catch (error) {
    textHTML.textContent = error;
    console.log(error);
  }
}

//Selectores 
const URLBase = "http://localhost:3000";
const nameUser = document.querySelector("#user-name");
const ageUser = document.querySelector("#user-age");
const idUser = document.querySelector("#user-id");
const form = document.querySelector("#form");
const tbody = document.querySelector("#tbody");
let idTemporal ;

//Diferencias entre un QueryParam y un request 
// El request es el puerto donde esta la aplicacion y se va yendo por la ramificacion de los objetos /users/valorDelParametro, luego el QueryParam tiene una sintaxis diferente ?=parametro = valor

//Eventos 
document.addEventListener("DOMContentLoaded", () => {
  getUsers();
});

tbody.addEventListener("click", (event) => {
    event.preventDefault();
    const btnType = event.target.getAttribute("id");
    if (btnType === "edit") {
        idTemporal = event.target.parentElement.parentElement.getElementsByTagName("td")[0].textContent;
        nameUser.value = event.target.parentElement.parentElement.getElementsByTagName("td")[1].textContent;
        ageUser.value = event.target.parentElement.parentElement.getElementsByTagName("td")[2].textContent;
    }
});

form.addEventListener("submit", event =>{
    //Prevenir los eventos por defecto
    event.preventDefault();
    if(idTemporal === undefined){
        //Funcion para crear un usuario
        createUSer();
    } else{
        updateUser(idTemporal);
    }
});


//Funciones 
async function createUSer(){
    const user = {
        name: nameUser.value,
        age: ageUser.value
    }
    //VERBOS HTTP
    // GET -> Obtener
    // POST -> Crear
    // PUT -> Actualizar
    // DELETE -> Eliminar
    const response = await fetch(`${URLBase}/users`, {
      method: "POST",
      //Cabecera de tipo json, para decirle que la informacion se enviara de esta manera
      headers: {
        "Content-Type": "application/json",
      },
      //SE ENVIA LA INFOMACION COMO STRING Y COMO OBJETO TIPO JSON
      body: JSON.stringify(user),
    });

    console.log(response);

    getUsers();
};

async function getUsers() {
    const response = await fetch(`${URLBase}/users`);
    const data = await response.json();

    renderUsers(data);
};

async function updateUser(id){
    const user = {
      name: nameUser.value,
      age: ageUser.value,
    };

    //El fecth recibe una URL , una promesa que esta puesta por method, headers, body
    const response = await fetch(`${URLBase}/users/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json" 
        },
      body: JSON.stringify(user),
    });
    idTemporal = undefined;
}

async function deleteUser(id){
    const response = await fetch(`${URLBase}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
}

function renderUsers(users) {
    // tbody.innerHTML = ""

    cleanTbody();

    users.forEach(user => {
        tbody.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>
                    <button class="btn btn-primary" id = "edit">Editar</button>
                    <button class="btn btn-danger"  on click = deleteUser("${user.id}") >Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function cleanTbody() {
    while(tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    };
}
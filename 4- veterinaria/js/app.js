//Variables globales
let agendaCitas = [
    {           
        nombreMascota: "Dobi",
        propietario: "Kewvin",
        telefono: "343443",
        fecha: "2022-04-14",
        hora: "10:30",
        sintomas: "10:30",
        id: 1705074602294
    }
];
let mode = "save"
let id = "";  

//Selectores
let namePet = document.getElementById("name_pet");
let owner = document.getElementById("name_person");
let ownerPhone = document.getElementById("phone_person");
let date = document.getElementById("date_cite");
let hourDate = document.getElementById("time_cite");
let  Symptoms = document.getElementById("description");
const btnSave = document.querySelector("form");
const contenedorCitas = document.getElementById("citas-contenedor")

//Eventos 
document.addEventListener("DOMContentLoaded",()=>{

    let validator = localStorage.getItem("Citas agendadas");
    if (validator){
      agendaCitas= JSON.parse(validator);
      pintarCitas();
    }
});
  
contenedorCitas.addEventListener("click", event =>{
    event.preventDefault();
    const btnCard = event.target.getAttribute("id");
    const card = event.target.parentElement.parentElement;
    
    if(btnCard === "edit")
        btnEdit(card);
    else if (btnCard === "delete")
        btnDelete(card);
    else
        console.log("object");
});

btnSave.addEventListener("submit", (event)=>{
    event.preventDefault();
  
    AgregarMascota(namePet.value ,owner.value ,ownerPhone.value, date.value, hourDate.value, Symptoms.value, mode);
    pintarCitas();
    
  });
  
  //Funciones 
  function AgregarMascota(nombreMascota, propietario, telefono, fecha, hora, sintomas, modo){
    
    if (modo == "save"){
      if ([nombreMascota, propietario, telefono, fecha, hora, sintomas].includes("")) return
      if (!verificarCitas(fecha, hora)){
        const mascota = {
          nombreMascota,
          propietario,
          telefono,
          fecha,
          hora,
          sintomas,
          id: Date.now()
        }
        agendaCitas.push(mascota);
        document.querySelector("form").reset();
      }else
        alert("Horario no disponible")
    }
  else if (modo == "edit"){
    agendaCitas.forEach(cita=>{
      if(id == cita.id){
        cita.nombreMascota = namePet.value;
        cita.propietario = owner.value;
        cita.telefono = ownerPhone.value;
        cita.fecha = date.value;
        cita.hora = hourDate.value;
        cita.sintomas = Symptoms.value;
      }
    }); 
    mode = "save"
    document.querySelector("form").reset();
  }

        btnSave.classList.remove("was-validated");
        localStorage.setItem("Citas agendadas", JSON.stringify(agendaCitas));

}

function verificarCitas(date, hour){
    for(cita of agendaCitas){
      //Validar que la fecha y la hora de la nueva cita sea diferente a una que entra nueva, si encuentra una cita con la misma fecha 
      //y hora, devuelve verdadero si la cita esta ocupada
      if(cita.fecha === date && cita.hora === hour)
          return true;
    }
    return false;
}

function btnEdit(card){
  
  namePet.value = card.querySelector("#nombrePaciente").textContent;
  owner.value =  card.querySelector("#nombrePropietario").textContent;
  ownerPhone.value =  card.querySelector("#telefono").textContent;
  date.value =  card.querySelector("#fecha").textContent;
  hourDate.value =  card.querySelector("#hora").textContent;
  Symptoms.value =  card.querySelector("#sintomas").textContent;

  mode = "edit"
  id = card.getAttribute("id");
};

function btnDelete(card){
    let id = card.getAttribute("id");
    let listaNueva = [];
    
    agendaCitas.forEach(cita=>{
        if((id != cita.id)){
            listaNueva.push(cita);
        }
    });

    agendaCitas = listaNueva;
    pintarCitas();  
}

function pintarCitas(){
    contenedorCitas.innerHTML = "";
    agendaCitas.forEach(cita => {
        contenedorCitas.innerHTML += `
            <div class="card card_cite" >
              <div class="card-body" id ="${cita.id}">
                <h5 class="card-title fs-3 fw-bold" id="nombrePaciente" >${cita.nombreMascota}</h5>
                <p class="card-text">
                  <div class="d-flex gap-2">
                    <span class="fw-bold">Propietario:</span>
                    <span id="nombrePropietario" >${cita.propietario}</span>
                  </div>

                  <div class="d-flex gap-2">
                    <span class="fw-bold">Telefono:</span>
                    <span id="telefono" >${cita.telefono}</span>
                  </div>

                  <div class="d-flex gap-2">
                    <span class="fw-bold">Fecha:</span>
                    <span id ="fecha" >${cita.fecha}</span>
                  </div>
                  
                  <div class="d-flex gap-2">
                    <span class="fw-bold">Hora:</span>
                    <span id ="hora" >${cita.hora}</span>
                  </div>

                  <div class="d-flex gap-2">
                    <span class="fw-bold">Sintomas:</span>
                    <span id ="sintomas" >${cita.sintomas}</span>
                  </div>
                </p>
                <div class="d-flex gap-2">
                  <button class="btn btn-primary" id="edit">Editar</button>
                  <button class="btn btn-danger" id="delete">Eliminar</button>
                </div>
              </div>
            </div>
        `  
    });
    localStorage.setItem("Citas agendadas", JSON.stringify(agendaCitas));
}


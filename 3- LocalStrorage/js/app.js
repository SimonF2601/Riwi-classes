//Ejemplo basico para guardar informacion en el localStorage
localStorage.setItem("company","Riwi");

//Ejemplo basico para obtener informacion en ek localStorage
const informacion = localStorage.getItem("company");
console.log(informacion);

//Eliminar un item del localStorage
localStorage.removeItem("company");

//Eliminar o limpiar todo el localStorage
localStorage.clear();
console.log(informacion);

// Ejemplo para guardar objeto en el localStorage

// 1.Creamos el objeto
const coder= {
    nombre: "Terry",
    fecha_nac:"Mayo",
    edad: 24
}

// 2. Convertir el objetoa sting von (Stringg)
let objString = JSON.stringify(coder);
console.log(objString);

// 3. Agregar el objeto a localStorage
localStorage.setItem('coder', objString);

//Actualizar/Modificar el objeto

// 1. Obtener el objeto guardado 
let coderModificar = localStorage.getItem("coder");

// 2. Convertir de string a codigo (JSON)
coderModificar = JSON.parse(coderModificar);

coderModificar.fecha_nac = "Junio";
coderModificar.edad = 21;

//3. Volver a modificar sel nuevo objeto en string y sobreescribir
objString = JSON.stringify(coderModificar);
localStorage.setItem("coderModificar", objString);

//Lista de objetos 

const coders = [
    {nombre:"Simon", edad: 19},
    {nombre:"Ana", edad: 24},
    {nombre:"Valeria", edad: 20},
    {nombre:"Antony Chopper", edad: 18},
    {nombre: "Juan Jose", edad: 16}
];

let listaCoders = JSON.stringify(coders);

localStorage.setItem("coders", listaCoders);

let listaActualizada = JSON.parse(localStorage.getItem("coders"));

listaActualizada.forEach(element => {
    if (element.nombre === "Simon")
        element.edad += 1;
    
});

localStorage.setItem("coders", JSON.stringify(listaActualizada));
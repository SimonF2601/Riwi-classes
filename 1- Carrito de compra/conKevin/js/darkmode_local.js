//Selectores - formas de seleccionar los contenedores
const contenedor = document.getElementById('lista-productos');
const contenedor1 = document.querySelector('#lista-productos');
const tbody = document.querySelector("#lista-carrito tbody");
const cambiarModo = document.querySelector("#toggle-dark-mode");
const btnVaciarCarrito = document.querySelector("#vaciar-carrito")



//Lista para guardar productos en el carrito
let listaCarrito = [];

//Eventos
// document.addEventListener("DOMContentLoaded", ()=>{
//     const listaCache = localStorage.getItem("");

//     //Preguntar si ya habia una lista guardada
//     if (listaCache){
//         listaCarrito = JSON.parse(listaCache);
//     }
// });

document.addEventListener("DOMContentLoaded",()=>{
    let verificadorModo = localStorage.getItem("darkMode")
    if (verificadorModo === "false" || verificadorModo === null){
        document.body.classList.remove("dark-mode")
        localStorage.setItem("darkMode","false");
    }else {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode","true");
    }

});

cambiarModo.addEventListener('click', event => {
    let verificadorModo = localStorage.getItem("darkMode")
    if (verificadorModo === "false" || verificadorModo === null){
        document.body.classList.toggle('dark-mode');
        localStorage.setItem("darkMode","true");
    }else{
        document.body.classList.toggle('dark-mode');
        localStorage.setItem("darkMode","false");
    }

});

// btnVaciarCarrito.addEventListener("click", event =>{
//     event.preventDefault();
//     listaCarrito = [];
//     limpiarCarrito();
// });

// tbody.addEventListener("click", (event)=>{

//     if (event.target.classList.contains("btn-eliminar")){
//         const id = event.target.getAttribute("data-id");
//         eliminarProducto(id);
//     }
// });

contenedor.addEventListener('click',(event)=>{
    //Quita los eventos que esten predefinidos, en este caso no se recarga la pagina
    event.preventDefault(); 
    //Validar que el usuario dio click en el boton agregar carrito
    if(event.target.classList.contains("agregar-carrito")){
        //Obtengo el atributo que contiene el data-id
        const id = event.target.getAttribute("data-id");
        //Subo dos niveles para obtener toda la informacion de la carta
        const card = event.target.parentElement.parentElement;

        agregarProducto(id, card);
    }
});

//Funciones
function agregarProducto(id, card){
   const infoProducto = {
    id, //Si tiene el mismo nombre y clave se puede usar solo uno de los dos en vez de id: id
    nombre: card.querySelector("h4").textContent,
    imagen: card.querySelector(".imagen-curso").src,
    precio: card.querySelector(".precio span").textContent,
    cantidad: 1
   }

   //Preguntar si ese producto ya se encuentra dentro de la lista
   const producto = listaCarrito.find((producto)=> producto.id == id);
   if (!producto){
       //Agregar a la lista del carrito el producto
       listaCarrito.push(infoProducto);
   }else {
    let nuevoPrecio = infoProducto.precio;
    nuevoPrecio = nuevoPrecio.split("$").join("");
    producto.cantidad++;
    producto.precio = `$${Number(nuevoPrecio) * producto.cantidad}` 
    console.log(producto.precio);
}
    pintarCarrito();
 console.log(listaCarrito);
}

function pintarCarrito(){
    //Limpiar la tabla

    //Primera forma
    // tbody.innerHTML = "";

    //Segunda forma
    while (tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    }

    listaCarrito.forEach(function(producto){
        tbody.innerHTML+=`
        <tr>
            <td>
            <img src="${producto.imagen}" height="100px">
            </td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <button class= "btn-eliminar" data-id="${producto.id}">Eliminar</button>
            </td>
        </tr>
        `
    }) 

    localStorage.setItem(JSON.stringify(listaCarrito))
}

function eliminarProducto(id){
    listaCarrito = listaCarrito.filter(producto => producto.id != id);
    pintarCarrito();
};
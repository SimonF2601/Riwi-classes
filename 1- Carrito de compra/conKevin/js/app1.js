//Variable donde se guardan los productos seleccionados 
let guardarProductos = []

//Selectores
const listaProductos = document.querySelector("#lista-productos");
const carrito = document.querySelector("#carrito");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const tbody = document.querySelector("#productos");

//Agergar oidos a lista, recibe dos parametros
//El evento y la funcion que va a realizar 
listaProductos.addEventListener('click', function (event) {
    //Verifica si contiene la clase agregar-carrito, arroja un valor booleano
    let btnVerificar = event.target.classList.contains("agregar-carrito")

    if (btnVerificar === true) {
        //Si, si tiene la clase entonces traiga la info solicitada 
        //getAttribute, es para tener el id de la etiqueta
        const idHTML = event.target.getAttribute("data-id")

        //Estoy saliendo hacia el padre
        const padre = event.target.parentElement.parentElement

        //Traer imagen
        const imagen = padre.querySelector(".imagen-curso").getAttribute("src")
        //Traer nombre
        const nombre = padre.querySelector("h4").textContent
        //Traer  
        const precio = padre.querySelector("span").textContent

        AgregarProductosCarrito(imagen, nombre, precio, idHTML)

    } else {
        alert("No agregaste ningún producto")
    }
    /*Forma corta
    if (event.traget.classList.contains("agregar-carrito"){
       const id = event.target.getAttribute("data-id")
       alert(id)
    }*/
});

//Agregar oidos a carrito 
carrito.addEventListener('click', function (event) {
    //Verificar si al dar click en el boton contiene el boton 

    if (event.target.classList.contains("eliminar-producto")) {
        //Obtener atributo
        const id = event.target.getAttribute("data-id")
        eliminarProductoCarrito(id)
    }
});

//Agregar oidos a vaciar carrito
vaciarCarrito.addEventListener('click', function (event) {

    //Vaciar toda la lista del carrito 
    guardarProductos.splice(0, guardarProductos.length);
    mostrarProductos()

});


//Funciones
function AgregarProductosCarrito(imagen, nombre, precio, idHTML) {
    //Se llama los parametros definidos en listar productos para guardarlos en un objeto
    const productoEntrante = {
        imagen: imagen,
        nombre: nombre,
        precio: precio,
        id: idHTML,
        cantidad: 1
    }

    const encontrar = guardarProductos.findIndex((elemento) => elemento.idHTML === productoEntrante.id)
    if (encontrar === -1) {
        //Se agregan los productos a la lista que estaba vacia
        guardarProductos.push(productoEntrante)
    } else {
        guardarProductos[encontrar].cantidad += 1;
        let cantidadProducto = guardarProductos[encontrar].cantidad
        guardarProductos[encontrar].precio = Number(guardarProductos[encontrar].precio.slice(1) * cantidadProducto)
    }
    mostrarProductos()
}


function mostrarProductos() {
    //Limpiar la lista para volver a cargar
    tbody.innerHTML = "";

    //Se toma la lista y se recorre 
    guardarProductos.forEach((element) => {
        //Se trae el objeto completo y no cada elemento del objeto
        const { id, imagen, nombre, precio, cantidad } = element

        //Inyectamos codigo
        tbody.innerHTML += `
        <tr>
            <th>
                <img src=${imagen} alt="Imagen" width="50px" height="50px"/>
            </th>
            <th>${nombre}</th>
            <th>${cantidad}</th>
            <th>${precio}</th>
            <th>
                <button class="eliminar-producto" data-id="${id}">
                    Eliminar
                </button>
            </th>
        </tr>`
    });
}

function eliminarProductoCarrito(id) {

    guardarProductos = guardarProductos.filter((element) => element.id != id)
    mostrarProductos()
}
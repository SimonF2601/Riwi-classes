const lista = document.querySelector("#lista-productos");
const carrito = document.querySelector("#carrito");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const tbody = document.querySelector("#productos");

const carritoCompras = []; 

lista.addEventListener("click", function(event){ //Los parametros van relacionados con el evento que este pasando, en este caso con la accion "click"
    console.log(event);
    let verificardor = event.target.classList.contains("agregar-carrito");
    //El event y el target van juntos

    if (verificardor){
        //Llamar el id del buton para diferenciar las cartas
        const idButton = event.target.getAttribute("data-id");

        //Escalo en div para llegar al div que que ubique donde pueda extraer informacion
        const padrecito = event.target.parentElement.parentElement;
        
        //Traer imagen 
        const imagen = padrecito.querySelector(".imagen-curso").getAttribute("src");
        //Traer nombre
        const nombre = padrecito.querySelector("h4").textContent;
        //Traer precio
        const precio = padrecito.querySelector("span").textContent;

        agregarProductosCarrito(imagen, nombre, precio, idButton);

    }else{
        alert("No se agrego ningun producto");
    }   
})

carrito.addEventListener("click", function(event){

});

vaciarCarrito.addEventListener("click", function(){ });

//Funciones Propias 

function agregarProductosCarrito( imagen, nombre, precio, id){
    const productoEntrante = {
        imagen: imagen,
        nombre: nombre,
        precio: precio,
        id: id,
        cantidad: 1
    }

    const encontrar = carritoCompras.findIndex((elemento)=> elemento.id === productoEntrante.id);

    if (!(encontrar === -1)){
        carritoCompras[encontrar].cantidad += 1;
        let cantidadProducto = carritoCompras[encontrar].cantidad;
        carrito[encontrar].precio = Number(carrito[encontrar].precio.slice(1) * cantidadProducto);

    }else{
        carritoCompras.push(productoEntrante);
    }
}

function listarProductos(){
    //Vaciar el cuerpo<
}
//Eventos 
document.addEventListener("DOMContentLoaded", ()=>{
    consumirAPI();
});

async function consumirAPI(){
    const URL = "https://jsonplaceholder.typicode.com/photos"
    try {
        const respuesta = await fetch(URL);
        const data = await respuesta.json();

        imprimirDatos(data.slice(0, 100));
    } catch (error) {
        
    }
}

function imprimirDatos(data){
        console.log(data);

    data.forEach(element => {
        document.body.innerHTML += `
            <div class="card" style="width: 10rem; height: 300px">
                <img src="${element.url}" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">${element.title}</p>
                </div>
            </div>
        `;
    });
}

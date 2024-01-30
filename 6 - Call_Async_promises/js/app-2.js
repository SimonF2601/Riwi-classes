//Promise 

//Create a promise 

const premiarProyecto = new Promise((resolve,reject)=>{
    //Logica de la promesa 
    const premiar = false;
    setTimeout(()=>{
        if(premiar){
            resolve(["Juan", "Federico", "Pedro"]);
        } else {
            reject("Ningun grupo fue premiado")
        }
    }, 2000)
});

//Use promise
premiarProyecto.then((resultado)=> {
    console.log("Los ganadores del concurso son:", resultado.join(","));
}).catch((error)=>{
    console.log("Ocurrio un error: ", error);
});
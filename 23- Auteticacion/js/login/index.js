//Selectores 
const URL = "http://localhost:3000/users";
const formLogin = document.getElementById("form-login");
const email = document.getElementById("email");
const password = document.getElementById("password");

//Eventos
formLogin.addEventListener("submit", event =>{
    event.preventDefault()

    login()
});

//Funciones
async function login() {
    //1. Peticion por email
    const response = await fetch(`${URL}?email=${email.value}`);
    const data = await response.json()
    //2. Esta registrado ese email
    if (!data.length){
        console.log("email no registrado")
        return
    }

    //3.Comparar las contraseñas 
    if (data[0].password === password.value ) {
        //Con el objeto window podemos redireccionar al usuario
        window.location.href = "administrator.html";
        localStorage.setItem("isAuthorizated", "true")
    }else{
        console.log("Credenciales incorrectas");
    }

}
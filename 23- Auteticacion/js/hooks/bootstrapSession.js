// FUNCION DE CLAUSURA: Es decir se auto-invoca
(()=>{
  //Obtenemos la sesion del usuario
  const isAuthorizated = localStorage.getItem("isAuthorizated");
  //Obtengo la ruta a donde el usuario quiere acceder
  const path = window.location.pathname;

  //corto el path para acceder solamente al archivo que el usuario esta intentando acceder
  const routeActive = path.substring(path.lastIndexOf("/") + 1);

  //Creo una lista con el nombre de todas las vistas que deseo proteger
  const privateRows = ["administrator.html"];

  //Si la ruta actual esta en la lista de las rutas protegidas y no esta autorizado
  //entonces lo dirige al login
  if (privateRows.includes(routeActive) && !isAuthorizated) {
    window.location.href = "index.html";
  }
})()
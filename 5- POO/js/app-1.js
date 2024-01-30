//Como crear una clase en JavaScript
//Se utiliza la palabra reservada class, posteriormente el nombre con letra capital y llaves de apertura y cierre
class Coder{
    //El metodo consturctor se ejecuta automaticamente 
    //en el momento que se usa = instancia.
    //Utilizando palabra reservada NEW
    constructor(nombre, edad, lenguajes){
        this.nombre = nombre;
        this.edad = edad;
        this.lenguajes = lenguajes;
    }
};

//Instanciar clases
const objCoder = new Coder("Simon", 19, ["Python", "Java", "C#", "JS", "HTML"]);
const objCoder2 = new Coder("Antony", 18, ["Python","HTML"]);

console.log(objCoder);
console.log(objCoder2);

//Segunda Forma 
// const Cliente = class Cliente {

// }
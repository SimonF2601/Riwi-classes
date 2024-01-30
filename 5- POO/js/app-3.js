//Metodos

class Cliente{
    constructor (nombre, saldo){
        this.nombre = nombre;
        this.saldo = saldo;
    }
    //Sintaxis para crear metodos
    imprimirSaldo(){
        return`Hola ${this.nombre}, tu saldo es de: ${this.saldo}`
    }

    retirarSaldo(retiro){
        this.saldo -= retiro; 
    }
    //Este metodo lo puedo utilizar sin instanciar el constructor
    static bienvenida(){
        return "Hola, bienvenido al cajero";
    }
}

//NUEVO
//Herencia
class Empresa extends Cliente{
    //Encapsulacion
    #nit = "";
    constructor(nombre, saldo, tipo, nit){
        super(nombre, saldo)
        this.tipo = tipo;
        this.#nit = nit; 
    }
    //Crear un metodo encargado de mostrar el nit
    ObtenerNit(){
        //autenticar
        //contraseña
        //
        return this.#nit
    }
    
    //Polimorfismo o sobreescritura
    //@Overwriting
    static bienvenida(){
        return "Hola, bienvenido al cajero para empresas"
    }
}

//Instancias
console.log(Cliente.bienvenida());
const objCliente = new Cliente("Kevin", 20)
console.log(objCliente.imprimirSaldo());



//Instancia con herencia
console.log(Empresa.bienvenida());
const objEmpresa = new Empresa("Riwi", 3000, "Tecnologia", " 991112");
objEmpresa.retirarSaldo(1000);
console.log(objEmpresa.imprimirSaldo());

//Encapsulamiento
console.log(objEmpresa.ObtenerNit());
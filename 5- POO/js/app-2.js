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
    static bienvendida(){
        return "Hola, bienvenido al cajero";
    }
}

//Usar clase cliente 
const objKevin = new Cliente("Kevin", 400);

console.log(Cliente.bienvendida());

console.log(objKevin.imprimirSaldo());

objKevin.retirarSaldo(200);

console.log(objKevin.imprimirSaldo());
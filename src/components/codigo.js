class Plato{
    constructor(nombre,info,precio)
        {
        this.nombre= nombre;
        this.info = info;
        this.precio = precio;
        this.estado = true; // Estado del plato (activado o desactivado)
        }

    verInfo()
        {
        document.write (this.info + "<br>")
        }

    agregarPlatoACarrito(carrito) 
        {
        carrito.push(this);
        }

    cambiarEstadoPlato() 
    {
    this.estado = !this.estado;
    }

}

const plato1 = new Plato ("Lomo al verdeo", "Lomo con salsa de verdeo y papas", 5000)
const plato2 = new Plato ("Pizza Especial", "Pizza a la piedra con muzzarela, olivas, morron y jamón", 4500)
const plato3 = new Plato ("Canelones con salsa", "Canelones rellenos con acelga, queso, carne y salsa blanca", 4000)
const plato4 = new Plato ("Ensalada Cesar", "Ensalada de lechuga, pollo, huevo, anchoas, ajo", 4500)
const plato5 = new Plato ("Tofu frito", "Tofu con salsa de soja", 3500)



// perro.setRaza = "Pedro";
// document.write(perro.getRaza)










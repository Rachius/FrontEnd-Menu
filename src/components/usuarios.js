class Usuario{
    constructor(_id,username,email,password,rol)
        {
        this._id= _id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.estado = true;
        }

    logout()
        {
        
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










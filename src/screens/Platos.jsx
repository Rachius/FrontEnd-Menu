import React from 'react';
import PlatoMenu from './PlatoMenu';
// import codigo from '../components/codigo';



class Menu{
  constructor(nombre,info,precio, categoria)
      {
      this.nombre= nombre;
      this.info = info;
      this.precio = precio;
      this.categoria = categoria;
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



const Platos = () => {
 

const plato1 = new Menu ("Lomo al verdeo", "Lomo con salsa de verdeo y papas", '$5000','Platos')
const plato2 = new Menu ("Pizza Especial", "Pizza a la piedra con muzzarela, olivas, morron y jamón", '$4500','Platos')
const plato3 = new Menu ("Canelones con salsa", "Canelones rellenos con acelga, queso, carne y salsa blanca", '$4000','Platos')
const plato4 = new Menu ("Ensalada Cesar", "Ensalada de lechuga, pollo, huevo, anchoas, ajo", '$4500','Platos')
const plato5 = new Menu ("Tofu frito", "Tofu con salsa de soja", '$3500',  'Platos')







 return (
    <div container-fluid>    
      <h3>Platos</h3>
          <div>
          <div class="row">
                <div class="col-sm-3">
                 <PlatoMenu 
                 nombre={plato1.nombre}
                 info={plato1.info}
                 precio={plato1.precio}
                 />
                </div>

                <div class="col-sm-3">
                 <PlatoMenu 
                 nombre={plato2.nombre}
                 info={plato2.info}
                 precio={plato2.precio}
                 />

                </div>

                <div class="col-sm-3">
                 <PlatoMenu
                 nombre={plato3.nombre}
                 info={plato3.info}
                 precio={plato3.precio}
                 />
                </div>

            </div>

            <br />

              <div class="row">
                <div class="col-sm-3">
                 <PlatoMenu
                 nombre={plato4.nombre}
                 info={plato4.info}
                 precio={plato4.precio}
                 />
                </div>

                <div class="col-sm-3">
                 <PlatoMenu 
                 nombre={plato5.nombre}
                 info={plato5.info}
                 precio={plato5.precio}
                 />

                </div>
                <div class="col-sm-3">
                 <PlatoMenu />
                </div>


            </div>        
        </div>
      </div>
 )
}

export default Platos
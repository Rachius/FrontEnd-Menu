import React from 'react'
import { useAuth } from '../contexts/AuthContex'
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';


  const Carrito = () => {
    const [carrito, setCarrito] = useState([]);
  
    useEffect(() => {
      // Recuperar datos del local storage
      const carritoData = JSON.parse(localStorage.getItem('pedido')) || [];
      setCarrito(carritoData);
    }, []);  

    const totalAPagar = carrito.reduce((total, item) => total + item.precioMenu, 0);

    
  return (
  <div class="d-flex col-12 row carta-banner justify-content-center   ">
      <Helmet>
        <title>Pedidos</title>
      </Helmet>
          <div class="card col-lg-8 col-md-10 col-sm-10 mx-auto mt-5 shadow-lg rounded-2 bordeCarta  fondo-CardCarrito" >
            <div class="card-header  text-center carta-home-titulo "><p>Orden de pedido</p></div>
            <div className="card-body justify-content-center d-flex" >
              <table className="table  ">
              <thead className=''>
                <tr className=''>
                  <th className='bg-transparent bordeTituloCarrito'>ID</th>
                  <th className='bg-transparent bordeTituloCarrito'>Producto</th>
                  <th className='bg-transparent bordeTituloCarrito'>Precio</th>
                  <th className='bg-transparent bordeTituloCarrito'></th>
                  <th className='bg-transparent bordeTituloCarrito'></th>
                </tr>
              </thead>
              <tbody className=' white-star-carrito'>
                {carrito.map((item, index) => (
                  <tr key={index} className=' '>
                    <td className='  bg-transparent bordePedido'>{index + 1}</td>
                    <td className=' bg-transparent bordePedido'>{item.tituloMenu}</td>
                    <td className=' bg-transparent bordePedido'>${item.precioMenu}</td>
                    <td className='bg-transparent bordePedido'><button type="button" className=" btn btn-dark hover button-hover">Eliminar
                          </button>                                                  </td>
                    <td className='bg-transparent bordePedido'><button type="button" className=" btn btn-outline-warning  button-hover">+1
                    </button>                                                  </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
              </div>        

          <div class="card col-sm-10 col-md-6 col-lg-6 botonesCarrito  align-items-center justify-content-around mx-auto mt-1 mb-5">
          <h5 className="card-title mt-2">Total a Pagar: ${totalAPagar}</h5>
               <a href="../pages/carritof.html" class="btn btn-outline-success mb-3  col-md-6 ">Seguir ordenando</a>
               <a href="../pages/carritof.html" class="btn btn-outline-success mb-3  col-md-6">Finalizar pedido​</a>
           </div>
           <footer className="bg-dark text-light pt-5 pb-4">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quo quae cum odio tempore quibusdam, earum soluta, commodi architecto repellat fuga autem aspernatur ratione id ipsum incidunt excepturi, doloribus laudantium.</p>
        </footer>    

  </div>
  )
}

export default Carrito





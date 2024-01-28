import React from 'react'
import { useAuth } from '../contexts/AuthContex'
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';



  const Carrito = () => {
    const [carrito, setCarrito] = useState([]);
    const [totalAPagar, setTotalAPagar] = useState(0);
    const { carritoPedidos } = useAuth();


    
    useEffect(() => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const existingCart = JSON.parse(savedCart);
        setCarrito(existingCart.items);
        setTotalAPagar(existingCart.total);
      }
    }, []);

    // const totalAPagar = carrito.reduce((total, item) => total + item.precioMenu, 0);

    const handleRemoveFromCart = (index) => {
      // Obtiene el carrito actual del local storage
      const savedCart = JSON.parse(localStorage.getItem('cart')) || { id: null, username: null, items: [], total: 0 };
  
      // Elimina el elemento en la posición index del carrito
      savedCart.items.splice(index, 1);
  
      // Calcula el nuevo total sumando los precios de los elementos restantes en el carrito
      const newTotal = savedCart.items.reduce((acc, currentItem) => acc + currentItem.precioMenu, 0);
      savedCart.total = newTotal;
  
      // Guarda el carrito actualizado en el almacenamiento local
      localStorage.setItem('cart', JSON.stringify(savedCart));
  
      // Actualiza el estado local del carrito
      setCarrito(savedCart.items);
      setTotalAPagar(newTotal);
    };
  
    const handleIncreaseQuantity = (index) => {
      // Obten el carrito actual del local storage
      const savedCart = JSON.parse(localStorage.getItem('cart')) || { id: null, username: null, items: [], total: 0 };
  
      // Aumenta la cantidad del elemento en la posición index del carrito
      savedCart.items[index].cantidad = (savedCart.items[index].cantidad || 1) + 1;
  
      // Calcula el nuevo total sumando los precios de los elementos en el carrito
      const newTotal = savedCart.items.reduce((acc, currentItem) => acc + (currentItem.precioMenu * currentItem.cantidad), 0);
      savedCart.total = newTotal;
  
      // Guarda el carrito actualizado en el almacenamiento local
      localStorage.setItem('cart', JSON.stringify(savedCart));
  
      // Actualiza el estado local del carrito
      setCarrito(savedCart.items);
      setTotalAPagar(newTotal);
    };

    const handleDecreaseQuantity = (index) => {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || { id: null, username: null, items: [], total: 0 };
    
      // Si la cantidad es 0, ejecuta handleRemoveFromCart y sal del método
      if (savedCart.items[index].cantidad === 1) {
        handleRemoveFromCart(index);
        return;
      }
    
      // Si la cantidad no es 0, decrementa la cantidad y actualiza el total
      savedCart.items[index].cantidad = (savedCart.items[index].cantidad || 1) - 1;
      const newTotal = savedCart.items.reduce((acc, currentItem) => acc + (currentItem.precioMenu * currentItem.cantidad), 0);
      savedCart.total = newTotal;
    
      // Guarda el carrito actualizado en el almacenamiento local
      localStorage.setItem('cart', JSON.stringify(savedCart));
    
      // Actualiza el estado local del carrito
      setCarrito(savedCart.items);
      setTotalAPagar(newTotal);
    };

    







    const handleFinalizarPedido = () => {

      const savedCart = JSON.parse(localStorage.getItem('cart')) || { id: null, username: null, items: [], total: 0 };

      // Obtener datos del carrito del localStorage

      // Extraer datos necesarios
      const { id, username, total, items } = savedCart;

      const enviarPedido = { id, username, total, items }

      console.log(enviarPedido)

      // Realizar la petición POST al backend
     
       carritoPedidos(enviarPedido)
    };
  
  
    
  return (
  <div class="d-flex col-12 row carrito-banner justify-content-center   ">
      <Helmet>
        <title>Pedidos</title>
      </Helmet>
          <div class="card col-lg-8 col-md-10 col-sm-10  mt-5 shadow-lg rounded-2 bordeCarta fondo-CardCarrito" >
            <div class="card-header  text-center carta-home-titulo "><p>Orden de pedido</p></div>
            <div className="card-body justify-content-center" >
              <table className="table">
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
                    <td className='bg-transparent bordePedido'>          <button
                type="button"
                className="btn btn-danger hover "
                onClick={() => handleRemoveFromCart(index)}
              >
                Eliminar
              </button>                   </td>
                  
              <td className='bg-transparent bordePedido'>
                <button
                  type="button"
                  className="btn btn-warning hover "
                  onClick={() => handleDecreaseQuantity(index)}
                >
                  {`${item.cantidad}`} 
                </button>
              </td>

                  <td className='bg-transparent bordePedido'><button
                  type="button"
                  className="btn btn-success hover "
                  onClick={() => handleIncreaseQuantity(index)}
               >
                 {`${item.cantidad}`}
                </button>
                </td>

                  </tr>
                ))}
              </tbody>
          </table>
        </div>
        </div>        

          <div class="card col-sm-10 col-md-6 col-lg-6 botonesCarrito  align-items-center justify-content-around mx-auto mt-1 mb-5">
          <h5 className="card-title mt-2">Total a Pagar: ${totalAPagar}</h5>
               <a href="/home" class="btn btn-outline-success mb-3  col-md-6 ">Seguir ordenando</a>
               <button onClick={handleFinalizarPedido} className="btn btn-outline-success mb-3 col-md-6">
      Finalizar pedido
    </button>
           </div>
           <footer className="bg-dark text-light pt-5 pb-4">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quo quae cum odio tempore quibusdam, earum soluta, commodi architecto repellat fuga autem aspernatur ratione id ipsum incidunt excepturi, doloribus laudantium.</p>
        </footer>    

  </div>
  )
}

export default Carrito





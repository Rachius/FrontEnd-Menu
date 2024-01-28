import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContex';
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

  const handleRemoveFromCart = (index) => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || { id: null, username: null, items: [], total: 0 };
    savedCart.items.splice(index, 1);
    const newTotal = savedCart.items.reduce((acc, currentItem) => acc + currentItem.precioMenu, 0);
    savedCart.total = newTotal;
    localStorage.setItem('cart', JSON.stringify(savedCart));
    setCarrito(savedCart.items);
    setTotalAPagar(newTotal);
  };

  const handleIncreaseQuantity = (index) => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || { id: null, username: null, items: [], total: 0 };
    savedCart.items[index].cantidad = (savedCart.items[index].cantidad || 1) + 1;
    const newTotal = savedCart.items.reduce((acc, currentItem) => acc + (currentItem.precioMenu * currentItem.cantidad), 0);
    savedCart.total = newTotal;
    localStorage.setItem('cart', JSON.stringify(savedCart));
    setCarrito(savedCart.items);
    setTotalAPagar(newTotal);
  };

  const handleDecreaseQuantity = (index) => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || { id: null, username: null, items: [], total: 0 };  
    if (savedCart.items[index].cantidad === 1) {
      handleRemoveFromCart(index);
      return;
    }

    savedCart.items[index].cantidad = (savedCart.items[index].cantidad || 1) - 1;
    const newTotal = savedCart.items.reduce((acc, currentItem) => acc + (currentItem.precioMenu * currentItem.cantidad), 0);
    savedCart.total = newTotal;

    localStorage.setItem('cart', JSON.stringify(savedCart));
    setCarrito(savedCart.items);
    setTotalAPagar(newTotal);
  };

    const handleFinalizarPedido = () => {

      const savedCart = JSON.parse(localStorage.getItem('cart')) || { id: null, username: null, items: [], total: 0 };
      const { id, username, total, items } = savedCart;
      const enviarPedido = { id, username, total, items }

      console.log(enviarPedido)

      // Realizar la petición POST al backend
     
       carritoPedidos(enviarPedido)
    };
  
  
    
  return (
    <div className="d-flex col-12 row carrito-banner justify-content-center">
      <Helmet>
        <title>Pedidos</title>
      </Helmet>
      <div className="card col-lg-8 col-md-10 col-sm-10 mt-5 shadow-lg rounded-2 bordeCarta fondo-CardCarrito">
        <h4 className="mt-3 mb-3 text-center white-star-carta">Orden de pedido</h4>
        <div className="table-container text-center" style={{ maxHeight: "550px", overflowY: "auto" }}>
          <table className="col-12 justify-content-around">
            <thead className="">
              <tr className="">
                <th className="bg-transparent bordeTituloCarrito">ID</th>
                <th className="bg-transparent bordeTituloCarrito">Producto</th>
                <th className="bg-transparent bordeTituloCarrito">Precio</th>
                <th className="bg-transparent bordeTituloCarrito"></th>
                <th className="bg-transparent bordeTituloCarrito"></th>
                <th className="bg-transparent bordeTituloCarrito"></th>
              </tr>
            </thead>
            <tbody className="">
              {carrito.map((item, index) => (
                <tr key={index} className="">
                  <td className="bg-transparent bordePedido fuente-PrecioPlato ">{index + 1}</td>
                  <td className="bg-transparent bordePedido fuente-PrecioPlato">{item.tituloMenu}</td>
                  <td className="bg-transparent bordePedido fuente-PrecioPlato">${item.precioMenu}</td>
                  <td className="bg-transparent bordePedido ">
                    <button
                      type="button"
                      className="btn btn-danger hover"
                      onClick={() => handleRemoveFromCart(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                  <td className="bg-transparent bordePedido">
                    <button
                      type="button"
                      className="btn btn-warning hover"
                      onClick={() => handleDecreaseQuantity(index)}
                    >
                      {`${item.cantidad}`}
                    </button>
                  </td>
                  <td className="bg-transparent bordePedido">
                    <button
                      type="button"
                      className="btn btn-success hover"
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

      <div className="card col-sm-10 col-md-6 col-lg-6 botonesCarrito align-items-center justify-content-around mx-auto mt-1 mb-5">
        <h5 className="card-title mt-2">Total a Pagar: ${totalAPagar}</h5>
        <a href="/home" className="btn btn-outline-success mb-3 col-md-6">Seguir ordenando</a>
        <button onClick={handleFinalizarPedido} className="btn btn-outline-success mb-3 col-md-6">
          Finalizar pedido
        </button>
      </div>
      <footer className="fixed-bot bg-dark text-light pt-5 pb-4">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quo quae cum odio tempore quibusdam, earum soluta, commodi architecto repellat fuga autem aspernatur ratione id ipsum incidunt excepturi, doloribus laudantium.</p>
      </footer>
    </div>
  );
};

export default Carrito;

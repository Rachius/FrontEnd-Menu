import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContex';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';



const Carrito = () => {
  const navigate = useNavigate();
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

      
       carritoPedidos(enviarPedido)
        localStorage.clear();

       setShowMessage(true);

       setTimeout(() => {
         setShowMessage(false);
         
         if (!showMessage) {
           navigate('/esperaPedido');
         }
       }, 2000);

    };
  
    const [showMessage, setShowMessage] = useState(false);

    
  return (
    <div className="d-flex col-12 row carrito-banner justify-content-center">
      <Helmet>
        <title>Pedidos</title>
      </Helmet>
      <div className="card col-lg-8 col-md-10 col-sm-10 mt-5 shadow-lg rounded-2 bordeCarta fondo-CardCarrito">
        <h4 className="mt-3 mb-3 text-center  white-star-carta">Orden de pedido</h4>
        <div className="table-container text-center" style={{ maxHeight: "550px", overflowY: "auto" }}>
          <table className="col-12 justify-content-around mb-3">
            <thead className="">
              <tr className="">
                <th className="bg-transparent bordeTituloCarrito">ID</th>
                <th className="bg-transparent bordeTituloCarrito">Producto</th>
                <th className="bg-transparent bordeTituloCarrito">Precio</th>
                <th className="bg-transparent bordeTituloCarrito"></th>
                <th className="bg-transparent bordeTituloCarrito">Quitar</th>
                <th className="bg-transparent bordeTituloCarrito">Agregar</th>
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
      <Modal className='col-12' show={showMessage} onHide={() => setShowMessage(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Le Forky</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Pedido Encargado!
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-success' onClick={() => setShowMessage(false)} >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>




      <div className="card col-sm-10 col-md-6 col-lg-6 botonesCarrito align-items-center justify-content-around mx-auto mt-3 mb-5">
        <h5 className="card-title mt-2">Total a Pagar: ${totalAPagar}</h5>
        <a href="/home" className="btn bg-verde-total button-hover mb-3 col-md-6">Seguir ordenando</a>
        <button onClick={handleFinalizarPedido} className="btn btn-outline-success button-hover mb-3 col-md-6">
          Finalizar pedido
        </button>
      </div>
      <footer className="bg-dark text-light pt-5 pb-2 mt-5 text-center ">
        <div className=' col-lg-12 row'>
          <div className='col-lg-4 col-md-12 col-sm-12'>
          <p>Dirección: Congreso de Tucumán 141, San Miguel de Tucumán, Tucumán </p>
          <p>Horarios de atención: Lun a Dom de 11:30-16:00 hs. | 19:00-1:00 hs.</p>
          </div>
          <div className='col-lg-4 col-md-12 col-sm-12'>
          <p>LOGO</p>
          </div>
          <div className='col-lg-4 col-md-12 col-sm-12'>
          <p>Contacto: <a href="tel:03815958693" className='link-color'>0381-5958693</a></p>
          <p>Email: <a href="mailto:info@leforky.com.ar" className='link-color'>info@leforky.com.ar</a></p>
          <p>Instagram: <a href="https://www.instagram.com/francoamado7/" className='link-color' target="_blank" rel="noopener noreferrer">@francoamado7</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Carrito;

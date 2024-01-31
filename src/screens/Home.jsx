
import { set, useForm } from 'react-hook-form';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth, AuthProvider } from '../contexts/AuthContex.jsx';
import { listarMenuRequest } from '../api/auth';
import { listarCarritoRequest } from '../api/auth';
import { Helmet } from 'react-helmet';
import { Modal, Button } from 'react-bootstrap';
import LogoComponent from './Logo.jsx';



function CartaMenu() {
  const [carrito, setCarrito] = useState([]);
  const { handleSubmit, formState: { errors } } = useForm();
  const { isAuthenticated, logOut, user } = useAuth();
  const [listaMenu, setlistaMenu] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [id, setid] = useState();
  const [username, setUsername] = useState();
  const [total, setTotal] = useState(0);

  const handleAddToCart = (item, username, id) => {
    const savedCart = localStorage.getItem('cart');
    let existingCart = savedCart ? JSON.parse(savedCart) : { id, username, items: [], total: 0 };
  
    const existingItemIndex = existingCart.items.findIndex(existingItem => existingItem._id === item._id);
  
    if (existingItemIndex !== -1) {
      existingCart.items[existingItemIndex].cantidad += 1;
    } else {
      // Si es un nuevo artículo, agrégalo con cantidad 1
      item.cantidad = 1;
      existingCart.items.push(item);
    }

    existingCart.total = existingCart.items.reduce((acc, currentItem) => acc + currentItem.precioMenu * currentItem.cantidad, 0);

    localStorage.setItem('cart', JSON.stringify(existingCart));
    setTotal(existingCart.total);

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  
    

  };
  const [showMessage, setShowMessage] = useState(false);
  

  useEffect(()=>{

    async function listadeMenus(){
      try {
            const listadeM = await listarMenuRequest()      
            setlistaMenu(listadeM.data)
            setUsername(user.username)
            setid(user.id)
           } catch (error) {
            console.log(error.data)
           }
        }
        listadeMenus()
    },[])



 




  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setSelectedItems(JSON.parse(savedCart));
    }
  }, []);

  

  return (
    <div className=' align-items-center carta-banner col-12 '>
      <div className='row col-12  justify-content-center carta-logo-fondo'>
      <LogoComponent/>
      </div>
      
      <Helmet>
        <title>Le Forky</title>
      </Helmet>
      {/* <div className='col-12 justify-content-center d-flex'>
        {(!isAuthenticated) ? (
          <div className=" text-center alert alert-danger" role="alert">Tienes que iniciar sesión para poder encargar</div>
        ) : null}
      </div> */}
      
      <Modal className='col-12' show={showMessage} onHide={() => setShowMessage(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Le Forky</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        ¡Producto agregado al Pedido
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-success' onClick={() => setShowMessage(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <section>
        
        <div className='container '>
          <div className='bordeCarta white-star-carta mt-5 justify-content-center d-flex '>
            <div className='col-lg-12 col-sm-12  row'>
              <h1 className='text-center mb-3 mt-3 '>Platos</h1>
              <div className='Card rounded-4 col-12 justify-content-center d-flex  '>
                <ul className="list-group c d-flex flex-wrap px-5 col-12 justify-content-between">
                  {listaMenu.map((elemento, index) => (
                    elemento.categoriaMenu === "Platos" && (
                      <li className="list-group-item fondo-CardPlato mb-4" key={index}>
                        <div className=" d-flex w-100 justify-content-between">
                          <h5 className="mb-1 fuente-nombrePlato">{elemento.tituloMenu}</h5>
                          <small className='fuente-PrecioPlato'>${elemento.precioMenu}</small>
                        </div>
                        <div className="d-flex w-100 justify-content-between mb-3 mt-3">
                          <p className="mb-1 fuente-descripcionPlato">{elemento.descripcionMenu}</p>
                          <small>
                            
                            {(isAuthenticated && user.rol === 'user') ? (
                              <button
                                type="button"
                                className="btn bg-verde-total button-hover"
                                onClick={() => handleAddToCart(elemento, username, id)}
                                id="liveToastBtn"
                              >Agregar
                              </button>
                              
                              
                            ) : null}
                          </small>
                          <div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <img src="..." class="rounded me-2" alt="..." />
      <strong class="me-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      Hello, world! This is a toast message.
    </div>
  </div>
</div>
                        </div>
                      </li>
                      
                    )
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    


      <br />
      <section>
        <div className='container '>
          <div className='bordeCarta white-star-carta mt-5 justify-content-center d-flex'>
            <div className='col-lg-12 col-sm-12  '>
              <h1 className='text-center mb-3 mt-3 '>Postres</h1>
              <div className='Card rounded-4 col-12 justify-content-center d-flex  '>
                <ul className="list-group c d-flex flex-wrap px-5 col-12 justify-content-between">
                  {listaMenu.map((elemento, index) => (
                    elemento.categoriaMenu === "Postres" && (
                      <li className="list-group-item fondo-CardPlato mb-4" key={index}>
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1 fuente-nombrePlato">{elemento.tituloMenu}</h5>
                          <small className='fuente-PrecioPlato'>${elemento.precioMenu}</small>
                        </div>
                        <div className="d-flex w-100 justify-content-between mb-3 mt-3">
                          <p className="mb-1 fuente-descripcionPlato">{elemento.descripcionMenu}</p>
                          <small>
                            {/* Mostrar botón solo si no es admin */}
                            {(isAuthenticated && user.rol === 'user') ? (
                              <button
                                type="button"
                                className="btn bg-verde-total button-hover"
                                onClick={() => handleAddToCart(elemento, username, id)}
                              >Agregar
                              </button>
                            ) : null}
                          </small>
                        </div>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <section>
        <div className='container '>
          <div className='bordeCarta white-star-carta mt-5 justify-content-center d-flex'>
            <div className='col-lg-12 col-sm-12  '>
              <h1 className='text-center mb-3 mt-3 '>Bebidas</h1>
              <div className='Card rounded-4 col-12 justify-content-center d-flex  '>
                <ul className="list-group c d-flex flex-wrap px-5 col-12 justify-content-between">
                  {listaMenu.map((elemento, index) => (
                    elemento.categoriaMenu === "Bebidas" && (
                      <li className="list-group-item fondo-CardPlato mb-4" key={index}>
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1 fuente-nombrePlato">{elemento.tituloMenu}</h5>
                          <small className='fuente-PrecioPlato'>${elemento.precioMenu}</small>
                        </div>
                        <div className="d-flex w-100 justify-content-between mb-3 mt-3">
                          <p className="mb-1 fuente-descripcionPlato">{elemento.descripcionMenu}</p>
                          <small>
                            {/* Mostrar botón solo si no es admin */}
                            {(isAuthenticated && user.rol === 'user') ? (
                              <button
                                type="button"
                                className="btn bg-verde-total button-hover"
                                onClick={() => handleAddToCart(elemento, username, id)}
                              >
                                Agregar
                              </button>
                            ) : null}
                          </small>
                        </div>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-white text-light pt-5 pb-4 mt-3 text-center ">
        <div className=' col-lg-12 row justify-content-around'>
          <div className='col-lg-4 text-center col-md-12 col-sm-12'>
          <p className='footer-home-letra'>Dirección: Congreso de Tucumán 141, San Miguel de Tucumán, Tucumán </p>
          <p className='footer-home-letra'>Horarios de atención: Lun a Dom de 11:30-16:00 hs. | 19:00-1:00 hs.</p>
          </div>
          <div className='col-lg-4 col-md-12 col-sm-12'>
          <LogoComponent/>
          </div>
          <div className='col-lg-3 col-md-12 col-sm-12'>
          <p className='footer-home-letra'>Contacto: <a href="tel:03815958693" className='link-color'>0381-5958693</a></p>
          <p className='footer-home-letra'>Email: <a href="mailto:info@leforky.com.ar" className='link-color'>info@leforky.com.ar</a></p>
          <p className='footer-home-letra'>Instagram: <a href="https://www.instagram.com/francoamado7/" className='link-color' target="_blank" rel="noopener noreferrer">@francoamado7</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CartaMenu;


import { set, useForm } from 'react-hook-form';
import { Button } from 'bootstrap';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth, AuthProvider } from '../contexts/AuthContex.jsx';
import { listarMenuRequest } from '../api/auth';
import { listarCarritoRequest } from '../api/auth';
import { Helmet } from 'react-helmet';
import Alert from 'bootstrap';




function CartaMenu ()  {
  
  const [carrito, setCarrito] = useState([]);
  const {handleSubmit,formState:{errors},} = useForm()
  const {isAuthenticated,logOut,user} = useAuth()
  const [listaMenu,setlistaMenu] =  useState([])
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [id,setid] = useState()
  const [username,setUsername] = useState()
  const [total, setTotal] = useState(0);


  const handleAddToCart = (item, username, id) => {
    const savedCart = localStorage.getItem('cart');
    let existingCart = savedCart ? JSON.parse(savedCart) : { id, username, items: [], total: 0 };
  
    const existingItemIndex = existingCart.items.findIndex(existingItem => existingItem._id === item._id);
  
    if (existingItemIndex !== -1) {
      // Si el artículo ya existe, aumenta la cantidad
      existingCart.items[existingItemIndex].cantidad += 1;
    } else {
      // Si es un nuevo artículo, agrégalo con cantidad 1
      item.cantidad = 1;
      existingCart.items.push(item);
    }
  
    existingCart.total = existingCart.items.reduce((acc, currentItem) => acc + currentItem.precioMenu * currentItem.cantidad, 0);
  
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setTotal(existingCart.total);
  };
  

  useEffect(()=>{

    async function listadeMenus(){
      try {
            const listadeM = await listarMenuRequest()      
            setlistaMenu(listadeM.data)
           } catch (error) {
            console.log(error.data)

           }
        }
        listadeMenus()
    },[])






    const agregarAlCarrito = (elemento) => {
      // Copiar el pedido actual y agregar el nuevo elemento
      const nuevoCarrito = [...carrito, elemento];
      
      // Actualizar el estado del pedido
      setCarrito(nuevoCarrito);
      setShowAlert(true);
      // Ocultar el alert después de 3 segundos (puedes ajustar este tiempo)
      setTimeout(() => {
      setShowAlert(false);
        }, 3000);
      // Guardar en localStorage
      localStorage.setItem('pedido', JSON.stringify(nuevoCarrito));
    };




    useEffect(() => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setSelectedItems(JSON.parse(savedCart));
      }
    }, []);

    


  return (
    
    <div className='row align-items-center carta-banner'>
    <div>
  
        <Helmet>
        <title>Le Forky</title>
      </Helmet>
        <section>
          {(isAuthenticated && user.rol !== 'admin' || 'user') ? (
          <div className="alert alert-success">Tienes que iniciar sesion para poder encargar</div>
          ):null}
          
        <div class="card fondo-CardPlato text-center" >
          {/* <img src="..." class="card-img-top" alt="..." /> */}
            <div class="card-body">
            <h5 class="card-title carta-home-titulo"> Le Forky</h5>
            <p class="card-text carta-home-titulo"> Los mejores Platos</p>
            </div>
            </div>
        </section>
        <section>
          <div className='container '>
            <div className='bordeCarta white-star-carta mt-5 justify-content-center d-flex '>
              <div className='col-lg-12 col-sm-12  '>
                <h1 className='text-center mb-3 mt-3 '>Platos</h1>
                <div className='Card rounded-4 col-12 justify-content-center d-flex  '>
                  <ul className="list-group c d-flex flex-wrap px-5 col-12 justify-content-between">
                    {listaMenu.map((elemento, index) => (
                         elemento.categoriaMenu === "Platos" && (
                      <li className="list-group-item  fondo-CardPlato mb-4" key={index}>
                        <div  className=" d-flex w-100 justify-content-between">
                          <h5 className="mb-1 fuente-nombrePlato">{elemento.tituloMenu}</h5>
                          <small className='fuente-PrecioPlato'>${elemento.precioMenu}</small>
                        </div>
                        <div className="d-flex w-100 justify-content-between mb-3 mt-3">
                          <p className="mb-1 fuente-descripcionPlato">{elemento.descripcionMenu}</p>
                          <small>
                            {!isAuthenticated || (isAuthenticated && user.rol === 'user') ? (
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
                              {!isAuthenticated || (isAuthenticated && user.rol === 'user') ? (
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
        {!isAuthenticated || (isAuthenticated && user.rol === 'user') ? (
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
        </div>  
        <footer className="bg-dark text-light pt-5 pb-4">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ea vero quo dolor dolorum, commodi at excepturi eum eaque tempora minima itaque culpa, perferendis iste nostrum ipsa, eveniet adipisci nihil!</p>
        </footer>
      </div>  
      

    
    )
};

export default CartaMenu
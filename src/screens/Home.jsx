
import {  useForm } from 'react-hook-form';

import React, { useState, useEffect } from "react";

import { useAuth, AuthProvider } from '../contexts/AuthContex.jsx';
import { listarMenuRequest } from '../api/auth';

import { Helmet } from 'react-helmet';





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

    console.log(existingCart)
    const existingItemIndex = existingCart.items.findIndex(existingItem => existingItem.idmenu === item._id.toString());

    if (existingItemIndex !== -1) {
      // Si el artículo ya existe, aumenta la cantidad
      existingCart.items[existingItemIndex].cantidad += 1;
    } else {
      // Si es un nuevo artículo, agrégalo con cantidad 1
      const newItem = {
        idmenu: item._id.toString(),
        tituloMenu: item.tituloMenu,
        categoriaMenu: item.categoriaMenu,
        precioMenu: item.precioMenu,
        cantidad: 1
      };
      existingCart.items.push(newItem);
    }

    existingCart.total = existingCart.items.reduce((acc, currentItem) => acc + currentItem.precioMenu * currentItem.cantidad, 0);

    localStorage.setItem('cart', JSON.stringify(existingCart));
    setTotal(existingCart.total);
    console.log(existingCart);
};

  useEffect(()=>{

    async function listadeMenus(){
      try {
            const listadeM = await listarMenuRequest()      
            setlistaMenu(listadeM.data)
            
            setUsername(user.username)
            setid(user._id)
            console.log(user._id)
            console.log(user.username)

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
    
    <div className='row align-items-center carta-banner col-12'>
    
  
        <Helmet>
        <title>Le Forky</title>
      </Helmet>
        <section>
          {(!isAuthenticated) ? (
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
        
        <footer className="bg-dark text-light pt-5 pb-4">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ea vero quo dolor dolorum, commodi at excepturi eum eaque tempora minima itaque culpa, perferendis iste nostrum ipsa, eveniet adipisci nihil!</p>
        </footer>
      </div>  
      

    
    )
};

export default CartaMenu
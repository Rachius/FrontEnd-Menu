
import { useForm } from 'react-hook-form';
import { Button } from 'bootstrap';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContex';
import { listarMenuRequest } from '../api/auth';
import { listarCarritoRequest } from '../api/auth';
import { Helmet } from 'react-helmet';
import Alert from 'bootstrap';





function CartaMenu ()  {
  const [carrito, setCarrito] = useState([]);
  const {handleSubmit,formState:{errors},} = useForm()
  const [listaMenu,setlistaMenu] =  useState([])
  const [showAlert, setShowAlert] = useState(false);
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





  return (
    

    <div className='row align-items-center carta-banner'>
      
        <Helmet>
        <title>Le Forky</title>
      </Helmet>
        <section>
        
        <div class="card fondo-CardPlato text-center" >
          {/* <img src="..." class="card-img-top" alt="..." /> */}
            <div class="card-body">
            <h5 class="card-title carta-home-titulo"> Le Forky</h5>
            <p class="card-text carta-home-titulo"> Los mejores Platos</p>
            </div>
        </div>
        <div>
        <a href="#" class="btn btn-primary"> Iniciar Pedido</a>
        </div>

        </section>
        <section>
          <div className='container '>
            <div className='bordeCarta white-star-carta mt-5 justify-content-center d-flex'>
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
                          <button type="button" className="btn bg-verde-total button-hover" onClick={() => agregarAlCarrito(elemento)}>Agregar
                          </button>
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
                          <button type="button" className="btn bg-verde-total button-hover" onClick={() => agregarAlCarrito(elemento)}>Agregar
                          </button>
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
                          <button type="button" className="btn bg-verde-total button-hover" onClick={() => agregarAlCarrito(elemento)}>Agregar
                          </button>
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
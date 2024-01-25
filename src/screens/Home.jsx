
import { useForm } from 'react-hook-form';
import { Button } from 'bootstrap';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContex';
import { listarMenuRequest } from '../api/auth';
import { listarCarritoRequest } from '../api/auth';





function CartaMenu ()  {
  const {handleSubmit,formState:{errors},} = useForm()
  const [listaMenu,setlistaMenu] =  useState([])
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

  return (
    

    <div className='row align-items-center carta-banner'>
        <section>
        
        <div class="card fondo-CardPlato text-center" >
          <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
            <h5 class="card-title carta-home-titulo"> El restaurante </h5>
            <p class="card-text"></p>
            <a href="#" class="btn btn-primary"> Go somewhere</a>
            </div>
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
                         elemento.tituloMenu === "MenuCriminal" && (
                      <li className="list-group-item  fondo-CardPlato mb-4" key={index}>
                        <div  className=" d-flex w-100 justify-content-between">
                          <h5 className="mb-1 fuente-nombrePlato">{elemento.tituloMenu}</h5>
                          <small className='fuente-PrecioPlato'>${elemento.precioMenu}</small>
                        </div>
                        <div className="d-flex w-100 justify-content-between mb-3 mt-3">
                          <p className="mb-1 fuente-descripcionPlato">{elemento.descripcionMenu}</p>
                          <small>
                            <button type="submit" className="btn bg-verde-total button-hover">Agregar</button>
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
                <h1 className='text-center mb-3 mt-3 '>Platos</h1>
                <div className='Card rounded-4 col-12 justify-content-center d-flex  '>
                  <ul className="list-group c d-flex flex-wrap px-5 col-12 justify-content-between">
                      {listaMenu.map((elemento, index) => (
                         elemento.tituloMenu === "MenuCriminales" &&  (
                      <li className="list-group-item fondo-CardPlato mb-4" key={index}>
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1 fuente-nombrePlato">{elemento.tituloMenu}</h5>
                          <small className='fuente-PrecioPlato'>${elemento.precioMenu}</small>
                        </div>
                        <div className="d-flex w-100 justify-content-between mb-3 mt-3">
                          <p className="mb-1 fuente-descripcionPlato">{elemento.descripcionMenu}</p>
                          <small>
                            <button type="submit" className="btn bg-verde-total button-hover">Agregar</button>
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
                <h1 className='text-center mb-3 mt-3 '>Platos</h1>
                <div className='Card rounded-4 col-12 justify-content-center d-flex  '>
                  <ul className="list-group c d-flex flex-wrap px-5 col-12 justify-content-between">
                    {listaMenu.map((elemento, index) => (
                         elemento.tituloMenu === "primer menu" && (
                      <li className="list-group-item fondo-CardPlato mb-4" key={index}>
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1 fuente-nombrePlato">{elemento.tituloMenu}</h5>
                          <small className='fuente-PrecioPlato'>${elemento.precioMenu}</small>
                        </div>
                        <div className="d-flex w-100 justify-content-between mb-3 mt-3">
                          <p className="mb-1 fuente-descripcionPlato">{elemento.descripcionMenu}</p>
                          <small>
                            <button type="submit" className="btn bg-verde-total button-hover">Agregar</button>
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
      
    </footer>

      </div>
  

//     <div className='d-flex justify-content-around conteiner-fluid carta-fondo'>      
    
//       {/* <div className='mt-5 col-6'>
//       <h4>Lista de Menus</h4>
//       <br />
//       <form>
//         <table className="table">
//           <thead>
//             <tr>
//               <th scope="col">ID</th>
//               <th scope="col">Menú</th>
//               <th scope="col">Categoria</th>
//               <th scope="col">Descripcion</th>
//               <th scope="col">Precio</th>
//               <th scope="col">Estado</th>
//             </tr>
//           </thead>
//           <tbody>
//             {listaMenu.map((elemento, index) => (
//               <tr key={index}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{elemento.tituloMenu}</td>
//                 <td>{elemento.categoriaMenu || 'N/A'}</td>
//                 <td>{elemento.descripcionMenu}</td>
//                 <td>{elemento.precioMenu}</td>
//                 <td>
//                   <div className="form-check form-switch">
//                     <input
//                       className="form-check-input"
//                       type="checkbox" role="switch"
//                       id={`flexSwitchCheckDefault_${index}`}
//                       checked={elemento.estado}
//                       readOnly
//                     />
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </form>
//     </div> */}
    
// {/*     
//     <div className='justify-content-center col-4 mt-5 card formulario-fondo '>
//         <div className='bordeCarta '>
//             <div class="card-header card-headerCarta  ">
//                 Platos
//             </div>
//             <div className='Card rounded-4 '>
//                 <ul className="list-group list-group-flush bg-yellow rounded">
//             {listaMenu.map((elemento, index) => (
//                 <li class="list-group-item" key={index}>
//                 <div class="d-flex w-100 justify-content-between">
//                     <h5 class="mb-1">{elemento.tituloMenu}</h5>
//                     <small>{elemento.precioMenu}</small>
//                 </div>
//                 <div class="d-flex w-100 justify-content-between">
//                     <p class="mb-1">{elemento.descripcionMenu}</p>
//                 </div>
//                 <div class="d-flex w-100 justify-content-between">
//                     <small>
//                     <button type="submit" className="btn bg-verde-total button-hover mb-5">Agregar al pedido</button>
//                     </small>
//                 </div>
//                 </li>
//             ))}
//             </ul>
//         </div>
//         </div>
//         </div>


//         <div className='justify-content-center col-4 mt-5'>
//         <div class="card">  
//             <div class="card-header">
//                 Platos
//             </div>
//         <ul class="list-group list-group-flush">
//             {listaMenu.map   ((elemento, index) => (
//             <li class="list-group-item" key={index}>
//             <div class="d-flex w-100 justify-content-between">
//             <h5 class="mb-1">{elemento.tituloMenu}</h5>
//             <small>{elemento.categoriaMenu || 'N/A'}</small>
//             </div>
//             <p class="mb-1">{elemento.descripcionMenu}</p>
//             <small>{elemento.precioMenu}</small>
//             </li>
//             ))}
//         </ul>
//             </div>
//         </div> */}


//     </div>



    
    )
};

export default CartaMenu
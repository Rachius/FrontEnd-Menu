

import { useForm } from 'react-hook-form';
import { Button } from 'bootstrap';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContex';
import { listarMenuRequest } from '../api/auth';



function EditMenu ()  {
  const {register,handleSubmit,formState:{errors},} = useForm()
  const [listaMenu,setlistaMenu] =  useState([])
  const {crearMenu,listarMn,isAuthenticated,errors:RegisterErrors} = useAuth()
  const navigate = useNavigate()
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
  
  const onSubmit = handleSubmit(async (values) => {
    crearMenu(values)
    
    })
  

  return (
    
    <div className='d-flex justify-content-between conteiner-fluid'>Home
      <br />
      <br />
      
      <div className='justify-content-left col-5'>   
                                  <h4>Lista de Menus</h4>
                                  <br />                                
                                  <form>        
                                  <table class="table">
                            <thead>
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Menú</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Estado</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">1</th>
                                <td>Menú1</td>
                                <td>Plato1</td>
                                <td>Precio1</td>
                                <td><div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" /></div></td>
                              </tr>
                              <tr>
                                <th scope="row">2</th>
                                <td>Menú1</td>
                                <td>Plato1</td>
                                <td>Precio1</td>
                                <td><div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" /></div></td>
                              </tr>

                            </tbody>
                   </table>
                </form>
                                 
          </div>
        
     
          
          <div className="text-center col-sm-12 col-lg-6 mx-auto pb-5 pt-1">
                <div className=''>
                <h3 className='negrita-color-negro mt-2'>Editar Menu</h3>
                <br />
                
                </div>
                <div className='bordered d-flex justify-content-center col-sm-10 mx-auto'>
                      {RegisterErrors.map((error, i)=> (
                      <div className='bg-red-500 p-2'key={i}>{error}
                      </div>))}
                      <form onSubmit={onSubmit} noValidate>

                      <div class="mb-3 needs-validation px-5" noValidate>
                        <label for="InputNameReg" className="form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Ingrese el ID del menú a editar</label>
                        <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('_id', { required: false })} />
                        {errors._id && <p className='text-red-500'>Id is required</p>}
                        </div>
                        <div class="mb-3 needs-validation px-5" noValidate>
                        <label for="InputNameReg" className="form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Nombre del menu</label>
                        <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('tituloMenu', { required: true })} />
                        {errors.tituloMenu && <p className='text-red-500'>Nombre is required</p>}
                        </div>
                      
                        
                        <div class="mb-3 px-5">
                        <label for="InputNameReg" className="form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Descripción</label>
                        <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp"  {...register('descripcionMenu', { required: true })}/>
                        {errors.descripcionMenu && <p className='text-red-500'>Descripción is required</p>}
                        </div>
                        <div class="mb-3 px-5">
                        <label for="InputNameReg" className="form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Categoria</label>
                        <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp"{...register('categoriaMenu', { required: true })}/>
                        {errors.categoriaMenu && <p className='text-red-500'>Categoria is required</p>}

                        </div>
                        <div class="mb-3 px-5">
                        <label for="InputNameReg" className="form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Precio</label>
                        <input type="number" className="form-control" id="InputNameReg" aria-describedby="nameregHelp"{...register('precioMenu', { required: true })}/>
                        {errors.precioMenu && <p className='text-red-500'>Precio is required</p>}

                        </div>

                        <div>         
                   
                        <button type="submit" class="btn btn-success mb-3 m-1">Crear</button>
                        <button type="submit" class="btn btn-warning mb-3 m-1">Editar</button>
                        <button type="submit" class="btn btn-danger mb-3 m-1">Eliminar</button>
                        </div>
                        
                      </form>
                      
                    </div>
     
     
                </div>



          </div>
      
  
  )
};

export default EditMenu
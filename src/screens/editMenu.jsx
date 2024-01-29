

import { useForm } from 'react-hook-form';
import { Button } from 'bootstrap';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContex';
import { listarMenuRequest } from '../api/auth';
import { Helmet } from 'react-helmet';

function EditMenu ()  {
  const {register,handleSubmit,formState:{errors},} = useForm()
  const [listaMenu,setlistaMenu] =  useState([])
  const {crearMenu,menuEdit,isAuthenticated,errors:RegisterErrors} = useAuth()
  const [editTitulo,setTituloEdit] = useState()
  const [editDescripcion,setDescripcionEdit] = useState()
  const [editCategoria,setCategoriaEdit] = useState()
  const [editEstado,setEstadoEdit] = useState()
  const [editPrecio,setPrecioEdit] = useState()
  const [editingUserId, setEditingUserId] = useState(null);
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

    const handleEditarUsuario =  (elemento) => {
      try { 
        setEditingUserId(elemento._id)
        setTituloEdit(elemento.tituloMenu)
        setDescripcionEdit(elemento.descripcionMenu)
        setCategoriaEdit(elemento.categoriaMenu)
        setEstadoEdit(elemento.estado)
        setPrecioEdit(elemento.precioMenu)
      
    
        console.log(elemento)
      } catch (error) {
        console.log(error)
      }
  
  
  
    };

    const onSubmit = handleSubmit(async (values) => {
      const cleanedValues = Object.entries(values).reduce((acc, [key, value]) => {
        if (value !== "") {
          acc[key] = value;
        }
        return acc;
      }, {});
    
      if (editingUserId) {
        menuEdit(cleanedValues, editingUserId);
        // Realizar la lógica de edición (por ejemplo, llamar a handleGuardarCambios)
      } else {
        crearMenu(values);
        // Realizar la lógica de registro (por ejemplo, llamar a admSignup)
      }
    });
  


  return (
    
    <div className='d-flex justify-content-between conteiner-fluid'>
      <br />
      <br />
      
      <div className='justify-content-left col-7'>
      <Helmet>
      <h4>Lista de Menus</h4>
      </Helmet>
      <br />
      <form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Menú</th>
              <th scope="col">Categoria</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Precio</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {listaMenu.map((elemento, index) => (
   <tr key={elemento._id} data-id={elemento._id}>
   <th scope="row">{elemento._id}</th>
                <td>{elemento.tituloMenu}</td>
                <td>{elemento.categoriaMenu || 'N/A'}</td>
                <td>{elemento.descripcionMenu}</td>
                <td>{elemento.precioMenu}</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox" role="switch"
                      id={`flexSwitchCheckDefault_${index}`}
                      checked={elemento.estado}
                      readOnly
                    />
                  </div>
                </td>
                <td>
                    {editingUserId === elemento._id ? (
                      <>
                        {/* <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => handleGuardarCambios(elemento)}
                        >
                          Guardar
                        </button>
                        
 */}
                         <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => setEditingUserId(null)}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => handleEditarUsuario(elemento)}
                      >
                        Editar
                      </button>
                    )}
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
        
    
                <div className=''>
                {editingUserId ? (<> 
                      <div className="text-center col-sm-12 col-lg-6 mx-auto pb-5 pt-1">
                
         

                
                          
                              <h3 className='negrita-color-negro mt-2'>Editar Menu</h3>
                                <br />
                
                      </div>
                        <div className='bordered d-flex justify-content-center col-sm-10 mx-auto'>
                      {RegisterErrors.map((error, i)=> (
                      <div className='bg-red-500  justify-content-center'key={i}>{error}
                      </div>))}
                      <form onSubmit={onSubmit} noValidate>

                      <div class="mb-3 needs-validation px-5" noValidate>
                        <label for="InputNameReg" className="form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Ingrese el ID del menú a editar</label>
                        <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('_id', { required: false })} />
                        {errors._id && <p className='text-red-500'>Id is required</p>}
                        </div>
                        <div class="mb-3 needs-validation px-5" noValidate>
                        <label for="InputNameReg" className="form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Nombre del menu</label>
                        <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('tituloMenu', { required: false })} defaultValue={editTitulo} />
                        {errors.tituloMenu && <p className='text-red-500'>Nombre is required</p>}
                      </div>
                      
                        
                        <div class="mb-3 px-5">
                        <label for="InputNameReg" className="form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Descripción</label>
                        <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp"  {...register('descripcionMenu', { required: false })} defaultValue={editDescripcion}/>
                        {errors.descripcionMenu && <p className='text-red-500'>Descripción is required</p>}
                        </div>
                        <div class="mb-3 px-5">
                        <label for="InputNameReg" className="form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Categoria</label>
                        <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp"{...register('categoriaMenu', { required: false })} defaultValue={editCategoria}/>
                        {errors.categoriaMenu && <p className='text-red-500'>Categoria is required</p>}

                        </div>
                        <div class="mb-3 px-5">
                        <label for="InputNameReg" className="form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Precio</label>
                        <input type="number" className="form-control" id="InputNameReg" aria-describedby="nameregHelp"{...register('precioMenu', { required: false })}defaultValue={editPrecio}/>
                        {errors.precioMenu && <p className='text-red-500'>Precio is required</p>}

                        </div>

                        <div className="form-check form-switch">
  <label htmlFor="InputEstado" className="form-label">
    Estado
  </label>
  <input
    className="form-check-input"
    type="checkbox"
    id="InputEstado"
    checked={editEstado}
    {...register('estado', { required: false })}
    onChange={(e) => setEstadoEdit(e.target.value === 'true')}
  />
  {errors.estado && <p className='text-red-500'>estado es requerido</p>}
</div>
                        <div>         
                   
                        <button type="submit" class="btn btn-warning mb-3 m-1">Editar</button>
                        </div>
                        
                      </form>
                     
                    </div>
                    </>) : (<> 
                      <div className="text-center col-sm-12 col-lg-6 mx-auto pb-5 pt-1">
                
         

                
                          
                              <h3 className='negrita-color-negro mt-2'>Crear Menu</h3>
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

                        </div>
                        
                      </form>
                     
                    </div>
                    
                    </>)  }
     
                </div>
                


          </div>
    
          
  
  )
};

export default EditMenu
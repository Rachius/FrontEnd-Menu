import React, { useState } from 'react';
import {useForm} from 'react-hook-form'
import { Button } from 'bootstrap';
import Registro from './Registro';
import { useAuth } from '../contexts/AuthContex';
import { useEffect } from 'react';
import {  useNavigate, Link } from 'react-router-dom';
import { listarUsuariosRequest } from '../api/auth';
  


function EditUsuario() {

  const {register,handleSubmit,formState:{errors},} = useForm()
  const {admSignup,admEdit,isAuthenticated,errors:RegisterErrors} = useAuth()
  const [editandoUsuario, setEditandoUsuario] = useState(null);
  const [listaUsuario,setlistaUsuario] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    async function listaDeUsuarios(){
        
      try {
            const listadeU = await listarUsuariosRequest()
            
            setlistaUsuario(listadeU.data)


           } catch (error) {
            console.log(error.data)

           }
        }
        listaDeUsuarios()
    },[])
  

/*  useEffect(()=>{
    if(isAuthenticated) navigate("/editUsuario")

  },[isAuthenticated])*/

  const handleGuardarCambios = async (values) => {
    admEdit(values)
  };



  const onSubmit = handleSubmit(async (values) => {
      admSignup(values)
      })




    return(
  <div>
      <div className='justify-content-left col-5'>   
                          
                                   <h4>Usuarios activos </h4>
                                   <br />
                                   
                                   <form onSubmit={(e) => {
    e.preventDefault();
    onSubmit(e);
}} noValidate>        
                                   <table class="table justify-content-center">
                             <thead>
                               <tr>
                                 <th scope="col">ID</th>
                                 <th scope="col">Usuario</th>
                                 <th scope="col">email</th>
                                 <th scope="col">rol</th>
                                 <th scope="col">Estado</th>
                               </tr>
                             </thead>
                             <tbody>
                             {listaUsuario.map((elemento) => (
  <tr key={elemento._id} data-id={elemento._id}>
    <th scope="row">{elemento._id}</th>
    <td>
      {editandoUsuario === elemento._id ? (
        <input
          type="text"
          value={elemento.username}
          onChange={(e) =>
            setlistaUsuario((prevLista) => {
              const nuevaLista = [...prevLista];
              const index = nuevaLista.findIndex((user) => user._id === elemento._id);
              nuevaLista[index].username = e.target.value;
              return nuevaLista;
            })
          }
        />
      ) : (
        elemento.username
      )}
    </td>
    <td>
      {editandoUsuario === elemento._id ? (
        <input
          type="text"
          value={elemento.email || ''}
          onChange={(e) =>
            setlistaUsuario((prevLista) => {
              const nuevaLista = [...prevLista];
              const index = nuevaLista.findIndex((user) => user._id === elemento._id);
              nuevaLista[index].email = e.target.value;
              return nuevaLista;
            })
          }
        />
      ) : (
        elemento.email
      )}
    </td>
    <td>{elemento.rol}</td>
    <td>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id={`flexSwitchCheckDefault_${elemento._id}`}
          checked={elemento.estado}
          readOnly
        />
      </div>
    </td>
    <td>
      {editandoUsuario === elemento._id ? (
        <button
          className="btn btn-primary"
          onClick={() => handleGuardarCambios(elemento._id)}
        >
          Guardar
        </button>
      ) : (
        <button
          className="btn btn-secondary"
          onClick={() => setEditandoUsuario(elemento._id)}
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
        
           <div className='d-flex  col-4 flex-wrap'>
             <div>
             <div class="d-flex justify-content-center">
         <div >
           <br />
           <br />
             <h3>Alta de usuario</h3>
             <br />
                    {RegisterErrors.map((error, i)=> (
                    <div className='bg-red-500 p-2'key={i}>
                      
                      {error}
                    </div>))}
                        
                  <form onSubmit={onSubmit} noValidate>
                           <div class="mb-3 needs-validation" noValidate>
                    <label for="InputNameReg" className="form-label">username</label>
                    <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('username', { required: true })} />
                    {errors.username && <p className='text-red-500'>Username es requerido</p>}
                  </div>
                  <div class="mb-3">
                    <label for="InputEmailReg" className="form-label">Email</label>
                    <input type="email" className="form-control" id="InputEmailReg" aria-describedby="emailregHelp" placeholder="usuario@correo.com" {...register('email', { required: true })}/>
                    {errors.email && <p className='text-red-500'>Email es requerido</p>}
                  
                  </div>
                  <div class="mb-3">
                    <label for="InputPasswordReg" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="InputPasswordReg" {...register('password', { required: true })}/>
                    {errors.password && <p className='text-red-500'>Contraseña es requerida</p>}
                    <span id="passwordHelpInline" className="form-text"></span>
                          
                  </div>
                 
                  <div>         
                  <button type="submit" className="btn btn-primary">Crear usuario</button>
                  
                  
                  </div>
                                
                  
                </form>
                
                </div>
            </div>
                      
                  </div>
                                 
                                        </div>
                                    
                                    </div> 
    
  
    )
    
  
  
  }
  
  export default EditUsuario

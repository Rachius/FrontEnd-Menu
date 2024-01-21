import React from 'react';
import {useForm} from 'react-hook-form'
import { Button } from 'bootstrap';
import Registro from './Registro';
import { useAuth } from '../contexts/AuthContex';
import { useEffect } from 'react';
import {  useNavigate, Link } from 'react-router-dom';
  


function EditUsuario() {

  const {register,handleSubmit,formState:{errors},} = useForm()
  const {signup,isAuthenticated,errors:RegisterErrors} = useAuth()
  const navigate = useNavigate()

/*  useEffect(()=>{
    if(isAuthenticated) navigate("/editUsuario")

  },[isAuthenticated])*/



  const onSubmit = handleSubmit(async (values) => {
      signup(values)
      })




    return(
  <div>
      <div className='justify-content-left col-5'>   
                          
                                   <h4>Usuarios activos </h4>
                                   <br />
                                   
                                   <form>        
                                   <table class="table justify-content-center">
                             <thead>
                               <tr>
                                 <th scope="col">ID</th>
                                 <th scope="col">Usuario</th>
                                 <th scope="col">Estado</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr>
                                 <th scope="row">1</th>
                                 <td>Usuario</td>
                            
                            
                                 <td><div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" /></div></td>
                               </tr>
                               <tr>
                                 <th scope="row">2</th>
                                 <td>Usuario</td>
                            
                            
                                 <td><div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" /></div></td>
                               </tr>
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
                    <label for="InputNameReg" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('username', { required: true })} />
                    {errors.username && <p className='text-red-500'>Nombre es requerido</p>}
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

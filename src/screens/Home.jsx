import React from 'react';
import {useForm} from 'react-hook-form'
import { Button } from 'bootstrap';
import Registro from './Registro';
import { useAuth } from '../contexts/AuthContex';
import { useEffect } from 'react';
import {  useNavigate, Link } from 'react-router-dom';



const Home = () => {

  const {register,handleSubmit,formState:{errors},} = useForm()
  const {signup,isAuthenticated,errors:RegisterErrors} = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    if(isAuthenticated) navigate("./Home")

  },[isAuthenticated])



  const onSubmit = handleSubmit(async (values) => {
      signup(values)
      })



  return (
    <div>
    {/* <div className='d-flex justify-content-between'>Home
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
        
      <div className='d-flex  col-4 flex-wrap'>
            <form>
             <h4>Editar Menu</h4>

              <div class="mb-3">
                <label  class="form-label">Ingrese el ID del menú a editar</label>
                <input type="email" class="form-control" id="exampleInputEmail1" />
                <div  class="form-text">Aqui puede ir algo</div>
              </div>
              
                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Nombre del menu</label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>

                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Descripción</label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>

                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Categoria</label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>


                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Precio</label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" class="btn btn-success mb-3">Crear</button>
                <button type="submit" class="btn btn-warning mb-3">Editar</button>
                <button type="submit" class="btn btn-danger mb-3">Eliminar</button>
                </form>

          </div>
          </div>
          <br />
          <br />

          <div className='d-flex justify-content-between'>
                <br />
                <br />
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
          
          </div> */}

          <p>principal</p>



      
    </div>
  )
};

export default Home




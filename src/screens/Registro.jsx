import React from 'react'
import {useForm} from 'react-hook-form'
import { useAuth } from '../contexts/AuthContex'
import { useEffect } from 'react'
import {  useNavigate,Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'



function Registro(){

  const {register,handleSubmit,formState:{errors},} = useForm()
  const {signup,isAuthenticated,errors:RegisterErrors} = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    if(isAuthenticated) navigate("/Home")

  },[isAuthenticated])



  const onSubmit = handleSubmit(async (values) => {
      signup(values)
      })

  return (
   
    <div className='d-flex justify-content-center bg-verde-blanco fondo-logReg  vh-100 '>
        <Helmet>
        <title>Registración</title>
      </Helmet>
          <div className='row-12 col-12'>
          <br />
          <div className="text-center col-sm-12 carta-titulo col-lg-6 bg-verde-claro mx-auto pb-5 pt-1">
                <div className=''>
                <h3 className='negrita-color-blanco mt-5'>Formulario de registración</h3>
                <br />
                </div>
                <div className='bordered d-flex justify-content-center col-sm-10 mx-auto'>
                      {RegisterErrors.map((error, i)=> (
                      <div className='bg-red-500 p-2'key={i}>{error}
                      </div>))}
                      <form onSubmit={onSubmit} noValidate>

                        <div class="mb-3 needs-validation px-5" noValidate>
                        <label for="InputNameReg" className="form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Nombre</label>
                        <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('username', { required: true })} />
                        {errors.username && <p className='text-red-500'>Userame is required</p>}
                        </div>
                        
                        <div class="mb-3 px-5">
                        <label for="InputEmailReg" className="form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Correo Electrónico</label>
                        <input type="email" className=" form-control form-group w-100" id="InputEmailReg" aria-describedby="emailregHelp" placeholder="usuario@correo.com" {...register('email', { required: true })}/>
                        {errors.email && <p className='text-red-500'>Email is required</p>}
                        </div>
                        <div class="mb-3 px-5">
                        <label for="InputPasswordReg" className="form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Contraseña</label>
                        <input type="password" className="form-control" id="InputPasswordReg" {...register('password', { required: true })}/>
                        {errors.password && <p className='text-red-500'>Password is required</p>}
                        <span id="passwordHelpInline" className="form-text">La contraseña ingresada debe tener como mínimo 6 caracteres</span>
                        </div>

                        <div>         
                        <button type="submit" className="btn bg-verde-total button-hover mb-3 ">Registrarse</button>
                        </div>
                        
                      </form>
                      
                    </div>
                    <br />
                        <div className='bg-blanco-total'>
                        <p>Estas a un paso de conocer los mejores sabores!</p>
                        <p>Si ya tenes cuenta <Link to="/login" className='bg-verde-total button-hover'>ingresa aquí</Link></p>
                        </div>
                </div>
           </div>
      </div>
  )
}

export default Registro
import React from 'react'
import {useForm} from 'react-hook-form'
import { useAuth } from '../context/authContext.jsx'
import { useEffect } from 'react'
import {  useNavigate, Link } from 'react-router-dom'



function Registro(){

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
      <div class="d-flex justify-content-center">
        <div >
          <br />
          <br />
            <h3>Formulario de registración</h3>
            <br />
        
              {RegisterErrors.map((error, i)=> (
              <div className='bg-red-500 p-2'key={i}>
                
                {error}
              </div>))}

           
            <form onSubmit={onSubmit} noValidate>

              <div class="mb-3 needs-validation" noValidate>
              <label for="InputNameReg" className="form-label">username</label>
              <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('username', { required: true })} />
              {errors.username && <p className='text-red-500'>Userame is required</p>}
            </div>
            <div class="mb-3">
              <label for="InputEmailReg" className="form-label">email</label>
              <input type="email" className="form-control" id="InputEmailReg" aria-describedby="emailregHelp" placeholder="usuario@correo.com" {...register('email', { required: true })}/>
              {errors.email && <p className='text-red-500'>Email is required</p>}
            
            </div>
            <div class="mb-3">
              <label for="InputPasswordReg" className="form-label">password</label>
              <input type="password" className="form-control" id="InputPasswordReg" {...register('password', { required: true })}/>
              {errors.password && <p className='text-red-500'>Password is required</p>}
              <span id="passwordHelpInline" className="form-text">Debe tener entre 8-20 characteres de largo.</span>
                    
            </div>
            {/* <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div> */}
            <div>         
            <button type="submit" className="btn btn-success">Submit</button>
            <p>
                Do you have an account? <Link to="/login">Sign in</Link>
                </p>
            
            </div>


            
            
          </form>
          
          </div>
      </div>
  )
}

export default Registro
import React from 'react'
import {useForm} from 'react-hook-form'
import { useAuth } from '../contexts/AuthContex'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Login (){
    const {register, handleSubmit,formState:{errors}} = useForm()
    const {signin,isAuthenticated,errors:signinErrors} = useAuth()
    const navigate = useNavigate()

    const onSubmit = handleSubmit((data)=> {
      signin(data)

    })
    useEffect(()=>{
      if(isAuthenticated) navigate("./Profile")
  
    },[isAuthenticated])



  return (
    <div>
      Loginasd
      <div className="d-flex justify-content-center">
        <div>
          <br />
          <br />
          <h3>Inicia sesión</h3>
          <br />
          {signinErrors.map((error, i)=> (
              <div className='bg-red-500 p-2'key={i}>
                
                {error}
              </div>))}

          <form onSubmit={onSubmit} noValidate>


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
    <button type="submit" className="btn btn-success"  >Submit</button>
    <p>
      Don't have an account? <Link to="/registro">Sign up</Link>
    </p>

</div>




</form>
        </div>
      </div>
    </div>
  );
}

  export default Login





















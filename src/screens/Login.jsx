import React, { Component } from 'react';
import { useForm } from 'react-hook-form'






function Login (){
    const {register, handleSubmit} = useForm()

    const onSubmit = handleSubmit((data)=> {
      console.log(data)

    })
 
  return (
    <div>
      Loginasd
      <div className="d-flex justify-content-center">
        <div>
          <br />
          <br />
          <h3>Inicia sesión</h3>
          <br />
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="InputEmailReg" className="form-label">
                Usuario
              </label>
              <input
                type="email"
                className="form-control"
                id="InputEmailReg"
                aria-describedby="emailregHelp"
                placeholder="usuario@correo.com"
                required
                {...register('email')}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputPasswordReg" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="InputPasswordReg"
                required
                {...register('password')}
              />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

  export default Login
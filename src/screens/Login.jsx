import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContex';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated, errors: signinErrors = [] } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
    console.log(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/Home");
  }, [isAuthenticated, navigate]);

  return (
    <div className='d-flex justify-content-center bg-verde-blanco fondo-logReg vh-100'>
      <div className='row-12 col-12'>
        <Helmet>
          <title>Iniciar Sesión</title>
        </Helmet>
        <br />
        <div className="text-center col-sm-12 col-lg-6 bg-verde-claro  carta-titulo  mx-auto pb-5 pt-1 ">
          <h3 className=' negrita-color-blanco mt-5 '>Iniciar sesión</h3>
          <br />
          <div className='bordered d-flex justify-content-center  col-sm-10  mx-auto'>
            {signinErrors.map((error, i) => (
              <div className='bg-red-500 p-2' key={i}>{error}</div>
            ))}
            <form className='form' onSubmit={onSubmit} noValidate>
              <div className="mb-5">
                <label htmlFor="InputEmailReg" className="form-label form-group mt-5 mb-3 justify-content-right d-flex negrita-color-negro">Correo Electrónico</label>
                <input type="email" className="form-control form-group w-100" id="InputEmailReg" aria-describedby="emailregHelp" placeholder="usuario@correo.com" {...register('email', { required: true })} />
                {errors.email && <p className='text-red-500'>Email is required</p>}
              </div>
              <div className="mb-5">
                <label htmlFor="InputPasswordReg" className="form-label form-group mt-5 mb-3 justify-content-right d-flex negrita-color-negro">Contraseña</label>
                <input type="password" className="form-control form-group w-100" id="InputPasswordReg" {...register('password', { required: true })} />
                {errors.password && <p className='text-red-500'>Password is required</p>}
                <span id="passwordHelpInline" className="form-text">Debe contener como mínimo 6 caracteres</span>
              </div>
              <div className='mb-5'>
                <button type="submit" className="btn bg-verde-total button-hover mb-5" >Ingresar</button>
              </div>
            </form>
          </div>
          <br />
          <div className='bg-blanco-total'>
            <p>Aun no tienes una cuenta? <Link to="/registro" className='bg-verde-total button-hover'>Registrate aquí</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

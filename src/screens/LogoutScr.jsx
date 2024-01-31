import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContex';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function LogoutScr() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated, errors: signinErrors = [] } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
    console.log(data);
  });

  
  return (
    <div className='d-flex justify-content-center bg-verde-blanco fondo-logReg align-items-center vh-100'>
      <div className='row  col-12'>
        <Helmet>
          <title>Le Fory</title>
        </Helmet>
        <br />
        <div className="text-center col-sm-10 bg-verde-claro  carta-titulo  mx-auto pb-5 pt-1 ">
            <h1>Muchas gracias por su visita!</h1>
            <Link to="/home" className="btn btn-success mt-3">
          Volver al inicio
        </Link>   
        </div>
      </div>
    </div>
  );
}

export default LogoutScr;

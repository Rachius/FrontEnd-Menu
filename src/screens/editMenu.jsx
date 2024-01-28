import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContex';
import { listarMenuRequest } from '../api/auth';
import { Helmet } from 'react-helmet';

function EditMenu() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [listaMenu, setlistaMenu] = useState([]);
  const { crearMenu, listarMn, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function listadeMenus() {
      try {
        const listadeM = await listarMenuRequest();
        setlistaMenu(listadeM.data);
      } catch (error) {
        console.log(error.data);
      }
    }
    listadeMenus();
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    crearMenu(values);
  });

  return (
    <div className='container-fluid fondo-admin d-flex col-12 flex-wrap'>
      <Helmet>
        <title>Editar Menú</title>
      </Helmet>
      <div className='row justify-content-around col-12'>
        <div className='col-lg-6 col-md-5 col-sm-12 mt-5'>
          <h4 className='editMenuTitulo text-center white-star-carta'>Menus</h4>
          <div className="table-container " style={{ maxHeight: "550px", overflowY: "auto" }}>
            <table className="fondo-formMenuAdmin text-center fuente-formMenuAdmin">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Menú</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Estado</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {listaMenu.slice(0, 25).map((elemento, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{elemento.tituloMenu}</td>
                    <td>{elemento.categoriaMenu || 'N/A'}</td>
                    <td>{elemento.descripcionMenu}</td>
                    <td>{elemento.precioMenu}</td>
                    <td>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={`flexSwitchCheckDefault_${index}`}
                          checked={elemento.estado}
                          readOnly
                        />
                      </div>
                    </td>
                    <td><button type="submit" class="btn btn-secondary mb-3 m-1">Editar</button></td>
                    <td><button type="submit" class="btn btn-danger mb-3 m-1">Eliminar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='col-lg-4 col-md-6 col-sm-10 pb-5 pt-1  '>
          <h3 className='mt-5 editMenuTitulo text-center white-star-carta'>Editar Menu</h3>
          <div className='bordered d-flex justify-content-center col-md-12 editMenuFondo mx-auto'>
            {RegisterErrors.map((error, i) => (
              <div className='bg-red-500  justify-content-center' key={i}>
                {error}
              </div>
            ))}
            <form onSubmit={onSubmit} noValidate>
              <div class="mb-2 needs-validation  px-5" noValidate>
                <label for="InputNameReg" className=" fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Ingrese el ID del menú a editar</label>
                <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('_id', { required: false })} />
                {errors._id && <p className='text-red-500'>Id is required</p>}
              </div>

              <div class="mb-2 needs-validation px-5" noValidate>
                <label for="InputNameReg" className=" fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Nombre del menu</label>
                <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('tituloMenu', { required: true })} />
                {errors.tituloMenu && <p className='text-red-500'>Nombre is required</p>}
              </div>

              <div class="mb-2 px-5">
                <label for="InputNameReg" className=" fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Descripción</label>
                <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('descripcionMenu', { required: true })} />
                {errors.descripcionMenu && <p className='text-red-500'>Descripción is required</p>}
              </div>

              <div class="mb-2 px-5">
                <label for="InputNameReg" className="form-label fuente-formMenuAdmin form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Categoria</label>
                <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('categoriaMenu', { required: true })} />
                {errors.categoriaMenu && <p className='text-red-500'>Categoria is required</p>}
              </div>

              <div class="mb-2 px-5">
                <label for="InputNameReg" className="fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Precio</label>
                <input type="number" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('precioMenu', { required: true })} />
                {errors.precioMenu && <p className='text-red-500'>Precio is required</p>}
              </div>

              <div className=' text-center'>
                <button type="submit" class="btn btn-success mb-3 m-1">Crear</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMenu;
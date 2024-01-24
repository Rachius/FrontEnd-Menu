



import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContex';
import { listarUsuariosRequest, modificarUsuarioRequest } from '../api/auth';

function EditUsuario() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { admSignup, admEdit, isAuthenticated, errors: RegisterErrors } = useAuth();
  const [usernameEdit,setUsernameEdit] = useState()
  const [editEmail,setEmailEdit] = useState()
  const [editRol,setRolEdit] = useState()
  const [editEstado,setEstadoEdit] = useState()
  const [listaUsuario, setListaUsuario] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    async function listaDeUsuarios() {
      try {
        const listadeU = await listarUsuariosRequest();
        setListaUsuario(listadeU.data);
      } catch (error) {
        console.log(error.data);
      }
    }
    listaDeUsuarios();
  }, []);


  const handleEditarUsuario =  (elemento) => {
    try { 
      setEditingUserId(elemento._id)
      setUsernameEdit(elemento.username)
      setEmailEdit(elemento.email)
      setRolEdit(elemento.rol)
      setEstadoEdit(elemento.estado)
      console.log(elemento.estado)
  
      console.log(elemento)
    } catch (error) {
      console.log(error)
    }



  };


  const onSubmit = handleSubmit(async (values) => {
    const cleanedValues = Object.entries(values).reduce((acc, [key, value]) => {
      if (value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});
  
    if (editingUserId) {
      admEdit(cleanedValues, editingUserId);
      // Realizar la lógica de edición (por ejemplo, llamar a handleGuardarCambios)
    } else {
      admSignup(values);
      // Realizar la lógica de registro (por ejemplo, llamar a admSignup)
    }
  });





  return (
    
  







  <div className='container-fluid fondo-admin d-flex col-12 flex-wrap justify-content-around'>
              <div className='col-lg-6 col-md-12 col-sm-12 mt-5'>
                <h4 className='editMenuTitulo text-center white-star-carta  '>Usuarios</h4>
                <form onSubmit={onSubmit} noValidate>
                <div className="table-container" style={{ maxHeight: "550px", overflowY: "auto" }}>
                <table className="table justify-content-center">
                <thead>
                  <tr>
                    {/* <th scope="col">ID</th> */}
                    <th scope="col">username</th>
                    <th scope="col">email</th>
                    <th scope="col">rol</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                  <tbody>
                    {listaUsuario.map((elemento) => (
                      <tr key={elemento._id} data-id={elemento._id}>
                        {/* <th scope="row">{elemento._id}</th> */}
                        <td>
                              {elemento.username}
                        </td>
                        <td>
                          {
                            elemento.email
                          }
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
                          {editingUserId === elemento._id ? (
                            <>
                              {/* <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => handleGuardarCambios(elemento)}
                              >
                                Guardar
                              </button>*/}
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => setEditingUserId(null)}
                              >
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn btn-secondary"
                              type="button"
                              onClick={() => handleEditarUsuario(elemento)}
                            >
                              Editar
                            </button>
                          )}
                        </td>
                      </tr>
                      ))}
                  </tbody>
                </table>
                </div>
                </form>      
              </div>
          
 
      
          <div className='col-lg-3   col-md-12 col-sm-12 pb-5 pt-1 mt-5 '>
          <h4 className='editMenuTitulo text-center white-star-carta  mb-3 '>Editar Usuario</h4>
                <div className='d-flex justify-content-around col-10 mx-auto'>
                  
                    {RegisterErrors.map((error, i)=> (
                          <div className='bg-red-500 p-2'key={i}>   
                            {error}
                          </div>))} 
                          <div className='col-12 justify-content-center editMenuFondo d-flex'>
                     <form onSubmit={onSubmit} noValidate>
                                <div class="mb-3 needs-validation" noValidate>
                                  <label for="InputNameReg" className="form-label fuente-formMenuAdmin">username</label>
                                  <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('username', { required: true })} />
                                  {errors.username && <p className='text-red-500'>Username es requerido</p>}
                                </div>
                                <div class="mb-3">
                                  <label for="InputEmailReg" className="form-label fuente-formMenuAdmin">Email del usuario</label>
                                  <input type="email" className="form-control" id="InputEmailReg" aria-describedby="emailregHelp" placeholder="usuario@correo.com" {...register('email', { required: false })} defaultValue={editEmail}/>
                                  {errors.email && <p className='text-red-500'>Email es requerido</p>}
                                </div>
                              <div className="mb-3 needs-validation" noValidate>
                                    <label htmlFor="InputRol" className="form-label fuente-formMenuAdmin">Rol</label>
                                <select
                                className="form-select"
                                id="InputRol"
                                {...register('rol', { required: false })}
                                defaultValue={editRol}>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                </select>
                                {errors.rol && <p className='text-red-500'>Rol es requerido</p>}
                              </div>
                          <div className="form-check form-switch">
                            <label htmlFor="InputEstado" className =" fuente-formMenuAdmin form-label">Estado</label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="InputEstado"
                              checked={editEstado}
                              {...register('estado', { required: false })}
                              onChange={(e) => setEstadoEdit(e.target.value === 'true')}
                            />
                            {errors.estado && <p className='text-red-500'>estado es requerido</p>}
                          </div>
                          <div>       
                          <button type="submit" className="btn btn-primary">Modificar</button>
                          </ div> 
                          </form>
                 </div>                      
           </div>

  </div>
          <div className='col-lg-3   col-md-12 col-sm-12 pb-5 mt-5  '>
          <h4 className='editMenuTitulo text-center white-star-carta  mb-3 '>Alta de usuario</h4>
                 <div className='d-flex justify-content-around editMenuFondo col-10 mx-auto'>
                        <form>
                        <h3 className='fuente-formMenuAdmin'>Alta de usuario</h3>
                        
                        <div class="mb-3 needs-validation" noValidate>                 
                          <label for="InputNameReg" className="form-label fuente-formMenuAdmin">username</label>
                          <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('username', { required: false })} />
                          {errors.username && <p className='text-red-500'>Username es requerido</p>}
                        </div>
                        <div class="mb-3">
                          <label for="InputEmailReg" className="form-label fuente-formMenuAdmin">Email del usuario</label>
                          <input type="email" className="form-control" id="InputEmailReg" aria-describedby="emailregHelp" placeholder="usuario@correo.com" {...register('email', { required: false })}/>
                          {errors.email && <p className='text-red-500'>Email es requerido</p>}
                        </div>
                          <div class="mb-3">
                          <label for="InputPasswordReg" className="form-label fuente-formMenuAdmin">Contraseña del usuario</label>
                          <input type="password" className="form-control" id="InputPasswordReg" {...register('password', { required: false })}/>
                          {errors.password && <p className='text-red-500'>Contraseña es requerida</p>}
                          <span id="passwordHelpInline" className="form-text"></span>      
                          </div>
                        <div className='justify-content-center'>       
                        <button type="submit" className="btn btn-primary">Dar de alta</button>
                        </div>
                        </form>
                    </div>        
            </div>  
  </div>


  

 )
    
}

export default EditUsuario
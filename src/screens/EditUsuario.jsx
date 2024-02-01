import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContex';
import { listarUsuariosRequest, modificarUsuarioRequest } from '../api/auth';
import { Helmet } from 'react-helmet';
import { Modal, Button } from 'react-bootstrap';


function EditUsuario() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { admSignup, admEdit, isAuthenticated, errors: RegisterErrors } = useAuth();
  const [usernameEdit, setUsernameEdit] = useState();
  const [username2Edit, setUsername2Edit] = useState();
  const [editEmail, setEmailEdit] = useState();
  const [editRol, setRolEdit] = useState();
  const [editEstado, setEstadoEdit] = useState();
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

  const handleEditarUsuario = (elemento) => {
    try {
      setEditingUserId(elemento._id);
      setUsernameEdit(elemento.username);
      setEmailEdit(elemento.email);
      setRolEdit(elemento.rol);
      setEstadoEdit(elemento.estado);
      console.log(elemento.estado);
      console.log(elemento);
    } catch (error) {
      console.log(error);
    }
  };
  const [showMessage, setShowMessage] = useState(false);
  const onSubmit = handleSubmit(async (values) => {
    const cleanedValues = Object.entries(values).reduce((acc, [key, value]) => {
      if (value !== "") {
        acc[key] = value;
      }
      return acc;
      }, {});
      if (editingUserId) {
      admEdit(cleanedValues, editingUserId);
    } else {
      admSignup(values);
    }
  });


  return (
                      <div className='container-fluid d-flex fondo-admin col-12 flex-wrap justify-content-around'>
                               <Helmet>
                                  <title>Editar Usuario</title>
                                 </Helmet>
                          <div className='col-lg-6 col-md-12 col-sm-12 mt-5'>
                    <h4 className='editMenuTitulo text-center white-star-carta'>Usuarios</h4>
                  <form onSubmit={onSubmit} noValidate>
                  <div className="table-container text-center fuente-formMenuAdmin" style={{ maxHeight: "550px", overflowY: "auto" }}>           
                  
                   <table className="col-12 text-center fondo-formMenuAdmin">

              <thead>
                <tr className=''>
                  <th scope="col">Usuario</th>
                  <th scope="col">Email</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody className=''>
                {listaUsuario.map((elemento) => (
                  <tr key={elemento._id} data-id={elemento._id}>
                    <td>{elemento.username}</td>
                    <td>{elemento.email}</td>
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
                          <button
                            className="btn btn-danger"
                            type="submit"
                            onClick={() => setEditingUserId(null)}
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-secondary"
                          type="submit"
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
      <Modal className='col-12' show={showMessage} onHide={() => setShowMessage(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Le Forky</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Realizado
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-success' onClick={() => setShowMessage(false)} >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      {editingUserId ? (
        <>
      <div className='col-lg-3 col-md-12 col-sm-12 pb-5 pt-1 mt-5'>
          <h4 className='editMenuTitulo text-center white-star-carta  mb-3 '>Editar Usuario</h4>
           <div className='d-flex justify-content-around col-10 mx-auto'>
             {RegisterErrors.map((error, i) => (
               <div className='bg-red-500 p-2' key={i}>
                 {error}
               </div>
        ))}
        <div className='col-12 justify-content-center editMenuFondo d-flex'>
          <form onSubmit={onSubmit} noValidate>
             <div class="mb-3 needs-validation" noValidate>
                 <label for="InputNameReg" className="form-label fuente-formMenuAdmin">username</label>
                 <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('username', { required: false })} value={usernameEdit} />
                  {errors.username && <p className='text-red-500'>Username es requerido</p>}
              </div>
               <div class="mb-3">
                    <label for="InputEmailReg" className="form-label fuente-formMenuAdmin">Email del usuario</label>
                    <input type="email" className="form-control" id="InputEmailReg" aria-describedby="emailregHelp" placeholder="usuario@correo.com" {...register('email', { required: false })} value={editEmail}/>
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
              <label htmlFor="InputEstado" className="fuente-formMenuAdmin form-label">Estado</label>
              <input
                className="form-check-input"
                type="checkbox"
                id="InputEstado"
                checked={editEstado}
                {...register('estado', { required: false })}
                onChange={(e) => setEstadoEdit(e.target.checked)}
              />
              {errors.estado && <p className='text-red-500'>Estado es requerido</p>}
            </div>
             
             <div className='text-center mb-3'>
              <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                setShowMessage(true);
                setTimeout(() => {
                  setShowMessage(false);
                  if (!showMessage) {
                    setEditingUserId(null);
                  }
                }, 2000);
              }}
            >Modificar</button>
              </div>
                  
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='col-lg-3 col-md-12 col-sm-12 pb-5 mt-5'>
            <h4 className='editMenuTitulo text-center white-star-carta  mb-3 '>Alta de usuario</h4>
            <div className='d-flex justify-content-around editMenuFondo col-10 mx-auto'>
              {RegisterErrors.map((error, i) => (
                <div className='bg-red-500 p-2' key={i}>
                  {error}
                </div>
              ))}
              <form>
                
                <div class="mb-3 needs-validation" noValidate>
                  <label for="InputNameReg" className="form-label fuente-formMenuAdmin">Usuario</label>
                  <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('username', { required: false })} />
                  {errors.username && <p className='text-red-500'>Username es requerido</p>}
                </div>
                <div class="mb-3">
                  <label for="InputEmailReg" className="form-label fuente-formMenuAdmin">Email del usuario</label>
                  <input type="email" className="form-control" id="InputEmailReg" aria-describedby="emailregHelp" placeholder="usuario@correo.com" {...register('email', { required: false })} />
                  {errors.email && <p className='text-red-500'>Email es requerido</p>}
                </div>
                <div class="mb-3">
                  <label for="InputPasswordReg" className="form-label fuente-formMenuAdmin">Contraseña del usuario</label>
                  <input type="password" className="form-control" id="InputPasswordReg" {...register('password', { required: false })} />
                  {errors.password && <p className='text-red-500'>Contraseña es requerida</p>}
                  <span id="passwordHelpInline" className="form-text"></span>
                </div>
                <div className='text-center mb-3'>
  <button
    type="submit"
    className="btn btn-success"
    onClick={() => {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        if (!showMessage) {
          setEditingUserId(null);
        }
      }, 2000);
    }}
  >
    Dar de alta
  </button>
</div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EditUsuario;
  
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




<<<<<<< HEAD
    return(
  <div className='col-12 d-flex'>
      <div className='justify-content-center col-6'>   
                          
                                   <h4>Usuarios activos </h4>
                                   <br />
                                   
                                   <form onSubmit={(e) => {
    e.preventDefault();
    onSubmit(e);
}} noValidate>        
                                   <table class="table justify-content-center">
                             <thead>
                               <tr>
                                 <th scope="col">ID</th>
                                 <th scope="col">Usuario</th>
                                 <th scope="col">email</th>
                                 <th scope="col">rol</th>
                                 <th scope="col">Estado</th>
                               </tr>
                             </thead>
                             <tbody>
                             {listaUsuario.map((elemento) => (
  <tr key={elemento._id} data-id={elemento._id}>
    <th scope="row">{elemento._id}</th>
    <td>
      {editandoUsuario === elemento._id ? (
        <input
          type="text"
          value={elemento.username}
          onChange={(e) =>
            setlistaUsuario((prevLista) => {
              const nuevaLista = [...prevLista];
              const index = nuevaLista.findIndex((user) => user._id === elemento._id);
              nuevaLista[index].username = e.target.value;
              return nuevaLista;
            })
          }
        />
      ) : (
        elemento.username
      )}
    </td>
    <td>
      {editandoUsuario === elemento._id ? (
        <input
          type="text"
          value={elemento.email || ''}
          onChange={(e) =>
            setlistaUsuario((prevLista) => {
              const nuevaLista = [...prevLista];
              const index = nuevaLista.findIndex((user) => user._id === elemento._id);
              nuevaLista[index].email = e.target.value;
              return nuevaLista;
            })
          }
        />
      ) : (
        elemento.email
      )}
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
      {editandoUsuario === elemento._id ? (
        <button
          className="btn btn-primary"
          onClick={() => handleGuardarCambios(elemento._id)}
        >
          Guardar
        </button>
      ) : (
        <button
          className="btn btn-secondary"
          onClick={() => setEditandoUsuario(elemento._id)}
        >
          Editar
        </button>
      )}
    </td>
=======

  return (
    <div className='col-12 d-flex'>
      <div className='justify-content-center col-6'>
        <h4>Usuarios activos</h4>
        <br />
        <form onSubmit={onSubmit} noValidate>
          <table className="table justify-content-center">
            <thead>
              <tr>
                <th scope="col">ID</th>
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
                  <th scope="row">{elemento._id}</th>
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
                        </button>
                        
 */}
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
>>>>>>> dev
  </tr>
))}
          </tbody>

                    </table>
                 </form>
                             
           </div>
        
        <div className='justify-content-center col-6'>
             <div>
             <div class="d-flex justify-content-center">
         <div >
           <br />

                     {RegisterErrors.map((error, i)=> (
                    <div className='bg-red-500 p-2'key={i}>
                      
                      {error}
                    </div>))} 
                        
                  <form onSubmit={onSubmit} noValidate>
<<<<<<< HEAD
                           <div class="mb-3 needs-validation" noValidate>
                    <label for="InputNameReg" className="form-label">username</label>
                    <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('username', { required: true })} />
                    {errors.username && <p className='text-red-500'>Username es requerido</p>}
                  </div>
=======
                  {editingUserId ? (  
                    <>
                               <br />
             <h3>Moficacion de usuario</h3>
             <br />

             <div class="mb-3 needs-validation" noValidate>
                                   
                                   <label for="InputNameReg" className="form-label">username</label>
                                   <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('username', { required: false })} defaultValue={usernameEdit}/>
                                   {errors.username && <p className='text-red-500'>Username es requerido</p>}
                                 </div>
           
>>>>>>> dev
                  <div class="mb-3">
                    <label for="InputEmailReg" className="form-label">Email del usuario</label>
                    <input type="email" className="form-control" id="InputEmailReg" aria-describedby="emailregHelp" placeholder="usuario@correo.com" {...register('email', { required: false })} defaultValue={editEmail}/>
                    {errors.email && <p className='text-red-500'>Email es requerido</p>}
                  
                  </div>
                  <div className="mb-3 needs-validation" noValidate>
  <label htmlFor="InputRol" className="form-label">
    Rol
  </label>
  <select
    className="form-select"
    id="InputRol"
    {...register('rol', { required: false })}
    defaultValue={editRol}
  >
    <option value="admin">Admin</option>
    <option value="user">User</option>
  </select>
  {errors.rol && <p className='text-red-500'>Rol es requerido</p>}
</div>

<div className="form-check form-switch">
  <label htmlFor="InputEstado" className="form-label">
    Estado
  </label>
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
                  
                
                  </div>
                  </> ) : (
                             <>
                                        <br />
             <h3>Alta de usuario</h3>
             <br />
                             <div class="mb-3 needs-validation" noValidate>
                                     
                      <label for="InputNameReg" className="form-label">username</label>
                      <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('username', { required: false })} />
                      {errors.username && <p className='text-red-500'>Username es requerido</p>}
                    </div>
                    <div class="mb-3">
                      <label for="InputEmailReg" className="form-label">Email del usuario</label>
                      <input type="email" className="form-control" id="InputEmailReg" aria-describedby="emailregHelp" placeholder="usuario@correo.com" {...register('email', { required: false })}/>
                      {errors.email && <p className='text-red-500'>Email es requerido</p>}
                    
                    </div>
                    <div class="mb-3">
                      <label for="InputPasswordReg" className="form-label">Contraseña del usuario</label>
                      <input type="password" className="form-control" id="InputPasswordReg" {...register('password', { required: false })}/>
                      {errors.password && <p className='text-red-500'>Contraseña es requerida</p>}
                      <span id="passwordHelpInline" className="form-text"></span>
                            
                    </div>
                   
                    <div>
                           
                    <button type="submit" className="btn btn-primary">Dar de alta</button>
                    
                  
                    </div>
                    </>
                            )}       
                  
                </form>
                
                </div>
            </div>
                      
                  </div>
                                 
                                        </div>
                                    
                                    </div> 
    
  
    )
    
  
  
  }
  
  export default EditUsuario

import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContex';
import { listarMenuRequest, listarPedidoRequest } from '../api/auth';
import { Helmet } from 'react-helmet';

function EditPedidos() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [listaMenu, setlistaMenu] = useState([]);
  const [listaPedido, setlistaPedido] = useState([]);
  const { crearMenu, listarMn, pedidoEdit,isAuthenticated, errors: RegisterErrors } = useAuth();
  const [detallePedido, setDetallePedido] = useState([]);

  const [editId, seteditId] = useState();
  const [editUsername, setEditUsername] = useState();
  const [editEstado, setEstadoEdit] = useState();
  const [editTotal,setEditTotal] = useState();
  const [pedidoEditID, setPedidoId] = useState(null);
  const [editFecha, setEditFecha] = useState()



  const navigate = useNavigate();

  const handleEditarUsuario = (elemento) => {
    try {
      const titulosMenus = elemento.items.map(item => item.tituloMenu)
      setPedidoId(elemento._id);
      setEditUsername(elemento.username);
      setEstadoEdit(elemento.estado);
      setEditTotal(elemento.total);
      setEditFecha(formatearFecha(elemento.fechaPedido))

      setDetallePedido(titulosMenus)
     
      console.log(elemento._id)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function listadePedidos() {
      try {
        const listadeP = await listarPedidoRequest();
        setlistaPedido(listadeP.data);
        
      } catch (error) {
        console.log(error);
      }
    }
    listadePedidos();
  }, []);

  const onSubmit = () => {
    // Asegúrate de tener un pedidoEditID válido antes de proceder
    if (pedidoEditID) {
      const cleanedValues = {
        estado: 'realizado',  
      };
  
    
      pedidoEdit(cleanedValues, pedidoEditID);
    }
  };

  const formatearFecha = (fecha) => {
    const fechaFormateada = new Date(fecha);
    const opciones = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return fechaFormateada.toLocaleDateString('es-ES', opciones);
  };


  return (
    <div className='container-fluid fondo-admin d-flex col-12 flex-wrap'>
      <Helmet>
        <title>Editar Pedidos</title>
      </Helmet>
      <div className='row justify-content-around col-12 '>
        <div className='col-lg-6 col-md-5 col-sm-12 mt-5 '>
          <h4 className='editMenuTitulo text-center white-star-carta'>Pedidos</h4>
          <div className="table-container text-center fuente-formMenuAdmin" style={{ maxHeight: "550px", overflowY: "auto" }}>
            <table className="fondo-formMenuAdmin ">
              <thead>
                <tr className=''>
                  <th scope="col">ID</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Total</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {listaPedido.map((elemento, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{formatearFecha(elemento.fechaPedido)}</td>
                    <td>{elemento.username}</td>
                    <td>{elemento.total}</td>
                    <td>{elemento.estado}</td>
                    <td>  {elemento.items.map((item, itemIndex) => (
                      
        <div key={itemIndex}>
          {item.tituloMenu}
          
          </div>
      ))}

          </td>


          {pedidoEditID === elemento._id ? (
                        <>
                          <button
                            className="btn btn-danger"
                            type="submit"
                            onClick={() => setPedidoId(null)}
                          >
                            Cancelar
                          </button>
                          <button type="button" 
                          onClick={onSubmit}
                class="btn btn-success mb-3 m-1">Confirmar</button>

                          
                        </>
                      ) : (
                        <button
                          className="btn btn-primary"
                          type="submit"
                          onClick={() => handleEditarUsuario(elemento)}
                        >
                          Detalle
                        </button>

                        
                      )}
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {pedidoEditID?(<>

        <div className='col-lg-4 col-md-6 col-sm-10 pb-5 pt-1  '>
          <h3 className='editMenuTitulo text-center white-star-carta mt-5'>Detalle del pedido</h3>
          <div className='bordered d-flex justify-content-center col-md-12 editMenuFondo mx-auto'>
            {RegisterErrors.map((error, i) => (
              <div className='bg-red-500  justify-content-center' key={i}>
                {error}
              </div>
            ))}
            <form onSubmit={onSubmit} noValidate>
      

              <div class="mb-2 needs-validation px-5" noValidate>
                <label for="InputNameReg" className=" fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Usuario</label>
                <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('tituloMenu', { required: true })} defaultValue={editUsername} />
                {errors.tituloMenu && <p className='text-red-500'>Fecha</p>}
              </div>
              <div class="mb-2 needs-validation px-5" noValidate>
                <label for="InputNameReg" className=" fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Fecha Pedido</label>
                <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('tituloMenu', { required: true })} defaultValue={editFecha} />
                {errors.tituloMenu && <p className='text-red-500'>Fecha</p>}
              </div>
              <div className="mb-2 needs-validation px-5" noValidate>
  <label htmlFor="selectEstado" className="fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">
    Estado
  </label>
  <select id="selectEstado" className="form-control" {...register('estado', { required: true })} defaultValue={editEstado}>
    <option value="pendiente">Pendiente</option>
    <option value="realizado">Realizado</option>
  </select>
  {errors.estado && <p className='text-red-500'>El estado es requerido</p>}
</div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label" disabled>Detalle del pedido</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" defaultValue={detallePedido}></textarea>
              </div>

        

              <div class="mb-2 px-5">
                <label for="InputNameReg" className="fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Precio</label>
                <input type="number" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('precioMenu', { required: false })} defaultValue={editTotal} />
                {errors.precioMenu && <p className='text-red-500'>Precio is required</p>}
              </div>

   
            </form>
          </div>
        </div>
        </>):(<>
          <div className='col-lg-4 col-md-6 col-sm-10 pb-5 pt-1  '>
          <h3 className='editMenuTitulo text-center white-star-carta mt-5'>Detalle del pedido</h3>
          <div className='bordered d-flex justify-content-center col-md-12 editMenuFondo mx-auto'>
            {RegisterErrors.map((error, i) => (
              <div className='bg-red-500  justify-content-center' key={i}>
                {error}
              </div>
            ))}
            <form onSubmit={onSubmit} noValidate>
      

              <div class="mb-2 needs-validation px-5" noValidate>
                <label for="InputNameReg" className=" fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Usuario</label>
                <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('tituloMenu', { required: true })}  />
                {errors.tituloMenu && <p className='text-red-500'>Fecha</p>}
              </div>
              <div class="mb-2 needs-validation px-5" noValidate>
                <label for="InputNameReg" className=" fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Fecha Pedido</label>
                <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('tituloMenu', { required: true })}  />
                {errors.tituloMenu && <p className='text-red-500'>Fecha</p>}
              </div>
              <div className="mb-2 needs-validation px-5" noValidate>
  <label htmlFor="selectEstado" className="fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">
    Estado
  </label>
  <select id="selectEstado" className="form-control" {...register('estado', { required: true })}>
    <option value="pendiente">Pendiente</option>
    <option value="realizado">Realizado</option>
  </select>
  {errors.estado && <p className='text-red-500'>El estado es requerido</p>}
</div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label" disabled>Detalle del pedido</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>

        

              <div class="mb-2 px-5">
                <label for="InputNameReg" className="fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Precio</label>
                <input type="number" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('precioMenu', { required: true })}  />
                {errors.precioMenu && <p className='text-red-500'>Precio is required</p>}
              </div>

           
            </form>
          </div>
        </div>
        
        </>)}

      </div>
    </div>
  );
}

export default EditPedidos;

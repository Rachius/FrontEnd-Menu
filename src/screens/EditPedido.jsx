import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContex';
import { listarMenuRequest, listarPedidoRequest } from '../api/auth';
import { Helmet } from 'react-helmet';
import { Modal, Button } from 'react-bootstrap';

function EditPedidos() {
  const { register, handleSubmit,reset ,formState: { errors } } = useForm();
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
  const [filtrarPendientes, setFiltrarPendientes] = useState(false); 



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

  const handleToggleFiltrarPendientes = () => {
    setFiltrarPendientes(!filtrarPendientes);
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

    setShowMessage(true);
      setTimeout(() => {
            setShowMessage(false);
            if (!showMessage) {
              
              setPedidoId(null);
            }
          }, 2000);


   
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


  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className='container-fluid fondo-admin pb-3'>
      <Helmet>
        <title>Editar Pedidos</title>
      </Helmet>
      <div className='row justify-content-around col-12 '>
        <div className='col-lg-6 col-md-12 col-sm-12 mt-5 '>
          <h4 className='editMenuTitulo text-center white-star-carta'>Pedidos</h4>
          <button onClick={handleToggleFiltrarPendientes} className="btn btn-primary mb-4 mt-3">
            {filtrarPendientes ? 'Mostrar Todos' : 'Mostrar Pendientes'}
          </button>
          <div className="table-container text-center  fuente-formMenuAdmin" >
            <table className="fondo-formMenuAdmin col-12 ">
              <thead>
                <tr className=''>
                  <th scope="col">ID</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Total</th>
                  <th scope="col">Estado</th>
                  
                </tr>
              </thead>
              <tbody>
                {listaPedido.map((elemento, index) => {
                  if (filtrarPendientes && elemento.estado !== 'pendiente') {
                    return null;
                  }
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{formatearFecha(elemento.fechaPedido)}</td>
                      <td>{elemento.username}</td>
                      <td>{elemento.total}</td>
                      <td>{elemento.estado}</td>
                      {pedidoEditID === elemento._id ? (
                        <>
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => {
                              setPedidoId(null);
                              reset();
                            }}
                          > Cancelar
                          </button>
                          <button
                            type="button"
                            onClick={onSubmit}
                            className="btn btn-success m-2"
                          >
                            Confirmar
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-primary m-2"
                          type="submit"
                          onClick={() => handleEditarUsuario(elemento)}
                        >
                          Detalle
                        </button>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
    


        {pedidoEditID ? (
          <div className='col-lg-4 col-md-6 col-sm-10 pb-5 pt-1  '>
            <h3 className='editMenuTitulo text-center white-star-carta mt-5'>Detalle del pedido</h3>
            <div className='bordered d-flex justify-content-center col-md-12 editMenuFondo mx-auto'>
              {RegisterErrors.map((error, i) => (
                <div className='bg-red-500  justify-content-center' key={i}>
                  {error}
                </div>
              ))}
              <form onSubmit={onSubmit} noValidate>
                <div className="mb-2 needs-validation px-5" noValidate>
                  <label htmlFor="InputNameRegUsuario" className="fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Usuario</label>
                  <input type="text" className="form-control" id="InputNameRegUsuario" aria-describedby="nameregHelp" {...register('username', { required: true })} value={editUsername} />
                  {errors.username && <p className='text-red-500'>Campo requerido</p>}
                </div>
                <div className="mb-2 needs-validation px-5" noValidate>
                  <label htmlFor="InputNameRegFecha" className="fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Fecha Pedido</label>
                  <input type="text" className="form-control" id="InputNameRegFecha" aria-describedby="nameregHelp" {...register('fechaPedido', { required: true })} value={editFecha} />
                  {errors.fechaPedido && <p className='text-red-500'>Campo requerido</p>}
                </div>
                <div className="mb-2 needs-validation px-5" noValidate>
                  <label htmlFor="selectEstado" className="fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">
                    Estado
                  </label>
                  <select id="selectEstado" className="form-control" {...register('estado', { required: true })} value={editEstado}>
                    <option value="pendiente">Pendiente</option>
                    <option value="realizado">Realizado</option>
                  </select>
                  {errors.estado && <p className='text-red-500'>El estado es requerido</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label" disabled>Detalle del pedido</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" defaultValue={detallePedido}></textarea>
                </div>
                <div className="mb-2 px-5">
                  <label htmlFor="InputNameReg" className="fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Precio</label>
                  <input type="number" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('precioMenu', { required: false })} value={editTotal} />
                  {errors.precioMenu && <p className='text-red-500'>Precio is required</p>}
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className='col-lg-4 col-md-6 col-sm-10 pb-5 pt-1  '>
              <h3 className='editMenuTitulo text-center white-star-carta mt-5'>Detalle del pedido</h3>
              <div className='bordered d-flex justify-content-center col-md-12 editMenuFondo mx-auto'>
                {RegisterErrors.map((error, i) => (
                  <div className='bg-red-500  justify-content-center' key={i}>
                    {error}
                  </div>
                ))}
                <form onSubmit={onSubmit} noValidate>
                  <div className="mb-2 needs-validation px-5" noValidate>
                    <label htmlFor="InputNameReg" className="fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Usuario</label>
                    <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('tituloMenu', { required: true })} />
                    {errors.tituloMenu && <p className='text-red-500'>Fecha</p>}
                  </div>
                  <div className="mb-2 needs-validation px-5" noValidate>
                    <label htmlFor="InputNameReg" className="fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Fecha Pedido</label>
                    <input type="text" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('tituloMenu', { required: true })} />
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
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label" disabled>Detalle del pedido</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                  <div className="mb-2 px-5">
                    <label htmlFor="InputNameReg" className="fuente-formMenuAdmin form-label form-group mt-3 mb-3 justify-content-right d-flex negrita-color-negro">Precio</label>
                    <input type="number" className="form-control" id="InputNameReg" aria-describedby="nameregHelp" {...register('precioMenu', { required: true })} />
                    {errors.precioMenu && <p className='text-red-500'>Precio is required</p>}
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EditPedidos;
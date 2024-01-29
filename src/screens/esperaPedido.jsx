import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import React, { useState, useEffect } from "react";
import { listarMenuRequest, listarPedidoRequest } from '../api/auth';
import { useAuth } from '../contexts/AuthContex';

function EsperandoPedido() {
  const [listaPedido, setlistaPedido] = useState([]);
  const [editId, seteditId] = useState();
  const { user } = useAuth();
  const [pedidoEditID, setPedidoId] = useState(null);

  useEffect(() => {
  

    async function listadePedidos() {
      try {
        const listadeP = await listarPedidoRequest();
        setlistaPedido(listadeP.data);
        seteditId(user.username)
        console.log(user.username)
        console.log(listadeP.data)
       
        
      } catch (error) {
        console.log(error);
      }
    }
    listadePedidos();
  }, []);

  const formatearFecha = (fecha) => {
    const fechaFormateada = new Date(fecha);
    const opciones = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return fechaFormateada.toLocaleDateString('es-ES', opciones);
  };

   
    const pedidosPendientes = listaPedido.filter(
      (elemento) => elemento.username === editId && elemento.estado === 'pendiente'
    );
  

    const pedidosRealizados = listaPedido.filter(
      (elemento) => elemento.username === editId && elemento.estado === 'realizado'
    );


    return (
      <div className='d-flex justify-content-center bg-verde-blanco fondo-logReg align-items-center vh-100'>
        <div className='row col-12'>
          <Helmet>
            <title>Le Forky</title>
          </Helmet>
          <br />
          <div className="text-center col-sm-8 bg-verde-claro carta-titulo mx-auto pb-4 pt-1 ">
            <br />
            <h4 className='editMenuTitulo text-center white-star-carta mt-40'>Pedidos Pendientes</h4>
            <div className="table-responsive text-center fuente-formMenuAdmin mb-4">
  <table className="table table-bordered table-striped mx-auto">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Total</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosPendientes.map((elemento, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{formatearFecha(elemento.fechaPedido)}</td>
                      <td>{elemento.username}</td>
                      <td>{elemento.total}</td>
                      <td>{elemento.estado}</td>
                      <td>
                        {elemento.items.map((item, itemIndex) => (
                          <div key={itemIndex}>{item.tituloMenu}</div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <h4 className='editMenuTitulo text-center white-star-carta mb-4'>Pedidos Realizados</h4>
            <div className="table-responsive text-center fuente-formMenuAdmin mb-4">
              <table className="table table-bordered table-striped mx-auto">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Total</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosRealizados.map((elemento, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{formatearFecha(elemento.fechaPedido)}</td>
                      <td>{elemento.username}</td>
                      <td>{elemento.total}</td>
                      <td>{elemento.estado}</td>
                      <td>
                        {elemento.items.map((item, itemIndex) => (
                          <div key={itemIndex}>{item.tituloMenu}</div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link to="/esperaPedido" className="btn btn-success mt-3">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default EsperandoPedido;
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import React, { useState, useEffect } from "react";
import {  listarPedidoRequest } from '../api/auth';
import { useAuth } from '../contexts/AuthContex';

function EsperandoPedido() {
  const [listaPedido, setlistaPedido] = useState([]);
  const [editId, seteditId] = useState();
  const { user } = useAuth();
 
  // eslint-disable-next-line
useEffect(() => {
  async function listadePedidos() {
    try {
      const listadeP = await listarPedidoRequest();
      setlistaPedido(listadeP.data);
      seteditId(user.username);
    } catch (error) {
      console.log(error);
    }
  }
  listadePedidos();
}, [user.username]);

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
      <div className=' align-items-center fondo-logReg col-12 text-center  justify-content-around row'>

   
          <Helmet>
            <title>Le Forky</title>
          </Helmet>
          <div className=" text-center fuente-formMenuAdmin mt-4 col-lg-5 col--md-11 col-sm shadow-lg rounded-2 bordeCarta fondo-CardCarrito">
              <h4 className='editMenuTitulo text-center white-star-carta mb-4'>Pedidos Pendientes</h4>
              <div style={{ overflowY: 'auto', maxHeight: '400px' }}>

              <table className="col-12 justify-content-around mb-3">
          <thead>
            <tr>
            <th className='bg-transparent bordeTituloCarrito' scope="col">ID</th>
            <th className='bg-transparent bordeTituloCarrito' scope="col">Fecha</th>
            <th className='bg-transparent bordeTituloCarrito' scope="col">Cliente</th>
            <th className='bg-transparent bordeTituloCarrito' scope="col">Total</th>
            <th className='bg-transparent bordeTituloCarrito' scope="col">Estado</th>
            <th className='bg-transparent bordeTituloCarrito' scope="col">Detalle</th>
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

  </div>
  <div className=" text-center fuente-formMenuAdmin mt-4 col-lg-5 col--md-11 col-sm shadow-lg rounded-2 bordeCarta fondo-CardCarrito">
              <h4 className='editMenuTitulo text-center white-star-carta mb-4'>Pedidos Realizados</h4>
              <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
              <table className="col-12 justify-content-around mb-3">
                <thead className=''>
                  <tr>
                    <th className='"bg-transparent bordeTituloCarrito' scope="col">ID</th>
                    <th className='"bg-transparent bordeTituloCarrito' scope="col">Fecha</th>
                    <th className='"bg-transparent bordeTituloCarrito' scope="col">Cliente</th>
                    <th className='"bg-transparent bordeTituloCarrito' scope="col">Total</th>
                    <th className='"bg-transparent bordeTituloCarrito' scope="col">Estado</th>
                    <th className='"bg-transparent bordeTituloCarrito' scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody className=''>
                  {pedidosRealizados.map((elemento, index) => (
                    <tr   key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{formatearFecha(elemento.fechaPedido)}</td>
                      <td>{elemento.username}</td>
                      <td>{elemento.total}</td>
                      <td >{elemento.estado}</td>
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

            </div>
            <div className=' mt-5 mb-3'>
            <Link to="/home" className="btn btn-success mt-3">
              Volver al inicio
            </Link>


            </div>

            <footer className="bg-dark text-light pt-5 pb-2 mt-5 text-center ">
        <div className=' col-lg-12 row'>
          <div className='col-lg-4 col-md-12 col-sm-12'>
          <p>Dirección: Congreso de Tucumán 141, San Miguel de Tucumán, Tucumán </p>
          <p>Horarios de atención: Lun a Dom de 11:30-16:00 hs. | 19:00-1:00 hs.</p>
          </div>
          <div className='col-lg-4 col-md-12 col-sm-12'>
          <p>LOGO</p>
          </div>
          <div className='col-lg-4 col-md-12 col-sm-12'>
          <p>Contacto: <a href="tel:03815958693" className='link-color'>0381-5958693</a></p>
          <p>Email: <a href="mailto:info@leforky.com.ar" className='link-color'>info@leforky.com.ar</a></p>
          <p>Instagram: <a href="https://www.instagram.com/leforky/" className='link-color' target="_blank" rel="noopener noreferrer">@leforky</a></p>
          </div>
        </div>
      </footer>

            
      </div>
      
      
    );
  }
  
  export default EsperandoPedido;



  
















  

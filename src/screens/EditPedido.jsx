import React, { useState, useEffect } from "react";
import axios from "axios";
import { UseForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Button } from 'bootstrap';

const EditPedido = (props) => {
 /* const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");

  useEffect(() => {
    // Obtén los datos del pedido que deseas editar.
    const pedidoId = props.match.params.id;
    axios
      .get(`/api/pedido/${pedidoId}`)
      .then((response) => {
        const pedido = response.data;
        setNombre(pedido.nombre);
        setDescripcion(pedido.descripcion);
        setPrecio(pedido.precio);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.match.params.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Prepara los datos para enviarlos al backend.
    const datos = {
      _id: props.match.params.id,
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
    };

    // Envía los datos al backend utilizando axios.
    axios
      .put("/api/pedido/editar", datos)
      .then((response) => {
        console.log(response);
        // Redirige al administrador a la lista de pedidos después de editar un pedido.
        props.history.push("/admin/pedidos");
      })
      .catch((error) => {
        console.log(error);
      });
  };*/

  return (
    <div className="container">
      <h2>Editar Pedido</h2>
      <form >
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
  
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
 
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio:</label>

        </div>
        <button type="submit" className="btn btn-primary">
          Editar Pedido
        </button>
      </form>
    </div>
  );
};

export default EditPedido;
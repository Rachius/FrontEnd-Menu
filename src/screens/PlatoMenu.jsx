
import React from 'react';
import Platos from './Platos';

const PlatoMenu = ({ nombre, precio, info, enlace, categoria}) => {
  return (
    <div>
      <div className="card">
        <div className="card-body row d-flex align-items-center justify-content-center">
          <h5 className="card-title row-6">{nombre}</h5>
          <p className="card-title row-6">{categoria}</p>
          <p className="card-text col-12">{info}</p>
          <a href={Platos.agregarPlatoACarrito} className="btn btn-primary col-8 " >Añadir al pedido {precio}</a>
        </div>
      </div>
    </div>
  );
};

export default PlatoMenu;
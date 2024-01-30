import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth,checklogin } from '../contexts/AuthContex';
import Home from '../screens/Home';
import LogoutButton from '../screens/LogOut';

function Navbar() {
const { isAuthenticated, logOut, user } = useAuth();
 


  

  return (
<nav className="navbar sticky-top navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="">
          <ul className="navbar-nav">
            {isAuthenticated && user.rol === 'admin' ? (
            <>
            <Link to="/Home" className="navbar-brand">Inicio</Link>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          <li className="nav-item">
            <Link to="/editPedido" className="nav-link">Editar Pedidos</Link>
        </li>
        <li className="nav-item">
        <Link to="/editMenu" className="nav-link">Editar Menu</Link>
</li>
                <li className="nav-item">
        <Link to="/editUsuario" className="nav-link">Editar Usuario</Link>
        
          
        </li>
        <li className="nav-item" >
        <LogoutButton />
        </li>
        </>
            ) : isAuthenticated && user.rol === 'user' ? (
              <>
                          <Link to="/Home" className="navbar-brand">Inicio</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
                </button>
                <li className="nav-item">
            <Link to="/pedidos" className="nav-link">Pedido</Link>
        </li>
        <li className="nav-item">
            <Link to="/esperaPedido" className="nav-link">Mis Pedidos</Link>
        </li>
<li className="nav-item" >
          <LogoutButton />
        </li>
</>
            ) : (
              <>
                <Link to="/Home" className="navbar-brand">Inicio</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
                </button>
          <li className="nav-item" >
          <a className="nav-link active" aria-current="page" href="/login">Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/registro">Registro</a>
        </li>
     
        
          </>

        )}
        
      </ul>
    </div>
  </div>
</nav>
  );
}

export default Navbar
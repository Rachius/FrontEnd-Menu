import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContex';
import Home from '../screens/Home';

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
                  <Link to={Home} onClick={() => {
                    logOut();
                  }}>
                    <li className="nav-link">LogOut</li>
                  </Link>
                </li>
              </>
            ) : isAuthenticated && user.rol === 'user' ? (
              <>
                <Link to="/Home" className="navbar-brand">Inicio</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <li className="nav-item">
                  <a className="nav-link" href="/pedidos">Pedidos</a>
                </li>
                <li className="nav-item">
                </li>
                <li className="nav-item" >
                  <Link to='/Home' onClick={() => {
                    logOut();
                  }}>
                    <a className="nav-link" href="/pedidos">LogOut</a>
                  </Link>
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

export default Navbar;

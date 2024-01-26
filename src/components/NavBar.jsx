import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth,checklogin } from '../contexts/AuthContex';
import Home from '../screens/Home';
import ProtectedRoute from '../ProtectedRoutes';
import { AdminRoute } from '../ProtectedRoutes';



/*

const links=
[
      {
       name: "Home",
       href:"/home",
      },
      {
        name: "Registro",
        href:"/registro",
       },
       {
        name: "Login",
        href:"/Login",
       },
       {
        name: "Pedidos",
        href:"/pedidos",
       },
       {
        name: "Platos",
        href:"/platos",
       },
       {
        name: "Bebidas",
        href:"/bebidas",
       },
       {
        name: "Postres",
        href:"/postres",
       },

]

*/


function Navbar () {
 


  const {isAuthenticated,logOut,user} = useAuth()

  return (


  <nav class="navbar sticky-top navbar-expand-lg navbar-collapse-md navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            {isAuthenticated  && user.rol ==='admin' ? (
            <>
            <Link to="/Home" class="navbar-brand">Inicio</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          <li class="nav-item">
            <Link to="/editPedido" class="nav-link">Editar Pedidos</Link>
        </li>
        <li class="nav-item">
        <Link to="/editMenu" class="nav-link">Editar Menu</Link>
        </li>
        <li class="nav-item">
        <Link to="/editUsuario" class="nav-link">Editar Usuario</Link>
        </li>
        <li class="nav-item" >
          <Link to={Home} onClick={()=>{
            logOut()
          }}>
          <li class="nav-link">LogOut</li>
          </Link>

          
         
        </li>
          </>): isAuthenticated  && user.rol ==='user' ?(
          <>
                          <a class="navbar-brand" href="/Home">Inicio</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
                </button>

        <li class="nav-item">
          <a class="nav-link" href="/pedidos">Pedidos</a>
        </li>
        <li class="nav-item">
        </li>

        <li class="nav-item" >
          <Link to='/Home' onClick={()=>{
            logOut()
          }}>
          <a class="nav-link" href="/pedidos">LogOut</a>
          </Link>
        </li>

          </>) : (<>
          
            <a class="navbar-brand" href="/Home">Inicio</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
                </button>
          <li class="nav-item" >
          <a class="nav-link active" aria-current="page" href="/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/registro">Registro</a>
        </li>
          </>
        )}
      </ul>
    </div>
  </div>
  
</nav>

  )
}













export default Navbar
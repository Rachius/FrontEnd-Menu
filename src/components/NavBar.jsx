import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContex';
import Home from '../screens/Home';
import Button  from 'bootstrap';
import { set } from 'react-hook-form';
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
    
    
  <nav class="navbar navbar-expand-lg $navbar-dark-color:                 rgba($white, .55);
  $navbar-dark-hover-color:           rgba($white, .75);">
    <div class="container-fluid">
      <a class="navbar-brand" href="/home">Inicio</a>
     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">

      <ul class="navbar-nav">
        {isAuthenticated  && user.rol ==='admin' ?(
          <>

        <li class="nav-item">
          <a class="nav-link" href="/pedidos">Pedidos</a>
          <a class="nav-link" href="/editMenu">Edit Menu</a>
          <a class="nav-link" href="/editUsuarios">Edit Usuarios</a>
          
        </li>
        <li class="nav-item">
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Carta
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="/platos">Platos</a></li>
            <li><a class="dropdown-item" href="/bebidas">Bebidas</a></li>
            <li><a class="dropdown-item" href="/postres">Postres</a></li>
          </ul>
        </li>
        <li class="nav-item" >
          <Link to={Home} onClick={()=>{
            logOut()
          }}>
          <a class="nav-link" href="/pedidos">LogOut</a>
          </Link>

          
         
        </li>
          </>): isAuthenticated  && user.rol ==='user' ?(
          <>

        <li class="nav-item">
          <a class="nav-link" href="/pedidos">Pedidos</a>
        </li>
        <li class="nav-item">
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Carta
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="/platos">Platos</a></li>
            <li><a class="dropdown-item" href="/bebidas">Bebidas</a></li>
            <li><a class="dropdown-item" href="/postres">Postres</a></li>
          </ul>
        </li>
        <li class="nav-item" >
          <Link to='/Home' onClick={()=>{
            logOut()
          }}>
          <a class="nav-link" href="/pedidos">LogOut</a>
          </Link>

          
         
        </li>
          </>) : (<>
          <li class="nav-item" >
          <a class="nav-link active" aria-current="page" href="/login">Login</a>
        </li>
        <li class="nav-item">
       
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/registro">Registro</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Carta
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="/platos">Platos</a></li>
            <li><a class="dropdown-item" href="/bebidas">Bebidas</a></li>
            <li><a class="dropdown-item" href="/postres">Postres</a></li>
          </ul>
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
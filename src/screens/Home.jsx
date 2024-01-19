import React from 'react'
import Navbar from '../components/NavBar';

const Home = () => {

    return (
      <div className="home-container">
        <Navbar />
  
        <header className="home-header">
          <h1>Bienvenido a Nuestro Restaurante</h1>
        </header>
  
        <section className="menu-section">
          <h2>Menú</h2>
          <div className="menu-item">
            <h3>Plato Principal</h3>
            <p>Descripción del delicioso plato principal.</p>
          </div>
          <div className="menu-item">
            <h3>Bebidas</h3>
            <p>Refrescantes bebidas para acompañar tu comida.</p>
          </div>
          {/* Puedes agregar más secciones según sea necesario */}
        </section>
  
        <section className="specials-section">
          <h2>Especiales</h2>
          <p>Descubre nuestros especiales de la semana.</p>
        </section>
  
        <footer className="home-footer">
          <p>© 2024 Nuestro Restaurante</p>
        </footer>
      </div>
    );
  }
  

export default Home
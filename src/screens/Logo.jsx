// LogoComponent.jsx

import React from 'react';
import leForkyImage from '../img/Le_forky.png'; // Asegúrate de que la ruta sea correcta

const LogoComponent = () => {
  return <img src={leForkyImage} alt="Le Forky" style={{ width: '30%', height: 'auto' }} />;
};

export default LogoComponent;

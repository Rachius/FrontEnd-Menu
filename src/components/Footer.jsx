

import React from 'react';
import LogoComponent from '../screens/Logo';


const Footer = () => {

  return (

    <div>
        <footer className="bg-white text-light pt-5 pb-4 mt-3 text-center ">
        <div className=' col-lg-12 row justify-content-around'>
          <div className='col-lg-4 text-center col-md-12 col-sm-12'>
          <p className='footer-home-letra'>Dirección: Congreso de Tucumán 141, San Miguel de Tucumán, Tucumán </p>
          <p className='footer-home-letra'>Horarios de atención: Lun a Dom de 11:30-16:00 hs. | 19:00-1:00 hs.</p>
          </div>
          <div className='col-lg-4 col-md-12 col-sm-12'>
          <LogoComponent/>
          </div>
          <div className='col-lg-3 col-md-12 col-sm-12'>
          <p className='footer-home-letra'>Contacto: <a href="tel:03815958693" className='link-color'>0381-5958693</a></p>
          <p className='footer-home-letra'>Email: <a href="mailto:info@leforky.com.ar" className='link-color'>info@leforky.com.ar</a></p>
          <p className='footer-home-letra'>Instagram: <a href="https://www.instagram.com/leforky/" className='link-color' target="_blank" rel="noopener noreferrer">@leforky</a></p>
          </div>
        </div>
      </footer>
    </div>

  )
  
    
  
  
  
};

export default Footer;

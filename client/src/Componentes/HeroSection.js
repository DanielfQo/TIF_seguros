import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/Videos/video-1.mp4' autoPlay loop muted />
      <h1>ASEGURA TU VIDA Y LA DE TU FAMILIA</h1>
      <p></p>
      <p>¿Qué estas esperando? Nosotros te cubriremos siempre :)</p>
      <p>Alcanza tus sueños, nosotros estaremos para ti</p>
      <div className='hero-btns'>
        <Link to='../Login'> {/* Usa Link para la página de inicio de sesión */}
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            Inicia Sesión
          </Button>
        </Link>
        <Link to='../Servicios'> {/* Usa Link para la página de servicios */}
          <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
          >
            Nuestros servicios <i className='far fa-play-circle' />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
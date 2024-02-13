import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            FREEofLICE .
            <i className="fa-solid fa-clipboard-check"></i>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/perfil' className='nav-links' onClick={closeMobileMenu}>
                Tu perfil
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                Ingresa
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/servicios' className='nav-links' onClick={closeMobileMenu}>
                Seguros y servicios
              </Link>
            </li>
          </ul>
          <Link to='../Signup'> {button && <Button buttonStyle='btn--outline'>Registrate</Button>} </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Componentes/Navbar';
import './imagen.css';

function Login() {
  const [values, setValues] = useState({ usuario: '', password: '' });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (errors.usuario === "" && errors.password === "") {
      axios.post("http://localhost:3008/login", values)
        .then(res => {
          if (res.data === "Iniciaste sesión con éxito!") {
            navigate('/Perfil');
          } else {
            alert("NO existe");
          }
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <>
      <Navbar />
      <div className='background-container'>
        <div className='form-container'>
          <h2>Ingresa</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="usuario"><strong>Usuario</strong></label>
              <input type="text" placeholder='Ingresa tu Usuario' name='usuario' onChange={handleInput} className='form-control rounded-0' />
              {errors.usuario && <span className='text-danger'>{errors.usuario}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor="password"><strong>Contraseña</strong></label>
              <input type="password" placeholder='Ingresa tu Contraseña' name='password' onChange={handleInput} className='form-control rounded-0' />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Login</strong></button>
            <p>Te recomendamos leer nuestra política de privacidad</p>
            <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Crear una cuenta</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
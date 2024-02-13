import React from 'react';
import Login from './Login';
import Navbar from './Componentes/Navbar';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Home from './Componentes/pages/Home';
import Servicios from './Servicios';
import Perfil from './Perfil';
import Comprar from './Comprar';
import ActualizarPerfil from './ActualizarPerfil';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/home' element={<Navbar />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/Servicios' element={<Servicios />}></Route>
          <Route path='/perfil' element={<Perfil />}></Route>
          <Route path='/comprar' element={<Comprar />}></Route>
          <Route path='/ActualizarPerfil' element={<ActualizarPerfil />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

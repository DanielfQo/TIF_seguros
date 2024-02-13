import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Componentes/Navbar';
import './Perfil.css'
import { Link } from 'react-router-dom';

function Perfil() {
    const [datosList, setDatos] = useState([]);
    const [contratoList, setContratos] = useState([]);
    const [accidentesList, setAccidentes] = useState([]);
    const [reclamosList, setReclamos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const response = await Axios.get("http://localhost:3008/datosUsuario");
                console.log("Respuesta del servidor (datos):", response);
                if (response.data.length > 0) {
                    setDatos(response.data[0]);
                } else {
                    setError('No se encontraron datos de usuario.');
                }
            } catch (error) {
                console.error('Error al obtener los datos de usuario:', error);
                setError('Hubo un error al obtener los datos del perfil.');
            }
        };

        const fetchContratos = async () => {
            try {
                const response = await Axios.get("http://localhost:3008/contratos");
                console.log("Respuesta del servidor (contratos):", response);
                if (response.data.length > 0) {
                    setContratos(response.data[0]);
                } else {
                    setError('No se encontraron datos de contratos.');
                }
            } catch (error) {
                console.error('Error al obtener los datos de contratos:', error);
                setError('Hubo un error al obtener los datos del contrato.');
            }
        };

        const fetchAccidentes = async () => {
            try {
                const response = await Axios.get("http://localhost:3008/accidentes");
                console.log("Respuesta del servidor (accidentes):", response);
                if (response.data.length > 0) {
                    setAccidentes(response.data[0]);
                } else {
                    setError('No se encontraron datos de usuario.');
                }
            } catch (error) {
                console.error('Error al obtener los datos de usuario:', error);
                setError('Hubo un error al obtener los datos del perfil.');
            }
        };

        const fetchReclamos = async () => {
            try {
                const response = await Axios.get("http://localhost:3008/reclamos");
                console.log("Respuesta del servidor (reclamos):", response);
                if (response.data.length > 0) {
                    setReclamos(response.data[0]);
                } else {
                    setError('No se encontraron datos de usuario.');
                }
            } catch (error) {
                console.error('Error al obtener los datos de usuario:', error);
                setError('Hubo un error al obtener los datos del perfil.');
            }
        };

        fetchDatos();
        fetchContratos();
        fetchAccidentes();
        fetchReclamos();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                <h2 className="section-title">Tu información:</h2>
                <div className="text-center mt-3 mb-3">
                    <h2 className="section-title">¿Quieres adquirir un nuevo servicio?</h2>
                    <Link to="/comprar" className="btn btn-primary">
                        Adquirir nuevo servicio
                    </Link>
                    <p></p>
                    <Link to="/ActualizarPerfil" className="btn btn-success ml-3">
                        Actualizar tu información
                    </Link>
                </div>
                <div className="section">
                    <h2 className="section-title">Perfil</h2>
                    {error && <div className="error">{error.datos}</div>}
                    {datosList.map((datos, index) => (
                        <div key={index} className="data-item">
                            <p><strong>Nombre:</strong> {datos.Nombre}</p>
                            <p><strong>Apellidos:</strong> {datos.ApellidoP} {datos.ApellidoM}</p>
                            <p><strong>DNI:</strong> {datos.DNI}</p>
                            <p><strong>Email:</strong> {datos.Email}</p>
                            <p><strong>Fecha de nacimiento:</strong> {datos.Fecha_nacimiento}</p>
                            <p><strong>Género:</strong> {datos.Genero}</p>
                            <p><strong>Nacionalidad:</strong> {datos.Nacionalidad}</p>
                            <p><strong>Teléfono:</strong> {datos.Telefono}</p>
                            <p><strong>Dirección:</strong> {datos.direccion}</p>
                        </div>
                    ))}
                </div>
                <div className="section">
                    <h2 className="section-title">Contratos</h2>
                    {error && <div className="error">{error.contratos}</div>}
                    {contratoList.map((cont, index) => (
                        <div key={index} className="data-item">
                            <p><strong>Categoria:</strong> {cont.Categoria}</p>
                            <p><strong>Monto:</strong> {cont.Monto}</p>
                            <p><strong>Inicio:</strong> {cont.Inicio}</p>
                        </div>
                    ))}
                </div>
                <div className="section">
                    <h2 className="section-title">Accidentes</h2>
                    {error && <div className="error">{error.accidentes}</div>}
                    {accidentesList.map((acc, index) => (
                        <div key={index} className="data-item">
                            <p><strong>Registro:</strong> {acc.Registro}</p>
                            <p><strong>Fecha:</strong> {acc.Fecha}</p>
                            <p><strong>Hora:</strong> {acc.Hora}</p>
                        </div>
                    ))}
                </div>
                <div className="section">
                    <h2 className="section-title">Reclamos</h2>
                    {error && <div className="error">{error.reclamos}</div>}
                    {reclamosList.map((recl, index) => (
                        <div key={index} className="data-item">
                            <p><strong>Reclamo:</strong> {recl.Reclamo}</p>
                            <p><strong>Fecha:</strong> {recl.Fecha}</p>
                            <p><strong>Hora:</strong> {recl.Hora}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );    
}

export default Perfil;




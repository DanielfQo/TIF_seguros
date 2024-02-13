import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css'; // Importa tus estilos CSS
import Navbar from './Componentes/Navbar';


function Comprar() {
    const [serviciosList, setServicios] = useState([]);
    const [selectedServicio, setSelectedServicio] = useState(null);


    const [inicio, setInicio] = useState('');
    const [termino, setTermino] = useState('');

    const [dniUsuario, setDniUsuario] = useState('');


    const getDNI = () => {
        Axios.get("http://localhost:3008/obtenerdni")
            .then((response) => {
                setDniUsuario(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener el DNI del usuario:', error);
            });
    }

    const getServicios = () => {
        Axios.get("http://localhost:3008/servicio")
            .then((response) => {
                setServicios(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de servicios:', error);
            });
    }

    useEffect(() => {
        getServicios();
        getDNI();
    }, []);

    const handleServicioSelection = (servicio) => {
        setSelectedServicio(servicio);
    }

    const handleConfirmarCompra = () => {
        
        console.log(dniUsuario);
        if (dniUsuario && selectedServicio && inicio && termino) {
            const data = {
                DNI_vendedor: 32,
                DNI_cliente: dniUsuario[0].DNI,
                Categoria: selectedServicio.Categoria,
                Monto: selectedServicio.Precio,
                Inicio: inicio,
                Termino: termino
            };
            
            console.log(data.p_Inicio)
            Axios.post("http://localhost:3008/comprar", data)
                .then((response) => {
                    console.log('Contrato exitoso:', response.data);
                    alert('Contrato exitoso');
                })
                .catch((error) => {
                    console.error('Error al crear contrato:', error);
                    alert('Ya tienes un contrato');
                });
        } else {
            console.error('Por favor, complete todos los campos.');
            alert('Por favor, complete todos los campos.');
        }
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="container mt-5">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" className="table-active">Seleccionar</th>
                            <th scope="col" className="table-active">Categoria</th>
                            <th scope="col" className="table-active">Precio</th>
                            <th scope="col" className="table-active">Terminos y condiciones</th>
                            <th scope="col" className="table-active">Nro de personas aseguradas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {serviciosList.map((val, key) => (
                            <tr key={val.Categoria}>
                                <td><input type="radio" name="servicio" onChange={() => handleServicioSelection(val)} /></td>
                                <th scope="row">{val.Categoria}</th>
                                <td>{val.Precio}</td>
                                <td>{val.Terminos_condiciones}</td>
                                <td>{val.Nro_personas_aseguradas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="row justify-content-center">
                    <div className="col-auto">
                        <label htmlFor="fechaInicio" className="col-form-label">Fecha inicio:</label>
                        <input type="date" id="fechaInicio" className="form-control mb-2" value={inicio} onChange={(e) => setInicio(e.target.value)} />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="fechaFin" className="col-form-label">Fecha fin:</label>
                        <input type="date" id="fechaFin" className="form-control mb-2" value={termino} onChange={(e) => setTermino(e.target.value)} />
                    </div>
                    <div className="text-center">
                    <button onClick={handleConfirmarCompra} className="btn btn-primary">Confirmar compra</button>
                </div>
                </div>

                
            </div>
        </>
    );
}

export default Comprar;
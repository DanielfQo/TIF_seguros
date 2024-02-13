import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CardItem from './Componentes/CardItem';
import './App.css'; // Importa tus estilos CSS
import Navbar from './Componentes/Navbar';
function Servicios() {
    const [serviciosList, setServicios] = useState([]);

    useEffect(() => {
        getServicios();
    }, []);

    const getServicios = () => {
        Axios.get("http://localhost:3008/servicio")
            .then((response) => {
                setServicios(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de servicios:', error);
            });
    }

    // Función para dividir la lista en grupos de dos elementos
    const groupServicios = (serviciosList) => {
        const groups = [];
        for (let i = 0; i < serviciosList.length; i += 2) {
            groups.push(serviciosList.slice(i, i + 2));
        }
        return groups;
    }

    return (
        <> 
        <Navbar></Navbar>
        <div className='cards'>
            <div className="container">
        <h3>Contrato de Términos y Condiciones - Seguro de Accidentes Personales</h3>
        <p>Este contrato establece los términos y condiciones para el seguro de accidentes personales entre [Nombre de la Compañía de Seguros] y el asegurado.</p>
        
        <h4>1. Cobertura del Seguro</h4>
        <p>El seguro de accidentes personales cubre las lesiones corporales sufridas por el asegurado como resultado de un accidente fortuito y ocasional, de acuerdo con los términos de la póliza.</p>
        
        <h4>2. Coberturas Adicionales</h4>
        <p>Además de la cobertura básica, la póliza puede incluir coberturas adicionales como:</p>
        <ul>
            <li>Indemnización por muerte accidental.</li>
            <li>Indemnización por invalidez permanente total o parcial.</li>
            <li>Pago de pensiones diarias por incapacidad temporal.</li>
            <li>Asistencia médica y gastos hospitalarios.</li>
            <li>Entre otras coberturas especificadas en la póliza.</li>
        </ul>
        
        <h4>3. Exclusiones</h4>
        <p>El seguro no cubre las lesiones resultantes de:</p>
        <ul>
            <li>Acciones intencionales del asegurado.</li>
            <li>Participación en actividades ilícitas.</li>
            <li>Condiciones médicas preexistentes.</li>
            <li>Entre otras exclusiones detalladas en la póliza.</li>
        </ul>
        
        <h4>4. Procedimiento de Reclamación</h4>
        <p>En caso de sufrir un accidente, el asegurado debe seguir el procedimiento de reclamación establecido por la compañía de seguros, proporcionando la documentación requerida y notificando el incidente en el plazo especificado.</p>
        
        <h4>5. Vigencia y Renovación</h4>
        <p>El contrato de seguro tiene una vigencia determinada, sujeta a renovación periódica. La no renovación de la póliza puede resultar en la pérdida de la cobertura.</p>
        
        <h4>6. Cancelación</h4>
        <p>El asegurado puede cancelar la póliza en cualquier momento mediante notificación por escrito a la compañía de seguros. La cancelación puede estar sujeta a penalizaciones y reembolsos parciales, según lo estipulado en el contrato.</p>
        
        <h4>7. Disposiciones Generales</h4>
        <p>Este contrato se rige por las leyes [indicar jurisdicción]. Las partes acuerdan someterse a la jurisdicción exclusiva de los tribunales de [indicar lugar] para la resolución de cualquier disputa relacionada con este contrato.</p>
        
        <div className="importante">
            <h5>IMPORTANTE:</h5>
            <p>Este resumen no constituye una descripción completa de los términos y condiciones de la póliza. Se recomienda leer detenidamente el contrato completo y consultar con un asesor legal antes de firmar.</p>
        </div>
        </div>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    {groupServicios(serviciosList).map((group, index) => (
                        <ul key={index} className='cards__items'>
                            {group.map((servicio, innerIndex) => (
                                <CardItem
                                    key={innerIndex}
                                    src={`images/img-${innerIndex % 5 + 1}.jpg`} // Asigna imágenes de img-1 a img-5 cíclicamente
                                    text={servicio.Terminos_condiciones}
                                    
                                    label={`Precio: ${servicio.Precio}`}
                                    path={`/services/${servicio.id}`}
                                    labelClassName="servicio-label" 
                                />
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default Servicios;
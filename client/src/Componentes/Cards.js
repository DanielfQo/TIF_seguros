import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <div className="container">
      <div className="nosotros">
            <h2>Sobre Nosotros</h2>
            <p>Nuestra aseguradora de Accidentes Personales se compromete a brindar la mejor protección y asistencia a nuestros clientes en momentos de necesidad.</p>
            
            <h5>Nuestra Misión</h5>
            <p>Nuestra misión es proporcionar seguridad y tranquilidad a nuestros asegurados, ofreciendo productos y servicios de alta calidad que cubran sus necesidades en caso de accidentes.</p>
            
            <h5>Valores Fundamentales</h5>
            <ul>
                <li>Integridad</li>
                <li>Compromiso con el cliente</li>
                <li>Transparencia</li>
                <li>Excelencia en el servicio</li>
            </ul>
            <h5>Experiencia y Trayectoria</h5>
            <p>Con más de XX años en el mercado de seguros, nuestra empresa ha acumulado una amplia experiencia y un historial probado de satisfacción del cliente.</p>
            <h5>Equipo Profesional</h5>
            <p>Nuestro equipo está formado por expertos en seguros y atención al cliente, comprometidos con brindar la mejor experiencia a nuestros asegurados.</p>
            <h5>Descubre nuestras coberturas</h5>
            <p>Ofrecemos una amplia gama de coberturas, incluyendo asistencia médica, indemnización por fallecimiento, asistencia legal y mucho más.</p>
            <h4>Haz click en nuestros beneficios si te interesan</h4>
          
    </div>
    </div>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Cobertura de gastos médicos: Ofrecemos asistencia médica integral para cubrir los gastos derivados de accidentes, incluyendo hospitalización, cirugías, consultas médicas y medicamentos.'
              label='Asistencia Médica Integral'
              path='/Servicios'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Asistencia en viajes: Estamos contigo donde sea que vayas. Si sufres un accidente mientras estás de viaje, te brindamos asistencia médica, repatriación sanitaria y otros servicios de emergencia para garantizar tu seguridad y bienestar.'
              label='Seguridad en Viajes'
              path='/Servicios'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-6.jpg'
              text='Cobertura por fallecimiento: En caso de fallecimiento a causa de un accidente, proporcionamos una compensación económica a tus beneficiarios para ayudarles a hacer frente a los gastos funerarios y a mantener su calidad de vida.'
              label='Compensación a Beneficiarios'
              path='/Servicios'
            />
            <CardItem
              src='images/img-3.jpg'
              text='Rehabilitación y terapias: Además de la atención médica inicial, ofrecemos programas de rehabilitación física y terapias especializadas para ayudarte en tu proceso de recuperación y reintegración a la vida cotidiana.'
              label='Recuperación Física'
              path='/Servicios'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-5.jpg'
              text='Cobertura para deportes y actividades de riesgo: Si practicas deportes o actividades de riesgo, como escalada, surf o skydiving, te ofrecemos una cobertura especializada para protegerte en caso de accidentes relacionados con estas actividades.'
              label='Protección Deportiva'
              path='/Servicios'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Asistencia legal: En situaciones en las que necesites asesoramiento legal o representación jurídica debido a un accidente, te proporcionamos asistencia legal para proteger tus derechos e intereses.'
              label='Apoyo Legal'
              path='/Servicios'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-7.jpg'
              text='Servicios de apoyo psicológico: Entendemos que los accidentes pueden tener un impacto emocional significativo. Por eso, ofrecemos servicios de apoyo psicológico y asesoramiento para ayudarte a superar el trauma y recuperarte emocionalmente.'
              label='Apoyo Emocional'
              path='/Servicios'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Asistencia en caso de robo o pérdida de pertenencias: Además de la cobertura por accidentes, te ofrecemos asistencia en caso de robo o pérdida de pertenencias personales, como documentos de identificación, dispositivos electrónicos y equipos deportivos.'
              label='Asistencia por Pérdida o Robo'
              path='/Servicios'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-1.jpg'
              text='Descuentos y beneficios adicionales: Como cliente de nuestro seguro contra accidentes, puedes disfrutar de una variedad de descuentos y beneficios adicionales, como servicios de asistencia en el hogar, programas de bienestar y actividades recreativas.'
              label='Beneficios Exclusivos'
              path='/Servicios'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
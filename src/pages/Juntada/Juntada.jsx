import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import GastosList from '../../components/GastosList'
import DivisionesList from '../../components/DivisionesList'
import FotosList from '../../components/FotosList'
import NavBar from '../../Layout/NavBar'
import { NavLink, useParams } from 'react-router-dom'
import './Juntada.css'


export default function Juntada() {
  const { id } = useParams();

    const juntadaDetail = [
    { id: 1, emoji: "✈️", nombre: "Viaje Europa 2025" },
  ];

  // Definir la sección actual basada en la URL
  // Si no hay sección especificada, mostramos "gastos" por defecto
  const getSection = () => {
    const pathname = window.location.pathname;
    if (pathname.includes('/divisiones')) return 'divisiones';
    if (pathname.includes('/fotos')) return 'fotos';
    return 'gastos'; // Por defecto mostramos gastos
  };

  const currentSection = getSection();

  // Función para renderizar el componente correspondiente
  const renderSection = () => {
    switch(currentSection) {
      case 'divisiones':
        return <DivisionesList />;
      case 'fotos':
        return <FotosList />;
      case 'gastos':
      default:
        return <GastosList />;
    }
  };

  return (
  <div className='juntada-page'>

    <div className="contenedor-logo">
        <NavLink to="/" className="nav-link">
       <FontAwesomeIcon icon={faArrowLeft} /> Volver a inicio
        </NavLink>
    </div>

    
      {juntadaDetail.filter(j => j.id.toString() === id).map(j => (
        <div key={j.id} className='juntada-titu'>
          <span className='juntada-emoji'>{j.emoji}</span>
          <h1 className='juntada-nombre'>{j.nombre}</h1>
        </div>
      ))}

   

    {/* NavBar - GASTOS | DIVISIONES | FOTOS */}
    <NavBar juntadaId={id} />

    {/* Renderizar la sección según lo que esté activo en el NavBar */}
    {renderSection()}

  </div>
  )
}
import './NavBar.css'
import './../App.css'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Detectar la sección activa según la URL
  const isGastos = location.pathname.includes('/gastos') || location.pathname === `/juntada/${id}`;
  const isDivisiones = location.pathname.includes('/divisiones');
  const IsFotos = location.pathname.includes('/fotos');

  // Funciones para navegar a cada sección
  const irAGastos = () => {
    navigate(`/juntada/${id}/gastos`);
  }

  const irADivisiones = () => {
    navigate(`/juntada/${id}/divisiones`);
  }

  const irAFotos = () => {
    navigate(`/juntada/${id}/fotos`);
  }

  return (
    <div className='navbar-container'>
      <ul className='nav-list'>
        <li
          className={`nav-item${isGastos ? ' active' : ''}`}
          onClick={irAGastos}
        >
          Gastos
        </li>
        <li
          className={`nav-item${isDivisiones ? ' active' : ''}`}
          onClick={irADivisiones}
        >
          Divisiones
        </li>
        <li
          className={`nav-item${IsFotos ? ' active' : ''}`}
          onClick={irAFotos}
        >
          Fotos tickets
        </li>
      </ul>    
    </div>
  )
}

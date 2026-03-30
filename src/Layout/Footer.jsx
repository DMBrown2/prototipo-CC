import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleInvited = () => {
    alert('Compartir juntada - Función pronto disponible');
  };

  const handleProfile = () => {
    alert('Perfil - Función pronto disponible');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Línea 1: Logo + Navegación */}
        <div className="footer-top">
            <NavLink to="/" >
          <div className="footer-logo">
            <div className="logo-circle">CC</div>
            <span className="logo-text">Cuentas Claras</span>
          </div>
            </NavLink>
          
          <div className="footer-nav">
            <button className="footer-link" onClick={handleInvited}>
              <FontAwesomeIcon icon={faUserGroup} />
              <span>Invitar amigos</span>
            </button>
            <button className="footer-link" onClick={handleProfile}>
              <FontAwesomeIcon icon={faUser} />
              <span>Perfil</span>
            </button>
          </div>
        </div>

        {/* Línea 2: Tagline + Copyright */}
        <div className="footer-bottom">
          <p className="footer-tagline">Cuentas claras mantienen la amistad 💙</p>
          <span>•</span>
          <p className="footer-copyright">© {currentYear} Cuentas Claras</p>
        </div>
      </div>
    </footer>
  )
}

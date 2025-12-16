import React, { useState } from "react";
import "../../assets/styles/Navbar.css";
import Logo from "../../assets/images/Logo.png";
import LogoutModal from "./LogoutModal";
import { Link, useNavigate } from "react-router-dom";
import {
  isAdmin,
  isAuthenticated,
  getUserFromToken,
  clearAuthToken,
} from "../../lib/Auth.js";

const Navbar = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    clearAuthToken();
    setShowLogoutModal(false);
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const userData = getUserFromToken();
  const displayIdentifier = userData?.firstName || userData?.email || "";

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo-link">
          <img src={Logo} className="logo" alt="Logo Adoptame" />
        </Link>

        {/* --- SECCIÓN DE NAVEGACIÓN PRINCIPAL --- */}
        <ul className="navbar-links">
          <li><Link to="/">Inicio</Link></li>
          
          {/* LÓGICA DE VISIBILIDAD DE MENÚS */}
          {isAuthenticated() ? (
            // CASO 1: ESTÁ LOGUEADO
            isAdmin() ? (
              // SUB-CASO A: ES ADMIN
              <>
                <li><Link to="/adminadopt">Administrar</Link></li>
                <li><Link to="/agregarmascota">Nueva Mascota</Link></li>
              </>
            ) : (
              // SUB-CASO B: ES USUARIO NORMAL (Aquí van sus opciones exclusivas)
              <>
                <li><Link to="/adopt">¡Adoptar!</Link></li>
                <li><Link to="/mismascotas">Mis Mascotas</Link></li>
              </>
            )
          ) : (
            // CASO 2: INVITADO (NO LOGUEADO)
            // No mostramos nada extra, solo caerá a "Ver Mascotas" abajo
            null
          )}
          
          {/* ESTE LINK SIEMPRE ES VISIBLE PARA TODOS */}
          <li><Link to="/pets">Ver Mascotas</Link></li>
        </ul>

        {/* --- SECCIÓN DE USUARIO / LOGIN --- */}
        <ul className="navbar-session-user">
          {isAuthenticated() ? (
            <>
              <li className="user-info">
                <span className="greeting-text">Hola,</span>
                <span className="user-name" title={displayIdentifier}>
                  {displayIdentifier}
                </span>
              </li>
              
              <li>
                <button className="btn-logout" onClick={handleLogoutClick}>
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                  <Link to="/register" className="nav-btn btn-register">
                      Crear Cuenta
                  </Link>
              </li>
              <li>
                  <Link to="/login" className="nav-btn btn-login">
                      Ingresar
                  </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={cancelLogout} 
        onConfirm={confirmLogout} 
      />
    </>
  );
};

export default Navbar;
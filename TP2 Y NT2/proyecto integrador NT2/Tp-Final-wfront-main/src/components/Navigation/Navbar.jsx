import React, { useState } from "react";
import "../../assets/styles/Navbar.css";
import Logo from "../../assets/images/Logo.png";
import LogoutModal from "./LogoutModal"; // <--- IMPORTANTE: Importamos el modal
import { Link, useNavigate } from "react-router-dom";
import {
  isAdmin,
  isAuthenticated,
  getUserFromToken,
  clearAuthToken,
} from "../../lib/Auth.js";

const Navbar = () => {
  const navigate = useNavigate();
  // Estado para controlar si mostramos el popup o no
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // 1. Cuando el usuario hace clic en "Cerrar Sesión", solo abrimos el modal
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // 2. Si el usuario confirma en el modal, ejecutamos la salida real
  const confirmLogout = () => {
    clearAuthToken();
    setShowLogoutModal(false); // Cerramos el modal
    navigate("/login");
  };

  // 3. Si el usuario cancela, solo cerramos el modal
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

        <ul className="navbar-links">
          <li><Link to="/">Inicio</Link></li>
          
          {isAuthenticated() && isAdmin() ? (
            <>
              <li><Link to="/adminadopt">Administrar</Link></li>
              <li><Link to="/agregarmascota">Nueva Mascota</Link></li>
            </>
          ) : (
            <li><Link to="/adopt">¡Adoptar!</Link></li>
          )}
          
          <li><Link to="/pets">Ver Mascotas</Link></li>
        </ul>

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
                {/* Al hacer clic, llamamos a la función que abre el modal */}
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

      {/* Aquí renderizamos el Modal, que solo se verá si showLogoutModal es true */}
      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={cancelLogout} 
        onConfirm={confirmLogout} 
      />
    </>
  );
};

export default Navbar;
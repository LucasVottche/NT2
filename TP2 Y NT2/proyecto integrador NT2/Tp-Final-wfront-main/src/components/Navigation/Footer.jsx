import React from "react";
import "../../assets/styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-footer">
        <p>
          <strong>ADOPTAME</strong> © {new Date().getFullYear()} - Todos los derechos reservados.
          <br />
          <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Hecho con ♥ para las mascotas</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
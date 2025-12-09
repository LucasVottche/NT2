import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      {/* Imagen de fondo de alta calidad (Perro feliz, espacio limpio) */}
      <img 
        src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1920&auto=format&fit=crop" 
        className="banner-image" 
        alt="Perro feliz adoptado" 
      />
      
      {/* Capa oscura para que el texto se lea perfecto */}
      <div className="banner-overlay"></div>

      {/* Contenido (Texto y Botón) */}
      <div className="banner-content">
        <h1>NO COMPRES, <span className="highlight">¡ADOPTA!</span></h1>
        <p>Dale una segunda oportunidad a un amigo fiel.</p>
        
        <Link to="/adopt" className="btn-banner">
          ¡QUIERO ADOPTAR!
        </Link>
      </div>
    </div>
  );
};

export default Banner;
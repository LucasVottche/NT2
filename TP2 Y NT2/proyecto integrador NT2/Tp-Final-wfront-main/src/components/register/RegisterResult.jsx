import React from "react";
import RegisterImage from "../../assets/images/Register_user.png";
import ErrorImage from "../../assets/images/UserRegisterError.png";

const RegisterResult = ({ success, message, onButtonClick }) => {
  return (
    <div className="container-form">
      {/* Reutilizamos la clase 'form' para que parezca una tarjeta centrada */}
      <div className="form" style={{ textAlign: 'center' }}>
        
        <h2 style={{ color: success ? 'var(--primary)' : 'var(--danger)' }}>
            {success ? "¡Bienvenido!" : "Hubo un problema"}
        </h2>
        
        <img
          src={success ? RegisterImage : ErrorImage}
          alt="Estado del registro"
          style={{ width: '150px', margin: '1rem auto', display: 'block' }}
        />

        <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', margin: '1rem 0' }}>
            {message}
        </p>

        <button 
            onClick={onButtonClick}
            style={{ 
                backgroundColor: success ? 'var(--primary)' : 'var(--text-light)', 
                marginTop: '1rem' 
            }}
        >
          {success ? "Ir al Inicio" : "Intentar de nuevo"}
        </button>
      </div>
    </div>
  );
};

export default RegisterResult;
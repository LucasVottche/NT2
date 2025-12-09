import React from "react";
import "../../assets/styles/LogoutModal.css";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>¿Cerrar Sesión?</h3>
        <p>¿Estás seguro que deseas salir de tu cuenta?</p>
        
        <div className="modal-actions">
          {/* Botón para quedarse */}
          <button className="btn-modal btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          
          {/* Botón para irse */}
          <button className="btn-modal btn-confirm" onClick={onConfirm}>
            Sí, salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
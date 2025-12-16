import React, { useState } from "react";
import { getUserId, isAdmin, isAuthenticated } from "../../lib/Auth";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/Pet.css";
import Constants from "../../lib/Constants.js";
import Message from "../Navigation/Message";

const PetCard = ({ pet, showAdoptButton }) => {
  const [message, setMessage] = useState("");
  const [statusUpdate, setStatus] = useState(pet.status);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAdopting, setIsAdopting] = useState(false);
  const { _id, name, specie, race, gender, age, description } = pet;

  // --- LÓGICA PARA EMOJIS (Soporte Bilingüe) ---
  const getSpecieEmoji = (text) => {
    if (!text) return "🐾";
    const lowerText = text.toLowerCase().trim();
    
    // Detectamos tanto español como inglés
    if (lowerText === "perro" || lowerText === "dog") return "🐶";
    if (lowerText === "gato" || lowerText === "cat") return "🐱";
    if (lowerText === "conejo" || lowerText === "rabbit") return "🐰";
    if (lowerText === "ave" || lowerText === "pajaro" || lowerText === "bird") return "🐦";
    
    return "🐾";
  };

  const formatGender = (text) => {
    if (!text) return "";
    const lowerText = text.toLowerCase().trim();
    
    // Detectamos tanto español como inglés
    if (lowerText === "macho" || lowerText === "male") return "♂️ Macho";
    if (lowerText === "hembra" || lowerText === "female") return "♀️ Hembra";
    
    return text;
  };

  // --- LÓGICA DE ESTILOS PARA EL ESTADO (Badge) ---
  const getStatusBadge = (currentStatus) => {
    let styles = {
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: "bold",
      textTransform: "uppercase",
      display: "inline-block",
      marginBottom: "10px",
      letterSpacing: "0.5px"
    };

    switch (currentStatus) {
      case "available":
        return <span style={{ ...styles, backgroundColor: "#d4edda", color: "#155724", border: "1px solid #c3e6cb" }}>✅ Disponible</span>;
      case "awaiting":
        return <span style={{ ...styles, backgroundColor: "#fff3cd", color: "#856404", border: "1px solid #ffeeba" }}>⏳ En Proceso</span>;
      case "adopted":
        return <span style={{ ...styles, backgroundColor: "#cce5ff", color: "#004085", border: "1px solid #b8daff" }}>🏠 Adoptado</span>;
      case "rejected":
        return <span style={{ ...styles, backgroundColor: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb" }}>❌ Rechazado</span>;
      default:
        return <span style={{ ...styles, backgroundColor: "#e2e3e5", color: "#383d41" }}>{currentStatus}</span>;
    }
  };

  // ---------------------------
  // FUNCIONES DE API (Misma lógica, solo limpieza visual en código)
  // ---------------------------

  const adoptar = async () => {
    const userId = getUserId();
    setIsAdopting(true);
    try {
      const response = await fetch(
        `${Constants.API_BASE_URL}:${Constants.API_PORT}/api/adoptions/add-adoption`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ petId: _id, adopterId: userId }),
        }
      );
      if (response.ok) {
        setMessage({ text: `¡Solicitud enviada!`, type: "success" });
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setMessage({ text: "Error al solicitar", type: "error" });
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setIsAdopting(false);
    }
  };

  const rejectAdoption = async () => {
    try {
      const response = await fetch(`${Constants.API_BASE_URL}:${Constants.API_PORT}/api/adoptions/reject-adoption/${_id}`, { method: "DELETE" });
      if (response.ok) {
        setStatus("rejected");
      }
    } catch (error) { console.error(error); }
  };

  const approveAdoption = async () => {
    try {
      const response = await fetch(`${Constants.API_BASE_URL}:${Constants.API_PORT}/api/adoptions/approve-adoption/${_id}`, { method: "PUT" });
      if (response.ok) {
        setStatus("adopted");
      }
    } catch (error) { console.error(error); }
  };

  const deleteAdoption = async () => {
    try {
      const response = await fetch(`${Constants.API_BASE_URL}:${Constants.API_PORT}/api/adoptions/delete-adoption/${_id}`, { method: "DELETE" });
      if (response.ok) {
        setIsDeleted(true);
        setStatus("available");
      }
    } catch (error) { console.error(error); }
  };

  const deletePet = async () => {
    try {
      const response = await fetch(`${Constants.API_BASE_URL}:${Constants.API_PORT}/api/pets/deletePet/${_id}`, { method: "DELETE" });
      if (response.ok) setIsDeleted(true);
    } catch (error) { console.error(error); }
  };

  const navigate = useNavigate();
  const editPet = () => navigate(`/agregarmascota?id=${pet._id}`);

  // ---------------------------
  // RENDERIZADO MEJORADO
  // ---------------------------

  if (isDeleted && !statusUpdate === 'available') return null; // Ocultar si está borrado visualmente

  return (
    <div className={`petCard ${isDeleted ? "petCardDeleted" : ""}`} style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {message && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}><Message text={message.text} type={message.type} /></div>}
      
      {/* Encabezado con Icono Grande */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <div style={{ fontSize: '3rem', lineHeight: '1' }}>{getSpecieEmoji(specie)}</div>
        <h3 style={{ margin: '0.5rem 0', fontSize: '1.4rem', color: '#333' }}>{name}</h3>
        {getStatusBadge(statusUpdate)}
      </div>

      {/* Detalles en Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '8px', 
        backgroundColor: '#f8f9fa', 
        padding: '10px', 
        borderRadius: '8px',
        fontSize: '0.9rem',
        color: '#555',
        marginBottom: '1rem'
      }}>
        <div><strong>Especie:</strong> {specie}</div>
        <div><strong>Raza:</strong> {race}</div>
        <div><strong>Sexo:</strong> {formatGender(gender)}</div>
        <div><strong>Edad:</strong> {age} años</div>
      </div>

      {/* Descripción */}
      <div style={{ flex: 1, marginBottom: '1.5rem' }}>
        <p style={{ fontStyle: 'italic', color: '#666', fontSize: '0.95rem', lineHeight: '1.4' }}>
          "{description}"
        </p>
      </div>

      {/* Botones de Acción */}
      <div className="pet-card-actions" style={{ marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* Lógica Admin para Solicitudes */}
        {showAdoptButton && isAuthenticated() && isAdmin() && !isDeleted && (
            <>
            <button className="btn-approve" onClick={approveAdoption} title="Aprobar Adopción">✅ Aprobar</button>
            <button className="btn-reject" onClick={rejectAdoption} title="Rechazar Solicitud">🚫 Rechazar</button>
            <button className="btn-delete" onClick={deleteAdoption} title="Resetear Estado">🔄 Reset</button>
            </>
        )}

        {/* Lógica Usuario para Adoptar */}
        {showAdoptButton && isAuthenticated() && !isAdmin() && (
            <button 
              className="btn-adopt" 
              onClick={() => adoptar(_id)} 
              disabled={isAdopting || statusUpdate !== 'available'}
              style={{ 
                width: '100%', 
                padding: '12px 20px', 
                fontSize: '1.1rem', 
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: statusUpdate === 'available' ? '#28a745' : '#6c757d',
                border: 'none',
                borderRadius: '8px',
                cursor: statusUpdate === 'available' ? 'pointer' : 'not-allowed',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: isAdopting ? 0.8 : 1
              }}
              onMouseEnter={(e) => {
                if (statusUpdate === 'available' && !isAdopting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
                  e.currentTarget.style.backgroundColor = '#218838';
                }
              }}
              onMouseLeave={(e) => {
                if (statusUpdate === 'available' && !isAdopting) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                  e.currentTarget.style.backgroundColor = '#28a745';
                }
              }}
            >
            {isAdopting ? "⏳ Procesando..." : (statusUpdate === 'available' ? "❤️ ¡Quiero Adoptar!" : "🚫 No Disponible")}
            </button>
        )}

        {/* Lógica Admin para CRUD (Editar/Borrar Mascota) */}
        {!showAdoptButton && isAuthenticated() && isAdmin() && !isDeleted && (
            <>
            <button onClick={editPet} style={{ flex: 1 }}>✏️ Editar</button>
            <button className="btn-delete" onClick={deletePet} style={{ flex: 1 }}>🗑️ Borrar</button>
            </>
        )}
      </div>
    </div>
  );
};

export default PetCard;
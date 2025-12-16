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

  // 1. Incluimos isCastrated en la desestructuración
  const { _id, name, specie, race, gender, age, description, isCastrated } = pet;

  const navigate = useNavigate();

  // --- HELPER: Emojis según especie ---
  const getSpecieEmoji = (text) => {
    if (!text) return "🐾";
    const lower = text.toLowerCase().trim();
    if (lower.includes("perro") || lower.includes("dog")) return "🐶";
    if (lower.includes("gato") || lower.includes("cat")) return "🐱";
    if (lower.includes("conejo")) return "🐰";
    if (lower.includes("ave") || lower.includes("pajaro")) return "🐦";
    return "🐾";
  };

  const formatGender = (text) => {
    if (!text) return "";
    const lower = text.toLowerCase().trim();
    if (lower === "macho" || lower === "male") return "♂️ Macho";
    if (lower === "hembra" || lower === "female") return "♀️ Hembra";
    return text;
  };

  // --- HELPER: Badge de Estado ---
  const getStatusBadge = (currentStatus) => {
    const style = {
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom: "10px",
      display: "inline-block"
    };

    switch (currentStatus) {
      case "available":
        return <span style={{ ...style, backgroundColor: "#d4edda", color: "#155724", border: "1px solid #c3e6cb" }}>✅ Disponible</span>;
      case "awaiting":
        return <span style={{ ...style, backgroundColor: "#fff3cd", color: "#856404", border: "1px solid #ffeeba" }}>⏳ En Proceso</span>;
      case "adopted":
        return <span style={{ ...style, backgroundColor: "#cce5ff", color: "#004085", border: "1px solid #b8daff" }}>🏠 Adoptado</span>;
      case "rejected":
        return <span style={{ ...style, backgroundColor: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb" }}>❌ Rechazado</span>;
      default:
        return null;
    }
  };

  // --- FUNCIONES DE API ---
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
        setMessage({ text: `Solicitud enviada`, type: "success" });
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setMessage({ text: "Solicitud fallida", type: "error" });
      }
    } catch (error) { console.error(error); } 
    finally { setIsAdopting(false); }
  };

  const rejectAdoption = async () => {
    try {
      const res = await fetch(`${Constants.API_BASE_URL}:${Constants.API_PORT}/api/adoptions/reject-adoption/${_id}`, { method: "DELETE" });
      if (res.ok) setStatus("rejected");
    } catch (e) { console.error(e); }
  };

  const approveAdoption = async () => {
    try {
      const res = await fetch(`${Constants.API_BASE_URL}:${Constants.API_PORT}/api/adoptions/approve-adoption/${_id}`, { method: "PUT" });
      if (res.ok) setStatus("adopted");
    } catch (e) { console.error(e); }
  };

  const deleteAdoption = async () => {
    try {
      const res = await fetch(`${Constants.API_BASE_URL}:${Constants.API_PORT}/api/adoptions/delete-adoption/${_id}`, { method: "DELETE" });
      if (res.ok) { setIsDeleted(true); setStatus("available"); }
    } catch (e) { console.error(e); }
  };

  const deletePet = async () => {
    if (window.confirm("¿Estás seguro de eliminar esta mascota?")) {
      try {
        const res = await fetch(`${Constants.API_BASE_URL}:${Constants.API_PORT}/api/pets/deletePet/${_id}`, { method: "DELETE" });
        if (res.ok) setIsDeleted(true);
      } catch (e) { console.error(e); }
    }
  };

  const editPet = () => {
    navigate(`/agregarmascota?id=${pet._id}`);
  };

  // --- ESTILOS DE BOTONES MODERNOS ---
  const btnBase = {
    flex: 1,
    padding: '10px 15px',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const btnGreen = { ...btnBase, backgroundColor: '#28a745' }; // Verde (Editar / Adoptar)
  const btnRed = { ...btnBase, backgroundColor: '#dc3545' };   // Rojo (Borrar / Rechazar)
  const btnBlue = { ...btnBase, backgroundColor: '#007bff' };  // Azul (Reset)

  if (isDeleted && statusUpdate !== 'available') return null;

  return (
    <div className={`petCard ${isDeleted ? "petCardDeleted" : ""}`} style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {message && <div style={{ position: 'absolute', top: 0, width: '100%', zIndex: 10 }}><Message text={message.text} type={message.type} /></div>}
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <div style={{ fontSize: '3rem', lineHeight: 1 }}>{getSpecieEmoji(specie)}</div>
        <h3 style={{ margin: '5px 0', color: '#333' }}>{name}</h3>
        {getStatusBadge(statusUpdate)}
      </div>

      {/* Info Grid */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', 
        backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px', 
        fontSize: '0.9rem', color: '#555', marginBottom: '10px'
      }}>
        <div><strong>Especie:</strong> {specie}</div>
        <div><strong>Raza:</strong> {race}</div>
        <div><strong>Sexo:</strong> {formatGender(gender)}</div>
        <div><strong>Edad:</strong> {age} años</div>
        <div style={{ gridColumn: '1 / -1', borderTop: '1px dashed #ddd', paddingTop: '5px' }}>
             <strong>Castrado:</strong> {isCastrated ? <span style={{color:'green'}}>Sí ✅</span> : <span style={{color:'#d9534f'}}>No ❌</span>}
        </div>
      </div>

      <div style={{ flex: 1, marginBottom: '15px' }}>
        <p style={{ fontStyle: 'italic', color: '#666', fontSize: '0.95rem' }}>"{description}"</p>
      </div>

      {/* ACTIONS FOOTER */}
      <div className="pet-card-actions" style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
        
        {/* CASO 1: Admin gestionando adopciones */}
        {showAdoptButton && isAuthenticated() && isAdmin() && !isDeleted && (
          <>
             <button style={btnGreen} onClick={approveAdoption}>✅ Aprobar</button>
             <button style={btnRed} onClick={rejectAdoption}>🚫 Rechazar</button>
             <button style={btnBlue} onClick={deleteAdoption}>🔄 Reset</button>
          </>
        )}

        {/* CASO 2: Usuario Normal (Botón Adoptar) */}
        {showAdoptButton && isAuthenticated() && !isAdmin() && (
          <button 
            style={{ ...btnGreen, width: '100%', opacity: (isAdopting || statusUpdate !== 'available') ? 0.6 : 1 }} 
            onClick={() => adoptar(_id)}
            disabled={isAdopting || statusUpdate !== 'available'}
          >
            {statusUpdate === 'available' ? "❤️ ¡Quiero Adoptar!" : "🚫 No Disponible"}
          </button>
        )}

        {/* CASO 3: Admin en lista de mascotas (EDITAR / BORRAR) */}
        {!showAdoptButton && isAuthenticated() && isAdmin() && !isDeleted && (
          <>
            {/* Botón Editar VERDE y MODERNO */}
            <button 
                style={btnGreen} 
                onClick={editPet}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
                ✏️ Editar
            </button>
            
            {/* Botón Borrar ROJO y MODERNO */}
            <button 
                style={btnRed} 
                onClick={deletePet}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
                🗑️ Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PetCard;
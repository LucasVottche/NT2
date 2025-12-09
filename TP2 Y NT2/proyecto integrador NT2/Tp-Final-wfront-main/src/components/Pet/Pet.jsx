import React, { useState } from "react";
import { isAdmin, isAuthenticated, getUserId } from "../../lib/Auth";
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
  const navigate = useNavigate();

  // --- LÓGICA DE NEGOCIO (INTACTA) ---
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
        setMessage({ text: "Error al solicitar adopción", type: "error" });
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setIsAdopting(false);
    }
  };

  const rejectAdoption = async () => {
    try {
      const response = await fetch(
        `${Constants.API_BASE_URL}:${Constants.API_PORT}/api/adoptions/reject-adoption/${_id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setMessage({ text: `Adopción rechazada`, type: "success" });
        setStatus("rejected");
      }
    } catch (error) { console.error(error); }
  };

  const approveAdoption = async () => {
    try {
      const response = await fetch(
        `${Constants.API_BASE_URL}:${Constants.API_PORT}/api/adoptions/approve-adoption/${_id}`,
        { method: "PUT" }
      );
      if (response.ok) {
        setMessage({ text: `¡Adopción Aprobada!`, type: "success" });
        setStatus("adopted");
      }
    } catch (error) { console.error(error); }
  };

  const deleteAdoption = async () => {
    try {
      const response = await fetch(
        `${Constants.API_BASE_URL}:${Constants.API_PORT}/api/adoptions/delete-adoption/${_id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setMessage({ text: `Solicitud eliminada`, type: "success" });
        setIsDeleted(true);
      }
    } catch (error) { console.error(error); }
  };

  const deletePet = async () => {
    if(!window.confirm("¿Estás seguro de eliminar esta mascota permanentemente?")) return;
    try {
      const response = await fetch(
        `${Constants.API_BASE_URL}:${Constants.API_PORT}/api/pets/deletePet/${_id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setIsDeleted(true);
      }
    } catch (error) { console.error(error); }
  };

  const editPet = () => { navigate(`/agregarmascota?id=${pet._id}`); };

  // --- NUEVA ESTRUCTURA VISUAL ---
  if (isDeleted) return null; // Si se borró, no renderizamos nada

  return (
    <div className="petCard">
      {message && <Message text={message.text} type={message.type} />}
      
      {/* Header con Badge */}
      <div className="petCard-header">
        <h3>{name}</h3>
        <span className={`status-badge status-${statusUpdate === 'awaiting' ? 'awaiting' : statusUpdate}`}>
            {statusUpdate === 'awaiting' ? 'Pendiente' : 
             statusUpdate === 'adopted' ? 'Adoptado' : 
             statusUpdate === 'rejected' ? 'Rechazado' : 'Disponible'}
        </span>
      </div>

      {/* Cuerpo de la tarjeta */}
      <div className="petCard-body">
        <ul>
            <li><strong>Especie:</strong> {specie}</li>
            <li><strong>Raza:</strong> {race}</li>
            <li><strong>Sexo:</strong> {gender}</li>
            <li><strong>Edad:</strong> {age} años</li>
        </ul>
        <div className="description-box">
            <p>{description || "Sin descripción disponible."}</p>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="petCard-actions">
        {/* CASO 1: ADMIN GESTIONANDO ADOPCIONES */}
        {showAdoptButton && isAuthenticated() && isAdmin() && (
            <>
            <button className="btn btn-primary" onClick={approveAdoption}>Aprobar</button>
            <button className="btn btn-outline-danger" onClick={rejectAdoption}>Rechazar</button>
            <button className="btn btn-text" onClick={deleteAdoption}>Eliminar Solicitud</button>
            </>
        )}

        {/* CASO 2: USUARIO NORMAL QUERIENDO ADOPTAR */}
        {showAdoptButton && isAuthenticated() && !isAdmin() && statusUpdate !== 'adopted' && (
            <button className="btn btn-block btn-primary" onClick={() => adoptar(_id)} disabled={isAdopting}>
            {isAdopting ? "Procesando..." : "¡Quiero Adoptar!"}
            </button>
        )}

        {/* CASO 3: ADMIN GESTIONANDO MASCOTAS (CRUD) */}
        {!showAdoptButton && isAuthenticated() && isAdmin() && (
            <>
            <button className="btn btn-secondary" onClick={editPet}>Editar</button>
            <button className="btn btn-danger" onClick={deletePet}>Eliminar</button>
            </>
        )}
      </div>
    </div>
  );
};

export default PetCard;
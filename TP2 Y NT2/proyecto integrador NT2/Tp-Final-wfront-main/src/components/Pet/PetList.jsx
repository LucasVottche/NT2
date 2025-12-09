import React from 'react';
import Pet from "./Pet";
import "../../assets/styles/Pet.css"; // Aseguramos que cargue los estilos

const PetList = (props) => {
    // Si no hay mascotas, mostramos un mensaje amigable
    if (!props.pets || props.pets.length === 0) {
        return (
            <div style={{ textAlign: 'center', width: '100%', padding: '2rem', color: 'var(--text-light)' }}>
                <p>No se encontraron mascotas en esta sección.</p>
            </div>
        );
    }

    return (
        // Esta clase 'pet-list' activa el Grid del CSS nuevo
        <div className="pet-list">                 
            {props.pets.map((pet) => (
                <Pet key={pet._id} pet={pet} showAdoptButton={props.showAdoptButton} />
            ))}
        </div>
    );
}

export default PetList;
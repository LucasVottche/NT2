import React, { useState, useEffect } from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import PetList from "./PetList";
import Constants from "../../lib/Constants.js";
import { getUserId } from "../../lib/Auth";
import { Link } from "react-router-dom"; // <--- Importamos Link
import "../../assets/styles/Pet.css";

const MyPetsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = getUserId(); 
  
  const apiUrl = `${Constants.API_BASE_URL}:${Constants.API_PORT}/api/pets/user/${userId}`;

  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const { pets } = await response.json();
          setPets(pets);
        }
      } catch (error) { 
          console.error(error); 
      } finally {
          setLoading(false);
      }
    };

    if (userId) {
        fetchMyPets();
    }
  }, [apiUrl, userId]);

  return (
    <div className="main">
      <Navbar />
      <section className="container">
        <h1 style={{ marginBottom: '2rem', color: '#28a745' }}>🐶 Mis Mascotas Adoptadas 🐱</h1>
        
        {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Cargando tus compañeros...</p>
            </div>
        ) : pets.length > 0 ? (
            <PetList pets={pets} showAdoptButton={false} />
        ) : (
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                <h3>Aún no tienes mascotas.</h3>
                <p>¡Ve a la sección de adopción para encontrar a tu nuevo mejor amigo!</p>
                
                {/* CORREGIDO: Apunta a /adopt */}
                <Link to="/adopt" className="btn btn-primary mt-3">
                    Ir a Adoptar
                </Link>
            </div>
        )}

      </section>
      <Footer />
    </div>
  );
};

export default MyPetsPage;
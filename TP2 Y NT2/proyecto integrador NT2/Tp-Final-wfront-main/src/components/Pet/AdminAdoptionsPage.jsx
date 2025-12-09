import React, { useState, useEffect } from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import Pagination from "../Navigation/Pagination";
import PetList from "./PetList";
import Constants from "../../lib/Constants.js";
import "../../assets/styles/Pet.css";

const AdminAdoptionsPage = () => {
  const [pets, setPets] = useState([]);
  const [pageSize] = useState(6); // Aumenté a 6 para que se vea mejor el grid
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPets, setTotalPets] = useState(0);

  const apiUrl = `${Constants.API_BASE_URL}:${Constants.API_PORT}/api/pets/adopciones?pageSize=${pageSize}&page=${currentPage}`;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const { pets, totalPets } = await response.json();
          setPets(pets);
          setTotalPets(totalPets);
        }
      } catch (error) { console.error(error); }
    };
    fetchPets();
  }, [apiUrl, currentPage]);

  const handlePageChange = (newPage) => setCurrentPage(newPage);
  const totalPages = Math.floor(totalPets / pageSize);

  return (
    <div className="main">
      <Navbar />
      <section className="container">
        <h1 style={{ marginBottom: '2rem', color: 'var(--primary)' }}>Administrar Adopciones</h1>
        
        {/* Pasamos showAdoptButton={true} para ver botones de aprobar/rechazar */}
        <PetList pets={pets} showAdoptButton={true} />
        
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
      <Footer />
    </div>
  );
};

export default AdminAdoptionsPage;
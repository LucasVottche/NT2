import React, { useState, useEffect } from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import Pagination from "../Navigation/Pagination";
import PetList from "./PetList";
import Constants from "../../lib/Constants.js";
import "../../assets/styles/Pet.css";

const AdoptPage = () => {
  const [pets, setPets] = useState([]);
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPets, setTotalPets] = useState(0);

  // endpoint 'adoptables' trae solo las disponibles
  const apiUrl = `${Constants.API_BASE_URL}:${Constants.API_PORT}/api/pets/adoptables?pageSize=${pageSize}&page=${currentPage}`;

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
        <h1 style={{ marginBottom: '2rem', color: 'var(--secondary)' }}>¡Encuentra tu compañero!</h1>
        
        {/* showAdoptButton={true} para ver el botón "Quiero Adoptar" */}
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

export default AdoptPage;
import React, { useState, useEffect } from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import Pagination from "../Navigation/Pagination";
import PetList from "./PetList";
import Constants from "../../lib/Constants.js";
import "../../assets/styles/Pet.css";

const PetPage = () => {
  const [pets, setPets] = useState([]);
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPets, setTotalPets] = useState(0);

  const apiUrl = `${Constants.API_BASE_URL}:${Constants.API_PORT}/api/pets?pageSize=${pageSize}&page=${currentPage}`;

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
        <h1 style={{ marginBottom: '2rem' }}>Todas las Mascotas</h1>
        
        {/* Aquí showAdoptButton es false (o undefined) para ver botones de editar/borrar si es admin */}
        <PetList pets={pets} showAdoptButton={false} />
        
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

export default PetPage;
import React from "react";
import Navbar from "../Navigation/Navbar.jsx";
import Footer from "../Navigation/Footer.jsx";
import AgregarMascota from "./AgregarMascota.jsx";

const Administrator = () => {
  return (
    <div className="main">
      <Navbar />
      {/* Usamos 'container' del CSS global para centrar y dar margen */}
      <div className="container">
        <AgregarMascota />
      </div>
      <Footer />
    </div>
  );
};

export default Administrator;
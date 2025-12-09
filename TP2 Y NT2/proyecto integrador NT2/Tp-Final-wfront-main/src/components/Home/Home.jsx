import React from "react";
import Navbar from "../Navigation/Navbar.jsx";
import Banner from "../Navigation/Banner.jsx";
import Footer from "../Navigation/Footer.jsx";
import "../../assets/styles/Home.css";
import icono1 from "../../assets/images/Icono1.png";
import icono2 from "../../assets/images/Icono2.png";

const Home = () => {
  return (
    <div className="main">
      <Navbar />
      <Banner />
      
      {/* Contenedor Principal (Gris claro) */}
      <div className="main-conteiner">
        <div className="section">
          
          {/* Tarjeta 1: Buscar Mascota */}
          <div className="section-1">
            <img src={icono1} className="logo" alt="Buscar mascota"></img>
            <h2>ENCUENTRA TU AMIGO</h2>
            <p>
              ¿Buscas a tu compañero de vida perfecto? Nuestra aplicación es tu mejor aliada. 
              Filtra por ubicación, especie, raza y edad para asegurar que tu nuevo amigo 
              se adapte a tu estilo de vida. ¡Bríndale un hogar lleno de amor hoy mismo!
            </p>
          </div>

          {/* Tarjeta 2: Poner en Adopción */}
          <div className="section-2">
            <img src={icono2} className="logo" alt="Dar en adopción"></img>
            <h2>PON EN ADOPCIÓN</h2>
            <p>
              Haz la diferencia en la vida de un animalito. Conecta de manera segura 
              con amantes de los animales que buscan darles un hogar cálido. 
              ¡Únete a nuestra comunidad y hagamos juntos un mundo mejor para las mascotas!
            </p>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
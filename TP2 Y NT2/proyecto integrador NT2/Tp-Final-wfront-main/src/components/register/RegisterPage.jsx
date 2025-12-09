import React, { useState } from "react";
import Navbar from "../Navigation/Navbar.jsx";
import Footer from "../Navigation/Footer.jsx";
import "../../assets/styles/Register.css"; // Asegúrate de que este archivo tenga los estilos nuevos
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm.jsx";
import RegisterResult from "./RegisterResult.jsx";
import Constants from "../../lib/Constants.js"; // Usamos tu constante

const RegisterPage = () => {
  const navigate = useNavigate();
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [error, setError] = useState(null);

  const registerHandler = async (data) => {
    // 1. Preparar datos
    const registro = {
      firstName: data.firstName,
      lastName: data.lastName,
      age: parseInt(data.age), 
      role: data.role, 
      email: data.email,
      password: data.password,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registro),
    };

    try {
      const response = await fetch(`${Constants.API_BASE_URL}:${Constants.API_PORT}/api/users/register`, requestOptions);
      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(responseText || `Error ${response.status}`);
      }

      // Éxito
      setError(null);
      setSolicitudEnviada(true);
      setMostrarFormulario(false);

    } catch (error) {
      console.error("Error al registrar:", error);
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      
      setError(errorMessage);
      setSolicitudEnviada(true);
      setMostrarFormulario(false);
    }
  };

  return (
    <div className="main">
      <Navbar />

      {/* Renderizado Condicional */}
      {mostrarFormulario && <RegisterForm onSubmit={registerHandler} />}

      {solicitudEnviada && (
        <RegisterResult
          success={!error}
          message={error ? `Error: ${error}` : "Tu cuenta ha sido creada con éxito. ¡Ya puedes adoptar!"}
          onButtonClick={() => {
            if (error) {
                // Si falló, volvemos al formulario
                setSolicitudEnviada(false);
                setMostrarFormulario(true);
                setError(null);
            } else {
                // Si fue éxito, vamos al Home o Login
                navigate("/login");
            }
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default RegisterPage;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importamos Link para la navegación
import Navbar from "../Navigation/Navbar.jsx";
import Footer from "../Navigation/Footer.jsx";
import Constants from "../../lib/Constants.js";
import Message from "../Navigation/Message";
import "../../assets/styles/Login.css"; // Asegúrate de que este archivo tenga el CSS nuevo que te pasé

const Login = (props) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Estado para feedback visual al cargar
  const navigate = useNavigate();

  const LoginHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(""); // Limpiar mensajes previos

    const loginData = {
      email: event.target.Email.value,
      password: event.target.Password.value,
    };

    try {
      const response = await fetch(
        `${Constants.API_BASE_URL}:${Constants.API_PORT}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        }
      );

      if (!response.ok) {
        // Intentamos leer el mensaje de error del servidor si existe
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Credenciales incorrectas o error en el servidor");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        setMessage({
          text: "¡Bienvenido! Redirigiendo...",
          type: "success",
        });
        
        // Pequeño delay para que el usuario lea el mensaje de éxito
        setTimeout(() => {
            navigate("/adopt"); // O a "/" si prefieres ir al Home
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ 
          text: error.message || "Ocurrió un error al intentar ingresar.", 
          type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <Navbar />
      
      {/* Contenedor centrado (usa los estilos de Login.css nuevo) */}
      <section className="container-form">
        <form onSubmit={LoginHandler} className="form">
          <h2>Iniciar Sesión</h2>
          
          {message && <Message text={message.text} type={message.type} />}

          <div className="form-group">
            <label htmlFor="Email">Correo Electrónico</label>
            <input 
                type="email" 
                name="Email" 
                id="Email"
                placeholder="ejemplo@correo.com" 
                required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="Password">Contraseña</label>
            <input 
                type="password" 
                name="Password" 
                id="Password"
                placeholder="********" 
                required 
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Verificando..." : "Ingresar"}
          </button>

          {/* Link de ayuda para mejorar la UX */}
          <div className="form-footer" style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
            <p style={{ color: 'var(--text-light)' }}>
                ¿No tienes una cuenta? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Regístrate aquí</Link>
            </p>
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
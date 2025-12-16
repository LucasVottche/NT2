import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/AgregarMascota.css";
import Constants from "../../lib/Constants.js";
import Message from "../Navigation/Message";
import { useNavigate, useLocation } from "react-router-dom";

const AgregarMascota = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    specie: "",
    race: "",
    gender: "",
    age: "",
    description: "",
    province: "",
    isCastrated: false, // Estado inicial booleano
  });

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const petId = queryParams.get("id");

    if (petId) {
      fetch(`${Constants.API_BASE_URL}:${Constants.API_PORT}/api/pets/${petId}`)
        .then((response) => response.json())
        .then((data) => {
          setForm({
            name: data.name || "",
            specie: data.specie || "",
            race: data.race || "",
            gender: data.gender || "",
            age: data.age || "",
            description: data.description || "",
            province: data.province || "",
            // Aseguramos que si viene null/undefined sea false
            isCastrated: data.isCastrated === true, 
          });
          setIsUpdating(true);
        })
        .catch((error) => console.error("Error fetching pet data:", error));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    let value = target.value;

    // LÓGICA ESPECIAL PARA CASTRADO (Select que devuelve strings "true"/"false")
    if (name === 'isCastrated') {
        // Convertimos el string del select a un booleano real para el estado
        value = value === 'true';
    }
    // Si tuvieras otros checkboxes reales:
    else if (target.type === 'checkbox') {
         value = target.checked;
    }

    setForm({ ...form, [name]: value });
  };

  const petId = new URLSearchParams(location.search).get("id");
  let buttonMessage = petId ? "Actualizar Mascota" : "Guardar Mascota";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let responseFetch;
      const endpoint = petId 
        ? `${Constants.API_BASE_URL}:${Constants.API_PORT}/api/pets/updatePet/${petId}`
        : `${Constants.API_BASE_URL}:${Constants.API_PORT}/api/pets/addPet`;

      const method = petId ? "PUT" : "POST";

      // El estado 'isCastrated' ya es booleano, se envía correctamente en el JSON
      responseFetch = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), 
      });

      if (responseFetch.ok) {
        setMessage({
          text: `¡Éxito! Mascota ${isUpdating ? "actualizada" : "agregada"} correctamente.`,
          type: "success",
        });
        setTimeout(() => {
          navigate("/pets");
        }, 2000); 
      } else {
        setMessage({
          text: `Error al procesar la solicitud.`,
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: `Error de conexión: ${error}`,
        type: "error",
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cargar-mascotas">
      <h2 className="text-center mb-4">
        {petId ? "Editar Mascota" : "Nueva Mascota"}
      </h2>

      {message && <Message text={message.text} type={message.type} />}

      <form onSubmit={handleSubmit} className="dar-adoptar-form">
        
        {/* Fila 1: Nombre, Edad y Castrado (Ahora visualmente consistentes) */}
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              maxLength="12"
              placeholder="Ej: Toby"
            />
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="age">Edad (años)</label>
            <input
              type="number"
              id="age"
              name="age"
              value={form.age}
              onChange={handleChange}
              required
              placeholder="Ej: 2"
            />
          </div>

          {/* --- MEJORA VISUAL: USAR SELECT EN LUGAR DE CHECKBOX --- */}
          <div className="form-group col-md-3">
             <label htmlFor="isCastrated">¿Está Castrado?</label>
             {/* Usamos un select con className="form-control" para que se vea igual a los otros inputs */}
             <select
                id="isCastrated"
                name="isCastrated"
                // Convertimos el booleano a string para que el select muestre la opción correcta
                value={form.isCastrated.toString()} 
                onChange={handleChange}
                required
                className="form-control"
            >
                {/* Los valores son strings "false" y "true" que handleChange convierte a booleanos */}
                <option value="false">No</option>
                <option value="true">Sí</option>
            </select>
          </div>
          {/* ----------------------------------------------------- */}
        </div>

        {/* Fila 2: Detalles */}
        <div className="row">
          <div className="form-group col-md-4">
            <label htmlFor="specie">Especie</label>
            <input
              type="text"
              id="specie"
              name="specie"
              value={form.specie}
              onChange={handleChange}
              required
              placeholder="Ej: Perro"
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="race">Raza</label>
            <input
              type="text"
              id="race"
              name="race"
              value={form.race}
              onChange={handleChange}
              required
              placeholder="Ej: Labrador"
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="gender">Género</label>
            <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="form-control"
            >
                <option value="">Seleccionar</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
            </select>
          </div>
        </div>

        {/* Fila 3: Ubicación y Descripción */}
        <div className="form-group">
            <label htmlFor="province">Ubicación (Provincia/Ciudad)</label>
            <input
                type="text"
                id="province"
                name="province"
                value={form.province}
                onChange={handleChange}
                required
                placeholder="Ej: Buenos Aires"
            />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Cuenta un poco sobre su personalidad..."
          />
        </div>

        {/* Botón de Acción */}
        <div className="form-group mt-3">
          <button
            type="submit"
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? "Guardando..." : buttonMessage}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AgregarMascota;
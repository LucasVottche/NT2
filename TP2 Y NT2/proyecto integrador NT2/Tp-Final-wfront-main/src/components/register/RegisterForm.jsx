import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const RegisterForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <div className="container-form">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>Crear Cuenta</h2>
        
        {/* Nombre */}
        <div className="form-group">
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            placeholder="Ej: Juan"
            {...register("firstName", {
              required: "El nombre es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
          />
          {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
        </div>

        {/* Apellido */}
        <div className="form-group">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            placeholder="Ej: Pérez"
            {...register("lastName", {
              required: "El apellido es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
          />
          {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
        </div>

        {/* Edad - Ahora ocupa su propia fila */}
        <div className="form-group">
            <label htmlFor="age">Edad</label>
            <input
                type="number"
                placeholder="Ej: 25"
                {...register("age", {
                required: "Obligatorio",
                valueAsNumber: true,
                min: { value: 13, message: "+13 años" },
                max: { value: 100, message: "Edad no válida" },
                })}
            />
            {errors.age && <p className="error-text">{errors.age.message}</p>}
        </div>

        {/* SECCIÓN DE ROL ELIMINADA */}

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="juan@ejemplo.com"
            {...register("email", { required: "El email es obligatorio" })}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            placeholder="********"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
            })}
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registrando..." : "Registrarme"}
        </button>

        <div className="form-footer" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            <p>¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Ingresa aquí</Link></p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
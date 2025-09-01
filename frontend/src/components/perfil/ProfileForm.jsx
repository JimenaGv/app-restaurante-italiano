import React, { useState } from "react";
import { useForm } from "react-hook-form";


export const ProfileForm = () => {
  // // Estado que controla si el formulario está en modo edición: false = inputs bloqueados, true = inputs editables
  const [isEditing, setIsEditing] = useState(false);
   // Hook de react-hook-form
  const {
    register,        // Registrar cada input
    handleSubmit,    // Manejar envío del formulario
    formState: { errors } // Contiene los errores
  } = useForm({
    defaultValues: {
      nombre: "Sophia",
      apellidos: "Rossi",
      correo: "sophia.rossi@email.com",
      telefono: "+1234 567 890"
    }
  });

  // Función de guardar
  const onSubmit = (data) => {
    console.log("Datos guardados:", data);
    setIsEditing(false); // Bloquea de nuevo el formulario
  };

  // Función que activa la edición
  const handleToggleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <>
      <h2 className="title">Información del perfil</h2>

      <form className="form" onSubmit={isEditing ? handleSubmit(onSubmit) : handleToggleEdit}>

  
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            disabled={!isEditing}
            {...register("nombre", { required: "El nombre es obligatorio" })}
          />
          {errors.nombre && <p className="error">{errors.nombre.message}</p>}
        </div>

        <div className="form-group">
          <label>Apellidos</label>
          <input
            type="text"
            disabled={!isEditing}
            {...register("apellidos", { required: "Los apellidos son obligatorios" })}
          />
          {errors.apellidos && <p className="error">{errors.apellidos.message}</p>}
        </div>

        <div className="form-group full">
          <label>Correo electrónico</label>
          <input
            type="email"
            disabled={!isEditing}
            {...register("correo", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "El correo no es válido"
              }
            })}
          />
          {errors.correo && <p className="error">{errors.correo.message}</p>}
        </div>

        <div className="form-group full">
          <label>Número de teléfono</label>
          <input
            type="tel"
            disabled={!isEditing}
            {...register("telefono", {
              required: "El número es obligatorio",
              pattern: {
                value: /^[0-9+\s-]{8,15}$/,
                message: "El número no es válido"
              }
            })}
          />
          {errors.telefono && <p className="error">{errors.telefono.message}</p>}
        </div>

        <div className="form-actions full">
          <button type="submit" className="btn">
            {isEditing ? "Guardar información" : "Actualizar información"}
          </button>
        </div>
      </form>
    </>
  );
};



 
import React from "react";

export const ProfileForm = () => {
  return (
    <>
      <h2 className="title">Información del perfil</h2>
      <form className="form">
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" defaultValue="Sophia" />
        </div>
        <div className="form-group">
          <label>Apellidos</label>
          <input type="text" defaultValue="Rossi" />
        </div>
        <div className="form-group full">
          <label>Correo electrónico</label>
          <input type="email" defaultValue="sophia.rossi@email.com" />
        </div>
        <div className="form-group full">
          <label>Número de teléfono</label>
          <input type="tel" defaultValue="+1234 567 890" />
        </div>
        <div className="form-group full">
          <label>Dirección</label>
          <input type="text" defaultValue="123 Via del Corso" />
        </div>
        <div className="form-group">
          <label>Ciudad</label>
          <input type="text" defaultValue="Roma" />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <input type="text" defaultValue="Lazio" />
        </div>
        <div className="form-group full">
          <label>Código postal</label>
          <input type="text" defaultValue="00186" />
        </div>
        <div className="form-actions full">
          <button type="submit" className="btn">
            Actualizar información
          </button>
        </div>
      </form>
    </>
  );
};
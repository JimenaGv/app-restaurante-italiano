import React, { useState } from "react";
import "../styles/perfil.css";
import { Navbar } from "../components/Navbar";
import { NavbarProvider } from "../context/navbarContext";
import { ProfileForm } from "../components/perfil/ProfileForm";
import { Orders } from "../components/perfil/Orders";
import { PaymentMethods } from "../components/perfil/PaymentMethods";

export const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("perfil");
  const [avatar, setAvatar] = useState("../public/fotoUsuario.png"); // valor inicial

  // manejar carga de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <NavbarProvider>
      <div className="page">
      
        <div className="container">
          {/* Sidebar */}
          <aside className="sidebar">
            <label htmlFor="avatar-upload" className="avatar-wrapper">
              <img src={avatar} alt="Avatar" className="avatar-lg" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
            <h2 className="username">Sophia Rossi</h2>

            <nav className="sidebar-links">
              <button
                className={activeSection === "perfil" ? "active" : ""}
                onClick={() => setActiveSection("perfil")}
              >
                Perfil
              </button>
              <button
                className={activeSection === "pedidos" ? "active" : ""}
                onClick={() => setActiveSection("pedidos")}
              >
                Pedidos
              </button>
              <button
                className={activeSection === "pagos" ? "active" : ""}
                onClick={() => setActiveSection("pagos")}
              >
                Métodos de Pago
              </button>
            </nav>
          </aside>

          {/* Informacion cada perfil */}
          <main className="content">
            {activeSection === "perfil" && <ProfileForm />}
            {activeSection === "pedidos" && <Orders />}
            {activeSection === "pagos" && <PaymentMethods />}
          </main>
        </div>
      </div>
    </NavbarProvider>
  );
};

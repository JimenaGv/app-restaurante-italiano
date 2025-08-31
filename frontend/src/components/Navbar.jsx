import React from "react";
import { useNavbar } from "../context/navbarContext";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { isLoggedIn, login, logout } = useNavbar();

  return (
    <nav className="navbar">
      {/* Logo */}
       <Link to="/home" className="logo">
        <img 
          src="/logoOscuro.png"     // 👈 pon aquí la ruta de tu logo en public/
          alt="Bella Italia"
          className="logo-img"
        />
      </Link>

      {/* Links */}
      <ul className="nav-links">
        <li>Menú</li>
        <li>Ubicación</li>
        <li>Historia</li>
        <li>Contacto</li>
      </ul>

      {/* Acciones */}
      <div className="nav-actions">
        {isLoggedIn ? (
          <>
            <button className="icon-btn"><img src="https://img.icons8.com/?size=100&id=0DBkCUANmgoQ&format=png&color=000000" alt="" /></button>
            <Link to="/perfil"> 
            <img
              src="https://i.pravatar.cc/50"
              alt="Perfil"
              className="avatar"
            />
            </Link>
            {/*
            <button onClick={logout} className="logout-btn">
              Cerrar sesión
            </button>
            */}    
          </>
        ) : (
          <button onClick={login} className="login-btn">
            Iniciar sesión
          </button>
        )}
      </div>
    </nav>
  );
};
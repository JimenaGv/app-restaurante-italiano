import React from "react";
import "../styles/perfil.css";
import { Navbar } from "../components/Navbar";
import { NavbarProvider } from "../context/navbarContext";

export const UserProfile = () => {
  return (
    <NavbarProvider>
      <div className="page">
        {/* Navbar */}
        <Navbar />
      </div>
    </NavbarProvider>
  );
};
import React, { createContext, useState, useContext } from "react";

// 1. Crear el contexto
const NavbarContext = createContext();

// 2. Crear el Provider
export const NavbarProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <NavbarContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </NavbarContext.Provider>
  );
};

// 3. Hook para usar el contexto
export const useNavbar = () => {
  return useContext(NavbarContext);
  };
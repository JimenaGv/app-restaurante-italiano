import React, { createContext, useState, useContext, useEffect } from 'react'

// 1. Crear el contexto
const NavbarContext = createContext()

// 2. Crear el Provider
export const NavbarProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Verificar si ya está logueado al cargar la página
  useEffect(() => {
    const usuario = localStorage.getItem('usuario')
    const token = localStorage.getItem('token')

    if (usuario && token) {
      setIsLoggedIn(true)
    }
  }, [])

  const login = () => setIsLoggedIn(true)

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('usuario')
    localStorage.removeItem('token')
  }

  return (
    <NavbarContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </NavbarContext.Provider>
  )
}

// 3. Hook para usar el contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useNavbar = () => {
  return useContext(NavbarContext)
}

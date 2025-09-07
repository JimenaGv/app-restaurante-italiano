import React, { createContext, useState, useContext, useEffect } from 'react'

const NavbarContext = createContext()

export const NavbarProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Inicializar basado en si hay token en localStorage
    return !!localStorage.getItem('token')
  })

  useEffect(() => {
    const handleAuthChange = (event) => {
      setIsLoggedIn(event.detail.isLoggedIn)
    }

    window.addEventListener('authStateChanged', handleAuthChange)
    return () => window.removeEventListener('authStateChanged', handleAuthChange)
  }, [])

  const login = () => setIsLoggedIn(true)
  const logout = () => setIsLoggedIn(false)

  return (
    <NavbarContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </NavbarContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNavbar = () => {
  return useContext(NavbarContext)
}

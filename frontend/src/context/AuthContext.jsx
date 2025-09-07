import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_URL = 'http://localhost:3000/api'

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('usuario')

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Si hay datos de usuario guardados, cargarlos
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
          setIsLoggedIn(true)
          // Sincronizar con navbarContext
          window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { isLoggedIn: true } }))
        } catch (error) {
          console.error('Error parsing user data:', error)
          logout()
        }
      } else {
        // Si hay token pero no datos de usuario, verificar token
        verifyToken()
      }
    } else {
      setLoading(false)
    }
  }, [])

  // Verificar si el token es válido
  const verifyToken = async () => {
    try {
      const response = await axios.get(`${API_URL}/verify-token`)
      setUser(response.data.user)
      setIsLoggedIn(true)

      // Guardar datos del usuario
      localStorage.setItem('usuario', JSON.stringify(response.data.user))
      // Sincronizar con navbarContext
      window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { isLoggedIn: true } }))
    } catch (error) {
      console.error('Token inválido:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  // Función de registro
  const register = async (userData) => {
    try {
      // Adaptar los nombres de campos para el backend
      const registerData = {
        nombre: userData.nombre,
        correo: userData.email || userData.correo,
        contraseña: userData.password || userData.contrasena || userData.contraseña
      }

      const response = await axios.post(`${API_URL}/register`, registerData)
      const { token, user } = response.data

      // Guardar token y datos de usuario
      localStorage.setItem('token', token)
      localStorage.setItem('usuario', JSON.stringify(user))
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser(user)
      setIsLoggedIn(true)

      // Sincronizar con navbarContext
      window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { isLoggedIn: true } }))

      return { success: true, message: 'Usuario registrado exitosamente' }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Error al registrar usuario'
      }
    }
  }

  // Función de login
  const login = async (credentials) => {
    try {
      // Adaptar los nombres de campos para el backend
      const loginData = {
        correo: credentials.email || credentials.correo,
        contraseña: credentials.password || credentials.contraseña
      }

      const response = await axios.post(`${API_URL}/login`, loginData)
      const { token, user } = response.data

      // Guardar token y datos de usuario
      localStorage.setItem('token', token)
      localStorage.setItem('usuario', JSON.stringify(user))
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser(user)
      setIsLoggedIn(true)

      // Sincronizar con navbarContext
      window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { isLoggedIn: true } }))

      return { success: true, message: 'Inicio de sesión exitoso', user }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Error al iniciar sesión'
      }
    }
  }

  // Función de logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    setIsLoggedIn(false)

    // Sincronizar con navbarContext
    window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { isLoggedIn: false } }))
  }

  const value = {
    isLoggedIn,
    user,
    loading,
    register,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para usar el contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

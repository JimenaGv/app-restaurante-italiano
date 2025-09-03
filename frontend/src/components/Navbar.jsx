// src/components/navbar.jsx - Versión actualizada
import { useNavbar } from '../context/navbarContext'
import '../styles/navbar.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AuthModal from './AuthModal' // Nueva importación

export const Navbar = () => {
  const { isLoggedIn, login, logout } = useNavbar()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState(null)

  // Verificar datos del usuario al cargar
  useEffect(() => {
    const userData = localStorage.getItem('usuario')
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [isLoggedIn])

  // Función para abrir el modal
  const handleLoginClick = () => {
    setIsAuthModalOpen(true)
  }

  // Función para cerrar el modal
  const closeModal = () => {
    setIsAuthModalOpen(false)
  }

  // Función para manejar logout
  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUser(null)

    // Usar la función logout del context
    logout()
  }

  return (
    <>
      <nav className='navbar'>
        {/* Logo */}
        <Link to='/' className='logo'>
          <img
            src='/logoOscuro.png'
            alt='Bella Italia'
            className='logo-img'
          />
        </Link>

        {/* Links */}
        <ul className='nav-links'>
          <Link to='/menu'>
            <li>Menú</li>
          </Link>
          <li>Ubicación</li>
          <li>Historia</li>
          <li>Contacto</li>
        </ul>

        {/* Acciones */}
        <div className='nav-actions'>
          {
            isLoggedIn
              ? (
                <>
                  <button className='icon-btn'>
                    <img src='https://img.icons8.com/?size=100&id=0DBkCUANmgoQ&format=png&color=000000' alt='' />
                  </button>
                  <Link to='/perfil'>
                    <img
                      src='https://i.pravatar.cc/50'
                      alt='Perfil'
                      className='avatar'
                    />
                  </Link>
                  {/* Mostrar nombre del usuario si está disponible */}
                  {user && (
                    <span className='welcome-text'>
                      ¡Hola, {user.nombre}!
                    </span>
                  )}
                  {/* Botón de logout (opcional, descomenta si lo quieres visible) */}
                  <button onClick={handleLogout} className='logout-btn'>
                    Cerrar sesión
                  </button>
                </>
                )
              : (
                <button onClick={handleLoginClick} className='login-btn'>
                  Iniciar sesión
                </button>
                )
          }
        </div>
      </nav>

      {/* Modal de autenticación */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeModal} />
    </>
  )
}

import { useNavbar } from '../context/navbarContext'
import { useCarrito } from '../context/carrito'
import '../styles/navbar.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const Navbar = () => {
  const { isLoggedIn, logout } = useNavbar()
  const [user, setUser] = useState(null)
  const [avatar, setAvatar] = useState('/fotoUsuario.png') // avatar por defecto
  const { totalPlatillos } = useCarrito()

  useEffect(() => {
    const userData = localStorage.getItem('usuario')
    if (userData && isLoggedIn) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Traer avatar desde backend
      const fetchAvatar = async () => {
        try {
          const res = await fetch(`http://localhost:3000/perfil/${parsedUser.id}`)
          const data = await res.json()
          if (res.ok || res.status === 200) {
            setAvatar(data.avatar || '/fotoUsuario.png')
          } else {
            console.error(data.mensaje)
          }
        } catch (err) {
          console.error('Error al cargar avatar:', err)
        }
      }

      fetchAvatar()
    } else {
      setUser(null)
      setAvatar('/fotoUsuario.png')
    }
  }, [isLoggedIn])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUser(null)
    setAvatar('/fotoUsuario.png')
    logout()
  }

  return (
    <nav className='navbar'>
      {/* Logo */}
      <Link to='/' className='logo'>
        <img src='/logoOscuro.png' alt='Bella Italia' className='logo-img' />
      </Link>

      {/* Links */}
      <ul className='nav-links'>
        <Link to='/menu'><li>Menú</li></Link>
        <Link to='/ubicacion'><li>Ubicación</li></Link>
        <Link to='/historia'><li>Historia</li></Link>
        <Link to='/contacto'><li>Contacto</li></Link>
      </ul>

      {/* Acciones */}
      <div className='nav-actions'>
        {isLoggedIn
          ? (
            <>
              <Link to='/carrito'>
                <button className='icon-btn icon-carrito'>
                  <img src='https://img.icons8.com/?size=100&id=0DBkCUANmgoQ&format=png&color=000000' alt='' />
                  <span className='carrito-badge'>{totalPlatillos}</span>
                </button>
              </Link>

              <Link to='/perfil'>
                <img src={avatar} alt='Perfil' className='avatar' />
              </Link>

              {user && <span className='welcome-text'>¡Hola, {user.nombre}!</span>}

              <button onClick={handleLogout} className='logout-btn'>
                Cerrar sesión
              </button>
            </>
            )
          : (
            <Link to='/login' className='login-btn'>Iniciar sesión</Link>
            )}
      </div>
    </nav>
  )
}

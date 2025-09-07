import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/carrito'
import '../styles/navbar.css'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth()
  const { totalPlatillos } = useCarrito()

  const handleLogout = () => {
    logout()
  }

  return (
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
        <Link to='/historia'>
          <li>Historia</li>
        </Link>
        <li>Contacto</li>
      </ul>

      {/* Acciones */}
      <div className='nav-actions'>
        {
          isLoggedIn
            ? (
              <>
                <Link to='/carrito'>
                  <button className='icon-btn icon-carrito'>
                    <img src='https://img.icons8.com/?size=100&id=0DBkCUANmgoQ&format=png&color=000000' alt='' />
                    <span className='carrito-badge'>
                      {totalPlatillos}
                    </span>
                  </button>
                </Link>

                <Link to='/perfil'>
                  <img
                    src='https://i.pravatar.cc/50'
                    alt='Perfil'
                    className='avatar'
                  />
                </Link>
                {user && (
                  <span className='welcome-text'>
                    ¡Hola, {user.nombre}!
                  </span>
                )}
                <button onClick={handleLogout} className='logout-btn'>
                  Cerrar sesión
                </button>
              </>
              )
            : (
              <Link to='/login' className='login-btn'>
                Iniciar sesión
              </Link>
              )
        }
      </div>
    </nav>
  )
}

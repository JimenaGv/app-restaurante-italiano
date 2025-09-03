import { useNavbar } from '../context/navbarContext'
import { useCarrito } from '../context/carrito'
import '../styles/navbar.css'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  const { isLoggedIn, login, logout } = useNavbar()
  const { totalPlatillos } = useCarrito()

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
        <li>Historia</li>
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
                {/*
              <button onClick={logout} className="logout-btn">
                Cerrar sesión
              </button>
              */}
              </>
              )
            : (
              <button onClick={login} className='login-btn'>
                Iniciar sesión
              </button>
              )
        }
      </div>
    </nav>
  )
}

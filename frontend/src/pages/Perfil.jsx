import { useEffect, useState } from 'react'
import '../styles/perfil.css'
import { NavbarProvider } from '../context/navbarContext'
import { ProfileForm } from '../components/perfil/ProfileForm'
import { Direcciones } from '../components/perfil/Direcciones'
import { Orders } from '../components/perfil/Orders'
import MetodosPago from '../components/perfil/PaymentMethods'
import { useLocation } from 'react-router-dom'

export const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('perfil')
  const [avatar, setAvatar] = useState('/fotoUsuario.png') // Imagen local

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAvatar(imageUrl)
    }
  }

  const location = useLocation()

  useEffect(() => {
    if (location.state?.section) {
      setActiveSection(location.state.section)
    }
  }, [location.state])

  return (
    <NavbarProvider>
      <div className='page'>
        <div className='container'>
          {/* Sidebar */}
          <aside className='sidebar'>
            <label htmlFor='avatar-upload' className='avatar-wrapper'>
              <img src={avatar} alt='Avatar' className='avatar-lg' />
              <input
                id='avatar-upload'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
            <h2 className='username'>Perfil de Usuario</h2>

            <nav className='sidebar-links'>
              <button
                className={activeSection === 'perfil' ? 'active' : ''}
                onClick={() => setActiveSection('perfil')}
              >
                Perfil
              </button>
              <button
                className={activeSection === 'pedidos' ? 'active' : ''}
                onClick={() => setActiveSection('pedidos')}
              >
                Pedidos
              </button>
              <button
                className={activeSection === 'pagos' ? 'active' : ''}
                onClick={() => setActiveSection('pagos')}
              >
                Métodos de Pago
              </button>
              <button
                className={activeSection === 'direcciones' ? 'active' : ''}
                onClick={() => setActiveSection('direcciones')}
              >
                Direcciones
              </button>
            </nav>
          </aside>

          {/* Contenido dinámico */}
          <main className='content'>
            {activeSection === 'perfil' && <ProfileForm />}
            {activeSection === 'pedidos' && <Orders />}
            {activeSection === 'pagos' && <MetodosPago />}
            {activeSection === 'direcciones' && <Direcciones />}
          </main>
        </div>
      </div>
    </NavbarProvider>
  )
}

import { useEffect, useState } from 'react'
import '../styles/perfil.css'
import { NavbarProvider } from '../context/navbarContext'
import { ProfileForm } from '../components/perfil/ProfileForm'
import { Direcciones } from '../components/perfil/Direcciones'
import { Orders } from '../components/perfil/Orders'
import MetodosPago from '../components/perfil/PaymentMethods'
import { useLocation } from 'react-router-dom'
import { api } from '../services/api'

export const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('perfil')
  const [avatar, setAvatar] = useState('/fotoUsuario.png')
  const [userId, setUserId] = useState(null)
  const location = useLocation()

  // Cargar userId desde localStorage
  useEffect(() => {
    const userData = localStorage.getItem('usuario')
    if (userData) setUserId(JSON.parse(userData).id)
  }, [])

  // Cargar avatar y datos del usuario desde backend
  useEffect(() => {
    if (!userId) return

    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/perfil/${userId}`)
        setAvatar(data.avatar || '/fotoUsuario.png')
      } catch (err) {
        console.error('Error al cargar usuario', err)
      }
    }

    fetchUser()
  }, [userId])

  useEffect(() => {
    if (location.state?.section) setActiveSection(location.state.section)
  }, [location.state])

  // Subir nueva imagen de avatar
  const handleImageChange = async (e) => {
    if (!userId) return console.error('Usuario no encontrado')

    const file = e.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append('avatar', file)

      try {
        const { data } = await api.post(`/perfil/avatar/${userId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        setAvatar(data.avatar)
      } catch (err) {
        console.error('Error al subir la imagen', err)
      }
    }
  }

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

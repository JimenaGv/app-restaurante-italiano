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
  const [preview, setPreview] = useState(null)
  const [userId, setUserId] = useState(null)
  const [uploadMessage, setUploadMessage] = useState('')
  const location = useLocation()

  useEffect(() => {
    const userData = localStorage.getItem('usuario')
    if (userData) setUserId(JSON.parse(userData).id)
  }, [])

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

  const handleImageChange = async (e) => {
    if (!userId) return console.error('Usuario no encontrado')

    const file = e.target.files[0]
    if (!file) return

    // Validación básica
    if (!file.type.startsWith('image/')) {
      setUploadMessage('Solo se permiten archivos de imagen.')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setUploadMessage('La imagen debe pesar menos de 2MB.')
      return
    }

    // Vista previa
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const { data } = await api.post(`/perfil/avatar/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setAvatar(data.avatar)
      setUploadMessage('¡Tu nueva foto se ve increíble!')
    } catch (err) {
      console.error('Error al subir la imagen', err)
      setUploadMessage('Hubo un problema al subir tu imagen. Intenta más tarde.')
    }
  }

  return (
    <NavbarProvider>
      <div className='page'>
        <div className='container'>
          <aside className='sidebar'>
            <label htmlFor='avatar-upload' className='avatar-wrapper'>
              <img
                src={preview || avatar}
                alt='Avatar'
                className='avatar-lg'
              />
              <input
                id='avatar-upload'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
            {uploadMessage && <p className='upload-message'>{uploadMessage}</p>}
            <h2 className='username'>Perfil de Usuario</h2>

            <nav className='sidebar-links'>
              <button className={activeSection === 'perfil' ? 'active' : ''} onClick={() => setActiveSection('perfil')}>Perfil</button>
              <button className={activeSection === 'pedidos' ? 'active' : ''} onClick={() => setActiveSection('pedidos')}>Pedidos</button>
              <button className={activeSection === 'pagos' ? 'active' : ''} onClick={() => setActiveSection('pagos')}>Métodos de Pago</button>
              <button className={activeSection === 'direcciones' ? 'active' : ''} onClick={() => setActiveSection('direcciones')}>Direcciones</button>
            </nav>
          </aside>

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

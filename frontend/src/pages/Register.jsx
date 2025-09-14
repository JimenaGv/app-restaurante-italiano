import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useNavbar } from '../context/navbarContext'
import '../styles/auth-pages.css'
import { api } from '../services/api'

const Register = () => {
  const navigate = useNavigate()
  const { login } = useNavbar()

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio'
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres'
    }

    if (!formData.correo) {
      newErrors.correo = 'El correo es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'Ingresa un correo válido'
    }

    if (!formData.contraseña) {
      newErrors.contraseña = 'La contraseña es obligatoria'
    } else if (formData.contraseña.length < 6) {
      newErrors.contraseña = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (!formData.confirmarContraseña) {
      newErrors.confirmarContraseña = 'Confirma tu contraseña'
    } else if (formData.contraseña !== formData.confirmarContraseña) {
      newErrors.confirmarContraseña = 'Las contraseñas no coinciden'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      const { data } = await api.post('/api/register', {
        nombre: formData.nombre.trim(),
        correo: formData.correo,
        contraseña: formData.contraseña
      })

      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))

      login()
      navigate('/')
      alert('¡Cuenta creada exitosamente!')
    } catch (error) {
      console.error('Error:', error)
      setErrors({
        general: error.response?.data?.mensaje || 'Error al crear la cuenta'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-page-container'>
      <div className='auth-container'>
        <div className='auth-header'>
          <h1>Crear Cuenta</h1>
        </div>

        {errors.general && (
          <div className='error-banner'>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className='auth-form'>
          <div className='form-group'>
            <label htmlFor='nombre'>Nombre completo</label>
            <input
              type='text'
              id='nombre'
              name='nombre'
              value={formData.nombre}
              onChange={handleChange}
              className={errors.nombre ? 'error' : ''}
              placeholder='Juan Pérez'
            />
            {errors.nombre && <span className='error-message'>{errors.nombre}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='correo'>Correo electrónico</label>
            <input
              type='email'
              id='correo'
              name='correo'
              value={formData.correo}
              onChange={handleChange}
              className={errors.correo ? 'error' : ''}
              placeholder='ejemplo@gmail.com'
            />
            {errors.correo && <span className='error-message'>{errors.correo}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='contraseña'>Contraseña</label>
            <input
              type='password'
              id='contraseña'
              name='contraseña'
              value={formData.contraseña}
              onChange={handleChange}
              className={errors.contraseña ? 'error' : ''}
              placeholder='••••••••'
            />
            {errors.contraseña && <span className='error-message'>{errors.contraseña}</span>}
          </div>

          <div className='form-group'>
            <label htmlFor='confirmarContraseña'>Confirmar contraseña</label>
            <input
              type='password'
              id='confirmarContraseña'
              name='confirmarContraseña'
              value={formData.confirmarContraseña}
              onChange={handleChange}
              className={errors.confirmarContraseña ? 'error' : ''}
              placeholder='••••••••'
            />
            {errors.confirmarContraseña && <span className='error-message'>{errors.confirmarContraseña}</span>}
          </div>

          <button
            type='submit'
            className='submit-btn'
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className='auth-footer'>
          <p>
            ¿Ya tienes cuenta?
            <Link to='/login' className='toggle-link'>
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

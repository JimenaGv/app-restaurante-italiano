import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/auth-pages.css'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth() // Cambiar a useAuth

  const [formData, setFormData] = useState({
    correo: '',
    contraseña: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || '/perfil'

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

    if (!formData.correo) {
      newErrors.correo = 'El correo es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'Ingresa un correo válido'
    }

    if (!formData.contraseña) {
      newErrors.contraseña = 'La contraseña es obligatoria'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Usar el login del AuthContext
      const result = await login({
        email: formData.correo,
        password: formData.contraseña
      })

      if (result.success) {
        navigate(from, { replace: true })
        alert('¡Bienvenido!')
      } else {
        setErrors({ general: result.message })
      }
    } catch (error) {
      console.error('Error:', error)
      setErrors({ general: 'Error de conexión. Intenta nuevamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-page-container'>
      <div className='auth-container'>
        <div className='auth-header'>
          <h1>Iniciar Sesión</h1>
        </div>

        {errors.general && (
          <div className='error-banner'>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className='auth-form'>
          <div className='form-group'>
            <label htmlFor='correo'>Correo electrónico</label>
            <input
              type='email'
              id='correo'
              name='correo'
              value={formData.correo}
              onChange={handleChange}
              className={errors.correo ? 'error' : ''}
              placeholder='lis99@gmail.com'
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

          <button
            type='submit'
            className='submit-btn'
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className='auth-footer'>
          <p>
            ¿No tienes cuenta?
            <Link to='/register' className='toggle-link'>
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

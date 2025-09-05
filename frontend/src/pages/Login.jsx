import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useNavbar } from '../context/navbarContext'
import '../styles/auth-pages.css'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useNavbar()

  const [formData, setFormData] = useState({
    correo: '',
    contraseña: ''
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
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('usuario', JSON.stringify(data.usuario))

        login()
        navigate('/')
        alert('¡Bienvenido!')
      } else {
        setErrors({ general: data.mensaje || 'Error en el inicio de sesión' })
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

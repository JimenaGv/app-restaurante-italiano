// src/components/AuthModal.jsx
import React, { useState } from 'react'
import './AuthModa.css'

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Resetear formulario cuando cambia el modo
  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      nombre: '',
      correo: '',
      contraseña: '',
      confirmarContraseña: ''
    })
    setErrors({})
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.correo) {
      newErrors.correo = 'El correo es obligatorio'
    } else if (!emailRegex.test(formData.correo)) {
      newErrors.correo = 'Ingresa un correo válido'
    }

    // Validar contraseña
    if (!formData.contraseña) {
      newErrors.contraseña = 'La contraseña es obligatoria'
    } else if (formData.contraseña.length < 6) {
      newErrors.contraseña = 'La contraseña debe tener al menos 6 caracteres'
    }

    // Validaciones adicionales para registro
    if (!isLogin) {
      if (!formData.nombre) {
        newErrors.nombre = 'El nombre es obligatorio'
      }

      if (!formData.confirmarContraseña) {
        newErrors.confirmarContraseña = 'Confirma tu contraseña'
      } else if (formData.contraseña !== formData.confirmarContraseña) {
        newErrors.confirmarContraseña = 'Las contraseñas no coinciden'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      const url = `http://localhost:3000/api/${isLogin ? 'login' : 'register'}`
      const body = isLogin
        ? { correo: formData.correo, contraseña: formData.contraseña }
        : { nombre: formData.nombre, correo: formData.correo, contraseña: formData.contraseña }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })

      const data = await response.json()

      if (response.ok) {
        // Guardar token en localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('usuario', JSON.stringify(data.usuario))

        alert(isLogin ? '¡Bienvenido!' : '¡Cuenta creada exitosamente!')
        onClose()

        // Recargar la página para actualizar el estado de autenticación
        window.location.reload()
      } else {
        alert(data.mensaje || 'Error en la autenticación')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className='auth-modal-overlay' onClick={onClose}>
      <div className='auth-modal' onClick={e => e.stopPropagation()}>
        <div className='auth-modal-header'>
          <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
          <button className='close-btn' onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className='auth-form'>
          {!isLogin && (
            <div className='form-group'>
              <label htmlFor='nombre'>Nombre completo</label>
              <input
                type='text'
                id='nombre'
                name='nombre'
                value={formData.nombre}
                onChange={handleChange}
                className={errors.nombre ? 'error' : ''}
                placeholder='Ingresa tu nombre completo'
              />
              {errors.nombre && <span className='error-message'>{errors.nombre}</span>}
            </div>
          )}

          <div className='form-group'>
            <label htmlFor='correo'>Correo electrónico</label>
            <input
              type='email'
              id='correo'
              name='correo'
              value={formData.correo}
              onChange={handleChange}
              className={errors.correo ? 'error' : ''}
              placeholder='ejemplo@correo.com'
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

          {!isLogin && (
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
          )}

          <button
            type='submit'
            className='submit-btn'
            disabled={loading}
          >
            {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </button>
        </form>

        <div className='auth-toggle'>
          <p>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button
              type='button'
              className='toggle-btn'
              onClick={toggleMode}
            >
              {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthModal

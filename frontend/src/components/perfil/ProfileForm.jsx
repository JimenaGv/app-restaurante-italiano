import { useState, useEffect } from 'react'
import { api } from '../../services/api'

export const ProfileForm = () => {
  // Estado para guardar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    telefono: ''
  })

  // Estado para controlar si se está editando
  const [isEditing, setIsEditing] = useState(false)

  // Cargar los datos del usuario desde el servidor al iniciar
  const fetchPerfil = async (user) => {
    try {
      const { data } = await api.get(`/perfil/${user.id}`)
      setFormData({
        nombre: data.nombre || '',
        apellidoPaterno: data.apellidoPaterno || '',
        apellidoMaterno: data.apellidoMaterno || '',
        correo: data.correo || '',
        telefono: data.telefono || ''
      })
    } catch (err) {
      console.error('Error al cargar perfil:', err)
    }
  }

  useEffect(() => {
    const userData = localStorage.getItem('usuario')
    if (userData) {
      const user = JSON.parse(userData)
      fetchPerfil(user)
    }
  }, [])

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  //  Guardar los cambios en el servidor
  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = JSON.parse(localStorage.getItem('usuario')).id
    try {
      const { data } = await api.put(`/perfil/${userId}`, formData)
      alert('Datos actualizados correctamente')
      setIsEditing(false)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))
    } catch (error) {
      console.error('Error al actualizar:', error)
      alert(error.response?.data?.mensaje || 'Error al actualizar')
    }
  }

  return (
    <form className='profile-form' onSubmit={handleSubmit}>
      <h3>Información del perfil</h3>

      {/* Nombre */}
      <label>
        Nombre:
        <input
          type='text'
          name='nombre'
          value={formData.nombre}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </label>

      {/* Apellidos */}
      <div className='apellidos-row'>
        <label>
          Apellido paterno:
          <input
            type='text'
            name='apellidoPaterno'
            value={formData.apellidoPaterno}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>

        <label>
          Apellido materno:
          <input
            type='text'
            name='apellidoMaterno'
            value={formData.apellidoMaterno}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
      </div>

      {/*  Correo */}
      <label>
        Correo electrónico:
        <input
          type='email'
          name='correo'
          value={formData.correo}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </label>

      {/* Teléfono */}
      <label>
        Teléfono:
        <input
          type='text'
          name='telefono'
          value={formData.telefono}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </label>

      {/* Botón: "Editar" y "Guardar" */}
      <div className='button-row'>
        {isEditing
          ? (
            <button type='submit'>Guardar cambios</button>
            )
          : (
            <button
              type='button'
              onClick={(e) => {
                e.preventDefault()
                setIsEditing(true)
              }}
            >
              Actualizar datos
            </button>
            )}
      </div>
    </form>
  )
}

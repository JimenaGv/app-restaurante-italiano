import { useState, useEffect } from 'react'

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
  useEffect(() => {
    const userData = localStorage.getItem('usuario')
    if (userData) {
      const user = JSON.parse(userData)
      fetch(`http://localhost:3000/perfil/${user.id}`)
        .then(res => res.json())
        .then(data => {
          // Guardamos los datos recibidos en el formulario
          setFormData({
            nombre: data.nombre || '',
            apellidoPaterno: data.apellidoPaterno || '',
            apellidoMaterno: data.apellidoMaterno || '',
            correo: data.correo || '',
            telefono: data.telefono || ''
          })
        })
        .catch(err => console.error('Error al cargar perfil:', err))
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
      const res = await fetch(`http://localhost:3000/perfil/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData) // mandamos todos los campos
      })
      const data = await res.json()

      if (res.ok) {
        alert('Datos actualizados correctamente')
        setIsEditing(false)
        // Guardamos el usuario actualizado en localStorage
        localStorage.setItem('usuario', JSON.stringify(data.usuario))
      } else {
        alert(data.mensaje || 'Error al actualizar')
      }
    } catch (error) {
      console.error('Error al actualizar:', error)
      alert('Error de conexión con el servidor')
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

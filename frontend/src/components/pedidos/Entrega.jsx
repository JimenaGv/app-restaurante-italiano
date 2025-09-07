import { useState } from 'react'

export const Entrega = ({
  direccion,
  tiempo,
  direcciones,
  setDireccionSeleccionada,
  setDirecciones,
  userId
}) => {
  const [modoEdicion, setModoEdicion] = useState(false)
  const [nuevaDireccion, setNuevaDireccion] = useState({
    calle: '', ciudad: '', estado: '', codigoPostal: '', pais: 'México'
  })
  const [error, setError] = useState(null)

  const handleAgregar = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/perfil/${userId}/direcciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaDireccion)
      })

      if (!res.ok) throw new Error('Error al guardar la dirección')

      const data = await res.json()
      setDirecciones(data.direcciones)
      const nueva = data.direcciones[data.direcciones.length - 1]
      setDireccionSeleccionada(nueva)
      setModoEdicion(false)
      setError(null)
      setNuevaDireccion({ calle: '', ciudad: '', estado: '', codigoPostal: '', pais: 'México' })
    } catch (err) {
      console.error(err)
      setError('No se pudo guardar la dirección')
    }
  }

  return (
    <div className='contenedor con-boton'>
      <h3>Detalles de la entrega</h3>

      {modoEdicion
        ? (
          <div className='form-direccion'>
            <input
              placeholder='Calle'
              value={nuevaDireccion.calle}
              onChange={e => setNuevaDireccion({ ...nuevaDireccion, calle: e.target.value })}
            />
            <input
              placeholder='Ciudad'
              value={nuevaDireccion.ciudad}
              onChange={e => setNuevaDireccion({ ...nuevaDireccion, ciudad: e.target.value })}
            />
            <input
              placeholder='Estado'
              value={nuevaDireccion.estado}
              onChange={e => setNuevaDireccion({ ...nuevaDireccion, estado: e.target.value })}
            />
            <input
              placeholder='Código Postal'
              value={nuevaDireccion.codigoPostal}
              onChange={e => setNuevaDireccion({ ...nuevaDireccion, codigoPostal: e.target.value })}
            />
            <button onClick={handleAgregar} className='segundo'>Guardar dirección</button>
            <button
              onClick={() => {
                setModoEdicion(false)
                setNuevaDireccion({ calle: '', ciudad: '', estado: '', codigoPostal: '', pais: 'México' })
                setError(null)
              }}
            >
              Cancelar
            </button>
            {error && <p className='error'>{error}</p>}
          </div>
          )
        : (
          <>
            {direccion && (
              <>
                {direcciones.length === 1 && (
                  <p className='carrito--notes'>
                    {direccion.calle}, {direccion.ciudad}, {direccion.estado}, {direccion.codigoPostal}
                  </p>
                )}
                {direcciones.length > 1 && (
                  <select
                    onChange={(e) => setDireccionSeleccionada(direcciones[parseInt(e.target.value)])}
                  >
                    {direcciones.map((dir, i) => (
                      <option key={i} value={i}>
                        {dir.calle}, {dir.ciudad}
                      </option>
                    ))}
                  </select>
                )}
              </>
            )}
          </>
          )}

      {!modoEdicion && (
        <button onClick={() => setModoEdicion(true)}>
          {direccion ? 'Añadir nueva dirección' : 'Añadir dirección'}
        </button>
      )}

      <div className='division espacio-arriba'>
        <p>Tiempo estimado de entrega</p>
        <p className='carrito--notes'>{tiempo} minutos</p>
      </div>
    </div>
  )
}

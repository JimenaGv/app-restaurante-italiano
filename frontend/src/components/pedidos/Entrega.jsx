import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AvisoFaltante } from './AvisoFaltante.jsx'

export const Entrega = ({ direccion, tiempo, direcciones, setDireccionSeleccionada }) => {
  const navigate = useNavigate()

  const sinDirecciones = !direcciones || direcciones.length === 0

  useEffect(() => {
    if (sinDirecciones) {
      const timer = setTimeout(() => navigate('/perfil'), 7000)
      return () => clearTimeout(timer)
    }
  }, [sinDirecciones, navigate])

  if (sinDirecciones) {
    return <AvisoFaltante tipo='direccion' />
  }

  return (
    <div className='contenedor con-boton'>
      <h3>Detalles de la entrega</h3>
      {direccion && (
        <>
          {direcciones.length === 1 && (
            <p className='carrito--notes'>
              {direccion.calle} #{direccion.numeroEXterior} Int. {direccion.numeroInterior}, Col. {direccion.colonia}, {direccion.alcadia}, CP {direccion.codigoPostal}
            </p>
          )}
          {direcciones.length > 1 && (
            <select
              onChange={(e) => setDireccionSeleccionada(direcciones[parseInt(e.target.value)])}
            >
              {direcciones.map((dir, i) => (
                <option key={i} value={i}>
                  {dir.calle} #{dir.numeroEXterior} Int. {dir.numeroInterior}, Col. {dir.colonia}, {dir.alcadia}, CP {dir.codigoPostal}
                </option>
              ))}
            </select>
          )}
        </>
      )}
      <div className='division espacio-arriba'>
        <p>Tiempo estimado de entrega</p>
        <p className='carrito--notes'>{tiempo} minutos</p>
      </div>
    </div>
  )
}

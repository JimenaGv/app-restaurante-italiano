import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AvisoFaltante = ({ tipo }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/perfil')
    }, 7000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className='aviso-faltante'>
      <h3>¡Ups! Falta información</h3>
      <p>
        <span>No tienes {tipo === 'direccion' ? 'una dirección registrada' : 'un método de pago registrado'}</span>.
        Por favor ve a tu perfil para agregar los datos faltantes antes de confirmar tu pedido.
      </p>
      <p className='cursiva'>Redirigiendo en unos segundos...</p>
      <button onClick={() => navigate('/perfil')}>Ir ahora</button>
    </div>
  )
}

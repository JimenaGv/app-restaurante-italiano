import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AvisoFaltante } from './AvisoFaltante.jsx'

export const Pago = ({ metodo, metodosPago, setMetodoSeleccionado }) => {
  const navigate = useNavigate()
  const sinMetodos = !metodosPago || metodosPago.length === 0

  useEffect(() => {
    if (sinMetodos) {
      const timer = setTimeout(() => navigate('/perfil'), 7000)
      return () => clearTimeout(timer)
    }
  }, [sinMetodos, navigate])

  if (sinMetodos) {
    return <AvisoFaltante tipo='pago' />
  }

  return (
    <div className='contenedor con-boton'>
      <h3>Método de pago</h3>
      {metodo && (
        <>
          {metodosPago.length === 1 && (
            <p className='carrito--notes'>
              Tarjeta de {metodo.categoria?.toUpperCase()} (Vto. {metodo.vencimiento}) ••••{metodo.numeroTarjeta?.slice(-4)}
            </p>
          )}
          {metodosPago.length > 1 && (
            <select onChange={(e) => setMetodoSeleccionado(metodosPago[parseInt(e.target.value)])}>
              {metodosPago.map((met, i) => (
                <option key={i} value={i}>
                  {`Tarjeta de ${met.categoria?.toUpperCase()} (Vto. ${met.vencimiento}) ••••${met.numeroTarjeta?.slice(-4)}`}
                </option>
              ))}
            </select>
          )}
        </>
      )}
    </div>
  )
}

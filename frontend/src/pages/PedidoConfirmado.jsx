// Página que anuncia la confirmación del pedido y permite volver a la página de inicio o ver el historial de pedidos
import '../styles/global.css'
import { useLocation, useNavigate } from 'react-router-dom'

export const PedidoConfirmado = () => {
  const location = useLocation()
  const pedido = location.state?.pedido
  const navigate = useNavigate()

  return (
    <>
      <div className='contenedor'>
        <div className='encabezado'>
          <h1>¡Gracias por tu compra!</h1>
          <p>Tu pedido ha sido recibido y está siendo preparado.</p>
        </div>
        <div className='division costos'>
          <p>Número de orden</p>
          <span>{pedido?._id?.slice(-6)}</span>
        </div>
        <div className='division espacio-abajo'>
          <p>Tiempo estimado de entrega</p>
          <span>{pedido?.tiempoEntrega} minutos</span>
        </div>
      </div>
      <div className='caja-botones'>
        <button onClick={() => navigate('/perfil', { state: { section: 'pedidos' } })}>
          Ver historial de pedidos
        </button>
        <button onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    </>
  )
}

// Página de confirmación de pedidos
// Resumen del pedido
// Dirección de entrega
// Método de pago
// Botón de confirmación

import '../styles/global.css'

import { useNavigate } from 'react-router-dom'

// Valores temporales para pruebas
const user = { id: 'user123' }
const carrito = [
  { nombre: 'Pizza Margarita', cantidad: 2, precio: 70 },
  { nombre: 'Tiramisú', cantidad: 1, precio: 40 }
]
const direccionSeleccionada = 'Calle Falsa 123'
const metodoSeleccionado = 'Tarjeta'
//

export const ConfirmarPedido = () => {
  const navigate = useNavigate()

  const handleConfirmarPedido = async () => {
    const pedido = {
      usuarioId: user.id,
      platillos: carrito,
      direccion: direccionSeleccionada,
      metodoPago: metodoSeleccionado,
      estado: 'pendiente',
      fecha: new Date().toISOString()
    }
    try {
      const res = await fetch('/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
      })
      if (!res.ok) throw new Error('Error al confirmar el pedido.')
      navigate('/pedido-confirmado')
    } catch (error) {
      console.error(error)
      alert('Lo sentimos, hubo un problema al confirmar tu pedido. Por favor, inténtalo de nuevo.')
    }
  }

  return (
    <>
      <div className='encabezado'>
        <h1>Resumen del pedido</h1>
        <p>Revisa tu pedido y confirma para realizar la compra.</p>
      </div>
      <div className='contenedor'>
        <div>
          <h3>Artículos del pedido</h3>
          <ul>
            <li>
              <div>
                <span>Pizza Margarita</span>
                <p>Cantidad: 2</p>
              </div>
              <div>
                <p>$70</p>
              </div>
            </li>
            <li>
              <div>
                <span>Tiramisú</span>
                <p>Cantidad: 1</p>
              </div>
              <div>
                <p>$40</p>
              </div>
            </li>
          </ul>
        </div>
        <div className='costos'>
          <div className='division'>
            <p>Subtotal</p>
            <p>$110</p>
          </div>
          <div className='division'>
            <p>Impuestos</p>
            <p>$10</p>
          </div>
          <div className='division'>
            <p>Tarifa de entrega</p>
            <p>$20</p>
          </div>
          <div className='division'>
            <h4>Total</h4>
            <h4>$140</h4>
          </div>
        </div>
      </div>
      <div className='contenedor con-boton'>
        <h3>Detalles de la entrega</h3>
        <div>
          <p>Dirección</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, eius.</p>
        </div>
        <div className='division'>
          <p>Tiempo estimado</p>
          <p>30-45 minutos</p>
        </div>
        <button>Cambiar</button>
      </div>
      <div className='contenedor con-boton'>
        <h3>Método de pago</h3>
        <p>Tarjeta</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, eius.</p>
        <button>Cambiar</button>
      </div>
      <div className='caja-botones'>
        <button>Regresar al carrito</button>
        <button onClick={handleConfirmarPedido}>Confirmar pedido</button>
      </div>
    </>
  )
}

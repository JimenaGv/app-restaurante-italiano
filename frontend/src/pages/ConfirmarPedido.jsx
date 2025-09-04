// Página de confirmación de pedidos
import '../styles/global.css'
import { useNavigate } from 'react-router-dom'

import { useCarrito } from '../context/carrito'
// Resumen del pedido
import { ResumenPedido } from '../components/pedidos/ResumenPedido'
// Dirección de entrega
import { Entrega } from '../components/pedidos/Entrega'
// Método de pago
import { Pago } from '../components/pedidos/Pago'

export const ConfirmarPedido = () => {
  // Valores temporales para pruebas
  const user = { id: 'user123' }
  const direccionSeleccionada = 'Calle Falsa 123'
  const metodoSeleccionado = 'Tarjeta'
  //
  const { carrito, limpiarCarrito } = useCarrito()

  const navigate = useNavigate()

  const getRandomIntInclusive = (min, max) =>
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min))

  const subtotal = carrito.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const iva = subtotal * 0.16
  const tarifa = getRandomIntInclusive(10, 50)
  const total = subtotal + iva + tarifa
  const tiempoRandom = getRandomIntInclusive(25, 60)

  const iniciarFlujoDePedido = (pedidoId) => {
    const estados = [
      { nombre: 'Solicitud recibida', tiempo: getRandomIntInclusive(5000, 10000) },
      { nombre: 'En preparación', tiempo: getRandomIntInclusive(20000, 30000) },
      { nombre: 'Listo para ser enviado', tiempo: getRandomIntInclusive(5000, 10000) },
      { nombre: 'Enviado', tiempo: getRandomIntInclusive(30000, 50000) },
      { nombre: 'Entregado', tiempo: 0 }
    ]

    let etapa = 0

    const avanzarEstado = () => {
      const { nombre, tiempo } = estados[etapa]
      fetch(`http://localhost:3000/pedidos/${pedidoId}/estado`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nombre })
      })

      if (etapa < estados.length - 1) {
        setTimeout(avanzarEstado, tiempo)
      }

      etapa++
    }

    avanzarEstado()
  }

  const handleConfirmarPedido = async () => {
    const pedidoSinId = {
      usuarioId: user.id,
      platillos: carrito.map(item => ({
        nombre: item.name,
        cantidad: item.quantity,
        precio: item.price,
        customizations: item.customizations || {}
      })),
      direccion: direccionSeleccionada,
      metodoPago: metodoSeleccionado,
      estado: 'Solicitud recibida',
      fecha: new Date().toISOString(),
      tiempoEntrega: tiempoRandom
    }

    try {
      const res = await fetch('http://localhost:3000/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedidoSinId)
      })

      if (!res.ok) throw new Error('Error al confirmar el pedido.')

      const pedidoConId = await res.json() // Obtener el _id desde el backend

      iniciarFlujoDePedido(pedidoConId._id)
      navigate('/pedido-confirmado', { state: { pedido: pedidoConId } }) // Pasar con el _id incluido
      setTimeout(() => limpiarCarrito(), 100)
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
      <ResumenPedido carrito={carrito} subtotal={subtotal} iva={iva} tarifa={tarifa} total={total} />
      <Entrega direccion={direccionSeleccionada} tiempo={tiempoRandom} />
      <Pago metodo={metodoSeleccionado} />

      <div className='caja-botones'>
        <button onClick={() => navigate('/carrito')}>Regresar al carrito</button>
        <button onClick={handleConfirmarPedido}>Confirmar pedido</button>
      </div>
    </>
  )
}

import { useState, useEffect } from 'react'
import { api } from '../../services/api'

export const Orders = () => {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const usuario = JSON.parse(localStorage.getItem('usuario'))
  const userId = usuario?.id

  const iconoEstado = {
    'Solicitud recibida': '📥',
    'En preparación': '👨‍🍳',
    'Listo para ser enviado': '📦',
    Enviado: '🚚',
    Entregado: '✅'
  }
  const calcularTotal = (platillos) =>
    platillos.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  useEffect(() => {
    if (!userId) return

    const fetchPedidos = async () => {
      try {
        const { data } = await api.get(`/pedidos/${userId}`)
        const ordenados = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        setPedidos(ordenados)
        setLoading(false)
      } catch (err) {
        console.error('Error al obtener pedidos:', err)
        setError('No se pudieron cargar tus pedidos. Intenta más tarde.')
        setLoading(false)
      }
    }

    fetchPedidos() // Primera carga

    const intervalo = setInterval(fetchPedidos, 5000) // Actualiza cada 5 segundos

    return () => clearInterval(intervalo) // Limpia el intervalo al desmontar
  }, [userId])

  return (
    <>
      <div>
        <h2 className='title'>Historial de pedidos</h2>
      </div>
      <div>
        {loading && <p>Cargando pedidos...</p>}

        {error && <p className='rojo'>{error}</p>}

        {!loading && pedidos.length === 0 && !error && (
          <p>Aquí se mostrarán tus pedidos recientes...</p>
        )}

        {!loading && pedidos.length > 0 && (
          <ul>
            {pedidos.map(p => (
              <li key={p._id}>
                <div className='cont-historial'>
                  <p className='rojo'>
                    {iconoEstado[p.estado] || '⚪'} <span>{p.estado}</span>
                  </p>
                  <span>Resumen del pedido:</span>
                  <ul>
                    {p.platillos.map((item, index) => (
                      <li key={index}>
                        {item.nombre}
                        <small>
                          (cantidad: {item.cantidad}, precio unitario: ${item.precio.toFixed(2)})
                        </small>
                      </li>
                    ))}
                  </ul>
                  <p>
                    <span className='resaltar'>Fecha:</span> {new Date(p.fecha).toLocaleDateString()}
                  </p>
                  <p>
                    <span className='resaltar'>Dirección de entrega:</span> {p.direccion.calle} #{p.direccion.numeroEXterior} Int. {p.direccion.numeroInterior}, Col. {p.direccion.colonia}, {p.direccion.alcadia}, CP {p.direccion.codigoPostal}
                  </p>
                  <p>
                    <span className='resaltar'>Método de pago:</span> {`Tarjeta de ${p.metodoPago.categoria?.toUpperCase()} (Vto. ${p.metodoPago.vencimiento}) ••••${p.metodoPago.numeroTarjeta?.slice(-4)}`}
                  </p>
                  <p>
                    <span className='resaltar'>Total:</span> $ {calcularTotal(p.platillos).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

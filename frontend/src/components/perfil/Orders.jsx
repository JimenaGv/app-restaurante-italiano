import { useState, useEffect } from 'react'

export const Orders = () => {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)

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

    const fetchPedidos = () => {
      fetch(`http://localhost:3000/pedidos/${userId}`)
        .then(res => res.json())
        .then(data => {
          const ordenados = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
          setPedidos(ordenados)
          setLoading(false)
        })
        .catch(err => console.error('Error al obtener pedidos:', err))
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
        {loading
          ? <p>Cargando pedidos...</p>
          : pedidos.length === 0
            ? (
              <p>Aquí se mostrarán tus pedidos recientes...</p>
              )
            : (
              <ul>
                {pedidos.map(p => (
                  <li key={p._id}>
                    <div className='cont-historial'>
                      <p className='rojo'>{iconoEstado[p.estado] || '⚪'}
                        <span> {p.estado}</span>
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
                      <p>Fecha: {new Date(p.fecha).toLocaleDateString()}</p>
                      <p>Total: $ {calcularTotal(p.platillos).toFixed(2)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              )}
      </div>
    </>
  )
}

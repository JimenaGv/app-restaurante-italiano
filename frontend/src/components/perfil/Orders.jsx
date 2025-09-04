import { useState, useEffect } from 'react'

export const Orders = () => {
  const [pedidos, setPedidos] = useState([])
  // Valor de prueba
  const user = { id: 'user123' }
  //
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
    const fetchPedidos = () => {
      fetch(`http://localhost:3000/pedidos/${user.id}`)
        .then(res => res.json())
        .then(data => setPedidos(data))
    }

    fetchPedidos() // Primera carga

    const intervalo = setInterval(fetchPedidos, 5000) // Actualiza cada 5 segundos

    return () => clearInterval(intervalo) // Limpia el intervalo al desmontar
  }, [user.id])

  return (
    <>
      <div>
        <h2 className='title'>Historial de pedidos</h2>
      </div>
      <div>
        {pedidos.length === 0
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

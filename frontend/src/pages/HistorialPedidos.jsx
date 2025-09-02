// Página que muestra el historial de pedidos
import '../styles/global.css'

import { useState, useEffect } from 'react'

export const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([])
  // Valor de prueba
  const user = { id: 'user123' }
  //

  useEffect(() => {
    fetch(`/pedidos?usuarioId=${user.id}`)
      .then(res => res.json())
      .then(data => setPedidos(data))
  }, [user.id])

  return (
    <>
      <div className='encabezado'>
        <h1>Historial de pedidos</h1>
      </div>
      <div className='contenedor'>
        <ul>
          {pedidos.map(p => (
            <li key={p._id}>
              <div>
                <p>🟩</p>
                <span>{p.estado}</span>
                <p>{new Date(p.fecha).toLocaleDateString()}</p>
              </div>
              <div>$ Total</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

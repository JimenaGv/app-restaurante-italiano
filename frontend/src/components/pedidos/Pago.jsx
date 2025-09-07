import { useState } from 'react'

export const Pago = ({ metodo, metodosPago, setMetodoSeleccionado, setMetodosPago, userId }) => {
  const [modoEdicion, setModoEdicion] = useState(false)
  const [nuevoMetodo, setNuevoMetodo] = useState({
    tipo: 'tarjeta',
    numeroTarjeta: '',
    vencimiento: '',
    titular: ''
  })
  const [error, setError] = useState(null)

  const handleAgregar = async () => {
    if (
      nuevoMetodo.tipo === 'tarjeta' &&
      (!nuevoMetodo.numeroTarjeta || !nuevoMetodo.vencimiento || !nuevoMetodo.titular)
    ) {
      setError('Completa todos los campos de la tarjeta')
      return
    }

    try {
      const res = await fetch(`http://localhost:3000/api/perfil/${userId}/metodos-pago`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoMetodo)
      })

      if (!res.ok) throw new Error('Error al guardar el método de pago')

      const data = await res.json()
      setMetodosPago(data.metodosPago)
      const nuevo = data.metodosPago[data.metodosPago.length - 1]
      setMetodoSeleccionado(nuevo)
      setModoEdicion(false)
      setNuevoMetodo({
        tipo: 'tarjeta',
        numeroTarjeta: '',
        vencimiento: '',
        titular: ''
      })
      setError(null)
    } catch (err) {
      console.error(err)
      setError('No se pudo guardar el método de pago')
    }
  }

  return (
    <div className='contenedor con-boton'>
      <h3>Método de pago</h3>

      {metodo && (
        <>
          {metodosPago.length === 1 && (
            <p>
              {metodo.tipo === 'tarjeta'
                ? `Tarjeta ••••${metodo.numeroTarjeta.slice(-4)}`
                : metodo.tipo}
            </p>
          )}
          {metodosPago.length > 1 && (
            <select onChange={(e) => setMetodoSeleccionado(metodosPago[parseInt(e.target.value)])}>
              {metodosPago.map((met, i) => (
                <option key={i} value={i}>
                  {met.tipo === 'tarjeta'
                    ? `Tarjeta ••••${met.numeroTarjeta.slice(-4)}`
                    : met.tipo}
                </option>
              ))}
            </select>
          )}
        </>
      )}

      {modoEdicion && (
        <div className='form-metodo'>
          <select
            value={nuevoMetodo.tipo}
            onChange={(e) => setNuevoMetodo({ ...nuevoMetodo, tipo: e.target.value })}
          >
            <option value='tarjeta'>Tarjeta</option>
            <option value='paypal'>PayPal</option>
            <option value='efectivo'>Efectivo</option>
            <option value='transferencia'>Transferencia</option>
          </select>

          {nuevoMetodo.tipo === 'tarjeta' && (
            <>
              <input
                placeholder='Número de tarjeta'
                value={nuevoMetodo.numeroTarjeta}
                onChange={(e) => setNuevoMetodo({ ...nuevoMetodo, numeroTarjeta: e.target.value })}
              />
              <input
                placeholder='Vencimiento'
                value={nuevoMetodo.vencimiento}
                onChange={(e) => setNuevoMetodo({ ...nuevoMetodo, vencimiento: e.target.value })}
              />
              <input
                placeholder='Titular'
                value={nuevoMetodo.titular}
                onChange={(e) => setNuevoMetodo({ ...nuevoMetodo, titular: e.target.value })}
              />
            </>
          )}

          <button onClick={handleAgregar} className='segundo'>Guardar método</button>
          <button
            onClick={() => {
              setModoEdicion(false)
              setNuevoMetodo({
                tipo: 'tarjeta',
                numeroTarjeta: '',
                vencimiento: '',
                titular: ''
              })
              setError(null)
            }}
          >
            Cancelar
          </button>
          {error && <p className='error'>{error}</p>}
        </div>
      )}

      {!modoEdicion && (
        <button onClick={() => setModoEdicion(true)}>
          {metodo ? 'Añadir nuevo método' : 'Añadir método'}
        </button>
      )}
    </div>
  )
}

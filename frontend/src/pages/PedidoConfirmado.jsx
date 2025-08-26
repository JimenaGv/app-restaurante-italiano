// Página que anuncia la confirmación del pedido y permite volver a la página de inicio o ver el historial de pedidos

export const PedidoConfirmado = () => {
  return (
    <>
      <div className='contenedor'>
        <div className='encabezado'>
          <h1>¡Gracias por tu compra!</h1>
          <p>Tu pedido ha sido recibido y está siendo preparado.</p>
        </div>
        <div className='division costos'>
          <p>Número de orden</p>
          <span>#483294</span>
        </div>
        <div className='division espacio-abajo'>
          <p>Tiempo estimado de entrega</p>
          <span>30-45 minutos</span>
        </div>
      </div>
      <div className='caja-botones'>
        <button>Ver historial de pedidos</button>
        <button>Volver al menú</button>
      </div>
    </>
  )
}

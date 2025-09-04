export const Entrega = ({ direccion, tiempo }) => {
  return (
    <div className='contenedor con-boton'>
      <h3>Detalles de la entrega</h3>
      <div>
        <p>Dirección</p>
        <p className='carrito--notes'>{direccion}</p>
      </div>
      <div className='division'>
        <p>Tiempo estimado</p>
        <p className='carrito--notes'>{tiempo} minutos</p>
      </div>
      <button>Cambiar</button>
    </div>
  )
}

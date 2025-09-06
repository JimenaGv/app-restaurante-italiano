export const Pago = ({ metodo }) => {
  return (
    <div className='contenedor con-boton'>
      <h3>Método de pago</h3>
      <p>{metodo}</p>
      <p className='carrito--notes'>{metodo}</p>
      <button>Cambiar</button>
    </div>
  )
}

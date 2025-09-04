export const ResumenPedido = ({ carrito, subtotal, iva, tarifa, total }) => {
  return (
    <div className='contenedor'>
      <div>
        <h3>Artículos del pedido</h3>
        <ul>
          {carrito.map((item, index) => (
            <li key={index}>
              <div>
                <span>{item.name}</span>
                <p>Cantidad: {item.quantity}</p>
                {item.customizations && (
                  <p className='carrito--notes'>
                    {Object.entries(item.customizations).map(([key, value]) => {
                      const label = key
                        .split('_')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')

                      return (
                        <small key={key}>
                          {label}: {value}
                        </small>
                      )
                    })}
                  </p>
                )}
              </div>
              <div>
                <p>${item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='costos'>
        <div className='division'>
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className='division'>
          <p>Impuestos (IVA 16%)</p>
          <p>${iva.toFixed(2)}</p>
        </div>
        <div className='division'>
          <p>Tarifa de entrega</p>
          <p>${tarifa.toFixed(2)}</p>
        </div>
        <div className='division'>
          <h3>Total</h3>
          <h3>${total.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import '../styles/global.css'
import '../styles/carrito.css'
import { useCarrito } from '../context/carrito'
import { Link } from 'react-router-dom'

export const Carrito = () => {
  const { carrito, eliminarItem } = useCarrito()

  return (
    <div className='page'>

      <div className='carrito-header'>

        <h2 className='carrito--title title' style={{ padding: 0 }}>Mi Carrito</h2>

        {carrito.length > 0 && (
          <Link to='/confirmacion-pedido'>
            <button className='carrito-checkout'>
              Pedir
            </button>
          </Link>
        )}
      </div>

      <div className='carrito--cards'>
        {
            carrito.length > 0
              ? (
                  carrito.map((data, index) => (
                    <div key={index} className='carrito--card'>
                      <img
                        src={data.image}
                        alt={data.name}
                        className='carrito--card-image'
                      />
                      <div className='carrito-details'>
                        <h3 className='carrito--card-title'>
                          <span className='carrito--card-price'>${data.price} - </span>
                          {data.name}
                        </h3>

                        <p className='carrito--notes'>
                          {Object.entries(data.customizations).map(([key, value]) => {
                            const label = key
                              .split('_')
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')

                            return (
                              <span key={key}>
                                {label}: {value}
                              </span>
                            )
                          })}
                        </p>
                        <p> Cantidad: {data.quantity} </p>
                        <button className='carrito-delete' onClick={() => eliminarItem(data)}>
                          Borrar
                        </button>
                      </div>
                    </div>
                  ))
                )
              : (<p className='carrito--vacio' style={{ fontSize: '1rem', margin: 0 }}>No hay productos en el carrito</p>)

        }
      </div>
    </div>
  )
}

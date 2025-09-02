import React from 'react'

export const CardMenu = ({ data, addAction }) => {
  return (
    <>
      <li className='menu--card'>
        <div className='menu--details'>
          <h3 className='menu--card-title'>
            <span className='menu--card-price'> ${data.price} - </span>
            {data.name}
          </h3>
          <p className='menu--card-description'>{data.description}</p>
          <button className='menu--btn-add' onClick={() => addAction(data)}>
            Agregar al carrito
          </button>
        </div>
        <img src={data.image} alt={data.name} className='menu--card-image' />
      </li>
    </>
  )
}

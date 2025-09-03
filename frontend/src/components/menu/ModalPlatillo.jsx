import { useState } from 'react'
import { CarritoProvider, useCarrito } from '../../context/carrito'

export const ModalPlatillo = ({ modalState, dish }) => {
  const { agregarItem } = useCarrito()
  const [dishCustom, setDishCustom] = useState({
    ...dish,
    customizations: {},
    quantity: 1
  })

  const handleSelectChange = (key, value) => {
    setDishCustom(prevState => ({
      ...prevState,
      customizations: {
        ...prevState.customizations,
        [key]: value
      }
    }))
  }

  const saveDish = () => {
    agregarItem(dishCustom)
    modalState(false)
  }

  const handleQuantityChange = (action) => {
    setDishCustom(prevState => {
      let newQuantity = prevState.quantity || 1
      if (action === 'increase') {
        newQuantity += 1
      } else if (action === 'decrease' && newQuantity > 1) {
        newQuantity -= 1
      }
      return {
        ...prevState,
        quantity: newQuantity
      }
    })
  }

  return (
    <div className='modal-dish' onClick={() => modalState(false)}>
      <div className='modal-content'>
        <div className='modal-header' style={{ backgroundImage: `url(${dish?.image})` }}>
          <h3 className='modal-title'>
            <span className='modal-price'> ${dish.price} - </span>
            {dish.name}
          </h3>
        </div>
        <p className='modal-description'>{dish.description}</p>

        <div className='customization-container'>
          {dish.customizations && dish.customizations.map((customization, index) => {
            return (
              <div key={index} className='customization'>
                <label>{customization?.text}</label>
                <select
                  name={customization?.value}
                  value={dishCustom.customizations[customization.value] ?? ''}
                  onChange={($e) => handleSelectChange(customization.value, $e.target.value)}
                >
                  {customization?.options.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                  <option value=''> --- </option>
                </select>
              </div>
            )
          })}
        </div>

        <div className='quantity-container'>
          <label htmlFor='quantity'>Cantidad:</label>
          <div className='quantity-controls'>
            <button onClick={() => handleQuantityChange('decrease')}>-</button>
            <span>{dishCustom.quantity}</span>
            <button onClick={() => handleQuantityChange('increase')}>+</button>
          </div>
        </div>

        <div className='modal-actions'>
          <button onClick={saveDish}>Agregar</button>
          <button className='modal-btn-cancel' onClick={() => modalState(false)}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export const ModalPlatillo = ({ modalState, dish }) => {
  const dishCustom = structuredClone(dish)
  dishCustom.customizations = {}

  const handleSelectChange = (key, value) => {
    dishCustom.customizations[key] = value
  }

  const saveDish = () => {
    console.log(dishCustom)
  }

  return (
    <div className='modal-dish'>
      <div className='modal-content'>
        <div className='modal-header' style={{ backgroundImage: `url(${dish?.image})` }}>
          <h3 className='modal-title'>
            <span className='modal-price'> ${dish?.price} - </span>
            {dish?.name}
          </h3>
        </div>
        <p className='modal-description'>{dish?.description}</p>
        <div className='customization-container'>
          {dish?.customizations.map((customization, index) => (
            <div key={index} className='customization'>
              <label>{customization.text}</label>
              <select
                name={customization.value}
                value={dishCustom.customizations[customization.value]}
                onChange={($e) => handleSelectChange(customization.value, $e.target.value)}
              >
                {customization.options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className='modal-actions'>
          <button onClick={() => saveDish()}>Agregar</button>
          <button className='modal-btn-cancel' onClick={() => modalState(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

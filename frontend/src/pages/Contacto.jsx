import { useState } from 'react'

export const Contacto = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  })
  const [enviado, setEnviado] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormulario({ ...formulario, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Mensaje enviado:', formulario)
    setEnviado(true)
    setFormulario({ nombre: '', correo: '', mensaje: '' })
  }

  return (
    <div className='contenedor'>
      <div className='encabezado'>
        <h1>Contáctanos</h1>
        <p className='resaltar'>
          En Bella Italia, cada mensaje es tan importante como cada plato que servimos. Ya sea para hacer una reserva, compartir una sugerencia o simplemente saludarnos, estamos aquí para escucharte.
        </p>
      </div>

      <div className='centrado espacio-abajo'>
        <h3>Teléfono 📞</h3>
        <p className='espacio-abajo'>+52 999 123 4567</p>

        <h3>Correo electrónico 📧</h3>
        <p className='espacio-abajo'>contacto@bellaitalia.mx</p>

        <h3>🕒 Horarios</h3>
        <p>Lunes a Domingo: 12:00 p.m. – 10:00 p.m.</p>
      </div>

      <form className='form-direccion' onSubmit={handleSubmit}>
        <h3 className='centrado espacio-arriba'>¿Qué te gustaría compartir con nuestra cocina?</h3>
        <input
          type='text'
          name='nombre'
          placeholder='Tu nombre'
          value={formulario.nombre}
          onChange={handleChange}
          required
        />
        <input
          type='email'
          name='correo'
          placeholder='Tu correo electrónico'
          value={formulario.correo}
          onChange={handleChange}
          required
        />
        <textarea
          name='mensaje'
          placeholder='Escribe tu mensaje aquí...'
          value={formulario.mensaje}
          onChange={handleChange}
          required
          style={{
            padding: '10px',
            borderRadius: '20px',
            margin: '10px',
            border: '1px solid gray',
            width: '100%',
            fontFamily: '"Kantumruy Pro", sans-serif',
            resize: 'none'
          }}
        />
        <button className='btn-grande' type='submit'>Enviar</button>
        {enviado && (
          <p className='centrado rojo'>¡Gracias por contactarnos! Te responderemos pronto.</p>
        )}
      </form>
    </div>
  )
}

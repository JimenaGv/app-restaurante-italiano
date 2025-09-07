import React from 'react'

export const Ubicacion = () => {
  return (
    <div>
      <header className='encabezado'>
        <h1>Encuéntranos entre sabores y encanto</h1>
      </header>

      <section className='contenedor'>
        <h3>Bella Italia</h3>
        <p>
          Ubicado en el corazón de Roma Norte, Bella Italia te invita a disfrutar de auténtica cocina italiana con un toque casero y romántico. Ideal para cenas familiares, citas especiales o simplemente para consentirte con una buena pasta.
        </p>
        <p className='espacio-arriba'>
          📍 <span>Dirección:</span> Av. Álvaro Obregón #321, Col. Roma Norte, CDMX
        </p>
      </section>

      <section className='contenedor'>
        <iframe
          title='Mapa de Bella Italia'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.123456789!2d-99.157890!3d19.412345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff123456789%3A0xabcdef987654321!2sRoma%20Norte%2C%20CDMX!5e0!3m2!1ses!2smx!4v1694100000000'
          width='100%'
          height='400'
          style={{ border: 'none', borderRadius: '10px' }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        />
      </section>
    </div>
  )
}

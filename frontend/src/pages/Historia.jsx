import '../styles/global.css'
import '../styles/historia.css'

export const Historia = () => {
  return (
    <>
      <section className='history-container'>
        <h1> Más que un restaurante, una herencia </h1>
        <p>
          En el corazón de nuestro barrio, Bella Italia nació del sueño de un hombre apasionado por su herencia, la
          cocina y su gente. Don Giovanni, un chef veterano con más de tres décadas al frente de esta casa, abrió sus
          puertas con el anhelo de construir un espacio donde cada plato contara una historia, cada aroma evocara
          tradición, y cada visita se transformara en una pequeña celebración familiar.
        </p>
        <hr />
        <p>
          Desde el primer pan horneado y la primera pasta al dente, Don Giovanni se ganó el cariño de su clientela.
          Bella Italia se convirtió en un refugio para familias, parejas y comensales en busca de sabores auténticos y
          cercanía humana. Aquí no solo llegaban por la comida, sino por el calor de su trato y ese saber hacer que solo
          el tiempo y la experiencia otorgan.
        </p>
        <img
          src='https://orders.co/static/99a59eec0735fca313bf2b93349bd5d6/f659b/Italian-Restaurant-Design-Creating-an-Inviting-Ambiance.png'
          alt='Imagen del restaurante'
        />
        <p>
          Sin embargo, los años y las historias acumuladas también trajeron retos modernos. Don Giovanni, con su
          sabiduría, reconoció que adaptarse no significa perder el alma: es conservar lo que nos hace únicos y
          fortalecerlo. Así nació la renovación de Bella Italia: un proceso cuidadoso para digitalizar la atención sin
          perder la esencia. Ahora, los clientes pueden registrarse, hacer pedidos o reservar desde su dispositivo
          favorito, personalizando sus platos según gustos o necesidades — sin dejar de sentir que cada pedido viene
          directamente de la cocina de Don Giovanni.
        </p>
        <hr />
        <div class='timeline'>
          <div class='timeline-event'>
            <div class='timeline-year'>1992</div>
            <div>Don Giovanni abre las puertas de Bella Italia, un sueño que comienza.</div>
          </div>
          <div class='timeline-event'>
            <div class='timeline-year'>2005</div>
            <div>
              Reconocido por la comunidad, Bella Italia se convierte en un punto de encuentro para familias y amigos.
            </div>
          </div>
          <div class='timeline-event'>
            <div class='timeline-year'>2018</div>
            <div>Comienza la digitalización: reservas online y pedidos desde dispositivos móviles.</div>
          </div>
          <div class='timeline-event'>
            <div class='timeline-year'>2024</div>
            <div>Un nuevo Bella Italia: tradición y modernidad en perfecta armonía.</div>
          </div>
        </div>
        <hr />
        <p>
          Hoy, Bella Italia sigue siendo un abrazo a la tradición con brazos modernos. Don Giovanni continúa
          supervisando cada detalle —desde el albahaca fresco hasta el último "buon appetito"— mientras nuestra carta se
          muestra con elegancia en pantallas y menús digitales. Estamos orgullosos de que cada reserva, cada plato y
          cada sonrisa sigan siendo una muestra de cómo lo tradicional y lo innovador pueden cocinarse juntos, para que
          siempre te sientas bienvenido, como en casa.
        </p>
      </section>
    </>
  )
}

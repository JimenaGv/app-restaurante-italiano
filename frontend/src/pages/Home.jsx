import { Link } from 'react-router-dom'
// import { Footer } from '../components/Footer'
import '../styles/home.css'

export const Home = () => {
  return (
    <div className='home'>
      {/* Hero Section */}
      <section className='hero'>
        <div className='hero-overlay'>
          <div className='hero-content'>
            <h1>Bienvenido a Bella Italia</h1>
            <p>
              Disfruta de la auténtica cocina italiana con un ambiente acogedor y
              moderno. Explora nuestros menús con platos de la más alta calidad.
            </p>
            <Link to='/menu' className='hero-btn'>
              Explorar el Menú
            </Link>
          </div>
        </div>
      </section>

      {/* Menú Destacado */}
      <section className='menu-destacado'>
        <div className='contenedor'>
          <div className='encabezado'>
            <h2>Menú Destacado</h2>
          </div>

          <div className='menu-grid'>
            <div className='menu-card'>
              <div className='menu-image'>
                <img src='/pasta-pomodoro.jpg' alt='Pasta al Pomodoro' />
              </div>
              <div className='menu-info'>
                <h3>Pasta al Pomodoro</h3>
                <p>Deliciosa pasta fresca con salsa de tomate casera y albahaca fresca.</p>
              </div>
            </div>

            <div className='menu-card'>
              <div className='menu-image'>
                <img src='/pizza-pepperoni.jpg' alt='Pizza Pepperoni' />
              </div>
              <div className='menu-info'>
                <h3>Pizza Pepperoni</h3>
                <p>Pizza artesanal con pepperoni premium y queso mozzarella derretido.</p>
              </div>
            </div>

            <div className='menu-card'>
              <div className='menu-image'>
                <img src='/tiramisu.jpg' alt='Tiramisú' />
              </div>
              <div className='menu-info'>
                <h3>Tiramisú</h3>
                <p>El postre italiano más famoso, con café espresso y mascarpone.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

// Página que se muestra en rutas no establecidas
import '../styles/global.css'
import '../styles/chef.css'

export const NotFound = () => {
  return (
    <>
      <div className='encabezado'>
        <h1>¡Mamma mia!</h1>
        <h1>Esta página no está en el menú</h1>
      </div>
      <div className='encabezado'>
        <p>Pero no te preocupes, tenemos muchas delicias esperándote.</p>
        <p>Da clic en el botón de abajo para volver.</p>
      </div>
      <div className='chef-container'>
        <img src='../public/chef.png' alt='Chef italiano' className='chef-image' />
      </div>
      <div className='centrado espacio-arriba'>
        <button>Página de inicio</button>
      </div>
    </>
  )
}

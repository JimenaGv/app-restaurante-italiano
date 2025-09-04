import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { NavbarProvider } from './context/navbarContext'
import { CarritoProvider } from './context/carrito'
import { UserProfile } from './pages/Perfil'
import { Home } from './pages/Home'
import { ConfirmarPedido } from './pages/ConfirmarPedido'
import { PedidoConfirmado } from './pages/PedidoConfirmado'
import { NotFound } from './pages/NotFound'
import { Menu } from './pages/Menu'
import { Carrito } from './pages/Carrito'

export const App = () => {
  return (
    <NavbarProvider>
      <CarritoProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Ruta para perfil */}
            <Route path='/perfil' element={<UserProfile />} />
            <Route path='/' element={<Home />} />
            <Route path='/confirmacion-pedido' element={<ConfirmarPedido />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/pedido-confirmado' element={<PedidoConfirmado />} />
            {/* Página para rutas no establecidas */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CarritoProvider>
    </NavbarProvider>

  )
}

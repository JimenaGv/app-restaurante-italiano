import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { NavbarProvider } from './context/navbarContext'
import { UserProfile } from './pages/Perfil'
import { Home } from './pages/Home'
import { ConfirmarPedido } from './pages/ConfirmarPedido'
import { PedidoConfirmado } from './pages/PedidoConfirmado'
import { HistorialPedidos } from './pages/HistorialPedidos'
import { NotFound } from './pages/NotFound'

export const App = () => {
  return (
    <NavbarProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Ruta para perfil */}
          <Route path='/perfil' element={<UserProfile />} />
          <Route path='/' element={<Home />} />
          <Route path='/confirmacion-pedido' element={<ConfirmarPedido />} />
          <Route path='/pedido-confirmado' element={<PedidoConfirmado />} />
          <Route path='/historial' element={<HistorialPedidos />} />
          {/* Página para rutas no establecidas */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </NavbarProvider>

  )
}

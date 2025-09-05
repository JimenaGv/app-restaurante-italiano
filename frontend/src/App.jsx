import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { NavbarProvider } from './context/navbarContext'
import { UserProfile } from './pages/Perfil'
import { Home } from './pages/Home'
import { ConfirmarPedido } from './pages/ConfirmarPedido'
import { PedidoConfirmado } from './pages/PedidoConfirmado'
import { HistorialPedidos } from './pages/HistorialPedidos'
import { NotFound } from './pages/NotFound'
import { Menu } from './pages/Menu'
import Login from './pages/Login'
import Register from './pages/Register'

export const App = () => {
  return (
    <NavbarProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Ruta para perfil */}
          <Route path='/perfil' element={<UserProfile />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/confirmacion-pedido' element={<ConfirmarPedido />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/pedido-confirmado' element={<PedidoConfirmado />} />
          <Route path='/historial' element={<HistorialPedidos />} />
          {/* Página para rutas no establecidas */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </NavbarProvider>
  )
}

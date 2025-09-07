import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { NavbarProvider } from './context/navbarContext'
import { CarritoProvider, useCarrito } from './context/carrito'
import { UserProfile } from './pages/Perfil'
import { Home } from './pages/Home'
import { ConfirmarPedido } from './pages/ConfirmarPedido'
import { NotFound } from './pages/NotFound'
import { Menu } from './pages/Menu'
import { Carrito } from './pages/Carrito'
import { RutaProtegida } from './components/RutaProtegida'
import { PedidoConfirmadoWrapper } from './components/pedidos/PedidoConfirmadoWrapper'
import Login from './pages/Login'
import Register from './pages/Register'
import { Historia } from './pages/Historia'
import { Contacto } from './pages/Contacto'
import { Ubicacion } from './pages/Ubicacion'

export const App = () => {
  return (
    <NavbarProvider>
      <CarritoProvider>
        <AppRoutes />
      </CarritoProvider>
    </NavbarProvider>
  )
}

const AppRoutes = () => {
  const { carrito } = useCarrito()
  const canAccessPedido = carrito.length > 0

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/perfil' element={<UserProfile />} />
        <Route path='/' element={<Home />} />
        <Route
          path='/confirmacion-pedido'
          element={
            <RutaProtegida canAccess={canAccessPedido} redirectTo='/'>
              <ConfirmarPedido />
            </RutaProtegida>
          }
        />
        <Route path='/menu' element={<Menu />} />
        <Route path='/ubicacion' element={<Ubicacion />} />
        <Route path='/historia' element={<Historia />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/carrito' element={<Carrito />} />
        <Route path='/pedido-confirmado' element={<PedidoConfirmadoWrapper />} />
        <Route path='*' element={<NotFound />} /> {/* Página para rutas no establecidas */}
      </Routes>
    </BrowserRouter>
  )
}

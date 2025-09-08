import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { NavbarProvider, useNavbar } from './context/navbarContext.jsx'
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
  const { isLoggedIn } = useNavbar()
  const canAccessPedido = carrito.length > 0

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/ubicacion' element={<Ubicacion />} />
        <Route path='/historia' element={<Historia />} />
        <Route path='/contacto' element={<Contacto />} />

        {/* Rutas de autenticación - solo para NO logueados */}
        <Route
          path='/login'
          element={
            <RutaProtegida canAccess={!isLoggedIn} redirectTo='/'>
              <Login />
            </RutaProtegida>
          }
        />
        <Route
          path='/register'
          element={
            <RutaProtegida canAccess={!isLoggedIn} redirectTo='/'>
              <Register />
            </RutaProtegida>
          }
        />

        {/* Rutas protegidas - solo para logueados */}
        <Route
          path='/perfil'
          element={
            <RutaProtegida canAccess={isLoggedIn} redirectTo='/login'>
              <UserProfile />
            </RutaProtegida>
          }
        />

        <Route
          path='/carrito'
          element={
            <RutaProtegida canAccess={isLoggedIn} redirectTo='/login'>
              <Carrito />
            </RutaProtegida>
          }
        />

        <Route
          path='/confirmacion-pedido'
          element={
            <RutaProtegida
              canAccess={isLoggedIn && canAccessPedido}
              redirectTo={!isLoggedIn ? '/login' : '/'}
            >
              <ConfirmarPedido />
            </RutaProtegida>
          }
        />

        <Route
          path='/pedido-confirmado'
          element={
            <RutaProtegida canAccess={isLoggedIn} redirectTo='/login'>
              <PedidoConfirmadoWrapper />
            </RutaProtegida>
          }
        />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import { NavbarProvider } from './context/navbarContext'
import { CarritoProvider, useCarrito } from './context/carrito'
import { UserProfile } from './pages/Perfil'
import { Home } from './pages/Home'
import { ConfirmarPedido } from './pages/ConfirmarPedido'
import { NotFound } from './pages/NotFound'
import { Menu } from './pages/Menu'
import { Carrito } from './pages/Carrito'
import { RutaProtegida } from './components/RutaProtegida'
import { ProtectedRoute, PublicRoute } from './components/AuthMiddleware'
import { PedidoConfirmadoWrapper } from './components/pedidos/PedidoConfirmadoWrapper'
import Login from './pages/Login'
import Register from './pages/Register'
import { Historia } from './pages/Historia'

export const App = () => {
  return (
    <AuthProvider>
      <NavbarProvider>
        <CarritoProvider>
          <AppRoutes />
        </CarritoProvider>
      </NavbarProvider>
    </AuthProvider>
  )
}

const AppRoutes = () => {
  const { carrito } = useCarrito()
  const canAccessPedido = carrito.length > 0

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Rutas públicas de autenticación */}
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/register'
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Rutas públicas generales */}
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/historia' element={<Historia />} />

        {/* Rutas que requieren autenticación */}
        <Route
          path='/perfil'
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/carrito'
          element={
            <ProtectedRoute>
              <Carrito />
            </ProtectedRoute>
          }
        />

        {/* Ruta que requiere autenticación Y carrito con productos */}
        <Route
          path='/confirmacion-pedido'
          element={
            <ProtectedRoute>
              <RutaProtegida canAccess={canAccessPedido} redirectTo='/menu'>
                <ConfirmarPedido />
              </RutaProtegida>
            </ProtectedRoute>
          }
        />

        <Route
          path='/pedido-confirmado'
          element={
            <ProtectedRoute>
              <PedidoConfirmadoWrapper />
            </ProtectedRoute>
          }
        />

        {/* Página para rutas no establecidas */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

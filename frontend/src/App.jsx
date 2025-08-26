import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfirmarPedido } from './pages/ConfirmarPedido'
import { PedidoConfirmado } from './pages/PedidoConfirmado'
import { HistorialPedidos } from './pages/HistorialPedidos'

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<ConfirmarPedido />} />
      <Route path='/pedido-confirmado' element={<PedidoConfirmado />} />
      <Route path='/historial' element={<HistorialPedidos />} />
    </Routes>
  </BrowserRouter>
)

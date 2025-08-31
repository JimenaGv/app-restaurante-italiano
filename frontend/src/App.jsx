
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { UserProfile } from "./pages/Perfil";
import { Home } from "./pages/Home";
import { ConfirmarPedido } from './pages/ConfirmarPedido'
import { PedidoConfirmado } from './pages/PedidoConfirmado'
import { HistorialPedidos } from './pages/HistorialPedidos'


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ConfirmarPedido />} />
      <Route path='/pedido-confirmado' element={<PedidoConfirmado />} />
      <Route path='/historial' element={<HistorialPedidos />} />
        {/* Ruta para perfil */}
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
};
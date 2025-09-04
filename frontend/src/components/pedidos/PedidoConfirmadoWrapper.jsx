import { useLocation } from 'react-router-dom'
import { RutaProtegida } from '../RutaProtegida'
import { PedidoConfirmado } from '../../pages/PedidoConfirmado'

export const PedidoConfirmadoWrapper = () => {
  const location = useLocation()
  const canAccess = location.state?.pedido !== undefined

  return (
    <RutaProtegida canAccess={canAccess} redirectTo='/'>
      <PedidoConfirmado pedido={location.state?.pedido} />
    </RutaProtegida>
  )
}

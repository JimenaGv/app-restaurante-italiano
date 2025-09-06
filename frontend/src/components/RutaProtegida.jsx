import { Navigate } from 'react-router-dom'

export const RutaProtegida = ({ canAccess, redirectTo = '/', children }) => {
  return canAccess ? children : <Navigate to={redirectTo} replace />
}

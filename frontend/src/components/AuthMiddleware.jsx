import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto' />
          <p className='mt-4 text-gray-600'>Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}

export const PublicRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto' />
          <p className='mt-4 text-gray-600'>Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  if (isLoggedIn) {
    const from = location.state?.from?.pathname || '/'
    return <Navigate to={from} replace />
  }

  return children
}

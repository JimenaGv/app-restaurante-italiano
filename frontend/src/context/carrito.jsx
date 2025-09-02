import React, { createContext, useState, useContext } from 'react'

const CarritoContext = createContext()

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([])

  const agregarItem = (item) => {
    setCarrito((prevCarrito) => [...prevCarrito, item])
  }

  const eliminarItem = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id))
  }

  const actualizarCantidad = (id, cantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      )
    )
  }

  return (
    <CarritoContext.Provider value={{ carrito, agregarItem, eliminarItem, actualizarCantidad }}>
      {children}
    </CarritoContext.Provider>
  )
}

// Hook para consumir el contexto
export const useCarrito = () => useContext(CarritoContext)

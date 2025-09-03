import React, { createContext, useState, useContext, useMemo } from 'react'

const CarritoContext = createContext()

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([])

  const agregarItem = (item) => {
    const itemExistente = carrito.find(i => i.id === item.id)
    const esIgual = itemExistente && JSON.stringify(itemExistente?.customizations) === JSON.stringify(item?.customizations)

    if (esIgual) {
      actualizarCantidad(item.id, item.cantidad + itemExistente.cantidad)
    } else {
      setCarrito((prevCarrito) => [...prevCarrito, item])
    }
  }

  const eliminarItem = (item) => {
    const itemIndex = carrito.findIndex(
      (i) =>
        i.id === item.id &&
      JSON.stringify(i.customizations) === JSON.stringify(item.customizations)
    )

    if (itemIndex >= 0) {
      setCarrito((prevCarrito) =>
        prevCarrito.filter((_, index) => index !== itemIndex)
      )
    }
  }

  const actualizarCantidad = (id, cantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      )
    )
  }

  const totalPlatillos = useMemo(() => {
    return carrito.length
  }, [carrito])

  return (
    <CarritoContext.Provider value={{ carrito, agregarItem, eliminarItem, actualizarCantidad, totalPlatillos }}>
      {children}
    </CarritoContext.Provider>
  )
}

// Hook para consumir el contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useCarrito = () => useContext(CarritoContext)

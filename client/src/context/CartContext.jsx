import { createContext, useState } from "react"

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [selectedProducts, setSelectedProducts] = useState([])

  // Agregar producto al carrito
  const addToCart = (product) => {
    setSelectedProducts(prev => {
      // Verificar si ya existe el producto
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev
      }
      return [...prev, product]
    })
  }

  // Remover producto del carrito
  const removeFromCart = (productId) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId))
  }

  // Limpiar todo el carrito
  const clearCart = () => {
    setSelectedProducts([])
  }

  // Verificar si un producto está seleccionado
  const isSelected = (productId) => {
    return selectedProducts.some(p => p.id === productId)
  }

  // Toggle: agregar o remover
  const toggleProduct = (product) => {
    if (isSelected(product.id)) {
      removeFromCart(product.id)
    } else {
      addToCart(product)
    }
  }

  // Obtener total de productos seleccionados
  const getTotalCount = () => {
    return selectedProducts.length
  }

  // Obtener lista de productos seleccionados
  const getSelectedProducts = () => {
    return selectedProducts
  }

  // Generar mensaje para WhatsApp
  const generateWhatsAppMessage = () => {
    if (selectedProducts.length === 0) return ""

    let message = "Hola! 😊\nQuería consultar por los siguientes productos:\n\n"
    
    selectedProducts.forEach(product => {
      message += `• ${product.name} – $${parseFloat(product.price).toLocaleString("es-AR", { minimumFractionDigits: 2 })}\n`
    })

    message += "\n¡Gracias!"
    
    return message
  }

  return (
    <CartContext.Provider value={{
      selectedProducts,
      addToCart,
      removeFromCart,
      clearCart,
      isSelected,
      toggleProduct,
      getTotalCount,
      getSelectedProducts,
      generateWhatsAppMessage,
    }}>
      {children}
    </CartContext.Provider>
  )
}

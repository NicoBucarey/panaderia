import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function FloatingBar() {
  const { getTotalCount, generateWhatsAppMessage, clearCart } = useContext(CartContext)
  
  const totalCount = getTotalCount()

  if (totalCount === 0) return null

  // Número de teléfono del negocio (envuelto en URL encode)
  const phoneNumber = "5493624123456" // Cambiar con tu número de WhatsApp
  const message = generateWhatsAppMessage()
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-4 shadow-2xl z-40 md:left-auto md:right-4 md:bottom-4 md:rounded-full md:w-auto md:max-w-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Información */}
        <div className="flex-1">
          <p className="font-semibold text-sm">
            🟢 Seleccionaste {totalCount} producto{totalCount !== 1 ? "s" : ""}
          </p>
          <p className="text-xs text-green-100 mt-1">
            Consulta por disponibilidad
          </p>
        </div>

        {/* Botones */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={clearCart}
            className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            title="Limpiar selección"
          >
            ✕
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-600 hover:bg-green-50 px-6 py-2 rounded-lg font-bold transition-colors text-sm"
          >
            📱 Consultar
          </a>
        </div>
      </div>
    </div>
  )
}

export default FloatingBar

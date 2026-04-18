import { useContext } from "react"
import { FaWhatsapp } from "react-icons/fa"
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
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-4 py-4 shadow-2xl z-50 rounded-t-3xl md:rounded-full md:left-auto md:right-4 md:bottom-4 md:w-auto md:max-w-md">
      <div className="flex justify-between items-center md:flex-row flex-col gap-3">
        {/* Información */}
        <div className="flex-1 md:flex-none">
          <p className="font-semibold text-sm text-center md:text-left">
            🟢 Seleccionaste {totalCount} producto{totalCount !== 1 ? "s" : ""}
          </p>
          <p className="text-xs text-green-50 mt-1 text-center md:text-left">
            Consulta por Whatsapp 
          </p>
        </div>

        {/* Botones */}
        <div className="flex gap-2 ml-0 md:ml-4 w-full md:w-auto">
          <button
            onClick={clearCart}
            className="bg-[#0b5f56] hover:bg-[#094c45] px-4 py-2 rounded-lg font-medium transition-colors text-sm flex-1 md:flex-none"
            title="Limpiar selección"
          >
            ✕
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#128C7E] hover:bg-[#f4fffa] px-6 py-2 rounded-lg font-bold transition-colors text-sm flex-1 md:flex-none text-center inline-flex items-center justify-center gap-2"
          >
            <FaWhatsapp aria-hidden="true" />
            <span>Consultar</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default FloatingBar

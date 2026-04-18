import { FaWhatsapp } from "react-icons/fa"

function WhatsAppSection() {
  const phoneNumber = "5492994573997"
  const message = "Hola, quisiera información sobre los productos de Panadería Blasco"

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="contacto-whatsapp" className="bg-gradient-to-r from-green-50 to-emerald-50 scroll-mt-20 md:scroll-mt-24 py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          ¿Preguntas sobre nuestros productos?
        </h2>
        <p className="text-gray-600 mb-6">
          Estamos disponibles en WhatsApp para ayudarte. Haz tu pedido, consulta precios o solicita información.
        </p>
        <button
          onClick={handleWhatsAppClick}
          className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
        >
          <FaWhatsapp className="h-6 w-6" aria-hidden="true" />
          Contactar por WhatsApp
        </button>
      </div>
    </section>
  )
}

export default WhatsAppSection

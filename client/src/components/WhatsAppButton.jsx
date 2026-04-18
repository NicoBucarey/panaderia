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
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.734.732 5.404 2.124 7.704l-2.257 6.828 7.052-2.168c2.15 1.186 4.576 1.812 7.143 1.812h.005c5.45 0 9.854-4.406 9.854-9.854 0-2.633-.636-5.11-1.844-7.322A9.869 9.869 0 0011.921 6.979z" />
          </svg>
          Contactar por WhatsApp
        </button>
      </div>
    </section>
  )
}

export default WhatsAppSection

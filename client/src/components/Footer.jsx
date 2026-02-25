function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12" id="contacto">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">

        {/* Logo */}
        <div>
          <img
            src="/logo.png"
            alt="Blasco Bakery"
            className="h-12 mb-4"
          />
          <p>
            Panadería artesanal en Neuquén.  
            Calidad, tradición y sabor en cada producto.
          </p>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Contacto
          </h4>
          <p>Choele Choel y El Dorado</p>
          <p>Valentina Sur, Neuquén</p>
          <p>+54 299 000 0000</p>
        </div>

        {/* Horarios */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Horarios
          </h4>
          <p>Lunes a Sábado: 7:00 - 20:00</p>
          <p>Domingos: 8:00 - 13:00</p>
        </div>

      </div>

      <div className="text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} Blasco Bakery — Todos los derechos reservados
      </div>
    </footer>
  )
}

export default Footer

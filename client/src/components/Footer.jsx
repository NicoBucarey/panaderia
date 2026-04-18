function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12" id="contacto">
      <div className="max-w-6xl mx-auto px-4 grid gap-8 text-center md:grid-cols-3 md:text-left">

        {/* Logo */}
        <div className="flex flex-col items-center md:items-start">
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
        </div>

        {/* Horarios */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Horarios
          </h4>
          <p>Lunes a Sábado: 8:00 - 21:00</p>
          <p>Domingos: 8:00 - 14:30</p>
        </div>

      </div>

      <div className="text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} Blasco Bakery — Todos los derechos reservados
      </div>
    </footer>
  )
}

export default Footer

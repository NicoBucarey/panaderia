function LocationSection() {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-8">
          Nuestra Ubicación
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Dirección
            </h3>

            <p className="text-gray-600 mb-4">
              Esquina de Choele Choel y El Dorado  
              <br />
              Valentina Sur, Neuquén Capital
            </p>

            {/* <p className="text-gray-500">
              Estamos ubicados en el centro, a metros de la plaza principal.
            </p> */}
          </div>

          {/* Mapa */}
          <div className="w-full h-80 rounded-2xl overflow-hidden shadow-md">
            <iframe
              title="Mapa ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.0934929177333!2d-68.11764044186455!3d-38.96753313128995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a333b4934350b%3A0xbf0730c2e667801f!2sPanaderia%20Blasco!5e0!3m2!1ses!2sar!4v1771984009250!5m2!1ses!2sar"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  )
}

export default LocationSection

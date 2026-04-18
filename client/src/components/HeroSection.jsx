function HeroSection() {

  const scrollToMenu = () => {
    const section = document.getElementById("menu")
    section?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section 
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-0 md:bg-fixed"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1509440159596-0249088772ff')"
      }}
    >
      {/* Overlay suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>

      {/* Contenedor con marco de color solo para la imagen */}
      <div className="relative w-full max-w-5xl">
        {/* Marco ámbar solo alrededor de la imagen */}
        <div className="p-4 md:p-12 bg-amber-100/60 backdrop-blur-sm rounded-3xl shadow-2xl">
          {/* Imagen principal - responsiva */}
          <div className="relative">
            <picture>
              {/* Imagen móvil */}
              <source 
                srcSet="/portadamovile.png" 
                media="(max-width: 768px)" 
              />
              {/* Imagen desktop */}
              <img 
                src="/portada.png" 
                alt="Panadería Blasco - Portada"
                className="w-full h-auto object-contain rounded-2xl shadow-2xl"
              />
            </picture>
          </div>
        </div>

        {/* Contenido debajo - sin borde */}
        <div className="text-center space-y-6 mt-8">
          <p className="text-white text-lg md:text-2xl font-medium drop-shadow-lg">
            Descubre nuestros productos artesanales
          </p>

          <button
            onClick={scrollToMenu}
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Ver Productos
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-gray-100/70 to-gray-100"></div>
    </section>
  )
}

export default HeroSection

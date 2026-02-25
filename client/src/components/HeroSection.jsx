function HeroSection() {

  const scrollToMenu = () => {
    const section = document.getElementById("menu")
    section?.scrollIntoView({ behavior: "smooth" })
  } //scrollIntoView es un método que permite desplazar la página hasta el elemento que se le indique, en este caso el elemento con id "menu". El parámetro { behavior: "smooth" } hace que el desplazamiento sea suave en lugar de instantáneo.
  //?. es el operador de encadenamiento opcional, que permite acceder a la función scrollIntoView solo si el elemento section existe, evitando errores si no se encuentra el elemento con id "menu".

  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
            "url('https://images.unsplash.com/photo-1509440159596-0249088772ff')"
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Contenido */}
      <div className="relative text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Panadería Blasco
        </h1>

        <p className="text-xl md:text-2xl mb-8">
             Tradición y sabor en cada día
        </p>

        <button
          onClick={scrollToMenu}
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Ver Menú
        </button>
      </div>
    </section>
  )
}

export default HeroSection

import { useState, useEffect } from "react"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Blasco Bakery"
            className="h-10"
          />
        </a>

        {/* Links */}
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#menu" className="hover:text-yellow-600">
            Productos
          </a>
          <a href="#ubicacion" className="hover:text-yellow-600">
            Ubicación
          </a>
          <a href="#contacto" className="hover:text-yellow-600">
            Contacto
          </a>
        </div>

      </div>
    </nav>
  )
}

export default Navbar

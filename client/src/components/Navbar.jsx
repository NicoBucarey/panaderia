import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
    setMobileMenuOpen(false)
  }

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed w-full z-50 top-0 left-0 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 flex justify-between items-center ${
        scrolled ? "py-3" : "py-5"
      }`}>

        {/* Logo */}
        <a href="/" className="flex items-center" onClick={handleNavClick}>
          <img
            src="/logo.png"
            alt="Blasco Bakery"
            className="h-10"
          />
        </a>

        {/* Links Desktop */}
        <div className="hidden md:flex gap-8 font-medium items-center">
          <a href="#menu" className="hover:text-yellow-600" onClick={handleNavClick}>
            Productos
          </a>
          <a href="#ubicacion" className="hover:text-yellow-600" onClick={handleNavClick}>
            Ubicación
          </a>
          <a href="#contacto" className="hover:text-yellow-600" onClick={handleNavClick}>
            Contacto
          </a>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Cerrar sesión
            </button>
          ) : (
            <a href="/admin/login" className="hover:text-yellow-600" onClick={handleNavClick}>
              Admin
            </a>
          )}
        </div>

        {/* Hamburger Menu Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-2xl font-bold focus:outline-none"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 w-full">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col gap-3 font-medium">
              <a 
                href="#menu" 
                className="text-gray-800 hover:text-yellow-600 hover:font-semibold transition-colors py-2"
                onClick={handleNavClick}
              >
                Productos
              </a>
              <a 
                href="#ubicacion" 
                className="text-gray-800 hover:text-yellow-600 hover:font-semibold transition-colors py-2"
                onClick={handleNavClick}
              >
                Ubicación
              </a>
              <a 
                href="#contacto" 
                className="text-gray-800 hover:text-yellow-600 hover:font-semibold transition-colors py-2"
                onClick={handleNavClick}
              >
                Contacto
              </a>
              <hr className="border-gray-200 my-1" />
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 font-medium text-left hover:font-semibold transition-colors py-2"
                >
                  Cerrar sesión
                </button>
              ) : (
                <a 
                  href="/admin/login" 
                  className="text-gray-800 hover:text-yellow-600 hover:font-semibold transition-colors py-2"
                  onClick={handleNavClick}
                >
                  Admin
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar


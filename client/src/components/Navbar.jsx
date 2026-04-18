import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()

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
      className="fixed w-full z-50 top-0 left-0 bg-white border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex justify-between items-center">

        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0" onClick={handleNavClick}>
          <img
            src="/logo.png"
            alt="Blasco Bakery"
            className="h-8 md:h-10 w-auto"
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
          className="md:hidden text-[1.9rem] font-bold focus:outline-none flex-shrink-0 transition-transform duration-300 hover:scale-110"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 md:top-20 left-0 right-0 bg-white border-b border-gray-200 w-full z-40 shadow-md animate-slide-down">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col gap-0.5 font-medium text-center">
              <a 
                href="#menu" 
                className="text-gray-800 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-200 py-2.5 rounded-lg px-4 text-[15px]"
                onClick={handleNavClick}
              >
                Productos
              </a>
              <a 
                href="#ubicacion" 
                className="text-gray-800 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-200 py-2.5 rounded-lg px-4 text-[15px]"
                onClick={handleNavClick}
              >
                Ubicación
              </a>
              <a 
                href="#contacto" 
                className="text-gray-800 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-200 py-2.5 rounded-lg px-4 text-[15px]"
                onClick={handleNavClick}
              >
                Contacto
              </a>
              <hr className="border-gray-200 my-1.5" />
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200 py-2.5 rounded-lg px-4 text-[15px]"
                >
                  Cerrar sesión
                </button>
              ) : (
                <a 
                  href="/admin/login" 
                  className="text-gray-800 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-200 py-2.5 rounded-lg px-4 text-[15px]"
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


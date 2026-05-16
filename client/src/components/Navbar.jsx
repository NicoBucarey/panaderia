import { useContext, useEffect, useRef, useState } from "react"
import { FaBars, FaXmark } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { ENABLE_WHATSAPP } from "../config/features"

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const { isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const closeTimeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const openMobileMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current)
    }

    setMobileMenuVisible(true)
    requestAnimationFrame(() => {
      setMobileMenuOpen(true)
    })
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)

    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current)
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      setMobileMenuVisible(false)
    }, 250)
  }

  const toggleMobileMenu = () => {
    if (mobileMenuVisible && mobileMenuOpen) {
      closeMobileMenu()
      return
    }

    openMobileMenu()
  }

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
    closeMobileMenu()
  }

  const handleNavClick = () => {
    closeMobileMenu()
  }

  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full border-b border-amber-100 bg-stone-50 shadow-[0_12px_35px_rgba(15,23,42,0.12)] md:border-white/60 md:bg-white/85 md:backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex justify-between items-center">

        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0 rounded-2xl px-1 py-1" onClick={handleNavClick}>
          <img
            src="/logo.png"
            alt="Blasco Bakery"
            className="h-9 md:h-10 w-auto"
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
          <a href="#redes" className="hover:text-yellow-600" onClick={handleNavClick}>
            Redes
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
          onClick={toggleMobileMenu}
          className={`md:hidden flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/90 bg-white text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition-all duration-300 hover:scale-105 hover:bg-amber-50 ${mobileMenuVisible && mobileMenuOpen ? "rotate-90 border-amber-400 bg-amber-50 shadow-md" : "rotate-0"}`}
          aria-label="Abrir menú"
          aria-expanded={mobileMenuVisible && mobileMenuOpen}
        >
          {mobileMenuVisible && mobileMenuOpen ? (
            <FaXmark className="text-[1.35rem]" />
          ) : (
            <FaBars className="text-[1.15rem]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuVisible && (
        <>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={closeMobileMenu}
            className={`fixed inset-0 top-16 z-30 bg-slate-950/10 backdrop-blur-[2px] transition-opacity duration-200 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          />

          <div className={`fixed top-[4.4rem] left-0 right-0 z-40 px-4 ${mobileMenuOpen ? "animate-slide-down" : "animate-slide-up"}`}>
            <div className="mx-auto max-w-md overflow-hidden rounded-[28px] border border-white/70 bg-white/92 p-3 shadow-[0_20px_50px_rgba(15,23,42,0.18)] backdrop-blur-xl">
              <div className="flex flex-col gap-1 text-center">
                <a 
                  href="#menu" 
                  className="rounded-2xl px-4 py-3 text-[15px] font-semibold text-slate-800 transition-all duration-200 hover:bg-amber-50 hover:text-amber-700"
                  onClick={handleNavClick}
                >
                  Productos
                </a>
                <a 
                  href="#ubicacion" 
                  className="rounded-2xl px-4 py-3 text-[15px] font-semibold text-slate-800 transition-all duration-200 hover:bg-amber-50 hover:text-amber-700"
                  onClick={handleNavClick}
                >
                  Ubicación
                </a>
                <a 
                  href="#redes" 
                  className="rounded-2xl px-4 py-3 text-[15px] font-semibold text-slate-800 transition-all duration-200 hover:bg-amber-50 hover:text-amber-700"
                  onClick={handleNavClick}
                >
                  Redes
                </a>

                <div className="mx-3 my-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="rounded-2xl px-4 py-3 text-[15px] font-semibold text-red-600 transition-all duration-200 hover:bg-red-50 hover:text-red-700"
                  >
                    Cerrar sesión
                  </button>
                ) : (
                  <a 
                    href="/admin/login" 
                    className="rounded-2xl bg-slate-900 px-4 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-slate-800"
                    onClick={handleNavClick}
                  >
                    Admin
                  </a>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}

export default Navbar


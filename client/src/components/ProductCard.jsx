import { useContext, useEffect, useRef, useState } from "react"
import { CartContext } from "../context/CartContext"

function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [showVarieties, setShowVarieties] = useState(false)
  const { isSelected, toggleProduct } = useContext(CartContext)
  const closeTimeoutRef = useRef(null)

  const selected = isSelected(product.id)
  const varieties = Array.isArray(product.varieties)
    ? product.varieties.filter((item) => item?.trim().length > 0)
    : []

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isModalVisible) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isModalVisible])

  const getImageUrl = () => {
    if (!product.image) return ""
    if (product.image.startsWith("http")) return product.image
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"
    return `${apiUrl}${product.image}`
  }

  const imageUrl = getImageUrl()

  const openModal = () => {
    if (!imageUrl || imageError) return

    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current)
    }

    setIsModalVisible(true)
    requestAnimationFrame(() => {
      setIsModalOpen(true)
    })
  }

  const closeModal = () => {
    setIsModalOpen(false)

    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current)
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      setIsModalVisible(false)
    }, 220)
  }

  return (
    <>
      <div
        className={`rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl ${
          selected
            ? "bg-green-50 border border-green-500 ring-2 ring-green-200 shadow-md"
            : "bg-white border border-gray-100 shadow-md"
        }`}
      >
        {/* Imagen */}
        <div
          className="h-48 overflow-hidden bg-gray-200 relative"
          onClick={openModal}
        >
          <img
            src={imageUrl}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true)
              setImageLoaded(true)
            }}
            className={`w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out ${
              imageLoaded ? "blur-0" : "blur-sm"
            }`}
          />

          {selected && (
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          )}

          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 px-4 text-center text-sm font-medium text-gray-500">
              Imagen no disponible
            </div>
          )}

          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-200 animate-pulse" />
          )}
        </div>

        {/* Contenido */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between">
            <h3
              className="text-lg font-semibold text-gray-800 flex-1 cursor-pointer leading-tight"
              onClick={openModal}
            >
              {product.name}
            </h3>

            <button
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                toggleProduct(product)
              }}
              className={`ml-2 text-xl transition-transform ${
                selected
                  ? "text-green-600 scale-125"
                  : "text-gray-400 hover:text-green-600"
              }`}
              title={selected ? "Deseleccionar" : "Seleccionar"}
            >
              ✓
            </button>
          </div>

          <p className="text-gray-500 text-sm leading-snug">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-1">
            <p className="text-green-600 font-semibold text-lg tracking-tight">
              ${product.price.toFixed(2)} / {product.unidadVenta}
            </p>

            <button
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                toggleProduct(product)
              }}
              className={`px-4 py-2 rounded-lg font-medium text-sm shadow-sm transition-all ${
                selected
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-green-100 hover:bg-green-200 text-green-700"
              }`}
            >
              {selected ? "Seleccionado ✓" : "Seleccionar"}
            </button>
          </div>

          {varieties.length > 0 && (
            <div className="pt-1">
              <p className="text-xs font-medium text-gray-500">
                {varieties.length} variedad{varieties.length !== 1 ? "es" : ""} disponible{varieties.length !== 1 ? "s" : ""}
              </p>
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  setShowVarieties((prev) => !prev)
                }}
                className="mt-1 text-sm font-medium text-amber-700 transition-colors hover:text-amber-800"
              >
                {showVarieties ? "Ocultar variedades" : "Ver variedades"}
              </button>

              {showVarieties && (
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {varieties.join(" · ")}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {isModalVisible && (
        <div
          className={`fixed inset-0 z-[70] flex items-center justify-center px-4 transition-colors duration-200 ${
            isModalOpen ? "bg-black/75" : "bg-black/0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`relative w-full max-w-2xl rounded-3xl bg-white p-4 shadow-2xl transition-all duration-200 ${
              isModalOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-4 scale-95 opacity-0"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-2xl text-white transition-colors hover:bg-black"
            >
              ✕
            </button>

            <img
              src={imageUrl}
              alt={product.name}
              className="max-h-[75vh] w-full rounded-2xl object-contain"
            />

            <h3 className="pt-4 text-center text-xl font-semibold text-gray-900">
              {product.name}
            </h3>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductCard
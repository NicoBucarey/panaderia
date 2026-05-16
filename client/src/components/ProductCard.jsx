import { useContext, useEffect, useRef, useState } from "react"
import { CartContext } from "../context/CartContext"
import { ENABLE_WHATSAPP } from "../config/features"
import { getLocalProductImageCandidates } from "../utils/productImageFallbacks"

function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageSrc, setImageSrc] = useState("")
  const [fallbackIndex, setFallbackIndex] = useState(-1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

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

  const localFallbacks = getLocalProductImageCandidates(product.name)

  const getPrimaryImageUrl = () => {
    if (!product.image) return ""
    if (product.image.startsWith("http")) return product.image
    if (product.image.startsWith("/productos/")) return product.image

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"
    return `${apiUrl}${product.image}`
  }

  useEffect(() => {
    const primaryImageUrl = getPrimaryImageUrl()
    const nextImageSrc = primaryImageUrl || localFallbacks[0] || ""

    setImageSrc(nextImageSrc)
    setImageLoaded(false)
    setImageError(!nextImageSrc)
    setFallbackIndex(primaryImageUrl ? -1 : nextImageSrc ? 0 : -1)
  }, [product.id, product.image, product.name])

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

  const openModal = () => {
    if (!imageSrc || imageError) return

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

  const handleImageError = () => {
    const nextIndex = fallbackIndex + 1

    if (nextIndex < localFallbacks.length) {
      setImageSrc(localFallbacks[nextIndex])
      setFallbackIndex(nextIndex)
      setImageLoaded(false)
      setImageError(false)
      return
    }

    setImageError(true)
    setImageLoaded(true)
  }

  return (
    <>
      <div
        className={`rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl ${
          ENABLE_WHATSAPP && selected
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
            src={imageSrc}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            className={`w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out ${
              imageLoaded ? "blur-0" : "blur-sm"
            }`}
          />

          {ENABLE_WHATSAPP && selected && (
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

          {/* Badge de variedades */}
          {varieties.length > 0 && (
            <div className="absolute top-2 left-2 bg-white/90 text-xs font-medium px-2 py-1 rounded-full shadow">
              {varieties.length} variedades
            </div>
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

            {ENABLE_WHATSAPP && (
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
              >
                ✓
              </button>
            )}
          </div>

          {/* Variedades visibles */}
          {varieties.length > 0 && (
            <p className="text-sm text-gray-500 leading-snug">
              {varieties.join(" · ")}
            </p>
          )}

          {/* Descripción */}
          <p className="text-gray-500 text-sm leading-snug">
            {product.description}
          </p>

          {/* Precio y botón */}
          <div className={`pt-2 ${ENABLE_WHATSAPP ? "flex items-center justify-between" : "block"}`}>
            <p className="text-green-600 font-semibold text-lg tracking-tight">
              ${product.price.toFixed(2)} / {product.unidadVenta}
            </p>

            {ENABLE_WHATSAPP && (
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
            )}
          </div>
        </div>
      </div>

      {/* Modal imagen */}
      {isModalVisible && (
        <div
          className={`fixed inset-0 z-[70] flex items-center justify-center px-4 transition-colors duration-200 ${
            isModalOpen ? "bg-black/75" : "bg-black/0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`relative w-full max-w-3xl rounded-3xl bg-white p-4 shadow-2xl transition-all duration-200 ${
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

            <div className="flex h-[60vh] min-h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-stone-100 sm:h-[65vh] md:h-[70vh] md:min-h-[420px]">
              <img
                src={imageSrc}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>

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
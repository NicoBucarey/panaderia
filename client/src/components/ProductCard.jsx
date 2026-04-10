import { useState, useContext } from "react"
import { CartContext } from "../context/CartContext"

function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { isSelected, toggleProduct } = useContext(CartContext)

  const selected = isSelected(product.id)

  // Resolver URL completa si es relativa
  const getImageUrl = () => {
    if (!product.image) return ""
    // Si ya tiene protocolo, devolver tal cual
    if (product.image.startsWith("http")) return product.image
    // Si es relativa, construir URL absoluta
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"
    const fullUrl = `${apiUrl}${product.image}`
    console.log(`🖼️ ${product.name} - URL: ${fullUrl}`)
    return fullUrl
  }

  const imageUrl = getImageUrl()

  return (
    <div className={`rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 ${
      selected ? "bg-green-50 border-2 border-green-500" : "bg-white"
    }`}>
      
      <div className="h-48 overflow-hidden bg-gray-200 relative">
        <img
          src={imageUrl}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            console.error(`❌ Error cargando imagen de ${product.name}:`, imageUrl)
            setImageLoaded(true)
          }}
          className={`w-full h-full object-cover hover:scale-105 transition duration-300 ${
            imageLoaded ? "blur-0" : "blur-sm"
          }`}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-200 animate-pulse" />
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold flex-1">
            {product.name}
          </h3>
          <button
            onClick={() => toggleProduct(product)}
            className={`ml-2 text-xl transition-transform ${
              selected ? "text-green-600 scale-125" : "text-gray-400 hover:text-green-600"
            }`}
            title={selected ? "Deseleccionar" : "Seleccionar"}
          >
            ✓
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <p className="text-green-600 font-bold text-lg">
            ${(product.price).toFixed(2)} / {product.unidadVenta}
          </p>
          <button
            onClick={() => toggleProduct(product)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
              selected
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-green-100 hover:bg-green-200 text-green-700"
            }`}
          >
            {selected ? "Seleccionado ✓" : "Seleccionar"}
          </button>
        </div>
      </div>

    </div>
  )
}


export default ProductCard

import { useState } from "react"

function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false)

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
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      
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
        <h3 className="text-lg font-semibold">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          {product.description}
        </p>

        <p className="text-green-600 font-bold text-lg mt-3">
          ${(product.price).toFixed(2)} / {product.unidadVenta}
        </p>
      </div>

    </div>
  )
}


export default ProductCard

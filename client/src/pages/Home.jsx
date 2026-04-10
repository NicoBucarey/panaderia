import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import CategoryButton from "../components/CategoryButton"
import HeroSection from "../components/HeroSection"
import LocationSection from "../components/LocationSection"
import HoursSection from "../components/HoursSection"
import SocialSection from "../components/SocialSection"
import FloatingBar from "../components/FloatingBar"
import WhatsAppSection from "../components/WhatsAppButton"
import { fetchProducts } from "../services/api"

function Home() {
  // Estados
  const [products, setProducts] = useState([]) // productos traídos del backend
  const [loading, setLoading] = useState(true) // indicador de carga
  const [error, setError] = useState(null) // manejo de errores
  const [selectedCategory, setSelectedCategory] = useState("todos")

  // Cargar productos cuando el componente monta
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchProducts()
        setProducts(data)
      } catch (err) {
        console.error("Error al cargar productos:", err)
        setError("No se pudieron cargar los productos. Intenta más tarde.")
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, []) // Solo ejecutar una vez cuando monta el componente

  // Filtrar productos por categoría seleccionada
  const filteredProducts =
    selectedCategory === "todos"
      ? products
      : products.filter(product => product.Category.name === selectedCategory)

  // Obtener lista de categorías únicas de los productos
  const categories = [
    "todos",
    ...new Set(products.map(product => product.Category.name))
  ] 

 return (
  <>
    <FloatingBar />
    <HeroSection />

    <div id="menu" className="container mx-auto py-10 px-4 pb-40">
      
      <h1 className="text-3xl font-bold mb-6">
        Nuestro Menú
      </h1>

      {/* Mostrar estado de carga */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Cargando productos...</p>
        </div>
      )}

      {/* Mostrar error si hay */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* Mostrar contenido solo si no está cargando y no hay error */}
      {!loading && !error && (
        <>
          {/* Categorías */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {categories.map(category => (
              <CategoryButton
                key={category}
                category={category}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            ))}
          </div>

          {/* Mostrar mensaje si no hay productos */}
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No hay productos en esta categoría
            </p>
          ) : (
            /* Productos */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}

    </div>
    <WhatsAppSection />
    <LocationSection />
    <HoursSection />
    <SocialSection />
    
  </>
)
}
export default Home

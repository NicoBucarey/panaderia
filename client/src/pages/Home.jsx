import { useState } from "react"
import ProductCard from "../components/ProductCard"
import products from "../data/products"
import CategoryButton from "../components/CategoryButton"
import HeroSection from "../components/HeroSection"
import LocationSection from "../components/LocationSection"
import HoursSection from "../components/HoursSection"

function Home() {
 
  const [selectedCategory, setSelectedCategory] = useState("all") // cuando seleccionamos una categoria  el setSelectedCategory cambia el valor del estado selectedCategory y debido al useEstate React vuelve a renderizar 

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          product => product.category === selectedCategory
        )
    
    const categories = [
  "all",
  ...new Set(products.map(product => product.category))
]//new Set() es una estructura de datos que solo almacena valores únicos, entonces al pasarle el array de categorias de los productos, se eliminan las categorias repetidas PERO la propia funcion Set convierte el resultado en un objeto, es por eso que luego utilizamos ... para convertir ese objeto en un array(el operador spread (...) 

 return (
  <>
    <HeroSection />

    <div id="menu" className="container mx-auto py-10 px-4">
      
      <h1 className="text-3xl font-bold mb-6">
        Nuestro Menú
      </h1>

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

      {/* Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
    <LocationSection />
    <HoursSection />
    
  </>
)
}
export default Home

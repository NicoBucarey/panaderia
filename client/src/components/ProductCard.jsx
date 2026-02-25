function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      
      <div className="h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          {product.description}
        </p>

        <p className="text-green-600 font-bold text-lg mt-3">
          ${product.price}
        </p>
      </div>

    </div>
  )
}


export default ProductCard

function CategoryButton({ category, selectedCategory, onSelect }) {
  return (
    <button
      onClick={() => onSelect(category)}
      className={`flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-lg border text-sm md:text-base ${
        selectedCategory === category
          ? "bg-black text-white"
          : "bg-white"
      }`}
    >
      {category}
    </button>
  )
}

export default CategoryButton

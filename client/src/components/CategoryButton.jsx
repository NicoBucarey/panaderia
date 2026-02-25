function CategoryButton({ category, selectedCategory, onSelect }) {
  return (
    <button
      onClick={() => onSelect(category)}
      className={`px-4 py-2 rounded-lg border ${
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

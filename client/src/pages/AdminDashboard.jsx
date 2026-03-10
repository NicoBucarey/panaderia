import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/api"

function AdminDashboard() {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // form state for new/edit product
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "9", // panificados
    image: "",
  })
  const [editingId, setEditingId] = useState(null)

  // form state for new/edit category
  const [categoryForm, setCategoryForm] = useState("")
  const [categories, setCategories] = useState([])
  const [editingCategoryId, setEditingCategoryId] = useState(null)

  // if there's no auth token, redirect to login
  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      navigate("/admin/login")
    }
  }, [navigate])

  const loadCategories = async () => {
    setError(null)
    try {
      const data = await fetchCategories()
      setCategories(data)
      // Set default category to first one if available
      if (data.length > 0 && !form.categoryId) {
        setForm(prev => ({ ...prev, categoryId: String(data[0].id) }))
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const loadProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
    loadProducts()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      if (editingId) {
        await updateProduct(editingId, {
          ...form,
          categoryId: parseInt(form.categoryId),
          price: parseFloat(form.price),
        })
        setEditingId(null)
      } else {
        await createProduct({
          ...form,
          categoryId: parseInt(form.categoryId),
          price: parseFloat(form.price),
        })
      }
      setForm({ name: "", description: "", price: "", categoryId: "9", image: "" })
      loadProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      categoryId: String(product.categoryId),
      image: product.image,
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return
    try {
      await deleteProduct(id)
      loadProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  // Category handlers
  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      if (editingCategoryId) {
        await updateCategory(editingCategoryId, categoryForm)
        setEditingCategoryId(null)
      } else {
        await createCategory(categoryForm)
      }
      setCategoryForm("")
      loadCategories()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEditCategory = (category) => {
    setEditingCategoryId(category.id)
    setCategoryForm(category.name)
  }

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("¿Eliminar esta categoría?")) return
    try {
      await deleteCategory(id)
      loadCategories()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  return (
    <div className="p-6 pt-8">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Panel Administrador</h1>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <h2 className="font-semibold">
          {editingId ? "Editar producto" : "Nuevo producto"}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
            className="border p-1"
          />
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
            className="border p-1"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <input
          type="text"
          name="image"
          placeholder="URL imagen"
          value={form.image}
          onChange={handleChange}
          required
          className="w-full border p-1"
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border p-1"
        />
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          required
          className="border p-1"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {editingId ? "Guardar cambios" : "Crear producto"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null)
              setForm({ name: "", description: "", price: "", categoryId: "9", image: "" })
            }}
            className="ml-2 text-sm text-gray-600 hover:underline"
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="mb-8 border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Gestionar Categorías</h2>
        
        <form onSubmit={handleCategorySubmit} className="mb-4 space-y-2">
          <h3 className="font-semibold">
            {editingCategoryId ? "Editar categoría" : "Nueva categoría"}
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nombre de la categoría"
              value={categoryForm}
              onChange={(e) => setCategoryForm(e.target.value)}
              required
              className="flex-1 border p-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editingCategoryId ? "Guardar" : "Crear"}
            </button>
            {editingCategoryId && (
              <button
                type="button"
                onClick={() => {
                  setEditingCategoryId(null)
                  setCategoryForm("")
                }}
                className="text-sm text-gray-600 hover:underline px-2"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div>
          <h3 className="font-semibold mb-2">Categorías existentes</h3>
          <ul className="space-y-1 border rounded p-3">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="flex justify-between items-center bg-gray-50 p-2 rounded"
              >
                <span>{cat.name}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditCategory(cat)}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Productos existentes</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <ul className="space-y-2">
            {products.map((p) => (
              <li
                key={p.id}
                className="flex justify-between items-center border p-2"
              >
                <div>
                  <strong>{p.name}</strong> - ${p.price.toFixed(2)}
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-500 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
